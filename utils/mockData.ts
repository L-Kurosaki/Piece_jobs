import { Job, JobCategory } from '../types/Job';
import { User } from '../types/User';
import { Conversation, Message } from '../types/Message';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Customer',
    email: 'john@example.com',
    phone: '+27123456789',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: {
      address: 'Cape Town, South Africa',
      latitude: -33.9249,
      longitude: 18.4241,
    },
    rating: {
      averageRating: 4.8,
      totalReviews: 12,
    },
    bio: 'Regular customer looking for reliable service providers.',
    skills: [],
    verificationStatus: {
      identity: 'verified',
      address: 'verified',
      background: 'verified',
    },
    memberSince: Date.now() - 90 * 24 * 60 * 60 * 1000, // 90 days ago
    completedJobs: 15,
    activeJobs: 2,
  },
  {
    id: 'provider1',
    name: 'Sarah Provider',
    email: 'sarah@example.com',
    phone: '+27987654321',
    role: 'provider',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: {
      address: 'Johannesburg, South Africa',
      latitude: -26.2041,
      longitude: 28.0473,
    },
    rating: {
      averageRating: 4.9,
      totalReviews: 47,
    },
    bio: 'Professional cleaner with 5+ years of experience in residential and commercial cleaning.',
    skills: [
      {
        name: 'Cleaning',
        yearsOfExperience: 5,
        certificates: ['Professional Cleaning Certificate'],
        verificationStatus: 'verified',
      },
      {
        name: 'Gardening',
        yearsOfExperience: 2,
        verificationStatus: 'verified',
      },
    ],
    verificationStatus: {
      identity: 'verified',
      address: 'verified',
      background: 'verified',
    },
    memberSince: Date.now() - 180 * 24 * 60 * 60 * 1000, // 180 days ago
    completedJobs: 52,
    activeJobs: 3,
  },
  {
    id: 'provider2',
    name: 'David Handyman',
    email: 'david@example.com',
    phone: '+27765432198',
    role: 'provider',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: {
      address: 'Durban, South Africa',
      latitude: -29.8587,
      longitude: 31.0218,
    },
    rating: {
      averageRating: 4.7,
      totalReviews: 33,
    },
    bio: 'Experienced handyman specializing in household repairs and maintenance.',
    skills: [
      {
        name: 'Maintenance',
        yearsOfExperience: 8,
        certificates: ['Electrical Certificate'],
        verificationStatus: 'verified',
      },
      {
        name: 'Gardening',
        yearsOfExperience: 3,
        verificationStatus: 'verified',
      },
    ],
    verificationStatus: {
      identity: 'verified',
      address: 'verified',
      background: 'verified',
    },
    memberSince: Date.now() - 220 * 24 * 60 * 60 * 1000, // 220 days ago
    completedJobs: 38,
    activeJobs: 2,
  },
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: 'job1',
    title: 'House Cleaning - 3 Bedroom Home',
    category: 'cleaning',
    description: 'Need a thorough cleaning of my 3-bedroom house, including kitchen and bathrooms. Should take approximately 4 hours.',
    images: [
      'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4107268/pexels-photo-4107268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    location: {
      address: 'Cape Town, South Africa',
      latitude: -33.9249,
      longitude: 18.4241,
      displayDistance: true,
    },
    customerId: 'user1',
    customerName: 'John Customer',
    expectedDuration: 4,
    budget: {
      min: 300,
      max: 500,
    },
    status: 'pending',
    postedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    bids: [
      {
        id: 'bid1',
        jobId: 'job1',
        providerId: 'provider1',
        providerName: 'Sarah Provider',
        providerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 400,
        message: 'I can do a thorough cleaning of your home. I bring my own cleaning supplies and have experience with all types of surfaces.',
        rating: 4.9,
        completedJobs: 52,
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      },
    ],
  },
  {
    id: 'job2',
    title: 'Garden Maintenance',
    category: 'gardening',
    description: 'Looking for someone to mow the lawn, trim hedges, and do general garden maintenance. Approximately 3 hours of work.',
    images: [
      'https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1159693/pexels-photo-1159693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    location: {
      address: 'Johannesburg, South Africa',
      latitude: -26.2041,
      longitude: 28.0473,
      displayDistance: true,
    },
    customerId: 'user1',
    customerName: 'John Customer',
    expectedDuration: 3,
    budget: {
      min: 200,
      max: 350,
    },
    status: 'accepted',
    postedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    bids: [
      {
        id: 'bid2',
        jobId: 'job2',
        providerId: 'provider2',
        providerName: 'David Handyman',
        providerAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 300,
        message: 'I have all the necessary tools for garden maintenance and can make your garden look great!',
        rating: 4.7,
        completedJobs: 38,
        timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
      },
    ],
    acceptedBid: 'bid2',
    providerId: 'provider2',
    startTime: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
  },
  {
    id: 'job3',
    title: 'Furniture Assembly',
    category: 'maintenance',
    description: 'Need help assembling a new bed frame and wardrobe. All tools should be provided by the service provider.',
    images: [
      'https://images.pexels.com/photos/698170/pexels-photo-698170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5331071/pexels-photo-5331071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    location: {
      address: 'Durban, South Africa',
      latitude: -29.8587,
      longitude: 31.0218,
      displayDistance: true,
    },
    customerId: 'user1',
    customerName: 'John Customer',
    expectedDuration: 2,
    budget: {
      min: 250,
      max: 400,
    },
    status: 'completed',
    postedAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    bids: [
      {
        id: 'bid3',
        jobId: 'job3',
        providerId: 'provider2',
        providerName: 'David Handyman',
        providerAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 350,
        message: 'I\'m experienced with furniture assembly and have all the necessary tools. I can complete this job efficiently.',
        rating: 4.7,
        completedJobs: 38,
        timestamp: Date.now() - 9 * 24 * 60 * 60 * 1000, // 9 days ago
      },
    ],
    acceptedBid: 'bid3',
    providerId: 'provider2',
    startTime: Date.now() - 8 * 24 * 60 * 60 * 1000, // 8 days ago
    endTime: Date.now() - 8 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000, // 8 days ago + 2 hours
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['user1', 'provider1'],
    jobId: 'job1',
    unreadCount: 2,
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
  },
  {
    id: 'conv2',
    participants: ['user1', 'provider2'],
    jobId: 'job2',
    unreadCount: 0,
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
  },
];

