import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/ui/Text';
import Button from '../../../components/ui/Button';
import JobDetailHeader from '../../../components/job/JobDetailHeader';
import BidCard from '../../../components/job/BidCard';
import JobTimer from '../../../components/job/JobTimer';
import PaymentBreakdown from '../../../components/payment/PaymentBreakdown';
import EmergencyButton from '../../../components/security/EmergencyButton';
import { getJobById } from '../../../utils/mockData';
import { Job } from '../../../types/Job';
import { securityService } from '../../../utils/securityService';
import { paymentService } from '../../../utils/paymentService';
import { ChevronLeft, Shield, Banknote } from 'lucide-react-native';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentBreakdown, setShowPaymentBreakdown] = useState(false);

  useEffect(() => {
    if (id) {
      const jobData = getJobById(id);
      setJob(jobData || null);
      setLoading(false);

      if (jobData && jobData.status === 'in-progress' && jobData.startTime) {
        securityService.startJobTimer(jobData);
      }
    }
  }, [id]);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/jobs');
    }
  };

  const handleAcceptBid = async (bidId: string) => {
    if (!job) return;
    
    const bid = job.bids.find(b => b.id === bidId);
    if (!bid) return;

    try {
      const payment = paymentService.calculatePayment(job, bid.price);
      const paymentSuccess = await paymentService.processPayment(payment);
      
      if (paymentSuccess) {
        const updatedJob = { 
          ...job, 
          status: 'in-progress' as const,
          acceptedBid: bidId,
          providerId: bid.providerId,
          startTime: Date.now(),
        };
        setJob(updatedJob);
        securityService.startJobTimer(updatedJob);
      } else {
        alert('Payment processing failed. Please try again.');
      }
    } catch (error) {
      alert('Error processing payment. Please try again.');
    }
  };

  const handleCompleteJob = () => {
    if (!job) return;
    
    const updatedJob = { 
      ...job, 
      status: 'completed' as const,
      endTime: Date.now(),
    };
    setJob(updatedJob);
    securityService.completeJob(job.id);
  };

  const handleContact = (providerId: string) => {
    router.push(`/(tabs)/messages/${providerId}`);
  };

  const handleTimerWarning = () => {
    alert('Job is approaching the expected completion time. Please check in with the service provider.');
  };

  const handleTimerOverdue = () => {
    alert('Job has exceeded maximum duration. Security services have been automatically notified for your safety.');
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
          onPress={handleGoBack} 
          style={styles.goBackButton}
        />
      </SafeAreaView>
    );
  }

  const acceptedBid = job.bids.find(bid => bid.id === job.acceptedBid);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <Button
          title="Back"
          variant="ghost"
          onPress={handleGoBack}
          leftIcon={<ChevronLeft size={20} color={Colors.primary[500]} />}
        />
      </View>
      
      <ScrollView>
        <JobDetailHeader job={job} />
        
        {job.status === 'in-progress' && job.startTime && (
          <View style={styles.content}>
            <JobTimer
              startTime={job.startTime}
              expectedDuration={job.expectedDuration}
              onWarning={handleTimerWarning}
              onOverdue={handleTimerOverdue}
            />
          </View>
        )}

        {acceptedBid && (
          <View style={styles.content}>
            <PaymentBreakdown
              category={job.category}
              amount={acceptedBid.price}
              showDetails={showPaymentBreakdown}
            />
            <Button
              title={showPaymentBreakdown ? "Hide Details" : "Show Payment Details"}
              variant="ghost"
              size="small"
              onPress={() => setShowPaymentBreakdown(!showPaymentBreakdown)}
              leftIcon={<Banknote size={16} color={Colors.primary[500]} />}
            />
          </View>
        )}
        
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

          {(job.status === 'in-progress' || job.status === 'accepted') && (
            <View style={styles.section}>
              <View style={styles.emergencySection}>
                <Shield size={24} color={Colors.error[500]} />
                <Text variant="h4" weight="semibold" style={styles.emergencyTitle}>
                  Safety & Security
                </Text>
              </View>
              <Text variant="body2" color="secondary" style={styles.emergencyDescription}>
                Your safety is our priority. Use the emergency button if you feel unsafe or need immediate assistance.
              </Text>
              <EmergencyButton
                userId="user1"
                currentLocation={{
                  latitude: job.location.latitude,
                  longitude: job.location.longitude,
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
      
      {job.status === 'pending' && job.bids.length === 0 && (
        <View style={styles.footer}>
          <Button
            title="Place a Bid"
            variant="primary"
            onPress={() => router.push(`/(tabs)/jobs/bid/${job.id}`)}
            fullWidth
          />
        </View>
      )}

      {job.status === 'in-progress' && job.acceptedBid && (
        <View style={styles.footer}>
          <Button
            title="Mark as Completed"
            variant="success"
            onPress={handleCompleteJob}
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
  emergencySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  emergencyTitle: {
    marginLeft: Layout.spacing.sm,
  },
  emergencyDescription: {
    marginBottom: Layout.spacing.md,
    lineHeight: 20,
  },
  footer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
});