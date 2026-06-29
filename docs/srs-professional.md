# Software Requirements Specification — Jawla Tours OTA (Professional Tier)

## Document Control

| Field             | Value                                                          |
| ----------------- | -------------------------------------------------------------- |
| Document Title    | Jawla Tours OTA — SRS (Professional Tier)                      |
| Document ID       | JAWLA-SRS-PRO                                                  |
| Version           | 1.0                                                            |
| Issue Date        | 2026-06-29                                                     |
| Status            | Approved — Baseline                                            |
| Classification    | Internal — Engineering / Product / Finance                     |
| Owner             | Jawla Platform Engineering                                     |
| Prepared By       | Platform Architecture Group                                    |
| Reviewed By       | CTO, Head of Product, Head of Finance, QA Lead, Security Lead  |
| Approved By       | CTO                                                            |
| Distribution      | Engineering, Product, QA, DevOps, Security, Finance, Support   |

### Revision History

| Version | Date       | Author              | Section(s)                  | Change Summary                                                       |
| ------- | ---------- | ------------------- | --------------------------- | -------------------------------------------------------------------- |
| 0.1     | 2026-04-22 | Platform Arch Group | All                         | Draft built atop Basic Tier (delta-spec)                             |
| 0.2     | 2026-05-09 | Finance             | Payment, NFR (FX, compliance) | Multi-currency, automated refunds, FX risk mitigations             |
| 0.3     | 2026-05-25 | Platform Arch Group | Hotels, Architecture        | Multi-provider aggregation (Amadeus + HotelBeds + Booking.com Affiliate) |
| 0.4     | 2026-06-08 | Product             | Admin, FR                   | Advanced admin console + customer dashboard                          |
| 0.5     | 2026-06-17 | Security            | Security, AuthN             | WhatsApp Business token storage, OTP hardening                       |
| 0.6     | 2026-06-24 | QA Lead             | Acceptance                  | AT-025..AT-046 added                                                 |
| 1.0     | 2026-06-29 | CTO                 | All                         | Baseline approval                                                    |

### Glossary (Pro additions)

| Term         | Meaning                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| GMV          | Gross Merchandise Value (sum of confirmed booking totals)                 |
| Take Rate    | Net commission / GMV                                                      |
| BSP-CASS     | IATA settlement system for air / multimodal                               |
| Aggregator   | Backend service that fans out to multiple supplier providers              |
| Affiliate    | Booking.com or Expedia Partner Solutions revenue-share API                |
| WABA         | WhatsApp Business Account                                                 |
| Idempotency  | Property of safely retrying with same key without side effects            |
| MAR          | Multi-currency Authorization Routing                                      |

---

## Introduction

### Purpose

This document defines the **Professional Tier** software requirements for *Jawla Tours*.
It supersedes the Basic Tier baseline by adding multi-currency commerce, multi-provider
hotel aggregation, automated refunds, WhatsApp notifications, a customer dashboard, and
an advanced admin console. It is the contract between Engineering, Product, Finance,
Security, and external auditors for the second major release (target GA Q4 2026).

### Scope

In scope:

- All Basic Tier functionality (assumed and not re-stated except where it materially
  changes).
- **Multi-currency commerce**: end-to-end pricing, charging, settlement, and refunding
  in EGP, USD, EUR, GBP, SAR, AED, KWD; transparent FX margin policy.
- **Multi-provider hotel aggregation**: Amadeus + HotelBeds + Booking.com Affiliate
  via a single normalized aggregator layer with deduplication, rate parity, and
  fallback.
- **Multi-PSP routing**: Stripe, Paymob (Egypt), Adyen (intl high-value, alt MPMs).
- **Customer dashboard**: trips, profile, travel documents vault, frequent travellers,
  saved payment methods (Stripe-managed), receipts, refund self-service.
- **WhatsApp Business notifications** via Meta Cloud API (templates approved).
- **Automated refund orchestration** with multi-leg compensation (supplier + PSP).
- **Advanced admin** with reports, bulk operations, supplier health, dunning queue.
- **~40 REST endpoints**.

Out of scope (deferred to Enterprise):

- Native mobile apps, B2B agent portal, white-label, fraud ML, dynamic pricing,
  package-deals queue stack, multi-region active-active.

### Document Conventions

- Same RFC 2119 + Gherkin conventions as Basic Tier.
- Where a requirement is **carried over verbatim** from Basic Tier, this document
  references the Basic FR ID (e.g. "extends FR-027").

### References

| Ref ID | Reference                                                                       |
| ------ | ------------------------------------------------------------------------------- |
| R-01   | JAWLA-SRS-BASIC v1.0                                                            |
| R-02   | Amadeus Hotel Booking v2, Flight Create Orders v2                               |
| R-03   | HotelBeds API v2 — Hotel content + Booking API                                  |
| R-04   | Booking.com Affiliate API (2026)                                                |
| R-05   | Stripe Payments + Stripe Treasury (multi-currency settlement)                   |
| R-06   | Paymob Accept API (Egypt), Adyen Checkout API v71                               |
| R-07   | WhatsApp Business Cloud API — Messaging + Templates                             |
| R-08   | PCI DSS v4.0 — SAQ A-EP                                                         |
| R-09   | EU GDPR, Egyptian DP Law 151/2020, Saudi PDPL                                   |
| R-10   | OWASP Top 10:2021 + ASVS 4.0.3 L2                                               |
| R-11   | WCAG 2.1 AA, EN 301 549                                                         |

---

## Functional Requirements

> Tier-additive: requirements are **new** unless marked *extends*.

### Module: Authentication (FR-001 — FR-022)

| ID     | Requirement                                                                                                       | Priority |
| ------ | ----------------------------------------------------------------------------------------------------------------- | -------- |
| FR-001 | *Extends Basic FR-001..018.* Carry over all auth requirements unchanged unless overridden below.                   | MUST     |
| FR-019 | The system MUST support TOTP MFA (RFC 6238, 30s window, SHA-1/6 digits) opt-in per user.                          | MUST     |
| FR-020 | The system MUST require MFA challenge before refund self-service and saved-card management.                        | MUST     |
| FR-021 | The system MUST allow Google SSO and Apple SSO with email-claim mapping; first-login profile completion required.  | MUST     |
| FR-022 | The system MUST support session listing + remote-revoke (current sessions device list).                            | MUST     |

### Module: Flights (FR-023 — FR-038)

| ID     | Requirement                                                                                                              | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| FR-023 | *Extends Basic FR-019..032.* All baseline flight requirements remain in force.                                            | MUST     |
| FR-024 | The system MUST display fare bundles (e.g., LITE/STANDARD/FLEX) when the carrier exposes branded fares.                   | MUST     |
| FR-025 | The system MUST allow ancillary add-ons at checkout: extra bag, seat selection where supplier supports.                    | MUST     |
| FR-026 | The system MUST support multi-city itineraries up to 6 slices.                                                            | MUST     |
| FR-027 | The system MUST support frequent-flyer number capture per pax per carrier (FOID), validated by IATA carrier code list.    | MUST     |
| FR-028 | The system MUST allow customer-initiated post-booking add-baggage if supplier permits, applying delta charge.              | SHOULD   |
| FR-029 | The system MUST present price in the customer's selected display currency with explicit FX rate + margin disclosure.      | MUST     |
| FR-030 | The system MUST issue an e-ticket PDF in the booking locale with all legs, fare rules summary, and carrier baggage table. | MUST     |
| FR-031 | The system MUST allow self-service flight change requests (carrier permitting); price difference computed live.            | SHOULD   |
| FR-032 | The system MUST keep "saved travellers" book per user, prefilling pax forms with consent.                                  | MUST     |

