import { HeadFC } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState();
  useEffect(() => {
    fetchBlogPosts();
  }, []);
  return <Layout title='Blog'>{blogPosts}</Layout>;
}

export const Head: HeadFC = () => <Seo title='Blog' />;
