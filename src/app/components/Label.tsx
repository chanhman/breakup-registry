type Props = {
  text: string;
  htmlFor: string;
};

export default function Label({ text, htmlFor }: Props) {
  return <label htmlFor={htmlFor}>{text}</label>;
}
