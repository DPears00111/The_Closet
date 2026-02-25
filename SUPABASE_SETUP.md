# Supabase Database Setup Guide

## Required Tables

### 1. Profiles Table

Create a new table in your Supabase project with the following configuration:

**Table Name:** `profiles`

**Columns:**

| Column Name   | Type      | Constraints             | Notes                 |
| ------------- | --------- | ----------------------- | --------------------- |
| `id`          | UUID      | PRIMARY KEY             | Link to auth.users.id |
| `email`       | TEXT      | NOT NULL                | User email from auth  |
| `full_name`   | TEXT      |                         | User's full name      |
| `phone`       | TEXT      |                         | Contact phone number  |
| `address`     | TEXT      |                         | Street address        |
| `city`        | TEXT      |                         | City/Municipality     |
| `province`    | TEXT      |                         | Province/State        |
| `postal_code` | TEXT      |                         | ZIP/Postal code       |
| `created_at`  | TIMESTAMP | NOT NULL, DEFAULT NOW() | Record creation time  |
| `updated_at`  | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update time      |

**SQL Setup Script:**

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow users to view only their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update only their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Steps to Set Up in Supabase Dashboard

1. **Go to SQL Editor**
   - Navigate to https://app.supabase.com/project/[YOUR_PROJECT_ID]/sql/new

2. **Copy and Run the SQL Script**
   - Paste the SQL script above
   - Click "Run" to execute

3. **Verify the Setup**
   - Go to Table Editor
   - You should see the `profiles` table
   - Verify all columns are created correctly

4. **Test Authentication**
   - Sign up a new user in your app
   - Check the profiles table to see if a record is created
   - Note: Manual profile creation is required after sign-up. The app will handle this automatically.

## Security Considerations

### Row Level Security (RLS)

- ✅ Enabled to ensure users can only access their own data
- ✅ Users can only view their own profile
- ✅ Users can only update their own profile
- ✅ Users can only insert their own profile

### Best Practices Implemented

1. **Email Validation** - Handled by Supabase auth
2. **Password Hashing** - Handled by Supabase auth
3. **Session Management** - Automatic with `persistSession: true`
4. **Auto Token Refresh** - Enabled with `autoRefreshToken: true`
5. **Secure Storage** - Uses localStorage with Supabase client configuration

## API Hooks Usage

### Authentication Hook

```typescript
import { useAuth } from "@/hooks/use-auth";

const { user, loading, error, signUp, signIn, signOut } = useAuth();
```

### Profile Hook

```typescript
import { useProfile } from "@/hooks/use-profile";

const { loading, error, getProfile, createProfile, updateProfile } =
  useProfile();
```

## Troubleshooting

### Users can't sign up

- Check email confirmation is enabled in Supabase Auth settings
- Verify SMTP settings if using email confirmations

### Profile not creating

- Ensure user is authenticated before trying to create profile
- Check RLS policies are properly set

### Can't update profile

- Verify user is authenticated (check `useAuth()` hook)
- Check RLS policies allow UPDATE

### Session not persisting on refresh

- Ensure browser has localStorage enabled
- Check that `persistSession: true` is set in client config
