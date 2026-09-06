# Gyanav Exim — React replica

A from-scratch React rebuild of gyanavexim.com, covering every page:
Home, About us, Products, Services, Why us, News/Events/Blogs, Reviews,
Contact us.

## Run it

    npm install
    npm run dev

## Build for production

    npm run build

## WhatsApp button

A floating WhatsApp button is already wired up in `src/App.jsx` (the
`WHATSAPP_NUMBER` constant, currently `919310737981`). Tapping it opens
a chat with a pre-filled message. Change the number there if it ever
changes.

## Contact form -> Google Sheet CRM

The contact form can log every submission straight into a Google Sheet,
which works as a simple, free CRM. Takes about 5 minutes to set up:

1. Create a new Google Sheet. Add a header row: `Timestamp | Name | Mobile | Email | Subject | Message`.
2. In the sheet, open **Extensions -> Apps Script**.
3. Replace the default code with:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.mobile || "",
    data.email || "",
    data.subject || "",
    data.message || "",
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Deploy -> New deployment**. Choose type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Deploy, and copy the web app URL it gives you (ends in `/exec`).
6. Paste that URL into `src/App.jsx`, in the `GOOGLE_SCRIPT_URL` constant
   near the top of the file:

```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
```

7. Rebuild (`npm run build`) or restart the dev server. Every contact
   form submission now lands as a new row in your sheet, in real time.

If `GOOGLE_SCRIPT_URL` is left blank, the form still validates and
shows a confirmation to the visitor -- it just will not be logged
anywhere.

Note: Apps Script web apps only accept POST requests in `no-cors` mode
from the browser, so the app cannot read a success/failure response
body back -- it treats "no network error" as success, which is normal
for this pattern.
