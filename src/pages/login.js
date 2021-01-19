import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import Button from '../components/Button';
import Container from '../components/Container';
import { useAuth } from '../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { user, login } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  return (
    <Container withPadding={false}>
      <section className="text-gray-600 body-font">
        <div className="container w-full md:w-1/2 md:px-5 mx-auto flex flex-wrap items-center">
          <form
            className="w-full bg-gray-100 dark:bg-gray-800 md:rounded-lg p-8 flex flex-col md:mx-auto md:mt-10"
            onSubmit={handleSubmit}
          >
            <h2 className="text-gray-900 dark:text-white text-lg font-medium title-font mb-5">
              Welcome back!
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-gray-800 focus:ring-2 ring-indigo-200 dark:ring-indigo-900 text-base outline-none text-gray-700 dark:text-white py-1 px-3 leading-8"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-gray-800 focus:ring-2 ring-indigo-200 dark:ring-indigo-900 text-base outline-none text-gray-700 dark:text-white py-1 px-3 leading-8"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <Button type="submit" loading={loading}>
              Log in
            </Button>
            <motion.p
              layout
              initial={{ opacity: 0, height: '0' }}
              animate={{
                opacity: error ? 1 : 0,
                height: error ? 'auto' : '0'
              }}
              transition={{ duration: 0.2 }}
              className="text-xs text-red-500 mt-3 mb-0 break-normal"
            >
              {error}
            </motion.p>
          </form>
        </div>
      </section>
    </Container>
  );
}
