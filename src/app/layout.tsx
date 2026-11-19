import { Cinzel, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/SiteHeader";
import Footer from "../components/SiteFooter";
import WhatsAppButton from "../components/WhatsAppButton";
import { company } from "../../lib/site-config";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: "Gyanav Exim | Business Solutions, Consultancy & Global Trade Vision",
    template: "%s | Gyanav Exim",
  },
  description:
    "Gyanav Exim Private Limited provides digital solutions and business consultancy, with a long-term ambition to explore global trade opportunities.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.brand,
    title: "Gyanav Exim | Business Solutions, Consultancy & Global Trade Vision",
    description:
      "Technology-enabled business solutions and consultancy, with a long-term global trade vision.",
    url: company.website,
    images: [{ url: company.logo, alt: "Gyanav Exim company logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gyanav Exim | Business Solutions, Consultancy & Global Trade Vision",
    description:
      "Technology-enabled business solutions and consultancy, with a long-term global trade vision.",
    images: [{ url: company.logo, alt: "Gyanav Exim company logo" }],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
};

function OrganizationSchema() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.website,
    logo: `${company.website}${company.logo}`,
    email: company.email,
    telephone: company.phone,
    description:
      "Technology-enabled business solutions and consultancy company with long-term international trade ambitions.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${montserrat.variable}`}>
      <body>
        <OrganizationSchema />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
