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
      session.user.id = token.sub; // Guarda el id del token en la sesión
      session.user.image = token.picture; // Asegúrate de que la imagen también esté disponible en la sesión
      return session;
    },
    async jwt({ token, user, account }) {
      // Cuando se genera el JWT por primera vez, almacena la imagen del perfil del usuario
      if (user && account) {
        token.picture = user.image; // Aquí guardamos la URL de la imagen de perfil de Google
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
