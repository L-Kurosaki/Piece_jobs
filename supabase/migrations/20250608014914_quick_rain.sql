/*
  # Create auth trigger for profile creation

  1. Functions
    - create_user_profile: Creates a profile when a user signs up
    - create_user_wallet: Creates a wallet when a profile is created

  2. Triggers
    - on_auth_user_created: Triggers profile creation on user signup
    - create_wallet_on_profile_insert: Triggers wallet creation on profile insert

  3. Security
    - Functions are security definer to allow profile creation
*/

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    name,
    email,
    phone,
    role,
    location,
    rating,
    skills,
    verification_status,
    member_since
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
    '{"address": "", "latitude": 0, "longitude": 0}'::jsonb,
    '{"totalReviews": 0, "averageRating": 0}'::jsonb,
    '[]'::jsonb,
    '{"address": "pending", "identity": "pending", "background": "pending"}'::jsonb,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create user wallet on profile creation
CREATE OR REPLACE FUNCTION create_user_wallet()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.wallets (
    user_id,
    balance,
    currency,
    status
  ) VALUES (
    NEW.id,
    0,
    'ZAR',
    'active'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update conversation last message timestamp
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations
  SET last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update wallet balance on transaction
CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.wallets
  SET 
    balance = NEW.balance_after,
    updated_at = NOW()
  WHERE id = NEW.wallet_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auth user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- Trigger for wallet creation (already exists in schema)
-- CREATE TRIGGER create_wallet_on_profile_insert
--   AFTER INSERT ON public.profiles
--   FOR EACH ROW EXECUTE FUNCTION create_user_wallet();