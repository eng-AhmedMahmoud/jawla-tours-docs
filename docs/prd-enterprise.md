# Jawla Tours OTA - Enterprise Package PRD

## Document Control

| Field | Value |
|-------|-------|
| Document Title | Jawla Tours OTA - Enterprise Package Product Requirements Document |
| Version | 1.0.0 |
| Date | 2026-06-29 |
| Status | Approved for Development |
| Document Owner | Ahmed Mahmoud (Technical Product Lead) |
| Business Sponsor | Jawla Tours Executive Team + Board |
| Engineering Lead | TBD - Backend Lead, Frontend Lead, Mobile Lead, Platform Lead |
| Data/BI Lead | TBD - Senior Analytics Engineer |
| Security Lead | TBD - Security Engineer (cross-cutting) |
| Design Lead | TBD - Design Director (web, mobile, B2B portal) |
| Amadeus Integration Consultant | External Specialist (~100-120 hours allocated) |
| Mobile Lead Engineer | TBD - React Native specialist |
| Classification | Internal - Confidential, Board Eyes |
| Distribution | Engineering, Product, QA, Finance, Operations, Customer Success, Legal, Executive |
| Next Review Date | 2026-09-29 |
| Supersedes | None (extends Basic and Professional PRDs v1.0.0) |

### Revision History

| Version | Date | Author | Change Summary |
|---------|------|--------|----------------|
| 0.1.0 | 2026-05-25 | A. Mahmoud | Enterprise scope inception; board strategy alignment |
| 0.3.0 | 2026-06-02 | A. Mahmoud | Packages module, B2B portal scope |
| 0.5.0 | 2026-06-10 | A. Mahmoud | Mobile apps decision (React Native), dynamic pricing approach |
| 0.7.0 | 2026-06-18 | A. Mahmoud | White-label model defined, fraud detection scope |
| 0.9.0 | 2026-06-25 | A. Mahmoud | Group/corporate, multi-branch finalized |
| 1.0.0 | 2026-06-29 | A. Mahmoud | Final approved baseline |

### Relationship to Basic & Professional Packages

The Enterprise package is a strict superset of the Basic and Professional packages. It includes everything in those PRDs, plus the additional capabilities described in this document. Where a feature appears in multiple PRDs, the Enterprise definition supersedes prior definitions.

### Related Documents

- Jawla Tours Master Statement of Work (SOW-2026-001)
- Jawla Tours Basic Package PRD v1.0.0
- Jawla Tours Professional Package PRD v1.0.0
- Amadeus Enterprise API Agreement (Negotiations Underway)
- Hotelbeds, Expedia EAN, TBO Master Distribution Agreements
- WhatsApp Business API - Meta Cloud API Onboarding
- Apple Developer Program enrollment (Jawla legal entity)
- Google Play Developer enrollment (Jawla legal entity)
- White-Label Master Customer Agreement Template (Legal draft)
- Egyptian Tourism Authority Licensing memo
- PCI DSS Level 1 - Initial Assessment

---

## Vision

The Enterprise package elevates Jawla from a competitive Egyptian OTA to a regional travel commerce platform. The Basic package proved Jawla can transact. The Professional package proved Jawla can compete. The Enterprise package establishes Jawla as a platform business: a multi-channel, multi-product, multi-tenant operation that can serve direct consumers, travel agents, corporate clients, and white-label partners simultaneously.

Strategic transformations in this package:

1. **Product expansion beyond commodity inventory**: tour packages, dynamic flight+hotel bundles, day tours, transfers, and curated multi-destination itineraries - higher-margin offerings that differentiate from price-aggregator competitors.
2. **Channel expansion**: native iOS and Android mobile apps with push notifications, offline access, biometric auth, and mobile-first booking flows; a dedicated B2B agent portal with markup management, commission accounting, and credit lines.
3. **Customer expansion**: group bookings (10+ travelers), corporate accounts with policy enforcement, multi-branch operations (Cairo HQ + regional branches), and white-label partner brands.
4. **Operational maturity**: dynamic pricing engine, real-time fraud detection (ML-based), advanced supplier orchestration with margin optimization, multi-currency multi-entity settlement.
5. **Platform stewardship**: white-label tenancy, role-based access control across complex personas, API platform for partners, comprehensive audit and compliance posture (PCI DSS Level 1, SOC 2 Type 1 readiness).

The Enterprise package is the right scope for Jawla if (a) the Professional package has demonstrated repeat-customer economics, (b) the brand has established credibility in the Egyptian market and is ready to extend into corporate/agent/regional segments, and (c) the operational team is prepared to manage complexity at a different magnitude (10-50x volume). It is NOT the right scope for a Jawla that is still validating direct-consumer demand.

The Enterprise package is intentionally a multi-quarter investment. It must be approached as a series of vertically-integrated workstreams, not as a feature list to be executed sequentially. Workstreams include: Mobile, B2B, Packages, Dynamic Pricing, Fraud, White-Label, Group/Corporate, Multi-Branch. Each has its own engineering lead, design lead, and acceptance gate.

---

## Goals & Success Metrics

### Strategic Goals

1. **Platform GBV exceeds EGP 200M annualized within 6 months of Enterprise launch** (vs ~EGP 75M for Professional baseline).
2. **Channel diversification**: at least 25% of GBV from B2B (agents + corporate), at least 35% from mobile apps within 12 months.
3. **Product mix shift**: at least 18% of GBV from packages and ancillary products (vs <1% baseline).
4. **Regional extension**: launch white-label deployments for at least 2 partner brands within 6 months.
5. **Operational scale**: support 10,000 concurrent users with no degradation; 50,000 bookings/month at >99.9% uptime.
6. **Compliance posture**: PCI DSS Level 1 certified; SOC 2 Type 1 attestation in progress; GDPR-equivalent privacy program operationalized.
7. **Fraud reduction**: chargeback rate < 0.25% (industry-leading); fraud losses < 0.15% of GBV.

### Success Metrics (180 days post Enterprise launch)

| Metric | Target | Baseline (Professional) |
|--------|--------|---------------------------|
| Annualized GBV | > EGP 200M | EGP 75M |
| B2B Share of GBV | > 25% | 0% |
| Mobile Share of GBV | > 35% | 0% |
| Package Share of GBV | > 18% | <1% |
| White-Label Partner Brands Live | >= 2 | 0 |
| Confirmed Bookings (Monthly Peak) | > 50,000 | ~5,000 |
| Concurrent Users (Peak) | > 10,000 | ~800 |
| System Uptime | > 99.9% | 99.7% |
| Chargeback Rate | < 0.25% | 0.6% |
| Fraud Loss as % of GBV | < 0.15% | n/a |
| B2B Agent Active (transacting/month) | > 250 | 0 |
| Corporate Accounts Live | > 30 | 0 |
| Mobile App Store Rating (iOS & Android avg) | > 4.5 | n/a |
| Dynamic Pricing Revenue Lift | > 6% vs flat-markup baseline | n/a |
| Multi-Branch Locations Operational | >= 3 | 1 |
| Group Booking Share | > 8% of GBV | <0.5% |

---

## Personas

The Basic and Professional personas remain valid. Enterprise introduces 7 new personas that the platform must serve as first-class users.

| Persona | Name | Age | Location | Goals | Pain Points |
|---------|------|-----|----------|-------|-------------|
| Mobile-First Gen Z Traveler | Layla Hany | 23 | Cairo, Egypt | Book everything on mobile in <2 min; use biometric login; receive instant push notifications; share trip with friends | Web-only OTAs feel dated; manual logins are friction; misses real-time updates when app is closed |
| Independent Travel Agent (B2B) | Mohamed Helal | 38 | Tanta, Egypt | Run his own small agency; book on behalf of walk-in customers; apply his markup; receive monthly commission settlement; access credit line for large bookings | Manual GDS too expensive; consumer OTAs don't allow markup; chasing supplier commissions is exhausting; no credit terms |
| Corporate Travel Manager | Rania Saad | 42 | Cairo, Egypt (multinational HQ) | Book staff travel within company policy; consolidated monthly invoice; tax-compliant receipts; restrict to allowed airlines/hotels; emergency 24/7 support | Multi-tool stack; policy violations slip through; expense reports are a nightmare; no unified booking history |
| Group Booking Coordinator | Karim Adel | 35 | Cairo, Egypt | Book 30-person family Umrah group; needs same flight/hotel for all; flexible payment per traveler; bulk passenger data | OTAs cap at 9 passengers; supplier offline rates not accessible to consumers; coordinating payment from multiple sources is messy |
| White-Label Partner Owner | Hisham Saber | 47 | Riyadh, Saudi Arabia | Launch his own branded OTA "Saber Travel" backed by Jawla's platform; control branding, pricing, agent network; pay Jawla per booking | Building from scratch is expensive; he has the audience, not the engineering team |
| Multi-Branch Manager | Salma Hossam | 40 | Hurghada Branch | Run the Hurghada branch operations; manage local agents; track branch P&L; sell walk-in customers via branch terminal | Centralized OTAs ignore branch P&L visibility; can't issue local bookings tied to branch revenue |
| Fraud Analyst (new ops role) | Hassan Mounir | 33 | Cairo HQ | Monitor real-time fraud signals; review high-risk bookings; tune rule sets; investigate chargebacks | Reactive only after chargeback hits; no ML scoring; no case management |
| (Elevated) Compliance & Risk Officer | Layla Nour | 45 | Cairo HQ | PCI Level 1 management; SOC 2 program; GDPR-equivalent privacy; audit response | Compliance is bolt-on, not integrated; audits surface gaps too late |
| (Elevated) Executive Stakeholder | Sherif Mahmoud (CEO) | 52 | Cairo HQ | Real-time executive dashboard; channel/segment P&L; cohort retention; investor-grade reporting | Decision data lives in 6 systems; can't see "what is the platform doing right now"; investors ask metrics he doesn't have |

