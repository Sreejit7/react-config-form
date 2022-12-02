import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SidebarItemType } from './Sidebar/Sidebar.types';
import { getAdjacentSidebarItems } from './Sidebar/sidebar.utils';
import leftArrow from '../public/left-arrow.svg';
import rightArrow from '../public/right-arrow.svg';
import Image from 'next/image';

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.className === 'justify-end' ? 'flex-end' : 'space-between'};
  width: 100%;
  margin: 3rem 0 2.6rem 0;
`;

const CommonFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid #bcbdbd;
  font-size: 0.9rem;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  transition: 0.5s all ease;
  border-radius: 4px;
  color: #0069cb;
  font-size: 1.1rem;

  img {
    transition: 0.25s all ease-out;
  }

  &:hover {
    img {
      transition: 0.25s all ease-in-out;
      transform: ${props =>
        props.className === 'next' ? 'translateX(4px)' : 'translateX(-4px)'};
    }
  }
`;

const Footer = () => {
  const router = useRouter();
  const [prevLink, setPrevLink] = useState<SidebarItemType | null>();
  const [nextLink, setNextLink] = useState<SidebarItemType | null>();

  useEffect(() => {
    const [prev, next] = getAdjacentSidebarItems(router.pathname);

    setPrevLink(prev);
    setNextLink(next);
  }, [router.pathname]);

  return (
    <>
      <StyledFooter className={!prevLink ? 'justify-end' : ''}>
        {prevLink && (
          <Link href={prevLink.link} passHref>
            <StyledLink className="prev">
              <Image
                src={leftArrow}
                alt={prevLink.text}
                width={16}
                height={16}
              />
              {prevLink.text}
            </StyledLink>
          </Link>
        )}
        {nextLink && (
          <Link href={nextLink.link} passHref>
            <StyledLink className="next">
              {nextLink.text}
              <Image
                src={rightArrow}
                alt={nextLink.text}
                width={16}
                height={16}
                color="#0184fe"
              />
            </StyledLink>
          </Link>
        )}
      </StyledFooter>
      <CommonFooter>
        <h4>
          Built by{' '}
          <a href="https://www.sreejit.dev" target="_blank" rel="noreferrer">
            @Sreejit
          </a>
        </h4>
        <a
          href={`https://github.com/Sreejit7/react-config-form/website/tree/main/website${router.pathname}.mdx`}
          target="_blank"
          rel="noreferrer"
        >
          Edit this page on Github
        </a>
      </CommonFooter>
    </>
  );
};

export default Footer;
