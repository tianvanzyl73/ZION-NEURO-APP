import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { C, R } from '../lib/theme';

const COUNTS = [3, 3, 4, 4, 5, 5, 6, 6];

function pickCells(count: number): number[] {
  const pool = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

export function GridGame({ onFinish }: { onFinish: (score: number, detail: string) => void }) {
  const [phase, setPhase] = useState<'ready' | 'flash' | 'recall' | 'done'>('ready');
  const [round, setRound] = useState(1);
  const [targets, setTargets] = useState<number[]>([]);
  const [picked, setPicked] = useState<number[]>([]);
  const totalCorrect = useRef(0);
  const totalCells = useRef(0);
  const finished = useRef(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const startRound = (r: number) => {
    const t = pickCells(COUNTS[r - 1]);
    setTargets(t);
    setPicked([]);
    setPhase('flash');
    setTimeout(() => {
      if (alive.current && !finished.current) setPhase('recall');
    }, 1400);
  };

  const start = () => {
    setRound(1);
    totalCorrect.current = 0;
    totalCells.current = 0;
    finished.current = false;
    startRound(1);
  };

  const tap = (i: number) => {
    if (phase !== 'recall' || finished.current || picked.includes(i)) return;
    const next = [...picked, i];
    setPicked(next);
    if (next.length >= targets.length) {
      const correct = next.filter((c) => targets.includes(c)).length;
      totalCorrect.current += correct;
      totalCells.current += targets.length;
      if (round >= COUNTS.length) {
        finished.current = true;
        setPhase('done');
        const score = Math.max(5, Math.min(100, Math.round((totalCorrect.current / totalCells.current) * 100)));
        onFinish(score, `${totalCorrect.current}/${totalCells.current} cells recalled across ${COUNTS.length} rounds`);
      } else {
        setTimeout(() => {
          if (!alive.current || finished.current) return;
          setRound(round + 1);
          startRound(round + 1);
        }, 750);
      }
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.meta}>
        {phase === 'ready'
          ? 'Grid Memory'
          : phase === 'flash'
          ? `Memorize the gold cells… (round ${round}/${COUNTS.length})`
          : phase === 'recall'
          ? `Tap the ${targets.length} cells that lit up`
          : 'Round complete'}
      </Text>
      <View style={styles.grid}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const flashing = phase === 'flash' && targets.includes(i);
          const selected = picked.includes(i) && (phase === 'recall' || phase === 'done');
          const good = selected && targets.includes(i);
          const bad = selected && !targets.includes(i);
          return (
            <TouchableOpacity
              key={i}
              onPress={() => tap(i)}
              disabled={phase !== 'recall'}
              style={[
                styles.cell,
                flashing && { backgroundColor: C.gold, borderColor: C.gold },
                good && { backgroundColor: 'rgba(62,207,142,0.3)', borderColor: C.success },
                bad && { backgroundColor: 'rgba(240,97,109,0.25)', borderColor: C.danger },
              ]}
              activeOpacity={0.7}
            />
          );
        })}
      </View>
      <Text style={styles.status}>
        Round {Math.min(round, COUNTS.length)} / {COUNTS.length} • Recalled: {totalCorrect.current}
      </Text>
      {(phase === 'ready' || phase === 'done') && (
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => {
            setPhase('ready');
          }}
        >
          <Text style={styles.startTxt}>{phase === 'done' ? 'RESET' : 'START'}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.tip}>Visuospatial memory span: try grouping cells into shapes or rows to boost recall.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  meta: { color: C.muted, fontSize: 13, marginBottom: 14, letterSpacing: 0.6, minHeight: 18, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', width: 282, gap: 9 },
  cell: {
    width: 88,
    height: 88,
    borderRadius: R.md,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: '#101018',
  },
  status: { color: C.goldSoft, fontSize: 13, fontWeight: '700', marginTop: 16 },
  startBtn: { marginTop: 18, backgroundColor: C.gold, borderRadius: R.pill, paddingVertical: 13, paddingHorizontal: 46 },
  startTxt: { color: '#141005', fontWeight: '900', letterSpacing: 2 },
  tip: { color: C.faint, fontSize: 12, textAlign: 'center', marginTop: 16, lineHeight: 17, paddingHorizontal: 10 },
});
