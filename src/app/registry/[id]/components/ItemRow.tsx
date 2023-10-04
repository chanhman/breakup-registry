import { Dispatch, SetStateAction, useState } from 'react';
import EditItemForm from './EditItemForm';
import { Database } from '@/lib/types/supabase';
type Item = Database['public']['Tables']['items']['Row'];

type Props = {
  data: Item;
  isAdmin: boolean;
  setItems: Dispatch<SetStateAction<Item[]>>;
};

export default function ItemRow({ data, isAdmin, setItems }: Props) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const purchased = data.purchased_status;

  function handleDelete(id: number) {
    setItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
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
                Delete
              </button>
            </>
          )}
          {!isAdmin && !purchased && (
            <>
              <div className="flex items-center">
                <input
                  id={data.name}
                  name={data.name}
                  value={data.name}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={data.name}
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  I bought this
                </label>
              </div>
            </>
          )}
          {!isAdmin && purchased && <div>Bought</div>}
        </div>
      </div>
      {toggleEdit && (
        <EditItemForm
          data={data}
          handleEditToggle={handleEditToggle}
          id={data.id}
          setItems={setItems}
        />
      )}
    </div>
  );
}
