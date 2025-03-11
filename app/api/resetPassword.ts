import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/passwordHashing";
import { sendPasswordResetEmail } from "@/lib/emailService";
import crypto from "crypto";
import { limiter } from "@/lib/rateLimiting";

export async function POST(req: NextRequest) {
	try {
		await limiter(req);
		const { email, newPassword, resetToken } = await req.json();

		if (!email || !newPassword || !resetToken) {
			throw new Error("All fields are required");
		}

		const user = await db.user.findUnique({ where: { email } });
		if (!user || user.resetToken !== resetToken || user.resetTokenExpiry < new Date()) {
			throw new Error("Invalid or expired reset token");
		}

		const hashedPassword = await hashPassword(newPassword);
		await db.user.update({
			where: { email },
			data: {
				password: hashedPassword,
				resetToken: null,
				resetTokenExpiry: null,
			},
		});

		return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message || "Failed to reset password" }, { status: 500 });
	}
}

export async function requestResetToken(req: NextRequest) {
	try {
		await limiter(req);
		const { email } = await req.json();
		if (!email) throw new Error("Email is required");

		const user = await db.user.findUnique({ where: { email } });
		if (!user) throw new Error("User not found");

		const resetToken = crypto.randomBytes(32).toString("hex");
		const resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

		await db.user.update({
			where: { email },
			data: { resetToken, resetTokenExpiry },
		});

		const emailResult = await sendPasswordResetEmail(email, resetToken);
		if (!emailResult.success) throw new Error(emailResult.message);

		return NextResponse.json({ message: "Reset token sent" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message || "Failed to request password reset" }, { status: 500 });
	}
}
