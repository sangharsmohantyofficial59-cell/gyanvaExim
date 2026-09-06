import React from "react";
import { Frame, Eyebrow, SectionTitle, Thumbs, ListCol } from "../components/Layout";
import { IMG } from "../constants";

export default function ProductsPage() {
  return (
    <Frame wide>
      <div style={{ padding: "76px 0 24px" }}>
        <Eyebrow>Catalogue</Eyebrow>
        <SectionTitle>Our products</SectionTitle>
      </div>
      <div style={{ paddingBottom: 50 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: "#10233F" }}>Minerals and metals</h3>
        <p style={{ color: "#5c5a52", fontSize: 17, marginTop: 6, marginBottom: 22 }}>All types of minerals and metals.</p>
        <Thumbs
          items={[
            { src: IMG.bauxite, alt: "Bauxite ore" },
            { src: IMG.coal, alt: "Coal" },
            { src: IMG.ironOre2, alt: "Iron ore" },
            { src: IMG.copper, alt: "Copper" },
          ]}
        />
        <div style={{ marginTop: 28 }}>
          <ListCol
            items={["Coal", "Copper", "Iron ore", "Bauxite", "Manganese ore", "Lead", "Lithium", "Zinc", "Graphite", "Nickel"]}
          />
        </div>
      </div>
      <div style={{ paddingBottom: 76, borderTop: "1px solid #DDD5C2", paddingTop: 50 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: "#10233F" }}>Agricultural commodities</h3>
        <p style={{ color: "#5c5a52", fontSize: 17, marginTop: 6, marginBottom: 22 }}>All types of agricultural commodities and edible oils.</p>
        <Thumbs
          items={[
            { src: IMG.spices, alt: "Spices" },
            { src: IMG.sesame, alt: "Sesame seeds" },
            { src: IMG.palmOil2, alt: "Palm oil" },
            { src: IMG.sunflowerOil2, alt: "Sunflower oil" },
            { src: IMG.beans2, alt: "Beans and pulses" },
          ]}
        />
        <div style={{ marginTop: 28 }}>
          <ListCol
            items={["Soybeans", "Kidney beans", "Sesame seeds", "Raw cashewnut", "Cardamom", "Cinnamon", "Turmeric", "Maize", "Palm oil", "Sunflower oil"]}
          />
        </div>
      </div>
    </Frame>
  );
}
