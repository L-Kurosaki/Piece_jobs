import { Platform } from 'react-native';
import { aiLearningService } from './aiLearningService';

export interface VoiceMessage {
  id: string;
  text: string;
  audioUrl?: string;
  timestamp: number;
}

export interface DailySummary {
  completedJobs: number;
  earnings: number;
  averageRating: number;
  pendingBookings: number;
  upcomingJobs: string[];
}

class VoiceService {
  private apiKey: string;
  private baseUrl = 'https://api.elevenlabs.io/v1';
  private voiceId = 'pNInz6obpgDQGcFmaJgB'; // Adam voice - clear and professional
  
  constructor() {
    this.apiKey = 'sk_8dacedb595d18b1ecfc3fd01e104e0c79cf315fa4bb67daa';
  }

  // Generate speech from text using ElevenLabs
  async generateSpeech(text: string, voiceId?: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId || this.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  // Play audio using HTML5 Audio API (web-compatible)
  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'web') {
        const audio = new Audio(audioUrl);
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error('Audio playback failed'));
        audio.play().catch(reject);
      } else {
        // For mobile platforms, you would use expo-av
        console.log('Mobile audio playback would use expo-av');
        resolve();
      }
    });
  }

  // Read message aloud with ElevenLabs
  async readMessageAloud(message: string, senderName: string): Promise<void> {
    try {
      const fullText = `New message from ${senderName}: ${message}`;
      const audioUrl = await this.generateSpeech(fullText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.error('Error reading message aloud:', error);
      throw error;
    }
  }

  // Ask if user wants to respond
  async askForResponse(): Promise<void> {
    try {
      const responseText = "Would you like to respond to this message?";
      const audioUrl = await this.generateSpeech(responseText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.error('Error asking for response:', error);
      throw error;
    }
  }

  // Read back user's response for confirmation
  async confirmResponse(responseText: string): Promise<void> {
    try {
      const confirmationText = `You said: "${responseText}". Should I send this message?`;
      const audioUrl = await this.generateSpeech(confirmationText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.error('Error confirming response:', error);
      throw error;
    }
  }

  // Generate adaptive daily summary speech using AI learning
  async generateDailySummary(summary: DailySummary, userId?: string): Promise<void> {
    try {
      let summaryText = '';
      
      if (userId) {
        // Use AI learning service to generate adaptive summary
        summaryText = await aiLearningService.generateAdaptiveVoiceResponse(userId, 'daily_summary');
      } else {
        // Fallback to basic summary
        summaryText = `Good evening! Here's your daily summary: `;
        summaryText += `Today, you completed ${summary.completedJobs} job${summary.completedJobs !== 1 ? 's' : ''}, `;
        summaryText += `earned R${summary.earnings.toFixed(2)}, `;
        
        if (summary.averageRating > 0) {
          summaryText += `and received an average rating of ${summary.averageRating.toFixed(1)} stars. `;
        }
        
        if (summary.pendingBookings > 0) {
          summaryText += `You have ${summary.pendingBookings} pending booking${summary.pendingBookings !== 1 ? 's' : ''} `;
        }
        
        if (summary.upcomingJobs.length > 0) {
          summaryText += `and ${summary.upcomingJobs.length} job${summary.upcomingJobs.length !== 1 ? 's' : ''} scheduled for tomorrow. `;
        }
        
        summaryText += `Great work today!`;
      }

      const audioUrl = await this.generateSpeech(summaryText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.error('Error generating daily summary:', error);
      throw error;
    }
  }

  // Voice tutorial for new users with adaptive content
  async playWelcomeTutorial(userId?: string): Promise<void> {
    try {
      let tutorialText = '';
      
      if (userId) {
        // Use AI learning service for adaptive tutorial
        tutorialText = await aiLearningService.generateAdaptiveVoiceResponse(userId, 'tutorial');
      } else {
        // Fallback tutorial
        tutorialText = `Welcome to PieceJob! I'm your voice assistant, here to help you navigate the app hands-free. 
        Here's how you can get started: First, complete your profile to build trust with customers. 
        Then, browse available jobs in your area and place competitive bids. 
        When customers message you, I'll read their messages aloud and help you respond using just your voice. 
        You can also ask me for your daily summary anytime. Let's get you started on your journey to earning more!`;
      }
      
      const audioUrl = await this.generateSpeech(tutorialText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.error('Error playing welcome tutorial:', error);
      throw error;
    }
  }

  // Voice guidance for specific features with learning adaptation
  async playFeatureGuide(feature: 'bidding' | 'messaging' | 'profile' | 'safety', userId?: string): Promise<void> {
    try {
      let guideText = '';
      
      // Check if user needs personalized guidance
      if (userId && aiLearningService.needsIntervention(userId)) {
        const interventionMessage = aiLearningService.generateInterventionMessage(userId);
        guideText = interventionMessage + ' ';
      }
      
      switch (feature) {
        case 'bidding':
          guideText += `Here's how to place winning bids: First, read the job description carefully. 
          Consider the time needed and your costs. Price competitively but fairly. 
          Write a personal message explaining your experience and what you'll include. 
          Respond quickly to increase your chances of winning the job.`;
          
          // Add personalized tips if available
          if (userId) {
            const tips = aiLearningService.getPersonalizedRecommendations(userId);
            const biddingTips = tips.filter(tip => tip.includes('bid') || tip.includes('pric'));
            if (biddingTips.length > 0) {
              guideText += ` Personal tip for you: ${biddingTips[0]}`;
            }
          }
          break;
          
        case 'messaging':
          guideText += `Messaging made easy: When you receive a message, I'll read it aloud automatically. 
          Just say "Yes" when I ask if you want to respond, then speak your reply naturally. 
          I'll read it back for confirmation before sending. No typing required!`;
          break;
          
        case 'profile':
          guideText += `Building a strong profile: Add a clear photo of yourself, write a compelling bio highlighting your skills, 
          upload certificates if you have them, and always deliver quality work to maintain high ratings. 
          Verified profiles get more bookings!`;
          break;
          
        case 'safety':
          guideText += `Your safety is our priority: Every job has a built-in timer that monitors duration. 
          If a job takes too long, security services are automatically notified. 
          Use the emergency button if you ever feel unsafe - help will be dispatched immediately to your location.`;
          break;
      }
      
      const audioUrl = await this.generateSpeech(guideText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.error('Error playing feature guide:', error);
      throw error;
    }
  }

  // Speech recognition (web-compatible)
  async startSpeechRecognition(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'web' && 'webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          resolve(transcript);
        };

        recognition.onerror = (event: any) => {
          reject(new Error(`Speech recognition error: ${event.error}`));
        };

        recognition.start();
      } else {
        // Fallback for platforms without speech recognition
        reject(new Error('Speech recognition not available'));
      }
    });
  }

  // Complete voice interaction flow with AI learning
  async handleVoiceInteraction(incomingMessage: string, senderName: string, userId?: string): Promise<string | null> {
    try {
      // Step 1: Read the incoming message
      await this.readMessageAloud(incomingMessage, senderName);
      
      // Step 2: Ask if they want to respond
      await this.askForResponse();
      
      // Step 3: Listen for yes/no response
      const wantsToRespond = await this.startSpeechRecognition();
      
      if (wantsToRespond.toLowerCase().includes('yes')) {
        // Step 4: Get their response
        const responseText = await this.startSpeechRecognition();
        
        // Step 5: Confirm the response
        await this.confirmResponse(responseText);
        
        // Step 6: Listen for confirmation
        const confirmation = await this.startSpeechRecognition();
        
        if (confirmation.toLowerCase().includes('yes') || confirmation.toLowerCase().includes('send')) {
          // Update AI learning with successful voice interaction
          if (userId) {
            aiLearningService.updateUserProfile(userId, {
              averageResponseTime: 0.5, // Voice responses are faster
            });
          }
          
          return responseText;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Voice interaction error:', error);
      return null;
    }
  }

  // Generate personalized encouragement using AI learning
  async generatePersonalizedEncouragement(userId: string): Promise<void> {
    try {
      const encouragementText = await aiLearningService.generateAdaptiveVoiceResponse(userId, 'encouragement');
      const audioUrl = await this.generateSpeech(encouragementText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.error('Error generating personalized encouragement:', error);
      throw error;
    }
  }
}

export const voiceService = new VoiceService();