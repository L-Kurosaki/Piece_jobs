import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  StyleProp 
} from 'react-native';
import Text from './Text';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  leftIcon,
  rightIcon,
}) => {
  const getButtonStyles = () => {
    const buttonStyles: any[] = [styles.button, styles[size]];
    
    switch (variant) {
      case 'primary':
        buttonStyles.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyles.push(styles.secondaryButton);
        break;
      case 'outline':
        buttonStyles.push(styles.outlineButton);
        break;
      case 'danger':
        buttonStyles.push(styles.dangerButton);
        break;
      case 'success':
        buttonStyles.push(styles.successButton);
        break;
      case 'ghost':
        buttonStyles.push(styles.ghostButton);
        break;
    }
    
    if (disabled) {
      buttonStyles.push(styles.disabledButton);
    }
    
    if (fullWidth) {
      buttonStyles.push(styles.fullWidth);
    }
    
    return buttonStyles;
  };

  const getTextColor = (): 'primary' | 'white' | 'black' | 'error' | 'success' => {
    if (disabled) return 'black';
    
    switch (variant) {
      case 'primary':
      case 'danger':
      case 'success':
        return 'white';
      case 'secondary':
        return 'primary';
      case 'outline':
        return 'primary';
      case 'ghost':
        return 'primary';
      default:
        return 'black';
    }
  };

  const getLoadingColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'danger':
      case 'success':
        return Colors.white;
      case 'secondary':
      case 'outline':
      case 'ghost':
        return Colors.primary[500];
      default:
        return Colors.white;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getLoadingColor()} size="small" />
      ) : (
        <React.Fragment>
          {leftIcon && <React.Fragment>{leftIcon}</React.Fragment>}
          <Text
            variant="button"
            weight="medium"
            color={getTextColor()}
            style={[
              leftIcon && styles.textWithLeftIcon,
              rightIcon && styles.textWithRightIcon,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <React.Fragment>{rightIcon}</React.Fragment>}
        </React.Fragment>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Layout.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    minHeight: 44,
  },
  large: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    minHeight: 52,
  },
  primaryButton: {
    backgroundColor: Colors.primary[500],
  },
  secondaryButton: {
    backgroundColor: Colors.neutral[100],
  },
  outlineButton: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  dangerButton: {
    backgroundColor: Colors.error[500],
  },
  successButton: {
    backgroundColor: Colors.success[500],
  },
  ghostButton: {
    backgroundColor: Colors.transparent,
  },
  disabledButton: {
    backgroundColor: Colors.neutral[200],
    borderColor: Colors.neutral[300],
  },
  fullWidth: {
    width: '100%',
  },
  textWithLeftIcon: {
    marginLeft: Layout.spacing.sm,
  },
  textWithRightIcon: {
    marginRight: Layout.spacing.sm,
  },
});

export default Button;