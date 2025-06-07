import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/ui/Text';
import Avatar from '../../../components/ui/Avatar';
import MessageItem from '../../../components/message/MessageItem';
import VoiceMessageButton from '../../../components/voice/VoiceMessageButton';
import { 
  getConversationById, 
  getMessagesByConversationId, 
  getUserById,
  getJobById 
} from '../../../utils/mockData';
import { Message } from '../../../types/Message';
import { ChevronLeft, Send, Paperclip, Info } from 'lucide-react-native';

// We'll assume the current user is user1 for this demo
const CURRENT_USER_ID = 'user1';

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [relatedJob, setRelatedJob] = useState(null);

  useEffect(() => {
    if (id) {
      // Get conversation data
      const conversationData = getConversationById(id);
      if (conversationData) {
        setConversation(conversationData);
        
        // Get messages
        const conversationMessages = getMessagesByConversationId(id);
        setMessages(conversationMessages);
        
        // Get other user
        const otherUserId = conversationData.participants.find(
          userId => userId !== CURRENT_USER_ID
        );
        if (otherUserId) {
          const userData = getUserById(otherUserId);
          setOtherUser(userData);
        }
        
        // Get related job if exists
        if (conversationData.jobId) {
          const jobData = getJobById(conversationData.jobId);
          setRelatedJob(jobData);
        }
      }
    }
  }, [id]);

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || newMessage;
    if (textToSend.trim() === '') return;
    
    // Create a new message
    const message: Message = {
      id: `msg-${Date.now()}`,
      conversationId: id,
      senderId: CURRENT_USER_ID,
      receiverId: otherUser?.id || '',
      text: textToSend,
      timestamp: Date.now(),
      read: false,
    };
    
    // Update messages
    setMessages([...messages, message]);
    setNewMessage('');
    
    // In a real app, we would send the message to the API
  };

  const handleVoiceReply = (replyText: string) => {
    handleSendMessage(replyText);
  };

  if (!conversation || !otherUser) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading conversation...</Text>
      </SafeAreaView>
    );
  }

  // Get the latest message from the other user for voice reply
  const latestOtherMessage = messages
    .filter(msg => msg.senderId !== CURRENT_USER_ID)
    .sort((a, b) => b.timestamp - a.timestamp)[0];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={Colors.primary[500]} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.userInfo} 
          onPress={() => console.log('View user profile')}
        >
          <Avatar
            source={otherUser.avatar}
            size="sm"
            initials={otherUser.name.split(' ').map(n => n[0]).join('')}
          />
          <View style={styles.nameContainer}>
            <Text variant="body1" weight="semibold">
              {otherUser.name}
            </Text>
            {relatedJob && (
              <Text variant="caption" color="secondary">
                {relatedJob.title}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoButton}>
          <Info size={24} color={Colors.primary[500]} />
        </TouchableOpacity>
      </View>

      {/* Voice Reply Button */}
      {latestOtherMessage && (
        <View style={styles.voiceReplyContainer}>
          <VoiceMessageButton
            message={latestOtherMessage}
            job={relatedJob}
            onReply={handleVoiceReply}
          />
        </View>
      )}
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageItem
            message={item}
            isOwnMessage={item.senderId === CURRENT_USER_ID}
          />
        )}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.attachButton}>
          <Paperclip size={24} color={Colors.neutral[500]} />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          placeholderTextColor={Colors.neutral[400]}
          multiline
        />
        
        <TouchableOpacity 
          style={[
            styles.sendButton,
            newMessage.trim() === '' && styles.sendButtonDisabled
          ]}
          onPress={() => handleSendMessage()}
          disabled={newMessage.trim() === ''}
        >
          <Send size={20} color={newMessage.trim() === '' ? Colors.neutral[400] : Colors.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
      {relatedJob && relatedJob.status === 'pending' && (
        <View style={styles.footer}>
          <Text variant="body2" color="secondary">
            This conversation is about a job that is still pending.
          </Text>
          {relatedJob.providerId !== CURRENT_USER_ID && (
            <TouchableOpacity onPress={() => router.push(`/jobs/${relatedJob.id}`)}>
              <Text variant="body2" color="primary" weight="semibold">
                View Job
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  backButton: {
    padding: 4,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Layout.spacing.sm,
  },
  nameContainer: {
    marginLeft: Layout.spacing.sm,
  },
  infoButton: {
    padding: 4,
  },
  voiceReplyContainer: {
    padding: Layout.spacing.md,
    backgroundColor: Colors.neutral[50],
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
    alignItems: 'center',
  },
  messagesList: {
    padding: Layout.spacing.md,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    backgroundColor: Colors.white,
  },
  attachButton: {
    padding: Layout.spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.neutral[100],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    maxHeight: 100,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  sendButton: {
    backgroundColor: Colors.primary[500],
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.neutral[300],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.md,
    backgroundColor: Colors.neutral[100],
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
});