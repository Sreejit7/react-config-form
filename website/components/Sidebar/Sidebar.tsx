import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import config from './sidebar.config';
import type { SidebarItemType } from './Sidebar.types';
import { getSearchResult } from './sidebar.utils';
import SidebarItem from './SidebarItem';

const StyledSidebar = styled.aside`
  padding: 1rem 0.5rem;
  overflow-y: scroll;
  max-height: 90vh;
  flex: 0.15;
  position: sticky;
  top: 0;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border-width: 1px;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  padding-left: ${props => (props.className?.includes('nested') ? '8px' : '0')};
`;

export const StyledListHeader = styled.h4`
  font-weight: 600;
  margin: 0.5rem 0;
`;

export const NoResultsFoundSpan = styled.span`
  color: #707171;
`;

const Sidebar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchMatches, setSearchMatches] = useState<SidebarItemType[]>([]);

  useEffect(() => {
    const matches = getSearchResult(searchText);
    setSearchMatches(matches);
  }, [searchText]);

  return (
    <StyledSidebar>
      <StyledInput
        type="text"
        placeholder="Search the docs"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <StyledList>
        {searchText === '' &&
          config.map(item => (
            <React.Fragment key={item.link}>
              {item.heading && (
                <StyledListHeader>{item.heading}</StyledListHeader>
              )}
              <SidebarItem {...item} />
            </React.Fragment>
          ))}
        {searchText !== '' &&
          (searchMatches.length > 0 ? (
            searchMatches.map(item => (
              <React.Fragment key={item.link}>
                {item.heading && (
                  <StyledListHeader>{item.heading}</StyledListHeader>
                )}
                <SidebarItem {...item} />
              </React.Fragment>
            ))
          ) : (
            <NoResultsFoundSpan>
              No results found for <strong>{searchText}</strong>, please try a
              different keyword
            </NoResultsFoundSpan>
          ))}
      </StyledList>
    </StyledSidebar>
  );
};

export default Sidebar;
