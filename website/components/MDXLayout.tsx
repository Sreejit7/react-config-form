import Head from 'next/head';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  meta: {
    title: string;
    author: string;
    desc: string;
  };
}

const MDXLayout = ({ children, meta }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="author" content={meta.author} />
        <meta name="description" content={meta.desc} />
      </Head>
      {children}
    </>
  );
};

export default MDXLayout;
