import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout title='home'>
      <StaticImage
        alt='Stickers on the wall'
        src='https://images.unsplash.com/photo-1572375992501-4b0892d50c69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80'
      />
      <div>
        <h1>welcome to my homepage</h1>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <Seo title='Home Page' />;
