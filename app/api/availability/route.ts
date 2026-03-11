import { NextRequest, NextResponse } from "next/server";
import { unavailableDates } from "@/src/data/unavailable-dates";

function formatDateNL(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  const days = ["zo", "ma", "di", "wo", "do", "vr", "za"];
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
  ];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function findAlternatives(dateStr: string, count = 3): string[] {
  const date = new Date(dateStr + "T12:00:00");
  const unavailableSet = new Set(unavailableDates);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const alternatives: string[] = [];

  for (let offset = -14; offset <= 28 && alternatives.length < count * 2; offset++) {
    const candidate = new Date(date);
    candidate.setDate(candidate.getDate() + offset);
    if (offset === 0) continue;
    if (candidate <= today) continue;
    if (candidate.getDay() !== 6 && candidate.getDay() !== 5) continue;
    const iso = candidate.toISOString().split("T")[0];
    if (!unavailableSet.has(iso)) {
      alternatives.push(iso);
    }
  }

  return alternatives
    .sort((a, b) => Math.abs(new Date(a).getTime() - date.getTime()) - Math.abs(new Date(b).getTime() - date.getTime()))
    .slice(0, count);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Parameter 'date' is vereist." }, { status: 400 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Ongeldig datumformaat. Gebruik YYYY-MM-DD." }, { status: 400 });
  }

  const parsed = new Date(date + "T12:00:00");
  if (isNaN(parsed.getTime())) {
    return NextResponse.json({ error: "Ongeldige datum." }, { status: 400 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed <= today) {
    return NextResponse.json({ error: "Datum moet in de toekomst liggen." }, { status: 400 });
  }

  const isUnavailable = unavailableDates.includes(date);

  if (isUnavailable) {
    const alternatives = findAlternatives(date);
    return NextResponse.json({
      available: false,
      date,
      dateFormatted: formatDateNL(date),
      message: "Helaas, deze datum is al bezet.",
      alternatives: alternatives.map((d) => ({ date: d, formatted: formatDateNL(d) })),
    });
  }

  return NextResponse.json({
    available: true,
    date,
    dateFormatted: formatDateNL(date),
    message: "Goed nieuws! Mister DJ is beschikbaar op deze datum.",
  });
}
