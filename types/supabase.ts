export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string | null
          role: 'customer' | 'provider' | 'both'
          avatar_url: string | null
          bio: string | null
          location: Json
          rating: Json
          skills: Json
          verification_status: Json
          member_since: string
          completed_jobs: number
          active_jobs: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone?: string | null
          role?: 'customer' | 'provider' | 'both'
          avatar_url?: string | null
          bio?: string | null
          location?: Json
          rating?: Json
          skills?: Json
          verification_status?: Json
          member_since?: string
          completed_jobs?: number
          active_jobs?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string | null
          role?: 'customer' | 'provider' | 'both'
          avatar_url?: string | null
          bio?: string | null
          location?: Json
          rating?: Json
          skills?: Json
          verification_status?: Json
          member_since?: string
          completed_jobs?: number
          active_jobs?: number
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          category: 'cleaning' | 'gardening' | 'maintenance' | 'delivery' | 'moving' | 'cooking' | 'other'
          description: string
          images: string[]
          location: Json
          customer_id: string
          expected_duration: number
          budget: Json
          status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
          posted_at: string
          accepted_bid_id: string | null
          provider_id: string | null
          start_time: string | null
          end_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          category: 'cleaning' | 'gardening' | 'maintenance' | 'delivery' | 'moving' | 'cooking' | 'other'
          description: string
          images?: string[]
          location: Json
          customer_id: string
          expected_duration: number
          budget: Json
          status?: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
          posted_at?: string
          accepted_bid_id?: string | null
          provider_id?: string | null
          start_time?: string | null
          end_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: 'cleaning' | 'gardening' | 'maintenance' | 'delivery' | 'moving' | 'cooking' | 'other'
          description?: string
          images?: string[]
          location?: Json
          customer_id?: string
          expected_duration?: number
          budget?: Json
          status?: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
          posted_at?: string
          accepted_bid_id?: string | null
          provider_id?: string | null
          start_time?: string | null
          end_time?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          job_id: string
          provider_id: string
          price: number
          message: string
          estimated_duration: number | null
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          provider_id: string
          price: number
          message: string
          estimated_duration?: number | null
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          provider_id?: string
          price?: number
          message?: string
          estimated_duration?: number | null
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          participants: string[]
          job_id: string | null
          last_message_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          participants: string[]
          job_id?: string | null
          last_message_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          participants?: string[]
          job_id?: string | null
          last_message_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          receiver_id: string
          text: string
          voice_message_url: string | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          receiver_id: string
          text: string
          voice_message_url?: string | null
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          receiver_id?: string
          text?: string
          voice_message_url?: string | null
          read?: boolean
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          job_id: string
          customer_id: string
          provider_id: string
          amount: number
          commission: number
          booking_fee: number
          net_amount: number
          status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
          payment_method: string
          transaction_id: string | null
          created_at: string
          completed_at: string | null
          refunded_at: string | null
        }
        Insert: {
          id?: string
          job_id: string
          customer_id: string
          provider_id: string
          amount: number
          commission: number
          booking_fee: number
          net_amount: number
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
          payment_method?: string
          transaction_id?: string | null
          created_at?: string
          completed_at?: string | null
          refunded_at?: string | null
        }
        Update: {
          id?: string
          job_id?: string
          customer_id?: string
          provider_id?: string
          amount?: number
          commission?: number
          booking_fee?: number
          net_amount?: number
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
          payment_method?: string
          transaction_id?: string | null
          created_at?: string
          completed_at?: string | null
          refunded_at?: string | null
        }
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          balance: number
          currency: string
          status: 'active' | 'suspended' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          currency?: string
          status?: 'active' | 'suspended' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          currency?: string
          status?: 'active' | 'suspended' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          wallet_id: string
          type: 'credit' | 'debit'
          amount: number
          description: string
          reference: string | null
          balance_before: number
          balance_after: number
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          wallet_id: string
          type: 'credit' | 'debit'
          amount: number
          description: string
          reference?: string | null
          balance_before: number
          balance_after: number
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          wallet_id?: string
          type?: 'credit' | 'debit'
          amount?: number
          description?: string
          reference?: string | null
          balance_before?: number
          balance_after?: number
          metadata?: Json
          created_at?: string
        }
      }
      security_alerts: {
        Row: {
          id: string
          job_id: string | null
          user_id: string | null
          type: 'duration_exceeded' | 'no_response' | 'emergency' | 'manual'
          status: 'pending' | 'acknowledged' | 'resolved'
          location: Json | null
          description: string
          security_team_id: string | null
          response_time: number | null
          created_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          job_id?: string | null
          user_id?: string | null
          type: 'duration_exceeded' | 'no_response' | 'emergency' | 'manual'
          status?: 'pending' | 'acknowledged' | 'resolved'
          location?: Json | null
          description: string
          security_team_id?: string | null
          response_time?: number | null
          created_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          job_id?: string | null
          user_id?: string | null
          type?: 'duration_exceeded' | 'no_response' | 'emergency' | 'manual'
          status?: 'pending' | 'acknowledged' | 'resolved'
          location?: Json | null
          description?: string
          security_team_id?: string | null
          response_time?: number | null
          created_at?: string
          resolved_at?: string | null
        }
      }
      job_timers: {
        Row: {
          id: string
          job_id: string
          start_time: string
          expected_duration: number
          warning_threshold: number
          max_duration: number
          last_check_in: string | null
          status: 'active' | 'completed' | 'overdue' | 'emergency'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          start_time: string
          expected_duration: number
          warning_threshold: number
          max_duration: number
          last_check_in?: string | null
          status?: 'active' | 'completed' | 'overdue' | 'emergency'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          start_time?: string
          expected_duration?: number
          warning_threshold?: number
          max_duration?: number
          last_check_in?: string | null
          status?: 'active' | 'completed' | 'overdue' | 'emergency'
          created_at?: string
          updated_at?: string
        }
      }
      ai_learning_data: {
        Row: {
          id: string
          user_id: string
          behavior_data: Json
          learning_context: Json
          personalized_tips: string[]
          user_level: 'beginner' | 'intermediate' | 'expert'
          last_interaction: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          behavior_data?: Json
          learning_context?: Json
          personalized_tips?: string[]
          user_level?: 'beginner' | 'intermediate' | 'expert'
          last_interaction?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          behavior_data?: Json
          learning_context?: Json
          personalized_tips?: string[]
          user_level?: 'beginner' | 'intermediate' | 'expert'
          last_interaction?: string
          created_at?: string
          updated_at?: string
        }
      }
      market_intelligence: {
        Row: {
          id: string
          category: string
          demand_score: number
          pricing_data: Json
          competitor_data: Json
          seasonal_patterns: Json
          customer_preferences: Json
          region: string | null
          effective_date: string
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          demand_score: number
          pricing_data: Json
          competitor_data: Json
          seasonal_patterns: Json
          customer_preferences: Json
          region?: string | null
          effective_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          demand_score?: number
          pricing_data?: Json
          competitor_data?: Json
          seasonal_patterns?: Json
          customer_preferences?: Json
          region?: string | null
          effective_date?: string
          created_at?: string
        }
      }
      voice_interactions: {
        Row: {
          id: string
          user_id: string
          interaction_type: string
          input_text: string | null
          output_text: string | null
          audio_url: string | null
          success: boolean
          duration_ms: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          interaction_type: string
          input_text?: string | null
          output_text?: string | null
          audio_url?: string | null
          success?: boolean
          duration_ms?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          interaction_type?: string
          input_text?: string | null
          output_text?: string | null
          audio_url?: string | null
          success?: boolean
          duration_ms?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}