// NEEDS OWNER REVIEW: Plain-language draft, not legal advice.
import { BreadcrumbPage, PageHero } from "../../components/SiteContent";
import { company } from "../../../lib/site-config";
import { createMetadata } from "../seo";

export const metadata = createMetadata(
  "Privacy Policy",
  "Read the draft privacy notice for enquiries submitted to Gyanav Exim Private Limited.",
  "/privacy-policy",
);

export default function PrivacyPolicyPage() {
  return (
    <BreadcrumbPage title="Privacy Policy" path="/privacy-policy">
      <PageHero eyebrow="Legal information" title="Privacy Policy" description="A plain-language draft describing how enquiry information may be used." />
      <section className="section">
        <div className="container-narrow legal-copy">
          <p><strong>Draft for owner review.</strong> Please review and approve this notice, including data retention and rights handling, before launch.</p>
          <h2>Information you provide</h2>
          <p>The enquiry form may collect your name, company, email address, phone number, enquiry category, subject and message, together with your privacy consent.</p>
          <h2>How information may be used</h2>
          <p>Gyanav Exim Private Limited may use this information to review and respond to your enquiry, communicate with you about your request, and maintain an enquiry record.</p>
          <h2>Storage and service providers</h2>
          <p>Enquiries submitted through the configured form are intended to be recorded in a company-controlled Google Sheet and sent to the company inbox. Google may process information to provide its services. Please do not include sensitive personal information in an enquiry.</p>
          <h2>Retention and your requests</h2>
          <p>The company has not yet published a confirmed retention period or request-handling procedure. Contact the company to ask about your information or request a correction or deletion, subject to applicable requirements.</p>
          <h2>Contact</h2>
          <p>Questions about this draft or a privacy request may be sent to <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
        </div>
      </section>
    </BreadcrumbPage>
  );
}
