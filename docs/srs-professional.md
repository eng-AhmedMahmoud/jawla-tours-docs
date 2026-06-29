## 🎯 ملخص فني لمجلس الإدارة (بلغة الأعمال)

هذه الوثيقة هي المخطط الهندسي الكامل للنظام في الباقة الاحترافية، وهي إصدار موسّع من الباقة الأساسية يضيف قدرات تجارية متقدمة (محفظة، نقاط ولاء، WhatsApp، خدمة ذاتية للعميل، تعدد العملات). الملخص التالي يلخّص ما يبنيه الفريق ولماذا تستحق الباقة استثمارها بلغة الأعمال.

### ماذا يبنيه فريق الهندسة؟ (إضافات على الباقة الأساسية)

- بوابة خدمة ذاتية للعميل: إلغاء حجوزات الطيران وطلب استرداد المبلغ دون الحاجة للاتصال بخدمة العملاء
- محفظة إلكترونية متعددة العملات (جنيه مصري، دولار، يورو، ريال، درهم) داخل حساب العميل
- نظام نقاط ولاء يكافئ العميل عن كل حجز ويحوّل النقاط إلى خصومات على الحجوزات اللاحقة
- تكامل WhatsApp Business لإرسال تأكيدات الحجز وتذاكر الطيران والتنبيهات بشكل فوري
- لوحة تحكم إدارية متقدمة تتضمن تقارير المبيعات والعمولات وتحليل سلوك العملاء
- بوابة الدفع PayTabs متعددة العملات (EGP/USD/EUR/SAR/AED) لتغطية البطاقات المحلية والدولية بمعالجة موحّدة
- نظام استرداد آلي للدفع يقلل وقت المعالجة من أيام إلى دقائق
- نظام تنبيهات أسعار يخبر العميل بانخفاض سعر رحلة كان يبحث عنها
- المنصة في هذه الباقة تركز حصرياً على بيع تذاكر الطيران (Flights only) — لا توجد منتجات فنادق

### كيف نضمن أن النظام آمن وموثوق؟

| الضمان                                  | الطريقة بلغة الأعمال                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------ |
| الموقع متاح دائماً                       | استضافة على **Google Cloud Platform (GCP)** بضمان وقت تشغيل 99.5% (أي توقف لا يتجاوز 3.5 ساعات شهرياً) — حساب GCP **مقدَّم من العميل** |
| كشف عمليات الدفع المشبوهة                | محرك ذكي يحلل كل عملية دفع ويمنع التحويلات المشبوهة قبل تنفيذها                             |
| سلامة عمليات الاسترداد الآلية            | حد أقصى لكل عملية استرداد آلية، وما يتجاوز الحد يحتاج موافقة مسؤول                         |
| الامتثال لمعايير الدفع العالمية (PCI)    | جميع البيانات الحساسة تمر عبر مزودين معتمدين دون أن تمر بخوادمنا                            |
| نسخ احتياطية متعددة المناطق             | نسخ على مدار اليوم في موقعين جغرافيين مختلفين لضمان عدم فقد البيانات                       |
| تشفير شامل لبيانات العملاء              | تشفير قوي (AES-256) على البيانات الحساسة عند التخزين وعند النقل                            |
| سجل تدقيق كامل لجميع العمليات           | كل إجراء على النظام مسجّل ويمكن مراجعته لأي تحقيق مالي أو أمني                              |
| مراقبة استباقية للأداء                   | اكتشاف بطء الأداء قبل أن يلاحظه العملاء، مع إنذارات فورية للفريق                            |

### الأرقام المهمة لاتخاذ القرار

| المتغير                                      | القيمة                                            |
| -------------------------------------------- | ------------------------------------------------- |
| عدد المستخدمين المتوقع (السنة الأولى)         | 40,000 – 70,000 مستخدم نشط                       |
| متوسط زمن استجابة الصفحة                      | أقل من 1.5 ثانية                                 |
| نسبة وقت تشغيل النظام (Uptime SLA)            | 99.5%                                              |
| عدد المعاملات اليومية المتوقعة                 | 200 – 500 معاملة                                  |
| عدد العملات المدعومة                          | 5 عملات (EGP, USD, EUR, SAR, AED)                |
| التكاليف الشهرية للبنية التحتية              | حوالي 800 – 1,200 USD شهرياً                     |
| عدد المهندسين العاملين على المشروع           | 5 (Backend + Frontend + Mobile-web + DevOps + QA) |

### اعتمادنا على الموردين الخارجيين

| المورد                          | لماذا نحتاجه بلغة الأعمال                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| Amadeus                         | المصدر العالمي لبيانات الرحلات الجوية والأسعار اللحظية والحجز الفعلي لتذاكر الطيران  |
| PayTabs                         | بوابة الدفع متعددة العملات (EGP/USD/EUR/SAR/AED) لقبول البطاقات المحلية والدولية والمحافظ الإلكترونية بمعالجة موحّدة |
| WhatsApp Business API           | قناة التواصل الأساسية في مصر لإرسال التأكيدات والتذاكر مباشرة على هاتف العميل      |
| Mailgun / SendGrid              | إرسال البريد الإلكتروني الموثوق للفواتير والتأكيدات                                  |
| **Google Cloud Platform (GCP) — مقدَّم من العميل** | البنية التحتية المرنة (Cloud Run + Cloud SQL + Memorystore) التي تتكيف مع حجم الحركة لحظياً، وحساب GCP مملوك للعميل تماماً |
| **Google Cloud Storage (GCS) + Cloud CDN** | تخزين وعرض e-tickets والفواتير وأصول واجهة المستخدم بسرعة عالية للعملاء في أي مكان |

### ما الذي يحتاج المجلس أن يعرفه؟

- مقارنة مع الباقة الأساسية: زيادة في القدرات الإدارية والتجارية بنسبة 60% مقابل زيادة في السعر 42%
- البنية جاهزة للنمو حتى 500,000 مستخدم في السنة الثانية دون إعادة بناء
- دعم العملات الأجنبية يفتح السوق الخليجي والمصريين بالخارج كقطاع جديد
- الخدمة الذاتية تقلل تكاليف خدمة العملاء بنسبة 40% خلال 6 أشهر من الإطلاق
- نقاط الولاء ترفع معدل تكرار الشراء (Repeat Rate) من 12% إلى 28% خلال السنة الأولى

---

# مواصفات متطلبات البرنامج — Jawla Tours OTA (المستوى Professional)

## ضبط الوثيقة

| الحقل             | القيمة                                                          |
| ----------------- | -------------------------------------------------------------- |
| عنوان الوثيقة     | Jawla Tours OTA — SRS (المستوى Professional)                   |
| معرّف الوثيقة     | JAWLA-SRS-PRO                                                  |
| الإصدار           | 1.0                                                            |
| تاريخ الإصدار     | 2026-06-29                                                     |
| الحالة            | معتمد — Baseline                                                |
| التصنيف           | داخلي — Engineering / Product / Finance                        |
| المالك            | Jawla Platform Engineering                                     |
| أعدّها            | Platform Architecture Group                                    |
| راجعها            | CTO, Head of Product, Head of Finance, QA Lead, Security Lead  |
| اعتمدها           | CTO                                                            |
| التوزيع           | Engineering, Product, QA, DevOps, Security, Finance, Support   |

### سجل التعديلات

| الإصدار | التاريخ    | الكاتب              | القسم/الأقسام               | ملخص التغيير                                                          |
| ------- | ---------- | ------------------- | --------------------------- | -------------------------------------------------------------------- |
| 0.1     | 2026-04-22 | Platform Arch Group | الكل                        | مسودة مبنية فوق المستوى Basic (delta-spec)                            |
| 0.2     | 2026-05-09 | Finance             | Payment, NFR (FX, compliance) | دعم عدة عملات، refunds آلية، وتخفيف مخاطر FX                        |
| 0.3     | 2026-05-25 | Platform Arch Group | Architecture, Payment       | إضافة تكامل PayTabs متعدد العملات (EGP/USD/EUR/SAR/AED) ودعم profiles لكل market |
| 0.4     | 2026-06-08 | Product             | Admin, FR                   | لوحة admin متقدمة + صفحات الحساب الذاتي للعميل (account self-service)  |
| 0.5     | 2026-06-17 | Security            | Security, AuthN             | تخزين توكنات WhatsApp Business، تحسين أمان OTP                        |
| 0.6     | 2026-06-24 | QA Lead             | Acceptance                  | إضافة AT-025..AT-046                                                  |
| 1.0     | 2026-06-29 | CTO                 | الكل                        | اعتماد الـ Baseline                                                   |

