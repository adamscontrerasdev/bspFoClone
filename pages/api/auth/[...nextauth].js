import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Asegúrate de que el id esté disponible
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.email; // Cambia esto a user.email o user.id según lo que necesites
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
