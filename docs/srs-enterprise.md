## 🎯 ملخص فني لمجلس الإدارة (بلغة الأعمال)

هذه الوثيقة هي المخطط الهندسي الكامل للنظام في الباقة المؤسسية، وهي بنية موقع ويب متجاوب (responsive) واحد مع تكامل كامل مع نظام Amadeus enterprise، حسابات الشركات (Corporate Accounts)، إدارة متعددة الفروع، ولوحات تحكم قابلة للتخصيص (Custom Dashboards). السعر الإجمالي: **20,000 USD ≈ 1,000,000 جنيه مصري** للبناء الأولي، مع صيانة شهرية **20,000 جنيه مصري (~400 USD)**. الملخص التالي يلخّص الاستثمار المطلوب والعائد المتوقع بلغة الأعمال.

### ماذا يبنيه فريق الهندسة؟ (الباقة الكاملة)

- تكامل كامل مع نظام Amadeus enterprise: Master Pricer للأسعار التنافسية، PNR/Ticketing الكامل، EMD لإصدار المستندات الإلكترونية، Queue Management لإدارة طوابير العمل، NDC للعروض الحديثة، Ancillaries للخدمات الإضافية، Tours/Activities للجولات والأنشطة، Transfers للنقل، و Cars APIs لتأجير السيارات
- محرك تسعير ديناميكي يعدّل الأسعار حسب الطلب والوقت لرفع هامش الربح
- نظام حجز جماعي للرحلات المدرسية والمؤتمرات والوفود الكبيرة (حتى 50 راكب)
- حسابات الشركات (Corporate Accounts) بفواتير شهرية وحدود ائتمان وأسعار corporate fares
- لوحة إدارة متعددة الفروع تفصل بيانات كل فرع مع تقارير موحدة
- **لوحات تحكم قابلة للتخصيص (Custom Dashboards)** بـ widgets قابلة للسحب والإفلات للـ admins والـ ops والـ finance — ميزة Enterprise حصرية
- محرك ذكاء اصطناعي لكشف الاحتيال وحماية المعاملات الكبيرة
- منشئ باقات الطيران: دمج عدة رحلات (multi-city / multi-leg) + خدمات إضافية + تأشيرة في باقة واحدة
- تكامل APIs الإضافية من Amadeus enterprise للنشاطات والـ transfers وتأجير السيارات (بدون منتج فنادق)
- لوحة تحليلات متقدمة (BI Dashboard) لقرارات استراتيجية مبنية على البيانات
- نظام مكافآت متدرجة لكبار المسافرين (Tier-based VIP)
- تكامل مع برامج Frequent Flyer لشركات الطيران الرئيسية
- المنصة في هذه الباقة تركز حصرياً على بيع تذاكر الطيران والخدمات المساعدة لها (Flights only) — لا توجد منتجات فنادق

### كيف نضمن أن النظام آمن وموثوق؟

| الضمان                                       | الطريقة بلغة الأعمال                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| الموقع متاح دائماً                            | استضافة بضمان 99.9% Uptime (توقف لا يتجاوز 45 دقيقة شهرياً) مع استرداد فوري عند الأعطال         |
| الانتشار الجغرافي متعدد المناطق              | الخوادم موزّعة على أكثر من منطقة جغرافية، وفشل منطقة كاملة لا يوقف الخدمة                   |
| كشف الاحتيال بالذكاء الاصطناعي               | نموذج تعلّم آلي يحلل سلوك الدفع لحظياً ويوقف المعاملات المشبوهة قبل تنفيذها                 |
| فصل بيانات كل فرع                            | كل فرع إداري لا يرى بيانات الفروع الأخرى، مع تقارير موحدة للإدارة العامة فقط                |
| سجل تدقيق كامل لمستخدمي الحسابات الـ corporate | كل عملية يقوم بها مستخدم corporate مسجّلة بالكامل لأي تحقيق مالي مستقبلي                  |
| تشفير بيانات العملاء الحساسة (PII)           | تشفير قوي بمفاتيح مختلفة لكل فرع إداري                                                       |
| تجارب استرداد الكوارث الدورية                | تدريبات ربع سنوية على استعادة النظام من نسخة احتياطية كاملة خلال 4 ساعات                   |
| مراقبة Capacity Planning                     | تنبؤ مسبق بالحاجة لزيادة الموارد قبل الذروات الموسمية (رمضان، الصيف، الأعياد)              |
| الامتثال لمعايير PCI-DSS Level 1            | المستوى الأعلى من الامتثال لمعايير صناعة بطاقات الدفع                                       |
| تدقيق أمني خارجي ربع سنوي                    | شركة أمن سيبراني خارجية تختبر النظام كل 3 شهور وتقدّم تقريراً للإدارة                       |

### الأرقام المهمة لاتخاذ القرار

| المتغير                                            | القيمة                                                  |
| -------------------------------------------------- | ------------------------------------------------------- |
| عدد المستخدمين المتوقع (السنة الأولى)               | 150,000 – 300,000 مستخدم نشط عبر جميع القنوات             |
| متوسط زمن استجابة الصفحة                            | أقل من 1.2 ثانية                                       |
| نسبة وقت تشغيل النظام (Uptime SLA)                  | 99.9%                                                    |
| عدد المعاملات اليومية المتوقعة                       | 1,500 – 5,000 معاملة                                    |
| عدد قنوات البيع                                     | قناة واحدة (Web فقط) + Admin Console للإدارة الداخلية   |
| عدد الفروع الإدارية المدعومة                         | حتى 25 فرع إداري داخل المؤسسة                          |
| عدد العملات المدعومة                                | 10+ عملات رئيسية                                       |
| التكاليف الشهرية للبنية التحتية                    | حوالي 2,500 – 4,000 USD شهرياً                          |
| عدد المهندسين العاملين                              | 7 (Backend + Frontend + DevOps + Data + QA + Security + 2 Mid-level)   |
| العائد المتوقع على الاستثمار خلال 18 شهر           | 3.5x – 5x من الاستثمار الأصلي                            |

### اعتمادنا على الموردين الخارجيين

| المورد                              | لماذا نحتاجه بلغة الأعمال                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| Amadeus                             | المصدر العالمي للرحلات الجوية والـ NDC والـ ancillaries مع عقد Enterprise بصلاحيات أوسع |
| PayTabs                             | بوابة دفع متعددة العملات (EGP/USD/EUR/SAR/AED) بمستوى Enterprise: تغطي مصر والخليج (mada/KNET/STC Pay) وأوروبا والبطاقات الدولية في تكامل واحد |
| WhatsApp Business API               | قناة التواصل الرئيسية للعملاء وحسابات الـ corporate                                   |
| Mailgun                             | البريد الإلكتروني التجاري لإرسال ملايين الرسائل شهرياً بأسعار منخفضة                  |
| استضافة متعددة المناطق (AWS/GCP)    | بنية تحتية موزّعة على 3 مناطق جغرافية لضمان الانتشار العالمي                          |
| CDN عالمي (Cloudflare)              | تسريع الموقع للعملاء في كل دول العالم وحماية من هجمات DDoS                            |
| خدمة Fraud Detection (Sift) | محرك خارجي متخصص في كشف الاحتيال يكمل نظامنا الداخلي ML-FRAUD                              |

### ما الذي يحتاج المجلس أن يعرفه؟

- مقارنة مع Professional: زيادة في القدرات بنسبة 100% (مضاعفة) مقابل زيادة في السعر 65%
- نحتاج تأسيس فريق DevOps داخلي دائم (مهندسان) لإدارة البنية التحتية المعقدة
- النظام يحتاج تدقيق أمني مستقل (Security Audit) من شركة معتمدة قبل الإطلاق
- حسابات الـ corporate (B2B postpaid) تفتح قناة بيع للشركات الكبيرة بفواتير شهرية
- Custom Dashboards تمكّن الـ executives من بناء عرض تنفيذي مخصص دون الاعتماد على فريق المنتج

---

# مواصفات متطلبات البرمجيات — Jawla Tours OTA (الباقة Enterprise)

## ضبط الوثيقة

| الحقل             | القيمة                                                          |
| ----------------- | -------------------------------------------------------------- |
| عنوان الوثيقة     | Jawla Tours OTA — SRS (الباقة Enterprise)                       |
| رقم الوثيقة       | JAWLA-SRS-ENT                                                  |
| الإصدار           | 1.0                                                            |
| تاريخ الإصدار     | 2026-06-29                                                     |
| الحالة            | معتمدة — Baseline                                               |
| التصنيف           | سرية — الهندسة / المنتج / المالية / الالتزام                    |
| المالك            | Jawla Platform Engineering                                     |
| إعداد             | Platform Architecture Group                                    |
| مراجعة            | CTO, COO, رئيس المنتج، رئيس المالية، قائد QA، قائد الأمان، DPO |
| اعتماد            | CTO + COO                                                      |
| التوزيع           | كل الهندسة، المنتج، QA، DevOps، الأمان، المالية، الدعم، BizDev، إدارة الفروع    |

### سجل المراجعات

| الإصدار | التاريخ    | الكاتب              | الأقسام                          | ملخص التغيير                                                                    |
| ------- | ---------- | ------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| 0.1     | 2026-03-09 | Platform Arch Group | الكل                             | مسودة أولى (تمتد من الباقة Pro)                                                  |
| 0.3     | 2026-04-21 | Product (Corporate) | Corporate Accounts، RBAC         | حسابات الـ corporate، حدود ائتمان، أسعار corporate fares                          |
| 0.4     | 2026-05-09 | ML Lead             | Fraud ML، Pricing                | نموذج تقييم الاحتيال + محرك التسعير الديناميكي                                    |
| 0.5     | 2026-05-21 | Product (BI)        | Custom Dashboards                | محرك Custom Dashboards مع widgets قابلة للتخصيص                                    |
| 0.6     | 2026-06-04 | DevOps              | Architecture، Deployment         | متعدد المناطق active-active؛ global anycast؛ CRR                                |
| 0.7     | 2026-06-15 | Security            | Security، Compliance             | ضوابط SOC 2 Type II؛ تحديث نطاق PCI؛ KMS hierarchy                              |
| 0.8     | 2026-06-22 | QA Lead             | Acceptance                       | AT-047..AT-085                                                                  |
| 1.0     | 2026-06-29 | CTO + COO           | الكل                             | اعتماد Baseline                                                                  |

### قاموس المصطلحات (إضافات الباقة Enterprise)

