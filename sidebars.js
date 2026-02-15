// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'introduction',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'market-context',
      label: 'Market Context',
    },
    {
      type: 'doc',
      id: 'product-overview',
      label: 'Product Overview',
    },
    {
      type: 'category',
      label: 'Key Features',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Key Features & Capabilities',
        description: 'Explore the core capabilities of the AI Cloud/dflare platform. Each feature is designed to automate critical operational pillars for GPU infrastructure management.',
        slug: '/category/key-features',
      },
      items: [
        'features/bare-metal-provisioning',
        'features/kubernetes-orchestration',
        'features/slurm-orchestration',
        'features/network-vpc-orchestration',
        'features/storage',
        'features/security-access-control',
        'features/billing-metering',
        'features/monitoring',
      ],
    },
    {
      type: 'doc',
      id: 'architecture',
      label: 'Architecture',
    },
    {
      type: 'doc',
      id: 'infrastructure',
      label: 'Infrastructure',
    },
    {
      type: 'doc',
      id: 'security',
      label: 'Security & Compliance',
    },
    {
      type: 'doc',
      id: 'use-cases',
      label: 'Use Cases',
    },
    {
      type: 'doc',
      id: 'differentiators',
      label: 'Differentiators',
    },
    {
      type: 'doc',
      id: 'deployment',
      label: 'Deployment & Scalability',
    },
    {
      type: 'doc',
      id: 'support',
      label: 'Support & SLA',
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    },
  ],
};

export default sidebars;