### Module: Hotels (FR-039 — FR-058)

| ID     | Requirement                                                                                                                 | Priority |
| ------ | --------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-039 | The system MUST fan out hotel searches across **Amadeus, HotelBeds, Booking Affiliate** through an aggregator service.       | MUST     |
| FR-040 | The aggregator MUST deduplicate hotels via canonical hotel ID (mapping table sourced from Giata/Content provider).            | MUST     |
| FR-041 | The aggregator MUST select the cheapest equivalent room offer where rate parity is broken, surfacing the source supplier.    | MUST     |
| FR-042 | The aggregator MUST degrade gracefully when a supplier times out (partial-results banner; no hard failure).                  | MUST     |
| FR-043 | The system MUST cache supplier-specific responses keyed independently to allow partial cache hits.                            | MUST     |
| FR-044 | The system MUST support hotel-only and city-area searches (lat-lng radius up to 25km).                                       | MUST     |
| FR-045 | The system MUST present amenity, board basis, refundability filters across normalized supplier outputs.                       | MUST     |
| FR-046 | The system MUST surface free-cancellation deadline in the customer's timezone, in red < 24h before deadline.                  | MUST     |
| FR-047 | The system MUST allow modification of dates within 24 h of booking when supplier rules permit.                                | SHOULD   |
| FR-048 | The system MUST persist supplier-of-record at booking time; subsequent operations route to original supplier.                 | MUST     |
| FR-049 | The system MUST support pay-at-hotel offers, marked separately; payment only authorizes guarantee.                            | SHOULD   |
| FR-050 | The system MUST send confirmation in customer locale incl. hotel email/phone, lat-lng, check-in/out times.                    | MUST     |
| FR-051 | The system MUST produce a normalized voucher PDF (template per locale) attached to confirmation.                              | MUST     |
| FR-052 | The system MUST enforce stop-sell flags from any supplier within 60 s of supplier signal.                                     | MUST     |
| FR-053 | The system MUST support meta-search style "best deal" badge using lowest equivalent-rate price.                                | SHOULD   |
| FR-054 | The system MUST allow guest reviews to be ingested from supplier (read-only) and displayed with attribution.                  | MAY      |
| FR-055 | The system MUST handle currency conversion server-side using daily FX feed; sell-currency stored on booking.                  | MUST     |
| FR-056 | The system MUST enforce inventory acceptance check (rebook) within 120 s of payment confirmation.                              | MUST     |
| FR-057 | The system MUST log supplier rate parity breaches > 5% to BI for commercial review.                                            | SHOULD   |
| FR-058 | The system MUST produce a daily reconciliation file vs each supplier ARI feed.                                                | MUST     |

### Module: Booking (FR-059 — FR-072)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-059 | *Extends Basic FR-045..055.*                                                                                  | MUST     |
| FR-060 | The system MUST support **cart** with multiple items (flight + hotel) checked out together.                   | MUST     |
| FR-061 | The system MUST compute combined total in display currency with consistent FX snapshot.                       | MUST     |
| FR-062 | The system MUST split charge across items for refund granularity; one payment intent per cart.                | MUST     |
| FR-063 | The system MUST support cart hold of 20 minutes; supplier offers re-priced if held > 5 minutes.               | MUST     |
| FR-064 | The system MUST allow user-initiated cancellation per booking item (partial cancellation) where allowed.       | MUST     |
| FR-065 | The system MUST run a **saga** for fulfillment with explicit compensation for each step.                      | MUST     |
| FR-066 | The system MUST persist saga state in `booking_sagas` with retry counters.                                    | MUST     |
| FR-067 | The system MUST emit domain events on every state transition for downstream BI ingestion.                     | MUST     |
| FR-068 | The system MUST handle voluntary changes (date change) by composing cancel + rebook with delta charge/refund.  | SHOULD   |
| FR-069 | The system MUST capture and store traveller consents (T&C version hash + timestamp) at booking time.          | MUST     |
| FR-070 | The system MUST mark bookings with regulatory tags (`TAX_VAT`, `TAX_TOURISM`) for invoice generation.         | MUST     |
| FR-071 | The system MUST generate a tax-compliant invoice PDF per market on demand.                                    | MUST     |
| FR-072 | The system MUST allow "view e-ticket" and "view voucher" download from customer dashboard.                    | MUST     |

### Module: Payment (FR-073 — FR-088)

| ID     | Requirement                                                                                                          | Priority |
| ------ | -------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-073 | The system MUST route payments across multiple PSPs based on currency, BIN country, amount, and risk score.           | MUST     |
| FR-074 | The system MUST support Stripe (global cards), Paymob (Egyptian cards + wallet + Fawry), Adyen (alt MPMs, intl).      | MUST     |
| FR-075 | The system MUST tokenize cards via PSP vault; PCI scope remains SAQ A-EP.                                              | MUST     |
| FR-076 | The system MUST support saved payment methods per user with default selection.                                         | MUST     |
| FR-077 | The system MUST automate refunds: ops trigger or system rule → PSP refund API; partial refunds supported.              | MUST     |
| FR-078 | The system MUST process refund webhooks idempotently, updating `payments.refunded_amount_minor` and booking status.    | MUST     |
| FR-079 | The system MUST hold a daily FX snapshot from an external feed (e.g., openexchangerates) with margin added.            | MUST     |
| FR-080 | The system MUST persist `sellCurrency`, `buyCurrency`, `fxRate`, `fxMarginPct` per booking for audit.                  | MUST     |
| FR-081 | The system MUST reconcile PSP payouts to bookings nightly; mismatches >0.5% flag to finance.                           | MUST     |
| FR-082 | The system MUST issue refunds in the original capture currency to avoid customer FX loss.                              | MUST     |
| FR-083 | The system MUST enforce 3DS / SCA per region (PSD2 in EU, mandatory in EG by CBE).                                     | MUST     |
| FR-084 | The system MUST support partial captures for multi-item carts when supplier confirms partially.                        | SHOULD   |
| FR-085 | The system MUST escrow payouts to suppliers via `supplier_payouts` ledger; net of commission.                          | MUST     |
| FR-086 | The system MUST surface dunning state for failed payments with smart retry (1h, 6h, 24h).                              | MUST     |
| FR-087 | The system MUST support Apple Pay / Google Pay via Stripe Express Checkout.                                            | SHOULD   |
| FR-088 | The system MUST emit a Finance event stream (`finance.*`) consumed by the reconciliation worker.                       | MUST     |

### Module: Notifications (FR-089 — FR-100)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-089 | The system MUST support email + WhatsApp Business + in-app channels with channel preference per event.       | MUST     |
| FR-090 | The system MUST send WhatsApp via Meta Cloud API using approved templates with parameter substitution.        | MUST     |
| FR-091 | The system MUST request opt-in for WhatsApp explicitly; default OFF.                                          | MUST     |
| FR-092 | The system MUST fall back to email if WhatsApp delivery fails (no `delivered` callback within 5 min).        | MUST     |
| FR-093 | The system MUST localize all templates to AR/EN/FR; WhatsApp templates submitted/approved per language.      | MUST     |
| FR-094 | The system MUST queue notifications on BullMQ; per-channel rate-limiting (WA Business: < 50 msg/s/account).   | MUST     |
| FR-095 | The system MUST de-dup notifications across channels using `dedup_key`.                                      | MUST     |
| FR-096 | The system MUST track delivery (`sent`, `delivered`, `read`, `failed`) and surface in admin.                | MUST     |
| FR-097 | The system MUST support pre-trip reminders (24h, 2h) via the user's preferred channel.                       | MUST     |
| FR-098 | The system MUST throttle re-sends to 1 per 10 min per template per user.                                     | MUST     |
| FR-099 | The system MUST sign in-app notifications with the event ID for the FE realtime channel.                     | MUST     |
| FR-100 | The system MUST honor Meta's 24-hour customer-service window rules for WA non-template messages.             | MUST     |

