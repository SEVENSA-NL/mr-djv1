// src/design/mr-dj-theme.ts
// Design tokens — Light theme variant.

export const mrDjColors = {
  background: "#FFFFFF",
  backgroundSoft: "#F8F9FA",
  backgroundHighlight: "#F0F1F3",
  primary: "#f9b537", // brand gold from mr-dj.nl
  primarySoft: "#FBE8A4",
  accentPink: "#E8357A",
  accentBlue: "#2563EB",
  textPrimary: "#1A1A2E",
  textMuted: "#6B7280",
  borderSubtle: "rgba(0, 0, 0, 0.08)",
  cardBackground: "rgba(255, 255, 255, 0.92)",
  overlay: "rgba(255, 255, 255, 0.55)",
};

export const mrDjTypography = {
  fontSans:
    "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  headingLetterSpacing: "0.08em",
  headingUppercase: true,
};

export const mrDjLayout = {
  sectionPaddingY: {
    mobile: "3.5rem",
    desktop: "5.5rem",
  },
  contentMaxWidth: "72rem",
  cardRadius: "1.5rem",
  cardShadow: "0 18px 40px rgba(0, 0, 0, 0.08)",
};

export const mrDjTheme = {
  colors: mrDjColors,
  typography: mrDjTypography,
  layout: mrDjLayout,
};
