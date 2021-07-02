export default function Footer() {
  return (
    <footer className="w-full p-4 text-center text-gray-400 bg-gray-800">
      <div className="container mx-auto">
        <div>
          Powered by{' '}
          <a className="hover:text-white" href="https://nextjs.org/">
            Next.js
          </a>
          ,{' '}
          <a className="hover:text-white" href="https://tailwindcss.com/">
            Tailwind CSS
          </a>
          ,{' '}
          <a className="hover:text-white" href="https://notion.so">
            Notion
          </a>{' '}
          and{' '}
          <a className="hover:text-white" href="https://www.typescriptlang.org/">
            TypeScript.
          </a>
        </div>
        <div>
          UI design based on{' '}
          <a className="hover:text-white" href="https://spencerwoo.com/">
            Spencer Woo
          </a>
        </div>
        <div>
          Sirui Mu © 2021
        </div>
      </div>
    </footer>
  );
};
