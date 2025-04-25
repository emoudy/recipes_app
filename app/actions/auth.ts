import { SignupFormSchema } from '@/lib/variables/schemas';
import { FormState } from '@/lib/variables/types';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db/db';

export async function signup(state: FormState, formData: FormData): Promise<FormState>  {

  // 1. Validate form fields before sending the request
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors};

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const data = await db.user.create({data: { name, email, password: hashedPassword }}).catch((error) => {
    console.error("Signup Error:", error);
    return { error: "Something went wrong during signup." };
  });

  console.log("User created:", data);
  if (!data || "error" in data) return { message: 'An error occurred while creating your account.'};

  // Redirect user to login — they’ll sign in with their new credentials
  redirect('/login')
}

export async function logout() {
  // signout handled by NextAuth
  redirect('/login')
}