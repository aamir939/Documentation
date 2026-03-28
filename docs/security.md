---
sidebar_position: 7
title: Security, Compliance & Governance
description: Zero-trust security model, compliance alignment, and data protection in Dflair AI
keywords: [security, compliance, governance, RBAC, ABAC, zero-trust, HIPAA, ISO 27001]
---

# Security, Compliance & Governance

## Zero-Trust Security Model

Dflair AI implements defense-in-depth with zero-trust principles — **no action is trusted by default**, every request is authenticated and authorized at multiple levels.

### Security Layers

| Security Layer | Mechanism | Protection |
|----------------|-----------|------------|
| **Authentication** | Keycloak OAuth2/JWT, RS256 signing, short TTL, MFA | Identity verification for every interaction |
| **Authorization** | RBAC + ABAC via identity-service | Role and context validation on every action |
| **Transport** | TLS 1.2+ everywhere, mTLS between services, HSTS | Encrypted communication, mutual authentication |
| **Network Isolation** | VRF/VLAN (Ethernet), InfiniBand PKey | Hardware-enforced tenant traffic separation |
| **Storage Isolation** | Lustre NodeMap + InfiniBand PKey (double isolation) | Two independent layers protecting tenant data |
| **Compute Isolation** | K8s namespaces, Slurm cgroups v2 | Workload-level resource confinement |
| **Audit** | Correlation ID tracking, immutable logs, S3 backup every 6 hours | Full traceability of every action |
| **Firewall** | Enterprise firewall with ACLs between orchestration and GPU nodes | Strict access control at network perimeter |

## Access Control Model

### Hybrid RBAC + ABAC

Dflair AI implements a hybrid access control model powered by Keycloak as the central Identity Provider:

- **RBAC (Role-Based)**: Users are assigned roles — Platform Super Admin, Domain Admin, Organization Admin, Project Admin, Member, or Viewer — each with predefined permission sets

- **ABAC (Attribute-Based)**: Every action is further validated against the user's tenant (Domain), Organization, and Project context. A Member in Project A cannot touch resources in Project B.

:::warning Important
Every request must pass **both** checks. No action is trusted by default.
:::

### Six-Role Hierarchy

| Role | Scope | Capabilities |
|------|-------|--------------|
| **Platform Super Admin** | Global | Full control over all tenants, infrastructure, and platform configuration |
| **Domain Admin** | Tenant | Full control within their tenant: users, projects, clusters, quotas, networking |
| **Organization Admin** | Organization | Manage projects and users within their organization |
| **Project Admin** | Project | Create/manage clusters, provision bare metal, deploy workloads |
| **Member** | Project | Deploy workloads, submit jobs, view monitoring — operational access |
| **Viewer** | Project | Read-only access to cluster status, dashboards, and resource usage |

### Role Hierarchy Diagram

```
                    ┌─────────────────────────┐
                    │  Platform Super Admin   │
                    │       (Global)          │
                    └───────────┬─────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │      Domain Admin       │
                    │      (Per Tenant)       │
                    └───────────┬─────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │   Organization Admin    │
                    │   (Per Organization)    │
                    └───────────┬─────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │     Project Admin       │
                    │     (Per Project)       │
                    └───────────┬─────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            ▼                                       ▼
    ┌───────────────┐                       ┌───────────────┐
    │    Member     │                       │    Viewer     │
    │ (Operational) │                       │ (Read-only)   │
    └───────────────┘                       └───────────────┘
```

## Tenant Isolation — Enforced at Every Layer

| Layer | Mechanism | What It Isolates |
|-------|-----------|-----------------|
| **Identity** | Dedicated Keycloak realm per tenant | Users, roles, sessions, authentication flows |
| **Network (Ethernet)** | VRF + VLAN per tenant (Network Fabric Controller) | All Ethernet traffic between tenants |
| **Network (InfiniBand)** | InfiniBand PKey per tenant | GPU-to-GPU and GPU-to-storage traffic at IB switch hardware level |
| **Storage** | Lustre NodeMap per tenant | Lustre directory access restricted to tenant's IB IPs |
| **Compute** | Kubernetes namespaces + Slurm accounts | Workload and resource isolation |
| **Billing** | Scoped metering per tenant/project/user | Usage data and billing records |