| المصطلح      | المعنى                                                                    |
| ------------ | ------------------------------------------------------------------------- |
| Branch       | فرع إداري معزول منطقياً داخل المؤسسة (لفصل بيانات الفروع)                  |
| RU           | Region Unit (مجموعة منطقة متجانسة واحدة)                                   |
| CRDT         | Conflict-free Replicated Data Type                                        |
| EDA          | Event-Driven Architecture                                                 |
| Saga         | معاملة طويلة الأمد مع تعويضات                                              |
| KEK / DEK    | Key Encryption Key / Data Encryption Key (تشفير بأسلوب envelope)          |
| RBAC / ABAC  | تحكم في الوصول بناءً على الدور / السمات                                    |
| OPA          | Open Policy Agent (تصريح كـ policy-as-code)                                |
| ML-FRAUD     | خدمة تقييم الاحتيال                                                         |
| DYN-PRICE    | محرك التسعير الديناميكي                                                    |
| TMC          | Travel Management Company (نموذج حساب corporate)                          |
| BSP          | Bank Settlement Plan (IATA)                                                |

---

## المقدمة

### الهدف

هذه الوثيقة تحدد متطلبات البرمجيات لـ **الباقة Enterprise** من *Jawla Tours*.
الباقة Enterprise توفر منصة متعددة المناطق، متعددة الفروع الإدارية، B2C + corporate (postpaid)، عبر
موقع ويب متجاوب (responsive) فقط، مع machine learning للاحتيال، وتسعير ديناميكي،
ومحرك ثقيل للـ queue لإدارة الـ flight packages (تذاكر طيران مع خدمات مساعدة من الـ
transfers والـ activities والـ cars)، وCustom Dashboards. المنصة في هذه الباقة flights only —
منتجات الفنادق غير مشمولة. هذه الوثيقة هي العقد للإصدار الكبير الثالث (هدف GA هو Q2 2027).

الجمهور المستهدف من هذه الوثيقة: كل الهندسة، المنتج، QA، DevOps، الأمان،
DPO، المالية، BizDev، إدارة الفروع، والمدققين الخارجيين (SOC 2 Type II، PCI DSS،
GDPR، PDPL السعودي، قانون حماية البيانات المصري).

### النطاق

ضمن النطاق:

- كل وظائف الباقة Basic + Professional (مفترضة؛ سيتم ذكر الجديد والمتغير فقط) — Flights فقط.
- **متعدد المناطق active-active** (eu-central-1 + me-central-1 + ap-south-1)
  مع توجيه read-local / write-aware.
- **حسابات Corporate** (B2B postpaid) للشركات: فواتير شهرية، حدود ائتمان، تقارير منفصلة،
  أسعار corporate fares عبر airline ID، حجوزات جماعية (group bookings) حتى 50 راكب.
- **لوحة إدارة متعددة الفروع** (multi-branch admin) مع فصل بيانات لكل فرع وتقارير موحدة.
- **Custom Dashboards** — لوحات تحكم قابلة للتخصيص بـ widgets للـ admins و ops و finance
  (ميزة Enterprise حصرية).
- **Fraud ML** — تقييم real-time لكل محاولة حجز + فرض step-up.
- **محرك تسعير ديناميكي** — محرك قواعد markup/discount مع hooks للمرونة.
- **Flight packages** (multi-leg / multi-city flights + transfer + activity + car rental) عبر
  Amadeus Tours/Activities/Transfers/Cars APIs، مع تجميع متوازي ثقيل على الـ queue وتأكيد atomic.
  لا يتضمن منتج فنادق.
- **حوالي 55 endpoint REST** + عقود gRPC داخلية.

خارج النطاق صراحة:

- منتجات الفنادق (المنصة flights only؛ Amadeus Hotel APIs غير مفعلة في هذه الباقة).

### المراجع

| Ref ID | المرجع                                                                          |
| ------ | ------------------------------------------------------------------------------- |
| R-01   | JAWLA-SRS-PRO v1.0                                                              |
| R-02   | Amadeus Enterprise (Production NDC + Master Pricer + Tours, Activities, Transfers, Cars APIs) |
| R-03   | PayTabs PayPage v3 + Transactions API + IPN (multi-currency EGP/USD/EUR/SAR/AED) |
| R-04   | WhatsApp Business Cloud API, Web Push (VAPID), Mailgun                          |
| R-05   | OWASP Top 10:2021 + ASVS 4.0.3 L3                                                |
| R-06   | SOC 2 Type II (Security, Availability, Confidentiality)                          |
| R-07   | PCI DSS v4.0 — SAQ A-EP + SAQ D مخصص للـ payouts                                 |
| R-08   | GDPR، PDPL السعودي، قانون حماية البيانات المصري 151/2020، PDPL الإماراتي         |
| R-09   | IATA Resolution 890؛ BSP Manual for Agents                                       |
| R-10   | WCAG 2.1 AA + EN 301 549                                                         |
| R-11   | RFC 9457 (Problem Details)، RFC 9421 (HTTP Message Signatures، حيثما ينطبق)      |

---

## المتطلبات الوظيفية

> إضافية للباقة. حيث لا يُذكر "*يمتد*" فالمتطلب جديد.

### Module: Authentication & Identity (FR-001 — FR-026)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-001 | *يمتد من Pro FR-001..022.*                                                                                    | MUST     |
| FR-023 | يجب أن يدعم النظام **enterprise SSO** عبر SAML 2.0 و OIDC لحسابات الـ corporate ومستخدمي الفروع الإدارية.    | MUST     |
| FR-024 | يجب أن يدعم النظام provisioning عبر **SCIM 2.0** لحسابات الـ corporate (إنشاء/تحديث/تعطيل المستخدمين).        | MUST     |
| FR-025 | يجب أن يدعم النظام passkeys بـ WebAuthn (FIDO2) للعملاء والموظفين معاً.                                       | MUST     |
| FR-026 | يجب أن يدعم النظام إعدادات identity provider لكل حساب corporate (IdP واحد لكل حساب؛ JIT provisioning).        | MUST     |

### Module: Flights (FR-029 — FR-046)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-029 | *يمتد من Pro FR-023..038.*                                                                                    | MUST     |
| FR-030 | يجب أن يدعم النظام عروض NDC عند توفرها (Amadeus NDC-X + direct connects للطيران).                              | MUST     |
| FR-031 | يجب أن يدعم النظام محتوى FareLogix/ATPCO إذا لم يُظهر Amadeus سعر مناسب.                                       | SHOULD   |
| FR-032 | يجب أن يدعم النظام split-PNR ticketing لأكثر من 9 ركاب عبر تقسيم إنشاء الـ PNR طبقاً لقواعد IATA.              | MUST     |
| FR-033 | يجب أن يدعم النظام فتح corporate fares لحسابات الـ corporate مع airline ID.                                    | MUST     |
| FR-034 | يجب أن يدعم النظام تتبع unused-ticket residual-value لكل راكب لكل شركة طيران.                                  | SHOULD   |
| FR-035 | يجب أن يدعم النظام عمليات exchanges (تغيير التاريخ) من البداية للنهاية باستخدام NDC حيث مدعوم.                  | MUST     |
| FR-036 | يجب أن يتكامل النظام مع Sabre / Travelport كـ GDS ثانوي لتنويع الـ inventory (failover).                       | SHOULD   |
| FR-037 | يجب أن يدعم النظام تسعير refund اختياري حسب fare-rules في real time.                                            | MUST     |
| FR-038 | يجب أن يدعم النظام إشعارات schedule-change اللاإرادية وفلو re-protect.                                          | MUST     |
| FR-039 | يجب أن يدعم النظام rebook تلقائي عند الاضطرابات بموافقة العميل في حدود سياسة شركة الطيران.                      | SHOULD   |
| FR-040 | يجب أن يلتزم النظام بمعايير IATA `OFRD` (offer-response data) لعروض NDC.                                       | MUST     |
| FR-041 | يجب أن يدعم النظام ربط frequent-flyer تلقائياً حسب شركة الطيران من الـ profile المحفوظ.                          | MUST     |
| FR-042 | يجب أن يُظهر النظام للمستخدم الأزواج التي تحتاج visa (إرشادي فقط، مصدره IATA TIM حيث متاح).                     | SHOULD   |
| FR-043 | يجب أن يدعم النظام مجموعات المسافرين (8+) عبر توجيهها لـ queue الـ bulk-fares group desk.                       | SHOULD   |
| FR-044 | يجب أن يدعم النظام ticketing مباشر EDI مع شركات طيران مختارة (مثل EgyptAir المباشر).                            | MAY      |
| FR-045 | يجب أن يشغّل النظام **محرك التسعير الديناميكي (DYN-PRICE)** على كل عرض طيران في real time.                      | MUST     |
| FR-046 | يجب أن يسجل النظام كل قرار من DYN-PRICE (features الإدخال، تعديل المخرجات، إصدار النموذج).                      | MUST     |

### Module: Flight Ancillaries — Tours, Activities, Transfers, Cars (FR-047 — FR-052)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-047 | يجب أن يدعم النظام بحث وحجز الـ transfers (Amadeus Transfers API) كملحق اختياري للحجز.                          | MUST     |
| FR-048 | يجب أن يدعم النظام بحث وحجز الـ activities/tours (Amadeus Tours & Activities API).                            | MUST     |
| FR-049 | يجب أن يدعم النظام بحث وحجز الـ car rentals (Amadeus Cars API).                                                 | MUST     |
| FR-050 | يجب أن يطبّق النظام DYN-PRICE لكل عرض ancillary لكل مورد.                                                       | MUST     |
| FR-051 | يجب أن يحفظ النظام canonical references للـ ancillaries كي تربط بالحجز الأصلي وتظهر على مستند PDF موحّد.        | MUST     |
| FR-052 | يجب أن يصدر النظام domain events داخلية لحالة الـ ancillaries لاستهلاكها من خدمات BI والإشعارات.                | MUST     |

### Module: Flight Packages (FR-065 — FR-076)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-065 | يجب أن يسمح النظام بتعريف قالب package: نمط flight + transfer اختياري + activity اختياري + car اختياري.        | MUST     |
| FR-066 | يجب أن يسمح النظام بإنشاء packages ديناميكية ad-hoc: flight (+ transfer/activity/car) من تأليف المستخدم في cart واحد. | MUST |
| FR-067 | يجب أن يعمل تجميع الـ package كـ BullMQ flow متوازي (flight search, transfer search, activity search) متصل بـ saga. | MUST  |
| FR-068 | يجب أن يُسعّر الـ package atomically مع محرك خصومات على مستوى الـ package (DYN-PRICE).                          | MUST     |
| FR-069 | يجب أن يُحجز الـ package بـ payment intent واحد؛ تنفيذ على مستوى المكون عبر saga.                                | MUST     |
| FR-070 | يجب أن يقوم الـ package بـ rollback لكل المكونات عند فشل أي مكون واحد.                                          | MUST     |
| FR-071 | يجب أن يُقدم الـ package PDF موحد يجمع كل المكونات (e-ticket + قسائم الـ ancillaries).                          | MUST     |
| FR-072 | يجب أن يجدول الـ package تذكيرات pre-trip لكل مكون (flight، transfer pickup، activity start).                  | MUST     |
| FR-073 | يجب أن يسمح الـ package بحفظ قوالب لكل مستخدم/branch.                                                           | SHOULD   |
| FR-074 | يجب أن يدعم الـ package الحزم الترويجية (مثلاً "+1 transfer مجاني عند الحجز المشترك") عبر قواعد promo.          | MUST     |
| FR-075 | يجب أن يدعم الـ package مصادر cross-supplier بشكل شفاف للمستخدم.                                                | MUST     |
| FR-076 | يجب أن يدعم الـ package إلغاء جزئي لكل مكون حسب سياسة كل مورد.                                                  | MUST     |

