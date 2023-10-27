'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Database } from '@/lib/types/supabase';
import Label from '../components/Label';
import Input from '../components/Input';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>({}); // any, i know.

  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.log('error', error);
    }
    if (data.user) {
      setUser(data);
    }
    router.refresh();
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log('error', error);
    }
    if (data.user) {
      setUser(data);
    }
    router.refresh();
  };

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  // };

  useEffect(() => {
    if (user.user) {
      redirect('/home');
    }
  }, [user]);

  return (
    <div className="flex min-h-[840px] flex-col bg-white">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <h2>Sign in</h2>
          </div>
          <div className="grid gap-6 mt-12">
            <div>
              <Label text="Email" htmlFor="email" />
              <Input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <Label text="Password" htmlFor="password" />
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div>
              <button onClick={handleSignIn}>Sign in</button>
            </div>
            <div>
              <button onClick={handleSignUp}>Sign up</button>
            </div>
            {/* <div>
              <button
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
