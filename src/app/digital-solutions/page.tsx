import {
  BreadcrumbPage,
  PageActions,
  PageHero,
  SectionHeading,
} from "../../components/SiteContent";
import Link from "next/link";
import { createMetadata } from "../seo";

export const metadata = createMetadata(
  "Digital Solutions",
  "Explore website and web application development, custom software, AI and automation, and digital transformation services from Gyanav Exim.",
  "/digital-solutions",
);

const services = [
  {
    title: "Website Development",
    description: "Corporate websites, business websites, landing pages, responsive development and maintenance.",
  },
  {
    title: "Web Application Development",
    description: "Custom business applications, dashboards, client portals, workflow applications and database-driven applications.",
  },
  {
    title: "Custom Software",
    description: "Business-specific software, internal management systems, operational tools and API integration.",
  },
  {
    title: "AI and Automation",
    description: "AI-assisted workflows, repetitive-task automation, business process automation and intelligent business tools.",
  },
  {
    title: "Digital Transformation",
    description: "Business digitisation, process improvement, technology implementation and digital workflow planning.",
  },
];

const delivery = [
  "Requirement Understanding",
  "Solution Planning",
  "Design and Development",
  "Testing and Implementation",
  "Deployment and Support",
];

export default function DigitalSolutionsPage() {
  return (
    <BreadcrumbPage title="Digital Solutions" path="/digital-solutions">
      <PageHero
        eyebrow="Current services"
        title="Digital Solutions"
        description="Practical technology services that help businesses plan, build and improve their digital capabilities."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Service groups"
            title="Technology services for business needs"
            description="The scope of each engagement is shaped around the requirements and implementation needs of the business."
          />
          <div className="grid grid-2">
            {services.map((service, index) => (
              <article className={`card reveal-on-scroll ${index === 0 || index === 3 ? "cyan-top" : "gold-top"}`} key={service.title}>
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
          <SectionHeading eyebrow="Delivery approach" title="A clear path from requirement to support" />
          <ol className="process">
            {delivery.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container grid grid-2">
          <div>
            <SectionHeading eyebrow="Discuss your project" title="Tell us what you want to make possible" light />
            <p>Share your requirements and our team can discuss a suitable next step.</p>
            <PageActions />
          </div>
          <div className="dark-panel">
            <h2 className="statement-heading statement-heading-light">Related business support</h2>
            <p>Digital projects can be supported by business planning, technology advisory and implementation consultancy.</p>
            <Link className="text-link" href="/business-consultancy">Explore Business Consultancy</Link>
          </div>
        </div>
      </section>
    </BreadcrumbPage>
  );
}
