import { useMutation, useQueryClient } from 'react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
type FormData = {
  user_id?: string;
  name: string;
  link: string;
  price: number;
  category_id: string;
};
const supabase = createClientComponentClient();

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