### Persona Coverage Matrix (Enterprise Features)

| Feature | Layla | Mohamed | Rania | Karim | Hisham | Salma | Hassan | Layla N. | Sherif |
|---------|-------|---------|-------|-------|--------|-------|--------|----------|--------|
| Mobile Apps | Primary | Secondary | Secondary | - | Required | - | - | - | Observes |
| B2B Portal | - | Primary | Secondary | - | Required | - | - | - | Observes |
| Tour Packages | Primary | Secondary | Secondary | Primary | Required | - | - | - | Strategic |
| Group Bookings | - | Secondary | Secondary | Primary | Required | - | - | - | - |
| Corporate Accounts | - | - | Primary | - | Required | - | - | - | - |
| Multi-Branch | - | - | - | - | Required | Primary | - | Audits | - |
| Dynamic Pricing | Beneficiary | Beneficiary | - | - | Required | - | - | - | Strategic |
| White-Label | - | - | - | - | Primary | - | - | Audits | Strategic |
| Fraud Detection | Protected | Protected | Protected | Protected | Required | - | Primary | Audits | - |
| Executive Dashboard | - | - | - | - | - | - | - | - | Primary |

---

## User Stories

Stories continue from US-001..US-038 (inherited from Basic and Professional). Enterprise adds US-039 through US-090.

### Tour Packages & Dynamic Bundling

**US-039: Browse Pre-Built Tour Packages**

As a traveler, I want to browse Jawla-curated tour packages (e.g., "Cairo + Luxor + Aswan 7 nights") so that I can pick a complete trip without assembling it myself.

- AC-039.1: Package catalog must include: flight(s), hotel(s), transfers, optional activities; price; itinerary day-by-day; inclusions/exclusions.
- AC-039.2: Packages must be searchable by destination, theme (cultural, beach, Umrah, honeymoon), duration, max price.
- AC-039.3: Each package must show: hero image, gallery, day-by-day timeline, departure city options, available departure dates next 365 days.

**US-040: Book a Pre-Built Tour Package**

As a traveler, I want to book a tour package end-to-end so that I receive a single confirmed itinerary.

- AC-040.1: Booking flow collects passenger details for all travelers (2-9 by default).
- AC-040.2: Payment is single transaction; revenue is split internally per component for supplier settlement.
- AC-040.3: Confirmation includes a single PDF itinerary plus individual vouchers per component (e-tickets, hotel vouchers, transfer vouchers).
- AC-040.4: Each component must be cancelable (within supplier rules) independently or as a package.

**US-041: Dynamic Packaging (Build-Your-Own)**

As a traveler, I want to combine my own flight + hotel selection into a discounted bundle so that I get package-level savings on a custom trip.

- AC-041.1: After selecting a flight, the UI must suggest hotels with bundle discount badge.
- AC-041.2: Bundle discount must be configurable in the pricing engine (default: 5-12% off lead-in rates).
- AC-041.3: Booking flow must atomically book both components or fail and refund.
- AC-041.4: Final price must reflect bundle discount transparently.

**US-042: Day Tours & Activities**

As a traveler, I want to add day tours, transfers, or attraction tickets to my flight/hotel booking so that I plan my full trip on Jawla.

- AC-042.1: Activities sourced from a partner inventory (Viator, GetYourGuide, or local supplier - TBD).
- AC-042.2: Cross-sell after flight or hotel booking and on confirmation page.
- AC-042.3: Booked activities included in customer's My Bookings.

**US-043: Package Admin Builder**

As Hagar (marketing/product), I want to build/edit tour packages in the admin panel so that I can launch new packages without engineering.

- AC-043.1: Builder UI: select flight legs (manual airport pairs + date windows), select hotels (per night), select activities, set markup, set dates valid.
- AC-043.2: Preview shows customer-facing package page.
- AC-043.3: Versioning: published packages can't be edited; create a v2 instead.

### B2B Agent Portal

**US-044: Agent Account Application**

As Mohamed (travel agent), I want to apply for a B2B agent account so that I can book on behalf of customers with markup.

- AC-044.1: Application form: agency name, tax ID, contact info, expected monthly volume, bank details (for commission settlement).
- AC-044.2: Application reviewed by Jawla Sales within 48h with approve/request-info/reject.
- AC-044.3: On approval, agent receives login and a welcome email with portal URL.

**US-045: Agent Booking Flow**

As Mohamed, I want to book flights, hotels, packages on behalf of my customer so that I can sell with my own markup.

- AC-045.1: Booking flow identical to consumer flow but with: customer details fields (separate from agent login), markup field (per booking or default), agent-attributable booking reference.
- AC-045.2: Agent sees net price + their markup + total customer price.
- AC-045.3: Payment can be: customer pays direct via gateway link, agent pays from credit line, agent pays from agency wallet.

**US-046: Agent Markup Management**

As Mohamed, I want to set default markup rules (per product, route, hotel star) so that I don't manually enter markup each booking.

- AC-046.1: Markup rules: % or fixed; per product type; per region; per customer segment.
- AC-046.2: Per-booking override always permitted.
- AC-046.3: Markup rules versioned and auditable.

**US-047: Agent Credit Line**

As Mohamed, I want a credit line so that I can book without paying upfront and settle monthly.

- AC-047.1: Credit line approved by Jawla Finance with a limit (e.g., EGP 50,000 - 500,000).
- AC-047.2: Each booking decrements available credit; cancellation refund restores credit.
- AC-047.3: Monthly invoice generated for outstanding balance; payment due in 15 days.
- AC-047.4: Auto-suspension on overdue >7 days.

**US-048: Agent Commission Statement**

As Mohamed, I want a monthly commission statement so that I can reconcile.

- AC-048.1: Statement: bookings, markup retained by agent, net commission from Jawla (if applicable), credit line activity, settlements.
- AC-048.2: Available as PDF and CSV.

**US-049: Agent Sub-User Management**

As Mohamed (agency owner), I want to add sub-users (my staff) with limited permissions so that my team can book under my account.

- AC-049.1: Sub-user roles: Booker (book only), Manager (book + reports), Admin (everything except billing).
- AC-049.2: All sub-user actions logged under the agency account.

**US-050: B2B Reporting**

As Mohamed, I want to see my agency's bookings, revenue, top customers, top destinations so that I can manage my business.

- AC-050.1: Dashboard: this month bookings + GBV, top 5 customers, top 5 destinations, conversion rate.
- AC-050.2: Filters: date range, product, sub-user.

### Mobile Applications (iOS + Android)

**US-051: Mobile App Onboarding**

As Layla, I want a fast, friendly first-launch experience so that I'm booking within 2 minutes.

- AC-051.1: Onboarding: 3 screens max (welcome, key value props, language); skippable.
- AC-051.2: Login: email/password, phone OTP, Apple Sign-In (iOS), Google Sign-In (both), biometric subsequent login.
- AC-051.3: Permission requests: notifications (asked at right moment, not on app start), location (only when relevant).

**US-052: Mobile Flight Search & Book**

As Layla, I want the same search and booking experience as web, optimized for mobile.

- AC-052.1: Mobile flight search uses native date pickers and airport autocomplete with recent searches.
- AC-052.2: Booking flow steps reduced to fewer screens vs web (combined passenger forms).
- AC-052.3: Payment uses Apple Pay (iOS) and Google Pay (Android) as primary, gateway forms secondary.

**US-053: Mobile Hotel Search & Book**

