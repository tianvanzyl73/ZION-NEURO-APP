import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { useApp } from '../state/AppContext';
import { TOTAL_LESSONS } from '../lib/data/lessons';
import { ProgressRing } from '../components/ProgressRing';
import { StatBox, SectionHeader, ZCard, EmptyState } from '../components/ui';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ProgressScreen() {
  const nav = useNavigation<Nav>();
  const { state } = useApp();

  const completedLessons = Object.values(state.lessons).filter((l) => l.completedAt).length;
  const lessonPct = Math.round((completedLessons / TOTAL_LESSONS) * 100);
  const avgQuiz = state.quizzes.length
    ? Math.round(state.quizzes.reduce((s, q) => s + q.score, 0) / state.quizzes.length)
    : 0;
  const totalActivities = state.quizzes.length + Object.values(state.training).reduce((s, t) => s + (t?.plays || 0), 0) + completedLessons;
  const bestTraining = Object.values(state.training).reduce((m, t) => Math.max(m, t?.best || 0), 0);

  const recent = useMemo(() => [...state.quizzes].slice(-10), [state.quizzes]);
  const history = useMemo(() => [...state.quizzes].reverse(), [state.quizzes]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={history}
        keyExtractor={(q) => q.id}
        contentContainerStyle={{ padding: 18, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.kicker}>PROGRESS DASHBOARD</Text>
                <Text style={styles.title}>Your Trajectory</Text>
              </View>
              <View style={styles.badge}>
                <Ionicons name="trending-up-outline" size={18} color={C.gold} />
              </View>
            </View>

            {/* Stat boxes */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
              <StatBox icon="flame" value={`${state.streak}`} label="Day Streak" />
              <StatBox icon="pulse-outline" value={`${totalActivities}`} label="Activities" color={C.info} />
              <StatBox icon="ribbon-outline" value={bestTraining ? `${bestTraining}` : '—'} label="Best Drill" color={C.success} />
            </View>

            {/* Rings */}
            <ZCard style={{ marginTop: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center' }}>
                  <ProgressRing value={lessonPct} size={96} stroke={8}>
                    <Text style={styles.ringVal}>{lessonPct}%</Text>
                    <Text style={styles.ringLbl}>LEARN</Text>
                  </ProgressRing>
                  <Text style={styles.ringCaption}>{completedLessons}/{TOTAL_LESSONS} lessons</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <ProgressRing value={avgQuiz} size={96} stroke={8} color={C.info}>
                    <Text style={[styles.ringVal, { color: C.info }]}>{avgQuiz}</Text>
                    <Text style={styles.ringLbl}>AVG QUIZ</Text>
                  </ProgressRing>
                  <Text style={styles.ringCaption}>{state.quizzes.length} assessments</Text>
                </View>
              </View>
            </ZCard>

            {/* Score chart */}
            <SectionHeader title="Recent Quiz Scores" style={{ marginTop: 22 }} />
            <ZCard>
              {recent.length === 0 ? (
                <Text style={styles.emptyMini}>Complete quizzes and assessments to see your score history here.</Text>
              ) : (
                <View style={styles.chart}>
                  {recent.map((q, i) => (
                    <View key={q.id} style={styles.barCol}>
                      <Text style={styles.barVal}>{q.score}</Text>
                      <View style={styles.barTrack}>
                        <View
                          style={[
                            styles.barFill,
                            {
                              height: `${Math.max(6, q.score)}%`,
                              backgroundColor: q.score >= 75 ? C.success : q.score >= 50 ? C.gold : C.danger,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.barIdx}>{i + 1}</Text>
                    </View>
                  ))}
                </View>
              )}
            </ZCard>

            {/* Training bests */}
            <SectionHeader title="Training Bests" style={{ marginTop: 22 }} />
            <ZCard style={{ paddingVertical: 8 }}>
              {Object.keys(state.training).length === 0 ? (
                <Text style={[styles.emptyMini, { paddingVertical: 10 }]}>Play drills in the Train tab to record best scores.</Text>
              ) : (
                Object.entries(state.training).map(([id, t]) => (
                  <View key={id} style={styles.trainRow}>
                    <Ionicons name="game-controller-outline" size={16} color={C.gold} />
                    <Text style={styles.trainName}>{id === 'reaction' ? 'Reaction Speed' : id === 'stroop' ? 'Stroop Focus' : id === 'sequence' ? 'Memory Sequence' : 'Grid Memory'}</Text>
                    <Text style={styles.trainStat}>Best {t!.best}</Text>
                    <Text style={styles.trainPlays}>{t!.plays} plays</Text>
                  </View>
                ))
              )}
            </ZCard>

            <SectionHeader title="Full History" style={{ marginTop: 22 }} />
            {history.length === 0 ? (
              <EmptyState
                icon="analytics-outline"
                title="No data yet"
                subtitle="Take assessments, complete lesson quizzes and play drills. Everything you do is tracked here."
                actionLabel="Explore Assessments"
                onAction={() => nav.getParent()?.navigate('Assess')}
              />
            ) : null}
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.histRow} onPress={() => nav.navigate('Result', { recordId: item.id })} activeOpacity={0.75}>
            <View style={[styles.histIcon, { backgroundColor: scoreColor(item.score) + '1A' }]}>
              <Text style={[styles.histScore, { color: scoreColor(item.score) }]}>{item.score}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.histTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.histSub}>
                {item.label ? `${item.label} • ` : ''}{new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={15} color={C.faint} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

function scoreColor(s: number) {
  return s >= 75 ? C.success : s >= 50 ? C.gold : C.danger;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  kicker: { color: C.gold, fontSize: 10, letterSpacing: 2.5, fontWeight: '800' },
  title: { color: C.text, fontSize: 26, fontWeight: '900', marginTop: 4 },
  badge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringVal: { color: C.text, fontSize: 20, fontWeight: '900' },
  ringLbl: { color: C.faint, fontSize: 8, letterSpacing: 1 },
  ringCaption: { color: C.muted, fontSize: 11.5, marginTop: 8 },
  emptyMini: { color: C.muted, fontSize: 13, lineHeight: 19 },
  chart: { flexDirection: 'row', alignItems: 'flex-end', gap: 7, height: 130 },
  barCol: { flex: 1, alignItems: 'center', gap: 5 },
  barVal: { color: C.muted, fontSize: 9, fontWeight: '700' },
  barTrack: { flex: 1, width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 5, justifyContent: 'flex-end', overflow: 'hidden' },
  barFill: { width: '100%', borderRadius: 5 },
  barIdx: { color: C.faint, fontSize: 9 },
  trainRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  trainName: { color: C.text, fontSize: 13.5, fontWeight: '700', flex: 1 },
  trainStat: { color: C.gold, fontSize: 13, fontWeight: '800' },
  trainPlays: { color: C.faint, fontSize: 11 },
  histRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.card,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    padding: 13,
    marginBottom: 10,
  },
  histIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  histScore: { fontSize: 14, fontWeight: '900' },
  histTitle: { color: C.text, fontSize: 13.5, fontWeight: '700' },
  histSub: { color: C.muted, fontSize: 11.5, marginTop: 2 },
});
