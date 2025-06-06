export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number; // timestamp
  read: boolean;
  attachments?: string[]; // URLs to attachments
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  jobId?: string; // Optional, if conversation is related to a specific job
  lastMessage?: Message;
  unreadCount: number;
  createdAt: number; // timestamp
}