As above for hotels with map view as primary, list secondary.

**US-054: Push Notifications**

As Layla, I want to receive push notifications for booking updates, price drops on saved searches, and trip reminders.

- AC-054.1: Notification types: booking confirmed, payment processed, refund issued, trip reminder (24h, 2h), price drop on saved search, promo announcement.
- AC-054.2: Notification preferences per type in app settings.
- AC-054.3: Deep links open the relevant screen.

**US-055: Offline Access**

As Layla, I want to access my booking confirmations and vouchers offline (e.g., while traveling without data).

- AC-055.1: Confirmed bookings cached locally on device.
- AC-055.2: Offline mode banner indicates degraded experience.
- AC-055.3: Wallet pass integration (Apple Wallet + Google Wallet) for boarding passes and vouchers.

**US-056: Biometric Authentication**

As Layla, after first login, I want Face ID/Touch ID/Fingerprint to log me in so that I don't type passwords.

- AC-056.1: Biometric enabled in app settings.
- AC-056.2: Falls back to PIN/password.

**US-057: Mobile Loyalty & Wallet**

As Layla, I want full loyalty/wallet functionality on mobile, including QR code for in-branch redemption.

- AC-057.1: Loyalty tier, points balance prominently displayed.
- AC-057.2: Wallet QR code generates an in-branch redemption code valid for 5 min.

### Dynamic Pricing

**US-058: Dynamic Markup Rules Engine**

As Hagar (revenue management), I want to define rules that adjust markup based on signals so that revenue is optimized.

- AC-058.1: Rule attributes: product, route/destination, season, day of week, days-to-departure, customer tier, supplier, demand signal (search velocity), competitor reference (if data exists).
- AC-058.2: Rules combine: base markup + adjustments; final markup capped at floor/ceiling.
- AC-058.3: Each rule has audit log and effective dates.
- AC-058.4: Dry-run mode shows historical impact without applying.

**US-059: Demand-Based Pricing**

As above, with automated demand signals from internal search volume.

- AC-059.1: Search velocity per route/property normalized over rolling window.
- AC-059.2: High-demand items receive uplift markup; low-demand items receive discount to clear.
- AC-059.3: Uplift/discount range bounded (e.g., -5% to +8%).

**US-060: Competitor Reference (If Data Available)**

As Hagar, I want to incorporate competitor price feeds when available so that I price competitively.

- AC-060.1: Competitor data ingested via partner feed or scraping service (legal review required).
- AC-060.2: Pricing engine surfaces "vs competitor: -3%" badge per offer.

**US-061: Revenue Impact Dashboard**

As Hagar, I want to see the revenue impact of dynamic pricing rules so that I can iterate.

- AC-061.1: Dashboard: estimated revenue lift % vs control, by rule.
- AC-061.2: A/B testing supported via the experimentation platform.

### Group & Corporate Bookings

**US-062: Group Booking Request**

As Karim, I want to request a group booking (10-50 passengers) so that Jawla quotes me on offline rates.

- AC-062.1: Form: route/destination, dates, passenger count, preferred class/category, special needs (dietary, mobility).
- AC-062.2: Request routes to group ops desk with SLA 24h response.
- AC-062.3: Quote delivered in-platform; customer accepts/negotiates.

**US-063: Group Booking Confirmation & Payment**

As Karim, I want to pay for the group flexibly so that family/friends can each pay their share.

- AC-063.1: Quote acceptance generates a holding booking with deposit deadline.
- AC-063.2: Per-traveler payment links; payments aggregate to the holding.
- AC-063.3: Full payment by deadline triggers final ticketing/voucher.

**US-064: Corporate Account Setup**

As Rania, I want to set up our corporate account with travel policy and billing details so that staff can book within rules.

- AC-064.1: Account setup: company details, billing address, tax info, credit limit, default approvers.
- AC-064.2: Travel policy: airline whitelist/blacklist, max class per route distance, max hotel star, advance-booking minimum, max accommodation rate.
- AC-064.3: User management: add staff with roles (Traveler, Approver, Admin).

**US-065: Corporate Travel Policy Enforcement**

As Rania, I want bookings that violate policy to require approval so that we control costs.

- AC-065.1: Booking flow validates against policy at quote time; non-compliant offers flagged.
- AC-065.2: Booking submission with violation triggers approver workflow.
- AC-065.3: Approver receives email/notification with one-click approve/reject.

**US-066: Corporate Consolidated Invoicing**

As Rania, I want a single monthly invoice for all company bookings so that AP is simplified.

- AC-066.1: Monthly statement: all bookings with traveler, route, dates, cost, policy compliance.
- AC-066.2: Invoice PDF + XLSX, downloadable and emailed.
- AC-066.3: Payment terms net-30 or as contracted.

**US-067: Corporate 24/7 Support**

As Rania, I want priority support during travel disruptions so that our staff are taken care of.

- AC-067.1: Corporate tier identified at support intake.
- AC-067.2: Dedicated phone line / WhatsApp number for corporate.
- AC-067.3: SLA: 15 min response after-hours.

### Multi-Branch Operations

**US-068: Branch Account Setup**

As Salma, I want my Hurghada branch set up with users, P&L attribution, and inventory access so that we operate as a branch.

- AC-068.1: Branch entity: name, location, manager, tax/cost center reference.
- AC-068.2: Branch user roles: Manager, Counter Agent, Cashier.
- AC-068.3: All bookings created by branch users attribute to the branch P&L.

**US-069: Branch P&L Dashboard**

As Salma, I want to see my branch's bookings, revenue, costs, and margin so that I run my branch as a profit center.

- AC-069.1: Dashboard: daily/weekly/monthly bookings, GBV, COGS, gross margin, top sellers.
- AC-069.2: Drill-down to transaction level.

**US-070: Branch Counter Sales**

As a branch counter agent, I want to book walk-in customers and accept cash/POS payment so that I sell in person.

- AC-070.1: Counter booking flow simplified, no customer login required.
- AC-070.2: Payment methods include: cash (with shift reconciliation), POS terminal, wallet top-up.
- AC-070.3: Receipt printed via local printer (USB or IP).

**US-071: Branch Cash Reconciliation**

As Salma, I want end-of-day cash reconciliation so that I close the branch correctly.

- AC-071.1: Shift open/close workflow.
- AC-071.2: Counted cash vs system cash, variance recorded.
- AC-071.3: Daily reconciliation report sent to HQ Finance.

### White-Label

**US-072: White-Label Partner Onboarding**

As Hisham (Saber Travel), I want to launch my brand on Jawla's platform so that I have my own OTA without engineering investment.

- AC-072.1: White-label tenant provisioned with: brand identity (logo, colors, fonts), domain (saberttravel.com), email sending domain, terms/privacy.
- AC-072.2: Inventory and pricing inheritance: full Jawla inventory at agreed rates.
- AC-072.3: Configurable: payment gateways (partner's own or Jawla's), supported languages, supported currencies.

**US-073: White-Label Tenant Isolation**

As Hisham, I want my customers' data isolated from Jawla's other tenants so that we have data sovereignty.

- AC-073.1: Database-level tenant separation (tenant_id on all rows, with enforcement).
- AC-073.2: No cross-tenant data leakage in any UI or API.
- AC-073.3: Per-tenant backup and restore.

**US-074: White-Label Admin**

As Hisham, I want a white-label admin to manage my brand's customers, bookings, and reports so that I operate independently.

- AC-074.1: Admin instance scoped to tenant.
- AC-074.2: Reports show only tenant's data.
- AC-074.3: Configurable agent/staff roles per tenant.

**US-075: White-Label Billing**

As Hisham, I want a monthly invoice from Jawla for platform fees and per-booking fees so that I pay clearly.

- AC-075.1: Billing model: monthly platform fee + per-booking fee + % of GBV (per contract).
- AC-075.2: Statement: all transactions, fees breakdown, payment due.

### Fraud Detection

**US-076: Real-Time Fraud Scoring**

As Hassan (fraud analyst), I want every booking scored for fraud risk in real time so that I can block high-risk before payment.

- AC-076.1: Fraud signals: BIN, IP geolocation, device fingerprint, velocity (per-card, per-email, per-IP), behavior (time-on-page, browsing pattern), customer history.
- AC-076.2: ML model trained on Jawla's historical chargebacks and curated fraud cases.
- AC-076.3: Scoring < 200ms; booking flow blocks at score >= 85 (config), reviews at 60-85, allows < 60.

**US-077: Fraud Review Queue**

As Hassan, I want a queue of medium-risk bookings to review manually so that we balance friction vs fraud.

