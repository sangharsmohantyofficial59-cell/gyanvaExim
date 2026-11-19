import Link from "next/link";
import {
  BreadcrumbPage,
  PageHero,
  SectionHeading,
} from "../../components/SiteContent";
import { createMetadata } from "../seo";

export const metadata = createMetadata(
  "About Gyanav Exim Private Limited",
  "Learn about Gyanav Exim's company profile, vision, mission, values and staged growth philosophy.",
  "/about",
);

export default function AboutPage() {
  return (
    <BreadcrumbPage title="About Us" path="/about">
      <PageHero
        eyebrow="Company profile"
        title="About Gyanav Exim Private Limited"
        description="Gyanav Exim is a technology-enabled business solutions and consultancy company with long-term international trade ambitions."
      />
      <section className="section">
        <div className="container-narrow">
          <SectionHeading eyebrow="Company profile" title="Business solutions with a global outlook" />
          <p>
            Gyanav Exim Private Limited is a technology-enabled business
            solutions and consultancy company. The company focuses on digital
            solutions, business planning and technology advisory, with a
            long-term ambition to participate in international trade.
          </p>
          <p>
            Digital services and business consultancy represent the current
            focus. Agricultural commodities, minerals and international
            sourcing are future expansion opportunities, subject to readiness
            and validation.
          </p>
        </div>
      </section>
      <section className="section section-light">
        <div className="container grid grid-2">
          <article className="card gold-top">
            <SectionHeading eyebrow="Vision" title="Our vision" />
            <p>
              Build a diversified organisation that empowers enterprises
              through technology, strategic consulting and international
              market opportunities.
            </p>
          </article>
          <article className="card cyan-top">
            <SectionHeading eyebrow="Mission" title="Our mission" />
            <ul className="service-list">
              <li>Deliver useful digital solutions.</li>
              <li>Support practical business planning.</li>
              <li>Encourage technology adoption.</li>
              <li>Build partnerships.</li>
              <li>Develop future trade opportunities.</li>
            </ul>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Values" title="Principles that guide our work" />
          <div className="values-grid">
            {["Integrity", "Innovation", "Reliability", "Growth", "Global Outlook"].map((value) => (
              <div className="value-chip reveal-on-scroll" key={value}>{value}</div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container grid grid-2">
          <div>
            <SectionHeading eyebrow="Growth philosophy" title="A deliberate path from capability to opportunity" light />
            <p className="growth-sequence">
              Digital Solutions <span aria-hidden="true">→</span> Business
              Consultancy <span aria-hidden="true">→</span> Strategic
              Partnerships <span aria-hidden="true">→</span> Global Trade
            </p>
          </div>
          <div className="dark-panel">
            <h2 className="statement-heading statement-heading-light">Current capabilities first</h2>
            <p>
              The company prioritises services it can currently deliver and
              presents trade as a future ambition, subject to operational,
              market and regulatory readiness.
            </p>
            <Link className="text-link" href="/digital-solutions">Explore Digital Solutions</Link>
          </div>
        </div>
      </section>
    </BreadcrumbPage>
  );
}
