import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../lib/theme';

export function PinDots({ value, length = 4 }: { value: string; length?: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length }).map((_, i) => (
        <View key={i} style={[styles.dot, i < value.length && styles.dotFilled]} />
      ))}
    </View>
  );
}

export function PinPad({ onKey }: { onKey: (k: string) => void }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];
  return (
    <View style={styles.pad}>
      {keys.map((k, i) =>
        k === '' ? (
          <View key={i} style={styles.key} />
        ) : (
          <TouchableOpacity key={i} style={styles.key} onPress={() => onKey(k)} activeOpacity={0.6}>
            {k === 'del' ? (
              <Ionicons name="backspace-outline" size={24} color={C.gold} />
            ) : (
              <Text style={styles.keyTxt}>{k}</Text>
            )}
          </TouchableOpacity>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: { flexDirection: 'row', gap: 14, justifyContent: 'center', marginVertical: 18 },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: C.gold,
    backgroundColor: 'transparent',
  },
  dotFilled: { backgroundColor: C.gold },
  pad: { flexDirection: 'row', flexWrap: 'wrap', width: 264, justifyContent: 'center', gap: 12 },
  key: {
    width: 78,
    height: 62,
    borderRadius: 16,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyTxt: { color: C.text, fontSize: 24, fontWeight: '700' },
});
