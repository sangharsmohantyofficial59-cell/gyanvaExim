import {
  BreadcrumbPage,
  PageHero,
  SectionHeading,
} from "../../components/SiteContent";
import EnquiryForm from "../../components/EnquiryForm";
import { company } from "../../../lib/site-config";
import { createMetadata } from "../seo";

export const metadata = createMetadata(
  "Contact Gyanav Exim",
  "Contact Gyanav Exim Private Limited about digital solutions, business consultancy or future trade partnerships.",
  "/contact",
);

export default function ContactPage() {
  return (
    <BreadcrumbPage title="Contact" path="/contact">
      <PageHero
        eyebrow="Get in touch"
        title="Contact Gyanav Exim"
        description="Tell us about your requirements, project or partnership enquiry."
      />
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <SectionHeading eyebrow="Enquiry form" title="Tell us what you have in mind" />
              <EnquiryForm />
            </div>
            <aside className="contact-details" aria-label="Company contact information">
              <SectionHeading eyebrow="Contact details" title={company.name} />
              <div className="contact-detail">
                <h3>Email</h3>
                <p><a href={`mailto:${company.email}`}>{company.email}</a></p>
              </div>
              <div className="contact-detail">
                <h3>WhatsApp</h3>
                <p>
                  <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
                    {company.phone}
                  </a>
                </p>
              </div>
              <div className="contact-detail">
                <h3>Website</h3>
                <p><a href={company.website}>{company.website.replace("https://", "")}</a></p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </BreadcrumbPage>
  );
}
