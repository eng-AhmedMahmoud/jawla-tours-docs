# Jawla Tours OTA - Basic Package PRD

## Document Control

| Field | Value |
|-------|-------|
| Document Title | Jawla Tours OTA - Basic Package Product Requirements Document |
| Version | 1.0.0 |
| Date | 2026-06-29 |
| Status | Approved for Development |
| Document Owner | Ahmed Mahmoud (Technical Product Lead) |
| Business Sponsor | Jawla Tours Executive Team |
| Engineering Lead | TBD - Backend Lead (NestJS) |
| Design Lead | TBD - Senior Product Designer |
| Amadeus Integration Consultant | External Specialist (~40 hours allocated) |
| Classification | Internal - Confidential |
| Distribution | Engineering, Product, QA, Finance, Operations |
| Next Review Date | 2026-09-29 |

### Revision History

| Version | Date | Author | Change Summary |
|---------|------|--------|----------------|
| 0.1.0 | 2026-05-15 | A. Mahmoud | Initial draft after discovery workshop |
| 0.5.0 | 2026-06-02 | A. Mahmoud | Added Amadeus scope, personas refined |
| 0.8.0 | 2026-06-18 | A. Mahmoud | KPIs locked, payment matrix added |
| 1.0.0 | 2026-06-29 | A. Mahmoud | Final approved baseline |

### Related Documents

- Jawla Tours Master Statement of Work (SOW-2026-001)
- Amadeus Self-Service API Agreement (pending signature)
- Stripe Egypt Merchant Account Application
- Paymob Integration Contract (signed 2026-06-10)
- Brand Guidelines v2.1

---

## Vision

Jawla Tours will launch a production-grade Online Travel Agency (OTA) platform that allows Egyptian travelers to discover, book, and pay for flights and hotel rooms in a single bilingual (Arabic/English) experience. The Basic package establishes the operational and technical foundation: a live booking engine connected to Amadeus for flight inventory, a single hotel supplier for accommodation inventory, locally-relevant payments (Paymob and Stripe), and an internal admin tool that allows the operations team to monitor and intervene on bookings.

The Basic package is intentionally narrow in scope. It is not a feature-complete OTA - it is the minimum viable platform required to take real money from real customers, fulfil bookings via real GDS and supplier APIs, and reconcile financials. Everything beyond this baseline (loyalty, multi-supplier orchestration, customer self-service refunds, packages, B2B, mobile apps) is deliberately deferred to subsequent packages so that we can validate unit economics, supplier relationships, payment success rates, and operational throughput before scaling complexity.

The product must be live, transacting, and producing reconcilable revenue within 8-10 weeks of contract start. We optimize for time-to-revenue, not feature breadth. Every decision documented in this PRD prioritizes shipping a small, reliable surface area over shipping a large, fragile one.

---

## Goals & Success Metrics

### Strategic Goals

1. **Establish a transacting OTA**: Process at least 100 real, paid bookings in the first 60 days of live operation.
2. **Prove Amadeus integration economics**: Maintain Amadeus look-to-book ratio under contractually permitted thresholds (target <300:1) to avoid penalty fees.
3. **Validate the bilingual market**: Achieve at least 35% of bookings via the Arabic interface to confirm bilingual UX is not theatrical.
4. **De-risk payments**: Hit >85% payment success rate across Paymob and Stripe combined before considering additional gateways.
5. **Build internal operational muscle**: Train an in-house ops team of 3-5 agents to handle 100% of post-booking exceptions without engineering escalation by week 12.

### Success Metrics (90 days post-launch)

| Metric | Target | Rationale |
|--------|--------|-----------|
| Total Gross Bookings Value (GBV) | EGP 4.5M | Covers ~3x project burn |
| Confirmed Bookings | 350+ | Validates demand |
| Payment Success Rate | >85% | Industry benchmark for ME OTAs |
| Search-to-Book Conversion | >1.2% | Realistic for new OTA brand |
| Average Order Value (Flights) | EGP 8,500 | Domestic + short-haul mix |
| Average Order Value (Hotels) | EGP 4,200 | 2-3 night avg stay |
| Refund/Cancellation Rate | <12% | Anything above signals UX or pricing issues |
| Customer Support Ticket Rate | <8% of bookings | Indicates clarity of confirmations |
| Site Uptime | 99.5% | Excludes scheduled maintenance |
| Time-to-First-Result (Flight Search) | <4.5s p95 | Critical conversion factor |

---

## Personas

