import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Label from '@/app/components/Label';
import Input from '@/app/components/Input';
import { Database } from '@/lib/types/supabase';

type Item = Database['public']['Tables']['items']['Row'];

type FormData = {
  user_id?: string;
  name: string;
  link: string;
  price: number;
  category_id: string;
};

type Props = {
  data: Item;
};

export default function EditItemForm({ data }: Props) {
  const { id, name, price, link, category_id } = data;
  const [formData, setFormData] = useState({ name, price, link, category_id });

  function handleCancel() {
    // handleEditToggle();
  }
  const supabase = createClientComponentClient();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newItem: FormData) => {
      const res = await supabase
        .from('items')
        .update([newItem])
        .eq('id', id)
        .select();
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({
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
          <option value="other">Other</option>
          <option value="bedroom">Bedroom</option>
          <option value="kitchen">Kitchen</option>
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
          {mutation.isLoading ? 'Saving' : 'Save'}
        </button>
      </div>
    </form>
  );
}
