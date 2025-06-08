import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { Briefcase, MessageSquare, Star, MapPin, Clock, DollarSign } from 'lucide-react-native';

export default function HomeScreen() {
  const featuredJobs = [
    {
      id: '1',
      title: 'House Cleaning - 3 Bedroom',
      category: 'Cleaning',
      location: 'Cape Town',
      budget: 'R300-500',
      duration: '4h',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/4107268/pexels-photo-4107268.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      title: 'Garden Maintenance',
      category: 'Gardening',
      location: 'Johannesburg',
      budget: 'R200-350',
      duration: '3h',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1159693/pexels-photo-1159693.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PieceJob</Text>
        <Text style={styles.subtitle}>AI-Powered Job Marketplace</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            Welcome to PieceJob! 👋
          </Text>
          <Text style={styles.welcomeSubtext}>
            Ready to find your next opportunity?
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/jobs')}
            >
              <Briefcase size={32} color="#0077B6" />
              <Text style={styles.actionTitle}>Browse Jobs</Text>
              <Text style={styles.actionDescription}>
                Find work opportunities
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/messages')}
            >
              <MessageSquare size={32} color="#0077B6" />
              <Text style={styles.actionTitle}>Messages</Text>
              <Text style={styles.actionDescription}>
                Connect with clients
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Jobs</Text>
          
          {featuredJobs.map((job) => (
            <TouchableOpacity 
              key={job.id}
              style={styles.jobCard}
              onPress={() => router.push('/(tabs)/jobs')}
            >
              <Image source={{ uri: job.image }} style={styles.jobImage} />
              <View style={styles.jobContent}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={16} color="#FFB800" fill="#FFB800" />
                    <Text style={styles.rating}>{job.rating}</Text>
                  </View>
                </View>
                
                <Text style={styles.jobCategory}>{job.category}</Text>
                
                <View style={styles.jobDetails}>
                  <View style={styles.jobDetail}>
                    <MapPin size={14} color="#666" />
                    <Text style={styles.jobDetailText}>{job.location}</Text>
                  </View>
                  <View style={styles.jobDetail}>
                    <Clock size={14} color="#666" />
                    <Text style={styles.jobDetailText}>{job.duration}</Text>
                  </View>
                  <View style={styles.jobDetail}>
                    <DollarSign size={14} color="#666" />
                    <Text style={styles.jobDetailText}>{job.budget}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  welcomeCard: {
    backgroundColor: '#f0f8ff',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0f2ff',
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0077B6',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  jobImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  jobContent: {
    padding: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginLeft: 4,
  },
  jobCategory: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#0077B6',
    marginBottom: 12,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetailText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginLeft: 4,
  },
});