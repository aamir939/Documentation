---
sidebar_position: 6
title: Usage Metering & Billing
description: Transparent, accurate, usage-based billing with 15-second granularity
keywords: [billing, metering, usage tracking, GPU-hours, quotas, cost management]
---

# Usage Metering & Billing

**Business Value:** Know exactly what each tenant, project, and user consumes — down to GPU-hours, storage bytes, and network bandwidth — with transparent, auditable billing records.

## What Gets Metered

AI Cloud/dflare tracks usage across all resource types:

| Resource | What's Measured | How | Granularity |
|----------|-----------------|-----|-------------|
| **GPU Compute** | GPU-hours, utilization %, memory, power draw, temperature | GPU telemetry exporter on every node | Per GPU, 15-second intervals |
| **CPU Compute** | CPU-hours, utilization %, core count, memory | Node Exporter on every node | Per node, 15-second intervals |
| **Bare Metal Allocation** | Node-hours: allocation start → release | Orchestration DB timestamps | Per node, precise timestamps |
| **K8s Cluster Runtime** | Cluster-hours: creation → deletion | Orchestration DB lifecycle events | Per cluster |
| **Slurm Jobs** | Per-job GPU-hours, CPU-hours, elapsed time, memory, exit code | slurmdbd accounting daemon → MariaDB | Per job |
| **Storage (DDN)** | Directory size, quota utilization, I/O throughput | DDN reporting + Storage Plugin | Per tenant directory |
| **Storage (VAST)** | PVC usage, S3 bucket size, object count | VAST management + CSI metrics | Per PVC, per bucket |
| **Network (InfiniBand)** | Bandwidth per tenant, RDMA throughput, packet drops | UFM telemetry + IB port counters | Per PKey (per tenant) |

## Metering Pipeline

Raw metrics flow through a multi-stage pipeline:

