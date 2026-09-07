import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { C, R } from '../lib/theme';

const PADS = [
  { id: 0, color: '#D4AF37' },
  { id: 1, color: '#6AA7FF' },
  { id: 2, color: '#3ECF8E' },
  { id: 3, color: '#A78BFA' },
];

export function SequenceGame({ onFinish }: { onFinish: (score: number, detail: string) => void }) {
  const [phase, setPhase] = useState<'ready' | 'watch' | 'repeat' | 'done'>('ready');
  const [lit, setLit] = useState<number | null>(null);
  const [level, setLevel] = useState(2);
  const [completed, setCompleted] = useState(0);
  const seq = useRef<number[]>([]);
  const inputIdx = useRef(0);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  const play = (sequence: number[]) => {
    setPhase('watch');
    inputIdx.current = 0;
    let i = 0;
    const step = () => {
      if (!alive.current) return;
      if (i >= sequence.length) {
        setLit(null);
        setPhase('repeat');
        return;
      }
      const pad = sequence[i];
      setLit(pad);
      setTimeout(() => {
        if (!alive.current) return;
        setLit(null);
        i += 1;
        setTimeout(step, 160);
      }, 430);
    };
    setTimeout(step, 600);
  };

  const start = () => {
    seq.current = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    setLevel(2);
    setCompleted(0);
    play(seq.current);
  };

  const tapPad = (id: number) => {
    if (phase !== 'repeat') return;
    setLit(id);
    setTimeout(() => alive.current && setLit(null), 200);
    if (seq.current[inputIdx.current] === id) {
      inputIdx.current += 1;
      if (inputIdx.current >= seq.current.length) {
        const done = seq.current.length;
        setCompleted(done);
        if (done >= 10) {
          setPhase('done');
          onFinish(100, `Perfect sequence recall up to length ${done}`);
          return;
        }
        seq.current = [...seq.current, Math.floor(Math.random() * 4)];
        setLevel(seq.current.length);
        setTimeout(() => alive.current && play(seq.current), 650);
      }
    } else {
      setPhase('done');
      const score = Math.max(5, Math.min(95, completed * 11));
      onFinish(score, `Recalled sequences up to length ${completed}`);
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.meta}>
        {phase === 'ready' ? 'Memory Sequence' : phase === 'watch' ? `Watch the pattern… (length ${level})` : phase === 'repeat' ? 'Your turn: repeat the pattern' : 'Round complete'}
      </Text>
      <View style={styles.grid}>
        {PADS.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.pad,
              { borderColor: p.color },
              { backgroundColor: lit === p.id ? p.color : `${p.color}14` },
            ]}
            onPress={() => tapPad(p.id)}
            disabled={phase !== 'repeat'}
            activeOpacity={0.7}
          />
        ))}
      </View>
      <View style={styles.statusRow}>
        <Text style={styles.status}>Best sequence this run: {completed}</Text>
      </View>
      {phase === 'ready' && (
        <TouchableOpacity style={styles.startBtn} onPress={start}>
          <Text style={styles.startTxt}>START</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.tip}>This trains working-memory span, the same system measured by digit-span tasks. Chunk the pattern into groups to go further.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  meta: { color: C.muted, fontSize: 13, marginBottom: 14, letterSpacing: 0.6, minHeight: 18 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', width: 280, gap: 12, justifyContent: 'center' },
  pad: { width: 130, height: 110, borderRadius: R.lg, borderWidth: 1.5 },
  statusRow: { marginTop: 16 },
  status: { color: C.goldSoft, fontSize: 13, fontWeight: '700' },
  startBtn: { marginTop: 18, backgroundColor: C.gold, borderRadius: R.pill, paddingVertical: 13, paddingHorizontal: 46 },
  startTxt: { color: '#141005', fontWeight: '900', letterSpacing: 2 },
  tip: { color: C.faint, fontSize: 12, textAlign: 'center', marginTop: 16, lineHeight: 17, paddingHorizontal: 10 },
});
