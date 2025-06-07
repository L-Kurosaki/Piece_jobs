import { useState, useEffect, useCallback, useRef } from 'react';
import { voiceService } from '../utils/voiceService';
import { Message } from '../types/Message';
import { Job } from '../types/Job';

interface VoiceNotification {
  id: string;
  type: 'message' | 'job';
  data: Message | Job;
  timestamp: number;
}

interface UseVoiceNotificationsReturn {
  isVoiceEnabled: boolean;
  pendingNotification: VoiceNotification | null;
  enableVoice: () => void;
  disableVoice: () => void;
  processNotification: (notification: VoiceNotification) => void;
  dismissNotification: () => void;
  isSpeechSupported: boolean;
}

export function useVoiceNotifications(): UseVoiceNotificationsReturn {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [pendingNotification, setPendingNotification] = useState<VoiceNotification | null>(null);
  const [isSpeechSupported] = useState(() => voiceService.isSpeechRecognitionSupported());
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Check if user has previously enabled voice notifications
    if (typeof window !== 'undefined') {
      const savedPreference = localStorage.getItem('voiceNotificationsEnabled');
      if (savedPreference === 'true' && mountedRef.current) {
        setIsVoiceEnabled(true);
      }
    }
  }, []);

  const enableVoice = useCallback(() => {
    if (mountedRef.current) {
      setIsVoiceEnabled(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('voiceNotificationsEnabled', 'true');
      }
    }
  }, []);

  const disableVoice = useCallback(() => {
    if (mountedRef.current) {
      setIsVoiceEnabled(false);
      setPendingNotification(null);
      if (typeof window !== 'undefined') {
        localStorage.setItem('voiceNotificationsEnabled', 'false');
      }
      voiceService.stopSpeaking();
      voiceService.stopListening();
    }
  }, []);

  const processNotification = useCallback((notification: VoiceNotification) => {
    if (!isVoiceEnabled || !isSpeechSupported || !mountedRef.current) return;
    
    setPendingNotification(notification);
  }, [isVoiceEnabled, isSpeechSupported]);

  const dismissNotification = useCallback(() => {
    if (mountedRef.current) {
      setPendingNotification(null);
      voiceService.stopSpeaking();
      voiceService.stopListening();
    }
  }, []);

  return {
    isVoiceEnabled,
    pendingNotification,
    enableVoice,
    disableVoice,
    processNotification,
    dismissNotification,
    isSpeechSupported,
  };
}

export default useVoiceNotifications;