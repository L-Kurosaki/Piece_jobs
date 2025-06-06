import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from './Text';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
type BadgeSize = 'small' | 'medium';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}) => {
  const getBackgroundColor = (): string => {
    switch (variant) {
      case 'primary':
        return Colors.primary[100];
      case 'secondary':
        return Colors.neutral[100];
      case 'success':
        return Colors.success[100];
      case 'warning':
        return Colors.warning[100];
      case 'error':
        return Colors.error[100];
      case 'neutral':
        return Colors.neutral[100];
      default:
        return Colors.primary[100];
    }
  };

  const getTextColor = (): 'primary' | 'black' | 'success' | 'warning' | 'error' => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'black';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'neutral':
        return 'black';
      default:
        return 'primary';
    }
  };

  return (
    <View
      style={[
        styles.badge,
        styles[size],
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      <Text
        variant={size === 'small' ? 'caption' : 'body2'}
        weight="medium"
        color={getTextColor()}
        style={textStyle}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: Layout.borderRadius.circle,
    alignSelf: 'flex-start',
  },
  small: {
    paddingVertical: 2,
    paddingHorizontal: Layout.spacing.sm,
  },
  medium: {
    paddingVertical: 4,
    paddingHorizontal: Layout.spacing.md,
  },
});

export default Badge;