import React from "react";
import { Frame, Eyebrow, SectionTitle } from "../components/Layout";

export default function AboutPage() {
  return (
    <Frame wide>
      <div style={{ padding: "76px 0" }}>
        <Eyebrow>Company profile</Eyebrow>
        <SectionTitle>About us</SectionTitle>
        <p style={{ fontSize: 20, color: "#2A2A26", lineHeight: 1.7, maxWidth: 680 }}>
          Welcome at <strong>Gyanav Exim</strong> — your partner for turnkey
          projects, metals and minerals, agricultural commodities and edible
          oils.
        </p>
        <p style={{ fontSize: 18, color: "#3d3b34", lineHeight: 1.8, maxWidth: 680 }}>
          Our company, Gyanav Exim Private Limited, is an Indian full-service
          export and import house and supplier of high-quality agricultural
          commodities and edible oils, coal, metal and minerals, alongside
          turnkey project services. Established in 2022, we have built strong
          relationships with our customers by staying flexible, fast and
          accurate in planning, and by providing quality goods and services to
          their exact requirements. Over the years we have widened the range
          of products we offer, and today we import and export to more than
          twenty countries around the world.
        </p>
      </div>
    </Frame>
  );
}
