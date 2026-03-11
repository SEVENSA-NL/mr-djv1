import nodemailer from "nodemailer";

/**
 * Email sending utility for Mr. DJ form submissions.
 *
 * Uses SMTP via nodemailer. Configure via environment variables:
 * - SMTP_HOST (default: localhost)
 * - SMTP_PORT (default: 587)
 * - SMTP_USER
 * - SMTP_PASS
 * - SMTP_FROM (default: noreply@mr-dj.nl)
 *
 * All forms send to info@mr-dj.nl with BCC to info@klokkersconsultancy.nl
 */

const TO_EMAIL = "info@mr-dj.nl";
const BCC_EMAIL = "info@klokkersconsultancy.nl";
const FROM_EMAIL = process.env.SMTP_FROM || "noreply@mr-dj.nl";

function getTransporter() {
  // If no SMTP credentials, use a JSON transport that logs (dev/fallback)
  if (!process.env.SMTP_HOST && !process.env.SMTP_USER) {
    return nodemailer.createTransport({
      jsonTransport: true,
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS || "",
        }
      : undefined,
  });
}

export interface EmailOptions {
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/**
 * Send email to info@mr-dj.nl (BCC: info@klokkersconsultancy.nl)
 * Returns true on success, false on failure (never throws).
 */
export async function sendFormEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const result = await transporter.sendMail({
      from: `"Mister DJ Website" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      bcc: BCC_EMAIL,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    // In dev/jsonTransport mode, log the email
    if (!process.env.SMTP_HOST) {
      console.log("[EMAIL] Dev mode - email would be sent:", options.subject);
    }

    return true;
  } catch (err) {
    console.error("[EMAIL] Failed to send:", err);
    return false;
  }
}

/**
 * Format form data as an HTML email body.
 */
export function formatFormEmail(
  formName: string,
  data: Record<string, unknown>,
): string {
  const rows = Object.entries(data)
    .filter(([key]) => key !== "type" && key !== "submittedAt")
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase())
        .trim();
      const val = Array.isArray(value)
        ? value.map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v))).join(", ")
        : typeof value === "object" && value !== null
          ? JSON.stringify(value, null, 2)
          : String(value ?? "-");
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#333;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555">${escapeHtml(val)}</td></tr>`;
    })
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#f9b537;padding:16px 24px;border-radius:8px 8px 0 0">
        <h2 style="margin:0;color:#000;font-size:18px">Nieuw formulier: ${escapeHtml(formName)}</h2>
      </div>
      <div style="background:#fff;padding:0;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse">${rows}</table>
      </div>
      <p style="color:#999;font-size:12px;margin-top:16px;text-align:center">
        Verzonden via mr-dj.nl op ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}
      </p>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type AutoResponderFormType = "contact" | "brochure" | "wedding-intake" | "opening-dance";

const autoResponderSubjects: Record<AutoResponderFormType, string> = {
  contact: "Bedankt voor je aanvraag bij Mister DJ!",
  brochure: "Je brochure van Mister DJ",
  "wedding-intake": "Bedankt voor het invullen van het intakeformulier!",
  "opening-dance": "Je openingsdans-aanvraag is ontvangen!",
};

const autoResponderMessages: Record<AutoResponderFormType, string> = {
  contact:
    "Bedankt voor je aanvraag! We hebben je bericht ontvangen en nemen binnen 24 uur persoonlijk contact met je op om de mogelijkheden te bespreken.",
  brochure:
    "Leuk dat je onze feestgids hebt aangevraagd! Hierin vind je een overzicht van onze pakketten, prijzen en sfeerbeelden. Heb je vragen? Neem gerust contact op.",
  "wedding-intake":
    "Super dat jullie het intakeformulier hebben ingevuld! We gaan alle wensen doornemen en plannen binnenkort een vrijblijvend kennismakingsgesprek in.",
  "opening-dance":
    "Wat leuk dat jullie een openingsdans willen! We gaan ermee aan de slag en nemen contact op om de details te bespreken.",
};

