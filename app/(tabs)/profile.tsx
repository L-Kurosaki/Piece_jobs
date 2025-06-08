import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Star, Briefcase, Clock, Shield, LogOut, Edit, Phone, Mail, MapPin } from 'lucide-react-native';

export default function ProfileScreen() {
  const user = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+27 123 456 789',
    location: 'Cape Town, South Africa',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.8,
    totalReviews: 47,
    completedJobs: 52,
    activeJobs: 3,
    memberSince: 'March 2024',
    skills: ['Cleaning', 'Gardening', 'Maintenance'],
  };

  const stats = [
    { label: 'Completed', value: user.completedJobs, icon: Briefcase, color: '#0077B6' },
    { label: 'Active', value: user.activeJobs, icon: Clock, color: '#FF9505' },
    { label: 'Rating', value: user.rating, icon: Star, color: '#FFB800' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFB800" fill="#FFB800" />
              <Text style={styles.rating}>{user.rating}</Text>
              <Text style={styles.reviewCount}>({user.totalReviews} reviews)</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#0077B6" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <stat.icon size={24} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Phone size={20} color="#0077B6" />
              <Text style={styles.infoText}>{user.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Mail size={20} color="#0077B6" />
              <Text style={styles.infoText}>{user.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <MapPin size={20} color="#0077B6" />
              <Text style={styles.infoText}>{user.location}</Text>
            </View>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {user.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Verification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification</Text>
          <View style={styles.verificationCard}>
            <View style={styles.verificationItem}>
              <Shield size={20} color="#2E7D32" />
              <Text style={styles.verificationText}>Identity Verified</Text>
            </View>
            <View style={styles.verificationItem}>
              <Shield size={20} color="#2E7D32" />
              <Text style={styles.verificationText}>Background Check Complete</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#E53E3E" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginLeft: 4,
  },
  editButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    marginLeft: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#0077B6',
  },
  verificationCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  verificationText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#2E7D32',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E53E3E',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#E53E3E',
    marginLeft: 8,
  },
});