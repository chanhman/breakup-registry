import { useQuery } from 'react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

// Auth users

export const useAuthGetUser = () => {
  return useQuery('authUser', async () => {
    const res = await supabase.auth.getUser();
    return res;
  });
};
