import { ChangeEvent, FormEvent, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Label from '@/app/components/Label';
import Input from '@/app/components/Input';

type Props = {
  userId: string | undefined;
};

export default function AddItemForm({ userId }: Props) {
  const [formData, setFormData] = useState({ name: '', price: 0, link: '' });
  console.log(formData);
  const supabase = createClientComponentClient();

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('items')
      .insert([
        {
          user_id: userId,
          name: formData.name,
          link: formData.link,
          price: 100,
          category_id: 'other',
        },
      ])
      .select();
    // TODO: Better error handling
    if (error) {
      console.log('There was an error');
    }
    console.log('Submitted');
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
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
          required
        />
      </div>
      <div className="flex-1 grid gap-2">
        <Label text="Price" htmlFor="price" />
        <Input
          id="price"
          onChange={(e) => handleInputChange(e)}
          value={formData.price}
          type="number"
          required
        />
      </div>
      <div className="flex-1 grid gap-2">
        <Label text="Link" htmlFor="link" />
        <Input
          id="link"
          onChange={(e) => handleInputChange(e)}
          value={formData.link}
          required
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
