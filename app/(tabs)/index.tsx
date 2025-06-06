import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';
import JobCard from '../../components/job/JobCard';
import CategorySelector from '../../components/ui/CategorySelector';
import { Briefcase, Search, Compass, Sparkles, CircleCheck as CheckCircle2 } from 'lucide-react-native';
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

  // Filter jobs based on selected category
  const filteredJobs = selectedCategory
    ? mockJobs.filter(job => job.category === selectedCategory)
    : mockJobs;

  const handleJobPress = (jobId: string) => {
    router.push(`/job-details/${jobId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="bold" style={styles.title}>PieceJob</Text>
        <Text variant="body1" color="secondary" style={styles.subtitle}>
          Find your next opportunity
        </Text>
      </View>

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
              onPress={() => handleJobPress(job.id)}
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