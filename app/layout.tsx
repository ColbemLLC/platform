import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { ColorModeProvider } from "@/src/components/theme/color-mode-provider";

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colbe",
  description: "A community and chat platform to build, hang out, and grow with your people.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("dark", "h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", roboto.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ColorModeProvider forcedTheme="dark" defaultTheme="dark">
          {children}
        </ColorModeProvider>
      </body>
    </html>
  );
}