### المسرد (إضافات Pro)

| المصطلح      | المعنى                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| GMV          | Gross Merchandise Value (مجموع قيم الحجوزات المؤكدة)                       |
| Take Rate    | صافي العمولة مقسومًا على الـ GMV                                            |
| BSP-CASS     | نظام تسوية IATA للطيران والنقل متعدد الوسائط                                |
| WABA         | WhatsApp Business Account                                                 |
| Idempotency  | خاصية إعادة المحاولة بنفس الـ key بأمان دون آثار جانبية                      |
| MAR          | Multi-currency Authorization Routing                                      |

---

## مقدّمة

### الغرض

هذه الوثيقة تحدّد متطلبات البرنامج للمستوى **Professional** من *Jawla Tours*.
وهي تحلّ محل الـ baseline الخاص بالمستوى Basic، بإضافة تجارة متعددة العملات،
وتكامل PayTabs متعدد العملات، وrefunds آلية، وإشعارات WhatsApp، وصفحات حساب ذاتي للعميل،
ولوحة admin متقدمة. وهي العقد بين Engineering و Product و Finance و Security
والـ external auditors للإصدار الكبير الثاني (المستهدف GA في Q4 2026). المنصة في هذا المستوى flights only — منتجات الفنادق غير مشمولة.

### النطاق

داخل النطاق:

- كل وظائف المستوى Basic (مفترضة ولن يُعاد ذكرها إلا حين تتغير جوهريًا) — Flights فقط.
- **التجارة متعددة العملات**: التسعير والشحن والتسوية والـ refund من البداية للنهاية
  بـ EGP و USD و EUR و GBP و SAR و AED و KWD؛ مع سياسة شفافة لهامش الـ FX.
- **بوابة دفع PayTabs**: متعددة العملات (EGP/USD/EUR/SAR/AED)، تدعم البطاقات
  المحلية والدولية والمحافظ الإلكترونية ووسائل الدفع البديلة في منطقة MENA.
- **حساب ذاتي للعميل** (account self-service، ليس custom dashboard): الرحلات، الملف الشخصي،
  خزينة وثائق السفر، المسافرون المفضلون، وسائل الدفع المحفوظة (مُدارة عبر PayTabs)، الإيصالات،
  خدمة refund ذاتية. لوحات التحكم القابلة للتخصيص (custom dashboards) متاحة فقط في Enterprise.
- **إشعارات WhatsApp Business** عبر Meta Cloud API (مع templates معتمدة).
- **تنسيق refund آلي** مع compensation متعدد المراحل (supplier + PSP).
- **Admin متقدم** يحوي تقارير، عمليات bulk، صحة الـ supplier، طابور dunning.
- **حوالي 33 endpoint من نوع REST**.

خارج النطاق (مؤجل لمستوى Enterprise):

- تطبيقات mobile أصلية، portal للوكلاء B2B، white-label، fraud ML، تسعير ديناميكي،
  stack طوابير لحزم الـ deals، multi-region active-active.
- منتجات الفنادق، السيارات، النشاطات، أو غيرها من منتجات السفر (المنصة flights only).

### اصطلاحات الوثيقة

- نفس اصطلاحات RFC 2119 و Gherkin المستخدمة في المستوى Basic.
- حين يكون المتطلب **منقولًا حرفيًا** من Basic، نشير لمعرّفه القديم (مثلًا "extends FR-027").

### المراجع

| Ref ID | المرجع                                                                          |
| ------ | ------------------------------------------------------------------------------- |
| R-01   | JAWLA-SRS-BASIC v1.0                                                            |
| R-02   | Amadeus Flight Create Orders v2, Flight Offers Pricing                          |
| R-03   | PayTabs PayPage API v3 + IPN (multi-currency settlement EGP/USD/EUR/SAR/AED)    |
| R-04   | PayTabs Transactions API (Auth/Capture/Refund/Void)                             |
| R-05   | WhatsApp Business Cloud API — Messaging + Templates                             |
| R-06   | PCI DSS v4.0 — SAQ A-EP                                                         |
| R-07   | EU GDPR، قانون حماية البيانات المصري 151/2020، Saudi PDPL                       |
| R-08   | OWASP Top 10:2021 + ASVS 4.0.3 L2                                               |
| R-09   | WCAG 2.1 AA, EN 301 549                                                         |

---

## المتطلبات الوظيفية

> إضافة للمستوى السابق: المتطلبات **جديدة** ما لم يُذكر *extends*.

### الـ Module: Authentication (FR-001 — FR-022)

| ID     | المتطلب                                                                                                            | الأولوية |
| ------ | ----------------------------------------------------------------------------------------------------------------- | -------- |
| FR-001 | *Extends Basic FR-001..018.* كل متطلبات الـ auth منقولة كما هي ما لم يُذكر تعديل أدناه.                              | MUST     |
| FR-019 | يجب أن يدعم النظام TOTP MFA (RFC 6238، نافذة 30 ثانية، SHA-1/6 أرقام) كاختيار اختياري لكل user.                      | MUST     |
| FR-020 | يجب أن يطلب النظام تحدي MFA قبل الـ refund الذاتي وإدارة الـ saved cards.                                            | MUST     |
| FR-021 | يجب أن يسمح النظام بـ Google SSO و Apple SSO مع mapping للـ email-claim؛ ويُطلب استكمال الملف عند أول تسجيل دخول.    | MUST     |
| FR-022 | يجب أن يدعم النظام عرض الـ sessions الحالية مع إمكانية remote-revoke (قائمة الأجهزة).                                | MUST     |

### الـ Module: Flights (FR-023 — FR-038)

| ID     | المتطلب                                                                                                                  | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| FR-023 | *Extends Basic FR-019..032.* كل متطلبات الطيران الأساسية تظل سارية.                                                        | MUST     |
| FR-024 | يجب أن يعرض النظام fare bundles (مثل LITE/STANDARD/FLEX) عندما تكشف شركة الطيران عن branded fares.                          | MUST     |
| FR-025 | يجب أن يسمح النظام بإضافة ancillary add-ons عند الـ checkout: حقيبة إضافية، اختيار مقعد إن دعم الـ supplier ذلك.            | MUST     |
| FR-026 | يجب أن يدعم النظام itineraries بنمط multi-city حتى 6 slices.                                                                | MUST     |
| FR-027 | يجب أن يدعم النظام إدخال frequent-flyer number لكل pax لكل carrier (FOID)، مع تحقّق وفق قائمة IATA carrier code.            | MUST     |
| FR-028 | يجب أن يسمح النظام للعميل بإضافة حقيبة بعد الحجز إن سمح الـ supplier، مع تطبيق رسم الفرق.                                    | SHOULD   |
| FR-029 | يجب أن يعرض النظام السعر بالعملة التي اختارها العميل مع إفصاح صريح عن سعر الـ FX والـ margin.                                | MUST     |
| FR-030 | يجب أن يُصدر النظام e-ticket PDF بلغة الحجز يحوي كل الـ legs وملخص fare rules وجدول الأمتعة للـ carrier.                     | MUST     |
| FR-031 | يجب أن يسمح النظام بطلب تغيير ذاتي للرحلة (إن سمحت شركة الطيران)؛ مع حساب الفرق فوريًا.                                       | SHOULD   |
| FR-032 | يجب أن يحتفظ النظام بدفتر "المسافرين المحفوظين" لكل user، مع تعبئة بيانات الـ pax تلقائيًا بعد الموافقة.                       | MUST     |

