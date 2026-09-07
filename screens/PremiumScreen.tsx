import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from '../lib/theme';
import { useApp } from '../state/AppContext';
import { confirmDialog, infoDialog } from '../lib/dialog';
import { ZCard, ZButton, ZTag } from '../components/ui';
import { BrainMark } from '../components/BrainLogo';

const FREE_FEATURES = [
  'Beginner & intermediate lessons',
  'All core assessments & Brain Profile',
  'Daily fact, challenge & training drills',
  '5 ZION NEURO AI messages per day',
];

const PREMIUM_FEATURES = [
  'Everything in Free, plus:',
  'Advanced lessons & Methods track',
  'Sports & Performance full track',
  'Unlimited ZION NEURO AI conversations',
  'Deep progress insights & history',
  'Gold member badge & early features',
];

const PLANS = [
  { id: 'monthly', name: 'Monthly', price: '$7.99', per: '/month', note: 'Flexible, cancel anytime' },
  { id: 'yearly', name: 'Yearly', price: '$49.99', per: '/year', note: 'Save 48% — best value', best: true },
  { id: 'lifetime', name: 'Lifetime', price: '$129.99', per: 'once', note: 'Pay once, forever' },
];

export default function PremiumScreen() {
  const nav = useNavigation();
  const { state, setPremium } = useApp();
  const [plan, setPlan] = useState('yearly');
  const [processing, setProcessing] = useState(false);

  const activate = () => {
    const p = PLANS.find((x) => x.id === plan)!;
    confirmDialog(
      'Confirm Subscription',
      `Activate ZION NEURO Premium (${p.name}, ${p.price}${p.per})? This demo activates instantly without a real payment.`,
      'Activate',
      () => {
        setProcessing(true);
        setTimeout(() => {
          setPremium(true);
          setProcessing(false);
          infoDialog(
            'Welcome to Premium',
            'Your ZION NEURO membership is now active. Advanced tracks and unlimited AI are unlocked.',
            'Explore',
            () => nav.goBack()
          );
        }, 900);
      }
    );
  };

  if (state.premium) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 22, paddingBottom: 50, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 30 }} />
        <BrainMark size={80} />
        <Text style={styles.activeTitle}>PREMIUM ACTIVE</Text>
        <Text style={styles.activeSub}>
          Member since {state.premiumSince ? new Date(state.premiumSince).toLocaleDateString() : 'today'}. Enjoy full access to the ZION NEURO library.
        </Text>
        <ZCard style={{ marginTop: 24, alignSelf: 'stretch' }}>
          {PREMIUM_FEATURES.slice(1).map((f) => (
            <View key={f} style={styles.featRow}>
              <Ionicons name="checkmark-circle" size={16} color={C.success} />
              <Text style={styles.featTxt}>{f}</Text>
            </View>
          ))}
        </ZCard>
        <ZButton label="Back to Dashboard" icon="home-outline" style={{ marginTop: 24, alignSelf: 'stretch' }} onPress={() => nav.goBack()} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 22, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: 'center' }}>
        <BrainMark size={64} />
        <Text style={styles.kicker}>ZION NEURO</Text>
        <Text style={styles.title}>Unlock Your Full Mind</Text>
        <Text style={styles.sub}>One membership. The complete neuroscience platform.</Text>
      </View>

      {/* Comparison */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
        <ZCard style={{ flex: 1 }}>
          <Text style={styles.planHead}>FREE</Text>
          {FREE_FEATURES.map((f) => (
            <View key={f} style={styles.featRow}>
              <Ionicons name="checkmark" size={14} color={C.muted} />
              <Text style={[styles.featTxt, { color: C.muted }]}>{f}</Text>
            </View>
          ))}
        </ZCard>
        <LinearGradient colors={['#1E180A', '#12100A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.premCard]}>
          <Text style={[styles.planHead, { color: C.gold }]}>PREMIUM</Text>
          {PREMIUM_FEATURES.map((f, i) => (
            <View key={f} style={styles.featRow}>
              {i === 0 ? <View style={{ width: 14 }} /> : <Ionicons name="checkmark" size={14} color={C.gold} />}
              <Text style={[styles.featTxt, i === 0 && { color: C.goldSoft, fontWeight: '800' }]}>{f}</Text>
            </View>
          ))}
        </LinearGradient>
      </View>

      {/* Plans */}
      <Text style={styles.chooseHead}>CHOOSE YOUR PLAN</Text>
      {PLANS.map((p) => {
        const on = plan === p.id;
        return (
          <TouchableOpacity key={p.id} style={[styles.planRow, on && styles.planRowOn]} onPress={() => setPlan(p.id)} activeOpacity={0.8}>
            <View style={[styles.radio, on && styles.radioOn]} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.planName}>{p.name}</Text>
                {p.best && <ZTag label="Best Value" />}
              </View>
              <Text style={styles.planNote}>{p.note}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.planPrice}>{p.price}</Text>
              <Text style={styles.planPer}>{p.per}</Text>
            </View>
          </TouchableOpacity>
        );
      })}

      <ZButton label={`Activate Premium`} icon="diamond" loading={processing} onPress={activate} style={{ marginTop: 20 }} />
      <Text style={styles.demoNote}>
        Demo subscription: activates instantly on this device with no real charge. In the Play Store build, this connects to Google Play Billing.
      </Text>
      <Text style={styles.restoreNote}>Subscriptions are personal, non-transferable, and support continued content development.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  kicker: { color: C.gold, fontSize: 10, letterSpacing: 3, fontWeight: '900', marginTop: 16 },
  title: { color: C.text, fontSize: 26, fontWeight: '900', marginTop: 8, textAlign: 'center' },
  sub: { color: C.muted, fontSize: 13.5, marginTop: 8, textAlign: 'center' },
  planHead: { color: C.muted, fontSize: 11, fontWeight: '900', letterSpacing: 2, marginBottom: 10 },
  featRow: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'flex-start' },
  featTxt: { color: C.text, fontSize: 11.5, lineHeight: 15, flex: 1 },
  premCard: {
    flex: 1.25,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderStrong,
    padding: 16,
  },
  chooseHead: { color: C.gold, fontSize: 11, fontWeight: '900', letterSpacing: 2, marginTop: 26, marginBottom: 12 },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 11,
  },
  planRowOn: { borderColor: C.borderStrong, backgroundColor: C.goldDim },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: C.faint },
  radioOn: { borderColor: C.gold, backgroundColor: C.gold },
  planName: { color: C.text, fontSize: 15.5, fontWeight: '800' },
  planNote: { color: C.muted, fontSize: 12, marginTop: 3 },
  planPrice: { color: C.goldSoft, fontSize: 17, fontWeight: '900' },
  planPer: { color: C.faint, fontSize: 11 },
  demoNote: { color: C.faint, fontSize: 10.5, textAlign: 'center', marginTop: 16, lineHeight: 15 },
  restoreNote: { color: C.faint, fontSize: 10.5, textAlign: 'center', marginTop: 8, opacity: 0.7 },
  activeTitle: { color: C.gold, fontSize: 20, fontWeight: '900', letterSpacing: 3, marginTop: 20 },
  activeSub: { color: C.muted, fontSize: 13.5, textAlign: 'center', marginTop: 10, lineHeight: 20, paddingHorizontal: 10 },
});
