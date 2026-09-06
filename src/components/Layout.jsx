import React from "react";

export function Frame({ children, wide }) {
  return (
    <div
      style={{
        maxWidth: wide ? 1200 : 920,
        margin: "0 auto",
        padding: "0 40px",
      }}
      className="ge-frame"
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }) {
  return (
    <p
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 15,
        letterSpacing: "0.06em",
        color: "#B5502D",
        margin: "0 0 8px",
      }}
    >
      {children}
    </p>
  );
}

export function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: "clamp(30px, 4vw, 44px)",
          color: "#10233F",
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {children}
      </h2>
      {sub && (
        <p style={{ color: "#5c5a52", fontSize: 18, marginTop: 10, maxWidth: 640 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function Manifest({ number, title, desc, children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1fr",
        columnGap: 20,
        padding: "34px 0",
        borderTop: "1px solid #DDD5C2",
      }}
    >
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 16,
          color: "#B5502D",
          paddingTop: 4,
        }}
      >
        {number}
      </div>
      <div>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 26,
            fontWeight: 600,
            color: "#10233F",
            margin: "0 0 8px",
          }}
        >
          {title}
        </h3>
        {desc && <p style={{ color: "#5c5a52", fontSize: 17, margin: "0 0 16px", maxWidth: 560, lineHeight: 1.6 }}>{desc}</p>}
        {children}
      </div>
    </div>
  );
}

export function Thumbs({ items }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((it, i) => (
        <figure key={i} style={{ margin: 0 }}>
          <div
            style={{
              aspectRatio: "1 / 1",
              overflow: "hidden",
              border: "1px solid #DDD5C2",
            }}
          >
            <img
              src={it.src}
              alt={it.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          </div>
          <figcaption
            style={{
              fontSize: 13,
              color: "#8a8677",
              marginTop: 6,
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            {it.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ListCol({ items, startAt = 1 }) {
  return (
    <ol
      start={startAt}
      style={{
        listStyle: "none",
        counterReset: `item ${startAt - 1}`,
        margin: 0,
        padding: 0,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: 32,
        rowGap: 14,
      }}
    >
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            counterIncrement: "item",
            fontSize: 17,
            color: "#2A2A26",
            display: "flex",
            gap: 10,
          }}
        >
          <span style={{ color: "#B5502D", fontFamily: "'IBM Plex Mono', monospace", fontSize: 15 }}>
            {String(startAt + i).padStart(2, "0")}
          </span>
          {it}
        </li>
      ))}
    </ol>
  );
}
