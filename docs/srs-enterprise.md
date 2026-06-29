# Software Requirements Specification — Jawla Tours OTA (Enterprise Tier)

## Document Control

| Field             | Value                                                          |
| ----------------- | -------------------------------------------------------------- |
| Document Title    | Jawla Tours OTA — SRS (Enterprise Tier)                        |
| Document ID       | JAWLA-SRS-ENT                                                  |
| Version           | 1.0                                                            |
| Issue Date        | 2026-06-29                                                     |
| Status            | Approved — Baseline                                            |
| Classification    | Confidential — Engineering / Product / Finance / Compliance    |
| Owner             | Jawla Platform Engineering                                     |
| Prepared By       | Platform Architecture Group                                    |
| Reviewed By       | CTO, COO, Head of Product, Head of Finance, QA Lead, Security Lead, DPO |
| Approved By       | CTO + COO                                                      |
| Distribution      | All engineering, Product, QA, DevOps, Security, Finance, Support, BizDev, B2B Partners |

### Revision History

| Version | Date       | Author              | Section(s)                       | Change Summary                                                                  |
| ------- | ---------- | ------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| 0.1     | 2026-03-09 | Platform Arch Group | All                              | Initial draft (extends Pro Tier)                                                |
| 0.2     | 2026-04-02 | Mobile Lead         | Mobile, Auth, Notifications      | Native iOS/Android scope; push notifications via APNs/FCM                       |
| 0.3     | 2026-04-21 | Product (B2B)       | Agent Portal, RBAC               | B2B agent portal, agency accounts, credit limits, IATA tariffs                  |
| 0.4     | 2026-05-09 | ML Lead             | Fraud ML, Pricing                | Fraud scoring model + dynamic pricing engine                                    |
| 0.5     | 2026-05-21 | Brand               | White-label, Theming             | White-label tenancy + theming pipeline                                          |
| 0.6     | 2026-06-04 | DevOps              | Architecture, Deployment         | Multi-region active-active; global anycast; CRR                                 |
| 0.7     | 2026-06-15 | Security            | Security, Compliance             | SOC 2 Type II controls; PCI scope refresh; KMS hierarchy                        |
| 0.8     | 2026-06-22 | QA Lead             | Acceptance                       | AT-047..AT-085                                                                  |
| 1.0     | 2026-06-29 | CTO + COO           | All                              | Baseline approval                                                               |

### Glossary (Enterprise additions)

| Term         | Meaning                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| Tenant       | A logically isolated brand/account (white-label customer or B2B agency)   |
| RU           | Region Unit (one homogeneous region cluster)                              |
| CRDT         | Conflict-free Replicated Data Type                                        |
| EDA          | Event-Driven Architecture                                                 |
| Saga         | Long-running transaction with compensations                               |
| KEK / DEK    | Key Encryption Key / Data Encryption Key (envelope encryption)            |
| FCM / APNs   | Firebase Cloud Messaging / Apple Push Notification service                |
| RBAC / ABAC  | Role-Based / Attribute-Based Access Control                               |
| OPA          | Open Policy Agent (policy-as-code authorization)                          |
| ML-FRAUD     | The fraud-scoring service                                                 |
| DYN-PRICE    | The dynamic-pricing engine                                                |
| TMC          | Travel Management Company (a B2B partner type)                            |
| BSP          | Bank Settlement Plan (IATA)                                               |

---

## Introduction

### Purpose

This document defines the **Enterprise Tier** software requirements for *Jawla Tours*.
The Enterprise Tier delivers a multi-region, multi-tenant, B2B+B2C platform with
native mobile apps, white-labelling, fraud machine learning, dynamic pricing, and a
queue-heavy package-deal engine. It is the contract for the third major release
(target GA Q2 2027).

The audience for this document is: all engineering, Product, QA, DevOps, Security,
DPO, Finance, BizDev/B2B partner ops, and external auditors (SOC 2 Type II, PCI DSS,
GDPR, Saudi PDPL, Egyptian DP Law).

### Scope

In scope:

- All Basic + Professional Tier functionality (assumed; new and changed only stated).
- **Multi-region active-active** (eu-central-1 + me-central-1 + ap-south-1)
  with read-local / write-aware routing.
- **Native mobile apps** (iOS + Android, React Native 0.76 + Expo), parity with web.
- **B2B Agent Portal** for TMCs and travel agencies with credit lines, mark-ups,
  itinerary builder, bulk passenger imports, BSP-CASS reporting.
- **White-label theming** — tenant-scoped branding (colors, typography, logo, domain),
  custom emails/templates, custom payment routing.
- **Fraud ML** — real-time scoring on every booking attempt + step-up enforcement.
- **Dynamic pricing engine** — markup/discount rules engine with elasticity hooks.
- **Package deals** (flight + hotel + transfer + activity) with queue-heavy
  parallelized assembly and atomic confirmation.
- **~70 REST endpoints** + gRPC internal contracts + GraphQL gateway for B2B.

### References

| Ref ID | Reference                                                                       |
| ------ | ------------------------------------------------------------------------------- |
| R-01   | JAWLA-SRS-PRO v1.0                                                              |
| R-02   | Amadeus Enterprise (Production NDC + Master Pricer)                             |
| R-03   | HotelBeds + Booking Affiliate + Expedia Rapid + Hotelston (4 providers)         |
| R-04   | Stripe + Paymob + Adyen + Tap (KSA/UAE alt MPMs)                                |
| R-05   | WhatsApp Business Cloud API, APNs (Apple), FCM (Google), Mailgun                |
| R-06   | OWASP Top 10:2021 + ASVS 4.0.3 L3 + MASVS L2 (mobile)                            |
| R-07   | SOC 2 Type II (Security, Availability, Confidentiality)                          |
| R-08   | PCI DSS v4.0 — SAQ A-EP + scoped SAQ D for payouts                              |
| R-09   | GDPR, Saudi PDPL, Egyptian DP Law 151/2020, UAE PDPL                            |
| R-10   | IATA Resolution 890; BSP Manual for Agents                                      |
| R-11   | WCAG 2.1 AA + EN 301 549; iOS/Android accessibility guidelines                   |
| R-12   | RFC 9457 (Problem Details), RFC 9421 (HTTP Message Signatures, where applicable) |

---

## Functional Requirements

> Tier-additive. Where requirements are listed without "*extends*", they are new.

### Module: Authentication & Identity (FR-001 — FR-028)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-001 | *Extends Pro FR-001..022.*                                                                                    | MUST     |
| FR-023 | The system MUST support **enterprise SSO** via SAML 2.0 and OIDC for B2B tenant users.                        | MUST     |
| FR-024 | The system MUST support **SCIM 2.0** provisioning for B2B tenants (create/update/deactivate users).           | MUST     |
| FR-025 | The system MUST support WebAuthn passkeys (FIDO2) for both customer + staff.                                  | MUST     |
| FR-026 | The system MUST support per-tenant identity provider configuration (one IdP per tenant; JIT provisioning).    | MUST     |
| FR-027 | The system MUST support mobile biometric re-auth (Face ID / Touch ID / Android BiometricPrompt).              | MUST     |
| FR-028 | The system MUST issue device-bound refresh tokens for mobile (DPoP, RFC 9449).                                | MUST     |

### Module: Flights (FR-029 — FR-046)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-029 | *Extends Pro FR-023..038.*                                                                                    | MUST     |
| FR-030 | The system MUST support NDC offers when available (Amadeus NDC-X + airline direct connects).                  | MUST     |
| FR-031 | The system MUST support FareLogix/ATPCO content if Amadeus does not surface a relevant fare.                  | SHOULD   |
| FR-032 | The system MUST support split-PNR ticketing for >9 pax via chunked PNR creation per IATA.                     | MUST     |
| FR-033 | The system MUST support corporate fares unlock for B2B accounts with airline ID.                              | MUST     |
| FR-034 | The system MUST support unused-ticket residual-value tracking per pax per carrier.                            | SHOULD   |
| FR-035 | The system MUST support exchanges (date change) end-to-end with NDC where supported.                           | MUST     |
| FR-036 | The system MUST integrate Sabre / Travelport as secondary GDS for inventory diversity (failover).             | SHOULD   |
| FR-037 | The system MUST support voluntary refund quotation per fare-rules in real time.                               | MUST     |
| FR-038 | The system MUST support involuntary schedule-change notifications and re-protect flow.                        | MUST     |
| FR-039 | The system MUST support disruption auto-rebook with customer consent within carrier policy.                   | SHOULD   |
| FR-040 | The system MUST honor IATA `OFRD` (offer-response data) standards for NDC offers.                              | MUST     |
| FR-041 | The system MUST support frequent-flyer auto-attach by carrier for stored profile.                              | MUST     |
| FR-042 | The system MUST flag visa-required pairs to user (advisory only, sourced from IATA TIM where available).     | SHOULD   |
| FR-043 | The system MUST support traveller groups (8+) routed through bulk-fares group desk queue.                    | SHOULD   |
| FR-044 | The system MUST support direct-EDI ticketing with selected carriers (e.g., EgyptAir direct).                  | MAY      |
| FR-045 | The system MUST run the **dynamic pricing engine (DYN-PRICE)** on every flight offer in real time.            | MUST     |
| FR-046 | The system MUST log every DYN-PRICE decision (input features, output adjustment, model version).             | MUST     |

