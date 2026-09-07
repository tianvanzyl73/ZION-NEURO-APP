import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { useApp } from '../state/AppContext';
import { buildBrainProfile, BIGFIVE_NAMES } from '../lib/scoring';
import { ZCard, ZTag, ZButton, ProgressBar, SectionHeader, EmptyState } from '../components/ui';
import { BrainMark } from '../components/BrainLogo';
import { GAMES } from './TrainScreen';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function BrainProfileScreen() {
  const nav = useNavigation<Nav>();
  const { state } = useApp();
  const p = buildBrainProfile(state);

  if (!p.ready) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg, justifyContent: 'center' }}>
        <EmptyState
          icon="finger-print-outline"
          title="Your Brain Profile awaits"
          subtitle="Complete assessments in the Assessment Center and ZION NEURO will assemble your personalized cognitive portrait, strengths and training plan."
          actionLabel="Go to Assessments"
          onAction={() => nav.getParent()?.navigate('Assess')}
        />
        <Text style={styles.privNote}>Profiles are built locally from your own answers. Nothing leaves your device.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 18, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <LinearGradient colors={['#1E180A', '#0E0C08']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <BrainMark size={54} />
        <Text style={styles.heroKicker}>ZION NEURO BRAIN PROFILE</Text>
        <Text style={styles.heroName}>{state.profile?.name || 'Explorer'}</Text>
        <Text style={styles.heroSub}>
          {p.completed}/5 assessments integrated • updated {new Date().toLocaleDateString()}
        </Text>
      </LinearGradient>

      {/* Cognitive style */}
      {p.lr && (
        <ZCard style={{ marginTop: 16 }}>
          <SectionTitle icon="swap-horizontal-outline" title="Cognitive Style" />
          <Text style={styles.bigLabel}>{p.lr.label}</Text>
          <Text style={styles.body}>{p.lr.summary}</Text>
          {p.lr.detail && (
            <>
              <View style={styles.lrRow}>
                <Text style={styles.lrLbl}>Analytical {p.lr.detail.L}</Text>
                <View style={styles.lrTrack}>
                  <View style={[styles.lrFill, { width: `${(p.lr.detail.L / Math.max(1, p.lr.detail.L + p.lr.detail.R)) * 100}%` }]} />
                </View>
                <Text style={styles.lrLbl}>Holistic {p.lr.detail.R}</Text>
              </View>
              <Text style={styles.note}>Preferences, not hemispheric dominance: healthy brains integrate both sides.</Text>
            </>
          )}
        </ZCard>
      )}

      {/* Temperament */}
      {p.temperament && (
        <ZCard style={{ marginTop: 14 }}>
          <SectionTitle icon="color-palette-outline" title="Temperament Blend" />
          <Text style={styles.bigLabel}>{p.temperament.label}</Text>
          <Text style={styles.body}>{p.temperament.summary}</Text>
          {p.temperament.detail &&
            Object.entries(p.temperament.detail)
              .sort((a, b) => b[1] - a[1])
              .map(([t, v]) => (
                <View key={t} style={{ marginTop: 10 }}>
                  <View style={styles.barHead}>
                    <Text style={styles.barLabel}>{t === 'S' ? 'Sanguine' : t === 'C' ? 'Choleric' : t === 'M' ? 'Melancholic' : 'Phlegmatic'}</Text>
                    <Text style={styles.barVal}>{v}</Text>
                  </View>
                  <ProgressBar value={(v / 12) * 100} height={6} />
                </View>
              ))}
        </ZCard>
      )}

      {/* Big Five */}
      {p.bigfive?.detail && (
        <ZCard style={{ marginTop: 14 }}>
          <SectionTitle icon="analytics-outline" title="Big Five Personality" />
          {Object.entries(p.bigfive.detail).map(([t, v]) => (
            <View key={t} style={{ marginTop: 10 }}>
              <View style={styles.barHead}>
                <Text style={styles.barLabel}>{BIGFIVE_NAMES[t]}</Text>
                <Text style={styles.barVal}>{v}/100</Text>
              </View>
              <ProgressBar value={v} height={6} color={v >= 60 ? C.gold : C.info} />
            </View>
          ))}
        </ZCard>
      )}

      {/* Cognitive indexes */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 14 }}>
        {p.memory && (
          <ZCard style={{ flex: 1 }}>
            <SectionTitle icon="layers-outline" title="Memory" small />
            <Text style={[styles.indexVal, { color: idxColor(p.memory.score) }]}>{p.memory.score}</Text>
            <Text style={styles.indexLbl}>Self-rated index</Text>
          </ZCard>
        )}
        {p.attention && (
          <ZCard style={{ flex: 1 }}>
            <SectionTitle icon="focus-outline" title="Attention" small />
            <Text style={[styles.indexVal, { color: idxColor(p.attention.score) }]}>{p.attention.score}</Text>
            <Text style={styles.indexLbl}>Self-rated index</Text>
          </ZCard>
        )}
      </View>

      {/* Strengths */}
      {p.strengths.length > 0 && (
        <ZCard style={{ marginTop: 14 }}>
          <SectionTitle icon="star-outline" title="Identified Strengths" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {p.strengths.map((s) => (
              <ZTag key={s} label={s} />
            ))}
          </View>
        </ZCard>
      )}

      {/* Training plan */}
      <SectionHeader title="Your Training Plan" style={{ marginTop: 22 }} />
      {p.recs.map((r) => {
        const g = GAMES.find((x) => x.id === r.gameId)!;
        return (
          <TouchableOpacity key={r.gameId + r.reason} style={styles.planRow} onPress={() => nav.navigate('Game', { id: r.gameId })} activeOpacity={0.8}>
            <View style={styles.planIcon}>
              <Ionicons name={g.icon as any} size={19} color={C.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.planTitle}>{g.title}</Text>
              <Text style={styles.planReason}>{r.reason}</Text>
            </View>
            <Ionicons name="play" size={16} color={C.gold} />
          </TouchableOpacity>
        );
      })}

      <ZButton label="Retake Assessments" variant="outline" icon="refresh" style={{ marginTop: 20 }} onPress={() => nav.getParent()?.navigate('Assess')} />
      <Text style={styles.privNote}>
        Your Brain Profile is a reflective summary of your own answers, for education and motivation. It is not a clinical or diagnostic evaluation.
      </Text>
    </ScrollView>
  );
}

