// RootLayout.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/storeReducer";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider store={store}>
          <NextUIProvider>
            {/* Deja que NextAuth gestione la sesión internamente */}
            <NextAuthProvider>{children}</NextAuthProvider>
          </NextUIProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
