import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VerificationStatus } from '../../types/User';
import Text from '../ui/Text';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { CircleCheck as CheckCircle2, Clock, Circle as XCircle } from 'lucide-react-native';

interface VerificationBadgeProps {
  type: 'identity' | 'address' | 'background';
  status: VerificationStatus;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  type,
  status,
}) => {
  const getTypeLabel = () => {
    switch (type) {
      case 'identity':
        return 'ID Verified';
      case 'address':
        return 'Address Verified';
      case 'background':
        return 'Background Check';
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 size={16} color={Colors.success[500]} />;
      case 'pending':
        return <Clock size={16} color={Colors.warning[500]} />;
      case 'rejected':
        return <XCircle size={16} color={Colors.error[500]} />;
      default:
        return null;
    }
  };

  const getStatusColor = (): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'success';
    }
  };

  return (
    <View style={styles.container}>
      {getStatusIcon()}
      <Text 
        variant="caption" 
        weight="medium" 
        color={getStatusColor()}
        style={styles.text}
      >
        {getTypeLabel()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  text: {
    marginLeft: 4,
  },
});

export default VerificationBadge;