function idxColor(v: number) {
  return v >= 75 ? C.success : v >= 50 ? C.gold : C.danger;
}

function SectionTitle({ icon, title, small }: { icon: any; title: string; small?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: small ? 6 : 10 }}>
      <Ionicons name={icon} size={small ? 14 : 16} color={C.gold} />
      <Text style={[styles.sectionTitle, small && { fontSize: 11 }]}>{title.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 22,
    alignItems: 'center',
  },
  heroKicker: { color: C.gold, fontSize: 10, letterSpacing: 2.5, fontWeight: '900', marginTop: 14 },
  heroName: { color: C.text, fontSize: 26, fontWeight: '900', marginTop: 6 },
  heroSub: { color: C.muted, fontSize: 12, marginTop: 6 },
  bigLabel: { color: C.goldSoft, fontSize: 19, fontWeight: '900' },
  body: { color: C.muted, fontSize: 13, lineHeight: 19, marginTop: 6 },
  lrRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 },
  lrLbl: { color: C.muted, fontSize: 10.5, fontWeight: '700' },
  lrTrack: { flex: 1, height: 9, borderRadius: 5, backgroundColor: 'rgba(106,167,255,0.25)', overflow: 'hidden' },
  lrFill: { height: 9, backgroundColor: C.gold, borderRadius: 5 },
  note: { color: C.faint, fontSize: 11, marginTop: 10, lineHeight: 15 },
  barHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  barLabel: { color: C.text, fontSize: 13, fontWeight: '700' },
  barVal: { color: C.gold, fontSize: 12.5, fontWeight: '800' },
  indexVal: { fontSize: 34, fontWeight: '900' },
  indexLbl: { color: C.faint, fontSize: 10.5, marginTop: 2 },
  sectionTitle: { color: C.gold, fontSize: 12, fontWeight: '900', letterSpacing: 1.6 },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: '#171408',
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 14,
    marginBottom: 10,
  },
  planIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTitle: { color: C.text, fontSize: 14.5, fontWeight: '800' },
  planReason: { color: C.muted, fontSize: 12, marginTop: 3, lineHeight: 16 },
  privNote: { color: C.faint, fontSize: 10.5, textAlign: 'center', marginTop: 18, lineHeight: 15, paddingHorizontal: 12 },
});