### Module: Payment (FR-077 — FR-094)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-077 | *يمتد من Pro FR-073..088.*                                                                                    | MUST     |
| FR-078 | يجب أن يدعم النظام طرق الدفع البديلة (alt-MPM) في KSA/UAE (mada، KNET، STC Pay) عبر **PayTabs**.            | MUST     |
| FR-079 | يجب أن يدعم النظام إعفاءات 3DS (TRA، low-value، fixed amount) طبقاً لـ PSD2 RTS.                              | MUST     |
| FR-080 | يجب أن يدعم النظام تسوية حسابات الـ corporate postpaid (credit-line) مع فاتورة وكشف حساب شهري.                | MUST     |
| FR-081 | يجب أن يدعم النظام refunds متعددة الأرجل (لكل مكون) مع audit trail لكل ساق.                                    | MUST     |
| FR-082 | يجب أن يدعم النظام استقبال chargeback عبر PayTabs IPN + queue للـ ops triage.                                   | MUST     |
| FR-083 | يجب أن يدمج النظام نتيجة **ML-FRAUD** في قرار توجيه PayTabs profile (high-risk → step-up + 3DS مفروض).         | MUST     |
| FR-084 | يجب أن يدمج النظام إشارات PayTabs fraud-screening كإشارة احتيال ثانوية تكمل ML-FRAUD.                          | MUST     |
| FR-085 | يجب أن يدعم النظام network tokens للبطاقات (PayTabs network tokenization) لتحسين معدلات الـ auth.              | SHOULD   |
| FR-086 | يجب أن يدعم النظام split-refund للـ payment intent (لكل booking-item) تلقائياً.                                 | MUST     |
| FR-087 | يجب أن يدعم النظام توليد credit-note لـ refunds حسابات الـ corporate.                                          | MUST     |
| FR-088 | يجب أن يدعم النظام حجز نقدي (corporate يجمع نقد من الموظف النهائي)؛ يتم تسويته مع BSP.                         | MUST     |
| FR-089 | يجب أن يدعم النظام تصدير BSP-CASS لكل فترة تسوية IATA.                                                          | MUST     |
| FR-090 | يجب أن يقوم النظام بمطابقة payouts PayTabs مع جداول رسوم PayTabs يومياً مع تنبيهات auto-discrepancy.            | MUST     |
| FR-091 | يجب أن يحتفظ النظام بتقارير FX risk مرجحة للمالية يومياً.                                                       | SHOULD   |
| FR-092 | يجب أن يدعم النظام refunds لطرق دفع بديلة فقط بموافقة المالية (4-eye).                                          | MUST     |
| FR-093 | يجب أن يشغّل النظام تجميع تلقائي لحزمة chargeback-rebuttal للـ ops.                                              | SHOULD   |
| FR-094 | يجب أن يسمح النظام بمسار dispute يقوده العميل في الـ dashboard مع رفع أدلة مرفقة.                                | MUST     |

### Module: Notifications (FR-095 — FR-108)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-095 | يجب أن يرسل النظام إشعارات **web push** عبر VAPID للمتصفحات المدعومة مع topic routing.                        | MUST     |
| FR-096 | يجب أن يرسل النظام WhatsApp عبر Cloud API (مكتسبة من Pro).                                                     | MUST     |
| FR-097 | يجب أن يرسل النظام إيميل transactional عبر مزود رئيسي + مزود failover تلقائي.                                  | MUST     |
| FR-098 | يجب أن يدعم النظام in-app inbox (SSE / WS في real-time) لكل مستخدم.                                            | MUST     |
| FR-099 | يجب أن يسمح النظام بـ overrides للقوالب لكل branch مع HTML + variants للغات.                                   | MUST     |
| FR-100 | يجب أن يسمح النظام بتفضيل القناة لكل نوع حدث لكل مستخدم.                                                       | MUST     |
| FR-101 | يجب أن يكتشف النظام quiet hours حسب timezone المستخدم ويؤجل القنوات غير الحرجة.                                | MUST     |
| FR-102 | يجب أن يقوم النظام بـ throttle لإشعارات التسويق بشكل منفصل عن الـ transactional.                                | MUST     |
| FR-103 | يجب أن يتتبع النظام التفاعل (open, click, ack) ويخزنه لكل إشعار.                                                | MUST     |
| FR-104 | يجب أن يدعم النظام إشعارات broadcast (للأدمن فقط) مع filters للجمهور.                                          | SHOULD   |
| FR-105 | يجب أن يدعم النظام إشعارات promo مقسمة بناءً على cohort tags.                                                  | MUST     |
| FR-106 | يجب أن يتدهور النظام بأناقة إذا فشل أي مزود واحد (multi-provider failover).                                    | MUST     |
| FR-107 | يجب أن يقوم النظام بـ localize الـ push payloads حسب لغة المتصفح؛ fallback EN.                                | MUST     |
| FR-108 | يجب أن يحترم النظام unsubscribe headers / List-Unsubscribe-Post في إيميلات الـ transactional والتسويق.        | MUST     |

### Module: Admin & Operations (FR-109 — FR-126)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-109 | *يمتد من Pro FR-101..114.*                                                                                    | MUST     |
| FR-110 | يجب أن توفر admin console لإدارة الفروع (branches) متعددة الفروع مع فصل بيانات لكل فرع.                       | MUST     |
| FR-111 | يجب أن توفر admin console لقواعد DYN-PRICE (priority، شروط، markup/discount، تواريخ سريان).                   | MUST     |
| FR-112 | يجب أن توفر admin console لنموذج ML-FRAUD (feature importance، توزيع النتائج، ضبط الـ threshold).             | MUST     |
| FR-113 | يجب أن توفر admin dashboard لصحة المناطق (لكل منطقة: معدل الخطأ، replication lag، edge latency).               | MUST     |
| FR-114 | يجب أن توفر admin dashboards للـ queues (عمق BullMQ لكل queue، أقدم job، معدل الفشل).                          | MUST     |
| FR-115 | يجب أن توفر admin workbench للـ chargebacks مع رفع أدلة + auto-rebuttal.                                       | MUST     |
| FR-116 | يجب أن توفر admin workbench للـ disputes من العملاء (منفصل عن الـ chargebacks).                                | MUST     |
| FR-117 | يجب أن توفر admin console لـ schedule-change مع إجراءات re-protect جماعية.                                     | MUST     |
| FR-118 | يجب أن توفر admin console لتقارير BSP-CASS.                                                                    | MUST     |
| FR-119 | يجب أن توفر admin CMS للمحتوى التسويقي (deals، banners، صفحات قانونية) للموقع.                                  | MUST     |
| FR-120 | يجب أن توفر admin console لمحرك قواعد promo مع simulator (A/B على التاريخ).                                    | MUST     |
| FR-121 | يجب أن توفر admin بحث audit في كل أحداث الـ audit (full-text + faceted).                                       | MUST     |
| FR-122 | يجب أن توفر admin console لـ data-subject-request (export، delete، restrict).                                  | MUST     |
| FR-123 | يجب أن توفر admin console للاستجابة للحوادث تربط Sentry / PagerDuty / runbooks.                                | MUST     |
| FR-124 | يجب أن توفر admin console لإدارة الإصدارات مع feature-flag rollout لكل branch + منطقة.                         | MUST     |
| FR-125 | يجب أن تدعم admin استقبال الأسعار المتعاقد عليها للأسعار corporate الخاصة بالناقلين (airline direct-contract). | MUST     |
| FR-126 | يجب أن توفر admin إدارة الحسابات الـ corporate (فواتير شهرية، حدود ائتمان، تقارير لكل حساب corp).             | MUST     |

### Module: Custom Dashboards (FR-127 — FR-138)

> ميزة Enterprise حصرية: لوحات تحكم قابلة للتخصيص (widgets قابلة للسحب والإفلات، تخطيطات
> محفوظة، فلاتر متقدمة) للمستخدمين الإداريين، فرق الـ ops، الـ finance، والـ admins
> متعددي الفروع. غير متاحة في Basic أو Pro.

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-127 | يجب أن يسمح النظام للمستخدمين الإداريين بإنشاء custom dashboards بترتيب widgets قابل للسحب والإفلات.            | MUST     |
| FR-128 | يجب أن يدعم النظام مكتبة widgets جاهزة: KPI tiles، time-series charts، tables، funnel، heatmap، geo map.       | MUST     |
| FR-129 | يجب أن يسمح النظام بحفظ تخطيطات (layouts) متعددة لكل user مع تسمية لكل تخطيط.                                  | MUST     |
| FR-130 | يجب أن يسمح النظام بمشاركة dashboards على مستوى branch أو role (read-only / clone-and-edit).                   | MUST     |
| FR-131 | يجب أن يدعم النظام فلاتر متقدمة (date range، supplier، market، currency، branch، corporate account).          | MUST     |
| FR-132 | يجب أن يدعم النظام widgets ديناميكية مع drill-down من ملخص إلى تفاصيل (مثلاً: GMV → bookings → booking).        | MUST     |
| FR-133 | يجب أن يدعم النظام جدولة تصدير dashboards كـ PDF يرسل بالبريد (يومي/أسبوعي).                                   | MUST     |
| FR-134 | يجب أن يخزن النظام تخطيطات الـ dashboards في DB مع versioning لكل تعديل.                                       | MUST     |
| FR-135 | يجب أن يدعم النظام alerts ربط widget بحد threshold (مثل "GMV اليوم < 80% من المتوسط الأسبوعي").              | MUST     |
| FR-136 | يجب أن يعزل النظام dashboards لكل branch (لا تسريب بين الفروع).                                                | MUST     |
| FR-137 | يجب أن يفرض النظام row-level permissions على widgets حسب صلاحية الـ user (لا تظهر مقاييس finance لـ support).  | MUST     |
| FR-138 | يجب أن يوفر النظام library قوالب dashboards جاهزة (Ops، Finance، Sales، Supplier Health) قابلة للنسخ والتعديل. | SHOULD   |

