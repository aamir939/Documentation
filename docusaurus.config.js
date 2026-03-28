// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dflair AI',
  tagline: 'Enterprise GPU Infrastructure Platform',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.dflair-ai.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'dflair-ai',
  projectName: 'documentation',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    ['drawio', {}],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Remove edit links for confidential documentation
        },
        blog: false, // Disable blog for enterprise documentation
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/aicloud-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Dflair AI',
        logo: {
          alt: 'Dflair AI Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/architecture',
            label: 'Architecture',
            position: 'left',
          },
          {
            to: '/docs/security',
            label: 'Security',
            position: 'left',
          },
          {
            to: '/docs/category/key-features',
            label: 'Features',
            position: 'left',
          },
          {
            href: 'https://portal.dflair-ai.com',
            label: 'Portal',
            position: 'right',
          },
          {
            href: 'https://status.dflair-ai.com',
            label: 'Status',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/introduction',
              },
              {
                label: 'Architecture',
                to: '/docs/architecture',
              },
              {
                label: 'Security',
                to: '/docs/security',
              },
            ],
          },
          {
            title: 'Platform',
            items: [
              {
                label: 'Key Features',
                to: '/docs/category/key-features',
              },
              {
                label: 'Infrastructure',
                to: '/docs/infrastructure',
              },
              {
                label: 'Use Cases',
                to: '/docs/use-cases',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Glossary',
                to: '/docs/glossary',
              },
              {
                label: 'Support & SLA',
                to: '/docs/support',
              },
              {
                label: 'Request Demo',
                href: 'https://dflair-ai.com/demo',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'Portal Login',
                href: 'https://portal.dflair-ai.com',
              },
              {
                label: 'System Status',
                href: 'https://status.dflair-ai.com',
              },
              {
                label: 'Contact Sales',
                href: 'https://dflair-ai.com/contact',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Dflair AI. All rights reserved. Confidential — For Authorized Distribution Only.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'yaml', 'json', 'python'],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    }),
};

export default config;
