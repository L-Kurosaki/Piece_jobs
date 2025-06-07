import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { voiceService } from '../../utils/voiceService';
import VoiceReplyInterface from './VoiceReplyInterface';
import { Message } from '../../types/Message';
import { Job } from '../../types/Job';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

interface VoiceNotificationHandlerProps {
  message?: Message;
  job?: Job;
  onReply?: (replyText: string) => void;
  onDismiss?: () => void;
  visible: boolean;
}

type VoiceFlowState = 
  | 'reading-notification'
  | 'asking-for-reply'
  | 'waiting-for-reply-decision'
  | 'recording-reply'
  | 'confirming-reply'
  | 'waiting-for-confirmation'
  | 'sending'
  | 'completed'
  | 'cancelled';

export const VoiceNotificationHandler: React.FC<VoiceNotificationHandlerProps> = ({
  message,
  job,
  onReply,
  onDismiss,
  visible,
}) => {
  const [flowState, setFlowState] = useState<VoiceFlowState>('reading-notification');
  const [recordedText, setRecordedText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible && (message || job)) {
      startVoiceFlow();
    }
  }, [visible, message, job]);

  const startVoiceFlow = async () => {
    try {
      setError(null);
      setFlowState('reading-notification');
      
      // Step 1: Read the notification
      const notificationText = getNotificationText();
      await voiceService.textToSpeech(notificationText);
      
      // Step 2: Ask if they want to reply
      setFlowState('asking-for-reply');
      await voiceService.textToSpeech("Would you like to respond to this message?");
      
      // Step 3: Wait for yes/no response
      setFlowState('waiting-for-reply-decision');
      const decision = await voiceService.speechToText();
      
      if (isPositiveResponse(decision.transcript)) {
        await handleReplyFlow();
      } else {
        await handleDismiss();
      }
    } catch (error) {
      console.error('Voice flow error:', error);
      setError('Voice processing failed. Please try again.');
    }
  };

  const getNotificationText = (): string => {
    if (message) {
      return `New message from ${message.senderId}: ${message.text}`;
    }
    if (job) {
      return `New job request: ${job.title}. Budget: ${job.budget.min} to ${job.budget.max} rand. Location: ${job.location.address}`;
    }
    return 'New notification received';
  };

  const isPositiveResponse = (text: string): boolean => {
    const positiveWords = ['yes', 'yeah', 'yep', 'sure', 'okay', 'ok', 'definitely', 'absolutely'];
    const lowerText = text.toLowerCase().trim();
    return positiveWords.some(word => lowerText.includes(word));
  };

  const handleReplyFlow = async () => {
    try {
      // Step 4: Ask for their reply
      setFlowState('recording-reply');
      await voiceService.textToSpeech("Okay, I'm listening. What would you like to say?");
      
      // Step 5: Record their reply
      const replyResult = await voiceService.speechToText();
      setRecordedText(replyResult.transcript);
      
      // Step 6: Read back their reply
      setFlowState('confirming-reply');
      await voiceService.textToSpeech(`You said: "${replyResult.transcript}". Are you happy with this message? Should I send it?`);
      
      // Step 7: Wait for confirmation
      setFlowState('waiting-for-confirmation');
      const confirmation = await voiceService.speechToText();
      
      if (isPositiveResponse(confirmation.transcript)) {
        setFlowState('sending');
        await voiceService.textToSpeech("Message sent successfully!");
        onReply?.(replyResult.transcript);
        setFlowState('completed');
        setTimeout(() => onDismiss?.(), 1000);
      } else {
        // Allow re-recording
        await voiceService.textToSpeech("Let's try again.");
        await handleReplyFlow();
      }
    } catch (error) {
      console.error('Reply flow error:', error);
      setError('Failed to process your reply. Please try again.');
    }
  };

  const handleDismiss = async () => {
    setFlowState('cancelled');
    await voiceService.textToSpeech("Okay, no problem.");
    setTimeout(() => onDismiss?.(), 1000);
  };

  const handleManualDismiss = () => {
    voiceService.stopSpeaking();
    voiceService.stopListening();
    onDismiss?.();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleManualDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <VoiceReplyInterface
            flowState={flowState}
            recordedText={recordedText}
            error={error}
            onDismiss={handleManualDismiss}
            onRetry={startVoiceFlow}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.xl,
  },
});

export default VoiceNotificationHandler;