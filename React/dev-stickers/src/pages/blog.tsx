import { HeadFC } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default function Blog() {
  return (
    <Layout title='Blog'>
      <h1>Blog</h1>
    </Layout>
  );
}

export const Head: HeadFC = () => <Seo title='Blog' />;
