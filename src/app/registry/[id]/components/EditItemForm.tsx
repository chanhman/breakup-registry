import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import Label from '@/app/components/Label';
import Input from '@/app/components/Input';
import { Item } from './types';

type Props = {
  data: Item;
  handleEditToggle: () => void;
  id: number;
  setItems: Dispatch<SetStateAction<Item[]>>;
};

export default function EditItemForm({
  data,
  handleEditToggle,
  id,
  setItems,
}: Props) {
  const prevData = data;
  const [formData, setFormData] = useState({
    id: data.id,
    name: data.name,
    price: data.price,
    link: data.link,
  });

  function handleCancel() {
    setFormData(prevData);
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return formData;
        }

        return item;
      })
    );
    handleEditToggle();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      id: Math.random(),
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form
      className="flex items-end gap-4 py-5"
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <div className="flex-1 grid gap-2">
        <Label text="Name" htmlFor="name" />
        <Input
          id="name"
          onChange={(e) => handleInputChange(e)}
          value={formData.name}
        />
      </div>
      <div className="flex-1 grid gap-2">
        <Label text="Price" htmlFor="price" />
        <Input
          id="price"
          onChange={(e) => handleInputChange(e)}
          value={formData.price}
        />
      </div>
      <div className="flex-1 grid gap-2">
        <Label text="Link" htmlFor="link" />
        <Input
          id="link"
          onChange={(e) => handleInputChange(e)}
          value={formData.link}
        />
      </div>
      <div className="flex gap-4">
        <button
          className="pointer-events-auto ml-4 flex-none px-2 py-[0.3125rem] font-medium text-slate-700 ring-1 ring-slate-700/10 hover:bg-slate-50"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="inline-flex justify-center bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-slate-500"
          type="submit"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}
