import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';
import JobCard from '../../components/job/JobCard';
import CategorySelector from '../../components/ui/CategorySelector';
import DailyVoiceBriefing from '../../components/voice/DailyVoiceBriefing';
import VoiceNotificationReader from '../../components/voice/VoiceNotificationReader';
import { Briefcase, Search, Compass, Sparkles, CircleCheck as CheckCircle2, Bell } from 'lucide-react-native';
import { mockJobs } from '../../utils/mockData';
import { JobCategory } from '../../types/Job';

// Configure categories with icons
const categories = [
  { 
    id: 'cleaning' as JobCategory, 
    label: 'Cleaning', 
    icon: <Sparkles size={32} color={Colors.primary[400]} /> 
  },
  { 
    id: 'gardening' as JobCategory, 
    label: 'Gardening', 
    icon: <Compass size={32} color={Colors.primary[400]} /> 
  },
  { 
    id: 'maintenance' as JobCategory, 
    label: 'Maintenance', 
    icon: <Briefcase size={32} color={Colors.primary[400]} /> 
  },
  { 
    id: 'delivery' as JobCategory, 
    label: 'Delivery', 
    icon: <Search size={32} color={Colors.primary[400]} /> 
  },
  { 
    id: 'moving' as JobCategory, 
    label: 'Moving', 
    icon: <CheckCircle2 size={32} color={Colors.primary[400]} /> 
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null);
  const [showBriefing, setShowBriefing] = useState(false);
  const [notification, setNotification] = useState<any>(null);

  // Check if it's morning and show briefing
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour <= 10) {
      // Show briefing in the morning
      setTimeout(() => setShowBriefing(true), 2000);
    }

    // Simulate incoming notification after 5 seconds
    setTimeout(() => {
      setNotification({
        id: 'notif1',
        title: 'New Message',
        message: 'Hi! I\'m interested in your cleaning job. When would be a good time to start?',
        senderName: 'Sarah Provider',
        timestamp: Date.now(),
      });
    }, 5000);
  }, []);

  // Filter jobs based on selected category
  const filteredJobs = selectedCategory
    ? mockJobs.filter(job => job.category === selectedCategory)
    : mockJobs;

  const handleNotificationReply = (message: string) => {
    console.log('Replying with:', message);
    // In a real app, this would send the message
  };

  const handleDismissNotification = () => {
    setNotification(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text variant="h2" weight="bold" style={styles.title}>PieceJob</Text>
          <Button
            title=""
            variant="ghost"
            size="small"
            onPress={() => setShowBriefing(true)}
            leftIcon={<Bell size={20} color={Colors.primary[500]} />}
          />
        </View>
        <Text variant="body1" color="secondary" style={styles.subtitle}>
          Find your next opportunity with voice assistance
        </Text>
      </View>

      {showBriefing && (
        <DailyVoiceBriefing
          userId="provider1"
          onComplete={() => setShowBriefing(false)}
        />
      )}

      <View style={styles.categoriesSection}>
        <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
          Categories
        </Text>
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      <View style={styles.jobsSection}>
        <View style={styles.sectionHeader}>
          <Text variant="h4" weight="semibold">
            {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Jobs` : 'Available Jobs'}
          </Text>
          <Button
            title="View All"
            variant="ghost"
            size="small"
            onPress={() => router.push('/jobs')}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onPress={() => router.push(`/jobs/${job.id}`)}
            />
          ))}

          {filteredJobs.length === 0 && (
            <View style={styles.emptyState}>
              <Text variant="body1" color="secondary" centered>
                No jobs available in this category.
              </Text>
              <Button
                title="Reset Filter"
                variant="outline"
                size="small"
                style={styles.resetButton}
                onPress={() => setSelectedCategory(null)}
              />
            </View>
          )}
        </ScrollView>
      </View>

      <VoiceNotificationReader
        notification={notification}
        onDismiss={handleDismissNotification}
        onReply={handleNotificationReply}
        autoRead={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    marginBottom: Layout.spacing.md,
  },
  categoriesSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.sm,
  },
  jobsSection: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  emptyState: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    marginTop: Layout.spacing.md,
  },
});