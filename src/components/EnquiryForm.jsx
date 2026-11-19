"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { company, enquiryCategories } from "../../lib/site-config";

const maxMessageLength = 5000;
const minimumPageTimeMs = 3000;
const cooldownMs = 30000;
const successMessage =
  "Thank you for contacting Gyanav Exim Private Limited. Your enquiry has been received. Our team will review your message and respond through the contact details provided.";

const initialForm = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  category: "",
  subject: "",
  message: "",
  consent: false,
  website: "",
};

function clean(value) {
  return value
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function validate(values) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.fullName) errors.fullName = "Enter your full name.";
  if (values.fullName.length > 120) errors.fullName = "Full name must be 120 characters or fewer.";
  if (!emailPattern.test(values.email) || values.email.length > 254) errors.email = "Enter a valid email address.";
  if (!enquiryCategories.includes(values.category)) errors.category = "Choose an enquiry category.";
  if (!values.subject) errors.subject = "Enter a subject.";
  if (values.subject.length > 200) errors.subject = "Subject must be 200 characters or fewer.";
  if (!values.message) errors.message = "Enter a message.";
  if (values.message.length > maxMessageLength) errors.message = `Message must be ${maxMessageLength} characters or fewer.`;
  if (values.companyName.length > 160) errors.companyName = "Company name must be 160 characters or fewer.";
  if (values.phone.length > 40) errors.phone = "Phone number must be 40 characters or fewer.";
  if (!values.consent) errors.consent = "Please provide consent to submit your enquiry.";
  return errors;
}

export default function EnquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const startedAt = useRef(null);
  const cooldownUntil = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
    const category = new URLSearchParams(window.location.search).get("category");
    if (category && enquiryCategories.includes(category)) {
      setForm((current) => ({ ...current, category }));
    }
  }, []);

  useEffect(() => {
    if (!cooldownSeconds) return undefined;
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((cooldownUntil.current - Date.now()) / 1000));
      setCooldownSeconds(remaining);
      if (!remaining) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldownSeconds > 0]);

  function update(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: undefined, form: undefined }));
  }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    if (Date.now() < cooldownUntil.current) {
      setErrors({ form: "Please wait before submitting another enquiry." });
      return;
    }

    const cleaned = {
      fullName: clean(form.fullName),
      companyName: clean(form.companyName),
      email: clean(form.email),
      phone: clean(form.phone),
      category: clean(form.category),
      subject: clean(form.subject),
      message: clean(form.message),
      consent: form.consent,
      website: clean(form.website),
    };
    const validationErrors = validate(cleaned);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }
    if (cleaned.website) {
      setErrors({ form: "We could not submit this enquiry. Please email us directly." });
      setStatus("error");
      return;
    }
    const elapsedMs = startedAt.current ? Date.now() - startedAt.current : 0;
    if (elapsedMs < minimumPageTimeMs) {
      setErrors({ form: "Please review your enquiry for a moment, then try submitting again." });
      setStatus("error");
      return;
    }

    cooldownUntil.current = Date.now() + cooldownMs;
    setCooldownSeconds(Math.ceil(cooldownMs / 1000));
    setStatus("sending");
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cleaned, elapsedMs }),
      });
      if (!response.ok) throw new Error("The enquiry service returned an error.");
      const result = await response.json();
      if (result?.status !== "success" || result?.accepted !== true) {
        throw new Error("The enquiry service did not confirm acceptance.");
      }
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setErrors({
        form: `We could not confirm that your enquiry was received. Please email ${company.email} directly.`,
      });
    }
  }

  if (status === "success") {
    return <div className="form-message form-message-success" role="status">{successMessage}</div>;
  }

  return (
    <form className="form-grid" onSubmit={submit} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          value={form.website}
          onChange={update}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid grid-2">
        <div className="field">
          <label htmlFor="fullName">Full Name <span aria-hidden="true">*</span></label>
          <input id="fullName" name="fullName" autoComplete="name" maxLength={120} required value={form.fullName} onChange={update} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
          {errors.fullName && <small id="fullName-error" className="field-error">{errors.fullName}</small>}
        </div>
        <div className="field">
          <label htmlFor="companyName">Company</label>
          <input id="companyName" name="companyName" autoComplete="organization" maxLength={160} value={form.companyName} onChange={update} aria-invalid={Boolean(errors.companyName)} />
          {errors.companyName && <small className="field-error">{errors.companyName}</small>}
        </div>
      </div>
      <div className="grid grid-2">
        <div className="field">
          <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required value={form.email} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <small id="email-error" className="field-error">{errors.email}</small>}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={update} aria-invalid={Boolean(errors.phone)} />
          {errors.phone && <small className="field-error">{errors.phone}</small>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="category">Enquiry Category <span aria-hidden="true">*</span></label>
        <select id="category" name="category" required value={form.category} onChange={update} aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? "category-error" : undefined}>
          <option value="">Select a category</option>
          {enquiryCategories.map((category) => <option value={category} key={category}>{category}</option>)}
        </select>
        {errors.category && <small id="category-error" className="field-error">{errors.category}</small>}
      </div>
      <div className="field">
        <label htmlFor="subject">Subject <span aria-hidden="true">*</span></label>
        <input id="subject" name="subject" maxLength={200} required value={form.subject} onChange={update} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} />
        {errors.subject && <small id="subject-error" className="field-error">{errors.subject}</small>}
      </div>
      <div className="field">
        <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
        <textarea id="message" name="message" maxLength={maxMessageLength} required value={form.message} onChange={update} aria-invalid={Boolean(errors.message)} aria-describedby="message-limit message-error" />
        <small id="message-limit">Maximum {maxMessageLength} characters.</small>
        {errors.message && <small id="message-error" className="field-error">{errors.message}</small>}
      </div>
      <label className="consent">
        <input name="consent" type="checkbox" checked={form.consent} onChange={update} aria-invalid={Boolean(errors.consent)} />
        <span>
          I consent under the Digital Personal Data Protection Act to Gyanav
          Exim Private Limited using the information I provide to respond to my
          enquiry, as described in the <Link href="/privacy-policy">Privacy Policy</Link>.
          <span aria-hidden="true"> *</span>
          {errors.consent && <small className="field-error consent-error">{errors.consent}</small>}
        </span>
      </label>
      {errors.form && (
        <div className="form-message form-message-error" role="alert">
          {errors.form}{" "}
          <a href={`mailto:${company.email}`}>Email {company.email}</a>
        </div>
      )}
      <div className="form-submit-row">
        <button className="button" type="submit" disabled={status === "sending" || cooldownSeconds > 0}>
          {status === "sending" ? "Sending enquiry…" : cooldownSeconds > 0 ? `Please wait ${cooldownSeconds}s` : "Submit enquiry"}
        </button>
        {status === "sending" && <span role="status" className="form-note">Submitting your enquiry securely.</span>}
      </div>
      <p className="form-note">Required fields are marked with an asterisk. Your enquiry is sent to our team for review.</p>
    </form>
  );
}
