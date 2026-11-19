import Link from "next/link";
import {
  BreadcrumbPage,
  PageActions,
  PageHero,
  SectionHeading,
} from "../../components/SiteContent";
import { createMetadata } from "../seo";

export const metadata = createMetadata(
  "Business Consultancy",
  "Explore business planning, documentation, project management consultancy, technology advisory and operational improvement.",
  "/business-consultancy",
);

const services = [
  {
    title: "Business Planning and Setup Advisory",
    description: "Business concept development, business model planning, operational planning and process structuring.",
  },
  {
    title: "Business Documentation",
    description: "Business proposals, project reports, presentations, process documentation and technical documentation.",
  },
  {
    title: "Project Management Consultancy",
    description: "Project planning, requirement documentation, coordination, progress reporting and implementation monitoring.",
  },
  {
    title: "Technology Advisory",
    description: "Technology assessment, software solution planning, digital implementation strategy and technical project coordination.",
  },
  {
    title: "Operational Improvement",
    description: "Workflow analysis, process documentation, efficiency planning and digital process improvement.",
  },
];

const process = [
  "Understand the Requirement",
  "Analyse the Need",
  "Develop a Structured Plan",
  "Present Recommendations",
  "Support Implementation",
];

export default function BusinessConsultancyPage() {
  return (
    <BreadcrumbPage title="Business Consultancy" path="/business-consultancy">
      <PageHero
        eyebrow="Current services"
        title="Business Consultancy"
        description="Structured planning and advisory support to help organisations assess needs, document requirements and move toward implementation."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Consulting services"
            title="Practical support for business decisions"
          />
          <div className="grid grid-2">
            {services.map((service, index) => (
              <article className="card gold-top reveal-on-scroll" key={service.title}>
                <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <SectionHeading eyebrow="Consulting process" title="From understanding to implementation support" />
          <ol className="process">
            {process.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <aside className="professional-notice">
            Regulated legal, tax, audit, investment and financial services come only from qualified professionals or authorised partners.
          </aside>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container grid grid-2">
          <div>
            <SectionHeading eyebrow="Plan with clarity" title="Discuss the next step for your business" light />
            <p>Enquiries begin with understanding your requirements and the type of support you need.</p>
            <PageActions />
          </div>
          <div className="dark-panel">
            <h2 className="statement-heading statement-heading-light">Digital and strategic capabilities</h2>
            <p>Connect business planning with technology implementation through our digital solutions work.</p>
            <Link className="text-link" href="/digital-solutions">Explore Digital Solutions</Link>
          </div>
        </div>
      </section>
    </BreadcrumbPage>
  );
}
