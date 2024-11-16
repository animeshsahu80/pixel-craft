import type { Metadata } from "next";

import { ClerkProvider } from '@clerk/nextjs'

import "./globals.css";
import { Toaster } from "@/components/ui/toaster"



export const metadata: Metadata = {
  title: "PixelCraft",
  description: "AI powered image transformer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        <Toaster />

        </body>
      </html>
    </ClerkProvider>
  )
}