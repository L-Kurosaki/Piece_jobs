import { Platform } from 'react-native';
import { voiceService } from './voiceService';

export interface UserBehaviorData {
  userId: string;
  jobCompletionRate: number;
  averageResponseTime: number;
  preferredJobTypes: string[];
  peakWorkingHours: number[];
  bidWinRate: number;
  customerSatisfaction: number;
  earningsGrowth: number;
  strugglingAreas: string[];
  strengths: string[];
  lastActive: number;
}

export interface MarketIntelligence {
  demandTrends: Record<string, number>;
  pricingInsights: Record<string, { min: number; max: number; optimal: number }>;
  competitorAnalysis: Record<string, number>;
  seasonalPatterns: Record<string, number>;
  customerPreferences: Record<string, string[]>;
}

export interface LearningContext {
  userLevel: 'beginner' | 'intermediate' | 'expert';
  currentGoals: string[];
  recentChallenges: string[];
  successPatterns: string[];
  personalizedTips: string[];
}

class AILearningService {
  private userProfiles: Map<string, UserBehaviorData> = new Map();
  private marketData: MarketIntelligence;
  private learningContexts: Map<string, LearningContext> = new Map();

  constructor() {
    this.marketData = {
      demandTrends: {
        'cleaning': 85,
        'gardening': 70,
        'maintenance': 90,
        'delivery': 60,
        'moving': 45,
      },
      pricingInsights: {
        'cleaning': { min: 200, max: 600, optimal: 380 },
        'gardening': { min: 150, max: 400, optimal: 280 },
        'maintenance': { min: 300, max: 800, optimal: 520 },
      },
      competitorAnalysis: {
        'cleaning': 0.75, // 75% market saturation
        'gardening': 0.60,
        'maintenance': 0.85,
      },
      seasonalPatterns: {
        'spring_cleaning': 1.4,
        'summer_gardening': 1.6,
        'winter_maintenance': 1.2,
      },
      customerPreferences: {
        'communication': ['quick_response', 'professional_tone', 'clear_pricing'],
        'service_quality': ['punctuality', 'attention_to_detail', 'cleanup'],
        'booking': ['flexible_scheduling', 'same_day_service', 'weekend_availability'],
      },
    };
  }

  // Learn from user behavior and update knowledge base
  updateUserProfile(userId: string, behaviorData: Partial<UserBehaviorData>): void {
    const existing = this.userProfiles.get(userId) || this.createDefaultProfile(userId);
    const updated = { ...existing, ...behaviorData, lastActive: Date.now() };
    this.userProfiles.set(userId, updated);
    
    // Update learning context based on new data
    this.updateLearningContext(userId, updated);
  }

  private createDefaultProfile(userId: string): UserBehaviorData {
    return {
      userId,
      jobCompletionRate: 0,
      averageResponseTime: 0,
      preferredJobTypes: [],
      peakWorkingHours: [],
      bidWinRate: 0,
      customerSatisfaction: 0,
      earningsGrowth: 0,
      strugglingAreas: [],
      strengths: [],
      lastActive: Date.now(),
    };
  }

  // AI learns and updates context based on user behavior
  private updateLearningContext(userId: string, profile: UserBehaviorData): void {
    const context: LearningContext = {
      userLevel: this.determineUserLevel(profile),
      currentGoals: this.identifyGoals(profile),
      recentChallenges: this.identifyChallenges(profile),
      successPatterns: this.identifySuccessPatterns(profile),
      personalizedTips: this.generatePersonalizedTips(profile),
    };
    
    this.learningContexts.set(userId, context);
  }

  // AI makes intelligent inferences about user level
  private determineUserLevel(profile: UserBehaviorData): 'beginner' | 'intermediate' | 'expert' {
    const completedJobs = profile.jobCompletionRate * 100; // Assuming rate is 0-1
    const winRate = profile.bidWinRate;
    const satisfaction = profile.customerSatisfaction;

    if (completedJobs < 10 || winRate < 0.3) return 'beginner';
    if (completedJobs < 50 || winRate < 0.6 || satisfaction < 4.0) return 'intermediate';
    return 'expert';
  }

