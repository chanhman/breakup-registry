import { ChangeEvent } from 'react';

type Props = {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string | number;
  required?: boolean;
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
      onChange={onChange}
      value={value}
      type={type}
      name={id}
      id={id}
      {...rest}
    />
  );
}
