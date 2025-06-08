import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { voiceService } from '../../utils/voiceService';
import { Search, MessageSquare, Volume2 } from 'lucide-react-native';

export default function MessagesScreen() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      // For now, we'll create mock conversations since the schema is complex
      const mockConversations = [
        {
          id: '1',
          other_user_name: 'Sarah Johnson',
          last_message: 'Hi! I\'m interested in your cleaning job. When would be a good time to start?',
          last_message_time: new Date().toISOString(),
          unread_count: 2,
          job_title: 'House Cleaning - 3 Bedroom Home',
        },
        {
          id: '2',
          other_user_name: 'Mike Wilson',
          last_message: 'The garden maintenance is complete. Please let me know if you\'re satisfied with the work.',
          last_message_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          unread_count: 0,
          job_title: 'Garden Maintenance',
        },
      ];
      setConversations(mockConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.other_user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.last_message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageVoice = async (message: string, senderName: string) => {
    setIsPlayingVoice(true);
    try {
      await voiceService.readMessageAloud(message, senderName);
    } catch (error) {
      console.error('Voice error:', error);
    } finally {
      setIsPlayingVoice(false);
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const renderConversation = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.conversationCard}
      onPress={() => router.push(`/(tabs)/messages/${item.id}`)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.other_user_name.split(' ').map((n: string) => n[0]).join('')}
        </Text>
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.userName}>{item.other_user_name}</Text>
          <Text style={styles.timeText}>{formatTime(item.last_message_time)}</Text>
        </View>
        
        {item.job_title && (
          <Text style={styles.jobTitle}>Re: {item.job_title}</Text>
        )}
        
        <View style={styles.messageRow}>
          <Text 
            style={[
              styles.lastMessage,
              item.unread_count > 0 && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.last_message}
          </Text>
          
          <TouchableOpacity 
            onPress={() => handleMessageVoice(item.last_message, item.other_user_name)}
            disabled={isPlayingVoice}
            style={styles.voiceButton}
          >
            <Volume2 size={16} color={isPlayingVoice ? "#ccc" : "#0077B6"} />
          </TouchableOpacity>
        </View>
        
        {item.unread_count > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread_count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={styles.conversationsList}
        refreshing={loading}
        onRefresh={loadConversations}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MessageSquare size={48} color="#ccc" />
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptyDescription}>
              {searchQuery ? `No conversations found matching "${searchQuery}"` : 'Start bidding on jobs to connect with customers'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const Text = ({ children, style, ...props }: any) => (
  <text style={[{ fontFamily: 'Poppins-Regular', color: '#333' }, style]} {...props}>
    {children}
  </text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  conversationsList: {
    flexGrow: 1,
  },
  conversationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0077B6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  conversationContent: {
    flex: 1,
    position: 'relative',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#0077B6',
    marginBottom: 4,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  voiceButton: {
    padding: 4,
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#0077B6',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    marginTop: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#999',
    textAlign: 'center',
  },
});