import { useState } from 'react';

import { useDeleteItem } from '../hooks/reactQuery';
import { Item } from '../types';

import EditItemForm from './EditItemForm';
import ClaimItemForm from './ClaimItemForm';

type Props = {
  data: Item;
  isAdmin: boolean;
};

export default function ItemRow({ data, isAdmin }: Props) {
  const [toggleEdit, setToggleEdit] = useState(false);

  const purchased = data.purchased_status;

  const { mutate: deleteItem, isLoading } = useDeleteItem();

  function handleDelete(id: number) {
    deleteItem(id);
  }

  function handleEditToggle() {
    setToggleEdit((prev) => !prev);
  }

  return isAdmin ? (
    <div className="py-5 border-slate-200 border-b">
      <div className="flex items-center justify-between ">
        <div className="flex gap-2 items-center text-lg">
          {purchased && (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Purchased
            </span>
          )}
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
            {isLoading ? 'Deleting' : 'Delete'}
          </button>
        </div>
      </div>
      {toggleEdit && <EditItemForm data={data} setToggleEdit={setToggleEdit} />}
    </div>
  ) : (
    <div className="py-5 border-slate-200 border-b">
      <div className="flex items-center justify-between ">
        <div className="flex gap-2 items-center text-lg">
          {purchased && (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Purchased
            </span>
          )}
          <a className="text-slate-600 hover:underline" href={data.link}>
            {data.name}
          </a>{' '}
          ${data.price}
        </div>
        <div className="flex gap-4">
          {!purchased && (
            <button
              className="pointer-events-auto ml-4 flex-none px-2 py-[0.3125rem] font-medium text-slate-700 ring-1 ring-slate-700/10 hover:bg-slate-50"
              onClick={handleEditToggle}
            >
              Dibs
            </button>
          )}
          {purchased && <div>Claimed</div>}
        </div>
      </div>
      {toggleEdit && !purchased && (
        <ClaimItemForm data={data} setToggleEdit={setToggleEdit} />
      )}
    </div>
  );
}