### الـ Module: Booking (FR-039 — FR-052)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-039 | *Extends Basic FR-033..043.*                                                                                  | MUST     |
| FR-040 | يجب أن يدعم النظام **cart** بعدة عناصر طيران (مثل round-trip أو multi-leg) يتم checkout لها معًا.              | MUST     |
| FR-041 | يجب أن يحسب النظام المجموع الكلي بعملة العرض مع snapshot ثابت للـ FX.                                            | MUST     |
| FR-042 | يجب أن يقسّم النظام الـ charge بين العناصر بحيث تكون عمليات الـ refund granular؛ payment intent واحد لكل cart.    | MUST     |
| FR-043 | يجب أن يدعم النظام احتجاز الـ cart لمدة 20 دقيقة؛ مع إعادة تسعير عروض الـ supplier إذا تجاوز الاحتجاز 5 دقائق.    | MUST     |
| FR-044 | يجب أن يسمح النظام للـ user بإلغاء عنصر حجز معين (إلغاء جزئي) حيث يكون مسموحًا.                                     | MUST     |
| FR-045 | يجب أن يشغّل النظام **saga** لعملية الـ fulfillment مع compensation صريح لكل خطوة.                              | MUST     |
| FR-046 | يجب أن يحفظ النظام حالة الـ saga في جدول `booking_sagas` مع عدّاد retries.                                       | MUST     |
| FR-047 | يجب أن يُصدر النظام domain events عند كل state transition لاستهلاكها لاحقًا في الـ BI.                            | MUST     |
| FR-048 | يجب أن يتعامل النظام مع التغييرات الإرادية (تغيير تاريخ) عبر cancel + rebook مع رسم/refund الفرق.                | SHOULD   |
| FR-049 | يجب أن يلتقط النظام موافقات المسافر (T&C version hash + timestamp) ويخزنها وقت الحجز.                            | MUST     |
| FR-050 | يجب أن يضع النظام tags تنظيمية على الحجوزات (`TAX_VAT`، `TAX_TOURISM`) لاستخدامها في إنتاج الفواتير.              | MUST     |
| FR-051 | يجب أن يولّد النظام فاتورة PDF متوافقة ضريبيًا لكل market عند الطلب.                                              | MUST     |
| FR-052 | يجب أن يسمح النظام بـ "view e-ticket" و "view invoice" من صفحة الحجز للعميل.                                     | MUST     |

### الـ Module: Payment (FR-053 — FR-068)

| ID     | المتطلب                                                                                                              | الأولوية |
| ------ | -------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-053 | يجب أن يوجّه النظام المدفوعات عبر PayTabs بناءً على العملة، دولة الـ BIN، المبلغ، ودرجة المخاطرة.                       | MUST     |
| FR-054 | يجب أن يدعم النظام PayTabs بكامل تشكيلة وسائل الدفع: بطاقات Visa/Mastercard/mada، Apple Pay، Google Pay، STC Pay، Valu. | MUST     |
| FR-055 | يجب أن يقوم النظام بـ tokenize البطاقات عبر PayTabs token vault؛ مع بقاء النطاق PCI في حدود SAQ A-EP.                   | MUST     |
| FR-056 | يجب أن يدعم النظام saved payment methods لكل user (PayTabs tokens) مع اختيار افتراضي.                                   | MUST     |
| FR-057 | يجب أن يقوم النظام بـ automate الـ refunds: تشغيل من ops أو قاعدة نظام → PayTabs Refund API؛ مع دعم الـ partial refunds. | MUST     |
| FR-058 | يجب أن يعالج النظام IPN events الـ refund بشكل idempotent، ويحدّث `payments.refunded_amount_minor` وحالة الحجز.          | MUST     |
| FR-059 | يجب أن يحتفظ النظام بـ snapshot يومي للـ FX من feed خارجي (مثل openexchangerates) مع إضافة margin.                       | MUST     |
| FR-060 | يجب أن يحفظ النظام `sellCurrency` و `buyCurrency` و `fxRate` و `fxMarginPct` لكل حجز لأغراض الـ audit.                  | MUST     |
| FR-061 | يجب أن يقوم النظام بـ reconcile الـ PayTabs payouts مع الحجوزات ليلًا؛ مع رفع الـ mismatches الأكبر من 0.5% للـ finance. | MUST     |
| FR-062 | يجب أن يُصدر النظام الـ refunds بعملة الـ capture الأصلية (PayTabs multi-currency native) لتجنب خسارة العميل من الـ FX.   | MUST     |
| FR-063 | يجب أن يفرض النظام 3DS / SCA حسب المنطقة (PSD2 في EU، إلزامي في EG من CBE) عبر PayTabs.                                | MUST     |
| FR-064 | يجب أن يدعم النظام partial captures للـ carts متعددة العناصر عندما يؤكد الـ supplier جزئيًا.                            | SHOULD   |
| FR-065 | يجب أن يحتجز النظام payouts الـ supplier في ledger `supplier_payouts`؛ صافي بعد العمولة.                                | MUST     |
| FR-066 | يجب أن يُظهر النظام حالة dunning للمدفوعات الفاشلة مع smart retry (1h، 6h، 24h).                                        | MUST     |
| FR-067 | يجب أن يدعم النظام Apple Pay / Google Pay عبر PayTabs hosted PayPage.                                                  | SHOULD   |
| FR-068 | يجب أن يُصدر النظام stream أحداث Finance (`finance.*`) يستهلكه worker الـ reconciliation.                              | MUST     |

### الـ Module: Notifications (FR-069 — FR-080)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-069 | يجب أن يدعم النظام قنوات email و WhatsApp Business و in-app مع تفضيل قناة لكل حدث.                              | MUST     |
| FR-070 | يجب أن يرسل النظام WhatsApp عبر Meta Cloud API باستخدام templates معتمدة مع استبدال parameters.                  | MUST     |
| FR-071 | يجب أن يطلب النظام opt-in صريح لـ WhatsApp؛ الافتراضي OFF.                                                     | MUST     |
| FR-072 | يجب أن يرجع النظام إلى email إذا فشل توصيل WhatsApp (لا يوجد callback بـ `delivered` خلال 5 دقائق).             | MUST     |
| FR-073 | يجب أن يترجم النظام كل الـ templates إلى AR/EN/FR؛ مع تقديم/اعتماد WhatsApp templates لكل لغة.                  | MUST     |
| FR-074 | يجب أن يضع النظام الإشعارات في طابور BullMQ؛ مع rate-limiting لكل قناة (WA Business: أقل من 50 msg/s/account).  | MUST     |
| FR-075 | يجب أن يلغي النظام تكرار الإشعارات عبر القنوات باستخدام `dedup_key`.                                            | MUST     |
| FR-076 | يجب أن يتتبع النظام حالة التسليم (`sent` و `delivered` و `read` و `failed`) ويُظهرها في الـ admin.              | MUST     |
| FR-077 | يجب أن يدعم النظام تذكيرات ما قبل الرحلة (24h و 2h) عبر القناة المفضلة للـ user.                                | MUST     |
| FR-078 | يجب أن يقيّد النظام إعادة الإرسال إلى مرة واحدة كل 10 دقائق لكل template لكل user.                              | MUST     |
| FR-079 | يجب أن يوقّع النظام إشعارات in-app بـ event ID لقناة الـ realtime في الـ FE.                                      | MUST     |
| FR-080 | يجب أن يحترم النظام قواعد Meta الخاصة بنافذة الـ 24 ساعة لخدمة العملاء لرسائل WA غير المعتمدة كـ template.        | MUST     |

