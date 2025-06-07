export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export interface Voice {
  voice_id: string;
  name: string;
  samples?: VoiceSample[];
  category: string;
  fine_tuning?: {
    model_id?: string;
    is_allowed_to_fine_tune?: boolean;
    finetuning_state?: string;
    verification_attempts?: any[];
    verification_failures?: string[];
    verification_attempts_count?: number;
    slice_ids?: string[];
    manual_verification?: any;
    manual_verification_requested?: boolean;
  };
  labels?: Record<string, string>;
  description?: string;
  preview_url?: string;
  available_for_tiers?: string[];
  settings?: VoiceSettings;
  sharing?: any;
  high_quality_base_model_ids?: string[];
  safety_control?: string;
  voice_verification?: {
    requires_verification?: boolean;
    is_verified?: boolean;
    verification_failures?: string[];
    verification_attempts_count?: number;
    language?: string;
  };
  permission_on_resource?: string;
}

export interface VoiceSample {
  sample_id: string;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  hash: string;
}

export interface TTSRequest {
  text: string;
  model_id?: string;
  voice_settings?: VoiceSettings;
  pronunciation_dictionary_locators?: any[];
  seed?: number;
  previous_text?: string;
  next_text?: string;
  previous_request_ids?: string[];
  next_request_ids?: string[];
}

export interface STTRequest {
  audio: string; // base64 encoded audio
  model?: string;
  language?: string;
}

export interface VoiceAssistantState {
  isListening: boolean;
  isProcessing: boolean;
  isPlaying: boolean;
  currentText: string;
  transcribedText: string;
  error: string | null;
}

export interface NotificationVoiceSettings {
  enabled: boolean;
  autoRead: boolean;
  voiceId: string;
  speed: number;
  volume: number;
}

export interface VoiceJobDescription {
  originalAudio: string;
  transcribedText: string;
  confirmedText: string;
  isConfirmed: boolean;
}