### Module: Hotels (FR-047 — FR-064)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-047 | *Extends Pro FR-039..058.*                                                                                    | MUST     |
| FR-048 | The aggregator MUST fan out across **at least 4 suppliers** (Amadeus, HotelBeds, Booking Aff, Expedia Rapid). | MUST     |
| FR-049 | The aggregator MUST support negotiated rates (B2B contracted) routed through a "Direct Contracts" pseudo-supplier. | MUST     |
| FR-050 | The aggregator MUST compute and apply DYN-PRICE per supplier per offer.                                       | MUST     |
| FR-051 | The system MUST support meta-aggregation (TripAdvisor / Trivago via outbound feed) for marketing.             | SHOULD   |
| FR-052 | The aggregator MUST surface negotiated rate-codes only to authorized B2B tenants/users.                       | MUST     |
| FR-053 | The system MUST support stop-sell propagation across regions within 30 s.                                      | MUST     |
| FR-054 | The system MUST support hotel content normalization for amenities, room types, board basis (multilingual).    | MUST     |
| FR-055 | The system MUST detect duplicate hotels via canonical mapping + ML similarity model (fallback).               | MUST     |
| FR-056 | The system MUST cache hot search responses regionally with cross-region invalidation.                          | MUST     |
| FR-057 | The system MUST support hotel-room bidding for opaque inventory (B2C only, off by default).                    | MAY      |
| FR-058 | The system MUST support multi-room bookings (up to 9 rooms per booking).                                      | MUST     |
| FR-059 | The system MUST support board basis filters: RO, BB, HB, FB, AI, UAI.                                          | MUST     |
| FR-060 | The system MUST support amenity filters: pool, gym, spa, parking, family, pets, etc.                          | MUST     |
| FR-061 | The system MUST support refundable / non-refundable / partial-refundable filters.                              | MUST     |
| FR-062 | The system MUST support guest-review summaries from supplier; AI-generated multilingual summary optional.     | SHOULD   |
| FR-063 | The system MUST honor supplier overbooking guarantees and surface alternates if confirmed-failure occurs.     | MUST     |
| FR-064 | The system MUST emit hotel availability webhooks for B2B integrations (signed payload).                       | MUST     |

### Module: Packages (FR-065 — FR-076)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-065 | The system MUST allow defining a package template: flight pattern + hotel pattern + optional transfer + optional activity. | MUST |
| FR-066 | The system MUST allow ad-hoc dynamic packages: user-composed flight + hotel (+ transfer/activity) in a single cart.      | MUST |
| FR-067 | The package assembly MUST run as a parallelized BullMQ flow (flight search, hotel search, transfer search) joined by saga. | MUST |
| FR-068 | The package MUST be priced atomically with package-level discount engine (DYN-PRICE).                                   | MUST |
| FR-069 | The package MUST be booked with a single payment intent; component-level fulfillment via saga.                          | MUST |
| FR-070 | The package MUST roll back ALL components on any single component failure.                                              | MUST |
| FR-071 | The package MUST present a unified voucher PDF aggregating all components.                                              | MUST |
| FR-072 | The package MUST schedule pre-trip reminders for each component (flight, hotel check-in, transfer pickup).              | MUST |
| FR-073 | The package MUST allow saved package templates per user/tenant.                                                          | SHOULD |
| FR-074 | The package MUST support promotional bundles (e.g., "+1 free transfer when booked together") via promo rules.            | MUST |
| FR-075 | The package MUST support cross-supplier sourcing transparently to the user.                                              | MUST |
| FR-076 | The package MUST support partial cancellation per component subject to per-supplier policy.                              | MUST |

### Module: Payment (FR-077 — FR-094)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-077 | *Extends Pro FR-073..088.*                                                                                    | MUST     |
| FR-078 | The system MUST integrate **Tap Payments** for KSA/UAE alt-MPM coverage (Apple Pay, mada, KNET).             | MUST     |
| FR-079 | The system MUST support 3DS exemptions (TRA, low-value, fixed amount) per PSD2 RTS.                          | MUST     |
| FR-080 | The system MUST support B2B postpaid (credit-line) settlement with monthly invoice + statement.              | MUST     |
| FR-081 | The system MUST support multi-leg refunds (per component) with audit trail per leg.                          | MUST     |
| FR-082 | The system MUST support chargeback ingestion via PSP webhooks + ops triage queue.                            | MUST     |
| FR-083 | The system MUST integrate **ML-FRAUD** score into PSP route decision (high-risk → step-up + 3DS forced).     | MUST     |
| FR-084 | The system MUST integrate Stripe Radar / Adyen RevenueProtect rules as a secondary fraud signal.             | MUST     |
| FR-085 | The system MUST support tokenized network tokens for cards (where PSP supports) to improve auth rates.       | SHOULD   |
| FR-086 | The system MUST support payment intent split-refund (per booking-item) automatically.                         | MUST     |
| FR-087 | The system MUST support credit-note generation for B2B refunds.                                              | MUST     |
| FR-088 | The system MUST support cash booking (B2B agent collects cash from end-customer); reconciled to BSP.         | MUST     |
| FR-089 | The system MUST support BSP-CASS export per IATA settlement period.                                          | MUST     |
| FR-090 | The system MUST reconcile PSP payouts to PSP fee schedules nightly with auto-discrepancy alerts.             | MUST     |
| FR-091 | The system MUST hold weighted FX risk reports for finance daily.                                              | SHOULD   |
| FR-092 | The system MUST support refunds to alternate methods only with finance approval (4-eye).                     | MUST     |
| FR-093 | The system MUST trigger chargeback-rebuttal pack auto-assembly for ops.                                       | SHOULD   |
| FR-094 | The system MUST allow customer-driven dispute path in dashboard with attached evidence upload.                | MUST     |

### Module: Notifications (FR-095 — FR-108)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-095 | The system MUST send **push** notifications via APNs + FCM to mobile apps with topic routing.                | MUST     |
| FR-096 | The system MUST send WhatsApp via Cloud API (Pro inherited).                                                  | MUST     |
| FR-097 | The system MUST send transactional email via primary provider + automatic failover provider.                  | MUST     |
| FR-098 | The system MUST support in-app inbox (real-time SSE / WS) per user.                                          | MUST     |
| FR-099 | The system MUST allow per-tenant template overrides with HTML + locale variants.                              | MUST     |
| FR-100 | The system MUST allow channel preference per event type per user.                                            | MUST     |
| FR-101 | The system MUST detect quiet hours per user timezone and defer non-critical channels.                         | MUST     |
| FR-102 | The system MUST throttle marketing notifications separately from transactional.                              | MUST     |
| FR-103 | The system MUST track engagement (open, click, ack) and store per notification.                              | MUST     |
| FR-104 | The system MUST support broadcast notifications (admin-only) with audience filters.                          | SHOULD   |
| FR-105 | The system MUST support segmented promo notifications keyed off cohort tags.                                  | MUST     |
| FR-106 | The system MUST gracefully degrade if any single provider fails (multi-provider failover).                    | MUST     |
| FR-107 | The system MUST localize push payloads using device locale; fallback EN.                                      | MUST     |
| FR-108 | The system MUST honor unsubscribe headers / List-Unsubscribe-Post in transactional + marketing emails.       | MUST     |

### Module: Admin & Operations (FR-109 — FR-126)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-109 | *Extends Pro FR-101..114.*                                                                                    | MUST     |
| FR-110 | The admin MUST provide tenant-management console for white-label tenants.                                    | MUST     |
| FR-111 | The admin MUST provide DYN-PRICE rule console (priority, conditions, markup/discount, effective dates).      | MUST     |
| FR-112 | The admin MUST provide ML-FRAUD model console (feature importance, score distribution, threshold tuning).    | MUST     |
| FR-113 | The admin MUST provide region health dashboard (per region: error rate, replication lag, edge latency).      | MUST     |
| FR-114 | The admin MUST provide queue dashboards (BullMQ per-queue depth, oldest job, failure rate).                   | MUST     |
| FR-115 | The admin MUST provide a chargeback workbench with evidence upload + auto-rebuttal.                          | MUST     |
| FR-116 | The admin MUST provide a dispute workbench for customer disputes (separate from chargebacks).                | MUST     |
| FR-117 | The admin MUST provide schedule-change console with mass re-protect actions.                                 | MUST     |
| FR-118 | The admin MUST provide BSP-CASS reporting console.                                                            | MUST     |
| FR-119 | The admin MUST provide a content-CMS with per-tenant overrides.                                              | MUST     |
| FR-120 | The admin MUST provide promo-rule engine console with simulator (A/B against history).                        | MUST     |
| FR-121 | The admin MUST provide an audit search across all audit events (full-text + faceted).                         | MUST     |
| FR-122 | The admin MUST provide a data-subject-request console (export, delete, restrict).                            | MUST     |
| FR-123 | The admin MUST provide an incident-response console linking Sentry / PagerDuty / runbooks.                   | MUST     |
| FR-124 | The admin MUST provide release management console with feature-flag rollout per tenant + region.             | MUST     |
| FR-125 | The admin MUST support agent-portal management for B2B tenants (users, credit, mark-up).                     | MUST     |
| FR-126 | The admin MUST support contracted-rate ingestion for direct-contract hotels.                                  | MUST     |

