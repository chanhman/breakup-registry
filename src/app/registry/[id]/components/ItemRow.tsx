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
    <div className="py-5">
      <div className="flex items-center justify-between ">
        <div className="flex gap-2 items-center text-lg">
          {purchased && (
            <span className="inline-flex items-center">Purchased</span>
          )}
          <a href={data.link}>{data.name}</a> ${data.price}
        </div>
        <div className="flex gap-4">
          <button onClick={handleEditToggle}>Edit</button>
          <button onClick={() => handleDelete(data.id)}>
            {isLoading ? 'Deleting' : 'Delete'}
          </button>
        </div>
      </div>
      {toggleEdit && <EditItemForm data={data} setToggleEdit={setToggleEdit} />}
    </div>
  ) : (
    <div className="py-5">
      <div className="flex items-center justify-between ">
        <div className="flex gap-2 items-center">
          {purchased && <span>Purchased</span>}
          <a href={data.link}>{data.name}</a> ${data.price}
        </div>
        <div className="flex gap-4">
          {!purchased && (
            <button className="" onClick={handleEditToggle}>
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
