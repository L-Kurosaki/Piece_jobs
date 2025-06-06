import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/ui/Text';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Card from '../../../../components/ui/Card';
import JobDetailHeader from '../../../../components/job/JobDetailHeader';
import { getJobById } from '../../../../utils/mockData';
import { Job } from '../../../../types/Job';
import { ChevronLeft, DollarSign, MessageSquare, Clock } from 'lucide-react-native';

export default function BidScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const jobData = getJobById(id);
      setJob(jobData || null);
    }
  }, [id]);

  const handleSubmitBid = async () => {
    if (!bidAmount || !bidMessage || !estimatedHours) {
      Alert.alert('Missing Information', 'Please fill in all fields to submit your bid.');
      return;
    }

    const amount = parseFloat(bidAmount);
    const hours = parseFloat(estimatedHours);

    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid bid amount.');
      return;
    }

    if (isNaN(hours) || hours <= 0 || hours > 8) {
      Alert.alert('Invalid Duration', 'Please enter a valid duration between 1-8 hours.');
      return;
    }

    if (job && (amount < job.budget.min || amount > job.budget.max)) {
      Alert.alert(
        'Amount Out of Range', 
        `Your bid should be between R${job.budget.min} and R${job.budget.max}.`
      );
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Bid Submitted Successfully',
        'Your bid has been submitted to the customer. You will be notified if it is accepted.',
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
        <Text variant="h3" weight="bold">Submit Bid</Text>
        <View style={{ width: 60 }} />
      </View>
      
      <ScrollView>
        <JobDetailHeader job={job} />
        
        <View style={styles.content}>
          <Card style={styles.budgetCard}>
            <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
              Customer's Budget Range
            </Text>
            <View style={styles.budgetRange}>
              <Text variant="h2" weight="bold" color="primary">
                R{job.budget.min} - R{job.budget.max}
              </Text>
            </View>
            <Text variant="body2" color="secondary">
              Expected Duration: ~{job.expectedDuration} hours
            </Text>
          </Card>

          <View style={styles.form}>
            <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
              Your Bid Details
            </Text>

            <Input
              label="Bid Amount (ZAR)"
              value={bidAmount}
              onChangeText={setBidAmount}
              placeholder="e.g., 350"
              keyboardType="numeric"
              leftIcon={<DollarSign size={20} color={Colors.neutral[500]} />}
              helper={`Must be between R${job.budget.min} and R${job.budget.max}`}
            />

            <Input
              label="Estimated Duration (hours)"
              value={estimatedHours}
              onChangeText={setEstimatedHours}
              placeholder="e.g., 3.5"
              keyboardType="numeric"
              leftIcon={<Clock size={20} color={Colors.neutral[500]} />}
              helper="How long do you estimate this job will take?"
            />

            <Input
              label="Message to Customer"
              value={bidMessage}
              onChangeText={setBidMessage}
              placeholder="Explain your approach, experience, and what's included in your bid..."
              multiline
              numberOfLines={4}
              leftIcon={<MessageSquare size={20} color={Colors.neutral[500]} />}
              helper="Describe your experience and what makes you the right choice"
            />

            <Card style={styles.tipCard}>
              <Text variant="body1" weight="semibold" style={styles.tipTitle}>
                💡 Bidding Tips
              </Text>
              <Text variant="body2" color="secondary" style={styles.tipText}>
                • Be competitive but fair with your pricing{'\n'}
                • Highlight your relevant experience{'\n'}
                • Mention any tools or supplies you'll bring{'\n'}
                • Be clear about what's included in your price{'\n'}
                • Respond quickly to increase your chances
              </Text>
            </Card>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Submit Bid"
          variant="primary"
          onPress={handleSubmitBid}
          loading={loading}
          fullWidth
        />
      </View>
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
  budgetCard: {
    padding: Layout.spacing.lg,
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  budgetRange: {
    marginVertical: Layout.spacing.md,
  },
  form: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
  },
  tipCard: {
    backgroundColor: Colors.warning[50],
    borderWidth: 1,
    borderColor: Colors.warning[200],
    marginTop: Layout.spacing.md,
  },
  tipTitle: {
    marginBottom: Layout.spacing.sm,
    color: Colors.warning[800],
  },
  tipText: {
    lineHeight: 20,
    color: Colors.warning[700],
  },
  footer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
});