### Module: Admin (FR-101 — FR-114)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-101 | The admin console MUST provide a bookings workbench: bulk actions (resend, refund, tag, export).             | MUST     |
| FR-102 | The admin console MUST expose supplier health dashboards (latency, error rate per op, last seen).            | MUST     |
| FR-103 | The admin console MUST expose payment console: failed payments, refund queue, dunning state, PSP volume.    | MUST     |
| FR-104 | The admin console MUST support finance exports: GMV, take rate, refunds, FX P&L per day/market/currency.    | MUST     |
| FR-105 | The admin console MUST allow CMS for marketing pages (deals, banners) backing the Next.js site.             | MUST     |
| FR-106 | The admin console MUST allow customer-360 view (bookings, payments, notifications, sessions).               | MUST     |
| FR-107 | The admin console MUST allow notification-template editing with preview and i18n.                            | MUST     |
| FR-108 | The admin console MUST allow feature-flag toggles per environment, audited.                                  | MUST     |
| FR-109 | The admin console MUST support 4-eye approval on refunds > $5,000 equivalent.                                | MUST     |
| FR-110 | The admin console MUST integrate impersonation with 30-min hard ceiling and a banner on the customer FE.     | MUST     |
| FR-111 | The admin console MUST log every action to immutable audit log with diff.                                    | MUST     |
| FR-112 | The admin console MUST allow CSV import of supplier-mapping data (for hotel dedup).                          | MUST     |
| FR-113 | The admin console MUST allow scheduled reports (daily KPI digest to email distribution list).               | SHOULD   |
| FR-114 | The admin console MUST surface SLA dashboards: NFR-bound metrics with traffic light status.                  | MUST     |

### Module: Customer Dashboard (FR-115 — FR-126)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-115 | The dashboard MUST present trips grouped: upcoming, ongoing, past, cancelled.                                 | MUST     |
| FR-116 | The dashboard MUST allow downloading e-ticket / voucher / invoice from each booking card.                    | MUST     |
| FR-117 | The dashboard MUST allow updating contact info, locale, currency, MFA, sessions, password.                    | MUST     |
| FR-118 | The dashboard MUST manage saved travellers (CRUD), with explicit consent for shared bookings.                | MUST     |
| FR-119 | The dashboard MUST present travel documents vault (passports, visas) with expiry warnings.                   | MUST     |
| FR-120 | The dashboard MUST manage saved cards (PSP-token only; never PAN) with delete and set-default.               | MUST     |
| FR-121 | The dashboard MUST allow self-service cancellation with quoted refund preview.                                | MUST     |
| FR-122 | The dashboard MUST present refund tracking timeline (requested → in_progress → settled).                     | MUST     |
| FR-123 | The dashboard MUST present GDPR data export request workflow with status.                                     | MUST     |
| FR-124 | The dashboard MUST present account-deletion workflow with 30-day grace + cancellation of safety checks.       | MUST     |
| FR-125 | The dashboard MUST present a loyalty placeholder hook (wallet credit balance, read-only in Pro).             | SHOULD   |
| FR-126 | The dashboard MUST present a realtime trip-status panel (delays, gate) for upcoming flights within 24 h.     | SHOULD   |

---

## Non-functional Requirements

### Performance

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-001 | Flight search p95 ≤ 2.0 s (aggregated, cache-hot ≤ 600 ms).                                  |
| NFR-002 | Hotel aggregated search p95 ≤ 2.5 s (3 suppliers fanout, 1.8 s supplier-call budget each).   |
| NFR-003 | Non-supplier endpoints p95 ≤ 200 ms.                                                          |
| NFR-004 | Customer dashboard TTFB p95 ≤ 350 ms.                                                         |
| NFR-005 | Webhook ingestion (PSP) p95 ≤ 150 ms ack.                                                     |
| NFR-006 | LCP ≤ 1.8 s on 4G; CLS ≤ 0.05; INP ≤ 200 ms.                                                  |

### Scalability

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-007 | Sustain 200 RPS booking funnel, peak 500 RPS for 10 min.                                     |
| NFR-008 | Sustain 1000 RPS catalog/search.                                                              |
| NFR-009 | BullMQ workers MUST scale to 12 replicas without code change; queue concurrency configurable. |
| NFR-010 | Postgres MUST tolerate 600 client conns via PgBouncer; primary CPU ≤ 60% at sustained load.   |
| NFR-011 | Aggregator MUST shard supplier calls across worker pool to avoid head-of-line blocking.       |

### Availability

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-012 | Target monthly uptime 99.9% (≤ 43 min downtime).                                              |
| NFR-013 | RPO ≤ 5 min, RTO ≤ 1 h for full DR in primary region.                                         |
| NFR-014 | Active warm standby in second AZ; primary Postgres with synchronous replica; quorum write. |
| NFR-015 | Zero-downtime deploys via blue/green for API; canary for FE (5% → 25% → 100%).                |
| NFR-016 | Maintenance windows announced ≥ 7 days in advance; max 2 per quarter, max 30 min each.        |

### Security

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-017 | TLS 1.2+, HSTS 2 y preload; OCSP stapling enabled.                                            |
| NFR-018 | Data at rest AES-256; KMS-rooted key hierarchy with monthly DEK rotation.                     |
| NFR-019 | All secrets in AWS Secrets Manager / HashiCorp Vault; never in env files in git.              |
| NFR-020 | Security-grade pentest twice a year; remediation within 30 days for High, 7 days Critical.    |
| NFR-021 | SOC 2 Type I readiness during Pro tier; controls mapped.                                      |

### Compliance

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-022 | PCI DSS v4.0 SAQ A-EP attestation maintained annually.                                        |
| NFR-023 | GDPR + Egyptian DP Law: DPIA documented for new processing activities.                        |
| NFR-024 | Tax invoicing: VAT for EG/SA where applicable; sequential invoice number per market.          |
| NFR-025 | Right to be forgotten honored within 30 days; legal hold supersedes.                          |

### Internationalization

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-026 | All UI surfaces support AR (RTL), EN, FR; RTL-aware bidi handling.                            |
| NFR-027 | Date/time/number formatting via ICU; user-selectable timezone; storage UTC.                   |
| NFR-028 | Currency: ISO 4217 codes everywhere; rounding rule = banker's rounding to currency's exponent. |

### Accessibility

| ID      | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-029 | WCAG 2.1 AA — verified via axe-core CI + quarterly manual audit by accessibility consultant.  |
| NFR-030 | Mobile-first; touch targets ≥ 44×44 CSS px.                                                   |

---

## System Architecture

