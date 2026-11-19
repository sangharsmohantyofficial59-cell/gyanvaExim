import Image from "next/image";
import Link from "next/link";
import { company, navigation } from "../../lib/site-config";
import ParticlesBackground from "./ParticlesBackground";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <ParticlesBackground id="footer-particles" density={0.7} />
      <div className="container site-footer-content">
        <div className="footer-main">
          <div className="footer-company">
            <Image
              src={company.logo}
              alt="Gyanav Exim circular company emblem"
              width={78}
              height={78}
            />
            <div>
              <p className="footer-company-name">{company.name}</p>
              <p className="footer-tagline">{company.tagline}</p>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h2>Explore</h2>
              <nav aria-label="Footer navigation">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href}>{item.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h2>Contact</h2>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp {company.phone}
              </a>
              <div className="footer-legal">
                {legalLinks.map((item) => (
                  <Link key={item.href} href={item.href}>{item.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <span>{company.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
