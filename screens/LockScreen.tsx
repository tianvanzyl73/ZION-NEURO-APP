import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C } from '../lib/theme';
import { BrainMark, BrandTitle } from '../components/BrainLogo';
import { NeuronBackdrop } from '../components/NeuronBackdrop';
import { PinDots, PinPad } from '../components/PinPad';
import { getPin } from '../lib/storage';
import { confirmDialog } from '../lib/dialog';
import { useApp } from '../state/AppContext';

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const { state, resetAll } = useApp();
  const [entry, setEntry] = useState('');
  const [error, setError] = useState('');
  const checking = useRef(false);

  const onKey = async (k: string) => {
    if (checking.current) return;
    setError('');
    if (k === 'del') return setEntry((p) => p.slice(0, -1));
    if (entry.length >= 4) return;
    const next = entry + k;
    setEntry(next);
    if (next.length === 4) {
      checking.current = true;
      const pin = await getPin();
      if (next === pin) {
        onUnlock();
      } else {
        setError('Incorrect PIN. Try again.');
        setTimeout(() => {
          setEntry('');
          checking.current = false;
        }, 350);
      }
    }
  };

  const forgot = () => {
    confirmDialog(
      'Reset ZION NEURO',
      'If you forgot your PIN, you can erase all app data (profile, progress and settings) and start fresh. This cannot be undone.',
      'Erase & Reset',
      () => {
        resetAll();
      },
      true
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <NeuronBackdrop opacity={0.35} />
      <View style={styles.wrap}>
        <BrainMark size={64} />
        <View style={{ height: 16 }} />
        <BrandTitle />
        <Text style={styles.welcome}>
          Welcome back{state.profile?.name ? `, ${state.profile.name}` : ''}
        </Text>
        <Text style={styles.sub}>Enter your PIN to unlock your brain profile</Text>
        <PinDots value={entry} />
        {error ? <Text style={styles.error}>{error}</Text> : <View style={{ height: 14 }} />}
        <PinPad onKey={onKey} />
        <TouchableOpacity onPress={forgot} style={styles.forgot} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="help-circle-outline" size={15} color={C.faint} />
          <Text style={styles.forgotTxt}>Forgot PIN?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  welcome: { color: C.text, fontSize: 18, fontWeight: '700', marginTop: 22 },
  sub: { color: C.muted, fontSize: 13, marginTop: 6 },
  error: { color: C.danger, fontSize: 13, marginBottom: 6 },
  forgot: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 26 },
  forgotTxt: { color: C.faint, fontSize: 13 },
});