### Module: Fraud ML (FR-151 — FR-160)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-151 | يجب أن يقيّم ML-FRAUD كل محاولة حجز في real time (p95 < 80 ms).                                                | MUST     |
| FR-152 | يجب أن يصدر ML-FRAUD نتيجة 0–100 بالإضافة إلى reason codes (مثل `VELOCITY`، `GEO_MISMATCH`، `BIN_AAVS_FAIL`). | MUST     |
| FR-153 | يجب أن يتسبب ML-FRAUD في: < 30 → frictionless؛ 30–70 → step-up MFA + 3DS مفروض؛ > 70 → block + مراجعة ops.   | MUST     |
| FR-154 | يجب أن يحفظ ML-FRAUD النتيجة + features + القرار لكل حجز للقابلية للتفسير.                                    | MUST     |
| FR-155 | يجب أن يدعم ML-FRAUD وضع shadow (يتنبأ لكن لا ينفذ) لكل cohort للـ A/B.                                       | MUST     |
| FR-156 | يجب أن يسمح ML-FRAUD بـ overrides بناءً على قواعد (allow-list لكل email/IP/BIN) يدير الـ ops.                  | MUST     |
| FR-157 | يجب أن يُعاد تدريب ML-FRAUD شهرياً بنتائج الـ chargeback المُصنّفة (offline pipeline).                          | MUST     |
| FR-158 | يجب أن يراقب ML-FRAUD الـ drift عبر PSI على features رئيسية؛ تنبيه عند PSI > 0.2.                              | MUST     |
| FR-159 | يجب أن يكون لـ ML-FRAUD إصدارات نماذج (semver) ويسمح بـ rollback عبر flag.                                    | MUST     |
| FR-160 | يجب أن يكون ML-FRAUD قابل للتدقيق من SOC؛ القرارات ظاهرة في الـ admin وأدوات الدعم.                            | MUST     |

### Module: Dynamic Pricing (FR-161 — FR-170)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-161 | يجب أن يطبق DYN-PRICE القواعد حسب أولوية: branch override → market → channel → cohort.                       | MUST     |
| FR-162 | يجب أن يدعم DYN-PRICE markups (موجبة) و discounts (سالبة) مع قواعد cap لكل مورد.                              | MUST     |
| FR-163 | يجب أن يدعم DYN-PRICE elasticity hooks (A/B على ارتفاع التحويل)؛ مع تسجيل القرار.                              | MUST     |
| FR-164 | يجب أن يسمح DYN-PRICE بقواعد مجدولة (مثل "Black Friday + 10% خصم على الرحلات الدولية").                       | MUST     |
| FR-165 | يجب أن يحترم DYN-PRICE أسعار الـ floor المتعاقد عليها مع المورد (لا بيع تحتها).                                | MUST     |
| FR-166 | يجب أن يعرض DYN-PRICE السعر النهائي فقط (بدون تسريب markup)؛ مع الاحتفاظ بـ audit.                            | MUST     |
| FR-167 | يجب أن يدعم DYN-PRICE حل promo-code (لكل كود: خصم، الأهلية، استخدام واحد، انتهاء).                            | MUST     |
| FR-168 | يجب أن يحاكي DYN-PRICE تأثير القاعدة على آخر 30 يوم من الحجوزات قبل التفعيل.                                  | MUST     |
| FR-169 | يجب أن يصدر DYN-PRICE أحداث قرارات التسعير لـ BI لتقارير الأداء.                                              | MUST     |
| FR-170 | يجب أن يسمح DYN-PRICE بـ override لكل branch بدون تأثير عبر الفروع الأخرى.                                   | MUST     |

---

## المتطلبات غير الوظيفية

### Performance

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-001 | flight search p95 ≤ 1.8 s محلي للمنطقة (cache-cold)، ≤ 500 ms cache-hot.                     |
| NFR-002 | API غير المرتبط بالموردين p95 ≤ 150 ms.                                                       |
| NFR-003 | ML-FRAUD score p95 ≤ 80 ms؛ p99 ≤ 150 ms.                                                     |
| NFR-004 | تقييم قاعدة DYN-PRICE p95 ≤ 10 ms لكل عرض.                                                    |
| NFR-005 | webhook ingestion p95 ≤ 100 ms ack.                                                           |
| NFR-006 | LCP ≤ 1.6 s، INP ≤ 150 ms، CLS ≤ 0.05.                                                        |

### Scalability

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-007 | booking funnel يحتمل 800 RPS؛ peak 2000 RPS لمدة 15 دقيقة.                                    |
| NFR-008 | catalog/search يحتمل 5000 RPS.                                                                |
| NFR-009 | BullMQ workers يجب أن تتوسع حتى 40 replicas؛ packages queue يتوسع تلقائياً بشكل مستقل.        |
| NFR-010 | Postgres يجب أن يعمل primary + 2 sync replicas + 2 async read replicas لكل منطقة.             |

### Availability

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-011 | هدف uptime شهري 99.95% (≤ 21.6 دقيقة downtime).                                                |
| NFR-012 | RPO ≤ 1 دقيقة (cross-region async replication)، RTO ≤ 15 دقيقة لفقدان منطقة كاملة.            |
| NFR-013 | multi-region active-active مع anycast DNS + توجيه واعي بالمنطقة (latency).                    |
| NFR-014 | auto-failover عند تدهور صحة المنطقة (composite health check يفشل 3× في 60 ثانية).             |
| NFR-015 | read-after-write consistency داخل المنطقة؛ eventual بين المناطق (≤ 5 s للقراءات).             |
| NFR-016 | deploys بدون downtime عبر blue/green.                                                          |

### Security

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-017 | TLS 1.3 مفضل؛ HSTS preload؛ OCSP stapling؛ مجموعات cipher بـ PFS فقط.                         |
| NFR-018 | البيانات في الـ rest بـ AES-256 مع KEK جذر من KMS؛ DEK لكل branch يتم rotation شهرياً.        |
| NFR-019 | secrets في Vault (enterprise-grade)؛ credentials ديناميكية قصيرة العمر لوصول الـ DB.            |
| NFR-020 | SOC 2 Type II — Security، Availability، Confidentiality — تدقيق سنوي.                         |
| NFR-021 | PCI DSS v4.0 — SAQ A-EP لـ B2C؛ SAQ D-SP محدد النطاق لـ payouts للموردين.                     |
| NFR-022 | pentest خارجي ربع سنوي؛ داخلي شهري؛ بوابات OPA policy في CI.                                  |

### Compliance & Privacy

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-023 | GDPR، PDPL السعودي، قانون حماية البيانات المصري 151/2020، PDPL الإماراتي محترمة جميعها مع data residency إقليمية. |
| NFR-024 | DSR (export/delete/restrict) SLA: 30 يوم؛ متتبع في الـ admin.                                  |
| NFR-025 | data residency: حجوزات KSA مخزنة في me-central-1؛ EU في eu-central-1؛ الافتراضي eu.           |
| NFR-026 | right-to-be-forgotten محترم خلال 30 يوم إلا إذا كان flag legal-hold مفعل.                      |
| NFR-027 | cookie consent لكل منطقة مع تحكم granular؛ consent ledger.                                     |

### I18N / A11Y

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-028 | AR (RTL)، EN، FR، ES — دعم كامل شامل الإيميلات والـ PDFs.                                     |
| NFR-029 | WCAG 2.1 AA.                                                                                  |
| NFR-030 | كل المبالغ تُعرض بأكواد ISO 4217 صريحة؛ فواصل تجميع/عشرية واعية باللغة.                        |
| NFR-031 | تنسيق تاريخ/وقت خاص باللغة عبر ICU.                                                            |

---

## معمارية النظام

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
   │                                         Web (Next.js 15) + Admin Console (RBAC)                        │
   │                                                              │                                          │
   │                                                              ▼                                          │
   │  ┌─────────────────────────────── API Gateway (per region) ──────────────────────────────┐           │
   │  │ Cloudflare WAF → Cloudflare Workers (edge auth / smart cache) → ALB → NestJS Gateway   │           │
   │  └────────────────────────────────────────┬────────────────────────────────────────────────┘           │
   │                                            │                                                          │
   │  ┌────────────────────────┬─────────────────────────────┬─────────────────────────┐                  │
   │  ▼                        ▼                             ▼                         ▼                  │
   │ Flight Svc            Ancillaries Svc                Booking Svc                Payment Svc            │
   │ (Amadeus,            (Amadeus Tours,                 (saga engine,             (PayTabs router,        │
   │  Sabre/Travelport,    Activities,                     package builder,         FX engine,              │
   │  NDC)                 Transfers, Cars)                atomic ops)              Fraud-ML hook,          │
   │                                                                                PayTabs multi-          │
   │                                                                                currency)              │
   │     │                       │                              │                           │              │
   │     └───────────┬───────────┴──────────────────────────────┴───────────────────────────┘              │
   │                 ▼                                                                                     │
   │           Identity Svc ─ Auth ─ MFA ─ WebAuthn ─ SAML/OIDC ─ SCIM                                     │
   │                                                                                                       │
   │  ┌────────────────────────────┬────────────────────────────┬────────────────────────────┐            │
   │  ▼                            ▼                            ▼                            ▼            │
   │ Notifications Svc        ML-FRAUD Svc (Python)        DYN-PRICE Svc            Dashboards Svc         │
   │ (push, email,             (FastAPI + xgboost/                                  (custom dashboards     │
   │  WA, SSE)                  isolation-forest)                                    + BI widgets)          │
   │                                                                                                       │
   │  Data plane (per region):                                                                              │
   │   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                            │
   │   │ Postgres 16  │   │ Redis 7      │   │ S3 / R2      │   │ ClickHouse   │                            │
   │   │ primary +    │   │ cluster      │   │ tickets/     │   │ analytics +  │                            │
   │   │ 2 sync       │   │ + BullMQ     │   │ invoices     │   │ ML features  │                            │
   │   │ + 2 async    │   │              │   │              │   │              │                            │
   │   └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘                            │
   │                                                                                                       │
   │  Async backbone (per region): NATS JetStream + cross-region mirroring for `domain.events`             │
   └───────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### استراتيجية Multi-Region

- DNS عبر Cloudflare؛ توجيه latency-based مثبت على أقرب منطقة سليمة للمستخدم.
- writes تذهب للـ primary في المنطقة المحلية؛ cross-region eventual replication (logical
  replication، عادة < 5 ثانية).
- read-after-write داخل المنطقة (sticky session header `X-Jawla-Region`).
- bookings + payments موجهة إلى "source-region" sticky طوال مدة الـ saga.
- الفروع موسومة بـ **home region** للالتزام (data residency).

