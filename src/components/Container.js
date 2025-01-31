import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import { useAuth } from 'src/lib/auth';

export default function Container({
  children,
  withPadding = true,
  ...customMeta
}) {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  const loggedIn = user != null;
  const meta = {
    title: 'Lukas Rakauskas – React Front-end Developer.',
    description: `Front-end developer, JavaScript enthusiast.`,
    // image: 'https://rksk.lt/static/images/banner.png',
    type: 'website',
    ...customMeta
  };

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-white dark:bg-black">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://rksk.lt${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Lukas Rakauskas" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        {/* <meta property="og:image" content={meta.image} /> */}
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
        <div>
          <Link href="/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Home</a>
          </Link>
          <Link href="/blog">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Blog</a>
          </Link>
          {loggedIn ? (
            <button
              onClick={logout}
              className="inline-block border-0 p-1 sm:p-4 text-gray-900 dark:text-gray-100"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
                Login
              </a>
            </Link>
          )}
        </div>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="bg-gray-200 dark:bg-gray-800 rounded p-3 h-10 w-10"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 text-gray-800 dark:text-gray-200"
            >
              {resolvedTheme === 'dark' ? (
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              )}
            </svg>
          )}
        </button>
      </nav>
      <main
        className={`flex flex-col justify-center bg-white dark:bg-black ${
          withPadding ? 'px-8' : ''
        } md:p-8 box-border`}
      >
        {children}
      </main>
    </div>
  );
}
