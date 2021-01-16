import '../styles/global.css';

// import { DefaultSeo } from 'next-seo'
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

// import SEO from '../next-seo.config'

// TODO: Figure out prism styles

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {/* <DefaultSeo {...SEO} /> */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
