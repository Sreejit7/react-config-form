import React from 'react';
import styled from 'styled-components';

const StyledText = styled.span`
  color: ${props => props.color || '#0184fe'};
`;

interface Props {
  text: string;
  color?: string;
  showBackticks?: boolean;
}

const HighlightedText = ({ text, color, showBackticks }: Props) => {
  return (
    <StyledText color={color}>
      {showBackticks && `\``}
      {text}
      {showBackticks && `\``}
    </StyledText>
  );
};

export default HighlightedText;
