import "~/styles/globals.css";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Readex_Pro } from "next/font/google";

const readex_pro = Readex_Pro({
  subsets: ["latin"],
  variable: "--font-readex_pro",
});

export const metadata: Metadata = {
  title: "Wordfeud Hjälpen",
  description: "Generera ord av dina bokstäver",
  icons: [{ rel: "icon", url: "/Icon_.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="se" className={`${readex_pro.variable} font-sans`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
