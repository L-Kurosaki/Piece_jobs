import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Conversation } from '../../types/Message';
import { User } from '../../types/User';
import { Job } from '../../types/Job';
import Text from '../ui/Text';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

interface ConversationItemProps {
  conversation: Conversation;
  otherUser: User;
  job?: Job;
  onPress: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  otherUser,
  job,
  onPress,
}) => {
  // Format the last message timestamp
  const getFormattedTime = () => {
    if (!conversation.lastMessage) return '';
    
    const now = Date.now();
    const messageTime = conversation.lastMessage.timestamp;
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 24 * 60) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / (24 * 60));
      return `${diffInDays}d ago`;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Avatar
        source={otherUser.avatar}
        size="md"
        initials={otherUser.name.split(' ').map(n => n[0]).join('')}
        verified={otherUser.verificationStatus.identity === 'verified'}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text variant="body1" weight="semibold" numberOfLines={1} style={styles.name}>
            {otherUser.name}
          </Text>
          <Text variant="caption" color="secondary">
            {getFormattedTime()}
          </Text>
        </View>
        
        {job && (
          <View style={styles.jobRow}>
            <Text variant="caption" color="secondary" numberOfLines={1}>
              Re: {job.title}
            </Text>
          </View>
        )}
        
        <View style={styles.messageRow}>
          <Text 
            variant="body2" 
            color="secondary" 
            numberOfLines={1}
            style={[
              styles.lastMessage,
              conversation.unreadCount > 0 && styles.unreadMessage,
            ]}
          >
            {conversation.lastMessage?.text || 'Start a conversation'}
          </Text>
          
          {conversation.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text variant="caption" color="white" weight="semibold">
                {conversation.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  contentContainer: {
    flex: 1,
    marginLeft: Layout.spacing.md,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  jobRow: {
    marginBottom: 2,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  unreadMessage: {
    fontWeight: 'bold',
  },
  unreadBadge: {
    backgroundColor: Colors.primary[500],
    borderRadius: Layout.borderRadius.circle,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConversationItem;