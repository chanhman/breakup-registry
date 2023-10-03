import Label from '@/app/components/Label';
import Input from '@/app/components/Input';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

type Item = {
  id: number;
  name: string;
  price: number;
  link: string;
};

type Props = {
  formData: Item;
  setItems: Dispatch<SetStateAction<Item[]>>;
  setFormData: Dispatch<SetStateAction<Item>>;
};

export default function ItemForm({ formData, setItems, setFormData }: Props) {
  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setItems((prev) => [...prev, formData]);
    setFormData({
      id: 0,
      name: '',
      price: 0,
      link: '',
    });
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
      <div>
        <button
          className="inline-flex justify-center bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-slate-500"
          type="submit"
        >
          Add item
        </button>
      </div>
    </form>
  );
}