```
                                            ┌───────────────────────────────────────┐
                                            │            External APIs              │
                                            │ ┌─────────┐ ┌──────────┐ ┌──────────┐ │
                                            │ │ Amadeus │ │HotelBeds │ │ Booking  │ │
                                            │ └─────────┘ └──────────┘ └──────────┘ │
                                            │ ┌─────────┐ ┌──────────┐ ┌──────────┐ │
                                            │ │ Stripe  │ │ Paymob   │ │  Adyen   │ │
                                            │ └─────────┘ └──────────┘ └──────────┘ │
                                            │ ┌─────────────┐ ┌───────────────────┐ │
                                            │ │ WA Cloud API│ │ SES / Resend      │ │
                                            │ └─────────────┘ └───────────────────┘ │
                                            └────────────────▲──────────────────────┘
                                                             │
                                                             │
┌──────────┐     ┌────────────┐     ┌──────────────┐     ┌───┴────────────────────────┐
│  Client  │────▶│ Cloudflare │────▶│  Vercel CDN  │────▶│ Next.js 15 (App Router)    │
│ Web/Web  │     │  (WAF/Bot) │     │     Edge     │     │ - Marketing               │
└──────────┘     └────────────┘     └──────────────┘     │ - Customer Dashboard      │
                                                          │ - Admin Console (RBAC)    │
                                                          │ - Server Actions          │
                                                          └────────────┬──────────────┘
                                                                       │
                                                                       ▼
                                                          ┌────────────────────────────┐
                                                          │       NestJS API Gateway   │
                                                          │  - Auth + Authorization    │
                                                          │  - Rate limit / Idempotency│
                                                          │  - Request validation      │
                                                          └────────────┬───────────────┘
                                                                       │
              ┌────────────────────────────────────────────────────────┼────────────────────┐
              ▼                                  ▼                     ▼                    ▼
      ┌───────────────┐                ┌───────────────┐       ┌───────────────┐    ┌───────────────┐
      │ Flight Svc    │                │ Hotel Aggregator│     │ Booking Svc   │    │ Payment Svc   │
      │ - Amadeus     │                │ - Amadeus       │     │ - Saga engine │    │ - PSP router  │
      │ - cache layer │                │ - HotelBeds     │     │ - Idempotency │    │ - FX engine   │
      │               │                │ - Booking Aff   │     │               │    │               │
      └───────┬───────┘                └────────┬────────┘     └───────┬───────┘    └───────┬───────┘
              │                                 │                      │                    │
              └───────────────────┬─────────────┴──────────────────────┴────────────────────┘
                                  ▼
                          ┌──────────────────┐    ┌──────────────────┐
                          │ PgBouncer        │───▶│ PostgreSQL 16    │
                          └──────────────────┘    │ + sync standby + │
                                                  │ 1 async replica  │
                                                  └──────────────────┘
                                  │
                                  ▼
                          ┌──────────────────┐    ┌──────────────────────────────┐
                          │ Redis 7 (cluster)│───▶│ BullMQ workers (12 replicas) │
                          │ cache + queues   │    │ - booking.fulfill            │
                          └──────────────────┘    │ - notifications.{email,wa}   │
                                                  │ - payment.refund             │
                                                  │ - reconciliation.daily       │
                                                  │ - aggregator.fanout          │
                                                  └──────────────────────────────┘
```

### Hexagonal Layout (per service)

- **Adapters in**: HTTP controllers, queue listeners, webhook receivers.
- **Application**: use cases (saga orchestration, idempotent commands).
- **Domain**: pure entities (`Booking`, `Payment`, `Offer`) + value objects (`Money`,
  `Currency`, `Locale`).
- **Adapters out**: PSP clients, supplier clients, repositories (Prisma), event bus.

### Async Boundaries

- All multi-step operations (booking fulfillment, refunds, payouts, dunning) run as
  BullMQ jobs with `attempts`, `backoff:{type:exponential, delay:1000}`, idempotent
  handlers.
- Domain events published to an internal in-process EventEmitter, then optionally
  forwarded to a `domain.events` BullMQ queue for cross-service consumers.

---

## Database Design

PostgreSQL 16, Pro tier adds the following tables on top of Basic.

| Table                  | Purpose                                                                       |
| ---------------------- | ----------------------------------------------------------------------------- |
| `currencies`           | ISO 4217 reference + display exponent                                         |
| `fx_rates`             | Daily FX snapshots                                                            |
| `saved_travellers`     | Per-user reusable traveller profiles                                          |
| `saved_documents`      | Travel documents vault (encrypted)                                            |
| `saved_payment_methods`| PSP-token references per user                                                 |
| `carts`                | Multi-item booking cart aggregate                                             |
| `cart_items`           | Cart line items                                                               |
| `booking_sagas`        | Per-booking saga state (step, retries, errors)                                |
| `booking_changes`      | Voluntary changes ledger (delta charge/refund)                                |
| `supplier_mappings`    | Canonical hotel ID ↔ supplier-specific IDs                                    |
| `supplier_payouts`     | Outbound supplier ledger (commission + net)                                   |
| `psp_routes`           | Routing rules table (currency, BIN, amount) → PSP                             |
| `wa_templates`         | WhatsApp Business approved templates per locale                               |
| `wa_messages`          | Sent WA messages + delivery state                                             |
| `consents`             | Versioned consent record (T&C, marketing, WA)                                 |
| `invoices`             | Generated tax invoice metadata + storage URL                                  |

### Key DDL

```sql
CREATE TABLE currencies (
  code        CHAR(3) PRIMARY KEY,
  name        TEXT NOT NULL,
  exponent    SMALLINT NOT NULL,
  symbol      TEXT
);

CREATE TABLE fx_rates (
  as_of_date  DATE        NOT NULL,
  base        CHAR(3)     NOT NULL REFERENCES currencies(code),
  quote       CHAR(3)     NOT NULL REFERENCES currencies(code),
  rate        NUMERIC(18,8) NOT NULL,
  source      TEXT        NOT NULL,
  margin_bps  INT         NOT NULL DEFAULT 0,
  PRIMARY KEY (as_of_date, base, quote)
);

CREATE TABLE saved_travellers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title        TEXT,
  given_name   TEXT NOT NULL,
  family_name  TEXT NOT NULL,
  dob          DATE NOT NULL,
  nationality  CHAR(2),
  ff_numbers   JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE saved_documents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  traveller_id    UUID REFERENCES saved_travellers(id) ON DELETE CASCADE,
  doc_type        TEXT NOT NULL,
  doc_number_enc  BYTEA NOT NULL,         -- AES-256-GCM via KMS DEK
  doc_number_hash BYTEA NOT NULL,         -- HMAC for lookup
  doc_expiry      DATE NOT NULL,
  doc_country     CHAR(2),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON saved_documents (doc_number_hash);

CREATE TABLE saved_payment_methods (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  psp         TEXT NOT NULL,
  psp_token   TEXT NOT NULL,
  brand       TEXT,
  last4       CHAR(4),
  exp_month   SMALLINT,
  exp_year    SMALLINT,
  is_default  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, psp, psp_token)
);

CREATE TABLE carts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id),
  display_currency CHAR(3) NOT NULL,
  fx_snapshot_id UUID,
  total_minor    BIGINT NOT NULL DEFAULT 0,
  expires_at     TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '20 minutes',
  status         TEXT NOT NULL DEFAULT 'OPEN'
                 CHECK (status IN ('OPEN','CHECKED_OUT','EXPIRED','ABANDONED'))
);

CREATE TABLE cart_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id     UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  item_type   TEXT NOT NULL CHECK (item_type IN ('FLIGHT','HOTEL')),
  supplier    TEXT NOT NULL,
  offer_id    TEXT NOT NULL,
  offer_snapshot JSONB NOT NULL,
  amount_minor BIGINT NOT NULL,
  currency    CHAR(3) NOT NULL,
  added_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE booking_sagas (
  booking_id    UUID PRIMARY KEY REFERENCES bookings(id) ON DELETE CASCADE,
  current_step  TEXT NOT NULL,
  attempt       INT  NOT NULL DEFAULT 0,
  state         JSONB NOT NULL,
  last_error    TEXT,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE supplier_mappings (
  canonical_id  TEXT NOT NULL,
  supplier      TEXT NOT NULL,
  supplier_id   TEXT NOT NULL,
  name          TEXT,
  PRIMARY KEY (supplier, supplier_id)
);
CREATE INDEX ON supplier_mappings (canonical_id);

CREATE TABLE supplier_payouts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id      UUID NOT NULL REFERENCES bookings(id),
  supplier        TEXT NOT NULL,
  gross_minor     BIGINT NOT NULL,
  commission_minor BIGINT NOT NULL,
  net_minor       BIGINT NOT NULL,
  currency        CHAR(3) NOT NULL,
  due_date        DATE,
  paid_at         TIMESTAMPTZ,
  status          TEXT NOT NULL DEFAULT 'PENDING'
                  CHECK (status IN ('PENDING','PAID','DISPUTED','VOID'))
);

CREATE TABLE psp_routes (
  id           SERIAL PRIMARY KEY,
  priority     INT NOT NULL,
  match_currency CHAR(3),
  match_bin_country CHAR(2),
  amount_min_minor BIGINT,
  amount_max_minor BIGINT,
  psp          TEXT NOT NULL,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE wa_templates (
  name        TEXT NOT NULL,
  locale      TEXT NOT NULL,
  category    TEXT NOT NULL,
  meta_id     TEXT NOT NULL,
  body        TEXT NOT NULL,
  PRIMARY KEY (name, locale)
);

CREATE TABLE wa_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id),
  booking_id    UUID REFERENCES bookings(id),
  template_name TEXT NOT NULL,
  locale        TEXT NOT NULL,
  to_e164       TEXT NOT NULL,
  meta_msg_id   TEXT,
  status        TEXT NOT NULL CHECK (status IN ('queued','sent','delivered','read','failed')),
  error_code    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  delivered_at  TIMESTAMPTZ
);

CREATE TABLE consents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind        TEXT NOT NULL,
  version     TEXT NOT NULL,
  given       BOOLEAN NOT NULL,
  given_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_inet     INET,
  user_agent  TEXT
);

CREATE TABLE invoices (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id    UUID NOT NULL REFERENCES bookings(id),
  number        TEXT NOT NULL UNIQUE,
  series        TEXT NOT NULL,
  issued_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  total_minor   BIGINT NOT NULL,
  tax_minor     BIGINT NOT NULL,
  currency      CHAR(3) NOT NULL,
  pdf_url       TEXT NOT NULL,
  market        TEXT NOT NULL,
  legal_entity  TEXT NOT NULL
);
```