- AC-077.1: Queue prioritized by score and booking value.
- AC-077.2: Reviewer sees: signals, customer history, similar past cases.
- AC-077.3: Actions: approve, reject, request additional info from customer.

**US-078: Fraud Rules Editor**

As Hassan, I want to add/edit fraud rules (in addition to ML) so that I respond to emerging patterns.

- AC-078.1: Rule editor: signal threshold + action.
- AC-078.2: Rules tested against historical data before deploy.

**US-079: Chargeback Management**

As Hassan, I want a workflow for incoming chargebacks so that I respond with evidence.

- AC-079.1: Gateway chargeback webhook creates case.
- AC-079.2: Evidence pack auto-assembled: booking, customer info, IP/device, communications, voucher delivery proof.
- AC-079.3: Submit evidence to gateway via API.

### Advanced Admin & Platform Operations

**US-080: Multi-Tenant Admin Console**

As Jawla Operations Director, I want a meta-admin console to manage all tenants (Jawla + white-label partners) so that I oversee the platform.

- AC-080.1: Tenant list with health (uptime, bookings, revenue).
- AC-080.2: Drill-down to tenant-scoped admin.
- AC-080.3: Cross-tenant reporting (Jawla-only view).

**US-081: API Platform for Partners**

As an integration partner, I want a public API to embed Jawla's inventory in my own site so that we expand distribution.

- AC-081.1: REST + GraphQL APIs for search, book, manage.
- AC-081.2: API key management, rate limiting, webhook subscriptions.
- AC-081.3: Public docs and sandbox.

**US-082: Executive Real-Time Dashboard**

As Sherif (CEO), I want a real-time executive dashboard so that I see the business pulse.

- AC-082.1: Today's bookings + GBV + revenue, channel mix (B2C, B2B, mobile, white-label), top tenants, top issues.
- AC-082.2: Mobile-optimized for phone viewing.
- AC-082.3: Weekly executive summary email auto-generated.

**US-083: Cohort & Retention Analytics**

As Sherif, I want cohort analysis (acquisition month vs repeat purchase) so that I understand LTV.

- AC-083.1: Cohort chart with configurable acquisition definition.
- AC-083.2: Drill-down to channel, segment.

### Compliance & Security

**US-084: PCI DSS Level 1 Posture**

As Layla Nour (compliance), the platform must meet PCI DSS Level 1 requirements so that we are audited and certified.

- AC-084.1: Network segmentation isolating cardholder data environment (CDE).
- AC-084.2: Annual penetration test, quarterly vulnerability scan.
- AC-084.3: Documented policies, RBAC enforcement, encryption at rest + in transit.
- AC-084.4: Approved QSA engagement for assessment.

**US-085: SOC 2 Type 1 Readiness**

As above, the platform must achieve SOC 2 Type 1 attestation within 6 months of Enterprise launch.

- AC-085.1: Control framework implemented (CC1-CC9 + selected criteria).
- AC-085.2: Evidence collection automated where possible (Vanta, Drata, or in-house).

**US-086: GDPR-Equivalent Privacy Program**

As Layla Nour, the platform must support data subject rights (access, deletion, portability) so that we comply with the strictest privacy regime applicable.

- AC-086.1: Customer self-serve: download my data, delete my account.
- AC-086.2: Soft-delete with hard-delete after 30 days (where legal permits).
- AC-086.3: Data processing agreements with all vendors.

**US-087: Audit Logging at Platform Scale**

As Layla Nour, all sensitive actions across the platform must be logged immutably with retention so that audits succeed.

- AC-087.1: Append-only audit log to immutable storage (AWS QLDB or equivalent).
- AC-087.2: 7-year retention.
- AC-087.3: Audit log query interface for compliance team.

### Scale & Performance

**US-088: Horizontal Scaling**

As the engineering team, the platform must scale horizontally so that peak loads are served.

- AC-088.1: Stateless services scaled via container orchestrator (Kubernetes or Nomad).
- AC-088.2: Database read replicas; warehouse separation.
- AC-088.3: Caching layers (Redis, CDN) for hot paths.

**US-089: Multi-Region Disaster Recovery**

As the engineering team, the platform must survive a region outage with < 1h RTO so that the business is resilient.

- AC-089.1: Active region + warm standby in second region.
- AC-089.2: Automated failover drills quarterly.
- AC-089.3: Documented runbooks.

**US-090: Comprehensive Observability**

As the engineering team, the platform must have comprehensive observability so that incidents are diagnosed in minutes.

- AC-090.1: Distributed tracing on every request (OpenTelemetry).
- AC-090.2: Centralized logs with structured search.
- AC-090.3: Per-tenant, per-supplier, per-endpoint dashboards.
- AC-090.4: SLO/SLA dashboards for executive view.

---

## Business Requirements

The Basic (BR-001..BR-025) and Professional (BR-026..BR-050) requirements remain in force. Enterprise adds:

| ID | Requirement | Priority | Source |
|----|-------------|----------|--------|
| BR-051 | The platform must support tour packages (pre-built and dynamically assembled) with end-to-end booking, payment, and confirmation as a single transaction. | Must | Product |
| BR-052 | The platform must support a B2B agent portal with markup management, credit lines, commission accounting, and sub-user management. | Must | Sales |
| BR-053 | The platform must offer native mobile applications for iOS and Android with feature parity to web for core booking flows, plus mobile-only capabilities (biometric, push, offline, wallet integration). | Must | Product |
| BR-054 | The platform must support white-label tenancy with tenant-isolated data, branding, domains, and admin. | Must | Sales |
| BR-055 | The platform must include a dynamic pricing engine with configurable rules and demand-based adjustments, with all changes audited and reversible. | Must | Revenue |
| BR-056 | The platform must support group bookings (10+ passengers) with offline-rate workflow, holding bookings, deposit collection, and per-traveler payment links. | Must | Product |
| BR-057 | The platform must support corporate accounts with travel policy enforcement, approver workflows, and consolidated monthly invoicing. | Must | Sales |
| BR-058 | The platform must support multi-branch operations with branch-level P&L, branch user roles, counter sales (cash + POS), and cash reconciliation. | Must | Operations |
| BR-059 | The platform must implement real-time fraud scoring using a combination of rule-based and ML-based methods, with chargeback evidence assembly and submission. | Must | Finance + Security |
| BR-060 | The platform must achieve PCI DSS Level 1 certification within 9 months of Enterprise go-live. | Must | Compliance |
| BR-061 | The platform must achieve SOC 2 Type 1 attestation within 12 months of Enterprise go-live. | Must | Compliance |
| BR-062 | The platform must support data subject rights (access, deletion, portability) with self-service workflows. | Must | Legal |
| BR-063 | The platform must operate at >= 99.9% availability with multi-region disaster recovery, RTO < 1 hour, RPO < 5 minutes. | Must | Engineering + Business |
| BR-064 | The platform must scale to >= 10,000 concurrent users and >= 50,000 bookings/month without performance degradation. | Must | Engineering |
| BR-065 | The platform must expose a public API platform for distribution partners with key management, rate limiting, and webhooks. | Should | Sales |
| BR-066 | All mobile apps must support biometric authentication, push notifications, offline access, deep linking, app-to-web continuity, and wallet integration (Apple Wallet, Google Wallet). | Must | Product |
| BR-067 | The platform must integrate at least 2 day-tour/activity inventory sources for cross-sell. | Should | Product |
| BR-068 | The platform must offer a per-tenant configurable payment gateway selection so that white-label partners may use their own merchant accounts. | Must | Sales + Compliance |
| BR-069 | The platform must include observability tooling (distributed tracing, centralized logs, dashboards, alerting) covering 100% of critical paths. | Must | Engineering |
| BR-070 | All deploys must be progressive (canary or blue/green) with automated rollback on error budget burn. | Must | Engineering |
| BR-071 | The platform must run on a container orchestrator (Kubernetes recommended) with autoscaling. | Must | Engineering |
| BR-072 | The platform must maintain a service catalog with documented owners, SLOs, dependencies, and runbooks for every service. | Must | Engineering |
| BR-073 | All sensitive admin actions across the platform must be logged to immutable storage and retained for 7 years. | Must | Compliance |
| BR-074 | The platform must support per-tenant data residency configuration (Egypt-resident vs offshore) once Egyptian data residency is enabled. | Should | Legal |
| BR-075 | Corporate account billing must produce tax-compliant invoices per Egyptian Tax Authority e-invoicing standards. | Must | Finance + Legal |
| BR-076 | The platform must implement role-based access control with at least 12 distinct roles across consumer, B2B, branch, white-label, and admin contexts. | Must | Security |
| BR-077 | Fraud detection models must be retrained at minimum monthly, with model performance metrics dashboards. | Must | Engineering + Finance |
| BR-078 | The platform must support promotional campaigns (codes, automatic, tier-based) with usage limits, expiration, and audit. | Should | Marketing |
| BR-079 | The platform must support referral programs with attribution, reward issuance, and fraud protection. | Should | Marketing |
| BR-080 | Mobile apps must be available in App Store and Play Store under Jawla's developer accounts with stable submission/review process. | Must | Product |
| BR-081 | The platform must integrate at least one accounting system (Xero, QuickBooks, or local ERP) for financial sync. | Should | Finance |
| BR-082 | Multi-branch operations must enforce that branch users see only their branch's customers and bookings. | Must | Security |
| BR-083 | White-label partners' admin users must not be able to access Jawla operational tooling under any circumstance. | Must | Security |
| BR-084 | Group booking offline-rate workflow must integrate with at least 2 group-rate suppliers (or be operable with manual sourcing). | Should | Product |
| BR-085 | Customer LTV calculations and cohort reports must be available to executives in real time. | Must | Executive |

