# Software Requirements Specification — Jawla Tours OTA (Basic Tier)

## Document Control

| Field             | Value                                                  |
| ----------------- | ------------------------------------------------------ |
| Document Title    | Jawla Tours OTA — SRS (Basic Tier)                     |
| Document ID       | JAWLA-SRS-BASIC                                        |
| Version           | 1.0                                                    |
| Issue Date        | 2026-06-29                                             |
| Status            | Approved — Baseline                                    |
| Classification    | Internal — Engineering / Product                       |
| Owner             | Jawla Engineering                                      |
| Prepared By       | Platform Architecture Group                            |
| Reviewed By       | CTO, Head of Product, QA Lead                          |
| Approved By       | CTO                                                    |
| Distribution      | Engineering, Product, QA, DevOps, Security             |

### Revision History

| Version | Date       | Author              | Section(s)      | Change Summary                                            |
| ------- | ---------- | ------------------- | --------------- | --------------------------------------------------------- |
| 0.1     | 2026-05-12 | Platform Arch Group | All             | Initial draft (gap analysis from discovery workshops)     |
| 0.2     | 2026-05-28 | Platform Arch Group | FR, NFR, API    | Added flight + hotel FR set after Amadeus PoC             |
| 0.3     | 2026-06-10 | QA Lead             | Acceptance      | Added AT-001..AT-024 from BDD review                      |
| 0.4     | 2026-06-19 | Security            | Security, Auth  | Hardened OWASP mitigations, added OTP for refunds         |
| 1.0     | 2026-06-29 | CTO                 | All             | Baseline approval for Basic Tier MVP                      |

### Glossary

| Term      | Meaning                                                                            |
| --------- | ---------------------------------------------------------------------------------- |
| OTA       | Online Travel Agency                                                               |
| PNR       | Passenger Name Record (Amadeus reservation handle)                                 |
| GDS       | Global Distribution System                                                         |
| BSP       | Bank Settlement Plan                                                               |
| 3DS       | 3-D Secure (cardholder authentication, EMV 3DS 2.x)                                |
| PCI DSS   | Payment Card Industry Data Security Standard                                       |
| SCA       | Strong Customer Authentication (PSD2)                                              |
| RBAC      | Role-Based Access Control                                                          |
| OTP       | One-Time Password (TOTP / numeric SMS or email code)                               |
| FR        | Functional Requirement                                                             |
| NFR       | Non-Functional Requirement                                                         |
| AT        | Acceptance Test                                                                    |
| BCD       | Booking Confirmation Document (e-ticket / voucher)                                 |

---

## Introduction

### Purpose

This document defines the **Basic Tier** software requirements for *Jawla Tours*, an
Online Travel Agency platform. The Basic Tier represents the MVP scope intended for the
first production launch in a single region (eu-central-1 primary, no multi-region
failover) targeting the Egyptian and pan-Arab market. It establishes the agreed scope,
constraints, and quality bars that the engineering organization commits to deliver.

The audience for this document is: software engineers, QA engineers, DevOps,
security reviewers, product managers, and external auditors performing PCI scope review.

### Scope

In scope for the Basic Tier:

- A consumer-facing booking funnel for **flights and hotels** rendered by the existing
  Next.js marketing site, extended with new authenticated booking modules.
- A NestJS backend exposing **~20 REST endpoints** for search, booking, payment, and
  notifications.
- One flight provider (**Amadeus Self-Service / Enterprise Test endpoints**) and
  **one hotel provider** (Amadeus Hotel Search v3 + Hotel Booking v2).
- Card payment via **Stripe** (single PSP for MVP), with Paymob/Adyen designed for but
  not enabled in this tier.
- Email notifications via a transactional provider (SES or Resend).
- A basic internal admin console for support staff to view bookings, refunds, and audit
  trail. **Manual refunds via the PSP dashboard are acceptable in this tier.**
- Single primary currency (USD) at checkout, with display-only conversion to EGP, SAR, AED.

Out of scope for the Basic Tier (deferred to Professional / Enterprise):

- Mobile apps, B2B agent portal, white-label theming, fraud ML, dynamic pricing engine.
- WhatsApp Business notifications.
- Multi-region active-active deployment.
- Automated refund orchestration.
- Multi-provider hotel aggregation.

### Definitions, Acronyms, and Abbreviations

See the Glossary table above. Industry-standard travel terminology follows IATA
Resolution 830a and Amadeus Self-Service API conventions.

### References

| Ref ID | Reference                                                                    |
| ------ | ---------------------------------------------------------------------------- |
| R-01   | Amadeus Self-Service API Reference (v3, retrieved 2026-05)                   |
| R-02   | Stripe API Reference (2025-11-20 API version)                                |
| R-03   | PCI DSS v4.0 — SAQ A-EP scoping guidance                                     |
| R-04   | OWASP Top 10:2021 + OWASP ASVS 4.0.3 (Level 2)                               |
| R-05   | EU GDPR Articles 5, 6, 17, 32; Egyptian Data Protection Law 151/2020         |
| R-06   | IATA Resolution 890 (Card payment acceptance)                                |
| R-07   | ISO 4217 (Currencies), ISO 8601 (Dates), ISO 3166-1 (Country codes)         |
| R-08   | RFC 6749 (OAuth 2.0), RFC 7519 (JWT), RFC 6238 (TOTP)                        |
| R-09   | WCAG 2.1 AA, EN 301 549 v3.2.1                                               |
| R-10   | Next.js 15 App Router, NestJS 10 documentation                               |

### Document Conventions

- Functional requirements are identified as `FR-XXX` and are testable (have an AT).
- Non-functional requirements use `NFR-XXX`.
- Acceptance criteria use Gherkin-style `Given / When / Then`.
- MUST, SHOULD, MAY follow RFC 2119 semantics.
- HTTP status code use follows RFC 9110.

---

## Functional Requirements

### Module: Authentication (FR-001 — FR-018)

| ID     | Requirement                                                                                                | Priority |
| ------ | ---------------------------------------------------------------------------------------------------------- | -------- |
| FR-001 | The system MUST allow registration with email + password (min 10 chars, zxcvbn score ≥ 3).                  | MUST     |
| FR-002 | The system MUST verify the email address via a signed token (24 h TTL) before enabling bookings.            | MUST     |
| FR-003 | The system MUST support login with email + password and return an access (15 min) + refresh (30 d) JWT.     | MUST     |
| FR-004 | The system MUST support refresh-token rotation; reused refresh tokens MUST invalidate the entire family.    | MUST     |
| FR-005 | The system MUST allow a forgotten-password flow via signed email link (30 min TTL, one-shot).               | MUST     |
| FR-006 | The system MUST lock an account for 15 minutes after 5 failed login attempts in a 10-minute window.         | MUST     |
| FR-007 | The system MUST allow logout that revokes the active refresh token.                                         | MUST     |
| FR-008 | The system MUST hash passwords with Argon2id (m=64 MiB, t=3, p=2).                                          | MUST     |
| FR-009 | The system MUST allow profile update (name, phone, locale, default currency display).                       | MUST     |
| FR-010 | The system MUST allow account deletion, soft-deleting personal data after a 30-day grace period.            | MUST     |
| FR-011 | The system MUST require email OTP confirmation before applying any refund initiated by a customer.          | MUST     |
| FR-012 | The system MUST log every auth event (login, logout, password reset, OTP issuance) to the audit trail.      | MUST     |
| FR-013 | The system SHOULD support Google OAuth single sign-on (deferred-capable; flag-gated in Basic).              | SHOULD   |
| FR-014 | The system MUST enforce JWT signature with RS256, keys rotated every 90 days.                                | MUST     |
| FR-015 | The system MUST expose `/auth/me` returning the authenticated user profile + permissions array.              | MUST     |
| FR-016 | The system MUST enforce CAPTCHA (hCaptcha) on register, login, and password-reset endpoints.                | MUST     |
| FR-017 | The system MUST allow staff (role=`admin`) to impersonate a user for support, recording the action.         | MUST     |
| FR-018 | The system MUST expire idle sessions after 24 h of no refresh, even if refresh-token TTL has not elapsed.   | MUST     |

