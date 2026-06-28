import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Anton } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/ui/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Trivox Studio",
  description: "Company Profile of Trivox Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${anton.variable} antialiased`}
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
