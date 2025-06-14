import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/ui/Text';
import Button from '../../../components/ui/Button';
import Avatar from '../../../components/ui/Avatar';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Divider from '../../../components/ui/Divider';
import VerificationBadge from '../../../components/profile/VerificationBadge';
import DailySummaryVoice from '../../../components/voice/DailySummaryVoice';
import VoiceTutorial from '../../../components/voice/VoiceTutorial';
import AdaptiveVoiceCoach from '../../../components/voice/AdaptiveVoiceCoach';
import SmartNotifications from '../../../components/voice/SmartNotifications';
import { mockUsers } from '../../../utils/mockData';
import { 
  Settings, 
  Star, 
  Briefcase, 
  Clock, 
  Shield, 
  LogOut,
  MapPin,
  Phone,
  Mail,
  Wallet,
  ChevronRight,
  Volume2,
  Brain
} from 'lucide-react-native';

// We'll assume the current user is user1 for this demo
const CURRENT_USER_ID = 'user1';

export default function ProfileScreen() {
  const user = mockUsers.find(user => user.id === CURRENT_USER_ID);
  
  if (!user) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text variant="body1" color="error">User not found</Text>
      </SafeAreaView>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text variant="h3" weight="bold">Profile</Text>
          <Button
            variant="ghost"
            title="Edit"
            onPress={() => console.log('Edit profile')}
            rightIcon={<Settings size={18} color={Colors.primary[500]} />}
          />
        </View>

        <View style={styles.userHeader}>
          <Avatar
            source={user.avatar}
            size="xl"
            initials={user.name.split(' ').map(n => n[0]).join('')}
            verified={user.verificationStatus.identity === 'verified'}
          />
          <View style={styles.userInfo}>
            <Text variant="h3" weight="bold" style={styles.userName}>
              {user.name}
            </Text>
            <View style={styles.memberSince}>
              <Text variant="body2" color="secondary">
                Member since {formatDate(user.memberSince)}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Star size={16} color={Colors.warning[500]} fill={Colors.warning[500]} />
              <Text variant="body2" weight="medium" style={styles.ratingText}>
                {user.rating.averageRating.toFixed(1)} ({user.rating.totalReviews} reviews)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* AI Learning Section */}
        <View style={styles.aiSection}>
          <View style={styles.aiHeader}>
            <Brain size={24} color={Colors.primary[500]} />
            <Text variant="h4" weight="semibold" style={styles.aiTitle}>
              🤖 AI-Powered Features
            </Text>
          </View>
          <Text variant="body2" color="secondary" style={styles.aiDescription}>
            Your personal AI learns from your behavior and adapts to help you succeed
          </Text>
        </View>

        {/* Smart Notifications */}
        <SmartNotifications userId={CURRENT_USER_ID} />

        {/* Adaptive Voice Coach */}
        <AdaptiveVoiceCoach userId={CURRENT_USER_ID} />

        {/* Voice Features Section */}
        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            🎤 Voice Assistant
          </Text>
          <DailySummaryVoice userId={CURRENT_USER_ID} />
        </View>

        {/* Voice Tutorial Section */}
        <View style={styles.section}>
          <VoiceTutorial onComplete={() => console.log('Tutorial completed')} />
        </View>

        {/* Wallet Section */}
        <View style={styles.section}>
          <Card style={styles.walletCard} onPress={() => router.push('/profile/wallet')}>
            <View style={styles.walletHeader}>
              <View style={styles.walletIcon}>
                <Wallet size={24} color={Colors.primary[500]} />
              </View>
              <View style={styles.walletInfo}>
                <Text variant="h4" weight="semibold">Wallet</Text>
                <Text variant="body2" color="secondary">Manage your earnings</Text>
              </View>
              <View style={styles.walletBalance}>
                <Text variant="h4" weight="bold" color="primary">R0.00</Text>
                <ChevronRight size={20} color={Colors.neutral[400]} />
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Contact Information
          </Text>
          <Card style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Phone size={20} color={Colors.primary[500]} />
              <Text variant="body1" style={styles.infoText}>
                {user.phone}
              </Text>
            </View>
            <Divider style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Mail size={20} color={Colors.primary[500]} />
              <Text variant="body1" style={styles.infoText}>
                {user.email}
              </Text>
            </View>
            <Divider style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <MapPin size={20} color={Colors.primary[500]} />
              <Text variant="body1" style={styles.infoText}>
                {user.location.address}
              </Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Verification
          </Text>
          <Card style={styles.verificationCard}>
            <View style={styles.verificationBadges}>
              <VerificationBadge
                type="identity"
                status={user.verificationStatus.identity}
              />
              <VerificationBadge
                type="address"
                status={user.verificationStatus.address}
              />
              <VerificationBadge
                type="background"
                status={user.verificationStatus.background}
              />
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Job Statistics
          </Text>
          <View style={styles.statsContainer}>
            <Card style={styles.statCard}>
              <Briefcase size={24} color={Colors.primary[500]} />
              <Text variant="h3" weight="bold" color="primary" style={styles.statNumber}>
                {user.completedJobs}
              </Text>
              <Text variant="body2" color="secondary">Completed</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <Clock size={24} color={Colors.accent[500]} />
              <Text variant="h3" weight="bold" color="accent" style={styles.statNumber}>
                {user.activeJobs}
              </Text>
              <Text variant="body2" color="secondary">Active</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <Shield size={24} color={Colors.success[500]} />
              <Text variant="h3" weight="bold" color="success" style={styles.statNumber}>
                100%
              </Text>
              <Text variant="body2" color="secondary">Safety</Text>
            </Card>
          </View>
        </View>

        <Button
          title="Log Out"
          variant="outline"
          onPress={() => console.log('Log out')}
          leftIcon={<LogOut size={20} color={Colors.error[500]} />}
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Colors.white,
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: Layout.spacing.lg,
    flex: 1,
  },
  userName: {
    marginBottom: 2,
  },
  memberSince: {
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
  },
  content: {
    padding: Layout.spacing.lg,
  },
  aiSection: {
    backgroundColor: Colors.primary[50],
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  aiTitle: {
    marginLeft: Layout.spacing.sm,
  },
  aiDescription: {
    lineHeight: 20,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
  },
  walletCard: {
    padding: Layout.spacing.md,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  walletInfo: {
    flex: 1,
  },
  walletBalance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCard: {
    padding: Layout.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
  },
  infoText: {
    marginLeft: Layout.spacing.md,
  },
  infoDivider: {
    marginVertical: Layout.spacing.xs,
  },
  verificationCard: {
    padding: Layout.spacing.md,
  },
  verificationBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '30%',
    padding: Layout.spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    marginVertical: Layout.spacing.xs,
  },
  logoutButton: {
    marginTop: Layout.spacing.xl,
  },
});