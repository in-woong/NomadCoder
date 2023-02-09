import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";

interface IBlogPostProps {
  data: Queries.PostDetailQuery;
  children: any;
}

export default function BlogPost({ data, children }: IBlogPostProps) {
  return <Layout title='BlogPost'>{children}</Layout>;
}

export const query = graphql`
  query PostDetail($frontmatter___slug: String) {
    mdx(frontmatter: { slug: { eq: $frontmatter___slug } }) {
      body
      frontmatter {
        author
        category
        date
        slug
        title
      }
    }
  }
`;

export const Head = ({ data }: IBlogPostProps) => (
  <Seo title={data.mdx?.frontmatter?.title} />
);
