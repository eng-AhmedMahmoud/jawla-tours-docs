# Jawla Tours OTA - Professional Package PRD

## Document Control

| Field | Value |
|-------|-------|
| Document Title | Jawla Tours OTA - Professional Package Product Requirements Document |
| Version | 1.0.0 |
| Date | 2026-06-29 |
| Status | Approved for Development |
| Document Owner | Ahmed Mahmoud (Technical Product Lead) |
| Business Sponsor | Jawla Tours Executive Team |
| Engineering Lead | TBD - Backend Lead (NestJS) + Frontend Lead (Next.js) |
| Data/BI Lead | TBD - Senior Analytics Engineer |
| Design Lead | TBD - Senior Product Designer (incl. dashboard/admin specialist) |
| Amadeus Integration Consultant | External Specialist (~60-80 hours allocated) |
| Classification | Internal - Confidential |
| Distribution | Engineering, Product, QA, Finance, Operations, Customer Success |
| Next Review Date | 2026-09-29 |
| Supersedes | None (extends Basic package PRD v1.0.0) |

### Revision History

| Version | Date | Author | Change Summary |
|---------|------|--------|----------------|
| 0.1.0 | 2026-05-20 | A. Mahmoud | Initial outline; Professional scope brainstorm |
| 0.4.0 | 2026-06-04 | A. Mahmoud | Multi-supplier orchestration design added |
| 0.7.0 | 2026-06-15 | A. Mahmoud | Loyalty / wallet model defined; WhatsApp scope added |
| 0.9.0 | 2026-06-22 | A. Mahmoud | Reports module finalized; multi-currency model approved |
| 1.0.0 | 2026-06-29 | A. Mahmoud | Final approved baseline |

### Relationship to Basic Package

The Professional package is a strict superset of the Basic package. It includes everything in the Basic package PRD, plus the additional capabilities described in this document. Where a feature appears in both PRDs, the Professional definition supersedes the Basic definition.

### Related Documents

- Jawla Tours Master Statement of Work (SOW-2026-001)
- Jawla Tours Basic Package PRD v1.0.0
- Amadeus Self-Service & Enterprise API Agreement
- Hotelbeds Master Distribution Agreement
- Expedia EAN Partner Agreement (Pending)
- TBO Distribution Agreement (Pending)
- WhatsApp Business API - 360dialog / Meta Cloud API Onboarding Form
- Brand Guidelines v2.1

---

## Vision

The Professional package transforms Jawla from a working OTA into a competitive OTA. With the Basic package, Jawla can transact - with Professional, Jawla can compete. The product evolves along five strategic dimensions:

1. **Inventory Depth (Multi-Supplier Hotels)**: Connect at least three hotel suppliers (e.g., Hotelbeds, Expedia EAN, TBO) and orchestrate them through a single search experience that deduplicates properties, ranks by price/availability/margin, and falls back gracefully when one supplier is degraded.
2. **Customer Retention (Loyalty & Wallet)**: Introduce a points-based loyalty program with a stored-value wallet so that customers have a financial reason to return to Jawla rather than a competitor.
3. **Communication Reach (WhatsApp)**: WhatsApp is the dominant messaging channel in Egypt and the broader MENA region. Transactional WhatsApp notifications via the Meta Business API materially improve trust and reduce support load.
4. **Operational Self-Service**: Customer-initiated cancellations and refunds (within supplier rules) reduce support cost per booking by an estimated 40-60%.
5. **Decision-Quality Analytics**: A reporting layer with daily/weekly/monthly dashboards for product, finance, and operations - turning the platform from a black box into an instrumented business.

The Professional package also addresses three operational realities that the Basic package deliberately deferred: multi-currency display and settlement, more sophisticated admin tooling (segmentation, bulk actions, marketing exports), and the foundational scaffolding for the Enterprise package (event bus, supplier abstraction layer, reporting warehouse).

The Professional package is the right scope for Jawla if (a) the Basic package has demonstrated product-market fit, (b) booking volumes justify investing in retention infrastructure, and (c) the operations team is straining under manual workload. It is not the right scope if the business is still validating whether Egyptian customers will book online at all - that question must be answered with Basic first.

---

## Goals & Success Metrics

### Strategic Goals

1. **Increase booking volume 3x vs Basic baseline within 6 months of Professional launch** through inventory expansion and retention.
2. **Reduce per-booking customer support cost by 50%** through self-service refunds and WhatsApp deflection.
3. **Establish a repeat-purchase economy**: target >30% of bookings from returning customers (vs <8% expected for Basic-only).
4. **Diversify supplier dependency**: no single hotel supplier accounts for >55% of hotel GBV.
5. **Operate on data, not intuition**: every product, finance, and ops decision >EGP 50K monthly impact must reference a Jawla dashboard.

### Success Metrics (90 days post Professional launch)

| Metric | Target | Baseline (Basic) | Improvement |
|--------|--------|------------------|-------------|
| Total Gross Bookings Value (90 days) | EGP 18M | EGP 4.5M | 4x |
| Confirmed Bookings | 1,400+ | 350 | 4x |
| Repeat Customer Rate | > 30% | ~8% | 3.75x |
| Loyalty Program Enrollment Rate | > 65% of new accounts | n/a | New |
| Wallet Active Balance (Total) | > EGP 1.2M | n/a | New |
| WhatsApp Opt-In Rate at Booking | > 70% | n/a | New |
| Self-Service Cancellation Rate | > 60% of cancellations | 0% | New |
| Support Tickets per 100 Bookings | < 4 | ~8 | 50% reduction |
| Hotel Supplier Diversity Index (HHI) | < 4500 | n/a | New |
| Multi-Currency Bookings Share | > 18% | <5% (USD only) | 3.6x |

---

## Personas

The Basic package personas remain valid. The Professional package introduces three new personas and elevates two existing ones to first-class status.

