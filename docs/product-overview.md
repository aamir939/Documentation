---
sidebar_position: 3
title: Product Overview
description: How AI Cloud/dflare automates GPU infrastructure management
keywords: [product overview, automation, orchestration, provisioning]
---

# Product Overview

## What AI Cloud/dflare Does

AI Cloud/dflare is an end-to-end GPU infrastructure platform that automates seven critical operational pillars:

| Pillar | What It Does | Why It Matters |
|--------|--------------|----------------|
| **Bare Metal Provisioning** | Takes physical GPU servers from powered-off to workload-ready — automatically | Minutes to production, not weeks of manual setup |
| **Network Orchestration** | Creates isolated tenant networks with VRFs, VLANs, and InfiniBand partitions | Every tenant gets their own secure, high-performance network |
| **Kubernetes Orchestration** | Builds production-grade K8s clusters with GPU operators, CNI, and monitoring | Container-native AI/ML workflows out of the box |
| **Slurm (HPC) Orchestration** | Deploys Slurm on Kubernetes via Slinky Operator for batch job scheduling | HPC users get familiar tools (sbatch, squeue) on modern infrastructure |
| **Storage Orchestration** | Provisions high-performance DDN Lustre storage over InfiniBand + VAST platform storage | GPU nodes access training data at maximum fabric throughput |
| **Security & Access Control** | Enforces RBAC + ABAC with Keycloak, per-tenant isolation at every layer | Zero-trust by design — no action is trusted by default |
| **Billing & Metering** | Tracks GPU-hours, CPU-hours, storage, network — converts to billable records | Transparent, accurate, usage-based billing |

## How It Works — At a Glance

A tenant administrator logs into the portal, creates a project, selects GPU nodes from available pools, and requests a cluster. The platform automatically:

1. **Provisions networking** — VRFs, VLANs, InfiniBand partitions
2. **Installs the operating system** — Pre-tuned golden image with GPU optimizations
3. **Configures storage** — Dedicated Lustre directory with access controls
4. **Bootstraps the cluster** — Kubernetes or Slurm with all dependencies
5. **Deploys GPU runtime operators** — Device plugins, telemetry, feature discovery
6. **Enables monitoring** — Prometheus, Grafana, alerting
7. **Begins metering** — Usage tracking from second one

All without manual intervention.

## Platform Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      AI Cloud/dflare Portal                         │
│               (Single Pane of Glass — Web UI + API)                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ Identity │  │ Compute  │  │ Network  │  │ Storage  │  │Monitor │ │
│  │ Keycloak │  │ K8s/Slurm│  │ NDFC/UFM │  │ DDN/VAST │  │VM/Graf │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                    Bare Metal GPU Infrastructure                    │
│                                                                     │
│         Multi-Vendor GPU Support (NVIDIA, AMD, Intel & more)        │
│         High-Speed InfiniBand | Up to 1,250+ Nodes/Deploy          │
└─────────────────────────────────────────────────────────────────────┘
```

## Supported Workload Types

### Kubernetes Workloads

AI Cloud/dflare supports container-native AI/ML workflows:

- **Training jobs** with GPU resource requests
- **Inference services** with auto-scaling
- **ML pipelines** with orchestration frameworks
- **Distributed training** across multiple nodes

### Slurm (HPC) Workloads

Traditional HPC users get familiar tools:

- **Batch job scheduling** with `sbatch`
- **Interactive sessions** with `srun`
- **Job monitoring** with `squeue`
- **Resource allocation** with GPU-aware scheduling

## User Journey

### 1. Tenant Onboarding

Platform Super Admin creates the tenant:
- Keycloak realm provisioned automatically
- VRFs/VLANs allocated from pool
- Storage quotas configured
- First admin user created

### 2. Project Setup

Domain Admin creates organizational structure:
- Organizations for departmental grouping
- Projects for workload isolation
- Users invited with appropriate roles

### 3. Cluster Creation

Project Admin provisions infrastructure:
- Selects GPU nodes from available pool
- Chooses cluster type (Kubernetes or Slurm)
- Configures node pools and options
- Platform automates the rest

### 4. Workload Execution

Members deploy workloads:
- Submit jobs via portal, CLI, or API
- Monitor progress in real-time
- Access storage at fabric speed
- Track usage for billing

## Integration Points

AI Cloud/dflare integrates with enterprise systems:

| Integration | Purpose |
|-------------|---------|
| **LDAP/Active Directory** | Enterprise SSO via Keycloak federation |
| **External Identity Providers** | OAuth2/OIDC integration |
| **Monitoring Systems** | Prometheus-compatible metrics export |
| **CI/CD Pipelines** | REST API for automation |
| **Container Registries** | Internal registry included, external registries supported |

---

**Next**: Explore the [Key Features](./category/key-features) in detail.