---

## Functional Acceptance Criteria

The FAC-1..FAC-14 from prior packages remain. Enterprise adds:

### FAC-15: Package Booking End-to-End

A package booking is functionally correct when:
1. Customer browses, selects, and configures the package.
2. Component inventory is verified across all components.
3. Payment is captured in a single transaction.
4. Each component is booked atomically with the supplier.
5. If any component fails, all others are rolled back and customer is refunded fully.
6. Single confirmation includes itinerary PDF + individual component vouchers.
7. Admin sees the package booking with each component reconciled separately.

### FAC-16: B2B Agent Booking with Markup

A B2B booking is functionally correct when:
1. Agent is authenticated.
2. Customer details captured.
3. Net price + agent markup = customer price computed and shown.
4. Payment via customer link, credit line, or wallet.
5. Booking attributed to agent in DB with full audit.
6. Customer receives confirmation under agent branding (if configured) or Jawla branding (default).
7. Commission/markup tracked for monthly settlement.

### FAC-17: Corporate Booking with Policy Enforcement

A corporate booking is functionally correct when:
1. Traveler is authenticated as corporate user.
2. Policy validation runs on every offer.
3. Non-compliant offers display warning; selection requires acknowledgment.
4. Booking submission with violation routes to approver.
5. Approver sees full context, can approve/reject.
6. Approved booking proceeds; rejected booking notifies traveler.
7. Booking added to corporate's monthly statement.

### FAC-18: Mobile Booking Parity

A mobile booking is functionally correct when:
1. Search returns same results as web for same query.
2. Pricing matches web.
3. Payment via Apple Pay/Google Pay or gateway forms.
4. Confirmation in app + push notification + email + WhatsApp.
5. Booking visible in My Bookings on web and mobile.
6. Voucher saved to Apple Wallet / Google Wallet on user action.

### FAC-19: Dynamic Pricing Application

Dynamic pricing is functionally correct when:
1. Base markup applied first.
2. Rule chain evaluated in defined order.
3. Final markup capped at floor/ceiling.
4. Markup applied to net rate to produce displayed price.
5. Markup decision logged for audit and replay.
6. Customer NEVER sees raw markup math.

### FAC-20: White-Label Tenant Isolation

Tenant isolation is functionally correct when:
1. Every DB row has tenant_id.
2. Every query is tenant-scoped at the framework level (Prisma middleware or equivalent).
3. Tenant admin cannot SELECT, JOIN, or otherwise access other tenants' data.
4. Backups are per-tenant restorable.
5. Per-tenant disaster recovery testing succeeds quarterly.

### FAC-21: Fraud Scoring & Action

Fraud scoring is functionally correct when:
1. Signals collected pre-payment.
2. Score returned within 200ms p95.
3. Action applied per threshold (block, review, allow).
4. Decision logged with signals + score + action.
5. Customer message localized for the action (e.g., "Please contact support to complete this booking").
6. Fraud team can override block via admin.

### FAC-22: Group Booking Holding & Settlement

A group booking is functionally correct when:
1. Quote accepted creates a holding with reference and deposit deadline.
2. Per-traveler payment links generated.
3. Payments aggregate to the holding; balance visible to coordinator.
4. Full payment by deadline triggers final ticketing.
5. Partial payment by deadline triggers configurable action (extension, partial release, full cancellation).

### FAC-23: Multi-Branch Cash Reconciliation

A branch shift close is functionally correct when:
1. Shift opening cash recorded.
2. All transactions during shift logged.
3. Closing cash counted, variance computed.
4. Variance >5% of cash transacted requires supervisor sign-off.
5. Daily reconciliation report transmits to HQ Finance.

### FAC-24: PCI DSS Continuous Compliance

PCI compliance is continuously satisfied when:
1. Quarterly vulnerability scans pass.
2. Annual penetration test conducted by external firm.
3. CDE network segmentation verified.
4. All staff with CDE access trained annually.
5. Incident response plan tested annually.

---

## KPIs

The Basic and Professional KPIs remain in force. Enterprise KPIs:

| KPI | Target | Measurement | Owner | Cadence |
|-----|--------|-------------|-------|---------|
| Annualized GBV | > EGP 200M | Warehouse | Executive | Monthly |
| B2B Share of GBV | > 25% | Warehouse | Sales | Monthly |
| Mobile Share of GBV | > 35% | Warehouse | Product | Monthly |
| Package Share of GBV | > 18% | Warehouse | Product | Monthly |
| White-Label Brands Live | >= 2 | Tenant DB | Sales | Monthly |
| Active B2B Agents (transacting/month) | > 250 | Warehouse | Sales | Monthly |
| Active Corporate Accounts | > 30 | Warehouse | Sales | Monthly |
| Group Booking Share of GBV | > 8% | Warehouse | Product | Monthly |
| Mobile App Store Rating (iOS) | > 4.5 | App Store | Product | Monthly |
| Mobile App Store Rating (Android) | > 4.5 | Play Store | Product | Monthly |
| Mobile App Crash-Free Sessions | > 99.5% | Firebase Crashlytics | Engineering | Weekly |
| Push Notification Open Rate | > 18% | Mobile analytics | Marketing | Weekly |
| Mobile DAU/MAU | > 25% | Mobile analytics | Product | Monthly |
| Dynamic Pricing Revenue Lift | > 6% vs control | A/B + warehouse | Revenue Mgmt | Monthly |
| Fraud Score Latency (p95) | < 200ms | APM | Engineering | Weekly |
| Fraud Decline Rate | < 2% of all bookings | DB | Fraud | Weekly |
| Chargeback Rate | < 0.25% | Gateway + DB | Fraud | Weekly |
| Fraud Loss % of GBV | < 0.15% | DB | Fraud | Monthly |
| False Positive Rate (Fraud) | < 8% (declined-good-customer) | Review queue + customer outreach | Fraud | Monthly |
| Site Uptime | > 99.9% | Monitoring | Engineering | Monthly |
| Mobile App Uptime (API) | > 99.9% | Monitoring | Engineering | Monthly |
| MTTR | < 20 minutes | Incident logs | Engineering | Per incident |
| Disaster Recovery Drill | Successful quarterly | Drill execution | Engineering | Quarterly |
| PCI DSS Vulnerability Scan | Pass quarterly | QSA / scanner | Compliance | Quarterly |
| PCI DSS Penetration Test | Pass annually | Third party | Compliance | Annual |
| SOC 2 Control Coverage | 100% by month 9 | Vanta/Drata | Compliance | Monthly |
| Data Subject Requests (DSR) SLA | < 30 days | Privacy ticket system | Legal | Per request |
| API Platform Adoption | > 5 active partners by month 6 | API key registry | Sales | Monthly |
| Tenant Onboarding Time (White-Label) | < 14 days from contract to live | Project tracker | Sales | Per onboarding |
| Branch P&L Margin | > 15% per branch | Warehouse | Finance | Monthly |
| Corporate AR Days Sales Outstanding | < 35 days | AR aging | Finance | Monthly |
| Cohort Repeat Rate (Day 90) | > 22% | Cohort warehouse | Marketing | Monthly |
| Customer LTV (24-month) | > EGP 45,000 | Cohort warehouse | Marketing | Quarterly |
| Mobile Conversion Rate | > 1.8% (search-to-book) | Mobile analytics | Product | Weekly |
| Package Conversion Rate | > 2.4% | Warehouse | Product | Monthly |
| Concurrent User Capacity Tested | >= 10,000 | Load test | Engineering | Quarterly |
| Event Bus Throughput | > 2,000 events/sec | Load test | Engineering | Quarterly |
| Warehouse Query p95 | < 4 seconds for top 20 dashboards | Warehouse logs | Engineering | Weekly |

