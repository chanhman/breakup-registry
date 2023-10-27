'use client';

import './globals.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, redirect } from 'next/navigation';
import { Database } from '@/lib/types/supabase';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const queryClient = new QueryClient();
  const supabase = createClientComponentClient<Database>();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <button onClick={handleSignOut}>Bye Felicia</button>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