| Persona | Name | Age | Location | Goals | Pain Points |
|---------|------|-----|----------|-------|-------------|
| Domestic Leisure Traveler | Mariam El-Sayed | 32 | Cairo, Egypt | Book affordable Cairo-Hurghada weekend flights; find budget beach hotels; pay with local Mada card or installments | International OTAs reject her card; English-only sites confuse her parents; unclear cancellation policies; hidden fees revealed at checkout |
| Outbound Family Planner | Khaled Hussein | 45 | Alexandria, Egypt | Plan annual family Umrah or summer Europe trip for 4-6 people; needs predictable EGP pricing; trusts established brands | Currency fluctuations between search and payment; struggles to book multiple passengers in one PNR; needs Arabic-speaking support |
| Diaspora Returner | Nour Abdellah | 28 | Dubai, UAE | Books flights back to Cairo to visit family; pays with international Visa; needs WhatsApp confirmations | Foreign OTAs charge FX surcharges; local OTAs reject non-Egyptian cards; email confirmations get lost |
| Jawla Operations Agent | Yara Mostafa | 26 | Cairo HQ | Monitor incoming bookings; intervene on failed PNR creation; issue manual refunds; export daily revenue reports | No unified view of bookings across providers; PNR sync failures invisible until customer calls; manual Excel reconciliation |
| Jawla Finance Controller | Tarek Fahmy | 41 | Cairo HQ | Reconcile Paymob/Stripe settlements against Amadeus tickets and hotel vouchers; close monthly books; chase chargebacks | Multi-currency settlement gaps; no single source of truth for revenue recognition; ad-hoc reporting from engineers |

### Persona Coverage Matrix

| Feature Area | Mariam | Khaled | Nour | Yara | Tarek |
|--------------|--------|--------|------|------|-------|
| Flight Search | Primary | Primary | Primary | - | - |
| Hotel Search | Primary | Primary | Secondary | - | - |
| Paymob Payment | Primary | Primary | - | - | Reconciles |
| Stripe Payment | Secondary | Secondary | Primary | - | Reconciles |
| Arabic UI | Primary | Primary | Secondary | Required | Required |
| Email Confirmation | Required | Required | Required | Observes | - |
| Admin Booking View | - | - | - | Primary | Secondary |
| Refund Issuance | Recipient | Recipient | Recipient | Primary | Approves |
| Revenue Reports | - | - | - | Views | Primary |

---

## User Stories

### Search & Discovery

**US-001: Bilingual Flight Search**

As a traveler, I want to search for flights in Arabic or English so that I can plan my trip in my preferred language.

- AC-001.1: Given I am on the homepage, When I toggle the language switcher to Arabic, Then the entire UI including form labels, error messages, and date pickers must render in Arabic with RTL layout within 200ms.
- AC-001.2: Given I have selected Arabic, When I type airport names in Arabic (e.g., "القاهرة"), Then the autocomplete must return matching IATA codes (CAI) ranked by popularity.
- AC-001.3: Given I have selected English, When I type "Cai", Then autocomplete must return Cairo (CAI), Cairns (CNS), and other matches ranked by booking volume.
- AC-001.4: Given I have entered origin, destination, departure date, and passenger count, When I submit the search, Then the system must call Amadeus Flight Offers Search v2 and return results within 4.5 seconds p95.
- AC-001.5: Given Amadeus returns zero results, When the result page renders, Then the user must see a localized empty state with suggestions for nearby dates (+/- 3 days).

**US-002: Flight Result Filtering**

As a traveler, I want to filter flight results by stops, airlines, price, and departure time so that I can find the option that matches my constraints.

- AC-002.1: Filters must be applied client-side against the cached Amadeus response (no re-call to Amadeus on filter change) to preserve look-to-book ratio.
- AC-002.2: Selecting "Non-stop only" must instantly hide multi-stop results and update the displayed count.
- AC-002.3: Price slider must respect the user's currency selection (EGP, USD).
- AC-002.4: When a filter combination yields zero results, a "Clear filters" CTA must be prominent.

**US-003: Hotel Search by Destination**

As a traveler, I want to search for hotels by city, check-in/check-out dates, and guest count so that I can find available accommodation.

- AC-003.1: Destination input must accept city names in Arabic and English and resolve to the supplier's destination ID.
- AC-003.2: Date picker must enforce check-out > check-in, max 30 nights.
- AC-003.3: Search must return at least 20 results when available, paginated 20 per page.
- AC-003.4: Each hotel card must display: name, star rating, primary image, price per night (lead-in rate), total stay price, and refundability badge.

### Booking & Checkout

**US-004: Flight Booking with Passenger Details**

As a traveler, I want to enter passenger details and book a selected flight so that I receive a confirmed ticket.

- AC-004.1: Passenger form must collect: title, first name, last name, date of birth, nationality, passport number (international flights only), passport expiry, gender.
- AC-004.2: Names must be validated against IATA character set (Latin only, no diacritics) with a helpful Arabic explanation for Arabic users.
- AC-004.3: Given a user is logged in, When they reach checkout, Then their saved profile data must pre-fill the lead passenger fields.
- AC-004.4: Given the user submits the booking, When Amadeus Flight Create Orders fails, Then the user must see a clear error and not be charged.
- AC-004.5: Given Amadeus PNR is created, When the payment succeeds, Then the booking must be marked CONFIRMED and the ticket must be issued via Amadeus Flight Order Management.

**US-005: Hotel Booking**

As a traveler, I want to book a hotel room with guest details so that I receive a confirmed reservation voucher.

