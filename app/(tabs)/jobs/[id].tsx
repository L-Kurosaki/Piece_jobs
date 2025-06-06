import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/ui/Text';
import Button from '../../../components/ui/Button';
import JobDetailHeader from '../../../components/job/JobDetailHeader';
import BidCard from '../../../components/job/BidCard';
import { getJobById } from '../../../utils/mockData';
import { Job } from '../../../types/Job';
import { ChevronLeft } from 'lucide-react-native';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, we would fetch the job from the API
      const jobData = getJobById(id);
      setJob(jobData || null);
      setLoading(false);
    }
  }, [id]);

  const handleAcceptBid = (bidId: string) => {
    // In a real app, we would call an API to accept the bid
    console.log(`Accepting bid: ${bidId}`);
    
    // For demo purposes, update the job locally
    if (job) {
      const updatedJob = { 
        ...job, 
        status: 'accepted' as const,
        acceptedBid: bidId,
        providerId: job.bids.find(bid => bid.id === bidId)?.providerId,
      };
      setJob(updatedJob);
    }
  };

  const handleContact = (providerId: string) => {
    // In a real app, we would navigate to the message screen
    console.log(`Contacting provider: ${providerId}`);
    router.push(`/messages/${providerId}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading job details...</Text>
      </SafeAreaView>
    );
  }

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
      <View style={styles.backButtonContainer}>
        <Button
          title="Back"
          variant="ghost"
          onPress={() => router.back()}
          leftIcon={<ChevronLeft size={20} color={Colors.primary[500]} />}
        />
      </View>
      
      <ScrollView>
        <JobDetailHeader job={job} />
        
        <View style={styles.content}>
          <View style={styles.section}>
            <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
              Bids ({job.bids.length})
            </Text>
            
            {job.bids.length > 0 ? (
              job.bids.map(bid => (
                <BidCard
                  key={bid.id}
                  bid={bid}
                  isAccepted={job.acceptedBid === bid.id}
                  onAccept={job.status === 'pending' ? () => handleAcceptBid(bid.id) : undefined}
                  onMessage={() => handleContact(bid.providerId)}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text variant="body1" color="secondary" centered>
                  No bids yet. Check back later.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      
      {job.status === 'pending' && (
        <View style={styles.footer}>
          <Button
            title="Place a Bid"
            variant="primary"
            onPress={() => console.log('Place bid')}
            fullWidth
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  backButtonContainer: {
    position: 'absolute',
    top: Layout.spacing.md,
    left: Layout.spacing.sm,
    zIndex: 10,
  },
  goBackButton: {
    marginTop: Layout.spacing.md,
  },
  content: {
    padding: Layout.spacing.lg,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
  },
  emptyState: {
    padding: Layout.spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  footer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
});