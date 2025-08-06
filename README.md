# Adrealestate - Real Estate Platform

A modern real estate platform built with React, TypeScript, Vite, and Supabase. Features property listings, search functionality, user authentication, admin dashboard, and AI-powered chat assistance.

## 🚀 Features

- **Property Management**: Browse, search, and filter property listings
- **User Authentication**: Secure login/signup with Supabase Auth
- **Admin Dashboard**: Comprehensive property and user management
- **AI Chat Assistant**: PropMate - AI-powered real estate assistant
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components and Radix UI
- **Image Management**: AWS S3 integration for property images
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

Create a `.env.local` file in the root directory and add your environment variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AWS S3 Configuration (for image uploads)
VITE_AWS_ACCESS_KEY_ID=your_aws_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
VITE_AWS_REGION=your_aws_region
VITE_AWS_BUCKET_NAME=your_s3_bucket_name

# Optional: API Keys for AI features
VITE_GEMINI_API_KEY=your_gemini_api_key
```

#### Getting Supabase Credentials:

1. Visit [Supabase](https://supabase.com/) and create a new project
2. Go to Settings → API
3. Copy your project URL and anon key
4. Set up your database tables (see Database Setup below)

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

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login and deploy:
```bash
vercel login
vercel --prod
```

3. Set environment variables in your Vercel dashboard

### Deploy to Other Platforms

The project can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting service
3. Configure environment variables on your hosting platform

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
2. **Environment Variables**: Check that all required environment variables are set
3. **Supabase Connection**: Verify your Supabase URL and keys are correct
4. **Port Conflicts**: The dev server runs on port 8080 by default

### Getting Help

- Check the [Issues](../../issues) section for known problems
- Review the console for error messages
- Ensure your Node.js version is compatible (v18+)

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