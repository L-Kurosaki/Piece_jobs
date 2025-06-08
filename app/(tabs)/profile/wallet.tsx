import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/ui/Text';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import { 
  Wallet as WalletIcon, 
  TrendingUp, 
  TrendingDown, 
  ChevronLeft,
  CreditCard,
  Banknote
} from 'lucide-react-native';

interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  status: string;
  createdAt: number;
  updatedAt: number;
}

interface Transaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  balanceAfter: number;
  timestamp: number;
}

export default function WalletScreen() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      // Mock wallet data
      const walletData: Wallet = {
        id: 'wallet-user1',
        userId: 'user1',
        balance: 1250.50,
        currency: 'ZAR',
        status: 'active',
        createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now(),
      };

      const transactionData: Transaction[] = [
        {
          id: 'txn1',
          walletId: 'wallet-user1',
          type: 'credit',
          amount: 400,
          description: 'Payment for House Cleaning job',
          balanceAfter: 1250.50,
          timestamp: Date.now() - 2 * 60 * 60 * 1000,
        },
        {
          id: 'txn2',
          walletId: 'wallet-user1',
          type: 'credit',
          amount: 300,
          description: 'Payment for Garden Maintenance',
          balanceAfter: 850.50,
          timestamp: Date.now() - 24 * 60 * 60 * 1000,
        },
        {
          id: 'txn3',
          walletId: 'wallet-user1',
          type: 'debit',
          amount: 50,
          description: 'Withdrawal to bank account',
          balanceAfter: 550.50,
          timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        },
      ];
      
      setWallet(walletData);
      setTransactions(transactionData);
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/profile');
    }
  };

  const formatCurrency = (amount: number) => {
    return `R${amount.toFixed(2)}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleAddMoney = () => {
    Alert.alert(
      'Add Money',
      'This feature would integrate with payment providers like PayFast or Stripe for South African users.',
      [{ text: 'OK' }]
    );
  };

  const handleWithdraw = () => {
    Alert.alert(
      'Withdraw Funds',
      'This feature would allow withdrawal to your linked bank account.',
      [{ text: 'OK' }]
    );
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Card style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionIcon}>
          {item.type === 'credit' ? (
            <TrendingUp size={20} color={Colors.success[500]} />
          ) : (
            <TrendingDown size={20} color={Colors.error[500]} />
          )}
        </View>
        <View style={styles.transactionInfo}>
          <Text variant="body1" weight="medium" numberOfLines={1}>
            {item.description}
          </Text>
          <Text variant="caption" color="secondary">
            {formatDate(item.timestamp)}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text 
            variant="body1" 
            weight="semibold"
            color={item.type === 'credit' ? 'success' : 'error'}
          >
            {item.type === 'credit' ? '+' : '-'}{formatCurrency(item.amount)}
          </Text>
          <Text variant="caption" color="secondary">
            Balance: {formatCurrency(item.balanceAfter)}
          </Text>
        </View>
      </View>
    </Card>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading wallet...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Back"
          variant="ghost"
          onPress={handleGoBack}
          leftIcon={<ChevronLeft size={20} color={Colors.primary[500]} />}
        />
        <Text variant="h3" weight="bold">Wallet</Text>
        <View style={{ width: 60 }} />
      </View>

      {wallet && (
        <View style={styles.walletSection}>
          <Card style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <WalletIcon size={32} color={Colors.primary[500]} />
              <Text variant="h4" weight="semibold" style={styles.balanceTitle}>
                Available Balance
              </Text>
            </View>
            <Text variant="h1" weight="bold" color="primary" style={styles.balanceAmount}>
              {formatCurrency(wallet.balance)}
            </Text>
            <Text variant="body2" color="secondary">
              Last updated: {formatDate(wallet.updatedAt)}
            </Text>
          </Card>

          <View style={styles.actionButtons}>
            <Button
              title="Add Money"
              variant="primary"
              onPress={handleAddMoney}
              leftIcon={<CreditCard size={20} color={Colors.white} />}
              style={styles.actionButton}
            />
            <Button
              title="Withdraw"
              variant="outline"
              onPress={handleWithdraw}
              leftIcon={<Banknote size={20} color={Colors.primary[500]} />}
              style={styles.actionButton}
            />
          </View>
        </View>
      )}

      <View style={styles.transactionsSection}>
        <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
          Recent Transactions
        </Text>
        
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={renderTransaction}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.transactionsList}
          />
        ) : (
          <Card style={styles.emptyState}>
            <Text variant="body1" color="secondary" centered>
              No transactions yet
            </Text>
            <Text variant="body2" color="secondary" centered style={styles.emptyStateSubtext}>
              Complete jobs to start earning money
            </Text>
          </Card>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  walletSection: {
    padding: Layout.spacing.lg,
  },
  balanceCard: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  balanceTitle: {
    marginLeft: Layout.spacing.sm,
  },
  balanceAmount: {
    marginBottom: Layout.spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
  },
  transactionsSection: {
    flex: 1,
    padding: Layout.spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
  },
  transactionsList: {
    paddingBottom: Layout.spacing.xl,
  },
  transactionCard: {
    marginBottom: Layout.spacing.sm,
    padding: Layout.spacing.md,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  emptyState: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
  },
  emptyStateSubtext: {
    marginTop: Layout.spacing.sm,
  },
});