// import 'tailwindcss/tailwind.css'
// import 'prism-material-themes/themes/material-palenight.css'
// require('typeface-inter')
// import Layout from '../components/Layout'

// export default function MyApp({ Component, pageProps }) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   )
// }

import '../styles/global.css'

import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'next-themes'
// import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import { AuthProvider } from '../lib/auth'

// import SEO from '../next-seo.config'
// import MDXComponents from '@/components/MDXComponents'
// import { useAnalytics } from '@/lib/analytics'

// TODO: Figure out prism styles

export default function App({ Component, pageProps }) {
  // useAnalytics()

  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        <MDXProvider /*components={MDXComponents}*/>
          <Head>
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
          </Head>
          {/* <DefaultSeo {...SEO} /> */}
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