| Persona | Name | Age | Location | Goals | Pain Points |
|---------|------|-----|----------|-------|-------------|
| Returning Loyalist | Yasmine Tarek | 34 | Cairo, Egypt | Earn points on every booking; redeem wallet credit on her next trip; receive birthday/anniversary perks | No reason to consolidate spend; can't see her benefits clearly; competing OTAs reward more |
| WhatsApp-First Traveler | Omar Fathy | 27 | Mansoura, Egypt | Receive all booking updates on WhatsApp - never opens email; wants to chat with support on WhatsApp during travel disruptions | Emails go unread; calling support during travel is expensive on roaming |
| Multi-Currency Tourist | Sophie Laurent | 38 | Paris, France | Book Cairo + Luxor + Aswan trip; pay in EUR; see prices in EUR throughout; receive EUR receipts for expense claims | Most local OTAs only show EGP; conversion happens twice (bank + platform); receipt currency mismatches | 
| Finance Controller (elevated) | Tarek Fahmy | 41 | Cairo HQ | Daily/weekly/monthly financial dashboards; multi-currency settlement reconciliation; automated refund posting; supplier payable accruals | Manual reconciliation is half his week; multi-currency manual conversion error-prone; no per-supplier margin view |
| Operations Manager (elevated) | Yara Mostafa | 26 | Cairo HQ | Triage 10x volume with the same team; bulk actions on segmented bookings; customer health score; supplier-fail SLA dashboard | Per-booking touch model doesn't scale; no way to see "all Hotelbeds failures last 24h"; no segmentation tools |
| Marketing Lead (new) | Hagar El-Din | 31 | Cairo HQ | Segment customers by destination, AOV, recency; export to email marketing tool; run loyalty promotions | No customer segmentation; can't measure campaign-to-booking conversion; loyalty system needs marketing levers |

### Persona Coverage Matrix (Professional Features)

| Feature | Yasmine | Omar | Sophie | Tarek | Yara | Hagar |
|---------|---------|------|--------|-------|------|-------|
| Loyalty Earning | Primary | Recipient | Recipient | Reconciles | Observes | Manages campaigns |
| Wallet Top-Up & Redeem | Primary | Secondary | Secondary | Reconciles | - | - |
| WhatsApp Confirmations | Recipient | Primary | Recipient (English) | - | Observes | - |
| Self-Service Cancellation | Primary | Primary | Primary | Reconciles | Approves edge cases | - |
| Multi-Currency Display | Secondary | Secondary | Primary | Settles | - | Segments by currency |
| Multi-Currency Payment | Secondary | - | Primary | Reconciles | - | - |
| Multi-Supplier Hotels | Beneficiary | Beneficiary | Primary | Margin analysis | Supplier failures triage | Compares supplier performance |
| Advanced Reports | - | - | - | Primary | Primary | Primary |
| Customer Segmentation | Target | Target | Target | - | Identifies VIPs | Primary |

---

## User Stories

Stories continue from the Basic package numbering (US-001..US-011 are inherited). Professional adds US-012 through US-038.

### Multi-Supplier Hotel Orchestration

**US-012: Unified Hotel Search Across Suppliers**

As a traveler, I want to see hotel results aggregated from all of Jawla's suppliers in a single ranked list so that I get the best price and selection without knowing or caring which supplier provides each rate.

- AC-012.1: Given I search a destination, When the search executes, Then the orchestrator must query at least 3 hotel suppliers in parallel with a 4-second total timeout.
- AC-012.2: Given two suppliers return the same property, When results render, Then the property must appear once with the lowest-priced offer surfaced and the alternative offer accessible via "More rates" expansion.
- AC-012.3: Given a supplier times out or errors, When the results render, Then results from the surviving suppliers must still be shown and the failure must be logged but never surfaced to the user.
- AC-012.4: Property deduplication must be based on a property identity service (GIATA codes, geo-radius matching, name fuzzy-match >85% similarity).
- AC-012.5: Ranking algorithm must consider: price, supplier reliability score (rolling 7-day success rate), margin to Jawla, and user preferences (refundable preferred).

**US-013: Supplier Health Dashboard**

As Yara (ops manager), I want a real-time dashboard showing the health of each hotel supplier so that I can proactively communicate with customers and supplier account managers when degradation occurs.

- AC-013.1: Dashboard must show per-supplier: search success rate (last 1h, 24h, 7d), booking success rate, average response time, current circuit-breaker state.
- AC-013.2: When a supplier's 1-hour success rate drops below 90%, an alert must fire to ops via Slack and PagerDuty.
- AC-013.3: Dashboard must allow ops to manually disable a supplier (circuit breaker open) and re-enable it after recovery.

**US-014: Supplier Margin Reporting**

As Tarek (finance), I want a per-supplier margin report so that I can renegotiate commercial terms and rebalance traffic.

- AC-014.1: Report must show: GBV, COGS (supplier net), gross margin, gross margin %, by supplier and by month.
- AC-014.2: Drill-down must show top 50 properties contributing to each supplier's margin.

### Loyalty & Wallet

**US-015: Loyalty Program Enrollment**

As a new account, I want to be auto-enrolled in Jawla's loyalty program so that I can start earning points immediately without an extra step.

- AC-015.1: Account creation must create a corresponding loyalty profile with tier "Member" by default.
- AC-015.2: Customer must see their current point balance on every page (header widget).
- AC-015.3: Customer can opt out of the loyalty program from account settings (rare path - log this event for analysis).

**US-016: Points Earning on Booking**

As a loyalty member, I want to earn points on every confirmed booking so that I am rewarded for choosing Jawla.

- AC-016.1: Earning rule: 1 point per EGP 10 of net booking amount (excluding taxes and fees) for Member tier; 1.5x for Silver; 2x for Gold; 3x for Platinum.
- AC-016.2: Points must be credited on booking confirmation but locked until 24 hours after travel/stay completion (refund-protection window).
- AC-016.3: Booking cancellation must reverse points; if points were already redeemed, balance can go negative and must be repaid before next redemption.
- AC-016.4: Tier upgrades must be calculated nightly based on rolling 12-month spend.

**US-017: Wallet Top-Up**

As a customer, I want to add funds to my Jawla Wallet so that I can pre-pay for future trips, share family budgets, or hold refunded amounts.

- AC-017.1: Top-up via Paymob or Stripe in EGP, USD, or EUR.
- AC-017.2: Wallet balances must be tracked per currency (no automatic conversion).
- AC-017.3: Minimum top-up: EGP 200 / USD 20 / EUR 20. Maximum per transaction: EGP 50,000 (regulatory cap).
- AC-017.4: Top-ups are NOT refundable in cash (only redeemable against bookings); this must be displayed pre-confirmation.

**US-018: Wallet Redemption at Checkout**

As a customer with wallet balance, I want to apply wallet credit at checkout so that I reduce my out-of-pocket payment.

