import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { sendFormEmail, formatFormEmail, sendAutoResponder } from "@/src/lib/email";

const SUBMISSIONS_FILE = "/tmp/mr-dj-submissions.json";

function storeSubmission(data: Record<string, unknown>) {
  try {
    let submissions: Record<string, unknown>[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
      submissions = JSON.parse(raw);
    }
    submissions.push({ ...data, submittedAt: new Date().toISOString(), type: "opening-dance" });
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
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

  storeSubmission(body);

  const coupleNames = (body.coupleNames as string) || "Onbekend";
  const email = body.email as string | undefined;

  await sendFormEmail({
    subject: `Openingsdans-mix aanvraag: ${coupleNames}`,
    html: formatFormEmail("Openingsdans-mix", body),
    replyTo: email,
  });

  // Send autoresponder to customer
  if (email) {
    await sendAutoResponder({
      to: email,
      name: coupleNames,
      formType: "opening-dance",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Bedankt! Je openingsdans-mix aanvraag is ontvangen.",
  });
}
