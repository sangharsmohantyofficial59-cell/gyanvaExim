import { company } from "../../lib/site-config";

const paths = [
  "/",
  "/about",
  "/why-us",
  "/digital-solutions",
  "/business-consultancy",
  "/global-trade",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
];

export default function sitemap() {
  return paths.map((path) => ({
    url: `${company.website}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
