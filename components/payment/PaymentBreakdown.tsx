import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../ui/Text';
import Card from '../ui/Card';
import Divider from '../ui/Divider';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { paymentService } from '../../utils/paymentService';
import { DollarSign, Percent, CreditCard } from 'lucide-react-native';

interface PaymentBreakdownProps {
  category: string;
  amount: number;
  showDetails?: boolean;
}

export const PaymentBreakdown: React.FC<PaymentBreakdownProps> = ({
  category,
  amount,
  showDetails = true,
}) => {
  const breakdown = paymentService.getCommissionBreakdown(category, amount);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <DollarSign size={20} color={Colors.primary[500]} />
        <Text variant="h4" weight="semibold" style={styles.title}>
          Payment Breakdown
        </Text>
      </View>

      <View style={styles.amountRow}>
        <Text variant="body1" color="secondary">Job Amount</Text>
        <Text variant="h3" weight="bold" color="primary">
          R{amount.toFixed(2)}
        </Text>
      </View>

      {showDetails && (
        <>
          <Divider style={styles.divider} />
          
          <View style={styles.breakdownSection}>
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownLabel}>
                <Percent size={16} color={Colors.neutral[500]} />
                <Text variant="body2" color="secondary" style={styles.labelText}>
                  Platform Commission ({(breakdown.commissionRate * 100).toFixed(0)}%)
                </Text>
              </View>
              <Text variant="body2" color="error">
                -R{breakdown.commission.toFixed(2)}
              </Text>
            </View>

            <View style={styles.breakdownRow}>
              <View style={styles.breakdownLabel}>
                <CreditCard size={16} color={Colors.neutral[500]} />
                <Text variant="body2" color="secondary" style={styles.labelText}>
                  Booking Fee
                </Text>
              </View>
              <Text variant="body2" color="error">
                -R{breakdown.bookingFee.toFixed(2)}
              </Text>
            </View>
          </View>

          <Divider style={styles.divider} />
        </>
      )}

      <View style={styles.netAmountRow}>
        <Text variant="body1" weight="semibold">You'll Receive</Text>
        <Text variant="h3" weight="bold" color="success">
          R{breakdown.netAmount.toFixed(2)}
        </Text>
      </View>

      {showDetails && (
        <Text variant="caption" color="secondary" style={styles.disclaimer}>
          * Commission helps maintain platform security, support, and payment processing
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  title: {
    marginLeft: Layout.spacing.sm,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  breakdownSection: {
    marginVertical: Layout.spacing.sm,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  breakdownLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    marginLeft: Layout.spacing.xs,
  },
  netAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.success[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginTop: Layout.spacing.sm,
  },
  divider: {
    marginVertical: Layout.spacing.sm,
  },
  disclaimer: {
    marginTop: Layout.spacing.sm,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PaymentBreakdown;