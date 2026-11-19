import { NextRequest, NextResponse } from "next/server";
import { enquiryCategories } from "../../../../lib/site-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fieldLimits = {
  fullName: 120,
  companyName: 160,
  email: 254,
  phone: 40,
  category: 100,
  subject: 200,
  message: 5000,
};

function jsonResponse(body: object, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown) {
  return typeof value === "string"
    ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : "";
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0].trim() ||
    request.headers.get("host");
  const protocol =
    request.headers.get("x-forwarded-proto")?.split(",")[0].trim() ||
    new URL(request.url).protocol.slice(0, -1);

  if (!origin || !host) return false;

  try {
    const parsedOrigin = new URL(origin);
    return parsedOrigin.host === host && parsedOrigin.protocol === `${protocol}:`;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return jsonResponse({ status: "failure", accepted: false }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_768) {
    return jsonResponse({ status: "failure", accepted: false }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ status: "failure", accepted: false }, 400);
  }
  if (!isRecord(body)) {
    return jsonResponse({ status: "failure", accepted: false }, 400);
  }

  const scriptUrl = process.env.CONTACT_SCRIPT_URL?.trim();
  const secret = process.env.CONTACT_SCRIPT_SECRET?.trim();
  if (!scriptUrl || !secret) {
    return jsonResponse({ status: "failure", accepted: false }, 503);
  }

  let endpoint: URL;
  try {
    endpoint = new URL(scriptUrl);
  } catch {
    return jsonResponse({ status: "failure", accepted: false }, 503);
  }
  if (
    endpoint.protocol !== "https:" ||
    endpoint.hostname !== "script.google.com" ||
    !/^\/macros\/s\/[^/]+\/exec\/?$/.test(endpoint.pathname)
  ) {
    return jsonResponse({ status: "failure", accepted: false }, 503);
  }

  const enquiry = {
    fullName: cleanText(body.fullName),
    companyName: cleanText(body.companyName),
    email: cleanText(body.email),
    phone: cleanText(body.phone),
    category: cleanText(body.category),
    subject: cleanText(body.subject),
    message: cleanText(body.message),
    consent: body.consent === true,
    website: cleanText(body.website),
    elapsedMs: Number(body.elapsedMs),
  };
  if (
    !enquiry.fullName ||
    enquiry.fullName.length > fieldLimits.fullName ||
    enquiry.companyName.length > fieldLimits.companyName ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) ||
    enquiry.email.length > fieldLimits.email ||
    enquiry.phone.length > fieldLimits.phone ||
    !enquiryCategories.includes(enquiry.category) ||
    enquiry.category.length > fieldLimits.category ||
    !enquiry.subject ||
    enquiry.subject.length > fieldLimits.subject ||
    !enquiry.message ||
    enquiry.message.length > fieldLimits.message ||
    !enquiry.consent ||
    enquiry.website ||
    !Number.isFinite(enquiry.elapsedMs) ||
    enquiry.elapsedMs < 3000
  ) {
    return jsonResponse({ status: "failure", accepted: false }, 400);
  }

  let scriptResponse: Response;
  try {
    scriptResponse = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...enquiry, secret }),
    });
  } catch {
    return jsonResponse({ status: "failure", accepted: false }, 502);
  }

  let result: unknown;
  try {
    result = await scriptResponse.json();
  } catch {
    return jsonResponse({ status: "failure", accepted: false }, 502);
  }
  if (
    !scriptResponse.ok ||
    !isRecord(result) ||
    result.status !== "success" ||
    result.accepted !== true
  ) {
    return jsonResponse({ status: "failure", accepted: false }, 502);
  }

  return jsonResponse({ status: "success", accepted: true }, 200);
}
