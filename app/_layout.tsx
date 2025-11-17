import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- STYLE 1: PRE-LOGIN HEADER (Logo Left, Text Right) ---
function OnboardingHeaderLeft() {
  return (
    <Image
      source={require('../assets/images/Applogo.png')}
      style={styles.logoLeft}
    />
  );
}
function OnboardingHeaderRight() {
  return (
    <View style={styles.textRightContainer}>
      <Text style={styles.headerKhet}>KHET</Text>
      <Text style={styles.headerSudhar}>सुधार</Text>
    </View>
  );
}

// --- STYLE 2: POST-LOGIN HEADER (Profile Left, Logo Right) ---
function AppHeaderLeft() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/profile')}>
      <FontAwesome5 name="user-circle" size={28} color="white" style={styles.profileIcon} />
    </TouchableOpacity>
  );
}
function AppHeaderRight() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/dashboard')}>
      <Image
        source={require('../assets/images/Applogo.png')}
        style={styles.logoRight}
      />
    </TouchableOpacity>
  );
}

// --- LAYOUT FILE ---
export default function AppLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#151718' },
          headerStyle: { backgroundColor: '#388e3c' },
          headerShadowVisible: false,
          headerTintColor: '#FFFFFF',
        }}
      >
        
        {/* --- SCREENS WITH NO HEADER --- */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />

        {/* --- ONBOARDING & PRE-LOGIN SCREENS --- */}
        <Stack.Screen
          name="language"
          options={{
            headerShown: true,
            headerTitle: '',
            headerLeft: () => <OnboardingHeaderLeft />,
            headerRight: () => <OnboardingHeaderRight />,
          }}
        />
        <Stack.Screen
          name="crop"
          options={{
            headerShown: true,
            headerTitle: '',
            headerLeft: () => <OnboardingHeaderLeft />,
            headerRight: () => <OnboardingHeaderRight />,
          }}
        />
        <Stack.Screen
          name="lesson/[id]"
          options={{
            headerShown: true,
            headerTitle: 'LESSON',
            headerLeft: () => <OnboardingHeaderLeft />,
            headerRight: () => <OnboardingHeaderRight />,
          }}
        />
        <Stack.Screen
          name="quiz/[id]"
          options={{
            headerShown: true,
            headerTitle: 'LESSON Q',
            headerLeft: () => <OnboardingHeaderLeft />,
            headerRight: () => <OnboardingHeaderRight />,
          }}
        />
        <Stack.Screen
          name="complete/[id]"
          options={{
            headerShown: true,
            headerTitle: '',
            headerLeft: () => <OnboardingHeaderLeft />,
            headerRight: () => <OnboardingHeaderRight />,
          }}
        />
        <Stack.Screen
          name="reward/[id]"
          options={{
            headerShown: true,
            headerTitle: '',
            headerLeft: () => <OnboardingHeaderLeft />,
            headerRight: () => <OnboardingHeaderRight />,
          }}
        />

        {/* --- MAIN APP & POST-LOGIN SCREENS --- */}
        <Stack.Screen
          name="lessons"
          options={{
            headerShown: true,
            headerTitle: 'LESSONS',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            headerTitle: 'PROFILE',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            headerShown: true,
            headerTitle: 'DASHBOARD',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="reward-root"
          options={{
            headerShown: true,
            headerTitle: 'REWARDS',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="leaderboard"
          options={{
            headerShown: true,
            headerTitle: 'LEADERBOARD',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="quests" // Matches the new file name: quests.tsx
          options={{
            headerShown: true,
            headerTitle: 'DAILY QUESTS', // Title for the header
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="quiz" // For the new app/quiz.tsx file
          options={{
            headerShown: true,
            headerTitle: 'QUEST QUIZ',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />

        {/* --- ADDED THESE SCREENS --- */}
        <Stack.Screen
          name="quest-complete" // For the quest-complete.tsx file
          options={{
            headerShown: true,
            headerTitle: 'QUEST COMPLETE',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="marketPrices" // For the new marketPrices.tsx file
          options={{
            headerShown: true,
            headerTitle: 'MARKET PRICES',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        
      </Stack>

      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  logoLeft: {
    width: 40,
    height: 40,
    marginLeft: 15,
  },
  textRightContainer: {
    marginRight: 15,
    alignItems: 'flex-end',
  },
  headerKhet: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerSudhar: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  logoRight: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  profileIcon: {
    marginLeft: 15,
  },
});