---

## Milestones

Enterprise is structured as parallel workstreams rather than a single sequential timeline. Workstreams progress in parallel with periodic integration gates.

| Phase | Deliverables | Duration | Payment Trigger | Payment % | Amount (EGP) |
|-------|--------------|----------|-----------------|-----------|---------------|
| M0 - Contract Signing | Signed SOW, executive kickoff, full team assembled, Amadeus consultant continuation, mobile dev environments, white-label legal templates initiated | Day 0 | Contract executed | 18% | 250,200 |
| M1 - Discovery, Architecture, Design | Per-workstream architecture (mobile, B2B, packages, dynamic pricing, white-label, fraud, group/corp, multi-branch); full Figma library (web, iOS, Android, B2B portal); compliance roadmap; capacity model; team structure finalized | Weeks 1-3 | M1 acceptance | 10% | 139,000 |
| M2 - Platform & Foundations | Kubernetes (or chosen orchestrator) live; observability stack; multi-tenant DB schema; RBAC framework; feature flag platform; mobile app skeletons (iOS + Android) submitted to internal TestFlight/Internal Track | Weeks 3-7 | Platform smoke test pass; mobile shells running | 12% | 166,800 |
| M3 - Packages & Dynamic Pricing | Pre-built packages catalog + booking; dynamic packaging (flight+hotel bundle); package admin builder; dynamic pricing rules engine; demand-based adjustments; revenue lift dashboard | Weeks 7-11 | Package end-to-end booking + pricing rule demonstration | 12% | 166,800 |
| M4 - B2B Agent Portal | Agent application/onboarding; agent booking flow; markup management; credit lines; commission statements; sub-user management; B2B reporting | Weeks 9-13 | First 5 partner agents live and transacting in staging | 12% | 166,800 |
| M5 - Mobile Apps (iOS + Android) | Feature-complete mobile apps for flights, hotels, packages, loyalty, wallet, push, offline, biometric, wallet integration; beta in TestFlight + Play Internal | Weeks 9-15 | Beta apps available to 50+ internal testers | 12% | 166,800 |
| M6 - Group, Corporate, Multi-Branch | Group booking workflow; corporate accounts with policy + approver; consolidated invoicing; branch entities; branch P&L; counter sales; cash reconciliation | Weeks 13-17 | Live group booking processed; first corporate account + first branch operational | 10% | 139,000 |
| M7 - White-Label & Fraud | White-label tenant provisioning; tenant-isolated admin; per-tenant gateway config; partner billing; fraud scoring engine; fraud review queue; chargeback management; ML model v1 trained | Weeks 15-20 | First white-label tenant live with mock data; fraud scoring on 100% of bookings | 8% | 111,200 |
| M8 - Compliance, Hardening, Launch | PCI DSS gap remediation; SOC 2 control deployment; DSR self-serve; full UAT (600+ cases); load test 10k concurrent; mobile app store submission and approval; production deploy; 4-week hypercare | Weeks 20-24 | Production live; mobile apps approved; PCI gap analysis report delivered | 6% | 83,400 |
| **TOTAL** | | **20-24 weeks** | | **100%** | **1,390,000** |

### Detailed Milestone Acceptance Criteria

**M1 Acceptance**
- Per-workstream architecture docs (8 workstreams) reviewed and signed off.
- Figma library complete for web + iOS + Android + B2B + admin (estimated 200+ frames).
- Compliance roadmap with PCI/SOC 2 timeline.
- Capacity model: traffic projections, peak load, scaling plan.
- Team structure: leads per workstream, accountability matrix.

**M2 Acceptance**
- Kubernetes (or alternative) running with autoscaling.
- Observability stack live (tracing, logs, metrics, dashboards).
- Multi-tenant schema migration tested.
- RBAC enforcement validated against test users for each role.
- Feature flags switchable in admin.
- Mobile shells run on iOS + Android, login flow works.

**M3 Acceptance**
- 10 sample packages live in staging.
- Dynamic packaging (flight+hotel bundle) bookable end-to-end.
- Pricing rule editor functional; sample rule changes propagate.
- Demand-based adjustment running on test traffic.

**M4 Acceptance**
- Agent onboarding workflow tested with 5 real agencies.
- Markup, credit, commission flows tested for live transactions.
- Sub-user roles enforced.

**M5 Acceptance**
- iOS + Android apps support: login, search (flight + hotel), book, payment (Apple/Google Pay + gateway), confirmations, push, offline.
- Beta distributed to 50+ testers; <10 critical bugs.
- Crash-free sessions > 99% in beta.

**M6 Acceptance**
- One live group booking (10+ pax) processed end-to-end.
- Corporate account (test entity) booked with policy violation triggering approval.
- One branch entity operational with live counter sale + reconciliation.

**M7 Acceptance**
- White-label tenant provisioned in <14 days from "go".
- Tenant-isolated admin verified with no cross-tenant data leakage (security audit).
- Fraud scoring on 100% of bookings; review queue active.
- ML model v1 deployed with documented performance.

**M8 Acceptance**
- UAT (600+ cases) > 96% pass rate.
- Security audit: no Critical findings; <3 High open.
- Load test sustains 10,000 concurrent with p95 < 3s on key endpoints.
- iOS app approved in App Store; Android app approved in Play Store.
- PCI gap analysis delivered with remediation plan and timeline.
- 4-week hypercare window with on-call rotation.

---

## Feature Prioritization (MoSCoW)

### Must Have

| Feature | Justification |
|---------|---------------|
| Tour packages (pre-built + dynamic) | Margin differentiation, strategic |
| Day tours / activities cross-sell | Higher attach rate, margin |
| B2B agent portal (full) | Channel diversification |
| B2B credit lines, commission accounting | Required to compete with offline GDS resellers |
| Mobile apps (iOS + Android) | Channel diversification; market expectation |
| Push notifications, offline, biometric | Mobile feature parity with leading OTAs |
| Apple Pay / Google Pay | Conversion lift |
| White-label tenancy | Strategic platform business |
| Per-tenant payment gateway | White-label flexibility |
| Dynamic pricing engine | Revenue optimization |
| Demand-based pricing | Margin lift |
| Group booking workflow (10+) | Lucrative segment |
| Corporate accounts with policy | Lucrative segment, recurring revenue |
| Consolidated invoicing | Corporate requirement |
| Multi-branch operations | Operational reality |
| Branch P&L dashboard | Branch motivation |
| Counter sales (cash + POS) | Walk-in revenue |
| Fraud scoring (rules + ML) | Risk reduction |
| Chargeback management | Loss reduction |
| PCI DSS Level 1 posture | Compliance requirement at scale |
| SOC 2 Type 1 readiness | Required for corporate sales |
| GDPR-equivalent DSR | Compliance |
| Kubernetes / horizontal scaling | Required at this volume |
| Multi-region disaster recovery | Resilience |
| Comprehensive observability | Operational requirement |
| Public API platform | Distribution expansion |
| Executive real-time dashboard | Decision support |
| Cohort & retention analytics | Strategic decision support |
| Multi-tenant admin console | Platform operations |
| RBAC across 12+ roles | Security requirement at scale |
| Promotional campaigns engine | Marketing requirement |
| Referral program | Acquisition |

### Should Have

| Feature | Justification |
|---------|---------------|
| iOS / Android tablet UX optimization | Polish |
| Accounting integration (Xero/QuickBooks) | Finance efficiency |
| In-app live chat with agent routing | Mobile-first support |
| Loyalty marketplace (non-travel redemption) | Engagement |
| Agent training certifications in portal | Quality control |
| Corporate travel reports (CO2 footprint) | ESG storytelling |
| Group-rate supplier direct integrations | Margin |
| Multi-language beyond AR/EN (FR, DE in mobile) | Tourist market |
| Branch staff KPI / commission dashboards | Branch motivation |
| Voice booking via WhatsApp AI (beta) | Innovation |
| White-label co-marketing tools | Partner empowerment |

### Could Have

| Feature | Justification |
|---------|---------------|
| Crypto payments (USDC) | Niche but trend-aware |
| BNPL via Tabby/Tamara | Conversion |
| In-app AR hotel previews | Differentiator |
| Trip diary / social sharing | Engagement |
| Loyalty status matching from other programs | Acquisition |
| Branch chatbot / kiosk mode | Branch automation |
| Carbon offset purchase at checkout | ESG |

### Won't Have (Enterprise Final - reserved for post-Enterprise)

