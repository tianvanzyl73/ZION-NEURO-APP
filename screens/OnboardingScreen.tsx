import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../lib/theme';
import { BrainMark, BrandTitle, GoldDivider } from '../components/BrainLogo';
import { NeuronBackdrop } from '../components/NeuronBackdrop';
import { ZButton } from '../components/ui';
import { PinDots, PinPad } from '../components/PinPad';
import { useApp } from '../state/AppContext';
import { setPin } from '../lib/storage';

const GOALS = [
  { icon: 'focus-outline', label: 'Improve Focus' },
  { icon: 'layers-outline', label: 'Boost Memory' },
  { icon: 'school-outline', label: 'Learn Neuroscience' },
  { icon: 'barbell-outline', label: 'Athletic Performance' },
  { icon: 'heart-outline', label: 'Brain Health' },
  { icon: 'sparkles-outline', label: 'Self-Discovery' },
];

const OCCUPATIONS = ['Student', 'Working Professional', 'Athlete / Coach', 'Educator', 'Health Professional', 'Other'];

const INTERESTS = [
  'Brain Anatomy',
  'Cognitive Performance',
  'Psychology & Personality',
  'Sleep & Recovery',
  'Sports Neuroscience',
  'Learning Techniques',
  'Emotions & Regulation',
  'Brain Technology',
];

