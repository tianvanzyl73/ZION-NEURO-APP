import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from '../lib/theme';

const ROUNDS = 5;

export function ReactionGame({ onFinish }: { onFinish: (score: number, detail: string) => void }) {
  const [phase, setPhase] = useState<'ready' | 'wait' | 'go' | 'false' | 'done'>('ready');
  const [round, setRound] = useState(1);
  const [lastRt, setLastRt] = useState<number | null>(null);
  const times = useRef<number[]>([]);
  const goAt = useRef(0);
  const finished = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const startRound = () => {
    setPhase('wait');
    timer.current = setTimeout(() => {
      goAt.current = Date.now();
      setPhase('go');
    }, 1200 + Math.random() * 2000);
  };

  const press = () => {
    if (finished.current || phase === 'done') return;
    if (phase === 'ready') {
      startRound();
      return;
    }
    if (phase === 'wait') {
      if (timer.current) clearTimeout(timer.current);
      setPhase('false');
      return;
    }
    if (phase === 'false') {
      startRound();
      return;
    }
    if (phase === 'go') {
      const rt = Date.now() - goAt.current;
      times.current.push(rt);
      setLastRt(rt);
      if (times.current.length >= ROUNDS) {
        finished.current = true;
        setPhase('done');
        const avg = Math.round(times.current.reduce((a, b) => a + b, 0) / ROUNDS);
        const score = Math.max(5, Math.min(100, Math.round(100 - (avg - 200) * 0.3)));
        onFinish(score, `Average ${avg} ms over ${ROUNDS} trials`);
      } else {
        setRound(times.current.length + 1);
        startRound();
      }
    }
  };

  const bg = phase === 'go' ? C.gold : phase === 'false' ? 'rgba(240,97,109,0.15)' : '#101018';

  return (
    <View style={styles.wrap}>
      <Text style={styles.meta}>
        Round {Math.min(round, ROUNDS)} / {ROUNDS}
        {lastRt ? `  •  Last: ${lastRt} ms` : ''}
      </Text>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={press}
        disabled={phase === 'done'}
        style={[styles.pad, { backgroundColor: bg, borderColor: phase === 'go' ? C.gold : C.border }]}
      >
        {phase === 'ready' && (
          <>
            <Ionicons name="flash-outline" size={34} color={C.gold} />
            <Text style={styles.padTitle}>Tap to Start</Text>
            <Text style={styles.padSub}>Wait for the gold flash, then tap as fast as you can. 5 rounds.</Text>
          </>
        )}
        {phase === 'wait' && (
          <>
            <Ionicons name="hourglass-outline" size={34} color={C.muted} />
            <Text style={[styles.padTitle, { color: C.muted }]}>Wait for gold…</Text>
            <Text style={styles.padSub}>Tapping early is a false start.</Text>
          </>
        )}
        {phase === 'go' && (
          <>
            <Ionicons name="flash" size={40} color="#141005" />
            <Text style={[styles.padTitle, { color: '#141005' }]}>TAP NOW!</Text>
          </>
        )}
        {phase === 'false' && (
          <>
            <Ionicons name="close-circle-outline" size={34} color={C.danger} />
            <Text style={[styles.padTitle, { color: C.danger }]}>Too soon!</Text>
            <Text style={styles.padSub}>Tap to retry this round.</Text>
          </>
        )}
        {phase === 'done' && (
          <>
            <Ionicons name="checkmark-circle-outline" size={34} color={C.success} />
            <Text style={[styles.padTitle, { color: C.success }]}>Complete</Text>
          </>
        )}
      </TouchableOpacity>
      <Text style={styles.tip}>Typical visual reaction time is ~200–250 ms. Stay relaxed and watch the pad, not your finger.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  meta: { color: C.muted, fontSize: 13, marginBottom: 12, letterSpacing: 0.6 },
  pad: {
    width: '100%',
    height: 300,
    borderRadius: R.xl,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  padTitle: { color: C.text, fontSize: 22, fontWeight: '800', marginTop: 10, letterSpacing: 1 },
  padSub: { color: C.muted, fontSize: 13, textAlign: 'center', marginTop: 8, lineHeight: 18 },
  tip: { color: C.faint, fontSize: 12, textAlign: 'center', marginTop: 14, lineHeight: 17, paddingHorizontal: 10 },
});
