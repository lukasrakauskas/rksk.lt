import hydrate from 'next-mdx-remote/hydrate';

import MDXComponents from 'src/components/MDXComponents';
import BlogLayout from 'src/layouts/blog';
import { getFileBySlug, getFiles } from 'src/lib/mdx';

export default function Blog({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents
  });

  return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>;
}

export async function getStaticPaths() {
  const posts = await getFiles('blog');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, '')
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('blog', params.slug);

  return { props: post };
}
