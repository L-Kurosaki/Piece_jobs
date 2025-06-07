import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Mic, MicOff, Volume2, Loader as Loader2 } from 'lucide-react-native';
import Text from '../ui/Text';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

interface VoiceAssistantButtonProps {
  onTranscription?: (text: string) => void;
  onError?: (error: string) => void;
  size?: 'small' | 'medium' | 'large';
  style?: any;
}

export const VoiceAssistantButton: React.FC<VoiceAssistantButtonProps> = ({
  onTranscription,
  onError,
  size = 'medium',
  style,
}) => {
  const {
    isListening,
    isProcessing,
    isPlaying,
    transcribedText,
    error,
    startListening,
    stopListening,
  } = useVoiceAssistant();

  const [pulseAnim] = useState(new Animated.Value(1));

  React.useEffect(() => {
    if (isListening) {
      // Start pulsing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening, pulseAnim]);

  React.useEffect(() => {
    if (transcribedText && onTranscription) {
      onTranscription(transcribedText);
    }
  }, [transcribedText, onTranscription]);

  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handlePress = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small': return 40;
      case 'medium': return 56;
      case 'large': return 72;
      default: return 56;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 20;
      case 'medium': return 24;
      case 'large': return 32;
      default: return 24;
    }
  };

  const buttonSize = getButtonSize();
  const iconSize = getIconSize();

  const getIcon = () => {
    if (isProcessing) {
      return <Loader2 size={iconSize} color={Colors.white} />;
    }
    if (isPlaying) {
      return <Volume2 size={iconSize} color={Colors.white} />;
    }
    if (isListening) {
      return <MicOff size={iconSize} color={Colors.white} />;
    }
    return <Mic size={iconSize} color={Colors.white} />;
  };

  const getBackgroundColor = () => {
    if (isListening) return Colors.error[500];
    if (isProcessing || isPlaying) return Colors.warning[500];
    return Colors.primary[500];
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.button,
          {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
            backgroundColor: getBackgroundColor(),
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.touchable}
          onPress={handlePress}
          disabled={isProcessing}
          activeOpacity={0.8}
        >
          {getIcon()}
        </TouchableOpacity>
      </Animated.View>

      {(isListening || isProcessing) && (
        <Text variant="caption" color="secondary" style={styles.statusText}>
          {isListening ? 'Listening...' : 'Processing...'}
        </Text>
      )}

      {error && (
        <Text variant="caption" color="error" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: Layout.spacing.xs,
    textAlign: 'center',
  },
  errorText: {
    marginTop: Layout.spacing.xs,
    textAlign: 'center',
    maxWidth: 200,
  },
});

export default VoiceAssistantButton;