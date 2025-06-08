import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  Image
} from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/ui/Text';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, Eye } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any email/password
      Alert.alert(
        'Login Successful! 🎉',
        'Welcome to PieceJob! You can now access all features including AI-powered job matching and voice assistance.',
        [
          {
            text: 'Get Started',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
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
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.logo}
            />
            <Text variant="h2" weight="bold" style={styles.title}>
              Welcome to PieceJob
            </Text>
            <Text variant="body1" color="secondary" style={styles.subtitle}>
              AI-Powered Job Marketplace
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

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
            />

            <Button
              title={loading ? "Signing In..." : "Sign In"}
              variant="primary"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.loginButton}
            />

            <Button
              title="Forgot Password?"
              variant="ghost"
              onPress={() => router.push('/(auth)/forgot-password')}
              style={styles.forgotButton}
            />
          </View>

          <View style={styles.footer}>
            <Text variant="body2" color="secondary">
              Don't have an account?{' '}
            </Text>
            <Button
              title="Sign Up"
              variant="ghost"
              onPress={() => router.push('/(auth)/register')}
              style={styles.signUpButton}
            />
          </View>

          <View style={styles.demoInfo}>
            <Text variant="caption" color="secondary" style={styles.demoText}>
              Demo: Use any email and password to login
            </Text>
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
    alignItems: 'center',
    marginBottom: Layout.spacing.xl * 2,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Layout.spacing.lg,
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
  loginButton: {
    marginTop: Layout.spacing.lg,
  },
  forgotButton: {
    alignSelf: 'center',
    marginTop: Layout.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    paddingHorizontal: 0,
  },
  demoInfo: {
    marginTop: Layout.spacing.xl,
    padding: Layout.spacing.md,
    backgroundColor: Colors.primary[50],
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  demoText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});