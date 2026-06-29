## 🎯 ملخص فني لمجلس الإدارة (بلغة الأعمال)

هذه الوثيقة هي المخطط الهندسي الكامل للنظام في الباقة الأساسية، مكتوب بلغة المهندسين. هذا الملخص يترجم محتواها إلى لغة الأعمال حتى يستطيع مجلس الإدارة فهم ما سيتم بناؤه واتخاذ القرار المناسب دون الحاجة لمراجعة كل التفاصيل التقنية.

### ماذا يبنيه فريق الهندسة؟

- موقع ويب حديث يعمل على الكمبيوتر والهاتف والتابلت ويدعم اللغتين العربية والإنجليزية
- خوادم خلفية مسؤولة عن استقبال الحجوزات ومعالجة الدفعات وإصدار التذاكر
- قاعدة بيانات آمنة تحفظ معلومات العملاء والحجوزات والمدفوعات بشكل مشفّر
- ربط مباشر مع نظام Amadeus العالمي للبحث عن الرحلات والحصول على الأسعار اللحظية
- ربط مع بوابات الدفع Stripe و Paymob لقبول الدفع داخل الموقع بالكامل
- نظام إرسال رسائل بريد إلكتروني تلقائية لتأكيدات الحجز وإرسال التذاكر
- لوحة تحكم بسيطة للإدارة الداخلية لمتابعة الحجوزات والعملاء والمبيعات

### كيف نضمن أن النظام آمن وموثوق؟

| الضمان                          | الطريقة بلغة الأعمال                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| الموقع متاح دائماً               | استضافة سحابية محترفة بضمان وقت تشغيل 99.0% (أي توقف لا يتجاوز 7 ساعات شهرياً)            |
| أمان معلومات الدفع              | جميع المعاملات تمر عبر بوابات معتمدة من المصارف (PCI-DSS) ولا نخزن أرقام البطاقات     |
| حماية بيانات العملاء            | تشفير كامل عند النقل وعند التخزين، وفصل صلاحيات الوصول لكل موظف                    |
| نسخ احتياطية يومية              | حفظ نسخة كاملة من قاعدة البيانات يومياً، مع إمكانية الاستعادة خلال ساعتين كحد أقصى     |
| مراقبة مستمرة                   | نظام يكتشف أي خطأ أو تأخر فور حدوثه ويرسل تنبيهات للفريق التقني                       |
| الامتثال لحماية البيانات        | الالتزام بقانون حماية البيانات المصري وتوفير حق العميل في حذف بياناته                  |

### الأرقام المهمة لاتخاذ القرار

| المتغير                                      | القيمة                                       |
| -------------------------------------------- | -------------------------------------------- |
| عدد المستخدمين المتوقع (السنة الأولى)         | 15,000 – 25,000 مستخدم نشط                  |
| متوسط زمن استجابة الصفحة                      | أقل من ثانيتين                              |
| نسبة وقت تشغيل النظام (Uptime SLA)            | 99.0%                                         |
| حجم البيانات المتوقع (السنة الأولى)            | 5 – 10 GB                                    |
| التكاليف الشهرية للبنية التحتية (Hosting)     | حوالي 350 – 550 USD شهرياً                  |
| عدد المهندسين العاملين على المشروع           | 3 (Backend + Frontend + DevOps بدوام جزئي)  |

### اعتمادنا على الموردين الخارجيين

| المورد                  | لماذا نحتاجه بلغة الأعمال                                                       |
| ----------------------- | ------------------------------------------------------------------------------- |
| Amadeus                 | المصدر العالمي لبيانات الرحلات والأسعار اللحظية والحجز الفعلي للتذاكر          |
| Stripe / Paymob         | بوابات الدفع التي تقبل البطاقات المصرية والدولية وتحوّل الأموال لحسابنا            |
| Mailgun / SendGrid      | خدمة إرسال البريد الإلكتروني لتأكيدات الحجز والتذاكر بشكل موثوق                |
| استضافة سحابية (AWS/Vercel) | الخوادم التي يعمل عليها الموقع، مرنة ويمكن زيادة قدرتها فوراً عند الحاجة         |

### ما الذي يحتاج المجلس أن يعرفه؟

- نحن نملك الكود المصدري وقاعدة البيانات بالكامل ولا يوجد قفل تكنولوجي على أي مورد
- يمكن استبدال أي مورد خارجي (بوابة دفع، خدمة بريد) خلال شهر دون توقف الخدمة
- البنية مصممة لتحمّل زيادة 10 أضعاف في عدد العملاء دون إعادة بناء
- التكاليف الشهرية للصيانة والاستضافة محددة وقابلة للتنبؤ على مدى 3 سنوات

---

# مواصفات متطلبات البرنامج — Jawla Tours OTA (Basic Tier)

## التحكم في الوثيقة

| الحقل             | القيمة                                                  |
| ----------------- | ------------------------------------------------------ |
| عنوان الوثيقة     | Jawla Tours OTA — SRS (Basic Tier)                     |
| معرّف الوثيقة     | JAWLA-SRS-BASIC                                        |
| الإصدار           | 1.0                                                    |
| تاريخ الإصدار     | 2026-06-29                                             |
| الحالة            | معتمد — Baseline                                       |
| التصنيف           | داخلي — Engineering / Product                          |
| المالك            | Jawla Engineering                                      |
| الإعداد           | Platform Architecture Group                            |
| المراجعة          | CTO, Head of Product, QA Lead                          |
| الاعتماد          | CTO                                                    |
| التوزيع           | Engineering, Product, QA, DevOps, Security             |

### سجل المراجعات

| الإصدار | التاريخ    | المؤلف              | القسم/الأقسام   | ملخص التغيير                                              |
| ------- | ---------- | ------------------- | --------------- | --------------------------------------------------------- |
| 0.1     | 2026-05-12 | Platform Arch Group | الكل            | المسودة الأولى (تحليل الفجوات من ورش الاكتشاف)            |
| 0.2     | 2026-05-28 | Platform Arch Group | FR, NFR, API    | إضافة متطلبات الـ flights والـ hotels بعد Amadeus PoC     |
| 0.3     | 2026-06-10 | QA Lead             | Acceptance      | إضافة AT-001..AT-024 من مراجعة الـ BDD                    |
| 0.4     | 2026-06-19 | Security            | Security, Auth  | تشديد إجراءات OWASP وإضافة OTP للـ refunds                |
| 1.0     | 2026-06-29 | CTO                 | الكل            | اعتماد الـ Baseline لـ Basic Tier MVP                     |

### المصطلحات

| المصطلح   | المعنى                                                                            |
| --------- | ---------------------------------------------------------------------------------- |
| OTA       | Online Travel Agency (وكالة سفر إلكترونية)                                         |
| PNR       | Passenger Name Record (مرجع الحجز في Amadeus)                                      |
| GDS       | Global Distribution System                                                          |
| BSP       | Bank Settlement Plan                                                                |
| 3DS       | 3-D Secure (تأكيد هوية حامل البطاقة، EMV 3DS 2.x)                                  |
| PCI DSS   | Payment Card Industry Data Security Standard                                        |
| SCA       | Strong Customer Authentication (PSD2)                                               |
| RBAC      | Role-Based Access Control                                                           |
| OTP       | One-Time Password (كود لمرة واحدة عبر TOTP أو SMS أو email)                        |
| FR        | Functional Requirement                                                              |
| NFR       | Non-Functional Requirement                                                          |
| AT        | Acceptance Test                                                                     |
| BCD       | Booking Confirmation Document (e-ticket أو voucher)                                |

