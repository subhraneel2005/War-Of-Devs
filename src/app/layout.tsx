import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/provider/SessionProviderWrapper"
import { ThemeProvider } from "@/provider/theme-provider";
import Navbar from "@/components/base/Navbar";

export const metadata: Metadata = {
  title: "War of devs",
  description: "Place for github warriors to battle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Navbar/>
            {children}
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
