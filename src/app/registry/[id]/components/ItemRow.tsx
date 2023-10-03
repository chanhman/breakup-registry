import { Dispatch, SetStateAction, useState } from 'react';
import { Item } from './types';

type Props = {
  data: Item;
  setItems: Dispatch<SetStateAction<Item[]>>;
};

export default function ItemRow({ data, setItems }: Props) {
  const [toggleEdit, setToggleEdit] = useState(false);

  function handleDelete(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEditToggle() {
    setToggleEdit((prev) => !prev);
  }

  return (
    <div className="py-5 border-slate-200 border-b">
      <div className="flex items-center justify-between ">
        <div className="text-lg">
          <a className="text-slate-600 hover:underline" href={data.link}>
            {data.name}
          </a>{' '}
          ${data.price}
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
            onClick={() => handleDelete(data.id)}
          >
            Delete
          </button>
        </div>
      </div>
      {toggleEdit && <div>Edit form</div>}
    </div>
  );
}
