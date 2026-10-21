import type { Metadata } from "next";
import "./globals.css";

const title = "Lokesh Hariram | AI/ML Engineer & Data Engineer";
const description = "AI/ML Engineer & Data Engineer building useful machine learning and data systems.";
const productionUrl = new URL("https://lokesh-portfolio-v2-wjfl.vercel.app/");
const shareImage = new URL("/profile-social-preview.jpg", productionUrl).toString();

export const metadata: Metadata = {
  metadataBase: productionUrl,
  title,
  description,
  alternates: { canonical: productionUrl.toString() },
  openGraph: {
    type: "website",
    title,
    description,
    url: productionUrl.toString(),
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Lokesh Hariram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: shareImage, width: 1200, height: 630, type: "image/jpeg", alt: "Lokesh Hariram" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
