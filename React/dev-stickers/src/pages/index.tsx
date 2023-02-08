import * as React from 'react';
import { HeadFC, Link, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout title='home'>
      <div>
        <h1>welcome to my homepage</h1>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <Seo title='Home Page' />;
