import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/ui/Text';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, User, Phone, Volume2 } from 'lucide-react-native';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, {
      name,
      phone,
      role: 'both', // Default to both customer and provider
    });
    
    if (error) {
      Alert.alert('Registration Failed', error.message);
    } else {
      Alert.alert(
        'Success!',
        'Account created successfully. Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    }
    setLoading(false);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Volume2 size={48} color={Colors.primary[500]} />
          <Text variant="h1" weight="bold" style={styles.title}>
            PieceJob
          </Text>
          <Text variant="body1" color="secondary" style={styles.subtitle}>
            Join the Voice-Powered Job Marketplace
          </Text>
        </View>

        <View style={styles.form}>
          <Text variant="h3" weight="bold" style={styles.formTitle}>
            Create Account
          </Text>
          <Text variant="body1" color="secondary" style={styles.formSubtitle}>
            Start earning or find services today
          </Text>

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
            helper="Must be at least 6 characters"
          />

          <Input
            label="Confirm Password *"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            placeholder="Confirm your password"
            secureTextEntry
            leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
          />

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            fullWidth
            style={styles.registerButton}
          />

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.lg,
  },
  title: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  formTitle: {
    marginBottom: Layout.spacing.xs,
  },
  formSubtitle: {
    marginBottom: Layout.spacing.lg,
  },
  registerButton: {
    marginTop: Layout.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Layout.spacing.xl,
  },
});