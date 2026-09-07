import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { getLesson, getCategory } from '../lib/data/lessons';
import { useApp } from '../state/AppContext';
import { ZCard, ZTag, ZButton } from '../components/ui';
import { GoldDivider } from '../components/BrainLogo';
import { Diagram } from '../components/Diagram';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, 'Lesson'>;

export default function LessonScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { state, markLessonRead } = useApp();
  const lesson = getLesson(route.params.id);

  useEffect(() => {
    if (lesson) markLessonRead(lesson.id);
  }, [lesson?.id]);

  if (!lesson) return null;
  const cat = getCategory(lesson.categoryId);
  const prog = state.lessons[lesson.id];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 18, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
      <ZTag label={`${lesson.level} • ${lesson.minutes} min`} />
      <Text style={styles.title}>{lesson.title}</Text>
      {cat && <Text style={styles.cat}>{cat.title}</Text>}
      <Text style={styles.summary}>{lesson.summary}</Text>

      {lesson.diagram && (
        <View style={{ marginTop: 18 }}>
          <Diagram kind={lesson.diagram} />
        </View>
      )}

      {lesson.sections.map((s, i) => (
        <View key={i} style={{ marginTop: 22 }}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionNum}>
              <Text style={styles.sectionNumTxt}>{i + 1}</Text>
            </View>
            <Text style={styles.sectionTitle}>{s.heading}</Text>
          </View>
          <Text style={styles.sectionText}>{s.text}</Text>
        </View>
      ))}

      <View style={{ marginTop: 26 }}>
        <GoldDivider style={{ marginBottom: 18 }} />
        <View style={styles.factsHead}>
          <Ionicons name="key-outline" size={16} color={C.gold} />
          <Text style={styles.factsTitle}>KEY FACTS</Text>
        </View>
        {lesson.keyFacts.map((f, i) => (
          <View key={i} style={styles.factRow}>
            <View style={styles.factDot} />
            <Text style={styles.factText}>{f}</Text>
          </View>
        ))}
      </View>

      <ZCard gold style={{ marginTop: 20 }}>
        <View style={styles.exampleHead}>
          <Ionicons name="flask-outline" size={15} color={C.gold} />
          <Text style={styles.exampleLabel}>REAL-WORLD EXAMPLE</Text>
        </View>
        <Text style={styles.exampleText}>{lesson.example}</Text>
      </ZCard>

      <View style={styles.quizBox}>
        <View style={{ flex: 1 }}>
          <Text style={styles.quizTitle}>Lesson Quiz</Text>
          <Text style={styles.quizSub}>
            {prog?.quizScore !== undefined
              ? `Best score: ${prog.quizScore}%${prog.completedAt ? ' • Completed' : ' • 60%+ to complete'}`
              : `${lesson.quiz.length} questions • score 60%+ to complete`}
          </Text>
        </View>
        <ZButton label={prog?.quizScore !== undefined ? 'Retake' : 'Start'} small icon="help-circle-outline" onPress={() => nav.navigate('LessonQuiz', { lessonId: lesson.id })} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { color: C.text, fontSize: 25, fontWeight: '900', marginTop: 12, letterSpacing: 0.3, lineHeight: 32 },
  cat: { color: C.gold, fontSize: 12, letterSpacing: 1.5, marginTop: 8, fontWeight: '700', textTransform: 'uppercase' },
  summary: { color: C.muted, fontSize: 14, lineHeight: 21, marginTop: 10 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionNumTxt: { color: C.gold, fontSize: 11, fontWeight: '900' },
  sectionTitle: { color: C.text, fontSize: 16.5, fontWeight: '800', flexShrink: 1 },
  sectionText: { color: C.muted, fontSize: 14, lineHeight: 22, marginTop: 10 },
  factsHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  factsTitle: { color: C.gold, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  factRow: { flexDirection: 'row', gap: 10, marginBottom: 10, alignItems: 'flex-start' },
  factDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.gold, marginTop: 7 },
  factText: { color: C.text, fontSize: 13.5, lineHeight: 20, flex: 1 },
  exampleHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  exampleLabel: { color: C.gold, fontSize: 11, fontWeight: '900', letterSpacing: 1.6 },
  exampleText: { color: C.text, fontSize: 13.5, lineHeight: 21 },
  quizBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginTop: 24,
  },
  quizTitle: { color: C.text, fontSize: 16, fontWeight: '800' },
  quizSub: { color: C.muted, fontSize: 12, marginTop: 3 },
});
