import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import LogoWebp from '../public/FormBuilder.webp';

const StyledNavbar = styled.nav`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    font-weight: 600;
    color: #000;
    transition: 0.7s all ease;

    &:hover {
      color: #61d9fa;
      text-decoration: none;
    }
  }
`;

const StyledNavbarIcons = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledNavbarTitle = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  font-size: 1rem !important;
  cursor: pointer;
`;

const StyledNavbarH1 = styled.h1`
  @media (max-width: 550px) {
    display: none;
  }
`;

const StyledNavbarLink = styled.a.attrs(props => ({
  rel: 'noreferrer',
  target: '_blank',
  href: props.href || '/',
  title: props.title,
}))`
  transition: 0.7s all ease;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <StyledNavbarTitle>
        <Link href="/">
          <Image
            src={LogoWebp}
            alt="react-config-form"
            height={50}
            width={40}
          />
        </Link>
        <StyledNavbarH1>react-config-form</StyledNavbarH1>
      </StyledNavbarTitle>
      <StyledNavbarIcons>
        <Link href="/docs" title="Docs">
          Docs
        </Link>
        <StyledNavbarLink
          title="Github"
          href="https://www.github.com/Sreejit7/react-config-form"
        >
          Github
        </StyledNavbarLink>
        <StyledNavbarLink
          title="NPM"
          href="https://www.npmjs.com/package/react-config-form"
        >
          NPM
        </StyledNavbarLink>
      </StyledNavbarIcons>
    </StyledNavbar>
  );
};

export default Navbar;
