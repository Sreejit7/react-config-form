import Link from 'next/link';
import styled from 'styled-components';
import { StyledPage, StyledTitle } from '..';

const StyledExamplesList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
  flex-wrap: wrap;
  padding: 1rem;
`;

const StyledExampleCard = styled.div`
  cursor: pointer;
  padding: 1rem;
  background-color: #61d9fa;
  width: 12rem;
  height: 6rem;
  border-radius: 4px;
  border: 1px solid #000;
  font-weight: 700;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Examples = () => {
  return (
    <StyledPage>
      <StyledTitle>
        Here are some <span className="text-react">examples</span> for you.
      </StyledTitle>
      <StyledExamplesList>
        <Link href="/examples/signup">
          <StyledExampleCard>Sign Up Form</StyledExampleCard>
        </Link>
        <Link href="/examples/application">
          <StyledExampleCard>Application Form</StyledExampleCard>
        </Link>
        <Link href="/examples/contact">
          <StyledExampleCard>Contact Form</StyledExampleCard>
        </Link>
      </StyledExamplesList>
    </StyledPage>
  );
};

export default Examples;
