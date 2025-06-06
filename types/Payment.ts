export interface Payment {
  id: string;
  jobId: string;
  customerId: string;
  providerId: string;
  amount: number;
  commission: number;
  bookingFee: number;
  netAmount: number; // amount - commission - bookingFee
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'bank_transfer' | 'wallet' | 'cash';
  transactionId?: string;
  createdAt: number;
  completedAt?: number;
  refundedAt?: number;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  status: 'active' | 'suspended' | 'closed';
  createdAt: number;
  updatedAt: number;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  reference?: string; // job ID, payment ID, etc.
  balanceBefore: number;
  balanceAfter: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface CommissionSettings {
  id: string;
  category: string;
  commissionRate: number; // percentage (e.g., 0.15 for 15%)
  bookingFee: number; // flat fee
  minimumCommission: number;
  maximumCommission: number;
  effectiveFrom: number;
  effectiveTo?: number;
}