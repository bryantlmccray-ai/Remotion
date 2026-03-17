/**
 * MonArk "Quiet Luxury Earth-Tones" — Warm palette
 * Based on the brand guide: warm linen canvas, sandy gold accents,
 * dusty rose for emotional warmth, sienna for editorial depth.
 * No jet blacks. No cool greys. Everything warm-shifted (28-36° hue).
 */

export const warm = {
  // Canvas & surfaces
  background: "hsl(28, 30%, 87%)",        // Warm Linen — the paper
  backgroundDeep: "hsl(28, 28%, 82%)",     // Deeper linen for depth
  card: "hsl(28, 38%, 94%)",               // Light Linen — cards float above canvas
  muted: "hsl(28, 22%, 84%)",              // Soft Linen — recessive surfaces

  // Text
  foreground: "hsl(30, 20%, 22%)",         // Deep Charcoal — primary type
  mutedForeground: "hsl(36, 18%, 42%)",    // Warm Grey — subtext, captions
  textLight: "hsl(30, 15%, 55%)",          // Light warm grey for tertiary

  // Primary accent
  primary: "hsl(36, 25%, 52%)",            // Sandy Gold — hero accent
  primaryLight: "hsl(36, 30%, 62%)",       // Lighter gold
  primaryDim: "hsl(36, 22%, 42%)",         // Deeper gold

  // Secondary accent
  accent: "hsl(22, 38%, 36%)",             // Sienna/Taupe — editorial depth
  accentLight: "hsl(22, 32%, 46%)",        // Lighter sienna

  // Emotional colors
  dustyRose: "hsl(350, 30%, 62%)",         // Dusty Rose — emotional warmth (sparingly)
  dustyRoseLight: "hsl(350, 35%, 72%)",    // Lighter rose
  olive: "hsl(80, 20%, 36%)",              // Sage Olive — trust, growth
  roseGold: "hsl(22, 34%, 50%)",           // Rose Gold — premium shimmer

  // Sidebar / navigation
  sidebarBg: "hsl(30, 20%, 26%)",          // Deep Taupe

  // Functional
  white: "#FFFFFF",
  warmWhite: "hsl(35, 30%, 97%)",          // Not pure white — warm shifted
  transparent: "transparent",

  // Shadows — warm brown-tinted
  shadow1: "rgba(100, 80, 60, 0.08)",
  shadow2: "rgba(100, 80, 60, 0.15)",
  shadow3: "rgba(100, 80, 60, 0.25)",
};

export const warmGradients = {
  gold: "linear-gradient(135deg, hsl(36, 25%, 52%) 0%, hsl(36, 30%, 62%) 50%, hsl(36, 25%, 52%) 100%)",
  editorial: "linear-gradient(180deg, hsl(28, 30%, 87%) 0%, hsl(28, 28%, 82%) 100%)",
  surface: "linear-gradient(145deg, hsl(28, 38%, 94%) 0%, hsl(28, 30%, 87%) 100%)",
  cta: "linear-gradient(135deg, hsl(36, 25%, 52%) 0%, hsl(22, 34%, 50%) 100%)",
  roseAccent: "linear-gradient(135deg, hsl(350, 30%, 62%) 0%, hsl(350, 35%, 72%) 100%)",
};

export const warmFonts = {
  display: "'Playfair Display', 'Georgia', serif",    // Display/H1-H6
  body: "'DM Sans', 'Helvetica Neue', sans-serif",    // Body text
  caption: "'DM Sans', 'Helvetica Neue', sans-serif", // Uppercase micro-labels
  mono: "'Space Mono', monospace",                      // Code, data
  script: "'Pinyon Script', cursive",                   // Rare flourish
};