- AC-005.1: Room selection must show cancellation policy in plain language before payment.
- AC-005.2: Guest form must collect lead guest only (other guests are name-only).
- AC-005.3: Special requests free-text field (max 500 chars) must be passed to the supplier.
- AC-005.4: Given the supplier confirms the booking, When the response is received, Then a voucher PDF must be generated and emailed within 2 minutes.

**US-006: Multi-Gateway Payment**

As a traveler, I want to pay using Paymob (for local cards/wallets) or Stripe (for international cards) so that I can complete my booking.

- AC-006.1: System must auto-detect card BIN and recommend the appropriate gateway, but allow user override.
- AC-006.2: Paymob flow must support Visa, Mastercard, Meeza, and mobile wallet (Vodafone Cash, Orange Money).
- AC-006.3: Stripe flow must support 3DS2 challenges and SCA.
- AC-006.4: A 15-minute booking timer must lock the price and inventory; on expiry, the user is redirected back to search.
- AC-006.5: On payment failure, the user must see the gateway's reason code translated to plain Arabic/English.

### Account Management

**US-007: Account Creation**

As a traveler, I want to create an account using email/password or phone OTP so that I can save my bookings and traveler profiles.

- AC-007.1: Email signup must require email verification before booking is permitted.
- AC-007.2: Phone OTP must use a local SMS provider (Vonage or Twilio with Egypt-routed gateway) and expire in 5 minutes.
- AC-007.3: Password policy: minimum 10 characters, one uppercase, one digit, one symbol.
- AC-007.4: Account must store: name, email, phone, preferred language, preferred currency, saved traveler profiles (up to 6).

**US-008: My Bookings View**

As a registered traveler, I want to see all my past and upcoming bookings in one list so that I can reference confirmations and travel dates.

- AC-008.1: List must show booking reference, type (flight/hotel), status, travel dates, total amount, and action buttons (View, Download voucher).
- AC-008.2: Bookings must be sorted upcoming-first, then past descending.
- AC-008.3: Each booking detail page must show all passenger/guest names, itinerary, and payment receipt.

### Admin

**US-009: Admin Booking Dashboard**

As Yara (ops agent), I want to see all bookings across the platform with filters by status, date, and customer so that I can monitor operations and intervene on failures.

- AC-009.1: Dashboard must show real-time counts: today's bookings, pending PNR, failed payments, refund requests.
- AC-009.2: Bookings table must support filters: status (Pending, Confirmed, Cancelled, Refunded), date range, customer email/phone, booking reference.
- AC-009.3: Clicking a booking must reveal the full audit trail: search params, supplier response, payment events, email send log.
- AC-009.4: Agent must be able to add internal notes visible only to staff.

**US-010: Manual Refund Initiation**

As Yara, I want to initiate a manual refund from the admin panel so that I can resolve customer issues without engineering involvement.

- AC-010.1: Refund button must be visible only on Confirmed or Failed-Fulfilment bookings.
- AC-010.2: Agent must enter a reason code and free-text justification.
- AC-010.3: Refund must call the original payment gateway's refund API (Paymob or Stripe) and update booking status to Refund-Pending.
- AC-010.4: Refunds over EGP 10,000 must require a second-agent approval (4-eyes).
- AC-010.5: Customer must receive a localized email confirming the refund is in progress.

### Confirmations & Communications

**US-011: Booking Confirmation Email**

As a traveler, I want to receive an email confirmation with all booking details so that I have a record of my purchase.

- AC-011.1: Email must be sent within 60 seconds of booking confirmation.
- AC-011.2: Email language must match the user's UI language at time of booking.
- AC-011.3: Flight emails must include: PNR, ticket numbers, full itinerary, fare rules summary, and a calendar attachment (.ics).
- AC-011.4: Hotel emails must include: confirmation number, hotel address, check-in/out times, voucher PDF attachment.
- AC-011.5: Emails must render correctly in Gmail, Outlook, Apple Mail, and Yahoo - tested via Litmus before launch.

---

## Business Requirements

