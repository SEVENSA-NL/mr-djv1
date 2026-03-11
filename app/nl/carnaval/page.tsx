import type { Metadata } from "next";
import { getEventTypeBySlug } from "@/src/data/event-types";
import EventTypeContent from "@/src/components/pages/EventTypeContent";

const eventType = getEventTypeBySlug("carnaval")!;

export const metadata: Metadata = {
  title: eventType.metaTitle,
  description: eventType.metaDescription,
  alternates: { canonical: "https://mr-dj.nl/nl/carnaval" },
};

export default function CarnavalPage() {
  return <EventTypeContent eventType={eventType} />;
}
