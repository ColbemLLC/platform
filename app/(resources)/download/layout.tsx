import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download — Colbe",
  description: "Get Colbe on Windows, Linux, and mobile. Native apps coming soon.",
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}