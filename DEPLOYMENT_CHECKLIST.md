# Pre-Deployment Checklist

Complete this checklist before deploying to Vercel:

## Code Quality

- [ ] Run `npm run lint` - No linting errors or warnings
- [ ] Run `npm run test` - All tests pass
- [ ] Run `npm run build` - Production build succeeds with no errors
- [ ] Test locally with `npm run dev` - All features work correctly

## Configuration

- [ ] Environment variables set in `.env` (use `.env.example` as reference)
- [ ] `vercel.json` is configured with correct build settings
- [ ] `package.json` build script is correct
- [ ] TypeScript configuration is valid

## Supabase Setup

- [ ] Supabase project is active and accessible
- [ ] Database schema is correct (products, customers, orders, order_items tables)
- [ ] RLS policies are configured on all tables:
  - [ ] `customers` table - Users can select/update own records
  - [ ] `products` table - Anyone can select
  - [ ] `orders` table - Users can select/update own records
  - [ ] `order_items` table - Users can access via orders
- [ ] Trigger for `updated_at` timestamps exists on all tables
- [ ] Supabase credentials are correct in `.env`

## Authentication

- [ ] User sign-up flow works locally
- [ ] User sign-in flow works locally
- [ ] Profile creation on sign-up works
- [ ] Profile editing saves correctly
- [ ] Sign-out clears session properly

## Features

- [ ] Products load and display correctly
- [ ] Shopping cart works (add/remove items)
- [ ] Cart persists across page navigation
- [ ] Checkout flow works
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Navigation and routing works

## CORS & Security

- [ ] Supabase CORS settings allow your Netlify domain
- [ ] All sensitive data uses Supabase auth/RLS
- [ ] Environment variables don't expose secrets in frontend code
- [ ] Public key used for Supabase client (not secret key)

## Deployment Preparation

- [ ] All code committed to Git
- [ ] Git repository pushed to GitHub/GitLab/Bitbucket
- [ ] Netlify account created and connected to Git repo
- [ ] Environment variables added to Netlify Site settings:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_PUBLISHABLE_KEY`
  - [ ] `VITE_SUPABASE_PROJECT_ID`
- [ ] Build settings configured in Netlify:
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `dist`

## Post-Deployment Verification

After deploying, test the live site:

- [ ] Site loads without errors
- [ ] Authentication works (sign-up, sign-in, sign-out)
- [ ] Products display correctly
- [ ] Shopping cart functions
- [ ] Profile creation and editing works
- [ ] Console has no errors (check browser dev tools)
- [ ] Supabase queries work (check Network tab)

## Performance (Optional)

- [ ] Check Netlify Analytics for performance metrics
- [ ] Verify build time is reasonable
- [ ] Check production bundle size isn't excessive

## Next Steps

1. Fix any issues from the checklist above
2. Deploy to Netlify via Git connection (auto-builds on push)
3. Test live site thoroughly
4. Monitor Netlify build logs and function logs for errors
