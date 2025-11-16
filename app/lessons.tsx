import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

// --- IMPORTANT ---
// Make sure you have these assets in your project:
// 1. assets/images/Mascot.svg (already exists)
// 2. assets/images/coin.svg (you need to add this one)
// -----------------
import Mascot from '../assets/images/Mascot1.svg';
import Coin from '../assets/images/coin.svg';

const LESSON_DATA = [
  {
    number: '1',
    title: 'Basics of Sustainable Farming',
    description: "How to grow plants sustainably in Kerala's climate to save money, improve quality",
    points: 1000,
  },
  {
    number: '2',
    title: 'Healthy Soil for Better Plants',
    description: 'How to make soil rich with banana waste compost, no chemicals for healthier banana plants.',
    points: 1500,
  },
  {
    number: '3',
    title: 'Shade and Plant Diversity for Bananas',
    description: 'How to use shade trees and mixed crops to protect bananas, save water, and stop pests naturally.',
    points: 1000,
  },
  {
    number: '4',
    title: 'Smart Water Use for Banana Farms',
    description: 'How to save water with mulching and drip irrigation to keep banana plants healthy in dry times.',
    points: 1500,
  },
  {
    number: '5',
    title: 'Natural Pest Control and Clean Harvesting',
    description: 'How to stop pests with neem, pick ripe bananas, and dry them for high-quality, chemical-free sales.',
    points: 1000,
  },
];

// Reusable Lesson Card Component
function LessonCard({
  number,
  title,
  description,
  points,
}: (typeof LESSON_DATA)[0]) {
  return (
    <TouchableOpacity style={styles.lessonCard}>
      <Text style={styles.lessonNumber}>{number}</Text>
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>{title}</Text>
        <Text style={styles.lessonDescription}>{description}</Text>
        <View style={styles.pointsContainer}>
          <Coin width={24} height={24} style={styles.coinIcon} />
          <Text style={styles.pointsText}>{points}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function LessonsScreen() {
  const router = useRouter();
  const currentLesson = LESSON_DATA[0];
  const moreLessons = LESSON_DATA.slice(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Current Lesson Section */}
        <View style={styles.currentSection}>
          <Mascot width={100} height={100} style={styles.mascot} />
          <Text style={styles.currentText}>CURRENT!</Text>
        </View>
        <LessonCard {...currentLesson} />

        {/* More Lessons Section */}
        <Text style={styles.moreLessonsTitle}>MORE LESSONS</Text>
        {moreLessons.map((lesson) => (
          <LessonCard key={lesson.number} {...lesson} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#151718', // Dark background
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },
  currentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  mascot: {
    marginRight: 10,
  },
  currentText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  moreLessonsTitle: {
    color: '#B0B0B0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: 1,
  },
  lessonCard: {
    backgroundColor: '#2C2C2E', // Dark grey card
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  lessonNumber: {
    color: '#FFFFFF',
    fontSize: 80, // Large number
    fontWeight: 'bold',
    fontFamily: 'monospace', // Gives a blocky, pixel-like feel
    marginRight: 15,
    lineHeight: 80, // Match font size to prevent extra spacing
  },
  lessonContent: {
    flex: 1, // Take remaining space
  },
  lessonTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lessonDescription: {
    color: '#B0B0B0',
    fontSize: 14,
    lineHeight: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  coinIcon: {
    marginRight: 8,
  },
  pointsText: {
    color: '#FDD835', // Gold/Yellow color
    fontSize: 18,
    fontWeight: 'bold',
  },
});