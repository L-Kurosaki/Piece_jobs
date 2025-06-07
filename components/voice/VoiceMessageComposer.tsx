import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import VoiceAssistantButton from './VoiceAssistantButton';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { Send, Mic, CreditCard as Edit3, Check, X } from 'lucide-react-native';

interface VoiceMessageComposerProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  recipientName?: string;
}

export const VoiceMessageComposer: React.FC<VoiceMessageComposerProps> = ({
  onSendMessage,
  placeholder = "Type your message...",
  recipientName = "the recipient",
}) => {
  const [message, setMessage] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const { speak, askForConfirmation } = useVoiceAssistant();

  const handleVoiceTranscription = async (transcribedText: string) => {
    if (transcribedText.trim()) {
      setPendingMessage(transcribedText);
      setShowConfirmation(true);
      
      // Read back the message for confirmation
      await speak(`You said: ${transcribedText}. Is this correct?`);
    }
  };

  const handleConfirmMessage = async () => {
    setMessage(pendingMessage);
    setShowConfirmation(false);
    
    // Ask if they want to send the message
    await askForConfirmation(`send this message to ${recipientName}`);
    
    // Show send confirmation
    setTimeout(() => {
      Alert.alert(
        'Send Message?',
        `"${pendingMessage}"\n\nSend this message to ${recipientName}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              speak("Message cancelled.");
              handleRejectMessage();
            },
          },
          {
            text: 'Send',
            onPress: () => {
              onSendMessage(pendingMessage);
              setMessage('');
              setPendingMessage('');
              setIsVoiceMode(false);
              speak("Message sent successfully!");
            },
          },
        ]
      );
    }, 2000);
  };

  const handleRejectMessage = () => {
    setShowConfirmation(false);
    setPendingMessage('');
    speak("Let's try again. What would you like to say?");
  };

  const handleSendTypedMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (showConfirmation) {
      setShowConfirmation(false);
      setPendingMessage('');
    }
    
    if (!isVoiceMode) {
      speak(`Voice message mode activated. What would you like to say to ${recipientName}?`);
    }
  };

  return (
    <View style={styles.container}>
      {isVoiceMode ? (
        <Card style={styles.voiceCard}>
          <View style={styles.voiceHeader}>
            <Text variant="h4" weight="semibold">
              Voice Message to {recipientName}
            </Text>
            <Button
              title="Type Instead"
              variant="ghost"
              size="small"
              onPress={toggleVoiceMode}
              leftIcon={<Edit3 size={16} color={Colors.primary[500]} />}
            />
          </View>

          <Text variant="body2" color="secondary" style={styles.voiceInstructions}>
            Tap the microphone and speak your message. I'll read it back for confirmation.
          </Text>
          
          <View style={styles.voiceButtonContainer}>
            <VoiceAssistantButton
              size="large"
              onTranscription={handleVoiceTranscription}
              onError={(error) => Alert.alert('Voice Error', error)}
            />
          </View>

          {showConfirmation && (
            <View style={styles.confirmationContainer}>
              <Text variant="h4" weight="semibold" style={styles.confirmationTitle}>
                Your Message:
              </Text>
              <Card style={styles.messagePreview}>
                <Text variant="body1" style={styles.messageText}>
                  "{pendingMessage}"
                </Text>
              </Card>
              
              <View style={styles.confirmationButtons}>
                <Button
                  title="Send Message"
                  variant="primary"
                  onPress={handleConfirmMessage}
                  leftIcon={<Send size={20} color={Colors.white} />}
                  style={styles.sendButton}
                />
                <Button
                  title="Try Again"
                  variant="outline"
                  onPress={handleRejectMessage}
                  leftIcon={<X size={20} color={Colors.primary[500]} />}
                  style={styles.retryButton}
                />
              </View>
            </View>
          )}
        </Card>
      ) : (
        <View style={styles.textInputContainer}>
          <Input
            value={message}
            onChangeText={setMessage}
            placeholder={placeholder}
            multiline
            numberOfLines={3}
            style={styles.textInput}
          />
          
          <View style={styles.inputActions}>
            <Button
              title="Voice"
              variant="ghost"
              size="small"
              onPress={toggleVoiceMode}
              leftIcon={<Mic size={16} color={Colors.primary[500]} />}
            />
            <Button
              title="Send"
              variant="primary"
              size="small"
              onPress={handleSendTypedMessage}
              disabled={!message.trim()}
              leftIcon={<Send size={16} color={Colors.white} />}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  voiceCard: {
    padding: Layout.spacing.lg,
  },
  voiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  voiceInstructions: {
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
    lineHeight: 20,
  },
  voiceButtonContainer: {
    alignItems: 'center',
    marginVertical: Layout.spacing.lg,
  },
  confirmationContainer: {
    marginTop: Layout.spacing.lg,
  },
  confirmationTitle: {
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
  messagePreview: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  messageText: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendButton: {
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  retryButton: {
    flex: 1,
    marginLeft: Layout.spacing.sm,
  },
  textInputContainer: {
    
  },
  textInput: {
    marginBottom: Layout.spacing.sm,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default VoiceMessageComposer;