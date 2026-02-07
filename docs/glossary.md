---
sidebar_position: 12
title: Glossary
description: Technical terms and definitions used in AI Cloud/dflare documentation
keywords: [glossary, definitions, terminology, acronyms]
---

# Glossary

Technical terms and definitions used throughout the AI Cloud/dflare documentation.

## A

### ABAC
**Attribute-Based Access Control** — Access decisions based on user attributes (tenant, project, organization) in addition to roles. Used in combination with RBAC for fine-grained authorization.

## C

### CNI
**Container Network Interface** — Plugin-based networking for Kubernetes. AI Cloud/dflare supports Calico (BGP-based) and Cilium (eBPF-powered).

## D

### DCGM
**NVIDIA Data Center GPU Manager** — GPU telemetry and health monitoring tool for NVIDIA GPUs. Provides metrics for utilization, temperature, memory, and power draw.

### DDN
**DataDirect Networks** — High-performance storage vendor. AI Cloud/dflare uses DDN AI400 with Lustre parallel filesystem for GPU workload storage.

## E

### etcd
Distributed key-value store used by Kubernetes for cluster state. AI Cloud/dflare deploys etcd in HA quorum (3 or 5 nodes) for reliability.

## G

### GRES
**Generic RESource** — Slurm's mechanism for managing non-CPU resources like GPUs. Jobs request GPUs using `--gres=gpu:<type>:<count>` syntax.

### Golden Image
Pre-configured operating system image with optimized BIOS settings, drivers, and configurations. Used for consistent, rapid bare metal provisioning.

## H

### HAProxy
High-availability load balancer used for distributing traffic across portal replicas and providing automatic failover.

## I

### IB
**InfiniBand** — High-speed, low-latency interconnect fabric used for GPU-to-GPU and GPU-to-storage communication. AI Cloud/dflare uses 400G InfiniBand.

### IPMI
**Intelligent Platform Management Interface** — Hardware-level server management protocol. Used by MAAS for remote power control and hardware monitoring.

## K

### Keycloak
Open-source Identity and Access Management (IAM) solution. AI Cloud/dflare uses Keycloak for authentication, authorization, and tenant isolation.

## L

### Lustre
Parallel distributed filesystem designed for high-performance computing. DDN AI400 uses Lustre for training data storage with multi-path parallel I/O.

## M

### MAAS
**Metal as a Service** — Canonical's bare metal provisioning tool. AI Cloud/dflare uses MAAS for automated server discovery, imaging, and deployment.

### mTLS
**Mutual TLS** — Both client and server authenticate via certificates. Used for secure communication between internal AI Cloud/dflare services.

## N

### NCCL
**NVIDIA Collective Communications Library** — Multi-GPU communication library for distributed training on NVIDIA GPUs. Optimized for NVLink and InfiniBand.

### NDFC
**Nexus Dashboard Fabric Controller** — Cisco's network automation platform. Used by AI Cloud/dflare for VRF/VLAN management and network orchestration.

### NodeMap
DDN Lustre access control mechanism. Maps InfiniBand IP addresses to allowed directories, providing tenant-level storage isolation.

### NVLink
NVIDIA's high-bandwidth GPU-to-GPU interconnect for intra-node communication. Provides faster data transfer than PCIe for multi-GPU workloads.

## O

### OST
**Object Storage Target** — Lustre storage server that holds file data. Data is striped across multiple OSTs for parallel I/O performance.

## P

### PKey
**Partition Key** — InfiniBand isolation mechanism, similar to VLANs for Ethernet. Each tenant receives a dedicated PKey for hardware-enforced network isolation.

### PXE
**Preboot Execution Environment** — Network-based OS boot protocol. Used by MAAS to boot bare metal servers and install the golden image.

## R

### RBAC
**Role-Based Access Control** — Permissions based on assigned roles (Platform Super Admin, Domain Admin, Project Admin, Member, Viewer).

### RCCL
**ROCm Communication Collectives Library** — AMD's multi-GPU communication library, equivalent to NVIDIA's NCCL for AMD Instinct GPUs.

### RDMA
**Remote Direct Memory Access** — GPU-to-GPU data transfer bypassing CPU. Enables high-throughput, low-latency communication over InfiniBand.

### ROCm
**Radeon Open Compute** — AMD's open-source GPU computing platform. AI Cloud/dflare supports ROCm for AMD Instinct accelerators.

## S

### Slinky
NVIDIA's Kubernetes Operator for running Slurm on Kubernetes. Enables traditional HPC batch scheduling on containerized infrastructure.

### Slurm
**Simple Linux Utility for Resource Management** — HPC workload manager for batch job scheduling. AI Cloud/dflare deploys Slurm via the Slinky Operator.

### slurmdbd
Slurm accounting daemon. Records job accounting data (GPU-hours, CPU-hours, memory) to MariaDB for billing and reporting.

## U

### UFM
**NVIDIA Unified Fabric Manager** — InfiniBand fabric management tool. Manages PKey assignments for tenant isolation and provides fabric telemetry.

## V

### VAST
**VAST Data** — Unified storage platform for file, object, and block storage. Used by AI Cloud/dflare for platform services, backups, and container registry.

### VictoriaMetrics
High-performance time-series database used for long-term metrics storage. Deployed in HA configuration for reliability.

### VRF
**Virtual Routing and Forwarding** — Network-level tenant isolation mechanism. Each tenant receives dedicated VRFs with isolated routing tables.

### VXLAN
**Virtual Extensible LAN** — Network virtualization technology used with EVPN for scalable tenant network isolation.

## Quick Reference Table

| Term | Full Name | Category |
|------|-----------|----------|
| ABAC | Attribute-Based Access Control | Security |
| CNI | Container Network Interface | Networking |
| DCGM | Data Center GPU Manager | Monitoring |
| DDN | DataDirect Networks | Storage |
| GRES | Generic RESource | Slurm |
| IB | InfiniBand | Networking |
| IPMI | Intelligent Platform Management Interface | Hardware |
| MAAS | Metal as a Service | Provisioning |
| mTLS | Mutual TLS | Security |
| NCCL | NVIDIA Collective Communications Library | GPU |
| NDFC | Nexus Dashboard Fabric Controller | Networking |
| NVLink | NVIDIA High-Bandwidth Interconnect | GPU |
| OST | Object Storage Target | Storage |
| PKey | Partition Key | Networking |
| PXE | Preboot Execution Environment | Provisioning |
| RBAC | Role-Based Access Control | Security |
| RCCL | ROCm Communication Collectives Library | GPU |
| RDMA | Remote Direct Memory Access | Networking |
| ROCm | Radeon Open Compute | GPU |
| UFM | Unified Fabric Manager | Networking |
| VRF | Virtual Routing and Forwarding | Networking |
| VXLAN | Virtual Extensible LAN | Networking |

---

:::info Need More Help?
If you encounter a term not listed here, please contact support or submit a documentation request.
:::
