import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/ui/Text';
import ConversationItem from '../../../components/message/ConversationItem';
import { 
  mockConversations, 
  getJobById, 
  getUserById,
  mockUsers
} from '../../../utils/mockData';
import { Conversation } from '../../../types/Message';
import { User } from '../../../types/User';
import { Job } from '../../../types/Job';
import { Search } from 'lucide-react-native';

// We'll assume the current user is user1 for this demo
const CURRENT_USER_ID = 'user1';

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const userConversations = mockConversations.filter(conv => 
      conv.participants.includes(CURRENT_USER_ID)
    );
    setConversations(userConversations);
  }, []);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    if (searchQuery.trim() === '') return true;
    
    // Find the other participant
    const otherUserId = conversation.participants.find(id => id !== CURRENT_USER_ID);
    if (!otherUserId) return false;
    
    // Get the other user's data
    const otherUser = getUserById(otherUserId);
    if (!otherUser) return false;
    
    // Search by name
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Get other user from conversation
  const getOtherUser = (conversation: Conversation): User => {
    const otherUserId = conversation.participants.find(id => id !== CURRENT_USER_ID);
    return getUserById(otherUserId || '') || mockUsers[0]; // Fallback to first user if not found
  };

  // Get job from conversation if it exists
  const getJobFromConversation = (conversation: Conversation): Job | undefined => {
    if (!conversation.jobId) return undefined;
    return getJobById(conversation.jobId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h3" weight="bold" style={styles.title}>
          Messages
        </Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.neutral[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.neutral[400]}
          />
        </View>
      </View>

      {filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationItem
              conversation={item}
              otherUser={getOtherUser(item)}
              job={getJobFromConversation(item)}
              onPress={() => router.push(`/messages/${item.id}`)}
            />
          )}
          contentContainerStyle={styles.conversationsList}
        />
      ) : (
        <View style={styles.emptyState}>
          {searchQuery.trim() !== '' ? (
            <Text variant="body1\" color="secondary\" centered>
              No conversations found matching "{searchQuery}"
            </Text>
          ) : (
            <>
              <Text variant="body1" color="secondary" centered>
                You don't have any messages yet
              </Text>
              <Text variant="body2" color="secondary" centered style={styles.emptyStateSubtext}>
                Start bidding on jobs or post a job to connect with service providers
              </Text>
            </>
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
  header: {
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  title: {
    marginBottom: Layout.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: Layout.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: Colors.neutral[900],
    fontFamily: 'Poppins-Regular',
  },
  conversationsList: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  emptyStateSubtext: {
    marginTop: Layout.spacing.sm,
    textAlign: 'center',
  },
});