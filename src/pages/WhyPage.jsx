import React from "react";
import { Frame, Eyebrow, SectionTitle } from "../components/Layout";

export default function WhyPage() {
  const paras = [
    "Firstly, let me thank you for visiting our website.",
    `Our company punch line is "quality products and services at an affordable price," and each person in our organization ensures they deliver their best, in turn making every customer believe in that line. I believe there is no shortcut to achieving business goals without values like morals, ethics and honesty. I strongly believe in hard work, in delivering promised work to the customer, and in giving preference to customer satisfaction as the route to business success. Our aim in building Gyanav Exim was to create an entity independent in every aspect of technical service and the supply of quality goods and materials at affordable prices.`,
    `We focus on growing our business in metals and minerals, agro commodities and edible oil, petroleum products, chemicals and fertilizers, and turnkey project consultancy, investing in the right people and advanced technology to grow our revenues and become a financially independent organization. Gyanav Exim always tries to deliver goods and services to international standards of quality, and to have the right solutions for small, medium and large companies looking to build long-term relationships with customers. We believe execution of turnkey projects starts from raw land, bankable projected financials and infrastructure development, through to product launch, corporate websites or portals, customized packaging and branding, and digital marketing, and we support our clients until their payback period. Before starting any work, our team analyzes the client's requirements and focuses on every aspect to ensure the best result at the right price. We ensure timely delivery and an honest commitment to every service we provide.`,
    "Once again, thank you for visiting our website and taking the time to read my thoughts. We look forward to a long-term business relationship.",
  ];
  return (
    <Frame wide>
      <div style={{ padding: "76px 0 76px" }}>
        <Eyebrow>A note from the founder</Eyebrow>
        <SectionTitle>Why us</SectionTitle>
        <div style={{ maxWidth: 700 }}>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: "#10233F", fontStyle: "italic" }}>
            Greetings,
          </p>
          {paras.map((p, i) => (
            <p key={i} style={{ fontSize: 18, color: "#3d3b34", lineHeight: 1.8 }}>
              {p}
            </p>
          ))}
          <div style={{ marginTop: 36, borderTop: "1px solid #DDD5C2", paddingTop: 24 }}>
            <p style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 22, color: "#10233F" }}>
              Sanjib Kumar Mohanty
            </p>
            <p style={{ margin: 0, color: "#5c5a52", fontSize: 16 }}>Founder and Chairman, Gyanav Exim Private Limited</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}
