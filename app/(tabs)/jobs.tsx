import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { voiceService } from '../../utils/voiceService';
import { Search, Filter, Briefcase, MapPin, Volume2, Plus } from 'lucide-react-native';

export default function JobsScreen() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJobVoiceDescription = async (job: any) => {
    setIsPlayingVoice(true);
    try {
      const jobText = `Job: ${job.title}. Category: ${job.category}. Duration: ${job.expected_duration} hours. Budget: R${job.budget?.min || 0} to R${job.budget?.max || 0}. ${job.description}`;
      await voiceService.generateSpeech(jobText);
    } catch (error) {
      console.error('Voice error:', error);
    } finally {
      setIsPlayingVoice(false);
    }
  };

  const renderJob = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.jobCard}
      onPress={() => router.push(`/(tabs)/jobs/${item.id}`)}
    >
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <TouchableOpacity 
          onPress={() => handleJobVoiceDescription(item)}
          disabled={isPlayingVoice}
        >
          <Volume2 size={20} color={isPlayingVoice ? "#ccc" : "#0077B6"} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.jobCategory}>{item.category}</Text>
      <Text style={styles.jobDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.jobDetails}>
        <View style={styles.jobDetailItem}>
          <MapPin size={16} color="#666" />
          <Text style={styles.jobDetailText}>
            {item.location?.address || 'Location not specified'}
          </Text>
        </View>
      </View>
      
      <View style={styles.jobFooter}>
        <Text style={styles.jobBudget}>
          R{item.budget?.min || 0} - R{item.budget?.max || 0}
        </Text>
        <Text style={styles.jobDuration}>
          {item.expected_duration}h
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Available Jobs</Text>
          <TouchableOpacity 
            style={styles.postButton}
            onPress={() => router.push('/(tabs)/jobs/post')}
          >
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#0077B6" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderJob}
        contentContainerStyle={styles.jobsList}
        refreshing={loading}
        onRefresh={loadJobs}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Briefcase size={48} color="#ccc" />
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptyDescription}>
              {searchQuery ? 'Try adjusting your search criteria' : 'Check back later for new opportunities'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const Text = ({ children, style, ...props }: any) => (
  <text style={[{ fontFamily: 'Poppins-Regular', color: '#333' }, style]} {...props}>
    {children}
  </text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  postButton: {
    backgroundColor: '#0077B6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  filterButton: {
    padding: 4,
  },
  jobsList: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    flex: 1,
  },
  jobCategory: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#0077B6',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  jobDetails: {
    marginBottom: 12,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  jobDetailText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobBudget: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#0077B6',
  },
  jobDuration: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    marginTop: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#999',
    textAlign: 'center',
  },
});