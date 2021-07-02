import { HomeIcon, MenuIcon, RssIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Navbar() {
  const buttonRef = useRef<any>(null);
  const menuRef = useRef<any>(null);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleToggleMenu = (e: MouseEvent) => {
    if (buttonRef.current && buttonRef.current.contains(e.target)) {
      // The user clicks on the menu button.
      return
    }
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      // The user clicks on other parts of the page and the menu has already been expanded. Close the menu.
      setShowMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleToggleMenu);
    return () => {
      document.removeEventListener("click", handleToggleMenu);
    };
  }, []);

  return (
    <nav className="mt-4 -mx-2 flex flex-row justify-between">
      <Link href="/">
        <a className="flex items-center p-2 rounded lg:hover:bg-gray-100 dark:text-white lg:dark:hover:bg-gray-800">
          <HomeIcon className="mr-2 w-5 h-5" />
          <span>Home</span>
        </a>
      </Link>

      {/* Navigation on desktop devices */}
      <div className="hidden md:flex">
        <Link href="/categories">
          <a className="p-2 mr-2 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">
            Categories
          </a>
        </Link>
        <Link href="/tags">
          <a className="p-2 mr-2 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">
            Tags
          </a>
        </Link>
        <Link href="/friends">
          <a className="p-2 mr-2 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">
            Friends
          </a>
        </Link>
        <a
          className="flex items-center text-blue-800 p-2 mr-2 rounded bg-blue-200 bg-opacity-40 hover:bg-opacity-80 dark:text-blue-200 dark:bg-opacity-10 dark:hover:bg-opacity-20"
          href="/feed"
          target="_blank"
          rel="noopener noreferrer"
        >
          RSS
          <RssIcon className="ml-1 w-5 h-5" />
        </a>
      </div>

      {/* Navigation on mobile devices */}
      <button
        className="md:hidden p-2"
        ref={buttonRef}
        onClick={() => { setShowMenu(true); }}
      >
        <MenuIcon className="w-5 h-5 dark:text-white" />
      </button>
      <CSSTransition
        in={showMenu}
        timeout={300}
        classNames="menu"
        unmountOnExit
        nodeRef={menuRef}
      >
        <div className="absolute top-0 right-0" ref={menuRef}>
          <div className="flex flex-col space-y-4 m-3 p-4 rounded bg-white shadow-xl dark:bg-gray-800 dark:text-white">
            <Link href="/categories">
              <a>Categories</a>
            </Link>
            <Link href="/tags">
              <a>Tags</a>
            </Link>
            <Link href="/friends">
              <a>Friends</a>
            </Link>
            <a
              className="flex items-center text-blue-800 dark:text-blue-200"
              href="/feed"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS
              <RssIcon className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </CSSTransition>
    </nav>
  );
};
