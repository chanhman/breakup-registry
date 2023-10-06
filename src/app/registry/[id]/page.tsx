'use client';

import { useSearchParams } from 'next/navigation';
import AddItemForm from './components/AddItemForm';
import ItemRow from './components/ItemRow';
// import Filters from './components/Filters';
import { useGetItems, useGetUser } from './hooks/reactQuery';

export default function Page() {
  const searchParams = useSearchParams();
  const isAdmin = !!searchParams.get('admin');

  const { isLoading, data } = useGetItems();
  const rQItems = data?.data;

  const { data: userData } = useGetUser();
  const userId = userData?.data.user?.id;

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

      {isAdmin && <AddItemForm userId={userId} />}

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