### Module: B2B Agent Portal (FR-127 — FR-140)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-127 | The agent portal MUST allow agency admin to invite agents (SCIM + manual).                                   | MUST     |
| FR-128 | The agent portal MUST allow searching, quoting, and booking flights/hotels/packages on behalf of customers.   | MUST     |
| FR-129 | The agent portal MUST allow per-agency credit limit with utilization + payment terms.                        | MUST     |
| FR-130 | The agent portal MUST allow per-agency mark-up rules (flat / percentage / tiered) appliable per offer.       | MUST     |
| FR-131 | The agent portal MUST support quote generation with PDF, link sharing, and conversion to booking.            | MUST     |
| FR-132 | The agent portal MUST support bulk passenger import (CSV/XLSX) with validation.                              | MUST     |
| FR-133 | The agent portal MUST support per-agent commission tracking with monthly statements.                         | MUST     |
| FR-134 | The agent portal MUST support multi-passenger group bookings up to 50 pax.                                   | MUST     |
| FR-135 | The agent portal MUST support corporate-fare unlock via airline ID per booking.                              | MUST     |
| FR-136 | The agent portal MUST allow customer profile management per agency (PII isolated per tenant).                | MUST     |
| FR-137 | The agent portal MUST provide BSP/CASS reporting + IATA standard exports.                                    | MUST     |
| FR-138 | The agent portal MUST allow "split-pay" — agent pays via credit, customer adds card top-up.                  | SHOULD   |
| FR-139 | The agent portal MUST expose a GraphQL API for agency mid-office integrations.                               | MUST     |
| FR-140 | The agent portal MUST enforce data segregation: agency A cannot see agency B's customers/bookings.           | MUST     |

### Module: White-Label & Tenancy (FR-141 — FR-150)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-141 | The system MUST support tenant-scoped branding: logo, color tokens, font, favicon, custom domain.            | MUST     |
| FR-142 | The system MUST allow per-tenant override of legal pages (T&C, privacy, refund policy).                       | MUST     |
| FR-143 | The system MUST allow per-tenant payment routing (PSP + merchant account).                                   | MUST     |
| FR-144 | The system MUST allow per-tenant email "from" identity + DKIM/DMARC per tenant domain.                       | MUST     |
| FR-145 | The system MUST allow per-tenant pricing/markup config (independent of agency markup).                       | MUST     |
| FR-146 | The system MUST allow per-tenant feature-flag overrides.                                                      | MUST     |
| FR-147 | The system MUST provide a theming pipeline: token JSON → generated CSS variables + Tailwind theme.            | MUST     |
| FR-148 | The system MUST support tenant-specific subdomains AND custom apex domains (DNS + TLS auto-managed).         | MUST     |
| FR-149 | The system MUST isolate tenant data via row-level security in Postgres (tenant_id on every table).           | MUST     |
| FR-150 | The system MUST support per-tenant currency defaults and supported markets.                                  | MUST     |

### Module: Fraud ML (FR-151 — FR-160)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-151 | ML-FRAUD MUST score every booking attempt in real time (p95 < 80 ms).                                        | MUST     |
| FR-152 | ML-FRAUD MUST emit a score 0–100 plus reason codes (e.g., `VELOCITY`, `GEO_MISMATCH`, `BIN_AAVS_FAIL`).      | MUST     |
| FR-153 | ML-FRAUD MUST cause: < 30 → frictionless; 30–70 → step-up MFA + force 3DS; > 70 → block + ops review.        | MUST     |
| FR-154 | ML-FRAUD MUST persist score + features + decision per booking for explainability.                            | MUST     |
| FR-155 | ML-FRAUD MUST support shadow mode (predict but do not enforce) per cohort for A/B.                           | MUST     |
| FR-156 | ML-FRAUD MUST allow rule-based overrides (allow-list per email/IP/BIN) maintained by ops.                    | MUST     |
| FR-157 | ML-FRAUD MUST be retrained monthly with labelled chargeback outcomes (offline pipeline).                    | MUST     |
| FR-158 | ML-FRAUD MUST drift-monitor PSI on key features; alert on PSI > 0.2.                                         | MUST     |
| FR-159 | ML-FRAUD MUST version models (semver) and allow rollback via flag.                                          | MUST     |
| FR-160 | ML-FRAUD MUST be SOC-auditable; decisions surfaced in admin and support tools.                              | MUST     |

### Module: Dynamic Pricing (FR-161 — FR-170)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-161 | DYN-PRICE MUST apply rules in priority order: tenant override → market → channel → cohort.                   | MUST     |
| FR-162 | DYN-PRICE MUST support markups (positive) and discounts (negative) with cap rules per supplier.              | MUST     |
| FR-163 | DYN-PRICE MUST support elasticity hooks (A/B over conversion uplift); decision logged.                       | MUST     |
| FR-164 | DYN-PRICE MUST allow scheduled rules (e.g., "Black Friday + 10% off intl flights").                         | MUST     |
| FR-165 | DYN-PRICE MUST respect supplier-contract floor prices (no selling below).                                    | MUST     |
| FR-166 | DYN-PRICE MUST display final price only (no markup leakage); audit retained.                                  | MUST     |
| FR-167 | DYN-PRICE MUST support promo-code resolution (per code: discount, eligibility, single-use, expiry).         | MUST     |
| FR-168 | DYN-PRICE MUST simulate rule impact against last 30 days of bookings before activation.                     | MUST     |
| FR-169 | DYN-PRICE MUST emit pricing decision events to BI for performance reporting.                                | MUST     |
| FR-170 | DYN-PRICE MUST allow per-tenant override (white-label) without cross-tenant impact.                          | MUST     |

### Module: Mobile Apps (FR-171 — FR-180)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-171 | Mobile apps MUST achieve feature parity for: search, book, pay, manage trips, profile, MFA.                  | MUST     |
| FR-172 | Mobile apps MUST support biometric re-auth (Face ID / Touch ID / BiometricPrompt).                            | MUST     |
| FR-173 | Mobile apps MUST support push notifications + deep links (universal links / app links).                       | MUST     |
| FR-174 | Mobile apps MUST support offline view of upcoming bookings (cached securely).                                | MUST     |
| FR-175 | Mobile apps MUST integrate Apple Pay (iOS) and Google Pay (Android) natively.                                | MUST     |
| FR-176 | Mobile apps MUST integrate Wallet (PassKit / Google Wallet) for boarding-pass + voucher.                     | SHOULD   |
| FR-177 | Mobile apps MUST support biometric step-up for refunds + payment-method ops.                                 | MUST     |
| FR-178 | Mobile apps MUST support deep-link to schedule-change re-protect actions.                                    | MUST     |
| FR-179 | Mobile apps MUST be released via OTA (EAS Update) for non-native bug fixes.                                  | MUST     |
| FR-180 | Mobile apps MUST be MASVS L2 compliant (no secrets in binary, TLS pinning, jailbreak detection).             | MUST     |

---

## Non-functional Requirements

### Performance

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-001 | Flight search p95 ≤ 1.8 s region-local (cache-cold), ≤ 500 ms cache-hot.                     |
| NFR-002 | Hotel aggregated search p95 ≤ 2.2 s (4-supplier fanout, 1.5 s per supplier budget).          |
| NFR-003 | Non-supplier-bound API p95 ≤ 150 ms.                                                          |
| NFR-004 | Mobile cold-start to home screen ≤ 1.8 s p95 on iPhone 12 / Pixel 6.                          |
| NFR-005 | ML-FRAUD score p95 ≤ 80 ms; p99 ≤ 150 ms.                                                     |
| NFR-006 | DYN-PRICE rule evaluation p95 ≤ 10 ms per offer.                                              |
| NFR-007 | Webhook ingestion p95 ≤ 100 ms ack.                                                           |
| NFR-008 | LCP ≤ 1.6 s, INP ≤ 150 ms, CLS ≤ 0.05.                                                        |

### Scalability

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-009 | Booking funnel sustains 800 RPS; peak 2000 RPS for 15 min.                                    |
| NFR-010 | Catalog/search sustains 5000 RPS.                                                              |
| NFR-011 | BullMQ workers MUST scale to 40 replicas; packages queue auto-scales independently.            |
| NFR-012 | Postgres MUST run a primary + 2 sync replicas + 2 async read replicas per region.              |
| NFR-013 | Mobile apps MUST handle 500K MAU concurrent push without backpressure.                        |

### Availability

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-014 | Target monthly uptime 99.95% (≤ 21.6 min downtime).                                            |
| NFR-015 | RPO ≤ 1 min (cross-region async replication), RTO ≤ 15 min for full region loss.              |
| NFR-016 | Multi-region active-active with anycast DNS + region-aware routing (latency).                  |
| NFR-017 | Auto-failover on region health degradation (composite health check failing 3× in 60 s).        |
| NFR-018 | Read-after-write consistency within region; eventual cross-region (≤ 5 s for reads).           |
| NFR-019 | Zero-downtime deploys via blue/green; mobile OTA channel for FE-only rollback.                  |

### Security

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-020 | TLS 1.3 preferred; HSTS preload; OCSP stapling; PFS-only cipher suites.                       |
| NFR-021 | Data at rest AES-256 with KMS-rooted KEK; per-tenant DEK rotation monthly.                    |
| NFR-022 | Secrets in Vault (B2B-grade); short-lived dynamic credentials for DB access.                   |
| NFR-023 | SOC 2 Type II — Security, Availability, Confidentiality — annual audit.                       |
| NFR-024 | PCI DSS v4.0 — SAQ A-EP for B2C; scoped SAQ D-SP for payouts to suppliers.                    |
| NFR-025 | Quarterly external pentest; monthly internal; OPA policy gates in CI.                          |
| NFR-026 | Mobile MASVS L2; certificate pinning; secure storage of refresh tokens (Keychain/Keystore).   |

### Compliance & Privacy

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-027 | GDPR, Saudi PDPL, Egyptian DP Law 151/2020, UAE PDPL all honored with regional data residency. |
| NFR-028 | DSR (export/delete/restrict) SLA: 30 days; tracked in admin.                                  |
| NFR-029 | Data residency: KSA bookings stored in me-central-1; EU stored in eu-central-1; default eu.   |
| NFR-030 | Right-to-be-forgotten honored within 30 d unless legal-hold flag set.                         |
| NFR-031 | Cookie consent per region with granular controls; consent ledger.                              |