### Module: Flights (FR-019 — FR-032)

| ID     | Requirement                                                                                                                          | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| FR-019 | The system MUST allow searching one-way and round-trip flights by origin, destination, departure date, return date, pax counts.       | MUST     |
| FR-020 | The system MUST support up to 9 passengers per booking (adults+children+infants, IATA limit).                                          | MUST     |
| FR-021 | The system MUST display fare per pax type and total fare, including taxes and carrier surcharges.                                     | MUST     |
| FR-022 | The system MUST cache Amadeus flight-offer responses for ≤ 10 minutes keyed on `(origin,dest,date,pax,cabin)`.                         | MUST     |
| FR-023 | The system MUST run a price-confirm call against Amadeus Flight Offers Price before showing the checkout page.                         | MUST     |
| FR-024 | If price has changed by more than 0.5%, the system MUST surface a confirmation dialog before allowing checkout.                        | MUST     |
| FR-025 | The system MUST collect passenger details (title, given/family name, DOB, document type/number/expiry/issuing country) at checkout.    | MUST     |
| FR-026 | The system MUST validate that passport expiry ≥ 6 months after return date.                                                            | MUST     |
| FR-027 | The system MUST issue a PNR via Amadeus Flight Create Orders after successful payment authorization.                                   | MUST     |
| FR-028 | The system MUST retry PNR creation up to 3× with exponential backoff on 5xx; voiding charge if all retries fail.                       | MUST     |
| FR-029 | The system MUST support cabin classes: ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST.                                                      | MUST     |
| FR-030 | The system MUST support fare filters: number of stops, max duration, carriers, departure window.                                       | MUST     |
| FR-031 | The system MUST send the e-ticket PDF as an email attachment within 60 s of ticketing.                                                 | MUST     |
| FR-032 | The system MAY display a baggage allowance summary when the carrier supplies it; absence is not blocking.                              | MAY      |

### Module: Hotels (FR-033 — FR-044)

| ID     | Requirement                                                                                                                   | Priority |
| ------ | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-033 | The system MUST allow hotel search by city (IATA city code), check-in/out dates, adults, children with ages.                   | MUST     |
| FR-034 | The system MUST display hotels with name, rating, location, image, headline price (per night, currency).                       | MUST     |
| FR-035 | The system MUST paginate results with 20 per page and support sort by price, rating, distance.                                 | MUST     |
| FR-036 | The system MUST fetch room offers per hotel on detail-page load with a fresh availability call.                                | MUST     |
| FR-037 | The system MUST display the cancellation policy (refundable / non-refundable / deadline) before checkout.                      | MUST     |
| FR-038 | The system MUST collect guest details (lead guest full name, contact) and optional special requests.                           | MUST     |
| FR-039 | The system MUST confirm price via Amadeus Hotel Offer Search by `offerId` immediately before payment.                          | MUST     |
| FR-040 | The system MUST create a hotel booking via Amadeus Hotel Bookings v2 after payment authorization.                              | MUST     |
| FR-041 | The system MUST email a hotel voucher with confirmation number, hotel contact, dates, and policy summary.                      | MUST     |
| FR-042 | The system MUST handle Amadeus rebook errors by voiding the payment and surfacing a clear retry prompt.                        | MUST     |
| FR-043 | The system MUST honor the provider's currency and convert display only (no FX risk taken in Basic).                            | MUST     |
| FR-044 | The system MUST persist the canonical Amadeus confirmation number on the booking record.                                       | MUST     |

### Module: Booking (FR-045 — FR-055)

| ID     | Requirement                                                                                              | Priority |
| ------ | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-045 | The system MUST issue a server-side `bookingId` (UUIDv7) before payment is initiated.                     | MUST     |
| FR-046 | The system MUST persist booking with status: `DRAFT`, `PENDING_PAYMENT`, `CONFIRMED`, `FAILED`, `CANCELLED`, `REFUNDED`. | MUST     |
| FR-047 | The system MUST treat the booking endpoint as idempotent using an `Idempotency-Key` header.               | MUST     |
| FR-048 | The system MUST expire `DRAFT` bookings after 15 minutes.                                                 | MUST     |
| FR-049 | The system MUST expire `PENDING_PAYMENT` bookings after 30 minutes (Stripe PI auto-cancel aligns).        | MUST     |
| FR-050 | The system MUST allow a user to view all of their bookings paginated by date desc.                        | MUST     |
| FR-051 | The system MUST allow a user to cancel a refundable booking before the supplier's deadline.               | MUST     |
| FR-052 | The system MUST attach an immutable audit-log row per status transition.                                  | MUST     |
| FR-053 | The system MUST rollback supplier reservation if final ticket/voucher issuance fails.                     | MUST     |
| FR-054 | The system MUST produce a `bookingReference` (8-char alphanumeric, Crockford base32) shown to the user.   | MUST     |
| FR-055 | The system MUST emit domain events (`BookingConfirmed`, `BookingCancelled`) onto BullMQ for downstreams.  | MUST     |

### Module: Payment (FR-056 — FR-064)

| ID     | Requirement                                                                                                          | Priority |
| ------ | -------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-056 | The system MUST create a Stripe PaymentIntent in `manual` capture mode at checkout.                                   | MUST     |
| FR-057 | The system MUST require 3DS2 challenge (request_three_d_secure=`automatic`).                                          | MUST     |
| FR-058 | The system MUST capture the PaymentIntent only after the supplier ticket/voucher issuance succeeds.                   | MUST     |
| FR-059 | The system MUST reconcile via Stripe webhooks (`payment_intent.succeeded`, `.payment_failed`, `charge.refunded`).     | MUST     |
| FR-060 | The system MUST verify Stripe webhook signatures with the shared secret.                                              | MUST     |
| FR-061 | The system MUST be tolerant to webhook duplicates (idempotent on `event.id`).                                          | MUST     |
| FR-062 | The system MUST surface a payment-error code mapping to user-friendly localized message.                              | MUST     |
| FR-063 | In Basic, refunds MAY be issued manually by ops via Stripe dashboard; the system MUST reconcile via webhook.           | MAY      |
| FR-064 | The system MUST never store PAN, CVV, or full track data — Stripe Elements tokenization only.                          | MUST     |

### Module: Notifications (FR-065 — FR-070)

| ID     | Requirement                                                                                                  | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-065 | The system MUST send a transactional email on: booking confirmed, payment failed, cancellation, refund.       | MUST     |
| FR-066 | The system MUST queue all outbound notifications on BullMQ (`notifications.email` queue).                    | MUST     |
| FR-067 | The system MUST retry email sends up to 5× with exponential backoff (base 30 s, factor 2).                   | MUST     |
| FR-068 | The system MUST localize emails into AR (default for Egypt), EN, FR (locale resolved from user profile).      | MUST     |
| FR-069 | The system MUST suppress duplicate notifications (de-dup key = `${eventId}:${userId}:${template}`).          | MUST     |
| FR-070 | The system MUST honor user notification preferences (transactional emails cannot be opted out).               | MUST     |

### Module: Admin (FR-071 — FR-078)

