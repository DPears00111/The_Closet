# The Closet - E-Commerce Platform

A modern, responsive e-commerce platform built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Responsive Design** - Mobile-first design with full responsive support
- **User Authentication** - Secure sign-up and sign-in with Supabase
- **Profile Management** - Users can create and edit their profiles with shipping addresses
- **Product Catalog** - Browse and filter products by category
- **Shopping Cart** - Add/remove items with persistent cart state
- **Checkout** - Complete checkout flow with order management
- **Admin Features** - Product and order management

## Tech Stack

- **Frontend** - React 18 with TypeScript
- **Styling** - Tailwind CSS with shadcn/ui components
- **Build** - Vite for fast development and optimized production builds
- **Backend** - Supabase (PostgreSQL + Auth + Storage)
- **State Management** - Zustand for cart state, React hooks for auth/profile
- **Testing** - Vitest
- **Deployment** - Vercel

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Supabase account (free at https://supabase.com)

### Installation

```sh
# Clone repository
git clone <YOUR_GIT_URL>
cd the-closet-collection

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Supabase credentials

# Start development server
npm run dev
```

Development server will run at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm run test:watch` - Run tests in watch mode

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

Get these values from your Supabase project settings.

## Deployment

The project is configured for easy deployment to Vercel.

### Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Add environment variables in Vercel project settings
4. Vercel will automatically detect Vite configuration and deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
src/
├── assets/          # Static assets and product images
├── components/      # Reusable React components
│   └── ui/         # shadcn/ui component library
├── data/           # Static data (products, constants)
├── hooks/          # Custom React hooks
├── integrations/   # Third-party integrations (Supabase)
├── lib/            # Utility functions
├── pages/          # Page components
├── stores/         # State management (Zustand)
└── test/           # Test files
```

## Documentation

- [Supabase Setup](./SUPABASE_SETUP.md) - Database schema and configuration
- [Profile Setup](./PROFILE_SETUP.md) - User authentication and profile management
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to Vercel

## Security

- Supabase handles secure password hashing and session management
- Row Level Security (RLS) policies enforce data access control
- Public facing credentials (anon key) have limited permissions via RLS
- All sensitive data is protected by database policies

## Performance

- Code splitting and tree-shaking via Vite
- Optimized image serving from `/public` folder
- Automatic CSS minification and optimization
- TypeScript for type safety and better IDE support
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
