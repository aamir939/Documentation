---
sidebar_position: 7
title: Enterprise Monitoring & Observability
description: Full visibility into GPU health, cluster performance, job queues, and resource utilization
keywords: [monitoring, observability, Prometheus, Grafana, VictoriaMetrics, alerting, dashboards]
---

# Enterprise Monitoring & Observability

**Business Value:** Full visibility into GPU health, cluster performance, job queues, and resource utilization — for both platform operators and tenants — with proactive alerting.

## Two-Tier Monitoring Architecture

AI Cloud/dflare implements a two-tier monitoring architecture to serve both platform operators and tenants.

### Tier 1 — Infrastructure Monitoring (Platform Ops)

**Always on, managed by the platform operations team.**

```
┌─────────────────────────────────────────────────────────────────┐
│              Infrastructure Monitoring (Tier 1)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    VictoriaMetrics (HA)                  │    │
│  │                   Long-term Storage                      │    │
│  └───────────────────────────┬─────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    External Grafana                      │    │
│  │               Platform Operations Dashboards             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  13 Exporters Covering Every Layer:                             │
│                                                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│  │   Node     │ │    GPU     │ │    K8s     │ │  HAProxy   │   │
│  │ Exporter   │ │ Telemetry  │ │  Cluster   │ │ Exporter   │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│  │  CoreDNS   │ │  MetalLB   │ │ PostgreSQL │ │  MongoDB   │   │
│  │ Exporter   │ │ Exporter   │ │ Exporter   │ │ Exporter   │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│  │   IPMI     │ │   etcd     │ │    CNI     │ │ Blackbox   │   │
│  │ Exporter   │ │ Exporter   │ │ Exporter   │ │ Exporter   │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │
│  ┌────────────┐                                                 │
│  │   Slurm    │                                                 │
│  │ Exporter   │                                                 │
│  └────────────┘                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tier 2 — Tenant Monitoring (User-Enabled)

**Deployed inside each tenant's cluster when enabled as an add-on.**

```
┌─────────────────────────────────────────────────────────────────┐
│                 Tenant Monitoring (Tier 2)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    Tenant Cluster                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │    │
│  │  │ Prometheus │  │   Node     │  │    GPU     │         │    │
│  │  │            │  │ Exporter   │  │ Telemetry  │         │    │
│  │  └────────────┘  └────────────┘  └────────────┘         │    │
│  │                                                          │    │
│  │  ┌────────────┐  ┌────────────┐                         │    │
│  │  │    Pod     │  │  K8s State │                         │    │
│  │  │ Exporter   │  │  Exporter  │                         │    │
│  │  └────────────┘  └────────────┘                         │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Portal Embedded Dashboards                  │    │
│  │         (Multi-tenant isolation enforced)                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Key feature:** Each tenant sees **only their own data** — strict multi-tenant isolation.

## Alert Thresholds

Pre-configured alerts for proactive issue detection:

| Metric | Threshold | Action |
|--------|-----------|--------|
| **GPU Temperature** | > 80°C for 10 minutes | Alert ops team |
| **CPU Utilization** | > 75% cluster-wide | Capacity warning |
| **Memory Utilization** | > 70% node-level | Capacity warning |
| **Storage Latency** | > 15ms | Performance investigation |
| **Slurm Job Queue** | > 100 pending jobs | Scheduling review |
| **GPU Resource Allocation** | > 90% cluster-wide | Capacity planning |
| **etcd Leader Changes** | > 3/hour | Stability investigation |

### Alert Routing

```
Alert Triggered
      │
      ▼
┌─────────────────┐
│ Alert Manager   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│ Email │ │ Slack │  (Configurable)
└───────┘ └───────┘
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│PagerDty│ │Webhook│  (Optional)
└───────┘ └───────┘
```

## GPU Metrics

Detailed GPU telemetry from every node:

