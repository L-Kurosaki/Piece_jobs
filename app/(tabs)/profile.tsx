import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { voiceService } from '../../utils/voiceService';
import { 
  Settings, 
  Star, 
  Briefcase, 
  Clock, 
  LogOut,
  MapPin,
  Phone,
  Mail,
  Volume2,
  Brain
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
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

  const handleDailySummary = async () => {
    setIsPlayingVoice(true);
    try {
      const summary = {
        completedJobs: profile?.completed_jobs || 0,
        earnings: 1250.50,
        averageRating: 4.8,
        pendingBookings: 2,
      };
      await voiceService.generateDailySummary(summary);
    } catch (error) {
      console.error('Voice error:', error);
    } finally {
      setIsPlayingVoice(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/(auth)/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#0077B6" />
          </TouchableOpacity>
        </View>

        <View style={styles.userHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{profile.name}</Text>
            <Text style={styles.memberSince}>
              Member since {formatDate(profile.member_since)}
            </Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFB800" fill="#FFB800" />
              <Text style={styles.ratingText}>
                4.8 (12 reviews)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* AI Voice Section */}
        <View style={styles.aiSection}>
          <View style={styles.aiHeader}>
            <Brain size={24} color="#0077B6" />
            <Text style={styles.aiTitle}>🤖 AI Voice Assistant</Text>
          </View>
          <Text style={styles.aiDescription}>
            Get your personalized daily summary with AI-powered insights
          </Text>
          
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={handleDailySummary}
            disabled={isPlayingVoice}
          >
            <Volume2 size={20} color="#fff" />
            <Text style={styles.voiceButtonText}>
              {isPlayingVoice ? "Playing Summary..." : "Listen to Daily Summary"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Phone size={20} color="#0077B6" />
              <Text style={styles.infoText}>{profile.phone || 'Not provided'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <Mail size={20} color="#0077B6" />
              <Text style={styles.infoText}>{profile.email}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <MapPin size={20} color="#0077B6" />
              <Text style={styles.infoText}>
                {profile.location?.address || 'Location not set'}
              </Text>
            </View>
          </View>
        </View>

        {/* Job Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Briefcase size={24} color="#0077B6" />
              <Text style={styles.statNumber}>{profile.completed_jobs || 0}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            
            <View style={styles.statCard}>
              <Clock size={24} color="#FF9505" />
              <Text style={styles.statNumber}>{profile.active_jobs || 0}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            
            <View style={styles.statCard}>
              <Star size={24} color="#FFB800" />
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#E1372D" />
          <Text style={styles.logoutText}>Log Out</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0077B6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  content: {
    padding: 16,
  },
  aiSection: {
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
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
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077B6',
    padding: 12,
    borderRadius: 8,
  },
  voiceButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    width: '30%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#0077B6',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1372D',
    marginTop: 20,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#E1372D',
  },
});