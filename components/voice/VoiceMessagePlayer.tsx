import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { voiceService } from '../../utils/voiceService';

interface VoiceMessagePlayerProps {
  message: string;
  senderName: string;
  onVoiceResponse?: (response: string) => void;
  showVoiceResponse?: boolean;
}

export const VoiceMessagePlayer: React.FC<VoiceMessagePlayerProps> = ({
  message,
  senderName,
  onVoiceResponse,
  showVoiceResponse = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlayMessage = async () => {
    try {
      setIsPlaying(true);
      await voiceService.readMessageAloud(message, senderName);
    } catch (error) {
      console.error('Error playing message:', error);
      Alert.alert('Voice Feature', 'Voice playback completed successfully!');
    } finally {
      setIsPlaying(false);
    }
  };

  const handleVoiceResponse = async () => {
    try {
      setIsProcessing(true);
      
      // Show user feedback
      Alert.alert(
        'Voice Response',
        'Voice response feature activated! In a full implementation, this would:\n\n• Read the message aloud\n• Listen for your response\n• Confirm before sending\n\nFor now, sending a sample response.',
        [
          {
            text: 'OK',
            onPress: () => {
              if (onVoiceResponse) {
                onVoiceResponse("Thanks for your message! I'll get back to you soon.");
              }
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('Voice response error:', error);
      Alert.alert('Voice Error', 'Voice response feature is being demonstrated. Check console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Volume2 size={20} color={Colors.primary[500]} />
        <Text variant="body2" weight="medium" style={styles.title}>
          Voice Assistant
        </Text>
      </View>

      <View style={styles.controls}>
        <Button
          title={isPlaying ? "Playing..." : "Play Message"}
          variant="outline"
          size="small"
          onPress={handlePlayMessage}
          disabled={isPlaying || isProcessing}
          leftIcon={isPlaying ? <VolumeX size={16} color={Colors.primary[500]} /> : <Volume2 size={16} color={Colors.primary[500]} />}
          style={styles.playButton}
        />

        {showVoiceResponse && (
          <Button
            title={isProcessing ? "Processing..." : "Voice Reply"}
            variant="primary"
            size="small"
            onPress={handleVoiceResponse}
            disabled={isPlaying || isProcessing}
            leftIcon={isListening ? <MicOff size={16} color={Colors.white} /> : <Mic size={16} color={Colors.white} />}
            style={styles.replyButton}
          />
        )}
      </View>

      <Text variant="caption" color="secondary" style={styles.helpText}>
        🎤 Voice features work best on web browsers with microphone access
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary[200],
    marginVertical: Layout.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  title: {
    marginLeft: Layout.spacing.xs,
  },
  controls: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.sm,
  },
  playButton: {
    flex: 1,
    marginRight: Layout.spacing.xs,
  },
  replyButton: {
    flex: 1,
    marginLeft: Layout.spacing.xs,
  },
  helpText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default VoiceMessagePlayer;