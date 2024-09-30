"use client"; // This file will now be a client component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, {useEffect, useState} from "react";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import {siteSecurity} from "@/components/secure";
import { usePathname, useRouter } from "next/navigation";

// Load your custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    siteSecurity()

  }, []);
  useEffect(() => {
    if (!sessionStorage.getItem("token") && pathname !== "/auth/login" || pathname !== "/auth/signup") {
      router.push("/")
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />
        </body>
      </html>
    </QueryClientProvider>
  );
}
