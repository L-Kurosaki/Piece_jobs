import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import VoiceMessageComposer from './VoiceMessageComposer';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { Volume2, VolumeX, MessageSquare, X } from 'lucide-react-native';

interface VoiceNotificationReaderProps {
  notification: {
    id: string;
    title: string;
    message: string;
    senderName: string;
    timestamp: number;
  } | null;
  onDismiss: () => void;
  onReply?: (message: string) => void;
  autoRead?: boolean;
}

export const VoiceNotificationReader: React.FC<VoiceNotificationReaderProps> = ({
  notification,
  onDismiss,
  onReply,
  autoRead = true,
}) => {
  const [showReplyComposer, setShowReplyComposer] = useState(false);
  const [hasRead, setHasRead] = useState(false);
  
  const { readNotification, speak, askForConfirmation } = useVoiceAssistant();

  useEffect(() => {
    if (notification && autoRead && !hasRead) {
      handleReadNotification();
      setHasRead(true);
    }
  }, [notification, autoRead, hasRead]);

  const handleReadNotification = async () => {
    if (!notification) return;
    
    const notificationText = `New message from ${notification.senderName}: ${notification.message}`;
    await readNotification(notificationText);
    
    // Ask if they want to reply
    if (onReply) {
      setTimeout(async () => {
        await askForConfirmation('reply to this message');
        
        setTimeout(() => {
          setShowReplyComposer(true);
        }, 2000);
      }, 3000);
    }
  };

  const handleReply = (message: string) => {
    if (onReply) {
      onReply(message);
    }
    setShowReplyComposer(false);
    onDismiss();
  };

  const handleDismiss = () => {
    setShowReplyComposer(false);
    onDismiss();
  };

  if (!notification) return null;

  return (
    <Modal
      visible={!!notification}
      transparent
      animationType="slide"
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Card style={styles.notificationCard}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <MessageSquare size={24} color={Colors.primary[500]} />
                <Text variant="h4" weight="semibold" style={styles.title}>
                  New Message
                </Text>
              </View>
              <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
                <X size={24} color={Colors.neutral[500]} />
              </TouchableOpacity>
            </View>

            <View style={styles.senderInfo}>
              <Text variant="body1" weight="semibold">
                From: {notification.senderName}
              </Text>
              <Text variant="caption" color="secondary">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </Text>
            </View>

            <View style={styles.messageContainer}>
              <Text variant="body1" style={styles.messageText}>
                "{notification.message}"
              </Text>
            </View>

            <View style={styles.actions}>
              <Button
                title="Read Aloud"
                variant="outline"
                size="small"
                onPress={handleReadNotification}
                leftIcon={hasRead ? <VolumeX size={16} color={Colors.primary[500]} /> : <Volume2 size={16} color={Colors.primary[500]} />}
                style={styles.actionButton}
              />
              
              {onReply && (
                <Button
                  title="Voice Reply"
                  variant="primary"
                  size="small"
                  onPress={() => setShowReplyComposer(true)}
                  leftIcon={<MessageSquare size={16} color={Colors.white} />}
                  style={styles.actionButton}
                />
              )}
            </View>
          </Card>

          {showReplyComposer && (
            <Card style={styles.replyCard}>
              <VoiceMessageComposer
                onSendMessage={handleReply}
                placeholder="Type your reply..."
                recipientName={notification.senderName}
              />
            </Card>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  container: {
    width: '100%',
    maxWidth: 400,
  },
  notificationCard: {
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: Layout.spacing.sm,
  },
  closeButton: {
    padding: Layout.spacing.xs,
  },
  senderInfo: {
    marginBottom: Layout.spacing.md,
  },
  messageContainer: {
    backgroundColor: Colors.neutral[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.lg,
  },
  messageText: {
    lineHeight: 22,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
  },
  replyCard: {
    padding: 0,
  },
});

export default VoiceNotificationReader;