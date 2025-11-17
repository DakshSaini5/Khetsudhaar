import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const PIXEL_FONT = 'monospace';

// Mock data for the demo
const MARKET_DATA = [
  {
    name: 'Banana',
    price: 3200,
    unit: 'QUINTAL',
    trend: 'up',
  },
  {
    name: 'Coffee',
    price: 18500,
    unit: 'QUINTAL',
    trend: 'stable',
  },
  {
    name: 'Black Pepper',
    price: 52000,
    unit: 'QUINTAL',
    trend: 'up',
  },
  {
    name: 'Coconut',
    price: 2800,
    unit: 'QUINTAL',
    trend: 'down',
  },
  {
    name: 'Cardamom',
    price: 1750,
    unit: 'KG',
    trend: 'stable',
  },
  {
    name: 'Ginger',
    price: 12000,
    unit: 'QUINTAL',
    trend: 'down',
  },
];

// Helper to get trend icon and color
const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') {
    return <FontAwesome5 name="arrow-up" size={24} color="#66BB6A" />;
  }
  if (trend === 'down') {
    return <FontAwesome5 name="arrow-down" size={24} color="#EF5350" />;
  }
  return <FontAwesome5 name="minus" size={24} color="#777" />;
};

export default function MarketPricesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.lastUpdated}>LAST UPDATED: 17 NOV 2025, 10:30 PM</Text>

        <View style={styles.listContainer}>
          {MARKET_DATA.map((item) => (
            <View key={item.name} style={styles.priceCard}>
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>{item.name.toUpperCase()}</Text>
                <Text style={styles.cropUnit}>₹ / {item.unit}</Text>
              </View>
              <View style={styles.priceInfo}>
                <Text style={styles.priceText}>{item.price.toLocaleString('en-IN')}</Text>
                <TrendIcon trend={item.trend as 'up' | 'down' | 'stable'} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 24,
  },
  lastUpdated: {
    color: '#9E9E9E',
    fontFamily: PIXEL_FONT,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    gap: 16,
  },
  priceCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#424242',
  },
  cropInfo: {
    flex: 1,
    gap: 4,
  },
  cropName: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cropUnit: {
    color: '#B0B0B0',
    fontFamily: PIXEL_FONT,
    fontSize: 14,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  priceText: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 24,
    fontWeight: 'bold',
  },
});