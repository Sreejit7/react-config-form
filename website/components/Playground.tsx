import React from 'react';
import styled from 'styled-components';

const StyledSandbox = styled.iframe.attrs(props => ({
  src: props.src,
  title: props.title,
  allow:
    'accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking',
  sandbox:
    'allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts',
}))`
  width: 100%;
  height: 500px;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
`;

interface Props {
  src: string;
  title: string;
}

const Playground = ({ src, title }: Props) => {
  return <StyledSandbox src={src} title={title} />;
};

export default Playground;
