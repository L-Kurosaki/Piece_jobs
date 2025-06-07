import { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    // Check if user has previously enabled voice notifications
    const savedPreference = localStorage.getItem('voiceNotificationsEnabled');
    if (savedPreference === 'true') {
      setIsVoiceEnabled(true);
    }
  }, []);

  const enableVoice = useCallback(() => {
    setIsVoiceEnabled(true);
    localStorage.setItem('voiceNotificationsEnabled', 'true');
  }, []);

  const disableVoice = useCallback(() => {
    setIsVoiceEnabled(false);
    localStorage.setItem('voiceNotificationsEnabled', 'false');
    setPendingNotification(null);
    voiceService.stopSpeaking();
    voiceService.stopListening();
  }, []);

  const processNotification = useCallback((notification: VoiceNotification) => {
    if (!isVoiceEnabled || !isSpeechSupported) return;
    
    setPendingNotification(notification);
  }, [isVoiceEnabled, isSpeechSupported]);

  const dismissNotification = useCallback(() => {
    setPendingNotification(null);
    voiceService.stopSpeaking();
    voiceService.stopListening();
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