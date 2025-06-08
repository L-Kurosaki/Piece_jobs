import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Brain, Target, Zap, TrendingUp, MapPin, Clock } from 'lucide-react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { Job, JobCategory } from '../../types/Job';
import { aiLearningService } from '../../utils/aiLearningService';

interface AIJobMatch {
  job: Job;
  matchScore: number;
  reasons: string[];
  suggestedBid: number;
  winProbability: number;
  competitorCount: number;
}

interface AIJobMatcherProps {
  userId: string;
  onJobSelect: (job: Job) => void;
}

export const AIJobMatcher: React.FC<AIJobMatcherProps> = ({ userId, onJobSelect }) => {
  const [matches, setMatches] = useState<AIJobMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userSkills, setUserSkills] = useState<string[]>([]);

  useEffect(() => {
    analyzeJobMatches();
  }, [userId]);

  const analyzeJobMatches = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI-generated job matches
    const mockMatches: AIJobMatch[] = [
      {
        job: {
          id: 'ai-match-1',
          title: 'Deep Clean 4-Bedroom House',
          category: 'cleaning',
          description: 'Professional deep cleaning needed for move-out. Kitchen, bathrooms, and all rooms.',
          images: ['https://images.pexels.com/photos/4107268/pexels-photo-4107268.jpeg'],
          location: {
            address: 'Sandton, Johannesburg',
            latitude: -26.1076,
            longitude: 28.0567,
            displayDistance: true,
          },
          customerId: 'customer-ai-1',
          customerName: 'Sarah Johnson',
          expectedDuration: 5,
          budget: { min: 400, max: 700 },
          status: 'pending',
          postedAt: Date.now() - 30 * 60 * 1000,
          bids: [],
        },
        matchScore: 95,
        reasons: [
          'Perfect match for your cleaning expertise',
          'Customer prefers providers with 4.5+ ratings',
          'Location is in your preferred work area',
          'Budget aligns with your typical rates'
        ],
        suggestedBid: 550,
        winProbability: 85,
        competitorCount: 3,
      },
      {
        job: {
          id: 'ai-match-2',
          title: 'Garden Maintenance & Landscaping',
          category: 'gardening',
          description: 'Monthly garden maintenance including lawn mowing, hedge trimming, and flower bed care.',
          images: ['https://images.pexels.com/photos/1159693/pexels-photo-1159693.jpeg'],
          location: {
            address: 'Rosebank, Johannesburg',
            latitude: -26.1448,
            longitude: 28.0436,
            displayDistance: true,
          },
          customerId: 'customer-ai-2',
          customerName: 'Michael Chen',
          expectedDuration: 3,
          budget: { min: 250, max: 400 },
          status: 'pending',
          postedAt: Date.now() - 45 * 60 * 1000,
          bids: [],
        },
        matchScore: 78,
        reasons: [
          'Recurring job opportunity',
          'Customer values reliability over lowest price',
          'Your gardening skills are highly rated'
        ],
        suggestedBid: 320,
        winProbability: 72,
        competitorCount: 5,
      },
      {
        job: {
          id: 'ai-match-3',
          title: 'Urgent Plumbing Repair',
          category: 'maintenance',
          description: 'Kitchen sink leak needs immediate attention. Customer available all day.',
          images: ['https://images.pexels.com/photos/5331071/pexels-photo-5331071.jpeg'],
          location: {
            address: 'Melville, Johannesburg',
            latitude: -26.1875,
            longitude: 28.0103,
            displayDistance: true,
          },
          customerId: 'customer-ai-3',
          customerName: 'Lisa Williams',
          expectedDuration: 2,
          budget: { min: 300, max: 500 },
          status: 'pending',
          postedAt: Date.now() - 15 * 60 * 1000,
          bids: [],
        },
        matchScore: 88,
        reasons: [
          'Urgent job - quick response advantage',
          'Your maintenance skills are in demand',
          'Premium pricing for emergency work'
        ],
        suggestedBid: 450,
        winProbability: 90,
        competitorCount: 2,
      },
    ];

    setMatches(mockMatches);
    setUserSkills(['cleaning', 'gardening', 'maintenance']);
    setIsAnalyzing(false);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return Colors.success[500];
    if (score >= 75) return Colors.warning[500];
    return Colors.neutral[500];
  };

  const getWinProbabilityBadge = (probability: number) => {
    if (probability >= 80) return <Badge label={`${probability}% Win Rate`} variant="success" />;
    if (probability >= 60) return <Badge label={`${probability}% Win Rate`} variant="warning" />;
    return <Badge label={`${probability}% Win Rate`} variant="neutral" />;
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Brain size={24} color={Colors.primary[500]} />
          <Text variant="h4" weight="semibold" style={styles.title}>
            AI Job Matcher
          </Text>
        </View>
        <Button
          title={isAnalyzing ? "Analyzing..." : "Refresh"}
          variant="outline"
          size="small"
          onPress={analyzeJobMatches}
          disabled={isAnalyzing}
          leftIcon={<Zap size={16} color={Colors.primary[500]} />}
        />
      </View>

      <Text variant="body2" color="secondary" style={styles.description}>
        AI analyzes your skills, location, and success patterns to find perfect job matches
      </Text>

      {isAnalyzing ? (
        <View style={styles.analyzing}>
          <Brain size={48} color={Colors.primary[300]} />
          <Text variant="body1" color="secondary" style={styles.analyzingText}>
            AI is analyzing thousands of data points to find your perfect matches...
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.matches} showsVerticalScrollIndicator={false}>
          {matches.map((match) => (
            <Card key={match.job.id} style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <View style={styles.matchInfo}>
                  <Text variant="body1" weight="semibold" numberOfLines={1}>
                    {match.job.title}
                  </Text>
                  <View style={styles.matchMeta}>
                    <MapPin size={14} color={Colors.neutral[500]} />
                    <Text variant="caption" color="secondary" style={styles.metaText}>
                      {match.job.location.address}
                    </Text>
                    <Clock size={14} color={Colors.neutral[500]} />
                    <Text variant="caption" color="secondary" style={styles.metaText}>
                      {match.job.expectedDuration}h
                    </Text>
                  </View>
                </View>
                
                <View style={styles.matchScore}>
                  <Text 
                    variant="h3" 
                    weight="bold" 
                    style={{ color: getMatchScoreColor(match.matchScore) }}
                  >
                    {match.matchScore}%
                  </Text>
                  <Text variant="caption" color="secondary">
                    Match
                  </Text>
                </View>
              </View>

              <Text variant="body2" color="secondary" numberOfLines={2} style={styles.jobDescription}>
                {match.job.description}
              </Text>

              <View style={styles.aiInsights}>
                <Text variant="body2" weight="semibold" style={styles.insightsTitle}>
                  🤖 AI Insights:
                </Text>
                {match.reasons.slice(0, 2).map((reason, index) => (
                  <Text key={index} variant="caption" color="secondary" style={styles.reason}>
                    • {reason}
                  </Text>
                ))}
              </View>

              <View style={styles.bidSuggestion}>
                <View style={styles.bidInfo}>
                  <Text variant="body2" weight="semibold">
                    Suggested Bid: R{match.suggestedBid}
                  </Text>
                  <Text variant="caption" color="secondary">
                    {match.competitorCount} other bidders
                  </Text>
                </View>
                {getWinProbabilityBadge(match.winProbability)}
              </View>

              <View style={styles.matchActions}>
                <Button
                  title="View Details"
                  variant="outline"
                  size="small"
                  onPress={() => onJobSelect(match.job)}
                  style={styles.actionButton}
                />
                <Button
                  title="Quick Bid"
                  variant="primary"
                  size="small"
                  onPress={() => console.log('Quick bid:', match.suggestedBid)}
                  leftIcon={<Target size={16} color={Colors.white} />}
                  style={styles.actionButton}
                />
              </View>
            </Card>
          ))}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <TrendingUp size={16} color={Colors.success[500]} />
        <Text variant="caption" color="secondary" style={styles.footerText}>
          AI learns from your success patterns to improve recommendations
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: Layout.spacing.sm,
  },
  description: {
    marginBottom: Layout.spacing.lg,
    lineHeight: 20,
  },
  analyzing: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl * 2,
  },
  analyzingText: {
    marginTop: Layout.spacing.md,
    textAlign: 'center',
  },
  matches: {
    maxHeight: 400,
  },
  matchCard: {
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary[200],
    backgroundColor: Colors.primary[25],
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.sm,
  },
  matchInfo: {
    flex: 1,
  },
  matchMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaText: {
    marginLeft: 4,
    marginRight: Layout.spacing.sm,
  },
  matchScore: {
    alignItems: 'center',
    marginLeft: Layout.spacing.md,
  },
  jobDescription: {
    marginBottom: Layout.spacing.md,
    lineHeight: 18,
  },
  aiInsights: {
    backgroundColor: Colors.primary[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  insightsTitle: {
    marginBottom: Layout.spacing.xs,
  },
  reason: {
    marginLeft: Layout.spacing.sm,
    lineHeight: 16,
  },
  bidSuggestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.success[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  bidInfo: {
    flex: 1,
  },
  matchActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Layout.spacing.md,
    paddingTop: Layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  footerText: {
    marginLeft: Layout.spacing.xs,
    fontStyle: 'italic',
  },
});

export default AIJobMatcher;