  // AI identifies user goals based on behavior patterns
  private identifyGoals(profile: UserBehaviorData): string[] {
    const goals: string[] = [];
    
    if (profile.bidWinRate < 0.4) goals.push('improve_bid_success');
    if (profile.customerSatisfaction < 4.5) goals.push('increase_ratings');
    if (profile.earningsGrowth < 0.1) goals.push('boost_earnings');
    if (profile.averageResponseTime > 2) goals.push('faster_responses');
    
    return goals;
  }

  // AI learns from struggles and patterns
  private identifyChallenges(profile: UserBehaviorData): string[] {
    const challenges: string[] = [];
    
    if (profile.bidWinRate < 0.3) challenges.push('pricing_strategy');
    if (profile.averageResponseTime > 4) challenges.push('response_time');
    if (profile.customerSatisfaction < 4.0) challenges.push('service_quality');
    
    return challenges;
  }

  // AI identifies what's working for the user
  private identifySuccessPatterns(profile: UserBehaviorData): string[] {
    const patterns: string[] = [];
    
    if (profile.bidWinRate > 0.7) patterns.push('effective_bidding');
    if (profile.customerSatisfaction > 4.5) patterns.push('excellent_service');
    if (profile.earningsGrowth > 0.2) patterns.push('growing_income');
    
    return patterns;
  }

  // AI generates personalized tips based on learning
  private generatePersonalizedTips(profile: UserBehaviorData): string[] {
    const tips: string[] = [];
    const level = this.determineUserLevel(profile);
    
    // Adaptive tips based on user level and performance
    if (level === 'beginner') {
      tips.push('Focus on building your profile with clear photos and descriptions');
      tips.push('Start with smaller jobs to build ratings and experience');
      tips.push('Respond to job posts within 30 minutes for better chances');
    } else if (level === 'intermediate') {
      if (profile.bidWinRate < 0.5) {
        tips.push('Try adjusting your pricing strategy - you might be pricing too high');
        tips.push('Include more details about your experience in bid messages');
      }
      tips.push('Consider specializing in your strongest job categories');
      tips.push('Ask satisfied customers for referrals to grow your business');
    } else {
      tips.push('You could increase your rates - customers clearly value your work');
      tips.push('Consider offering premium services or packages');
      tips.push('Mentor newer providers to build your reputation in the community');
    }

    // Market-based tips
    const highDemandCategories = Object.entries(this.marketData.demandTrends)
      .filter(([_, demand]) => demand > 80)
      .map(([category]) => category);
    
    if (highDemandCategories.length > 0) {
      tips.push(`High demand right now: ${highDemandCategories.join(', ')}`);
    }

    return tips;
  }

  // Generate adaptive voice responses based on learning
  async generateAdaptiveVoiceResponse(userId: string, context: 'daily_summary' | 'tutorial' | 'encouragement'): Promise<string> {
    const profile = this.userProfiles.get(userId);
    const learningContext = this.learningContexts.get(userId);
    
    if (!profile || !learningContext) {
      return this.getDefaultResponse(context);
    }

    let response = '';

    switch (context) {
      case 'daily_summary':
        response = this.generateAdaptiveDailySummary(profile, learningContext);
        break;
      case 'tutorial':
        response = this.generateAdaptiveTutorial(learningContext);
        break;
      case 'encouragement':
        response = this.generateAdaptiveEncouragement(profile, learningContext);
        break;
    }

    return response;
  }

