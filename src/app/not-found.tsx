import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="eyebrow">404</span>
      <h1>We could not find that page.</h1>
      <p>The link may be incorrect, or the page may have moved.</p>
      <p><Link className="button" href="/">Return to Home</Link></p>
    </section>
  );
}
