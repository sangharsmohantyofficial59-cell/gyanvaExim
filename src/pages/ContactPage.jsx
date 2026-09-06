import React, { useState } from "react";
import { Frame, Eyebrow, SectionTitle } from "../components/Layout";
import { GOOGLE_SCRIPT_URL } from "../constants";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Enter your name";
    if (!form.mobile.trim()) errs.mobile = "Enter your mobile number";
    if (!form.email.trim()) errs.email = "Enter your email";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!GOOGLE_SCRIPT_URL) {
      // No CRM endpoint configured yet — still confirm to the visitor.
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: "Gyanavexim",
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          subject: form.subject,
          message: form.message,
          submittedAt: new Date().toISOString(),
        }),
      });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  };

  const field = {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 14px",
    fontSize: 17,
    border: "1px solid #C9BFA4",
    background: "#FFFDF7",
    fontFamily: "'IBM Plex Sans', sans-serif",
    marginTop: 8,
  };
  const label = { fontSize: 15, color: "#10233F", fontFamily: "'IBM Plex Mono', monospace" };

  return (
    <Frame wide>
      <div style={{ padding: "76px 0 90px" }}>
        <Eyebrow>Get in touch</Eyebrow>
        <SectionTitle>Contact us</SectionTitle>

        {status === "sent" ? (
          <div style={{ border: "1px solid #6E7A4E", padding: 28, color: "#4C5731", maxWidth: 560, fontSize: 17 }}>
            Message sent. We will get back to you shortly.
          </div>
        ) : (
          <form onSubmit={submit} style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={label}>Name *</label>
              <input style={field} value={form.name} onChange={update("name")} />
              {errors.name && <div style={{ color: "#B5502D", fontSize: 14, marginTop: 6 }}>{errors.name}</div>}
            </div>
            <div>
              <label style={label}>Mob. number *</label>
              <input style={field} value={form.mobile} onChange={update("mobile")} />
              {errors.mobile && <div style={{ color: "#B5502D", fontSize: 14, marginTop: 6 }}>{errors.mobile}</div>}
            </div>
            <div>
              <label style={label}>Email *</label>
              <input style={field} value={form.email} onChange={update("email")} />
              {errors.email && <div style={{ color: "#B5502D", fontSize: 14, marginTop: 6 }}>{errors.email}</div>}
            </div>
            <div>
              <label style={label}>Subject</label>
              <input style={field} value={form.subject} onChange={update("subject")} />
            </div>
            <div>
              <label style={label}>Message</label>
              <textarea style={{ ...field, minHeight: 130, resize: "vertical" }} value={form.message} onChange={update("message")} />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                alignSelf: "flex-start",
                background: "#B5502D",
                color: "#F7F2E7",
                border: "none",
                padding: "15px 30px",
                fontSize: 16,
                cursor: status === "sending" ? "default" : "pointer",
                opacity: status === "sending" ? 0.7 : 1,
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
            >
              {status === "sending" ? "Sending…" : "Submit"}
            </button>
            {status === "error" && (
              <div style={{ color: "#B5502D", fontSize: 15 }}>
                Something went wrong sending that. Please try again, or reach
                us directly on WhatsApp or email below.
              </div>
            )}
            {!GOOGLE_SCRIPT_URL && (
              <div style={{ color: "#8a8677", fontSize: 13, fontFamily: "'IBM Plex Mono', monospace" }}>
                CRM sheet not connected yet — see README.md to add your Google
                Apps Script URL.
              </div>
            )}
          </form>
        )}

        <div style={{ marginTop: 60, borderTop: "1px solid #DDD5C2", paddingTop: 36, display: "grid", gap: 24, fontSize: 17 }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#B5502D" }}>Regd. office</div>
            <p style={{ margin: "6px 0 0" }}>Flat no.159, Rose Apartment, Sector-18B, Dwarka, Southwest Delhi-110078</p>
          </div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#B5502D" }}>Branch office</div>
            <p style={{ margin: "6px 0 0" }}>Flat no. 106, B-Block, Pradhansahi, Sundarpada Janti Main Road, Bhubaneswar -751002</p>
          </div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#B5502D" }}>Email us</div>
            <p style={{ margin: "6px 0 0" }}>Sanjib.gyanav@gmail.com</p>
          </div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#B5502D" }}>WhatsApp us</div>
            <p style={{ margin: "6px 0 0" }}>+91 93107 37981</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}