| ID     | Requirement                                                                                                 | Priority |
| ------ | ----------------------------------------------------------------------------------------------------------- | -------- |
| FR-071 | The admin console MUST allow searching bookings by reference, customer email, supplier ref, status, date.    | MUST     |
| FR-072 | The admin console MUST allow viewing booking detail with full audit log.                                     | MUST     |
| FR-073 | The admin console MUST allow staff to trigger a notification resend.                                         | MUST     |
| FR-074 | The admin console MUST allow staff to mark a booking as refunded after manual Stripe refund (reconciliation). | MUST     |
| FR-075 | The admin console MUST allow staff to view users (search by email, see basic profile, last login).           | MUST     |
| FR-076 | The admin console MUST be protected by role `admin` and require re-authentication every 12 h.                | MUST     |
| FR-077 | The admin console MUST log every staff action with actor, target, before/after diff.                         | MUST     |
| FR-078 | The admin console SHOULD provide a daily KPI tile (bookings today, GMV today, failure rate).                 | SHOULD   |

---

## Non-functional Requirements

### Performance

| ID      | Requirement                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-001 | Flight search endpoint p95 latency ≤ 2.5 s (Amadeus call inclusive), p99 ≤ 4 s.                          |
| NFR-002 | Hotel search endpoint p95 latency ≤ 2.0 s.                                                               |
| NFR-003 | All non-supplier-bound endpoints p95 ≤ 250 ms.                                                           |
| NFR-004 | Largest Contentful Paint (LCP) of home page ≤ 2.0 s on 4G profile.                                       |
| NFR-005 | Time-to-Interactive (TTI) of search results page ≤ 3.5 s.                                                 |
| NFR-006 | Search cache hit ratio target ≥ 35% during business hours.                                                |

### Scalability

| ID      | Requirement                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-007 | The system MUST sustain 50 RPS booking-funnel sessions sustained for 1 h.                                |
| NFR-008 | The system MUST sustain 300 RPS read-only catalog endpoints with horizontal scale.                       |
| NFR-009 | BullMQ workers MUST scale horizontally to 4 replicas without code change.                                |
| NFR-010 | Database connections MUST be pooled via PgBouncer (transaction mode, max 200 client conns).              |

### Availability

| ID      | Requirement                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-011 | Target monthly uptime 99.5% (≤ 3 h 39 min downtime).                                                     |
| NFR-012 | RPO ≤ 15 min, RTO ≤ 4 h for full DR in primary region.                                                   |
| NFR-013 | Postgres MUST be deployed with one synchronous standby replica.                                          |
| NFR-014 | Redis MUST be deployed with one replica + Sentinel.                                                       |
| NFR-015 | Planned-maintenance windows MUST be announced ≥ 72 h in advance.                                          |

### Security

| ID      | Requirement                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-016 | TLS 1.2+ mandatory on all ingress; HSTS `max-age=63072000; includeSubDomains; preload`.                  |
| NFR-017 | Data at rest encrypted with AES-256 (Postgres TDE, Redis disk encryption).                               |
| NFR-018 | Secrets MUST live in Vercel Encrypted Env (FE) and AWS Secrets Manager (BE).                             |
| NFR-019 | Vulnerabilities of severity ≥ High MUST be patched within 7 days; Critical within 24 h.                  |
| NFR-020 | An external pentest MUST be performed at least annually.                                                  |

### Internationalization

| ID      | Requirement                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-021 | The system MUST support AR (RTL), EN, FR for all user-facing surfaces.                                   |
| NFR-022 | All dates MUST be rendered in user-selected timezone; storage MUST be UTC.                               |
| NFR-023 | All monetary values MUST include explicit ISO 4217 currency codes.                                       |

### Accessibility

| ID      | Requirement                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-024 | The site MUST conform to WCAG 2.1 AA (semantic landmarks, focus order, color contrast ≥ 4.5:1).          |
| NFR-025 | All interactive elements MUST be keyboard operable; visible focus indicators required.                   |
| NFR-026 | Forms MUST expose error messages programmatically with `aria-describedby`.                               |

### Compliance

| ID      | Requirement                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-027 | PCI scope: SAQ A-EP. No PAN ever touches our servers.                                                    |
| NFR-028 | GDPR: data-export and data-deletion paths MUST be available within 30 days of request.                   |
| NFR-029 | Cookie consent: explicit opt-in for non-essential cookies; granular controls.                            |

---

## System Architecture

The Basic Tier deploys a single primary region with a CDN-fronted Next.js layer in
front of a containerized NestJS API, backed by Postgres + Redis + BullMQ.

```
┌──────────┐       ┌────────────┐       ┌─────────────────────┐      ┌──────────────────────┐
│  Client  │──TLS─▶│ Vercel CDN │──TLS─▶│   Next.js 15 (RSC)  │──┬──▶│  NestJS API (Fly.io) │
│ Browser  │       │  (Edge)    │       │  - Marketing pages  │  │   │  - REST controllers  │
└──────────┘       └────────────┘       │  - Booking funnel   │  │   │  - Domain services   │
                                        │  - Server Actions   │  │   │  - Idempotency layer │
                                        └─────────────────────┘  │   └──────────┬───────────┘
                                                                 │              │
                                                                 │              ▼
                                                                 │      ┌───────────────┐
                                                                 │      │  PgBouncer    │
                                                                 │      └───────┬───────┘
                                                                 │              ▼
                                                                 │      ┌───────────────────┐
                                                                 │      │ PostgreSQL 16     │
                                                                 │      │ + Standby replica │
                                                                 │      └───────────────────┘
                                                                 │
                                                                 ├──────────────┐
                                                                 │              ▼
                                                                 │      ┌────────────────────┐
                                                                 │      │ Redis 7 (cache +   │
                                                                 │      │ BullMQ backend)    │
                                                                 │      └─────────┬──────────┘
                                                                 │                ▼
                                                                 │      ┌────────────────────┐
                                                                 │      │ BullMQ Workers x2  │
                                                                 │      │ notifications.*    │
                                                                 │      │ booking.cleanup    │
                                                                 │      └────────────────────┘
                                                                 │
                                                                 └──── External APIs ────────┐
                                                                                              ▼
                                                                                ┌──────────────────────┐
                                                                                │ Amadeus Self-Service │
                                                                                │ Stripe API           │
                                                                                │ SES / Resend (email) │
                                                                                └──────────────────────┘
```

### Component Responsibilities

| Component        | Responsibility                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| Next.js (Vercel) | SSR/ISR for marketing, RSC + Server Actions for booking flow, hosts Stripe Elements iframe.      |
| NestJS API       | Domain logic, supplier orchestration, idempotency, persistence, queue dispatch.                  |
| PostgreSQL 16    | System of record for users, bookings, payments, audit log, supplier responses (jsonb).           |
| Redis 7          | Session token blacklist, search cache, rate-limit counters, BullMQ broker.                       |
| BullMQ workers   | Async work: email send, supplier rollback, booking-cleanup sweep, webhook replay.                |
| Amadeus          | Flight + hotel inventory, ticketing, hotel booking.                                              |
| Stripe           | Card vaulting, PaymentIntent lifecycle, 3DS, refunds.                                            |
| Cloudflare       | DDoS protection in front of Vercel for the apex; bot fight mode.                                 |

---

## Database Design

PostgreSQL 16 with `uuid-ossp` and `pgcrypto` extensions. Money is stored as `bigint`
minor-units with a separate `currency` column (ISO 4217). All tables include
`created_at`, `updated_at` (`timestamptz` default `now()`). Soft deletes via
`deleted_at`.

### Tables Overview

