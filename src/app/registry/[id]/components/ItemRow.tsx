import { useState } from 'react';
import { useDeleteItem, useClaimItem } from '../hooks/reactQuery';
import { useGetRegistryName } from '../hooks/useGetRegistryName';
import { Item } from '../types';
import EditItemForm from './EditItemForm';

type Props = {
  data: Item;
  isAdmin: boolean;
};

export default function ItemRow({ data, isAdmin }: Props) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const registryName = useGetRegistryName();

  const purchased = data.purchased_status;

  const { mutate, isLoading } = useDeleteItem();
  const { mutate: claimed } = useClaimItem();

  function handleDelete(id: number) {
    mutate(id);
  }

  function handleClaimed() {
    claimed(data.id);
  }

  function handleEditToggle() {
    setToggleEdit((prev) => !prev);
  }

  return (
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
          {isAdmin && (
            <>
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
            </>
          )}
          {!isAdmin && !purchased && (
            <button
              className="pointer-events-auto ml-4 flex-none px-2 py-[0.3125rem] font-medium text-slate-700 ring-1 ring-slate-700/10 hover:bg-slate-50"
              onClick={handleClaimed}
            >
              I bought dis
            </button>
          )}
          {!isAdmin && purchased && <div>Bought</div>}
        </div>
      </div>
      {toggleEdit && <EditItemForm data={data} setToggleEdit={setToggleEdit} />}
    </div>
  );
}
