import { ThemeProvider } from 'next-themes';

import { AuthProvider } from 'src/lib/auth';

import 'src/styles/global.css';

// TODO: Figure out prism styles

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
