import { SignupFormSchema } from "@/lib/variables/schemas";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
		const formData = await req.json();
  
		// Validate form fields
  	const validatedFields = SignupFormSchema.safeParse(formData)
 
  	if (!validatedFields.success) {
			return NextResponse.json({ errors: validatedFields.error.flatten().fieldErrors }, { status: 400 });
  	}

		// Extract validated data
		const { name, email, password } = validatedFields.data;

		// Checks if user already exists
		const existingUser = await db.user.findUnique({ where: { email }});
		
		if (existingUser) {
			return NextResponse.json({ error: "User already exists" }, { status: 400 });
		}

		// Hash the user's password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create a user
		const user = await db.user.create({
			data: { name, email, password: hashedPassword},
			select: { id: true }, // Returns the user ID
		});

		return NextResponse.json({ message: "Account created successfully!", id: user.id }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error.  Failed to create account" }, { status: 500 });
  }
}
