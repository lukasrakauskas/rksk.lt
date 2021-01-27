import Container from 'src/components/Container';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          <span className="block mb-2">Hey, I’m</span>
          <span className="block font-bold text-purple-500">
            Lukas Rakauskas
          </span>
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          I’m a React Front-end Developer. JavaScript and React enthusiast.
          You’ve found my personal slice of the internet – everything you want
          to know and more is here.
        </h2>
      </div>
    </Container>
  );
}