### Internal Communication

- north-south: REST (للـ Web + Admin Console).
- east-west: gRPC + NATS JetStream (events).
- service mesh: Linkerd (mTLS).

---

## تصميم قاعدة البيانات

PostgreSQL 16 مع row-level security و per-region sharding. كل جدول يحتوي
`branch_id UUID NOT NULL` (لعزل بيانات الفروع الإدارية)؛ سياسة RLS الافتراضية
`USING (branch_id = current_setting('app.branch_id')::uuid)`.

### جداول Enterprise (الزيادة على Pro)

| الجدول                       | الهدف                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `branches`                   | سجل فروع الإدارة (multi-branch admin) — كل فرع منعزل بـ branch_id              |
| `branch_paytabs_profiles`    | PayTabs merchant profiles لكل فرع/منطقة/عملة                                  |
| `corporate_accounts`         | حسابات الشركات B2B (postpaid، فواتير شهرية)                                  |
| `corporate_credit`           | حدود ائتمان + الاستخدام + الكشوف لكل حساب corporate                          |
| `corporate_users`            | المستخدمين داخل الحساب الـ corporate                                          |
| `group_bookings`             | حجوزات جماعية حتى 50 راكب (لرحلات الوفود/المدارس/المؤتمرات)                  |
| `packages`                   | قوالب packages محفوظة                                                          |
| `package_components`         | المكونات لكل package                                                           |
| `dynpricing_rules`           | قواعد محرك DYN-PRICE                                                           |
| `dynpricing_logs`            | القرارات المسجلة                                                                |
| `mlfraud_scores`             | نتائج الاحتيال + features لكل حجز                                              |
| `chargebacks`                | سجل الـ chargeback                                                              |
| `disputes`                   | disputes يبدأها العميل                                                          |
| `schedule_changes`           | أحداث schedule-change من الناقل + إجراءات re-protect                            |
| `data_subject_requests`      | تذاكر DSR لـ GDPR/PDPL                                                          |
| `device_tokens`              | tokens الـ web-push لكل user/browser                                            |
| `push_messages`              | سجل الـ push + حالة التسليم                                                     |
| `feature_flags`              | flags لكل env / لكل branch / لكل cohort                                        |
| `corporate_fares`            | عقود corporate fares متفاوض عليها مع شركات الطيران                              |
| `custom_dashboards`          | تعريفات لوحات التحكم المخصصة لكل user/role                                     |
| `dashboard_widgets`          | الـ widgets داخل كل dashboard + إعدادات/تخطيط/فلاتر                            |
| `dashboard_versions`         | versioning لتعديلات الـ dashboards                                              |

### مقتطفات DDL

```sql
CREATE TABLE branches (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  legal_name   TEXT NOT NULL,
  home_region  TEXT NOT NULL CHECK (home_region IN ('eu-central-1','me-central-1','ap-south-1')),
  status       TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','SUSPENDED','ARCHIVED')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE corporate_accounts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id     UUID NOT NULL REFERENCES branches(id),
  legal_name    TEXT NOT NULL,
  tax_id        TEXT,
  billing_email CITEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON corporate_accounts (branch_id);

CREATE TABLE corporate_users (
  user_id              UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  corporate_account_id UUID NOT NULL REFERENCES corporate_accounts(id) ON DELETE CASCADE,
  role                 TEXT NOT NULL CHECK (role IN ('corp_admin','traveler','finance','viewer')),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE corporate_credit (
  corporate_account_id UUID PRIMARY KEY REFERENCES corporate_accounts(id) ON DELETE CASCADE,
  currency             CHAR(3) NOT NULL,
  limit_minor          BIGINT NOT NULL,
  utilized_minor       BIGINT NOT NULL DEFAULT 0,
  payment_terms        TEXT NOT NULL DEFAULT 'NET30',
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE group_bookings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id     UUID NOT NULL REFERENCES branches(id),
  corporate_account_id UUID REFERENCES corporate_accounts(id),
  group_name    TEXT NOT NULL,
  pax_count     INT NOT NULL CHECK (pax_count BETWEEN 8 AND 50),
  status        TEXT NOT NULL CHECK (status IN ('DRAFT','QUOTED','CONFIRMED','CANCELLED')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE packages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id     UUID NOT NULL REFERENCES branches(id),
  type          TEXT NOT NULL CHECK (type IN ('TEMPLATE','DYNAMIC')),
  config        JSONB NOT NULL,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE package_components (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id    UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL CHECK (component_type IN ('FLIGHT','TRANSFER','ACTIVITY','CAR')),
  config        JSONB NOT NULL,
  required      BOOLEAN NOT NULL DEFAULT TRUE,
  seq           INT NOT NULL
);

CREATE TABLE dynpricing_rules (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id     UUID REFERENCES branches(id),
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
  psp            TEXT NOT NULL DEFAULT 'paytabs',
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
  platform     TEXT NOT NULL DEFAULT 'web-push',
  token        TEXT NOT NULL,
  user_agent   TEXT,
  last_seen    TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (platform, token)
);

CREATE TABLE feature_flags (
  key            TEXT NOT NULL,
  branch_id      UUID,
  env            TEXT NOT NULL,
  enabled        BOOLEAN NOT NULL,
  rollout_pct    SMALLINT,
  cohort         JSONB,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (key, COALESCE(branch_id, '00000000-0000-0000-0000-000000000000'::uuid), env)
);

CREATE TABLE custom_dashboards (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id      UUID NOT NULL REFERENCES branches(id),
  owner_user_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  layout         JSONB NOT NULL,                -- grid layout (rows, cols, breakpoints)
  filters        JSONB NOT NULL DEFAULT '{}',   -- saved filter state
  visibility     TEXT NOT NULL DEFAULT 'PRIVATE'
                 CHECK (visibility IN ('PRIVATE','BRANCH','ROLE','PUBLIC')),
  shared_with    JSONB,                          -- {roles: [...], userIds: [...]}
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON custom_dashboards (branch_id, owner_user_id);

CREATE TABLE dashboard_widgets (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id   UUID NOT NULL REFERENCES custom_dashboards(id) ON DELETE CASCADE,
  widget_type    TEXT NOT NULL
                 CHECK (widget_type IN ('KPI_TILE','TIME_SERIES','TABLE','FUNNEL','HEATMAP','GEO_MAP','PIE','BAR')),
  title          TEXT NOT NULL,
  data_source    TEXT NOT NULL,                 -- e.g., 'bookings.gmv', 'payments.refunds'
  query_config   JSONB NOT NULL,                -- dimensions, metrics, filters, aggregation
  position       JSONB NOT NULL,                -- {x, y, w, h}
  alert_config   JSONB,                          -- {threshold, op, recipients}
  refresh_secs   INT NOT NULL DEFAULT 60
);
CREATE INDEX ON dashboard_widgets (dashboard_id);

CREATE TABLE dashboard_versions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id   UUID NOT NULL REFERENCES custom_dashboards(id) ON DELETE CASCADE,
  version        INT NOT NULL,
  layout         JSONB NOT NULL,
  widgets_snapshot JSONB NOT NULL,
  changed_by     UUID NOT NULL REFERENCES users(id),
  changed_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (dashboard_id, version)
);
```

### الـ Indexes

- كل أعمدة `branch_id` بها index؛ multi-column indexes للاستعلامات الحارة المرتبطة بـ branch.
- `bookings(branch_id, status, created_at DESC)` لجداول زمنية للـ branch.
- GIN على أعمدة JSONB للـ filtering الـ ad-hoc.
- BRIN indexes للجداول الزمنية (`audit_events`، `dynpricing_logs`،
  `mlfraud_scores`).

---

## تصميم الـ API

حوالي 60 endpoint. يرث endpoints الباقة Pro. المصادقة عبر JWT. كل الـ endpoints
multi-branch عبر header `X-Jawla-Branch: <slug>` (يُحل في الـ gateway).

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
| 11 | POST   | `/auth/saml/{corp}/sso`                          | none        | 302      |
| 12 | POST   | `/auth/saml/{corp}/acs`                          | none        | 200      |
| 13 | POST   | `/auth/oidc/{corp}/sso`                          | none        | 302      |
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
| 29 | POST   | `/packages/search`                               | bearer      | 200      |
| 30 | POST   | `/packages/build`                                | bearer      | 200      |
| 31 | POST   | `/transfers/search`                              | bearer      | 200      |
| 32 | POST   | `/activities/search`                             | bearer      | 200      |
| 33 | POST   | `/cars/search`                                   | bearer      | 200      |
| 34 | POST   | `/carts`                                         | bearer      | 201      |
| 35 | POST   | `/carts/{id}/items`                              | bearer      | 200      |
| 36 | DELETE | `/carts/{id}/items/{itemId}`                     | bearer      | 200      |
| 37 | POST   | `/carts/{id}/promo-code`                         | bearer      | 200      |
| 38 | POST   | `/carts/{id}/checkout`                           | bearer      | 201      |
| 39 | GET    | `/bookings/{id}`                                 | bearer      | 200      |
| 40 | GET    | `/bookings`                                      | bearer      | 200      |
| 41 | POST   | `/bookings/{id}/cancel`                          | bearer+OTP  | 200      |
| 42 | POST   | `/bookings/{id}/change`                          | bearer      | 200      |
| 43 | POST   | `/bookings/{id}/reprotect`                       | bearer      | 200      |
| 44 | GET    | `/bookings/{id}/invoice`                         | bearer      | 200      |
| 45 | POST   | `/bookings/{id}/dispute`                         | bearer      | 201      |
| 46 | POST   | `/payments/intents`                              | bearer      | 201      |
| 47 | POST   | `/payments/refunds`                              | admin+OTP   | 201      |
| 48 | POST   | `/payments/methods`                              | bearer      | 201      |
| 49 | DELETE | `/payments/methods/{id}`                         | bearer      | 204      |
| 50 | POST   | `/webhooks/paytabs`                              | sig         | 200      |
| 51 | POST   | `/webhooks/whatsapp`                             | sig         | 200      |
| 52 | POST   | `/notifications/preferences`                     | bearer      | 200      |
| 53 | GET    | `/notifications/inbox`                           | bearer      | 200      |
| 54 | POST   | `/notifications/devices`                         | bearer      | 201      |
| 55 | DELETE | `/notifications/devices/{id}`                    | bearer      | 204      |
| 56 | POST   | `/corporate-accounts`                            | admin       | 201      |
| 57 | GET    | `/corporate-accounts/{id}`                       | corp_admin  | 200      |
| 58 | POST   | `/corporate-accounts/{id}/users`                 | corp_admin  | 201      |
| 59 | GET    | `/corporate-accounts/{id}/credit`                | corp_admin  | 200      |
| 60 | GET    | `/corporate-accounts/{id}/statement?period=`     | finance     | 200      |
| 61 | POST   | `/group-bookings`                                | bearer      | 201      |
| 62 | POST   | `/group-bookings/{id}/passengers/bulk`           | bearer      | 200      |
| 63 | POST   | `/admin/branches`                                | admin       | 201      |
| 64 | GET    | `/admin/branches`                                | admin       | 200      |
| 65 | POST   | `/admin/dynpricing/rules`                        | admin       | 201      |
| 66 | POST   | `/admin/dynpricing/simulate`                     | admin       | 200      |
| 67 | POST   | `/admin/fraud/overrides`                         | ops         | 201      |
| 68 | POST   | `/admin/feature-flags`                           | admin       | 200      |
| 69 | GET    | `/admin/dashboards`                              | admin       | 200      |
| 70 | POST   | `/admin/dashboards`                              | admin       | 201      |
| 71 | GET    | `/admin/dashboards/{id}`                         | admin       | 200      |
| 72 | PATCH  | `/admin/dashboards/{id}`                         | admin       | 200      |
| 73 | DELETE | `/admin/dashboards/{id}`                         | admin       | 204      |
| 74 | POST   | `/admin/dashboards/{id}/widgets`                 | admin       | 201      |
| 75 | PATCH  | `/admin/dashboards/{id}/widgets/{wid}`           | admin       | 200      |
| 76 | DELETE | `/admin/dashboards/{id}/widgets/{wid}`           | admin       | 204      |
| 77 | POST   | `/admin/dashboards/{id}/share`                   | admin       | 200      |
| 78 | GET    | `/admin/dashboards/{id}/export.pdf`              | admin       | 200      |