const autoResponderNextSteps: Record<AutoResponderFormType, string> = {
  contact:
    "Binnen 24 uur nemen we persoonlijk contact op. In de tussentijd kun je alvast onze feestgids bekijken voor een overzicht van onze pakketten.",
  brochure:
    "Heb je vragen over de pakketten? Plan een vrijblijvend kennismakingsgesprek in — we bespreken graag jullie wensen.",
  "wedding-intake":
    "We plannen binnen 48 uur een kennismakingsgesprek in. Tip: bekijk alvast onze muziekchecklist op ons blog voor inspiratie.",
  "opening-dance":
    "Binnen 48 uur nemen we contact op om de details te bespreken. Tip: bekijk populaire openingsdans-nummers op ons blog.",
};

/**
 * Send a branded autoresponder email to the customer after form submission.
 */
export async function sendAutoResponder(options: {
  to: string;
  name: string;
  formType: AutoResponderFormType;
}): Promise<boolean> {
  const { to, name, formType } = options;
  const displayName = name || "daar";
  const subject = autoResponderSubjects[formType];
  const message = autoResponderMessages[formType];
  const nextSteps = autoResponderNextSteps[formType];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#f9b537;padding:20px 24px;border-radius:8px 8px 0 0;text-align:center">
        <h1 style="margin:0;color:#000;font-size:22px;font-weight:700">Mister DJ</h1>
        <p style="margin:4px 0 0;color:#333;font-size:13px">De feestspecialist van het Zuiden</p>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #e5e5e5;border-top:none">
        <p style="margin:0 0 16px;color:#333;font-size:15px">Hoi ${escapeHtml(displayName)},</p>
        <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6">${escapeHtml(message)}</p>
        <div style="background:#F0F9FF;border:1px solid #BAE6FD;border-radius:8px;padding:16px;margin:16px 0">
          <p style="margin:0;color:#0369A1;font-size:13px;font-weight:600">Wat nu?</p>
          <p style="margin:8px 0 0;color:#0C4A6E;font-size:13px;line-height:1.5">${escapeHtml(nextSteps)}</p>
        </div>
        <div style="text-align:center;margin:20px 0">
          <a href="https://mr-dj.nl/nl/contact" style="display:inline-block;background:#f9b537;color:#000;font-weight:700;font-size:13px;padding:12px 28px;border-radius:50px;text-decoration:none">Bekijk onze website</a>
        </div>
        <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:16px;margin:16px 0">
          <p style="margin:0;color:#92400E;font-size:13px;font-weight:600">Onze contactgegevens:</p>
          <p style="margin:8px 0 0;color:#78350F;font-size:13px">
            Tel: <a href="tel:+31408422594" style="color:#D97706">040-8422594</a><br/>
            E-mail: <a href="mailto:info@mr-dj.nl" style="color:#D97706">info@mr-dj.nl</a><br/>
            WhatsApp: <a href="https://api.whatsapp.com/send?phone=31620383638" style="color:#D97706">06-20383638</a><br/>
            Adres: Kapteijnlaan 17, 5505 AV Veldhoven
          </p>
        </div>
        <p style="margin:16px 0 0;color:#555;font-size:14px">
          Met feestelijke groet,<br/>
          <strong>Het team van Mister DJ</strong>
        </p>
      </div>
      <div style="padding:16px;text-align:center">
        <p style="color:#999;font-size:11px;margin:0">
          <a href="https://mr-dj.nl" style="color:#D97706">mr-dj.nl</a> ·
          <a href="https://www.facebook.com/mrdj.nl/" style="color:#999">Facebook</a> ·
          <a href="https://www.instagram.com/mr_dj.nl/" style="color:#999">Instagram</a>
        </p>
      </div>
    </div>
  `;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Mister DJ" <${FROM_EMAIL}>`,
      to,
      replyTo: TO_EMAIL,
      subject,
      html,
      text: `Hoi ${displayName},\n\n${message}\n\nTelefoon: 040-8422594\nE-mail: info@mr-dj.nl\nWhatsApp: 06-20383638\nAdres: Kapteijnlaan 17, 5505 AV Veldhoven\n\nMet feestelijke groet,\nHet team van Mister DJ\nhttps://mr-dj.nl`,
    });

    if (!process.env.SMTP_HOST) {
      console.log("[EMAIL] Dev mode - autoresponder would be sent to:", to);
    }

    return true;
  } catch (err) {
    console.error("[EMAIL] Autoresponder failed:", err);
    return false;
  }
}
