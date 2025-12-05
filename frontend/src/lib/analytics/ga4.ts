const dataLayerName = "dataLayer";

type Ga4EventParams = Record<string, unknown>;

export interface Ga4Event {
  name: string;
  params?: Ga4EventParams;
}

const isBrowser = typeof window !== "undefined";

/**
 * Get the GTM dataLayer array
 */
const getDataLayer = (): unknown[] | null => {
  if (!isBrowser) {
    return null;
  }

  const globalWindow = window as unknown as Record<string, unknown>;
  const dataLayer = (globalWindow[dataLayerName] as unknown[]) ?? [];

  if (!globalWindow[dataLayerName]) {
    globalWindow[dataLayerName] = dataLayer;
  }

  return dataLayer;
};

/**
 * Push an event to the GTM dataLayer for GA4 tracking
 */
export const pushEvent = ({ name, params }: Ga4Event): void => {
  if (!name) {
    if (import.meta.env?.MODE !== "production") {
      console.warn("[GA4] Event name is required before pushing to the dataLayer.");
    }
    return;
  }

  const dataLayer = getDataLayer();

  if (!dataLayer) {
    return;
  }

  const payload = {
    event: name,
    ...(params ?? {}),
  };

  dataLayer.push(payload);
};

/**
 * Track a page view event in GA4
 */
export function trackPageView(pageName: string): void {
  pushEvent({
    name: "page_view",
    params: {
      page_title: pageName,
      page_location: isBrowser ? window.location.href : undefined,
    },
  });
}

/**
 * Track a button click in GA4
 */
export function trackButtonClick(buttonId: string, buttonText?: string): void {
  pushEvent({
    name: "select_content",
    params: {
      content_type: "button",
      item_id: buttonId,
      item_name: buttonText ? buttonText.trim().slice(0, 120) : undefined,
    },
  });
}

/**
 * Track a form submission in GA4
 */
export function trackFormSubmission(formId: string, formAction?: string): void {
  pushEvent({
    name: "form_submit",
    params: {
      form_id: formId,
      form_action: formAction,
    },
  });
}

/**
 * Track a custom event in GA4
 */
export function trackCustomEvent(
  eventName: string,
  params?: Ga4EventParams
): void {
  pushEvent({
    name: eventName,
    params,
  });
}