### I18N / A11Y

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-032 | AR (RTL), EN, FR, ES — full support including emails, PDFs, mobile.                          |
| NFR-033 | WCAG 2.1 AA + mobile platform accessibility (VoiceOver, TalkBack).                            |
| NFR-034 | All money displayed with explicit ISO 4217 codes; locale-aware grouping/decimal separators.   |
| NFR-035 | Locale-specific date/time formatting via ICU.                                                  |

---

## System Architecture

```
                                          GLOBAL ANYCAST / LATENCY-BASED ROUTING
                                                       │
              ┌────────────────────────────────────────┼────────────────────────────────────────┐
              │                                        │                                        │
        ┌─────▼──────┐                          ┌─────▼──────┐                            ┌─────▼──────┐
        │  Region 1  │                          │  Region 2  │                            │  Region 3  │
        │  eu-central│                          │ me-central │                            │  ap-south  │
        └─────┬──────┘                          └─────┬──────┘                            └─────┬──────┘
              │                                        │                                        │
        ┌─────▼──────────────────────────────────────────────────────────────────────────────────▼─────┐
        │                              SHARED CONTROL PLANE (multi-region)                              │
        │  • Identity (Auth0 / Cognito federated)   • Config Service     • Feature Flags                │
        │  • Audit Log (write to local + replicate to central)           • Vault                        │
        └────────────────────────────────────────────────────────────────────────────────────────────────┘

   ┌───────────────────────────────── Per-Region Stack (Region 1 expanded) ─────────────────────────────────┐
   │                                                                                                       │
   │ Mobile (iOS/Android RN)                 Web (Next.js 15)                  B2B Portal (Next.js, RBAC)  │
   │      │                                       │                                    │                  │
   │      ▼                                       ▼                                    ▼                  │
   │  ┌─────────────────────────────── API Gateway (per region) ──────────────────────────────┐           │
   │  │ Cloudflare WAF → Cloudflare Workers (edge auth / smart cache) → ALB → NestJS Gateway   │           │
   │  └────────────────────────────────────────┬────────────────────────────────────────────────┘           │
   │                                            │                                                          │
   │  ┌────────────────────────┬─────────────────────────────┬─────────────────────────┐                  │
   │  ▼                        ▼                             ▼                         ▼                  │
   │ Flight Svc            Hotel Aggregator              Booking Svc                Payment Svc            │
   │ (Amadeus,            (Amadeus, HotelBeds,           (saga engine,             (PSP router,            │
   │  Sabre/Travelport,    Booking, Expedia,              package builder,         FX engine,              │
   │  NDC)                 Hotelston)                     atomic ops)              Fraud-ML hook,          │
   │                                                                                Tap/Stripe/Adyen/      │
   │                                                                                Paymob)                │
   │     │                       │                              │                           │              │
   │     └───────────┬───────────┴──────────────────────────────┴───────────────────────────┘              │
   │                 ▼                                                                                     │
   │           Identity Svc ─ Auth ─ MFA ─ WebAuthn ─ SAML/OIDC ─ SCIM                                     │
   │                                                                                                       │
   │  ┌────────────────────────────┬────────────────────────────┬────────────────────────────┐            │
   │  ▼                            ▼                            ▼                            ▼            │
   │ Notifications Svc        ML-FRAUD Svc (Python)        DYN-PRICE Svc            CMS / Theming Svc      │
   │ (push, email,             (FastAPI + xgboost/                                                          │
   │  WA, SSE)                  isolation-forest)                                                            │
   │                                                                                                       │
   │  Data plane (per region):                                                                              │
   │   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                            │
   │   │ Postgres 16  │   │ Redis 7      │   │ S3 / R2      │   │ ClickHouse   │                            │
   │   │ primary +    │   │ cluster      │   │ vouchers/    │   │ analytics +  │                            │
   │   │ 2 sync       │   │ + BullMQ     │   │ invoices     │   │ ML features  │                            │
   │   │ + 2 async    │   │              │   │              │   │              │                            │
   │   └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘                            │
   │                                                                                                       │
   │  Async backbone (per region): NATS JetStream + cross-region mirroring for `domain.events`             │
   └───────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Multi-Region Strategy

- DNS via Cloudflare; latency-based routing pinned to the user's nearest healthy region.
- Writes go to the local region's primary; cross-region eventual replication (logical
  replication, < 5 s typical).
- Read-after-write within region (sticky session header `X-Jawla-Region`).
- Bookings + payments routed to "source-region" sticky for the duration of a saga.
- Tenants tagged with a **home region** for compliance (data residency).

### Internal Communication

- North-south: REST + GraphQL (for B2B agent portal).
- East-west: gRPC + NATS JetStream (events).
- Service mesh: Linkerd (mTLS).

---

## Database Design

PostgreSQL 16 with row-level security and per-region sharding. Each table includes
`tenant_id UUID NOT NULL`; default RLS policy `USING (tenant_id = current_setting('app.tenant_id')::uuid)`.

### Enterprise tables (delta over Pro)

| Table                  | Purpose                                                                       |
| ---------------------- | ----------------------------------------------------------------------------- |
| `tenants`              | Tenant registry (white-label + B2B)                                            |
| `tenant_branding`      | Theme tokens, logos, fonts                                                     |
| `tenant_legal`         | Legal pages overrides                                                          |
| `tenant_psp_routes`    | Tenant-specific PSP routing                                                    |
| `tenant_markups`       | Tenant DYN-PRICE markup rules                                                  |
| `agencies`             | B2B agency profile (legal name, IATA, BSP)                                     |
| `agency_users`         | Agents within an agency                                                        |
| `agency_credit`        | Credit limits + utilization + statements                                       |
| `agency_markups`       | Agency-level markup config                                                     |
| `quotes`               | Saved quotes per agent / customer                                              |
| `packages`             | Saved package templates                                                        |
| `package_components`   | Components per package                                                         |
| `dynpricing_rules`     | DYN-PRICE rule engine rules                                                    |
| `dynpricing_logs`      | Decisions logged                                                               |
| `mlfraud_scores`       | Per-booking fraud scores + features                                            |
| `chargebacks`          | Chargeback ledger                                                              |
| `disputes`             | Customer-initiated disputes                                                    |
| `schedule_changes`     | Carrier schedule-change events + re-protect actions                            |
| `data_subject_requests`| GDPR/PDPL DSR tickets                                                          |
| `device_tokens`        | APNs/FCM tokens per user/device                                                |
| `push_messages`        | Push log + delivery state                                                      |
| `webhooks_outbound`    | Outbound webhook registrations + delivery retries (for B2B)                    |
| `feature_flags`        | Flags per env / per tenant / per cohort                                        |
| `bsp_reports`          | IATA BSP-CASS export ledger                                                    |
| `direct_contracts`     | Negotiated hotel contracts                                                     |

### DDL Excerpts

```sql
CREATE TABLE tenants (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  legal_name   TEXT NOT NULL,
  home_region  TEXT NOT NULL CHECK (home_region IN ('eu-central-1','me-central-1','ap-south-1')),
  status       TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','SUSPENDED','ARCHIVED')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tenant_branding (
  tenant_id    UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  tokens_json  JSONB NOT NULL,
  logo_url     TEXT,
  favicon_url  TEXT,
  font_family  TEXT,
  domains      TEXT[] NOT NULL DEFAULT '{}',
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agencies (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id),
  legal_name   TEXT NOT NULL,
  iata_number  TEXT,
  bsp_country  CHAR(2),
  status       TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON agencies (tenant_id);

CREATE TABLE agency_users (
  user_id      UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  agency_id    UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  role         TEXT NOT NULL CHECK (role IN ('agency_admin','agent','viewer','finance')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agency_credit (
  agency_id        UUID PRIMARY KEY REFERENCES agencies(id) ON DELETE CASCADE,
  currency         CHAR(3) NOT NULL,
  limit_minor      BIGINT NOT NULL,
  utilized_minor   BIGINT NOT NULL DEFAULT 0,
  payment_terms    TEXT NOT NULL DEFAULT 'NET30',
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE quotes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id     UUID REFERENCES agencies(id),
  agent_user_id UUID REFERENCES users(id),
  customer_email CITEXT,
  payload       JSONB NOT NULL,
  total_minor   BIGINT NOT NULL,
  currency      CHAR(3) NOT NULL,
  status        TEXT NOT NULL CHECK (status IN ('OPEN','EXPIRED','CONVERTED','VOID')),
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE packages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id),
  type          TEXT NOT NULL CHECK (type IN ('TEMPLATE','DYNAMIC')),
  config        JSONB NOT NULL,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE package_components (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id    UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL CHECK (component_type IN ('FLIGHT','HOTEL','TRANSFER','ACTIVITY')),
  config        JSONB NOT NULL,
  required      BOOLEAN NOT NULL DEFAULT TRUE,
  seq           INT NOT NULL
);

CREATE TABLE dynpricing_rules (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID REFERENCES tenants(id),
  priority      INT NOT NULL,
  name          TEXT NOT NULL,
  conditions    JSONB NOT NULL,
  action        JSONB NOT NULL,  -- {type: 'markup', value: 5.0, mode: 'pct', cap: 200}
  effective_from TIMESTAMPTZ NOT NULL,
  effective_to   TIMESTAMPTZ,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE mlfraud_scores (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id     UUID NOT NULL REFERENCES bookings(id),
  model_version  TEXT NOT NULL,
  score          NUMERIC(5,2) NOT NULL,
  decision       TEXT NOT NULL CHECK (decision IN ('ALLOW','CHALLENGE','BLOCK','SHADOW')),
  reason_codes   TEXT[] NOT NULL DEFAULT '{}',
  features       JSONB NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE chargebacks (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id     UUID NOT NULL REFERENCES payments(id),
  psp            TEXT NOT NULL,
  case_id        TEXT NOT NULL,
  reason_code    TEXT,
  amount_minor   BIGINT NOT NULL,
  currency       CHAR(3) NOT NULL,
  due_date       DATE,
  status         TEXT NOT NULL CHECK (status IN ('OPEN','EVIDENCE_REQUIRED','SUBMITTED','WON','LOST','EXPIRED')),
  evidence_url   TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE schedule_changes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id     UUID NOT NULL REFERENCES bookings(id),
  change_type    TEXT NOT NULL CHECK (change_type IN ('SCHEDULE','CANCEL','EQUIPMENT')),
  detected_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  new_payload    JSONB,
  customer_action TEXT CHECK (customer_action IN ('PENDING','ACCEPT','REJECT','REPROTECT')),
  resolved_at    TIMESTAMPTZ
);

CREATE TABLE data_subject_requests (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users(id),
  kind           TEXT NOT NULL CHECK (kind IN ('EXPORT','DELETE','RESTRICT','PORTABILITY')),
  status         TEXT NOT NULL CHECK (status IN ('OPEN','IN_PROGRESS','COMPLETED','REJECTED')),
  due_at         TIMESTAMPTZ NOT NULL,
  legal_hold     BOOLEAN NOT NULL DEFAULT FALSE,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE device_tokens (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform     TEXT NOT NULL CHECK (platform IN ('ios','android','web-push')),
  token        TEXT NOT NULL,
  app_version  TEXT,
  device_model TEXT,
  last_seen    TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (platform, token)
);

CREATE TABLE webhooks_outbound (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id),
  url            TEXT NOT NULL,
  secret         BYTEA NOT NULL,
  events         TEXT[] NOT NULL,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  failure_count  INT NOT NULL DEFAULT 0,
  last_status    INT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE feature_flags (
  key            TEXT NOT NULL,
  tenant_id      UUID,
  env            TEXT NOT NULL,
  enabled        BOOLEAN NOT NULL,
  rollout_pct    SMALLINT,
  cohort         JSONB,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (key, COALESCE(tenant_id, '00000000-0000-0000-0000-000000000000'::uuid), env)
);

CREATE TABLE bsp_reports (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id      UUID NOT NULL REFERENCES agencies(id),
  period_start   DATE NOT NULL,
  period_end     DATE NOT NULL,
  total_minor    BIGINT NOT NULL,
  currency       CHAR(3) NOT NULL,
  pdf_url        TEXT,
  csv_url        TEXT,
  status         TEXT NOT NULL CHECK (status IN ('DRAFT','SUBMITTED','SETTLED'))
);
```

### Indexes

- All `tenant_id` columns indexed; multi-column indexes for tenant-scoped hot queries.
- `bookings(tenant_id, status, created_at DESC)` for tenant timelines.
- GIN on JSONB columns for ad-hoc filtering.
- BRIN indexes for time-series tables (`audit_events`, `dynpricing_logs`,
  `mlfraud_scores`).

---

## API Design

70 endpoints. Inherits Pro tier endpoints. Auth via JWT or per-tenant API key
(B2B). All endpoints multi-tenant by header `X-Jawla-Tenant: <slug>` (resolved at
gateway).

| #  | METHOD | PATH                                             | Auth        | Status   |
| -- | ------ | ------------------------------------------------ | ----------- | -------- |
| 1  | POST   | `/auth/register`                                 | none        | 201/4xx  |
| 2  | POST   | `/auth/login`                                    | none        | 200/4xx  |
| 3  | POST   | `/auth/refresh`                                  | refresh     | 200/401  |
| 4  | POST   | `/auth/logout`                                   | bearer      | 204      |
| 5  | POST   | `/auth/mfa/totp/enroll`                          | bearer      | 200      |
| 6  | POST   | `/auth/mfa/totp/verify`                          | bearer      | 200      |
| 7  | POST   | `/auth/mfa/webauthn/register`                    | bearer      | 200      |
| 8  | POST   | `/auth/mfa/webauthn/verify`                      | bearer      | 200      |
| 9  | POST   | `/auth/oauth/google`                             | none        | 200      |
| 10 | POST   | `/auth/oauth/apple`                              | none        | 200      |
| 11 | POST   | `/auth/saml/{tenant}/sso`                        | none        | 302      |
| 12 | POST   | `/auth/saml/{tenant}/acs`                        | none        | 200      |
| 13 | POST   | `/auth/oidc/{tenant}/sso`                        | none        | 302      |
| 14 | GET    | `/auth/sessions`                                 | bearer      | 200      |
| 15 | DELETE | `/auth/sessions/{id}`                            | bearer      | 204      |
| 16 | GET    | `/auth/me`                                       | bearer      | 200      |
| 17 | PATCH  | `/auth/me`                                       | bearer      | 200      |
| 18 | POST   | `/auth/dpop/nonce`                               | bearer      | 200      |
| 19 | GET    | `/catalog/airports?q=`                           | none        | 200      |
| 20 | GET    | `/catalog/cities?q=`                             | none        | 200      |
| 21 | GET    | `/catalog/currencies`                            | none        | 200      |
| 22 | GET    | `/catalog/fx-rate?base&quote`                    | none        | 200      |
| 23 | POST   | `/flights/search`                                | optional    | 200      |
| 24 | POST   | `/flights/price-check`                           | bearer      | 200      |
| 25 | POST   | `/flights/ancillaries`                           | bearer      | 200      |
| 26 | POST   | `/flights/exchange`                              | bearer      | 200      |
| 27 | POST   | `/flights/seat-map`                              | bearer      | 200      |
| 28 | POST   | `/flights/refund-quote`                          | bearer      | 200      |
| 29 | POST   | `/hotels/search`                                 | optional    | 200      |
| 30 | GET    | `/hotels/{hotelId}/rooms`                        | optional    | 200      |
| 31 | POST   | `/hotels/offer/confirm`                          | bearer      | 200      |
| 32 | POST   | `/packages/search`                               | bearer      | 200      |
| 33 | POST   | `/packages/build`                                | bearer      | 200      |
| 34 | POST   | `/transfers/search`                              | bearer      | 200      |
| 35 | POST   | `/activities/search`                             | bearer      | 200      |
| 36 | POST   | `/carts`                                         | bearer      | 201      |
| 37 | POST   | `/carts/{id}/items`                              | bearer      | 200      |
| 38 | DELETE | `/carts/{id}/items/{itemId}`                     | bearer      | 200      |
| 39 | POST   | `/carts/{id}/promo-code`                         | bearer      | 200      |
| 40 | POST   | `/carts/{id}/checkout`                           | bearer      | 201      |
| 41 | GET    | `/bookings/{id}`                                 | bearer      | 200      |
| 42 | GET    | `/bookings`                                      | bearer      | 200      |
| 43 | POST   | `/bookings/{id}/cancel`                          | bearer+OTP  | 200      |
| 44 | POST   | `/bookings/{id}/change`                          | bearer      | 200      |
| 45 | POST   | `/bookings/{id}/reprotect`                       | bearer      | 200      |
| 46 | GET    | `/bookings/{id}/invoice`                         | bearer      | 200      |
| 47 | POST   | `/bookings/{id}/dispute`                         | bearer      | 201      |
| 48 | POST   | `/payments/intents`                              | bearer      | 201      |
| 49 | POST   | `/payments/refunds`                              | admin+OTP   | 201      |
| 50 | POST   | `/payments/methods`                              | bearer      | 201      |
| 51 | DELETE | `/payments/methods/{id}`                         | bearer      | 204      |
| 52 | POST   | `/webhooks/psp/{psp}`                            | sig         | 200      |
| 53 | POST   | `/webhooks/whatsapp`                             | sig         | 200      |
| 54 | POST   | `/notifications/preferences`                     | bearer      | 200      |
| 55 | GET    | `/notifications/inbox`                           | bearer      | 200      |
| 56 | POST   | `/notifications/devices`                         | bearer      | 201      |
| 57 | DELETE | `/notifications/devices/{id}`                    | bearer      | 204      |
| 58 | POST   | `/agencies`                                      | admin       | 201      |
| 59 | GET    | `/agencies/{id}`                                 | agency_admin| 200      |
| 60 | POST   | `/agencies/{id}/users`                           | agency_admin| 201      |
| 61 | GET    | `/agencies/{id}/credit`                          | agency_admin| 200      |
| 62 | POST   | `/agencies/{id}/quotes`                          | agent       | 201      |
| 63 | POST   | `/agencies/{id}/bookings`                        | agent       | 201      |
| 64 | GET    | `/agencies/{id}/bsp-report?period=`              | finance     | 200      |
| 65 | POST   | `/admin/tenants`                                 | admin       | 201      |
| 66 | PATCH  | `/admin/tenants/{id}/branding`                   | admin       | 200      |
| 67 | POST   | `/admin/dynpricing/rules`                        | admin       | 201      |
| 68 | POST   | `/admin/dynpricing/simulate`                     | admin       | 200      |
| 69 | POST   | `/admin/fraud/overrides`                         | ops         | 201      |
| 70 | POST   | `/admin/feature-flags`                           | admin       | 200      |

### Outbound Webhooks (B2B)

`POST {tenant.webhook_url}` signed with HMAC-SHA256 over body + timestamp using
tenant-specific secret. Events:

- `booking.created`, `booking.confirmed`, `booking.cancelled`, `booking.refunded`,
  `payment.refunded`, `payment.chargeback`, `schedule.change.detected`,
  `supplier.health.degraded`.

Delivery: at-least-once with exponential backoff (1s, 8s, 64s, 5m, 30m, 2h, 12h);
max 7 attempts, then dead-letter.

---

## Authentication & Authorization

### Token Model

- Access JWT 10 min, refresh 30 d (rotated, family-aware). Mobile uses DPoP-bound
  refresh tokens.
- New claims: `tenant_id`, `agency_id?`, `mfa: bool`, `step_up_until: <epoch>`,
  `region`, `risk: 0..100`.
- Refresh tokens stored hashed; rotation revokes prior; reuse → entire family
  invalidated.

### Identity Providers

- B2C: email/password, Google, Apple, WebAuthn passkey.
- B2B: SAML 2.0 + OIDC per tenant; SCIM 2.0 user lifecycle; mandatory MFA for
  finance/admin roles.
- Mobile: device-bound refresh with WebAuthn or biometric re-auth.

### Authorization Model

- **RBAC** for role coarse-grain + **ABAC via OPA** for fine-grain decisions
  (tenant scope, agency scope, region scope).
- OPA policy bundles signed; loaded at startup; hot-reload on bundle update.
- Sample policy:

```rego
package jawla.authz

default allow = false

allow {
  input.action == "booking:read"
  input.subject.tenant_id == input.resource.tenant_id
  some role
  role := input.subject.roles[_]
  role_can_read_booking[role]
}

role_can_read_booking["customer"] {
  input.subject.user_id == input.resource.user_id
}
role_can_read_booking["agency_admin"] {
  input.subject.agency_id == input.resource.agency_id
}
role_can_read_booking["admin"]
role_can_read_booking["support"]
```

### MFA

- TOTP (RFC 6238), WebAuthn (FIDO2), backup codes.
- Step-up required for: refunds, payment-method ops, MFA disable, role assignment,
  white-label theming changes.

---

## Security

### OWASP / ASVS L3 Mitigations (delta)

| Area                         | Control                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| Authentication               | WebAuthn, DPoP, refresh families, anomaly detection (impossible travel)                                  |
| Authorization                | OPA policy bundles, RLS in Postgres, deny-by-default                                                     |
| Cryptography                 | KMS hierarchy, monthly DEK rotation, AES-256-GCM with AAD, RSA-OAEP for envelope                         |
| Input Validation             | Zod everywhere; gateway-level schema enforcement; JSON-Schema for outbound webhooks                      |
| Logging/Monitoring           | SIEM (Vector → Sumo/ELK), centralized audit; access reviewed quarterly                                   |
| Mobile                       | MASVS L2; cert pinning; jailbreak/root detection (informational); secure storage                        |
| SSRF / Egress                | Egress gateway with allow-list, DNS pinning, signed-URL requirements for vendor pulls                    |
| Supply Chain                 | Cosign signed images, SBOMs (CycloneDX), Snyk in CI, GitHub branch protection                            |
| Insider                      | Just-in-time DB credentials via Vault; PAM (Teleport) for prod shell; session recording                   |

### Encryption

- KMS hierarchy: AWS KMS root → per-region KEK → per-tenant DEK → per-record DEK.
- Field-level encryption (AES-256-GCM) for: travel-doc numbers, B2B credit-card BIN
  details, customer addresses, agent commission rates.
- Object storage SSE-KMS; lifecycle to Glacier Deep Archive after 1 y.

### PCI DSS

- SAQ A-EP for B2C (PSP-hosted fields).
- SAQ D-SP scope for supplier payouts (because we instruct funds movement); annual
  on-site audit + quarterly ASV scan; segmentation tested annually.

### Compliance Programs

- SOC 2 Type II — Security, Availability, Confidentiality. Controls catalog in
  Vanta/Drata; annual audit.
- GDPR DPIA per new processing activity; DPO sign-off; record-of-processing.
- Tenant-specific DPAs available; sub-processor list public.

### Rate Limiting

- Edge (Cloudflare): DDoS + bot fight.
- App (NestJS): token-bucket per (route, principal) — principal can be user, agency,
  tenant, or IP.
- Adaptive: ML-FRAUD high score → tighter limits.

### Secrets

- HashiCorp Vault (HA cluster, auto-unseal via KMS).
- Dynamic credentials for Postgres (15 min TTL) per service.
- Static secrets (3rd-party API keys) rotated quarterly with runbooks.

---

## Booking Workflow

### Saga (Enterprise, package-aware)

```
            cart.checkout
                │
                ▼
       DRAFT_BOOKING ──▶ (ML-FRAUD pre-screen) ──blocked──▶ FAILED (fraud)
                │                                   │
                │                                   challenge → step-up MFA
                ▼
        PENDING_PAYMENT
                │
                │  payment_intent.succeeded webhook
                ▼
         SAGA RUNNING
                │
                │  per-component step graph (parallelized for packages)
                │  ┌──────────────────────┬──────────────────────┬──────────────────────┐
                ▼  ▼                      ▼                      ▼                      ▼
         FLIGHT.book         HOTEL.book           TRANSFER.book          ACTIVITY.book
                │                      │                      │                      │
                └──────────────────────┴──────────────────────┴──────────────────────┘
                                            │
                                            ▼
                                       all_ok? ────no──▶ COMPENSATE (cancel all confirmed components, void payment)
                                            │ yes                          │
                                            ▼                              ▼
                                  PAYMENT_CAPTURE                    FAILED (compensated)
                                            │
                                            ▼
                                  INVOICE + NOTIFY (multi-channel)
                                            │
                                            ▼
                                       CONFIRMED
```

### Compensation Rules

- For each confirmed supplier action, a typed compensator exists (cancel PNR,
  cancel hotel booking, cancel transfer, cancel activity).
- If compensation fails, the booking is parked in `MANUAL_OPS_REQUIRED` with an
  alert and a runbook link in the admin.

### Timeouts (Enterprise)

| Step             | Hard timeout | Retry                                 |
| ---------------- | ------------ | ------------------------------------- |
| Pre-fraud check  | 80 ms        | none (fallthrough = ALLOW on timeout) |
| Price confirm    | 6 s          | 1 retry                                |
| Supplier book    | 25 s each    | 3 retries exp                          |
| Payment capture  | 8 s          | 5 retries exp                          |
| Notify           | 5 min queued | 5 retries                              |
| Invoice          | 60 s         | 3 retries                              |

### Idempotency

- `Idempotency-Key` UUIDv7 required on all POST that mutate state.
- Stored 24 h with response hash + status; replays return original response.
- Per-tenant scoped (key namespace = tenant).

---

## Flight Flow (Enterprise)

```
search ──▶ multi-source fanout (Amadeus + Sabre/NDC + direct connects + corporate fares)
        ──▶ DYN-PRICE applied per offer
        ──▶ ML-FRAUD bin-pre-check (cookie features) for B2C
        ──▶ cache 10m per source
        ──▶ merge + dedup + sort
        ──▶ display

select ──▶ priceCheck via source-of-record
ancillaries ──▶ branded fare / bag / seat / SSR
checkout ──▶ saga
   - PRE_FRAUD: ML-FRAUD scoring (block / challenge / allow)
   - PAYMENT_HOLD: PSP route via tenant config + ML-FRAUD signal
   - PNR: source-of-record bookFlow
   - TICKET: issue via supplier
   - CAPTURE: capture PSP
   - POST: invoice + notify (push + WA + email)

exchange flow ──▶ NDC change endpoints where supported; otherwise cancel+rebook saga with delta
```

---

## Hotel Flow (4-supplier fanout, contracted rates)

```
search                ──▶ aggregator.search(canonicalCity, dates, guests)
                             ├─▶ amadeus, hotelbeds, booking-aff, expedia-rapid
                             ├─▶ + direct-contracts (B2B authorized)
                             ├─▶ DYN-PRICE per offer
                             └─▶ dedup via canonical mapping + ML similarity
detail                ──▶ aggregator.rooms(canonicalHotelId)
offer.confirm         ──▶ supplier-of-record offer confirmation
checkout              ──▶ saga (FRAUD → PAYMENT_HOLD → HOTEL.book → CAPTURE → notify)
post-confirmation     ──▶ voucher (multilingual, tenant-branded) + push + WA + email + wallet
schedule_changes      ──▶ supplier event → re-protect workflow + customer notify
```

---

## Payment Flow (multi-PSP + fraud + B2B credit)

### B2C

```
quote ──▶ fraud preview ──▶ PSP route (currency, BIN, fraud score, tenant route table)
       ──▶ Tap / Stripe / Paymob / Adyen
       ──▶ 3DS (forced if challenge or PSD2)
       ──▶ hold ──▶ supplier book ──▶ capture ──▶ confirm
```

### B2B (credit-line)

```
quote ──▶ agency credit available?
            yes ──▶ debit credit + supplier book + invoice on monthly cycle
            no  ──▶ require partial card top-up (split-pay) or block

settle ──▶ end-of-month invoice + statement export (PDF + CSV)
        ──▶ BSP-CASS report per IATA period
```

### Refunds

```
trigger (customer | ops | rule) ──▶ refund saga
   - eligibility check (policy + state + chargeback)
   - PSP refund (or credit-note for B2B)
   - per-leg supplier refund (component-level)
   - notify
```

### Chargeback Lifecycle

```
PSP webhook (chargeback.opened) ──▶ chargebacks row OPEN
                                         │
                                         ▼
                                 ops auto-evidence assembly (booking, IP, OTP, 3DS, supplier acceptance)
                                         │
                                         ▼
                                   SUBMITTED ──▶ PSP arbitration ──▶ WON / LOST
                                                                              │
                                                                              ▼
                                                                       if LOST: post-mortem + ML feedback
```

---

## Admin Modules

See FR-109..126 for the list. In addition to Pro:

| Page                            | Capabilities                                                              |
| ------------------------------- | ------------------------------------------------------------------------- |
| Tenants                         | Create, suspend, branding, domains, legal pages, PSP routes               |
| DYN-PRICE                       | Rule CRUD, priority editor, simulator, A/B history                        |
| ML-FRAUD                        | Score histograms, decision audit, override allow-list, model rollback     |
| Region health                   | Per-region traffic, error rate, replication lag, edge cache hit ratio    |
| Queues                          | BullMQ per-queue depth, oldest job age, failure rate, requeue button     |
| Chargebacks                     | Open cases, evidence pack auto-assemble, submission workflow              |
| Disputes                        | Customer disputes, evidence upload, status pipeline                       |
| Schedule changes                | Mass re-protect, customer comms templates per change                      |
| BSP / CASS                      | Periodic reports, exports, IATA submissions                                |
| Content CMS                     | Marketing, blog, deals, banners with per-tenant variants                  |
| Promo / Coupon engine           | Code CRUD, eligibility rules, redemption, fraud guard                     |
| Audit                           | Faceted search, CSV export, retention browser                              |
| DSR Console                     | DSR cases, regulatory clock, legal hold                                   |
| Incident Response               | Status board, runbooks, postmortems                                       |
| Release Mgmt                    | Feature-flag editor, cohort targeting, kill-switches                     |
| Agency Mgmt                     | Onboarding, credit, mark-ups, BSP reports, commission                     |
| Direct Contracts                | Hotel direct-contract ingestion, validity windows, monitoring            |

---

## Deployment

### Topology

- **Frontend (Next.js)**: Vercel with multi-region deployment + edge functions in
  3 regions; mobile builds via EAS with separate `production` + `staging` channels.
- **Backend**: Kubernetes (EKS/GKE) per region; ArgoCD GitOps; Helm charts;
  Linkerd mTLS mesh.
- **Database**: managed Postgres per region with logical replication; pgvector
  extension for hotel-similarity model lookups.
- **Cache/Queue**: ElastiCache for Redis Cluster per region + cross-region replication
  for queues; NATS JetStream for events.
- **Object storage**: S3 with cross-region replication; Glacier Deep Archive.
- **CDN/WAF**: Cloudflare global anycast + WAF + bot management.

### CI/CD

| Stage              | Steps                                                                                |
| ------------------ | ------------------------------------------------------------------------------------ |
| lint               | eslint, prettier, tsc                                                                |
| test:unit          | Jest, RTL, ≥ 85% lines                                                               |
| test:integration   | testcontainers + WireMock                                                            |
| test:contract      | Pact verify all supplier + PSP                                                       |
| test:e2e           | Playwright per region per locale                                                     |
| test:mobile        | Detox on simulator + EAS Build smoke                                                 |
| build              | docker buildx multi-arch; Cosign sign; SBOM CycloneDX; Snyk + Trivy                  |
| deploy:preview     | Vercel preview + per-PR k8s namespace                                                |
| deploy:staging     | ArgoCD sync on merge to `main`                                                       |
| smoke:staging      | Synthetic flight+hotel+package booking                                                |
| deploy:prod        | Manual approval → progressive (per-region canary)                                    |
| post-deploy        | OTel synthetic check; auto-rollback on SLO regression                                |
| mobile:OTA         | EAS Update channel deploy for FE-only fixes                                          |

### Environment Variables (additions over Pro)

| Var                              | Purpose                                                |
| -------------------------------- | ------------------------------------------------------ |
| `EXPEDIA_RAPID_KEY`/`_SECRET`    | Expedia Rapid                                          |
| `TAP_API_KEY`/`_SECRET`          | Tap Payments                                           |
| `APNS_KEY_ID`/`_TEAM_ID`/`_P8`   | APNs auth                                              |
| `FCM_SERVICE_ACCOUNT`            | FCM v1                                                 |
| `SAML_IDP_METADATA_<tenant>`     | Per-tenant SAML metadata                               |
| `OPA_BUNDLE_URL`                 | OPA policy bundle                                      |
| `MLFRAUD_API_URL`/`_TOKEN`       | ML-FRAUD service                                       |
| `DYN_PRICE_API_URL`              | DYN-PRICE service                                       |
| `NATS_URL`                       | Event bus                                              |
| `VAULT_ADDR`/`VAULT_ROLE`        | Vault                                                  |
| `KMS_KEY_ARN_<region>`           | KMS per region                                         |

---

## Logging

- Pino (Node) + structlog (Python ML services).
- Required fields: `ts`, `level`, `service`, `region`, `tenant_id`, `actor_id`,
  `correlation_id`, `trace_id`, `span_id`, `route`, `msg`.
- Routing: stdout → Vector → ClickHouse (analytics) + S3 cold + SIEM (Splunk/Sumo).
- Sensitive redaction expanded: card_*, doc_*, otp, password, secret, ssn,
  tax_id, agency_credit_details, mlfraud_features (PII-scrubbed only).
- Retention: 30 d hot; 2 y warm; 7 y audit (S3 Object Lock + WORM).

---

## Monitoring

- Stack: Sentry, Grafana Cloud, Datadog APM (mobile), PagerDuty, StatusPage.
- OpenTelemetry SDK end-to-end (web, mobile, API, workers, ML services).

### Metrics

| Metric                                       | Notes                                          |
| -------------------------------------------- | ---------------------------------------------- |
| `http_server_duration_ms`                    | by route, status, region                       |
| `supplier_call_duration_ms`                  | per supplier, op                               |
| `aggregator_partial_results_total`           | per supplier-fail breakdown                    |
| `saga_step_duration_ms`                      | per step                                       |
| `saga_compensation_total`                    | per step                                       |
| `package_assembly_duration_ms`               | end-to-end                                     |
| `mlfraud_score_latency_ms`                   | service histogram                              |
| `mlfraud_decision_total`                     | by decision                                    |
| `dynpricing_eval_duration_ms`                | rule eval                                      |
| `dynpricing_decision_total`                  | by rule                                        |
| `chargeback_opened_total`                    | by PSP, reason                                 |
| `payment_route_choice_total`                 | by PSP                                         |
| `notification_delivery_total`                | by channel + status                             |
| `pg_pool_in_use`                             | per region                                     |
| `redis_command_duration_ms`                  |                                                |
| `nats_messages_processed_total`              | by subject                                     |
| `mobile_app_crash_free_users`                | per platform                                   |
| `mobile_app_cold_start_ms`                   | p95                                            |

### Alerts (Enterprise)

| Condition                                                       | Severity | Routing            |
| --------------------------------------------------------------- | -------- | ------------------ |
| API p95 > 400 ms for 5 min                                      | page     | PagerDuty          |
| Region availability degraded (composite check 3× in 60s)        | page     | PagerDuty + COO    |
| Saga compensation rate > 1.5% for 15 min                        | page     | PagerDuty          |
| Aggregator partial-results > 15% for 15 min                     | warn     | #ops               |
| ML-FRAUD score skew (PSI > 0.2)                                 | warn     | ML on-call         |
| ML-FRAUD service latency p95 > 80 ms                            | page     | ML on-call         |
| DYN-PRICE rule simulator misfire (post-deploy delta > 10%)      | page     | product on-call    |
| Chargeback rate > 0.5% trailing 7 d                             | page     | finance on-call    |
| WA delivery failure > 10% over 15 min                           | warn     | #ops               |
| Push delivery failure > 5% over 15 min                          | warn     | #ops               |
| Postgres replication lag > 10 s                                 | warn     | DBA                |
| KMS error rate > 0% over 5 min                                  | page     | sec on-call        |
| 5xx > 0.3% for 5 min                                            | page     | PagerDuty          |
| Mobile crash-free users < 99.5% (rolling 24h)                   | page     | mobile on-call     |

---

## Testing Strategy

| Layer            | Tooling                                | Target                              |
| ---------------- | -------------------------------------- | ----------------------------------- |
| Unit (BE)        | Jest                                   | ≥ 90% lines, ≥ 80% branches         |
| Unit (FE)        | Jest + RTL                             | ≥ 85% lines                         |
| Unit (mobile)    | Jest                                   | ≥ 80% lines                         |
| Integration      | testcontainers + WireMock              | All services                        |
| Contract         | Pact for every supplier + PSP          | 100% adapters                       |
| Property-based   | fast-check (aggregator, pricing)       | Critical invariants                 |
| ML model         | Offline holdout + A/B in shadow        | AUC > 0.85; FPR < 1%                |
| E2E web          | Playwright; multi-locale RTL           | Critical paths                      |
| E2E mobile       | Detox + Maestro                        | Critical paths per platform         |
| Performance      | k6 + Argo Workflows                    | NFR-009/010 sustained               |
| Chaos            | Toxiproxy + ChaosMesh                  | Survive 1 supplier + 1 region degradation |
| Accessibility    | axe + manual quarterly audit + mobile  | Zero serious                        |
| Security         | OWASP ZAP, Burp (quarterly manual)     | Zero unmitigated highs              |
| Pen-test         | External quarterly                     | All highs remediated <30d           |

---

## Acceptance Tests

> Pro + Basic ATs remain. Enterprise adds AT-047..085.

| ID      | Title                                            | Given                                                       | When                                          | Then                                                                                  |
| ------- | ------------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| AT-047  | Tenant-scoped data isolation                    | Two tenants A and B with one user each                       | Tenant A user calls list bookings              | No bookings of tenant B are returned.                                                  |
| AT-048  | RLS row policy guard                            | Background job runs without setting `app.tenant_id`         | Query bookings                                | Postgres returns zero rows; query logged.                                              |
| AT-049  | SAML SSO B2B                                    | Agency tenant configured Okta SAML                          | Agent navigates to /auth/saml/{tenant}/sso     | Redirect to Okta; on ACS, agent logged in with role and agency claims.                |
| AT-050  | SCIM provisioning                               | Okta sends SCIM create-user                                  | API receives request                          | User created, role mapped, agency linked.                                              |
| AT-051  | WebAuthn passkey enroll                         | Authenticated user with platform authenticator              | Enroll passkey                                | Credential stored; subsequent login succeeds without password.                        |
| AT-052  | DPoP-bound refresh on mobile                    | Mobile app uses DPoP-bound refresh                          | Attacker steals refresh token                 | Use without proof → 401 invalid_dpop_proof.                                            |
| AT-053  | ML-FRAUD allow                                  | Score 12                                                     | Booking attempted                              | Frictionless flow; 3DS challenge per RTS rule only.                                   |
| AT-054  | ML-FRAUD challenge                              | Score 55                                                     | Booking attempted                              | Step-up MFA required; PSP intent created with 3DS forced.                              |
| AT-055  | ML-FRAUD block                                  | Score 88                                                     | Booking attempted                              | Booking rejected; ops review queue row created; user told to contact support.         |
| AT-056  | DYN-PRICE markup                                | Rule: +5% on EU outbound flights                            | EU outbound flight searched                   | Offer total shown is supplier_price * 1.05; markup logged.                            |
| AT-057  | DYN-PRICE floor enforcement                     | Rule wants -10% but supplier floor is -5%                   | Search                                        | Discount capped to -5%; audit row notes cap.                                          |
| AT-058  | Promo code single-use                           | Code applies to first booking only                          | User redeems twice                            | Second redemption rejected `PROMO_ALREADY_USED`.                                       |
| AT-059  | Package atomic confirm                          | Flight + hotel + transfer package                            | Transfer fails after flight + hotel booked    | Flight + hotel cancelled; payment voided; FAILED state with explanation.              |
| AT-060  | Package voucher                                 | Confirmed package                                            | Voucher generated                              | Single PDF with all components, ICS calendar attached.                                 |
| AT-061  | Multi-region read-after-write                   | Booking confirmed in eu-central-1                            | User next request lands on me-central-1        | Booking is visible within 5 s (with optional stickiness header).                       |
| AT-062  | Region failover                                 | eu-central-1 marked unhealthy                                | DNS resolution                                 | Traffic shifts to me-central-1; sagas in-flight resumed via NATS mirror.              |
| AT-063  | Active-active write divergence guard            | Same booking ref drafted in both regions                    | Replication                                   | Conflict detected; lower-priority region rolls back; user retried.                     |
| AT-064  | B2B credit booking                              | Agency with credit limit available                          | Agent books on behalf                          | Credit debited; invoice queued for monthly cycle; commission tracked.                  |
| AT-065  | B2B credit limit exceeded                       | Credit utilized 95%                                          | Agent books >5%                                | Block with `CREDIT_INSUFFICIENT`; offer split-pay flow.                                |
| AT-066  | Agency markup applied                           | Agency markup 8% on flights                                  | Agent quotes a flight                         | Customer-facing total = supplier × 1.08; commission stored.                            |
| AT-067  | Group booking 25 pax                            | Agent imports 25 passenger XLSX                              | Submit booking                                | Validation passes; PNRs created in chunks per IATA group rules.                       |
| AT-068  | Corporate fare unlock                           | Carrier requires airline ID for corp fare                    | Provide airline ID                            | Corp fare returned in price-check; persisted on booking.                              |
| AT-069  | BSP-CASS export                                 | Period closes                                                | Run BSP report                                | PDF + CSV generated with all eligible bookings + tax breakdown.                       |
| AT-070  | White-label theming                             | Tenant updates color tokens                                  | FE rebuild (or runtime token fetch)            | New theme applied; no cross-tenant leakage; cache invalidated.                        |
| AT-071  | White-label custom domain                       | Tenant maps `book.brand.com`                                 | DNS verification + TLS                         | TLS cert auto-provisioned; site served under tenant branding.                          |
| AT-072  | Per-tenant PSP routing                          | Tenant maps Tap as default for AED                          | Booking in AED                                | PSP = Tap; intent created in Tap.                                                      |
| AT-073  | Per-tenant email DKIM                           | Tenant configures DKIM for `mail.brand.com`                  | Send confirmation email                       | Email sent with brand-domain DKIM; SPF/DMARC pass.                                     |
| AT-074  | Mobile cold-start NFR                           | iPhone 12 cold-launch                                        | Open app                                      | Home screen ≤ 1.8 s p95 over 100 launches.                                            |
| AT-075  | Mobile offline trips                            | User has cached upcoming trips                              | Airplane mode                                  | Trips visible; tickets/vouchers viewable; new bookings disabled with hint.            |
| AT-076  | Biometric step-up                               | iOS user attempts refund                                     | Biometric prompt                              | On success, refund saga proceeds; on failure, blocked with explanation.               |
| AT-077  | Push delivery                                   | Confirmed booking                                            | Notification dispatched                       | APNs/FCM delivered ≤ 60 s; receipt callback updates `push_messages`.                  |
| AT-078  | Schedule change re-protect                      | Carrier sends 4h delay event                                 | Customer accepts re-protect                   | New PNR; ticket reissued; notify; old PNR cancelled.                                  |
| AT-079  | Chargeback evidence pack                        | PSP opens dispute                                            | Auto-assembly job runs                        | Evidence pack created (BCD, IP, 3DS result, supplier ACK, customer comms) + submitted. |
| AT-080  | DSR export                                       | Customer requests data export                                | Within 30 d                                   | ZIP delivered via signed URL; DSR ticket COMPLETED; audit logged.                     |
| AT-081  | DSR delete with legal hold                      | Booking under legal hold                                     | Customer requests delete                      | Deletion deferred; legal hold notified; customer told.                                |
| AT-082  | Data residency                                   | KSA tenant booking                                           | Persist                                       | Row stored in me-central-1 primary; not present in eu-central-1.                       |
| AT-083  | Outbound webhook signed                         | Tenant webhook subscribed to booking.confirmed              | Booking confirms                              | POST to tenant URL with HMAC-SHA256 + timestamp; retries on non-2xx.                  |
| AT-084  | Feature-flag rollout                             | Flag enabled at 10% cohort                                   | Users hit flagged endpoint                    | ~10% see new behavior; cohort tracked deterministically by userId hash.               |
| AT-085  | Kill-switch                                      | Admin disables payments flag                                 | Payment endpoint hit                          | 503 `MAINTENANCE`; banner on FE; audit recorded.                                       |

---

## Appendix A — Migration from Pro Tier

| Concern                  | Migration step                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------- |
| Tenancy                  | Backfill `tenant_id` = `'default'` for legacy rows; flip RLS on after backfill verified.|
| Multi-region             | Shadow second region read-only; promote when RPO < 1 min sustained for 7 days.          |
| Fraud ML                 | Shadow mode for 30 days; enable enforcement per-cohort progressively.                   |
| Dynamic pricing          | Empty rule set at launch; rule simulator gates activation.                              |
| Agent portal             | Side-by-side deployment; per-tenant feature flag.                                       |
| Mobile                   | Internal TestFlight + Closed track first; public store after 4 weeks of internal use.   |
| Chargebacks              | Backfill chargebacks via PSP historical APIs (90-day window).                           |

## Appendix B — Risk Register (top items)

| ID   | Risk                                                            | Likelihood | Impact | Mitigation                                                |
| ---- | --------------------------------------------------------------- | ---------- | ------ | --------------------------------------------------------- |
| R-01 | ML-FRAUD model drift impacting authorization rates              | Medium     | High   | PSI monitoring, monthly retrain, rollback flag.           |
| R-02 | Cross-region split-brain on booking saga                        | Low        | High   | Source-region stickiness; idempotency keys per tenant.    |
| R-03 | White-label tenant DKIM misconfiguration leading to spam folder | Medium     | Medium | DNS verification + warmup playbook.                       |
| R-04 | SAML IdP misconfiguration → tenant lockout                      | Medium     | High   | Break-glass admin path; per-tenant audit.                 |
| R-05 | NDC adoption pace from carriers slower than expected            | Medium     | Medium | Pluggable adapters; GDS fallback.                         |
| R-06 | Mobile app store rejection delaying release                     | Medium     | Medium | OTA channels for FE fixes; pre-submission review pipeline. |
| R-07 | PSP outage in target region (e.g., Paymob in Egypt)             | Low        | High   | Multi-PSP routing + failover rules.                       |
| R-08 | Regional regulatory change (e.g., Saudi PDPL amendment)         | Medium     | Medium | DPO quarterly review; legal hold + data-residency switch. |
| R-09 | Chargeback flood from a fraud ring                              | Low        | High   | ML-FRAUD + 3DS + ops triage; circuit breaker.             |
| R-10 | Supplier rate-parity breach impacting margins                   | Medium     | Medium | DYN-PRICE override + commercial escalation.               |

— *End of document — Jawla SRS Enterprise v1.0* —
