const ENQUIRY_CATEGORIES = [
  "Digital Solutions",
  "Business Consultancy",
  "Agricultural commodity partnership",
  "Mineral/industrial material partnership",
  "International sourcing",
  "Buyer enquiry",
  "Supplier enquiry",
  "Strategic partnership",
  "Other",
];

const FIELD_LIMITS = {
  fullName: 120,
  companyName: 160,
  email: 254,
  phone: 40,
  category: 100,
  subject: 200,
  message: 5000,
};

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse(event.postData.contents);
    const configuredSecret = PropertiesService.getScriptProperties().getProperty("CONTACT_SECRET");
    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      !constantTimeEquals(body.secret, configuredSecret)
    ) {
      return jsonResponse({ status: "failure", accepted: false });
    }
    const enquiry = validateEnquiry(body);
    if (enquiry.website) return jsonResponse({ status: "failure", accepted: false });
    const elapsedMs = Number(enquiry.elapsedMs);
    if (!Number.isFinite(elapsedMs) || elapsedMs < 3000) {
      return jsonResponse({ status: "failure", accepted: false });
    }

    const cache = CacheService.getScriptCache();
    const emailDigest = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      enquiry.email.toLowerCase(),
    ).map(function (byte) {
      return ("0" + (byte & 255).toString(16)).slice(-2);
    }).join("");
    const rateLimitKey = "enquiry:" + emailDigest;
    if (cache.get(rateLimitKey)) {
      return jsonResponse({ status: "failure", accepted: false });
    }

    lock.waitLock(10000);
    if (cache.get(rateLimitKey)) {
      lock.releaseLock();
      return jsonResponse({ status: "failure", accepted: false });
    }
    cache.put(rateLimitKey, "1", 60);
    const properties = PropertiesService.getScriptProperties();
    const spreadsheetId = properties.getProperty("SPREADSHEET_ID");
    const notificationEmail = properties.getProperty("NOTIFICATION_EMAIL") || "Sanjib.gyanav@gmail.com";
    if (!spreadsheetId) throw new Error("Missing required spreadsheet configuration.");

    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Full Name", "Company", "Email", "Phone",
        "Category", "Subject", "Message", "Consent", "Status",
      ]);
    }
    const now = new Date();
    sheet.appendRow([
      now,
      sheetSafe(enquiry.fullName),
      sheetSafe(enquiry.companyName),
      sheetSafe(enquiry.email),
      sheetSafe(enquiry.phone),
      sheetSafe(enquiry.category),
      sheetSafe(enquiry.subject),
      sheetSafe(enquiry.message),
      true,
      "New",
    ]);

    MailApp.sendEmail({
      to: notificationEmail,
      subject: "New website enquiry: " + enquiry.category,
      htmlBody: buildNotificationEmail(enquiry, now),
      body: [
        "A new website enquiry has been received.",
        "Name: " + enquiry.fullName,
        "Company: " + enquiry.companyName,
        "Email: " + enquiry.email,
        "Phone: " + enquiry.phone,
        "Category: " + enquiry.category,
        "Subject: " + enquiry.subject,
        "",
        enquiry.message,
      ].join("\n"),
      replyTo: enquiry.email,
    });

    const acknowledgement =
      "Thank you for contacting Gyanav Exim Private Limited. Your enquiry has been received. Our team will review your message and respond through the contact details provided.";
    MailApp.sendEmail({
      to: enquiry.email,
      subject: "We received your enquiry | Gyanav Exim Private Limited",
      body: acknowledgement,
      htmlBody: "<p>" + escapeHtml(acknowledgement) + "</p>",
      replyTo: notificationEmail,
    });

    return jsonResponse({ status: "success", accepted: true });
  } catch (error) {
    console.error("Enquiry processing failed.");
    return jsonResponse({ status: "failure", accepted: false });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function constantTimeEquals(candidate, expected) {
  if (typeof candidate !== "string" || typeof expected !== "string" || !expected) {
    return false;
  }
  let difference = candidate.length ^ expected.length;
  const length = Math.max(candidate.length, expected.length);
  for (let index = 0; index < length; index++) {
    difference |= (candidate.charCodeAt(index) || 0) ^ (expected.charCodeAt(index) || 0);
  }
  return difference === 0;
}

function validateEnquiry(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Invalid request.");
  }
  const enquiry = {
    fullName: cleanText(body.fullName),
    companyName: cleanText(body.companyName),
    email: cleanText(body.email).toLowerCase(),
    phone: cleanText(body.phone),
    category: cleanText(body.category),
    subject: cleanText(body.subject),
    message: cleanText(body.message),
    consent: body.consent === true,
    website: cleanText(body.website),
    elapsedMs: body.elapsedMs,
  };
  Object.keys(FIELD_LIMITS).forEach(function (field) {
    if (enquiry[field].length > FIELD_LIMITS[field]) {
      throw new Error("Field exceeds its allowed length.");
    }
  });
  if (!enquiry.fullName || !enquiry.subject || !enquiry.message || !enquiry.consent) {
    throw new Error("Required information is missing.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    throw new Error("Invalid email address.");
  }
  if (ENQUIRY_CATEGORIES.indexOf(enquiry.category) === -1) {
    throw new Error("Invalid enquiry category.");
  }
  return enquiry;
}

function cleanText(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function sheetSafe(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[character];
  });
}

function buildNotificationEmail(enquiry, receivedAt) {
  return [
    "<p>A new website enquiry has been received.</p>",
    "<p><strong>Received:</strong> " + escapeHtml(receivedAt.toISOString()) + "</p>",
    "<p><strong>Name:</strong> " + escapeHtml(enquiry.fullName) + "</p>",
    "<p><strong>Company:</strong> " + escapeHtml(enquiry.companyName) + "</p>",
    "<p><strong>Email:</strong> " + escapeHtml(enquiry.email) + "</p>",
    "<p><strong>Phone:</strong> " + escapeHtml(enquiry.phone) + "</p>",
    "<p><strong>Category:</strong> " + escapeHtml(enquiry.category) + "</p>",
    "<p><strong>Subject:</strong> " + escapeHtml(enquiry.subject) + "</p>",
    "<p><strong>Message:</strong><br>" + escapeHtml(enquiry.message).replace(/\n/g, "<br>") + "</p>",
  ].join("");
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
