# PieceJob - AI-Powered Job Marketplace

A revolutionary mobile-first job marketplace that connects customers with service providers using AI-powered features and voice assistance.

## 🚀 Features

### Core Functionality
- **Job Marketplace**: Post and bid on various service jobs
- **AI-Powered Matching**: Smart job recommendations based on skills and location
- **Voice Assistant**: Hands-free messaging and daily summaries
- **Real-time Messaging**: Communicate with customers and providers
- **Secure Payments**: Built-in payment processing with commission handling
- **Safety Features**: Job timers, emergency buttons, and security monitoring

### AI Features
- **Smart Bidding Assistant**: AI analyzes market data to suggest optimal bids
- **Predictive Analytics**: Earnings forecasts and demand predictions
- **Market Intelligence**: Real-time insights on pricing and competition
- **Adaptive Learning**: Personalized recommendations based on user behavior

### Voice Features
- **ElevenLabs Integration**: Professional text-to-speech for messages
- **Voice Tutorials**: Hands-free onboarding and feature guidance
- **Daily Summaries**: AI-generated performance reports
- **Voice Messaging**: Complete voice interaction workflows

## 🛠 Tech Stack

- **Framework**: Expo Router with React Native
- **SDK Version**: Expo SDK 53
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Styling**: StyleSheet with custom design system
- **Icons**: Lucide React Native
- **Voice AI**: ElevenLabs API
- **Database**: Supabase (configured for future use)
- **Payments**: Integrated payment service with commission handling

## 📱 Platform Support

- **Web**: Full feature support including voice synthesis
- **iOS**: Optimized mobile experience with voice fallbacks
- **Android**: Native performance with adaptive features

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Expo CLI
- ElevenLabs API key (for voice features)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd piecejob-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Start the development server
```bash
npm start
```

### Environment Variables

Create a `.env` file with:

```env
EXPO_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_APP_ENV=development
```

## 📦 Deployment

### Web Deployment
```bash
npx expo export --platform web
```

### Mobile App Stores
```bash
# Build for iOS
eas build --platform ios

# Build for Android  
eas build --platform android
```

### EAS Configuration
The app includes `eas.json` for Expo Application Services deployment.

## 🏗 Architecture

### File Structure
```
app/
├── (tabs)/           # Tab-based navigation
│   ├── index.tsx     # Home screen
│   ├── jobs/         # Job-related screens
│   ├── messages/     # Messaging system
│   ├── post/         # Job posting
│   └── profile/      # User profile
├── _layout.tsx       # Root layout
└── fonts.ts          # Font configuration

components/
├── ai/               # AI-powered components
├── job/              # Job-related components
├── message/          # Messaging components
├── ui/               # Reusable UI components
└── voice/            # Voice assistant components

utils/
├── aiLearningService.ts    # AI learning and recommendations
├── voiceService.ts         # Voice synthesis and recognition
├── paymentService.ts       # Payment processing
├── securityService.ts      # Safety and security features
└── mockData.ts            # Development data
```

### Key Components

- **AI Job Matcher**: Analyzes user behavior to recommend relevant jobs
- **Smart Bid Assistant**: Uses market data to optimize bid strategies  
- **Voice Message Player**: Hands-free messaging with speech synthesis
- **Security Service**: Job monitoring and emergency response
- **Payment Service**: Commission calculation and transaction handling

## 🔧 Configuration

### Voice Features
- ElevenLabs API integration for professional voice synthesis
- Web Speech API for voice recognition (web only)
- Graceful fallbacks for mobile platforms

### AI Learning
- User behavior tracking and analysis
- Personalized recommendations engine
- Market intelligence and pricing optimization

### Security
- Job timer monitoring with automatic alerts
- Emergency button integration
- Background checks and verification system

## 📄 Legal

- Privacy Policy: `/privacy-policy`
- Terms of Service: `/terms-of-service`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: support@piecejob.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using Expo SDK 53 and React Native