---

## API Design

40 endpoints. Authentication / rate limits / error envelope inherited from Basic.

| #  | METHOD | PATH                                          | Auth        | Request                                            | Response                              | Status              |
| -- | ------ | --------------------------------------------- | ----------- | -------------------------------------------------- | ------------------------------------- | ------------------- |
| 1  | POST   | `/auth/register`                              | none        | `{email,password,locale,country}`                  | `{userId}`                            | 201,400,409,429     |
| 2  | POST   | `/auth/login`                                 | none        | `{email,password,captcha}`                         | `{access,refresh}`                    | 200,401,423,429     |
| 3  | POST   | `/auth/refresh`                               | refresh     | `{refresh}`                                        | `{access,refresh}`                    | 200,401             |
| 4  | POST   | `/auth/logout`                                | bearer      | —                                                  | 204                                   | 204                 |
| 5  | POST   | `/auth/mfa/totp/enroll`                       | bearer      | —                                                  | `{secret,qrUri}`                      | 200                 |
| 6  | POST   | `/auth/mfa/totp/verify`                       | bearer      | `{code}`                                           | `{enabled:true}`                      | 200,400             |
| 7  | POST   | `/auth/mfa/challenge`                         | bearer      | `{code}`                                           | `{stepUp:true}`                       | 200,401             |
| 8  | POST   | `/auth/oauth/google`                          | none        | `{idToken}`                                        | `{access,refresh}`                    | 200,401             |
| 9  | POST   | `/auth/oauth/apple`                           | none        | `{idToken}`                                        | `{access,refresh}`                    | 200,401             |
| 10 | GET    | `/auth/sessions`                              | bearer      | —                                                  | `[Session]`                           | 200                 |
| 11 | DELETE | `/auth/sessions/{id}`                         | bearer      | —                                                  | 204                                   | 204                 |
| 12 | GET    | `/auth/me`                                    | bearer      | —                                                  | `User`                                | 200                 |
| 13 | PATCH  | `/auth/me`                                    | bearer      | `Partial<User>`                                    | `User`                                | 200,400             |
| 14 | GET    | `/catalog/currencies`                         | none        | —                                                  | `[Currency]`                          | 200                 |
| 15 | GET    | `/catalog/fx-rate?base&quote`                 | none        | —                                                  | `{rate,asOf,marginBps}`               | 200                 |
| 16 | POST   | `/flights/search`                             | bearer/anon | `FlightSearchReq`                                  | `{searchId,offers[]}`                 | 200,400,502         |
| 17 | POST   | `/flights/price-check`                        | bearer      | `{offerId}`                                        | `{offerId,priceConfirmed,delta}`      | 200,409             |
| 18 | POST   | `/flights/ancillaries`                        | bearer      | `{offerId,paxId,items[]}`                          | `{updatedTotalMinor}`                 | 200,409             |
| 19 | POST   | `/hotels/search`                              | bearer/anon | `HotelSearchReq`                                   | `{searchId,hotels[],partial?:[]}`     | 200                 |
| 20 | GET    | `/hotels/{hotelId}/rooms`                     | bearer/anon | check-in/out, guests                                | `{rooms[]}`                           | 200,404             |
| 21 | POST   | `/hotels/offer/confirm`                       | bearer      | `{offerId}`                                        | `{confirmed,priceDelta}`              | 200,409             |
| 22 | POST   | `/carts`                                      | bearer      | `{displayCurrency}`                                | `Cart`                                | 201                 |
| 23 | POST   | `/carts/{id}/items`                           | bearer      | `{type,offerId}`                                   | `Cart`                                | 200,400             |
| 24 | DELETE | `/carts/{id}/items/{itemId}`                  | bearer      | —                                                  | `Cart`                                | 200                 |
| 25 | POST   | `/carts/{id}/checkout`                        | bearer      | `{contact,passengers[],paymentMethod}` + Idem      | `{bookingId,reference,paymentIntent}` | 201,409,422         |
| 26 | GET    | `/bookings/{id}`                              | bearer      | —                                                  | `Booking`                             | 200                 |
| 27 | GET    | `/bookings`                                   | bearer      | filters + paging                                   | `{items,nextCursor}`                  | 200                 |
| 28 | POST   | `/bookings/{id}/cancel`                       | bearer+OTP  | `{reason,otp}`                                     | `{refundPreview,status}`              | 200,409             |
| 29 | POST   | `/bookings/{id}/change`                       | bearer      | `{changeType,payload}`                             | `{quoteId,deltaMinor}`                | 200                 |
| 30 | GET    | `/bookings/{id}/invoice`                      | bearer      | —                                                  | `Invoice`                             | 200                 |
| 31 | POST   | `/payments/intents`                           | bearer      | `{cartId,paymentMethod}` + Idem                    | `{clientSecret,intentId,psp}`         | 201,409             |
| 32 | POST   | `/payments/refunds`                           | admin/bearer+OTP | `{paymentId,amountMinor,reason}` + Idem       | `{refundId,status}`                   | 201,409             |
| 33 | POST   | `/payments/methods`                           | bearer      | `{psp,token}`                                      | `SavedPaymentMethod`                  | 201,409             |
| 34 | DELETE | `/payments/methods/{id}`                      | bearer      | —                                                  | 204                                   | 204                 |
| 35 | POST   | `/notifications/preferences`                  | bearer      | `{channel,enabled}`                                | `Prefs`                               | 200                 |
| 36 | POST   | `/webhooks/psp/{psp}`                         | sig         | PSP event                                          | 200                                   | 200,400             |
| 37 | POST   | `/webhooks/whatsapp`                          | sig         | Meta event                                         | 200                                   | 200,400             |
| 38 | GET    | `/admin/bookings`                             | admin       | filters                                            | `{items,nextCursor}`                  | 200                 |
| 39 | POST   | `/admin/bookings/bulk`                        | admin       | `{ids[],action,params}`                            | `{queuedJobId}`                       | 202                 |
| 40 | GET    | `/admin/reports/daily`                        | admin       | date                                                | `Report`                              | 200                 |