- AC-018.1: Checkout must show wallet balance and a slider/toggle to apply.
- AC-018.2: Wallet currency must match booking currency, or the platform must show the conversion clearly.
- AC-018.3: If wallet fully covers the booking, no gateway payment is required.
- AC-018.4: Wallet redemption + loyalty points + gateway payment can combine in one transaction.

**US-019: Tier Benefits Display**

As a loyalty member, I want to see clearly what benefits I have at my current tier and what I unlock at the next tier so that I am motivated to keep booking with Jawla.

- AC-019.1: Account page must show: current tier, points balance, points-to-next-tier, list of current benefits, list of next-tier benefits.
- AC-019.2: Tier benefits include: earn multiplier, priority support, free cancellation window (24h post-booking), birthday bonus, wallet top-up bonuses.

### WhatsApp Notifications

**US-020: WhatsApp Opt-In at Checkout**

As a traveler, I want to opt in to WhatsApp notifications during checkout so that I receive trip updates on my preferred channel.

- AC-020.1: Checkout form must include a WhatsApp opt-in checkbox, default unchecked (GDPR-style consent).
- AC-020.2: Phone number entered must be verified via WhatsApp message (one-time confirmation message with confirmation link, expires 10 min).
- AC-020.3: Opt-out must be available via every WhatsApp message ("Reply STOP" or web link) and from account settings.

**US-021: WhatsApp Booking Confirmations**

As an opted-in customer, I want to receive my booking confirmation on WhatsApp so that I have it where I message daily.

- AC-021.1: A WhatsApp template-approved message must send within 2 minutes of booking confirmation.
- AC-021.2: Message must include: greeting, booking type, key details (route+date or hotel+dates), booking reference, total, and a link to the full itinerary on the web.
- AC-021.3: For flights, attach the e-ticket PDF; for hotels, attach the voucher PDF.

**US-022: WhatsApp Travel Reminders**

As a traveler, I want to receive a reminder 24 hours before my flight or check-in so that I am prepared.

- AC-022.1: 24-hour reminder must include: check-in URL (for flights with online check-in available), hotel address and check-in time (for hotels).
- AC-022.2: Reminders are sent in the user's preferred language (set at booking time).
- AC-022.3: If a flight has been rescheduled by the airline (Amadeus schedule change notification received), the reminder must reflect new times.

**US-023: WhatsApp Inbound Replies**

As a traveler, I want to reply to Jawla on WhatsApp and reach a support agent so that I can resolve issues quickly.

- AC-023.1: Inbound WhatsApp messages must route to a shared inbox (HelpScout, Front, or built-in admin inbox).
- AC-023.2: Auto-reply outside business hours acknowledges receipt and gives expected response time.
- AC-023.3: First-response time SLA on WhatsApp: 30 min during business hours, 4h after.

### Customer Self-Service

**US-024: Self-Service Cancellation**

As a customer, I want to cancel my booking from My Bookings without contacting support so that I can manage my trip independently.

- AC-024.1: Cancel button is visible only if cancellation is permitted by supplier rules.
- AC-024.2: System must show: refund amount, cancellation fee, supplier conditions, expected processing time - all before confirming.
- AC-024.3: Confirmation requires entering booking reference and a 2FA OTP (email or SMS).
- AC-024.4: System must call the supplier's cancellation API, capture the response, update booking status, initiate gateway refund.
- AC-024.5: If the supplier API fails, the cancellation is queued for ops review with a customer-facing message "Cancellation request received - confirming with supplier within 24h".

**US-025: Self-Service Refund Status Tracking**

As a customer who has cancelled, I want to track my refund status so that I know when to expect funds.

- AC-025.1: Booking detail page must show refund status: Requested, Processing, Gateway Confirmed, Bank Crediting (3-7 business days note), Complete.
- AC-025.2: Status changes must push WhatsApp + email notifications.
- AC-025.3: A refund-related FAQ must be 1-click accessible from the status page.

**US-026: Self-Service Booking Modification (Where Permitted)**

As a customer, I want to modify the date or passenger of my booking when supplier permits so that I can avoid cancellation fees.

- AC-026.1: Modification capability is supplier-dependent; UI must show only what is permitted.
- AC-026.2: For flights, date changes must call Amadeus Booking Management with the new date; fare difference is charged or refunded as appropriate.
- AC-026.3: For hotels, only date or guest-name modifications are supported (no room-type change).

### Advanced Admin

**US-027: Bulk Booking Actions**

As Yara (ops), I want to select multiple bookings and apply bulk actions (resend confirmation, add note, export) so that I can manage volume efficiently.

- AC-027.1: Booking list must support multi-select with checkboxes and "Select all matching filter".
- AC-027.2: Bulk actions: Resend confirmation, Export CSV, Add internal note, Tag, Reassign to agent.
- AC-027.3: Bulk refund is intentionally NOT supported (require per-booking review).

**US-028: Customer 360 View**

As Yara, I want to see a single 360 view of a customer (bookings, support tickets, wallet, loyalty, WhatsApp history) so that I can serve them with full context.

- AC-028.1: Customer detail page must show: profile, all bookings, wallet transactions, loyalty history, support tickets, WhatsApp conversation history (last 30 days), notes.
- AC-028.2: Quick actions: send WhatsApp, email, adjust wallet (with audit log), adjust loyalty (with audit log).

**US-029: Customer Segmentation**

As Hagar (marketing), I want to build customer segments by criteria (destination, AOV, recency, language, currency, loyalty tier) so that I can run targeted campaigns.

- AC-029.1: Segment builder UI with AND/OR rule chaining.
- AC-029.2: Segment preview shows count and sample customers.
- AC-029.3: Segments can be saved, scheduled (auto-refresh daily), and exported as CSV or pushed to Mailchimp/MoEngage via integration.

### Reports & BI

**US-030: Daily Operations Report**

As Yara, I want a daily morning email summarizing yesterday's bookings, failures, and refunds so that I know where to focus my day.

- AC-030.1: Email sent at 8:00 AM Cairo time to ops distribution list.
- AC-030.2: Content: bookings count + GBV by type, payment success/failure counts, refund count + amount, supplier health summary, top 5 customer issues.
- AC-030.3: Links to full dashboards for drill-down.

**US-031: Revenue Dashboard**

As Tarek, I want a real-time revenue dashboard with GBV, net revenue, refunds, and supplier payables so that I can manage cash and reconcile gateways.

- AC-031.1: Dashboard supports filters: date range, currency, product type (flight/hotel), supplier, payment gateway.
- AC-031.2: Charts: GBV trend, refund trend, net revenue, gateway settlement gap.
- AC-031.3: Drill-down to transaction-level.