---

## المقدمة

### الغرض

الوثيقة دي بتحدد متطلبات الـ **Basic Tier** لمنصة *Jawla Tours*، وهي منصة Online Travel Agency.
الـ Basic Tier ده هو نطاق الـ MVP اللي هينزل في أول إطلاق على الإنتاج في منطقة واحدة
(eu-central-1 كـ primary من غير multi-region failover)، ومستهدف السوق المصري والعربي.
الوثيقة بتحدد النطاق المتفق عليه والقيود ومستوى الجودة اللي فريق الـ engineering ملتزم يوصله.

الجمهور المستهدف للوثيقة دي: مهندسي software، مهندسي QA، فريق DevOps، مراجعي الـ security،
الـ product managers، والـ external auditors اللي بيعملوا مراجعة PCI scope.

### النطاق

الموجود ضمن نطاق الـ Basic Tier:

- مسار حجز موجّه للمستهلك لـ **flights وhotels** يظهر من خلال موقع الـ Next.js التسويقي
  الموجود حالياً، مع إضافة modules حجز محمية بـ authentication.
- backend بـ NestJS بيوفر **حوالي 20 REST endpoint** للبحث والحجز والدفع والإشعارات.
- مزوّد flights واحد (**Amadeus Self-Service / Enterprise Test endpoints**) و
  **مزوّد hotels واحد** (Amadeus Hotel Search v3 + Hotel Booking v2).
- الدفع بالكارت عن طريق **Stripe** (PSP واحد للـ MVP)، مع تجهيز Paymob/Adyen معمارياً
  من غير ما يتفعّلوا في الـ tier ده.
- إشعارات email عن طريق مزوّد transactional (SES أو Resend).
- console إداري بسيط لفريق الدعم لمراجعة الـ bookings والـ refunds والـ audit trail.
  **الـ refunds اليدوية عن طريق PSP dashboard مقبولة في الـ tier ده.**
- عملة أساسية واحدة (USD) عند الـ checkout، مع تحويل عرض فقط لـ EGP, SAR, AED.

خارج نطاق الـ Basic Tier (مؤجل لـ Professional / Enterprise):

- تطبيقات الموبايل، B2B agent portal، white-label theming، fraud ML، dynamic pricing engine.
- إشعارات WhatsApp Business.
- multi-region active-active deployment.
- automated refund orchestration.
- تجميع hotels من أكتر من مزوّد.

### التعريفات والاختصارات

ارجع لجدول المصطلحات اللي فوق. المصطلحات الصناعية المعيارية للسفر بتتبع
IATA Resolution 830a وأعراف Amadeus Self-Service API.

### المراجع

| Ref ID | المرجع                                                                       |
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

### أعراف الوثيقة

- المتطلبات الـ functional بتتسمّى `FR-XXX` ولازم تكون قابلة للاختبار (ليها AT).
- المتطلبات الـ non-functional بتستخدم `NFR-XXX`.
- معايير القبول مكتوبة بصيغة Gherkin: `Given / When / Then`.
- MUST، SHOULD، MAY بمعناها في RFC 2119.
- استخدام HTTP status codes بيتبع RFC 9110.

---

## المتطلبات الـ Functional

### Module: Authentication (FR-001 — FR-018)

| ID     | المتطلب                                                                                                    | Priority |
| ------ | ---------------------------------------------------------------------------------------------------------- | -------- |
| FR-001 | لازم النظام يسمح بالتسجيل بـ email + password (10 حروف على الأقل، zxcvbn score ≥ 3).                       | MUST     |
| FR-002 | لازم النظام يأكد الـ email عن طريق signed token (TTL = 24 ساعة) قبل ما يفعّل الحجز.                        | MUST     |
| FR-003 | لازم النظام يدعم login بـ email + password ويرجع access token (15 دقيقة) + refresh token (30 يوم) JWT.     | MUST     |
| FR-004 | لازم النظام يدعم refresh-token rotation؛ أي refresh token مستخدم مرتين لازم يلغي الـ family كلها.          | MUST     |
| FR-005 | لازم النظام يسمح بمسار نسيان كلمة المرور عن طريق signed email link (TTL = 30 دقيقة، استخدام واحد).         | MUST     |
| FR-006 | لازم النظام يقفل الحساب 15 دقيقة بعد 5 محاولات login فاشلة خلال 10 دقايق.                                  | MUST     |
| FR-007 | لازم النظام يسمح بـ logout ويلغي الـ refresh token النشط.                                                  | MUST     |
| FR-008 | لازم النظام يـ hash كلمات المرور بـ Argon2id (m=64 MiB, t=3, p=2).                                         | MUST     |
| FR-009 | لازم النظام يسمح بتحديث الـ profile (الاسم، التليفون، locale، العملة الافتراضية للعرض).                    | MUST     |
| FR-010 | لازم النظام يسمح بحذف الحساب، مع soft-delete للبيانات الشخصية بعد فترة سماح 30 يوم.                       | MUST     |
| FR-011 | لازم النظام يطلب تأكيد OTP عن طريق email قبل أي refund العميل بيبدأه.                                      | MUST     |
| FR-012 | لازم النظام يـ log كل auth event (login، logout، إعادة تعيين كلمة المرور، إصدار OTP) في الـ audit trail.   | MUST     |
| FR-013 | المفروض النظام يدعم Google OAuth SSO (قابل للتأجيل، behind feature flag في Basic).                          | SHOULD   |
| FR-014 | لازم النظام يفرض signature على الـ JWT بـ RS256، مع rotation للـ keys كل 90 يوم.                            | MUST     |
| FR-015 | لازم النظام يوفّر `/auth/me` بيرجع الـ profile للمستخدم المسجّل + array الـ permissions.                    | MUST     |
| FR-016 | لازم النظام يفرض CAPTCHA (hCaptcha) على endpoints الـ register والـ login وreset password.                  | MUST     |
| FR-017 | لازم النظام يسمح لموظفي الدعم (role=`admin`) بانتحال شخصية مستخدم للدعم، مع تسجيل الفعل.                   | MUST     |
| FR-018 | لازم النظام ينهي الـ sessions الخاملة بعد 24 ساعة بدون refresh، حتى لو الـ TTL مخلصش.                       | MUST     |

### Module: Flights (FR-019 — FR-032)

| ID     | المتطلب                                                                                                                              | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| FR-019 | لازم النظام يسمح بالبحث عن رحلات one-way وround-trip بـ origin، destination، departure date، return date، عدد الـ pax.               | MUST     |
| FR-020 | لازم النظام يدعم حتى 9 ركاب في الحجز الواحد (adults+children+infants، حد IATA).                                                        | MUST     |
| FR-021 | لازم النظام يعرض fare لكل نوع pax والـ total fare، شاملاً الضرايب ورسوم الناقل.                                                       | MUST     |
| FR-022 | لازم النظام يـ cache ردود Amadeus flight-offer لمدة ≤ 10 دقايق بـ key على `(origin,dest,date,pax,cabin)`.                              | MUST     |
| FR-023 | لازم النظام ينفّذ price-confirm call على Amadeus Flight Offers Price قبل عرض صفحة الـ checkout.                                       | MUST     |
| FR-024 | لو السعر اتغيّر بأكتر من 0.5%، لازم النظام يعرض dialog تأكيد قبل ما يسمح بالـ checkout.                                                | MUST     |
| FR-025 | لازم النظام يجمع بيانات الركاب (title، الاسم الأول/العائلة، تاريخ الميلاد، نوع/رقم/تاريخ انتهاء/بلد إصدار الوثيقة) عند الـ checkout.   | MUST     |
| FR-026 | لازم النظام يتحقق إن صلاحية جواز السفر ≥ 6 شهور بعد تاريخ العودة.                                                                      | MUST     |
| FR-027 | لازم النظام يصدر PNR عن طريق Amadeus Flight Create Orders بعد ما الـ payment authorization ينجح.                                       | MUST     |
| FR-028 | لازم النظام يعيد محاولة إنشاء PNR حتى 3 مرات بـ exponential backoff على 5xx، مع إلغاء الـ charge لو كل المحاولات فشلت.                  | MUST     |
| FR-029 | لازم النظام يدعم cabin classes: ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST.                                                              | MUST     |
| FR-030 | لازم النظام يدعم fare filters: عدد الـ stops، أقصى مدة، الناقلين، نافذة المغادرة.                                                       | MUST     |
| FR-031 | لازم النظام يبعت e-ticket PDF كمرفق email خلال 60 ثانية من الـ ticketing.                                                              | MUST     |
| FR-032 | ممكن النظام يعرض ملخص لـ baggage allowance لما الناقل يوفّره؛ غيابه مش بيمنع الحجز.                                                    | MAY      |