### Sample: Cart Checkout

```json
POST /carts/c_01J9.../checkout
Idempotency-Key: 9f0a...c1
Authorization: Bearer ...

{
  "contact": { "email": "ahmed@example.com", "phoneE164": "+201001234567" },
  "passengers": [
    { "type": "ADT", "title": "MR", "givenName": "Ahmed", "familyName": "Mahmoud", "dob": "1990-04-12", "doc": { "type": "PASSPORT", "number": "A12345678", "expiry": "2030-01-01", "country": "EG" } }
  ],
  "paymentMethod": { "savedMethodId": "spm_01J9..." },
  "displayCurrency": "EGP"
}
```

Response (201):

```json
{
  "bookingId": "bk_01J9...",
  "reference": "JWL-7K2QZ8",
  "paymentIntent": {
    "psp": "paymob",
    "intentId": "pi_3OnL...",
    "clientSecret": "...",
    "currency": "EGP",
    "amountMinor": 7800000,
    "requires3ds": true
  }
}
```

---

## Authentication & Authorization

### Token Model (delta vs Basic)

- Access JWT 10 min, refresh 30 d (rotated, family-aware).
- New claims: `mfa: bool`, `mfa_methods: ["totp"]`, `step_up_until: <epoch>`.
- `step_up_until` required >= now() for refund, payment-method changes, MFA disable.

### Roles & Permissions

| Role             | Sample Permissions                                                                |
| ---------------- | --------------------------------------------------------------------------------- |
| customer         | `booking:*:self`, `payment:create`, `payment_method:*:self`                       |
| support          | `booking:read:any`, `notification:resend`, `customer:view`                        |
| ops              | `booking:write:any`, `refund:create:<=5000usd`, `supplier:health:view`            |
| admin            | `*`                                                                               |
| finance          | `report:export`, `reconciliation:run`, `payout:approve`                           |
| cms_editor       | `cms:*`, `template:*`                                                             |

4-eye approval enforced for `refund:create:>5000usd` and `payout:approve`.

### Password & MFA

- Argon2id (m=64MiB, t=3, p=2), pepper from KMS.
- TOTP enrollment via QR + backup codes (10 single-use codes, 8 chars each).
- MFA enforced for: staff (mandatory), customers (optional but required for sensitive
  ops).
- Backup codes hashed (Argon2id) on storage.

---

## Security

### OWASP Mitigations (delta)

| Risk      | Mitigation (Pro additions)                                                                       |
| --------- | ------------------------------------------------------------------------------------------------ |
| A01       | Tenant scope check via `userId` AND `accountId` on every read; admin segregation by permission.   |
| A02       | KMS envelope encryption for travel docs; HMAC-based deterministic encryption for lookup keys.    |
| A03       | Drizzle/Prisma parameterization + Zod schema validation on every controller input.               |
| A05       | CSP enforced (not report-only); strict-dynamic + nonces.                                         |
| A07       | TOTP MFA, step-up auth, refresh family invalidation.                                              |
| A09       | OpenTelemetry traces, Sentry, audit log; SIEM integration via Vector → ClickHouse.               |
| A10 SSRF  | Egress proxy with allow-list + DNS pinning; Lambda-style outbound NAT egress IP for supplier IP allow-list. |

### Field-level Encryption

- Travel-document numbers, passport scans (object storage), saved-card BINs hashed
  (not encrypted) for analytics.
- KMS keys per region; per-record DEK encrypted by per-tenant KEK.
- Quarterly key rotation; immediate rotation on compromise.

### Webhook Verification

| PSP    | Method                                                                                |
| ------ | ------------------------------------------------------------------------------------- |
| Stripe | `Stripe-Signature` HMAC-SHA256 over payload + timestamp, ±5 min skew.                  |
| Paymob | HMAC-SHA512 of canonical concatenation per Paymob docs, secret per integration.        |
| Adyen  | HMAC-SHA256 over Notification payload; secret per merchant account.                    |
| Meta   | `X-Hub-Signature-256` HMAC-SHA256 with app secret.                                     |

All webhooks idempotent on `event.id`; replay window 24 h; old events 410 Gone.

### Rate Limiting

- Multi-tier: WAF (Cloudflare) for IP-level DDoS, NestJS bucket for user-level
  business throttle, supplier-circuit-breaker for protective fallbacks.

### Secrets Management

- AWS Secrets Manager for runtime; SOPS-encrypted YAML for IaC bootstrap.
- Secret rotation: AWS RDS managed master rotation; Stripe/Paymob/Adyen quarterly
  rotation via runbook.

---

## Booking Workflow

### Saga

```
                   ┌────────────────────────────────────────┐
                   │              State Machine             │
                   └────────────────────────────────────────┘
   create-cart ──▶ OPEN_CART ──checkout──▶ DRAFT_BOOKING ──payment-intent──▶ PENDING_PAYMENT
                                                                                  │
                                              payment.succeeded webhook           │
                                                                                  ▼
                                                                       SAGA RUNNING
                                                                                  │
                          ┌───────────── step graph (per item) ──────────────────┐│
                          ▼                                                       ▼│
                FLIGHT.book ──▶ FLIGHT.ticket ──▶ HOTEL.book ──▶ all_ok? ──▶ CAPTURE_PAYMENT
                          │           │              │           no              │
                          │ failure   │ failure      │ failure                   │
                          ▼           ▼              ▼                           ▼
                COMPENSATE: void supplier + void payment ──▶ FAILED        CONFIRMED
                                                                                  │
                                                                                  ▼
                                                                          NOTIFY (email + WA)
```

### Step Definitions (`booking_sagas.current_step`)

| Step                  | Action                                          | Idem key             | Compensation                            |
| --------------------- | ----------------------------------------------- | -------------------- | --------------------------------------- |
| `PRICE_CONFIRM`       | Re-quote offer with each supplier               | bookingId            | none                                    |
| `PAYMENT_HOLD`        | Create or use PaymentIntent (manual capture)    | bookingId            | cancel PI                               |
| `SUPPLIER_BOOK_<i>`   | Issue PNR / hotel booking per item              | bookingId+itemSeq    | supplier cancel (or void uncaptured)    |
| `PAYMENT_CAPTURE`     | Capture PI                                      | bookingId            | refund                                  |
| `NOTIFY`              | Enqueue notifications                            | bookingId            | none                                    |
| `INVOICE`             | Generate invoice                                | bookingId            | none                                    |

### Timeouts

| Step                | Hard timeout | Retry policy                                  |
| ------------------- | ------------ | --------------------------------------------- |
| PRICE_CONFIRM       | 8 s          | 1 retry                                       |
| PAYMENT_HOLD        | 8 s          | 2 retries                                     |
| SUPPLIER_BOOK_*     | 30 s         | 3 retries exp backoff; on final → compensate  |
| PAYMENT_CAPTURE     | 10 s         | 5 retries exp backoff; on final → page on-call |
| NOTIFY              | 5 min queued | 5 retries                                     |
| INVOICE             | 60 s         | 3 retries                                     |