**US-032: Marketing Attribution Report**

As Hagar, I want a report showing bookings by acquisition source (UTM, referrer) so that I can measure ROAS.

- AC-032.1: Report shows: source, sessions, bookings, GBV, ROAS (if ad spend imported).
- AC-032.2: Ad spend imported via CSV or Google Ads API in Professional+.

### Multi-Currency

**US-033: Multi-Currency Display**

As an international traveler, I want to see prices in my preferred currency so that I understand what I'm paying.

- AC-033.1: Supported display currencies: EGP, USD, EUR, SAR, AED.
- AC-033.2: Currency selection persists in session and account preferences.
- AC-033.3: Conversion rate clearly disclosed at checkout ("Charged in EGP at 1 EUR = X EGP").

**US-034: Multi-Currency Payment**

As an international traveler, I want to pay in EUR or USD so that I avoid double conversion by my bank.

- AC-034.1: Stripe charges in selected currency.
- AC-034.2: Paymob always charges in EGP regardless of display currency (Paymob limitation).
- AC-034.3: Settlement currency to Jawla's bank is per gateway contract; reconciliation report must handle this.

**US-035: Multi-Currency Wallet**

As above (US-017) - wallet supports EGP, USD, EUR balances per user.

### Foundational (Required for Enterprise Readiness)

**US-036: Event Bus**

As the engineering team, we need a publish/subscribe event bus so that downstream systems (loyalty, WhatsApp, analytics) consume booking events without point-to-point coupling.

- AC-036.1: Event bus implemented via Redis Streams or RabbitMQ.
- AC-036.2: Event taxonomy: booking.created, booking.confirmed, booking.cancelled, booking.refunded, payment.succeeded, payment.failed, supplier.degraded, customer.signed-up.
- AC-036.3: Each event has a schema version and is consumed idempotently.

**US-037: Supplier Abstraction Layer**

As the engineering team, we need a unified supplier interface so that new hotel suppliers can be added in <5 engineering days.

- AC-037.1: Each supplier integration implements a common `IHotelSupplier` interface (search, price-check, book, cancel, voucher).
- AC-037.2: Supplier-specific quirks are handled in adapter classes.
- AC-037.3: New supplier addition is documented in an onboarding runbook.

**US-038: Reporting Data Warehouse**

As the data team, we need a separate analytical store so that reports don't run against the OLTP database.

- AC-038.1: ETL job runs every 30 minutes copying booking, payment, customer events to a PostgreSQL warehouse or ClickHouse.
- AC-038.2: Warehouse schema is dimensional (bookings fact, customer/date/supplier dimensions).
- AC-038.3: Reports query the warehouse only.

---

## Business Requirements

The Basic package's BR-001..BR-025 remain in force. Professional adds:

| ID | Requirement | Priority | Source |
|----|-------------|----------|--------|
| BR-026 | The platform must integrate with at least 3 hotel suppliers, with the architecture supporting addition of a 4th in <5 engineering days. | Must | Procurement |
| BR-027 | The platform must implement a loyalty program with tiers (Member, Silver, Gold, Platinum) and configurable earning/redemption rules editable by Finance without code deploy. | Must | Marketing |
| BR-028 | The platform must implement a stored-value wallet with per-currency balances, top-up via gateways, and audit-logged manual adjustments by admins. | Must | Finance |
| BR-029 | The wallet must be regulatorily compliant: no cash refunds from wallet, max balance EGP 50,000 per customer (Egyptian e-money guidance). | Must | Legal |
| BR-030 | The platform must integrate with WhatsApp Business API (via Meta Cloud API or BSP like 360dialog) for outbound transactional messages and inbound conversation routing. | Must | Marketing + Ops |
| BR-031 | All WhatsApp message templates must be pre-approved in both Arabic and English. | Must | Marketing |
| BR-032 | Customers must be able to cancel a booking and request a refund without contacting support, within supplier-permitted rules. | Must | Operations |
| BR-033 | Self-service cancellations must enforce 2FA (OTP) before processing. | Must | Security |
| BR-034 | The admin panel must support customer 360 views, bulk actions on bookings, and customer segmentation. | Must | Operations + Marketing |
| BR-035 | The platform must produce daily/weekly/monthly reports for operations, finance, and marketing accessible via dashboard and exportable as CSV/PDF. | Must | Operations + Finance |
| BR-036 | Display currency support: EGP, USD, EUR, SAR, AED (minimum 5 currencies). | Must | Product |
| BR-037 | Payment currency support: EGP via Paymob; EGP, USD, EUR, SAR, AED via Stripe. | Must | Finance |
| BR-038 | All inter-service communication must flow through a documented event bus to enable future Enterprise capabilities. | Must | Architecture |
| BR-039 | Reports must run against a dedicated analytical store, not the production OLTP database, to ensure no impact on booking latency. | Must | Engineering |
| BR-040 | The platform must capture and retain marketing attribution (UTM, referrer, click ID) at session and booking level for at least 24 months. | Must | Marketing |
| BR-041 | Wallet balances must be journaled in a double-entry ledger to support financial audit. | Must | Finance |
| BR-042 | Loyalty points liability must be tracked as a balance-sheet item with monthly accrual reports. | Must | Finance |
| BR-043 | The platform must comply with PCI DSS SAQ-A continued scope despite wallet (since wallet does NOT store PAN). | Must | Compliance |
| BR-044 | Customer-facing emails and WhatsApp messages must include unsubscribe/opt-out links compliant with relevant marketing law. | Must | Legal |
| BR-045 | The platform must support a minimum of 500 concurrent users with p95 latency < 2.5s on key paths in Professional. | Must | Engineering |
| BR-046 | All admin financial actions (wallet adjustment, loyalty adjustment, refunds >EGP 10K) must require dual approval. | Must | Compliance |
| BR-047 | The platform must support feature flags so that loyalty, WhatsApp, and self-service can be rolled out progressively. | Should | Product |
| BR-048 | Translations must be managed via an i18n platform (Phrase, Lokalise, Crowdin) rather than hardcoded files, to enable non-engineering content updates. | Should | Product |
| BR-049 | The data warehouse must retain transactional data for 7 years per Egyptian financial record retention rules. | Must | Compliance |
| BR-050 | WhatsApp opt-out preferences must be honored within 5 minutes across all systems (no opt-out leakage). | Must | Legal |

---

