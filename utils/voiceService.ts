import { Platform } from 'react-native';

export interface VoiceMessage {
  id: string;
  text: string;
  audioUrl?: string;
  timestamp: number;
}

class VoiceService {
  private apiKey: string;
  private baseUrl = 'https://api.elevenlabs.io/v1';
  private voiceId = 'pNInz6obpgDQGcFmaJgB'; // Adam voice
  
  constructor() {
    this.apiKey = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY || '';
  }

  // Check if voice features are available
  isVoiceAvailable(): boolean {
    return Platform.OS === 'web' && !!this.apiKey;
  }

  // Generate speech from text using ElevenLabs
  async generateSpeech(text: string, voiceId?: string): Promise<string> {
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
          text: text.substring(0, 500),
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
      
      // Play the audio immediately
      const audio = new Audio(audioUrl);
      audio.play().catch(console.error);
      
      return audioUrl;
    } catch (error) {
      console.error('Voice synthesis error:', error);
      // Fallback: use Web Speech API if available
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
      }
      return 'fallback-audio';
    }
  }

  // Play audio using platform-appropriate method
  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve) => {
      if (this.isVoiceAvailable() && audioUrl !== 'mock-audio-url' && audioUrl !== 'fallback-audio') {
        try {
          const audio = new Audio(audioUrl);
          audio.onended = () => resolve();
          audio.onerror = () => {
            console.log('Audio playback failed');
            setTimeout(resolve, 1000);
          };
          audio.play().catch(() => {
            console.log('Audio play failed');
            setTimeout(resolve, 1000);
          });
        } catch (error) {
          console.log('Audio creation failed');
          setTimeout(resolve, 1000);
        }
      } else {
        setTimeout(resolve, 1000);
      }
    });
  }

  // Read message aloud
  async readMessageAloud(message: string, senderName?: string): Promise<void> {
    try {
      const fullText = senderName ? `Message from ${senderName}: ${message}` : message;
      await this.generateSpeech(fullText);
    } catch (error) {
      console.error('Voice message error:', error);
    }
  }

  // Generate daily summary speech
  async generateDailySummary(summary: any): Promise<void> {
    try {
      let summaryText = `Good day! Here's your summary: `;
      summaryText += `You completed ${summary.completedJobs || 0} jobs, `;
      summaryText += `earned R${(summary.earnings || 0).toFixed(2)}, `;
      summaryText += `and have ${summary.pendingBookings || 0} pending bookings. `;
      summaryText += `Keep up the great work!`;

      await this.generateSpeech(summaryText);
    } catch (error) {
      console.error('Daily summary error:', error);
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