### الـ Module: Admin (FR-081 — FR-093)

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-081 | يجب أن توفّر لوحة الـ admin workbench للحجوزات: bulk actions (resend، refund، tag، export).                    | MUST     |
| FR-082 | يجب أن تكشف لوحة الـ admin dashboards لصحة الـ supplier (latency، نسبة الخطأ لكل op، آخر ظهور).               | MUST     |
| FR-083 | يجب أن تكشف لوحة الـ admin لوحة المدفوعات: المدفوعات الفاشلة، طابور الـ refund، حالة الـ dunning، حجم PSP.    | MUST     |
| FR-084 | يجب أن تدعم لوحة الـ admin تصدير finance: GMV و take rate و refunds و FX P&L لكل يوم/market/عملة.            | MUST     |
| FR-085 | يجب أن تسمح لوحة الـ admin بـ CMS لصفحات التسويق (deals، banners) المستخدمة في موقع الـ Next.js.              | MUST     |
| FR-086 | يجب أن تسمح لوحة الـ admin بعرض customer-360 (حجوزات، مدفوعات، إشعارات، sessions).                            | MUST     |
| FR-087 | يجب أن تسمح لوحة الـ admin بتعديل templates الإشعارات مع preview و i18n.                                       | MUST     |
| FR-088 | يجب أن تسمح لوحة الـ admin بتبديل feature-flag لكل بيئة، مع تسجيل audit.                                       | MUST     |
| FR-089 | يجب أن تدعم لوحة الـ admin موافقة 4-eye للـ refunds الأكبر من ما يعادل $5,000.                                  | MUST     |
| FR-090 | يجب أن تدعم لوحة الـ admin impersonation بحد أقصى 30 دقيقة مع banner على FE العميل.                            | MUST     |
| FR-091 | يجب أن تسجّل لوحة الـ admin كل عملية في audit log غير قابل للتعديل مع diff.                                     | MUST     |
| FR-092 | يجب أن تسمح لوحة الـ admin بجدولة تقارير (digest يومي KPI إلى distribution list بريدية).                       | SHOULD   |
| FR-093 | يجب أن تُظهر لوحة الـ admin dashboards الـ SLA: مقاييس مرتبطة بـ NFR مع traffic light.                          | MUST     |

### الـ Module: Customer Self-Service Account (FR-094 — FR-105)

> ملحوظة: ده مش "custom/personalized dashboard" قابل للتخصيص بـ widgets — ده مجرد صفحات حساب
> العميل القياسية (account/profile pages). تخصيص لوحات التحكم (Custom Dashboards) متاح في
> الباقة Enterprise فقط.

| ID     | المتطلب                                                                                                       | الأولوية |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-094 | يجب أن تعرض صفحة "رحلاتي" الرحلات مجمّعة: upcoming و ongoing و past و cancelled.                                | MUST     |
| FR-095 | يجب أن تسمح صفحة الحجز بتنزيل e-ticket / invoice من كل بطاقة حجز.                                              | MUST     |
| FR-096 | يجب أن تسمح صفحة الـ profile بتحديث بيانات الاتصال، الـ locale، العملة، MFA، الـ sessions، وكلمة المرور.        | MUST     |
| FR-097 | يجب أن تدير صفحة المسافرين المحفوظين CRUD مع موافقة صريحة للحجوزات المشتركة.                                   | MUST     |
| FR-098 | يجب أن تعرض صفحة الوثائق خزينة وثائق السفر (جوازات، تأشيرات) مع تحذيرات انتهاء الصلاحية.                       | MUST     |
| FR-099 | يجب أن تدير صفحة البطاقات المحفوظة (PayTabs token فقط؛ لا PAN أبدًا) مع حذف وضبط افتراضية.                      | MUST     |
| FR-100 | يجب أن تسمح صفحة الحجز بإلغاء ذاتي مع preview للـ refund المتوقع.                                              | MUST     |
| FR-101 | يجب أن تعرض صفحة الـ refund timeline لتتبع الـ refund (requested → in_progress → settled).                    | MUST     |
| FR-102 | يجب أن توفر صفحة الخصوصية workflow لطلب تصدير بيانات GDPR مع الحالة.                                            | MUST     |
| FR-103 | يجب أن توفر صفحة الحساب workflow لحذف الحساب مع grace period لـ 30 يومًا وفحوص أمان للإلغاء.                    | MUST     |
| FR-104 | يجب أن تعرض صفحة الحساب placeholder للولاء (رصيد wallet، read-only في Pro).                                     | SHOULD   |
| FR-105 | يجب أن تعرض صفحة "رحلاتي" panel realtime لحالة الرحلة (تأخيرات، gate) للرحلات القادمة خلال 24 ساعة.            | SHOULD   |

---

## المتطلبات غير الوظيفية

### الأداء

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-001 | بحث الطيران: p95 ≤ 2.0 ثانية (cache-hot ≤ 600 ms).                                            |
| NFR-002 | الـ endpoints التي لا تستدعي supplier: p95 ≤ 200 ms.                                          |
| NFR-003 | TTFB لصفحات الحساب الذاتي للعميل: p95 ≤ 350 ms.                                              |
| NFR-004 | استقبال الـ webhook (PSP): p95 ≤ 150 ms ack.                                                  |
| NFR-005 | LCP ≤ 1.8 ثانية على 4G؛ CLS ≤ 0.05؛ INP ≤ 200 ms.                                            |

### القابلية للتوسّع

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-006 | تحمّل 200 RPS في funnel الحجز، مع ذروة 500 RPS لمدة 10 دقائق.                                  |
| NFR-007 | تحمّل 1000 RPS للـ catalog/search.                                                            |
| NFR-008 | يجب أن تتوسّع workers الـ BullMQ إلى 12 replicas دون تغيير في الكود؛ مع concurrency قابل للضبط. |
| NFR-009 | يجب أن يتحمّل Postgres حتى 600 client conns عبر PgBouncer؛ مع CPU الـ primary ≤ 60% تحت ضغط مستمر. |

### التوافر

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-010 | هدف uptime شهري 99.9% (downtime لا يزيد عن 43 دقيقة).                                        |
| NFR-011 | RPO ≤ 5 دقائق، RTO ≤ ساعة لـ DR كاملة في الـ primary region.                                   |
| NFR-012 | warm standby نشط في AZ ثانية؛ Postgres primary مع synchronous replica؛ كتابة بـ quorum.       |
| NFR-013 | نشر دون downtime عبر blue/green للـ API؛ وcanary للـ FE (5% → 25% → 100%).                    |
| NFR-014 | نوافذ الصيانة يُعلَن عنها قبل 7 أيام؛ بحد أقصى نافذتان لكل ربع سنوي، كل واحدة لا تتجاوز 30 دقيقة. |

### الأمان

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-015 | TLS 1.2+، HSTS 2 سنة preload؛ OCSP stapling مفعّل.                                            |
| NFR-016 | البيانات في الـ storage بـ AES-256؛ هرمية مفاتيح KMS-rooted مع تدوير شهري لـ DEK.              |
| NFR-017 | كل الـ secrets في **GCP Secret Manager** (أو HashiCorp Vault داخل GCP)؛ ولا توضع أبدًا في env files في git.   |
| NFR-018 | pentest أمني مرتين سنويًا؛ معالجة العالية خلال 30 يومًا، والحرجة خلال 7 أيام.                   |
| NFR-019 | جاهزية SOC 2 Type I أثناء المستوى Pro؛ مع mapping للضوابط.                                    |

### الامتثال

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-020 | شهادة PCI DSS v4.0 SAQ A-EP يتم تجديدها سنويًا.                                              |
| NFR-021 | GDPR + قانون حماية البيانات المصري: توثيق DPIA لكل نشاط معالجة جديد.                          |
| NFR-022 | الفوترة الضريبية: VAT لـ EG/SA حين ينطبق؛ مع رقم فاتورة تسلسلي لكل market.                    |
| NFR-023 | حق النسيان يُنفّذ خلال 30 يومًا؛ مع أسبقية الـ legal hold.                                     |

### التدويل

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-024 | كل واجهات الـ UI تدعم AR (RTL) و EN و FR؛ مع معالجة bidi واعية لـ RTL.                       |
| NFR-025 | تنسيق التاريخ/الوقت/الأرقام عبر ICU؛ مع timezone قابل للاختيار من الـ user؛ والتخزين بـ UTC.   |
| NFR-026 | العملة: أكواد ISO 4217 في كل مكان؛ مع banker's rounding وفق exponent العملة.                  |