## Functional Acceptance Criteria

### FAC-7: Multi-Supplier Hotel Search

A hotel search is functionally correct when:
1. All configured suppliers are queried in parallel.
2. Suppliers exceeding 4s timeout are abandoned for this request only.
3. Returned offers are normalized to a common offer schema.
4. Duplicates are merged using property identity rules.
5. Ranking is applied per the configured algorithm.
6. The user sees a consolidated, ranked list with no indication of which supplier provided which offer (except in admin debug mode).

### FAC-8: Hotel Booking with Supplier Failover

A hotel booking is functionally correct when:
1. The selected offer's price is re-validated with the originating supplier.
2. If re-validation fails, the user is prompted with the new price (if available) before payment.
3. Payment is captured.
4. Supplier booking API is called.
5. If supplier booking fails post-payment, refund is auto-initiated and ops is alerted.
6. Voucher is generated and delivered via email + WhatsApp (if opted in).

### FAC-9: Loyalty Earning

A loyalty earning event is functionally correct when:
1. The earning rule is applied based on the customer's tier at booking time.
2. Points are calculated against the net booking amount (excluding taxes, fees, supplier markups).
3. Points are credited to the loyalty ledger with the booking reference.
4. Points are locked until 24h after travel/stay completion.
5. Customer is notified of earned points via UI badge and WhatsApp (if opted in).

### FAC-10: Wallet Top-Up

A top-up is functionally correct when:
1. User selects amount and currency.
2. Payment via Paymob (EGP only) or Stripe (any supported currency) is captured.
3. Wallet ledger is credited for that currency.
4. Top-up bonus (if active per tier) is credited as a separate ledger entry tagged "bonus".
5. Receipt email/WhatsApp is sent.

### FAC-11: WhatsApp Notification Delivery

A WhatsApp notification is functionally correct when:
1. The user has opted in.
2. The template is approved for the user's language.
3. The message ID returned by the WhatsApp API is logged.
4. Delivery and read receipts (webhooks) are processed.
5. Failed deliveries (24h template expiry, user blocked, etc.) fall back to email automatically.

### FAC-12: Self-Service Cancellation

A self-service cancellation is functionally correct when:
1. Customer is authenticated.
2. The booking is in cancellable status per supplier rules.
3. The customer is shown the financial impact pre-confirmation.
4. OTP is verified.
5. Supplier cancellation API is called and response logged.
6. Booking status is updated.
7. Gateway refund is initiated for the entitled amount.
8. Loyalty points are reversed.
9. Wallet balance (if used) is restored.
10. Customer receives confirmation across all opted channels.

### FAC-13: Multi-Currency Settlement Reconciliation

A reconciliation cycle is functionally correct when:
1. Gateway settlement files are auto-ingested daily.
2. Each settlement line is matched to a booking by reference.
3. FX gains/losses are calculated per the day's central bank reference rate.
4. Discrepancies (unmatched, over/under) are flagged.
5. A daily reconciliation report is generated and emailed to Tarek.

### FAC-14: Report Freshness

All reports must refresh:
1. Operations dashboards: every 5 minutes.
2. Revenue dashboards: every 30 minutes.
3. Marketing reports: hourly.
4. Daily ops report email: by 8:00 AM Cairo time.

---

## KPIs

| KPI | Target | Measurement | Owner | Cadence |
|-----|--------|-------------|-------|---------|
| Hotel Search Result Latency (p95) | < 5.5s with 3 suppliers | APM | Engineering | Weekly |
| Hotel Search Success Rate | > 97% (at least 1 supplier returns results) | Logs | Engineering | Daily |
| Supplier Concentration (HHI) | < 4500 | Monthly aggregation | Finance | Monthly |
| Property Deduplication Accuracy | > 92% | Sampled audit | Engineering | Monthly |
| Loyalty Enrollment Rate | > 65% of new accounts | DB query | Marketing | Weekly |
| Loyalty Points Liability | Tracked, reported monthly | Ledger | Finance | Monthly |
| Wallet Active Users | > 25% of active customers | DB query | Marketing | Monthly |
| Wallet Average Balance | > EGP 600 | DB query | Marketing | Monthly |
| Wallet-Funded Booking Share | > 12% of bookings | DB query | Product | Monthly |
| WhatsApp Opt-In Rate | > 70% | Checkout analytics | Product | Weekly |
| WhatsApp Delivery Rate | > 98% | WhatsApp API webhooks | Engineering | Weekly |
| WhatsApp Read Rate | > 80% | WhatsApp webhooks | Marketing | Weekly |
| Self-Service Cancellation Share | > 60% of cancellations | DB query | Product | Monthly |
| Average Refund Processing Time | < 90 seconds (system) | Logs | Engineering | Weekly |
| Refund Customer Satisfaction (CSAT) | > 4.3/5 | Post-refund survey | Operations | Monthly |
| Support Tickets per 100 Bookings | < 4 | Helpdesk | Operations | Weekly |
| Repeat Customer Rate | > 30% | DB query | Marketing | Monthly |
| Customer LTV (12-month) | > EGP 18,000 | Cohort analysis | Marketing | Quarterly |
| Tier Upgrade Rate (Member -> Silver) | > 15% | Loyalty DB | Marketing | Monthly |
| Multi-Currency Bookings Share | > 18% | DB query | Product | Monthly |
| Currency Conversion Margin | > 1.5% | Reconciliation report | Finance | Monthly |
| Report Dashboard Adoption | > 5 active users/week in each team | Dashboard analytics | Product | Monthly |
| Event Bus Throughput | > 200 events/sec sustainable | Load test | Engineering | Quarterly |
| Event Processing Lag (p95) | < 5 seconds | Bus metrics | Engineering | Weekly |
| Data Warehouse ETL Lag | < 35 minutes | ETL logs | Engineering | Daily |
| Site Uptime | > 99.7% | Monitoring | Engineering | Monthly |
| MTTR | < 30 minutes | Incident logs | Engineering | Per incident |

---

## Milestones