---

## Flight Flow (Pro additions)

- Branded fares: optional second call (`Flight Offers Pricing` with `include=detailed-fare-rules`)
  cached 5 min.
- Ancillaries: `Seat Map Display`, `Flight Order Management` for SSR add.
- Self-service change: cancel + rebook in same saga with delta charge / refund.

```
search → fanout cache → display → select → priceCheck → seat-map(opt) → checkout → PNR → ticket → SSR (ancillaries) → capture → emailtix + WA
```

---

## Hotel Flow (multi-provider)

```
client search ──▶ aggregator.search ──┬─▶ amadeus.search   ─┐
                                       ├─▶ hotelbeds.search ─┼─▶ merge + dedup + normalize ──▶ cache 10m ──▶ client
                                       └─▶ booking.search    ─┘

select hotel ──▶ aggregator.rooms(canonicalHotelId)
                  └─▶ fan-out to suppliers that have the canonical id
                  └─▶ merge offers, prefer cheapest equivalent room

select offer ──▶ supplier-of-record routed thereafter:
    confirm   → supplier.offerConfirm(offerId)
    book      → supplier.book(offerId, guest)
    cancel    → supplier.cancel(confirmation)
```

### Aggregator Internals

- Concurrent fan-out with `Promise.allSettled` + per-supplier 1.8 s timeout.
- Supplier failures degrade not fail; banner returned on `partial=true`.
- Deduplication uses Giata canonical ID; fallback fuzzy match (name + lat-lng within 50m).
- Equivalence: same room category + same board + same refund flag.
- Cache layered: per-supplier raw cache (60s), merged response cache (10 min).

### Voucher Generation

- Worker `voucher.generate` uses Puppeteer + locale-specific React template, signs PDF
  metadata, uploads to S3 (`s3://jawla-prod-vouchers/{bookingId}.pdf`), pre-signed URL
  expires 30d.

---

## Payment Flow (multi-PSP, automated refunds)

### Routing

```
choose_psp(currency, binCountry, amount, customerRiskScore):
  for route in psp_routes order by priority asc:
    if route.matches(currency, binCountry, amount):
      return route.psp
  return fallback (Stripe)
```

Examples:

| Condition                                | PSP     |
| ---------------------------------------- | ------- |
| currency = EGP                           | Paymob  |
| currency = USD, BIN country = EG         | Paymob  |
| currency in (EUR,GBP), amount > €1000    | Adyen   |
| anything else                            | Stripe  |

### Charge Flow (unchanged from Basic conceptually; PSP-abstracted)

```
PI create ──▶ 3DS / SCA ──▶ hold (manual capture) ──▶ supplier fulfill ──▶ capture ──▶ confirm
```

### Refund Flow (automated)

```
trigger:
   - customer self-service cancel (within policy)
   - ops dashboard refund
   - rule engine (e.g., supplier-cancel auto-refund)

worker payment.refund:
   verify booking eligibility + amount cap
   write `payments.refund_requests` row (idempotency_key)
   call psp.refunds.create(paymentIntent, amount, currency=originalCapture, idemKey)
   on success: payments.refunded_amount_minor += amount
                 if fully refunded: booking.status = REFUNDED
                 else: booking.status = PARTIAL_REFUND
   notify customer (email + WA)
```

### Reconciliation

- Nightly job pulls PSP payout reports → ledger entries.
- 3-way match: `bookings.total` ↔ `payments` ↔ `psp.payout_line`.
- Diff > 0.5% flagged for finance review with details.

---

## Admin Modules

| Page                        | Capabilities                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| KPI dashboard               | GMV, bookings, conversion, refund rate, FX P&L, take rate — daily/weekly/monthly tabs.    |
| Bookings workbench          | Filter + bulk actions (export, refund, tag, send WA), customer-360 quick-jump.            |
| Customer-360                | Bookings, payments, notifications, sessions, MFA state, devices.                          |
| Refund console              | Refund queue, 4-eye approvals, refund-preview tool, status timeline.                      |
| Dunning                     | Failed payments, retry timeline, manual retry, exclude from auto-retry.                   |
| Supplier health             | Per-supplier latency p50/p95/p99, error breakdown, circuit-breaker state.                 |
| Catalog / Hotel mapping     | Upload Giata mappings, fuzzy-match audit tool, rate-parity alerts.                        |
| Finance reports             | GMV by market, refunds by reason, FX P&L, supplier payouts.                               |
| CMS                         | Marketing pages, banners, FAQ; localized; staged → published.                             |
| Notification templates      | Edit copy + variables, send test, version + rollback; WhatsApp template metadata.         |
| Feature flags               | Per-env toggles, audit, percentage rollout per user cohort.                               |
| Users & Roles               | RBAC management; create staff; assign role; MFA enforcement.                              |
| Audit log                   | Immutable, filter by actor / target / action; CSV export.                                 |
| Settings                    | PSP routes, FX margins, retry policies (read by services dynamically).                    |

---

## Deployment

### Topology

- **Frontend**: Vercel, two regions (`fra1` primary, `cdg1` standby ISR mirror).
- **Backend**: Fly.io org `jawla`, region `fra` primary + `cdg` warm standby (read-only during normal ops).
- **Postgres**: managed Postgres (e.g., Neon prod or Crunchy) with sync replica in `fra` AZ-b and async cross-region replica in `cdg`.
- **Redis**: Upstash Cluster, multi-AZ, dual region replication for queue durability.
- **Queues**: BullMQ broker per region; jobs partitioned by queue.
- **Object storage**: S3 buckets, cross-region replication for `vouchers` and `invoices`.

### Pipelines

| Stage             | Steps                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| lint              | `pnpm lint`, `tsc --noEmit`                                                          |
| test:unit         | Jest + RTL, coverage gate ≥ 85% lines                                                |
| test:integration  | spin up Postgres + Redis + WireMock for suppliers                                    |
| test:contract     | Pact verify against pinned supplier stubs                                            |
| build             | FE + BE; SBOM (cyclonedx) + Trivy + Snyk; sign image (Cosign)                        |
| deploy:preview    | Vercel preview + Fly app `pr-<n>` for E2E                                            |
| e2e               | Playwright suite against preview                                                     |
| deploy:staging    | Fly + Vercel staging on merge to `main`                                              |
| smoke:staging     | Synthetic booking dry-run; supplier sandbox                                          |
| deploy:prod       | Manual approval → Fly blue/green + Vercel `--prod` canary 5% → 25% → 100%            |
| post-deploy       | Synthetic /healthz, error-rate watcher 30 min; auto-rollback on regression            |

### Environment Variables (additions)

| Var                                   | Purpose                                  |
| ------------------------------------- | ---------------------------------------- |
| `HOTELBEDS_API_KEY`/`_SECRET`         | HotelBeds API                            |
| `BOOKING_AFFILIATE_KEY`               | Booking Affiliate                        |
| `PAYMOB_API_KEY`/`_HMAC_SECRET`       | Paymob                                   |
| `ADYEN_API_KEY`/`_HMAC_SECRET`        | Adyen                                    |
| `WABA_ACCESS_TOKEN`/`PHONE_NUMBER_ID` | WhatsApp                                 |
| `FX_PROVIDER_KEY`                     | openexchangerates                        |
| `KMS_KEY_ID`                          | Field-level encryption                   |

---

## Logging

- Pino structured JSON.
- Required fields (Pro additions): `tenantId`, `requestRegion`, `pspId`, `supplierId`,
  `sagaStep`, `attempt`.
- Sensitive redaction extended to: `psp_token`, `wa_token`, `doc_number`, `card_*`,
  `iban`, `tax_id`.
