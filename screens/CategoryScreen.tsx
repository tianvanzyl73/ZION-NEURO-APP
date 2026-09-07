import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { getCategory, lessonsInCategory } from '../lib/data/lessons';
import { useApp } from '../state/AppContext';
import { ZTag } from '../components/ui';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, 'Category'>;

export default function CategoryScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { state } = useApp();
  const cat = getCategory(route.params.id);
  if (!cat) return null;
  const lessons = lessonsInCategory(cat.id);
  const locked = cat.level === 'Advanced' && !state.premium;

  return (
    <View style={styles.safe}>
      <View style={styles.hero}>
        <View style={styles.iconWrap}>
          <Ionicons name={cat.icon as any} size={26} color={C.gold} />
        </View>
        <Text style={styles.title}>{cat.title}</Text>
        <Text style={styles.blurb}>{cat.blurb}</Text>
        <ZTag label={cat.level} tone={cat.level === 'Beginner' ? 'success' : cat.level === 'Intermediate' ? 'info' : 'violet'} style={{ alignSelf: 'center', marginTop: 10 }} />
      </View>

      {locked && (
        <TouchableOpacity style={styles.lockBanner} onPress={() => nav.navigate('Premium')} activeOpacity={0.85}>
          <Ionicons name="lock-closed" size={18} color={C.gold} />
          <View style={{ flex: 1 }}>
            <Text style={styles.lockTitle}>Premium Track</Text>
            <Text style={styles.lockSub}>Unlock advanced lessons with ZION NEURO Premium.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={C.gold} />
        </TouchableOpacity>
      )}

      <FlatList
        data={lessons}
        keyExtractor={(l) => l.id}
        contentContainerStyle={{ padding: 18, paddingTop: 4, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const prog = state.lessons[item.id];
          const done = !!prog?.completedAt;
          const read = !!prog?.read;
          return (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => {
                if (locked) nav.navigate('Premium');
                else nav.navigate('Lesson', { id: item.id });
              }}
            >
              <View style={[styles.numWrap, done && { backgroundColor: C.gold, borderColor: C.gold }]}>
                {done ? (
                  <Ionicons name="checkmark" size={16} color="#141005" />
                ) : (
                  <Text style={[styles.num, read && { color: C.goldSoft }]}>{index + 1}</Text>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowTitle, done && { color: C.muted }]}>{item.title}</Text>
                <Text style={styles.rowMeta}>
                  {item.minutes} min read • {item.quiz.length}-question quiz
                  {prog?.quizScore !== undefined ? ` • Best: ${prog.quizScore}%` : ''}
                </Text>
              </View>
              {locked ? (
                <Ionicons name="lock-closed" size={15} color={C.gold} />
              ) : (
                <Ionicons name={done ? 'ribbon-outline' : read ? 'book-outline' : 'chevron-forward'} size={17} color={done ? C.success : C.faint} />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  hero: { alignItems: 'center', paddingHorizontal: 28, paddingTop: 10, paddingBottom: 20 },
  iconWrap: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: { color: C.text, fontSize: 22, fontWeight: '900', textAlign: 'center', letterSpacing: 0.5 },
  blurb: { color: C.muted, fontSize: 13, textAlign: 'center', lineHeight: 19, marginTop: 8 },
  lockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 18,
    backgroundColor: '#171408',
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 14,
  },
  lockTitle: { color: C.goldSoft, fontSize: 14, fontWeight: '800' },
  lockSub: { color: C.muted, fontSize: 12, marginTop: 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: C.card,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginBottom: 10,
  },
  numWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: { color: C.muted, fontSize: 13, fontWeight: '800' },
  rowTitle: { color: C.text, fontSize: 14.5, fontWeight: '700' },
  rowMeta: { color: C.muted, fontSize: 11.5, marginTop: 3 },
});