| Phase | Deliverables | Duration | Payment Trigger | Payment % | Amount (EGP) |
|-------|--------------|----------|-----------------|-----------|---------------|
| M0 - Contract Signing | Signed SOW, kickoff, environment provisioning, Amadeus consultant continuation, supplier contracts initiated | Day 0 | Contract executed | 20% | 169,000 |
| M1 - Discovery & Architecture | Multi-supplier orchestration design, loyalty/wallet ledger schema, WhatsApp template catalog (drafts), report inventory, multi-currency flow diagrams, event bus design, data warehouse schema, updated Figma for 25+ new screens | Weeks 1-2 | M1 acceptance | 12% | 101,400 |
| M2 - Foundations | Event bus live, supplier abstraction layer with 1 existing + 2 new suppliers, multi-currency display, data warehouse with first ETL | Weeks 2-5 | Integration demos | 15% | 126,750 |
| M3 - Loyalty & Wallet | Loyalty engine, wallet ledger, earning rules, redemption flow, top-up flow, tier benefits UI, admin loyalty/wallet tools | Weeks 5-8 | Loyalty end-to-end demo + finance reconciliation | 15% | 126,750 |
| M4 - WhatsApp & Self-Service | WhatsApp integration with all templates approved, opt-in flow, transactional messages, inbound routing, self-service cancellation, self-service refund tracking, self-service modification (where supported) | Weeks 8-11 | Live cancellation demo against staging supplier | 15% | 126,750 |
| M5 - Advanced Admin & Reports | Customer 360, bulk actions, customer segmentation, daily ops report, revenue dashboard, marketing attribution report, supplier health dashboard, supplier margin report | Weeks 11-13 | Stakeholder dashboard tour with sample data | 10% | 84,500 |
| M6 - UAT, Hardening, Launch | UAT (400+ test cases), security review, load test (500 concurrent), accessibility audit, production deploy, 2-week hypercare | Weeks 13-14 | First 200 live Professional-feature bookings | 13% | 109,850 |
| **TOTAL** | | **12-14 weeks** | | **100%** | **845,000** |

### Detailed Milestone Acceptance Criteria

**M1 Acceptance**
- Architecture diagrams approved for: event bus, supplier abstraction, multi-currency flow, loyalty/wallet ledger.
- All hotel supplier contracts have written commitment (LOI or signed).
- WhatsApp Business API account approved by Meta.
- Data warehouse choice finalized (PostgreSQL OR ClickHouse) with rationale.
- All 25+ new screen designs have AR + EN variants.

**M2 Acceptance**
- 3 hotel suppliers return live results in staging.
- Deduplication logic demonstrated against known duplicate sets.
- Currency switcher renders all 5 currencies; FX feed running.
- First ETL job runs nightly and report dashboard shows yesterday's mock booking data.
- Event bus emits and consumes booking.created event end-to-end.

**M3 Acceptance**
- Customer can earn points on a test booking.
- Customer can top up wallet via Paymob + Stripe.
- Customer can redeem wallet + apply at checkout.
- Tier upgrade nightly job processes mock data correctly.
- Finance can audit ledger: every wallet/loyalty transaction has a counter-entry.

**M4 Acceptance**
- WhatsApp template messages send successfully in production-equivalent.
- Opt-in/out tested end-to-end including suppression list.
- Self-service cancellation tested against each supplier's staging API.
- OTP enforcement verified.
- Failed-supplier cancellation queues to ops correctly.

**M5 Acceptance**
- All listed dashboards render with live data from warehouse.
- Bulk actions tested on 100+ bookings.
- Customer segmentation builder produces correct counts on sample data.
- Daily ops report email delivers and renders correctly.

**M6 Acceptance**
- UAT script (400+ cases) >95% pass rate.
- Security review: no Critical or High findings.
- Load test sustains 500 concurrent with p95 < 2.5s on key endpoints.
- A11y audit: WCAG 2.1 AA on key flows.
- 200 real bookings using new features within hypercare window.

---

## Feature Prioritization (MoSCoW)

### Must Have

| Feature | Justification |
|---------|---------------|
| Multi-supplier hotel orchestration (3 suppliers) | Inventory depth is the #1 customer complaint about single-supplier OTAs |
| Property deduplication | Without this, users see "the same hotel twice at different prices" - trust destroyer |
| Supplier circuit breaker | Single supplier outage cannot bring down the OTA |
| Loyalty program (4 tiers) | Retention driver, marketing campaigns need a lever |
| Loyalty ledger (auditable) | Finance + compliance requirement |
| Wallet (multi-currency) | Strategic differentiator + refund infrastructure |
| Wallet top-up via gateways | Otherwise wallet is unfundable |
| WhatsApp transactional notifications | MENA market preference |
| WhatsApp opt-in/opt-out compliance | Legal requirement |
| Self-service cancellation | Support cost reduction; modern OTA expectation |
| Self-service refund status | Tier-1 cause of support tickets without it |
| Multi-currency display (5 currencies) | Tourist market |
| Multi-currency payment via Stripe | Tourist market + currency hedging |
| Multi-currency wallet | Required for international refunds |
| Customer 360 admin view | Support efficiency at scale |
| Bulk admin actions | Required to scale ops |
| Customer segmentation | Marketing campaigns |
| Daily ops report email | Operational rhythm |
| Revenue dashboard | Finance discipline |
| Supplier health dashboard | Operational reliability |
| Supplier margin report | Commercial negotiation lever |
| Marketing attribution capture + report | ROAS measurement |
| Event bus | Architectural prerequisite for Enterprise |
| Data warehouse | Performance + analytics prerequisite |
| Feature flags | Safe progressive rollout |
| Dual approval for high-value admin actions | Fraud and error containment |

### Should Have

| Feature | Justification |
|---------|---------------|
| Self-service booking modification (date change) | Customer convenience, supplier-dependent |
| Loyalty birthday bonus | Retention engagement, low effort |
| Wallet top-up bonus per tier | Top-up volume driver |
| Per-supplier traffic shaping (override) | Manual margin optimization |
| Translation management platform integration | Non-engineering content updates |
| WhatsApp inbound conversation routing | Better support UX |
| In-app notification center | Web complement to WhatsApp/email |
| Saved search alerts (email when price drops) | Retention loop |
| Referral program (basic, "share & earn") | Acquisition |
| Mailchimp / MoEngage export integration | Marketing efficiency |

### Could Have

