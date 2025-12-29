import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StacksProvider from "@/contexts/StacksContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SquadProps - Social Recognition on Stacks",
  description: "Give props, build reputation, and celebrate your squad on the Stacks blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <StacksProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StacksProvider>
      </body>
    </html>
  );
}
