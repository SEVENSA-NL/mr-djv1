"use client";

import { useState, useEffect } from "react";

export interface VisitorProfile {
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
  pagesViewed: string[];
  interests: string[];
  isReturning: boolean;
  /** Detected primary interest based on page views */
  primaryInterest: "bruiloft" | "bedrijfsfeest" | "feest" | "unknown";
  /** Time on site this session in seconds */
  sessionDuration: number;
}

const STORAGE_KEY = "mrdj_visitor";
const SESSION_START_KEY = "mrdj_session_start";

function detectInterest(pages: string[]): VisitorProfile["primaryInterest"] {
  const counts = { bruiloft: 0, bedrijfsfeest: 0, feest: 0 };
  for (const page of pages) {
    if (page.includes("bruiloft") || page.includes("wedding") || page.includes("openingsdans")) {
      counts.bruiloft++;
    } else if (page.includes("bedrijfsfeest") || page.includes("corporate")) {
      counts.bedrijfsfeest++;
    } else if (page.includes("feest") || page.includes("verjaardag")) {
      counts.feest++;
    }
  }
  const max = Math.max(counts.bruiloft, counts.bedrijfsfeest, counts.feest);
  if (max === 0) return "unknown";
  if (counts.bruiloft === max) return "bruiloft";
  if (counts.bedrijfsfeest === max) return "bedrijfsfeest";
  return "feest";
}

function deriveInterests(pages: string[]): string[] {
  const interests = new Set<string>();
  for (const page of pages) {
    if (page.includes("bruiloft")) interests.add("bruiloften");
    if (page.includes("bedrijfsfeest")) interests.add("bedrijfsfeesten");
    if (page.includes("feest")) interests.add("feesten");
    if (page.includes("impressie") || page.includes("gallery")) interests.add("impressies");
    if (page.includes("verhuur")) interests.add("verhuur");
    if (page.includes("blog")) interests.add("blog");
    if (page.includes("dj-")) interests.add("lokale-dj");
  }
  return Array.from(interests);
}

export function useVisitorProfile(): VisitorProfile | null {
  const [profile, setProfile] = useState<VisitorProfile | null>(null);

  useEffect(() => {
    const now = new Date().toISOString();
    const currentPath = window.location.pathname;

    // Load existing profile
    let stored: Partial<VisitorProfile> = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw);
    } catch {
      // ignore
    }

    // Track session start
    if (!sessionStorage.getItem(SESSION_START_KEY)) {
      sessionStorage.setItem(SESSION_START_KEY, Date.now().toString());
    }
    const sessionStart = parseInt(sessionStorage.getItem(SESSION_START_KEY) || "0", 10);

    // Update profile
    const pagesViewed = stored.pagesViewed || [];
    if (!pagesViewed.includes(currentPath)) {
      pagesViewed.push(currentPath);
    }

    const visitCount = (stored.visitCount || 0) + (stored.lastVisit !== now.slice(0, 10) ? 1 : 0);
    const updated: VisitorProfile = {
      visitCount: Math.max(visitCount, 1),
      firstVisit: stored.firstVisit || now,
      lastVisit: now,
      pagesViewed,
      interests: deriveInterests(pagesViewed),
      isReturning: !!stored.firstVisit,
      primaryInterest: detectInterest(pagesViewed),
      sessionDuration: Math.floor((Date.now() - sessionStart) / 1000),
    };

    // Save
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setProfile(updated);
  }, []);

  return profile;
}
