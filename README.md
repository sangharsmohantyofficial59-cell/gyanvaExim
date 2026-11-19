# Gyanav Exim website

The website uses Next.js App Router. The seven primary routes are statically
rendered during the production build and are suitable for deployment on Vercel:
`/`, `/about`, `/why-us`, `/digital-solutions`, `/business-consultancy`,
`/global-trade`, and `/contact`. The former `/global-trade-contact` URL returns
a permanent 301 redirect to `/contact`. Legal-information pages, a custom 404
page, metadata routes for sitemap and robots, and shared navigation are also
included.

## Local development

```sh
npm install
npm run dev
```

For a production build and local production server:

```sh
npm run build
npm start
```

Set `CONTACT_SCRIPT_URL` and `CONTACT_SCRIPT_SECRET` in the local environment
or hosting provider. These are server-only variables; do not use a `NEXT_PUBLIC_`
prefix or commit their values. `.env.example` documents their names.

## Enquiry form setup

1. Create a Google Sheet for website enquiries.
2. In **Extensions → Apps Script**, use the server code in `docs/apps-script.gs`.
3. In Apps Script **Project Settings → Script Properties**, add `SPREADSHEET_ID`
   with the Sheet ID and `CONTACT_SECRET` with the same random secret configured
   as `CONTACT_SCRIPT_SECRET` in the website host. Optionally set
   `NOTIFICATION_EMAIL`; the default is the company email.
4. Deploy the script as a web app that executes as the owner and can be called
   by website visitors. Copy its `/exec` URL into `CONTACT_SCRIPT_URL` in the
   hosting environment.
5. Submit a test enquiry and verify the row, `New` status, timestamp, company
   notification, and customer acknowledgement. The browser only reports
   success after it reads the script's JSON acceptance response. If the
   deployed Apps Script does not permit a readable cross-origin response, the
   form reports failure and provides the direct email fallback.

The contact form sends submissions to the same-origin `/api/contact` route.
That server-only route validates the request and forwards it to Apps Script
with the shared secret; the secret and Apps Script URL are never sent to the
browser. Apps Script verifies the secret, validates submitted values, checks a
honeypot and minimum elapsed time, rate-limits repeat submissions by a one-way
email digest, writes a timestamped row, and sends notification and
acknowledgement emails. It does not write submitted values to logs. The website
has no database, admin login, or analytics.

## Enquiry backups

Accepted enquiries are kept in the configured Google Sheet and company inbox.
For a manual spreadsheet backup, open the Sheet and select **File → Download →
Microsoft Excel (.xlsx)** or **Comma-separated values (.csv)**. Store the copy
in an approved, access-controlled company location. See
[`docs/GOOGLE-SHEETS-BACKUP.md`](./docs/GOOGLE-SHEETS-BACKUP.md) for export and
restore notes. Confirm the backup schedule and retention period with the owner.

## Launch notes

- The Next.js pages are statically rendered; the form uses a small serverless
  `/api/contact` proxy to keep the Apps Script secret server-side. Next/Vercel
  applies the security headers in `next.config.mjs`.
- The existing product photographs are served from the company's current
  image host. Confirm those image URLs remain available before launch.
- Confirm the Apps Script endpoint, notification delivery, domain, DNS, HTTPS,
  backup procedure and privacy/legal copy before production.
- The repository does not include credentials. Never commit the Apps Script
  URL, spreadsheet ID, or other deployment credentials.
- Do not deploy until the open owner inputs and launch checks are resolved.
