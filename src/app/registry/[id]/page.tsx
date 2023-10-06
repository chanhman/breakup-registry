'use client';

import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AddItemForm from './components/AddItemForm';
import ItemRow from './components/ItemRow';
// import Filters from './components/Filters';
import { useGetItems } from './hooks/reactQuery';

export default function Page() {
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();

  const isAdmin = !!searchParams.get('admin');

  const [userData, setUserData] = useState<User | null>(null);

  const { isLoading, data } = useGetItems();
  const rQItems = data?.data;

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserData(user);
    };
    getUser();
  }, []);

  return (
    <div className="py-10 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-slate-900 sm:text-4xl">
          Mary&apos;s Registry
        </h1>
        {isAdmin && (
          <div className="text-right">
            <div>Your breakup registry link</div>
            <div>http://localhost:3000/registry/chanh</div>
          </div>
        )}
      </div>

      {isAdmin && <AddItemForm userId={userData?.id} />}

      {/* <Filters /> */}

      {isLoading && <div>It&apos;s loading, bitch!</div>}

      <div className="">
        {rQItems?.map((item) => (
          <ItemRow data={item} isAdmin={isAdmin} key={item.id} />
        ))}
      </div>
    </div>
  );
}
