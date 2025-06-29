import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { 
  Settings, 
  Star, 
  MapPin, 
  Calendar,
  Heart,
  Clock,
  Award,
  ChevronRight,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react-native';

export default function ProfileScreen() {
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    location: 'San Francisco, CA',
    memberSince: 'March 2023',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    stats: {
      experiences: 24,
      favorites: 12,
      reviews: 18,
      rating: 4.8
    }
  };

  const menuItems = [
    { icon: <Bell size={24} color="#6b7280" />, title: 'Notifications', subtitle: 'Manage your alerts' },
    { icon: <CreditCard size={24} color="#6b7280" />, title: 'Payment Methods', subtitle: 'Cards and billing' },
    { icon: <Calendar size={24} color="#6b7280" />, title: 'Booking History', subtitle: 'View past bookings' },
    { icon: <HelpCircle size={24} color="#6b7280" />, title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: <Settings size={24} color="#6b7280" />, title: 'Settings', subtitle: 'App preferences' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <View style={styles.locationRow}>
                <MapPin size={16} color="#6b7280" />
                <Text style={styles.location}>{user.location}</Text>
              </View>
              <View style={styles.memberRow}>
                <Calendar size={16} color="#6b7280" />
                <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Settings size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Clock size={24} color="#6366f1" />
            <Text style={styles.statNumber}>{user.stats.experiences}</Text>
            <Text style={styles.statLabel}>Experiences</Text>
          </View>
          <View style={styles.statCard}>
            <Heart size={24} color="#ef4444" />
            <Text style={styles.statNumber}>{user.stats.favorites}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statCard}>
            <Star size={24} color="#fbbf24" />
            <Text style={styles.statNumber}>{user.stats.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={24} color="#10b981" />
            <Text style={styles.statNumber}>{user.stats.reviews}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Achievement Badge */}
        <View style={styles.achievementCard}>
          <View style={styles.achievementIcon}>
            <Award size={32} color="#fbbf24" />
          </View>
          <View style={styles.achievementContent}>
            <Text style={styles.achievementTitle}>Explorer Badge</Text>
            <Text style={styles.achievementSubtitle}>
              You've completed 20+ experiences! Keep exploring to unlock more badges.
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIcon}>
                {item.icon}
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={20} color="#d1d5db" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberSince: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  editButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f3f4f6',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  achievementCard: {
    backgroundColor: '#fffbeb',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  achievementIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#fef3c7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400e',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  achievementSubtitle: {
    fontSize: 14,
    color: '#a16207',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  menuSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#f3f4f6',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 40,
  },
});