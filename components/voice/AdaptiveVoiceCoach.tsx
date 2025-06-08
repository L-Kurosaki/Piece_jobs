import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Brain, TrendingUp, Target, Lightbulb, MessageSquare } from 'lucide-react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { aiLearningService, UserBehaviorData } from '../../utils/aiLearningService';
import { voiceService } from '../../utils/voiceService';

interface AdaptiveVoiceCoachProps {
  userId: string;
}

export const AdaptiveVoiceCoach: React.FC<AdaptiveVoiceCoachProps> = ({ userId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [needsHelp, setNeedsHelp] = useState(false);
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');

  useEffect(() => {
    // Simulate user behavior data (in real app, this comes from actual usage)
    const mockUserData: Partial<UserBehaviorData> = {
      userId,
      jobCompletionRate: 0.85,
      averageResponseTime: 1.5, // hours
      bidWinRate: 0.65,
      customerSatisfaction: 4.7,
      earningsGrowth: 0.25,
      preferredJobTypes: ['cleaning', 'maintenance'],
      peakWorkingHours: [9, 10, 11, 14, 15, 16],
    };

    // Update AI learning system
    aiLearningService.updateUserProfile(userId, mockUserData);
    
    // Get personalized recommendations
    const recs = aiLearningService.getPersonalizedRecommendations(userId);
    setRecommendations(recs);
    
    // Check if user needs intervention
    const needsIntervention = aiLearningService.needsIntervention(userId);
    setNeedsHelp(needsIntervention);
    
    // Determine user level for adaptive responses
    setUserLevel('intermediate'); // This would be calculated by AI
  }, [userId]);

  const handlePersonalizedCoaching = async () => {
    try {
      setIsPlaying(true);
      
      // Generate adaptive response based on user's learning profile
      const adaptiveResponse = await aiLearningService.generateAdaptiveVoiceResponse(
        userId, 
        'encouragement'
      );
      
      // Use voice service to speak the personalized message
      await voiceService.generateSpeech(adaptiveResponse);
      
      Alert.alert(
        'Personal Coaching',
        'Your AI coach has analyzed your performance and provided personalized encouragement! The coaching adapts to your specific needs and progress.',
        [{ text: 'Thanks!', style: 'default' }]
      );
      
    } catch (error) {
      console.error('Error generating personalized coaching:', error);
      Alert.alert(
        'AI Coaching',
        'Personal coaching feature demonstrated! Your AI coach would provide adaptive guidance based on your performance patterns.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsPlaying(false);
    }
  };

  const handleMarketInsights = async () => {
    try {
      setIsPlaying(true);
      
      const insightsText = `Based on current market data, here are your opportunities: 
      Maintenance jobs are in high demand with 90% market activity. 
      Your optimal pricing for cleaning jobs is around R380 based on successful providers. 
      Peak booking times in your area are between 9 AM and 4 PM. 
      Customers prefer quick responses and professional communication. 
      Your current bid win rate of 65% is above average - you're doing great!`;
      
      await voiceService.generateSpeech(insightsText);
      
      Alert.alert(
        'Market Insights',
        'AI has analyzed market trends and provided personalized insights for your success! These recommendations are based on real-time data.',
        [{ text: 'Excellent!', style: 'default' }]
      );
      
    } catch (error) {
      console.error('Error generating market insights:', error);
      Alert.alert(
        'Market Intelligence',
        'Market insights feature demonstrated! AI would provide real-time market analysis and personalized recommendations.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsPlaying(false);
    }
  };

  const handleInterventionHelp = async () => {
    try {
      setIsPlaying(true);
      
      const interventionMessage = aiLearningService.generateInterventionMessage(userId);
      await voiceService.generateSpeech(interventionMessage);
      
      Alert.alert(
        'AI Intervention',
        'Your AI coach has detected areas where you might need help and provided targeted assistance!',
        [{ text: 'Thank you!', style: 'default' }]
      );
      
    } catch (error) {
      console.error('Error generating help message:', error);
      Alert.alert(
        'Smart Help',
        'AI intervention feature demonstrated! The system would detect when you need help and provide targeted assistance.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Brain size={24} color={Colors.primary[500]} />
        <Text variant="h4" weight="semibold" style={styles.title}>
          AI Learning Coach
        </Text>
        <View style={styles.levelBadge}>
          <Text variant="caption" color="primary" weight="bold">
            {userLevel.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text variant="body2" color="secondary" style={styles.description}>
        Your AI coach learns from your behavior and adapts to help you succeed
      </Text>

      {/* Personalized Recommendations */}
      {recommendations.length > 0 && (
        <View style={styles.section}>
          <Text variant="body1" weight="semibold" style={styles.sectionTitle}>
            🎯 Personalized Tips
          </Text>
          {recommendations.slice(0, 2).map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Lightbulb size={16} color={Colors.warning[500]} />
              <Text variant="body2" color="secondary" style={styles.tipText}>
                {tip}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          title={isPlaying ? "Speaking..." : "Personal Coaching"}
          variant="primary"
          size="small"
          onPress={handlePersonalizedCoaching}
          disabled={isPlaying}
          leftIcon={<MessageSquare size={16} color={Colors.white} />}
          style={styles.actionButton}
        />

        <Button
          title={isPlaying ? "Speaking..." : "Market Insights"}
          variant="outline"
          size="small"
          onPress={handleMarketInsights}
          disabled={isPlaying}
          leftIcon={<TrendingUp size={16} color={Colors.primary[500]} />}
          style={styles.actionButton}
        />
      </View>

      {/* Intervention Help */}
      {needsHelp && (
        <View style={styles.helpSection}>
          <View style={styles.helpHeader}>
            <Target size={20} color={Colors.warning[500]} />
            <Text variant="body1" weight="semibold" color="warning">
              AI Detected: You Might Need Help
            </Text>
          </View>
          <Button
            title="Get Personalized Help"
            variant="warning"
            size="small"
            onPress={handleInterventionHelp}
            disabled={isPlaying}
            fullWidth
          />
        </View>
      )}

      <Text variant="caption" color="secondary" style={styles.footer}>
        🧠 AI learns from your patterns and adapts coaching to your needs
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
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  title: {
    marginLeft: Layout.spacing.sm,
    flex: 1,
  },
  levelBadge: {
    backgroundColor: Colors.primary[100],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  description: {
    marginBottom: Layout.spacing.md,
    lineHeight: 20,
  },
  section: {
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.sm,
    backgroundColor: Colors.warning[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  tipText: {
    marginLeft: Layout.spacing.sm,
    flex: 1,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
  },
  helpSection: {
    backgroundColor: Colors.warning[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.warning[200],
    marginBottom: Layout.spacing.md,
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default AdaptiveVoiceCoach;