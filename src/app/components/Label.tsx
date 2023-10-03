type Props = {
  text: string;
  htmlFor: string;
};

export default function Label({ text, htmlFor }: Props) {
  return (
    <label
      className="block text-sm font-semibold leading-6 text-slate-900"
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
}
