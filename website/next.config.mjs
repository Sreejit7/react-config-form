/** @type {import('next').NextConfig} */
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeCodeTitles,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        { behavior: 'wrap', properties: { class: 'anchor' } },
      ],
      rehypeHighlight,
    ],
    // required if we use `MDXProvider`
    // providerImportSource: "@mdx-js/react"
  },
});

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
