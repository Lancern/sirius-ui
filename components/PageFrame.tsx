import Head from 'next/head';
import {PropsWithChildren} from 'react';

import Footer from './Footer';
import Navbar from './Navbar';
import {getBlogConfig} from '../api/config';

export interface PageFrameProps {
  title?: string;
}

export default function PageFrame({title, children}: PropsWithChildren<PageFrameProps>) {
  const config = getBlogConfig();
  const siteTitle = config.title;
  const siteDescription = config.description;

  let actualTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  return (
      <>
        <Head>
          <title>{actualTitle}</title>
          <meta name="description" content={siteDescription}/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className="flex flex-col bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-4xl">
            <Navbar />

            <div className="my-16 dark:text-white">
              {children}
            </div>
          </div>

          <Footer />
        </div>
      </>
  );
}

export function PageTitle({children}: PropsWithChildren<{}>) {
  return (
      <div className="font-bold text-2xl my-8 dark:text-white">
        {children}
      </div>
  )
}
