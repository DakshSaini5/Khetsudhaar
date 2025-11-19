import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// --- Import SVG Assets ---
import Checkmark from '../assets/images/check.svg';
import CoinIcon from '../assets/images/coin.svg';
// --- NEW ICONS ---
// (Make sure you have created these files in assets/images/)
import FertilizerIcon from '../assets/images/fertilizer.svg'; // Using this as a placeholder
import RationIcon from '../assets/images/ration.svg';
import SeedsIcon from '../assets/images/seeds.svg';
import SproutIcon from '../assets/images/sprout.svg';


const PIXEL_FONT = 'monospace';

// --- NEW: Reward data is now in an array ---
const REWARD_DATA = [
  {
    id: 1,
    icon: <RationIcon width={40} height={40} />,
    points: '1000',
    text: '3% OFF RATION',
    isUnlocked: true,
    isTurquoise: true, // For the "current" one
  },
  {
    id: 2,
    icon: <SeedsIcon width={40} height={40} />,
    points: '3000',
    text: '2% DISC SEEDS',
    isUnlocked: true,
  },
  {
    id: 3,
    icon: <RationIcon width={40} height={40} />,
    points: '5000',
    text: '5% OFF RATION',
    isUnlocked: true,
  },
  {
    id: 4,
    icon: <FertilizerIcon width={40} height={40} />, // You can change this
    points: '6000',
    text: '6% OFF FERTILIZER',
    isUnlocked: false,
  },
  {
    id: 5,
    icon: <SeedsIcon width={40} height={40} />,
    points: '8000',
    text: '5% DISC SEEDS',
    isUnlocked: false,
  },
  // Add as many rewards as you want here
  // They will automatically alternate sides
];

/**
 * A reusable component for the top stat boxes (Unchanged)
 */
const StatBox = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statBox}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

/**
 * A reusable component for each node on the reward path
 * (Style prop is removed, as it's no longer needed for positioning)
 */
const RewardNode = ({
  side,
  icon,
  points,
  text,
  isUnlocked,
  isTurquoise,
}: {
  side: 'left' | 'right';
  icon: React.ReactNode;
  points: string;
  text: string;
  isUnlocked?: boolean;
  isTurquoise?: boolean;
}) => {
  const nodeStyles = [
    styles.node,
    side === 'left' ? styles.nodeLeft : styles.nodeRight,
  ];
  const branchStyles = [
    styles.branch,
    side === 'left' ? styles.branchLeft : styles.branchRight,
    isTurquoise ? styles.branchTurquoise : null,
    !isUnlocked ? styles.branchLocked : null, // Style for locked branches
  ];
  
  const textContainerStyles = [
    styles.nodeTextContainer,
    side === 'left' ? styles.nodeTextContainerLeft : null,
  ];
  
  const iconContainerStyles = [
    styles.nodeIconContainer,
    !isUnlocked && styles.nodeLocked, // Style for locked icons
  ];

  return (
    <View style={nodeStyles}>
      <View style={branchStyles} />
      {/* Container for the icon and text */}
      <View
        style={[
          styles.nodeContent,
          side === 'left' ? styles.nodeContentLeft : styles.nodeContentRight,
        ]}>
        {/* Icon */}
        <View style={iconContainerStyles}>{icon}</View>
        
        {/* Text content */}
        <View style={textContainerStyles}>
          <View style={styles.nodePointsContainer}>
            <Text style={[styles.nodePoints, !isUnlocked && styles.nodeTextLocked]}>{points}</Text>
            <CoinIcon width={16} height={16} style={[styles.nodeCoinIcon, !isUnlocked && styles.nodeTextLocked]} />
          </View>
          <Text style={[styles.nodeText, !isUnlocked && styles.nodeTextLocked]}>{text}</Text>
        </View>

        {/* Checkmark */}
        {isUnlocked && (
          <View style={styles.checkmark}>
            <Checkmark width={24} height={24} />
          </View>
        )}
      </View>
    </View>
  );
};

/**
 * The main Reward Root Screen component.
 */