## المصادقة والتصريح

### نموذج Tokens

- access JWT 10 دقائق، refresh 30 يوم (rotated، family-aware).
- claims جديدة: `branch_id`، `corporate_account_id?`، `mfa: bool`، `step_up_until: <epoch>`،
  `region`، `risk: 0..100`.
- refresh tokens مخزنة بـ hash؛ الـ rotation يلغي السابق؛ إعادة الاستخدام →
  العائلة كلها تُبطل.

### Identity Providers

- B2C: email/password، Google، WebAuthn passkey.
- Corporate: SAML 2.0 + OIDC لكل حساب corporate؛ دورة حياة المستخدم بـ SCIM 2.0؛
  MFA إجباري لأدوار finance/admin.

### نموذج التصريح

- **RBAC** للدور على مستوى عام + **ABAC عبر OPA** للقرارات الدقيقة
  (نطاق الـ branch، نطاق الحساب الـ corporate، نطاق المنطقة).
- bundles من OPA policies موقعة؛ تُحمل عند البدء؛ hot-reload عند تحديث الـ bundle.
- policy نموذجية:

```rego
package jawla.authz

default allow = false

allow {
  input.action == "booking:read"
  input.subject.branch_id == input.resource.branch_id
  some role
  role := input.subject.roles[_]
  role_can_read_booking[role]
}

role_can_read_booking["customer"] {
  input.subject.user_id == input.resource.user_id
}
role_can_read_booking["corp_admin"] {
  input.subject.corporate_account_id == input.resource.corporate_account_id
}
role_can_read_booking["admin"]
role_can_read_booking["support"]
```

### MFA

- TOTP (RFC 6238)، WebAuthn (FIDO2)، backup codes.
- step-up مطلوب لـ: refunds، عمليات payment-method، تعطيل MFA، تعيين الأدوار،
  تعديل قواعد DYN-PRICE، تغيير feature-flags على مستوى الإنتاج.

---

## الأمان

### تخفيفات OWASP / ASVS L3 (الزيادة)

| المجال                       | التحكم                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| Authentication               | WebAuthn، DPoP، عائلات refresh، كشف الشذوذ (impossible travel)                                            |
| Authorization                | bundles OPA policy، RLS في Postgres، deny-by-default                                                      |
| Cryptography                 | KMS hierarchy، rotation شهري للـ DEK، AES-256-GCM مع AAD، RSA-OAEP للـ envelope                          |
| Input Validation             | Zod في كل مكان؛ فرض schema على مستوى الـ gateway؛ JSON-Schema للـ webhooks الخارجية                       |
| Logging/Monitoring           | SIEM (Vector → Sumo/ELK)، audit مركزي؛ الوصول مراجع ربع سنوياً                                            |
| SSRF / Egress                | egress gateway مع allow-list، DNS pinning، شروط signed-URL لسحب البائعين                                  |
| Supply Chain                 | صور موقعة بـ Cosign، SBOMs (CycloneDX)، Snyk في CI، حماية branch في GitHub                                |
| Insider                      | credentials DB just-in-time عبر Vault؛ PAM (Teleport) لـ prod shell؛ تسجيل الجلسات                        |

### التشفير

- KMS hierarchy: AWS KMS root → KEK لكل منطقة → DEK لكل branch → DEK لكل سجل.
- تشفير على مستوى الحقل (AES-256-GCM) لـ: أرقام مستندات السفر، تفاصيل BIN للبطاقات
  المحفوظة، عناوين العملاء، تفاصيل ائتمان حسابات الـ corporate.
- تخزين الكائنات SSE-KMS؛ lifecycle إلى Glacier Deep Archive بعد سنة.

### PCI DSS

- SAQ A-EP لـ B2C (حقول مستضافة من PayTabs PayPage).
- نطاق SAQ D-SP لـ payouts الموردين (لأننا نوجه حركة الأموال)؛ تدقيق سنوي
  في الموقع + ASV scan ربع سنوي؛ التقسيم مختبر سنوياً.

### برامج الالتزام

- SOC 2 Type II — Security، Availability، Confidentiality. كتالوج التحكم في
  Vanta/Drata؛ تدقيق سنوي.
- DPIA GDPR لكل نشاط معالجة جديد؛ موافقة DPO؛ record-of-processing.
- DPAs خاصة بحسابات الـ corporate متاحة؛ قائمة sub-processors عامة.

### Rate Limiting

- Edge (Cloudflare): DDoS + bot fight.
- App (NestJS): token-bucket لكل (route، principal) — الـ principal ممكن يكون user،
  corporate account، branch، أو IP.
- تكيفي: ML-FRAUD high score → حدود أضيق.

### Secrets

- HashiCorp Vault (HA cluster، auto-unseal عبر KMS).
- credentials ديناميكية لـ Postgres (TTL 15 دقيقة) لكل خدمة.
- secrets ثابتة (3rd-party API keys) rotation ربع سنوي مع runbooks.

---

## Workflow الحجز

### Saga (Enterprise، يدرك الـ packages)

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
         FLIGHT.book         TRANSFER.book         ACTIVITY.book          CAR.book
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

### قواعد التعويض

- لكل إجراء مورد مؤكد، يوجد compensator مكتوب بنوع (إلغاء PNR،
  إلغاء transfer، إلغاء activity، إلغاء car rental).
- إذا فشل التعويض، الحجز يُوقف في `MANUAL_OPS_REQUIRED` مع تنبيه ورابط runbook في الـ admin.

### المهل (Enterprise)

| الخطوة            | hard timeout | إعادة المحاولة                          |
| ----------------- | ------------ | --------------------------------------- |
| pre-fraud check   | 80 ms        | لا شيء (fallthrough = ALLOW عند timeout) |
| price confirm     | 6 s          | 1 retry                                  |
| supplier book     | 25 s لكل واحد | 3 retries exp                            |
| payment capture   | 8 s          | 5 retries exp                            |
| notify            | 5 min queued | 5 retries                                |
| invoice           | 60 s         | 3 retries                                |

### Idempotency

- `Idempotency-Key` UUIDv7 مطلوب على كل POST يغير الحالة.
- مخزن 24 ساعة مع hash للاستجابة + status؛ الـ replays ترجع الاستجابة الأصلية.
- محدد النطاق لكل branch (key namespace = branch).

---

## Flow الطيران (Enterprise)

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
   - PAYMENT_HOLD: PayTabs profile via branch config + ML-FRAUD signal
   - PNR: source-of-record bookFlow
   - TICKET: issue via supplier
   - CAPTURE: capture PayTabs
   - POST: invoice + notify (push + WA + email)

exchange flow ──▶ NDC change endpoints where supported; otherwise cancel+rebook saga with delta
```

---

## Flow الـ Ancillaries (Transfers / Activities / Cars عبر Amadeus)

```
search                ──▶ ancillaries.search(type, location, dates)
                             ├─▶ amadeus.transfers | amadeus.activities | amadeus.cars
                             ├─▶ DYN-PRICE per offer
                             └─▶ normalize + cache 10m
detail                ──▶ supplier.details(offerId)
offer.confirm         ──▶ supplier offer confirmation
checkout              ──▶ saga (FRAUD → PAYMENT_HOLD → <ANCILLARY>.book → CAPTURE → notify)
post-confirmation     ──▶ confirmation PDF (multilingual) + push + WA + email
schedule_changes      ──▶ supplier event → re-protect workflow + customer notify
```

---

## Flow الدفع (PayTabs multi-currency + fraud + corporate credit)

### B2C

```
quote ──▶ fraud preview ──▶ PayTabs profile (currency, market, branch route table)
       ──▶ PayTabs (multi-currency: EGP/USD/EUR/SAR/AED)
       ──▶ 3DS (forced if challenge or PSD2)
       ──▶ hold (Auth) ──▶ supplier book ──▶ capture ──▶ confirm
```

### Corporate (credit-line)

```
quote ──▶ corporate credit available?
            yes ──▶ debit credit + supplier book + invoice on monthly cycle
            no  ──▶ require partial card top-up (split-pay) or block

settle ──▶ end-of-month invoice + statement export (PDF + CSV) per corporate account
```

### Refunds

```
trigger (customer | ops | rule) ──▶ refund saga
   - eligibility check (policy + state + chargeback)
   - PayTabs refund (or credit-note for corporate accounts)
   - per-leg supplier refund (component-level)
   - notify
```

### دورة حياة Chargeback

```
PayTabs IPN (chargeback.opened) ──▶ chargebacks row OPEN
                                         │
                                         ▼
                                 ops auto-evidence assembly (booking, IP, OTP, 3DS, supplier acceptance)
                                         │
                                         ▼
                                   SUBMITTED ──▶ PayTabs arbitration ──▶ WON / LOST
                                                                              │
                                                                              ▼
                                                                       if LOST: post-mortem + ML feedback
