import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';

import { useGetRegistryKey } from '../hooks/useGetRegistryKey';
import { useClaimItem, useAddToGiftTracker } from '../hooks/reactQuery';
import { Item } from '../types';

import Label from '@/app/components/Label';
import Input from '@/app/components/Input';

type Props = {
  data: Item;
  setToggleEdit: Dispatch<SetStateAction<boolean>>;
};

export default function ClaimItemForm({ data, setToggleEdit }: Props) {
  const registryKey = useGetRegistryKey();
  const initialFormDataState = {
    email: '',
    first_name: '',
    item_id: data.id,
    last_name: '',
    registry_key: registryKey,
  };
  const [formData, setFormData] = useState(initialFormDataState);
  const { mutate: claimItem, isLoading: claiming } = useClaimItem();
  const { mutate: addToGiftTracker, isLoading: adding } = useAddToGiftTracker();

  function handleCancel() {
    setFormData(initialFormDataState);
    setToggleEdit((prev) => !prev);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    claimItem(data.id);
    addToGiftTracker(formData);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form
      className="flex items-end gap-4 py-5"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex-1 grid gap-2">
        <Label text="First name" htmlFor="first_name" />
        <Input
          id="first_name"
          onChange={(e) => handleInputChange(e)}
          value={formData.first_name}
          required
        />
      </div>
      <div className="flex-1 grid gap-2">
        <Label text="Last name" htmlFor="last_name" />
        <Input
          id="last_name"
          onChange={(e) => handleInputChange(e)}
          value={formData.last_name}
          required
        />
      </div>
      <div className="flex-1 grid gap-2">
        <Label text="Email" htmlFor="email" />
        <Input
          id="email"
          onChange={(e) => handleInputChange(e)}
          value={formData.email}
          type="email"
          required
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
          {claiming || adding ? 'Claiming' : 'Claim'}
        </button>
      </div>
    </form>
  );
}
