import type { Metadata } from "next";
import { getEventTypeBySlug } from "@/src/data/event-types";
import EventTypeContent from "@/src/components/pages/EventTypeContent";

const eventType = getEventTypeBySlug("verjaardag")!;

export const metadata: Metadata = {
  title: eventType.metaTitle,
  description: eventType.metaDescription,
  alternates: { canonical: "https://mr-dj.nl/nl/verjaardag" },
};

export default function VerjaardagPage() {
  return <EventTypeContent eventType={eventType} />;
}
