import { graphql, HeadFC, Link, PageProps } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";

export default function Blog({ data }: PageProps<Queries.BlogPostsQuery>) {
  const [blogPosts, setBlogPosts] = useState();
  useEffect(() => {}, []);

  return (
    <Layout title='Blog'>
      <section>
        {data.allMdx?.nodes?.map((file, index) => (
          <article key={index}>
            <Link to={`/blog/${file.frontmatter?.title}`}>
              <h3>{file.frontmatter?.title}</h3>
              <h5>
                {file.frontmatter?.author} in: {file.frontmatter?.category}
              </h5>
              <h6>{file.frontmatter?.date}</h6>
              <hr />
              <p>{file.excerpt}</p>
            </Link>
          </article>
        ))}
      </section>
    </Layout>
  );
}

export const query = graphql`
  query BlogPosts {
    allMdx {
      pageInfo {
        perPage
      }
      nodes {
        frontmatter {
          title
          category
          date(formatString: "YYYY.MM.DD")
          author
        }
        excerpt(pruneLength: 30)
      }
    }
  }
`;

export const Head: HeadFC = () => <Seo title='Blog' />;