```
┌─────────────────────────────────────────────────────────────────┐
│                      Metering Pipeline                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Stage 1: Collection (15-30 second intervals)                   │
│  ────────────────────────────────────────────                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│  │ GPU        │ │ Node       │ │ UFM        │ │ DDN        │   │
│  │ Exporter   │ │ Exporter   │ │ Telemetry  │ │ Reporting  │   │
│  └─────┬──────┘ └─────┬──────┘ └─────┬──────┘ └─────┬──────┘   │
│        │              │              │              │           │
│        └──────────────┼──────────────┼──────────────┘           │
│                       │              │                          │
│                       ▼              ▼                          │
│  Stage 2: Short-term Storage                                    │
│  ───────────────────────────                                    │
│                 ┌────────────────┐                              │
│                 │   Prometheus   │                              │
│                 │   (Scrapes)    │                              │
│                 └───────┬────────┘                              │
│                         │                                       │
│                         ▼                                       │
│  Stage 3: Long-term HA Storage                                  │
│  ─────────────────────────────                                  │
│                 ┌────────────────┐                              │
│                 │ VictoriaMetrics│                              │
│                 │     (HA)       │                              │
│                 └───────┬────────┘                              │
│                         │                                       │
│                         ▼                                       │
│  Stage 4: Billing Aggregation                                   │
│  ────────────────────────────                                   │
│                 ┌────────────────┐                              │
│                 │orbiter-metering│                              │
│                 │  Aggregates by │                              │
│                 │tenant/project/ │                              │
│                 │     user       │                              │
│                 └───────┬────────┘                              │
│                         │                                       │
│                         ▼                                       │
│  Stage 5: Billing Records                                       │
│  ────────────────────────                                       │
│                 ┌────────────────┐                              │
│                 │  CSV/PDF       │                              │
│                 │  Export        │                              │
│                 └────────────────┘                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Quota Management

### Quota Types

| Quota Type | Scope | Description |
|------------|-------|-------------|
| **GPU nodes** | Per tenant/project | Maximum nodes that can be allocated |
| **GPU hours** | Per tenant/project | Compute budget per billing period |
| **Storage capacity** | Per tenant | Lustre directory quota |
| **Cluster count** | Per tenant/project | Maximum concurrent clusters |

### Real-Time Enforcement

Quotas are enforced in real-time:

- If a tenant exceeds their quota, new resource creation is **blocked**
- Running workloads are **not affected** by quota exhaustion
- Quota warnings are sent at configurable thresholds

### Quota Dashboard

The portal dashboard shows quota usage with color-coded warnings:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Quota Usage Dashboard                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  GPU Nodes                                                      │
│  ████████████████████████████████░░░░░░░░░░  80/100 (80%)      │
│                                              ⚠️ Warning         │
│                                                                 │
│  GPU Hours (this month)                                         │
│  ██████████████████████████░░░░░░░░░░░░░░░░  65,000/100,000    │
│                                              ✓ Normal           │
│                                                                 │
│  Storage                                                        │
│  ██████████████████████████████████████████  95/100 TB         │
│                                              🔴 Critical        │
│                                                                 │
│  Clusters                                                       │
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  4/20              │
│                                              ✓ Normal           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Billing Reports

### Report Contents

Billing reports include comprehensive usage details:

| Section | Contents |
|---------|----------|
| **Summary** | Total costs by resource type |
| **GPU Compute Detail** | Per-node, per-cluster GPU usage |
| **Bare Metal Allocation** | Node allocation duration |
| **Cluster Runtime** | Kubernetes/Slurm cluster hours |
| **Slurm Jobs** | Per-job, per-user breakdown |
| **Storage** | DDN and VAST consumption |
| **Network** | InfiniBand bandwidth usage |
| **Quota Status** | Current utilization vs. limits |

### Export Formats

- **CSV** — For integration with billing systems
- **PDF** — For human-readable reports
- **API** — For programmatic access

### Report Example

```
┌─────────────────────────────────────────────────────────────────┐
│           AI Cloud/dflare Usage Report                          │
│           Tenant: Acme Corp | January 2026                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SUMMARY                                                        │
│  ───────                                                        │
│  Total GPU-Hours:          125,450 hrs                          │
│  Total CPU-Hours:           45,230 hrs                          │
│  Storage Used (avg):            85 TB                           │
│  Network Bandwidth:           1.2 PB                            │
│                                                                 │
│  GPU COMPUTE DETAIL                                             │
│  ─────────────────                                              │
│  Cluster: training-prod                                         │
│    Nodes: 32 × H100 (8 GPU each)                               │
│    Duration: 720 hrs                                            │
│    GPU-Hours: 184,320                                           │
│                                                                 │
│  Cluster: inference-prod                                        │
│    Nodes: 8 × H100 (8 GPU each)                                │
│    Duration: 720 hrs                                            │
│    GPU-Hours: 46,080                                            │
│                                                                 │
│  SLURM JOBS                                                     │
│  ──────────                                                     │
│  Total Jobs: 1,247                                              │
│  Completed: 1,198                                               │
│  Failed: 49                                                     │
│  Total GPU-Hours: 89,500                                        │
│                                                                 │
│  Top Users by GPU-Hours:                                        │
│    alice@acme.com:    35,000 hrs                               │
│    bob@acme.com:      28,000 hrs                               │
│    charlie@acme.com:  15,500 hrs                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Cost Visibility

### Real-Time Cost Tracking

- **Live dashboard** showing current-period usage
- **Projected costs** based on run rate
- **Cost allocation** by project, user, workload

### Cost Optimization Insights

- **Underutilized resources** — Identify idle allocations
- **Efficiency metrics** — GPU utilization trends
- **Right-sizing recommendations** — Based on actual usage patterns

## API Access

### Metering API

Query usage data programmatically:

```bash
# Get GPU usage for a project
GET /api/v1/metering/gpu-hours?project=project-123&start=2026-01-01&end=2026-01-31

# Response
{
  "project": "project-123",
  "period": {
    "start": "2026-01-01T00:00:00Z",
    "end": "2026-01-31T23:59:59Z"
  },
  "gpu_hours": 125450,
  "by_cluster": [
    {"cluster": "training-prod", "gpu_hours": 89500},
    {"cluster": "inference-prod", "gpu_hours": 35950}
  ],
  "by_user": [
    {"user": "alice@acme.com", "gpu_hours": 45000},
    {"user": "bob@acme.com", "gpu_hours": 38000}
  ]
}
```

---

**Next**: Learn about [Enterprise Monitoring & Observability](./monitoring).