| Feature | Justification |
|---------|---------------|
| Gift cards (top-up someone else's wallet) | Differentiator but low-volume |
| Loyalty marketplace (redeem points for non-travel rewards) | Out of scope unless partnerships exist |
| Browser push notifications | Channel saturation already high |
| Live chat widget with WhatsApp handoff | Polish |
| Hotel map view with cluster pins | UX polish |
| Personalized homepage (last-search rebuy) | Personalization stack would need to mature |
| Trip wallet sharing (family budget) | Complex permission model |

### Won't Have (in Professional - reserved for Enterprise)

| Feature | Package |
|---------|---------|
| Tour packages, bundled deals | Enterprise |
| B2B agent portal | Enterprise |
| Mobile apps | Enterprise |
| White-label | Enterprise |
| Dynamic pricing engine | Enterprise |
| Group/corporate bookings | Enterprise |
| Multi-branch operations | Enterprise |
| Fraud detection (ML) | Enterprise |
| Custom dashboards (drag-drop) | Future |
| Native iOS/Android | Enterprise |

---

## Out of Scope

The Professional package does NOT deliver:

1. **Tour Packages / Bundled Deals**: Static or dynamic packaging of flight+hotel+activity bundles - reserved for Enterprise.
2. **B2B Agent Portal**: Markup management, agent accounts, commission accounting - Enterprise.
3. **Mobile Applications (Native)**: Responsive web only; no iOS/Android - Enterprise.
4. **White-Label / Multi-Tenant**: Single Jawla brand - Enterprise.
5. **Dynamic Pricing Engine**: Rules-based markup per route/season/customer segment - Enterprise.
6. **Fraud Detection (ML)**: Beyond Stripe Radar default rules and gateway 3DS - Enterprise.
7. **Group Bookings (>9 passengers, corporate offline rates)**: Requires offline workflow integration.
8. **Multi-Branch Operations**: Single legal entity, single bank account assumed.
9. **In-platform Live Chat with Agent Routing**: WhatsApp inbound only; full omnichannel inbox is a separate engagement.
10. **Drag-Drop Custom Dashboard Builder**: Reports are pre-defined; ad-hoc analysis happens in Metabase/Excel.
11. **Migration of Wallet Balances from Legacy Systems**: Greenfield wallet only.
12. **Crypto Payments, BNPL beyond what Paymob/Stripe natively offer**.
13. **Travel Insurance Integration**: Could be added as a Should-Have via aggregator (insure-by API), but not committed in scope.
14. **Comprehensive SEO Content Engine**: Programmatic destination pages - separate marketing engagement.
15. **A/B Testing Infrastructure**: Feature flags exist but full experimentation platform (GrowthBook, Optimizely) is not included.
16. **Native Push Notifications (Web Push or Mobile Push)**.
17. **Voice / IVR Integration**.
18. **Hardware POS Integration**.
19. **External CRM Integration Beyond CSV Export**: HubSpot/Salesforce two-way sync is separate.
20. **Custom Loyalty Marketplace** (redeem points for non-travel items).

---

## Risks & Mitigation

The Basic package's R-001..R-020 remain applicable (especially supplier, payment, Amadeus, deliverability risks). Professional-specific risks:

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|----|------|------------|--------|------------|-------|
| R-021 | Hotel supplier deduplication is poor, customers see duplicates and lose trust | High | High | Use established property identity service (GIATA); A/B test ranking variants; manual QA against top-50 destinations | Engineering |
| R-022 | Supplier contracts (esp. 2nd and 3rd) delayed, blocking M2 | High | High | Initiate all 3 supplier conversations pre-contract; weekly procurement standup; have a "1 supplier minimum" launch fallback | Procurement |
| R-023 | Loyalty liability grows unhedged, becomes a financial risk | Medium | High | Monthly liability accrual reporting; conservative initial earning rules with adjustment authority; expiration policy (24 months) | Finance |
| R-024 | Wallet abuse (chargeback after top-up + redemption) | Medium | High | Velocity rules; max top-up limits; KYC at first booking; non-refundable wallet policy disclosed prominently | Finance + Engineering |
| R-025 | WhatsApp template approval rejection delays M4 | Medium | High | Submit templates in M1; have multiple variants per template; engage Meta BSP early | Marketing |
| R-026 | WhatsApp opt-in rate is low (<40%) making the integration uneconomical | Medium | Medium | A/B test opt-in UX; default-on opt-in (legal review required); incentive (loyalty bonus for opt-in) | Product |
| R-027 | Self-service cancellation triggers refund spikes that strain cash | Medium | Medium | Set a refund processing SLA (3-7 business days disclosed); cash flow model accounts for refund liability | Finance |
| R-028 | Self-service refund mishandles edge case (partial refunds, fees), customer overpaid | Medium | High | Refund calculator unit-tested against all supplier rule variants; agent-review queue for any refund >EGP 5K | Engineering + Ops |
| R-029 | Multi-currency reconciliation gaps confuse Finance | High | High | Daily auto-reconciliation; clear FX gain/loss reporting; finance acceptance testing in M3 | Finance + Engineering |
| R-030 | Event bus introduces consistency bugs (eventual consistency confuses customers) | Medium | Medium | Document eventual-consistency boundaries; UI shows "updating" states; events processed within 5s p95 | Engineering |
| R-031 | Data warehouse ETL falls behind (>1h lag), reports stale | Medium | Medium | Monitor ETL lag with alerts; incremental ETL design; CDC if warehouse stress builds | Engineering |
| R-032 | Customer segmentation queries hit the OLTP DB by mistake, causing slowdowns | Low | High | Segmentation strictly queries warehouse; read replica fallback if warehouse is down | Engineering |
| R-033 | Loyalty earning rules become misaligned with finance (over-rewarding) | Medium | High | All rule changes require dual approval (Marketing + Finance); rule change audit log | Finance + Marketing |
| R-034 | Hotel suppliers' terms differ (cancellation, refund, modification), confusing customers | High | Medium | Normalize policy display in plain language; supplier-specific edge cases hidden behind common UX | Product |
| R-035 | WhatsApp message volume exceeds budget (per-message cost) | Medium | Medium | Track per-message cost; throttle non-essential messages; tier essential vs nice-to-have | Finance |
| R-036 | Customer 360 view exposes PII to wrong roles | Medium | Critical | RBAC enforcement; minimum-necessary fields per role; PII access audited | Security |
| R-037 | Bulk actions executed in error affect thousands of customers | Medium | Critical | Confirmation step with row count; rate limit; dry-run mode | Engineering + Ops |
| R-038 | Multi-supplier ranking algorithm accidentally favors higher-margin supplier over best customer experience | Medium | High | Documented ranking weights; product approval of weight changes; quarterly review | Product |
| R-039 | Tier upgrade rules feel unfair to customers (e.g., calculated wrong period) | Low | Medium | Public tier policy page; rolling 12-month calculation transparency; appeal process | Product + Ops |
| R-040 | Translation platform integration adds complexity for engineers without freeing content team | Low | Low | Pilot with marketing on small surface first; train content team in M5 | Product |

---

## Open Questions

| ID | Question | Owner | Required By |
|----|----------|-------|-------------|
| OQ-021 | Final selection of the 3 hotel suppliers - which combination of Hotelbeds, EAN, TBO, Booking.com Affiliate, Agoda B2B? Trade-offs in coverage, commercial terms, technical effort. | Product + Finance | End of Week 1 |
| OQ-022 | Loyalty earning rates per tier - is 1 pt per EGP 10 too generous? Liability modeling needed. | Finance | M1 |
| OQ-023 | Point redemption value - 100 pts = EGP 10? Or floating? Affects perceived value vs liability. | Finance + Marketing | M1 |
| OQ-024 | Tier thresholds - what 12-month spend qualifies Silver/Gold/Platinum? | Marketing + Finance | M1 |
| OQ-025 | Point expiration - 24 months from earning, or 24 months from last activity (rolling)? Major liability impact. | Finance | M1 |
| OQ-026 | Wallet max balance enforcement - is EGP 50K appropriate? Check Central Bank of Egypt e-money guidance. | Legal | M1 |
| OQ-027 | KYC requirement for wallet - mandatory at first top-up, or only above EGP threshold? | Legal | M2 |
| OQ-028 | WhatsApp BSP choice - Meta Cloud API directly, or via 360dialog / Twilio / Wati? | Engineering + Marketing | M1 |
| OQ-029 | WhatsApp business profile - registered to which legal entity, which Facebook Business Manager? | Marketing | M1 |
| OQ-030 | WhatsApp inbound - route to existing helpdesk (which?) or build a lightweight inbox? | Operations | M2 |
| OQ-031 | Self-service modification scope - which fields are modifiable for each booking type? | Product + Suppliers | M3 |
| OQ-032 | 2FA channel for cancellations - SMS OTP (cost), email OTP (slower), or both? | Security | M3 |
| OQ-033 | Customer-initiated chargebacks - if customer disputes after self-service refund, how do we defend? Document the consent flow. | Legal + Finance | M4 |
| OQ-034 | Currency conversion source - XE.com (paid), Central Bank of Egypt (free, daily), or commercial bank rate? | Finance | M1 |
| OQ-035 | FX spread on conversion - 1.5%? 2.5%? Visible to customer? | Finance | M1 |
| OQ-036 | Settlement currency from Stripe - keep in USD/EUR, or auto-convert to EGP at Stripe? | Finance | M2 |
| OQ-037 | Reporting access control - all reports for all staff, or RBAC per dashboard? | Product + Security | M5 |
| OQ-038 | Marketing attribution - implement first-party tracking (server-side) given iOS/cookie restrictions? | Marketing + Engineering | M4 |
| OQ-039 | Customer segmentation export destinations - Mailchimp, Klaviyo, MoEngage, CSV only? | Marketing | M5 |
| OQ-040 | Data warehouse choice - PostgreSQL replica (simple, slower at scale) vs ClickHouse (fast, more ops overhead)? | Engineering | M1 |
| OQ-041 | Event bus choice - Redis Streams (simple, lower throughput) vs RabbitMQ (mature, heavier) vs Kafka (overkill?) | Engineering | M1 |
| OQ-042 | Feature flag tool - LaunchDarkly (paid), Unleash (OSS, self-host), GrowthBook (OSS+SaaS)? | Engineering | M2 |
| OQ-043 | i18n platform - Phrase (premium), Lokalise, Crowdin, or stick with hardcoded JSON? | Product | M1 |
| OQ-044 | Birthday bonus mechanic - automatic credit on birthday, or coupon? Tax implications? | Finance + Marketing | M3 |
| OQ-045 | What is the migration plan from Basic to Professional - is there a customer-impacting downtime window, or rolling deploys? | Engineering | M6 |
| OQ-046 | Refund SLA disclosure - "3-7 business days" is standard; do we want to commit to a faster SLA to differentiate? Operational feasibility check needed. | Operations + Finance | M4 |
| OQ-047 | Loyalty + supplier conflict - some hotel suppliers offer their own loyalty (e.g., Hotelbeds prefer rate codes); how do we present? | Product | M3 |
| OQ-048 | Are there Egyptian e-money / wallet specific licenses required if balance exceeds X? | Legal | M1 |
| OQ-049 | What is the Professional package's accessibility commitment - WCAG 2.1 AA on all pages or just core flows? | Product + Design | M2 |
| OQ-050 | Post-launch optimization - is there a continuous-improvement retainer planned, or is this delivery-only? | Contract | M6 |

---

## Appendix A: Architecture Additions (Reference)

| Layer | Addition vs Basic |
|-------|-------------------|
| Event Bus | Redis Streams (default) or RabbitMQ |
| Data Warehouse | PostgreSQL Analytical Replica (default) or ClickHouse |
| Hotel Suppliers | Adapter pattern under `apps/backend/src/integrations/hotels/<supplier>` |
| WhatsApp | Meta Cloud API (default) via webhook gateway |
| Loyalty Service | Standalone NestJS module with own DB schema (loyalty.*) and event handlers |
| Wallet Service | Double-entry ledger module (wallet.ledger, wallet.account) with strong consistency boundary |
| Reporting | Metabase deployed as containerized service against warehouse |
| Feature Flags | Unleash self-hosted (default) |
| i18n | Phrase (default) with sync CLI in CI |
| Translation Workflow | Marketing edits in Phrase -> CI sync -> deploy |

## Appendix B: Glossary Additions

| Term | Definition |
|------|------------|
| HHI | Herfindahl-Hirschman Index (supplier concentration) |
| BSP | Business Solution Provider (for WhatsApp) |
| CDC | Change Data Capture (for ETL) |
| RBAC | Role-Based Access Control |
| LTV | Lifetime Value |
| ETL | Extract Transform Load |
| OLTP | Online Transaction Processing |
| FX | Foreign Exchange |

## Appendix C: Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Business Sponsor | _________________ | _________________ | _________ |
| Product Lead | Ahmed Mahmoud | _________________ | 2026-06-29 |
| Engineering Lead | _________________ | _________________ | _________ |
| Finance Approver | _________________ | _________________ | _________ |
| Legal Reviewer | _________________ | _________________ | _________ |
| Marketing Lead | _________________ | _________________ | _________ |
