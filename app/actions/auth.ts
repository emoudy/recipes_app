import { SignupFormSchema } from '@/lib/variables/schemas';
import { FormState } from '@/lib/variables/types';
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData): Promise<FormState>  {

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate form fields before sending the request
  const validatedFields = SignupFormSchema.safeParse({ name, email, password });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Create user
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await res.json();

    if (!res.ok) {
      return { errors: data.errors || "Failed to create account" };
    }

    // Create user session
    await createSession(data.id)

    // Redirect user
    redirect('/profile')

  } catch (error) {
    console.error("Signup Error:", error);
    return { error: "Something went wrong during signup." };
  }
}

export async function logout() {
  deleteSession()
  redirect('/login')
}