### إمكانية الوصول

| ID      | المتطلب                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| NFR-027 | WCAG 2.1 AA — يُتحقّق منها عبر axe-core في الـ CI + audit يدوي ربع سنوي من استشاري accessibility. |
| NFR-028 | mobile-first؛ مع touch targets ≥ 44×44 CSS px.                                                |

---

## معمارية النظام

```
                                            ┌───────────────────────────────────────┐
                                            │            External APIs              │
                                            │ ┌─────────┐                           │
                                            │ │ Amadeus │  (Flights only)           │
                                            │ └─────────┘                           │
                                            │ ┌─────────────────────────────────┐  │
                                            │ │ PayTabs (multi-currency)        │  │
                                            │ └─────────────────────────────────┘  │
                                            │ ┌─────────────┐ ┌───────────────────┐ │
                                            │ │ WA Cloud API│ │ SendGrid / Resend │ │
                                            │ └─────────────┘ └───────────────────┘ │
                                            └────────────────▲──────────────────────┘
                                                             │
                                                             │
┌──────────┐     ┌────────────┐     ┌──────────────┐     ┌───┴────────────────────────┐
│  Client  │────▶│ Cloud Armor│────▶│   Cloud CDN  │────▶│ Next.js 15 (App Router)    │
│ Web/Web  │     │ (WAF/DDoS) │     │     (GCP)    │     │   on Cloud Run (GCP)      │
└──────────┘     └────────────┘     └──────────────┘     │ - Marketing               │
                                                          │ - Customer Account Pages  │
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
                       ┌───────────────────────────────────────────────┼────────────────────┐
                       ▼                                               ▼                    ▼
               ┌───────────────┐                              ┌───────────────┐    ┌───────────────┐
               │ Flight Svc    │                              │ Booking Svc   │    │ Payment Svc   │
               │ - Amadeus     │                              │ - Saga engine │    │ - PayTabs     │
               │ - cache layer │                              │ - Idempotency │    │ - FX engine   │
               └───────┬───────┘                              └───────┬───────┘    └───────┬───────┘
                       │                                              │                    │
                       └──────────────────────┬───────────────────────┴────────────────────┘
                                              ▼
                                      ┌──────────────────┐    ┌──────────────────────────┐
                                      │ PgBouncer        │───▶│ Cloud SQL (Postgres 16)  │
                                      └──────────────────┘    │ HA + sync standby +      │
                                                              │ 1 cross-region replica   │
                                                              └──────────────────────────┘
                                              │
                                              ▼
                                      ┌──────────────────────┐ ┌──────────────────────────────┐
                                      │ Memorystore for Redis│▶│ BullMQ workers (12 replicas) │
                                      │ cluster: cache+queues│ │ - booking.fulfill            │
                                      └──────────────────┘    │ - notifications.{email,wa}   │
                                                              │ - payment.refund             │
                                                              │ - reconciliation.daily       │
                                                              └──────────────────────────────┘
```

### التنظيم الـ Hexagonal (لكل خدمة)

- **Adapters in**: HTTP controllers، queue listeners، webhook receivers.
- **Application**: use cases (إدارة الـ saga، أوامر idempotent).
- **Domain**: entities صافية (`Booking` و `Payment` و `Offer`) + value objects (`Money`،
  `Currency`، `Locale`).
- **Adapters out**: PSP clients، supplier clients، repositories (Prisma)، event bus.

### الحدود الـ Async

- كل العمليات متعددة الخطوات (fulfillment الحجز، refunds، payouts، dunning) تعمل كـ
  BullMQ jobs مع `attempts` و `backoff:{type:exponential, delay:1000}` ومع handlers
  من نوع idempotent.
- domain events يُنشَر داخليًا في in-process EventEmitter، ثم يُعاد توجيهه اختياريًا
  إلى طابور `domain.events` في BullMQ لاستهلاكه من خدمات أخرى.

---

## تصميم قاعدة البيانات

PostgreSQL 16، والمستوى Pro يضيف الجداول التالية فوق المستوى Basic.

| الجدول                 | الغرض                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- |
| `currencies`           | مرجع ISO 4217 + display exponent                                              |
| `fx_rates`             | snapshots يومية للـ FX                                                        |
| `saved_travellers`     | ملفات مسافرين قابلة لإعادة الاستخدام لكل user                                 |
| `saved_documents`      | خزينة وثائق السفر (مُشفّرة)                                                   |
| `saved_payment_methods`| مراجع PSP-token لكل user                                                      |
| `carts`                | aggregate الـ cart متعدد العناصر                                              |
| `cart_items`           | عناصر الـ cart                                                                |
| `booking_sagas`        | حالة الـ saga لكل حجز (الخطوة، retries، errors)                                |
| `booking_changes`      | ledger للتغييرات الإرادية (delta charge/refund)                                |
| `supplier_payouts`     | ledger مدفوعات الـ supplier (العمولة + الصافي)                                 |
| `paytabs_profiles`     | جدول profiles PayTabs (currency، region، merchant profile ID)                  |
| `wa_templates`         | templates الـ WhatsApp Business المعتمدة لكل locale                          |
| `wa_messages`          | رسائل WA المُرسَلة + حالة التسليم                                              |
| `consents`             | سجل موافقة مع version (T&C، marketing، WA)                                    |
| `invoices`             | metadata الفاتورة الضريبية المُنتَجة + storage URL                              |

### DDL الرئيسية

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
  psp         TEXT NOT NULL DEFAULT 'paytabs',
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
  item_type   TEXT NOT NULL CHECK (item_type IN ('FLIGHT')),
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

