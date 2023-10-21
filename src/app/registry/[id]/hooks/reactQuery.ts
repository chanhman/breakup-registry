import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { FormData, GiftTrackerFormData } from '../types';

const supabase = createClientComponentClient();

export const useGetUser = () => {
  return useQuery('user', async () => {
    const res = await supabase.auth.getUser();
    return res;
  });
};

export const useGetItems = () => {
  return useQuery('items', async () => {
    const res = await supabase
      .from('items')
      .select()
      .order('created_at', { ascending: false });
    return res;
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await supabase.from('items').delete().eq('id', id);
      return res;
    },
    onSuccess: () => {
      alert('Deleted');
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newItem: FormData) => {
      const res = await supabase.from('items').insert([newItem]).select();
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export const useEditItem = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newItem: FormData) => {
      const res = await supabase
        .from('items')
        .update([newItem])
        .eq('id', id)
        .select();
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export const useGetCategories = () => {
  return useQuery('categories', async () => {
    const res = await supabase.from('categories').select().order('key');
    return res;
  });
};

export const useClaimItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await supabase
        .from('items')
        .update({ purchased_status: true })
        .eq('id', id)
        .select();
      return res;
    },
    onSuccess: () => {
      alert('Claimed');
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export const useAddToGiftTracker = () => {
  return useMutation({
    mutationFn: async (item: GiftTrackerFormData) => {
      const res = await supabase.from('gift_tracker').insert([item]);
      return res;
    },
  });
};
