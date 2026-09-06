import React from "react";
import { Frame, Eyebrow, SectionTitle } from "../components/Layout";

export default function ReviewsPage() {
  return (
    <Frame wide>
      <div style={{ padding: "76px 0" }}>
        <Eyebrow>Word from the field</Eyebrow>
        <SectionTitle>Reviews</SectionTitle>
        <div
          style={{
            border: "1px dashed #C9BFA4",
            padding: "56px 28px",
            textAlign: "center",
            color: "#8a8677",
            fontSize: 17,
          }}
        >
          No reviews have been posted yet.
        </div>
      </div>
    </Frame>
  );
}
