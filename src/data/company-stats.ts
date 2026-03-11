/**
 * Centralized company statistics.
 * Update these values in one place when metrics change.
 */
export const companyStats = {
  /** Total number of events/parties */
  totalEvents: 2540,
  /** Years of experience */
  yearsExperience: 15,
  /** Average rating across platforms */
  averageRating: 9.8,
  /** Total number of reviews across all platforms */
  totalReviews: 76,
  /** Dance guarantee percentage */
  danceGuarantee: 100,

  /** Per-platform ratings */
  platforms: {
    tpw: { score: "10/10", reviews: 76, label: "reviews" },
    google: { score: "9.5/10", reviews: 40, label: "reviews" },
    facebook: { score: "100%", reviews: 13, label: "aanbevolen" },
  },
} as const;
