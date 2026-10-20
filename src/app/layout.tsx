import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lokesh Ram Hariram | AI/ML Engineer & Data Engineer",
  description:
    "Portfolio of Lokesh Ram Hariram, an AI/ML Engineer and Data Engineer building useful machine learning and data systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