### Module: Hotels (FR-033 — FR-044)

| ID     | المتطلب                                                                                                                       | Priority |
| ------ | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-033 | لازم النظام يسمح بالبحث عن hotels بـ city (IATA city code)، تواريخ check-in/out، عدد الـ adults والـ children مع أعمارهم.       | MUST     |
| FR-034 | لازم النظام يعرض الـ hotels مع الاسم، التقييم، الموقع، صورة، السعر الرئيسي (لكل ليلة، بالعملة).                                  | MUST     |
| FR-035 | لازم النظام يقسم النتائج 20 لكل صفحة ويدعم الفرز بالسعر والتقييم والمسافة.                                                       | MUST     |
| FR-036 | لازم النظام يجيب عروض الغرف لكل hotel عند فتح صفحة التفاصيل عن طريق availability call جديد.                                      | MUST     |
| FR-037 | لازم النظام يعرض cancellation policy (refundable / non-refundable / الـ deadline) قبل الـ checkout.                              | MUST     |
| FR-038 | لازم النظام يجمع بيانات الضيف (الاسم الكامل للضيف الأساسي، التواصل) وطلبات خاصة اختيارية.                                        | MUST     |
| FR-039 | لازم النظام يأكّد السعر عن طريق Amadeus Hotel Offer Search بـ `offerId` قبل الدفع مباشرة.                                        | MUST     |
| FR-040 | لازم النظام ينشئ hotel booking عن طريق Amadeus Hotel Bookings v2 بعد payment authorization.                                     | MUST     |
| FR-041 | لازم النظام يبعت email voucher للـ hotel فيه رقم التأكيد، تواصل الفندق، التواريخ، وملخص الـ policy.                              | MUST     |
| FR-042 | لازم النظام يتعامل مع أخطاء rebook في Amadeus بإلغاء الدفع وعرض رسالة retry واضحة.                                                | MUST     |
| FR-043 | لازم النظام يحترم عملة المزوّد ويعمل تحويل للعرض فقط (مفيش FX risk في Basic).                                                    | MUST     |
| FR-044 | لازم النظام يحتفظ برقم التأكيد الـ canonical من Amadeus على الـ booking record.                                                  | MUST     |

### Module: Booking (FR-045 — FR-055)

| ID     | المتطلب                                                                                                  | Priority |
| ------ | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-045 | لازم النظام يصدر `bookingId` من السيرفر (UUIDv7) قبل بدء الدفع.                                          | MUST     |
| FR-046 | لازم النظام يحتفظ بالحجز بـ status: `DRAFT`، `PENDING_PAYMENT`، `CONFIRMED`، `FAILED`، `CANCELLED`، `REFUNDED`. | MUST     |
| FR-047 | لازم النظام يعتبر endpoint الحجز idempotent باستخدام `Idempotency-Key` header.                            | MUST     |
| FR-048 | لازم النظام ينهي الـ bookings اللي بحالة `DRAFT` بعد 15 دقيقة.                                            | MUST     |
| FR-049 | لازم النظام ينهي الـ bookings اللي بحالة `PENDING_PAYMENT` بعد 30 دقيقة (Stripe PI auto-cancel متوافق).   | MUST     |
| FR-050 | لازم النظام يسمح للمستخدم يشوف كل حجوزاته مقسّمة على صفحات بترتيب تنازلي بالتاريخ.                         | MUST     |
| FR-051 | لازم النظام يسمح للمستخدم بإلغاء حجز refundable قبل deadline المزوّد.                                     | MUST     |
| FR-052 | لازم النظام يضيف audit-log row غير قابل للتعديل لكل تغيير في الـ status.                                   | MUST     |
| FR-053 | لازم النظام يعمل rollback لحجز المزوّد لو إصدار الـ ticket/voucher النهائي فشل.                            | MUST     |
| FR-054 | لازم النظام ينتج `bookingReference` (8 خانات alphanumeric، Crockford base32) معروض للمستخدم.              | MUST     |
| FR-055 | لازم النظام يصدر domain events (`BookingConfirmed`, `BookingCancelled`) على BullMQ للمستهلكين.            | MUST     |

### Module: Payment (FR-056 — FR-064)

| ID     | المتطلب                                                                                                              | Priority |
| ------ | -------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-056 | لازم النظام ينشئ Stripe PaymentIntent بـ `manual` capture mode عند الـ checkout.                                       | MUST     |
| FR-057 | لازم النظام يفرض 3DS2 challenge (request_three_d_secure=`automatic`).                                                   | MUST     |
| FR-058 | لازم النظام يعمل capture للـ PaymentIntent بعد ما إصدار الـ ticket/voucher من المزوّد ينجح.                            | MUST     |
| FR-059 | لازم النظام يعمل reconcile عن طريق Stripe webhooks (`payment_intent.succeeded`, `.payment_failed`, `charge.refunded`). | MUST     |
| FR-060 | لازم النظام يتحقق من signatures الـ Stripe webhooks بالـ shared secret.                                                | MUST     |
| FR-061 | لازم النظام يتحمل تكرار الـ webhook (idempotent على `event.id`).                                                       | MUST     |
| FR-062 | لازم النظام يعرض payment-error code mapping يتحوّل لرسالة user-friendly localized.                                     | MUST     |
| FR-063 | في Basic، ممكن الـ refunds تتعمل يدوي من Ops عن طريق Stripe dashboard؛ والنظام لازم يعمل reconcile عبر webhook.        | MAY      |
| FR-064 | لازم النظام **مايخزّنش** PAN أو CVV أو بيانات الـ track كاملة — Stripe Elements tokenization بس.                       | MUST     |

### Module: Notifications (FR-065 — FR-070)

| ID     | المتطلب                                                                                                      | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-065 | لازم النظام يبعت email transactional عند: تأكيد الحجز، فشل الدفع، الإلغاء، الـ refund.                        | MUST     |
| FR-066 | لازم النظام يحط كل الإشعارات الخارجة في طابور على BullMQ (`notifications.email` queue).                       | MUST     |
| FR-067 | لازم النظام يعيد محاولة إرسال الـ email حتى 5 مرات بـ exponential backoff (base 30 ثانية، factor 2).         | MUST     |
| FR-068 | لازم النظام يـ localize الـ emails لـ AR (الافتراضي لمصر)، EN، FR (الـ locale يتحدد من profile المستخدم).      | MUST     |
| FR-069 | لازم النظام يمنع الإشعارات المكررة (de-dup key = `${eventId}:${userId}:${template}`).                          | MUST     |
| FR-070 | لازم النظام يحترم تفضيلات الإشعارات للمستخدم (الـ transactional emails مش ممكن يعمل opt-out منها).             | MUST     |

