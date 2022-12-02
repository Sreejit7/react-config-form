export interface SidebarItemType {
  text: string;
  children?: SidebarItemType[];
  status: 'expanded' | 'collapsed' | 'single';
  link: string;
  heading?: string;
}
