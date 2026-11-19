import { company } from "../../lib/site-config";

export function createMetadata(title, description, path) {
  const url = `${company.website}${path}`;
  const image = { url: company.logo, alt: "Gyanav Exim company logo" };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: company.brand,
      title,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
