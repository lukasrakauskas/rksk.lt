import { Transition } from '@headlessui/react'
import { motion } from 'framer-motion'

export default function Button({
  children,
  color = 'indigo',
  loading = false,
  ...props
}) {
  return (
    <button
      // disabled={loading}
      className={`text-white bg-${color}-500 border-0 py-2 px-8 focus:outline-none hover:bg-${color}-600 rounded text-lg block h-12 relative`}
      {...props}
    >
      {/* 
      
        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
      */}
      <Transition
        show={loading}
        enter="transform transition"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform transition"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute h-4 w-4 -m-2 top-1/2 left-6 right-auto"
        as="span"
      >
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </Transition>
      <motion.span animate={{ paddingLeft: loading ? '2rem' : '0rem' }}>
        {children}
      </motion.span>
    </button>
  )
}
