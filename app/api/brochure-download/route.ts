import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { sendFormEmail, formatFormEmail, sendAutoResponder } from "@/src/lib/email";

const LEADS_FILE = "/tmp/mr-dj-brochure-leads.json";

function storeLead(data: Record<string, unknown>) {
  try {
    let leads: Record<string, unknown>[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, "utf-8");
      leads = JSON.parse(raw);
    }
    leads.push({ ...data, submittedAt: new Date().toISOString() });
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch {
    // silently fail
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Ongeldig verzoek." }, { status: 400 });
  }

  const { name, email } = body as { name?: string; email?: string };

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ success: false, error: "Een geldig e-mailadres is verplicht." }, { status: 400 });
  }

  storeLead({ name: name || "", email });

  await sendFormEmail({
    subject: `Brochure download: ${name || "Onbekend"} (${email})`,
    html: formatFormEmail("Brochure Download", { naam: name || "-", email }),
    replyTo: email,
  });

  // Send autoresponder to customer
  await sendAutoResponder({
    to: email,
    name: (name as string) || "",
    formType: "brochure",
  });

  return NextResponse.json({
    success: true,
    downloadUrl: "/downloads/mister-dj-feestgids.pdf",
  });
}
