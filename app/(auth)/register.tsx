import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/ui/Text';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react-native';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.location.trim()) return 'Location is required';
    return null;
  };

  const handleRegister = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }

    setLoading(true);
    
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      Alert.alert(
        'Registration Successful! 🎉',
        'Welcome to PieceJob! Your account has been created. You can now start finding jobs or offering your services.',
        [
          {
            text: 'Get Started',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text variant="h2" weight="bold" style={styles.title}>
              Join PieceJob
            </Text>
            <Text variant="body1" color="secondary" style={styles.subtitle}>
              Create your account to get started
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="Enter your full name"
              leftIcon={<User size={20} color={Colors.neutral[500]} />}
            />

            <Input
              label="Email Address"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={Colors.neutral[500]} />}
            />

            <Input
              label="Phone Number"
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              leftIcon={<Phone size={20} color={Colors.neutral[500]} />}
            />

            <Input
              label="Location"
              value={formData.location}
              onChangeText={(value) => updateField('location', value)}
              placeholder="Enter your city/area"
              leftIcon={<MapPin size={20} color={Colors.neutral[500]} />}
            />

            <Input
              label="Password"
              value={formData.password}
              onChangeText={(value) => updateField('password', value)}
              placeholder="Create a password"
              secureTextEntry
              leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
            />

            <Input
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateField('confirmPassword', value)}
              placeholder="Confirm your password"
              secureTextEntry
              leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
            />

            <Button
              title={loading ? "Creating Account..." : "Create Account"}
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
              onPress={() => router.push('/(auth)/login')}
              style={styles.signInButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  title: {
    marginBottom: Layout.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    marginBottom: Layout.spacing.xl,
  },
  registerButton: {
    marginTop: Layout.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    paddingHorizontal: 0,
  },
});