CREATE TABLE paytabs_profiles (
  id             SERIAL PRIMARY KEY,
  region         TEXT NOT NULL,            -- EG, SA, AE, JO, OM
  currency       CHAR(3) NOT NULL,         -- EGP, USD, EUR, SAR, AED
  profile_id     TEXT NOT NULL,            -- PayTabs merchant profile ID
  server_key_ref TEXT NOT NULL,            -- Vault/Secrets ref
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (region, currency)
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

## تصميم الـ API

عدد الـ endpoints: 37. الـ authentication / rate limits / error envelope موروثة من Basic.

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
| 19 | POST   | `/carts`                                      | bearer      | `{displayCurrency}`                                | `Cart`                                | 201                 |
| 20 | POST   | `/carts/{id}/items`                           | bearer      | `{type,offerId}`                                   | `Cart`                                | 200,400             |
| 21 | DELETE | `/carts/{id}/items/{itemId}`                  | bearer      | —                                                  | `Cart`                                | 200                 |
| 22 | POST   | `/carts/{id}/checkout`                        | bearer      | `{contact,passengers[],paymentMethod}` + Idem      | `{bookingId,reference,paymentIntent}` | 201,409,422         |
| 23 | GET    | `/bookings/{id}`                              | bearer      | —                                                  | `Booking`                             | 200                 |
| 24 | GET    | `/bookings`                                   | bearer      | filters + paging                                   | `{items,nextCursor}`                  | 200                 |
| 25 | POST   | `/bookings/{id}/cancel`                       | bearer+OTP  | `{reason,otp}`                                     | `{refundPreview,status}`              | 200,409             |
| 26 | POST   | `/bookings/{id}/change`                       | bearer      | `{changeType,payload}`                             | `{quoteId,deltaMinor}`                | 200                 |
| 27 | GET    | `/bookings/{id}/invoice`                      | bearer      | —                                                  | `Invoice`                             | 200                 |
| 28 | POST   | `/payments/paytabs`                           | bearer      | `{cartId,paymentMethod}` + Idem                    | `{paymentUrl,tranRef,currency}`       | 201,409             |
| 29 | POST   | `/payments/refunds`                           | admin/bearer+OTP | `{paymentId,amountMinor,reason}` + Idem       | `{refundId,status}`                   | 201,409             |
| 30 | POST   | `/payments/methods`                           | bearer      | `{paytabsToken}`                                   | `SavedPaymentMethod`                  | 201,409             |
| 31 | DELETE | `/payments/methods/{id}`                      | bearer      | —                                                  | 204                                   | 204                 |
| 32 | POST   | `/notifications/preferences`                  | bearer      | `{channel,enabled}`                                | `Prefs`                               | 200                 |
| 33 | POST   | `/webhooks/paytabs`                           | sig         | PayTabs IPN event                                  | 200                                   | 200,400             |
| 34 | POST   | `/webhooks/whatsapp`                          | sig         | Meta event                                         | 200                                   | 200,400             |
| 35 | GET    | `/admin/bookings`                             | admin       | filters                                            | `{items,nextCursor}`                  | 200                 |
| 36 | POST   | `/admin/bookings/bulk`                        | admin       | `{ids[],action,params}`                            | `{queuedJobId}`                       | 202                 |
| 37 | GET    | `/admin/reports/daily`                        | admin       | date                                                | `Report`                              | 200                 |

### مثال: Cart Checkout

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

الرد (201):

```json
{
  "bookingId": "bk_01J9...",
  "reference": "JWL-7K2QZ8",
  "payment": {
    "psp": "paytabs",
    "tranRef": "TST2412150000123456",
    "paymentUrl": "https://secure-egypt.paytabs.com/payment/page/...",
    "currency": "EGP",
    "amountMinor": 7800000,
    "requires3ds": true
  }
}
```

---

## Authentication و Authorization

### نموذج الـ Token (الفرق عن Basic)

- Access JWT لمدة 10 دقائق، refresh لمدة 30 يومًا (rotated و family-aware).
- claims جديدة: `mfa: bool` و `mfa_methods: ["totp"]` و `step_up_until: <epoch>`.
- يجب أن يكون `step_up_until >= now()` لعمليات الـ refund وتغيير وسيلة الدفع وإيقاف MFA.

### الأدوار والصلاحيات

| الدور            | أمثلة الصلاحيات                                                                    |
| ---------------- | --------------------------------------------------------------------------------- |
| customer         | `booking:*:self`، `payment:create`، `payment_method:*:self`                       |
| support          | `booking:read:any`، `notification:resend`، `customer:view`                        |
| ops              | `booking:write:any`، `refund:create:<=5000usd`، `supplier:health:view`            |
| admin            | `*`                                                                               |
| finance          | `report:export`، `reconciliation:run`، `payout:approve`                           |
| cms_editor       | `cms:*`، `template:*`                                                             |

موافقة 4-eye مفروضة على `refund:create:>5000usd` و `payout:approve`.

### كلمات المرور و MFA

- Argon2id (m=64MiB، t=3، p=2)، مع pepper من KMS.
- تسجيل TOTP عبر QR + backup codes (10 أكواد كل واحد للاستخدام مرة، طول كل كود 8).
- MFA مفروض على: الموظفين (إلزامي)، والعملاء (اختياري لكن لازم للعمليات الحساسة).
- الـ backup codes تُخزَّن مُجزَّأة بـ Argon2id.

---

## الأمان

### تخفيف مخاطر OWASP (الإضافات)

| الخطر     | التخفيف (إضافات Pro)                                                                              |
| --------- | ------------------------------------------------------------------------------------------------ |
| A01       | فحص نطاق tenant عبر `userId` و `accountId` في كل قراءة؛ مع فصل الـ admin بالصلاحيات.              |
| A02       | تشفير KMS envelope لوثائق السفر؛ مع تشفير deterministic عبر HMAC لمفاتيح البحث.                    |
| A03       | parameterization عبر Drizzle/Prisma + تحقق Zod schema على مدخلات كل controller.                   |
| A05       | CSP مفروض (لا report-only)؛ مع strict-dynamic + nonces.                                          |
| A07       | TOTP MFA، step-up auth، إبطال refresh family.                                                     |
| A09       | OpenTelemetry traces، Sentry، audit log؛ تكامل SIEM عبر Vector → ClickHouse.                     |
| A10 SSRF  | egress proxy مع allow-list + DNS pinning؛ مع **Cloud NAT** ثابت الـ outbound IP من Cloud Run لاستخدامه في allow-list لـ supplier. |

### التشفير على مستوى الحقل

- أرقام وثائق السفر، صور الجوازات (object storage)، أرقام BIN للبطاقات المحفوظة (مُجزَّأة
  لا مشفّرة) لأغراض التحليلات.
- مفاتيح KMS لكل region؛ مع DEK لكل سجل مشفّر بـ KEK لكل tenant.
- تدوير ربع سنوي للمفاتيح؛ تدوير فوري عند أي تسريب.

### التحقق من الـ Webhook

| المزود  | الطريقة                                                                              |
| ------- | ----------------------------------------------------------------------------------- |
| PayTabs | `signature` header HMAC-SHA256 على body بـ server-key، مع التحقق من `tran_ref` للـ idempotency. |
| Meta    | `X-Hub-Signature-256` HMAC-SHA256 بـ app secret.                                     |

كل الـ webhooks idempotent على `tran_ref`؛ نافذة الـ replay 24 ساعة؛ والأحداث القديمة ترجع 410 Gone.

### Rate Limiting

- متعدد المستويات: **Cloud Armor (WAF/DDoS)** على مستوى الـ IP، وbucket في NestJS للـ
  throttle التجاري على مستوى الـ user، وsupplier-circuit-breaker للحماية والـ fallback.

### إدارة الـ Secrets

- **GCP Secret Manager** للوقت التشغيلي؛ مع SOPS-encrypted YAML لـ bootstrap الـ IaC على GCP.
- تدوير الـ secrets: تدوير master لـ **Cloud SQL for PostgreSQL** المُدار؛ وتدوير PayTabs server-key ربع
  سنوي عبر runbook.

---

## Workflow الحجز

### الـ Saga

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
                FLIGHT.book ──▶ FLIGHT.ticket ──▶ all_ok? ──▶ CAPTURE_PAYMENT
                          │           │              no                          │
                          │ failure   │ failure                                  │
                          ▼           ▼                                          ▼
                COMPENSATE: void supplier + void payment ──▶ FAILED        CONFIRMED
                                                                                  │
                                                                                  ▼
                                                                          NOTIFY (email + WA)
```

### تعريفات الخطوات (`booking_sagas.current_step`)

| الخطوة                | الفعل                                            | Idem key             | Compensation                            |
| --------------------- | ----------------------------------------------- | -------------------- | --------------------------------------- |
| `PRICE_CONFIRM`       | إعادة تسعير العرض مع كل supplier                | bookingId            | لا شيء                                  |
| `PAYMENT_HOLD`        | إنشاء أو استخدام PayTabs Authorization          | bookingId            | إلغاء الـ Authorization (Void)          |
| `SUPPLIER_BOOK_<i>`   | إصدار PNR لكل عنصر طيران                         | bookingId+itemSeq    | إلغاء supplier (أو void uncaptured)     |
| `PAYMENT_CAPTURE`     | عمل Capture للـ PayTabs Authorization           | bookingId            | refund                                  |
| `NOTIFY`              | وضع الإشعارات في الطابور                          | bookingId            | لا شيء                                  |
| `INVOICE`             | توليد الفاتورة                                   | bookingId            | لا شيء                                  |

### المهل الزمنية

| الخطوة              | Hard timeout | سياسة الـ Retry                                |
| ------------------- | ------------ | --------------------------------------------- |
| PRICE_CONFIRM       | 8 ثواني      | محاولة retry واحدة                             |
| PAYMENT_HOLD        | 8 ثواني      | محاولتان retry                                 |
| SUPPLIER_BOOK_*     | 30 ثانية     | 3 retries exp backoff؛ على الأخيرة → compensate |
| PAYMENT_CAPTURE     | 10 ثواني     | 5 retries exp backoff؛ على الأخيرة → page on-call |
| NOTIFY              | 5 دقائق في الطابور | 5 retries                                |
| INVOICE             | 60 ثانية     | 3 retries                                     |

---

## Flight Flow (إضافات Pro)

- Branded fares: استدعاء ثانٍ اختياري (`Flight Offers Pricing` مع `include=detailed-fare-rules`)
  مع cache لـ 5 دقائق.
- Ancillaries: `Seat Map Display` و `Flight Order Management` لإضافة الـ SSR.
- التغيير الذاتي: cancel + rebook في نفس الـ saga مع رسم/refund الفرق.

```
search → fanout cache → display → select → priceCheck → seat-map(opt) → checkout → PNR → ticket → SSR (ancillaries) → capture → emailtix + WA
```

---

## Payment Flow (PayTabs، refunds آلية)

### اختيار الـ Profile

```
choose_paytabs_profile(currency, market):
  for profile in paytabs_profiles where is_active:
    if profile.currency == currency and profile.region == market:
      return profile.profile_id
  return fallback (global multi-currency profile)
```

أمثلة:

| الشرط                                    | PayTabs Profile         |
| ---------------------------------------- | ----------------------- |
| currency = EGP                           | EG profile              |
| currency = SAR                           | SA profile              |
| currency = AED                           | AE profile              |
| currency in (USD,EUR)، market = EG       | EG multi-currency       |
| أي شيء آخر                                | global multi-currency   |

### Flow الـ Charge

```
PayTabs Auth create ──▶ redirect PayPage (3DS/SCA) ──▶ hold (Auth) ──▶ supplier fulfill ──▶ Capture ──▶ confirm
```

### Flow الـ Refund (آلي)

```
trigger:
   - customer self-service cancel (within policy)
   - ops dashboard refund
   - rule engine (e.g., supplier-cancel auto-refund)

worker payment.refund:
   verify booking eligibility + amount cap
   write `payments.refund_requests` row (idempotency_key)
   call paytabs.refund(tran_ref, amount, currency=originalCapture, idemKey)
   on success: payments.refunded_amount_minor += amount
                 if fully refunded: booking.status = REFUNDED
                 else: booking.status = PARTIAL_REFUND
   notify customer (email + WA)
```

### الـ Reconciliation

- job ليلي يجلب تقارير الـ payout من PayTabs → ledger entries.
- مطابقة ثلاثية: `bookings.total` ↔ `payments` ↔ `paytabs.payout_line`.
- الفرق الأكبر من 0.5% يُرفع للـ finance review مع التفاصيل.

---

## Modules الـ Admin

| الصفحة                      | الإمكانيات                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| KPI dashboard               | GMV، الحجوزات، التحويل، نسبة الـ refund، FX P&L، take rate — تبويبات يومي/أسبوعي/شهري.    |
| Bookings workbench          | فلتر + bulk actions (export، refund، tag، إرسال WA)، مع quick-jump لـ customer-360.       |
| Customer-360                | الحجوزات، المدفوعات، الإشعارات، sessions، حالة MFA، الأجهزة.                              |
| Refund console              | طابور الـ refund، موافقات 4-eye، أداة preview للـ refund، timeline للحالة.                |
| Dunning                     | المدفوعات الفاشلة، timeline الـ retry، retry يدوي، استبعاد من الـ auto-retry.             |
| Supplier health             | لكل supplier latency p50/p95/p99، تفصيل الأخطاء، حالة الـ circuit-breaker.                |
| Finance reports             | GMV حسب الـ market، refunds حسب السبب، FX P&L، payouts الـ supplier.                     |
| CMS                         | صفحات تسويق، banners، FAQ؛ مع localization؛ من staged → published.                       |
| Notification templates      | تعديل النص + المتغيرات، إرسال test، version + rollback؛ metadata WhatsApp template.       |
| Feature flags               | toggles لكل بيئة، audit، rollout بنسبة مئوية لكل user cohort.                              |
| Users & Roles               | إدارة RBAC؛ إنشاء موظفين؛ تعيين دور؛ فرض MFA.                                            |
| Audit log                   | غير قابل للتعديل، فلتر حسب actor / target / action؛ تصدير CSV.                            |
| Settings                    | psp_routes، هوامش FX، سياسات retry (تقرأها الخدمات ديناميكيًا).                           |

---

## النشر

### الـ Topology

- **Frontend**: **Cloud Run على GCP**، اثنان من الـ regions (`europe-west3` Frankfurt primary و `europe-west9` Paris standby؛ Cloud CDN يخدم من أقرب edge POP).
- **Backend**: **Cloud Run على GCP**، region `europe-west3` primary + `europe-west9` warm standby (read-only في التشغيل العادي) ضمن مشروع GCP الخاص بالعميل.
- **Postgres**: **Cloud SQL for PostgreSQL 16** HA مع sync replica في نفس الـ region (multi-zone) و **async cross-region replica** في region آخر.
- **Redis**: **Memorystore for Redis Cluster**، multi-zone، مع replication بين region للـ queue durability.
- **Queues**: BullMQ broker لكل region (على Memorystore)؛ مع تقسيم الـ jobs حسب الطابور.
- **Object storage**: **GCS buckets**، مع **Turbo Replication** (cross-region) لـ `tickets` و `invoices`.

### الـ Pipelines

| المرحلة           | الخطوات                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| lint              | `pnpm lint` و `tsc --noEmit`                                                          |
| test:unit         | Jest + RTL، مع coverage gate ≥ 85% lines                                              |
| test:integration  | تشغيل Postgres + Redis + WireMock للـ suppliers                                       |
| test:contract     | Pact verify مقابل supplier stubs مثبّتة                                                |
| build             | FE + BE؛ SBOM (cyclonedx) + Trivy + Snyk؛ توقيع الـ image (Cosign)                    |
| deploy:preview    | Cloud Run preview revision (FE + BE، traffic=0) `pr-<n>` للـ E2E                       |
| e2e               | Playwright suite على الـ preview                                                       |
| deploy:staging    | Cloud Run staging revisions (FE + BE) عند الدمج إلى `main`                             |
| smoke:staging     | حجز تجريبي صناعي؛ supplier sandbox                                                    |
| deploy:prod       | موافقة يدوية → **Cloud Run traffic split (blue/green canary 5% → 25% → 100%)** للـ FE + BE |
| post-deploy       | synthetic /healthz، error-rate watcher لمدة 30 دقيقة؛ rollback تلقائي عند التراجع     |

### Environment Variables (الإضافات)

| المتغير                              | الغرض                                    |
| ------------------------------------- | ---------------------------------------- |
| `PAYTABS_API_KEY`/`_SERVER_KEY`       | PayTabs server-side keys                 |
| `PAYTABS_PROFILE_ID_<region>`         | merchant profile per region (EG/SA/AE)   |
| `PAYTABS_IPN_SECRET`                  | IPN HMAC secret                          |
| `WABA_ACCESS_TOKEN`/`PHONE_NUMBER_ID` | WhatsApp                                 |
| `FX_PROVIDER_KEY`                     | openexchangerates                        |
| `KMS_KEY_ID`                          | تشفير على مستوى الحقل                     |

---

## Logging

- Pino structured JSON.
- الحقول المطلوبة (إضافات Pro): `tenantId` و `requestRegion` و `paytabsProfileId` و `supplierId` و
  `sagaStep` و `attempt`.
- redaction للحقول الحساسة موسّع ليشمل: `psp_token` و `wa_token` و `doc_number` و `card_*` و
  `iban` و `tax_id`.
- توجيه الـ logs: stdout → **Cloud Logging** → Vector → ClickHouse (analytics) + **GCS Archive class** cold storage.
- الاحتفاظ: 90 يومًا hot، سنتان cold؛ audit logs لمدة 7 سنوات في **GCS Bucket Lock (WORM)**.

---

## Monitoring

- الـ stack: Sentry (errors + perf)، Grafana Cloud (metrics + logs + traces)، PagerDuty.
- OpenTelemetry SDK يصدر OTLP إلى Tempo / Loki / Mimir.

### المقاييس (الإضافات)

| المقياس                                 | ملاحظات                                     |
| --------------------------------------- | ------------------------------------------- |
| `supplier_call_latency_ms`              | لكل supplier لكل op                          |
| `supplier_call_error_total`             | لكل supplier لكل error code                  |
| `paytabs_profile_choice_total`          | لكل PayTabs profile مختار حسب العملة/المنطقة |
| `payment_refund_latency_ms`             | من request إلى settled                        |
| `fx_margin_bps`                         | توزيع الـ margin المطبّق                       |
| `wa_message_delivery_total`             | لكل حالة                                     |
| `saga_step_duration_ms`                 | لكل خطوة                                     |
| `saga_compensation_total`               | لكل خطوة فاشلة                                |

### التنبيهات

| الشرط                                                            | الخطورة  | التوجيه       |
| --------------------------------------------------------------- | -------- | ------------ |
| API p95 > 600 ms لمدة 5 دقائق                                    | page     | PagerDuty    |
| نسبة compensation للـ saga > 2% لمدة 15 دقيقة                    | page     | PagerDuty    |
| تأخير PayTabs IPN > 3 دقائق                                      | page     | PagerDuty    |
| فشل تسليم WA > 10% لمدة 15 دقيقة                                 | warn     | #ops         |
| تجاوز SLA الـ refund (أكثر من 24h pending)                       | page     | finance OnCall |
| تأخير الـ replication > 15 ثانية                                  | warn     | #ops         |
| نسبة الأخطاء 5xx > 0.5% لمدة 5 دقائق                              | page     | PagerDuty    |
| حالات auth غير طبيعية (impossible travel، brute force)            | page     | security OnCall |

---

## استراتيجية الاختبار

| الطبقة           | الأدوات                                | الهدف                          |
| ---------------- | -------------------------------------- | ----------------------------- |
| Unit             | Jest                                   | 85% lines BE؛ 80% FE          |
| Integration      | Jest + testcontainers (PG، Redis)      | كل الخدمات + repos             |
| Contract         | Pact لكل supplier + PayTabs            | كل الـ adapters                |
| E2E              | Playwright (multi-locale، RTL)         | المسارات الحرجة + smoke        |
| Load             | k6 baseline + Argo workflow            | NFR-006 / 007 sustained         |
| Accessibility    | axe + audit يدوي WCAG                  | صفر serious                    |
| Security         | OWASP ZAP، Burp Suite (يدوي ربع سنوي)  | صفر highs بدون تخفيف           |
| Chaos            | Toxiproxy في supplier calls على staging | البقاء بعد تعطّل supplier واحد   |

---

## اختبارات القبول

> إضافة للمستوى السابق: AT-001..024 من Basic تبقى سارية. وPro يضيف:

| ID     | العنوان                                     | Given                                                 | When                                          | Then                                                                                  |
| ------ | ------------------------------------------- | ----------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| AT-025 | Multi-currency cart                         | Cart بـ EGP                                            | أحوّل displayCurrency إلى USD                  | يُعاد حساب الإجمالي عبر FX snapshot؛ مع الإفصاح عن FX margin.                          |
| AT-026 | Saved-traveller prefill                     | لدي مسافر محفوظ                                       | أبدأ حجزًا جديدًا                              | تُملأ نماذج الـ pax تلقائيًا؛ مع toggle صريح "use saved".                              |
| AT-027 | Cart hold expiry                            | Cart غير نشط لمدة 21 دقيقة                             | أحاول checkout                                | 410 `CART_EXPIRED`؛ مع إعادة flow.                                                     |
| AT-028 | Branded fare                                | شركة الطيران تكشف 3 fare bundles                       | أعرض العرض                                    | LITE/STANDARD/FLEX تظهر؛ مع السعر + المميزات لكل bundle.                                |
| AT-029 | Ancillary baggage                           | العرض يدعم extra-bag                                   | أضيف حقيبة واحدة                              | الإجمالي يعكس سعر الـ ancillary؛ ويُضاف SSR للـ PNR وقت الـ capture.                  |
| AT-030 | Saga rollback                               | FLIGHT.ticket يفشل بعد نجاح FLIGHT.book                | الـ saga تقوم بـ compensate                    | يُلغى Flight Order؛ ويتم void للدفع؛ وحالة الحجز FAILED.                              |
| AT-031 | PayTabs profile — EG لـ EGP                  | Currency EGP                                          | أنشئ payment transaction                      | profile=`EG`؛ والـ Auth transaction يُنشأ في PayTabs EG.                              |
| AT-032 | PayTabs profile — SA لـ SAR                  | Currency SAR                                          | أنشئ payment transaction                      | profile=`SA`؛ والـ Auth transaction يُنشأ في PayTabs SA.                              |
| AT-033 | Automated refund                            | إلغاء كامل من العميل ضمن السياسة                       | طلب إلغاء                                     | refund يتم آليًا عبر PayTabs Refund API؛ الحجز → REFUNDED؛ يُرسَل email + WA.        |
| AT-034 | تأكيد WhatsApp                              | المستخدم opt-in على WA                                  | الحجز CONFIRMED                                | يُرسَل template معتمد؛ وحالة التسليم تُحدَّث عبر webhook.                              |
| AT-035 | WA delivery fallback                        | فشل تسليم WA template                                  | تمضي 5 دقائق دون callback بـ delivered          | يُرسَل email بديل؛ ويُبلَّغ الـ admin.                                                  |
| AT-036 | MFA TOTP enroll/verify                      | أسجّل TOTP عبر QR                                       | أدخل الكود الصحيح                              | `mfa: true`؛ تُولَّد backup codes؛ والعمليات الحساسة لاحقًا تتطلب step-up.            |
| AT-037 | Step-up قبل الـ refund                       | أنا عميل مفعّل لديه MFA                                 | أطلب refund دون step-up حديث                    | 401 `STEP_UP_REQUIRED`؛ ومحاولة مع TOTP تنجح.                                         |
| AT-038 | إدارة saved card                            | أضفت بطاقة عبر PSP token                                | أحذف البطاقة                                  | السجل المحفوظ يُحذف؛ ويُعاد تعيين البطاقة الافتراضية إن لزم.                            |
| AT-039 | توليد الفاتورة                              | لدي حجز EG مؤكد                                         | أطلب فاتورة                                    | رقم فاتورة EG تسلسلي؛ مع حساب VAT؛ ويُولَّد PDF ويُخزَّن في **GCS**.                  |
| AT-040 | Admin bulk export                           | أنا admin مع 1k حجز مفلتر                              | أصدّر CSV                                     | job في الخلفية؛ مع signed URL تصلني بالبريد عند الجاهزية.                              |
| AT-041 | 4-eye refund                                | محاولة refund بقيمة $7,000                              | أرسلها                                        | الحالة `PENDING_APPROVAL`؛ ولا تُنفَّذ إلا بموافقة admin ثانٍ.                         |
| AT-042 | تنبيه فرق الـ reconciliation                | payout من PSP ينقصه حجز                                | يعمل recon job ليلي                            | الفرق > 0.5% يُطلق تنبيه Slack للـ finance.                                          |

---

## الملحق A — الترحيل من المستوى Basic

| الموضوع                  | خطوة الترحيل                                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| Schema                   | migrations forward-only؛ مع backfill لـ `display_currency` على الحجوزات القائمة.  |
| FX                       | backfill لـ fx_rate لكل حجز قائم مع تاريخ "as_of" موثّق.                           |
| PSP                      | الـ profile الافتراضي = PayTabs global multi-currency؛ مع تعبئة `paytabs_profiles` لكل market. |
| WhatsApp                 | إضافة form للـ opt-in في الـ dashboard؛ مع templates معاملاتية معتمدة مسبقًا من Meta. |
| Admin                    | تطبيق admin جديد بجانب القديم؛ والـ admin القديم يبقى read-only لمدة 30 يومًا.    |

— *نهاية الوثيقة — Jawla SRS Professional v1.0* —
