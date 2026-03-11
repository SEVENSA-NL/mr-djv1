"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-lg">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Er ging iets mis
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Er ging iets mis. Probeer de pagina te vernieuwen.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
                className="inline-flex min-h-[44px] items-center rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
              >
                Pagina vernieuwen
              </button>
              <a
                href="/nl/contact"
                className="inline-flex min-h-[44px] items-center rounded-full border border-gray-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700 transition hover:border-white/60 hover:bg-gray-50"
              >
                Neem contact op
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
