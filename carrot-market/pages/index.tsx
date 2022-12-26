import { NextPage } from 'next';
import FloatingButton from '@components/floating-button';
import Item from '@components/item';
import Layout from '@components/layout';
import Head from 'next/head';
import useSWR from 'swr';
import client from '@libs/server/client';
import { Product } from '@prisma/client';

export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  // const { data } = useSWR<ProductsResponse>('/api/products');
  return (
    <Layout title='홈' hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex flex-col space-y-5 divide-y'>
        {products?.map((product) => (
          <Item key={product.id} product={product} />
        ))}
        <FloatingButton href='/items/upload'>
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const products = await client.product.findMany({});
  console.log(products);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Home;
