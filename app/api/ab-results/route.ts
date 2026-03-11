import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

const RESULTS_FILE = "/tmp/mr-dj-ab-results.json";

interface ABEvent {
  experimentId: string;
  variantId: string;
  type: "impression" | "conversion";
  conversionType?: string;
  timestamp: string;
  sessionId: string;
}

interface ExperimentResults {
  experimentId: string;
  variants: Record<
    string,
    {
      impressions: number;
      conversions: number;
      conversionRate: number;
    }
  >;
}

/**
 * POST: Record an A/B test event (impression or conversion)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { experimentId, variantId, type, conversionType, sessionId } = body as {
      experimentId?: string;
      variantId?: string;
      type?: string;
      conversionType?: string;
      sessionId?: string;
    };

    if (!experimentId || !variantId || !type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const event: ABEvent = {
      experimentId,
      variantId,
      type: type as "impression" | "conversion",
      conversionType,
      timestamp: new Date().toISOString(),
      sessionId: sessionId || "unknown",
    };

    let events: ABEvent[] = [];
    try {
      if (fs.existsSync(RESULTS_FILE)) {
        events = JSON.parse(fs.readFileSync(RESULTS_FILE, "utf-8"));
      }
    } catch {
      events = [];
    }

    events.push(event);

    // Keep only last 10000 events to prevent unbounded growth
    if (events.length > 10000) {
      events = events.slice(-10000);
    }

    fs.writeFileSync(RESULTS_FILE, JSON.stringify(events, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 },
    );
  }
}

/**
 * GET: Retrieve aggregated A/B test results
 * Requires admin key header.
 */
export async function GET(request: NextRequest) {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== "mrdj-admin-2026") {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  let events: ABEvent[] = [];
  try {
    if (fs.existsSync(RESULTS_FILE)) {
      events = JSON.parse(fs.readFileSync(RESULTS_FILE, "utf-8"));
    }
  } catch {
    events = [];
  }

  // Aggregate by experiment using plain objects
  const byExperiment: Record<string, Record<string, { impressions: number; conversions: number }>> = {};

  for (const event of events) {
    if (!byExperiment[event.experimentId]) {
      byExperiment[event.experimentId] = {};
    }
    const variants = byExperiment[event.experimentId];
    if (!variants[event.variantId]) {
      variants[event.variantId] = { impressions: 0, conversions: 0 };
    }
    const stats = variants[event.variantId];
    if (event.type === "impression") stats.impressions++;
    if (event.type === "conversion") stats.conversions++;
  }

  const results: ExperimentResults[] = [];
  for (const experimentId of Object.keys(byExperiment)) {
    const variants = byExperiment[experimentId];
    const variantResults: ExperimentResults["variants"] = {};
    for (const variantId of Object.keys(variants)) {
      const stats = variants[variantId];
      variantResults[variantId] = {
        ...stats,
        conversionRate: stats.impressions > 0
          ? Math.round((stats.conversions / stats.impressions) * 10000) / 100
          : 0,
      };
    }
    results.push({ experimentId, variants: variantResults });
  }

  return NextResponse.json({
    success: true,
    totalEvents: events.length,
    experiments: results,
  });
}
