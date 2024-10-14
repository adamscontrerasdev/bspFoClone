// RootLayout.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/storeReducer";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session, // Asegúrate de pasar la sesión aquí
}: {
  children: React.ReactNode;
  session: any; // Aquí puedes especificar el tipo si es necesario
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider store={store}>
          <NextUIProvider>
            <NextAuthProvider session={session}>{children}</NextAuthProvider>
          </NextUIProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
