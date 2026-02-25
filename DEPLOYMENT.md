# Vercel Deployment Guide

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- Git repository pushed to GitHub/GitLab/Bitbucket
- Supabase project with environment variables

## Environment Variables Setup

Before deploying to Vercel, add the following environment variables in your Vercel project settings:

1. **VITE_SUPABASE_URL** - Your Supabase project URL (e.g., `https://xxxx.supabase.co`)
2. **VITE_SUPABASE_PUBLISHABLE_KEY** - Your Supabase anonymous public key
3. **VITE_SUPABASE_PROJECT_ID** - Your Supabase project ID

## Deployment Steps

### Option 1: Deploy via Git (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New..." → "Project"
4. Import your Git repository
5. Vercel will auto-detect Vite configuration
6. Add environment variables in the "Environment Variables" section
7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

## Authentication & CORS

Your Supabase credentials are public-facing (anon key) and safe to expose in the frontend. The publishable key has limited permissions defined by your Supabase RLS policies.

Ensure your Supabase project's CORS settings allow requests from your Vercel domain:

- In Supabase Dashboard → Project Settings → API
- Add your Vercel domain to the allowed origins (e.g., `https://your-site.vercel.app`)

## Post-Deployment

1. Test authentication flow on deployed site
2. Verify profile creation and editing work
3. Test all API calls to Supabase
4. Monitor function logs for any errors

## Troubleshooting

### Build fails

- Ensure all dependencies are in `package.json`
- Check that Vite build completes locally with `npm run build`
- Verify TypeScript types are correct

### Environment variables not loading

- Confirm variables are added to Vercel project settings (not `.env` file)
- Variable names must start with `VITE_` to be accessible in browser
- Redeploy after adding environment variables

### Authentication issues

- Check Supabase URL in environment variables
- Verify Supabase project is active
- Check browser console for error messages

## Performance Optimization

- Vite automatically handles code splitting and tree-shaking
- Images in `/public` folder are served as static assets
- CSS is automatically minified and optimized
- TypeScript is compiled to optimized JavaScript

## See Also

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