### Module: Admin (FR-071 — FR-078)

| ID     | المتطلب                                                                                                     | Priority |
| ------ | ----------------------------------------------------------------------------------------------------------- | -------- |
| FR-071 | لازم الـ admin console يسمح بالبحث في الـ bookings بـ reference، email العميل، supplier ref، status، التاريخ. | MUST     |
| FR-072 | لازم الـ admin console يسمح بعرض تفاصيل الحجز كاملة مع الـ audit log.                                         | MUST     |
| FR-073 | لازم الـ admin console يسمح للموظفين بإعادة إرسال notification.                                              | MUST     |
| FR-074 | لازم الـ admin console يسمح للموظفين بتعليم الحجز كـ refunded بعد refund يدوي من Stripe (reconciliation).     | MUST     |
| FR-075 | لازم الـ admin console يسمح للموظفين بعرض المستخدمين (بحث بالـ email، عرض profile أساسي، آخر login).         | MUST     |
| FR-076 | لازم الـ admin console يكون محمي بـ role `admin` ويطلب re-authentication كل 12 ساعة.                          | MUST     |
| FR-077 | لازم الـ admin console يـ log كل فعل من الموظف بالـ actor والـ target والفرق before/after.                    | MUST     |
| FR-078 | المفروض الـ admin console يعرض tile KPIs يومي (الحجوزات النهارده، GMV النهارده، نسبة الفشل).                  | SHOULD   |

---

## المتطلبات الـ Non-functional

### الأداء (Performance)

| ID      | المتطلب                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-001 | endpoint البحث عن flights لازم يكون p95 latency ≤ 2.5 ثانية (شامل call الـ Amadeus)، p99 ≤ 4 ثواني.       |
| NFR-002 | endpoint البحث عن hotels لازم يكون p95 latency ≤ 2.0 ثانية.                                              |
| NFR-003 | كل الـ endpoints اللي مش بتاعت مزوّد لازم تكون p95 ≤ 250 ميلي ثانية.                                     |
| NFR-004 | Largest Contentful Paint (LCP) لصفحة الـ home ≤ 2.0 ثانية على 4G profile.                                 |
| NFR-005 | Time-to-Interactive (TTI) لصفحة نتائج البحث ≤ 3.5 ثانية.                                                  |
| NFR-006 | هدف نسبة الـ search cache hit ≥ 35% خلال ساعات الشغل.                                                     |

### القابلية للتوسع (Scalability)

| ID      | المتطلب                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-007 | لازم النظام يتحمّل 50 RPS booking-funnel sessions مستمرة لمدة ساعة.                                       |
| NFR-008 | لازم النظام يتحمّل 300 RPS على endpoints الـ catalog للقراءة فقط مع horizontal scale.                     |
| NFR-009 | لازم الـ BullMQ workers تتقدر تتوسع أفقياً لـ 4 replicas من غير تعديل في الكود.                            |
| NFR-010 | لازم اتصالات الـ Database تكون pooled عن طريق PgBouncer (transaction mode، حد أقصى 200 client conns).     |

### التوافر (Availability)

| ID      | المتطلب                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-011 | الـ uptime الشهري المستهدف 99.5% (downtime ≤ 3 ساعات و39 دقيقة).                                          |
| NFR-012 | RPO ≤ 15 دقيقة، RTO ≤ 4 ساعات للـ DR الكامل في الـ primary region.                                        |
| NFR-013 | لازم Postgres ينشر مع synchronous standby replica واحد.                                                   |
| NFR-014 | لازم Redis ينشر مع replica واحد + Sentinel.                                                                |
| NFR-015 | لازم نوافذ الصيانة المخططة تتعلن قبلها بـ 72 ساعة على الأقل.                                              |

### الأمان (Security)

| ID      | المتطلب                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-016 | TLS 1.2+ إلزامي على كل ingress؛ HSTS `max-age=63072000; includeSubDomains; preload`.                     |
| NFR-017 | البيانات at rest مشفّرة بـ AES-256 (Postgres TDE، Redis disk encryption).                                |
| NFR-018 | لازم الـ secrets تكون في Vercel Encrypted Env (FE) وAWS Secrets Manager (BE).                            |
| NFR-019 | الثغرات بـ severity ≥ High لازم تتصلّح خلال 7 أيام؛ Critical خلال 24 ساعة.                                | 
| NFR-020 | لازم يتعمل pentest خارجي على الأقل مرة في السنة.                                                          |

### التدويل (Internationalization)

| ID      | المتطلب                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-021 | لازم النظام يدعم AR (RTL)، EN، FR لكل الواجهات المعروضة للمستخدم.                                         |
| NFR-022 | لازم كل التواريخ تتعرض بـ timezone اللي المستخدم اختاره؛ والتخزين لازم يكون UTC.                          |
| NFR-023 | لازم كل القيم المالية تتضمن صراحة ISO 4217 currency codes.                                                |

### إمكانية الوصول (Accessibility)

| ID      | المتطلب                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-024 | لازم الموقع يتوافق مع WCAG 2.1 AA (semantic landmarks، focus order، color contrast ≥ 4.5:1).             |
| NFR-025 | لازم كل العناصر التفاعلية تكون قابلة للتشغيل بالكيبورد؛ ومؤشرات focus ظاهرة مطلوبة.                       |
| NFR-026 | لازم الـ forms تعرض رسايل الخطأ بطريقة programmatic عن طريق `aria-describedby`.                          |

### الامتثال (Compliance)

| ID      | المتطلب                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------- |
| NFR-027 | PCI scope: SAQ A-EP. مفيش PAN يلمس السيرفرات بتاعتنا.                                                    |
| NFR-028 | GDPR: مسارات data-export وdata-deletion لازم تكون متاحة خلال 30 يوم من الطلب.                            |
| NFR-029 | Cookie consent: opt-in صريح للكوكيز اللي مش أساسية؛ مع تحكم granular.                                    |

---

## معمارية النظام (System Architecture)

الـ Basic Tier بينشر في region أساسي واحد فيه طبقة Next.js قدامها CDN، وقدام
NestJS API في containers، مدعومة بـ Postgres + Redis + BullMQ.

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

### مسؤوليات الـ Components

| الـ Component    | المسؤولية                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| Next.js (Vercel) | SSR/ISR للصفحات التسويقية، RSC + Server Actions لمسار الحجز، يحتضن Stripe Elements iframe.        |
| NestJS API       | منطق الـ domain، تنسيق المزوّدين، idempotency، التخزين، إرسال الـ jobs للطابور.                    |
| PostgreSQL 16    | المصدر الأساسي للبيانات: users، bookings، payments، audit log، ردود المزوّدين (jsonb).             |
| Redis 7          | blacklist لتوكنات الجلسات، search cache، عدادات rate-limit، broker لـ BullMQ.                      |
| BullMQ workers   | الشغل الـ async: إرسال email، rollback للمزوّد، تنظيف الـ bookings، إعادة تشغيل webhook.           |
| Amadeus          | inventory للـ flights والـ hotels، ticketing، حجز الفنادق.                                         |
| Stripe           | حفظ الكروت، lifecycle الـ PaymentIntent، 3DS، refunds.                                            |
| Cloudflare       | حماية DDoS قدام Vercel للـ apex domain؛ bot fight mode.                                            |

