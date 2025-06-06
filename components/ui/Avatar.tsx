import React from 'react';
import { View, Image, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from './Text';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  source?: string;
  size?: AvatarSize;
  initials?: string;
  style?: StyleProp<ViewStyle>;
  verified?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'md',
  initials,
  style,
  verified = false,
}) => {
  const getSizeValue = (): number => {
    switch (size) {
      case 'xs': return 24;
      case 'sm': return 32;
      case 'md': return 48;
      case 'lg': return 64;
      case 'xl': return 96;
      default: return 48;
    }
  };

  const getInitialsFontSize = (): number => {
    switch (size) {
      case 'xs': return 10;
      case 'sm': return 12;
      case 'md': return 16;
      case 'lg': return 24;
      case 'xl': return 32;
      default: return 16;
    }
  };

  const sizeValue = getSizeValue();

  return (
    <View style={[styles.container, style]}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            { width: sizeValue, height: sizeValue, borderRadius: sizeValue / 2 },
          ]}
        />
      ) : (
        <View
          style={[
            styles.initialsContainer,
            { width: sizeValue, height: sizeValue, borderRadius: sizeValue / 2 },
          ]}
        >
          <Text
            style={{ fontSize: getInitialsFontSize() }}
            color="white"
            weight="medium"
          >
            {initials || '?'}
          </Text>
        </View>
      )}
      
      {verified && (
        <View
          style={[
            styles.verifiedBadge,
            { 
              width: sizeValue / 3, 
              height: sizeValue / 3,
              borderRadius: sizeValue / 6,
              right: 0,
              bottom: 0,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: Colors.neutral[200],
  },
  initialsContainer: {
    backgroundColor: Colors.primary[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    backgroundColor: Colors.success[500],
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
});

export default Avatar;