import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { sendFormEmail, formatFormEmail, sendAutoResponder } from "@/src/lib/email";

const SUBMISSIONS_FILE = "/tmp/mr-dj-submissions.json";
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 50) return false;
  entry.count++;
  return true;
}

function storeSubmission(data: Record<string, unknown>) {
  try {
    let submissions: Record<string, unknown>[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
      submissions = JSON.parse(raw);
    }
    submissions.push({ ...data, submittedAt: new Date().toISOString(), type: "contact" });
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
  } catch {
    // silently fail storage
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (!getRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Te veel aanvragen. Probeer het later opnieuw." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Ongeldig verzoek." },
      { status: 400 }
    );
  }

  const { fullName, email, eventType } = body as {
    fullName?: string;
    email?: string;
    eventType?: string;
  };

  if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
    return NextResponse.json(
      { success: false, error: "Naam is verplicht (minimaal 2 tekens)." },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { success: false, error: "Een geldig e-mailadres is verplicht." },
      { status: 400 }
    );
  }

  if (!eventType) {
    return NextResponse.json(
      { success: false, error: "Type feest is verplicht." },
      { status: 400 }
    );
  }

  storeSubmission(body);

  // Send email to info@mr-dj.nl (BCC: info@klokkersconsultancy.nl)
  await sendFormEmail({
    subject: `Nieuw contactformulier: ${fullName} - ${eventType}`,
    html: formatFormEmail("Contactformulier", body),
    replyTo: email,
  });

  // Send autoresponder to customer
  await sendAutoResponder({
    to: email,
    name: fullName,
    formType: "contact",
  });

  return NextResponse.json({
    success: true,
    message: "Bedankt! We nemen binnen 24 uur contact op.",
  });
}
