import React, { useMemo, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from '../lib/theme';
import { RootStackParamList, GameId } from '../lib/types';
import { useApp } from '../state/AppContext';
import { factOfTheDay } from '../lib/data/facts';
import { challengeOfTheDay } from '../lib/data/challenges';
import { LESSONS, TOTAL_LESSONS, getCategory } from '../lib/data/lessons';
import { ASSESSMENTS } from '../lib/data/assessments';
import { ZCard, ZTag, SectionHeader, ProgressBar, ZButton } from '../components/ui';
import { ProgressRing } from '../components/ProgressRing';
import { todayStr } from '../lib/storage';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const nav = useNavigation<Nav>();
  const { state, completeChallenge } = useApp();
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const fact = useMemo(() => factOfTheDay(), []);
  const challenge = useMemo(() => challengeOfTheDay(), []);
  const challengeDone = state.challengeDate === todayStr();
  const name = state.profile?.name || 'Explorer';

  const completedLessons = Object.values(state.lessons).filter((l) => l.completedAt).length;
  const lessonPct = Math.round((completedLessons / TOTAL_LESSONS) * 100);

  const recentQuizzes = [...state.quizzes].slice(-3).reverse();
  const avgQuiz = state.quizzes.length
    ? Math.round(state.quizzes.reduce((s, q) => s + q.score, 0) / state.quizzes.length)
    : null;
  const bestTraining = Object.values(state.training).reduce((m, t) => Math.max(m, t?.best || 0), 0);

  const nextLesson = useMemo(() => {
    const interests = state.settings.personalizedTips ? state.profile?.interests || [] : [];
    const interestCatMap: Record<string, string> = {
      'Brain Anatomy': 'anatomy',
      'Cognitive Performance': 'attention',
      'Psychology & Personality': 'personality',
      'Sleep & Recovery': 'health',
      'Sports Neuroscience': 'sports',
      'Learning Techniques': 'plasticity',
      'Emotions & Regulation': 'emotion',
      'Brain Technology': 'methods',
    };
    const preferred = new Set(interests.map((i) => interestCatMap[i]).filter(Boolean));
    const notDone = LESSONS.filter((l) => !state.lessons[l.id]?.completedAt);
    const unlocked = notDone.filter((l) => l.level !== 'Advanced' || state.premium);
    const fromPreferred = unlocked.filter((l) => preferred.has(l.categoryId));
    return (fromPreferred[0] || unlocked[0] || LESSONS[0]);
  }, [state.lessons, state.profile, state.premium, state.settings.personalizedTips]);

  const markChallenge = () => {
    if (!challengeDone) completeChallenge();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>{name.charAt(0).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.hello}>WELCOME BACK</Text>
              <Text style={styles.userName}>{name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => nav.navigate('Assistant')}>
              <Ionicons name="sparkles-outline" size={18} color={C.gold} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => nav.navigate('Settings')}>
              <Ionicons name="settings-outline" size={18} color={C.gold} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Streak + premium strip */}
        <View style={styles.strip}>
          <View style={styles.streakChip}>
            <Ionicons name="flame" size={14} color={state.streak > 0 ? C.gold : C.faint} />
            <Text style={styles.streakTxt}>{state.streak} day streak</Text>
          </View>
          <TouchableOpacity
            style={[styles.streakChip, state.premium && { borderColor: C.borderStrong, backgroundColor: C.goldDim }]}
            onPress={() => nav.navigate('Premium')}
          >
            <Ionicons name={state.premium ? 'diamond' : 'diamond-outline'} size={13} color={state.premium ? C.gold : C.muted} />
            <Text style={[styles.streakTxt, state.premium && { color: C.goldSoft }]}>{state.premium ? 'PREMIUM' : 'FREE PLAN'}</Text>
          </TouchableOpacity>
        </View>

        {/* Premium upgrade banner */}
        {!state.premium && (
          <TouchableOpacity activeOpacity={0.85} onPress={() => nav.navigate('Premium')}>
            <LinearGradient colors={['#1E180A', '#141005']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.premiumBanner}>
              <View style={{ flex: 1 }}>
                <Text style={styles.premiumTitle}>ZION NEURO PREMIUM</Text>
                <Text style={styles.premiumSub}>Advanced lessons, unlimited AI, deeper insights.</Text>
              </View>
              <View style={styles.premiumCta}>
                <Text style={styles.premiumCtaTxt}>UPGRADE</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Daily fact */}
        <SectionHeader title="Daily Neuroscience Fact" style={{ marginTop: 22 }} />
        <ZCard gold style={{ marginBottom: 22 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={styles.factIcon}>
              <Ionicons name="bulb" size={18} color={C.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.factTitle}>{fact.title}</Text>
              <Text style={styles.factText}>{fact.text}</Text>
              <Text style={styles.factSource}>{fact.source}</Text>
            </View>
          </View>
        </ZCard>

        {/* Daily challenge */}
        <SectionHeader title="Daily Brain Challenge" />
        <ZCard style={{ marginBottom: 22, borderColor: challengeDone ? 'rgba(62,207,142,0.35)' : C.border }} onPress={() => { setRevealed(false); setChallengeOpen(true); }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={[styles.factIcon, challengeDone && { backgroundColor: 'rgba(62,207,142,0.12)', borderColor: 'rgba(62,207,142,0.3)' }]}>
              <Ionicons name={challengeDone ? 'checkmark' : 'fitness-outline'} size={18} color={challengeDone ? C.success : C.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeSub} numberOfLines={2}>{challenge.prompt}</Text>
            </View>
            {challengeDone ? (
              <ZTag label="Done" tone="success" />
            ) : (
              <Ionicons name="chevron-forward" size={18} color={C.faint} />
            )}
          </View>
        </ZCard>

        {/* Performance summary */}
        <SectionHeader title="Brain Performance" action="View all" onAction={() => nav.getParent()?.navigate('Progress')} />
        <ZCard style={{ marginBottom: 22 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <ProgressRing value={avgQuiz ?? 0} size={92} stroke={8}>
              <Text style={styles.ringVal}>{avgQuiz ?? '—'}</Text>
              <Text style={styles.ringLbl}>AVG SCORE</Text>
            </ProgressRing>
            <View style={{ flex: 1, gap: 10 }}>
              <SummaryRow icon="school-outline" label="Lessons completed" value={`${completedLessons}/${TOTAL_LESSONS}`} />
              <SummaryRow icon="ribbon-outline" label="Best training score" value={bestTraining ? `${bestTraining}` : '—'} />
              <SummaryRow icon="clipboard-outline" label="Assessments taken" value={`${state.quizzes.length}`} />
            </View>
          </View>
        </ZCard>

        {/* Latest quiz results */}
        <SectionHeader title="Latest Results" action={state.quizzes.length > 0 ? 'History' : undefined} onAction={() => nav.getParent()?.navigate('Progress')} />
        {recentQuizzes.length === 0 ? (
          <ZCard style={{ marginBottom: 22 }}>
            <Text style={styles.emptyTxt}>No results yet. Take your first assessment in the Assess tab to unlock your Brain Profile.</Text>
          </ZCard>
        ) : (
          <ZCard style={{ marginBottom: 22, paddingVertical: 8 }}>
            {recentQuizzes.map((q, i) => (
              <TouchableOpacity key={q.id} style={[styles.resultRow, i < recentQuizzes.length - 1 && styles.resultRowBorder]} onPress={() => nav.navigate('Result', { recordId: q.id })}>
                <View style={[styles.resultIcon, { backgroundColor: scoreColor(q.score) + '1A' }]}>
                  <Text style={[styles.resultScore, { color: scoreColor(q.score) }]}>{q.score}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultTitle} numberOfLines={1}>{q.title}</Text>
                  <Text style={styles.resultSub}>{q.label || new Date(q.date).toLocaleDateString()}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={C.faint} />
              </TouchableOpacity>
            ))}
          </ZCard>
        )}

        {/* Learning progress */}
        <SectionHeader title="Learning Progress" action="Library" onAction={() => nav.getParent()?.navigate('Learn')} />
        <ZCard style={{ marginBottom: 22 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={styles.progressLabel}>Curriculum completion</Text>
            <Text style={styles.progressPct}>{lessonPct}%</Text>
          </View>
          <ProgressBar value={lessonPct} height={8} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={styles.nextLabel}>UP NEXT</Text>
              <Text style={styles.nextTitle} numberOfLines={2}>{nextLesson.title}</Text>
              <Text style={styles.nextCat}>{getCategory(nextLesson.categoryId)?.title} • {nextLesson.minutes} min</Text>
            </View>
            <ZButton label="Start" small onPress={() => nav.navigate('Lesson', { id: nextLesson.id })} style={{ alignSelf: 'center' }} />
          </View>
        </ZCard>

        {/* Recommended lessons */}
        <SectionHeader title="Recommended For You" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -18, paddingHorizontal: 18, marginBottom: 22 }}>
          {LESSONS.filter((l) => !state.lessons[l.id]?.completedAt && (l.level !== 'Advanced' || state.premium)).slice(0, 5).map((l) => (
            <TouchableOpacity key={l.id} style={styles.recCard} onPress={() => nav.navigate('Lesson', { id: l.id })} activeOpacity={0.8}>
              <View style={styles.recTop}>
                <Ionicons name={getCategory(l.categoryId)?.icon as any || 'book-outline'} size={16} color={C.gold} />
                <ZTag label={l.level} tone={l.level === 'Beginner' ? 'success' : l.level === 'Intermediate' ? 'info' : 'violet'} />
              </View>
              <Text style={styles.recTitle} numberOfLines={2}>{l.title}</Text>
              <Text style={styles.recMeta}>{l.minutes} min • {l.quiz.length} questions</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick access quizzes */}
        <SectionHeader title="Quick Assessments" action="All" onAction={() => nav.getParent()?.navigate('Assess')} />
        <View style={styles.quickGrid}>
          {ASSESSMENTS.slice(0, 4).map((a) => (
            <TouchableOpacity key={a.id} style={styles.quickCard} onPress={() => nav.navigate('Quiz', { assessmentId: a.id })} activeOpacity={0.8}>
              <Ionicons name={a.icon as any} size={22} color={C.gold} />
              <Text style={styles.quickTitle} numberOfLines={2}>{a.title}</Text>
              <Text style={styles.quickMeta}>{a.minutes} min</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.disclaimer}>
          ZION NEURO is an educational platform. Content is for learning and self-reflection, not medical advice or diagnosis.
        </Text>
      </ScrollView>

      {/* Challenge modal */}
      <Modal visible={challengeOpen} transparent animationType="slide" onRequestClose={() => setChallengeOpen(false)}>
        <View style={styles.modalBack}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <ZTag label="Daily Challenge" />
            <Text style={styles.modalTitle}>{challenge.title}</Text>
            <Text style={styles.modalPrompt}>{challenge.prompt}</Text>
            {revealed ? (
              <>
                <View style={styles.answerBox}>
                  <Text style={styles.answerLabel}>ANSWER & SCIENCE</Text>
                  <Text style={styles.answerText}>{challenge.answer}</Text>
                  <Text style={styles.insightText}>{challenge.insight}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                  <ZButton
                    label="Train It"
                    icon="game-controller-outline"
                    small
                    style={{ flex: 1 }}
                    onPress={() => {
                      setChallengeOpen(false);
                      markChallenge();
                      nav.navigate('Game', { id: challenge.gameId as GameId });
                    }}
                  />
                  <ZButton label="Close" variant="dark" small style={{ flex: 1 }} onPress={() => { setChallengeOpen(false); markChallenge(); }} />
                </View>
              </>
            ) : (
              <ZButton label="Reveal Answer" icon="eye-outline" onPress={() => setRevealed(true)} style={{ marginTop: 16 }} />
            )}
            <TouchableOpacity style={styles.modalClose} onPress={() => { setChallengeOpen(false); if (revealed) markChallenge(); }}>
              <Ionicons name="close" size={20} color={C.muted} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function scoreColor(s: number) {
  return s >= 75 ? C.success : s >= 50 ? C.gold : C.danger;
}

function SummaryRow({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Ionicons name={icon} size={16} color={C.gold} />
      <Text style={{ color: C.muted, fontSize: 13, flex: 1 }}>{label}</Text>
      <Text style={{ color: C.text, fontSize: 14, fontWeight: '800' }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: C.goldDim,
    borderWidth: 1.5,
    borderColor: C.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { color: C.gold, fontSize: 20, fontWeight: '900' },
  hello: { color: C.muted, fontSize: 10, letterSpacing: 2, fontWeight: '700' },
  userName: { color: C.text, fontSize: 20, fontWeight: '800', letterSpacing: 0.5 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  strip: { flexDirection: 'row', gap: 10, marginTop: 14 },
  streakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.card,
    borderRadius: R.pill,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  streakTxt: { color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 16,
    marginTop: 16,
    gap: 12,
  },
  premiumTitle: { color: C.gold, fontSize: 13, fontWeight: '900', letterSpacing: 1.5 },
  premiumSub: { color: C.muted, fontSize: 12, marginTop: 4, lineHeight: 17 },
  premiumCta: {
    backgroundColor: C.gold,
    borderRadius: R.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  premiumCtaTxt: { color: '#141005', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  factIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factTitle: { color: C.goldSoft, fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },
  factText: { color: C.text, fontSize: 13.5, lineHeight: 20, marginTop: 5 },
  factSource: { color: C.faint, fontSize: 11, marginTop: 7 },
  challengeTitle: { color: C.text, fontSize: 15, fontWeight: '700' },
  challengeSub: { color: C.muted, fontSize: 12.5, marginTop: 3, lineHeight: 17 },
  emptyTxt: { color: C.muted, fontSize: 13, lineHeight: 19 },
  ringVal: { color: C.text, fontSize: 24, fontWeight: '900' },
  ringLbl: { color: C.faint, fontSize: 8, letterSpacing: 1 },
  resultRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11 },
  resultRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  resultIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  resultScore: { fontSize: 15, fontWeight: '900' },
  resultTitle: { color: C.text, fontSize: 14, fontWeight: '700' },
  resultSub: { color: C.muted, fontSize: 12, marginTop: 2 },
  progressLabel: { color: C.muted, fontSize: 13 },
  progressPct: { color: C.gold, fontSize: 14, fontWeight: '900' },
  nextLabel: { color: C.gold, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
  nextTitle: { color: C.text, fontSize: 15, fontWeight: '700', marginTop: 4 },
  nextCat: { color: C.muted, fontSize: 12, marginTop: 3 },
  recCard: {
    width: 200,
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginRight: 12,
  },
  recTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  recTitle: { color: C.text, fontSize: 14, fontWeight: '700', lineHeight: 19, minHeight: 38 },
  recMeta: { color: C.faint, fontSize: 11, marginTop: 8 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickCard: {
    width: '47.5%',
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    alignItems: 'flex-start',
  },
  quickTitle: { color: C.text, fontSize: 13, fontWeight: '700', marginTop: 10, lineHeight: 17 },
  quickMeta: { color: C.faint, fontSize: 11, marginTop: 5 },
  disclaimer: { color: C.faint, fontSize: 10.5, textAlign: 'center', marginTop: 26, lineHeight: 15, paddingHorizontal: 10 },
  modalBack: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: C.surface,
    borderTopLeftRadius: R.xl,
    borderTopRightRadius: R.xl,
    borderWidth: 1,
    borderColor: C.border,
    padding: 22,
    paddingBottom: 34,
  },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.15)', alignSelf: 'center', marginBottom: 16 },
  modalTitle: { color: C.text, fontSize: 21, fontWeight: '800', marginTop: 12 },
  modalPrompt: { color: C.muted, fontSize: 14, lineHeight: 21, marginTop: 10 },
  answerBox: {
    backgroundColor: C.goldDim,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginTop: 16,
  },
  answerLabel: { color: C.gold, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
  answerText: { color: C.text, fontSize: 13.5, lineHeight: 20, marginTop: 6 },
  insightText: { color: C.muted, fontSize: 12, lineHeight: 17, marginTop: 8, fontStyle: 'italic' },
  modalClose: { position: 'absolute', top: 18, right: 18 },
});