| ID | Requirement | Priority | Source |
|----|-------------|----------|--------|
| BR-001 | Platform must be fully bilingual (Arabic/English) with complete RTL support including currency formatting, date formatting, and form direction. | Must | Market |
| BR-002 | Platform must accept payments in EGP via Paymob (cards, wallets, Meeza). | Must | Finance |
| BR-003 | Platform must accept payments in USD/EUR via Stripe for international cardholders. | Must | Finance |
| BR-004 | Flight inventory must be sourced exclusively from Amadeus Self-Service APIs for the Basic package. | Must | Procurement |
| BR-005 | Hotel inventory must be sourced from one supplier (Hotelbeds OR Expedia EAN OR TBO) - selection finalized in Week 1. | Must | Procurement |
| BR-006 | All bookings must be reconcilable end-to-end: search params -> supplier offer -> PNR/voucher -> payment intent -> settlement -> ticket/voucher issuance. | Must | Finance |
| BR-007 | Admin panel must be accessible to internal staff via SSO (Google Workspace) with role-based access (Agent, Supervisor, Finance, Admin). | Must | Security |
| BR-008 | All personally identifiable information (PII) must be encrypted at rest (AES-256) and in transit (TLS 1.3). | Must | Compliance |
| BR-009 | Payment card data must NEVER touch Jawla servers - tokenization via Paymob/Stripe hosted fields or iframes only. | Must | PCI |
| BR-010 | System must comply with PCI DSS SAQ-A scope (hosted payment fields). | Must | Compliance |
| BR-011 | Booking confirmations must be sent via transactional email provider (SendGrid or AWS SES) with >98% deliverability. | Must | Operations |
| BR-012 | Look-to-book ratio with Amadeus must be monitored daily and remain under 300:1 to avoid penalty fees. | Must | Procurement |
| BR-013 | Platform must support a maximum of 100 concurrent users without degradation in Basic package. | Should | Engineering |
| BR-014 | All written content (terms, privacy, cancellation policies) must be reviewed by an Egyptian travel-law attorney before launch. | Must | Legal |
| BR-015 | Platform must log all booking events to an immutable audit log retained for 7 years. | Must | Compliance |
| BR-016 | Admin actions on bookings (refund, cancel, note) must be attributable to the acting user and reversible only via supervisor override. | Must | Security |
| BR-017 | Currency conversion (display only) must use a daily refreshed rate from a reputable source (e.g., XE.com or central bank API) with a 2% spread. | Must | Finance |
| BR-018 | Booking timer (15 min) must lock inventory where supplier APIs support it and must clearly warn users at 12 min, 14 min. | Should | Product |
| BR-019 | Platform must capture marketing attribution (UTM, referrer) on every booking for ROAS analysis. | Should | Marketing |
| BR-020 | Platform must be hostable on a single VPS or small cloud footprint to keep operating costs under EGP 25,000/month in Basic. | Must | Finance |
| BR-021 | All forms must include Arabic-aware input validation (Arabic names accepted in profile, Latin enforced for ticketing). | Must | Product |
| BR-022 | The Terms of Service must explicitly disclose Jawla's role as an OTA agent and the supplier's terms governing fare rules. | Must | Legal |
| BR-023 | Failed bookings (payment success, fulfillment failure) must trigger automatic refund + immediate ops alert. | Must | Operations |
| BR-024 | The platform must not store CVV, full PAN, or magnetic stripe data under any circumstance. | Must | PCI |
| BR-025 | The development team must deliver source code via private GitHub repository owned by Jawla with full IP transfer on final payment. | Must | Contract |

---

## Functional Acceptance Criteria

### FAC-1: Flight Booking End-to-End

A booking is considered functionally complete only when ALL of the following are true:
1. User has searched flights via the UI.
2. User has selected an offer and progressed to passenger details.
3. Amadeus Flight Offers Price has been called to confirm the price is still valid.
4. User has submitted passenger details with all required fields validated.
5. Payment has been captured via Paymob or Stripe.
6. Amadeus Flight Create Orders has returned a confirmed PNR.
7. Amadeus Flight Order Management has issued ticket numbers.
8. The booking record in Jawla's database has status = CONFIRMED.
9. The customer has received the confirmation email.
10. The admin dashboard reflects the booking with full audit trail.

If any step 5-9 fails after step 5, the system must automatically rollback (refund + alert).

### FAC-2: Hotel Booking End-to-End

1. User has searched hotels and selected a property and room.
2. Supplier's pre-booking check (rate availability) has succeeded.
3. Guest details captured and validated.
4. Payment captured.
5. Supplier's booking confirmation API has returned a confirmation number.
6. Voucher PDF generated and stored.
7. Email sent.
8. Admin record created.

### FAC-3: Refund Functional Criteria

1. Refund initiated by authorized agent via admin panel.
2. Reason code captured.
3. If amount > EGP 10K, second approval recorded.
4. Gateway refund API called with original payment reference.
5. Gateway response logged.
6. Booking status updated.
7. Customer notified.
8. Finance dashboard updated.

### FAC-4: Bilingual Switching

1. Language toggle is available on every page.
2. Switching language preserves the user's current state (search params, form data).
3. All UI text, including dynamically loaded supplier content where possible, switches.
4. URL pattern updates: /en/... or /ar/... for SEO.
5. HTML `lang` and `dir` attributes update.
6. Date and currency formats localize.

### FAC-5: Admin Authentication

1. Admin login via Google Workspace OAuth only (no password-based admin accounts).
2. Role assigned via Google Workspace group membership.
3. Session timeout after 30 minutes of inactivity.
4. All admin actions logged with actor, timestamp, IP.

### FAC-6: Email Deliverability

1. SPF, DKIM, DMARC configured on the sending domain.
2. Bounce/complaint webhooks processed automatically.
3. Critical emails (booking confirmation) retry on transient failure (3 attempts over 10 min).
4. Failed-to-send emails generate an ops alert with the booking reference.

