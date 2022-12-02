import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import DocFooter from './DocFooter';
import Navbar from './Navbar';
import { Sidebar } from './Sidebar';

const StyledLayout = styled.main`
  padding: ${props => props.style?.padding || '0 2rem'};
  display: flex;
`;

const StyledContainer = styled.section`
  padding: ${props => (props.className === 'full' ? '0' : '0 1rem')};
  flex: ${props => (props.className === 'full' ? 1 : 0.85)};
`;
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      {router.pathname.includes('docs') && (
        <StyledLayout>
          <Sidebar />
          <StyledContainer>
            <>
              {children}
              <DocFooter />
            </>
          </StyledContainer>
        </StyledLayout>
      )}
      {!router.pathname.includes('docs') && (
        <>
          <StyledLayout style={{ padding: '0 2rem' }}>
            <StyledContainer className="full">
              <>{children}</>
            </StyledContainer>
          </StyledLayout>
          {/* <Footer /> */}
        </>
      )}
    </>
  );
};

export default Layout;
