# Aptly.co - Learning That Sticks

A modern, production-ready educational platform specializing in Meta certification preparation. Built with Next.js 14, TypeScript, and cutting-edge web technologies.

## 🚀 Features

- **AI-Powered Learning**: Integrated AI chat support for personalized learning assistance
- **Interactive Study Tools**: Dynamic flashcards, adaptive quizzes, and progress tracking  
- **Mobile-First Design**: Responsive design optimized for all devices
- **Performance Optimized**: Built with Core Web Vitals in mind
- **Accessibility First**: WCAG 2.1 compliant with comprehensive screen reader support
- **SEO Optimized**: Complete meta tags, sitemap, and structured data
- **Security Hardened**: CSP headers, rate limiting, and input validation

## 🛠️ Technologies

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion, Custom CSS animations
- **AI Integration**: Vercel AI SDK with OpenAI, Anthropic, and Replicate
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore  
- **Storage**: Firebase Storage
- **Deployment**: Vercel (recommended)
- **Analytics**: Google Analytics 4 support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aptly.co.git
   cd aptly.co
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys and configuration:
   - OpenAI API key
   - Anthropic API key  
   - Deepgram API key
   - Replicate API token
   - Firebase configuration
   - Google Analytics ID (optional)

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

See `.env.example` for all required environment variables.

### Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication, Firestore, and Storage
3. Add your config to `.env.local`

### API Keys

- **OpenAI**: Get your key at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Anthropic**: Get your key at [https://console.anthropic.com](https://console.anthropic.com)
- **Deepgram**: Get your key at [https://console.deepgram.com](https://console.deepgram.com)
- **Replicate**: Get your token at [https://replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)

## 📱 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── about/          # About page
│   ├── courses/        # Courses page
│   ├── study-app/      # Study app page
│   └── ...
├── components/         # Reusable components
│   ├── ui/            # UI components
│   ├── magicui/       # Animated UI components
│   ├── Performance/   # Performance optimization components
│   └── Accessibility/ # Accessibility components
└── lib/               # Utilities and configuration
    ├── contexts/      # React contexts
    ├── firebase/      # Firebase configuration
    ├── hooks/         # Custom React hooks
    └── utils/         # Utility functions
```

## 🎨 Brand Guidelines

The design follows Aptly's brand guidelines with the color palette:
- **Primary Navy**: `#0A0C2A`
- **Teal**: `#7AB8BD` 
- **Yellow**: `#F1D632`
- **Secondary Purple**: `#3B3366`
- **Light Teal**: `#21a8b0`

## 🔒 Security

- Content Security Policy (CSP) headers
- Rate limiting on API endpoints
- Input validation with Zod schemas
- Secure API key handling
- CORS configuration

## 📊 Performance

- Image optimization with Next.js Image component
- Bundle size optimization
- Code splitting and lazy loading
- Performance monitoring with Core Web Vitals
- Compression and caching headers

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimization
- Focus management
- Skip navigation links
- Semantic HTML structure

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run start
```

## 📈 Analytics

Google Analytics 4 is integrated. Set your tracking ID in `NEXT_PUBLIC_GA_TRACKING_ID`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

---

Built with ❤️ by the Aptly team# Trigger Vercel deployment after GitHub connection
