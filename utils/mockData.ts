import { Job, JobCategory } from '../types/Job';
import { User } from '../types/User';
import { Conversation, Message } from '../types/Message';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+27123456789',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Looking for reliable service providers in Cape Town.',
    location: {
      address: 'Cape Town, South Africa',
      latitude: -33.9249,
      longitude: 18.4241,
    },
    rating: {
      averageRating: 4.8,
      totalReviews: 12,
    },
    skills: [],
    verificationStatus: {
      identity: 'verified',
      address: 'verified',
      background: 'pending',
    },
    memberSince: Date.now() - 365 * 24 * 60 * 60 * 1000, // 1 year ago
    completedJobs: 8,
    activeJobs: 2,
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+27987654321',
    role: 'provider',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Professional cleaner with 5+ years experience. Available weekdays and weekends.',
    location: {
      address: 'Johannesburg, South Africa',
      latitude: -26.2041,
      longitude: 28.0473,
    },
    rating: {
      averageRating: 4.9,
      totalReviews: 47,
    },
    skills: ['cleaning', 'deep-cleaning', 'office-cleaning'],
    verificationStatus: {
      identity: 'verified',
      address: 'verified',
      background: 'verified',
    },
    memberSince: Date.now() - 2 * 365 * 24 * 60 * 60 * 1000, // 2 years ago
    completedJobs: 156,
    activeJobs: 3,
  },
  {
    id: 'user3',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    phone: '+27555123456',
    role: 'provider',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Experienced gardener and landscaper. Specializing in garden maintenance and design.',
    location: {
      address: 'Durban, South Africa',
      latitude: -29.8587,
      longitude: 31.0218,
    },
    rating: {
      averageRating: 4.7,
      totalReviews: 23,
    },
    skills: ['gardening', 'landscaping', 'tree-trimming'],
    verificationStatus: {
      identity: 'verified',
      address: 'verified',
      background: 'verified',
    },
    memberSince: Date.now() - 18 * 30 * 24 * 60 * 60 * 1000, // 18 months ago
    completedJobs: 89,
    activeJobs: 1,
  },
  {
    id: 'user4',
    name: 'Lisa Chen',
    email: 'lisa@example.com',
    phone: '+27444987654',
    role: 'provider',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Reliable delivery service and moving assistance. Own vehicle and equipment.',
    location: {
      address: 'Pretoria, South Africa',
      latitude: -25.7479,
      longitude: 28.2293,
    },
    rating: {
      averageRating: 4.6,
      totalReviews: 31,
    },
    skills: ['delivery', 'moving', 'courier'],
    verificationStatus: {
      identity: 'verified',
      address: 'verified',
      background: 'verified',
    },
    memberSince: Date.now() - 8 * 30 * 24 * 60 * 60 * 1000, // 8 months ago
    completedJobs: 67,
    activeJobs: 2,
  },
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: 'job1',
    title: 'Deep Clean 3-Bedroom House',
    category: 'cleaning',
    description: 'Need a thorough deep clean of my 3-bedroom house including bathrooms, kitchen, and living areas. House has been empty for a month so needs extra attention.',
    images: [
      'https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    location: {
      address: 'Rondebosch, Cape Town',
      latitude: -33.9579,
      longitude: 18.4738,
    },
    customerId: 'user1',
    expectedDuration: 6,
    budget: {
      min: 800,
      max: 1200,
    },
    status: 'pending',
    postedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    bids: [
      {
        id: 'bid1',
        jobId: 'job1',
        providerId: 'user2',
        price: 950,
        message: 'Hi! I have 5+ years of professional cleaning experience and can provide a thorough deep clean. I bring all my own supplies and equipment. Available this weekend.',
        estimatedDuration: 5.5,
        status: 'pending',
        createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
      },
    ],
  },
  {
    id: 'job2',
    title: 'Garden Maintenance & Lawn Mowing',
    category: 'gardening',
    description: 'Weekly garden maintenance needed including lawn mowing, hedge trimming, and general garden upkeep. Large garden with established plants.',
    images: [
      'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    location: {
      address: 'Sandton, Johannesburg',
      latitude: -26.1076,
      longitude: 28.0567,
    },
    customerId: 'user1',
    expectedDuration: 4,
    budget: {
      min: 400,
      max: 600,
    },
    status: 'in-progress',
    postedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
    acceptedBid: 'bid2',
    providerId: 'user3',
    startTime: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    bids: [
      {
        id: 'bid2',
        jobId: 'job2',
        providerId: 'user3',
        price: 500,
        message: 'I can handle your garden maintenance weekly. I have all the necessary tools and 3+ years experience with large gardens.',
        estimatedDuration: 4,
        status: 'accepted',
        createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
      },
    ],
  },
  {
    id: 'job3',
    title: 'Furniture Delivery & Assembly',
    category: 'delivery',
    description: 'Need help delivering and assembling new bedroom furniture from store to apartment. 2nd floor, no elevator. Includes bed frame, dresser, and nightstand.',
    images: [],
    location: {
      address: 'Sea Point, Cape Town',
      latitude: -33.9057,
      longitude: 18.3932,
    },
    customerId: 'user1',
    expectedDuration: 3,
    budget: {
      min: 300,
      max: 500,
    },
    status: 'pending',
    postedAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    bids: [
      {
        id: 'bid3',
        jobId: 'job3',
        providerId: 'user4',
        price: 400,
        message: 'I can help with the delivery and assembly. I have experience with furniture assembly and my own transport.',
        estimatedDuration: 3,
        status: 'pending',
        createdAt: Date.now() - 12 * 60 * 60 * 1000,
      },
    ],
  },
  {
    id: 'job4',
    title: 'Office Cleaning - Weekly Service',
    category: 'cleaning',
    description: 'Looking for reliable weekly office cleaning service. Small office with 3 rooms, kitchen area, and 2 bathrooms. Prefer early morning or evening.',
    images: [
      'https://images.pexels.com/photos/7414284/pexels-photo-7414284.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    location: {
      address: 'Century City, Cape Town',
      latitude: -33.8908,
      longitude: 18.4695,
    },
    customerId: 'user1',
    expectedDuration: 2.5,
    budget: {
      min: 250,
      max: 400,
    },
    status: 'completed',
    postedAt: Date.now() - 14 * 24 * 60 * 60 * 1000, // 2 weeks ago
    acceptedBid: 'bid4',
    providerId: 'user2',
    startTime: Date.now() - 10 * 24 * 60 * 60 * 1000,
    endTime: Date.now() - 10 * 24 * 60 * 60 * 1000 + 2.5 * 60 * 60 * 1000,
    bids: [
      {
        id: 'bid4',
        jobId: 'job4',
        providerId: 'user2',
        price: 320,
        message: 'I can provide weekly office cleaning service. I have experience with commercial cleaning and can work flexible hours.',
        estimatedDuration: 2.5,
        status: 'accepted',
        createdAt: Date.now() - 13 * 24 * 60 * 60 * 1000,
      },
    ],
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['user1', 'user2'],
    jobId: 'job1',
    lastMessageAt: Date.now() - 30 * 60 * 1000, // 30 minutes ago
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'conv2',
    participants: ['user1', 'user3'],
    jobId: 'job2',
    lastMessageAt: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'conv3',
    participants: ['user1', 'user4'],
    jobId: 'job3',
    lastMessageAt: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  // Conversation 1 (user1 & user2 about job1)
  {
    id: 'msg1',
    conversationId: 'conv1',
    senderId: 'user2',
    receiverId: 'user1',
    text: 'Hi! I saw your cleaning job posting. I have availability this weekend and can provide all the supplies needed.',
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    read: true,
  },
  {
    id: 'msg2',
    conversationId: 'conv1',
    senderId: 'user1',
    receiverId: 'user2',
    text: 'Great! What time would work best for you on Saturday?',
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000,
    read: true,
  },
  {
    id: 'msg3',
    conversationId: 'conv1',
    senderId: 'user2',
    receiverId: 'user1',
    text: 'I can start at 9 AM and should be finished by 3 PM. Does that work for you?',
    timestamp: Date.now() - 30 * 60 * 1000,
    read: false,
  },

  // Conversation 2 (user1 & user3 about job2)
  {
    id: 'msg4',
    conversationId: 'conv2',
    senderId: 'user3',
    receiverId: 'user1',
    text: 'I\'m on my way to start the garden maintenance. Should be there in about 15 minutes.',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    read: true,
  },
  {
    id: 'msg5',
    conversationId: 'conv2',
    senderId: 'user1',
    receiverId: 'user3',
    text: 'Perfect! The gate code is 1234. Let me know if you need anything.',
    timestamp: Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000,
    read: true,
  },

  // Conversation 3 (user1 & user4 about job3)
  {
    id: 'msg6',
    conversationId: 'conv3',
    senderId: 'user4',
    receiverId: 'user1',
    text: 'Hi! I can help with the furniture delivery and assembly. When would you like to schedule this?',
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    read: true,
  },
];

// Helper functions
export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getConversationById = (id: string): Conversation | undefined => {
  return mockConversations.find(conv => conv.id === id);
};

export const getMessagesByConversationId = (conversationId: string): Message[] => {
  return mockMessages
    .filter(msg => msg.conversationId === conversationId)
    .sort((a, b) => a.timestamp - b.timestamp);
};

export const getJobsByCategory = (category: JobCategory): Job[] => {
  return mockJobs.filter(job => job.category === category);
};

export const getJobsByStatus = (status: string): Job[] => {
  return mockJobs.filter(job => job.status === status);
};

export const getBidsByJobId = (jobId: string) => {
  const job = getJobById(jobId);
  return job?.bids || [];
};

export const getBidsByProviderId = (providerId: string) => {
  return mockJobs.flatMap(job => 
    job.bids.filter(bid => bid.providerId === providerId)
  );
};