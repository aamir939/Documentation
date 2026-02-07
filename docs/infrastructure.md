---
sidebar_position: 6
title: Infrastructure Specifications
description: Hardware specifications and performance tuning for AI Cloud/dflare deployments
keywords: [infrastructure, hardware, GPU, InfiniBand, storage, specifications]
---

# Infrastructure Specifications

## Compute Infrastructure

### Supported Hardware

| Specification | Detail |
|---------------|--------|
| **Supported Servers** | Enterprise GPU server platforms (Dell PowerEdge, HPE ProLiant, Supermicro, Lenovo ThinkSystem) |
| **Supported GPUs** | Multi-vendor: NVIDIA (H100, A100, H200, B200 series), AMD (Instinct MI300X, MI250X), Intel (Gaudi, Max Series) |
| **GPUs per Node** | Configurable — typically 4 to 8 GPUs per node depending on server platform |
| **GPU Interconnect (Intra-Node)** | Vendor-specific high-bandwidth links (NVLink, Infinity Fabric, etc.) |
| **InfiniBand Links** | Multiple 400Gbps links per node (configurable per deployment) |
| **Ethernet** | 25G frontend |
| **Maximum Nodes** | 1,250+ per deployment |
| **Maximum GPUs** | 10,000+ accelerators per deployment |

### GPU Support Matrix

| Vendor | GPU Models | Use Cases |
|--------|------------|-----------|
| **NVIDIA** | H100, A100, H200, B200 series | AI training, inference, HPC |
| **AMD** | Instinct MI300X, MI250X | AI training, scientific computing |
| **Intel** | Gaudi, Max Series | AI inference, training |

## Network Infrastructure

### Dual-Fabric Architecture

| Fabric | Technology | Speed | Purpose |
|--------|------------|-------|---------|
| **GPU-to-GPU (training)** | InfiniBand via RDMA/NCCL/RCCL | 400G × multiple links per node | Distributed training collective operations |
| **GPU-to-Storage (data)** | InfiniBand via Lustre/RDMA | 400G × multiple links per node | Training data access at line rate |
| **Platform Services** | Ethernet (VLAN 903) | 25G | Management, orchestration, monitoring |
| **Tenant Isolation** | VRF (VXLAN/EVPN) + UFM PKey | Hardware-enforced | Network-level security boundary |

### Network Isolation Mechanisms

```
┌─────────────────────────────────────────────────────────────┐
│                    Network Isolation Stack                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: Ethernet Isolation                                │
│  ─────────────────────────────                              │
│  • VRF per tenant (VXLAN/EVPN)                              │
│  • 2 VLANs per VRF                                          │
│  • Managed by Cisco NDFC                                    │
│                                                             │
│  Layer 2: InfiniBand Isolation                              │
│  ─────────────────────────────                              │
│  • UFM PKey per tenant                                      │
│  • Hardware-enforced at switch level                        │
│  • Prevents cross-tenant IB traffic                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Storage Infrastructure

### Storage Systems

| System | Type | Connection | Use Case |
|--------|------|------------|----------|
| **DDN AI400** | Lustre parallel filesystem | InfiniBand | Training data, checkpoints, experiment results |
| **VAST Data** | Unified file/object (NFS/S3) | Ethernet | Platform databases, backups, logs, registry |

### DDN Lustre Performance Characteristics

- **Parallel I/O**: Data striped across multiple Object Storage Targets (OSTs)
- **Aggregate throughput**: Hundreds of GB/s across the cluster
- **Access control**: NodeMap-based IP allowlisting
- **Quota enforcement**: Per-tenant capacity limits

### Storage Security — Double Isolation

Tenant storage isolation is enforced at two independent layers simultaneously:

| Layer | Mechanism | Protection |
|-------|-----------|------------|
| **InfiniBand level** | UFM PKey | Only tenant's GPU ports can communicate on tenant's IB partition |
| **DDN Lustre level** | NodeMap | Only tenant's IB IP addresses can mount tenant's directory |

:::tip Defense in Depth
Even if one layer were compromised, the other would still block unauthorized access.
:::

## Performance Tuning

### BIOS-Level Optimizations

The golden OS image includes pre-configured BIOS settings optimized for GPU workloads:

| Layer | Setting | Purpose |
|-------|---------|---------|
| **BIOS** | Performance profile, C-states disabled | Maximum clock speeds, zero power-save latency |
| **BIOS** | NUMA alignment enabled | GPU PCIe aligned to nearest CPU socket |
| **BIOS** | PCIe ASPM disabled, virtualization off | Zero overhead for bare metal GPU workloads |

### OS-Level Optimizations

| Layer | Setting | Purpose |
|-------|---------|---------|
| **OS** | CPU governor: performance | Locked maximum frequency |
| **OS** | Huge pages: always | Optimized GPU memory allocation |
| **OS** | IOMMU enabled with passthrough | Direct device passthrough for accelerators |

### Why These Settings Matter

```
Standard Configuration          Optimized Configuration
───────────────────────         ─────────────────────────

CPU: Dynamic frequency          CPU: Locked to max
     (saves power, adds              (maximum throughput,
      latency)                        predictable performance)

Memory: Standard pages          Memory: Huge pages
        (4KB)                          (2MB/1GB)
                                       (reduced TLB misses)

PCIe: Power management          PCIe: ASPM disabled
      enabled                         (zero latency transitions)

NUMA: Auto-balancing            NUMA: Fixed alignment
      (adds overhead)                 (optimal GPU-CPU affinity)
```

## Scale Specifications

| Dimension | Capacity |
|-----------|----------|
| **GPU Nodes** | 1,250+ per deployment |
| **Accelerators** | 10,000+ GPUs per deployment |
| **GPU Vendors** | NVIDIA, AMD, Intel — multi-vendor support |
| **Tenants** | Multi-tenant with dedicated Keycloak realms per tenant |
| **Clusters per Tenant** | Configurable via quota system |
| **Network Isolation** | Pool of 10+ tenant VRFs, 2 VLANs per VRF, expandable |

## Reference Deployment Configurations

### Small Deployment

| Component | Specification |
|-----------|--------------|
| GPU Nodes | 16-64 nodes |
| Total GPUs | 128-512 accelerators |
| InfiniBand | Single spine-leaf topology |
| Storage | DDN AI400 entry configuration |
| Tenants | 1-5 tenants |

### Medium Deployment

| Component | Specification |
|-----------|--------------|
| GPU Nodes | 64-256 nodes |
| Total GPUs | 512-2,048 accelerators |
| InfiniBand | Multi-spine topology |
| Storage | DDN AI400 mid-range configuration |
| Tenants | 5-20 tenants |

### Large Deployment

| Component | Specification |
|-----------|--------------|
| GPU Nodes | 256-1,250+ nodes |
| Total GPUs | 2,048-10,000+ accelerators |
| InfiniBand | Fat-tree topology |
| Storage | DDN AI400 enterprise configuration |
| Tenants | 20+ tenants |

---

**Next**: Learn about [Security, Compliance & Governance](./security).
