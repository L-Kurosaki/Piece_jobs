import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  elevation = 'low',
  borderRadius = 'medium',
  padding = 'medium',
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[
        styles.card,
        styles[`elevation${elevation.charAt(0).toUpperCase() + elevation.slice(1)}`],
        styles[`radius${borderRadius.charAt(0).toUpperCase() + borderRadius.slice(1)}`],
        styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  elevationNone: {
    elevation: 0,
    shadowOpacity: 0,
  },
  elevationLow: {
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  elevationMedium: {
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  elevationHigh: {
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  radiusNone: {
    borderRadius: 0,
  },
  radiusSmall: {
    borderRadius: Layout.borderRadius.sm,
  },
  radiusMedium: {
    borderRadius: Layout.borderRadius.md,
  },
  radiusLarge: {
    borderRadius: Layout.borderRadius.lg,
  },
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: Layout.spacing.sm,
  },
  paddingMedium: {
    padding: Layout.spacing.md,
  },
  paddingLarge: {
    padding: Layout.spacing.lg,
  },
});

export default Card;