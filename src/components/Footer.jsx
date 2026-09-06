import React from "react";
import { Frame } from "./Layout";
import { NAV, PAGE_PATHS } from "../constants";

export default function Footer({ setPage }) {
  return (
    <footer style={{ background: "#10233F", color: "#E8E2D2", marginTop: 70 }}>
      <Frame wide>
        <div style={{ padding: "56px 0 30px" }}>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 28,
              margin: "0 0 24px",
              color: "#F7F2E7",
            }}
          >
            Gyanav Exim Private Limited
          </p>
          <div
            className="ge-footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 26,
              fontSize: 16,
              color: "#B9BFC9",
              lineHeight: 1.6,
            }}
          >
            <div>
              <div style={{ color: "#C9A227", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, marginBottom: 8 }}>
                Regd. office
              </div>
              Flat no.159, Rose Apartment, Sector-18B, Dwarka, Southwest Delhi-110078
            </div>
            <div>
              <div style={{ color: "#C9A227", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, marginBottom: 8 }}>
                Branch office
              </div>
              Flat no. 106, B-Block, Pradhansahi, Sundarpada Janti Main Road, Bhubaneswar -751002
            </div>
            <div>
              <div style={{ color: "#C9A227", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, marginBottom: 8 }}>
                Reach us
              </div>
              Sanjib.gyanav@gmail.com <br />
              WhatsApp +91 93107 37981
            </div>
          </div>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 34, paddingTop: 24, borderTop: "1px solid #24365A" }}>
            {NAV.map((n) => (
              <a
                key={n.id}
                href={PAGE_PATHS[n.id]}
                onClick={(event) => {
                  event.preventDefault();
                  setPage(n.id);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#E8E2D2",
                  fontSize: 15,
                  textDecoration: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <p style={{ fontSize: 14, color: "#7C8494", marginTop: 26 }}>
            Copyright 2026 Gyanav Exim
          </p>
        </div>
      </Frame>
    </footer>
  );
}
