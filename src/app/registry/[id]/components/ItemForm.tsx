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
        <label
          className="block text-sm font-semibold leading-6 text-slate-900"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="block w-full border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          onChange={(e) => handleInputChange(e)}
          value={formData.name}
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div className="flex-1 grid gap-2">
        <label
          className="block text-sm font-semibold leading-6 text-slate-900"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className="block w-full border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          onChange={(e) => handleInputChange(e)}
          value={formData.price}
          type="number"
          name="price"
          id="price"
        />
      </div>
      <div className="flex-1 grid gap-2">
        <label
          className="block text-sm font-semibold leading-6 text-slate-900"
          htmlFor="link"
        >
          Link
        </label>
        <input
          className="block w-full border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          onChange={(e) => handleInputChange(e)}
          value={formData.link}
          type="text"
          name="link"
          id="link"
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
