import { FormState, SignupFormSchema } from '@/lib/variables/definitions';

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
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await res.json();

    if (!res.ok) {
      const data = await res.json();
      return { errors: data.errors || "Failed to create account" };
    }

    return { message: data.message, id: data.id };

  } catch (error) {
    console.error("Signup Error:", error);
    return { error: "Something went wrong during signup." };
  }

  // TODO:
  // Create user session
  // Redirect user
}