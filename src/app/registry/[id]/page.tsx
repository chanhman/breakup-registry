'use client';

import { useState } from 'react';
import AddItemForm from './components/AddItemForm';
import ItemRow from './components/ItemRow';

const data = [
  {
    id: 1,
    name: 'White Stretchy Spiderweb Halloween Decorative Prop - Hyde & EEK! Boutique',
    price: 4.0,
    link: 'https://www.target.com/p/white-stretchy-spiderweb-halloween-decorative-prop-hyde-38-eek-boutique-8482/-/A-81063450',
  },
  {
    id: 2,
    name: "Halloween Stoneware Figural 14.1oz Mug 'Cat' - Hyde & EEK! Boutique",
    price: 4.0,
    link: 'https://www.target.com/p/halloween-stoneware-figural-14-1oz-mug-39-cat-39-hyde-38-eek-boutique-8482/-/A-87650813',
  },
  {
    id: 3,
    name: '12oz Halloween Mummy Figural Mug - Hyde & EEK! Boutique',
    price: 4.0,
    link: 'https://www.target.com/p/12oz-halloween-mummy-figural-mug-hyde-38-eek-boutique-8482/-/A-85298950',
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
