# 🎬 Cineverse - Your Ultimate Movie Discovery Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-Genkit%20AI-orange?style=for-the-badge)](https://genkit.ai/)

> Discover, explore, and dive deep into the world of cinema with Cineverse - a modern, AI-powered movie discovery platform built with cutting-edge web technologies.

## ✨ Features

### 🎥 **Movie Discovery**

- **Popular Movies**: Browse trending and popular films
- **Advanced Search**: Filter by genre, year, rating, and more
- **Rich Details**: Comprehensive movie information including cast, runtime, and ratings
- **Beautiful UI**: Modern, responsive design with stunning movie posters and backdrops

### 🤖 **AI-Powered Features**

- **Trailer Summarization**: AI-generated plot summaries from movie trailers
- **Smart Recommendations**: Intelligent movie suggestions based on your preferences
- **Content Analysis**: Deep insights into movie content and themes

### 🎨 **Modern User Experience**

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Hero Section**: Dynamic featured movie showcase with random selection
- **Smooth Animations**: Elegant transitions and hover effects
- **Dark Mode Ready**: Beautiful dark theme optimized for movie viewing

### 🔧 **Developer Experience**

- **TypeScript**: Full type safety and better development experience
- **Component Library**: Comprehensive UI components built with Radix UI
- **Modern Tooling**: Next.js 15 with Turbopack for lightning-fast development
- **AI Integration**: Seamless integration with Google AI and Genkit

## 🚀 Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

### **AI & Backend**

- **Genkit AI** - AI development framework
- **Google AI** - Advanced AI capabilities

### **Development Tools**

- **Turbopack** - Lightning-fast bundler
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **Lucide React** - Beautiful icons

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- TMDB API key (for movie data)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cineverse.git
cd cineverse
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

  ```env
  NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
  ```

**Get your TMDB API key:**

1. Visit [TMDB](https://www.themoviedb.org/settings/api)
2. Create an account and request an API key
3. Copy the API key to your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack

# Production
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run typecheck       # Run TypeScript type checking
```

## 🏗️ Project Structure

```bash
cineverse/
├── src/
│   ├── ai/                    # AI flows and Genkit integration
│   │   ├── flows/            # AI-powered features
│   │   └── genkit.ts         # Genkit configuration
│   ├── app/                   # Next.js App Router
│   │   ├── movies/[id]/      # Individual movie pages
│   │   └── page.tsx          # Home page
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── Hero.tsx          # Hero section component
│   │   ├── MovieCard.tsx     # Movie card component
│   │   └── MovieList.tsx     # Movie list component
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and API calls
│   │   ├── movies.ts         # TMDB API integration
│   │   └── utils.ts          # Helper functions
│   └── globals.css           # Global styles
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind CSS configuration
└── package.json               # Dependencies and scripts
```

## 🔌 API Integration

### TMDB API

Cineverse integrates with The Movie Database (TMDB) API to provide:

- Movie information and metadata
- Cast and crew details
- Movie posters and backdrops
- Search and discovery functionality
- Genre and rating filters

### AI Features

- **Trailer Summarization**: Analyze movie trailers and generate plot summaries
- **Content Analysis**: Deep insights into movie themes and content
- **Smart Recommendations**: AI-powered movie suggestions

## 🎨 UI Components

The project includes a comprehensive set of UI components built with Radix UI:

- **Navigation**: Header, footer, and navigation components
- **Cards**: Movie cards with hover effects and animations
- **Forms**: Search forms with advanced filtering
- **Modals**: Dialog components for detailed views
- **Icons**: Beautiful Lucide React icons throughout the interface

## 🌟 Key Features in Detail

### Hero Section

- Dynamic featured movie showcase
- Random movie selection from popular films
- Beautiful backdrop images with gradient overlays
- Movie metadata display (rating, year, runtime)
- Call-to-action buttons for immediate engagement

### Movie Discovery

- Advanced search with multiple filters
- Genre-based categorization
- Year and rating filters
- Responsive grid layout
- Lazy loading for optimal performance

### AI Integration

- Seamless AI-powered features
- Trailer analysis and summarization
- Intelligent content recommendations
- Natural language processing capabilities

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB** for providing the movie database API
- **Next.js** team for the amazing framework
- **Vercel** for the deployment platform
- **Genkit AI** for AI development tools
- **Radix UI** for accessible component primitives

---

<div align="center" style="margin-top:20px">
  <p>Made with ❤️ by Praham Darji</p>
  <p>Star this repo if you found it helpful! ⭐</p>
</div>