export default function RewardRootScreen() {
  // --- Calculate stats from the data array ---
  const lessonsCompleted = REWARD_DATA.filter(r => r.isUnlocked).length;
  const rewardsCollected = REWARD_DATA.filter(r => r.isUnlocked).length; // Or your own logic

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Top Stats --- */}
        <View style={styles.statsContainer}>
          <StatBox label="LESSONS COMPLETED" value={String(lessonsCompleted)} />
          <StatBox label="REWARDS COLLECTED" value={String(rewardsCollected)} />
        </View>

        {/* --- Reward Root --- */}
        <Text style={styles.rewardRootTitle}>REWARD ROOT</Text>
        
        <View style={styles.rootContainer}>
          {/* The central vertical trunk */}
          <View style={styles.rootTrunk} />

          {/* The sprout at the TOP */}
          <View style={styles.sproutContainer}>
            <SproutIcon width={60} height={60} />
          </View>

          {/* --- NEW: Nodes are now mapped in a list --- */}
          {REWARD_DATA.map((reward, index) => (
            <RewardNode
              key={reward.id}
              side={index % 2 === 0 ? 'right' : 'left'} // Alternates sides
              icon={reward.icon}
              points={reward.points}
              text={reward.text}
              isUnlocked={reward.isUnlocked}
              isTurquoise={reward.isTurquoise}
            />
          ))}
          {/* ------------------------------------------- */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 24, 
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#424242',
  },
  statLabel: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 10,
    marginBottom: 8,
  },
  statValue: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 48,
  },
  // Reward Root
  rewardRootTitle: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  rootContainer: {
    backgroundColor: '#4E342E',
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#3E2723',
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    // Remove minHeight to allow scrolling
  },
  rootTrunk: {
    width: 12,
    backgroundColor: '#795548',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  sproutContainer: {
    // --- MODIFIED ---
    position: 'relative', // No longer absolute
    zIndex: 1,
    backgroundColor: '#4E342E', // Match background to hide trunk
    padding: 10, // Create space
    borderRadius: 99,
    marginTop: -30, // Pull up to overlap the border
    marginBottom: 20, // Space before the first node
  },
  // --- REMOVED nodeWrapperView styles ---

  // Reward Node
  node: {
    // --- MODIFIED ---
    position: 'relative', // Changed from 'absolute'
    width: '50%',
    height: 90,
    marginVertical: 40, // Adds vertical space for scrolling
    justifyContent: 'center',
  },
  nodeLeft: {
    right: '50%',
    paddingRight: 60, // Space from the center trunk
  },
  nodeRight: {
    left: '50%',
    paddingLeft: 60, // Space from the center trunk
  },
  branch: {
    position: 'absolute',
    height: 8,
    backgroundColor: '#795548',
    width: 60, // Matches the padding above
    top: '50%',
    marginTop: -4,
    zIndex: 0,
  },
  branchLeft: {
    right: 0,
  },
  branchRight: {
    left: 0,
  },
  branchTurquoise: {
    backgroundColor: '#4DD0E1',
    height: 10,
  },
  branchLocked: {
    backgroundColor: '#61413B', // Darker, "locked" branch color
  },
  nodeContent: {
    // --- MODIFIED ---
    position: 'relative', // Changed from 'absolute'
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 2,
    top: 0, // Reset position
    marginTop: 0,
  },
  nodeContentLeft: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  nodeContentRight: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  nodeIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeLocked: {
    backgroundColor: '#3E2723',
    borderColor: '#5D4037',
    opacity: 0.7,
  },
  nodeTextContainer: {
    alignItems: 'flex-start',
    flexShrink: 1, // Allow text to shrink if needed
  },
  nodeTextContainerLeft: {
    alignItems: 'flex-end', 
  },
  nodePointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodePoints: {
    color: '#F1B301',
    fontFamily: PIXEL_FONT,
    fontSize: 14,
  },
  nodeCoinIcon: {
    marginLeft: 4,
  },
  nodeText: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 10,
    marginTop: 4,
  },
  nodeTextLocked: {
    color: '#A1887F', // Muted text color for locked items
    opacity: 0.7,
  },
  checkmark: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  // --- REMOVED staggering styles (nodeWrapperView_node_1, etc.) ---
});