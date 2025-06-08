import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types based on your schema
export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'provider' | 'both';
  avatar_url?: string;
  bio?: string;
  location?: any;
  rating?: any;
  skills?: any;
  verification_status?: any;
  member_since?: string;
  completed_jobs?: number;
  active_jobs?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Job {
  id: string;
  title: string;
  category: string;
  description: string;
  images?: string[];
  location: any;
  customer_id: string;
  expected_duration: number;
  budget: any;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  posted_at?: string;
  accepted_bid_id?: string;
  provider_id?: string;
  start_time?: string;
  end_time?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  voice_message_url?: string;
  read: boolean;
  created_at: string;
}