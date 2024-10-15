// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface DefaultSession {
    user: {
      id: string; // Agrega el ID aquí
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}
