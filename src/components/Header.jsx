import React, { useState } from "react";
import { Frame } from "./Layout";
import { NAV, IMG, PAGE_PATHS } from "../constants";

export default function Header({ page, setPage }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ borderBottom: "1px solid #DDD5C2", background: "#F7F2E7" }}>
      <Frame wide>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 0",
          }}
        >
          <button
            onClick={() => setPage("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img src={IMG.logo} alt="Gyanav Exim" style={{ height: 52, width: "auto" }} />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 600,
                  fontSize: 24,
                  color: "#10233F",
                  lineHeight: 1.1,
                }}
              >
                Gyanav Exim
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 13,
                  color: "#B5502D",
                  letterSpacing: "0.04em",
                }}
              >
                Private Limited
              </div>
            </div>
          </button>

          <nav className="ge-desktop-nav" style={{ display: "none", alignItems: "center", gap: 4 }}>
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
                  padding: "10px 14px",
                  fontSize: 16,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  color: page === n.id ? "#B5502D" : "#10233F",
                  borderBottom: page === n.id ? "2px solid #B5502D" : "2px solid transparent",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="ge-menu-btn"
            style={{
              background: "none",
              border: "1px solid #10233F",
              padding: "10px 18px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 14,
              cursor: "pointer",
              color: "#10233F",
            }}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Frame>
      {open && (
        <div className="ge-menu-btn" style={{ borderTop: "1px solid #DDD5C2", background: "#F1EADA" }}>
          <Frame wide>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={PAGE_PATHS[n.id]}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(n.id);
                    setOpen(false);
                  }}
                  style={{
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid #DDD5C2",
                    padding: "18px 0",
                    fontSize: 18,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    color: page === n.id ? "#B5502D" : "#10233F",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </Frame>
        </div>
      )}
    </header>
  );
}
