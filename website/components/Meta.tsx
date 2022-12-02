import Head from 'next/head';
import React from 'react';

interface Props {
  meta: {
    title: string;
    desc: string;
    author: string;
  };
}
const Meta = ({ meta: { title, desc, author } }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="author" content={author} />
    </Head>
  );
};

export default Meta;
