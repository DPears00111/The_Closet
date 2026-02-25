# Profile Management System - Implementation Guide

## Overview

Your ecommerce project now has a complete, safe user profile management system built with:

- **Supabase Auth** - Secure authentication
- **Database-backed Profiles** - User data persistence
- **RLS (Row Level Security)** - Data protection at database level
- **Form Validation** - Client-side input validation
- **Error Handling** - Comprehensive error management

## Features Implemented

### 1. **User Authentication**

- Sign Up with email, password, and full name
- Sign In with email and password
- Sign Out functionality
- Session persistence across browser refresh
- Automatic token refresh

### 2. **Profile Management**

- Create profile on sign-up
- View profile information
- Edit all profile fields:
  - Full name
  - Phone number
  - Street address
  - City/Municipality
  - Province/State
  - Postal code
- Auto-save with timestamps

### 3. **Security Features**

- ✅ Passwords hashed by Supabase
- ✅ Row Level Security (RLS) - Users can only access own data
- ✅ Email-based authentication
- ✅ Secure session management
- ✅ Password confirmation on sign-up
- ✅ Input validation

## File Structure

```
src/
├── hooks/
│   ├── use-auth.ts          # Authentication hook
│   └── use-profile.ts       # Profile management hook
├── components/
│   ├── AuthForm.tsx         # Sign up / Sign in form
│   └── ProfileEditor.tsx    # Profile viewing & editing
└── pages/
    └── Profile.tsx          # Main profile page
```

## Setup Instructions

### Step 1: Set Up Supabase Database

Follow the instructions in `SUPABASE_SETUP.md` to create the profiles table with proper RLS.

### Step 2: Test the System

1. **Sign Up**
   - Go to `/profile`
   - Click "Create Account"
   - Enter email, name, password, confirm password
   - Submit form
   - Check email for Supabase confirmation (if enabled)

2. **Sign In**
   - Go to `/profile`
   - Click "Sign In"
   - Enter your email and password
   - Should see profile page

3. **Edit Profile**
   - After signing in, click "Edit"
   - Fill in your address details
   - Click "Save Changes"
   - Changes should persist

4. **Sign Out**
   - Click the "Sign Out" button
   - Should redirect to home page

## Usage Examples

### Using Authentication Hook

```typescript
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, loading, signUp, signIn, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return <button onClick={signOut}>Sign Out</button>;
  }

  return (
    <div>
      <button onClick={() => signUp('email@test.com', 'pass123', 'John')}>
        Sign Up
      </button>
    </div>
  );
}
```

### Using Profile Hook

```typescript
import { useProfile } from "@/hooks/use-profile";
import { useAuth } from "@/hooks/use-auth";

function ProfileComponent() {
  const { user } = useAuth();
  const { getProfile, updateProfile } = useProfile();

  const handleUpdate = async () => {
    await updateProfile(user!.id, {
      full_name: "John Doe",
      phone: "+27 11 000 0000",
    });
  };
}
```

## Database Schema

The `profiles` table has the following structure:

| Field         | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| `id`          | UUID      | User ID (references auth.users) |
| `email`       | TEXT      | User's email                    |
| `full_name`   | TEXT      | User's full name                |
| `phone`       | TEXT      | Contact phone number            |
| `address`     | TEXT      | Street address                  |
| `city`        | TEXT      | City name                       |
| `province`    | TEXT      | Province/State                  |
| `postal_code` | TEXT      | ZIP/Postal code                 |
| `created_at`  | TIMESTAMP | Auto-set at creation            |
| `updated_at`  | TIMESTAMP | Auto-updated on changes         |

## Security Best Practices

✅ **Implemented:**

- Row Level Security (RLS) - Users can only access their own data
- Password strength requirements (6+ characters)
- Password confirmation on sign-up
- Email validation
- Session persistence with auto token refresh
- localStorage for secure session storage

✅ **Recommended Next Steps:**

1. Enable email confirmation in Supabase Auth settings
2. Set up SMTP for transactional emails
3. Add password reset functionality
4. Implement 2FA (Two-Factor Authentication)
5. Add profile photo upload to storage bucket
6. Create order history view linked to auth user

## Error Handling

All operations include comprehensive error handling:

- Network errors are caught and displayed
- Validation errors shown as alerts
- Toast notifications for all major actions
- Console warnings for debugging

## Troubleshooting

### Issue: "Table 'profiles' not found"

**Solution:** Run the SQL script in `SUPABASE_SETUP.md` to create the table

### Issue: Sign-up works but can't create profile

**Solution:** Check RLS policies are correctly set in Supabase dashboard

### Issue: Session doesn't persist on refresh

**Solution:** Ensure localStorage is enabled in browser

### Issue: Can't update profile

**Solution:** Verify you're signed in. Check browser console for detailed errors

## Next Steps

1. **Email Verification** - Enable in Supabase Auth settings
2. **Password Reset** - Add "Forgot Password" link
3. **Profile Photos** - Add avatar upload to Supabase Storage
4. **Order History** - Create orders table linked to user
5. **Address Suggestions** - Integrate address autocomplete API

## Support

For issues:

1. Check Supabase dashboard logs
2. Check browser console for errors
3. Verify RLS policies in database
4. Review auth session status in browser DevTools