---

## KPIs

| KPI | Target | Measurement Method | Owner | Review Cadence |
|-----|--------|---------------------|-------|----------------|
| Time to First Search Result (p95) | < 4.5 seconds | APM (Datadog/New Relic) timing on /api/flights/search | Engineering | Weekly |
| Flight Booking Success Rate | > 92% | (Confirmed bookings / Payment attempts that passed validation) | Product | Weekly |
| Hotel Booking Success Rate | > 90% | (Confirmed bookings / Payment attempts) | Product | Weekly |
| Payment Success Rate (Paymob) | > 85% | Paymob dashboard + internal logs | Finance | Daily first 30 days, then weekly |
| Payment Success Rate (Stripe) | > 88% | Stripe dashboard | Finance | Weekly |
| Look-to-Book Ratio (Amadeus) | < 300:1 | (Search API calls / Confirmed orders) per calendar month | Engineering + Procurement | Daily for first 60 days |
| Search-to-Book Conversion | > 1.2% | (Confirmed bookings / Unique search sessions) | Product | Weekly |
| Average Order Value - Flights | > EGP 8,500 | Sum(flight order totals) / count(flight orders) | Finance | Monthly |
| Average Order Value - Hotels | > EGP 4,200 | Sum(hotel order totals) / count(hotel orders) | Finance | Monthly |
| Refund Rate | < 12% | (Refunded bookings / Total confirmed bookings) | Operations | Monthly |
| Chargeback Rate | < 0.6% | Gateway reports | Finance | Monthly |
| Email Open Rate (Confirmations) | > 65% | SendGrid analytics | Marketing | Weekly |
| Customer Support Ticket Rate | < 8% of bookings | Helpdesk system (Freshdesk/Zendesk) | Operations | Weekly |
| First-Response Time (Support) | < 4 hours | Helpdesk SLA | Operations | Weekly |
| Site Uptime | > 99.5% | Uptime monitoring (Better Uptime / Pingdom) | Engineering | Monthly |
| Mean Time to Recovery (MTTR) | < 45 minutes | Incident post-mortems | Engineering | Per incident |
| Arabic UI Session Share | > 35% | Analytics (language attribute) | Product | Monthly |
| Mobile Traffic Share | > 60% | Analytics | Product | Monthly |
| Critical Bug Backlog | < 5 open | GitHub Issues labeled `severity:critical` | Engineering | Weekly |

---

## Milestones

| Phase | Deliverables | Duration | Payment Trigger | Payment % | Amount (EGP) |
|-------|--------------|----------|-----------------|-----------|---------------|
| M0 - Contract Signing | Signed SOW, kickoff meeting, environment access provisioning, Amadeus consultant onboarded | Day 0 | Contract executed | 25% | 148,750 |
| M1 - Discovery & Architecture | Finalized tech stack doc, infrastructure diagram, API contracts draft, hotel supplier selection memo, design system foundation, Figma high-fidelity for 10 core screens | Weeks 1-2 | M1 acceptance sign-off | 15% | 89,250 |
| M2 - Core Build: Search | Flight search UI + Amadeus integration live in staging; hotel search UI + supplier integration live in staging; bilingual switch functional | Weeks 3-5 | Staging demo of search flows | 15% | 89,250 |
| M3 - Core Build: Booking & Payments | Flight booking flow end-to-end in staging (PNR creation); hotel booking flow end-to-end; Paymob + Stripe integrated; booking confirmation emails | Weeks 5-7 | Staging demo of booking + payment, test transactions reconciled | 20% | 119,000 |
| M4 - Admin & Accounts | Admin panel (bookings dashboard, manual refund, agent notes); user accounts (signup, profile, bookings history); SSO for admins | Weeks 7-8 | Admin demo + UAT script pass | 10% | 59,500 |
| M5 - UAT & Hardening | Full UAT cycle with Jawla ops team; bug fixes; security review; load test (100 concurrent); deliverability test | Weeks 8-9 | UAT sign-off with <5 critical bugs open | 10% | 59,500 |
| M6 - Launch & Handover | Production deploy; first live transaction; ops runbook handover; 2-week hypercare; source code transfer | Weeks 9-10 | First 50 live bookings processed successfully | 5% | 29,750 |
| **TOTAL** | | **8-10 weeks** | | **100%** | **595,000** |

### Detailed Milestone Acceptance Criteria

**M1 Acceptance**
- Architecture document covers: hosting, CI/CD, secrets management, monitoring, backup strategy.
- Hotel supplier contract initiated (LOI or first call completed).
- All 10 designed screens have Arabic and English variants.
- Amadeus sandbox credentials active and first test call documented.

**M2 Acceptance**
- Live Amadeus search returns real results in staging.
- Hotel supplier search returns real results in staging.
- Both UIs are bilingual.
- Lighthouse score >= 80 on search pages.

