import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SupabaseProvider from "@/lib/Supabase-provider";
import { DashboardProvider } from "@/components/dashboard/provider";

const inter = Inter({ subsets: ["latin"] });

const title = "Savi";
const description = "";
const image = "https://vercel.pub/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["/favicon.png"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@vercel",
  },
  metadataBase: new URL("https://vercel.pub"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
