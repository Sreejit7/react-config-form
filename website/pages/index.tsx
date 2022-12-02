import Link from 'next/link';
import styled from 'styled-components';
import Playground from '../components/Playground';
import HighlightedText from '../components/HighlightedText';
import hero from '../public/hero.webp';
import Image from 'next/image';

export const StyledPage = styled.main`
  min-height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  background-color: ${props => props.style?.backgroundColor || 'inherit'};
  justify-content: ${props =>
    props.className === 'center' ? 'center' : 'inherit'};
`;

export const StyledFlexContainer = styled.section`
  display: flex;
`;

const StyledBody = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 0.5;
  align-items: center;
  justify-content: center;
  gap: 1rem 0;

  @media (max-width: 768px) {
    flex-grow: 1;
  }
`;

const StyledHero = styled.section`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledButtonSection = styled.section`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const StyledButton = styled.span`
  padding: 0.85rem;
  border-radius: 5px;
  width: 12rem;
  height: 3rem;
  font-weight: 700;
  font-size: 1.2rem;
  transition: 0.7s all ease;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  background-color: ${props =>
    props.className === 'primary-btn' ? '#000' : '#fff'};
  color: ${props => (props.className === 'primary-btn' ? '#fff' : '#000')};
  border-color: ${props =>
    props.className === 'secondary-btn' ? '#000' : 'transparent'};

  &:hover {
    background-color: ${props =>
      props.className === 'primary-btn' ? '#57c3e1' : 'inherit'};
    color: ${props => (props.className === 'primary-btn' ? '#fff' : '#57c3e1')};
    border-color: ${props =>
      props.className === 'secondary-btn' ? '#57c3e1' : 'transparent'};
  }
`;

export const StyledTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  line-height: 1.35;
`;

function App() {
  return (
    <StyledPage>
      <StyledFlexContainer>
        <StyledBody>
          <StyledTitle>
            Create forms in <HighlightedText color="#61d9fa" text="React," />
            {'  '}
            just with a config.
          </StyledTitle>
          <p>
            Create fully accessible and customizable forms in React with a
            config object. Leave all worries of state, input change & error
            management behind with a FormBuilder component. Comes with the full
            power of TypeScript.
          </p>
          <StyledButtonSection>
            <Link href="/examples" passHref>
              <StyledButton className="primary-btn">See Examples</StyledButton>
            </Link>
            <Link href="/docs" passHref>
              <StyledButton className="secondary-btn">Read docs</StyledButton>
            </Link>
          </StyledButtonSection>
        </StyledBody>
        <StyledHero>
          <Image
            src={hero}
            className="landing-image"
            alt="FormBuilder provides a way to create forms in React"
            height={400}
            width={600}
          />
          <small>
            <a href="https://storyset.com/" target="_blank" rel="noreferrer">
              Illustrations by Storyset
            </a>
          </small>
        </StyledHero>
      </StyledFlexContainer>
      <Playground
        src="https://codesandbox.io/embed/react-config-form-playground-cy5tdc?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
        title="react-config-form-playground"
      />
    </StyledPage>
  );
}

export default App;
