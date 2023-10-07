import { Database } from '@/lib/types/supabase';

export type FormData = {
  category_id: string;
  link: string;
  name: string;
  price: number;
  registry_key?: string;
  user_id?: string;
};

export type Item = Database['public']['Tables']['items']['Row'];

export type GroupedItems = {
  id: number;
  category_name: string;
  items: Item[];
}[];
