import React, { useState, useEffect } from "react";
import { Frame, Eyebrow, SectionTitle, Manifest, Thumbs } from "../components/Layout";
import { IMG } from "../constants";
import { useCounter } from "../utils/hooks";

export default function HomePage({ setPage }) {
  const [statsOn, setStatsOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStatsOn(true), 200);
    return () => clearTimeout(t);
  }, []);
  const countries = useCounter(20, statsOn);
  const customers = useCounter(150, statsOn);
  const projects = useCounter(35, statsOn);

  const gallery = [
    { src: IMG.importExport, alt: "Import export" },
    { src: IMG.ironOre, alt: "Iron ore" },
    { src: IMG.coal1, alt: "Coal" },
    { src: IMG.beans, alt: "Beans and pulses" },
    { src: IMG.soybean, alt: "Soybean" },
    { src: IMG.moong, alt: "Green moong" },
    { src: IMG.cashew, alt: "Cashewnut kernel" },
    { src: IMG.cardamom, alt: "Cardamom" },
    { src: IMG.palmOil, alt: "Palm oil" },
    { src: IMG.sunflowerOil, alt: "Sunflower oil" },
    { src: IMG.consultancy, alt: "Project consultancy" },
  ];

  return (
    <div>
      <div style={{ background: "#10233F", color: "#F7F2E7", padding: "90px 0 76px" }}>
        <Frame wide>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, color: "#C9A227", letterSpacing: "0.06em" }}>
            Consignment no. GE-2022 &middot; Import / Export
          </p>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: "clamp(38px, 5.5vw, 64px)",
              lineHeight: 1.08,
              margin: "18px 0 22px",
              maxWidth: 720,
            }}
          >
            Empowering global trade with trust and quality.
          </h1>
          <p style={{ fontSize: 20, color: "#C7CCD6", maxWidth: 620, marginBottom: 36, lineHeight: 1.6 }}>
            Gyanav Exim Private Limited moves minerals, metals, agricultural
            commodities and edible oils across more than twenty countries, and
            builds the turnkey projects that support them.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => setPage("products")}
              style={{
                background: "#B5502D",
                color: "#F7F2E7",
                border: "none",
                padding: "16px 28px",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              View products
            </button>
            <button
              onClick={() => setPage("contact")}
              style={{
                background: "none",
                color: "#F7F2E7",
                border: "1px solid #4C5A73",
                padding: "16px 28px",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Email us: Sanjib.gyanav@gmail.com
            </button>
          </div>
        </Frame>
      </div>

      <Frame wide>
        <div style={{ padding: "64px 0 10px" }}>
          <Eyebrow>Cargo manifest</Eyebrow>
          <SectionTitle>What moves through our ports</SectionTitle>
          <Thumbs items={gallery} />
        </div>

        <div style={{ padding: "64px 0" }}>
          <Eyebrow>Product and services</Eyebrow>
          <SectionTitle>Four lines of trade</SectionTitle>
          <Manifest number="01" title="Minerals and metals" desc="We deal in all types of minerals and metals." />
          <Manifest number="02" title="Cargo logistics" desc="We deal in all types of dry and wet cargo." />
          <Manifest number="03" title="Agricultural commodities and edible oils" desc="We deal in all types of agricultural commodities and edible oils." />
          <Manifest number="04" title="Project consultancy" desc="We deal in all types of turn-key project consultancy." />
        </div>

        <div style={{ padding: "26px 0 64px" }}>
          <Eyebrow>Why us</Eyebrow>
          <SectionTitle>The case for working with Gyanav</SectionTitle>
          <div className="ge-why-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
            {[
              { img: IMG.why100, t: "100% results" },
              { img: IMG.whyCommit, t: "Fully committed" },
              { img: IMG.whyCost, t: "Cost effective" },
            ].map((w, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  border: "1px solid #DDD5C2",
                  padding: 22,
                }}
              >
                <img src={w.img} alt={w.t} style={{ width: 56, height: 56, objectFit: "contain" }} />
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "#10233F" }}>{w.t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "10px 0 76px" }}>
          <Eyebrow>Our satisfied customers</Eyebrow>
          <div style={{ border: "1px solid #DDD5C2", padding: "42px 28px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                textAlign: "center",
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 46px)", color: "#B5502D" }}>{countries}+</div>
                <div style={{ fontSize: 14, color: "#5c5a52", fontFamily: "'IBM Plex Mono', monospace" }}>Countries</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 46px)", color: "#B5502D" }}>{customers}+</div>
                <div style={{ fontSize: 14, color: "#5c5a52", fontFamily: "'IBM Plex Mono', monospace" }}>Customers</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 46px)", color: "#B5502D" }}>{projects}+</div>
                <div style={{ fontSize: 14, color: "#5c5a52", fontFamily: "'IBM Plex Mono', monospace" }}>Projects</div>
              </div>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}
