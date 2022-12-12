import { NextPage } from 'next';
import Item from '@components/item';
import Layout from '@components/layout';

const Loved: NextPage = () => {
  return (
    <Layout canGoBack title='관심목록'>
      <div className='flex flex-col space-y-5 divide-y-2 pb-10'>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            key={i}
            id={i}
            title='iPhone 14'
            price={99}
            comments={1}
            hearts={1}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
