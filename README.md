# Adrealestate - Real Estate Platform

A modern real estate platform built with React, TypeScript, Vite, and Supabase. Features property listings, search functionality, user authentication, admin dashboard, and AI-powered chat assistance.

## 🚀 Features

- **Property Management**: Browse, search, and filter property listings
- **User Authentication**: Secure login/signup with Supabase Auth
- **Admin Dashboard**: Comprehensive property and user management
- **AI Chat Assistant**: PropMate - AI-powered real estate assistant
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components and Radix UI
- **Image Management**: Cloudflare R2 integration for property images
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Supabase (Database, Auth, Storage)
- **State Management**: React Query, Context API
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** or **bun** package manager
- **Git** - [Download](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Adrealestate
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using bun
bun install
```

### 3. Environment Setup

**⚠️ IMPORTANT SECURITY NOTICE**: This project currently has hardcoded credentials that should be moved to environment variables for production use.

#### Currently Hardcoded Values Found:

**Supabase Configuration** (in `src/integrations/supabase/client.ts`):
- URL: `https://bilfqlcylzhcahvoodvf.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (hardcoded)

**Gemini AI API** (in `api/prop-mate-chat.ts`):
- API Key: `AIzaSyBZ3Jit0dXfhOFPM9gtA0v9BT4GNzTy4A4` (hardcoded)

**Cloudflare R2 Storage** (in `api/upload-image.ts`):
- Endpoint: `https://f03575aba5adc8b38d5d4c3a14e1a3d8.r2.cloudflarestorage.com`
- Access Key: `e58a6a28d82e3cf184423f2c1dde1aa7` (hardcoded)
- Secret Key: `bc44bf27a3ea398545d08b6e12c048ce429fea5a985027102a5dba4002ec8b1c` (hardcoded)
- Bucket: `adrealestates`
- Public URL: `https://pub-1c1af3c130fa48289cdc911af4e9c00f.r2.dev`

**Contact Information** (in `src/components/Footer.tsx`):
- Phone: `+91 97908 42020`
- Email: `mailafad2k25@gmail.com`
- Address: `No.1, Kalaignar Street, Anna Nagar, Pammal, Chennai-75`

#### Recommended Environment Variables Setup:

Create a `.env.local` file in the root directory and move these hardcoded values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://bilfqlcylzhcahvoodvf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbGZxbGN5bHpoY2Fodm9vZHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODQwMDgsImV4cCI6MjA1OTk2MDAwOH0.osmxgTf-GTBrPPwSTMXFi17K8UG9_F9_HM-4dKGe73U

# Gemini AI Configuration
VITE_GEMINI_API_KEY=AIzaSyBZ3Jit0dXfhOFPM9gtA0v9BT4GNzTy4A4

# Cloudflare R2 Configuration
VITE_R2_ENDPOINT=https://f03575aba5adc8b38d5d4c3a14e1a3d8.r2.cloudflarestorage.com
VITE_R2_ACCESS_KEY_ID=e58a6a28d82e3cf184423f2c1dde1aa7
VITE_R2_SECRET_ACCESS_KEY=bc44bf27a3ea398545d08b6e12c048ce429fea5a985027102a5dba4002ec8b1c
VITE_R2_BUCKET=adrealestates
VITE_R2_PUBLIC_URL=https://pub-1c1af3c130fa48289cdc911af4e9c00f.r2.dev

# Contact Information (optional to make configurable)
VITE_CONTACT_PHONE=+91 97908 42020
VITE_CONTACT_EMAIL=mailafad2k25@gmail.com
VITE_CONTACT_ADDRESS=No.1, Kalaignar Street, Anna Nagar, Pammal, Chennai-75
```

#### Security Recommendations:

1. **Move hardcoded credentials to environment variables**
2. **Add `.env.local` to `.gitignore`** (currently missing)
3. **Regenerate API keys and credentials** if this code is public
4. **Use different credentials for development and production**

#### For New Setup:

If you're setting up fresh credentials:
1. Visit [Supabase](https://supabase.com/) and create a new project
2. Visit [Google AI Studio](https://makersuite.google.com/) for Gemini API key
3. Visit [Cloudflare R2](https://developers.cloudflare.com/r2/) for storage setup

### ⚡ Current Setup (Hardcoded - Works Out of the Box)

The project is currently configured to work immediately without any environment setup because all credentials are hardcoded in the source code. This means:

✅ **Pros:**
- Clone and run immediately with `npm install && npm run dev`
- No environment configuration needed
- All services (Supabase, Gemini AI, R2 storage) work instantly

❌ **Cons:**
- Security risk (credentials exposed in code)
- Shared API limits across all users
- Not suitable for production deployment
- Cannot use your own services/databases

### 🔒 Recommended Setup (Environment Variables)

For production or to use your own services, follow the environment setup above and refactor the code to use environment variables instead of hardcoded values.

### 4. Database Setup

The project uses Supabase as the backend. You'll need to set up the following tables:

1. **Properties Table**: Store property listings
2. **Users Table**: Managed by Supabase Auth
3. **Favorites Table**: User's favorite properties
4. **Contacts Table**: Contact form submissions
5. **Listing Requests Table**: Property listing requests

You can find the database schema in the Supabase dashboard or create tables manually based on the TypeScript types in [`src/types/`](./src/types/).

### 5. Run the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun dev
```

The application will be available at `http://localhost:8080`

## 📁 Project Structure

```
Adrealestate/
├── api/                    # Vercel API functions
│   ├── prop-mate-chat.ts   # AI chat endpoint
│   ├── upload-image.ts     # Image upload endpoint
│   └── property-share/     # Property sharing endpoints
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── admin/         # Admin-specific components
│   │   ├── auth/          # Authentication components
│   │   └── property/      # Property-related components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── integrations/      # Third-party integrations
│   ├── lib/               # Utility libraries
│   ├── pages/             # Application pages
│   ├── styles/            # CSS styles
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── supabase/              # Supabase configuration
└── package.json
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run build:dev    # Build for development

# Code Quality
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 🚀 Deployment

### Deploy to Vercel

**⚠️ Important**: Since credentials are currently hardcoded, the project will work as-is but this is NOT recommended for production.

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login and deploy:
```bash
vercel login
vercel --prod
```

3. **For Production**: Set environment variables in your Vercel dashboard and update the code to use them instead of hardcoded values

### Deploy to Other Platforms

The project can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting service
3. **Currently works without additional configuration** due to hardcoded credentials
4. **For Production**: Configure environment variables on your hosting platform and refactor code

### Security Notes for Production:

- **Never commit API keys or credentials to version control**
- **Regenerate all API keys before production deployment**
- **Use different credentials for development and production environments**
- **Add proper environment variable validation**

## 🔐 Authentication & Admin Access

### User Authentication
- Users can sign up/login using email and password
- Authentication is handled by Supabase Auth
- Protected routes require user authentication

### Admin Access
- Admin users have additional privileges
- Access admin dashboard at `/admin`
- Manage properties, users, and content

## 🎨 Customization

### Styling
- Modify [`tailwind.config.ts`](./tailwind.config.ts) for theme customization
- Update CSS variables in [`src/index.css`](./src/index.css)
- Component styles are in [`src/components/ui/`](./src/components/ui/)

### Configuration
- Update app configuration in [`vite.config.ts`](./vite.config.ts)
- Modify build settings and plugins as needed

## 🤖 AI Features

The application includes PropMate, an AI-powered real estate assistant:

- Powered by Google Gemini API
- Provides property recommendations
- Answers real estate questions
- Voice interaction support

## 📱 Mobile Support

The application is fully responsive and optimized for:
- Desktop browsers
- Tablets
- Mobile devices
- Progressive Web App (PWA) features

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed with `npm install`
2. **API Limits**: The hardcoded Gemini API key may have usage limits
3. **Supabase Connection**: Currently uses hardcoded credentials (project: bilfqlcylzhcahvoodvf)
4. **Port Conflicts**: The dev server runs on port 8080 by default
5. **Image Upload Issues**: R2 storage credentials are hardcoded, check if they're still valid

### Current Limitations

- **Hardcoded credentials** may stop working if keys are rotated
- **No environment variable validation**
- **Shared API limits** across all deployments using the same keys
- **Security vulnerabilities** due to exposed credentials

### Getting Help

- Check the [Issues](../../issues) section for known problems
- Review the console for error messages
- Ensure your Node.js version is compatible (v18+)
- If APIs fail, check if hardcoded keys are still valid

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ using modern web technologies