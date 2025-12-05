import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Button from "./Button";
import { getJSON, removeItem, setJSON } from "../lib/storage";

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
const STORAGE_KEY = "availabilityCheckerForm";

const DEFAULT_API_PATH = "/availability/check";
const RELATIVE_FALLBACK_PATH = `/api${DEFAULT_API_PATH}`;

function resolveApiBaseUrl() {
  if (typeof window !== "undefined") {
    const fromWindow =
      window.__MR_DJ_API_BASE_URL || window.MR_DJ_API_BASE_URL || window.API_BASE_URL || null;
    if (typeof fromWindow === "string" && fromWindow.trim()) {
      return fromWindow.trim();
    }
  }

  if (typeof import.meta !== "undefined" && import.meta?.env?.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  return "";
}

function buildAvailabilityEndpoint() {
  const baseUrl = resolveApiBaseUrl();
  const path = DEFAULT_API_PATH;

  if (!baseUrl) {
    return RELATIVE_FALLBACK_PATH;
  }

  const trimmedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${trimmedBase}${path}`;
}

function pushDataLayerEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }

  try {
    window.dataLayer.push({ event, ...payload });
  } catch (error) {
    console.warn("Unable to push availability event to the dataLayer", error);
  }
}

function resolvePageContext() {
  if (!isBrowser) {
    return { pageUri: null, pageName: null };
  }

  return {
    pageUri: window.location.href,
    pageName: document.title || "Mister DJ",
  };
}

// Deduplication cache to prevent overlapping availability requests
const pendingAvailabilityRequests = new Map<string, Promise<AvailabilityResponse>>();

interface AvailabilityRequest {
  email: string;
  eventDate: string;
  marketingConsent: boolean;
  statisticsConsent: boolean;
  pageUri: string | null;
  pageName: string | null;
}

interface AvailabilityResponse {
  success: boolean;
  queued: boolean;
  message: string;
  sevensa?: {
    delivered?: boolean;
    queued?: boolean;
    queueSize?: number;
    reason?: string | null;
    lastError?: string | null;
  } | null;
}

const submitAvailabilityRequest = async (
  payload: AvailabilityRequest
): Promise<AvailabilityResponse> => {
  const endpoint = buildAvailabilityEndpoint();
  const cacheKey = JSON.stringify({ email: payload.email, eventDate: payload.eventDate });

  if (pendingAvailabilityRequests.has(cacheKey)) {
    return pendingAvailabilityRequests.get(cacheKey)!;
  }

  const requestPromise = (async () => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const bodyText = await response.text();
      let body: Partial<AvailabilityResponse> = {};
      if (bodyText) {
        try {
          body = JSON.parse(bodyText);
        } catch (parseError) {
          console.warn("Kon antwoord van beschikbaarheidscheck niet parsen", parseError);
        }
      }

      if (!response.ok && response.status !== 202) {
        const errorMessage = body?.message || "Er ging iets mis";
        throw new Error(errorMessage);
      }

      return {
        success: Boolean(body?.success || response.ok),
        queued: Boolean(body?.queued),
        message:
          body?.message ||
          (response.status === 202
            ? "We hebben je aanvraag ontvangen. Een specialist neemt binnen 24 uur contact op."
            : "Beschikbaarheid gecontroleerd! We nemen contact op via e-mail."),
        sevensa: body?.sevensa || null,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Er ging iets mis bij het versturen van je aanvraag"
      );
    } finally {
      pendingAvailabilityRequests.delete(cacheKey);
    }
  })();

  pendingAvailabilityRequests.set(cacheKey, requestPromise);
  return requestPromise;
};

interface ConsentContextValue {
  marketing?: boolean;
  statistics?: boolean;
  isAllowed?: (category: string) => boolean;
}

// Simple consent hook that doesn't require ConsentManager
const useConsent = (): ConsentContextValue => {
  const [consent, setConsent] = useState<ConsentContextValue>({
    marketing: false,
    statistics: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem("mr-dj-consent-preferences");
      if (stored) {
        const parsed = JSON.parse(stored);
        setConsent({
          marketing: Boolean(parsed?.marketing),
          statistics: Boolean(parsed?.statistics),
        });
      }
    } catch (error) {
      console.warn("Unable to read consent preferences", error);
    }
  }, []);

  return consent;
};

interface StatusMessage {
  type: "success" | "error" | "loading";
  message: string;
}

const AvailabilityChecker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<StatusMessage | null>(null);

  const consent = useConsent();

  const marketingAllowed = consent?.isAllowed
    ? Boolean(consent.isAllowed("marketing"))
    : Boolean(consent?.marketing);
  const statisticsAllowed = consent?.isAllowed
    ? Boolean(consent.isAllowed("statistics"))
    : Boolean(consent?.statistics);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const savedState = getJSON<{ email?: string; selectedDate?: string }>(STORAGE_KEY);
    if (!savedState) {
      return;
    }

    if (typeof savedState.email === "string") {
      setEmail(savedState.email);
    }

    if (typeof savedState.selectedDate === "string") {
      const parsedDate = new Date(savedState.selectedDate);
      if (!Number.isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      }
    }
  }, []);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    if (!selectedDate && !email) {
      removeItem(STORAGE_KEY);
      return;
    }

    setJSON(STORAGE_KEY, {
      email,
      selectedDate: selectedDate ? selectedDate.toISOString() : null,
    });
  }, [selectedDate, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !email) {
      setStatus({ type: "error", message: "Vul alstublieft een datum en e-mailadres in." });
      return;
    }

    setStatus({ type: "loading", message: "Bezig met controleren..." });

    const isoDate = selectedDate.toISOString();
    const pageContext = resolvePageContext();
    const payload: AvailabilityRequest = {
      email: email,
      eventDate: isoDate,
      marketingConsent: marketingAllowed,
      statisticsConsent: statisticsAllowed,
      pageUri: pageContext.pageUri,
      pageName: pageContext.pageName,
    };

    pushDataLayerEvent("availability_check_started", {
      eventDate: isoDate,
      marketingConsent: marketingAllowed,
      statisticsConsent: statisticsAllowed,
    });

    try {
      const result = await submitAvailabilityRequest(payload);

      if (result.success || result.queued) {
        pushDataLayerEvent(
          result.queued ? "availability_check_queued" : "availability_check_success",
          {
            eventDate: isoDate,
            queued: Boolean(result.queued),
          }
        );

        setStatus({
          type: "success",
          message: result.message,
        });
        setSelectedDate(undefined);
        setEmail("");
        removeItem(STORAGE_KEY);
        return;
      }

      pushDataLayerEvent("availability_check_failed", {
        eventDate: isoDate,
        reason: result.message || "unknown",
      });
      setStatus({
        type: "error",
        message: result.message || "Er ging iets mis. Probeer het later opnieuw.",
      });
    } catch (error) {
      pushDataLayerEvent("availability_check_failed", {
        eventDate: isoDate,
        reason: error instanceof Error ? error.message : "unknown",
      });
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Er ging iets mis. Probeer het later opnieuw.",
      });
    }
  };

  const statusClasses = status
    ? status.type === "success"
      ? "bg-semantic-success"
      : "bg-semantic-error"
    : "hidden";

  return (
    <section className="py-spacing-3xl bg-neutral-light">
      <div className="container mx-auto px-spacing-md max-w-lg shadow-xl rounded-lg p-spacing-2xl">
        <h2 className="text-font-size-h2 text-center text-neutral-dark mb-spacing-lg font-extrabold">
          Controleer Beschikbaarheid
        </h2>
        <p className="text-center text-neutral-dark mb-spacing-xl">
          Kies uw gewenste datum en wij controleren direct of Mr. DJ beschikbaar is.
        </p>

        <form onSubmit={handleSubmit} className="space-y-spacing-xl">
          {/* Date Picker */}
          <div className="flex justify-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiersClassNames={{
                selected: "bg-primary text-neutral-light rounded-full",
                today: "border border-primary rounded-full",
              }}
              styles={{
                caption: { color: "var(--color-primary-blue)" },
                head: { color: "var(--color-neutral-dark)" },
              }}
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-font-size-body font-medium text-neutral-dark mb-spacing-sm"
            >
              Uw E-mailadres
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-spacing-md border border-neutral-gray-500 rounded-md focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              placeholder="uw.naam@voorbeeld.nl"
              required
            />
          </div>

          {/* Status Message */}
          {status && (
            <div
              className={`p-spacing-md rounded-md text-neutral-light text-center ${statusClasses}`}
            >
              {status.message}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={status?.type === "loading"}
          >
            {status?.type === "loading" ? "Bezig..." : "Controleer & Vraag Aan"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AvailabilityChecker;
