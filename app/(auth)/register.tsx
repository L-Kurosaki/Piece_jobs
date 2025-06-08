import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Volume2, Mail, Lock, User, Phone, MapPin } from 'lucide-react-native';
import Text from '../../components/ui/Text';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { useAuth } from '../../hooks/useAuth';
import { createProfile } from '../../utils/supabaseClient';

export default function RegisterScreen() {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as 'customer' | 'provider' | 'both',
  });

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const result = await register(formData.email, formData.password, {
      name: formData.name,
      phone: formData.phone,
    });
    
    if (result.success && result.user) {
      // Create profile
      try {
        await createProfile({
          user_id: result.user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          location: {
            address: 'Cape Town, South Africa',
            latitude: -33.9249,
            longitude: 18.4241,
          },
          rating: {
            averageRating: 0,
            totalReviews: 0,
          },
          skills: [],
          verification_status: {
            identity: 'pending',
            address: 'pending',
            background: 'pending',
          },
        });
        
        router.replace('/(tabs)');
      } catch (error) {
        Alert.alert('Error', 'Failed to create profile. Please try again.');
      }
    } else {
      Alert.alert('Registration Failed', result.error || 'Please try again');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Volume2 size={48} color={Colors.primary[500]} />
          <Text variant="h1" weight="bold" style={styles.title}>
            Join PieceJob
          </Text>
          <Text variant="body1" color="secondary" style={styles.subtitle}>
            Start earning or find services today
          </Text>
        </View>

        <Card style={styles.registerCard}>
          <Text variant="h3" weight="bold" style={styles.cardTitle}>
            Create Account
          </Text>
          <Text variant="body2" color="secondary" style={styles.cardSubtitle}>
            Fill in your details to get started
          </Text>

          <View style={styles.form}>
            <Input
              label="Full Name *"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              placeholder="Enter your full name"
              leftIcon={<User size={20} color={Colors.neutral[500]} />}
            />

            <Input
              label="Email *"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={Colors.neutral[500]} />}
            />

            <Input
              label="Phone Number"
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              leftIcon={<Phone size={20} color={Colors.neutral[500]} />}
            />

            <Input
              label="Password *"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              placeholder="Create a password"
              secureTextEntry
              leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
              helper="Minimum 6 characters"
            />

            <Input
              label="Confirm Password *"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              placeholder="Confirm your password"
              secureTextEntry
              leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
            />

            <View style={styles.roleSelection}>
              <Text variant="body1" weight="semibold" style={styles.roleTitle}>
                I want to:
              </Text>
              <View style={styles.roleButtons}>
                <Button
                  title="Find Services"
                  variant={formData.role === 'customer' ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => updateFormData('role', 'customer')}
                  style={styles.roleButton}
                />
                <Button
                  title="Provide Services"
                  variant={formData.role === 'provider' ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => updateFormData('role', 'provider')}
                  style={styles.roleButton}
                />
                <Button
                  title="Both"
                  variant={formData.role === 'both' ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => updateFormData('role', 'both')}
                  style={styles.roleButton}
                />
              </View>
            </View>

            <Button
              title="Create Account"
              variant="primary"
              onPress={handleRegister}
              loading={loading}
              fullWidth
              style={styles.registerButton}
            />
          </View>

          <View style={styles.footer}>
            <Text variant="body2" color="secondary">
              Already have an account?{' '}
            </Text>
            <Button
              title="Sign In"
              variant="ghost"
              size="small"
              onPress={() => router.push('/(auth)/login')}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[50],
  },
  content: {
    padding: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
    marginTop: Layout.spacing.lg,
  },
  title: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
  },
  registerCard: {
    padding: Layout.spacing.xl,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: Layout.spacing.xs,
  },
  cardSubtitle: {
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
  },
  form: {
    marginBottom: Layout.spacing.lg,
  },
  roleSelection: {
    marginBottom: Layout.spacing.lg,
  },
  roleTitle: {
    marginBottom: Layout.spacing.sm,
  },
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  roleButton: {
    marginRight: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  registerButton: {
    marginTop: Layout.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});