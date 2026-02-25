import { useState } from 'react';
import { supabase } from '@/integrations/supabase';
import { useToast } from './use-toast';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  shipping_address: {
    street?: string;
    city?: string;
    code?: string;
    province?: string;
  };
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getProfile = async (userId: string) => {
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      return { data, error: null };
    } catch (err: any) {
      const errorMsg = err?.message || 'Failed to fetch profile';
      setError(errorMsg);
      return { data: null, error: errorMsg };
    }
  };

  const createProfile = async (userId: string, email: string, fullName: string) => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: createError } = await supabase
        .from('customers')
        .insert([{
          user_id: userId,
          email,
          full_name: fullName,
          shipping_address: {},
        }])
        .select()
        .single();

      if (createError) throw createError;

      toast({
        title: 'Success',
        description: 'Profile created successfully!',
      });

      return { data, error: null };
    } catch (err: any) {
      const errorMsg = err?.message || 'Failed to create profile';
      setError(errorMsg);
      console.warn('Profile creation error:', errorMsg);
      // Don't show error toast for profile creation - auth succeeded
      return { data: null, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userId: string, updates: Partial<UserProfile>) => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: updateError } = await supabase
        .from('customers')
        .update(updates)
        .eq('user_id', userId)
        .select();

      if (updateError) throw updateError;

      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });

      return { data: data?.[0] || null, error: null };
    } catch (err: any) {
      const errorMsg = err?.message || 'Failed to update profile';
      setError(errorMsg);
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return { data: null, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getProfile,
    createProfile,
    updateProfile,
  };
};
