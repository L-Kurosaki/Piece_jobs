import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Brain, Target, TrendingUp, Users, Clock, Zap } from 'lucide-react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Badge from '../ui/Badge';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { Job } from '../../types/Job';

interface BidAnalysis {
  suggestedPrice: number;
  winProbability: number;
  competitorAnalysis: {
    count: number;
    averageBid: number;
    priceRange: { min: number; max: number };
  };
  marketFactors: {
    demand: 'high' | 'medium' | 'low';
    urgency: 'urgent' | 'normal' | 'flexible';
    competition: 'low' | 'medium' | 'high';
  };
  recommendations: string[];
  riskFactors: string[];
}

interface SmartBidAssistantProps {
  job: Job;
  onBidSubmit: (amount: number, message: string) => void;
}

export const SmartBidAssistant: React.FC<SmartBidAssistantProps> = ({ job, onBidSubmit }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [analysis, setAnalysis] = useState<BidAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    analyzeBidOpportunity();
  }, [job]);

  const analyzeBidOpportunity = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis: BidAnalysis = {
      suggestedPrice: 420,
      winProbability: 78,
      competitorAnalysis: {
        count: 5,
        averageBid: 450,
        priceRange: { min: 380, max: 520 },
      },
      marketFactors: {
        demand: 'high',
        urgency: 'normal',
        competition: 'medium',
      },
      recommendations: [
        'Price 6% below average to increase win probability',
        'Highlight your 4.8-star rating in your message',
        'Mention your quick response time advantage',
        'Include specific cleaning supplies you provide',
      ],
      riskFactors: [
        'Customer has no previous reviews',
        'Job posted during peak competition hours',
      ],
    };

    setAnalysis(mockAnalysis);
    setBidAmount(mockAnalysis.suggestedPrice.toString());
    setIsAnalyzing(false);
    
    // Generate AI-powered bid message
    generateBidMessage(mockAnalysis);
  };

  const generateBidMessage = (analysis: BidAnalysis) => {
    const message = `Hi! I'm excited to help with your ${job.category} project. With my 4.8-star rating and ${job.category} expertise, I can complete this job efficiently and to your satisfaction. I bring all necessary supplies and guarantee quality work. Available to start immediately. Looking forward to working with you!`;
    setBidMessage(message);
  };

  const handlePriceChange = (value: string) => {
    setBidAmount(value);
    if (analysis && value) {
      const newPrice = parseFloat(value);
      const avgBid = analysis.competitorAnalysis.averageBid;
      
      // Recalculate win probability based on price
      let newWinProbability = analysis.winProbability;
      if (newPrice < avgBid * 0.9) {
        newWinProbability = Math.min(95, analysis.winProbability + 15);
      } else if (newPrice > avgBid * 1.1) {
        newWinProbability = Math.max(20, analysis.winProbability - 20);
      }
      
      setAnalysis({
        ...analysis,
        winProbability: newWinProbability,
      });
    }
  };

  const handleSubmitBid = () => {
    if (!bidAmount || !bidMessage) {
      Alert.alert('Missing Information', 'Please enter both bid amount and message.');
      return;
    }

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid bid amount.');
      return;
    }

    onBidSubmit(amount, bidMessage);
  };

  const getFactorColor = (factor: string) => {
    switch (factor) {
      case 'high':
      case 'urgent':
      case 'low':
        return Colors.success[500];
      case 'medium':
      case 'normal':
        return Colors.warning[500];
      default:
        return Colors.error[500];
    }
  };

  const getWinProbabilityColor = (probability: number) => {
    if (probability >= 75) return Colors.success[500];
    if (probability >= 50) return Colors.warning[500];
    return Colors.error[500];
  };

  if (isAnalyzing) {
    return (
      <Card style={styles.container}>
        <View style={styles.analyzing}>
          <Brain size={48} color={Colors.primary[300]} />
          <Text variant="body1" color="secondary" style={styles.analyzingText}>
            AI is analyzing market data, competitor bids, and success patterns...
          </Text>
        </View>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Brain size={24} color={Colors.primary[500]} />
        <Text variant="h4" weight="semibold" style={styles.title}>
          Smart Bid Assistant
        </Text>
        <Badge 
          label={`${analysis.winProbability}% Win Rate`} 
          variant={analysis.winProbability >= 75 ? 'success' : analysis.winProbability >= 50 ? 'warning' : 'error'}
        />
      </View>

      {/* Market Analysis */}
      <View style={styles.marketAnalysis}>
        <Text variant="body1" weight="semibold" style={styles.sectionTitle}>
          📊 Market Analysis
        </Text>
        <View style={styles.factorsGrid}>
          <View style={styles.factorItem}>
            <TrendingUp size={16} color={getFactorColor(analysis.marketFactors.demand)} />
            <Text variant="caption" color="secondary">Demand</Text>
            <Text variant="body2" weight="medium" style={{ color: getFactorColor(analysis.marketFactors.demand) }}>
              {analysis.marketFactors.demand.toUpperCase()}
            </Text>
          </View>
          <View style={styles.factorItem}>
            <Clock size={16} color={getFactorColor(analysis.marketFactors.urgency)} />
            <Text variant="caption" color="secondary">Urgency</Text>
            <Text variant="body2" weight="medium" style={{ color: getFactorColor(analysis.marketFactors.urgency) }}>
              {analysis.marketFactors.urgency.toUpperCase()}
            </Text>
          </View>
          <View style={styles.factorItem}>
            <Users size={16} color={getFactorColor(analysis.marketFactors.competition)} />
            <Text variant="caption" color="secondary">Competition</Text>
            <Text variant="body2" weight="medium" style={{ color: getFactorColor(analysis.marketFactors.competition) }}>
              {analysis.marketFactors.competition.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {/* Competitor Analysis */}
      <View style={styles.competitorAnalysis}>
        <Text variant="body1" weight="semibold" style={styles.sectionTitle}>
          🎯 Competitor Intelligence
        </Text>
        <View style={styles.competitorStats}>
          <View style={styles.statItem}>
            <Text variant="h3" weight="bold" color="primary">
              {analysis.competitorAnalysis.count}
            </Text>
            <Text variant="caption" color="secondary">Bidders</Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="h3" weight="bold" color="warning">
              R{analysis.competitorAnalysis.averageBid}
            </Text>
            <Text variant="caption" color="secondary">Avg Bid</Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="body2" weight="medium">
              R{analysis.competitorAnalysis.priceRange.min} - R{analysis.competitorAnalysis.priceRange.max}
            </Text>
            <Text variant="caption" color="secondary">Range</Text>
          </View>
        </View>
      </View>

      {/* Bid Input */}
      <View style={styles.bidSection}>
        <Text variant="body1" weight="semibold" style={styles.sectionTitle}>
          💰 Your Bid
        </Text>
        <Input
          label="Bid Amount (ZAR)"
          value={bidAmount}
          onChangeText={handlePriceChange}
          keyboardType="numeric"
          placeholder="Enter your bid"
        />
        
        <View style={styles.winProbability}>
          <Text variant="body2" color="secondary">Win Probability:</Text>
          <Text 
            variant="h4" 
            weight="bold" 
            style={{ color: getWinProbabilityColor(analysis.winProbability) }}
          >
            {analysis.winProbability}%
          </Text>
        </View>
      </View>

      {/* AI Recommendations */}
      <View style={styles.recommendations}>
        <Text variant="body1" weight="semibold" style={styles.sectionTitle}>
          🤖 AI Recommendations
        </Text>
        {analysis.recommendations.slice(0, showAdvanced ? analysis.recommendations.length : 2).map((rec, index) => (
          <View key={index} style={styles.recommendationItem}>
            <Zap size={14} color={Colors.success[500]} />
            <Text variant="body2" color="secondary" style={styles.recommendationText}>
              {rec}
            </Text>
          </View>
        ))}
        
        <Button
          title={showAdvanced ? "Show Less" : "Show More Tips"}
          variant="ghost"
          size="small"
          onPress={() => setShowAdvanced(!showAdvanced)}
          style={styles.showMoreButton}
        />
      </View>

      {/* Risk Factors */}
      {analysis.riskFactors.length > 0 && (
        <View style={styles.riskFactors}>
          <Text variant="body1" weight="semibold" style={styles.sectionTitle}>
            ⚠️ Risk Factors
          </Text>
          {analysis.riskFactors.map((risk, index) => (
            <Text key={index} variant="body2" color="warning" style={styles.riskItem}>
              • {risk}
            </Text>
          ))}
        </View>
      )}

      {/* Bid Message */}
      <View style={styles.messageSection}>
        <Input
          label="Bid Message"
          value={bidMessage}
          onChangeText={setBidMessage}
          multiline
          numberOfLines={4}
          placeholder="Write your message to the customer..."
        />
      </View>

      {/* Submit Button */}
      <Button
        title="Submit Smart Bid"
        variant="primary"
        onPress={handleSubmitBid}
        leftIcon={<Target size={20} color={Colors.white} />}
        fullWidth
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  title: {
    marginLeft: Layout.spacing.sm,
    flex: 1,
  },
  analyzing: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl * 2,
  },
  analyzingText: {
    marginTop: Layout.spacing.md,
    textAlign: 'center',
  },
  marketAnalysis: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
  },
  factorsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  factorItem: {
    alignItems: 'center',
    backgroundColor: Colors.neutral[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
  },
  competitorAnalysis: {
    marginBottom: Layout.spacing.lg,
  },
  competitorStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.primary[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
  },
  statItem: {
    alignItems: 'center',
  },
  bidSection: {
    marginBottom: Layout.spacing.lg,
  },
  winProbability: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.success[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginTop: Layout.spacing.sm,
  },
  recommendations: {
    marginBottom: Layout.spacing.lg,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.sm,
    backgroundColor: Colors.success[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  recommendationText: {
    marginLeft: Layout.spacing.sm,
    flex: 1,
    lineHeight: 18,
  },
  showMoreButton: {
    alignSelf: 'center',
  },
  riskFactors: {
    backgroundColor: Colors.warning[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.lg,
  },
  riskItem: {
    marginBottom: Layout.spacing.xs,
  },
  messageSection: {
    marginBottom: Layout.spacing.lg,
  },
});

export default SmartBidAssistant;