import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../lib/theme';
import { generateReply, AI_SUGGESTIONS } from '../lib/ai';
import { useApp, FREE_AI_DAILY_LIMIT } from '../state/AppContext';
import { todayStr } from '../lib/storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../lib/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

interface Msg {
  id: number;
  role: 'user' | 'ai';
  text: string;
}

let msgId = 1;

export default function AssistantScreen() {
  const nav = useNavigation<Nav>();
  const { state, consumeAiMessage } = useApp();
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: msgId++,
      role: 'ai',
      text: `Hello${state.profile?.name ? ` ${state.profile.name}` : ''}! I am ZION NEURO AI, your neuroscience study companion. Ask me about neurons, memory, sleep, focus, personality, sports performance, or request lesson and quiz recommendations.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef<FlatList>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const remaining = state.premium ? Infinity : Math.max(0, FREE_AI_DAILY_LIMIT - (state.aiDate === todayStr() ? state.aiUsed : 0));

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;
    if (!state.premium && remaining <= 0) return;
    consumeAiMessage();
    setMessages((m) => [...m, { id: msgId++, role: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      if (!alive.current) return;
      const reply = generateReply(msg);
      setMessages((m) => [...m, { id: msgId++, role: 'ai', text: reply }]);
      setTyping(false);
    }, 700 + Math.random() * 700);
  };

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
  }, [messages, typing]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
        {/* Limit banner */}
        {!state.premium && (
          <TouchableOpacity style={styles.limitBanner} onPress={() => nav.navigate('Premium')}>
            <Ionicons name="information-circle-outline" size={14} color={C.gold} />
            <Text style={styles.limitTxt}>
              Free plan: {remaining} of {FREE_AI_DAILY_LIMIT} messages left today. Upgrade for unlimited.
            </Text>
          </TouchableOpacity>
        )}

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => `${m.id}`}
          contentContainerStyle={{ padding: 16, paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            item.role === 'ai' ? (
              <View style={styles.aiRow}>
                <View style={styles.aiAvatar}>
                  <Ionicons name="sparkles" size={13} color={C.gold} />
                </View>
                <View style={styles.aiBubble}>
                  <Text style={styles.aiText}>{item.text}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.userRow}>
                <View style={styles.userBubble}>
                  <Text style={styles.userText}>{item.text}</Text>
                </View>
              </View>
            )
          }
          ListFooterComponent={
            typing ? (
              <View style={styles.aiRow}>
                <View style={styles.aiAvatar}>
                  <Ionicons name="sparkles" size={13} color={C.gold} />
                </View>
                <View style={[styles.aiBubble, { flexDirection: 'row', gap: 5 }]}>
                  <View style={[styles.typingDot, styles.d1]} />
                  <View style={[styles.typingDot, styles.d2]} />
                  <View style={[styles.typingDot, styles.d3]} />
                </View>
              </View>
            ) : null
          }
        />

        {/* Suggestions */}
        <FlatList
          data={AI_SUGGESTIONS}
          horizontal
          keyExtractor={(s) => s}
          showsHorizontalScrollIndicator={false}
          style={{ maxHeight: 44 }}
          contentContainerStyle={{ paddingHorizontal: 14, gap: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chip} onPress={() => send(item)}>
              <Text style={styles.chipTxt}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask about the brain…"
            placeholderTextColor={C.faint}
            value={input}
            onChangeText={setInput}
            multiline
            returnKeyType="default"
            editable={state.premium || remaining > 0}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || typing || (!state.premium && remaining <= 0)) && { opacity: 0.4 }]}
            onPress={() => send()}
            disabled={!input.trim() || typing || (!state.premium && remaining <= 0)}
          >
            <Ionicons name="send" size={16} color="#141005" />
          </TouchableOpacity>
        </View>
        <Text style={styles.disclaimer}>Educational assistant. Not medical advice; answers are generated from a curated neuroscience knowledge base.</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  limitBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: C.goldDim,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  limitTxt: { color: C.goldSoft, fontSize: 11.5, fontWeight: '600' },
  aiRow: { flexDirection: 'row', gap: 9, marginBottom: 14, alignItems: 'flex-start' },
  aiAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.goldDim,
    borderWidth: 1,
    borderColor: C.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  aiBubble: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: C.border,
    padding: 13,
    maxWidth: '88%',
  },
  aiText: { color: C.text, fontSize: 13.5, lineHeight: 20 },
  userRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 14 },
  userBubble: {
    backgroundColor: C.gold,
    borderRadius: R.lg,
    borderTopRightRadius: 4,
    padding: 13,
    maxWidth: '80%',
  },
  userText: { color: '#141005', fontSize: 13.5, lineHeight: 19, fontWeight: '600' },
  typingDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.gold, opacity: 0.5 },
  d1: { opacity: 0.9 },
  d2: { opacity: 0.55 },
  d3: { opacity: 0.3 },
  chip: {
    backgroundColor: C.card,
    borderRadius: R.pill,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  chipTxt: { color: C.goldSoft, fontSize: 12, fontWeight: '600' },
  inputRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 14, paddingTop: 10, alignItems: 'flex-end' },
  input: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    color: C.text,
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 12,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: { color: C.faint, fontSize: 9.5, textAlign: 'center', paddingVertical: 8, paddingHorizontal: 20 },
});
