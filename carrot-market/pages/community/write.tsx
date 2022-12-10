import { NextPage } from 'next';
import TextArea from '../../components/textarea';
import Layout from '../../components/layout';
import Button from '../../components/button';

const Write: NextPage = () => {
  return (
    <Layout canGoBack title='Write Post'>
      <form className='space-y-4 p-4'>
        <TextArea required placeholder='Ask a question!' />
        <Button text='Submit' />
      </form>
    </Layout>
  );
};

export default Write;
