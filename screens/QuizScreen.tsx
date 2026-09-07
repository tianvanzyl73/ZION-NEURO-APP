import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { getAssessment } from '../lib/data/assessments';
import { getLesson } from '../lib/data/lessons';
import { scoreAssessment } from '../lib/scoring';
import { useApp } from '../state/AppContext';
import { ZButton, ZCard, ZTag, ProgressBar } from '../components/ui';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const LIKERT_LABELS = ['Disagree', 'Slightly', 'Neutral', 'Mostly', 'Agree'];

export function AssessmentQuizScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'Quiz'>>();
  const { recordQuiz } = useApp();
  const assessment = getAssessment(route.params.assessmentId);
  const [phase, setPhase] = useState<'intro' | 'run'>('intro');
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  if (!assessment) return null;
  const items = assessment.items;
  const item = items[idx];

  const submit = (finalAnswers: number[]) => {
    const result = scoreAssessment(assessment, finalAnswers);
    const id = `${assessment.id}-${Date.now()}`;
    recordQuiz({
      id,
      date: Date.now(),
      kind: assessment.id,
      title: assessment.title,
      score: result.score,
      label: result.label,
      summary: result.summary,
      detail: result.detail,
    });
    nav.replace('Result', { recordId: id });
  };

  const next = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
    setSelected(null);
    if (idx + 1 >= items.length) {
      submit(newAnswers);
    } else {
      setIdx(idx + 1);
    }
  };

  if (phase === 'intro') {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 22, paddingBottom: 50, flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.introIcon}>
            <Ionicons name={assessment.icon as any} size={30} color={C.gold} />
          </View>
          <Text style={styles.introTitle}>{assessment.title}</Text>
          <Text style={styles.introTagline}>{assessment.tagline}</Text>
          <View style={styles.introMeta}>
            <ZTag label={`${items.length} questions`} />
            <ZTag label={`~${assessment.minutes} min`} tone="muted" />
          </View>
          <ZCard style={{ marginTop: 18, backgroundColor: C.goldDim, borderColor: C.border }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Ionicons name="information-circle-outline" size={17} color={C.gold} style={{ marginTop: 1 }} />
              <Text style={styles.disclaimer}>{assessment.disclaimer}</Text>
            </View>
          </ZCard>
          <ZButton label="Begin Assessment" icon="play" onPress={() => setPhase('run')} style={{ marginTop: 26 }} />
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.run}>
      <View style={styles.runHeader}>
        <Text style={styles.runStep}>Question {idx + 1} of {items.length}</Text>
        <Text style={styles.runPct}>{Math.round((idx / items.length) * 100)}%</Text>
      </View>
      <ProgressBar value={(idx / items.length) * 100} height={5} style={{ marginBottom: 24 }} />

      {item.type === 'tagged' && (
        <>
          <Text style={styles.prompt}>{item.prompt}</Text>
          <View style={{ gap: 12, marginTop: 20 }}>
            {item.options.map((o, i) => (
              <TouchableOpacity key={i} style={styles.opt} onPress={() => next(i)} activeOpacity={0.75}>
                <Text style={styles.optText}>{o.text}</Text>
                <Ionicons name="chevron-forward" size={16} color={C.faint} />
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {item.type === 'likert' && (
        <>
          <Text style={styles.prompt}>{item.prompt}</Text>
          <Text style={styles.likertHint}>How much do you agree?</Text>
          <View style={{ gap: 10, marginTop: 18 }}>
            {LIKERT_LABELS.map((l, i) => (
              <TouchableOpacity key={l} style={[styles.likertRow, selected === i && styles.likertRowOn]} onPress={() => setSelected(i)}>
                <View style={[styles.radio, selected === i && styles.radioOn]} />
                <Text style={[styles.likertTxt, selected === i && { color: C.goldSoft }]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ZButton label="Next" disabled={selected === null} onPress={() => selected !== null && next(selected + 1)} style={{ marginTop: 22 }} />
        </>
      )}
    </View>
  );
}

export function LessonQuizScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'LessonQuiz'>>();
  const { recordQuiz, recordLessonQuiz } = useApp();
  const lesson = getLesson(route.params.lessonId);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (!lesson) return null;
  const questions = lesson.quiz;
  const q = questions[idx];

  const choose = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.correct) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    const total = correctCount;
    if (idx + 1 >= questions.length) {
      const score = Math.round((total / questions.length) * 100);
      recordLessonQuiz(lesson.id, score);
      const id = `lesson-${lesson.id}-${Date.now()}`;
      recordQuiz({ id, date: Date.now(), kind: 'lesson', title: `${lesson.title} Quiz`, score, label: score >= 60 ? 'Passed' : 'Keep practicing' });
      nav.replace('Result', { recordId: id });
    } else {
      setIdx(idx + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  return (
    <View style={styles.run}>
      <View style={styles.runHeader}>
        <Text style={styles.runStep}>Lesson Quiz • {idx + 1} of {questions.length}</Text>
        <Text style={styles.runPct}>{correctCount} correct</Text>
      </View>
      <ProgressBar value={(idx / questions.length) * 100} height={5} style={{ marginBottom: 24 }} />
      <Text style={styles.prompt}>{q.q}</Text>
      <View style={{ gap: 12, marginTop: 20 }}>
        {q.options.map((o, i) => {
          const isCorrect = revealed && i === q.correct;
          const isWrong = revealed && selected === i && i !== q.correct;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.opt, isCorrect && styles.optCorrect, isWrong && styles.optWrong]}
              onPress={() => choose(i)}
              activeOpacity={0.75}
              disabled={revealed}
            >
              <Text style={[styles.optText, isCorrect && { color: C.success }, isWrong && { color: C.danger }]}>{o}</Text>
              {isCorrect && <Ionicons name="checkmark-circle" size={18} color={C.success} />}
              {isWrong && <Ionicons name="close-circle" size={18} color={C.danger} />}
            </TouchableOpacity>
          );
        })}
      </View>
      {revealed && (
        <View style={styles.explainBox}>
          <Ionicons name={selected === q.correct ? 'checkmark-circle-outline' : 'bulb-outline'} size={16} color={selected === q.correct ? C.success : C.gold} />
          <Text style={styles.explainText}>
            {selected === q.correct ? 'Correct. ' : 'Not quite. '}
            {q.explain || `The answer is: "${q.options[q.correct]}".`}
          </Text>
        </View>
      )}
      {revealed && <ZButton label={idx + 1 >= questions.length ? 'See Results' : 'Next Question'} onPress={next} style={{ marginTop: 18 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  introIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  introTitle: { color: C.text, fontSize: 24, fontWeight: '900', textAlign: 'center', marginTop: 18, letterSpacing: 0.5 },
  introTagline: { color: C.muted, fontSize: 14, textAlign: 'center', lineHeight: 21, marginTop: 10 },
  introMeta: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 16 },
  disclaimer: { color: C.muted, fontSize: 12.5, lineHeight: 19, flex: 1 },
  run: { flex: 1, backgroundColor: C.bg, padding: 22 },
  runHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  runStep: { color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 0.6 },
  runPct: { color: C.gold, fontSize: 12, fontWeight: '800' },
  prompt: { color: C.text, fontSize: 19, fontWeight: '800', lineHeight: 27 },
  opt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.card,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  optText: { color: C.text, fontSize: 14.5, flex: 1, lineHeight: 20 },
  optCorrect: { borderColor: C.success, backgroundColor: 'rgba(62,207,142,0.08)' },
  optWrong: { borderColor: C.danger, backgroundColor: 'rgba(240,97,109,0.07)' },
  likertHint: { color: C.muted, fontSize: 13, marginTop: 8 },
  likertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.card,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  likertRowOn: { borderColor: C.borderStrong, backgroundColor: C.goldDim },
  radio: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: C.faint },
  radioOn: { borderColor: C.gold, backgroundColor: C.gold },
  likertTxt: { color: C.text, fontSize: 14 },
  explainBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: C.goldDim,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginTop: 18,
    alignItems: 'flex-start',
  },
  explainText: { color: C.text, fontSize: 13, lineHeight: 19, flex: 1 },
});
