import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/ui/Text';
import JobCard from '../../components/job/JobCard';
import CategorySelector from '../../components/ui/CategorySelector';
import { JobCategory } from '../../types/Job';
import { mockJobs } from '../../utils/mockData';
import { Search, Filter, Briefcase, MapPin, Sparkles, Compass } from 'lucide-react-native';

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

  const handleJobPress = (jobId: string) => {
    router.push(`/job-details/${jobId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h3" weight="bold" style={styles.title}>
          Find Jobs
        </Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.neutral[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.neutral[400]}
          />
          <Filter size={20} color={Colors.primary[500]} />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => handleJobPress(item.id)}
          />
        )}
        contentContainerStyle={styles.jobsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text variant="body1" color="secondary" centered>
              No jobs found. Try adjusting your filters.
            </Text>
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
  title: {
    marginBottom: Layout.spacing.md,
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
  jobsList: {
    padding: Layout.spacing.lg,
    paddingTop: Layout.spacing.md,
  },
  emptyState: {
    padding: Layout.spacing.xl * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});