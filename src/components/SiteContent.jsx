import Image from "next/image";
import Link from "next/link";
import { company, productGallery, tradeLines } from "../../lib/site-config";
import ParticlesBackground from "./ParticlesBackground";

/**
 * @param {{ eyebrow?: string, title: string, description?: string, children?: import("react").ReactNode, particles?: boolean }} props
 */
export function PageHero({ eyebrow, title, description, children, particles = false }) {
  return (
    <section className="page-hero">
      {particles && <ParticlesBackground id="hero-particles" />}
      <div className="container page-hero-inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </section>
  );
}

export function Breadcrumbs({ title, path }) {
  const items = [
    { name: "Home", item: `${company.website}/` },
    { name: title, item: `${company.website}${path}` },
  ];

  return (
    <nav className="container breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        <li aria-current="page">{title}</li>
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.item,
            })),
          }),
        }}
      />
    </nav>
  );
}

/**
 * @param {{ eyebrow?: string, title: string, description?: string, light?: boolean }} props
 */
export function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`section-heading${light ? " section-heading-light" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ProductGallery() {
  return (
    <div className="product-grid">
      {productGallery.map((product) => (
        <figure className="product-card reveal-on-scroll" key={product.name}>
          <div className="product-image">
            <Image
              src={product.src}
              alt={product.name}
              fill
              sizes="(max-width: 559px) 45vw, (max-width: 759px) 30vw, (max-width: 1119px) 22vw, 270px"
            />
          </div>
          <figcaption>{product.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function TradeLines() {
  return (
    <div className="trade-lines">
      {tradeLines.map((line, index) => (
        <article className="trade-line reveal-on-scroll" key={line.title}>
          <span className="trade-line-number">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{line.title}</h3>
            <p>{line.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function WhyUs() {
  const reasons = [
    {
      image: "https://gyanavexim.com/wp-content/uploads/2023/06/Why-Us-100-Result-Oriented.png",
      title: "100% results",
    },
    {
      image: "https://gyanavexim.com/wp-content/uploads/2023/06/Why-Us-Commitment-Centric.png",
      title: "Fully committed",
    },
    {
      image: "https://gyanavexim.com/wp-content/uploads/2023/06/Why-Us-Cost-Effective.png",
      title: "Cost effective",
    },
  ];

  return (
    <div className="grid grid-3">
      {reasons.map((reason) => (
        <article className="card why-card reveal-on-scroll" key={reason.title}>
          <Image src={reason.image} alt={`${reason.title} icon`} width={64} height={64} sizes="64px" />
          <h3>{reason.title}</h3>
        </article>
      ))}
    </div>
  );
}

export function NumbersStrip({ items }) {
  return (
    <div className="stat-strip" aria-label="Company facts">
      {items.filter((item) => typeof item === "string" && item.trim()).map((item) => (
        <div className="stat-item reveal-on-scroll" key={item}>{item}</div>
      ))}
    </div>
  );
}

/**
 * @param {{ title: string, path: string, children?: import("react").ReactNode }} props
 */
export function BreadcrumbPage({ title, path, children }) {
  return (
    <>
      <Breadcrumbs title={title} path={path} />
      {children}
    </>
  );
}

export function PageActions() {
  return (
    <div className="button-row">
      <Link className="button" href="/contact">Let&apos;s Discuss Your Project</Link>
      <Link className="text-link" href="/global-trade">Global Trade</Link>
    </div>
  );
}