| Table                     | Purpose                                                              | Key Relationships                               |
| ------------------------- | -------------------------------------------------------------------- | ----------------------------------------------- |
| `users`                   | Customer + staff identities                                          | 1—N → `bookings`, `audit_events`                |
| `user_credentials`        | Password hash + reset state                                          | 1—1 → `users`                                   |
| `refresh_tokens`          | Active refresh-token family + replay detection                       | N—1 → `users`                                   |
| `airports`                | IATA airport reference data                                          | —                                               |
| `airlines`                | IATA airline reference data                                          | —                                               |
| `cities`                  | IATA city reference data                                             | —                                               |
| `bookings`                | Booking aggregate root                                               | N—1 → `users`; 1—N → `booking_items`, `payments` |
| `booking_items`           | Per-product items (flight, hotel)                                    | N—1 → `bookings`                                |
| `flight_segments`         | One segment per leg of a flight item                                 | N—1 → `booking_items`                           |
| `hotel_stays`             | Hotel item details                                                   | N—1 → `booking_items`                           |
| `passengers`              | Passenger / guest detail bound to a booking                          | N—1 → `bookings`                                |
| `payments`                | PaymentIntent lifecycle records                                      | N—1 → `bookings`                                |
| `payment_webhook_events`  | De-duplication store for Stripe events                               | —                                               |
| `supplier_calls`          | Outbound supplier call log (request + response, jsonb)               | N—1 → `bookings`                                |
| `notifications`           | Queued / sent notifications + delivery status                        | N—1 → `users`, `bookings`                       |
| `audit_events`            | Immutable audit log                                                  | N—1 → `users`                                   |
| `idempotency_keys`        | Idempotency-Key → response hash mapping                              | —                                               |

### SQL DDL Excerpts

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           CITEXT NOT NULL UNIQUE,
  email_verified  BOOLEAN NOT NULL DEFAULT FALSE,
  given_name      TEXT,
  family_name     TEXT,
  phone_e164      TEXT,
  locale          TEXT NOT NULL DEFAULT 'en',
  default_currency CHAR(3) NOT NULL DEFAULT 'USD',
  role            TEXT NOT NULL DEFAULT 'customer'
                  CHECK (role IN ('customer','admin','support')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ
);

