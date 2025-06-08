interface Config {
  elevenlabsApiKey: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  apiUrl: string;
  appEnv: 'development' | 'staging' | 'production';
}

const config: Config = {
  elevenlabsApiKey: process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY || '',
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.piecejob.com',
  appEnv: (process.env.EXPO_PUBLIC_APP_ENV as any) || 'development',
};

// Validate required environment variables
if (!config.elevenlabsApiKey && config.appEnv === 'production') {
  console.warn('ElevenLabs API key not configured - voice features will use fallbacks');
}

export default config;