  private generateAdaptiveDailySummary(profile: UserBehaviorData, context: LearningContext): string {
    let summary = '';
    
    // Personalized greeting based on performance
    if (profile.earningsGrowth > 0.15) {
      summary += "Outstanding work today! You're really building momentum. ";
    } else if (profile.customerSatisfaction > 4.5) {
      summary += "Your customers love your work! Quality is your superpower. ";
    } else {
      summary += "Another day of progress! Every job completed is a step forward. ";
    }

    // Adaptive insights based on user level
    if (context.userLevel === 'beginner') {
      summary += "You're learning fast and building a solid foundation. ";
    } else if (context.userLevel === 'expert') {
      summary += "You're in the top tier of providers - customers recognize your expertise. ";
    }

    // Personalized tips based on current goals
    if (context.currentGoals.includes('improve_bid_success')) {
      summary += "I notice you're working on winning more bids. Try highlighting your unique skills more prominently. ";
    }

    // Market intelligence
    const trendingCategory = Object.entries(this.marketData.demandTrends)
      .sort(([,a], [,b]) => b - a)[0][0];
    summary += `Market insight: ${trendingCategory} jobs are trending high right now. `;

    return summary;
  }

  private generateAdaptiveTutorial(context: LearningContext): string {
    if (context.userLevel === 'beginner') {
      return "Welcome to PieceJob! I'll guide you through the basics step by step. Don't worry, I'll adapt my teaching to your pace and help you succeed.";
    } else if (context.userLevel === 'intermediate') {
      return "Ready to level up your PieceJob game? I've learned about your strengths and I'll show you advanced strategies to boost your success rate.";
    } else {
      return "You're already a PieceJob expert! Let me share some insider tips and market insights that can help you maximize your earnings and efficiency.";
    }
  }

  private generateAdaptiveEncouragement(profile: UserBehaviorData, context: LearningContext): string {
    if (context.successPatterns.includes('excellent_service')) {
      return "Your dedication to quality service is paying off! Customers consistently rate you highly, which is building your reputation as a trusted provider.";
    } else if (context.recentChallenges.includes('pricing_strategy')) {
      return "I see you're working on your pricing strategy. Remember, it's better to start competitive and build your reputation, then gradually increase your rates as you gain experience.";
    } else {
      return "Every expert was once a beginner. You're making progress, learning from each job, and building valuable skills. Keep going!";
    }
  }

  private getDefaultResponse(context: string): string {
    switch (context) {
      case 'daily_summary':
        return "Here's your daily summary. You're making progress on your PieceJob journey!";
      case 'tutorial':
        return "Welcome to PieceJob! Let me guide you through the features.";
      case 'encouragement':
        return "You're doing great! Keep up the excellent work.";
      default:
        return "Thanks for using PieceJob's voice assistant!";
    }
  }

  // Update market intelligence based on collective user data
  updateMarketIntelligence(category: string, pricing: number, demand: number): void {
    // Update demand trends
    this.marketData.demandTrends[category] = demand;
    
    // Update pricing insights
    if (this.marketData.pricingInsights[category]) {
      const current = this.marketData.pricingInsights[category];
      current.optimal = (current.optimal + pricing) / 2; // Moving average
    }
  }

  // Get personalized recommendations based on learning
  getPersonalizedRecommendations(userId: string): string[] {
    const context = this.learningContexts.get(userId);
    if (!context) return [];
    
    return context.personalizedTips;
  }

  // Check if user needs intervention/help
  needsIntervention(userId: string): boolean {
    const profile = this.userProfiles.get(userId);
    if (!profile) return false;
    
    // AI detects if user is struggling
    return profile.bidWinRate < 0.2 || 
           profile.customerSatisfaction < 3.5 || 
           profile.averageResponseTime > 6;
  }

  // Generate intervention message
  generateInterventionMessage(userId: string): string {
    const profile = this.userProfiles.get(userId);
    if (!profile) return '';
    
    if (profile.bidWinRate < 0.2) {
      return "I notice you haven't won many bids lately. Would you like me to analyze successful bid patterns and give you personalized advice?";
    }
    
    if (profile.customerSatisfaction < 3.5) {
      return "Your recent ratings suggest customers want something different. Let me share what top-rated providers do to exceed expectations.";
    }
    
    if (profile.averageResponseTime > 6) {
      return "Quick responses win more jobs! I can help you set up notifications and templates to respond faster.";
    }
    
    return "I'm here to help you succeed. Would you like personalized coaching based on your performance data?";
  }
}

export const aiLearningService = new AILearningService();