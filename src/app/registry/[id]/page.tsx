'use client';

import { useState } from 'react';
import ItemForm from './components/ItemForm';

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
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    price: 0,
    link: '',
  });
  const [toggleEdit, setToggleEdit] = useState(false);

  function handleDelete(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEditToggle() {
    setToggleEdit((prev) => !prev);
  }

  return (
    <div className="py-10 px-8">
      <h1 className="text-2xl text-slate-900 sm:text-4xl">Mary's Registry</h1>

      <ItemForm
        formData={formData}
        setItems={setItems}
        setFormData={setFormData}
      />

      <div className="">
        {items.map((item) => (
          <div className="py-5 border-slate-200 border-b" key={item.id}>
            <div className="flex items-center justify-between ">
              <div className="text-lg">
                <a className="text-slate-600 hover:underline" href={item.link}>
                  {item.name}
                </a>{' '}
                ${item.price}
              </div>
              <div className="flex gap-4">
                <button
                  className="pointer-events-auto ml-4 flex-none px-2 py-[0.3125rem] font-medium text-slate-700 ring-1 ring-slate-700/10 hover:bg-slate-50"
                  onClick={handleEditToggle}
                >
                  Edit
                </button>
                <button
                  className="flex justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-red-500 hover:text-white hover:bg-red-500 ring-1 ring-red-500"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            {toggleEdit && <div>Edit form</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
