import { Platform } from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { Voice, TTSRequest, STTRequest, VoiceSettings } from '../types/Voice';

class ElevenLabsService {
  private apiKey: string = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY || '';
  private baseUrl: string = 'https://api.elevenlabs.io/v1';
  private defaultVoiceId: string = 'pNInz6obpgDQGcFmaJgB'; // Adam voice
  
  // Popular voice IDs from ElevenLabs
  private voices = {
    adam: 'pNInz6obpgDQGcFmaJgB',
    antoni: 'ErXwobaYiN019PkySvjV',
    arnold: 'VR6AewLTigWG4xSOukaG',
    bella: 'EXAVITQu4vr4xnSDxMaL',
    domi: 'AZnzlk1XvdvUeBnXmlld',
    elli: 'MF3mGyEYCl7XYWbV9V6O',
    josh: 'TxGEqnHWrfWFTfGW9XjX',
    rachel: 'piTKgcLEGmPE4e6mEKli',
    sam: 'yoZ06aMxZJJ28mfd3POQ',
  };

  constructor() {
    this.initializeAudio();
  }

  private async initializeAudio() {
    if (Platform.OS !== 'web') {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.warn('Failed to initialize audio mode:', error);
      }
    }
  }

  async getVoices(): Promise<Voice[]> {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching voices:', error);
      return [];
    }
  }

  async textToSpeech(
    text: string, 
    voiceId: string = this.defaultVoiceId,
    settings?: VoiceSettings
  ): Promise<string | null> {
    try {
      // For web platform, use browser's speech synthesis as fallback
      if (Platform.OS === 'web') {
        return this.webTextToSpeech(text);
      }

      const requestBody: TTSRequest = {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: settings || {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true,
        },
      };

      const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      // Fallback to device TTS
      return this.fallbackTextToSpeech(text);
    }
  }

  private async webTextToSpeech(text: string): Promise<string | null> {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => resolve('completed');
        utterance.onerror = () => resolve(null);
        speechSynthesis.speak(utterance);
      } else {
        resolve(null);
      }
    });
  }

  private async fallbackTextToSpeech(text: string): Promise<string | null> {
    try {
      if (Platform.OS !== 'web') {
        await Speech.speak(text, {
          language: 'en-US',
          pitch: 1.0,
          rate: 0.9,
        });
        return 'completed';
      }
      return null;
    } catch (error) {
      console.error('Fallback TTS failed:', error);
      return null;
    }
  }

  async playAudio(audioUrl: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        const audio = new Audio(audioUrl);
        await audio.play();
      } else {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        await sound.playAsync();
        
        // Clean up after playing
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  async speechToText(audioUri: string): Promise<string | null> {
    try {
      // For web, we'll use the Web Speech API
      if (Platform.OS === 'web') {
        return this.webSpeechToText();
      }

      // Convert audio to base64
      const audioBase64 = await this.audioToBase64(audioUri);
      
      const formData = new FormData();
      formData.append('audio', audioBase64);
      formData.append('model', 'whisper-1');

      const response = await fetch(`${this.baseUrl}/speech-to-text`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.text || null;
    } catch (error) {
      console.error('Error in speech-to-text:', error);
      return null;
    }
  }

  private async webSpeechToText(): Promise<string | null> {
    return new Promise((resolve) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        resolve(null);
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = () => resolve(null);
      recognition.onend = () => resolve(null);

      recognition.start();
    });
  }

  private async audioToBase64(audioUri: string): Promise<string> {
    try {
      const response = await fetch(audioUri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting audio to base64:', error);
      throw error;
    }
  }

  // Voice assistant methods for specific use cases
  async readNotification(message: string, voiceId?: string): Promise<void> {
    const audioUrl = await this.textToSpeech(
      `You have a new message: ${message}`,
      voiceId || this.voices.bella
    );
    
    if (audioUrl && audioUrl !== 'completed') {
      await this.playAudio(audioUrl);
    }
  }

  async confirmJobDescription(description: string): Promise<void> {
    const confirmationText = `You said: ${description}. Is that correct?`;
    const audioUrl = await this.textToSpeech(confirmationText, this.voices.rachel);
    
    if (audioUrl && audioUrl !== 'completed') {
      await this.playAudio(audioUrl);
    }
  }

  async provideDailyBriefing(briefing: string): Promise<void> {
    const audioUrl = await this.textToSpeech(briefing, this.voices.adam);
    
    if (audioUrl && audioUrl !== 'completed') {
      await this.playAudio(audioUrl);
    }
  }

  async askForConfirmation(action: string): Promise<void> {
    const confirmationText = `Would you like me to ${action}? Please say yes or no.`;
    const audioUrl = await this.textToSpeech(confirmationText, this.voices.bella);
    
    if (audioUrl && audioUrl !== 'completed') {
      await this.playAudio(audioUrl);
    }
  }

  getVoiceById(voiceId: string): string {
    return Object.values(this.voices).includes(voiceId) ? voiceId : this.defaultVoiceId;
  }

  getVoiceOptions() {
    return [
      { id: this.voices.adam, name: 'Adam (Male, American)' },
      { id: this.voices.bella, name: 'Bella (Female, American)' },
      { id: this.voices.rachel, name: 'Rachel (Female, American)' },
      { id: this.voices.antoni, name: 'Antoni (Male, American)' },
      { id: this.voices.domi, name: 'Domi (Female, American)' },
      { id: this.voices.elli, name: 'Elli (Female, American)' },
      { id: this.voices.josh, name: 'Josh (Male, American)' },
      { id: this.voices.sam, name: 'Sam (Male, American)' },
    ];
  }
}

export const elevenLabsService = new ElevenLabsService();