CREATE TABLE user_credentials (
  user_id          UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  password_hash    TEXT NOT NULL,
  password_algo    TEXT NOT NULL DEFAULT 'argon2id',
  failed_attempts  INT  NOT NULL DEFAULT 0,
  locked_until     TIMESTAMPTZ,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE refresh_tokens (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  family_id     UUID NOT NULL,
  token_hash    BYTEA NOT NULL,
  user_agent    TEXT,
  ip_inet       INET,
  expires_at    TIMESTAMPTZ NOT NULL,
  revoked_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(token_hash)
);
CREATE INDEX ON refresh_tokens (user_id);
CREATE INDEX ON refresh_tokens (family_id) WHERE revoked_at IS NULL;

CREATE TABLE bookings (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference          CHAR(8) NOT NULL UNIQUE,
  user_id            UUID NOT NULL REFERENCES users(id),
  status             TEXT NOT NULL
                     CHECK (status IN ('DRAFT','PENDING_PAYMENT','CONFIRMED',
                                       'FAILED','CANCELLED','REFUNDED')),
  total_amount_minor BIGINT NOT NULL,
  currency           CHAR(3) NOT NULL,
  contact_email      CITEXT NOT NULL,
  contact_phone_e164 TEXT,
  locale             TEXT NOT NULL DEFAULT 'en',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  confirmed_at       TIMESTAMPTZ,
  cancelled_at       TIMESTAMPTZ,
  expires_at         TIMESTAMPTZ
);
CREATE INDEX ON bookings (user_id, created_at DESC);
CREATE INDEX ON bookings (status) WHERE status IN ('DRAFT','PENDING_PAYMENT');

CREATE TABLE booking_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id      UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  item_type       TEXT NOT NULL CHECK (item_type IN ('FLIGHT','HOTEL')),
  supplier        TEXT NOT NULL DEFAULT 'amadeus',
  supplier_ref    TEXT,
  offer_payload   JSONB NOT NULL,
  amount_minor    BIGINT NOT NULL,
  currency        CHAR(3) NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON booking_items (booking_id);
CREATE INDEX ON booking_items (supplier_ref);

CREATE TABLE flight_segments (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_item_id  UUID NOT NULL REFERENCES booking_items(id) ON DELETE CASCADE,
  sequence         INT NOT NULL,
  carrier_iata     CHAR(2) NOT NULL,
  flight_number    TEXT NOT NULL,
  origin_iata      CHAR(3) NOT NULL,
  destination_iata CHAR(3) NOT NULL,
  departure_utc    TIMESTAMPTZ NOT NULL,
  arrival_utc      TIMESTAMPTZ NOT NULL,
  cabin            TEXT NOT NULL,
  fare_basis       TEXT,
  UNIQUE(booking_item_id, sequence)
);

CREATE TABLE hotel_stays (
  booking_item_id  UUID PRIMARY KEY REFERENCES booking_items(id) ON DELETE CASCADE,
  hotel_id         TEXT NOT NULL,
  hotel_name       TEXT NOT NULL,
  city_iata        CHAR(3) NOT NULL,
  check_in         DATE NOT NULL,
  check_out        DATE NOT NULL,
  rooms            INT NOT NULL,
  cancellation_deadline TIMESTAMPTZ,
  refundable       BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE passengers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id   UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  pax_type     TEXT NOT NULL CHECK (pax_type IN ('ADT','CHD','INF')),
  title        TEXT,
  given_name   TEXT NOT NULL,
  family_name  TEXT NOT NULL,
  dob          DATE NOT NULL,
  doc_type     TEXT,
  doc_number   TEXT,
  doc_expiry   DATE,
  doc_issuing_country CHAR(2)
);

CREATE TABLE payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id          UUID NOT NULL REFERENCES bookings(id),
  psp                 TEXT NOT NULL DEFAULT 'stripe',
  intent_id           TEXT NOT NULL UNIQUE,
  status              TEXT NOT NULL
                      CHECK (status IN ('requires_action','requires_capture',
                                        'processing','succeeded','failed','refunded','cancelled')),
  amount_minor        BIGINT NOT NULL,
  currency            CHAR(3) NOT NULL,
  three_ds_status     TEXT,
  failure_code        TEXT,
  captured_at         TIMESTAMPTZ,
  refunded_amount_minor BIGINT NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON payments (booking_id);

CREATE TABLE payment_webhook_events (
  event_id     TEXT PRIMARY KEY,
  psp          TEXT NOT NULL,
  event_type   TEXT NOT NULL,
  payload      JSONB NOT NULL,
  received_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ
);

CREATE TABLE supplier_calls (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id    UUID REFERENCES bookings(id),
  supplier      TEXT NOT NULL,
  operation     TEXT NOT NULL,
  request_id    TEXT,
  http_status   INT,
  latency_ms    INT,
  request_body  JSONB,
  response_body JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON supplier_calls (booking_id, created_at);

CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  booking_id  UUID REFERENCES bookings(id),
  channel     TEXT NOT NULL CHECK (channel IN ('email')),
  template    TEXT NOT NULL,
  dedup_key   TEXT NOT NULL UNIQUE,
  status      TEXT NOT NULL CHECK (status IN ('queued','sent','failed','suppressed')),
  attempts    INT NOT NULL DEFAULT 0,
  last_error  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  sent_at     TIMESTAMPTZ
);

CREATE TABLE audit_events (
  id           BIGSERIAL PRIMARY KEY,
  occurred_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor_id     UUID,
  actor_role   TEXT,
  action       TEXT NOT NULL,
  target_type  TEXT,
  target_id    TEXT,
  payload      JSONB,
  ip_inet      INET,
  user_agent   TEXT
);
CREATE INDEX ON audit_events (target_type, target_id);
CREATE INDEX ON audit_events (actor_id, occurred_at DESC);

CREATE TABLE idempotency_keys (
  key            TEXT PRIMARY KEY,
  user_id        UUID,
  endpoint       TEXT NOT NULL,
  request_hash   BYTEA NOT NULL,
  response_status INT NOT NULL,
  response_body  JSONB NOT NULL,
  expires_at     TIMESTAMPTZ NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Indexing Strategy

- B-tree on every FK column (Postgres does NOT auto-create these).
- Partial indexes on hot status enum subsets (`bookings.status IN ('DRAFT','PENDING_PAYMENT')`).
- GIN index on `booking_items.offer_payload` for support lookups: `CREATE INDEX ON booking_items USING gin (offer_payload jsonb_path_ops)`.

---

## API Design

Base URL: `https://api.jawla.travel/v1`. All requests/responses are JSON UTF-8.
Auth header: `Authorization: Bearer <access_token>`. Errors follow RFC 7807
`application/problem+json`.

| #  | METHOD | PATH                                       | Auth        | Request                                              | Response                              | Status codes        |
| -- | ------ | ------------------------------------------ | ----------- | ---------------------------------------------------- | ------------------------------------- | ------------------- |
| 1  | POST   | `/auth/register`                           | none        | `{email,password,locale}`                            | `{userId}`                            | 201,400,409,429     |
| 2  | POST   | `/auth/verify-email`                       | none        | `{token}`                                            | `{verified:true}`                     | 200,400,410         |
| 3  | POST   | `/auth/login`                              | none        | `{email,password,captcha}`                           | `{access,refresh,expiresIn}`          | 200,401,423,429     |
| 4  | POST   | `/auth/refresh`                            | refresh     | `{refresh}`                                          | `{access,refresh,expiresIn}`          | 200,401             |
| 5  | POST   | `/auth/logout`                             | bearer      | `{}`                                                 | `204`                                 | 204,401             |
| 6  | POST   | `/auth/password/forgot`                    | none        | `{email,captcha}`                                    | `204`                                 | 204,429             |
| 7  | POST   | `/auth/password/reset`                     | none        | `{token,newPassword}`                                | `204`                                 | 204,400,410         |
| 8  | GET    | `/auth/me`                                 | bearer      | —                                                    | `{user,permissions[]}`                | 200,401             |
| 9  | GET    | `/catalog/airports?q=`                     | none        | `q` query string                                     | `[{iata,name,city,country}]`          | 200                 |
| 10 | GET    | `/catalog/cities?q=`                       | none        | `q`                                                  | `[{iata,name,country}]`               | 200                 |
| 11 | POST   | `/flights/search`                          | bearer/anon | `FlightSearchRequest`                                | `{searchId,offers[]}`                 | 200,400,502         |
| 12 | GET    | `/flights/offers/{id}`                     | bearer/anon | —                                                    | `FlightOffer`                         | 200,404             |
| 13 | POST   | `/flights/price-check`                     | bearer      | `{offerId}`                                          | `{offerId,priceConfirmed,delta}`      | 200,400,409         |
| 14 | POST   | `/hotels/search`                           | bearer/anon | `HotelSearchRequest`                                 | `{searchId,hotels[]}`                 | 200,400,502         |
| 15 | GET    | `/hotels/{hotelId}/rooms?...`              | bearer/anon | check-in/out, guests                                 | `{rooms[]}`                           | 200,404             |
| 16 | POST   | `/bookings`                                | bearer      | `{type,offerId,passengers[],contact}` + Idempotency  | `{bookingId,reference,status}`        | 201,400,409,422     |
| 17 | GET    | `/bookings/{id}`                           | bearer      | —                                                    | `Booking`                             | 200,403,404         |
| 18 | GET    | `/bookings?limit=&cursor=`                 | bearer      | paging                                               | `{items[],nextCursor}`                | 200                 |
| 19 | POST   | `/bookings/{id}/cancel`                    | bearer+OTP  | `{reason,otp}`                                       | `{status}`                            | 200,403,409         |
| 20 | POST   | `/payments/intents`                        | bearer      | `{bookingId}` + Idempotency                          | `{clientSecret,intentId,amount}`      | 201,409             |
| 21 | POST   | `/payments/webhooks/stripe`                | sig         | Stripe event                                         | `200`                                 | 200,400             |
| 22 | GET    | `/admin/bookings?...`                      | admin       | filters                                              | `{items[],nextCursor}`                | 200,403             |
| 23 | POST   | `/admin/bookings/{id}/refund-reconcile`    | admin       | `{stripeRefundId,amount}`                            | `{status:'REFUNDED'}`                 | 200,403,409         |
| 24 | POST   | `/admin/notifications/{id}/resend`         | admin       | —                                                    | `{queued:true}`                       | 202,403,404         |

### Sample Request: `POST /flights/search`

```json
{
  "tripType": "ROUND_TRIP",
  "origin": "CAI",
  "destination": "DXB",
  "departureDate": "2026-08-12",
  "returnDate": "2026-08-19",
  "passengers": { "adt": 2, "chd": 1, "inf": 0 },
  "cabin": "ECONOMY",
  "currency": "USD",
  "maxResults": 30
}
```

### Sample Response

```json
{
  "searchId": "01J9X0KZ8C5E0BR9Q9XZWAB4DR",
  "offers": [
    {
      "id": "of_01J9X0M4XKR1XZ",
      "price": { "totalMinor": 84500, "currency": "USD" },
      "itineraries": [
        {
          "duration": "PT5H10M",
          "segments": [
            {
              "carrier": "MS",
              "number": "915",
              "from": { "iata": "CAI", "at": "2026-08-12T08:30:00+02:00" },
              "to":   { "iata": "DXB", "at": "2026-08-12T14:40:00+04:00" },
              "cabin": "ECONOMY"
            }
          ]
        }
      ],
      "fareRules": { "refundable": false, "changeable": true, "lastTicketingDate": "2026-08-11T23:59:00Z" }
    }
  ]
}
```

### Error Envelope (RFC 7807)

```json
{
  "type":   "https://api.jawla.travel/problems/price-changed",
  "title":  "Price has changed",
  "status": 409,
  "code":   "PRICE_CHANGED",
  "detail": "Offer price increased by 2.4%. Confirm to continue.",
  "instance": "/v1/flights/price-check",
  "traceId": "01J9X0MA9JC56AH6"
}
```

### Rate Limits

| Endpoint group   | Limit                    | Bucket key       |
| ---------------- | ------------------------ | ---------------- |
| auth/*           | 10 req / IP / min        | IP               |
| flights/search   | 30 req / IP / min        | IP + user        |
| hotels/search    | 30 req / IP / min        | IP + user        |
| bookings (POST)  | 5 req / user / 10 min    | user             |
| admin/*          | 60 req / staff / min     | user             |

---

## Authentication & Authorization

### Token Model

- **Access token** — RS256 JWT, 15 min TTL, claims: `sub`, `email`, `role`, `perms[]`,
  `iss=https://api.jawla.travel`, `aud=jawla-web`, `iat`, `exp`, `jti`.
- **Refresh token** — opaque random 256-bit, hashed (SHA-256) at rest, 30 d TTL,
  rotated on each use; reuse triggers family invalidation (`refresh_tokens.family_id`).

### Roles & Permissions (RBAC)

| Role      | Description                                | Default Permissions                                |
| --------- | ------------------------------------------ | -------------------------------------------------- |
| customer  | End user                                   | `booking:read:self`, `booking:create`, `me:write`  |
| support   | First-line support                         | `booking:read:any`, `notification:resend`          |
| admin     | Full admin                                 | `*`                                                |

Permission strings are matched as glob expressions (e.g. `booking:*` ⊆ `*`).
Authorization is enforced in NestJS via a `@RequirePerms(...)` decorator + global
`PermissionGuard` which reads `request.user.perms`.

### Password Policy

| Rule                                              | Value           |
| ------------------------------------------------- | --------------- |
| Minimum length                                    | 10              |
| Min zxcvbn score                                  | 3               |
| Hash algorithm                                    | Argon2id        |
| Memory cost                                       | 64 MiB          |
| Iterations / parallelism                          | 3 / 2           |
| Pepper                                            | env-bound (HSM) |
| History (Basic)                                   | not enforced    |

### OTP for Sensitive Operations

- 6-digit numeric code via email, 10 min TTL, single-use.
- Required for: customer-initiated cancellation/refund, account deletion, email change.
- Rate-limited: max 3 OTP requests per user per 10 min.

---

## Security

### OWASP Top 10:2021 Mitigation Map

| Risk                              | Mitigation                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| A01 Broken Access Control         | RBAC via guards, deny-by-default, `userId` scope check on every read.                            |
| A02 Cryptographic Failures        | TLS 1.2+, Argon2id, AES-256 at rest, RS256 JWT, no PAN handling.                                 |
| A03 Injection                     | Parameterized queries (Prisma), Zod input validation, no string-built SQL.                       |
| A04 Insecure Design               | Threat model in DESIGN.md, abuse cases reviewed per epic.                                        |
| A05 Security Misconfiguration     | Hardened Helmet defaults, CSP report-only first, no debug in prod, IaC-only changes.             |
| A06 Vulnerable Components         | `npm audit`, Dependabot, Snyk, fortnightly patch window.                                         |
| A07 Identification/AuthN Failures | Argon2id, login throttling, MFA via OTP, refresh-token rotation + family invalidation.           |
| A08 Software/Data Integrity       | CI signs build artifacts, image digests pinned, package-lock committed.                          |
| A09 Logging & Monitoring          | Pino JSON logs, correlation IDs, Sentry, alerting on auth anomalies.                             |
| A10 SSRF                          | Outbound allow-list for Amadeus/Stripe; DNS rebinding mitigations; no user-supplied URLs fetched. |

### Encryption

- **In transit:** TLS 1.2/1.3 only, ECDHE ciphers, HSTS preload.
- **At rest:** EBS volume encryption (AES-256-XTS), Postgres TDE for backups,
  Redis snapshots encrypted, S3 buckets SSE-S3 minimum.
- **Field-level:** PII (DOB, document number) in `passengers` encrypted with AES-256-GCM
  using AWS KMS DEK + envelope encryption.

### PCI DSS Scope

- SAQ **A-EP** — payment fields rendered by Stripe Elements iframe; backend never sees
  PAN/CVV. Required controls: TLS, vendor due diligence, log retention 1 year,
  quarterly ASV scan.

### Rate Limiting

- Redis token-bucket per `(routeKey, principalKey)`; principal = `userId` if
  authenticated else hashed IP.
- 429 returned with `Retry-After` header.

### CSRF

- Authenticated state-changing endpoints accept JWT in `Authorization` header (not
  cookies) → CSRF not exploitable in classic sense. Server Actions in Next.js use
  `same-origin` + Origin check.

### Secrets Management

- FE: Vercel Encrypted Env (per-env).
- BE: AWS Secrets Manager, rotated; injected at boot via IAM role.
- No secret EVER committed to git; pre-commit secret-scan hook enforced.

### Backup & Retention

| Data                  | Retention       | Method                            |
| --------------------- | --------------- | --------------------------------- |
| Postgres PITR         | 7 days          | Continuous archive to S3          |
| Postgres logical dump | 30 days         | Nightly `pg_dump` → S3 (encrypted) |
| Application logs      | 30 days (hot) + 1 year (cold) | CloudWatch + S3 Glacier |
| Audit log             | 7 years         | Append-only, S3 Object Lock       |

---

## Booking Workflow

### State Diagram

```
            ┌────────────────────────────────┐
            ▼                                │
        ┌────────┐  create-intent   ┌─────────────────┐  payment_succeeded   ┌───────────┐
─create─▶│ DRAFT  │─────────────────▶│ PENDING_PAYMENT │─────────────────────▶│ CONFIRMED │
        └────────┘                  └─────────────────┘                      └─────┬─────┘
            │ 15m TTL                       │ 30m TTL                              │
            │                                │                                     │
            ▼                                ▼                                     ▼
        ┌────────┐                      ┌────────┐                            ┌───────────┐
        │ FAILED │                      │ FAILED │   refund                   │ CANCELLED │──refund─▶┌──────────┐
        └────────┘                      └────────┘ ◀──────────────────────────└───────────┘         │ REFUNDED │
                                                                                                    └──────────┘
```

### Step-by-step

1. Client posts `POST /bookings` with `Idempotency-Key`.
2. Server validates offer (`flights/price-check` or `hotels/offers/confirm`).
3. Server inserts row in `bookings` (`status=DRAFT`, `expires_at=now()+15m`).
4. Client calls `POST /payments/intents` → Stripe PaymentIntent created
   (capture=`manual`), booking → `PENDING_PAYMENT`, `expires_at=now()+30m`.
5. Client confirms PaymentIntent (3DS) in browser via Stripe Elements.
6. Stripe webhook `payment_intent.requires_capture` arrives.
7. Worker `booking.fulfill` runs: calls Amadeus to issue PNR / hotel booking.
8. On success, Stripe `capture` called → booking → `CONFIRMED`,
   notification queued.
9. On supplier failure: Stripe `cancel` (void uncaptured), booking → `FAILED`,
   customer email "couldn't confirm with the airline, no charge".

### Timeouts & Rollback Matrix

| Step                          | Timeout | Failure action                                                                |
| ----------------------------- | ------- | ----------------------------------------------------------------------------- |
| Amadeus price-check           | 8 s     | Surface 409 PRICE_CHANGED, allow re-search.                                   |
| Stripe PaymentIntent create   | 6 s     | Retry once, then 503.                                                         |
| Stripe confirm (client)       | 30 min  | Booking auto-FAILED, intent canceled.                                         |
| Amadeus PNR / hotel booking   | 30 s    | Up to 3 retries; on final failure, void intent, FAIL booking.                 |
| Stripe capture                | 10 s    | Retry up to 5×; on final failure, page on-call, supplier rollback initiated.  |

### Idempotency

- `Idempotency-Key` UUID per booking attempt; stored in `idempotency_keys` for 24 h.
- Repeated POST with same key returns the original response without side effects.

---

## Flight Flow (Amadeus)

```
Client                       Next.js                   NestJS               Redis           Amadeus
  │ search form              │                           │                     │              │
  │─────────────────────────▶│                           │                     │              │
  │                          │ POST /flights/search      │                     │              │
  │                          │──────────────────────────▶│ cache key?          │              │
  │                          │                           │────────────────────▶│              │
  │                          │                           │ HIT → return        │              │
  │                          │                           │                     │              │
  │                          │                           │ MISS → call         │              │
  │                          │                           │────────────────────────────────────▶│
  │                          │                           │     offers          │              │
  │                          │                           │◀────────────────────────────────────│
  │                          │                           │ cache 10m + return  │              │
  │ select offer             │                           │                     │              │
  │─────────────────────────▶│ POST /flights/price-check │                     │              │
  │                          │──────────────────────────▶│ Amadeus Flight Offers Price ───────▶│
  │                          │                           │◀────────────────────────────────────│
  │ checkout (pax + pay)     │                           │                     │              │
  │─────────────────────────▶│ POST /bookings + /payments/intents              │              │
  │                          │                           │                     │              │
  │ 3DS challenge            │                           │                     │              │
  │ Stripe → succeeded       │ webhook                   │                     │              │
  │                          │                           │ worker.fulfill:     │              │
  │                          │                           │ Flight Create Orders─────────────▶│
  │                          │                           │ PNR + e-ticket      │              │
  │                          │                           │ capture Stripe      │              │
  │ confirmation email       │                           │ enqueue email job   │              │
```

### Caching

| Key shape                                                | TTL    | Notes                          |
| -------------------------------------------------------- | ------ | ------------------------------ |
| `flt:search:{origin}:{dest}:{out}:{ret}:{pax}:{cabin}`   | 10 min | search results envelope        |
| `flt:offer:{offerId}`                                    | 15 min | full offer for price-check     |
| `flt:airport:{iata}`                                     | 24 h   | reference data                 |

### Failure Handling

- `PRICE_CHANGED`: returned 409 from price-check; client must re-display.
- `OFFER_EXPIRED`: re-run search with same filters; show banner.
- `PNR_CREATION_TIMEOUT`: retry, then mark FAILED + alert.
- `TICKETING_FAILED`: void Stripe (uncaptured); compensating supplier call if PNR
  was created before failure (Flight Order Management `DELETE`).

---

## Hotel Flow

```
search  ──▶ Amadeus Hotel Search → hotels[]   (cached 10m)
detail  ──▶ Amadeus Hotel Offers by hotelId   (live, no cache)
select  ──▶ Amadeus Hotel Offer Search/{offerId} (price-confirm, ≤2m before booking)
booking ──▶ Stripe PaymentIntent (manual capture)
        ──▶ on payment succeeded: Amadeus Hotel Bookings v2 (create)
        ──▶ capture Stripe
        ──▶ email voucher
```

- Voucher generated as PDF via Puppeteer worker (`voucher.generate` queue).
- Cancellation policy stored on `hotel_stays.cancellation_deadline`,
  `hotel_stays.refundable` for downstream logic.

---

## Payment Flow

```
┌─────────────┐  create PI (manual)  ┌─────────────┐
│  Client      │─────────────────────▶│ NestJS API  │
└─────────────┘                       └────┬────────┘
       │                                    │  Stripe.paymentIntents.create
       │                                    ▼
       │                              ┌──────────┐
       │  client_secret               │ Stripe   │
       │◀─────────────────────────────└──────────┘
       │ confirmCardPayment (Elements + 3DS)
       │                                    
       ▼                                    
   3DS Challenge (issuer)                   
       │                                    
       ▼                                    
   PI status = requires_capture             
       │                                    
       ▼                                    
   Stripe webhook ──────────────▶ NestJS verify sig ─▶ enqueue booking.fulfill
                                                          │
                                                          ▼
                                                    supplier PNR/booking
                                                          │ success
                                                          ▼
                                                    Stripe.capture(PI)
                                                          │
                                                          ▼
                                                    booking CONFIRMED + email
```

### Refunds (Basic)

1. Customer requests refund via `POST /bookings/{id}/cancel` (requires OTP).
2. System checks supplier policy → if refundable + within deadline, set
   `status=CANCELLED` and queue `payment.refund.manual` task.
3. Ops team is notified; refund is performed in Stripe dashboard.
4. Stripe `charge.refunded` webhook arrives → `payments.refunded_amount_minor` updated,
   `bookings.status=REFUNDED` if fully refunded.
5. Customer email sent.

---

## Admin Modules

| Page                       | Capabilities                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------- |
| Dashboard                  | Today's KPIs: bookings, GMV, failure rate, top supplier errors.                    |
| Bookings list              | Search by ref/email/status, filter by date/supplier, export CSV (admin only).      |
| Booking detail             | Full item breakdown, audit log, payment timeline, resend notification, mark refunded. |
| Users list                 | Search by email, view profile, last login, lockout state.                          |
| Notifications log          | Last 30 days, status, resend button, delivery error.                               |
| Supplier call inspector    | Inspect `supplier_calls` rows for a booking; redacted secrets.                     |
| Audit log                  | Read-only timeline of staff actions; CSV export for compliance.                    |
| Feature flags              | Read-only in Basic; surface current values from config service.                    |
| Settings                   | Admin profile + change password.                                                   |

---

## Deployment

### Topology

- **Frontend** (Next.js): Vercel, single primary region (`fra1` for EU/MENA).
- **Backend** (NestJS): Fly.io org `jawla`, single region `fra`, 2 app instances + 2
  worker instances.
- **Postgres**: Fly Postgres (or Neon prod), 1 primary + 1 standby in same region.
- **Redis**: Upstash dedicated, multi-AZ within region.
- **Static assets**: Vercel CDN with `s-maxage=86400, stale-while-revalidate=604800`.
- **Object storage**: AWS S3 (`jawla-prod-{vouchers,backups,logs}`), region `eu-central-1`.

### Environment Variables (excerpt)

| Var                       | Where        | Notes                                          |
| ------------------------- | ------------ | ---------------------------------------------- |
| `DATABASE_URL`            | API + worker | PgBouncer pool URL                             |
| `DIRECT_URL`              | API (migrations) | Direct primary URL                          |
| `REDIS_URL`               | API + worker | Upstash TLS URL                                |
| `JWT_PRIVATE_KEY`         | API          | RS256 private, PEM, rotated 90d                |
| `JWT_PUBLIC_KEY`          | API + FE     | RS256 public                                   |
| `AMADEUS_CLIENT_ID`/`SECRET` | API       | Self-Service prod                              |
| `STRIPE_SECRET_KEY`       | API          | `sk_live_...`                                  |
| `STRIPE_WEBHOOK_SECRET`   | API          |                                                |
| `EMAIL_PROVIDER_KEY`      | worker       | Resend/SES                                     |
| `SENTRY_DSN`              | API + FE     |                                                |
| `NEXT_PUBLIC_STRIPE_PK`   | FE           | publishable                                    |

### CI/CD Pipeline (GitHub Actions)

| Stage           | Steps                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `lint`          | `pnpm lint` (eslint, prettier), `tsc --noEmit`                                                       |
| `test:unit`     | `jest --maxWorkers=2 --coverage` (FE + BE)                                                           |
| `test:integration` | spin up Postgres + Redis via service containers; run NestJS integration suite                     |
| `build`         | `pnpm build` (FE), `pnpm build && docker build` (BE), SBOM + image scan with Trivy                   |
| `e2e`           | Playwright on staging URL after preview deploy                                                       |
| `deploy:preview` | Vercel preview for FE on every PR; Fly deploy to `staging` app on `main`                            |
| `deploy:prod`   | Manual approval gate → Vercel `--prod`, Fly `deploy --strategy=bluegreen`                            |
| `smoke`         | Synthetic `/healthz` + booking dry-run after prod deploy                                             |

---

## Logging

- Library: **pino** (BE) and Next.js built-in + `pino-http` for SSR routes.
- Format: JSON, single line per event.
- Required fields: `ts`, `level`, `service`, `env`, `traceId`, `spanId`,
  `userId?`, `bookingId?`, `route`, `msg`.
- Levels: `trace`, `debug`, `info`, `warn`, `error`, `fatal`. Default `info` in prod.
- Sensitive fields redacted via pino redact list: `password`, `token`, `secret`,
  `authorization`, `card`, `pan`, `cvv`, `doc_number`.
- Retention: 30 days hot (CloudWatch), 365 days cold (S3 Glacier).
- Correlation: `X-Request-Id` header propagated end-to-end; if absent, generated server-side
  as ULID.

---

## Monitoring

- **Sentry** for FE + BE error tracking and release health.
- **OpenTelemetry** SDK → Grafana Tempo for traces.
- **Prometheus** scrape of NestJS `prom-client` metrics; Grafana dashboards.

### Metrics (essential)

| Metric                                | Type      | Notes                                  |
| ------------------------------------- | --------- | -------------------------------------- |
| `http_server_duration_ms`             | histogram | by route, method, status               |
| `http_server_inflight`                | gauge     | per route                              |
| `supplier_call_duration_ms`           | histogram | by supplier, op                        |
| `supplier_call_errors_total`          | counter   | by supplier, op, code                  |
| `booking_state_transitions_total`     | counter   | from → to                              |
| `payment_intent_status_total`         | counter   | by status                              |
| `queue_jobs_total`                    | counter   | by queue, state                        |
| `queue_job_duration_ms`               | histogram | by queue                               |
| `pg_pool_in_use`                      | gauge     |                                        |
| `redis_command_duration_ms`           | histogram |                                        |

### Alert Thresholds

| Condition                                                          | Severity | Route        |
| ------------------------------------------------------------------ | -------- | ------------ |
| API p95 > 1 s for 5 min                                            | warn     | #ops-alerts  |
| Booking failure rate > 5% over 15 min                              | page     | PagerDuty    |
| Supplier error rate (Amadeus) > 10% over 10 min                    | page     | PagerDuty    |
| Stripe webhook lag > 5 min                                         | page     | PagerDuty    |
| Postgres replication lag > 30 s                                    | warn     | #ops-alerts  |
| Disk usage > 80%                                                   | warn     |              |
| 5xx error rate > 1% over 5 min                                     | page     | PagerDuty    |

---

## Testing Strategy

| Layer        | Tools                                  | Coverage Target          |
| ------------ | -------------------------------------- | ------------------------ |
| Unit (BE)    | Jest, ts-jest                          | ≥ 80% lines, ≥ 70% branches |
| Unit (FE)    | Jest, React Testing Library            | ≥ 75% lines              |
| Integration  | Jest + testcontainers (PG, Redis)      | All public services + repos covered |
| Contract     | Pact (Amadeus, Stripe stubs)           | All supplier integrations |
| E2E          | Playwright                             | Smoke + critical-path (search, book, pay, cancel) |
| Performance  | k6                                     | Baseline scripts in repo |
| Accessibility | axe-core in Playwright                | Zero serious violations  |
| Security     | OWASP ZAP baseline                     | CI gate weekly           |

- All PRs must keep coverage at or above baseline; degraded coverage fails CI.
- Flake budget: > 1% flake rate blocks merge to `main`.

---

## Acceptance Tests

> Format: Given / When / Then

| ID      | Title                                | Given                                                              | When                                              | Then                                                                                  |
| ------- | ------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| AT-001  | Register with valid email            | I am a new visitor                                                 | I submit register with valid email + strong password | Account is created in `pending_verification`; verification email sent.                |
| AT-002  | Reject weak password                 | I am on register form                                              | I submit password "12345678" (zxcvbn 1)           | 400 with `code=WEAK_PASSWORD`; no row inserted.                                       |
| AT-003  | Verify email                         | I have a verification token                                        | I POST `/auth/verify-email` with valid token      | `users.email_verified=true`; 200.                                                     |
| AT-004  | Login throttle                       | I have failed login 5×                                              | I try a 6th time within 10 min                    | 423 Locked; account locked 15 min.                                                    |
| AT-005  | Refresh token rotation               | I have a valid refresh token                                       | I call `/auth/refresh`                            | I receive a NEW refresh token; old token is revoked.                                  |
| AT-006  | Refresh token reuse detection        | I previously rotated my refresh token                              | I present the OLD refresh token                   | Entire family revoked; 401.                                                            |
| AT-007  | Flight search caches                 | Cache MISS for (CAI,DXB,...)                                       | I call `/flights/search`                          | Amadeus is called once; subsequent call within 10 min returns cached.                 |
| AT-008  | Flight price-check unchanged         | Offer price still valid                                            | I call `/flights/price-check`                     | 200 with `delta=0`.                                                                   |
| AT-009  | Flight price-check changed > 0.5%    | Amadeus returns +2.4% price                                        | I call `/flights/price-check`                     | 409 `PRICE_CHANGED`; offer updated to new price for re-confirm.                       |
| AT-010  | Passport-expiry guard                | Passport expires < 6 months after return                           | I submit booking                                  | 422 `PASSPORT_TOO_SHORT`.                                                              |
| AT-011  | Booking idempotency                  | I POST `/bookings` with key K and succeed                          | I POST `/bookings` again with key K               | Original 201 response returned; no new row created.                                   |
| AT-012  | Draft expiry                         | A DRAFT booking is > 15 min old                                    | Cleanup worker runs                               | Status → FAILED with reason `DRAFT_EXPIRED`.                                          |
| AT-013  | Hotel voucher email                  | A hotel booking is CONFIRMED                                       | Worker `notification.send` runs                   | Email with PDF voucher sent; `notifications.status=sent`.                              |
| AT-014  | Payment 3DS required                 | Test card requires 3DS2                                            | I confirm intent                                  | Issuer challenge surfaces; on success, PI moves to `requires_capture`.                |
| AT-015  | Webhook signature                    | A request with invalid Stripe-Signature arrives                    | NestJS verifies                                   | 400 `INVALID_SIGNATURE`; no state changes.                                            |
| AT-016  | Supplier ticketing failure rollback  | Amadeus PNR creation returns 5xx 3×                                | Worker exhausts retries                           | PaymentIntent canceled; booking FAILED; customer "no charge" email sent.              |
| AT-017  | Manual refund reconciliation        | Ops issues refund in Stripe dashboard                              | `charge.refunded` webhook arrives                 | `payments.refunded_amount_minor` updated; booking REFUNDED if full.                    |
| AT-018  | Cancellation requires OTP            | I am the booking owner                                             | I call `/bookings/{id}/cancel` without OTP        | 401 `OTP_REQUIRED`.                                                                    |
| AT-019  | Cross-tenant booking read denied     | I am user A                                                        | I GET `/bookings/{idOfUserB}`                     | 403 Forbidden.                                                                         |
| AT-020  | Admin audit log                      | I am an admin and resend a notification                            | Action completes                                  | `audit_events` row inserted with actor, target, before/after.                          |
| AT-021  | Rate limit auth                      | I issue 11 login attempts in 60 s from one IP                      | 11th attempt                                      | 429 with `Retry-After`.                                                                |
| AT-022  | Localization (AR)                    | My profile locale is `ar`                                          | I receive a booking-confirmed email               | Email rendered RTL with AR copy.                                                       |
| AT-023  | WCAG focus order                     | I tab through the search form                                      | I observe focus                                   | Focus visits inputs in DOM order; visible focus ring meets contrast 3:1.              |
| AT-024  | Backup PITR                         | I am DBA                                                            | I trigger PITR to 30 min ago                      | Restore completes < 4 h (RTO); data loss ≤ 15 min (RPO).                              |

---

## Appendix A — Open Issues / Risks

| ID   | Risk                                                        | Likelihood | Impact | Mitigation                                                |
| ---- | ----------------------------------------------------------- | ---------- | ------ | --------------------------------------------------------- |
| R-01 | Amadeus rate limits in promo windows                        | Medium     | High   | Aggressive caching, request queueing, alternate creds.    |
| R-02 | Stripe 3DS challenge UX drop-off                            | Medium     | Medium | Pre-3DS price reminder, "save card" copy A/B.             |
| R-03 | Manual refund SLA breach                                    | Low        | Medium | Daily ops digest; alert on > 24 h pending.                |
| R-04 | Single-region outage                                        | Low        | High   | Documented runbook to spin up DR in `iad`.                |
| R-05 | Pre-launch pentest delays                                   | Medium     | Medium | Schedule pentest 4 weeks pre-GA.                          |

— *End of document — Jawla SRS Basic v1.0* —
