import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MessageSquare, Clock } from 'lucide-react-native';

export default function MessagesScreen() {
  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      lastMessage: 'Thanks for the excellent cleaning service!',
      time: '2 min ago',
      unread: true,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      jobTitle: 'House Cleaning',
    },
    {
      id: '2',
      name: 'Mike Chen',
      lastMessage: 'When can you start the garden work?',
      time: '1 hour ago',
      unread: false,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      jobTitle: 'Garden Maintenance',
    },
    {
      id: '3',
      name: 'Lisa Williams',
      lastMessage: 'The plumbing repair looks great!',
      time: '3 hours ago',
      unread: false,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      jobTitle: 'Plumbing Repair',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      
      {conversations.length > 0 ? (
        <ScrollView style={styles.conversationsList}>
          {conversations.map((conversation) => (
            <TouchableOpacity key={conversation.id} style={styles.conversationItem}>
              <Image source={{ uri: conversation.avatar }} style={styles.avatar} />
              
              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.name}>{conversation.name}</Text>
                  <Text style={styles.time}>{conversation.time}</Text>
                </View>
                
                <Text style={styles.jobTitle}>Re: {conversation.jobTitle}</Text>
                
                <View style={styles.messageRow}>
                  <Text 
                    style={[
                      styles.lastMessage,
                      conversation.unread && styles.unreadMessage
                    ]}
                    numberOfLines={1}
                  >
                    {conversation.lastMessage}
                  </Text>
                  {conversation.unread && <View style={styles.unreadDot} />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <MessageSquare size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptyDescription}>
            Start bidding on jobs to connect with customers
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  time: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#999',
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
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
  },
  unreadMessage: {
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0077B6',
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});