**M3 Acceptance**
- At least 10 staging test bookings completed for flights (PNR generated, ticketed).
- At least 10 staging test bookings completed for hotels (voucher generated).
- Test payments succeed for: Paymob Visa, Paymob Mastercard, Paymob Meeza, Paymob Vodafone Cash, Stripe Visa, Stripe 3DS challenge.
- Confirmation emails render in 4 major email clients.

**M4 Acceptance**
- Admin can view, filter, search bookings.
- Manual refund tested against staging Paymob and Stripe.
- Agent notes persist and are audit-logged.
- User accounts created, profiles edited, bookings list visible.

**M5 Acceptance**
- UAT script (200+ test cases) executed by Jawla team with >95% pass rate.
- Security review: no Critical or High findings open.
- Load test sustains 100 concurrent users with p95 < 6s on key endpoints.

**M6 Acceptance**
- Production environment live with monitoring, alerting, backups configured.
- Operations runbook delivered (24+ documented procedures).
- First 50 real customer bookings processed without engineering escalation.

---

## Feature Prioritization (MoSCoW)

### Must Have

| Feature | Justification |
|---------|---------------|
| Flight search via Amadeus | Core revenue driver |
| Flight booking via Amadeus (PNR + ticketing) | Core revenue driver |
| Hotel search (1 supplier) | Core revenue driver |
| Hotel booking (1 supplier) | Core revenue driver |
| Paymob payment integration | Local payment requirement |
| Stripe payment integration | International cards |
| Arabic UI with RTL | Market requirement |
| English UI | Diaspora + tourists |
| Basic user accounts (email/password) | Booking history, repeat purchase |
| Email confirmations | Operational requirement |
| Admin booking dashboard | Operations cannot function without it |
| Manual refunds (admin) | Customer service requirement |
| PCI-compliant payment handling | Legal requirement |
| Transactional emails with templating | Confirmations, password reset |
| Audit logging | Compliance |
| Booking reconciliation reports | Finance requirement |
| Mobile-responsive web | 60%+ traffic |
| Currency display (EGP, USD) | Market requirement |
| Cancellation policy display pre-payment | Consumer protection |

### Should Have

| Feature | Justification |
|---------|---------------|
| Phone OTP signup | Reduces friction vs email-only |
| Saved traveler profiles | Repeat-booking convenience |
| Calendar attachment (.ics) in emails | UX polish |
| Voucher PDF generation | Hotel industry standard |
| Search result filters (stops, airlines, price) | Conversion |
| Marketing attribution capture | ROAS measurement |
| Booking timer with warnings | Conversion |
| Lighthouse-optimized SEO basics | Organic acquisition |

### Could Have

| Feature | Justification |
|---------|---------------|
| Social login (Google, Apple) | Nice-to-have, deferred |
| Wishlist / favorites | Engagement, not core |
| Multi-leg flights beyond round-trip | Niche use case |
| Hotel map view | Polish |
| Live chat widget | Could be plug-and-play (Tawk.to) but support team needs training |

### Won't Have (in Basic - reserved for later packages)

| Feature | Package |
|---------|---------|
| Loyalty program / wallet | Professional |
| Multi-hotel supplier orchestration | Professional |
| WhatsApp notifications | Professional |
| Self-service cancellation/refund | Professional |
| Advanced reports & BI dashboards | Professional |
| Tour packages, bundled deals | Enterprise |
| B2B agent portal | Enterprise |
| Mobile apps (iOS/Android) | Enterprise |
| Dynamic pricing engine | Enterprise |
| White-label / multi-tenant | Enterprise |
| Fraud detection ML | Enterprise |
| Multi-branch / multi-currency settlement | Professional/Enterprise |

---

## Out of Scope

The following are explicitly NOT delivered in the Basic package. Any inclusion requires a Change Request with separate pricing and timeline:

