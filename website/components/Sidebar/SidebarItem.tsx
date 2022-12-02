import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledList } from './Sidebar';
import type { SidebarItemType } from './Sidebar.types';

const StyledListItem = styled.li`
  padding: 0.5rem 0.2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.25rem;
  border-radius: 4px;
  transition: 0.5s all ease;

  &:hover {
    background-color: #eee;
  }
`;

const FlexSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & .icon {
    font-size: 0.75rem;
  }
`;

const SidebarItem = (itemProps: SidebarItemType) => {
  const [status, setStatus] = useState(itemProps.status);

  const toggleStatus = () => {
    setStatus(prevStatus =>
      prevStatus === 'collapsed'
        ? 'expanded'
        : prevStatus === 'expanded'
        ? 'collapsed'
        : prevStatus
    );
  };

  /** TO-DO: Find a better approach of showing search results */
  const getInnerHTML = (text: string) => {
    return { __html: text };
  };

  return (
    <>
      <StyledListItem onClick={toggleStatus} className={status}>
        <Link href={itemProps.link}>
          <FlexSpan>
            <span dangerouslySetInnerHTML={getInnerHTML(itemProps.text)}></span>
            {status === 'collapsed' && <span className="icon">&#9658;</span>}
            {status === 'expanded' && <span className="icon">&#9660;</span>}
          </FlexSpan>
        </Link>
      </StyledListItem>
      {status === 'expanded' && (
        <StyledList className="nested-1">
          {itemProps.children?.map(child => (
            <Link key={child.link} href={`${itemProps.link}${child.link}`}>
              <a dangerouslySetInnerHTML={getInnerHTML(child.text)}></a>
            </Link>
          ))}
        </StyledList>
      )}
    </>
  );
};

export default SidebarItem;
