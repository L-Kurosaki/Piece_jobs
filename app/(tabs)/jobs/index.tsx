import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/ui/Text';
import Button from '../../../components/ui/Button';
import JobCard from '../../../components/job/JobCard';
import CategorySelector from '../../../components/ui/CategorySelector';
import { JobCategory } from '../../../types/Job';
import { mockJobs } from '../../../utils/mockData';
import { Search, Filter, Briefcase, MapPin, Sparkles, Compass, Plus } from 'lucide-react-native';

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
    icon: <MapPin size={32} color={Colors.primary[400]} /> 
  },
];

export default function JobsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on search query and selected category
  const filteredJobs = mockJobs.filter(job => {
    // Filter by category
    const categoryMatch = selectedCategory ? job.category === selectedCategory : true;
    
    // Filter by search query
    const searchMatch = searchQuery.trim() === '' ? true : 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleJobPress = (job: any) => {
    // Check if user is a provider and job is pending - allow bidding
    if (job.status === 'pending') {
      router.push(`/jobs/bid/${job.id}`);
    } else {
      router.push(`/jobs/${job.id}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text variant="h3" weight="bold" style={styles.title}>
            Available Jobs
          </Text>
          <Button
            title="Post Job"
            variant="primary"
            size="small"
            onPress={() => router.push('/post')}
            leftIcon={<Plus size={16} color={Colors.white} />}
          />
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.neutral[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.neutral[400]}
          />
          <Button
            title=""
            variant="ghost"
            size="small"
            onPress={() => setShowFilters(!showFilters)}
            leftIcon={<Filter size={20} color={Colors.primary[500]} />}
          />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      <View style={styles.statsContainer}>
        <Text variant="body2" color="secondary">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} available
        </Text>
        {selectedCategory && (
          <Button
            title="Clear Filter"
            variant="ghost"
            size="small"
            onPress={() => setSelectedCategory(null)}
          />
        )}
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => handleJobPress(item)}
            showBidButton={item.status === 'pending'}
          />
        )}
        contentContainerStyle={styles.jobsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Briefcase size={48} color={Colors.neutral[400]} />
            <Text variant="h4" weight="semibold" style={styles.emptyTitle}>
              No jobs found
            </Text>
            <Text variant="body1" color="secondary" centered style={styles.emptyDescription}>
              {selectedCategory 
                ? `No ${selectedCategory} jobs available right now. Try checking other categories.`
                : 'No jobs match your search criteria. Try adjusting your filters or check back later.'
              }
            </Text>
            {selectedCategory && (
              <Button
                title="View All Jobs"
                variant="outline"
                onPress={() => setSelectedCategory(null)}
                style={styles.emptyButton}
              />
            )}
          </View>
        }
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
    marginBottom: Layout.spacing.md,
  },
  title: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: Layout.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: Colors.neutral[900],
    fontFamily: 'Poppins-Regular',
  },
  categoriesContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  jobsList: {
    padding: Layout.spacing.lg,
    paddingTop: Layout.spacing.md,
  },
  emptyState: {
    padding: Layout.spacing.xl * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.sm,
  },
  emptyDescription: {
    marginBottom: Layout.spacing.lg,
    lineHeight: 22,
  },
  emptyButton: {
    marginTop: Layout.spacing.sm,
  },
});