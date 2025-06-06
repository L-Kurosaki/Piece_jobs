import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import FontConfig from '../../constants/FontConfig';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'caption' | 'button' | 'label';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextColor = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'white' 
  | 'black' 
  | 'error' 
  | 'success' 
  | 'warning';

interface TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  numberOfLines?: number;
  centered?: boolean;
  onPress?: () => void;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body1',
  weight = 'regular',
  color = 'primary',
  style,
  children,
  numberOfLines,
  centered = false,
  onPress,
}) => {
  const getColorValue = (colorName: TextColor): string => {
    switch (colorName) {
      case 'primary':
        return Colors.primary[500];
      case 'secondary':
        return Colors.neutral[800];
      case 'accent':
        return Colors.accent[500];
      case 'white':
        return Colors.white;
      case 'black':
        return Colors.black;
      case 'error':
        return Colors.error[500];
      case 'success':
        return Colors.success[500];
      case 'warning':
        return Colors.warning[500];
      default:
        return Colors.neutral[900];
    }
  };

  return (
    <RNText
      style={[
        styles[variant],
        styles[weight],
        { color: getColorValue(color) },
        centered && styles.centered,
        style,
      ]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: FontConfig.sizes.xxxl,
    lineHeight: FontConfig.sizes.xxxl * 1.2,
  },
  h2: {
    fontSize: FontConfig.sizes.xxl,
    lineHeight: FontConfig.sizes.xxl * 1.2,
  },
  h3: {
    fontSize: FontConfig.sizes.xl,
    lineHeight: FontConfig.sizes.xl * 1.2,
  },
  h4: {
    fontSize: FontConfig.sizes.lg,
    lineHeight: FontConfig.sizes.lg * 1.2,
  },
  body1: {
    fontSize: FontConfig.sizes.md,
    lineHeight: FontConfig.sizes.md * 1.5,
  },
  body2: {
    fontSize: FontConfig.sizes.sm,
    lineHeight: FontConfig.sizes.sm * 1.5,
  },
  caption: {
    fontSize: FontConfig.sizes.xs,
    lineHeight: FontConfig.sizes.xs * 1.5,
  },
  button: {
    fontSize: FontConfig.sizes.md,
    lineHeight: FontConfig.sizes.md * 1.2,
  },
  label: {
    fontSize: FontConfig.sizes.sm,
    lineHeight: FontConfig.sizes.sm * 1.2,
  },
  regular: FontConfig.regular,
  medium: FontConfig.medium,
  semibold: FontConfig.semibold,
  bold: FontConfig.bold,
  centered: {
    textAlign: 'center',
  },
});

export default Text;