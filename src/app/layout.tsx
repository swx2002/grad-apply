import type { Metadata } from "next";
import localFont from "next/font/local";
import { dmSans } from "./ui/font";
import Providers from "./providers"
import "@liveblocks/react-ui/styles.css"; 
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "GradApply",
  description: "Help you get into your dream school",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.className}`}>
      <body className={`bg-indigo-50 ${dmSans.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
