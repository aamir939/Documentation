import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          Transform bare metal GPU servers into production-ready, multi-tenant compute environments
          — delivering the raw power of dedicated hardware with the operational simplicity of a managed cloud service.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduction">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/product-overview">
            Product Overview
          </Link>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Bare Metal Provisioning',
    icon: '⚡',
    colorClass: 'feature-card__icon--blue',
    description: (
      <>
        Take physical GPU servers from powered-off to workload-ready in minutes.
        Automated PXE boot, golden OS images, and zero-touch deployment.
      </>
    ),
    link: '/docs/features/bare-metal-provisioning',
  },
  {
    title: 'Kubernetes + Slurm',
    icon: '🔄',
    colorClass: 'feature-card__icon--cyan',
    description: (
      <>
        Run both Kubernetes and Slurm workloads on the same infrastructure.
        Container-native MLOps and traditional HPC batch scheduling, unified.
      </>
    ),
    link: '/docs/features/kubernetes-orchestration',
  },
  {
    title: 'Multi-Vendor GPUs',
    icon: '🎮',
    colorClass: 'feature-card__icon--purple',
    description: (
      <>
        Support for NVIDIA, AMD, and Intel accelerators. Choose the right GPU
        for your workload without vendor lock-in.
      </>
    ),
    link: '/docs/infrastructure',
  },
  {
    title: 'Hardware Isolation',
    icon: '🔒',
    colorClass: 'feature-card__icon--green',
    description: (
      <>
        Multi-tenant security enforced at the hardware level. InfiniBand PKeys,
        DDN NodeMaps, and VRF isolation — defense in depth.
      </>
    ),
    link: '/docs/features/security-access-control',
  },
  {
    title: 'High-Performance Storage',
    icon: '💾',
    colorClass: 'feature-card__icon--orange',
    description: (
      <>
        DDN AI400 Lustre over 400G InfiniBand delivers storage throughput that
        keeps pace with modern GPU compute. No data loading bottlenecks.
      </>
    ),
    link: '/docs/features/storage',
  },
  {
    title: 'Transparent Billing',
    icon: '📊',
    colorClass: 'feature-card__icon--teal',
    description: (
      <>
        15-second metering granularity from hardware-level exporters. Track
        GPU-hours, storage, and network per tenant/project/user.
      </>
    ),
    link: '/docs/features/billing-metering',
  },
];

function Feature({title, icon, colorClass, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link} className={styles.featureLink}>
        <div className="feature-card">
          <div className={clsx('feature-card__icon', colorClass)}>
            <span style={{fontSize: '24px'}}>{icon}</span>
          </div>
          <Heading as="h3" className="feature-card__title">{title}</Heading>
          <p className="feature-card__description">{description}</p>
        </div>
      </Link>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Platform Capabilities</Heading>
          <p>AI Cloud/dflare automates seven critical operational pillars for GPU infrastructure management.</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="row">
          <div className="col col--3">
            <div className="stat-item">
              <div className="stat-value">1,250+</div>
              <div className="stat-label">GPU Nodes per Deployment</div>
            </div>
          </div>
          <div className="col col--3">
            <div className="stat-item">
              <div className="stat-value">10,000+</div>
              <div className="stat-label">Accelerators Supported</div>
            </div>
          </div>
          <div className="col col--3">
            <div className="stat-item">
              <div className="stat-value">400G</div>
              <div className="stat-label">InfiniBand Fabric</div>
            </div>
          </div>
          <div className="col col--3">
            <div className="stat-item">
              <div className="stat-value">15s</div>
              <div className="stat-label">Metering Granularity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TargetAudience() {
  const audiences = [
    {
      title: 'Cloud Service Providers',
      description: 'Offer GPU compute to customers with multi-tenant isolation, usage-based billing, and scalability.',
    },
    {
      title: 'Sovereign AI Programs',
      description: 'Build national AI infrastructure with data sovereignty, air-gapped deployment, and compliance.',
    },
    {
      title: 'AI Research Institutions',
      description: 'Enable large-scale model training with Slurm + Kubernetes flexibility and fair-share scheduling.',
    },
    {
      title: 'Enterprise AI Teams',
      description: 'Deploy production ML pipelines with Kubernetes-native workflows, RBAC, and integrated monitoring.',
    },
  ];

  return (
    <section className={styles.audienceSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Built For</Heading>
          <p>Organizations that need dedicated GPU infrastructure without the operational burden.</p>
        </div>
        <div className="row">
          {audiences.map((audience, idx) => (
            <div key={idx} className="col col--3">
              <div className={styles.audienceCard}>
                <Heading as="h4">{audience.title}</Heading>
                <p>{audience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2">Ready to Get Started?</Heading>
          <p>
            See AI Cloud/dflare in action — from bare metal provisioning to workload execution.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/introduction">
              Read Documentation
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://aicloud-dflare.com/demo">
              Request Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Enterprise GPU Infrastructure Platform"
      description="AI Cloud/dflare - Fully managed, enterprise-grade GPU-as-a-Service platform for AI, ML, and HPC workloads.">
      <HomepageHeader />
      <main>
        <StatsSection />
        <HomepageFeatures />
        <TargetAudience />
        <CTASection />
      </main>
    </Layout>
  );
}
