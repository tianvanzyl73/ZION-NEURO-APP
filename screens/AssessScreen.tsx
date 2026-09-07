import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { ASSESSMENTS } from '../lib/data/assessments';
import { useApp } from '../state/AppContext';
import { latestByKind } from '../lib/scoring';
import { challengeOfTheDay } from '../lib/data/challenges';
import { todayStr } from '../lib/storage';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function AssessScreen() {
  const nav = useNavigation<Nav>();
  const { state, completeChallenge } = useApp();
  const challenge = challengeOfTheDay();
  const challengeDone = state.challengeDate === todayStr();
  const drillTitles: Record<string, string> = {
    reaction: 'Reaction Speed',
    stroop: 'Stroop Focus',
    sequence: 'Memory Sequence',
    grid: 'Grid Memory',
  };

  const startChallenge = () => {
    if (!challengeDone) completeChallenge();
    nav.navigate('Game', { id: challenge.gameId });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>ASSESSMENT CENTER</Text>
            <Text style={styles.title}>Know Thyself</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="analytics-outline" size={18} color={C.gold} />
          </View>
        </View>
        <Text style={styles.intro}>
          Responsible, research-informed questionnaires for self-reflection. Results are educational, not diagnostic.
        </Text>

        {/* Brain profile CTA */}
        <TouchableOpacity activeOpacity={0.85} onPress={() => nav.navigate('BrainProfile')}>
          <LinearGradient colors={['#1E180A', '#100E08']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.profileCta}>
            <View style={styles.profileIcon}>
              <Ionicons name="finger-print-outline" size={22} color={C.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileTitle}>ZION NEURO Brain Profile</Text>
              <Text style={styles.profileSub}>Your personalized cognitive portrait & training plan</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={C.gold} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Daily challenge */}
        <TouchableOpacity style={[styles.challenge, challengeDone && { borderColor: 'rgba(62,207,142,0.35)' }]} onPress={startChallenge} activeOpacity={0.8}>
          <View style={styles.chIcon}>
            <Ionicons name={challengeDone ? 'checkmark' : 'fitness-outline'} size={18} color={challengeDone ? C.success : C.gold} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.chTitle}>Daily Cognitive Challenge</Text>
            <Text style={styles.chSub}>{challenge.title} • linked drill: {drillTitles[challenge.gameId] || challenge.gameId}</Text>
          </View>
          <Ionicons name="play" size={16} color={C.gold} />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>QUESTIONNAIRES</Text>
        {ASSESSMENTS.map((a) => {
          const last = latestByKind(state.quizzes, a.id);
          return (
            <TouchableOpacity key={a.id} style={styles.card} onPress={() => nav.navigate('Quiz', { assessmentId: a.id })} activeOpacity={0.8}>
              <View style={styles.cardIcon}>
                <Ionicons name={a.icon as any} size={22} color={C.gold} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{a.title}</Text>
                <Text style={styles.cardSub} numberOfLines={2}>{a.tagline}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.metaTxt}>{a.items.length} items • ~{a.minutes} min</Text>
                  {last && (
                    <View style={styles.lastScore}>
                      <Text style={styles.lastScoreTxt}>Last: {last.score}{last.label ? ` • ${last.label}` : ''}</Text>
                    </View>
                  )}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={C.faint} />
            </TouchableOpacity>
          );
        })}

        <Text style={styles.footnote}>
          These tools support self-reflection and learning. They are not medical or psychological instruments; persistent concerns should be discussed with a qualified professional.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
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
  intro: { color: C.muted, fontSize: 13, lineHeight: 19, marginTop: 10, marginBottom: 16 },
  profileCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 16,
    marginBottom: 14,
  },
  profileIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTitle: { color: C.goldSoft, fontSize: 15, fontWeight: '800' },
  profileSub: { color: C.muted, fontSize: 12, marginTop: 3, lineHeight: 16 },
  challenge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginBottom: 22,
  },
  chIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chTitle: { color: C.text, fontSize: 14, fontWeight: '700' },
  chSub: { color: C.muted, fontSize: 11.5, marginTop: 2 },
  sectionLabel: { color: C.gold, fontSize: 11, fontWeight: '900', letterSpacing: 2, marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 15,
    marginBottom: 12,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { color: C.text, fontSize: 15, fontWeight: '800' },
  cardSub: { color: C.muted, fontSize: 12, marginTop: 3, lineHeight: 16 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 7 },
  metaTxt: { color: C.faint, fontSize: 11 },
  lastScore: { backgroundColor: C.goldDim, borderRadius: R.pill, paddingHorizontal: 8, paddingVertical: 3 },
  lastScoreTxt: { color: C.goldSoft, fontSize: 10.5, fontWeight: '700' },
  footnote: { color: C.faint, fontSize: 10.5, lineHeight: 15, textAlign: 'center', marginTop: 14, paddingHorizontal: 8 },
});
