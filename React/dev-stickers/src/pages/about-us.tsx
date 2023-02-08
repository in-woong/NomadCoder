import { HeadFC } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default function AboutUs() {
  return (
    <Layout title='About us'>
      <h1>About us </h1>
      <p>We ar happy</p>
    </Layout>
  );
}

export const Head: HeadFC = () => <Seo title='About us' />;
