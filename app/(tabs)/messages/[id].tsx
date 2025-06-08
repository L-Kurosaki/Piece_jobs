import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/ui/Text';
import Avatar from '../../../components/ui/Avatar';
import MessageItem from '../../../components/message/MessageItem';
import VoiceMessagePlayer from '../../../components/voice/VoiceMessagePlayer';
import { 
  getConversationById, 
  getMessagesByConversationId, 
  getUserById,
  getJobById 
} from '../../../utils/mockData';
import { Message } from '../../../types/Message';
import { ChevronLeft, Send, Paperclip, Volume2 } from 'lucide-react-native';

// We'll assume the current user is user1 for this demo
const CURRENT_USER_ID = 'user1';

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [relatedJob, setRelatedJob] = useState(null);
  const [showVoicePlayer, setShowVoicePlayer] = useState(false);
  const [lastMessage, setLastMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (id) {
      // Get conversation data
      const conversationData = getConversationById(id);
      if (conversationData) {
        setConversation(conversationData);
        
        // Get messages
        const conversationMessages = getMessagesByConversationId(id);
        setMessages(conversationMessages);
        
        // Set last message for voice player
        if (conversationMessages.length > 0) {
          const lastMsg = conversationMessages[conversationMessages.length - 1];
          if (lastMsg.senderId !== CURRENT_USER_ID) {
            setLastMessage(lastMsg);
            setShowVoicePlayer(true);
          }
        }
        
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

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Create a new message
    const message: Message = {
      id: `msg-${Date.now()}`,
      conversationId: id,
      senderId: CURRENT_USER_ID,
      receiverId: otherUser?.id || '',
      text: newMessage,
      timestamp: Date.now(),
      read: false,
    };
    
    // Update messages
    setMessages([...messages, message]);
    setNewMessage('');
    setShowVoicePlayer(false);
    
    // In a real app, we would send the message to the API
  };

  const handleVoiceResponse = (responseText: string) => {
    // Create a new message from voice response
    const message: Message = {
      id: `msg-${Date.now()}`,
      conversationId: id,
      senderId: CURRENT_USER_ID,
      receiverId: otherUser?.id || '',
      text: responseText,
      timestamp: Date.now(),
      read: false,
    };
    
    // Update messages
    setMessages([...messages, message]);
    setShowVoicePlayer(false);
    
    // Show success feedback
    Alert.alert(
      'Voice Message Sent! 🎤',
      'Your voice message has been converted to text and sent successfully.',
      [{ text: 'Great!', style: 'default' }]
    );
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/messages');
    }
  };

  if (!conversation || !otherUser) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading conversation...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
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
        
        <TouchableOpacity 
          style={styles.voiceToggle}
          onPress={() => setShowVoicePlayer(!showVoicePlayer)}
        >
          <Volume2 size={24} color={showVoicePlayer ? Colors.primary[500] : Colors.neutral[400]} />
        </TouchableOpacity>
      </View>

      {/* Voice Message Player */}
      {showVoicePlayer && lastMessage && (
        <VoiceMessagePlayer
          message={lastMessage.text}
          senderName={otherUser.name}
          onVoiceResponse={handleVoiceResponse}
          showVoiceResponse={true}
        />
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
          onPress={handleSendMessage}
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
            <TouchableOpacity onPress={() => router.push(`/(tabs)/jobs/${relatedJob.id}`)}>
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
  voiceToggle: {
    padding: 4,
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