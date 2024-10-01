import "~/styles/globals.css";
import { Viewport, type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Readex_Pro } from "next/font/google";

const readex_pro = Readex_Pro({
  subsets: ["latin"],
  variable: "--font-readex_pro",
});

const APP_NAME = "Wf Hjälpen";
const APP_DEFAULT_TITLE = "Wordfeud Hjälpen";
const APP_TITLE_TEMPLATE = "%s - WH App";
const APP_DESCRIPTION =
  "Använd dina bokstäver för att hitta det bästa ordet för ditt spel!";

export const metadata: Metadata = {
  icons: [{ rel: "icon", url: "/favicon-16x16.png" }],
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#191731",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="se" className={`${readex_pro.variable} font-sans`}>
        <body className="flex min-h-screen justify-center bg-primaryBlue p-[7px] text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
