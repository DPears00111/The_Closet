import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Error checking user:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const createUserProfile = async (userId: string, email: string, fullName: string) => {
    try {
      // Check if customer profile already exists
      const { data: existingProfile } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingProfile) {
        return true; // Profile already exists
      }

      // Create new customer profile
      const { error: profileError } = await supabase
        .from('customers')
        .insert([{
          user_id: userId,
          email,
          full_name: fullName,
          shipping_address: {},
        }]);

      if (profileError) {
        console.warn('Customer profile creation note:', profileError.message);
        // Don't throw - Supabase auth succeeded even if profile creation fails
      }
      return true;
    } catch (err) {
      console.warn('Customer profile auto-creation failed:', err);
      return true; // Still return true as auth succeeded
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setError(null);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Try to create profile
      if (data.user) {
        await createUserProfile(data.user.id, email, fullName);
      }

      toast({
        title: 'Success',
        description: 'Account created! Please check your email to confirm.',
      });

      return { data, error: null };
    } catch (err: any) {
      const errorMsg = err?.message || 'Failed to sign up';
      setError(errorMsg);
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return { data: null, error: errorMsg };
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      toast({
        title: 'Success',
        description: 'Signed in successfully!',
      });

      return { data, error: null };
    } catch (err: any) {
      const errorMsg = err?.message || 'Failed to sign in';
      setError(errorMsg);
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return { data: null, error: errorMsg };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Signed out successfully!',
      });
    } catch (err: any) {
      const errorMsg = err?.message || 'Failed to sign out';
      setError(errorMsg);
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };
};
