import { Platform } from 'react-native';
import config from './config';

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
  private voiceId = 'pNInz6obpgDQGcFmaJgB';
  
  constructor() {
    this.apiKey = config.elevenlabsApiKey;
  }

  // Check if voice features are available
  isVoiceAvailable(): boolean {
    return Platform.OS === 'web' && !!this.apiKey;
  }

  // Generate speech from text using ElevenLabs
  async generateSpeech(text: string, voiceId?: string): Promise<string> {
    // Return mock for non-web platforms or missing API key
    if (!this.isVoiceAvailable()) {
      console.log('Voice synthesis (simulation):', text);
      return 'mock-audio-url';
    }

    try {
      const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId || this.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify({
          text: text.substring(0, 500), // Limit text length
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
      console.log('Voice synthesis fallback:', error);
      return 'mock-audio-url';
    }
  }

  // Play audio using platform-appropriate method
  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve) => {
      if (this.isVoiceAvailable() && audioUrl !== 'mock-audio-url') {
        try {
          const audio = new Audio(audioUrl);
          audio.onended = () => resolve();
          audio.onerror = () => {
            console.log('Audio playback failed, using mock playback');
            setTimeout(resolve, 2000);
          };
          audio.play().catch(() => {
            console.log('Audio play failed, using mock playback');
            setTimeout(resolve, 2000);
          });
        } catch (error) {
          console.log('Audio creation failed, using mock playback');
          setTimeout(resolve, 2000);
        }
      } else {
        console.log('Playing audio (simulated):', audioUrl);
        setTimeout(resolve, 2000);
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
      console.log('Voice message completed with fallback');
    }
  }

  // Ask if user wants to respond
  async askForResponse(): Promise<void> {
    try {
      const responseText = "Would you like to respond to this message?";
      const audioUrl = await this.generateSpeech(responseText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.log('Voice prompt completed with fallback');
    }
  }

  // Read back user's response for confirmation
  async confirmResponse(responseText: string): Promise<void> {
    try {
      const confirmationText = `You said: "${responseText}". Should I send this message?`;
      const audioUrl = await this.generateSpeech(confirmationText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.log('Voice confirmation completed with fallback');
    }
  }

  // Generate daily summary speech
  async generateDailySummary(summary: DailySummary, userId?: string): Promise<void> {
    try {
      let summaryText = `Good evening! Here's your daily summary: `;
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

      const audioUrl = await this.generateSpeech(summaryText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.log('Daily summary completed with fallback');
    }
  }

  // Voice tutorial for new users
  async playWelcomeTutorial(userId?: string): Promise<void> {
    try {
      const tutorialText = `Welcome to PieceJob! I'm your voice assistant, here to help you navigate the app hands-free. 
      Here's how you can get started: First, complete your profile to build trust with customers. 
      Then, browse available jobs in your area and place competitive bids. 
      When customers message you, I'll read their messages aloud and help you respond using just your voice. 
      You can also ask me for your daily summary anytime. Let's get you started on your journey to earning more!`;
      
      const audioUrl = await this.generateSpeech(tutorialText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.log('Tutorial completed with fallback');
    }
  }

  // Voice guidance for specific features
  async playFeatureGuide(feature: 'bidding' | 'messaging' | 'profile' | 'safety', userId?: string): Promise<void> {
    try {
      let guideText = '';
      
      switch (feature) {
        case 'bidding':
          guideText = `Here's how to place winning bids: First, read the job description carefully. 
          Consider the time needed and your costs. Price competitively but fairly. 
          Write a personal message explaining your experience and what you'll include. 
          Respond quickly to increase your chances of winning the job.`;
          break;
          
        case 'messaging':
          guideText = `Messaging made easy: When you receive a message, I'll read it aloud automatically. 
          Just say "Yes" when I ask if you want to respond, then speak your reply naturally. 
          I'll read it back for confirmation before sending. No typing required!`;
          break;
          
        case 'profile':
          guideText = `Building a strong profile: Add a clear photo of yourself, write a compelling bio highlighting your skills, 
          upload certificates if you have them, and always deliver quality work to maintain high ratings. 
          Verified profiles get more bookings!`;
          break;
          
        case 'safety':
          guideText = `Your safety is our priority: Every job has a built-in timer that monitors duration. 
          If a job takes too long, security services are automatically notified. 
          Use the emergency button if you ever feel unsafe - help will be dispatched immediately to your location.`;
          break;
      }
      
      const audioUrl = await this.generateSpeech(guideText);
      await this.playAudio(audioUrl);
    } catch (error) {
      console.log('Feature guide completed with fallback');
    }
  }

  // Speech recognition (web-compatible with mobile fallback)
  async startSpeechRecognition(): Promise<string> {
    return new Promise((resolve) => {
      if (Platform.OS === 'web' && 'webkitSpeechRecognition' in window) {
        try {
          const recognition = new (window as any).webkitSpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = 'en-US';

          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            resolve(transcript);
          };

          recognition.onerror = (event: any) => {
            console.log('Speech recognition error:', event.error);
            resolve('Yes, send it');
          };

          recognition.start();
        } catch (error) {
          console.log('Speech recognition setup error:', error);
          resolve('Yes, send it');
        }
      } else {
        console.log('Speech recognition not available, using mock response');
        setTimeout(() => resolve('Yes, send it'), 1000);
      }
    });
  }

  // Complete voice interaction flow
  async handleVoiceInteraction(incomingMessage: string, senderName: string, userId?: string): Promise<string | null> {
    try {
      await this.readMessageAloud(incomingMessage, senderName);
      await this.askForResponse();
      
      const wantsToRespond = await this.startSpeechRecognition();
      
      if (wantsToRespond.toLowerCase().includes('yes')) {
        const responseText = await this.startSpeechRecognition();
        await this.confirmResponse(responseText);
        
        const confirmation = await this.startSpeechRecognition();
        
        if (confirmation.toLowerCase().includes('yes') || confirmation.toLowerCase().includes('send')) {
          return responseText;
        }
      }
      
      return null;
    } catch (error) {
      console.log('Voice interaction completed with fallback');
      return null;
    }
  }

  // Get voice status for UI
  getVoiceStatus(): { available: boolean; reason?: string } {
    if (!this.apiKey) {
      return { available: false, reason: 'API key not configured' };
    }
    if (Platform.OS !== 'web') {
      return { available: false, reason: 'Voice features work best on web' };
    }
    return { available: true };
  }
}

export const voiceService = new VoiceService();