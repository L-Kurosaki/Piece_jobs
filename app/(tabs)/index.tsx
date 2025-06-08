import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';
import JobCard from '../../components/job/JobCard';
import CategorySelector from '../../components/ui/CategorySelector';
import VoiceTutorial from '../../components/voice/VoiceTutorial';
import AIJobMatcher from '../../components/ai/AIJobMatcher';
import MarketIntelligence from '../../components/ai/MarketIntelligence';
import { Briefcase, Search, Compass, Sparkles, CircleCheck as CheckCircle2, Volume2, Brain, TrendingUp } from 'lucide-react-native';
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
  const [showVoiceTutorial, setShowVoiceTutorial] = useState(true);
  const [showAIFeatures, setShowAIFeatures] = useState(true);

  // Filter jobs based on selected category
  const filteredJobs = selectedCategory
    ? mockJobs.filter(job => job.category === selectedCategory)
    : mockJobs;

  const handleAIJobSelect = (job: any) => {
    router.push(`/jobs/bid/${job.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View>
            <Text variant="h2" weight="bold" style={styles.title}>PieceJob</Text>
            <Text variant="body1" color="secondary" style={styles.subtitle}>
              AI-Powered Job Marketplace
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <Button
              title=""
              variant="ghost"
              size="small"
              onPress={() => setShowAIFeatures(!showAIFeatures)}
              leftIcon={<Brain size={24} color={showAIFeatures ? Colors.primary[500] : Colors.neutral[400]} />}
            />
            <Volume2 size={28} color={Colors.primary[500]} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Voice Tutorial Section */}
        {showVoiceTutorial && (
          <View style={styles.tutorialSection}>
            <VoiceTutorial onComplete={() => setShowVoiceTutorial(false)} />
          </View>
        )}

        {/* AI Features Section */}
        {showAIFeatures && (
          <View style={styles.aiSection}>
            <View style={styles.aiHeader}>
              <Brain size={24} color={Colors.primary[500]} />
              <Text variant="h4" weight="semibold" style={styles.aiTitle}>
                🤖 AI-Powered Features
              </Text>
            </View>
            
            {/* AI Job Matcher */}
            <AIJobMatcher 
              userId="user1" 
              onJobSelect={handleAIJobSelect}
            />
            
            {/* Market Intelligence */}
            <MarketIntelligence userId="user1" />
          </View>
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
              leftIcon={<TrendingUp size={16} color={Colors.primary[500]} />}
            />
          </View>

          {filteredJobs.slice(0, 3).map(job => (
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

          {filteredJobs.length > 3 && (
            <View style={styles.viewAllContainer}>
              <Button
                title={`View All ${filteredJobs.length} Jobs`}
                variant="primary"
                onPress={() => router.push('/jobs')}
                fullWidth
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
  header: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    marginBottom: Layout.spacing.md,
  },
  tutorialSection: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.md,
  },
  aiSection: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.primary[25],
    marginVertical: Layout.spacing.md,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    justifyContent: 'center',
  },
  aiTitle: {
    marginLeft: Layout.spacing.sm,
    color: Colors.primary[600],
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
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
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
  viewAllContainer: {
    marginTop: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
});