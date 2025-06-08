import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Volume2, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import Text from '../../components/ui/Text';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Failed', result.error || 'Please try again');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Volume2 size={48} color={Colors.primary[500]} />
          <Text variant="h1" weight="bold" style={styles.title}>
            PieceJob
          </Text>
          <Text variant="body1" color="secondary" style={styles.subtitle}>
            Voice-powered job marketplace
          </Text>
        </View>

        <Card style={styles.loginCard}>
          <Text variant="h3" weight="bold" style={styles.cardTitle}>
            Welcome Back
          </Text>
          <Text variant="body2" color="secondary" style={styles.cardSubtitle}>
            Sign in to continue your journey
          </Text>

          <View style={styles.form}>
            <Input
              label="Email"
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
              secureTextEntry={!showPassword}
              leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
              rightIcon={
                <Button
                  title=""
                  variant="ghost"
                  size="small"
                  onPress={() => setShowPassword(!showPassword)}
                  leftIcon={
                    showPassword ? 
                      <EyeOff size={20} color={Colors.neutral[500]} /> : 
                      <Eye size={20} color={Colors.neutral[500]} />
                  }
                />
              }
            />

            <Button
              title="Sign In"
              variant="primary"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.loginButton}
            />
          </View>

          <View style={styles.footer}>
            <Text variant="body2" color="secondary">
              Don't have an account?{' '}
            </Text>
            <Button
              title="Sign Up"
              variant="ghost"
              size="small"
              onPress={() => router.push('/(auth)/register')}
            />
          </View>
        </Card>

        <View style={styles.features}>
          <Text variant="body2" color="secondary" style={styles.featuresTitle}>
            🎤 Voice-powered features
          </Text>
          <Text variant="caption" color="secondary">
            • Hands-free messaging • Voice tutorials • AI assistance
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[50],
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  title: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
  },
  loginCard: {
    padding: Layout.spacing.xl,
    marginBottom: Layout.spacing.lg,
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
  loginButton: {
    marginTop: Layout.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  features: {
    alignItems: 'center',
  },
  featuresTitle: {
    marginBottom: Layout.spacing.xs,
    fontWeight: '600',
  },
});