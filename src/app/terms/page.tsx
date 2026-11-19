// NEEDS OWNER REVIEW: Plain-language draft, not legal advice.
import { BreadcrumbPage, PageHero } from "../../components/SiteContent";
import { company } from "../../../lib/site-config";
import { createMetadata } from "../seo";

export const metadata = createMetadata(
  "Terms and Conditions",
  "Read the draft plain-language terms for the Gyanav Exim website.",
  "/terms",
);

export default function TermsPage() {
  return (
    <BreadcrumbPage title="Terms and Conditions" path="/terms">
      <PageHero eyebrow="Legal information" title="Terms and Conditions" description="Draft website terms for review by the company owner." />
      <section className="section">
        <div className="container-narrow legal-copy">
          <p><strong>Draft for owner review.</strong> These general terms are not a substitute for legal advice and should be approved before launch.</p>
          <h2>Website information</h2>
          <p>This website provides general information about Gyanav Exim Private Limited, its current digital solutions and business consultancy focus, and its future-focused global trade ambition.</p>
          <h2>Enquiries and services</h2>
          <p>Submitting an enquiry does not create a contract or guarantee that a service or trade opportunity will be available. Any work will be subject to a separate written agreement.</p>
          <h2>Accuracy and availability</h2>
          <p>Content is provided in good faith and may change. The company does not guarantee uninterrupted website availability or that all information is complete for a particular purpose.</p>
          <h2>Contact</h2>
          <p>Questions about these draft terms may be sent to <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
        </div>
      </section>
    </BreadcrumbPage>
  );
}
