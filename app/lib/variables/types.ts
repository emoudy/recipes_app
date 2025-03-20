export type FormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string;
  id?: number;
  error?: string;
}

export type SessionPayload = {
  user: {
    id: number
  }
  expiresAt: Date
}