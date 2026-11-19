import { company } from "../../lib/site-config";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${company.website}/sitemap.xml`,
  };
}
