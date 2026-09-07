import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { lessonsInCategory } from '../lib/data/lessons';
import { useApp } from '../state/AppContext';
import { ZCard } from '../components/ui';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const QUICK_FACTS = [
  'Simple visual reaction time averages ~200–250 ms; auditory reactions are faster at ~150 ms.',
  'Elite athletes win on anticipation and pattern recognition more than raw reflex speed.',
  'Sleep after practice consolidates motor skills; overnight improvement is a studied phenomenon.',
  'Pressure often causes choking by shifting attention to step-by-step control of automatic skills.',
];

export default function SportsScreen() {
  const nav = useNavigation<Nav>();
  const { state } = useApp();
  const lessons = lessonsInCategory('sports');
  const locked = !state.premium;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#1E180A', C.bg]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ padding: 22, paddingTop: 12 }}>
        <View style={styles.heroIcon}>
          <Ionicons name="trophy-outline" size={26} color={C.gold} />
        </View>
        <Text style={styles.kicker}>SPECIAL TRACK</Text>
        <Text style={styles.title}>Sports & Performance Neuroscience</Text>
        <Text style={styles.sub}>
          How the brain produces fast reactions, learns skills, handles pressure and enters flow — the science behind athletic performance.
        </Text>
      </LinearGradient>

      <View style={{ padding: 18, paddingTop: 6 }}>
        <TouchableOpacity style={styles.drillCta} onPress={() => nav.navigate('Game', { id: 'reaction' })} activeOpacity={0.85}>
          <Ionicons name="flash" size={18} color="#141005" />
          <Text style={styles.drillCtaTxt}>TEST YOUR REACTION TIME</Text>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>TRACK LESSONS</Text>
        {lessons.map((l, i) => {
          const done = !!state.lessons[l.id]?.completedAt;
          return (
            <TouchableOpacity
              key={l.id}
              style={styles.lessonRow}
              onPress={() => (locked ? nav.navigate('Premium') : nav.navigate('Lesson', { id: l.id }))}
              activeOpacity={0.8}
            >
              <View style={[styles.numWrap, done && { backgroundColor: C.gold, borderColor: C.gold }]}>
                {done ? (
                  <Ionicons name="checkmark" size={15} color="#141005" />
                ) : (
                  <Text style={[styles.num, state.lessons[l.id]?.read && { color: C.goldSoft }]}>{i + 1}</Text>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.lessonTitle}>{l.title}</Text>
                <Text style={styles.lessonMeta}>{l.minutes} min • {l.quiz.length} questions</Text>
              </View>
              {locked ? (
                <Ionicons name="lock-closed" size={15} color={C.gold} />
              ) : (
                <Ionicons name="chevron-forward" size={16} color={C.faint} />
              )}
            </TouchableOpacity>
          );
        })}
        {locked && (
          <TouchableOpacity onPress={() => nav.navigate('Premium')} style={{ marginTop: 4 }}>
            <Text style={styles.unlockTxt}>This is a Premium track. Tap to unlock →</Text>
          </TouchableOpacity>
        )}

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>QUICK FACTS</Text>
        <ZCard>
          {QUICK_FACTS.map((f, i) => (
            <View key={i} style={[styles.factRow, i < QUICK_FACTS.length - 1 && { marginBottom: 12 }]}>
              <Ionicons name="ribbon-outline" size={14} color={C.gold} style={{ marginTop: 2 }} />
              <Text style={styles.factTxt}>{f}</Text>
            </View>
          ))}
        </ZCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  kicker: { color: C.gold, fontSize: 10, letterSpacing: 2.5, fontWeight: '900' },
  title: { color: C.text, fontSize: 24, fontWeight: '900', marginTop: 6, lineHeight: 30 },
  sub: { color: C.muted, fontSize: 13.5, lineHeight: 20, marginTop: 10 },
  drillCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: C.gold,
    borderRadius: R.pill,
    paddingVertical: 14,
    marginBottom: 22,
  },
  drillCtaTxt: { color: '#141005', fontWeight: '900', fontSize: 13, letterSpacing: 1.2 },
  sectionLabel: { color: C.gold, fontSize: 11, fontWeight: '900', letterSpacing: 2, marginBottom: 12 },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: C.card,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginBottom: 10,
  },
  numWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: { color: C.muted, fontSize: 12, fontWeight: '800' },
  lessonTitle: { color: C.text, fontSize: 14.5, fontWeight: '700' },
  lessonMeta: { color: C.muted, fontSize: 11.5, marginTop: 3 },
  unlockTxt: { color: C.gold, fontSize: 13, fontWeight: '700' },
  factRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  factTxt: { color: C.text, fontSize: 13, lineHeight: 19, flex: 1 },
});
