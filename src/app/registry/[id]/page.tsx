'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AddItemForm from './components/AddItemForm';
import ItemRow from './components/ItemRow';
import { data } from './data';

export default function Page() {
  const searchParams = useSearchParams();
  const isAdmin = !!searchParams.get('admin');
  const [items, setItems] = useState(data);

  return (
    <div className="py-10 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-slate-900 sm:text-4xl">Mary's Registry</h1>
        {isAdmin && (
          <div className="text-right">
            <div>Your breakup registry link</div>
            <div>http://localhost:3000/registry/chanh</div>
          </div>
        )}
      </div>

      {isAdmin && <AddItemForm setItems={setItems} />}

      <div className="">
        {items.map((item) => (
          <ItemRow
            data={item}
            isAdmin={isAdmin}
            setItems={setItems}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}
