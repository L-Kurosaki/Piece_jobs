import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/ui/Text';
import Button from '../../../../components/ui/Button';
import JobDetailHeader from '../../../../components/job/JobDetailHeader';
import SmartBidAssistant from '../../../../components/ai/SmartBidAssistant';
import { getJobById } from '../../../../utils/mockData';
import { Job } from '../../../../types/Job';
import { ChevronLeft, Brain } from 'lucide-react-native';

export default function BidScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(true);

  useEffect(() => {
    if (id) {
      const jobData = getJobById(id);
      setJob(jobData || null);
    }
  }, [id]);

  const handleSubmitBid = async (amount: number, message: string) => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Bid Submitted Successfully! 🎉',
        `Your smart bid of R${amount} has been submitted. The AI assistant optimized your bid for a higher win probability. You'll be notified if it's accepted.`,
        [
          { 
            text: 'OK', 
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit bid. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text variant="body1" color="error">Job not found</Text>
        <Button 
          title="Go Back" 
          variant="outline"
          onPress={() => router.back()} 
          style={styles.goBackButton}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Back"
          variant="ghost"
          onPress={() => router.back()}
          leftIcon={<ChevronLeft size={20} color={Colors.primary[500]} />}
        />
        <Text variant="h3" weight="bold">Smart Bidding</Text>
        <Button
          title=""
          variant="ghost"
          onPress={() => setShowAIAssistant(!showAIAssistant)}
          leftIcon={<Brain size={20} color={showAIAssistant ? Colors.primary[500] : Colors.neutral[400]} />}
        />
      </View>
      
      <ScrollView>
        <JobDetailHeader job={job} />
        
        <View style={styles.content}>
          {showAIAssistant ? (
            <SmartBidAssistant 
              job={job} 
              onBidSubmit={handleSubmitBid}
            />
          ) : (
            <View style={styles.manualBidding}>
              <Text variant="h4" weight="semibold" style={styles.manualTitle}>
                Manual Bidding
              </Text>
              <Text variant="body2" color="secondary" style={styles.manualDescription}>
                You've disabled the AI assistant. You can still place a bid manually, but you'll miss out on market insights and optimization recommendations.
              </Text>
              <Button
                title="Enable AI Assistant"
                variant="primary"
                onPress={() => setShowAIAssistant(true)}
                leftIcon={<Brain size={20} color={Colors.white} />}
                style={styles.enableAIButton}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  goBackButton: {
    marginTop: Layout.spacing.md,
  },
  content: {
    padding: Layout.spacing.lg,
  },
  manualBidding: {
    backgroundColor: Colors.neutral[100],
    padding: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
  },
  manualTitle: {
    marginBottom: Layout.spacing.sm,
  },
  manualDescription: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Layout.spacing.lg,
  },
  enableAIButton: {
    width: '100%',
  },
});