import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "./constants";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  ogImage = "/og-image.png",
  type = "website",
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    title: title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — AI-Powered Patient Intake`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title || SITE_NAME,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || SITE_NAME,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
