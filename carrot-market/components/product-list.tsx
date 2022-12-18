import type { ProductWithCount } from 'pages';
import useSWR from 'swr';
import Item from './item';

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

interface ProductListProps {
  kind: 'favs' | 'sales' | 'purchases';
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);

  if (!data) return <></>;
  return (
    <>
      {data[kind].map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  );
}
