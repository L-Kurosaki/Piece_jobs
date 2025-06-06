export type JobStatus = 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';

export type JobCategory = 
  | 'cleaning' 
  | 'gardening' 
  | 'maintenance' 
  | 'delivery' 
  | 'moving' 
  | 'cooking'
  | 'other';

export interface Bid {
  id: string;
  jobId: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  price: number;
  message: string;
  rating: number;
  completedJobs: number;
  timestamp: number;
}

export interface Job {
  id: string;
  title: string;
  category: JobCategory;
  description: string;
  images: string[];
  location: {
    address: string;
    latitude: number;
    longitude: number;
    displayDistance: boolean;
  };
  customerId: string;
  customerName: string;
  expectedDuration: number; // In hours
  budget: {
    min: number;
    max: number;
  };
  status: JobStatus;
  postedAt: number; // timestamp
  bids: Bid[];
  acceptedBid?: string; // ID of the accepted bid
  providerId?: string; // ID of the accepted service provider
  startTime?: number; // timestamp when job was started
  endTime?: number; // timestamp when job was completed
}

export type JobFilter = {
  category?: JobCategory;
  maxDistance?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy: 'date' | 'distance' | 'price';
};