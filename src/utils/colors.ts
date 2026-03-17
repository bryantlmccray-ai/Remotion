// MonArk Landing Page Palette — Light-only, warm linen canvas
// All HSL-derived, warm-shifted, no dark mode
export const colors = {
	// Core backgrounds — warm linen canvas
	bg: '#E8DDD4', // --background hsl(28,30%,87%)
	bgCard: '#F5EFEA', // --card hsl(28,38%,94%)
	bgGlass: 'rgba(80,63,48,0.05)', // subtle warm glass on light
	bgGlassBright: 'rgba(80,63,48,0.09)',

	// Sandy gold spectrum (primary accent) — --primary hsl(36,25%,52%)
	gold: '#A38B66',
	goldLight: '#BFA97E',
	goldDim: '#7F5339', // --accent hsl(22,38%,36%) sienna/taupe
	goldShimmer: '#D4C4A0',

	// Earth tone accents
	terracotta: '#7F5339', // --accent sienna
	terracottaLight: '#A37A5E',
	sage: '#7A9B6D',
	sageLight: '#A3C496',
	sand: '#DFD6CD', // --muted hsl(28,22%,84%)
	clay: '#7F5339',
	linen: '#F5EFEA', // --card

	// Warm rose (muted, earthy)
	rose: '#9B7068',
	roseLight: '#B89590',
	cream: '#F5EFEA', // --card

	// Text — warm charcoal on linen
	textPrimary: '#43382D', // --foreground hsl(30,20%,22%)
	textSecondary: '#7E6F58', // --muted-foreground hsl(36,18%,42%)
	textMuted: '#A89880', // lighter muted

	// Borders — warm brown-tinted
	border: '#CDC2B7', // --border hsl(30,18%,76%)
	borderBright: '#A38B66', // primary gold for bright borders

	// Functional (warmed up)
	green: '#7A9B6D',
	red: '#C4605A',
	blue: '#8B7E6B',
	purple: '#9B8572',

	// Gradients — brown-tinted shadows, never cool grays
	gradientGold: 'linear-gradient(135deg, #7F5339 0%, #A38B66 50%, #BFA97E 100%)', // CTA Warm: taupe → sandy gold
	gradientBg: 'linear-gradient(135deg, #E8DDD4 0%, #F5EFEA 100%)', // Editorial: --background → --card
	gradientCard: 'linear-gradient(145deg, rgba(163,139,102,0.08) 0%, rgba(127,83,57,0.05) 100%)',

	// Button text on gold — --primary-foreground hsl(28,38%,94%)
	primaryForeground: '#F5EFEA',

	// Deep taupe for sidebar/nav elements
	sidebarBg: '#504235', // --sidebar-background hsl(30,20%,26%)
};

export const fonts = {
	serif: "'Georgia', 'Times New Roman', serif",
	sans: "'Helvetica Neue', 'Arial', sans-serif",
};
