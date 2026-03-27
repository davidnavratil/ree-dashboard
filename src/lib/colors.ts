// Colorblind-safe palette (deuteranopia/protanopia friendly)
// Avoids red-green-brown confusion, uses luminance + hue differentiation

export const COLORS = {
  china: '#9D174D',      // deep rose — warm, alarming, distinct
  nonChina: '#0E7490',   // teal — cool, safe
  teal: '#0E7490',
  warning: '#D97706',    // amber — clearly orange, not brown
  eu: '#1D4ED8',
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F8FAFC',
  bgCard: '#F8FAFC',
  bgCardHover: '#F1F5F9',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  border: '#E2E8F0',
} as const

// Country colors for charts (colorblind-safe)
export const COUNTRY_COLORS: Record<string, string> = {
  'Čína': '#9D174D',     // deep rose
  'USA': '#1D4ED8',      // indigo
  'Austrálie': '#D97706', // amber
  'Myanmar': '#7C3AED',  // purple
  'Japonsko': '#EC4899', // pink
  'EU': '#0EA5E9',       // sky blue
  'Ostatní': '#64748B',  // gray
}

// Element group colors
export const GROUP_COLORS: Record<string, string> = {
  'LREE': '#1D4ED8',     // blue
  'HREE': '#9D174D',     // deep rose
  'REE (spec.)': '#64748B',
}

// Chart color palette (colorblind-safe)
export const CHART_PALETTE = [
  '#0E7490', // teal
  '#9D174D', // deep rose
  '#1D4ED8', // indigo
  '#D97706', // amber
  '#7C3AED', // purple
  '#EC4899', // pink
  '#0EA5E9', // sky blue
  '#64748B', // gray
  '#6366F1', // violet
]
