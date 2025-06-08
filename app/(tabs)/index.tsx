import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { voiceService } from '../../utils/voiceService';
import { Volume2, Brain, Briefcase, Plus } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadJobs();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'pending')
        .limit(5);

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const handleVoiceWelcome = async () => {
    setIsPlayingVoice(true);
    try {
      const welcomeText = `Welcome to PieceJob, ${profile?.name || 'there'}! You have ${jobs.length} new job opportunities available. Let me know if you'd like to hear more details about any specific job.`;
      await voiceService.generateSpeech(welcomeText);
    } catch (error) {
      console.error('Voice error:', error);
    } finally {
      setIsPlayingVoice(false);
    }
  };

  const handleJobVoiceDescription = async (job: any) => {
    setIsPlayingVoice(true);
    try {
      const jobText = `Job opportunity: ${job.title}. Category: ${job.category}. Expected duration: ${job.expected_duration} hours. Budget range: R${job.budget?.min || 0} to R${job.budget?.max || 0}. Description: ${job.description}`;
      await voiceService.generateSpeech(jobText);
    } catch (error) {
      console.error('Voice error:', error);
    } finally {
      setIsPlayingVoice(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>PieceJob</Text>
            <Text style={styles.subtitle}>AI-Powered Job Marketplace</Text>
          </View>
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={handleVoiceWelcome}
            disabled={isPlayingVoice}
          >
            <Volume2 size={24} color={isPlayingVoice ? "#ccc" : "#0077B6"} />
          </TouchableOpacity>
        </View>
        
        {profile && (
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeText}>
              Welcome back, {profile.name}! 👋
            </Text>
            <Text style={styles.welcomeSubtext}>
              Ready to find your next opportunity?
            </Text>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.aiSection}>
          <View style={styles.aiHeader}>
            <Brain size={24} color="#0077B6" />
            <Text style={styles.aiTitle}>🤖 AI-Powered Features</Text>
          </View>
          <Text style={styles.aiDescription}>
            Your personal AI learns from your behavior and adapts to help you succeed
          </Text>
          
          <TouchableOpacity 
            style={styles.aiButton}
            onPress={handleVoiceWelcome}
            disabled={isPlayingVoice}
          >
            <Volume2 size={20} color="#fff" />
            <Text style={styles.aiButtonText}>
              {isPlayingVoice ? "Speaking..." : "Voice Assistant"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.jobsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Jobs</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/jobs')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {jobs.length > 0 ? (
            jobs.map((job) => (
              <TouchableOpacity 
                key={job.id} 
                style={styles.jobCard}
                onPress={() => router.push(`/(tabs)/jobs/${job.id}`)}
              >
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <TouchableOpacity 
                    onPress={() => handleJobVoiceDescription(job)}
                    disabled={isPlayingVoice}
                  >
                    <Volume2 size={20} color={isPlayingVoice ? "#ccc" : "#0077B6"} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.jobCategory}>{job.category}</Text>
                <Text style={styles.jobDescription} numberOfLines={2}>
                  {job.description}
                </Text>
                <View style={styles.jobFooter}>
                  <Text style={styles.jobBudget}>
                    R{job.budget?.min || 0} - R{job.budget?.max || 0}
                  </Text>
                  <Text style={styles.jobDuration}>
                    {job.expected_duration}h
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Briefcase size={48} color="#ccc" />
              <Text style={styles.emptyTitle}>No jobs available</Text>
              <Text style={styles.emptyDescription}>
                Check back later for new opportunities
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.postJobButton}
          onPress={() => router.push('/(tabs)/jobs/post')}
        >
          <Plus size={24} color="#fff" />
          <Text style={styles.postJobText}>Post a Job</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 24,
    backgroundColor: '#fff',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#0077B6',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  voiceButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
  },
  welcomeCard: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0f2ff',
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#0077B6',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  aiSection: {
    backgroundColor: '#f0f8ff',
    padding: 24,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0f2ff',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
  },
  aiTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0077B6',
  },
  aiDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077B6',
    padding: 12,
    borderRadius: 8,
  },
  aiButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  jobsSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#0077B6',
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
  postJobButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077B6',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  postJobText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});