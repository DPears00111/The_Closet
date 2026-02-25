# Netlify Deployment Guide

## Prerequisites

- Netlify account (sign up at https://netlify.com)
- Git repository pushed to GitHub/GitLab/Bitbucket
- Supabase project with environment variables

## Environment Variables Setup

Before deploying to Netlify, add the following environment variables in your Netlify project settings:

1. **VITE_SUPABASE_URL** - Your Supabase project URL (e.g., `https://xxxx.supabase.co`)
2. **VITE_SUPABASE_PUBLISHABLE_KEY** - Your Supabase anonymous public key
3. **VITE_SUPABASE_PROJECT_ID** - Your Supabase project ID

## Deployment Steps

### Option 1: Deploy via Git (Recommended)

1. Push your code to GitHub
2. Go to [Netlify Dashboard](https://app.netlify.com)
3. Click "Add New Site" → "Import an existing project"
4. Select your Git provider and repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - Netlify will auto-detect these from `netlify.toml`
6. Add environment variables in "Site settings" → "Build & deploy" → "Environment"
7. Click "Deploy"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project directory
netlify deploy

# For production deployment
netlify deploy --prod
```

## Authentication & CORS

Your Supabase credentials are public-facing (anon key) and safe to expose in the frontend. The publishable key has limited permissions defined by your Supabase RLS policies.

Ensure your Supabase project's CORS settings allow requests from your Netlify domain:

- In Supabase Dashboard → Project Settings → API
- Add your Netlify domain to the allowed origins (e.g., `https://your-site.netlify.app`)

## Post-Deployment

1. Test authentication flow on deployed site
2. Verify profile creation and editing work
3. Test all API calls to Supabase
4. Check function logs in Netlify for any errors
5. Monitor Analytics in Netlify dashboard

## Troubleshooting

### Build fails

- Ensure all dependencies are in `package.json`
- Check that Vite build completes locally with `npm run build`
- Verify TypeScript types are correct
- Check build logs in Netlify dashboard for specific errors

### Environment variables not loading

- Confirm variables are added in Netlify Site settings (not `.env` file)
- Variable names must start with `VITE_` to be accessible in browser
- Trigger a new deploy after adding environment variables

### Authentication issues

- Check Supabase URL in environment variables
- Verify Supabase project is active
- Check browser console for error messages
- Verify CORS settings in Supabase

### Site shows 404 on refresh

- SPA routing is configured in `netlify.toml`
- Should automatically handle client-side routing
- Clear Netlify cache if needed: Site settings → Build & deploy → Clear cache

## Performance Optimization

- Vite automatically handles code splitting and tree-shaking
- Images in `/public` folder are served as static assets
- CSS is automatically minified and optimized
- TypeScript is compiled to optimized JavaScript
- Netlify CDN provides edge caching globally

## Configuration

The `netlify.toml` file automatically configures:

- Build command and output directory
- SPA routing (all routes redirect to index.html)
- Cache headers for optimal performance
- Environment settings

## See Also

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)
- [Netlify Documentation](https://docs.netlify.com)
- [Supabase Documentation](https://supabase.com/docs)

## See Also

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
