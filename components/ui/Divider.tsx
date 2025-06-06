import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  style?: any;
}

export const Divider: React.FC<DividerProps> = ({
  direction = 'horizontal',
  color = Colors.neutral[200],
  thickness = 1,
  style,
}) => {
  return (
    <View
      style={[
        direction === 'horizontal' ? styles.horizontal : styles.vertical,
        { backgroundColor: color },
        direction === 'horizontal' ? { height: thickness } : { width: thickness },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});

export default Divider;