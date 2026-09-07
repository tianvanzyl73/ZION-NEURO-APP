import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from '../lib/theme';
import { RootStackParamList } from '../lib/types';
import { useApp } from '../state/AppContext';
import { confirmDialog } from '../lib/dialog';
import { ZTag } from '../components/ui';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileHubScreen() {
  const nav = useNavigation<Nav>();
  const { state, resetAll } = useApp();
  const p = state.profile;

  const confirmReset = () => {
    confirmDialog(
      'Reset ZION NEURO',
      'This erases your profile, progress and settings from this device. Continue?',
      'Erase Everything',
      () => resetAll(),
      true
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Identity card */}
        <LinearGradient colors={['#1E180A', '#0E0C08']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.idCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>{(p?.name || 'E').charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{p?.name || 'Explorer'}</Text>
          <Text style={styles.sub}>
            {p?.occupation || 'Member'}{p?.age ? ` • ${p.age}` : ''}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 12, justifyContent: 'center' }}>
            {(p?.goals || []).slice(0, 3).map((g) => (
              <ZTag key={g} label={g} />
            ))}
          </View>
          <View style={[styles.memberChip, state.premium && { borderColor: C.borderStrong, backgroundColor: C.goldDim }]}>
            <Ionicons name={state.premium ? 'diamond' : 'person-outline'} size={13} color={state.premium ? C.gold : C.muted} />
            <Text style={[styles.memberTxt, state.premium && { color: C.goldSoft }]}>
              {state.premium ? 'PREMIUM MEMBER' : 'FREE MEMBER'}
            </Text>
          </View>
        </LinearGradient>

        {/* Menu */}
        <MenuItem icon="finger-print-outline" title="Brain Profile" sub="Cognitive style, traits & training plan" onPress={() => nav.navigate('BrainProfile')} />
        <MenuItem icon="sparkles-outline" title="ZION NEURO AI" sub="Your neuroscience study assistant" onPress={() => nav.navigate('Assistant')} gold />
        <MenuItem icon="diamond-outline" title="Membership" sub={state.premium ? 'Premium active' : 'Compare Free vs Premium'} onPress={() => nav.navigate('Premium')} />
        <MenuItem icon="trophy-outline" title="Sports & Performance" sub="Reaction, motor learning, flow" onPress={() => nav.navigate('Sports')} />
        <MenuItem icon="shield-checkmark-outline" title="Settings & Privacy" sub="Data controls, preferences, security" onPress={() => nav.navigate('Settings')} />

        <TouchableOpacity style={styles.resetRow} onPress={confirmReset}>
          <Ionicons name="trash-outline" size={17} color={C.danger} />
          <Text style={styles.resetTxt}>Erase all data & sign out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>ZION NEURO v1.0.0 • Educational platform, not medical advice</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({ icon, title, sub, onPress, gold }: { icon: any; title: string; sub: string; onPress: () => void; gold?: boolean }) {
  return (
    <TouchableOpacity style={[styles.menuItem, gold && { borderColor: C.borderStrong }]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.menuIcon, gold && { backgroundColor: C.gold }]}>
        <Ionicons name={icon} size={19} color={gold ? '#141005' : C.gold} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSub}>{sub}</Text>
      </View>
      <Ionicons name="chevron-forward" size={17} color={C.faint} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  idCard: {
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.goldDim,
    borderWidth: 2,
    borderColor: C.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { color: C.gold, fontSize: 30, fontWeight: '900' },
  name: { color: C.text, fontSize: 23, fontWeight: '900', marginTop: 12 },
  sub: { color: C.muted, fontSize: 13, marginTop: 4 },
  memberChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: R.pill,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginTop: 16,
    backgroundColor: C.card,
  },
  memberTxt: { color: C.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 15,
    marginBottom: 11,
  },
  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: { color: C.text, fontSize: 15, fontWeight: '800' },
  menuSub: { color: C.muted, fontSize: 12, marginTop: 2 },
  resetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14, paddingVertical: 10 },
  resetTxt: { color: C.danger, fontSize: 13, fontWeight: '700' },
  version: { color: C.faint, fontSize: 10.5, textAlign: 'center', marginTop: 16 },
});
