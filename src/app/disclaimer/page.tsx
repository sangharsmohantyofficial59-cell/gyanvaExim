// NEEDS OWNER REVIEW: Plain-language draft, not legal advice.
import { BreadcrumbPage, PageHero } from "../../components/SiteContent";
import { company } from "../../../lib/site-config";
import { createMetadata } from "../seo";

export const metadata = createMetadata(
  "Disclaimer",
  "Read the draft disclaimer about Gyanav Exim website content, consultancy and future trade interests.",
  "/disclaimer",
);

export default function DisclaimerPage() {
  return (
    <BreadcrumbPage title="Disclaimer" path="/disclaimer">
      <PageHero eyebrow="Legal information" title="Disclaimer" description="Draft notice for review by the company owner." />
      <section className="section">
        <div className="container-narrow legal-copy">
          <p><strong>Draft for owner review.</strong> This notice should be reviewed and approved before launch.</p>
          <h2>General information</h2>
          <p>Website content is for general information only and is not a representation that a particular service, product or opportunity is available or suitable for a specific purpose.</p>
          <h2>Professional services</h2>
          <p>Gyanav Exim does not represent that it provides regulated legal, tax, audit, investment or financial services. Such services come only from qualified professionals or authorised partners.</p>
          <h2>Future trade interests</h2>
          <p>Agricultural commodities, minerals, sourcing and international trade described on this website are future-focused interests subject to business, market, regulatory and operational validation. They are not a statement of shipment history or established trade relationships.</p>
          <h2>Contact</h2>
          <p>Questions about this draft disclaimer may be sent to <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
        </div>
      </section>
    </BreadcrumbPage>
  );
}
