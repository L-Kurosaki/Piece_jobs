import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/ui/Text';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, ChevronLeft } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate password reset API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Reset Link Sent! 📧',
        'We\'ve sent a password reset link to your email address. Please check your inbox and follow the instructions.',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset link. Please try again.');
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
        <View style={styles.content}>
          <View style={styles.header}>
            <Button
              title="Back"
              variant="ghost"
              onPress={() => router.back()}
              leftIcon={<ChevronLeft size={20} color={Colors.primary[500]} />}
              style={styles.backButton}
            />
            
            <Text variant="h2" weight="bold" style={styles.title}>
              Reset Password
            </Text>
            <Text variant="body1" color="secondary" style={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={Colors.neutral[500]} />}
            />

            <Button
              title={loading ? "Sending..." : "Send Reset Link"}
              variant="primary"
              onPress={handleResetPassword}
              loading={loading}
              fullWidth
              style={styles.resetButton}
            />
          </View>
        </View>
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
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Layout.spacing.xl * 2,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Layout.spacing.lg,
  },
  title: {
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: Layout.spacing.xl,
  },
  resetButton: {
    marginTop: Layout.spacing.lg,
  },
});