import Layout from '@components/layout';
import { read, readdirSync } from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage, NextPageContext } from 'next';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const Post: NextPage<{ title: string; post: string }> = ({ title, post }) => {
  return (
    <Layout title={title} seoTitle={title} canGoBack hasTabBar>
      <div
        className='blog-post-content p-10'
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};

export function getStaticPaths() {
  const files = readdirSync('./posts').map((file) => {
    const [name, extension] = file.split('.');
    return { params: { slug: name } };
  });

  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data, content } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    props: {
      title: data.title,
      post: value,
    },
  };
};

export default Post;
