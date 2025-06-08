import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
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
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/jobs')}
          >
            <Text style={styles.actionTitle}>Browse Jobs</Text>
            <Text style={styles.actionDescription}>
              Find work opportunities in your area
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/messages')}
          >
            <Text style={styles.actionTitle}>Messages</Text>
            <Text style={styles.actionDescription}>
              Connect with customers and providers
            </Text>
          </TouchableOpacity>
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
    padding: 16,
    margin: 16,
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  actionCard: {
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
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
});