export const theme = {
  navy: '#0F172A',
  darkCard: '#2A374A',
  darkCardAlt: '#1E293B',
  teal: '#0D9488',
  tealAccent: '#14B8A6',
  tealSoft: '#CCFBF1',
  tealDark: '#0F766E',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  mutedText: '#64748B',
  border: '#E2E8F0',
};

export function applyTheme(values = theme) {
  const root = document.documentElement;
  const variables = {
    '--navy': values.navy,
    '--dark-card': values.darkCard,
    '--dark-card2': values.darkCardAlt,
    '--teal': values.teal,
    '--teal-accent': values.tealAccent,
    '--teal-soft': values.tealSoft,
    '--teal-dark': values.tealDark,
    '--bg-app': values.background,
    '--card-bg': values.card,
    '--text': values.text,
    '--text-sub': values.mutedText,
    '--border': values.border,
  };
  Object.entries(variables).forEach(([name, value]) => root.style.setProperty(name, value));
}

