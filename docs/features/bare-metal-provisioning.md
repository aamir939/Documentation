---
sidebar_position: 1
title: Automated Bare Metal Provisioning
description: Reduce GPU server provisioning from days to minutes with automated orchestration
keywords: [bare metal, provisioning, automation, MAAS, PXE, GPU servers]
---

# Automated Bare Metal Provisioning

**Business Value:** Reduce GPU server provisioning from days of manual work to minutes of automated orchestration. No SSH, no manual OS installs, no network cable tracing.

## How It Works

The provisioning engine coordinates seven components in a fully automated pipeline. When a tenant requests GPU nodes through the portal, the platform executes the following sequence without human intervention:

### Provisioning Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    Bare Metal Provisioning Flow                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1: Network Preparation                                    │
│  ───────────────────────────                                    │
│  Cisco NDFC prepares isolated VRFs and VLANs for the tenant     │
│                          │                                      │
│                          ▼                                      │
│  Step 2: Server Power On                                        │
│  ───────────────────────                                        │
│  MAAS powers on the physical server via IPMI                    │
│                          │                                      │
│                          ▼                                      │
│  Step 3: PXE Boot & OS Install                                  │
│  ────────────────────────────                                   │
│  Server boots over PXE, golden OS image installed               │
│                          │                                      │
│                          ▼                                      │
│  Step 4: Cloud-Init Configuration                               │
│  ────────────────────────────────                               │
│  Hostname, networking, GPU agent deployed                       │
│                          │                                      │
│                          ▼                                      │
│  Step 5: Storage Setup                                          │
│  ─────────────────────                                          │
│  DDN Lustre directory created with InfiniBand access control    │
│                          │                                      │
│                          ▼                                      │
│  Step 6: Agent Registration                                     │
│  ─────────────────────────                                      │
│  GPU agent registers with portal, node ready for cluster        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Technical Highlights

### Network Boot Infrastructure

- **PXE-based network boot** with DHCP relay across provisioning VLANs
- **Automatic MAC address discovery** and IP assignment
- **Isolated boot network** separate from tenant traffic

### Golden OS Image

The golden OS image includes pre-tuned settings optimized for GPU workloads:

| Layer | Setting | Purpose |
|-------|---------|---------|
| **BIOS** | Performance profile | Maximum clock speeds |
| **BIOS** | C-states disabled | Zero power-save latency |
| **BIOS** | NUMA alignment enabled | GPU PCIe aligned to nearest CPU socket |
| **BIOS** | PCIe ASPM disabled | Zero bus power management overhead |
| **BIOS** | Virtualization disabled | Zero hypervisor overhead |
| **OS** | CPU governor: performance | Locked maximum frequency |
| **OS** | Huge pages: always | Optimized GPU memory allocation |
| **OS** | NUMA balancing disabled | Predictable memory access |

### Agent-Based Architecture

Every provisioned node runs a lightweight gRPC agent for secure, bidirectional communication:

```
┌─────────────────┐                    ┌─────────────────┐
│   AI Cloud/     │                    │    GPU Node     │
│   dflare Portal │                    │                 │
│                 │    Ports 8030/8040 │   ┌─────────┐   │
│                 │◄──────────────────►│   │  Agent  │   │
│                 │       gRPC         │   └─────────┘   │
└─────────────────┘                    └─────────────────┘
```

**Agent responsibilities:**
- Report node health and GPU status
- Receive provisioning commands
- Execute cluster join operations
- Stream logs and metrics

## Provisioning Workflow

### Node Allocation

1. **User Request** — Tenant admin requests GPU nodes through portal
2. **Pool Selection** — System identifies available nodes matching requirements
3. **Network Setup** — VRFs/VLANs configured for tenant isolation
4. **Provisioning** — MAAS coordinates boot and OS installation
5. **Configuration** — Cloud-init applies node-specific settings
6. **Registration** — Agent confirms node ready for workloads

### Node Deallocation

Full cleanup ensures resources are properly returned:

```
Workload Drain → Network Removal → Storage Cleanup → Node Return to Pool
```

- **Workload drain** — All containers/jobs terminated gracefully
- **Network removal** — VRF/VLAN associations cleared
- **Storage cleanup** — Tenant data removed, NodeMap updated
- **Pool return** — Node available for next tenant

## Supported Hardware

The platform supports enterprise GPU server platforms:

| Vendor | Server Lines |
|--------|--------------|
| **Dell** | PowerEdge series |
| **HPE** | ProLiant series |
| **Supermicro** | GPU server platforms |
| **Lenovo** | ThinkSystem series |

### GPU Support

| Vendor | Supported Models |
|--------|------------------|
| **NVIDIA** | H100, A100, H200, B200 series |
| **AMD** | Instinct MI300X, MI250X |
| **Intel** | Gaudi, Max Series |

### Scale

- **Maximum nodes**: 1,250+ per deployment
- **Maximum GPUs**: 10,000+ accelerators per deployment

## Configuration Options

When requesting bare metal nodes, tenants can specify:

| Option | Description |
|--------|-------------|
| **Node count** | Number of GPU nodes to provision |
| **GPU type** | Specific GPU model (if multiple available) |
| **Pool selection** | Target hardware pool |
| **Labels** | Custom metadata for workload affinity |

## Monitoring Provisioning

Track provisioning status in real-time:

- **Portal UI** — Visual progress indicator
- **WebSocket updates** — Real-time status changes
- **Event log** — Detailed step-by-step progress
- **Error reporting** — Clear failure messages with remediation

---

**Next**: Learn about [Kubernetes Cluster Orchestration](./kubernetes-orchestration).
