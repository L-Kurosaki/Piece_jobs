import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/ui/Text';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, Volume2 } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      router.replace('/(tabs)');
    }
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const { error } = await signIn('demo@piecejob.com', 'demo123');
    
    if (error) {
      Alert.alert('Demo Login Failed', 'Creating demo account...');
      // In a real app, you might create a demo account here
    } else {
      router.replace('/(tabs)');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Volume2 size={48} color={Colors.primary[500]} />
        <Text variant="h1" weight="bold" style={styles.title}>
          PieceJob
        </Text>
        <Text variant="body1" color="secondary" style={styles.subtitle}>
          Voice-Powered Job Marketplace
        </Text>
      </View>

      <View style={styles.form}>
        <Text variant="h3" weight="bold" style={styles.formTitle}>
          Welcome Back
        </Text>
        <Text variant="body1" color="secondary" style={styles.formSubtitle}>
          Sign in to continue your journey
        </Text>

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
          secureTextEntry
          leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
        />

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={loading}
          fullWidth
          style={styles.loginButton}
        />

        <Button
          title="Try Demo Account"
          variant="outline"
          onPress={handleDemoLogin}
          loading={loading}
          fullWidth
          style={styles.demoButton}
        />

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    paddingTop: Layout.spacing.xl * 2,
    paddingBottom: Layout.spacing.xl,
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
    marginBottom: Layout.spacing.xl,
  },
  loginButton: {
    marginTop: Layout.spacing.md,
  },
  demoButton: {
    marginTop: Layout.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Layout.spacing.xl,
  },
});