export default function OnboardingScreen() {
  const { setProfile } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [occupation, setOccupation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [pin, setPinVal] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [pinStage, setPinStage] = useState<'set' | 'confirm'>('set');
  const [pinError, setPinError] = useState('');

  const toggle = (list: string[], set: (v: string[]) => void, v: string) => {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  };

  const finish = async () => {
    await setPin(pin);
    setProfile({
      name: name.trim(),
      age: age.trim(),
      goals,
      occupation,
      interests,
      createdAt: Date.now(),
    });
  };

  const onPinKey = (k: string) => {
    setPinError('');
    if (pinStage === 'set') {
      if (k === 'del') return setPinVal((p) => p.slice(0, -1));
      if (pin.length >= 4) return;
      const next = pin + k;
      setPinVal(next);
      if (next.length === 4) {
        setTimeout(() => setPinStage('confirm'), 220);
      }
    } else {
      if (k === 'del') return setPinConfirm((p) => p.slice(0, -1));
      if (pinConfirm.length >= 4) return;
      const next = pinConfirm + k;
      setPinConfirm(next);
      if (next.length === 4) {
        if (next === pin) {
          setTimeout(finish, 250);
        } else {
          setPinError('PINs do not match. Try again.');
          setTimeout(() => {
            setPinVal('');
            setPinConfirm('');
            setPinStage('set');
          }, 600);
        }
      }
    }
  };

  const canNext =
    step === 1 ? name.trim().length >= 2 && age.trim().length > 0
    : step === 2 ? goals.length > 0
    : step === 3 ? occupation.length > 0
    : step === 4 ? interests.length > 0
    : true;

  return (
    <SafeAreaView style={styles.safe}>
      <NeuronBackdrop opacity={0.4} />
      {step === 0 && (
        <View style={styles.hero}>
          <BrainMark size={84} />
          <View style={{ height: 26 }} />
          <BrandTitle size="lg" sub />
          <GoldDivider style={{ width: 180, marginVertical: 26 }} />
          <Text style={styles.heroText}>
            Your premium guide to neuroscience, brain health, cognitive performance and self-discovery.
          </Text>
          <View style={styles.heroFeatures}>
            {[
              { icon: 'school-outline', t: '27 structured lessons' },
              { icon: 'analytics-outline', t: 'Scientific assessments' },
              { icon: 'game-controller-outline', t: 'Brain training drills' },
              { icon: 'chatbubbles-outline', t: 'ZION NEURO AI guide' },
            ].map((f) => (
              <View key={f.t} style={styles.heroFeat}>
                <Ionicons name={f.icon as any} size={16} color={C.gold} />
                <Text style={styles.heroFeatTxt}>{f.t}</Text>
              </View>
            ))}
          </View>
          <ZButton label="Begin Your Journey" icon="arrow-forward" onPress={() => setStep(1)} style={{ marginTop: 30, alignSelf: 'stretch' }} />
          <Text style={styles.privacyNote}>
            All data stays on your device. No account servers, no tracking by default.
          </Text>
        </View>
      )}

      {step >= 1 && step <= 4 && (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
            <View style={styles.stepHeader}>
              <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={22} color={C.gold} />
              </TouchableOpacity>
              <View style={styles.stepDots}>
                {[1, 2, 3, 4].map((s) => (
                  <View key={s} style={[styles.stepDot, s <= step && { backgroundColor: C.gold }]} />
                ))}
              </View>
              <View style={{ width: 34 }} />
            </View>

            {step === 1 && (
              <>
                <Text style={styles.stepTitle}>Welcome, explorer.</Text>
                <Text style={styles.stepSub}>Tell us who is training their brain today.</Text>
                <Text style={styles.fieldLabel}>YOUR NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Alex"
                  placeholderTextColor={C.faint}
                  value={name}
                  onChangeText={setName}
                  returnKeyType="next"
                  autoCapitalize="words"
                />
                <Text style={styles.fieldLabel}>AGE</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 24"
                  placeholderTextColor={C.faint}
                  value={age}
                  onChangeText={(t) => setAge(t.replace(/[^0-9]/g, ''))}
                  keyboardType="number-pad"
                  maxLength={3}
                />
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.stepTitle}>What are your goals?</Text>
                <Text style={styles.stepSub}>Select all that apply. We will tailor your path.</Text>
                <View style={styles.chipGrid}>
                  {GOALS.map((g) => {
                    const on = goals.includes(g.label);
                    return (
                      <TouchableOpacity
                        key={g.label}
                        style={[styles.goalChip, on && styles.goalChipOn]}
                        onPress={() => toggle(goals, setGoals, g.label)}
                      >
                        <Ionicons name={g.icon as any} size={20} color={on ? '#141005' : C.gold} />
                        <Text style={[styles.goalTxt, on && { color: '#141005' }]}>{g.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            )}

            {step === 3 && (
              <>
                <Text style={styles.stepTitle}>What best describes you?</Text>
                <Text style={styles.stepSub}>This helps us tune examples and content.</Text>
                {OCCUPATIONS.map((o) => {
                  const on = occupation === o;
                  return (
                    <TouchableOpacity
                      key={o}
                      style={[styles.occRow, on && styles.occRowOn]}
                      onPress={() => setOccupation(o)}
                    >
                      <Ionicons name={on ? 'radio-button-on' : 'radio-button-off'} size={20} color={C.gold} />
                      <Text style={[styles.occTxt, on && { color: C.goldSoft }]}>{o}</Text>
                    </TouchableOpacity>
                  );
                })}
              </>
            )}

            {step === 4 && (
              <>
                <Text style={styles.stepTitle}>Pick your interests</Text>
                <Text style={styles.stepSub}>We will recommend lessons to match.</Text>
                <View style={styles.interestWrap}>
                  {INTERESTS.map((it) => {
                    const on = interests.includes(it);
                    return (
                      <TouchableOpacity
                        key={it}
                        style={[styles.interestChip, on && styles.interestChipOn]}
                        onPress={() => toggle(interests, setInterests, it)}
                      >
                        <Text style={[styles.interestTxt, on && { color: '#141005' }]}>{it}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            )}

            <ZButton label="Continue" icon="arrow-forward" onPress={() => setStep(step + 1)} disabled={!canNext} style={{ marginTop: 28 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      {step === 5 && (
        <View style={styles.pinWrap}>
          <Ionicons name="lock-closed" size={30} color={C.gold} />
          <Text style={[styles.stepTitle, { marginTop: 14 }]}>
            {pinStage === 'set' ? 'Create your PIN' : 'Confirm your PIN'}
          </Text>
          <Text style={styles.stepSub}>Your PIN is stored securely on this device only.</Text>
          <PinDots value={pinStage === 'set' ? pin : pinConfirm} />
          {pinError ? <Text style={styles.pinError}>{pinError}</Text> : <View style={{ height: 18 }} />}
          <PinPad onKey={onPinKey} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  heroText: { color: C.muted, fontSize: 15, textAlign: 'center', lineHeight: 23, maxWidth: 300 },
  heroFeatures: { marginTop: 28, gap: 10 },
  heroFeat: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroFeatTxt: { color: C.text, fontSize: 14 },
  privacyNote: { color: C.faint, fontSize: 11, marginTop: 22, textAlign: 'center', lineHeight: 16 },
  form: { padding: 24, paddingBottom: 60 },
  stepHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: C.card, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  stepDots: { flexDirection: 'row', gap: 7 },
  stepDot: { width: 22, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.12)' },
  stepTitle: { color: C.text, fontSize: 26, fontWeight: '800', letterSpacing: 0.5 },
  stepSub: { color: C.muted, fontSize: 14, marginTop: 8, marginBottom: 22, lineHeight: 20 },
  fieldLabel: { color: C.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1.6, marginTop: 18, marginBottom: 8 },
  input: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: R.md,
    color: C.text,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  goalChip: {
    width: '47.5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: R.md,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  goalChipOn: { backgroundColor: C.gold, borderColor: C.gold },
  goalTxt: { color: C.text, fontSize: 13.5, fontWeight: '600', flexShrink: 1 },
  occRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: R.md,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  occRowOn: { borderColor: C.borderStrong, backgroundColor: C.goldDim },
  occTxt: { color: C.text, fontSize: 15 },
  interestWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  interestChip: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: R.pill,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  interestChipOn: { backgroundColor: C.gold, borderColor: C.gold },
  interestTxt: { color: C.text, fontSize: 13.5, fontWeight: '600' },
  pinWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  pinError: { color: C.danger, fontSize: 13, marginBottom: 4 },
  skipPin: { position: 'absolute', bottom: 18, alignSelf: 'center' },
  skipTxt: { color: C.faint, fontSize: 12 },
});
