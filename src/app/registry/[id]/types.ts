import { Database } from '@/lib/types/supabase';

export type FormData = {
  category_key: string;
  link: string;
  name: string;
  price: number;
  registry_key?: string;
  user_id?: string;
  purchased_status: boolean;
};

export type GiftTrackerFormData = {
  email: string;
  first_name: string;
  item_id: number;
  last_name: string;
  registry_key: string;
};

export type Item = Database['public']['Tables']['items']['Row'];

export type GiftTracker = Database['public']['Tables']['gift_tracker']['Row'];

export type GroupedItems = {
  id: number;
  category_name: string;
  items: Item[];
}[];
