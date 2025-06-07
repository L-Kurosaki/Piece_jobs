interface VoiceConfig {
  elevenLabsApiKey: string;
  voiceId: string;
}

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

class VoiceService {
  private config: VoiceConfig;
  private audio: HTMLAudioElement | null = null;
  private recognition: any = null;
  private isListening = false;

  constructor() {
    this.config = {
      elevenLabsApiKey: process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY || '',
      voiceId: process.env.EXPO_PUBLIC_ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL', // Default voice
    };
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  }

  async textToSpeech(text: string): Promise<void> {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.config.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.config.elevenLabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      return new Promise((resolve, reject) => {
        this.audio = new Audio(audioUrl);
        this.audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        this.audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          reject(new Error('Audio playback failed'));
        };
        this.audio.play().catch(reject);
      });
    } catch (error) {
      console.error('Text-to-speech error:', error);
      throw error;
    }
  }

  async speechToText(): Promise<SpeechRecognitionResult> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        const result = event.results[0];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        
        this.isListening = false;
        resolve({ transcript, confidence });
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      try {
        this.recognition.start();
      } catch (error) {
        this.isListening = false;
        reject(error);
      }
    });
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  stopSpeaking() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  getIsListening(): boolean {
    return this.isListening;
  }

  isSpeechRecognitionSupported(): boolean {
    return !!this.recognition;
  }
}

export const voiceService = new VoiceService();