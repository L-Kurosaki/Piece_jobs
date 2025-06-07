import { useState, useCallback, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { elevenLabsService } from '../utils/elevenLabsService';
import { VoiceAssistantState } from '../types/Voice';

export function useVoiceAssistant() {
  const [state, setState] = useState<VoiceAssistantState>({
    isListening: false,
    isProcessing: false,
    isPlaying: false,
    currentText: '',
    transcribedText: '',
    error: null,
  });

  const recordingRef = useRef<Audio.Recording | null>(null);

  const startListening = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isListening: true, error: null }));

      if (Platform.OS === 'web') {
        // Use Web Speech API for web
        const transcript = await elevenLabsService.speechToText('');
        if (transcript) {
          setState(prev => ({ 
            ...prev, 
            transcribedText: transcript,
            isListening: false 
          }));
          return transcript;
        }
      } else {
        // Request permissions for mobile
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Audio recording permission not granted');
        }

        // Start recording
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        await recording.startAsync();
        recordingRef.current = recording;

        return new Promise<string>((resolve) => {
          // Auto-stop after 10 seconds or when user stops manually
          setTimeout(async () => {
            const transcript = await stopListening();
            resolve(transcript || '');
          }, 10000);
        });
      }
    } catch (error) {
      console.error('Error starting voice recording:', error);
      setState(prev => ({ 
        ...prev, 
        isListening: false, 
        error: 'Failed to start recording' 
      }));
      return '';
    }
  }, []);

  const stopListening = useCallback(async (): Promise<string | null> => {
    try {
      setState(prev => ({ ...prev, isListening: false, isProcessing: true }));

      if (Platform.OS !== 'web' && recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        recordingRef.current = null;

        if (uri) {
          const transcript = await elevenLabsService.speechToText(uri);
          setState(prev => ({ 
            ...prev, 
            transcribedText: transcript || '',
            isProcessing: false 
          }));
          return transcript;
        }
      }

      setState(prev => ({ ...prev, isProcessing: false }));
      return null;
    } catch (error) {
      console.error('Error stopping voice recording:', error);
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: 'Failed to process recording' 
      }));
      return null;
    }
  }, []);

  const speak = useCallback(async (text: string, voiceId?: string) => {
    try {
      setState(prev => ({ ...prev, isPlaying: true, currentText: text }));
      
      const audioUrl = await elevenLabsService.textToSpeech(text, voiceId);
      if (audioUrl && audioUrl !== 'completed') {
        await elevenLabsService.playAudio(audioUrl);
      }
      
      setState(prev => ({ ...prev, isPlaying: false, currentText: '' }));
    } catch (error) {
      console.error('Error speaking text:', error);
      setState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        error: 'Failed to speak text' 
      }));
    }
  }, []);

  const readNotification = useCallback(async (message: string) => {
    await elevenLabsService.readNotification(message);
  }, []);

  const confirmJobDescription = useCallback(async (description: string) => {
    await elevenLabsService.confirmJobDescription(description);
  }, []);

  const askForConfirmation = useCallback(async (action: string) => {
    await elevenLabsService.askForConfirmation(action);
  }, []);

  const reset = useCallback(() => {
    setState({
      isListening: false,
      isProcessing: false,
      isPlaying: false,
      currentText: '',
      transcribedText: '',
      error: null,
    });
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    speak,
    readNotification,
    confirmJobDescription,
    askForConfirmation,
    reset,
  };
}