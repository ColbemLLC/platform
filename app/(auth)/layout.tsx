import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Colbe",
    default: "Colbe",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}