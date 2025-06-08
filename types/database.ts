export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          role: string | null;
          avatar_url: string | null;
          bio: string | null;
          location: any;
          rating: any;
          skills: any;
          verification_status: any;
          member_since: string | null;
          completed_jobs: number | null;
          active_jobs: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          email: string;
          phone?: string | null;
          role?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          location?: any;
          rating?: any;
          skills?: any;
          verification_status?: any;
          member_since?: string | null;
          completed_jobs?: number | null;
          active_jobs?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          email?: string;
          phone?: string | null;
          role?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          location?: any;
          rating?: any;
          skills?: any;
          verification_status?: any;
          member_since?: string | null;
          completed_jobs?: number | null;
          active_jobs?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          category: string;
          description: string;
          images: string[] | null;
          location: any;
          customer_id: string | null;
          expected_duration: number;
          budget: any;
          status: string | null;
          posted_at: string | null;
          accepted_bid_id: string | null;
          provider_id: string | null;
          start_time: string | null;
          end_time: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          description: string;
          images?: string[] | null;
          location: any;
          customer_id?: string | null;
          expected_duration: number;
          budget: any;
          status?: string | null;
          posted_at?: string | null;
          accepted_bid_id?: string | null;
          provider_id?: string | null;
          start_time?: string | null;
          end_time?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          description?: string;
          images?: string[] | null;
          location?: any;
          customer_id?: string | null;
          expected_duration?: number;
          budget?: any;
          status?: string | null;
          posted_at?: string | null;
          accepted_bid_id?: string | null;
          provider_id?: string | null;
          start_time?: string | null;
          end_time?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      bids: {
        Row: {
          id: string;
          job_id: string | null;
          provider_id: string | null;
          price: number;
          message: string;
          estimated_duration: number | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          job_id?: string | null;
          provider_id?: string | null;
          price: number;
          message: string;
          estimated_duration?: number | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          job_id?: string | null;
          provider_id?: string | null;
          price?: number;
          message?: string;
          estimated_duration?: number | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      conversations: {
        Row: {
          id: string;
          participants: string[];
          job_id: string | null;
          last_message_at: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          participants: string[];
          job_id?: string | null;
          last_message_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          participants?: string[];
          job_id?: string | null;
          last_message_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string | null;
          sender_id: string | null;
          receiver_id: string | null;
          text: string;
          voice_message_url: string | null;
          read: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          conversation_id?: string | null;
          sender_id?: string | null;
          receiver_id?: string | null;
          text: string;
          voice_message_url?: string | null;
          read?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          conversation_id?: string | null;
          sender_id?: string | null;
          receiver_id?: string | null;
          text?: string;
          voice_message_url?: string | null;
          read?: boolean | null;
          created_at?: string | null;
        };
      };
      wallets: {
        Row: {
          id: string;
          user_id: string | null;
          balance: number | null;
          currency: string | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          balance?: number | null;
          currency?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          balance?: number | null;
          currency?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      transactions: {
        Row: {
          id: string;
          wallet_id: string | null;
          type: string;
          amount: number;
          description: string;
          reference: string | null;
          balance_before: number;
          balance_after: number;
          metadata: any | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          wallet_id?: string | null;
          type: string;
          amount: number;
          description: string;
          reference?: string | null;
          balance_before: number;
          balance_after: number;
          metadata?: any | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          wallet_id?: string | null;
          type?: string;
          amount?: number;
          description?: string;
          reference?: string | null;
          balance_before?: number;
          balance_after?: number;
          metadata?: any | null;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}