| Metric | Description |
|--------|-------------|
| **gpu_utilization** | Percentage of GPU compute used |
| **gpu_memory_used** | GPU memory consumption (bytes) |
| **gpu_memory_total** | Total GPU memory (bytes) |
| **gpu_temperature** | GPU temperature (Celsius) |
| **gpu_power_draw** | Current power consumption (Watts) |
| **gpu_fan_speed** | Fan speed percentage |
| **gpu_clock_speed** | Current GPU clock (MHz) |
| **gpu_pcie_tx_bytes** | PCIe transmit throughput |
| **gpu_pcie_rx_bytes** | PCIe receive throughput |

### Multi-Vendor Support

GPU telemetry works across all supported vendors:

- **NVIDIA**: Via DCGM exporter
- **AMD**: Via ROCm SMI exporter
- **Intel**: Via platform-specific exporters

## Tenant Dashboard Views

### Real-Time GPU Utilization

```
┌─────────────────────────────────────────────────────────────────┐
│                    GPU Utilization                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Node: gpu-worker-001                                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ GPU 0: ████████████████████████████░░░░░░░░░░░░  68%     │  │
│  │ GPU 1: █████████████████████████████████░░░░░░░  82%     │  │
│  │ GPU 2: ████████████████████████████████████░░░░  91%     │  │
│  │ GPU 3: ███████████████████████████░░░░░░░░░░░░░  65%     │  │
│  │ GPU 4: █████████████████████████████████████░░░  95%     │  │
│  │ GPU 5: ██████████████████████████░░░░░░░░░░░░░░  62%     │  │
│  │ GPU 6: ███████████████████████████████░░░░░░░░░  78%     │  │
│  │ GPU 7: ████████████████████████████████░░░░░░░░  85%     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Cluster Average: 78.25%                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Cluster Overview

- Node count and status
- Total/allocated/available GPUs
- Control plane health
- Network status

### Slurm Job Queue

| State | Count | Description |
|-------|-------|-------------|
| **Running** | 45 | Currently executing |
| **Pending** | 12 | Waiting for resources |
| **Completed** | 1,234 | Finished successfully |
| **Failed** | 8 | Exited with errors |

### Storage Usage

```
┌─────────────────────────────────────────────────────────────────┐
│                    Storage Quota                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Quota: 100 TB                                                  │
│  Used:   85 TB (85%)                                            │
│                                                                 │
│  ████████████████████████████████████████████░░░░░░░░░         │
│                                                                 │
│  ⚠️ Warning: Approaching quota limit                            │
│                                                                 │
│  Top Directories:                                               │
│    /datasets/imagenet:     45 TB                               │
│    /checkpoints/exp-042:   18 TB                               │
│    /models/production:     12 TB                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Billing Summary

- Current period usage
- Projected end-of-period cost
- Usage trends (30/60/90 days)

## Historical Analysis

### Time Ranges

- **Real-time**: Last 5 minutes
- **Recent**: Last 1/6/24 hours
- **Historical**: 7/30/90 days
- **Long-term**: Up to 12 months (VictoriaMetrics retention)

### Trend Analysis

Identify patterns in resource usage:

- Weekly utilization cycles
- Training job patterns
- Capacity growth trends
- Cost optimization opportunities

## Integration Options

### Prometheus-Compatible

Export metrics to external monitoring systems:

```yaml
# Example Prometheus scrape config
scrape_configs:
  - job_name: 'aicloud-dflare'
    static_configs:
      - targets: ['metrics.aicloud-dflare.com:9090']
    bearer_token_file: /path/to/token
```

### Grafana Dashboards

Import pre-built dashboards or create custom visualizations.

### Webhook Alerts

Send alerts to custom endpoints:

```json
{
  "alert": "GPUTemperatureHigh",
  "node": "gpu-worker-003",
  "gpu": 2,
  "temperature": 85,
  "threshold": 80,
  "timestamp": "2026-02-07T14:30:00Z"
}
```

---

This completes the Key Features section. Return to the [Product Overview](../product-overview) for a high-level summary, or explore the [Architecture](../architecture) for technical details.