| Feature | Notes |
|---------|-------|
| Acquired-company OTA integration (M&A scenario) | Out of scope |
| GDS-direct NDC distribution (selling to other OTAs) | Out of scope |
| Native cruise booking | Future |
| Long-stay rentals (>30 days) | Future |
| In-house insurance underwriting | Out of scope |
| Custom CRM build | Use existing |
| Custom helpdesk build | Use existing |

---

## Out of Scope

Despite the breadth of the Enterprise package, the following are explicitly NOT included:

1. **Acquired-Brand Integration**: If Jawla acquires another OTA, integration is a separate engagement.
2. **NDC Distribution Outward**: Selling Jawla's negotiated rates to other OTAs via NDC standards.
3. **Cruise Bookings**: Cruise inventory and booking flows.
4. **Long-Stay Rentals (Airbnb-like)**: Different inventory model.
5. **Custom-Built CRM or Helpdesk**: Use third-party (HubSpot, Zendesk).
6. **In-House Payments Infrastructure (Becoming a Payment Service Provider)**: Continue using Paymob/Stripe.
7. **Hardware POS Manufacturing**: Use existing third-party terminals.
8. **VR/AR Beyond Polish**: Full VR experience not in scope.
9. **Insurance Underwriting**: Continue affiliate referral to insurance partners.
10. **Loyalty Tokenization / Blockchain**: Out of scope.
11. **Bidding / Auction Travel Models (Priceline-like)**: Out of scope.
12. **AI Trip Planner with LLM**: Could be added but not committed in Enterprise scope.
13. **Multi-Country Tax/VAT Complete Engine**: Egypt + KSA + UAE only.
14. **Visa Processing Services**: Affiliate referral only.
15. **Charter Flight Operations**: Out of scope.
16. **Hotel Channel Manager for Direct Properties**: Jawla is a buyer not a seller for hotels.
17. **Migration from Legacy Booking System**: If Jawla has pre-existing systems, migration is separate.
18. **Hardware Procurement (Branch POS, Receipt Printers)**: Software integration only; hardware procured separately.
19. **24/7 NOC Outsourcing**: Build the platform to be operable by Jawla; NOC contract is separate.
20. **Voice Channel (Call Center Telephony Integration)**: Beyond click-to-call deep links.
21. **Full Mobile Tablet App with Tablet-Specific UX**: Mobile-first; tablets get the mobile layout scaled.
22. **Localization Beyond AR/EN in Web; AR/EN/FR/DE in Mobile**: Other languages later.
23. **Per-Tenant Currency Beyond the Platform's Supported 5**: Tenants choose from the platform's set.
24. **Per-Tenant Custom Feature Development**: White-label is configuration not custom code.
25. **Investor-Grade Audited Financials**: Compliance posture supports audit; the audit itself is a separate engagement.

---

## Risks & Mitigation

The Basic (R-001..R-020) and Professional (R-021..R-040) risks remain. Enterprise-specific risks:

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|----|------|------------|--------|------------|-------|
| R-041 | Scope is too large for 24 weeks; multiple workstreams slip | Very High | Critical | Workstream leads with parallel teams; strict scope gates at M3, M5, M7; reserve weeks 24-26 as schedule buffer (not promised externally) | Project Lead |
| R-042 | Mobile app store review rejections delay launch | High | High | Submit early to internal tracks (M5); engage Apple/Google liaisons; have alternative submission strategies (separate apps for B2C vs B2B if needed) | Mobile Lead |
| R-043 | PCI Level 1 certification takes longer than 9 months | Medium | High | Engage QSA at M1; gap analysis at M3; remediation continuous; phased approach (compensating controls first) | Compliance |
| R-044 | SOC 2 readiness conflicts with engineering velocity | Medium | Medium | Vanta/Drata to automate evidence; engineering controls baked-in from M2; weekly compliance review with engineering | Compliance + Engineering |
| R-045 | Multi-tenant data leakage incident | Medium | Critical | Tenant-isolation framework with automated tests (every PR); penetration test focused on multi-tenant; bug bounty program post-launch | Security |
| R-046 | Dynamic pricing rules cause customer outrage (perceived gouging) | High | High | Cap upward adjustments aggressively; reference price always shown; PR-friendly explanation of pricing model; rapid rollback capability | Product + Comms |
| R-047 | Fraud ML model has high false-positive rate, blocks good customers | High | High | Conservative thresholds at launch; review queue for borderline; weekly false-positive review; customer outreach for blocked-good | Fraud + Product |
| R-048 | B2B agents abuse credit lines, defaults rise | Medium | High | KYC + credit check on application; auto-suspension on overdue; legal recourse documented; staged credit limit increases | Finance |
| R-049 | Corporate clients demand custom features not in scope | High | Medium | Standard contract excludes custom dev; change request process; have a "custom" tier with premium pricing | Sales |
| R-050 | White-label partner brand damages Jawla's reputation | Medium | High | Brand controls in contract; quality bar for tenant onboarding; ability to terminate; Jawla brand attribution in fine print | Legal + Brand |
| R-051 | Group booking offline workflows are operationally heavy | High | Medium | Dedicated group ops team trained; SLA-driven; queue management; automation where possible | Operations |
| R-052 | Multi-branch software adoption is poor (branches go around the system) | Medium | Medium | Branch manager incentive aligned with system use; training; KPI on system bookings vs paper | Operations |
| R-053 | Mobile push notification cost (per-device) scales unfavorably | Low | Low | Optimize notification frequency; preference granularity; cost monitoring | Engineering |
| R-054 | Disaster recovery drill reveals failover gaps | Medium | High | Quarterly drills with documented findings + remediation; insurance for residual risk | Engineering |
| R-055 | Kubernetes operational complexity exceeds team capability | High | High | Use managed K8s (EKS/GKE); document everything; on-call rotation; SRE training; consider Nomad or simpler alternative if team strain visible | Engineering Leadership |
| R-056 | API platform adoption is low (no partners use it) | Medium | Medium | Sales engagement for partner pipeline before launch; documentation excellence; sample integrations | Sales + Engineering |
| R-057 | Executive dashboard data quality issues erode trust | Medium | High | Data quality testing in warehouse; documented data lineage; on-call data engineer for executive concerns | Data |
| R-058 | Compliance program (SOC 2) creates bureaucracy that slows ship velocity | Medium | Medium | Lightweight controls; embed in CI/CD; quarterly retrospective on compliance cost | Compliance + Engineering |
| R-059 | Mobile app downloads are low (acquisition cost > ROI) | Medium | High | App store optimization (ASO); paid acquisition budget reserved; deep link strategy from existing web traffic; smart banners | Marketing |
| R-060 | Egyptian Tax Authority e-invoicing integration breaks (regulatory change) | Medium | High | Modular invoice generation; monitor regulatory updates; legal+finance liaison | Finance + Legal |
| R-061 | Cost of running enterprise infrastructure exceeds revenue lift | Medium | Critical | Monthly unit economics review; ability to right-size autoscaling; defer optional features if cost outpaces revenue | Finance + Engineering |
| R-062 | Talent risk: lead engineers leave during 24-week timeline | Medium | High | Cross-training; pairing; documentation; retention bonus tied to launch | Engineering Leadership |
| R-063 | Vendor lock-in on white-label payment gateways limits partner choice | Medium | Medium | Abstract gateway interface; support 3+ gateways; document onboarding new gateway | Engineering |
| R-064 | Branch cash handling fraud (skimming) | Medium | Medium | Daily reconciliation; surprise audits; CCTV at branches (operational); cash limits | Operations + Finance |
| R-065 | Corporate AR (accounts receivable) collection issues | Medium | High | Credit check on onboarding; payment terms enforced; collections process; consider factoring for slow payers | Finance |
| R-066 | Refund liability across packages becomes operationally complex | High | Medium | Per-component refund clarity; clear policy documentation; automation where possible | Engineering + Operations |
| R-067 | Apple/Google policies on travel apps change (e.g., booking fees requirement) | Low | High | Compliance monitoring; in-app booking with no fee; web-based booking via deep link as fallback | Mobile |

---

## Open Questions

The prior packages' open questions remain. Enterprise adds:

