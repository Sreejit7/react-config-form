import { SidebarItemType } from './Sidebar.types';

const sidebarConfig: SidebarItemType[] = [
  {
    text: 'Introduction',
    link: '/docs',
    status: 'collapsed',
    children: [
      {
        text: 'Overview',
        link: '#overview',
        status: 'single',
      },
      {
        text: 'Motivation',
        link: '#motivation',
        status: 'single',
      },
    ],
    heading: 'Documentation',
  },
  {
    text: 'Getting Started',
    link: '/docs/getting-started',
    status: 'single',
  },
  {
    text: 'Usage',
    link: '/docs/usage',
    status: 'collapsed',
    children: [
      {
        text: 'Minimum Working Setup',
        link: '#minimum-working-setup',
        status: 'single',
      },
      {
        text: 'Styling your forms',
        link: '#styling-your-forms',
        status: 'single',
      },
    ],
  },
  {
    text: 'Features',
    link: '/docs/features',
    status: 'collapsed',
    children: [
      {
        text: 'Customizability',
        link: '#customizability',
        status: 'single',
      },
      {
        text: 'Handling submission',
        link: '#handling-submission',
        status: 'single',
      },
      {
        text: 'Errors and validation',
        link: '#errors-and-validation',
        status: 'single',
      },
      {
        text: 'A11y and responsiveness',
        link: '#a11y-and-responsiveness',
        status: 'single',
      },
    ],
  },
  {
    text: 'TypeScript',
    link: '/docs/typescript',
    status: 'single',
  },
  {
    text: 'FormBuilder',
    link: '/docs/api-reference/formbuilder',
    status: 'single',
    heading: 'API Reference',
  },
  {
    text: 'SubmitButton',
    link: '/docs/api-reference/submitbutton',
    status: 'single',
  },
];

export default sidebarConfig;