---

## تصميم قاعدة البيانات (Database Design)

PostgreSQL 16 مع الـ extensions `uuid-ossp` و`pgcrypto`. الفلوس بتتخزن كـ `bigint`
بالـ minor-units مع column `currency` منفصل (ISO 4217). كل الجداول فيها
`created_at`, `updated_at` (`timestamptz` default `now()`). الحذف soft عن طريق `deleted_at`.

### نظرة عامة على الجداول

| الجدول                    | الغرض                                                                | العلاقات الأساسية                                |
| ------------------------- | -------------------------------------------------------------------- | ----------------------------------------------- |
| `users`                   | هويات العملاء + الموظفين                                              | 1—N → `bookings`, `audit_events`                |
| `user_credentials`        | hash كلمة المرور + حالة الـ reset                                    | 1—1 → `users`                                   |
| `refresh_tokens`          | عائلة الـ refresh-token النشطة + كشف الـ replay                       | N—1 → `users`                                   |
| `airports`                | بيانات مرجعية لمطارات IATA                                            | —                                               |
| `airlines`                | بيانات مرجعية لشركات الطيران IATA                                     | —                                               |
| `cities`                  | بيانات مرجعية لمدن IATA                                               | —                                               |
| `bookings`                | الجذر الأساسي للحجز (aggregate root)                                  | N—1 → `users`; 1—N → `booking_items`, `payments` |
| `booking_items`           | عناصر لكل منتج (flight, hotel)                                        | N—1 → `bookings`                                |
| `flight_segments`         | segment لكل leg من رحلة flight item                                   | N—1 → `booking_items`                           |
| `hotel_stays`             | تفاصيل عنصر الفندق                                                    | N—1 → `booking_items`                           |
| `passengers`              | تفاصيل الراكب/الضيف المرتبطة بالحجز                                   | N—1 → `bookings`                                |
| `payments`                | سجلات lifecycle الـ PaymentIntent                                     | N—1 → `bookings`                                |
| `payment_webhook_events`  | مخزن de-duplication لـ events الـ Stripe                              | —                                               |
| `supplier_calls`          | log calls المزوّدين الخارجية (request + response, jsonb)              | N—1 → `bookings`                                |
| `notifications`           | الإشعارات في الطابور / المُرسَلة + حالة التسليم                       | N—1 → `users`, `bookings`                       |
| `audit_events`            | audit log غير قابل للتعديل                                            | N—1 → `users`                                   |
| `idempotency_keys`        | mapping الـ Idempotency-Key → response hash                          | —                                               |

### مقتطفات SQL DDL

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

### استراتيجية الـ Indexing

- B-tree على كل column من نوع FK (Postgres مش بيعملهم تلقائي).
- Partial indexes على الـ subsets الساخنة من enum الـ status (`bookings.status IN ('DRAFT','PENDING_PAYMENT')`).
- GIN index على `booking_items.offer_payload` للبحث من فريق الدعم: `CREATE INDEX ON booking_items USING gin (offer_payload jsonb_path_ops)`.

---

## تصميم الـ API

Base URL: `https://api.jawla.travel/v1`. كل الـ requests والـ responses JSON UTF-8.
Auth header: `Authorization: Bearer <access_token>`. الأخطاء بتتبع RFC 7807
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

### مثال Request: `POST /flights/search`

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

### مثال Response

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

### مظروف الخطأ Error Envelope (RFC 7807)

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

### حدود الـ Rate Limits

