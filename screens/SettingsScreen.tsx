import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from '../lib/theme';
import { useApp } from '../state/AppContext';
import { confirmDialog } from '../lib/dialog';
import { ZCard, SectionHeader, ZButton } from '../components/ui';

export default function SettingsScreen() {
  const { state, updateSettings, resetAll, exportData } = useApp();
  const [exportOpen, setExportOpen] = useState(false);

  const confirmReset = () => {
    confirmDialog(
      'Erase all data',
      'This permanently deletes your profile, progress, scores and settings from this device.',
      'Erase',
      () => resetAll(),
      true
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 18, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
      <SectionHeader title="Preferences" />
      <ZCard style={{ paddingVertical: 6 }}>
        <ToggleRow
          icon="stats-chart-outline"
          title="Usage analytics"
          sub="Local-only counters to improve the app. No personal data, no servers."
          value={state.settings.analytics}
          onChange={(v) => updateSettings({ analytics: v })}
        />
        <ToggleRow
          icon="sparkles-outline"
          title="Personalized recommendations"
          sub="Use your goals and interests to tailor lesson suggestions."
          value={state.settings.personalizedTips}
          onChange={(v) => updateSettings({ personalizedTips: v })}
        />
      </ZCard>

      <SectionHeader title="Privacy & Data" style={{ marginTop: 24 }} />
      <ZCard>
        <View style={styles.privRow}>
          <Ionicons name="phone-portrait-outline" size={17} color={C.gold} />
          <Text style={styles.privTxt}>All data is stored locally on this device. ZION NEURO has no account servers and never uploads your profile, scores or answers.</Text>
        </View>
        <View style={styles.privRow}>
          <Ionicons name="lock-closed" size={17} color={C.gold} />
          <Text style={styles.privTxt}>Your PIN is kept in the device's secure storage (Keychain/Keystore where available).</Text>
        </View>
        <View style={[styles.privRow, { borderBottomWidth: 0 }]}>
          <Ionicons name="school-outline" size={17} color={C.gold} />
          <Text style={styles.privTxt}>Content is educational and never presented as medical advice or diagnosis.</Text>
        </View>
      </ZCard>

      <ZButton label="Export My Data" icon="download-outline" variant="outline" style={{ marginTop: 16 }} onPress={() => setExportOpen(true)} />
      <ZButton label="Erase All Data" icon="trash-outline" variant="dark" style={{ marginTop: 12, borderColor: 'rgba(240,97,109,0.35)' }} textStyle={{ color: C.danger }} onPress={confirmReset} />

      <SectionHeader title="About" style={{ marginTop: 26 }} />
      <ZCard>
        <Text style={styles.aboutTitle}>ZION NEURO</Text>
        <Text style={styles.aboutTxt}>
          A premium neuroscience education and cognitive performance platform. Learn from beginner fundamentals to advanced performance science, assess yourself responsibly, and train with targeted drills.
        </Text>
        <Text style={styles.aboutTxt}>
          Scientific integrity: we do not present unsupported claims as fact. Popular myths (10% of the brain, left/right-brained people) are explicitly debunked in the curriculum.
        </Text>
        <Text style={styles.aboutVersion}>Version 1.0.0 • © ZION</Text>
      </ZCard>

      <Modal visible={exportOpen} transparent animationType="slide" onRequestClose={() => setExportOpen(false)}>
        <View style={styles.modalBack}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Your Data (JSON)</Text>
            <Text style={styles.modalSub}>Everything ZION NEURO knows about you, exactly as stored on this device.</Text>
            <ScrollView style={styles.jsonScroll}>
              <Text style={styles.jsonTxt}>{exportData()}</Text>
            </ScrollView>
            <ZButton label="Close" onPress={() => setExportOpen(false)} style={{ marginTop: 14 }} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function ToggleRow({ icon, title, sub, value, onChange }: { icon: any; title: string; sub: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.toggleRow}>
      <Ionicons name={icon} size={18} color={C.gold} />
      <View style={{ flex: 1 }}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleSub}>{sub}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: 'rgba(255,255,255,0.12)', true: 'rgba(212,175,55,0.5)' }}
        thumbColor={value ? C.gold : '#8E8E98'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  privRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    alignItems: 'flex-start',
  },
  privTxt: { color: C.text, fontSize: 13, lineHeight: 19, flex: 1 },
  aboutTitle: { color: C.goldSoft, fontSize: 16, fontWeight: '900', letterSpacing: 2 },
  aboutTxt: { color: C.muted, fontSize: 13, lineHeight: 20, marginTop: 10 },
  aboutVersion: { color: C.faint, fontSize: 11, marginTop: 14 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  toggleTitle: { color: C.text, fontSize: 14, fontWeight: '700' },
  toggleSub: { color: C.muted, fontSize: 11.5, marginTop: 2, lineHeight: 15 },
  modalBack: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: C.surface,
    borderTopLeftRadius: R.xl,
    borderTopRightRadius: R.xl,
    borderWidth: 1,
    borderColor: C.border,
    padding: 22,
    paddingBottom: 34,
    maxHeight: '80%',
  },
  modalTitle: { color: C.text, fontSize: 18, fontWeight: '800' },
  modalSub: { color: C.muted, fontSize: 12.5, marginTop: 6, lineHeight: 17 },
  jsonScroll: {
    backgroundColor: '#0A0A0F',
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    padding: 12,
    marginTop: 14,
    maxHeight: 300,
  },
  jsonTxt: { color: C.success, fontSize: 10.5, fontFamily: 'monospace' },
});
