import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  size?: 'small' | 'medium';
  style?: any;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  maxCount = 99,
  size = 'medium',
  style,
}) => {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  const isSmall = size === 'small';

  return (
    <View style={[
      styles.badge,
      isSmall ? styles.smallBadge : styles.mediumBadge,
      style
    ]}>
      <Text
        variant={isSmall ? 'caption' : 'body2'}
        color="white"
        weight="bold"
        style={styles.text}
      >
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.error[500],
    borderRadius: Layout.borderRadius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -4,
    right: -4,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  smallBadge: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
  },
  mediumBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
  },
  text: {
    fontSize: 10,
    lineHeight: 12,
  },
});

export default NotificationBadge;