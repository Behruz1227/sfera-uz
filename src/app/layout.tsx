"use client"; // This file will now be a client component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
  // Initialize a QueryClient
  const [queryClient] = useState(() => new QueryClient());

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
