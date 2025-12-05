declare global {
  interface Window {
    posthog?: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
      identify: (userId: string, properties?: Record<string, unknown>) => void;
    };
    dataLayer?: Array<Record<string, unknown>>;
    __MR_DJ_API_BASE_URL?: string;
    MR_DJ_API_BASE_URL?: string;
    API_BASE_URL?: string;
  }
}

export {};
