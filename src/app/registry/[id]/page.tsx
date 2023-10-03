'use client';

import { useState } from 'react';
import AddItemForm from './components/AddItemForm';
import ItemRow from './components/ItemRow';

const data = [
  {
    id: 1,
    name: 'Name',
    price: 99.99,
    link: '#link-me-daddy',
  },
];

export default function Page() {
  const [items, setItems] = useState(data);

  return (
    <div className="py-10 px-8">
      <h1 className="text-2xl text-slate-900 sm:text-4xl">Mary's Registry</h1>

      <AddItemForm setItems={setItems} />

      <div className="">
        {items.map((item) => (
          <ItemRow data={item} setItems={setItems} key={item.id} />
        ))}
      </div>
    </div>
  );
}
