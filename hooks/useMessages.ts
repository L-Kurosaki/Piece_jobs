import { useState, useEffect } from 'react';
import { 
  getConversations, 
  getMessages, 
  sendMessage, 
  subscribeToMessages 
} from '../utils/supabaseClient';
import { useProfile } from './useProfile';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  voice_message_url?: string;
  read: boolean;
  created_at: string;
  sender?: any;
  receiver?: any;
}

export interface Conversation {
  id: string;
  participants: string[];
  job_id?: string;
  last_message_at: string;
  messages?: Message[];
}

export const useConversations = () => {
  const { profile } = useProfile();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      loadConversations();
    }
  }, [profile]);

  const loadConversations = async () => {
    if (!profile) return;

    try {
      setLoading(true);
      const { data, error } = await getConversations(profile.id);
      
      if (error) {
        setError(error.message);
      } else {
        setConversations(data || []);
      }
    } catch (err) {
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  return {
    conversations,
    loading,
    error,
    refreshConversations: loadConversations,
  };
};

export const useMessages = (conversationId: string) => {
  const { profile } = useProfile();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (conversationId) {
      loadMessages();
      
      // Subscribe to real-time messages
      const subscription = subscribeToMessages(conversationId, (payload) => {
        if (payload.eventType === 'INSERT') {
          setMessages(prev => [...prev, payload.new]);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [conversationId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await getMessages(conversationId);
      
      if (error) {
        setError(error.message);
      } else {
        setMessages(data || []);
      }
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendNewMessage = async (text: string, receiverId: string) => {
    if (!profile) return { success: false, error: 'No profile found' };

    try {
      const { data, error } = await sendMessage({
        conversation_id: conversationId,
        sender_id: profile.id,
        receiver_id: receiverId,
        text,
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (err) {
      return { success: false, error: 'Failed to send message' };
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage: sendNewMessage,
    refreshMessages: loadMessages,
  };
};