- Log routing: stdout → Vector → ClickHouse (analytics) + S3 cold storage.
- Retention: 90 d hot, 2 y cold; audit logs 7 y S3 Object Lock.

---

## Monitoring

- Stack: Sentry (errors + perf), Grafana Cloud (metrics + logs + traces), PagerDuty.
- OpenTelemetry SDK exports OTLP to Tempo / Loki / Mimir.

### Metrics (additions)

| Metric                                  | Notes                                       |
| --------------------------------------- | ------------------------------------------- |
| `aggregator_supplier_latency_ms`        | per supplier per op                          |
| `aggregator_supplier_error_total`       | per supplier per error code                  |
| `aggregator_partial_results_total`      | counts of degraded responses                  |
| `payment_route_choice_total`            | per PSP route picked                          |
| `payment_refund_latency_ms`             | request → settled                             |
| `fx_margin_bps`                         | applied margin distribution                   |
| `wa_message_delivery_total`             | per status                                    |
| `saga_step_duration_ms`                 | per step                                      |
| `saga_compensation_total`               | per failed step                               |

### Alerts

| Condition                                                       | Severity | Routing      |
| --------------------------------------------------------------- | -------- | ------------ |
| API p95 > 600 ms for 5 min                                      | page     | PagerDuty    |
| Aggregator partial-results > 20% for 10 min                     | warn     | #ops         |
| Saga compensation rate > 2% for 15 min                          | page     | PagerDuty    |
| PSP webhook lag > 3 min                                         | page     | PagerDuty    |
| WA delivery failure > 10% for 15 min                            | warn     | #ops         |
| Refund SLA breach (> 24h pending)                               | page     | finance OnCall |
| Replication lag > 15 s                                          | warn     | #ops         |
| 5xx rate > 0.5% for 5 min                                       | page     | PagerDuty    |
| Auth anomalies (impossible travel, brute force)                 | page     | security OnCall |

---

## Testing Strategy

| Layer            | Tooling                                | Target                        |
| ---------------- | -------------------------------------- | ----------------------------- |
| Unit             | Jest                                   | 85% lines BE; 80% FE          |
| Integration      | Jest + testcontainers (PG, Redis)      | All services + repos          |
| Contract         | Pact for each supplier + PSP            | All adapters                  |
| Aggregator       | Property-based (fast-check)             | Dedup invariants              |
| E2E              | Playwright (multi-locale, RTL)         | Critical paths + smoke        |
| Load             | k6 baseline + Argo workflow             | NFR-007 / 008 sustained        |
| Accessibility    | axe + manual WCAG audit                 | Zero serious                  |
| Security         | OWASP ZAP, Burp Suite (manual quarterly)| Zero highs unmitigated        |
| Chaos            | Toxiproxy in staging supplier calls    | Survive 1 supplier outage      |

---

## Acceptance Tests

> Tier-additive: AT-001..024 from Basic remain valid. Pro adds:

| ID     | Title                                       | Given                                                 | When                                          | Then                                                                                  |
| ------ | ------------------------------------------- | ----------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| AT-025 | Multi-currency cart                         | Cart in EGP                                            | I switch displayCurrency to USD               | Totals re-computed via FX snapshot; FX margin disclosed.                              |
| AT-026 | Saved-traveller prefill                     | I have a saved traveller                              | I start a new booking                         | Pax forms pre-filled; explicit "use saved" toggle.                                    |
| AT-027 | Aggregator dedup                            | 3 suppliers return the same hotel (Giata=X123)         | I search                                      | Single hotel card; best-price badge shows supplier-of-record + price.                 |
| AT-028 | Supplier degradation                        | HotelBeds times out                                   | I search                                      | Results still returned; banner `partial=true` with retry hint.                        |
| AT-029 | Stop-sell honor                             | Booking Affiliate marks hotel sold-out                | I attempt to book within 60 s                  | 409 `SUPPLIER_SOLD_OUT`; alternatives suggested.                                       |
| AT-030 | Cart hold expiry                            | Cart inactive for 21 minutes                          | I attempt checkout                            | 410 `CART_EXPIRED`; re-create flow.                                                    |
| AT-031 | Branded fare                                | Carrier exposes 3 fare bundles                        | I view offer                                  | LITE/STANDARD/FLEX shown; price + perks per bundle.                                    |
| AT-032 | Ancillary baggage                           | Offer supports extra-bag                              | I add 1 bag                                   | Updated total reflects ancillary price; capture-time SSR is added to PNR.             |
| AT-033 | Saga rollback                               | Hotel.book fails after Flight.book succeeded          | Saga compensates                              | Flight Order canceled; payment voided; booking FAILED.                                |
| AT-034 | PSP routing — Paymob for EGP                 | Currency EGP                                          | I create payment intent                       | PSP=`paymob`; intent created in Paymob.                                               |
| AT-035 | PSP routing — Adyen for €1500 EUR            | Currency EUR, amount €1500                            | I create payment intent                       | PSP=`adyen`.                                                                          |
| AT-036 | Automated refund                            | Full cancel by customer within policy                 | Cancel request                                | Refund processed via PSP automatically; booking → REFUNDED; email + WA sent.          |
| AT-037 | Partial refund                              | Customer cancels 1 of 2 items                         | Cancel request                                | Partial refund; status PARTIAL_REFUND; invoice annotated.                              |
| AT-038 | WhatsApp confirmation                       | User opted in to WA                                    | Booking CONFIRMED                              | Approved template sent; delivery status updated via webhook.                          |
| AT-039 | WA delivery fallback                        | WA template fails delivery                            | 5 min elapse without delivered callback        | Email fallback sent; admin notified.                                                  |
| AT-040 | MFA TOTP enroll/verify                      | I enroll TOTP via QR                                   | I supply correct code                          | `mfa: true`; backup codes generated; subsequent sensitive ops require step-up.        |
| AT-041 | Step-up before refund                       | I am MFA-enabled customer                              | I request refund without recent step-up        | 401 `STEP_UP_REQUIRED`; retry with TOTP succeeds.                                     |
| AT-042 | Saved card management                       | I add card via PSP token                              | I delete card                                 | Saved row deleted; default card reassigned if needed.                                  |
| AT-043 | Invoice generation                          | I am a confirmed EG booking                            | I request invoice                              | Sequential EG invoice number; VAT computed; PDF generated and S3-stored.              |
| AT-044 | Admin bulk export                           | I am admin with 1k bookings filtered                  | I export CSV                                  | Background job; signed URL emailed when ready.                                         |
| AT-045 | 4-eye refund                                | Refund $7,000 attempt                                  | I submit                                      | Status `PENDING_APPROVAL`; second admin must approve to finalize.                     |
| AT-046 | Reconciliation diff alert                   | PSP payout missing one booking                        | Nightly recon job runs                        | Diff > 0.5% triggers Slack alert to finance.                                          |

---

## Appendix A — Migration from Basic Tier

| Concern                  | Migration step                                                                   |
| ------------------------ | -------------------------------------------------------------------------------- |
| Schema                   | Forward-only migrations; backfill `display_currency` on existing bookings.       |
| FX                       | Backfill fx_rate per existing booking with audited "as_of" date.                 |
| PSP                      | Default route = Stripe until Paymob/Adyen certified; routing table seeded.      |
| WhatsApp                 | Opt-in form added on dashboard; transactional templates pre-approved by Meta.    |
| Admin                    | New admin app side-by-side; Basic admin remains read-only for 30 days.           |
| Hotel aggregator         | Shadow-traffic Amadeus-only behind aggregator before HotelBeds/Booking go-live.  |

— *End of document — Jawla SRS Professional v1.0* —
