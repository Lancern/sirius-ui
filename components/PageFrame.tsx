import Head from 'next/head';
import {PropsWithChildren} from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

const SITE_TITLE = "Lancern&apos;s Blog";
const SITE_DESCRIPTION = "Lancern&apos;s Personal Blog";

export interface PageFrameProps {
  title?: string;
}

export default function PageFrame({title, children}: PropsWithChildren<PageFrameProps>) {
  let actualTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  return (
      <>
        <Head>
          <title>{actualTitle}</title>
          <meta name="description" content={SITE_DESCRIPTION}/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className="flex flex-col bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-4xl">
            <Navbar />

            <div className="my-16">
              {children}
            </div>
          </div>

          <Footer />
        </div>
      </>
  );
}
