import Link from "next/link";
import {
  BreadcrumbPage,
  NumbersStrip,
  PageHero,
  SectionHeading,
  WhyUs,
} from "../../components/SiteContent";
import { numbersStrip } from "../../../lib/site-config";
import { createMetadata } from "../seo";

export const metadata = createMetadata(
  "Why Gyanav Exim",
  "Learn about Gyanav Exim's commitment, practical business approach, service lines and delivery process.",
  "/why-us",
);

const approachPoints = [
  "Technology-oriented approach",
  "Practical implementation",
  "Flexible engagement",
  "Long-term growth",
];

export default function WhyUsPage() {
  return (
    <BreadcrumbPage title="Why Us" path="/why-us">
      <PageHero
        eyebrow="Why Gyanav Exim"
        title="Why Us"
        description="A considered approach to delivering services, supporting business needs and building for the long term."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our commitment"
            title="The case for working with Gyanav"
          />
          <WhyUs />
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <SectionHeading
            eyebrow="Why Gyanav Exim"
            title="How we approach business growth"
          />
          <div className="grid grid-2">
            {approachPoints.map((point) => (
              <article className="card gold-top reveal-on-scroll" key={point}>
                <h3>{point}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="At a glance"
            title="Grounded in what we can deliver"
            light
          />
          <NumbersStrip items={numbersStrip} />
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
    </BreadcrumbPage>
  );
}
