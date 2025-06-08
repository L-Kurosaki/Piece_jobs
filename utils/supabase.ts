import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Auth helpers
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Profile helpers
export const createProfile = async (profileData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profileData])
    .select()
    .single();
  return { data, error };
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();
  return { data, error };
};

// Job helpers
export const createJob = async (jobData: any) => {
  const { data, error } = await supabase
    .from('jobs')
    .insert([jobData])
    .select()
    .single();
  return { data, error };
};

export const getJobs = async (filters?: any) => {
  let query = supabase
    .from('jobs')
    .select(`
      *,
      customer:profiles!jobs_customer_id_fkey(*),
      provider:profiles!jobs_provider_id_fkey(*),
      bids(*)
    `);

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

export const getJobById = async (jobId: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      customer:profiles!jobs_customer_id_fkey(*),
      provider:profiles!jobs_provider_id_fkey(*),
      bids(
        *,
        provider:profiles!bids_provider_id_fkey(*)
      )
    `)
    .eq('id', jobId)
    .single();
  return { data, error };
};

// Bid helpers
export const createBid = async (bidData: any) => {
  const { data, error } = await supabase
    .from('bids')
    .insert([bidData])
    .select()
    .single();
  return { data, error };
};

export const getBidsForJob = async (jobId: string) => {
  const { data, error } = await supabase
    .from('bids')
    .select(`
      *,
      provider:profiles!bids_provider_id_fkey(*)
    `)
    .eq('job_id', jobId)
    .order('created_at', { ascending: false });
  return { data, error };
};

// Message helpers
export const getConversations = async (userId: string) => {
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      job:jobs(*),
      messages(
        *,
        sender:profiles!messages_sender_id_fkey(*),
        receiver:profiles!messages_receiver_id_fkey(*)
      )
    `)
    .contains('participants', [userId])
    .order('last_message_at', { ascending: false });
  return { data, error };
};

export const sendMessage = async (messageData: any) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([messageData])
    .select()
    .single();
  return { data, error };
};

// Wallet helpers
export const getWallet = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

export const getTransactions = async (walletId: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('wallet_id', walletId)
    .order('created_at', { ascending: false });
  return { data, error };
};