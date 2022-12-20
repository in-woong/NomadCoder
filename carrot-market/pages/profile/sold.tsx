import { NextPage } from 'next';
import Layout from '@components/layout';
import useSWR from 'swr';
import { ProductWithCount } from 'pages';
import ProductList from '@components/product-list';

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

const Sold: NextPage = () => {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/sales`);

  return (
    <Layout canGoBack title='판매내역'>
      <div className='flex flex-col space-y-5 divide-y pb-10'>
        <ProductList kind='sales' />
      </div>
    </Layout>
  );
};

export default Sold;
