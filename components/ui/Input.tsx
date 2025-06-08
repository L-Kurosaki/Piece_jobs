import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  ViewStyle, 
  StyleProp, 
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from './Text';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helper?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  maxLength?: number;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  editable?: boolean;
  onSubmitEditing?: () => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  helper,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  autoCapitalize = 'none',
  keyboardType = 'default',
  maxLength,
  style,
  inputStyle,
  leftIcon,
  rightIcon,
  editable = true,
  onSubmitEditing,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text variant="label" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInput,
          error && styles.errorInput,
          !editable && styles.disabledInput,
          multiline && { height: numberOfLines * 24 + 16 },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral[400]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={onSubmitEditing}
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
            multiline && styles.multilineInput,
            inputStyle,
          ]}
          editable={editable}
        />
        
        {secureTextEntry ? (
          <TouchableOpacity 
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={Colors.neutral[500]} />
            ) : (
              <Eye size={20} color={Colors.neutral[500]} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>
      
      {(error || helper) && (
        <Text
          variant="caption"
          color={error ? 'error' : 'secondary'}
          style={styles.helperText}
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    marginBottom: Layout.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.white,
    minHeight: 48,
  },
  input: {
    flex: 1,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    color: Colors.neutral[900],
    fontSize: 16,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  focusedInput: {
    borderColor: Colors.primary[400],
  },
  errorInput: {
    borderColor: Colors.error[500],
  },
  disabledInput: {
    backgroundColor: Colors.neutral[100],
    borderColor: Colors.neutral[300],
  },
  inputWithLeftIcon: {
    paddingLeft: Layout.spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: Layout.spacing.xs,
  },
  leftIcon: {
    paddingLeft: Layout.spacing.md,
  },
  rightIcon: {
    paddingRight: Layout.spacing.md,
  },
  helperText: {
    marginTop: Layout.spacing.xs,
  },
});

export default Input;