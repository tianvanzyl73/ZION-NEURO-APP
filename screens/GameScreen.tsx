import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { useApp } from '../state/AppContext';
import { ReactionGame } from '../games/ReactionGame';
import { StroopGame } from '../games/StroopGame';
import { SequenceGame } from '../games/SequenceGame';
import { GridGame } from '../games/GridGame';
import { GAMES } from './TrainScreen';
import { ZButton } from '../components/ui';
import { ProgressRing } from '../components/ProgressRing';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function GameScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'Game'>>();
  const { state, recordTraining } = useApp();
  const gameId = route.params.id;
  const meta = GAMES.find((g) => g.id === gameId)!;
  const [runKey, setRunKey] = useState(0);
  const [result, setResult] = useState<{ score: number; detail: string; newBest: boolean } | null>(null);
  const stat = state.training[gameId];

  const onFinish = (score: number, detail: string) => {
    // Capture the previous best BEFORE recording, since recordTraining
    // updates state and would otherwise make every score look like a "best".
    const prevBest = state.training[gameId]?.best ?? 0;
    recordTraining(gameId, score);
    setResult({ score, detail, newBest: score > prevBest && score > 0 });
  };

  const color = (result?.score ?? 0) >= 75 ? C.success : (result?.score ?? 0) >= 50 ? C.gold : C.danger;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 20, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <View style={styles.iconWrap}>
          <Ionicons name={meta.icon as any} size={24} color={C.gold} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{meta.title}</Text>
          <Text style={styles.domain}>{meta.domain}</Text>
        </View>
        {stat && (
          <View style={styles.bestWrap}>
            <Text style={styles.bestLabel}>BEST</Text>
            <Text style={styles.bestVal}>{stat.best}</Text>
          </View>
        )}
      </View>

      <View style={{ marginTop: 18 }} key={runKey}>
        {gameId === 'reaction' && <ReactionGame onFinish={onFinish} />}
        {gameId === 'stroop' && <StroopGame onFinish={onFinish} />}
        {gameId === 'sequence' && <SequenceGame onFinish={onFinish} />}
        {gameId === 'grid' && <GridGame onFinish={onFinish} />}
      </View>

      <Modal visible={!!result} transparent animationType="fade" onRequestClose={() => setResult(null)}>
        <View style={styles.modalBack}>
          <View style={styles.modalCard}>
            <Text style={styles.modalKicker}>DRILL COMPLETE</Text>
            <View style={{ alignItems: 'center', marginVertical: 18 }}>
              <ProgressRing value={result?.score ?? 0} size={130} stroke={10} color={color}>
                <Text style={[styles.modalScore, { color }]}>{result?.score}</Text>
                <Text style={styles.modalScoreLbl}>SCORE</Text>
              </ProgressRing>
            </View>
            <Text style={styles.modalDetail}>{result?.detail}</Text>
            {result?.newBest && (
              <View style={styles.newBest}>
                <Ionicons name="trophy" size={14} color={C.gold} />
                <Text style={styles.newBestTxt}>New personal best!</Text>
              </View>
            )}
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
              <ZButton label="Play Again" variant="outline" icon="refresh" style={{ flex: 1 }} onPress={() => { setResult(null); setRunKey((k) => k + 1); }} />
              <ZButton label="Done" icon="checkmark" style={{ flex: 1 }} onPress={() => nav.goBack()} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: C.text, fontSize: 19, fontWeight: '900' },
  domain: { color: C.gold, fontSize: 11, letterSpacing: 1.5, marginTop: 3, fontWeight: '700', textTransform: 'uppercase' },
  bestWrap: { alignItems: 'center', backgroundColor: C.card, borderRadius: R.md, borderWidth: 1, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 8 },
  bestLabel: { color: C.faint, fontSize: 9, letterSpacing: 1.5, fontWeight: '800' },
  bestVal: { color: C.gold, fontSize: 20, fontWeight: '900' },
  modalBack: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', alignItems: 'center', justifyContent: 'center', padding: 26 },
  modalCard: {
    width: '100%',
    backgroundColor: C.surface,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 24,
    alignItems: 'center',
  },
  modalKicker: { color: C.gold, fontSize: 11, letterSpacing: 2.5, fontWeight: '900' },
  modalScore: { fontSize: 38, fontWeight: '900' },
  modalScoreLbl: { color: C.faint, fontSize: 9, letterSpacing: 2 },
  modalDetail: { color: C.muted, fontSize: 13.5, textAlign: 'center', lineHeight: 20 },
  newBest: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: C.goldDim, borderRadius: R.pill, borderWidth: 1, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 7, marginTop: 14 },
  newBestTxt: { color: C.goldSoft, fontSize: 12.5, fontWeight: '800' },
});
