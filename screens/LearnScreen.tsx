import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { CATEGORIES, lessonsInCategory } from '../lib/data/lessons';
import { useApp } from '../state/AppContext';
import { ProgressBar, ZTag } from '../components/ui';
import { NeuronBackdrop } from '../components/NeuronBackdrop';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function LearnScreen() {
  const nav = useNavigation<Nav>();
  const { state } = useApp();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>ZION NEURO ACADEMY</Text>
          <Text style={styles.title}>Learn Neuroscience</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="school-outline" size={18} color={C.gold} />
        </View>
      </View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ padding: 18, paddingTop: 6, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.intro}>
            A structured path from beginner fundamentals to advanced performance neuroscience. Complete lesson quizzes to earn progress.
          </Text>
        }
        renderItem={({ item }) => {
          const lessons = lessonsInCategory(item.id);
          const done = lessons.filter((l) => state.lessons[l.id]?.completedAt).length;
          const pct = Math.round((done / lessons.length) * 100);
          const locked = item.level === 'Advanced' && !state.premium;
          return (
            <TouchableOpacity
              style={[styles.card, locked && { opacity: 0.75 }]}
              activeOpacity={0.8}
              onPress={() => nav.navigate('Category', { id: item.id })}
            >
              <View style={styles.cardTop}>
                <View style={styles.iconWrap}>
                  <Ionicons name={item.icon as any} size={20} color={C.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardBlurb} numberOfLines={2}>{item.blurb}</Text>
                </View>
                {locked ? (
                  <View style={styles.lockWrap}>
                    <Ionicons name="lock-closed" size={16} color={C.gold} />
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={18} color={C.faint} />
                )}
              </View>
              <View style={styles.cardBottom}>
                <ZTag label={item.level} tone={item.level === 'Beginner' ? 'success' : item.level === 'Intermediate' ? 'info' : 'violet'} />
                <Text style={styles.countTxt}>{done}/{lessons.length} lessons</Text>
                {locked && <Text style={styles.premiumTxt}>PREMIUM</Text>}
              </View>
              <ProgressBar value={pct} height={5} style={{ marginTop: 12 }} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 12 },
  kicker: { color: C.gold, fontSize: 10, letterSpacing: 2.5, fontWeight: '800' },
  title: { color: C.text, fontSize: 26, fontWeight: '900', marginTop: 4, letterSpacing: 0.5 },
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
  intro: { color: C.muted, fontSize: 13, lineHeight: 19, marginBottom: 16 },
  card: {
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 14,
  },
  cardTop: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { color: C.text, fontSize: 15.5, fontWeight: '800' },
  cardBlurb: { color: C.muted, fontSize: 12, marginTop: 3, lineHeight: 16 },
  lockWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottom: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 13 },
  countTxt: { color: C.muted, fontSize: 12 },
  premiumTxt: { color: C.gold, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
});