## Authentication & Token Security

### Token Lifecycle

| Setting | Value | Purpose |
|---------|-------|---------|
| **Signing Algorithm** | RS256 | Asymmetric signing for JWT tokens |
| **Token TTL** | 5–15 minutes | Minimize exposure window |
| **Refresh Token** | Enabled | Seamless token renewal |
| **Session Management** | Admin force-logout capability | Immediate session termination |

### Supported Authentication Methods

- **OAuth2/OpenID Connect** with JWT tokens
- **MFA support**: TOTP, SMS, email, hardware keys
- **LDAP/Active Directory federation** for enterprise SSO
- **External Identity Provider** integration

### Transport Security

- **TLS 1.2+** on all communications
- **mTLS** between internal services
- **HSTS** enabled for web traffic
- **Certificate management** via Keycloak PKI

## Compliance Alignment

### NIST 800-53 Rev 5

| Control Area | Implementation |
|--------------|----------------|
| **AC — Access Control** | RBAC via Keycloak, SSO, scoped tokens, tenant realm isolation |
| **AU — Audit & Accountability** | Immutable logs, session tracking, telemetry pipeline |

### ISO/IEC 27001

| Control Area | Implementation |
|--------------|----------------|
| **A.9 Access Control** | IAM with RBAC, SSO, scoped roles per domain/project/org |
| **A.10 Cryptography** | TLS/mTLS, PKI, Keycloak certificate lifecycle management |

### HIPAA

| Control Area | Implementation |
|--------------|----------------|
| **Access Control** | IAM, RBAC, ACLs, SSO, scoped tokens per tenant |
| **Audit Controls** | Immutable logs, session playback, telemetry pipeline |

## Data Protection

### Data Storage Security

| Aspect | Implementation |
|--------|----------------|
| **Metering data** | Stored in platform-controlled PostgreSQL with no tenant write access |
| **Backup frequency** | Every 6 hours to platform object storage |
| **Metrics storage** | VictoriaMetrics with HA replication |
| **Data retention** | 12–24 months (configurable via S3 lifecycle) |
| **Data anonymization** | Sensitive data anonymized where feasible |

### S3 Lifecycle Rules

```
Standard Storage (0-30 days)
        │
        ▼
Infrequent Access (30-90 days)
        │
        ▼
Archive / Glacier (90+ days)
        │
        ▼
Deletion (12-24 months per policy)
```

## Audit & Logging

### Audit Trail

Every action in the platform generates an audit record with:

- **Correlation ID** for request tracing
- **User identity** (authenticated principal)
- **Timestamp** (UTC)
- **Action** (operation performed)
- **Resource** (target of operation)
- **Outcome** (success/failure)
- **Context** (tenant, project, organization)

### Log Protection

| Protection | Implementation |
|------------|----------------|
| **Immutability** | Append-only log storage |
| **Backup** | S3 backup every 6 hours |
| **Retention** | Configurable (12–24 months typical) |
| **Access control** | Platform admin only |

## Security Best Practices

### For Administrators

1. **Enable MFA** for all admin accounts
2. **Use short token TTLs** (15 minutes or less)
3. **Review audit logs** regularly
4. **Enforce least privilege** — assign minimum required roles
5. **Rotate credentials** according to policy

### For Users

1. **Protect API tokens** — never commit to source control
2. **Use project-scoped access** — avoid broad permissions
3. **Report suspicious activity** immediately
4. **Follow data classification** guidelines

---

**Next**: Explore [Use Cases & Target Industries](./use-cases).
