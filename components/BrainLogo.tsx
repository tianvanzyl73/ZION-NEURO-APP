import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { C, goldGradient, goldTextShadow } from '../lib/theme';

export function BrainMark({ size = 40 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        backgroundColor: '#0E0C06',
        borderWidth: 1,
        borderColor: C.borderStrong,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size * 0.68} height={size * 0.68} viewBox="0 0 100 100" fill="none">
        <Path
          d="M32 58 C26 50 28 36 40 32 C42 22 56 18 64 26 C76 24 86 34 82 46 C90 52 86 66 74 68 C72 78 58 82 50 74 C40 80 30 72 32 62 Z"
          stroke={C.gold}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <Path d="M52 30 C48 40 56 46 50 56 C46 62 52 70 48 74" stroke={C.gold} strokeWidth="3" strokeLinecap="round" />
        <Path d="M40 40 C46 42 44 50 50 50" stroke={C.gold} strokeWidth="3" strokeLinecap="round" />
        <Path d="M66 38 C62 44 68 50 62 56" stroke={C.gold} strokeWidth="3" strokeLinecap="round" />
        <Circle cx="72" cy="76" r="6" stroke={C.gold} strokeWidth="3" />
      </Svg>
    </View>
  );
}

export function BrandTitle({ size = 'md', sub }: { size?: 'md' | 'lg'; sub?: boolean }) {
  const big = size === 'lg';
  return (
    <View style={sub ? { alignItems: 'center' } : undefined}>
      <Text style={[styles.brand, { fontSize: big ? 30 : 20 }]}>
        ZION <Text style={{ color: C.gold }}>NEURO</Text>
      </Text>
      {sub && <Text style={styles.sub}>KNOW YOUR MIND. TRAIN YOUR BRAIN.</Text>}
    </View>
  );
}

export function GoldDivider({ style }: { style?: ViewStyle }) {
  return (
    <LinearGradient
      colors={['transparent', C.gold, 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[{ height: 1, opacity: 0.5 }, style]}
    />
  );
}

const styles = StyleSheet.create({
  brand: {
    color: C.white,
    fontWeight: '900',
    letterSpacing: 4,
    ...goldTextShadow,
  },
  sub: {
    color: C.muted,
    fontSize: 10,
    letterSpacing: 3,
    marginTop: 6,
    textTransform: 'uppercase',
  },
});
