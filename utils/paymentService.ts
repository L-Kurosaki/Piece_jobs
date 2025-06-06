import { Payment, Wallet, Transaction, CommissionSettings } from '../types/Payment';
import { Job } from '../types/Job';

class PaymentService {
  private commissionSettings: CommissionSettings[] = [
    {
      id: 'cleaning-commission',
      category: 'cleaning',
      commissionRate: 0.15, // 15%
      bookingFee: 10, // R10
      minimumCommission: 20, // R20
      maximumCommission: 100, // R100
      effectiveFrom: Date.now(),
    },
    {
      id: 'gardening-commission',
      category: 'gardening',
      commissionRate: 0.12, // 12%
      bookingFee: 8, // R8
      minimumCommission: 15, // R15
      maximumCommission: 80, // R80
      effectiveFrom: Date.now(),
    },
    {
      id: 'maintenance-commission',
      category: 'maintenance',
      commissionRate: 0.18, // 18%
      bookingFee: 15, // R15
      minimumCommission: 25, // R25
      maximumCommission: 150, // R150
      effectiveFrom: Date.now(),
    },
  ];

  calculatePayment(job: Job, agreedPrice: number): Payment {
    const settings = this.getCommissionSettings(job.category);
    
    let commission = agreedPrice * settings.commissionRate;
    commission = Math.max(settings.minimumCommission, Math.min(commission, settings.maximumCommission));
    
    const netAmount = agreedPrice - commission - settings.bookingFee;

    return {
      id: `payment-${Date.now()}`,
      jobId: job.id,
      customerId: job.customerId,
      providerId: job.providerId || '',
      amount: agreedPrice,
      commission,
      bookingFee: settings.bookingFee,
      netAmount,
      status: 'pending',
      paymentMethod: 'card',
      createdAt: Date.now(),
    };
  }

  private getCommissionSettings(category: string): CommissionSettings {
    return this.commissionSettings.find(s => s.category === category) || {
      id: 'default-commission',
      category: 'other',
      commissionRate: 0.15,
      bookingFee: 10,
      minimumCommission: 20,
      maximumCommission: 100,
      effectiveFrom: Date.now(),
    };
  }

  async processPayment(payment: Payment): Promise<boolean> {
    try {
      payment.status = 'processing';
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would integrate with payment gateway
      const success = Math.random() > 0.1; // 90% success rate
      
      if (success) {
        payment.status = 'completed';
        payment.completedAt = Date.now();
        payment.transactionId = `txn-${Date.now()}`;
        
        // Credit provider's wallet
        await this.creditWallet(payment.providerId, payment.netAmount, `Payment for job ${payment.jobId}`);
        
        return true;
      } else {
        payment.status = 'failed';
        return false;
      }
    } catch (error) {
      payment.status = 'failed';
      return false;
    }
  }

  async creditWallet(userId: string, amount: number, description: string): Promise<void> {
    // In a real app, this would update the database
    console.log(`Crediting ${amount} to user ${userId} wallet: ${description}`);
    
    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      walletId: `wallet-${userId}`,
      type: 'credit',
      amount,
      description,
      balanceBefore: 0, // Would fetch from database
      balanceAfter: amount, // Would calculate new balance
      timestamp: Date.now(),
    };
    
    // Save transaction to database
  }

  async debitWallet(userId: string, amount: number, description: string): Promise<boolean> {
    // Check if user has sufficient balance
    const wallet = await this.getWallet(userId);
    
    if (wallet.balance < amount) {
      return false;
    }
    
    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      walletId: wallet.id,
      type: 'debit',
      amount,
      description,
      balanceBefore: wallet.balance,
      balanceAfter: wallet.balance - amount,
      timestamp: Date.now(),
    };
    
    // Update wallet balance and save transaction
    wallet.balance -= amount;
    
    return true;
  }

  async getWallet(userId: string): Promise<Wallet> {
    // In a real app, this would fetch from database
    return {
      id: `wallet-${userId}`,
      userId,
      balance: 0,
      currency: 'ZAR',
      status: 'active',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  async getTransactionHistory(userId: string): Promise<Transaction[]> {
    // In a real app, this would fetch from database
    return [];
  }

  async refundPayment(paymentId: string, reason: string): Promise<boolean> {
    // In a real app, this would process refund through payment gateway
    console.log(`Processing refund for payment ${paymentId}: ${reason}`);
    return true;
  }

  getCommissionBreakdown(category: string, amount: number): {
    commission: number;
    bookingFee: number;
    netAmount: number;
    commissionRate: number;
  } {
    const settings = this.getCommissionSettings(category);
    
    let commission = amount * settings.commissionRate;
    commission = Math.max(settings.minimumCommission, Math.min(commission, settings.maximumCommission));
    
    return {
      commission,
      bookingFee: settings.bookingFee,
      netAmount: amount - commission - settings.bookingFee,
      commissionRate: settings.commissionRate,
    };
  }
}

export const paymentService = new PaymentService();