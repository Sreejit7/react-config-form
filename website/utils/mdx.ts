import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';

const sectionsPath = path.join(process.cwd(), 'pages');

export const getSlugs = async () => {
  const paths = sync(`${sectionsPath}/**/*.mdx`);

  return paths.map(path => {
    const pathContent = path.split('/');
    const pathName = pathContent[pathContent.length - 1];
    const [slug, _extension] = pathName.split('.');

    return slug;
  });
};

export const getContentFromSlug = async (slug: string) => {
  const sectionDir = path.join(sectionsPath, `${slug}.mdx`);
  const source = fs.readFileSync(sectionDir);
  const { content, data } = matter(source);

  return {
    content,
    frontMatter: {
      slug,
      excerpt: data.excerpt,
      title: data.title,
      ...data,
    },
  };
};

export const getMetaFromMdx = async (slug: string) => {
  const dir = path.join(sectionsPath, `${slug}.mdx`);
  const source = fs.readFileSync(dir);

  const fileMatter = matter(source);

  return fileMatter;
};
