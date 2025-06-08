import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, Globe, Users, DollarSign, Calendar, MapPin } from 'lucide-react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

interface MarketTrend {
  category: string;
  demand: number;
  growth: number;
  averagePrice: number;
  competition: 'low' | 'medium' | 'high';
  seasonality: string;
}

interface RegionalData {
  area: string;
  hotCategories: string[];
  averageEarnings: number;
  responseTime: number;
  customerSatisfaction: number;
}

interface MarketIntelligenceProps {
  userId: string;
}

export const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({ userId }) => {
  const [trends, setTrends] = useState<MarketTrend[]>([]);
  const [regionalData, setRegionalData] = useState<RegionalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<'trends' | 'regional' | 'insights'>('trends');

  useEffect(() => {
    loadMarketData();
  }, [userId]);

  const loadMarketData = async () => {
    setIsLoading(true);
    
    // Simulate AI market analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTrends: MarketTrend[] = [
      {
        category: 'cleaning',
        demand: 92,
        growth: 15,
        averagePrice: 420,
        competition: 'medium',
        seasonality: 'Peak in spring/summer',
      },
      {
        category: 'maintenance',
        demand: 88,
        growth: 22,
        averagePrice: 580,
        competition: 'high',
        seasonality: 'Steady year-round',
      },
      {
        category: 'gardening',
        demand: 75,
        growth: -8,
        averagePrice: 320,
        competition: 'low',
        seasonality: 'Seasonal (spring/summer)',
      },
      {
        category: 'delivery',
        demand: 65,
        growth: 5,
        averagePrice: 180,
        competition: 'high',
        seasonality: 'Peak during holidays',
      },
    ];

    const mockRegionalData: RegionalData[] = [
      {
        area: 'Sandton',
        hotCategories: ['maintenance', 'cleaning'],
        averageEarnings: 1250,
        responseTime: 1.2,
        customerSatisfaction: 4.7,
      },
      {
        area: 'Rosebank',
        hotCategories: ['cleaning', 'gardening'],
        averageEarnings: 980,
        responseTime: 1.8,
        customerSatisfaction: 4.5,
      },
      {
        area: 'Melville',
        hotCategories: ['delivery', 'maintenance'],
        averageEarnings: 850,
        responseTime: 2.1,
        customerSatisfaction: 4.3,
      },
    ];

    setTrends(mockTrends);
    setRegionalData(mockRegionalData);
    setIsLoading(false);
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return Colors.success[500];
      case 'medium': return Colors.warning[500];
      case 'high': return Colors.error[500];
      default: return Colors.neutral[500];
    }
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? Colors.success[500] : Colors.error[500];
  };

  const renderTrends = () => (
    <View style={styles.section}>
      <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
        📈 Market Trends
      </Text>
      {trends.map((trend, index) => (
        <Card key={index} style={styles.trendCard}>
          <View style={styles.trendHeader}>
            <Text variant="body1" weight="semibold" style={styles.categoryName}>
              {trend.category.charAt(0).toUpperCase() + trend.category.slice(1)}
            </Text>
            <Badge 
              label={`${trend.demand}% Demand`} 
              variant={trend.demand > 80 ? 'success' : trend.demand > 60 ? 'warning' : 'neutral'}
            />
          </View>
          
          <View style={styles.trendMetrics}>
            <View style={styles.metric}>
              <TrendingUp size={16} color={getGrowthColor(trend.growth)} />
              <Text variant="body2" weight="medium" style={{ color: getGrowthColor(trend.growth) }}>
                {trend.growth > 0 ? '+' : ''}{trend.growth}%
              </Text>
              <Text variant="caption" color="secondary">Growth</Text>
            </View>
            
            <View style={styles.metric}>
              <DollarSign size={16} color={Colors.primary[500]} />
              <Text variant="body2" weight="medium">R{trend.averagePrice}</Text>
              <Text variant="caption" color="secondary">Avg Price</Text>
            </View>
            
            <View style={styles.metric}>
              <Users size={16} color={getCompetitionColor(trend.competition)} />
              <Text variant="body2" weight="medium" style={{ color: getCompetitionColor(trend.competition) }}>
                {trend.competition.toUpperCase()}
              </Text>
              <Text variant="caption" color="secondary">Competition</Text>
            </View>
          </View>
          
          <View style={styles.seasonality}>
            <Calendar size={14} color={Colors.neutral[500]} />
            <Text variant="caption" color="secondary" style={styles.seasonalityText}>
              {trend.seasonality}
            </Text>
          </View>
        </Card>
      ))}
    </View>
  );

  const renderRegional = () => (
    <View style={styles.section}>
      <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
        🗺️ Regional Intelligence
      </Text>
      {regionalData.map((region, index) => (
        <Card key={index} style={styles.regionCard}>
          <View style={styles.regionHeader}>
            <MapPin size={20} color={Colors.primary[500]} />
            <Text variant="body1" weight="semibold" style={styles.regionName}>
              {region.area}
            </Text>
          </View>
          
          <View style={styles.regionStats}>
            <View style={styles.regionStat}>
              <Text variant="h3" weight="bold" color="primary">R{region.averageEarnings}</Text>
              <Text variant="caption" color="secondary">Weekly Avg</Text>
            </View>
            <View style={styles.regionStat}>
              <Text variant="h3" weight="bold" color="success">{region.responseTime}h</Text>
              <Text variant="caption" color="secondary">Response Time</Text>
            </View>
            <View style={styles.regionStat}>
              <Text variant="h3" weight="bold" color="warning">{region.customerSatisfaction}★</Text>
              <Text variant="caption" color="secondary">Satisfaction</Text>
            </View>
          </View>
          
          <View style={styles.hotCategories}>
            <Text variant="body2" weight="medium" style={styles.hotCategoriesTitle}>
              🔥 Hot Categories:
            </Text>
            <View style={styles.categoryTags}>
              {region.hotCategories.map((category, catIndex) => (
                <Badge 
                  key={catIndex} 
                  label={category} 
                  variant="primary" 
                  style={styles.categoryTag}
                />
              ))}
            </View>
          </View>
        </Card>
      ))}
    </View>
  );

  const renderInsights = () => (
    <View style={styles.section}>
      <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
        💡 AI Market Insights
      </Text>
      
      <Card style={styles.insightCard}>
        <Text variant="body1" weight="semibold" style={styles.insightTitle}>
          🚀 Opportunity Alert
        </Text>
        <Text variant="body2" color="secondary" style={styles.insightText}>
          Maintenance jobs in Sandton are showing 22% growth with high demand. Consider increasing your rates by 10-15% in this area.
        </Text>
      </Card>
      
      <Card style={styles.insightCard}>
        <Text variant="body1" weight="semibold" style={styles.insightTitle}>
          ⚠️ Competition Warning
        </Text>
        <Text variant="body2" color="secondary" style={styles.insightText}>
          Delivery services have high competition. Focus on quick response times and competitive pricing to stand out.
        </Text>
      </Card>
      
      <Card style={styles.insightCard}>
        <Text variant="body1" weight="semibold" style={styles.insightTitle}>
          📊 Seasonal Trend
        </Text>
        <Text variant="body2" color="secondary" style={styles.insightText}>
          Spring cleaning season is approaching. Expect 40% increase in cleaning job demand over the next 4 weeks.
        </Text>
      </Card>
      
      <Card style={styles.insightCard}>
        <Text variant="body1" weight="semibold" style={styles.insightTitle}>
          🎯 Personal Recommendation
        </Text>
        <Text variant="body2" color="secondary" style={styles.insightText}>
          Based on your skills and location, focus on maintenance jobs in Sandton for maximum earnings potential.
        </Text>
      </Card>
    </View>
  );

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Globe size={24} color={Colors.primary[500]} />
        <Text variant="h4" weight="semibold" style={styles.title}>
          Market Intelligence
        </Text>
        <Button
          title={isLoading ? "Analyzing..." : "Refresh"}
          variant="outline"
          size="small"
          onPress={loadMarketData}
          disabled={isLoading}
        />
      </View>

      <Text variant="body2" color="secondary" style={styles.description}>
        Real-time market analysis powered by AI to help you make informed decisions
      </Text>

      <View style={styles.tabs}>
        <Button
          title="Trends"
          variant={selectedView === 'trends' ? 'primary' : 'ghost'}
          size="small"
          onPress={() => setSelectedView('trends')}
          style={styles.tab}
        />
        <Button
          title="Regional"
          variant={selectedView === 'regional' ? 'primary' : 'ghost'}
          size="small"
          onPress={() => setSelectedView('regional')}
          style={styles.tab}
        />
        <Button
          title="Insights"
          variant={selectedView === 'insights' ? 'primary' : 'ghost'}
          size="small"
          onPress={() => setSelectedView('insights')}
          style={styles.tab}
        />
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <Globe size={48} color={Colors.primary[300]} />
          <Text variant="body1" color="secondary" style={styles.loadingText}>
            AI is analyzing market data from thousands of jobs...
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedView === 'trends' && renderTrends()}
          {selectedView === 'regional' && renderRegional()}
          {selectedView === 'insights' && renderInsights()}
        </ScrollView>
      )}
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
    marginBottom: Layout.spacing.sm,
  },
  title: {
    marginLeft: Layout.spacing.sm,
    flex: 1,
  },
  description: {
    marginBottom: Layout.spacing.lg,
    lineHeight: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.lg,
  },
  tab: {
    flex: 1,
    marginHorizontal: 2,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl * 2,
  },
  loadingText: {
    marginTop: Layout.spacing.md,
    textAlign: 'center',
  },
  content: {
    maxHeight: 400,
  },
  section: {
    paddingVertical: Layout.spacing.md,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  trendCard: {
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  categoryName: {
    flex: 1,
  },
  trendMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Layout.spacing.md,
  },
  metric: {
    alignItems: 'center',
  },
  seasonality: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  seasonalityText: {
    marginLeft: Layout.spacing.xs,
  },
  regionCard: {
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  regionName: {
    marginLeft: Layout.spacing.sm,
  },
  regionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Layout.spacing.md,
  },
  regionStat: {
    alignItems: 'center',
  },
  hotCategories: {
    backgroundColor: Colors.primary[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  hotCategoriesTitle: {
    marginBottom: Layout.spacing.xs,
  },
  categoryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryTag: {
    marginRight: Layout.spacing.xs,
    marginBottom: Layout.spacing.xs,
  },
  insightCard: {
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
    backgroundColor: Colors.primary[25],
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  insightTitle: {
    marginBottom: Layout.spacing.sm,
  },
  insightText: {
    lineHeight: 20,
  },
});

export default MarketIntelligence;