import Link from "next/link";
import {
  PageHero,
  ProductGallery,
  SectionHeading,
  TradeLines,
  WhyUs,
} from "../components/SiteContent";
import { company } from "../../lib/site-config";
import { createMetadata } from "./seo";

export const metadata = createMetadata(
  "Business Solutions, Consultancy & Global Trade Vision",
  "Gyanav Exim Private Limited provides digital solutions and business consultancy, with a long-term ambition to explore global trade opportunities.",
  "/",
);

const businessAreas = [
  {
    title: "Digital Solutions",
    description: "Website and web application development, custom software, AI and workflow automation, and digital transformation.",
    href: "/digital-solutions",
    accent: "cyan-top",
  },
  {
    title: "Business Consultancy",
    description: "Business planning, documentation, project and technology advisory, and operational improvement.",
    href: "/business-consultancy",
    accent: "gold-top",
  },
  {
    title: "Global Trade",
    description: "A future-focused ambition to explore agricultural commodities, minerals and international business relationships.",
    href: "/global-trade",
    accent: "gold-top",
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow={company.tagline}
        title="Empowering Businesses Through Technology, Strategy and Global Opportunities."
        description="Gyanav Exim Private Limited supports businesses with digital solutions, technology implementation and business consultancy, while building toward future global trade opportunities."
      >
        <div className="button-row">
          <Link className="button" href="#business-areas">Explore Our Services</Link>
          <Link className="button button-secondary" href="/contact">Contact Us</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Business and trade areas"
            title="Our product and service areas"
            description="Product areas represent long-term trade interests and are subject to validation and operational readiness."
          />
          <ProductGallery />
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <SectionHeading
            eyebrow="Product and services"
            title="Four lines of trade"
          />
          <TradeLines />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2 intro-grid">
            <div>
              <span className="eyebrow">Company introduction</span>
              <h2 className="statement-heading">Building Businesses. Enabling Growth. Connecting Opportunities.</h2>
            </div>
            <div className="intro-copy">
              <p>
                Gyanav Exim Private Limited is a technology-enabled business
                solutions and consultancy company. We focus on practical
                digital capabilities and structured business support, with a
                long-term ambition to participate in international trade.
              </p>
              <Link className="text-link" href="/about">Discover Gyanav Exim</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="business-areas">
        <div className="container">
          <SectionHeading
            eyebrow="Core business areas"
            title="Capabilities for today and opportunities for tomorrow"
            description="Current services focus on digital solutions and business consultancy. Global trade is a future-focused ambition."
            light
          />
          <div className="grid grid-3">
            {businessAreas.map((area) => (
              <article className={`card reveal-on-scroll ${area.accent}`} key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <Link className="text-link" href={area.href}>Explore {area.title}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="vision-panel">
            <span className="eyebrow">Business vision</span>
            <h2 className="statement-heading statement-heading-light">From Digital Capabilities to Global Opportunities.</h2>
            <p>
              Our staged growth philosophy begins with digital solutions and
              business consultancy, builds through strategic partnerships, and
              explores global trade as future opportunities become validated.
            </p>
            <Link className="text-link" href="/about">Learn about our growth philosophy</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why us"
            title="A thoughtful approach to business growth"
            description="See the values, approach and facts that shape how we work."
          />
          <WhyUs />
          <div className="button-row">
            <Link className="text-link" href="/why-us">Learn more about why Gyanav Exim</Link>
          </div>
        </div>
      </section>

      <section className="section section-light contact-cta-strip">
        <div className="container closing-cta-inner">
          <div>
            <span className="eyebrow">Have a project in mind?</span>
            <p>Tell us what you are looking to achieve.</p>
          </div>
          <Link className="button" href="/contact">Contact Us</Link>
        </div>
      </section>

      <section className="section closing-cta">
        <div className="container closing-cta-inner">
          <div>
            <span className="eyebrow">Start a conversation</span>
            <h2>Let&apos;s Build Something Valuable Together.</h2>
          </div>
          <Link className="button" href="/contact">Let&apos;s Discuss Your Project</Link>
        </div>
      </section>
    </>
  );
}
