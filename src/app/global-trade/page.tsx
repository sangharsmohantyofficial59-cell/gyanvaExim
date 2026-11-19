import Link from "next/link";
import {
  BreadcrumbPage,
  PageHero,
  ProductGallery,
  SectionHeading,
  TradeLines,
} from "../../components/SiteContent";
import { enquiryCategories } from "../../../lib/site-config";
import { createMetadata } from "../seo";

export const metadata = createMetadata(
  "Global Trade",
  "Explore Gyanav Exim's future global trade vision, product interests and partnership enquiry categories.",
  "/global-trade",
);

export default function GlobalTradePage() {
  return (
    <BreadcrumbPage title="Global Trade" path="/global-trade">
      <PageHero
        eyebrow="Future-focused ambition"
        title="Connecting Businesses to Global Opportunities."
        description="Gyanav Exim aims to develop international relationships and explore trade opportunities as capabilities, registrations and market readiness are established."
      />
      <section className="section">
        <div className="container grid grid-2">
          <article className="card gold-top">
            <SectionHeading eyebrow="Potential future focus" title="Agricultural commodities" />
            <p>
              Potential future focus may include rice and grain products,
              pulses, spices and other agricultural commodities, subject to
              validation.
            </p>
          </article>
          <article className="card gold-top">
            <SectionHeading eyebrow="Potential future focus" title="Minerals and industrial materials" />
            <p>
              Potential future focus may include mineral sourcing and
              industrial raw materials, subject to market and regulatory
              validation.
            </p>
          </article>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="Trade vision" title="Building toward global opportunities" light />
          <p className="trade-vision-copy">
            We intend to build relationships with credible suppliers, buyers
            and strategic partners. Trade opportunities remain future-focused
            and subject to business, market, regulatory and operational
            readiness.
          </p>
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <SectionHeading
            eyebrow="Product interests"
            title="Areas of interest"
            description="These product areas reflect future trade interests, not a claim of current shipment history."
          />
          <ProductGallery />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Product and services" title="Four lines of trade" />
          <TradeLines />
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <SectionHeading
            eyebrow="Partnership enquiry"
            title="Choose an enquiry category"
            description="Select the area you would like to discuss to begin an enquiry with the category already selected."
          />
          <div className="grid grid-2 enquiry-category-grid">
            {enquiryCategories.map((category) => (
              <article className="card gold-top" key={category}>
                <h3>{category}</h3>
                <Link
                  className="text-link"
                  href={`/contact?category=${encodeURIComponent(category)}`}
                >
                  Enquire about {category}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </BreadcrumbPage>
  );
}