// Mock Messages
export const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: 'msg1',
      conversationId: 'conv1',
      senderId: 'provider1',
      receiverId: 'user1',
      text: 'Hello! I\'m interested in your house cleaning job. Are there any specific areas you want me to focus on?',
      timestamp: Date.now() - 23 * 60 * 60 * 1000, // 23 hours ago
      read: true,
    },
    {
      id: 'msg2',
      conversationId: 'conv1',
      senderId: 'user1',
      receiverId: 'provider1',
      text: 'Hi Sarah! Yes, please focus on the bathrooms and kitchen. They need extra attention.',
      timestamp: Date.now() - 22 * 60 * 60 * 1000, // 22 hours ago
      read: true,
    },
    {
      id: 'msg3',
      conversationId: 'conv1',
      senderId: 'provider1',
      receiverId: 'user1',
      text: 'No problem! I have experience with deep cleaning kitchens and bathrooms. Would you like me to bring any special cleaning products?',
      timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
      read: false,
    },
    {
      id: 'msg4',
      conversationId: 'conv1',
      senderId: 'provider1',
      receiverId: 'user1',
      text: 'Also, do you have any pets I should be aware of?',
      timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      read: false,
    },
  ],
  conv2: [
    {
      id: 'msg5',
      conversationId: 'conv2',
      senderId: 'provider2',
      receiverId: 'user1',
      text: 'I\'ll be at your place tomorrow at 9 AM for the garden maintenance. Does that work for you?',
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
      read: true,
    },
    {
      id: 'msg6',
      conversationId: 'conv2',
      senderId: 'user1',
      receiverId: 'provider2',
      text: 'Yes, 9 AM works perfectly. See you tomorrow!',
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000, // 3 days ago + 30 minutes
      read: true,
    },
    {
      id: 'msg7',
      conversationId: 'conv2',
      senderId: 'provider2',
      receiverId: 'user1',
      text: 'I finished the job. Everything looks great! Please let me know if you\'re happy with the results.',
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000, // 1 day ago + 6 hours
      read: true,
    },
    {
      id: 'msg8',
      conversationId: 'conv2',
      senderId: 'user1',
      receiverId: 'provider2',
      text: 'The garden looks fantastic! Thank you for your excellent work. I\'ve left you a 5-star review.',
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000, // 1 day ago + 8 hours
      read: true,
    },
  ],
};

export const getJobById = (jobId: string): Job | undefined => {
  return mockJobs.find((job) => job.id === jobId);
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find((user) => user.id === userId);
};

export const getConversationById = (conversationId: string): Conversation | undefined => {
  return mockConversations.find((conversation) => conversation.id === conversationId);
};

export const getMessagesByConversationId = (conversationId: string): Message[] => {
  return mockMessages[conversationId] || [];
};

export const getConversationsByUserId = (userId: string): Conversation[] => {
  return mockConversations.filter((conversation) => 
    conversation.participants.includes(userId)
  );
};

export const getJobsByCustomerId = (customerId: string): Job[] => {
  return mockJobs.filter((job) => job.customerId === customerId);
};

export const getJobsByProviderId = (providerId: string): Job[] => {
  return mockJobs.filter((job) => job.providerId === providerId);
};

export default {
  users: mockUsers,
  jobs: mockJobs,
  conversations: mockConversations,
  messages: mockMessages,
  getJobById,
  getUserById,
  getConversationById,
  getMessagesByConversationId,
  getConversationsByUserId,
  getJobsByCustomerId,
  getJobsByProviderId,
};