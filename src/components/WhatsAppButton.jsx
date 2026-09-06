import React from "react";
import { WHATSAPP_NUMBER } from "../constants";

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hello Gyanav Exim, I would like to know more about your products and services.");
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: 26,
        right: 26,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        zIndex: 1000,
        textDecoration: "none",
      }}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#ffffff" aria-hidden="true">
        <path d="M16.001 3C9.101 3 3.5 8.6 3.5 15.5c0 2.34.63 4.53 1.73 6.42L3 29l7.27-2.19a12.44 12.44 0 0 0 5.73 1.4h.01c6.9 0 12.5-5.6 12.5-12.5S22.901 3 16.001 3zm0 22.7h-.01a10.2 10.2 0 0 1-5.2-1.42l-.37-.22-3.85 1.16 1.19-3.75-.24-.38a10.18 10.18 0 0 1-1.56-5.4c0-5.64 4.59-10.23 10.24-10.23 2.74 0 5.31 1.07 7.24 3.01a10.17 10.17 0 0 1 3 7.23c0 5.64-4.6 10.24-10.24 10.24zm5.6-7.66c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.69.16-.2.3-.79 1-.97 1.2-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.47-1.53-.91-.81-1.53-1.82-1.71-2.12-.18-.3-.02-.47.13-.62.14-.14.31-.36.47-.55.15-.18.2-.3.31-.51.1-.2.05-.38-.02-.53-.08-.15-.69-1.67-.95-2.28-.25-.6-.5-.52-.69-.53l-.59-.01c-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.53 0 1.5 1.09 2.94 1.24 3.14.15.2 2.15 3.28 5.2 4.6.73.31 1.3.5 1.74.64.73.23 1.4.2 1.92.12.59-.09 1.82-.74 2.08-1.46.26-.72.26-1.33.18-1.46-.08-.13-.28-.2-.59-.35z"/>
      </svg>
    </a>
  );
}
