import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart3, TrendingUp, DollarSign, Calendar, Target } from 'lucide-react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

interface PredictiveData {
  weeklyEarnings: number[];
  demandForecast: { category: string; demand: number; trend: 'up' | 'down' | 'stable' }[];
  optimalPricing: { category: string; current: number; suggested: number; impact: string }[];
  busyHours: { hour: number; demand: number }[];
}

interface PredictiveAnalyticsProps {
  userId: string;
}

export const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ userId }) => {
  const [data, setData] = useState<PredictiveData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<'earnings' | 'demand' | 'pricing' | 'schedule'>('earnings');

  useEffect(() => {
    generatePredictiveData();
  }, [userId]);

  const generatePredictiveData = async () => {
    setIsLoading(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData: PredictiveData = {
      weeklyEarnings: [450, 520, 380, 680, 590, 720, 650], // Next 7 days
      demandForecast: [
        { category: 'cleaning', demand: 85, trend: 'up' },
        { category: 'maintenance', demand: 92, trend: 'up' },
        { category: 'gardening', demand: 65, trend: 'down' },
        { category: 'delivery', demand: 78, trend: 'stable' },
      ],
      optimalPricing: [
        { category: 'cleaning', current: 350, suggested: 420, impact: '+20% win rate' },
        { category: 'maintenance', current: 500, suggested: 580, impact: '+15% earnings' },
        { category: 'gardening', current: 280, suggested: 260, impact: '+30% bookings' },
      ],
      busyHours: [
        { hour: 8, demand: 45 },
        { hour: 9, demand: 75 },
        { hour: 10, demand: 90 },
        { hour: 11, demand: 85 },
        { hour: 14, demand: 80 },
        { hour: 15, demand: 95 },
        { hour: 16, demand: 70 },
      ],
    };

    setData(mockData);
    setIsLoading(false);
  };

  const renderEarningsChart = () => {
    if (!data) return null;
    
    const maxEarnings = Math.max(...data.weeklyEarnings);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return (
      <View style={styles.chartContainer}>
        <Text variant="body1" weight="semibold" style={styles.chartTitle}>
          📈 Predicted Weekly Earnings
        </Text>
        <View style={styles.barChart}>
          {data.weeklyEarnings.map((earnings, index) => (
            <View key={index} style={styles.barContainer}>
              <View 
                style={[
                  styles.bar,
                  { 
                    height: (earnings / maxEarnings) * 100,
                    backgroundColor: earnings > 600 ? Colors.success[500] : Colors.primary[500]
                  }
                ]}
              />
              <Text variant="caption" color="secondary" style={styles.barLabel}>
                {days[index]}
              </Text>
              <Text variant="caption" weight="medium" style={styles.barValue}>
                R{earnings}
              </Text>
            </View>
          ))}
        </View>
        <Text variant="caption" color="secondary" style={styles.chartNote}>
          🤖 AI predicts R{data.weeklyEarnings.reduce((a, b) => a + b, 0).toLocaleString()} total this week
        </Text>
      </View>
    );
  };

  const renderDemandForecast = () => {
    if (!data) return null;
    
    return (
      <View style={styles.chartContainer}>
        <Text variant="body1" weight="semibold" style={styles.chartTitle}>
          🎯 Demand Forecast (Next 7 Days)
        </Text>
        {data.demandForecast.map((item, index) => (
          <View key={index} style={styles.demandItem}>
            <View style={styles.demandInfo}>
              <Text variant="body2" weight="medium" style={styles.categoryName}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </Text>
              <View style={styles.demandBar}>
                <View 
                  style={[
                    styles.demandFill,
                    { 
                      width: `${item.demand}%`,
                      backgroundColor: item.trend === 'up' ? Colors.success[500] : 
                                     item.trend === 'down' ? Colors.warning[500] : Colors.neutral[400]
                    }
                  ]}
                />
              </View>
            </View>
            <View style={styles.demandMeta}>
              <Text variant="caption" weight="medium">
                {item.demand}%
              </Text>
              <TrendingUp 
                size={14} 
                color={item.trend === 'up' ? Colors.success[500] : 
                       item.trend === 'down' ? Colors.warning[500] : Colors.neutral[400]}
              />
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderPricingOptimization = () => {
    if (!data) return null;
    
    return (
      <View style={styles.chartContainer}>
        <Text variant="body1" weight="semibold" style={styles.chartTitle}>
          💰 AI Pricing Optimization
        </Text>
        {data.optimalPricing.map((item, index) => (
          <View key={index} style={styles.pricingItem}>
            <View style={styles.pricingHeader}>
              <Text variant="body2" weight="medium">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </Text>
              <Text variant="caption" color="success" weight="medium">
                {item.impact}
              </Text>
            </View>
            <View style={styles.pricingComparison}>
              <View style={styles.priceBox}>
                <Text variant="caption" color="secondary">Current</Text>
                <Text variant="body1" weight="semibold">R{item.current}</Text>
              </View>
              <Text variant="h4" color="primary">→</Text>
              <View style={[styles.priceBox, styles.suggestedPrice]}>
                <Text variant="caption" color="primary">AI Suggests</Text>
                <Text variant="body1" weight="bold" color="primary">R{item.suggested}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderScheduleOptimization = () => {
    if (!data) return null;
    
    return (
      <View style={styles.chartContainer}>
        <Text variant="body1" weight="semibold" style={styles.chartTitle}>
          ⏰ Optimal Working Hours
        </Text>
        <View style={styles.scheduleGrid}>
          {data.busyHours.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.hourSlot,
                { 
                  backgroundColor: item.demand > 85 ? Colors.success[100] : 
                                  item.demand > 70 ? Colors.warning[100] : Colors.neutral[100]
                }
              ]}
            >
              <Text variant="body2" weight="medium">
                {item.hour}:00
              </Text>
              <Text variant="caption" color="secondary">
                {item.demand}% busy
              </Text>
            </View>
          ))}
        </View>
        <Text variant="caption" color="secondary" style={styles.chartNote}>
          🎯 Peak hours: 10 AM - 11 AM and 3 PM - 4 PM
        </Text>
      </View>
    );
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'earnings':
        return renderEarningsChart();
      case 'demand':
        return renderDemandForecast();
      case 'pricing':
        return renderPricingOptimization();
      case 'schedule':
        return renderScheduleOptimization();
      default:
        return renderEarningsChart();
    }
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <BarChart3 size={24} color={Colors.primary[500]} />
          <Text variant="h4" weight="semibold" style={styles.title}>
            Predictive Analytics
          </Text>
        </View>
        <Button
          title={isLoading ? "Analyzing..." : "Refresh"}
          variant="outline"
          size="small"
          onPress={generatePredictiveData}
          disabled={isLoading}
        />
      </View>

      <Text variant="body2" color="secondary" style={styles.description}>
        AI analyzes market patterns to predict opportunities and optimize your strategy
      </Text>

      <View style={styles.tabs}>
        <Button
          title="Earnings"
          variant={selectedView === 'earnings' ? 'primary' : 'ghost'}
          size="small"
          onPress={() => setSelectedView('earnings')}
          leftIcon={<DollarSign size={14} color={selectedView === 'earnings' ? Colors.white : Colors.primary[500]} />}
          style={styles.tab}
        />
        <Button
          title="Demand"
          variant={selectedView === 'demand' ? 'primary' : 'ghost'}
          size="small"
          onPress={() => setSelectedView('demand')}
          leftIcon={<Target size={14} color={selectedView === 'demand' ? Colors.white : Colors.primary[500]} />}
          style={styles.tab}
        />
        <Button
          title="Pricing"
          variant={selectedView === 'pricing' ? 'primary' : 'ghost'}
          size="small"
          onPress={() => setSelectedView('pricing')}
          leftIcon={<TrendingUp size={14} color={selectedView === 'pricing' ? Colors.white : Colors.primary[500]} />}
          style={styles.tab}
        />
        <Button
          title="Schedule"
          variant={selectedView === 'schedule' ? 'primary' : 'ghost'}
          size="small"
          onPress={() => setSelectedView('schedule')}
          leftIcon={<Calendar size={14} color={selectedView === 'schedule' ? Colors.white : Colors.primary[500]} />}
          style={styles.tab}
        />
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <BarChart3 size={48} color={Colors.primary[300]} />
          <Text variant="body1" color="secondary" style={styles.loadingText}>
            AI is crunching market data and user patterns...
          </Text>
        </View>
      ) : (
        renderContent()
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
  chartContainer: {
    paddingVertical: Layout.spacing.md,
  },
  chartTitle: {
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: Layout.spacing.md,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: Colors.primary[500],
    borderRadius: 2,
    marginBottom: Layout.spacing.xs,
  },
  barLabel: {
    marginBottom: 2,
  },
  barValue: {
    fontSize: 10,
  },
  chartNote: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  demandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  demandInfo: {
    flex: 1,
  },
  categoryName: {
    marginBottom: Layout.spacing.xs,
  },
  demandBar: {
    height: 8,
    backgroundColor: Colors.neutral[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  demandFill: {
    height: '100%',
    borderRadius: 4,
  },
  demandMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Layout.spacing.md,
  },
  pricingItem: {
    backgroundColor: Colors.neutral[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  pricingComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  priceBox: {
    alignItems: 'center',
    padding: Layout.spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
  },
  suggestedPrice: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.md,
  },
  hourSlot: {
    width: '22%',
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
});

export default PredictiveAnalytics;