import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from '../lib/theme';
import { RootStackParamList, GameId } from '../lib/types';
import { useApp } from '../state/AppContext';
import { buildBrainProfile } from '../lib/scoring';
import { ZTag } from '../components/ui';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const GAMES: { id: GameId; title: string; desc: string; icon: string; domain: string }[] = [
  { id: 'reaction', title: 'Reaction Speed', desc: 'Tap the instant the pad turns gold. Trains processing speed and alertness.', icon: 'flash-outline', domain: 'Processing Speed' },
  { id: 'stroop', title: 'Stroop Focus', desc: 'Name the ink color, not the word. Trains selective attention and control.', icon: 'color-filter-outline', domain: 'Attention' },
  { id: 'sequence', title: 'Memory Sequence', desc: 'Watch and repeat growing patterns. Trains working-memory span.', icon: 'grid-outline', domain: 'Working Memory' },
  { id: 'grid', title: 'Grid Memory', desc: 'Recall which cells flashed. Trains visuospatial memory.', icon: 'apps-outline', domain: 'Spatial Memory' },
];

export default function TrainScreen() {
  const nav = useNavigation<Nav>();
  const { state } = useApp();
  const profile = buildBrainProfile(state);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>NEURO TRAINING</Text>
            <Text style={styles.title}>Train Your Brain</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="barbell-outline" size={18} color={C.gold} />
          </View>
        </View>
        <Text style={styles.intro}>
          Short, targeted drills. Consistency beats intensity: a few minutes daily builds real skills.
        </Text>

        <View style={styles.recHeader}>
          <Ionicons name="sparkles" size={14} color={C.gold} />
          <Text style={styles.recHeaderText}>PERSONALIZED FOR YOU</Text>
        </View>
        {profile.recs.map((r) => {
          const g = GAMES.find((x) => x.id === r.gameId)!;
          return (
            <TouchableOpacity key={r.gameId} style={styles.recCard} onPress={() => nav.navigate('Game', { id: g.id })} activeOpacity={0.8}>
              <View style={styles.recIcon}>
                <Ionicons name={g.icon as any} size={20} color="#141005" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.recTitle}>{g.title}</Text>
                <Text style={styles.recReason}>{r.reason}</Text>
              </View>
              <Ionicons name="play" size={18} color={C.gold} />
            </TouchableOpacity>
          );
        })}
        {!profile.ready && (
          <TouchableOpacity style={styles.assessCta} onPress={() => nav.getParent()?.navigate('Assess')} activeOpacity={0.8}>
            <Text style={styles.assessCtaTxt}>Complete assessments to sharpen these recommendations →</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity activeOpacity={0.85} onPress={() => nav.navigate('Sports')} style={{ marginTop: 22 }}>
          <LinearGradient colors={['#1E180A', '#100E08']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.sportsBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sportsKicker}>SPECIAL TRACK</Text>
              <Text style={styles.sportsTitle}>Sports & Performance Neuroscience</Text>
              <Text style={styles.sportsSub}>Reaction time, motor learning, pressure & flow</Text>
            </View>
            <View style={styles.sportsIcon}>
              <Ionicons name="trophy-outline" size={22} color={C.gold} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>ALL DRILLS</Text>
        {GAMES.map((g) => {
          const stat = state.training[g.id];
          return (
            <TouchableOpacity key={g.id} style={styles.gameCard} onPress={() => nav.navigate('Game', { id: g.id })} activeOpacity={0.8}>
              <View style={styles.gameIcon}>
                <Ionicons name={g.icon as any} size={22} color={C.gold} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <Text style={styles.gameTitle}>{g.title}</Text>
                  <ZTag label={g.domain} tone="muted" />
                </View>
                <Text style={styles.gameDesc}>{g.desc}</Text>
                <Text style={styles.gameStats}>
                  {stat ? `Best ${stat.best} • ${stat.plays} plays • Last ${stat.lastScore}` : 'Not played yet'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={C.faint} />
            </TouchableOpacity>
          );
        })}

        <Text style={styles.footnote}>
          Training drills exercise specific skills. Drill improvements are real; broad "brain boosting" claims from any single app are not established in research, so we focus on measurable skill practice.
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
  intro: { color: C.muted, fontSize: 13, lineHeight: 19, marginTop: 10 },
  recHeader: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 20, marginBottom: 10 },
  recHeaderText: { color: C.gold, fontSize: 11, fontWeight: '900', letterSpacing: 2 },
  recCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#171408',
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 14,
    marginBottom: 10,
  },
  recIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: C.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recTitle: { color: C.text, fontSize: 15, fontWeight: '800' },
  recReason: { color: C.muted, fontSize: 12, marginTop: 3, lineHeight: 16 },
  assessCta: { marginTop: 4, marginBottom: 6 },
  assessCtaTxt: { color: C.gold, fontSize: 12.5, fontWeight: '700' },
  sportsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 16,
  },
  sportsKicker: { color: C.gold, fontSize: 9, letterSpacing: 2, fontWeight: '900' },
  sportsTitle: { color: C.text, fontSize: 16, fontWeight: '800', marginTop: 4 },
  sportsSub: { color: C.muted, fontSize: 12, marginTop: 3 },
  sportsIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: { color: C.gold, fontSize: 11, fontWeight: '900', letterSpacing: 2, marginBottom: 12 },
  gameCard: {
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
  gameIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameTitle: { color: C.text, fontSize: 15, fontWeight: '800' },
  gameDesc: { color: C.muted, fontSize: 12, marginTop: 4, lineHeight: 16 },
  gameStats: { color: C.goldSoft, fontSize: 11, marginTop: 6, fontWeight: '700' },
  footnote: { color: C.faint, fontSize: 10.5, lineHeight: 15, textAlign: 'center', marginTop: 12, paddingHorizontal: 6 },
});
