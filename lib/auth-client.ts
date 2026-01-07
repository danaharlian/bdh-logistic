import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;

export type SessionClient = typeof authClient.$Infer.Session.session;
export type UserSessionClient = typeof authClient.$Infer.Session.user;
