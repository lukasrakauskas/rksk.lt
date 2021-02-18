import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import Image from 'next/image';

export default function Home() {
  const Statuses = {
    Idle: 'ilde',
    Loading: 'loading',
    Sent: 'sent',
    Error: 'error'
  };

  const Messages = {
    [Statuses.Sent]: 'Your message has been sent',
    [Statuses.Error]: 'Failed to send your message :('
  };

  const [status, setStatus] = useState(Statuses.Idle);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    if (!name || !email || !message) return;

    try {
      setStatus(Statuses.Loading);
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });
      setStatus(Statuses.Sent);
    } catch (error) {
      setStatus(Statuses.Error);
    }
  };

  useEffect(() => {
    let timeout;
    if (status === Statuses.Sent || status === Statuses.Error) {
      timeout = setTimeout(() => {
        setStatus(Statuses.Idle);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  return (
    <div>
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-baseline justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="#" aria-label="Home">
                      <h1 className="h-8 text-xl text-gray-900">
                        <span className="font-bold">Lukas</span> Rakauskas
                      </h1>
                    </a>
                    <div className="flex items-center -mr-2 md:hidden">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        id="main-menu"
                        aria-haspopup="true"
                        onClick={handleOpen}
                      >
                        <span className="sr-only">Open main menu</span>
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  <a
                    href="#about"
                    className="font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                  >
                    About
                  </a>
                  <a
                    href="#projects"
                    className="ml-4 font-medium text-gray-600 transition duration-150 ease-in-out sm:ml-8 hover:text-gray-900"
                  >
                    Projects
                  </a>
                  <a
                    href="#contact"
                    className="ml-4 font-medium text-indigo-600 transition duration-150 ease-in-out sm:ml-8 hover:text-indigo-900"
                  >
                    Contact
                  </a>
                </div>
              </nav>
            </div>

            <Transition
              show={isOpen}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
                <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <div>
                      <span className="h-8 text-xl text-gray-900">
                        <span className="font-bold">Lukas</span> Rakauskas
                      </span>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={handleClose}
                      >
                        <span className="sr-only">Close main menu</span>
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="main-menu"
                  >
                    <div className="px-2 pt-2 pb-3 space-y-1" role="none">
                      <a
                        href="#about"
                        className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                        role="menuitem"
                      >
                        About
                      </a>

                      <a
                        href="#projects"
                        className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                        role="menuitem"
                      >
                        Projects
                      </a>

                      <a
                        href="#contact"
                        className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                        role="menuitem"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <main className="max-w-screen-xl px-4 mx-auto mt-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                  Hi, I am
                  <br />
                  <span className="text-indigo-600">Lukas Rakauskas</span>
                </h2>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Currently studying software engineering at KTU. I mostly do
                  front-end development, and I&apos;m a React and Node.js nerd.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#contact"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo md:py-4 md:text-lg md:px-10"
                    >
                      Contact me
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#about"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-indigo-700 transition duration-150 ease-in-out bg-indigo-100 border border-transparent rounded-md hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 md:py-4 md:text-lg md:px-10"
                    >
                      Know more
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="relative h-72 md:h-96 lg:w-full lg:h-full">
            <Image
              objectPosition="left center"
              objectFit="cover"
              layout="fill"
              src="/static/images/intro-cropped.jpg"
              alt="Lukas Rakauskas"
            />
          </div>
        </div>
      </div>

      <div className="py-12 bg-indigo-600" id="about">
        <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
          <p className="text-base font-semibold leading-6 tracking-wide text-white uppercase lg:text-center">
            About
          </p>
          <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-white lg:text-center sm:text-4xl sm:leading-10">
            A sneak peek of Lukas
          </h3>
          <p className="max-w-4xl mt-4 text-lg leading-7 text-white md:text-xl lg:mx-auto">
            Lukas Rakauskas is a Software Engineer with a handful of experience
            in part-time website and app development. Lukas specializes in web
            development and regularly keeps up with new JavaScript frameworks,
            browser specs and other tech trends, such as utility first CSS,
            single page and progressive web apps. A firm believer in the power
            of pair programming in the workplace, Lukas passionately works with
            teammates and fits in any team. Lukas enjoys a good video game grind
            but can also be found in the gym working out the reps.
          </p>
        </div>
      </div>

      <section className="max-w-screen-xl px-4 py-24 mx-auto text-gray-600 sm:px-6 lg:px-8 body-font">
        <div className="lg:text-center">
          <p className="text-base font-semibold leading-6 tracking-wide text-indigo-600 uppercase">
            Projects
          </p>
          <h3 className="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Some of my notable work
          </h3>
        </div>
        <div className="flex flex-col max-w-4xl gap-8 mx-auto md:flex-row">
          <div className="mb-6 sm:mb-0">
            <div className="">
              <Image
                alt="http://fabrics.lt"
                src="/static/images/fabricslt.jpg"
                className="overflow-hidden rounded-lg"
                width={1280}
                height={720}
              />
            </div>
            <h4 className="mt-4 text-lg font-medium leading-6 text-gray-900 md:text-xl">
              WooCommerce shipping plugin
            </h4>
            <p className="mt-4 text-base font-bold leading-6 text-indigo-700 uppercase">
              Work done
            </p>
            <p className="text-base leading-6 text-gray-700 sm:text-md md:text-lg">
              Adds{' '}
              <a
                className="text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500"
                href="https://www.omniva.lt/"
              >
                Omniva
              </a>{' '}
              terminal shipping method for WooCommerce.
            </p>
            <p className="mt-4 text-base font-bold leading-6 text-indigo-700 uppercase">
              Technology stack
            </p>
            <p className="text-base leading-6 text-gray-700 sm:text-md md:text-lg">
              PHP, HTML, CSS, WordPress
            </p>
          </div>

          <div className="mb-6 sm:mb-0">
            <div className="">
              <Image
                alt="mobite application"
                src="/static/images/mobite.png"
                className="overflow-hidden rounded-lg"
                width={1280}
                height={720}
              />
            </div>
            <h4 className="mt-4 text-lg font-semibold leading-6 text-gray-900 md:text-xl">
              Mobite
            </h4>
            <p className="mt-4 text-base font-bold leading-6 text-indigo-700 uppercase">
              Work done
            </p>
            <p className="text-base leading-6 text-gray-700 sm:text-md md:text-lg">
              Mobite is a questionnaire like Akinator to help non-tech savvy
              users choose a smartphone that fits their needs.
            </p>
            <p className="mt-4 text-base font-bold leading-6 text-indigo-700 uppercase">
              Technology stack
            </p>
            <p className="text-base leading-6 text-gray-700 sm:text-md md:text-lg">
              .NET Core 3.1, MySQL, Angular 9, TypeScript, SCSS
            </p>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col items-start mx-auto lg:w-2/3 sm:flex-row sm:items-center">
            <h3 className="flex-grow text-2xl font-medium text-white sm:pr-16 title-font">
              Want to take a look at the code?
            </h3>
            <a
              href="https://github.com/lukasrakauskas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-8 py-2 mt-10 text-lg text-white bg-gray-900 border-0 rounded focus:outline-none hover:bg-gray-800 sm:mt-0"
            >
              Go to Github
            </a>
          </div>
        </div>
      </section>

      <section className="relative text-gray-600 body-font" id="contact">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col w-full mb-12">
            <p className="text-base font-semibold leading-6 tracking-wide uppercase md:text-center">
              Contact
            </p>
            <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 md:text-center sm:text-4xl sm:leading-10">
              Let&apos;s talk
            </h3>
          </div>
          <div className="mx-auto lg:w-1/2 md:w-2/3">
            <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">
              <div className="w-full p-2 md:w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="text-sm leading-7 text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
              <div className="w-full p-2 md:w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="text-sm leading-7 text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="text-sm leading-7 text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  ></textarea>
                </div>
              </div>
              <div className="w-full p-2">
                <button
                  type="submit"
                  disabled={status === Statuses.Loading}
                  className="flex px-8 py-2 mx-auto text-lg text-white bg-indigo-600 border-0 rounded focus:outline-none hover:bg-indigo-700"
                >
                  Send message
                </button>
                {Messages[status] ? (
                  <p className="mt-6 text-center">{Messages[status]}</p>
                ) : null}
              </div>
              <div className="w-full p-2 pt-8 mt-8 text-center border-t border-gray-200">
                <span className="inline-flex">
                  <a
                    href="https://www.linkedin.com/in/lukas-rakauskas/"
                    className="text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 448 512"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/lukasrakauskas"
                    className="ml-4 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 496 512"
                    >
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                    </svg>
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
