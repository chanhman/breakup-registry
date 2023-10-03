'use client';

import { useState } from 'react';
import AddItemForm from './components/AddItemForm';
import ItemRow from './components/ItemRow';
import { data } from './data';

export default function Page() {
  const [items, setItems] = useState(data);

  return (
    <div className="py-10 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-slate-900 sm:text-4xl">Mary's Registry</h1>
        <div className="text-right">
          <div>Your breakup registry link</div>
          <div>http://localhost:3000/registry/chanh</div>
        </div>
      </div>
      <AddItemForm setItems={setItems} />
      <div className="">
        {items.map((item) => (
          <ItemRow data={item} setItems={setItems} key={item.id} />
        ))}
      </div>
    </div>
  );
}
