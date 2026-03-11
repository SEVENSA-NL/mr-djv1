import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join("/tmp", "mr-dj-verzoeknummers.json");

interface Verzoeknummer {
  naam: string;
  nummer: string;
  bericht: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const naam = String(body.naam || "").trim().slice(0, 100);
    const nummer = String(body.nummer || "").trim().slice(0, 200);
    const bericht = String(body.bericht || "").trim().slice(0, 500);

    if (!naam || !nummer) {
      return NextResponse.json({ error: "Naam en nummer zijn verplicht" }, { status: 400 });
    }

    const entry: Verzoeknummer = {
      naam,
      nummer,
      bericht,
      timestamp: new Date().toISOString(),
    };

    let existing: Verzoeknummer[] = [];
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      existing = JSON.parse(raw);
    } catch {
      // File doesn't exist yet
    }

    existing.push(entry);
    await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Er ging iets mis" }, { status: 500 });
  }
}
