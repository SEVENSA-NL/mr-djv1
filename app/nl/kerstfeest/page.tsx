import type { Metadata } from "next";
import { getEventTypeBySlug } from "@/src/data/event-types";
import EventTypeContent from "@/src/components/pages/EventTypeContent";

const eventType = getEventTypeBySlug("kerstfeest")!;

export const metadata: Metadata = {
  title: eventType.metaTitle,
  description: eventType.metaDescription,
  alternates: { canonical: "https://mr-dj.nl/nl/kerstfeest" },
};

export default function KerstfeestPage() {
  return <EventTypeContent eventType={eventType} />;
}
