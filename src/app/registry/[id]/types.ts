import { Database } from '@/lib/types/supabase';

export type FormData = {
  user_id?: string;
  name: string;
  link: string;
  price: number;
  category_id: string;
};

export type Item = Database['public']['Tables']['items']['Row'];

export type GroupedItems = {
  id: number;
  category_name: string;
  items: Item[];
}[];