1. **Tour Packages and Bundled Deals**: Flight + hotel bundles, dynamic packaging, pre-built itineraries.
2. **Multi-Supplier Hotel Orchestration**: Only one supplier integration is included. Adding a second supplier (Hotelbeds + EAN, for example) requires the Professional package or a Change Request.
3. **Loyalty/Rewards System**: No points, tiers, wallet, or referral mechanics.
4. **WhatsApp Notifications**: Email only.
5. **Customer Self-Service Cancellation/Refund**: All cancellations and refunds must be requested via support and handled by an agent.
6. **Mobile Applications**: No iOS or Android native apps. The web UI is responsive but is not a PWA with installability or push notifications.
7. **B2B / Agent Portal**: No travel-agent login, no markup management, no agent commission accounting.
8. **White-Label / Multi-Tenant**: The platform serves the Jawla Tours brand only.
9. **Dynamic Pricing / Markup Engine**: Pricing is the supplier's net rate plus a single configurable percentage markup. No demand-based or rule-based pricing.
10. **Fraud Detection (ML-based)**: Gateway-level fraud filters (3DS, Stripe Radar basic) only; no in-house ML or velocity rules.
11. **Group Bookings (>9 passengers)**: Amadeus group bookings require offline workflows not supported.
12. **Corporate Booking Tools**: No travel-policy enforcement, no corporate billing, no GDS profiles.
13. **Advanced BI / Analytics Dashboards**: Only basic exports and admin counts; no Metabase/Tableau integration.
14. **Multi-Branch Accounting**: Single legal entity, single bank account, single revenue stream.
15. **Inventory Cache / Pre-Search Indexing**: Searches are real-time against suppliers; no static inventory or caching layer beyond per-session.
16. **SEO Content / Programmatic Pages**: No city pages, no destination guides, no blog CMS. Marketing site lives separately.
17. **A/B Testing Infrastructure**: No experimentation platform.
18. **Push Notifications**: Web push or mobile push.
19. **Calls / Click-to-Call / IVR Integration**.
20. **Multi-Language Beyond Arabic and English**: No French, no German, no Russian.
21. **Crypto Payments, BNPL, Installments Beyond Paymob's Default**.
22. **Internationalization Tax/VAT Engine**: Egyptian VAT only, hardcoded.
23. **Migration of Legacy Data**: If Jawla has existing customer/booking data, migration is a separate engagement.
24. **Hardware POS Integration**: For walk-in branch sales.
25. **Salesforce / HubSpot / CRM Integration**: Limited to a single CSV export endpoint for Marketing's manual use.

---

## Risks & Mitigation

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|----|------|------------|--------|------------|-------|
| R-001 | Amadeus contract delays push integration timeline | High | High | Initiate Amadeus paperwork before contract signing; use sandbox for parallel development; have consultant on retainer | Procurement |
| R-002 | Hotel supplier selection takes longer than 1 week | Medium | High | Pre-shortlist 3 suppliers (Hotelbeds, EAN, TBO) with parallel calls in week 1 | Product |
| R-003 | Paymob integration rejected (merchant onboarding) | Medium | Critical | Submit Paymob application immediately on signing; secondary path via Fawry as backup | Finance |
| R-004 | Look-to-book ratio exceeds Amadeus thresholds, incurring fees | High | Medium | Implement strict caching, debouncing, no-bot detection; daily LTB report from day 1; throttle anonymous searches if needed | Engineering |
| R-005 | Arabic RTL bugs in shared components delay UAT | Medium | Medium | Build RTL-first component library; manual QA pass per component; bidi text test cases in QA suite | Engineering |
| R-006 | Email deliverability poor due to new sending domain | Medium | High | Warm up SendGrid domain over 2 weeks; configure SPF/DKIM/DMARC; pre-launch deliverability test via Litmus + Mail Tester | Engineering |
| R-007 | First live bookings fail silently due to monitoring gaps | Medium | Critical | Synthetic transaction monitor running every 30 minutes in production from day 1; pager rotation for first 2 weeks | Engineering |
| R-008 | Chargebacks spike in first 60 days due to unclear refund policy | Medium | High | Clear cancellation policy at checkout; 4-eyes refund process; daily chargeback review | Finance |
| R-009 | Ops team not ready to handle volume at launch | Medium | High | 2-week ops training before launch; runbook covering top 20 scenarios; phased launch (soft launch to 100 users first) | Operations |
| R-010 | Single-server architecture fails under traffic spike | Low | High | Load test at 3x expected peak; have horizontal scaling plan documented even if not implemented | Engineering |
| R-011 | Currency rate API outage causes display errors | Low | Medium | Cache last known rate for 24h; show neutral message if rates stale beyond 24h | Engineering |
| R-012 | Legal review of T&Cs delays launch | Medium | Medium | Engage attorney week 1; provide draft from comparable OTA T&Cs as starting point | Legal |
| R-013 | Amadeus consultant unavailable when needed | Medium | High | Reserve calendar blocks weekly; have all integration questions queued; record sessions for asynchronous reference | Engineering |
| R-014 | Stripe declines to onboard Egyptian merchant | Medium | High | Apply early; have a Stripe Atlas LLC fallback path; alternative: 2Checkout | Finance |
| R-015 | Bilingual content quality is poor (machine-translated) | High | Medium | Hire native Arabic copywriter for all customer-facing strings; review by Jawla brand team | Product |
| R-016 | UAT scope creep adds 4+ weeks | High | High | Lock UAT script in M4; change requests after lock incur fees and schedule slip | Product |
| R-017 | Source code IP dispute at handover | Low | High | IP transfer clause in contract; weekly code pushes to Jawla-owned repo from day 1 | Legal |
| R-018 | PCI scope creep (cardholder data accidentally logged) | Medium | Critical | Code review checklist includes PII/PAN scan; automated secrets scanner in CI | Engineering |
| R-019 | DNS / SSL misconfiguration on launch day | Low | High | DNS + SSL dry run 1 week before launch; cutover runbook | Engineering |
| R-020 | Mobile UX issues discovered late | Medium | Medium | Mobile-first design; device lab testing in M2 and M4 | Design |

---

## Open Questions

