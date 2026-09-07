import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { C, R } from '../lib/theme';
import { RootStackParamList, GameId } from '../lib/types';
import { useApp } from '../state/AppContext';
import { ProgressRing } from '../components/ProgressRing';
import { ZButton, ZCard, ZTag, ProgressBar } from '../components/ui';
import { BIGFIVE_NAMES, TEMPERAMENT_NAMES } from '../lib/scoring';
import { getAssessment } from '../lib/data/assessments';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ResultScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'Result'>>();
  const { state } = useApp();
  const record = state.quizzes.find((q) => q.id === route.params.recordId);

  if (!record) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: C.muted }}>Result not found.</Text>
      </View>
    );
  }

  const color = record.score >= 75 ? C.success : record.score >= 50 ? C.gold : C.danger;
  const assessment = getAssessment(record.kind);

  const retake = () => {
    if (assessment) nav.replace('Quiz', { assessmentId: assessment.id });
    else nav.goBack();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 22, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
      <View style={styles.ringWrap}>
        <ProgressRing value={record.score} size={150} stroke={11} color={color}>
          <Text style={[styles.scoreBig, { color }]}>{record.score}</Text>
          <Text style={styles.scoreLbl}>SCORE</Text>
        </ProgressRing>
      </View>
      <Text style={styles.title}>{record.title}</Text>
      {record.label && (
        <View style={{ alignSelf: 'center', marginTop: 8 }}>
          <ZTag label={record.label} />
        </View>
      )}
      <Text style={styles.date}>{new Date(record.date).toLocaleString()}</Text>

      {/* Detail breakdowns */}
      {record.kind === 'bigfive' && record.detail && (
        <ZCard style={{ marginTop: 22 }}>
          <Text style={styles.cardTitle}>Trait Breakdown</Text>
          {Object.entries(record.detail).map(([t, v]) => (
            <View key={t} style={{ marginTop: 12 }}>
              <View style={styles.barHead}>
                <Text style={styles.barLabel}>{BIGFIVE_NAMES[t]}</Text>
                <Text style={styles.barVal}>{v}/100</Text>
              </View>
              <ProgressBar value={v} height={7} />
            </View>
          ))}
          <Text style={styles.note}>
            Traits are spectrums, not judgments. Each pole carries strengths depending on context.
          </Text>
        </ZCard>
      )}

      {record.kind === 'temperament' && record.detail && (
        <ZCard style={{ marginTop: 22 }}>
          <Text style={styles.cardTitle}>Your Temperament Blend</Text>
          {Object.entries(record.detail)
            .sort((a, b) => b[1] - a[1])
            .map(([t, v]) => (
              <View key={t} style={{ marginTop: 12 }}>
                <View style={styles.barHead}>
                  <Text style={styles.barLabel}>{TEMPERAMENT_NAMES[t]?.name || t}</Text>
                  <Text style={styles.barVal}>{v} answers</Text>
                </View>
                <ProgressBar value={(v / 12) * 100} height={7} />
              </View>
            ))}
          <Text style={styles.note}>{TEMPERAMENT_NAMES[Object.entries(record.detail).sort((a, b) => b[1] - a[1])[0][0]]?.desc}</Text>
        </ZCard>
      )}

      {record.kind === 'lr' && record.detail && (
        <ZCard style={{ marginTop: 22 }}>
          <Text style={styles.cardTitle}>Cognitive Preference Balance</Text>
          <View style={styles.lrRow}>
            <Text style={styles.lrLabel}>Analytical</Text>
            <View style={styles.lrTrack}>
              <View style={[styles.lrFillL, { width: `${(record.detail.L / (record.detail.L + record.detail.R)) * 100}%` }]} />
            </View>
            <Text style={styles.lrLabel}>Holistic</Text>
          </View>
          <Text style={styles.lrNums}>{record.detail.L} analytical • {record.detail.R} holistic responses</Text>
          <Text style={styles.note}>
            Reminder: real cognition uses both hemispheres together. This reflects your reported preferences, not brain localization.
          </Text>
        </ZCard>
      )}

      {(record.kind === 'memory' || record.kind === 'attention') && (
        <ZCard style={{ marginTop: 22 }}>
          <Text style={styles.cardTitle}>Interpretation</Text>
          <Text style={styles.note}>
            {record.score >= 75
              ? 'You report strong everyday habits in this domain. Maintain them with sleep, exercise and regular training drills.'
              : record.score >= 50
              ? 'You report moderate habits in this domain. Targeted training drills and habit tweaks can move the needle.'
              : 'You report this domain as challenging. Consistent training, better sleep and reduced multitasking are evidence-based starting points. Persistent difficulties deserve a professional conversation.'}
          </Text>
        </ZCard>
      )}

      {/* Recommended training */}
      <ZCard style={{ marginTop: 16 }}>
        <Text style={styles.cardTitle}>Train This Domain</Text>
        {(record.kind === 'memory' || record.kind === 'bigfive' || record.kind === 'lesson' ? [
          { g: 'sequence' as GameId, t: 'Memory Sequence', d: 'Working-memory span drill' },
          { g: 'grid' as GameId, t: 'Grid Memory', d: 'Visuospatial recall drill' },
        ] : record.kind === 'attention' || record.kind === 'lr' ? [
          { g: 'stroop' as GameId, t: 'Stroop Focus', d: 'Selective attention drill' },
          { g: 'reaction' as GameId, t: 'Reaction Speed', d: 'Processing speed drill' },
        ] : [
          { g: 'reaction' as GameId, t: 'Reaction Speed', d: 'Processing speed drill' },
          { g: 'stroop' as GameId, t: 'Stroop Focus', d: 'Cognitive control drill' },
        ]).map((r) => (
          <TouchableOpacity key={r.g} style={styles.trainRow} onPress={() => nav.navigate('Game', { id: r.g })} activeOpacity={0.75}>
            <View style={styles.trainIcon}>
              <Ionicons name="game-controller-outline" size={17} color={C.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.trainTitle}>{r.t}</Text>
              <Text style={styles.trainSub}>{r.d}</Text>
            </View>
            <Ionicons name="play" size={16} color={C.gold} />
          </TouchableOpacity>
        ))}
      </ZCard>

      <View style={{ flexDirection: 'row', gap: 12, marginTop: 22 }}>
        {assessment && <ZButton label="Retake" variant="outline" icon="refresh" onPress={retake} style={{ flex: 1 }} />}
        <ZButton label="Done" icon="checkmark" onPress={() => nav.popToTop()} style={{ flex: 1 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ringWrap: { alignItems: 'center', marginTop: 10 },
  scoreBig: { fontSize: 42, fontWeight: '900' },
  scoreLbl: { color: C.faint, fontSize: 10, letterSpacing: 2 },
  title: { color: C.text, fontSize: 20, fontWeight: '800', textAlign: 'center', marginTop: 18 },
  date: { color: C.faint, fontSize: 12, textAlign: 'center', marginTop: 8 },
  cardTitle: { color: C.goldSoft, fontSize: 13, fontWeight: '900', letterSpacing: 1.5, textTransform: 'uppercase' },
  barHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { color: C.text, fontSize: 13.5, fontWeight: '700' },
  barVal: { color: C.gold, fontSize: 13, fontWeight: '800' },
  note: { color: C.muted, fontSize: 12.5, lineHeight: 19, marginTop: 14 },
  lrRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14 },
  lrLabel: { color: C.muted, fontSize: 11, fontWeight: '700' },
  lrTrack: { flex: 1, height: 10, borderRadius: 5, backgroundColor: 'rgba(106,167,255,0.25)', overflow: 'hidden' },
  lrFillL: { height: 10, backgroundColor: C.gold, borderRadius: 5 },
  lrNums: { color: C.muted, fontSize: 12, textAlign: 'center', marginTop: 10 },
  trainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.bgSoft,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    padding: 13,
    marginTop: 12,
  },
  trainIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: C.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trainTitle: { color: C.text, fontSize: 14, fontWeight: '700' },
  trainSub: { color: C.muted, fontSize: 11.5, marginTop: 2 },
});
