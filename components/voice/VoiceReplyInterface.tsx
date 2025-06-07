import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { Mic, MicOff, Volume2, MessageSquare, CircleCheck as CheckCircle2, Circle as XCircle, RotateCcw } from 'lucide-react-native';

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

interface VoiceReplyInterfaceProps {
  flowState: VoiceFlowState;
  recordedText: string;
  error: string | null;
  onDismiss: () => void;
  onRetry: () => void;
}

export const VoiceReplyInterface: React.FC<VoiceReplyInterfaceProps> = ({
  flowState,
  recordedText,
  error,
  onDismiss,
  onRetry,
}) => {
  const getStateInfo = () => {
    switch (flowState) {
      case 'reading-notification':
        return {
          title: 'Reading Notification',
          description: 'Listening to your new message...',
          icon: <Volume2 size={48} color={Colors.primary[500]} />,
          showActivity: true,
        };
      case 'asking-for-reply':
        return {
          title: 'Voice Assistant',
          description: 'Would you like to respond?',
          icon: <MessageSquare size={48} color={Colors.primary[500]} />,
          showActivity: true,
        };
      case 'waiting-for-reply-decision':
        return {
          title: 'Listening',
          description: 'Say "Yes" to reply or "No" to dismiss',
          icon: <Mic size={48} color={Colors.accent[500]} />,
          showActivity: true,
        };
      case 'recording-reply':
        return {
          title: 'Recording Your Reply',
          description: 'Speak your message now...',
          icon: <Mic size={48} color={Colors.error[500]} />,
          showActivity: true,
        };
      case 'confirming-reply':
        return {
          title: 'Confirming Message',
          description: 'Reading your message back to you...',
          icon: <Volume2 size={48} color={Colors.primary[500]} />,
          showActivity: true,
        };
      case 'waiting-for-confirmation':
        return {
          title: 'Confirm & Send',
          description: 'Say "Yes" to send or "No" to re-record',
          icon: <Mic size={48} color={Colors.accent[500]} />,
          showActivity: true,
        };
      case 'sending':
        return {
          title: 'Sending Message',
          description: 'Your reply is being sent...',
          icon: <MessageSquare size={48} color={Colors.success[500]} />,
          showActivity: true,
        };
      case 'completed':
        return {
          title: 'Message Sent!',
          description: 'Your reply has been delivered successfully.',
          icon: <CheckCircle2 size={48} color={Colors.success[500]} />,
          showActivity: false,
        };
      case 'cancelled':
        return {
          title: 'Cancelled',
          description: 'Voice reply cancelled.',
          icon: <XCircle size={48} color={Colors.neutral[500]} />,
          showActivity: false,
        };
      default:
        return {
          title: 'Voice Assistant',
          description: 'Processing...',
          icon: <Mic size={48} color={Colors.primary[500]} />,
          showActivity: true,
        };
    }
  };

  const stateInfo = getStateInfo();
  const isListening = ['waiting-for-reply-decision', 'recording-reply', 'waiting-for-confirmation'].includes(flowState);
  const isCompleted = ['completed', 'cancelled'].includes(flowState);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, isListening && styles.listeningIcon]}>
          {stateInfo.icon}
        </View>
        <Text variant="h3" weight="bold" style={styles.title} centered>
          {stateInfo.title}
        </Text>
        <Text variant="body1" color="secondary" style={styles.description} centered>
          {stateInfo.description}
        </Text>
      </View>

      {stateInfo.showActivity && !error && (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color={Colors.primary[500]} />
          {isListening && (
            <View style={styles.listeningIndicator}>
              <View style={[styles.soundWave, styles.wave1]} />
              <View style={[styles.soundWave, styles.wave2]} />
              <View style={[styles.soundWave, styles.wave3]} />
            </View>
          )}
        </View>
      )}

      {recordedText && (
        <Card style={styles.messageCard}>
          <Text variant="body2" color="secondary" style={styles.messageLabel}>
            Your recorded message:
          </Text>
          <Text variant="body1" style={styles.messageText}>
            "{recordedText}"
          </Text>
        </Card>
      )}

      {error && (
        <Card style={styles.errorCard}>
          <XCircle size={20} color={Colors.error[500]} />
          <Text variant="body2" color="error" style={styles.errorText}>
            {error}
          </Text>
        </Card>
      )}

      <View style={styles.actions}>
        {error && (
          <Button
            title="Retry"
            variant="primary"
            onPress={onRetry}
            leftIcon={<RotateCcw size={20} color={Colors.white} />}
            style={styles.actionButton}
          />
        )}
        
        {!isCompleted && (
          <Button
            title={isListening ? "Stop Listening" : "Cancel"}
            variant="outline"
            onPress={onDismiss}
            leftIcon={isListening ? <MicOff size={20} color={Colors.primary[500]} /> : <XCircle size={20} color={Colors.primary[500]} />}
            style={styles.actionButton}
          />
        )}
      </View>

      <View style={styles.tips}>
        <Text variant="caption" color="secondary" centered>
          💡 Tip: Speak clearly and wait for the prompt before responding
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  listeningIcon: {
    backgroundColor: Colors.accent[50],
    borderWidth: 3,
    borderColor: Colors.accent[200],
  },
  title: {
    marginBottom: Layout.spacing.xs,
  },
  description: {
    lineHeight: 22,
  },
  activityContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  listeningIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.md,
  },
  soundWave: {
    width: 4,
    backgroundColor: Colors.accent[500],
    marginHorizontal: 2,
    borderRadius: 2,
  },
  wave1: {
    height: 20,
    animationDuration: '1s',
  },
  wave2: {
    height: 30,
    animationDuration: '1.2s',
  },
  wave3: {
    height: 25,
    animationDuration: '0.8s',
  },
  messageCard: {
    width: '100%',
    marginBottom: Layout.spacing.lg,
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  messageLabel: {
    marginBottom: Layout.spacing.xs,
  },
  messageText: {
    fontStyle: 'italic',
  },
  errorCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    backgroundColor: Colors.error[50],
    borderWidth: 1,
    borderColor: Colors.error[200],
  },
  errorText: {
    marginLeft: Layout.spacing.sm,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Layout.spacing.lg,
  },
  actionButton: {
    marginHorizontal: Layout.spacing.xs,
  },
  tips: {
    paddingTop: Layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
});

export default VoiceReplyInterface;