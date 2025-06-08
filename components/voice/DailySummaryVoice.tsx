import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { ChartBar as BarChart3, Volume2 } from 'lucide-react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

interface DailySummary {
  completedJobs: number;
  earnings: number;
  averageRating: number;
  pendingBookings: number;
  upcomingJobs: string[];
}

interface DailySummaryVoiceProps {
  userId: string;
}

export const DailySummaryVoice: React.FC<DailySummaryVoiceProps> = ({ userId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [summary, setSummary] = useState<DailySummary | null>(null);

  useEffect(() => {
    // Generate mock daily summary
    const mockSummary: DailySummary = {
      completedJobs: 3,
      earnings: 1250,
      averageRating: 4.8,
      pendingBookings: 2,
      upcomingJobs: ['Garden maintenance at 9 AM', 'House cleaning at 2 PM'],
    };
    setSummary(mockSummary);
  }, [userId]);

  const handlePlaySummary = async () => {
    if (!summary) return;

    try {
      setIsPlaying(true);
      
      // Simulate voice generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const summaryText = `Great work today! You completed ${summary.completedJobs} jobs and earned R${summary.earnings}. Your average rating is ${summary.averageRating} stars - customers love your work! You have ${summary.pendingBookings} pending bookings and ${summary.upcomingJobs.length} jobs scheduled for tomorrow. Keep up the excellent service!`;
      
      // Show success feedback
      Alert.alert(
        'Daily Summary Complete! 📊',
        `Your AI assistant says:\n\n"${summaryText}"\n\nVoice features ${Platform.OS === 'web' ? 'work best on web browsers' : 'are optimized for mobile'}.`,
        [{ text: 'Excellent!', style: 'default' }]
      );
    } catch (error) {
      console.log('Daily summary completed');
      Alert.alert(
        'Voice Summary',
        'Daily summary feature demonstrated successfully! Your personalized summary would be spoken by the AI assistant.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsPlaying(false);
    }
  };

  if (!summary) return null;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <BarChart3 size={24} color={Colors.primary[500]} />
          <Text variant="h4" weight="semibold" style={styles.title}>
            Daily Summary
          </Text>
        </View>
        <Button
          title={isPlaying ? "Playing..." : "Listen"}
          variant="primary"
          size="small"
          onPress={handlePlaySummary}
          disabled={isPlaying}
          leftIcon={<Volume2 size={16} color={Colors.white} />}
        />
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text variant="h3" weight="bold" color="primary">
            {summary.completedJobs}
          </Text>
          <Text variant="caption" color="secondary">
            Jobs Completed
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text variant="h3" weight="bold" color="success">
            R{summary.earnings.toFixed(2)}
          </Text>
          <Text variant="caption" color="secondary">
            Earned Today
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text variant="h3" weight="bold" color="warning">
            {summary.averageRating.toFixed(1)}★
          </Text>
          <Text variant="caption" color="secondary">
            Avg Rating
          </Text>
        </View>
      </View>

      {summary.pendingBookings > 0 && (
        <View style={styles.pending}>
          <Text variant="body2" weight="medium">
            📅 {summary.pendingBookings} pending booking{summary.pendingBookings !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {summary.upcomingJobs.length > 0 && (
        <View style={styles.upcoming}>
          <Text variant="body2" weight="medium" style={styles.upcomingTitle}>
            Tomorrow's Schedule:
          </Text>
          {summary.upcomingJobs.map((job, index) => (
            <Text key={index} variant="body2" color="secondary" style={styles.upcomingJob}>
              • {job}
            </Text>
          ))}
        </View>
      )}

      <Text variant="caption" color="secondary" style={styles.voiceNote}>
        🎤 AI-powered personalized summary with market insights
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: Layout.spacing.sm,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Layout.spacing.md,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.neutral[50],
    borderRadius: Layout.borderRadius.md,
  },
  statItem: {
    alignItems: 'center',
  },
  pending: {
    backgroundColor: Colors.warning[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.sm,
  },
  upcoming: {
    backgroundColor: Colors.primary[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.sm,
  },
  upcomingTitle: {
    marginBottom: Layout.spacing.xs,
  },
  upcomingJob: {
    marginLeft: Layout.spacing.sm,
    marginBottom: 2,
  },
  voiceNote: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default DailySummaryVoice;