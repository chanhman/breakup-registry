import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { useEditItem, useGetCategories } from '../hooks/reactQuery';
import Label from '@/app/components/Label';
import Input from '@/app/components/Input';
import { Item } from '../types';

type Props = {
  data: Item;
  setToggleEdit: Dispatch<SetStateAction<boolean>>;
};

export default function EditItemForm({ data, setToggleEdit }: Props) {
  const { id } = data;
  const [initialFormDataState] = useState(data);
  const [formData, setFormData] = useState(data);

  const { mutate: editItem, isLoading } = useEditItem(id);

  const { data: categoriesData } = useGetCategories();
  const categories = categoriesData?.data;

  function handleCancel() {
    setFormData(initialFormDataState);
    setToggleEdit((prev) => !prev);
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editItem({
      name: formData.name,
      link: formData.link,
      price: formData.price,
      category_id: formData.category_id,
    });

    // TODO: Better error handling
    // if (error) {
    //   console.log('There was an error');
    // }
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value,
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
          type="number"
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
      <div className="flex-1 grid gap-2">
        <Label text="Category" htmlFor="category" />
        <select
          className="ring-1 ring-inset ring-gray-300"
          onChange={(e) => handleInputChange(e)}
          value={formData.category_id}
          name="category_id"
          id="category"
        >
          {categories?.map((category) => (
            <option
              key={category.id}
              value={category.key}
              defaultValue={category.key === 'other' && category.key}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <button
          className="pointer-events-auto ml-4 flex-none px-2 py-[0.3125rem] font-medium text-slate-700 ring-1 ring-slate-700/10 hover:bg-slate-50"
          onClick={handleCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="inline-flex justify-center bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-slate-500"
          type="submit"
        >
          {isLoading ? 'Saving' : 'Save'}
        </button>
      </div>
    </form>
  );
}
