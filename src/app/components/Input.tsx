import { ChangeEvent } from 'react';

type Props = {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string | number;
};

export default function Input({
  id,
  onChange,
  type = 'text',
  value,
  ...rest
}: Props) {
  return (
    <input
      className="block w-full border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      onChange={onChange}
      value={value}
      type={type}
      name={id}
      id={id}
      {...rest}
    />
  );
}
