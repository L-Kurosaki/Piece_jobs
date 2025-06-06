export type UserRole = 'customer' | 'provider' | 'both';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface UserRating {
  averageRating: number;
  totalReviews: number;
}

export interface UserSkill {
  name: string;
  yearsOfExperience: number;
  certificates?: string[];
  verificationStatus: VerificationStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  rating: UserRating;
  bio?: string;
  skills: UserSkill[];
  verificationStatus: {
    identity: VerificationStatus;
    address: VerificationStatus;
    background: VerificationStatus;
  };
  memberSince: number; // timestamp
  completedJobs: number;
  activeJobs: number;
}