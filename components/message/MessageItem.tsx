import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Message } from '../../types/Message';
import Text from '../ui/Text';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ 
  message, 
  isOwnMessage
}) => {
  // Format message time
  const formatMessageTime = () => {
    const date = new Date(message.timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[
      styles.container,
      isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer
    ]}>
      <View style={[
        styles.bubble,
        isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble
      ]}>
        <Text 
          variant="body2" 
          color={isOwnMessage ? 'white' : 'black'}
          style={styles.messageText}
        >
          {message.text}
        </Text>
        <Text 
          variant="caption" 
          color={isOwnMessage ? 'white' : 'secondary'} 
          style={styles.timeText}
        >
          {formatMessageTime()}
          {message.read && isOwnMessage && (
            <Text variant="caption" color="white"> · Read</Text>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.spacing.xs,
    maxWidth: '80%',
  },
  ownMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
  },
  ownMessageBubble: {
    backgroundColor: Colors.primary[500],
  },
  otherMessageBubble: {
    backgroundColor: Colors.neutral[100],
  },
  messageText: {
    marginBottom: 4,
  },
  timeText: {
    alignSelf: 'flex-end',
  },
});

export default MessageItem;