| مجموعة الـ Endpoint | الحد                     | الـ Bucket key   |
| ------------------- | ------------------------ | ---------------- |
| auth/*              | 10 req / IP / دقيقة      | IP               |
| flights/search      | 30 req / IP / دقيقة      | IP + user        |
| hotels/search       | 30 req / IP / دقيقة      | IP + user        |
| bookings (POST)     | 5 req / user / 10 دقايق  | user             |
| admin/*             | 60 req / staff / دقيقة   | user             |

---

## الـ Authentication والـ Authorization

### نموذج التوكنات

- **Access token** — RS256 JWT، TTL 15 دقيقة، الـ claims: `sub`, `email`, `role`, `perms[]`,
  `iss=https://api.jawla.travel`, `aud=jawla-web`, `iat`, `exp`, `jti`.
- **Refresh token** — opaque random 256-bit، مـ hashed (SHA-256) at rest، TTL 30 يوم،
  بيتعمله rotation كل استخدام؛ إعادة الاستخدام بتعمل invalidation للـ family كلها
  (`refresh_tokens.family_id`).

### الأدوار والصلاحيات (RBAC)

| الـ Role  | الوصف                                       | الصلاحيات الافتراضية                                |
| --------- | ------------------------------------------ | -------------------------------------------------- |
| customer  | مستخدم نهائي                                 | `booking:read:self`, `booking:create`, `me:write`  |
| support   | دعم الخط الأول                              | `booking:read:any`, `notification:resend`          |
| admin     | admin كامل                                  | `*`                                                |

نصوص الصلاحيات بتتطابق كـ glob expressions (مثلاً `booking:*` ⊆ `*`).
الـ Authorization بيتفرض في NestJS عن طريق decorator `@RequirePerms(...)` + global
`PermissionGuard` بيقرا `request.user.perms`.

### سياسة كلمة المرور

| القاعدة                                            | القيمة          |
| ------------------------------------------------- | --------------- |
| الحد الأدنى للطول                                  | 10              |
| الحد الأدنى لـ zxcvbn score                        | 3               |
| algorithm الـ Hash                                 | Argon2id        |
| تكلفة الذاكرة                                      | 64 MiB          |
| التكرارات / التوازي                                | 3 / 2           |
| الـ Pepper                                         | env-bound (HSM) |
| الـ History (في Basic)                             | غير مفعّل       |

### OTP للعمليات الحساسة

- كود رقمي 6 خانات عبر email، TTL 10 دقايق، استخدام واحد.
- مطلوب لـ: إلغاء/refund العميل، حذف الحساب، تغيير الـ email.
- محدود بـ rate-limit: حد أقصى 3 طلبات OTP لكل user كل 10 دقايق.

---

## الأمان (Security)

### خريطة معالجة OWASP Top 10:2021

| الخطر                              | المعالجة                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| A01 Broken Access Control         | RBAC عن طريق guards، deny-by-default، فحص `userId` scope على كل read.                            |
| A02 Cryptographic Failures        | TLS 1.2+، Argon2id، AES-256 at rest، RS256 JWT، مفيش تعامل مع PAN.                               |
| A03 Injection                     | parameterized queries (Prisma)، Zod input validation، مفيش SQL مبني بالـ string.                 |
| A04 Insecure Design               | threat model في DESIGN.md، مراجعة abuse cases لكل epic.                                          |
| A05 Security Misconfiguration     | Helmet defaults متشددة، CSP report-only في الأول، مفيش debug في prod، تغييرات عن طريق IaC بس.    |
| A06 Vulnerable Components         | `npm audit`، Dependabot، Snyk، نافذة patching كل أسبوعين.                                        |
| A07 Identification/AuthN Failures | Argon2id، throttling للـ login، MFA عن طريق OTP، rotation للـ refresh-token + family invalidation.|
| A08 Software/Data Integrity       | الـ CI بيوقّع الـ build artifacts، image digests مثبتة، package-lock معمول له commit.             |
| A09 Logging & Monitoring          | Pino JSON logs، correlation IDs، Sentry، alerting على شذوذ الـ auth.                             |
| A10 SSRF                          | outbound allow-list لـ Amadeus/Stripe؛ مع mitigation لـ DNS rebinding؛ مفيش URLs من المستخدم.    |

### التشفير

- **In transit:** TLS 1.2/1.3 بس، ECDHE ciphers، HSTS preload.
- **At rest:** تشفير EBS volume (AES-256-XTS)، Postgres TDE للـ backups،
  Redis snapshots مشفّرة، S3 buckets بـ SSE-S3 كحد أدنى.
- **Field-level:** الـ PII (DOB، رقم الوثيقة) في `passengers` مشفّر بـ AES-256-GCM
  باستخدام AWS KMS DEK + envelope encryption.

### نطاق PCI DSS

- SAQ **A-EP** — حقول الدفع بتترندر بواسطة Stripe Elements iframe؛ الـ backend
  ماشافش PAN/CVV أبداً. الـ controls المطلوبة: TLS، vendor due diligence،
  log retention سنة، quarterly ASV scan.

### Rate Limiting

- Redis token-bucket لكل `(routeKey, principalKey)`؛ الـ principal = `userId` لو
  المستخدم مسجّل، غير كده الـ IP بعد hashing.
- بيرجع 429 مع `Retry-After` header.

### CSRF

- الـ endpoints المسجّلة اللي بتغيّر state بتقبل الـ JWT في `Authorization` header
  (مش في cookies) → فالـ CSRF مش قابل للاستغلال بالطريقة الكلاسيكية. الـ Server Actions
  في Next.js بتستخدم `same-origin` + فحص Origin.

### إدارة الـ Secrets

- FE: Vercel Encrypted Env (لكل environment).
- BE: AWS Secrets Manager، بيتعملها rotation؛ بتتحقن عند الـ boot عن طريق IAM role.
- مفيش secret بيتعمل له commit في git أبداً؛ pre-commit secret-scan hook مفروض.

### النسخ الاحتياطي والاحتفاظ بالبيانات

| البيانات              | فترة الاحتفاظ   | الطريقة                            |
| --------------------- | --------------- | --------------------------------- |
| Postgres PITR         | 7 أيام          | continuous archive لـ S3          |
| Postgres logical dump | 30 يوم          | `pg_dump` يومي لـ S3 (مشفّر)       |
| Application logs      | 30 يوم (hot) + سنة (cold) | CloudWatch + S3 Glacier |
| Audit log             | 7 سنين          | Append-only، S3 Object Lock       |

---

## مسار الحجز (Booking Workflow)

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

### الخطوات تفصيلياً

1. الـ Client بيعمل `POST /bookings` مع `Idempotency-Key`.
2. السيرفر بيتحقق من الـ offer (`flights/price-check` أو `hotels/offers/confirm`).
3. السيرفر بيدخل row في `bookings` (`status=DRAFT`، `expires_at=now()+15m`).
4. الـ Client بينادي `POST /payments/intents` → بيتنشئ Stripe PaymentIntent
   (capture=`manual`)، الحجز يبقى → `PENDING_PAYMENT`، `expires_at=now()+30m`.
5. الـ Client بيأكد الـ PaymentIntent (3DS) في الـ browser عن طريق Stripe Elements.
6. Stripe webhook `payment_intent.requires_capture` بيوصل.
7. الـ Worker `booking.fulfill` بيشتغل: بينادي Amadeus لإصدار PNR / حجز الفندق.
8. لو نجح، بيتنادى Stripe `capture` → الحجز → `CONFIRMED`،
   ويتعمل enqueue للـ notification.
9. لو فشل المزوّد: Stripe `cancel` (void uncaptured)، الحجز → `FAILED`،
   ويتبعت email للعميل "ماقدرناش نأكد مع الطيران، مفيش خصم".

### مصفوفة الـ Timeouts والـ Rollback

| الخطوة                        | الـ Timeout | فعل الفشل                                                                     |
| ----------------------------- | ----------- | ----------------------------------------------------------------------------- |
| Amadeus price-check           | 8 ثواني     | يعرض 409 PRICE_CHANGED، ويسمح بإعادة البحث.                                   |
| Stripe PaymentIntent create   | 6 ثواني     | retry مرة واحدة، بعدها 503.                                                    |
| Stripe confirm (client)       | 30 دقيقة    | الحجز يتعمل له FAIL تلقائي، والـ intent يتلغي.                                |
| Amadeus PNR / hotel booking   | 30 ثانية    | حتى 3 retries؛ في النهاية لو فشل يعمل void للـ intent ويـ FAIL الحجز.         |
| Stripe capture                | 10 ثواني    | retry حتى 5 مرات؛ في النهاية لو فشل يـ page on-call، ويبدأ supplier rollback. |

### Idempotency

- `Idempotency-Key` UUID لكل محاولة حجز؛ مخزّن في `idempotency_keys` لمدة 24 ساعة.
- POST مكرر بنفس الـ key بيرجع الـ response الأصلي من غير side effects.

---

## مسار الـ Flight (Amadeus)

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

### الـ Caching

| شكل الـ Key                                              | TTL    | ملاحظات                       |
| -------------------------------------------------------- | ------ | ------------------------------ |
| `flt:search:{origin}:{dest}:{out}:{ret}:{pax}:{cabin}`   | 10 دقايق | مظروف نتائج البحث            |
| `flt:offer:{offerId}`                                    | 15 دقيقة | الـ offer الكامل لـ price-check |
| `flt:airport:{iata}`                                     | 24 ساعة  | بيانات مرجعية                  |

### معالجة الفشل

- `PRICE_CHANGED`: بيرجع 409 من price-check؛ الـ client لازم يعيد العرض.
- `OFFER_EXPIRED`: أعد البحث بنفس الـ filters؛ اعرض banner.
- `PNR_CREATION_TIMEOUT`: retry، بعدها علّمه FAILED + alert.
- `TICKETING_FAILED`: void Stripe (uncaptured)؛ compensating call للمزوّد لو الـ PNR
  اتعمل قبل الفشل (Flight Order Management `DELETE`).

---

## مسار الـ Hotel

```
search  ──▶ Amadeus Hotel Search → hotels[]   (cached 10m)
detail  ──▶ Amadeus Hotel Offers by hotelId   (live, no cache)
select  ──▶ Amadeus Hotel Offer Search/{offerId} (price-confirm, ≤2m before booking)
booking ──▶ Stripe PaymentIntent (manual capture)
        ──▶ on payment succeeded: Amadeus Hotel Bookings v2 (create)
        ──▶ capture Stripe
        ──▶ email voucher
```

- الـ Voucher بيتولّد كـ PDF عن طريق Puppeteer worker (`voucher.generate` queue).
- سياسة الإلغاء مخزّنة في `hotel_stays.cancellation_deadline`،
  `hotel_stays.refundable` للمنطق اللاحق.

---

## مسار الدفع (Payment Flow)

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

### الـ Refunds (في Basic)

1. العميل بيطلب refund عن طريق `POST /bookings/{id}/cancel` (بيتطلب OTP).
2. النظام بيفحص سياسة المزوّد → لو refundable وفي خلال الـ deadline، يحط
   `status=CANCELLED` ويحط task `payment.refund.manual` في الطابور.
3. فريق الـ Ops بيتنبه؛ الـ refund بيتعمل من Stripe dashboard.
4. webhook `charge.refunded` من Stripe بيوصل → بيتحدّث `payments.refunded_amount_minor`،
   و`bookings.status=REFUNDED` لو الـ refund كان كامل.
5. بيتبعت email للعميل.

---

## Modules الـ Admin

| الصفحة                     | الإمكانيات                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------- |
| Dashboard                  | KPIs النهارده: bookings، GMV، نسبة الفشل، أكتر أخطاء من المزوّدين.                  |
| Bookings list              | بحث بـ ref/email/status، filter بالتاريخ/المزوّد، export CSV (للـ admin فقط).      |
| Booking detail             | تفصيل كامل للعناصر، audit log، timeline الدفع، إعادة إرسال notification، علامة refunded. |
| Users list                 | بحث بالـ email، عرض الـ profile، آخر login، حالة القفل.                            |
| Notifications log          | آخر 30 يوم، الحالة، زر إعادة الإرسال، خطأ التسليم.                                  |
| Supplier call inspector    | فحص rows الـ `supplier_calls` للحجز؛ مع إخفاء الـ secrets.                          |
| Audit log                  | timeline للقراءة فقط لأفعال الموظفين؛ export CSV للـ compliance.                   |
| Feature flags              | للقراءة فقط في Basic؛ بتعرض القيم الحالية من config service.                       |
| Settings                   | profile الـ admin + تغيير كلمة المرور.                                              |

---

## الـ Deployment

### الطوبولوجي (Topology)

- **Frontend** (Next.js): Vercel، region أساسي واحد (`fra1` لـ EU/MENA).
- **Backend** (NestJS): Fly.io org `jawla`، region واحد `fra`، 2 app instances + 2
  worker instances.
- **Postgres**: Fly Postgres (أو Neon prod)، 1 primary + 1 standby في نفس الـ region.
- **Redis**: Upstash dedicated، multi-AZ داخل الـ region.
- **Static assets**: Vercel CDN بـ `s-maxage=86400, stale-while-revalidate=604800`.
- **Object storage**: AWS S3 (`jawla-prod-{vouchers,backups,logs}`)، region `eu-central-1`.

### Environment Variables (مقتطف)

| المتغير                    | المكان       | ملاحظات                                         |
| ------------------------- | ------------ | ---------------------------------------------- |
| `DATABASE_URL`            | API + worker | PgBouncer pool URL                             |
| `DIRECT_URL`              | API (migrations) | URL الـ primary المباشر                     |
| `REDIS_URL`               | API + worker | Upstash TLS URL                                |
| `JWT_PRIVATE_KEY`         | API          | RS256 private، PEM، rotation كل 90 يوم          |
| `JWT_PUBLIC_KEY`          | API + FE     | RS256 public                                   |
| `AMADEUS_CLIENT_ID`/`SECRET` | API       | Self-Service prod                              |
| `STRIPE_SECRET_KEY`       | API          | `sk_live_...`                                  |
| `STRIPE_WEBHOOK_SECRET`   | API          |                                                |
| `EMAIL_PROVIDER_KEY`      | worker       | Resend/SES                                     |
| `SENTRY_DSN`              | API + FE     |                                                |
| `NEXT_PUBLIC_STRIPE_PK`   | FE           | publishable                                    |

### CI/CD Pipeline (GitHub Actions)

| المرحلة         | الخطوات                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `lint`          | `pnpm lint` (eslint, prettier), `tsc --noEmit`                                                       |
| `test:unit`     | `jest --maxWorkers=2 --coverage` (FE + BE)                                                           |
| `test:integration` | تشغيل Postgres + Redis عن طريق service containers؛ تشغيل integration suite الـ NestJS              |
| `build`         | `pnpm build` (FE), `pnpm build && docker build` (BE), SBOM + image scan بـ Trivy                     |
| `e2e`           | Playwright على staging URL بعد الـ preview deploy                                                    |
| `deploy:preview` | Vercel preview للـ FE لكل PR؛ Fly deploy لـ `staging` app على `main`                                 |
| `deploy:prod`   | بوابة موافقة يدوية → Vercel `--prod`، Fly `deploy --strategy=bluegreen`                              |
| `smoke`         | synthetic `/healthz` + booking dry-run بعد الـ deploy للـ prod                                       |

---

## الـ Logging

- المكتبة: **pino** (BE) و Next.js الـ built-in + `pino-http` لمسارات الـ SSR.
- التنسيق: JSON، سطر واحد لكل event.
- الحقول المطلوبة: `ts`, `level`, `service`, `env`, `traceId`, `spanId`,
  `userId?`, `bookingId?`, `route`, `msg`.
- الـ Levels: `trace`, `debug`, `info`, `warn`, `error`, `fatal`. الافتراضي في prod هو `info`.
- الحقول الحساسة بيتعملها redact عن طريق pino redact list: `password`, `token`, `secret`,
  `authorization`, `card`, `pan`, `cvv`, `doc_number`.
- الـ Retention: 30 يوم hot (CloudWatch)، 365 يوم cold (S3 Glacier).
- الـ Correlation: `X-Request-Id` header بيتمرر من البداية للنهاية؛ لو غير موجود،
  بيتولّد من السيرفر كـ ULID.

---

## المراقبة (Monitoring)

- **Sentry** لتتبع أخطاء FE + BE وصحة الـ releases.
- **OpenTelemetry** SDK → Grafana Tempo للـ traces.
- **Prometheus** بيـ scrape metrics الـ `prom-client` من NestJS؛ Grafana dashboards.

### الـ Metrics الأساسية

| الـ Metric                            | النوع     | ملاحظات                                |
| ------------------------------------- | --------- | -------------------------------------- |
| `http_server_duration_ms`             | histogram | حسب route, method, status              |
| `http_server_inflight`                | gauge     | لكل route                              |
| `supplier_call_duration_ms`           | histogram | حسب supplier, op                       |
| `supplier_call_errors_total`          | counter   | حسب supplier, op, code                 |
| `booking_state_transitions_total`     | counter   | from → to                              |
| `payment_intent_status_total`         | counter   | حسب الـ status                         |
| `queue_jobs_total`                    | counter   | حسب queue, state                       |
| `queue_job_duration_ms`               | histogram | حسب queue                              |
| `pg_pool_in_use`                      | gauge     |                                        |
| `redis_command_duration_ms`           | histogram |                                        |

### حدود الـ Alerts

| الشرط                                                              | الخطورة  | الوجهة       |
| ------------------------------------------------------------------ | -------- | ------------ |
| API p95 > 1 ثانية لمدة 5 دقايق                                     | warn     | #ops-alerts  |
| نسبة فشل الـ booking > 5% خلال 15 دقيقة                            | page     | PagerDuty    |
| نسبة أخطاء المزوّد (Amadeus) > 10% خلال 10 دقايق                    | page     | PagerDuty    |
| تأخر Stripe webhook > 5 دقايق                                       | page     | PagerDuty    |
| Postgres replication lag > 30 ثانية                                | warn     | #ops-alerts  |
| استخدام الـ Disk > 80%                                              | warn     |              |
| نسبة 5xx > 1% خلال 5 دقايق                                          | page     | PagerDuty    |

---

## استراتيجية الاختبار (Testing Strategy)

| الطبقة        | الأدوات                                | هدف التغطية              |
| ------------ | -------------------------------------- | ------------------------ |
| Unit (BE)    | Jest, ts-jest                          | ≥ 80% lines، ≥ 70% branches |
| Unit (FE)    | Jest, React Testing Library            | ≥ 75% lines              |
| Integration  | Jest + testcontainers (PG, Redis)      | كل الـ public services + repos مغطاة |
| Contract     | Pact (Amadeus, Stripe stubs)           | كل تكاملات المزوّدين      |
| E2E          | Playwright                             | Smoke + المسارات الحرجة (search, book, pay, cancel) |
| Performance  | k6                                     | baseline scripts في الـ repo |
| Accessibility | axe-core في Playwright                | صفر مخالفات serious      |
| Security     | OWASP ZAP baseline                     | بوابة في الـ CI أسبوعياً  |

- كل الـ PRs لازم تحافظ على التغطية فوق الـ baseline؛ تقليلها بيفشل الـ CI.
- ميزانية الـ Flake: > 1% flake rate بتمنع الـ merge على `main`.

---

## اختبارات القبول (Acceptance Tests)

> الصيغة: Given / When / Then

| ID      | العنوان                              | Given                                                              | When                                              | Then                                                                                  |
| ------- | ------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| AT-001  | تسجيل بـ email صالح                  | أنا زائر جديد                                                       | بقدم register بـ email صالح + password قوية      | الحساب اتعمل بـ `pending_verification`؛ email التحقق اتبعت.                          |
| AT-002  | رفض كلمة مرور ضعيفة                  | أنا في form الـ register                                            | بقدم password "12345678" (zxcvbn 1)              | 400 مع `code=WEAK_PASSWORD`؛ مفيش row اتدخّل.                                         |
| AT-003  | التحقق من الـ email                  | عندي verification token                                             | بعمل POST `/auth/verify-email` بـ token صالح     | `users.email_verified=true`؛ 200.                                                     |
| AT-004  | throttle للـ login                   | فشلت في الـ login 5 مرات                                            | بحاول المرة السادسة خلال 10 دقايق                | 423 Locked؛ الحساب اتقفل 15 دقيقة.                                                    |
| AT-005  | rotation للـ refresh token           | عندي refresh token صالح                                             | بنادي `/auth/refresh`                            | بستلم refresh token جديد؛ القديم اتلغى.                                              |
| AT-006  | كشف إعادة استخدام الـ refresh token  | عملت rotation للـ refresh token من قبل                              | قدّمت الـ refresh token القديم                   | الـ family كلها اتلغت؛ 401.                                                            |
| AT-007  | الـ caching للبحث عن flights         | Cache MISS لـ (CAI,DXB,...)                                         | بنادي `/flights/search`                          | Amadeus بتتنادى مرة واحدة؛ النداء التاني خلال 10 دقايق بيرجع من الـ cache.            |
| AT-008  | flight price-check من غير تغيير      | السعر للـ offer لسه صالح                                            | بنادي `/flights/price-check`                     | 200 مع `delta=0`.                                                                     |
| AT-009  | flight price-check اتغيّر > 0.5%     | Amadeus رجّعت سعر زائد 2.4%                                         | بنادي `/flights/price-check`                     | 409 `PRICE_CHANGED`؛ الـ offer اتحدّث بالسعر الجديد لإعادة التأكيد.                   |
| AT-010  | حارس صلاحية جواز السفر               | جواز السفر بيخلص قبل 6 شهور من تاريخ العودة                         | بقدم booking                                      | 422 `PASSPORT_TOO_SHORT`.                                                              |
| AT-011  | idempotency الحجز                    | عملت POST `/bookings` بـ key K ونجح                                 | عملت POST `/bookings` تاني بنفس الـ key K        | الـ response الأصلي 201 رجع؛ مفيش row جديد اتعمل.                                     |
| AT-012  | انتهاء الـ Draft                     | حجز DRAFT عمره > 15 دقيقة                                            | الـ cleanup worker شغّال                          | Status → FAILED بـ reason `DRAFT_EXPIRED`.                                            |
| AT-013  | email الـ hotel voucher              | حجز فندق وصل CONFIRMED                                              | الـ Worker `notification.send` شغّال              | Email مع PDF voucher اتبعت؛ `notifications.status=sent`.                              |
| AT-014  | دفع بـ 3DS مطلوب                     | كارت اختبار بيطلب 3DS2                                              | بأكد الـ intent                                  | challenge المُصدر بيظهر؛ لو نجح، الـ PI بيتحول لـ `requires_capture`.                 |
| AT-015  | signature الـ webhook                | request بـ Stripe-Signature غير صالح وصل                            | NestJS بيتحقق                                    | 400 `INVALID_SIGNATURE`؛ مفيش تغيير في الـ state.                                     |
| AT-016  | rollback فشل ticketing من المزوّد    | إنشاء PNR في Amadeus بيرجع 5xx 3 مرات                              | الـ Worker استنفذ الـ retries                    | PaymentIntent اتلغى؛ الحجز FAILED؛ email "مفيش خصم" اتبعت للعميل.                     |
| AT-017  | reconcile للـ refund اليدوي          | فريق Ops عمل refund من Stripe dashboard                             | webhook `charge.refunded` وصل                     | `payments.refunded_amount_minor` اتحدّث؛ الحجز REFUNDED لو كان كامل.                  |
| AT-018  | الإلغاء بيطلب OTP                    | أنا صاحب الحجز                                                       | بنادي `/bookings/{id}/cancel` من غير OTP         | 401 `OTP_REQUIRED`.                                                                    |
| AT-019  | منع قراءة حجز عبر الـ tenants        | أنا user A                                                          | بعمل GET `/bookings/{idOfUserB}`                 | 403 Forbidden.                                                                         |
| AT-020  | audit log للـ admin                  | أنا admin وبعمل إعادة إرسال notification                            | الفعل اكتمل                                       | row في `audit_events` اتدخل بـ actor، target، before/after.                            |
| AT-021  | rate limit للـ auth                  | أصدرت 11 محاولة login في 60 ثانية من IP واحد                        | المحاولة الـ 11                                  | 429 مع `Retry-After`.                                                                  |
| AT-022  | التعريب (AR)                         | الـ locale في profile = `ar`                                        | بستلم email تأكيد حجز                            | الـ Email بيظهر RTL بنص AR.                                                            |
| AT-023  | WCAG focus order                     | بعمل tab في form البحث                                              | بلاحظ الـ focus                                  | الـ Focus بيزور الـ inputs بترتيب DOM؛ مع focus ring ظاهر يحقق contrast 3:1.          |
| AT-024  | Backup PITR                          | أنا DBA                                                              | شغّلت PITR لـ 30 دقيقة فاتت                       | الـ Restore بيكتمل في < 4 ساعات (RTO)؛ فقد البيانات ≤ 15 دقيقة (RPO).                  |

---

## ملحق A — مخاطر / مسائل مفتوحة

| ID   | الخطر                                                       | الاحتمالية | التأثير | المعالجة                                                  |
| ---- | ----------------------------------------------------------- | ---------- | ------ | --------------------------------------------------------- |
| R-01 | حدود rate الـ Amadeus في فترات العروض                       | متوسط      | عالي   | caching قوي، queueing للطلبات، credentials بديلة.         |
| R-02 | تساقط المستخدمين عند 3DS challenge في Stripe                | متوسط      | متوسط  | تذكير بالسعر قبل 3DS، نص "save card" بـ A/B.              |
| R-03 | تجاوز SLA للـ refund اليدوي                                 | منخفض      | متوسط  | تقرير يومي لـ Ops؛ alert على > 24 ساعة معلّق.             |
| R-04 | عطل في الـ region الواحد                                    | منخفض      | عالي   | runbook موثّق لتشغيل DR في `iad`.                          |
| R-05 | تأخر pentest ما قبل الإطلاق                                 | متوسط      | متوسط  | جدولة الـ pentest قبل GA بـ 4 أسابيع.                     |

— *نهاية الوثيقة — Jawla SRS Basic v1.0* —
