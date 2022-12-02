import sidebarConfig from './sidebar.config';
import type { SidebarItemType } from './Sidebar.types';

export const getAdjacentSidebarItems = (activeLink: string) => {
  const activeItemIndex = sidebarConfig.findIndex(
    item => item.link === activeLink
  );

  if (activeItemIndex === -1) {
    console.error('item not found in sidebar!');
    return [null, null];
  }

  const prevEl = sidebarConfig[activeItemIndex - 1];
  const nextEl = sidebarConfig[activeItemIndex + 1];

  return [prevEl, nextEl];
};

export const getSearchResult = (searchText: string) => {
  const searchRegex = new RegExp(searchText, 'gi');

  const rootMatches = findMatches(sidebarConfig, searchRegex);

  return rootMatches;
};

const findMatches = (
  config: SidebarItemType[],
  searchRegex: RegExp
): SidebarItemType[] => {
  const results = config.map(item => {
    const rootMatches = item.text.match(searchRegex);
    const childMatches = item.children
      ? findMatches(item.children, searchRegex)
      : [];

    return {
      ...item,
      text:
        rootMatches && rootMatches.length > 0
          ? item.text.split(searchRegex).reduce((prev, curr, index) => {
              return (
                prev +
                `<span class="search-highlight">${
                  rootMatches[index - 1]
                }</span>` +
                curr
              );
            })
          : childMatches.length > 0
          ? item.text
          : '',
      children:
        rootMatches && rootMatches.length > 0 ? item.children : childMatches,
      status: childMatches.length > 0 ? 'expanded' : item.status,
    };
  });

  return results.filter(res => res.text !== '' || res.status === 'expanded');
};
