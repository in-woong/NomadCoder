console.log('hello im bs');

interface BsProps {
  hello: string;
}
export default function Bs({ hello }: BsProps) {
  return <h1>hello</h1>;
}