```

---

## Admin Modules

راجع FR-109..126 للقائمة. بالإضافة لما في Pro:

| الصفحة                          | الإمكانيات                                                                  |
| ------------------------------- | ------------------------------------------------------------------------- |
| Branches                        | إنشاء، تعليق، إعدادات، PayTabs profiles لكل فرع                            |
| Corporate Accounts              | onboarding، credit، فواتير شهرية، تقارير، إدارة مستخدمين                  |
| Custom Dashboards               | محرر widgets، تخطيطات، مشاركة، تصدير PDF، alerts                          |
| DYN-PRICE                       | CRUD للقواعد، محرر priority، simulator، تاريخ A/B                          |
| ML-FRAUD                        | histograms للنتائج، audit للقرارات، override allow-list، rollback النموذج |
| Region health                   | حركة لكل منطقة، معدل الخطأ، replication lag، نسبة edge cache hit          |
| Queues                          | عمق BullMQ لكل queue، عمر أقدم job، معدل الفشل، زر requeue                |
| Chargebacks                     | الحالات المفتوحة، تجميع تلقائي لحزمة الأدلة، workflow الإرسال              |
| Disputes                        | disputes العملاء، رفع أدلة، pipeline الحالة                                |
| Schedule changes                | re-protect جماعي، قوالب comms للعملاء لكل تغيير                            |
| BSP / CASS                      | تقارير دورية، exports، إرسالات IATA                                        |
| Content CMS                     | تسويق، مدونة، عروض، banners                                                |
| Promo / Coupon engine           | CRUD للأكواد، قواعد الأهلية، الاسترداد، حماية احتيال                       |
| Audit                           | بحث faceted، CSV export، browser للاحتفاظ                                  |
| DSR Console                     | حالات DSR، الساعة التنظيمية، legal hold                                    |
| Incident Response               | لوحة الحالة، runbooks، postmortems                                         |
| Release Mgmt                    | محرر feature-flag، استهداف cohort، kill-switches                          |
| Corporate Fares                 | استقبال عقود corporate fares مع الناقلين، نوافذ صلاحية، مراقبة             |

---

## النشر

### الـ Topology

- **Frontend (Next.js)**: Vercel مع deployment متعدد المناطق + edge functions في
  3 مناطق (responsive web فقط، بدون تطبيقات native).
- **Backend**: Kubernetes (EKS/GKE) لكل منطقة؛ ArgoCD GitOps؛ Helm charts؛
  Linkerd mTLS mesh.
- **Database**: Postgres مُدار لكل منطقة مع logical replication؛ pgvector
  extension لعمليات ML embeddings (مثل ML-FRAUD).
- **Cache/Queue**: ElastiCache for Redis Cluster لكل منطقة + cross-region replication
  للـ queues؛ NATS JetStream للأحداث.
- **Object storage**: S3 مع cross-region replication؛ Glacier Deep Archive.
- **CDN/WAF**: Cloudflare global anycast + WAF + bot management.

### CI/CD

| المرحلة            | الخطوات                                                                              |
| ------------------ | ------------------------------------------------------------------------------------ |
| lint               | eslint، prettier، tsc                                                                |
| test:unit          | Jest، RTL، ≥ 85% lines                                                               |
| test:integration   | testcontainers + WireMock                                                            |
| test:contract      | Pact verify لكل supplier + PayTabs                                                   |
| test:e2e           | Playwright لكل منطقة لكل لغة                                                          |
| build              | docker buildx multi-arch؛ Cosign sign؛ SBOM CycloneDX؛ Snyk + Trivy                 |
| deploy:preview     | Vercel preview + per-PR k8s namespace                                                |
| deploy:staging     | ArgoCD sync عند merge إلى `main`                                                     |
| smoke:staging      | حجز اصطناعي flight + flight package                                                    |
| deploy:prod        | موافقة يدوية → تدريجي (canary لكل منطقة)                                              |
| post-deploy        | OTel synthetic check؛ auto-rollback عند تراجع SLO                                    |

### متغيرات البيئة (إضافات على Pro)

| المتغير                          | الهدف                                                  |
| -------------------------------- | ------------------------------------------------------ |
| `AMADEUS_ENTERPRISE_KEY`/`_SECRET` | Amadeus Enterprise (NDC + Tours/Activities/Transfers/Cars) |
| `PAYTABS_SERVER_KEY`/`_PROFILE_ID_<region>` | PayTabs server keys + per-region profile IDs |
| `PAYTABS_IPN_SECRET`             | PayTabs IPN HMAC signing secret                        |
| `VAPID_PUBLIC_KEY`/`_PRIVATE_KEY`| Web Push (VAPID) للمتصفحات                              |
| `SAML_IDP_METADATA_<corp>`       | metadata SAML لكل حساب corporate                       |
| `OPA_BUNDLE_URL`                 | bundle policy لـ OPA                                   |
| `MLFRAUD_API_URL`/`_TOKEN`       | خدمة ML-FRAUD                                          |
| `DYN_PRICE_API_URL`              | خدمة DYN-PRICE                                          |
| `NATS_URL`                       | event bus                                              |
| `VAULT_ADDR`/`VAULT_ROLE`        | Vault                                                  |
| `KMS_KEY_ARN_<region>`           | KMS لكل منطقة                                          |

---

## Logging

- Pino (Node) + structlog (خدمات Python ML).
- الحقول المطلوبة: `ts`، `level`، `service`، `region`، `branch_id`، `actor_id`،
  `correlation_id`، `trace_id`، `span_id`، `route`، `msg`.
- التوجيه: stdout → Vector → ClickHouse (analytics) + S3 cold + SIEM (Splunk/Sumo).
- redaction الحساس موسع: card_*، doc_*، otp، password، secret، ssn،
  tax_id، corporate_credit_details، mlfraud_features (مع PII منزوع فقط).
- الاحتفاظ: 30 يوم hot؛ 2 سنة warm؛ 7 سنوات audit (S3 Object Lock + WORM).

---

## المراقبة

- الـ stack: Sentry، Grafana Cloud، Datadog APM، PagerDuty، StatusPage.
- OpenTelemetry SDK من البداية للنهاية (web، API، workers، خدمات ML).

### Metrics

| Metric                                       | ملاحظات                                          |
| -------------------------------------------- | ---------------------------------------------- |
| `http_server_duration_ms`                    | حسب route، status، region                       |
| `supplier_call_duration_ms`                  | لكل supplier، op                                |
| `saga_step_duration_ms`                      | لكل step                                        |
| `saga_compensation_total`                    | لكل step                                        |
| `package_assembly_duration_ms`               | من البداية للنهاية                              |
| `mlfraud_score_latency_ms`                   | histogram للخدمة                                |
| `mlfraud_decision_total`                     | حسب القرار                                      |
| `dynpricing_eval_duration_ms`                | تقييم القاعدة                                    |
| `dynpricing_decision_total`                  | حسب القاعدة                                     |
| `chargeback_opened_total`                    | حسب PayTabs profile، السبب                       |
| `paytabs_profile_choice_total`               | حسب profile (region/currency)                    |
| `notification_delivery_total`                | حسب القناة + الحالة                              |
| `pg_pool_in_use`                             | لكل منطقة                                        |
| `redis_command_duration_ms`                  |                                                |
| `nats_messages_processed_total`              | حسب subject                                     |

### التنبيهات (Enterprise)

| الشرط                                                           | الخطورة  | التوجيه            |
| --------------------------------------------------------------- | -------- | ------------------ |
| API p95 > 400 ms لمدة 5 دقائق                                   | page     | PagerDuty          |
| توفر منطقة متدهور (composite check 3× في 60s)                  | page     | PagerDuty + COO    |
| معدل تعويض الـ saga > 1.5% لمدة 15 دقيقة                       | page     | PagerDuty          |
| انحراف نتائج ML-FRAUD (PSI > 0.2)                              | warn     | ML on-call         |
| latency خدمة ML-FRAUD p95 > 80 ms                              | page     | ML on-call         |
| إخفاق simulator قواعد DYN-PRICE (delta بعد deploy > 10%)       | page     | product on-call    |
| معدل chargeback > 0.5% خلال 7 أيام                             | page     | finance on-call    |
| فشل تسليم WA > 10% خلال 15 دقيقة                                | warn     | #ops               |
| فشل تسليم Web Push > 5% خلال 15 دقيقة                           | warn     | #ops               |
| Postgres replication lag > 10 s                                 | warn     | DBA                |
| معدل أخطاء KMS > 0% خلال 5 دقائق                                | page     | sec on-call        |
| 5xx > 0.3% لمدة 5 دقائق                                         | page     | PagerDuty          |

---

## استراتيجية الاختبار

| الطبقة           | الأدوات                                | الهدف                               |
| ---------------- | -------------------------------------- | ----------------------------------- |
| Unit (BE)        | Jest                                   | ≥ 90% lines، ≥ 80% branches         |
| Unit (FE)        | Jest + RTL                             | ≥ 85% lines                         |
| Integration      | testcontainers + WireMock              | كل الخدمات                          |
| Contract         | Pact لكل supplier + PayTabs            | 100% adapters                       |
| Property-based   | fast-check (pricing rules)             | الثوابت الحرجة                       |
| ML model         | offline holdout + A/B في shadow         | AUC > 0.85؛ FPR < 1%                |
| E2E web          | Playwright؛ multi-locale RTL            | المسارات الحرجة                      |
| Performance      | k6 + Argo Workflows                    | NFR-009/010 مستدام                   |
| Chaos            | Toxiproxy + ChaosMesh                  | يصمد ضد تعطل supplier واحد + منطقة واحدة |
| Accessibility    | axe + تدقيق يدوي ربع سنوي               | صفر مشكلات خطيرة                    |
| Security         | OWASP ZAP، Burp (يدوي ربع سنوي)        | صفر highs غير معالجة                |
| Pen-test         | خارجي ربع سنوي                          | كل الـ highs مُعالجة < 30 يوم        |

---

## اختبارات القبول

> ATs الـ Pro والـ Basic تبقى. الـ Enterprise يضيف AT-047..085.

| ID      | العنوان                                          | Given                                                       | When                                          | Then                                                                                  |
| ------- | ------------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| AT-047  | عزل البيانات على مستوى branch                   | فرعان A و B مع مستخدم واحد لكل منهما                         | مستخدم فرع A يستدعي list bookings              | لا تظهر حجوزات فرع B.                                                                 |
| AT-048  | حماية RLS row policy                            | background job يعمل بدون ضبط `app.branch_id`                | استعلام عن bookings                            | Postgres يرجع صفر صفوف؛ الاستعلام مسجل.                                              |
| AT-049  | SAML SSO للحسابات الـ corporate                  | حساب corporate معد Okta SAML                                | مستخدم corporate يذهب إلى /auth/saml/{corp}/sso| redirect إلى Okta؛ في الـ ACS، المستخدم مسجل دخول مع role و corporate_account claims. |
| AT-050  | SCIM provisioning للحسابات corporate            | Okta ترسل SCIM create-user                                   | الـ API يستلم الطلب                            | المستخدم منشأ، الدور mapped، الحساب corporate مربوط.                                  |
| AT-051  | تسجيل WebAuthn passkey                          | مستخدم مصادق عليه مع platform authenticator                 | تسجيل passkey                                  | الـ credential مخزن؛ تسجيل الدخول التالي ينجح بدون password.                          |
| AT-053  | ML-FRAUD allow                                  | نتيجة 12                                                     | محاولة حجز                                     | flow بدون احتكاك؛ تحدي 3DS فقط حسب قاعدة RTS.                                         |
| AT-054  | ML-FRAUD challenge                              | نتيجة 55                                                     | محاولة حجز                                     | step-up MFA مطلوب؛ PayTabs Auth منشأة مع 3DS مفروض.                                   |
| AT-055  | ML-FRAUD block                                  | نتيجة 88                                                     | محاولة حجز                                     | الحجز مرفوض؛ صف ops review queue منشأ؛ المستخدم مُبلّغ بالاتصال بالدعم.              |
| AT-056  | DYN-PRICE markup                                | قاعدة: +5% على رحلات EU outbound                            | بحث رحلة EU outbound                          | الإجمالي المعروض = supplier_price * 1.05؛ الـ markup مسجل.                            |
| AT-057  | فرض floor DYN-PRICE                             | القاعدة تريد -10% لكن floor المورد -5%                       | بحث                                            | الخصم مقيد إلى -5%؛ صف audit يذكر الـ cap.                                            |
| AT-058  | promo code استخدام واحد                          | الكود يطبق على الحجز الأول فقط                              | المستخدم يسترده مرتين                          | الاسترداد الثاني مرفوض `PROMO_ALREADY_USED`.                                          |
| AT-059  | تأكيد atomic للـ package                        | package flight + transfer + activity                          | فشل activity بعد حجز flight + transfer        | flight + transfer يُلغيان؛ الدفع يُلغى؛ حالة FAILED مع تفسير.                          |
| AT-060  | PDF موحد للـ package                            | package مؤكد                                                 | توليد المستند                                  | PDF واحد بكل المكونات (e-ticket + قسائم الـ ancillaries)، تقويم ICS مرفق.            |
| AT-061  | read-after-write متعدد المناطق                  | حجز مؤكد في eu-central-1                                     | طلب المستخدم التالي يصل me-central-1           | الحجز ظاهر خلال 5 ثوان (مع stickiness header اختياري).                                |
| AT-062  | failover للمنطقة                                | eu-central-1 موسوم unhealthy                                 | حل DNS                                         | الحركة تتحول إلى me-central-1؛ sagas المعلقة تُستأنف عبر NATS mirror.                |
| AT-063  | حارس تباين write active-active                  | نفس booking ref مُسوّد في كلتا المنطقتين                    | replication                                    | conflict مكتشف؛ المنطقة الأقل أولوية تُلغى؛ المستخدم يُعاد المحاولة.                  |
| AT-064  | حجز corporate credit                            | حساب corporate بحد ائتمان متاح                              | corp_admin يحجز                                | الـ credit مخصوم؛ فاتورة في queue للدورة الشهرية؛ تقرير الحساب محدّث.                |
| AT-065  | تجاوز حد ائتمان corporate                       | الـ credit مستخدم 95%                                        | corp_admin يحجز > 5%                          | يتم block بـ `CREDIT_INSUFFICIENT`؛ يُعرض split-pay flow.                            |
| AT-066  | فاتورة شهرية corporate                          | حساب corporate له 18 حجز خلال الشهر                          | تشغيل end-of-month job                         | فاتورة PDF + كشف حساب CSV يتولدان؛ إرسال بالبريد لـ billing_email؛ credit يُعاد ضبطه. |
| AT-067  | حجز جماعي 25 راكب                               | corp_admin يستورد 25 راكب XLSX                              | إرسال الحجز                                    | validation ينجح؛ PNRs تنشأ في chunks حسب قواعد IATA للمجموعات.                       |
| AT-068  | فتح corporate fare                              | الناقل يطلب airline ID للسعر corp                            | تقديم airline ID                              | السعر corp يرجع في price-check؛ مخزن على الحجز.                                       |
| AT-069  | إنشاء custom dashboard                          | admin user                                                   | ينشئ dashboard ويضيف 4 widgets                | الـ dashboard محفوظ بـ versioning؛ الـ widgets تعرض بيانات live؛ التخطيط متذكر.        |
| AT-070  | مشاركة custom dashboard مع role                  | dashboard ملكية admin                                        | يشاركه read-only مع role=finance              | كل finance users يرون الـ dashboard؛ لا يمكنهم تعديله؛ يمكنهم clone-and-edit.        |
| AT-071  | alert على widget threshold                      | widget مع threshold "GMV<80% المتوسط"                        | GMV ينخفض تحت الحد                            | إشعار يُرسل لـ recipients؛ حدث `dashboard_alert_triggered` يُسجل.                    |
| AT-072  | توجيه PayTabs profile لكل branch                | branch يربط PayTabs UAE profile لـ AED                       | حجز بـ AED                                     | profile = PayTabs UAE؛ Auth transaction منشأة في PayTabs UAE.                         |
| AT-073  | تصدير custom dashboard PDF                      | dashboard مع 6 widgets                                       | جدولة export يومي                              | PDF يُولّد ويُرسل بالبريد للـ recipients يومياً؛ يحتوي snapshot الـ data.            |
| AT-077  | تسليم Web Push                                  | حجز مؤكد                                                     | إشعار مُرسل                                    | المتصفح يسلم الـ web push ≤ 60 ثانية؛ receipt callback يحدث `push_messages`.         |
| AT-078  | re-protect عند schedule change                  | الناقل يرسل حدث تأخر 4 ساعات                                 | العميل يقبل re-protect                        | PNR جديد؛ التذكرة تُعاد إصدارها؛ إشعار؛ PNR قديم يُلغى.                              |
| AT-079  | حزمة أدلة chargeback                            | PayTabs يفتح dispute                                         | تشغيل auto-assembly job                       | حزمة أدلة منشأة (BCD، IP، نتيجة 3DS، ACK المورد، comms العميل) + مُرسلة.            |
| AT-080  | تصدير DSR                                        | العميل يطلب تصدير بيانات                                     | خلال 30 يوم                                   | ZIP يُسلم عبر signed URL؛ تذكرة DSR COMPLETED؛ audit مسجل.                            |
| AT-081  | حذف DSR مع legal hold                           | الحجز تحت legal hold                                         | العميل يطلب الحذف                              | الحذف مؤجل؛ legal hold مُبلَّغ؛ العميل مُبلَّغ.                                       |
| AT-082  | data residency                                   | حجز فرع KSA                                                   | persist                                       | الصف مخزن في me-central-1 primary؛ غير موجود في eu-central-1.                         |
| AT-083  | عزل dashboard لكل branch                        | فرع A لديه dashboard مخصص                                     | مستخدم فرع B يحاول الوصول                     | 403 Forbidden؛ لا يظهر الـ dashboard في قائمة فرع B.                                  |
| AT-084  | rollout للـ feature-flag                         | flag مفعل على cohort 10%                                     | المستخدمون يصلون endpoint مفعل                | ~10% يرون السلوك الجديد؛ الـ cohort متتبع deterministically عبر hash للـ userId.    |
| AT-085  | kill-switch                                      | الأدمن يعطل flag الدفع                                       | endpoint الدفع مستدعى                          | 503 `MAINTENANCE`؛ banner على الـ FE؛ audit مسجل.                                     |

---

## ملحق أ — الانتقال من Pro Tier

| الموضوع                  | خطوة الانتقال                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------- |
| Branch tenancy           | تعبئة `branch_id` = `'default'` للصفوف القديمة؛ تفعيل RLS بعد التحقق من التعبئة.        |
| Multi-region             | منطقة ثانية في shadow read-only؛ ترقيتها عندما يكون RPO < 1 دقيقة مستدام لـ 7 أيام.      |
| Fraud ML                 | وضع shadow لـ 30 يوم؛ تفعيل الإنفاذ لكل cohort تدريجياً.                                  |
| Dynamic pricing          | مجموعة قواعد فارغة عند الإطلاق؛ simulator القواعد يحرس التفعيل.                          |
| Corporate accounts       | onboarding تدريجي للحسابات الـ corporate؛ feature flag لكل branch.                       |
| Custom Dashboards        | إطلاق محرر الـ widgets خلف feature flag لـ admins فقط في البداية، ثم توسيع.              |
| Chargebacks              | تعبئة chargebacks عبر PayTabs historical API (نافذة 90 يوم).                            |

## ملحق ب — سجل المخاطر (أهم البنود)

| ID   | المخاطرة                                                         | الاحتمالية | الأثر  | التخفيف                                                  |
| ---- | --------------------------------------------------------------- | ---------- | ------ | --------------------------------------------------------- |
| R-01 | drift نموذج ML-FRAUD يؤثر على معدلات التصريح                    | متوسطة     | عالي   | مراقبة PSI، retrain شهري، rollback flag.                  |
| R-02 | split-brain عبر المناطق على saga الحجز                          | منخفضة     | عالي   | stickiness للمنطقة المصدر؛ idempotency keys لكل branch.   |
| R-03 | misconfiguration لـ DKIM للموقع يؤدي لـ spam folder            | متوسطة     | متوسط  | تحقق DNS + warmup playbook.                                |
| R-04 | misconfiguration لـ SAML IdP → قفل حساب corporate              | متوسطة     | عالي   | مسار admin break-glass؛ audit لكل حساب.                   |
| R-05 | تبني NDC من الناقلين أبطأ من المتوقع                            | متوسطة     | متوسط  | adapters قابلة للتركيب؛ GDS fallback.                     |
| R-07 | تعطل PayTabs في منطقة واحدة                                     | منخفضة     | عالي   | PayTabs multi-region profiles + circuit breaker + queue retry. |
| R-08 | تغيير تنظيمي إقليمي (مثل تعديل PDPL السعودي)                    | متوسطة     | متوسط  | مراجعة DPO ربع سنوية؛ legal hold + تبديل data-residency. |
| R-09 | فيضان chargeback من حلقة احتيال                                 | منخفضة     | عالي   | ML-FRAUD + 3DS + ops triage؛ circuit breaker.              |
| R-10 | تذبذب أسعار الـ ancillaries عبر الموردين يؤثر على هامش الحزم      | متوسطة     | متوسط  | override DYN-PRICE + تصعيد تجاري.                          |

— *نهاية الوثيقة — Jawla SRS Enterprise v1.0* —
