import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

/**
 * A custom component for the header logo.
 */
function HeaderLogo() {
  return (
    <Image
      source={require('../assets/images/Applogo.png')} // Use relative path
      style={styles.logo}
    />
  );
}

/**
 * A custom component for the header text.
 */
function HeaderText() {
  return (
    <View style={styles.headerTextContainer}>
      <Text style={styles.headerKhet}>KHET</Text>
      <Text style={styles.headerSudhar}>सुधार</Text>
    </View>
  );
}

/**
 * This layout defines the navigation stack for the onboarding flow.
 */
export default function OnboardingLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#151718' },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="language"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#388e3c' },
            headerTitle: '',
            headerShadowVisible: false,
            headerLeft: () => <HeaderLogo />,
            headerRight: () => <HeaderText />,
          }}
        />
        <Stack.Screen
          name="crop"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#388e3c' },
            headerTitle: '',
            headerShadowVisible: false,
            headerLeft: () => <HeaderLogo />,
            headerRight: () => <HeaderText />,
          }}
        />
        {/* ADD THIS NEW SCREEN FOR THE LESSONS PAGE */}
        <Stack.Screen
          name="lessons"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#388e3c' },
            headerTitle: 'LESSONS', // Set title as per design
            headerTitleStyle: { color: '#FFFFFF', fontWeight: 'bold' },
            headerShadowVisible: false,
            headerLeft: () => <HeaderLogo />,
            headerRight: () => <HeaderText />,
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    marginLeft: 15,
  },
  headerTextContainer: {
    marginRight: 15,
    width: 100,
    alignItems: 'flex-end',
  },
  headerKhet: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2.5,
    textAlign: 'right',
  },
  headerSudhar: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'right',
    letterSpacing: 1,
  },
});