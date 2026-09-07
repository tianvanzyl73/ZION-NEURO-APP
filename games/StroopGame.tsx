import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { C, R } from '../lib/theme';

const COLORS = [
  { name: 'RED', hex: '#F0616D' },
  { name: 'GREEN', hex: '#3ECF8E' },
  { name: 'BLUE', hex: '#6AA7FF' },
  { name: 'YELLOW', hex: '#EBD488' },
];
const TRIALS = 20;

function makeTrial() {
  const word = COLORS[Math.floor(Math.random() * 4)];
  const incongruent = Math.random() < 0.65;
  let ink = word;
  if (incongruent) {
    const others = COLORS.filter((c) => c.name !== word.name);
    ink = others[Math.floor(Math.random() * 3)];
  }
  return { word, ink };
}

export function StroopGame({ onFinish }: { onFinish: (score: number, detail: string) => void }) {
  const [started, setStarted] = useState(false);
  const [trial, setTrial] = useState(makeTrial);
  const [n, setN] = useState(1);
  const [feedback, setFeedback] = useState<'ok' | 'bad' | null>(null);
  const correct = useRef(0);
  const locked = useRef(false);
  const finished = useRef(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const answer = (c: { name: string }) => {
    if (!started || locked.current || finished.current) return;
    locked.current = true;
    const ok = c.name === trial.ink.name;
    if (ok) correct.current += 1;
    setFeedback(ok ? 'ok' : 'bad');
    setTimeout(() => {
      if (!alive.current) return;
      setFeedback(null);
      locked.current = false;
      if (n >= TRIALS) {
        finished.current = true;
        const score = Math.round((correct.current / TRIALS) * 100);
        onFinish(score, `${correct.current}/${TRIALS} correct ink-color answers`);
      } else {
        setN(n + 1);
        setTrial(makeTrial());
      }
    }, 320);
  };

  if (!started) {
    return (
      <View style={styles.wrap}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Stroop Focus Drill</Text>
          <Text style={styles.introSub}>
            A color word appears, printed in a possibly different ink color. Tap the button matching the INK COLOR, not the word. {TRIALS} trials, speed matters but accuracy scores.
          </Text>
          <TouchableOpacity style={styles.startBtn} onPress={() => setStarted(true)}>
            <Text style={styles.startTxt}>BEGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.meta}>
        Trial {n} / {TRIALS} • Correct: {correct.current}
      </Text>
      <View style={[styles.wordCard, feedback === 'ok' && { borderColor: C.success }, feedback === 'bad' && { borderColor: C.danger }]}>
        <Text style={[styles.word, { color: trial.ink.hex }]}>{trial.word.name}</Text>
        <Text style={styles.wordHint}>Tap the INK color</Text>
      </View>
      <View style={styles.btnRow}>
        {COLORS.map((c) => (
          <TouchableOpacity
            key={c.name}
            style={[styles.colorBtn, { backgroundColor: `${c.hex}18`, borderColor: c.hex }]}
            onPress={() => answer(c)}
            disabled={finished.current}
            activeOpacity={0.7}
          >
            <View style={[styles.dot, { backgroundColor: c.hex }]} />
            <Text style={[styles.colorTxt, { color: c.hex }]}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.tip}>The conflict between reading and color-naming is the Stroop effect, a classic measure of cognitive control.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  meta: { color: C.muted, fontSize: 13, marginBottom: 12, letterSpacing: 0.6 },
  wordCard: {
    width: '100%',
    height: 190,
    borderRadius: R.xl,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: '#101018',
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: { fontSize: 52, fontWeight: '900', letterSpacing: 4 },
  wordHint: { color: C.faint, fontSize: 11, marginTop: 12, letterSpacing: 1.5, textTransform: 'uppercase' },
  btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 18, justifyContent: 'center' },
  colorBtn: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: R.md,
    borderWidth: 1.5,
    gap: 8,
  },
  dot: { width: 12, height: 12, borderRadius: 6 },
  colorTxt: { fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  tip: { color: C.faint, fontSize: 12, textAlign: 'center', marginTop: 16, lineHeight: 17, paddingHorizontal: 10 },
  intro: { alignItems: 'center', paddingHorizontal: 8 },
  introTitle: { color: C.text, fontSize: 20, fontWeight: '800', letterSpacing: 1 },
  introSub: { color: C.muted, fontSize: 14, textAlign: 'center', lineHeight: 21, marginTop: 12 },
  startBtn: {
    marginTop: 22,
    backgroundColor: C.gold,
    borderRadius: R.pill,
    paddingVertical: 14,
    paddingHorizontal: 44,
  },
  startTxt: { color: '#141005', fontWeight: '900', letterSpacing: 2 },
});
