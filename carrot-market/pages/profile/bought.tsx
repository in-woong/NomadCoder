import { NextPage } from 'next';
import Item from '@components/item';
import Layout from '@components/layout';

const Bought: NextPage = () => {
  return (
    <Layout canGoBack title='구매내역'>
      <div className='flex flex-col space-y-5 divide-y pb-10'>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            key={i}
            id={i}
            title='iPhone14'
            price={99}
            comments={1}
            hearts={1}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Bought;
