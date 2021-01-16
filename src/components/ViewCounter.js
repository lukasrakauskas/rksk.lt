import { useEffect } from 'react';
import format from 'comma-number';
import useSWR from 'swr';

import fetcher from 'src/lib/fetcher';

export default function ViewCounter({ slug }) {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
      });

    registerView();
  }, [slug]);

  return `${views ? format(views) : '–––'} views`;
}
