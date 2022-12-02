import React from 'react';

interface Props {
  text: string;
}
const InlineCode = ({ text }: Props) => {
  return <code className="hljs">{text}</code>;
};

export default InlineCode;
