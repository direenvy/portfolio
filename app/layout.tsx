import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import { profile } from "@/content/profile";

// SF Pro is licensed; Inter Tight / Inter are the documented substitutes.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "600"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["600"] });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
