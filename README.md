# PieceJob - Voice-Enabled Job Marketplace

A comprehensive React Native Expo app for connecting customers with service providers, featuring innovative voice-based notifications and replies powered by ElevenLabs AI.

## 🎯 Key Features

### Core Marketplace
- **Job Management**: Post, browse, and manage service jobs across multiple categories
- **Bidding System**: Service providers can submit competitive bids
- **Real-time Messaging**: Direct communication between customers and providers
- **Payment Processing**: Secure payment handling with commission calculations
- **Security Features**: Job timers, emergency buttons, and safety monitoring
- **User Profiles**: Verification badges, ratings, and comprehensive profiles

### 🎤 Voice AI Features (NEW!)
- **Voice Notifications**: Messages read aloud using ElevenLabs text-to-speech
- **Voice Replies**: Hands-free message composition using speech-to-text
- **Conversational Flow**: Natural voice interactions with confirmation steps
- **Smart Recognition**: Understands "yes/no" responses for seamless operation

## 🚀 Voice Feature Demo Flow

1. **Notification Arrives**: "New message from Alex: Hi, are you available tomorrow morning for cleaning?"
2. **Voice Prompt**: "Would you like to respond?"
3. **User Response**: "Yes"
4. **Recording**: "Okay, I'm listening. What would you like to say?"
5. **User Reply**: "Yes, I'm available from 9AM to 12PM. Does that work for you?"
6. **Confirmation**: "You said: 'Yes, I'm available from 9AM to 12PM. Does that work for you?' Should I send this?"
7. **Final Confirmation**: "Yes" → Message sent!

## 🛠 Tech Stack

- **Frontend**: React Native with Expo Router
- **Voice AI**: ElevenLabs API for text-to-speech
- **Speech Recognition**: Web Speech API
- **Navigation**: Expo Router with tab-based architecture
- **Styling**: StyleSheet with comprehensive design system
- **Icons**: Lucide React Native
- **Fonts**: Poppins via Google Fonts

## 📱 App Structure

```
app/
├── (tabs)/
│   ├── index.tsx          # Home screen with job categories
│   ├── jobs/              # Job browsing and management
│   ├── post/              # Job posting interface
│   ├── messages/          # Messaging with voice features
│   └── profile/           # User profile with voice settings
components/
├── voice/                 # Voice AI components
│   ├── VoiceNotificationHandler.tsx
│   ├── VoiceReplyInterface.tsx
│   ├── VoiceMessageButton.tsx
│   └── VoiceSettingsCard.tsx
├── ui/                    # Reusable UI components
└── job/                   # Job-specific components
```

## 🔧 Setup Instructions

### 1. Environment Configuration

Create a `.env` file with your ElevenLabs credentials:

```env
EXPO_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here
EXPO_PUBLIC_ELEVENLABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Enable Voice Features

1. Navigate to Profile tab
2. Toggle "Voice Notifications" on
3. Test the voice assistant
4. Grant microphone permissions when prompted

## 🎯 Voice Feature Usage

### For Service Providers
1. **Enable Voice**: Go to Profile → Voice Notifications → Toggle ON
2. **Receive Notifications**: Messages are automatically read aloud
3. **Voice Reply**: Tap "Voice Reply" button or wait for automatic prompt
4. **Hands-free Operation**: Perfect when working with tools or busy hands

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Safari
- ✅ Edge
- ❌ Firefox (limited speech recognition support)

## 🏆 Hackathon Alignment

This project demonstrates:

- **Voice AI Challenge**: ElevenLabs integration for natural speech
- **Conversational AI**: Intuitive voice-based user interactions
- **Built with Purpose**: Solving real accessibility and usability challenges
- **Production Ready**: Comprehensive feature set with professional UI/UX

## 🔮 Future Enhancements

- **Multi-language Support**: Voice features in multiple languages
- **Voice Commands**: "Show me cleaning jobs near me"
- **Smart Scheduling**: Voice-based appointment booking
- **Offline Voice**: Local speech processing capabilities
- **Voice Analytics**: Usage patterns and optimization insights

## 📄 License

This project is built for demonstration purposes and showcases the integration of voice AI technologies in mobile applications.

---

**Perfect for busy service providers who need hands-free communication while working!** 🎤✨