| ID | Question | Owner | Required By |
|----|----------|-------|-------------|
| OQ-051 | What is the package mix - pre-built (operations-heavy) vs dynamic (engine-driven)? Affects content team sizing. | Product + Operations | M1 |
| OQ-052 | Day tours/activities supplier - Viator, GetYourGuide, local Egyptian operators, or hybrid? | Product | M1 |
| OQ-053 | B2B credit line - what is the underwriting model? Manual (Finance review per agent) or automated (KYC + score)? | Finance | M1 |
| OQ-054 | B2B agent commission structure - retain markup only, or % commission from Jawla on top? | Sales | M1 |
| OQ-055 | Mobile development approach - React Native (shared codebase) or native Swift + Kotlin (best UX, higher cost)? | Engineering | M1 |
| OQ-056 | Mobile minimum supported OS versions - iOS 16+ (90%+ devices) and Android 10+ (85%+ devices)? | Product | M1 |
| OQ-057 | Mobile API strategy - share existing web API or build mobile-specific (faster, more efficient)? | Engineering | M1 |
| OQ-058 | White-label commercial model - fixed monthly + per-booking, % of GBV, or hybrid? | Sales | M1 |
| OQ-059 | White-label partner approval criteria - any travel agency, or curated only? | Sales | M2 |
| OQ-060 | Dynamic pricing controls - is there a competitive monitoring tool we'd subscribe to? Budget? | Revenue Mgmt + Finance | M1 |
| OQ-061 | Dynamic pricing publicity - do we disclose to customers that pricing is dynamic? Material consumer-protection question. | Legal | M3 |
| OQ-062 | Group booking deposits - what % is required to hold? 25%, 50%, full? | Finance + Product | M2 |
| OQ-063 | Corporate sales motion - do we hire dedicated B2B sales staff, or product-led growth? | Sales | M1 |
| OQ-064 | Corporate billing - do we offer USD invoicing for multinational HQs based in Egypt? | Finance | M1 |
| OQ-065 | Multi-branch P&L - how is overhead (engineering, marketing) allocated? Direct-attributable only, or cost share? | Finance | M2 |
| OQ-066 | Branch counter hardware - what POS terminals are in use? What integration is required (USB driver, network, etc.)? | Operations + Engineering | M2 |
| OQ-067 | Fraud ML training data - do we have enough historical chargeback data for ML, or do we start rule-based and grow into ML? | Engineering + Fraud | M1 |
| OQ-068 | Fraud detection vendor - build in-house, use Sift / Riskified / Forter (expensive), or hybrid? | Engineering + Finance | M1 |
| OQ-069 | PCI Level 1 QSA selection - which firm? Budget? | Compliance | M1 |
| OQ-070 | SOC 2 timeline - is Type 1 sufficient at launch, or do we push for Type 2 (longer)? | Compliance | M1 |
| OQ-071 | Data residency - does any white-label partner require data resident in their country (e.g., KSA Personal Data Law)? | Legal | M2 |
| OQ-072 | Kubernetes operator - managed (EKS, GKE, AKS) or self-hosted? | Engineering | M1 |
| OQ-073 | Multi-region DR - active-active, active-passive, or backup-only? Cost difference is material. | Engineering + Finance | M1 |
| OQ-074 | Observability stack - Datadog (expensive, integrated), open-source (Grafana + Loki + Tempo, cheaper, more ops), or hybrid? | Engineering | M1 |
| OQ-075 | API platform monetization - free (acquire partners), per-call (revenue), or revenue share on resulting bookings? | Sales | M3 |
| OQ-076 | Executive dashboard - real-time (expensive) or near-real-time (5-15 min lag, cheaper)? | Engineering + Executive | M2 |
| OQ-077 | Multi-tenant admin - one Jawla user can switch tenants, or per-tenant accounts? | Security | M2 |
| OQ-078 | RBAC model - inherit from existing tools (Google Workspace groups) or first-class in platform? | Security | M2 |
| OQ-079 | Promotional campaign rules engine - build in-house or use third-party (Talon.One, Voucherify)? | Product + Engineering | M3 |
| OQ-080 | Referral program design - cash, points, wallet credit, tiered? | Marketing | M3 |
| OQ-081 | Mobile app marketing - paid acquisition budget for launch quarter? | Marketing + Finance | M5 |
| OQ-082 | App store presence - one app for B2C only, separate B2B app, or unified with mode toggle? | Product | M1 |
| OQ-083 | Tablet UX - support as first-class, mobile layout scaled, or unsupported? | Product | M1 |
| OQ-084 | Accessibility commitment - WCAG 2.1 AA on all surfaces (web, mobile, B2B portal, admin)? | Product + Legal | M1 |
| OQ-085 | Continuous-improvement plan post-launch - retainer, follow-on SOW, or transition to Jawla-internal? | Contract | M8 |
| OQ-086 | Jawla's internal engineering hiring plan - the platform requires Jawla-side ops; what is the target team by month 6 post-launch? | Operations + Executive | M5 |
| OQ-087 | Brand strategy for white-label - does Jawla brand show as "Powered by"? | Brand + Sales | M2 |
| OQ-088 | Sales channel for B2B and white-label - direct, partners, or both? Commission for partners? | Sales | M3 |
| OQ-089 | Insurance product - travel insurance affiliate or embedded? | Product + Legal | M5 |
| OQ-090 | Customer success function - is there a CS team for high-value customers (corporate, top B2B agents)? | Operations | M5 |

---

## Appendix A: Architecture Additions (Reference)

| Layer | Addition vs Professional |
|-------|---------------------------|
| Compute | Kubernetes (EKS recommended), autoscaling, multi-AZ |
| Mobile | React Native (default) with native modules for Apple/Google Pay, biometric, push, wallet |
| API Platform | API Gateway (Kong, AWS API Gateway, or in-house); developer portal |
| Tenant Isolation | Tenant ID propagation via middleware; row-level security in PostgreSQL where possible |
| Dynamic Pricing | Standalone service with rule editor UI; rules in DB; pricing as a function chain |
| Fraud Detection | Standalone service; ML model served via Python microservice (FastAPI) called from booking flow; case management UI |
| Group Booking | Standalone workflow service with state machine (XState or NestJS-based) |
| Corporate Accounts | Subset of CRM functionality; policy engine separate |
| Multi-Branch | Branch dimension in all relevant tables; branch-scoped queries; branch-specific UI/admin views |
| White-Label | Platform configuration + per-tenant theming + per-tenant subdomain routing |
| Observability | OpenTelemetry collectors; centralized backend (Datadog or Grafana stack); dashboards as code |
| Compliance Tooling | Vanta or Drata for SOC 2 evidence collection; in-house dashboards for PCI controls |
| Disaster Recovery | Multi-region warm standby; DB replication; storage cross-region replication; automated failover playbooks |
| CI/CD | Trunk-based development; progressive delivery (Argo Rollouts or LaunchDarkly canaries); automated rollback |

## Appendix B: Workstream Ownership Matrix

| Workstream | Engineering Lead | Product Lead | Design Lead | QA Lead |
|------------|------------------|--------------|-------------|---------|
| Packages | Backend Lead A | PM A | Designer A | QA A |
| B2B Portal | Backend Lead B | PM B | Designer B | QA B |
| Mobile | Mobile Lead | PM C | Designer C (mobile) | QA C |
| Dynamic Pricing | Platform Lead | PM D | (no UI) | QA D |
| Group & Corporate | Backend Lead A | PM A | Designer A | QA A |
| Multi-Branch | Backend Lead B | PM B | Designer B | QA B |
| White-Label | Platform Lead | PM E | Designer D | QA D |
| Fraud | Platform Lead + Data Scientist | PM D | Designer E | QA D |
| Platform / Compliance | Platform Lead | PM E | (limited UI) | QA E + Compliance |

## Appendix C: Glossary Additions

| Term | Definition |
|------|------------|
| NDC | New Distribution Capability (IATA airline distribution standard) |
| DSR | Data Subject Request (GDPR-style) |
| QSA | Qualified Security Assessor (PCI auditor) |
| CDE | Cardholder Data Environment |
| ASO | App Store Optimization |
| RTO | Recovery Time Objective |
| RPO | Recovery Point Objective |
| SRE | Site Reliability Engineer |
| HHI | Herfindahl-Hirschman Index |
| BNPL | Buy Now Pay Later |
| KYC | Know Your Customer |
| AR | Accounts Receivable |
| AP | Accounts Payable |
| ESG | Environmental, Social, Governance |
| SLO | Service Level Objective |
| SLA | Service Level Agreement |
| OLAP | Online Analytical Processing |
| ML | Machine Learning |

## Appendix D: Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Business Sponsor (CEO) | _________________ | _________________ | _________ |
| Board Representative | _________________ | _________________ | _________ |
| Product Lead | Ahmed Mahmoud | _________________ | 2026-06-29 |
| Engineering Lead | _________________ | _________________ | _________ |
| Mobile Lead | _________________ | _________________ | _________ |
| Finance Approver (CFO) | _________________ | _________________ | _________ |
| Compliance Officer | _________________ | _________________ | _________ |
| Legal Counsel | _________________ | _________________ | _________ |
| Sales Lead | _________________ | _________________ | _________ |
