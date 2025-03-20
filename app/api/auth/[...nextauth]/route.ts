import { handlers } from "@/auth/*";

/*
This file is a catch-all route that handles multiple dynamic routes
/api/auth/signin
/api/auth/signout
/api/auth/session
/api/auth/callback/{provider}
*/

export const { GET, POST } = handlers;