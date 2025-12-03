"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import posthog from "posthog-js";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Vul minimaal 2 tekens in")
    .max(100, "Naam mag maximaal 100 tekens bevatten"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  phone: z
    .string()
    .min(10, "Vul een geldig telefoonnummer in")
    .regex(/^[0-9+\-\s()]+$/, "Telefoonnummer mag alleen cijfers en +, -, (, ) bevatten"),
  eventDate: z
    .string()
    .min(1, "Selecteer je event datum")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Event datum moet in de toekomst liggen"),
  message: z
    .string()
    .min(10, "Beschrijf je aanvraag in minimaal 10 tekens")
    .max(1000, "Bericht is te lang"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

type SubmissionState = "idle" | "success" | "error";

type ContactFormProps = {
  className?: string;
};

export default function ContactForm({ className }: ContactFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", eventDate: "", message: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionError(null);
    setSubmissionState("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Ongeldige response: ${response.status}`);
      }

      // Track successful lead submission in PostHog
      try {
        posthog.capture("lead_submitted", {
          source: "contact_form",
          has_phone: true,
          has_event_date: true,
          field_count: 5,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.warn("PostHog tracking failed:", error);
      }

      reset();
      setSubmissionState("success");
    } catch (error) {
      console.error("contact form submission failed", error);
      setSubmissionState("error");
      setSubmissionError(
        "Het versturen van het formulier is niet gelukt. Probeer het later nog eens."
      );
    }
  });

  return (
    <section className={className} aria-live="polite">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Stuur ons een bericht</h2>
        <p className="mt-2 text-slate-600">
          Vul het formulier in en we nemen binnen één werkdag contact met je op om de
          mogelijkheden te bespreken.
        </p>
      </header>

      {submissionState === "success" ? (
        <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800" role="status">
          <p className="font-medium">
            Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.
          </p>
        </div>
      ) : null}

      {submissionState === "error" && submissionError ? (
        <p className="mb-6 rounded-lg bg-red-50 p-4 text-red-800" role="alert">
          {submissionError}
        </p>
      ) : null}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm font-medium text-slate-700">
            Naam
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 md:text-base"
            style={{ minHeight: "52px", fontSize: "16px" }}
          />
          {errors.name ? (
            <span className="text-sm text-red-600" role="alert">
              {errors.name.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium text-slate-700">
            E-mailadres
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 md:text-base"
            style={{ minHeight: "52px", fontSize: "16px" }}
          />
          {errors.email ? (
            <span className="text-sm text-red-600" role="alert">
              {errors.email.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className="text-sm font-medium text-slate-700">
            Telefoonnummer
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+31 6 12345678"
            {...register("phone")}
            aria-invalid={errors.phone ? "true" : "false"}
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 md:text-base"
            style={{ minHeight: "52px", fontSize: "16px" }}
          />
          {errors.phone ? (
            <span className="text-sm text-red-600" role="alert">
              {errors.phone.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-event-date" className="text-sm font-medium text-slate-700">
            Event Datum
          </label>
          <input
            id="contact-event-date"
            type="date"
            {...register("eventDate")}
            aria-invalid={errors.eventDate ? "true" : "false"}
            min={new Date().toISOString().split("T")[0]}
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 md:text-base"
            style={{ minHeight: "52px", fontSize: "16px" }}
          />
          {errors.eventDate ? (
            <span className="text-sm text-red-600" role="alert">
              {errors.eventDate.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-slate-700">
            Bericht
          </label>
          <textarea
            id="contact-message"
            rows={5}
            {...register("message")}
            aria-invalid={errors.message ? "true" : "false"}
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 md:text-base"
            style={{ minHeight: "120px", fontSize: "16px" }}
          />
          {errors.message ? (
            <span className="text-sm text-red-600" role="alert">
              {errors.message.message}
            </span>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ minHeight: "56px", fontSize: "16px" }}
        >
          {isSubmitting ? "Versturen..." : "Verstuur bericht"}
        </button>
      </form>
    </section>
  );
}
