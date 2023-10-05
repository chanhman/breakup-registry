import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Label from '@/app/components/Label';
import Input from '@/app/components/Input';

type FormData = {
  user_id?: string;
  name: string;
  link: string;
  price: number;
  category_id: string;
};

type Props = {
  userId: string | undefined;
};

export default function AddItemForm({ userId }: Props) {
  const initialFormData = {
    user_id: userId,
    name: '',
    price: 0,
    link: '',
    category_id: 'other',
  };
  const [formData, setFormData] = useState(initialFormData);

  const supabase = createClientComponentClient();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newItem: FormData) => {
      const res = await supabase.from('items').insert([newItem]).select();
      return res;
    },
    onSuccess: () => {
      setFormData(initialFormData);
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({
      user_id: userId,
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
      <div>
        <button
          className="inline-flex justify-center bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-slate-500"
          type="submit"
        >
          {mutation.isLoading ? 'Adding item' : 'Add item'}
        </button>
      </div>
    </form>
  );
}
