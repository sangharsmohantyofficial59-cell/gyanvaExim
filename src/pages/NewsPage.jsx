import React from "react";
import { Frame, Eyebrow, SectionTitle } from "../components/Layout";

export default function NewsPage() {
  return (
    <Frame wide>
      <div style={{ padding: "76px 0" }}>
        <Eyebrow>Log</Eyebrow>
        <SectionTitle>News, events and blogs</SectionTitle>
        <div
          style={{
            border: "1px dashed #C9BFA4",
            padding: "56px 28px",
            textAlign: "center",
            color: "#8a8677",
            fontSize: 17,
          }}
        >
          Nothing has been logged here yet. Check back for updates on
          shipments, partnerships and industry notes.
        </div>
      </div>
    </Frame>
  );
}