| ID | Question | Owner | Required By |
|----|----------|-------|-------------|
| OQ-001 | Which hotel supplier will we contract with for Basic - Hotelbeds, Expedia EAN, or TBO? Each has different commercial terms, technical complexity, and inventory coverage. | Product + Finance | End of Week 1 |
| OQ-002 | What is the markup model? Flat % per category, fixed per booking, or tiered by route? | Finance | M1 |
| OQ-003 | Will Jawla Tours act as Merchant of Record (MoR) or pass-through to supplier MoR? This affects PCI scope, refunds, and accounting. | Legal + Finance | M1 |
| OQ-004 | What is the supported customer support channel mix at launch - email only, email + phone, email + WhatsApp (manual)? | Operations | M2 |
| OQ-005 | What is the cancellation policy override matrix - can ops override supplier rules and absorb cost? Up to what amount? | Finance + Ops | M3 |
| OQ-006 | Will we offer travel insurance at checkout? (Insured-by upsell from a third party.) | Product | Out of scope for Basic, decide for Professional |
| OQ-007 | What is the data residency requirement? Egyptian customers' PII - can it sit on AWS Frankfurt / Bahrain / or does it need a local DC? | Legal + Engineering | M1 |
| OQ-008 | Will Jawla provide its own SMS provider account, or do we procure on their behalf? | Operations | M2 |
| OQ-009 | What is the brand voice in Arabic - Modern Standard Arabic, Egyptian Colloquial, or hybrid? | Marketing | M1 |
| OQ-010 | What is the post-launch support model - extended hypercare (paid), retainer, or fully transitioned to internal team after 2 weeks? | Contract | M5 |
| OQ-011 | Are we required to integrate with the Egyptian Tax Authority's e-invoicing system for B2C transactions immediately, or is grace period in effect? | Finance + Legal | M2 |
| OQ-012 | What is the password recovery flow if the user has no access to their email? Is phone-based recovery permitted given the OTP cost? | Product | M3 |
| OQ-013 | Should the admin panel be in English only or also bilingual? Internal users are Arabic native but the operations vocabulary is English. | Product | M2 |
| OQ-014 | What is our policy on PNR holds (book now, pay within 24h)? Some Amadeus carriers allow it; this changes the booking flow. | Product | M3 |
| OQ-015 | What is the rollback plan if Paymob settlement reconciliation finds material gaps in the first month? | Finance | M5 |
| OQ-016 | Will Jawla provide the staff Google Workspace tenant for admin SSO, or do we set one up? | Operations | M1 |
| OQ-017 | Are there any seasonal blackouts (Ramadan, Hajj) where we should plan launch around or feature-freeze around? | Operations | M1 |
| OQ-018 | What is the legal entity that signs the Amadeus contract - Jawla Tours LLC, holding company, or a subsidiary? Affects creditworthiness review. | Legal | Week 1 |
| OQ-019 | Are we contractually allowed to display competitor pricing (price comparison) in the future, or is this off-limits? | Legal | Out of scope for Basic |
| OQ-020 | What is the brand approach to negative reviews / cancellations - automated apology email, agent outreach, compensation tokens? | Operations | M4 |

---

## Appendix A: Technology Stack (Reference)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind, shadcn/ui | Team familiarity; SSR for SEO; RTL support |
| Backend | NestJS, TypeScript, PostgreSQL, Redis | Team familiarity; modular structure for OTA domain |
| Hosting | Vercel (frontend), Hetzner/Contabo VPS (backend) | Cost-controlled for Basic scale |
| Payments | Paymob, Stripe | Market requirement |
| Email | SendGrid | Deliverability, EG IP routing options |
| Monitoring | Better Uptime, Sentry, basic CloudWatch/Grafana | Cost-controlled |
| Repo | Private GitHub | Standard |
| Auth (Customer) | Custom (NestJS) with bcrypt, JWT in httpOnly cookies | No third-party costs |
| Auth (Admin) | Google Workspace OAuth | Already in use by Jawla |
| File Storage | Cloudflare R2 | Voucher PDFs |

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| OTA | Online Travel Agency |
| GDS | Global Distribution System (Amadeus, Sabre, Travelport) |
| PNR | Passenger Name Record - airline booking reference |
| LTB | Look-to-Book ratio |
| MoR | Merchant of Record |
| SCA | Strong Customer Authentication |
| 3DS | 3D Secure (card authentication) |
| PCI DSS | Payment Card Industry Data Security Standard |
| SAQ-A | Self-Assessment Questionnaire A (lightest PCI scope) |
| UAT | User Acceptance Testing |
| GBV | Gross Booking Value |
| AOV | Average Order Value |
| MTTR | Mean Time To Recovery |

## Appendix C: Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Business Sponsor | _________________ | _________________ | _________ |
| Product Lead | Ahmed Mahmoud | _________________ | 2026-06-29 |
| Engineering Lead | _________________ | _________________ | _________ |
| Finance Approver | _________________ | _________________ | _________ |
| Legal Reviewer | _________________ | _________________ | _________ |
