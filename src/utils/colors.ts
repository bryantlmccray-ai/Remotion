// MonArk "Quiet Luxury" Earth-Tone Palette
// Philosophy: Warm, intentional earth-tones — light theme, no dark/jet-black backgrounds
// Sandy Gold is the hero accent; Deep Taupe grounds navigation

export const colors = {
  // Warm light backgrounds
  bg: "#E8DDD4",              // HSL(28, 30%, 87%) — Linen/Khaki-Beige base
  bgCard: "#F5EDE4",          // HSL(28, 38%, 94%) — Lighter linen surfaces
  bgGlass: "rgba(127,90,57,0.06)",    // Sienna-tinted glass
  bgGlassBright: "rgba(127,90,57,0.10)",

  // Primary accent — Sandy Gold
  gold: "#A6935F",            // HSL(36, 25%, 52%) — Sandy Gold hero accent
  goldLight: "#BBA876",       // Lighter sandy gold
  goldDim: "#8A7A4E",         // Deeper sandy gold

  // Dusty Rose
  rose: "#C0808A",            // HSL(350, 30%, 62%) — Soft rose highlight
  roseLight: "#D4A0A8",       // Lighter dusty rose
  roseDim: "#9A6068",         // Deeper dusty rose

  // Accent: Sienna/Taupe
  accent: "#7F5A38",          // HSL(22, 38%, 36%) — Deep accent
  accentLight: "#AB7B54",     // HSL(22, 34%, 50%) — Rose gold accent

  // Olive/Sage
  olive: "#5E6E4A",           // HSL(80, 20%, 36%) — Sage/olive accent
  oliveLight: "#7A8E62",

  // Deep Taupe (nav/sidebar/dark sections)
  deepTaupe: "#503F30",       // HSL(30, 20%, 26%) — Deep warm ground

  // Text — warm charcoal on light backgrounds
  textPrimary: "#433627",     // HSL(30, 20%, 22%) — Warm Charcoal
  textSecondary: "#7F7260",   // HSL(36, 18%, 42%) — Subdued text
  textMuted: "rgba(67,54,39,0.40)", // Warm charcoal at 40%

  // Borders
  border: "rgba(166,147,95,0.22)",    // Sandy gold at low opacity
  borderBright: "rgba(166,147,95,0.45)", // Sandy gold more visible

  // Gradients — warm earth tones
  gradientGold: "linear-gradient(135deg, #A6935F 0%, #BBA876 50%, #A6935F 100%)",
  gradientRose: "linear-gradient(135deg, #C0808A 0%, #D4A0A8 50%, #AB7B54 100%)",
  gradientBg: "linear-gradient(180deg, #E8DDD4 0%, #EBE0D5 50%, #E8DDD4 100%)",
  gradientCard: "linear-gradient(145deg, rgba(166,147,95,0.1) 0%, rgba(94,110,74,0.06) 100%)",
};

export const fonts = {
  serif: "'Georgia', 'Times New Roman', serif",
  sans: "'Helvetica Neue', 'Arial', sans-serif",
};
