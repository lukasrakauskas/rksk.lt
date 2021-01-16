import { format, parseISO } from 'date-fns';

import Container from '../components/Container';
import ViewCounter from '../components/ViewCounter';
// import BlogSeo from '@/components/BlogSeo'

export default function BlogLayout({ children, frontMatter }) {
  return (
    <Container>
      {/* <BlogSeo
        url={`https://leerob.io/blog/${frontMatter.slug}`}
        {...frontMatter}
      /> */}
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 mb-8">
          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
            {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
          </p>
          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
            {frontMatter.readingTime.text}
            {` • `}
            <ViewCounter slug={frontMatter.slug} />
          </p>
        </div>
        <div className="prose dark:prose-dark max-w-none w-full">
          {children}
        </div>
      </article>
    </Container>
  );
}
