/*
  # Complete PieceJob Database Schema

  1. New Tables
    - `profiles` - User profiles with verification status
    - `jobs` - Job postings with all details
    - `bids` - Bids placed on jobs
    - `conversations` - Message conversations
    - `messages` - Individual messages
    - `payments` - Payment transactions
    - `wallets` - User wallet balances
    - `transactions` - Wallet transaction history
    - `security_alerts` - Security monitoring
    - `job_timers` - Active job timers
    - `ai_learning_data` - AI learning profiles
    - `market_intelligence` - Market data and trends

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure data access patterns

  3. Features
    - Real-time messaging
    - Payment processing
    - Security monitoring
    - AI learning system
    - Voice interaction logs
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- User Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  role text CHECK (role IN ('customer', 'provider', 'both')) DEFAULT 'customer',
  avatar_url text,
  bio text,
  location jsonb NOT NULL DEFAULT '{}',
  rating jsonb NOT NULL DEFAULT '{"averageRating": 0, "totalReviews": 0}',
  skills jsonb NOT NULL DEFAULT '[]',
  verification_status jsonb NOT NULL DEFAULT '{"identity": "pending", "address": "pending", "background": "pending"}',
  member_since timestamptz DEFAULT now(),
  completed_jobs integer DEFAULT 0,
  active_jobs integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('cleaning', 'gardening', 'maintenance', 'delivery', 'moving', 'cooking', 'other')),
  description text NOT NULL,
  images text[] DEFAULT '{}',
  location jsonb NOT NULL,
  customer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  expected_duration numeric NOT NULL,
  budget jsonb NOT NULL,
  status text CHECK (status IN ('pending', 'accepted', 'in-progress', 'completed', 'cancelled')) DEFAULT 'pending',
  posted_at timestamptz DEFAULT now(),
  accepted_bid_id uuid,
  provider_id uuid REFERENCES profiles(id),
  start_time timestamptz,
  end_time timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bids Table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  provider_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  price numeric NOT NULL,
  message text NOT NULL,
  estimated_duration numeric,
  status text CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Conversations Table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participants uuid[] NOT NULL,
  job_id uuid REFERENCES jobs(id),
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  text text NOT NULL,
  voice_message_url text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  commission numeric NOT NULL,
  booking_fee numeric NOT NULL,
  net_amount numeric NOT NULL,
  status text CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  payment_method text DEFAULT 'card',
  transaction_id text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  refunded_at timestamptz
);

-- Wallets Table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  balance numeric DEFAULT 0,
  currency text DEFAULT 'ZAR',
  status text CHECK (status IN ('active', 'suspended', 'closed')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES wallets(id) ON DELETE CASCADE,
  type text CHECK (type IN ('credit', 'debit')) NOT NULL,
  amount numeric NOT NULL,
  description text NOT NULL,
  reference text,
  balance_before numeric NOT NULL,
  balance_after numeric NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Security Alerts Table
CREATE TABLE IF NOT EXISTS security_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  user_id uuid REFERENCES profiles(id),
  type text CHECK (type IN ('duration_exceeded', 'no_response', 'emergency', 'manual')) NOT NULL,
  status text CHECK (status IN ('pending', 'acknowledged', 'resolved')) DEFAULT 'pending',
  location jsonb,
  description text NOT NULL,
  security_team_id text,
  response_time integer,
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- Job Timers Table
CREATE TABLE IF NOT EXISTS job_timers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE UNIQUE,
  start_time timestamptz NOT NULL,
  expected_duration numeric NOT NULL,
  warning_threshold numeric NOT NULL,
  max_duration numeric NOT NULL,
  last_check_in timestamptz,
  status text CHECK (status IN ('active', 'completed', 'overdue', 'emergency')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- AI Learning Data Table
CREATE TABLE IF NOT EXISTS ai_learning_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  behavior_data jsonb NOT NULL DEFAULT '{}',
  learning_context jsonb NOT NULL DEFAULT '{}',
  personalized_tips text[] DEFAULT '{}',
  user_level text CHECK (user_level IN ('beginner', 'intermediate', 'expert')) DEFAULT 'beginner',
  last_interaction timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Market Intelligence Table
CREATE TABLE IF NOT EXISTS market_intelligence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  demand_score numeric NOT NULL,
  pricing_data jsonb NOT NULL,
  competitor_data jsonb NOT NULL,
  seasonal_patterns jsonb NOT NULL,
  customer_preferences jsonb NOT NULL,
  region text,
  effective_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Voice Interaction Logs Table
CREATE TABLE IF NOT EXISTS voice_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  interaction_type text NOT NULL,
  input_text text,
  output_text text,
  audio_url text,
  success boolean DEFAULT true,
  duration_ms integer,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_timers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_learning_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_interactions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Public profiles are viewable"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Jobs Policies
CREATE POLICY "Anyone can view jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Customers can create jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (customer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Job owners can update jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (customer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Bids Policies
CREATE POLICY "Anyone can view bids"
  ON bids FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Providers can create bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (provider_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Bid owners can update bids"
  ON bids FOR UPDATE
  TO authenticated
  USING (provider_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Conversations Policies
CREATE POLICY "Participants can view conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND id = ANY(participants)
    )
  );

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND id = ANY(participants)
    )
  );

-- Messages Policies
CREATE POLICY "Conversation participants can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      JOIN profiles p ON p.id = ANY(c.participants)
      WHERE c.id = conversation_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Wallets Policies
CREATE POLICY "Users can view own wallet"
  ON wallets FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own wallet"
  ON wallets FOR UPDATE
  TO authenticated
  USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Transactions Policies
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    wallet_id IN (
      SELECT w.id FROM wallets w
      JOIN profiles p ON p.id = w.user_id
      WHERE p.user_id = auth.uid()
    )
  );

-- AI Learning Data Policies
CREATE POLICY "Users can access own AI data"
  ON ai_learning_data FOR ALL
  TO authenticated
  USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Voice Interactions Policies
CREATE POLICY "Users can access own voice data"
  ON voice_interactions FOR ALL
  TO authenticated
  USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Market Intelligence Policies (Public read access)
CREATE POLICY "Anyone can view market intelligence"
  ON market_intelligence FOR SELECT
  TO authenticated
  USING (true);

-- Security Alerts Policies
CREATE POLICY "Users can view related security alerts"
  ON security_alerts FOR SELECT
  TO authenticated
  USING (
    user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR
    job_id IN (
      SELECT id FROM jobs 
      WHERE customer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR
            provider_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

-- Job Timers Policies
CREATE POLICY "Users can view related job timers"
  ON job_timers FOR SELECT
  TO authenticated
  USING (
    job_id IN (
      SELECT id FROM jobs 
      WHERE customer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR
            provider_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_customer_id ON jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_provider_id ON jobs(provider_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_bids_job_id ON bids(job_id);
CREATE INDEX IF NOT EXISTS idx_bids_provider_id ON bids(provider_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_ai_learning_user_id ON ai_learning_data(user_id);
CREATE INDEX IF NOT EXISTS idx_voice_interactions_user_id ON voice_interactions(user_id);

-- Create functions for automatic wallet creation
CREATE OR REPLACE FUNCTION create_user_wallet()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wallets (user_id, balance, currency, status)
  VALUES (NEW.id, 0, 'ZAR', 'active');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic wallet creation
CREATE TRIGGER create_wallet_on_profile_insert
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_user_wallet();

-- Create function for updating wallet balance
CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE wallets 
  SET balance = NEW.balance_after, updated_at = now()
  WHERE id = NEW.wallet_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for wallet balance updates
CREATE TRIGGER update_wallet_on_transaction
  AFTER INSERT ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_wallet_balance();

-- Create function for updating conversation last message
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations 
  SET last_message_at = NEW.created_at, updated_at = now()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for conversation updates
CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_last_message();