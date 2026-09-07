import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { C } from './lib/theme';
import { RootStackParamList } from './lib/types';
import { AppProvider, useApp } from './state/AppContext';
import { getPin } from './lib/storage';
import { BrainMark, BrandTitle, GoldDivider } from './components/BrainLogo';
import { NeuronBackdrop } from './components/NeuronBackdrop';

import OnboardingScreen from './screens/OnboardingScreen';
import LockScreen from './screens/LockScreen';
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
import AssessScreen from './screens/AssessScreen';
import TrainScreen from './screens/TrainScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileHubScreen from './screens/ProfileHubScreen';
import CategoryScreen from './screens/CategoryScreen';
import LessonScreen from './screens/LessonScreen';
import { AssessmentQuizScreen, LessonQuizScreen } from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import GameScreen from './screens/GameScreen';
import SportsScreen from './screens/SportsScreen';
import BrainProfileScreen from './screens/BrainProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import PremiumScreen from './screens/PremiumScreen';
import AssistantScreen from './screens/AssistantScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, { on: keyof typeof Ionicons.glyphMap; off: keyof typeof Ionicons.glyphMap }> = {
  Home: { on: 'home', off: 'home-outline' },
  Learn: { on: 'school', off: 'school-outline' },
  Assess: { on: 'analytics', off: 'analytics-outline' },
  Train: { on: 'barbell', off: 'barbell-outline' },
  Progress: { on: 'trending-up', off: 'trending-up-outline' },
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: C.gold,
        tabBarInactiveTintColor: C.faint,
        tabBarStyle: {
          backgroundColor: '#0A0A0F',
          borderTopWidth: 1,
          borderTopColor: 'rgba(212,175,55,0.18)',
          height: 62,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name] || TAB_ICONS.Home;
          return <Ionicons name={focused ? icons.on : icons.off} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Assess" component={AssessScreen} />
      <Tab.Screen name="Train" component={TrainScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
    </Tab.Navigator>
  );
}

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: C.bg,
    card: C.bg,
    text: C.text,
    primary: C.gold,
    border: 'rgba(212,175,55,0.16)',
  },
};

function Splash() {
  return (
    <View style={styles.splash}>
      <BrainMark size={76} />
      <ActivityIndicator color={C.gold} style={{ marginTop: 26 }} />
    </View>
  );
}

/** Animated brand splash shown once per app launch. */
function BrandSplash({ onDone }: { onDone: () => void }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const line = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6, tension: 60, useNativeDriver: true }),
      Animated.timing(line, { toValue: 1, duration: 900, delay: 350, useNativeDriver: false }),
    ]).start();
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.splash}>
      <NeuronBackdrop opacity={0.35} />
      <Animated.View style={{ opacity, transform: [{ scale }], alignItems: 'center' }}>
        <BrainMark size={104} />
        <View style={{ height: 26 }} />
        <BrandTitle size="lg" sub />
        <Animated.View
          style={{
            height: 1,
            marginTop: 28,
            backgroundColor: C.gold,
            opacity: 0.6,
            width: line.interpolate({ inputRange: [0, 1], outputRange: [0, 190] }),
          }}
        />
      </Animated.View>
    </View>
  );
}

function Root() {
  const { state, hydrated } = useApp();
  const [pinExists, setPinExists] = useState<boolean | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [booted, setBooted] = useState(false);
  const prevProfile = useRef(state.profile);
  // The first profile transition we observe happens when persisted state is
  // hydrated (null -> saved profile). That transition must NOT auto-unlock,
  // otherwise the PIN lock screen would be bypassed on every app restart.
  const hydrationTransitionPending = useRef(true);

  useEffect(() => {
    let alive = true;
    getPin().then((p) => {
      if (alive) setPinExists(!!p);
    });
    return () => {
      alive = false;
    };
  }, [state.profile?.createdAt]);

  useEffect(() => {
    if (!hydrated) return;
    if (hydrationTransitionPending.current) {
      hydrationTransitionPending.current = false;
      prevProfile.current = state.profile;
      return;
    }
    // A null -> profile transition after hydration means onboarding just
    // completed in this session, so the user may proceed without the PIN.
    if (!prevProfile.current && state.profile) setUnlocked(true);
    prevProfile.current = state.profile;
  }, [hydrated, state.profile]);

  if (!hydrated || pinExists === null) return <Splash />;
  if (!booted) return <BrandSplash onDone={() => setBooted(true)} />;
  if (!state.profile) return <OnboardingScreen />;
  if (pinExists && !unlocked) return <LockScreen onUnlock={() => setUnlocked(true)} />;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: C.bg },
          headerTintColor: C.gold,
          headerTitleStyle: { color: C.text, fontWeight: '800', fontSize: 16 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: C.bg },
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Category' }} />
        <Stack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Lesson' }} />
        <Stack.Screen name="Quiz" component={AssessmentQuizScreen} options={{ title: 'Assessment' }} />
        <Stack.Screen name="LessonQuiz" component={LessonQuizScreen} options={{ title: 'Lesson Quiz' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Your Results' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Training Drill' }} />
        <Stack.Screen name="Sports" component={SportsScreen} options={{ title: 'Sports Neuroscience' }} />
        <Stack.Screen name="BrainProfile" component={BrainProfileScreen} options={{ title: 'Brain Profile' }} />
        <Stack.Screen name="Assistant" component={AssistantScreen} options={{ title: 'ZION NEURO AI' }} />
        <Stack.Screen name="Premium" component={PremiumScreen} options={{ title: 'Membership' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings & Privacy' }} />
        <Stack.Screen name="You" component={ProfileHubScreen} options={{ title: 'Your Space' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Root />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
