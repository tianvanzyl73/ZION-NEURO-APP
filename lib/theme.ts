export const C = {
  bg: '#07070B',
  bgSoft: '#0B0B11',
  surface: '#101018',
  card: '#14141E',
  cardSoft: '#1A1A26',
  border: 'rgba(212,175,55,0.16)',
  borderStrong: 'rgba(212,175,55,0.45)',
  gold: '#D4AF37',
  goldSoft: '#EBD488',
  goldDeep: '#9C7C24',
  goldDim: 'rgba(212,175,55,0.10)',
  goldGlow: 'rgba(212,175,55,0.25)',
  white: '#FFFFFF',
  text: '#F2EFE6',
  muted: '#9A99A4',
  faint: '#62626E',
  success: '#3ECF8E',
  danger: '#F0616D',
  info: '#6AA7FF',
  violet: '#A78BFA',
};

export const R = { xs: 8, sm: 12, md: 16, lg: 22, xl: 28, pill: 999 };

export const goldGradient = ['#F6E291', '#D4AF37', '#8F6E1E'] as [string, string, string];
export const darkGoldGradient = ['#1C1810', '#12100A'] as [string, string];

export function shadow(color = '#000000', opacity = 0.45, radius = 14, y = 8) {
  return {
    shadowColor: color,
    shadowOpacity: opacity,
    shadowRadius: radius,
    shadowOffset: { width: 0, height: y },
    elevation: Math.round(radius / 2),
  };
}

export const goldTextShadow = {
  textShadowColor: 'rgba(212,175,55,0.35)',
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 14,
};
