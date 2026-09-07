import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { C, R, goldGradient, shadow } from '../lib/theme';

export function Screen({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.screen, style]}>{children}</View>;
}

export function ZCard({
  children,
  style,
  gold,
  onPress,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  gold?: boolean;
  onPress?: () => void;
}) {
  const inner = (
    <View style={[styles.card, gold && styles.cardGold, style]}>{children}</View>
  );
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={style ? undefined : undefined}>
        {inner}
      </TouchableOpacity>
    );
  }
  return inner;
}

export function ZButton({
  label,
  onPress,
  variant = 'gold',
  icon,
  style,
  textStyle,
  disabled,
  loading,
  small,
}: {
  label: string;
  onPress?: () => void;
  variant?: 'gold' | 'outline' | 'ghost' | 'dark';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  small?: boolean;
}) {
  if (variant === 'gold') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.btnWrap, style, disabled && { opacity: 0.5 }]}
      >
        <LinearGradient
          colors={goldGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, small && styles.btnSmall]}
        >
          {loading ? (
            <ActivityIndicator color="#141005" />
          ) : (
            <>
              {icon && <Ionicons name={icon} size={small ? 15 : 18} color="#141005" style={{ marginRight: 7 }} />}
              <Text style={[styles.btnGoldText, small && { fontSize: 13 }, textStyle]}>{label}</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn,
        small && styles.btnSmall,
        variant === 'outline' && styles.btnOutline,
        variant === 'dark' && styles.btnDark,
        style,
        disabled && { opacity: 0.5 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? C.gold : C.text} />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={small ? 15 : 18}
              color={variant === 'outline' ? C.gold : C.text}
              style={{ marginRight: 7 }}
            />
          )}
          <Text
            style={[
              styles.btnText,
              small && { fontSize: 13 },
              variant === 'outline' && { color: C.gold },
              textStyle,
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

export function ZTag({
  label,
  tone = 'gold',
  style,
}: {
  label: string;
  tone?: 'gold' | 'muted' | 'success' | 'info' | 'violet';
  style?: ViewStyle;
}) {
  const map = {
    gold: { bg: C.goldDim, fg: C.goldSoft, br: C.border },
    muted: { bg: 'rgba(154,153,164,0.10)', fg: C.muted, br: 'rgba(154,153,164,0.2)' },
    success: { bg: 'rgba(62,207,142,0.10)', fg: C.success, br: 'rgba(62,207,142,0.25)' },
    info: { bg: 'rgba(106,167,255,0.10)', fg: C.info, br: 'rgba(106,167,255,0.25)' },
    violet: { bg: 'rgba(167,139,250,0.10)', fg: C.violet, br: 'rgba(167,139,250,0.25)' },
  };
  const t = map[tone];
  return (
    <View style={[styles.tag, { backgroundColor: t.bg, borderColor: t.br }, style]}>
      <Text style={[styles.tagText, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

export function SectionHeader({
  title,
  action,
  onAction,
  style,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.sectionHeader, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.sectionBar} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {action && (
        <TouchableOpacity onPress={onAction} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function ProgressBar({
  value,
  height = 6,
  color = C.gold,
  track,
  style,
}: {
  value: number;
  height?: number;
  color?: string;
  track?: string;
  style?: ViewStyle;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <View style={[styles.progressTrack, { height, borderRadius: height / 2, backgroundColor: track || 'rgba(255,255,255,0.07)' }, style]}>
      <View style={{ width: `${v}%`, height, borderRadius: height / 2, backgroundColor: color }} />
    </View>
  );
}

export function StatBox({
  icon,
  value,
  label,
  color = C.gold,
  style,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  color?: string;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.statBox, style]}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function EmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Ionicons name={icon} size={30} color={C.gold} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySub}>{subtitle}</Text>
      {actionLabel && (
        <ZButton label={actionLabel} onPress={onAction} small style={{ marginTop: 14 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  card: {
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    ...shadow('#000', 0.35, 10, 4),
  },
  cardGold: {
    borderColor: C.borderStrong,
    backgroundColor: '#171408',
  },
  btnWrap: { borderRadius: R.pill, ...shadow('rgba(212,175,55,0.4)', 0.35, 12, 4) },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: R.pill,
  },
  btnSmall: { paddingVertical: 10, paddingHorizontal: 16 },
  btnGoldText: {
    color: '#141005',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  btnText: { color: C.text, fontWeight: '700', fontSize: 15, letterSpacing: 0.4 },
  btnOutline: {
    borderWidth: 1,
    borderColor: C.borderStrong,
    backgroundColor: 'transparent',
  },
  btnDark: {
    backgroundColor: C.cardSoft,
    borderWidth: 1,
    borderColor: C.border,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: R.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  tagText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionBar: { width: 3, height: 16, borderRadius: 2, backgroundColor: C.gold, marginRight: 8 },
  sectionTitle: { color: C.text, fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
  sectionAction: { color: C.gold, fontSize: 13, fontWeight: '700' },
  progressTrack: { width: '100%', overflow: 'hidden' },
  statBox: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  statValue: { fontSize: 20, fontWeight: '800', marginTop: 6 },
  statLabel: { fontSize: 10.5, color: C.muted, marginTop: 3, textAlign: 'center', letterSpacing: 0.4, textTransform: 'uppercase' },
  empty: { alignItems: 'center', paddingVertical: 34, paddingHorizontal: 20 },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: { color: C.text, fontSize: 16, fontWeight: '800' },
  emptySub: { color: C.muted, fontSize: 13, textAlign: 'center', marginTop: 6, lineHeight: 19 },
});
