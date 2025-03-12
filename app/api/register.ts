// OLD CODE
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "../../prisma/db";
// import { hashPassword } from "@/lib/passwordHashing";
// import { limiter } from "@/lib/utils";

// export async function POST(req: NextRequest) {
//   try {
//     await limiter(req);
//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       throw new Error("All fields are required");
//     }

//     const existingUser = await db.user.findUnique({ where: { email } });
//     if (existingUser) {
//       throw new Error("User already exists");
//     }

//     const hashedPassword = await hashPassword(password);
//     const newUser = await db.user.create({
//       data: { name, email, password: hashedPassword },
//     });

//     return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message || "Failed to register user" }, { status: 500 });
//   }
// }