import { ChangeEvent, FormEvent, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Label from '@/app/components/Label';
import Input from '@/app/components/Input';
import { Database } from '@/lib/types/supabase';
type Item = Database['public']['Tables']['items']['Row'];

type Props = {
  data: Item;
};

export default function EditItemForm({ data }: Props) {
  const { id, name, price, link } = data;
  const [formData, setFormData] = useState({ name, price, link });

  function handleCancel() {
    // handleEditToggle();
  }
  const supabase = createClientComponentClient();

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('items')
      .update([
        {
          name: formData.name,
          link: formData.link,
          price: formData.price,
        },
      ])
      .eq('id', id)
      .select();
    // TODO: Better error handling
    if (error) {
      console.log('There was an error');
    }

    if (data) {
      console.log('Saved');
    }
    // handleEditToggle();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
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
          Save changes
        </button>
      </div>
    </form>
  );
}
