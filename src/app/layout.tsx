import type { Metadata } from "next";
import "./globals.css";

const title = "Lokesh Ram Hariram | AI/ML Engineer & Data Engineer";
const description =
  "Portfolio of Lokesh Ram Hariram, an AI/ML Engineer and Data Engineer building useful machine learning and data systems.";

function getProductionUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

const productionUrl = getProductionUrl();
const shareImage = productionUrl
  ? new URL("/profile-social-preview.jpg", productionUrl).toString()
  : undefined;

export const metadata: Metadata = {
  ...(productionUrl ? { metadataBase: productionUrl } : {}),
  title,
  description,
  ...(productionUrl ? { alternates: { canonical: productionUrl.toString() } } : {}),
  openGraph: {
    type: "website",
    title,
    description,
    ...(productionUrl ? { url: productionUrl.toString() } : {}),
    ...(shareImage
      ? {
          images: [
            {
              url: shareImage,
              width: 1200,
              height: 630,
              alt: "Lokesh Ram Hariram, AI/ML Engineer and Data Engineer",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...(shareImage ? { images: [shareImage] } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
