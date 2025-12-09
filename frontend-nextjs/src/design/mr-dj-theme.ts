// src/design/mr-dj-theme.ts
// Design tokens afgeleid van de Event DJ brochure template.
// Let op: kleuren/fonts zijn placeholders, stem ze af op de echte template.

export const mrDjColors = {
  background: "#050509",
  backgroundSoft: "#101018",
  backgroundHighlight: "#181828",
  primary: "#F5C84C", // feestelijk geel / goud
  primarySoft: "#FBE8A4",
  accentPink: "#FF4F9A",
  accentBlue: "#3B82F6",
  textPrimary: "#F9FAFB",
  textMuted: "#9CA3AF",
  borderSubtle: "rgba(249, 250, 251, 0.08)",
  cardBackground: "rgba(15, 23, 42, 0.85)",
  overlay: "rgba(0, 0, 0, 0.55)",
};

export const mrDjTypography = {
  fontSans:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSerif: "Georgia, 'Times New Roman', serif",
  fontScript: "'Pacifico', 'Brush Script MT', cursive", // vervang door webversies van jouw template
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
  cardShadow:
    "0 18px 40px rgba(0, 0, 0, 0.45)",
};

export const mrDjTheme = {
  colors: mrDjColors,
  typography: mrDjTypography,
  layout: mrDjLayout,
};
