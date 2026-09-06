import React from "react";
import { Frame, Eyebrow, SectionTitle, Thumbs, ListCol } from "../components/Layout";
import { IMG } from "../constants";

export default function ServicesPage() {
  return (
    <Frame wide>
      <div style={{ padding: "76px 0 24px" }}>
        <Eyebrow>What we offer</Eyebrow>
        <SectionTitle>Our services</SectionTitle>
      </div>
      <div style={{ paddingBottom: 50 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: "#10233F" }}>Cargo logistics</h3>
        <p style={{ color: "#5c5a52", fontSize: 17, marginTop: 6, marginBottom: 22 }}>We deal in all types of dry and wet cargo transportation.</p>
        <Thumbs
          items={[
            { src: IMG.importExport4, alt: "Import export" },
            { src: IMG.shipping, alt: "Shipping" },
            { src: IMG.dryCargo, alt: "Dry cargo truck" },
            { src: IMG.wetCargo, alt: "Wet cargo truck" },
            { src: IMG.ironOreExport, alt: "Iron ore exporting" },
          ]}
        />
        <div style={{ marginTop: 28 }}>
          <ListCol items={["Minerals transporting services", "Dry cargo transporting services", "Bulk cargo shipping", "Wet cargo shipping", "Oil tankers services"]} />
        </div>
      </div>
      <div style={{ paddingBottom: 76, borderTop: "1px solid #DDD5C2", paddingTop: 50 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: "#10233F" }}>Project consultancy</h3>
        <p style={{ color: "#5c5a52", fontSize: 17, marginTop: 6, marginBottom: 22 }}>We deal in all types of turn-key projects.</p>
        <Thumbs
          items={[
            { src: IMG.accounting, alt: "Accounting services" },
            { src: IMG.webDev, alt: "Website development" },
            { src: IMG.foodBev, alt: "Food and beverage project" },
            { src: IMG.polyPack, alt: "Poly pack project" },
            { src: IMG.rcn, alt: "Raw cashewnut processing" },
          ]}
        />
        <div style={{ marginTop: 28 }}>
          <ListCol items={["Accounting services", "Website development services", "Plastic packaging projects", "Raw cashewnut processing project", "Food and beverages projects"]} />
        </div>
      </div>
    </Frame>
  );
}
