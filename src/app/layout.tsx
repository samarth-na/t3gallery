import "~/styles/globals.css";
import { TopNav } from "./_component/TopNav";
import { ClerkProvider } from "@clerk/nextjs";

import { type Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";

export const metadata: Metadata = {
  title: "T3gallery",
  // description: '',
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${spaceGrotesk.variable} ${fraunces.variable}`}
        >
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
