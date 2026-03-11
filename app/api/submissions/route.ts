import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

const SUBMISSIONS_FILE = "/tmp/mr-dj-submissions.json";
const ADMIN_KEY = "mrdj-admin-2026";

export async function GET(request: NextRequest) {
  const authKey = request.headers.get("x-admin-key");
  if (authKey !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      return NextResponse.json({ submissions: [], count: 0 });
    }
    const raw = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    const submissions = JSON.parse(raw);
    return NextResponse.json({ submissions, count: submissions.length });
  } catch {
    return NextResponse.json({ error: "Kon submissions niet laden." }, { status: 500 });
  }
}
