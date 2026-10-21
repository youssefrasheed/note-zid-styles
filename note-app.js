/**
 * NOTE Perfumes Official Storefront Engine for Zid
 * Version: 3.0.0 - Approved Client Master Edition (100% Matching refine-paperbacks-based-nat.trycloudflare.com)
 * Hosted via GitHub Pages CDN: https://youssefrasheed.github.io/note-zid-styles/
 */
(function() {
  "use strict";
  console.log("NOTE Perfumes Master Engine v3.0.0 Starting...");

  const ASSET_HOST = "https://youssefrasheed.github.io/note-zid-styles";

  // Zid Official Product Slug Mapping
  const zidSlugMap = {
    'roayal-tobacco': 'roayal-tobacco',
    'note-for-him': 'note-for-him',
    'oud-rosewood': 'oud-rosewood',
    'note-phantom': 'note-phantom',
    'note-gold': 'نوت-قولد-الطلب-المسبق',
    'note-musk': 'مسك',
    'niche-blue': 'niche-blue',
    'niche-amber': 'niche-amber',
    'niche-oud': 'niche-oud',
    'niche-royal-leather': 'niche-amber-1',
    'aura': 'aura',
    'powderose': 'powderose',
    'attraction': 'attraction',
    'bn': 'bn',
    'musk-bukhor': 'مسك-بخور',
    'royal-powder': 'رويال-باودر'
  };

  // 1. Inject Tailwind CDN if not loaded
  if (!window.tailwind) {
    const twScript = document.createElement("script");
    twScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(twScript);
  }

  // 2. Configure Tailwind
  if (!window.tailwindConfigApplied) {
    window.tailwindConfigApplied = true;
    window.tailwind = window.tailwind || {};
    window.tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Laverne', 'system-ui', 'sans-serif'],
          },
          colors: {
            brand: {
              black: '#000000',
              dark: '#111111',
              gray: '#737373',
              light: '#f5f5f5',
            }
          }
        }
      }
    };
  }

  // 3. Inject Suppression & Font Styles
  if (!document.getElementById("note-master-inline-css")) {
    const s = document.createElement("style");
    s.id = "note-master-inline-css";
    s.textContent = `
/* ==========================================================================
   NOTE PERFUMES - 100% LAVERNE LUXURY CLONE THEME FOR ZID
   ========================================================================== */
header.header-nav, 
header.bg-header-transparent,
header:not(#site-header),
.tp-bar-header,
footer:not(#note-store-footer),
.tp-footer-area,
.tp-footer-top,
.tp-footer-bottom,
.tp-home > *:not(#note-luxury-storefront),
.s-block,
.tp-slider-banners,
.tp-product-card,
.tp-banners,
.tp-brands,
.tp-title-section {
  display: none !important;
}

.main.app-content, .tp-home {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
  overflow: visible !important;
  background: #ffffff !important;
}

body {
  margin: 0 !important;
  padding: 0 !important;
  background: #ffffff !important;
  font-family: 'Laverne', sans-serif !important;
  overflow-x: hidden !important;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;
    document.head.appendChild(s);
  }

  // 4. Products Data
  const productsData = [// --- 1. الأكثر مبيعاً (Bestsellers: 0..5) ---
      {
        id: 'roayal-tobacco',
        title: 'عطر رويال توباكو',
        title_en: 'ROYAL TOBACCO',
        cat: 'التوليفات الخشبية والتبغ',
        notes: 'اللافندرين - خشب الغاياك',
        tag: 'الأكثر طلباً',
        price: '229 ر.س',
        old_price: '410 ر.س',
        img: '/products/NOTE_Royal_Tobacco_Flat_Lay.webp',
        slogan: 'توليفة تبغية فاخرة تمتزج بنعومة اللافندر ودفء خشب الغاياك لحضور استثنائي مهيب',
        top: 'اللافندر الفرنسي والبرغموت المنعش',
        heart: 'أوراق التبغ الكوبية والقرفة السيلانية',
        base: 'خشب الغاياك، الفانيليا البوربون، والعنبر الأسود'
      },
      {
        id: 'note-for-him',
        title: 'عطر نوت فور هِم',
        title_en: 'NOTE FOR HIM',
        cat: 'العطور الخشبية الأروماتيك',
        notes: 'الهيل - الجلود الفاخرة',
        tag: 'الأكثر طلباً',
        price: '179 ر.س',
        old_price: '419 ر.س',
        img: '/products/NOTE_For_Him_Flat_Lay.webp',
        slogan: 'عطر الرجولة العصرية الواثقة؛ تناغم أخّاذ بين دفء الهيل والجلود الفاخرة',
        top: 'الهيل الغواتيمالي والليمون الإيطالي',
        heart: 'اللافندر والميرمية العطرية',
        base: 'الجلود الطبيعية وخشب الصندل والعنبر'
      },
      {
        id: 'oud-rosewood',
        title: 'عطر عود روز وود',
        title_en: 'OUD ROSEWOOD',
        cat: 'العطور الشرقية الخشبية',
        notes: 'العود المعتق - خشب الورد',
        tag: 'نقاء شرقي',
        price: '189 ر.س',
        old_price: '420 ر.س',
        img: '/products/NOTE_Oud_Rosewood_Flat_Lay.webp',
        slogan: 'أصالة العود الكمبودي المعتق مع رقة خشب الورد الفاخر ونفحات عنبرية دافئة',
        top: 'خشب الورد والتوت البري',
        heart: 'العود الكمبودي المعتق والباتشولي',
        base: 'العنبر والمسك الأبيض وخشب الصندل'
      },
      {
        id: 'note-phantom',
        title: 'عطر نوت فانتوم',
        title_en: 'NOTE PHANTOM',
        cat: 'العطور الغامضة الفاخرة',
        notes: 'نجيل الهند - الفلفل الوردي',
        tag: 'الأكثر مبيعاً',
        price: '189 ر.س',
        old_price: '470 ر.س',
        img: '/products/NOTE_Phantom_Flat_Lay.webp',
        slogan: 'توليفة ليلية غامضة وجذابة تمنحك هالة من الفخامة التي لا تُنسى',
        top: 'الفلفل الوردي والجريب فروت',
        heart: 'نجيل الهند واللبان العماني',
        base: 'خشب الأرز والباتشولي الجاوي'
      },
      {
        id: 'note-gold',
        title: 'عطر نوت قولد الملكي',
        title_en: 'NOTE GOLD',
        cat: 'العطور الزهرية الشرقية',
        notes: 'الياسمين الملكي - العنبر الذهبي',
        tag: 'ملكي',
        price: '179 ر.س',
        old_price: '480 ر.س',
        img: '/products/NOTE_Gold_Flat_Lay.webp',
        slogan: 'فخامة ملكية متجسدة في عبير ساحر يجمع نقاء الياسمين ودفء العنبر الخالص',
        top: 'الزعفران الإيراني والبرغموت',
        heart: 'الياسمين الملكي وزهر البرتقال',
        base: 'العنبر الذهبي وخشب الأرز'
      },
      {
        id: 'note-musk',
        title: 'عطر مِسك نوت',
        title_en: 'NOTE MUSK',
        cat: 'المسك الأبيض النقي',
        notes: 'المسك الأبيض - بودر ناعم',
        tag: 'الأكثر طلباً',
        price: '239 ر.س',
        old_price: '920 ر.س',
        img: '/products/NOTE_Musk_Flat_Lay.webp',
        slogan: 'النقاء المتجسد؛ أثر ناعم وثابت يدوم لساعات طويلة بعبير النظافة والفخامة',
        top: 'المسك الأبيض وزهر القطن',
        heart: 'زهور السوسن والنوتات البودرية',
        base: 'المسك الصافي وخشب الصندل'
      },

      // --- 2. عطور النيش (Niche Collection: 6..9) ---
      {
        id: 'niche-blue',
        title: 'عطر نيش بلو',
        title_en: 'NICHE BLUE',
        cat: 'مجموعة النيش الفاخرة',
        notes: 'البرغموت الإيطالي - نجيل الهند والجلد',
        tag: 'نيش حصري',
        price: '396 ر.س',
        old_price: '990 ر.س',
        img: '/products/NOTE_Blue_Flat_Lay.webp',
        slogan: 'عطر نيش ارستقراطي يجمع انتعاش الحمضيات الإيطالية النادرة مع ثبات عميق للجلود الفاخرة',
        top: 'البرغموت الكالابري والليمون الصقلي',
        heart: 'نجيل الهند والباتشولي الأبيض',
        base: 'الجلود الروسية المدبوغة والعنبر الرمادي'
      },
      {
        id: 'niche-amber',
        title: 'عطر نيش عنبر',
        title_en: 'NICHE AMBER',
        cat: 'مجموعة النيش الفاخرة',
        notes: 'العنبر الرمادي - اللبان والبخور الفاخر',
        tag: 'نيش ملكي',
        price: '396 ر.س',
        old_price: '1,200 ر.س',
        img: '/products/NOTE_Niche_Amber_Flat_Lay.webp',
        slogan: 'دفء شرقي ساحر مستوحى من أندر خامات العنبر والبخور الملكي المعتق لفوحان مهيب',
        top: 'اللبان العماني الحوجري والتوابل الدافئة',
        heart: 'العنبر الرمادي الطبيعي وخشب الكشمير',
        base: 'الفانيليا المدخنة وراتنج الجاوي العطري'
      },
      {
        id: 'niche-oud',
        title: 'عطر نيش عود',
        title_en: 'NICHE OUD',
        cat: 'مجموعة النيش الفاخرة',
        notes: 'العود الهندي النادر - خشب الأرز المدخن',
        tag: 'فخامة شرقية',
        price: '396 ر.س',
        old_price: '1,360 ر.س',
        img: '/products/NOTE_Oud_Flat_Lay.webp',
        slogan: 'قطرات نقية من أجود أنواع العود الطبيعي الممزوج بخشب الأرز بنقاء منقطع النظير',
        top: 'خشب الأرز الأطلسي والهيل الهندي',
        heart: 'دهن العود الهندي الصافي والزعفران',
        base: 'المسك الأسود المعتق وخشب البتولا'
      },
      {
        id: 'niche-royal-leather',
        title: 'عطر نيش رويال ليذر',
        title_en: 'NICHE ROYAL LEATHER',
        cat: 'مجموعة النيش الفاخرة',
        notes: 'الجلود الفاخرة - الزعفران والتبغ',
        tag: 'إصدار خاص',
        price: '396 ر.س',
        old_price: '1,090 ر.س',
        img: '/products/NOTE_Royal_Leather_Flat_Lay.webp',
        slogan: 'توليفة قوية وفريدة تجسد الهيبة والأناقة العصرية بنفحات الجلود المشبعة بأندر الزيوت',
        top: 'الزعفران الإسباني وتوت العليق البري',
        heart: 'الجلود الطبيعية المعتقة والياسمين',
        base: 'العنبر الأسود وأخشاب الأرز العطرية'
      },

      // --- 3. أحدث المنتجات (Newest Products: 10..15) ---
      {
        id: 'aura',
        title: 'عطر أورا (Aura)',
        title_en: 'NOTE AURA',
        cat: 'العطور الفرنسية الاستوائية',
        notes: 'المانجو المنعش - الفواكه الاستوائية',
        tag: 'إصدار جديد',
        price: '189 ر.س',
        old_price: '349 ر.س',
        img: '/products/NOTE_Aura_Flat_Lay.webp',
        slogan: 'عطر حيوي مشرق يجمع حلاوة المانجو الاستوائية مع رقي العطور الفرنسية',
        top: 'المانجو الاستوائية والحمضيات',
        heart: 'الياسمين وزهرة البابايا',
        base: 'المسك الأبيض وخشب الصندل'
      },
      {
        id: 'powderose',
        title: 'عطر بودر روز',
        title_en: 'POWDEROSE',
        cat: 'العطور البودرية والورد',
        notes: 'الورد الدمشقي - النوتات البودرية',
        tag: 'أنثوي فاخر',
        price: '189 ر.س',
        old_price: '398 ر.س',
        img: '/products/NOTE_Powderose_Large_Flat_Lay.webp',
        slogan: 'رقة ونعومة تأسر القلوب بلمسات الورد المخملي والبودرة الفرنسية الفاخرة',
        top: 'الورد الدمشقي والليتشي',
        heart: 'بودرة السوسن والياسمين',
        base: 'المسك الأبيض وخشب الأرز والفانيليا'
      },
      {
        id: 'attraction',
        title: 'عطر أتراكشن',
        title_en: 'ATTRACTION',
        cat: 'التوليفات الزهرية السكرية',
        notes: 'العسل - زهر البرتقال',
        tag: 'جاذبية مسائية',
        price: '189 ر.س',
        old_price: '520 ر.س',
        img: '/products/NOTE_Attraction_Flat_Lay.webp',
        slogan: 'عطر جريء بطابع زهري سكري صُمم ليترك حضوراً ساحراً لا يُنسى في المساء',
        top: 'البرتقال الأحمر واليوسفي',
        heart: 'العسل وزهر البرتقال والياسمين',
        base: 'شمع العسل والكراميل والباتشولي'
      },
      {
        id: 'bn',
        title: 'عطر بي إن',
        title_en: 'NOTE BN',
        cat: 'العطور الشرقية الدافئة',
        notes: 'الفانيليا السوداء - التوابل الدافئة',
        tag: 'الأكثر تميزاً',
        price: '179 ر.س',
        old_price: '389 ر.س',
        img: '/products/NOTE_BN_Flat_Lay.webp',
        slogan: 'عطر فريد يعكس الشخصية الواثقة بلمسات الفانيليا الغنية والتوابل العطرية الراقية',
        top: 'الفلفل الأسود والبرغموت',
        heart: 'حبوب التونكا وجوزة الطيب',
        base: 'الفانيليا السوداء وخشب الغاياك'
      },
      {
        id: 'musk-bukhor',
        title: 'عطر مسك بخور',
        title_en: 'MUSK BUKHOR',
        cat: 'العطور التراثية الفاخرة',
        notes: 'البخور المعتق - المسك الأبيض الملكي',
        tag: 'عبق شرقي',
        price: '189 ر.س',
        old_price: '522 ر.س',
        img: '/products/NOTE_Musk_Bukhor_Flat_Lay.webp',
        slogan: 'أصالة الماضي وأناقة الحاضر في عبق البخور الفاخر المشبع بنقاء المسك الملكي',
        top: 'اللبان والزعفران النقي',
        heart: 'المسك الأبيض ودهن الورد',
        base: 'العود المعتق وخشب الصندل'
      },
      {
        id: 'royal-powder',
        title: 'عطر رويال باودر',
        title_en: 'ROYAL POWDER',
        cat: 'العطور البودرية الملكية',
        notes: 'بودرة السوسن - الفانيليا وخشب الصندل',
        tag: 'نعومة فائقة',
        price: '199 ر.س',
        old_price: '389 ر.س',
        img: '/products/NOTE_Royal_Powder_Flat_Lay.webp',
        slogan: 'إحساس مفعم بالنظافة والترف برائحة البودرة الكلاسيكية الفاخرة ولمسات الأخشاب الدافئة',
        top: 'الورد واليلانغ يلانغ',
        heart: 'زهور السوسن والياسمين',
        base: 'المسك الأبيض وخشب الصندل والفانيليا'
      }];
  const noteProductsCatalog = [{
    "id": "roayal-tobacco",
    "title": "عطر رويال توباكو",
    "title_en": "ROAYAL TOBACCO",
    "cat": "perfumes",
    "cat_ar": "العطور",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "الأكثر طلباً",
    "bestseller": true,
    "price": 229,
    "old_price": 410,
    "discount": "45%",
    "rating": 4.91,
    "reviews_count": 410,
    "img": "/products/NOTE_Royal_Tobacco_Flat_Lay.webp",
    "img_box": "/products/NOTE_Royal_Tobacco_With_Box_Reference_Matched_v01.webp",
    "notes": "خشب التبغ - زيت القرنفل - الفانيليا الدافئة",
    "slogan": "توليفة شتوية دافئة تستحضر صوت طقطقة الخشب في الموقد مع نفحات التبغ والقرنفل والفانيليا الفاخرة",
    "description": "يستحضر هذا العطر من صوت طقطقة الخشب في الموقد أثناء تساقط الثلوج في الخارج مع العطور الدافئة والحارة لزيت القرنفل وزهرة البرتقال والفانيليا والكستناء. تتحد هذه المكونات لتجعل من عطر رويال توباكو تجربة استثنائية تأسر الحواس لكلا الجنسين.",
    "top": "زيت القرنفل النقي، زهرة البرتقال، الفلفل الوردي",
    "heart": "الكستناء المحمصة، خشب الغاياك، العرعر البري",
    "base": "الفانيليا المدخنة، بلسم بيرو، خشب الكشمير والتبغ"
  },
  {
    "id": "note-for-him",
    "title": "عطر نوت فور هِم",
    "title_en": "NOTE FOR HIM",
    "cat": "perfumes",
    "cat_ar": "العطور",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "الأكثر طلباً",
    "bestseller": true,
    "price": 179,
    "old_price": 419,
    "discount": "57%",
    "rating": 4.88,
    "reviews_count": 170,
    "img": "/products/NOTE_For_Him_Flat_Lay.webp",
    "img_box": "/products/NOTE_For_Him_With_Box_Reference_Matched_v01.webp",
    "notes": "الهيل - الجلود الفاخرة - اللافندر",
    "slogan": "عطر الرجولة العصرية الواثقة؛ تناغم أخّاذ بين دفء الهيل والجلود الفاخرة واللافندر الفرنسي",
    "description": "صُمم خصيصاً للرجل العصري الباحث عن التميز والجاذبية. يفتتح العطر بنفحات الهيل المنعش والليمون الإيطالي، ليتوسطه قلب من اللافندر والميرمية، ويستقر على قاعدة رجولية غنية بالجلود الطبيعية وخشب الصندل والعنبر.",
    "top": "الهيل الغواتيمالي والليمون الإيطالي",
    "heart": "اللافندر الفرنسي والميرمية العطرية",
    "base": "الجلود الطبيعية المعتقة، خشب الصندل والعنبر"
  },
  {
    "id": "for-her",
    "title": "عطر نوت فور هير",
    "title_en": "NOTE FOR HER",
    "cat": "perfumes",
    "cat_ar": "العطور",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "أنثوي راقي",
    "bestseller": true,
    "price": 179,
    "old_price": 419,
    "discount": "57%",
    "rating": 4.9,
    "reviews_count": 94,
    "img": "/products/NOTE_For_Her_Large_Flat_Lay.webp",
    "img_box": "/products/11_For_Her_Packaging_Dark_Print_Review.webp",
    "notes": "الورد - الفاوانيا - الفانيليا البيضاء",
    "slogan": "أنوثة حالمة بنفحات مخملية من أندر بتلات الورد والفاوانيا ولمسات الفانيليا الرقيقة",
    "description": "عطر يجسد النعومة والأنوثة المطلقة برائحة زهرية عذبة تدوم طويلاً، تمتزج فيها زهور الفاوانيا الرقيقة مع لمسات الفواكه المنعشة وقاعدة بودرية ناعمة من الفانيليا والمسك الأبيض.",
    "top": "البرغموت، المندرين، الليتشي الوردي",
    "heart": "بتلات الورد، الفاوانيا، زهرة اللوتس",
    "base": "الفانيليا البيضاء، خشب الأرز، المسك المخملي"
  },
  {
    "id": "oud-rosewood",
    "title": "عطر عود روز وود",
    "title_en": "OUD ROSEWOOD",
    "cat": "perfumes",
    "cat_ar": "العطور",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "نقاء شرقي",
    "bestseller": true,
    "price": 189,
    "old_price": 420,
    "discount": "55%",
    "rating": 4.82,
    "reviews_count": 116,
    "img": "/products/NOTE_Oud_Rosewood_Flat_Lay.webp",
    "img_box": "/products/NOTE_Oud_Rosewood_Reference_Matched_v01.webp",
    "notes": "العود المعتق - خشب الورد - الباتشولي",
    "slogan": "أصالة العود الكمبودي المعتق مع رقة خشب الورد الفاخر ونفحات عنبرية دافئة",
    "description": "توازن ساحر بين فخامة الشرق ورقي الغرب. يمتزج العود المعتق مع خشب الورد النادر في سمفونية عطرية شرقية تعبق بالغموض والهيبة، مناسب للمناسبات الرسمية والأمسيات الراقية.",
    "top": "خشب الورد والتوت البري والزعفران",
    "heart": "العود الكمبودي المعتق والباتشولي الإندونيسي",
    "base": "العنبر والمسك الأبيض وخشب الصندل"
  },
  {
    "id": "note-phantom",
    "title": "عطر نوت فانتوم",
    "title_en": "NOTE PHANTOM",
    "cat": "perfumes",
    "cat_ar": "العطور",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "منتج مميز",
    "bestseller": true,
    "price": 189,
    "old_price": 470,
    "discount": "60%",
    "rating": 5.0,
    "reviews_count": 14,
    "img": "/products/NOTE_Phantom_Flat_Lay.webp",
    "img_box": "/products/NOTE_Phantom_With_Box_Reference_Matched_v01.webp",
    "notes": "نجيل الهند - الفلفل الوردي - اللبان العماني",
    "slogan": "توليفة ليلية غامضة وجذابة تمنحك هالة من الفخامة التي لا تُنسى في كل خطوة",
    "description": "عطر يترك أثراً غامضاً ومثيراً للإعجاب، بمزيج حاد من الفلفل الوردي والحمضيات الفوارة مع عمق نجيل الهند واللبان العماني وخشب الأرز الأطلسي.",
    "top": "الفلفل الوردي والجريب فروت الصقلي",
    "heart": "نجيل الهند واللبان الحوجري العماني",
    "base": "خشب الأرز الأطلسي والباتشولي الجاوي"
  },
  {
    "id": "note-gold",
    "title": "عطر نوت قولد",
    "title_en": "NOTE GOLD",
    "cat": "perfumes",
    "cat_ar": "العطور",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "ملكي",
    "bestseller": true,
    "price": 179,
    "old_price": 480,
    "discount": "63%",
    "rating": 4.95,
    "reviews_count": 20,
    "img": "/products/NOTE_Gold_Flat_Lay.webp",
    "img_box": "/products/NOTE_Gold_Reference_Matched_v03.webp",
    "notes": "الياسمين الملكي - العنبر الذهبي - الزعفران",
    "slogan": "فخامة ملكية متجسدة في عبير ساحر يجمع نقاء الياسمين ودفء العنبر الخالص",
    "description": "توليفة ذهبية تشع بريقاً ونقاءً، تبدأ بنفحات الزعفران الثمين والبرغموت المنعش، تتفتح على باقة من الياسمين الملكي وزهر البرتقال، وتختتم بدفء العنبر والأخشاب النبيلة.",
    "top": "الزعفران الإيراني الثمين والبرغموت",
    "heart": "الياسمين الملكي وزهر البرتقال التونسي",
    "base": "العنبر الذهبي وخشب الأرز والمسك"
  },
  {
    "id": "note-musk",
    "title": "عطر مِسك نوت",
    "title_en": "NOTE MUSK",
    "cat": "perfumes",
    "cat_ar": "العطور",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "مِسك فاخر",
    "bestseller": true,
    "price": 239,
    "old_price": 920,
    "discount": "74%",
    "rating": 4.96,
    "reviews_count": 210,
    "img": "/products/NOTE_Musk_Flat_Lay.webp",
    "img_box": "/products/NOTE_Musk_With_Box_Artwork_Review_v01.webp",
    "notes": "المسك الأبيض - بودر ناعم - زهرة القطن",
    "slogan": "مِسك... أثر يُعرف قبل أن يُرى؛ النقاء المتجسد بعبير النظافة والفخامة الخالدة",
    "description": "أيقونة دار نوت وأكثر العطور مبيعاً على الإطلاق. عطر نقي يعبر عن الصفاء والجاذبية الهادئة بنفحات المسك الأبيض الفاخر ونعومة البودرة وزهور السوسن التي تدوم لأكثر من 24 ساعة.",
    "top": "المسك الأبيض وزهر القطن والكمثرى",
    "heart": "زهور السوسن والنوتات البودرية الناعمة",
    "base": "المسك الصافي وخشب الصندل والعنبر الأبيض"
  },
  {
    "id": "niche-blue",
    "title": "عطر نيش بلو",
    "title_en": "NICHE BLUE",
    "cat": "niche",
    "cat_ar": "عطور النيش",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "نيش حصري",
    "bestseller": false,
    "price": 396,
    "old_price": 1090,
    "discount": "64%",
    "rating": 5.0,
    "reviews_count": 4,
    "img": "/products/NOTE_Blue_Flat_Lay.webp",
    "img_box": "/products/01_Blue_Oud_Dark.webp",
    "notes": "البرغموت الإيطالي - نسيم البحر - خشب الأرز",
    "slogan": "انتعاش ملكي بلمسات أروماتيك منعشة تحاكي نقاء زرقة المحيطات وأفخم أنواع الأخشاب النادرة",
    "description": "تحفة عطرية من دار نوت تنتمي لعالم النيش الفاخر. يجمع بين الانتعاش البحري الراقي والنوتات الخشبية الأروماتية المركزة ليخلق حضوراً مبهراً لا يشبه أي عطر آخر.",
    "top": "البرغموت الإيطالي والماندرين ولمحات بحرية",
    "heart": "الميرمية وإبرة الراعي واللافندر",
    "base": "خشب الأرز والباتشولي والعنبر الرمادي"
  },
  {
    "id": "niche-amber",
    "title": "عطر نيش عنبر",
    "title_en": "NICHE AMBER",
    "cat": "niche",
    "cat_ar": "عطور النيش",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "نيش ملكي",
    "bestseller": false,
    "price": 396,
    "old_price": 1090,
    "discount": "64%",
    "rating": 5.0,
    "reviews_count": 5,
    "img": "/products/NOTE_Niche_Amber_Flat_Lay.webp",
    "img_box": "/products/NOTE_Amber_Musk_v01.webp",
    "notes": "العنبر الفاخر - حبوب التونكا - الفانيليا واللبان",
    "slogan": "دفء العنبر الأصيل الممزوج بأفخر أنواع اللبان العطري والتونكا لإطلالة مهيبة ودافئة",
    "description": "عطر نيش غني بالتفاصيل الشرقية الفاخرة، يجمع بين دفء العنبر الطبيعي وغموض التوابل الدافئة ونفحات البخور الملكية، ليعطي هالة من الفخامة والوقار.",
    "top": "اللبان العطري والبخور وحبوب الفلفل الوردي",
    "heart": "العنبر الراتنجي وحبوب التونكا وخشب الغاياك",
    "base": "الفانيليا المدغشقرية والجاوي وخشب الصندل"
  },
  {
    "id": "niche-oud",
    "title": "عطر نيش عود",
    "title_en": "NICHE OUD",
    "cat": "niche",
    "cat_ar": "عطور النيش",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "أضيف حديثاً",
    "bestseller": false,
    "price": 396,
    "old_price": 1090,
    "discount": "64%",
    "rating": 5.0,
    "reviews_count": 6,
    "img": "/products/NOTE_Oud_Flat_Lay.webp",
    "img_box": "/products/NOTE_Oud_v01.webp",
    "notes": "العود الهندي المعتق - الزعفران - المسك الأسود",
    "slogan": "قمة الترف الشرقي؛ قطرات نقية من دهن العود الهندي الفاخر بنقاء لا يقبل المنافسة",
    "description": "لأصحاب الذوق الاستثنائي ومحبي العود الحقيقي. تم تقطير هذا العطر من أندر أخشاب العود الطبيعية ليمنحك ثباتاً وفوحاناً يتحدث عن نفسه دون كلمات.",
    "top": "الزعفران الكشميري وخشب الورد",
    "heart": "دهن العود الهندي الصافي والباتشولي",
    "base": "المسك الأسود المعتق وخشب البتولا والجلد"
  },
  {
    "id": "niche-royal-leather",
    "title": "عطر نيش رويال ليذر",
    "title_en": "NICHE ROYAL LEATHER",
    "cat": "niche",
    "cat_ar": "عطور النيش",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "إصدار خاص",
    "bestseller": false,
    "price": 396,
    "old_price": 1090,
    "discount": "64%",
    "rating": 5.0,
    "reviews_count": 8,
    "img": "/products/NOTE_Royal_Leather_Flat_Lay.webp",
    "img_box": "/products/10_Five_Perfumes_Dark_Refined.webp",
    "notes": "الجلود الفاخرة - الزعفران - التبغ والعنبر",
    "slogan": "توليفة قوية وفريدة تجسد الهيبة والأناقة العصرية بنفحات الجلود المشبعة بأندر الزيوت العطرية",
    "description": "تعبير حقيقي عن الفخامة والجرأة. يمزج بين عبير الجلود الطبيعية ونفحات الزعفران وتوت العليق في توليفة مذهلة تفرض حضورها في أي مكان.",
    "top": "الزعفران الإسباني وتوت العليق والزعتر البري",
    "heart": "الجلود الطبيعية المعتقة والياسمين واللبان",
    "base": "العنبر الأسود والأخشاب النبيلة وخشب الأرز"
  },
  {
    "id": "aura",
    "title": "عطر أورا (Aura)",
    "title_en": "NOTE AURA",
    "cat": "new",
    "cat_ar": "أحدث المنتجات",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "إصدار جديد",
    "bestseller": false,
    "price": 189,
    "old_price": 349,
    "discount": "46%",
    "rating": 5.0,
    "reviews_count": 2,
    "img": "/products/NOTE_Aura_Flat_Lay.webp",
    "img_box": "/products/NOTE_Aura_v01.webp",
    "notes": "المانجو المنعش - الفواكه الاستوائية - المسك",
    "slogan": "عطر حيوي مشرق يجمع حلاوة المانجو الاستوائية مع رقي العطور الفرنسية والمسك الأبيض",
    "description": "انطلاقة مشرقة من البهجة والانتعاش. توليفة استوائية مبهجة تفتتح بعبير المانجو الطازجة والحمضيات الفاتنة، وتستقر على قاعدة ناعمة من المسك وخشب الصندل.",
    "top": "المانجو الاستوائية، المندرين، الحمضيات",
    "heart": "الياسمين، زهرة البابايا، الفاوانيا",
    "base": "المسك الأبيض، خشب الصندل، العنبر"
  },
  {
    "id": "powderose",
    "title": "عطر بودر روز",
    "title_en": "POWDEROSE",
    "cat": "new",
    "cat_ar": "أحدث المنتجات",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "أنثوي فاخر",
    "bestseller": true,
    "price": 189,
    "old_price": 398,
    "discount": "53%",
    "rating": 4.92,
    "reviews_count": 56,
    "img": "/products/NOTE_Powderose_Large_Flat_Lay.webp",
    "img_box": "/products/NOTE_Powderose_Large_v01.webp",
    "notes": "الورد الدمشقي - النوتات البودرية - السوسن",
    "slogan": "رقة ونعومة تأسر القلوب بلمسات الورد المخملي والبودرة الفرنسية الفاخرة",
    "description": "عطر يجسد النعومة الأبدية برائحة بودرية وردية ساحرة، تمنحك إحساساً بالنظافة والأنوثة يدوم طوال اليوم.",
    "top": "الورد الدمشقي، الليتشي، زهر الليمون",
    "heart": "بودرة السوسن، الورد التركي، الياسمين",
    "base": "المسك الأبيض، خشب الأرز، الفانيليا البودرية"
  },
  {
    "id": "attraction",
    "title": "عطر أتراكشن",
    "title_en": "ATTRACTION",
    "cat": "new",
    "cat_ar": "أحدث المنتجات",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "جاذبية مسائية",
    "bestseller": false,
    "price": 189,
    "old_price": 520,
    "discount": "64%",
    "rating": 5.0,
    "reviews_count": 21,
    "img": "/products/NOTE_Attraction_Flat_Lay.webp",
    "img_box": "/products/NOTE_Attraction_v01.webp",
    "notes": "العسل - زهر البرتقال - الكراميل والباتشولي",
    "slogan": "عطر جريء بطابع زهري سكري صُمم ليترك حضوراً ساحراً لا يُنسى في المساء والمناسبات",
    "description": "عطر الجاذبية الطاغية. مزيج مغرٍ من العسل الطبيعي وزهر البرتقال والكراميل الدافئ مع لمسات خشبية عميقة من الباتشولي.",
    "top": "البرتقال الأحمر، اليوسفي، الخوخ",
    "heart": "العسل الطبيعي، زهر البرتقال، الغاردينيا",
    "base": "شمع العسل، الكراميل، الباتشولي، عرق السوس"
  },
  {
    "id": "bn",
    "title": "عطر بي إن",
    "title_en": "NOTE BN",
    "cat": "new",
    "cat_ar": "أحدث المنتجات",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "الأكثر تميزاً",
    "bestseller": false,
    "price": 179,
    "old_price": 389,
    "discount": "54%",
    "rating": 5.0,
    "reviews_count": 10,
    "img": "/products/NOTE_BN_Flat_Lay.webp",
    "img_box": "/products/NOTE_BN_v01.webp",
    "notes": "الفانيليا السوداء - التوابل الدافئة - التونكا",
    "slogan": "عطر فريد يعكس الشخصية الواثقة بلمسات الفانيليا الغنية والتوابل العطرية الراقية",
    "description": "تركيبة حديثة متفردة تجمع بين حدة الفلفل الأسود ودفء التونكا والفانيليا السوداء الغنية في زجاجة واحدة تعبر عن الفخامة.",
    "top": "الفلفل الأسود، البرغموت، الهيل",
    "heart": "حبوب التونكا، جوزة الطيب، القرفة",
    "base": "الفانيليا السوداء، خشب الغاياك، التبغ الخفيف"
  },
  {
    "id": "musk-bukhor",
    "title": "عطر مسك بخور",
    "title_en": "MUSK BUKHOR",
    "cat": "new",
    "cat_ar": "أحدث المنتجات",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "ثبات ممتد",
    "bestseller": false,
    "price": 189,
    "old_price": 420,
    "discount": "55%",
    "rating": 4.88,
    "reviews_count": 8,
    "img": "/products/NOTE_Musk_Bukhor_Flat_Lay.webp",
    "img_box": "/products/NOTE_Musk_Bukhor_Typography_Incomplete_v02.webp",
    "notes": "المسك الملكي - نفحات البخور - أخشاب الصندل",
    "slogan": "امتزاج استثنائي بين نعومة المسك الفاخر وأصالة البخور الشرقي العريق لثبات يدوم طويلاً",
    "description": "التوليفة المفضلة للمجالس والمناسبات الخليجية، تجمع بين نقاء المسك الأبيض وأثر البخور الشرقي المهيب.",
    "top": "اللبان العطري، الليمون، المسك البارد",
    "heart": "البخور المعتق، خشب الصندل، الورد الطائفي",
    "base": "المسك الملكي، خشب الأرز، العنبر الجاف"
  },
  {
    "id": "royal-powder",
    "title": "عطر رويال باودر",
    "title_en": "ROYAL POWDER",
    "cat": "new",
    "cat_ar": "أحدث المنتجات",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "نعومة فائقة",
    "bestseller": false,
    "price": 199,
    "old_price": 389,
    "discount": "49%",
    "rating": 5.0,
    "reviews_count": 20,
    "img": "/products/NOTE_Royal_Powder_Flat_Lay.webp",
    "img_box": "/products/NOTE_Musk_With_Box_Artwork_Review_v01.webp",
    "notes": "بودرة السوسن - الفانيليا - خشب الصندل",
    "slogan": "إحساس مفعم بالنظافة والترف برائحة البودرة الكلاسيكية الفاخرة ولمسات الأخشاب الدافئة",
    "description": "تجربة حسية غاية في الرقة والنظافة الملكية، تنساب كنسمة هواء ربيعية ناعمة تضفي لمسة من البراءة والأناقة.",
    "top": "الورد، اليلانغ يلانغ، زهر البرتقال",
    "heart": "زهور السوسن، البنفسج، بودرة الأرز",
    "base": "المسك الأبيض، خشب الصندل، الفانيليا المخملية"
  },
  {
    "id": "lady-rose",
    "title": "عطر ليدي روز",
    "title_en": "LADY ROSE",
    "cat": "perfumes",
    "cat_ar": "العطور",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "رومانسي فاخر",
    "bestseller": false,
    "price": 189,
    "old_price": 420,
    "discount": "55%",
    "rating": 4.9,
    "reviews_count": 18,
    "img": "/products/NOTE_Lady_Rose_Flat_Lay.webp",
    "img_box": "/products/NOTE_Lady_Rose_v01.webp",
    "notes": "الورد الجوري - الياسمين - الفانيليا والمسك",
    "slogan": "عبير الورود الجورية المقطوفة في الصباح الباكر مع نفحات الياسمين الساحر",
    "description": "عطر أنثوي كلاسيكي يتغنى بالجمال والأناقة، مصمم للمرأة التي تعشق الورود الجورية وأريج الزهور البيضاء.",
    "top": "التوت الأحمر، البرغموت، الفلفل الوردي",
    "heart": "الورد الجوري الدمشقي، الياسمين، الغاردينيا",
    "base": "المسك الأبيض، الفانيليا، خشب الصندل"
  },
  {
    "id": "sugar-oud",
    "title": "عطر شوجر عود",
    "title_en": "SUGAR OUD",
    "cat": "perfumes",
    "cat_ar": "العطور",
    "size": "100 مل",
    "concentration": "Extrait de Parfum",
    "tag": "حلو دافئ",
    "bestseller": false,
    "price": 189,
    "old_price": 420,
    "discount": "55%",
    "rating": 4.86,
    "reviews_count": 12,
    "img": "/products/NOTE_Sugar_Oud_Flat_Lay.webp",
    "img_box": "/products/NOTE_Sugar_Oud_v01.webp",
    "notes": "العود الحلو - السكر المكرمل - الفانيليا",
    "slogan": "مزيج عصري مبتكر يجمع بين فخامة العود الشرقي وحلاوة السكر والكراميل الساحر",
    "description": "عطر شرقي بطابع حديث ولذيذ، يكسر حدة العود بحلاوة الكراميل والسكر المكرمل ليخلق توليفة آسرة ومحبوبة جداً.",
    "top": "السكر المحروق، البرغموت، القرفة",
    "heart": "العود الشرقي، الكراميل، حبوب التونكا",
    "base": "الفانيليا، الباتشولي، العنبر الدافئ"
  },
  {
    "id": "royal-tobacco-30ml",
    "title": "عطر رويال توباكو (30 مل)",
    "title_en": "ROYAL TOBACCO 30ML",
    "cat": "travel",
    "cat_ar": "عطور 30 مل",
    "size": "30 مل",
    "concentration": "Extrait de Parfum",
    "tag": "حجم السفر",
    "bestseller": false,
    "price": 99,
    "old_price": 180,
    "discount": "45%",
    "rating": 4.9,
    "reviews_count": 45,
    "img": "/products/NOTE_Royal_Tobacco_30ml_Flat_Lay.webp",
    "img_box": "/products/03_30ml_Trio_Dark.webp",
    "notes": "خشب التبغ - زيت القرنفل - الفانيليا",
    "slogan": "حجم مثالي لحقيبتك وسفرك؛ عطر رويال توباكو الأيقوني في عبوة أنيقة بسعة 30 مل",
    "description": "نفس تركيز وثبات رويال توباكو الأصلي بحجم مدمج يرافقك في حلك وترحالك ومناسب للهدايا والتجربة.",
    "top": "زيت القرنفل والبرتقال",
    "heart": "الكستناء وخشب الغاياك",
    "base": "الفانيليا والتبغ والكشمير"
  },
  {
    "id": "for-him-30ml",
    "title": "عطر نوت فور هِم (30 مل)",
    "title_en": "NOTE FOR HIM 30ML",
    "cat": "travel",
    "cat_ar": "عطور 30 مل",
    "size": "30 مل",
    "concentration": "Extrait de Parfum",
    "tag": "حجم السفر",
    "bestseller": false,
    "price": 89,
    "old_price": 160,
    "discount": "44%",
    "rating": 4.88,
    "reviews_count": 32,
    "img": "/products/NOTE_For_Him_30ml_Flat_Lay.webp",
    "img_box": "/products/03_30ml_Trio_Dark.webp",
    "notes": "الهيل - الجلود - اللافندر",
    "slogan": "عطر نوت فور هِم الشهير بحجم 30 مل مثالي للسيارة والعمل والسفر اليومي",
    "description": "ثبات وأناقة ترافقك طوال اليوم في عبوة صغيرة عملية لا تشغل حيزاً.",
    "top": "الهيل والليمون",
    "heart": "اللافندر والميرمية",
    "base": "الجلود وخشب الصندل"
  },
  {
    "id": "for-her-30ml",
    "title": "عطر نوت فور هير (30 مل)",
    "title_en": "NOTE FOR HER 30ML",
    "cat": "travel",
    "cat_ar": "عطور 30 مل",
    "size": "30 مل",
    "concentration": "Extrait de Parfum",
    "tag": "حجم السفر",
    "bestseller": false,
    "price": 89,
    "old_price": 160,
    "discount": "44%",
    "rating": 4.9,
    "reviews_count": 28,
    "img": "/products/NOTE_For_Her_30ml_Flat_Lay.webp",
    "img_box": "/products/11_For_Her_Packaging_Dark_Print_Review.webp",
    "notes": "الورد - الفاوانيا - الفانيليا البيضاء",
    "slogan": "نعومة الورد والفاوانيا في عبوة حقيبة يد أنيقة بحجم 30 مل لتجديد انتعاشك في أي وقت",
    "description": "الحجم المفضل للسيدات في حقيبة اليد لإإطلالة زهرية متجددة طوال اليوم.",
    "top": "المندرين والليتشي",
    "heart": "الورد والفاوانيا",
    "base": "الفانيليا والمسك الأبيض"
  },
  {
    "id": "oud-rosewood-30ml",
    "title": "عطر عود روز وود (30 مل)",
    "title_en": "OUD ROSEWOOD 30ML",
    "cat": "travel",
    "cat_ar": "عطور 30 مل",
    "size": "30 مل",
    "concentration": "Extrait de Parfum",
    "tag": "حجم السفر",
    "bestseller": false,
    "price": 89,
    "old_price": 160,
    "discount": "44%",
    "rating": 4.85,
    "reviews_count": 19,
    "img": "/products/NOTE_Oud_Rosewood_30ml_Flat_Lay.webp",
    "img_box": "/products/03_30ml_Trio_Dark.webp",
    "notes": "العود - خشب الورد - الباتشولي",
    "slogan": "فخامة العود وخشب الورد بحجم عملي 30 مل يمنحك التميز أينما حللت",
    "description": "تركيبة العود المعتق المحبوبة بحجم سفر أنيق ومريح للاستخدام اليومي.",
    "top": "خشب الورد والتوت البري",
    "heart": "العود والباتشولي",
    "base": "العنبر والمسك"
  },
  {
    "id": "powderose-30ml",
    "title": "عطر بودر روز (30 مل)",
    "title_en": "POWDEROSE 30ML",
    "cat": "travel",
    "cat_ar": "عطور 30 مل",
    "size": "30 مل",
    "concentration": "Extrait de Parfum",
    "tag": "حجم السفر",
    "bestseller": false,
    "price": 89,
    "old_price": 160,
    "discount": "44%",
    "rating": 4.92,
    "reviews_count": 22,
    "img": "/products/NOTE_Powderose_30ml_Flat_Lay.webp",
    "img_box": "/products/03_30ml_Trio_Dark.webp",
    "notes": "الورد - البودرة - السوسن",
    "slogan": "انتعاش النظافة البودرية والورد بحجم 30 مل يرافقك طوال اليوم بنعومة فائقة",
    "description": "عبوة صغيرة بنفحات البودرة والورد المنعشة، مثالية كهدية راقية أو للتنقل اليومي.",
    "top": "الورد الدمشقي والليتشي",
    "heart": "بودرة السوسن والياسمين",
    "base": "المسك الأبيض والفانيليا"
  },
  {
    "id": "all-over-royal-tobacco",
    "title": "معطر للجسم بالكامل رويال توباكو",
    "title_en": "ALL OVER SPRAY ROYAL TOBACCO",
    "cat": "all-over",
    "cat_ar": "معطر للجسم بالكامل",
    "size": "250 مل",
    "concentration": "Body Mist",
    "tag": "الأكثر طلباً",
    "bestseller": true,
    "price": 99,
    "old_price": 190,
    "discount": "48%",
    "rating": 5.0,
    "reviews_count": 4,
    "img": "/products/NOTE_Royal_Tobacco_All_Over_Flat_Lay.webp",
    "img_box": "/products/05_All_Over_Trio_Dark_Typography_Review.webp",
    "notes": "رويال توباكو - رذاذ خفيف للجسم والشعر",
    "slogan": "رذاذ فاخر لكامل الجسم والشعر مستوحى من نغمات رويال توباكو الدافئة",
    "description": "معطر شامل غني بالفيتامينات المرطبة والزيوت العطرية الخفيفة التي تمنح كامل جسدك وشعرك عبقاً ملكياً يدوم طويلاً دون أن يترك أي أثر دهني.",
    "top": "البرتقال وزيت القرنفل",
    "heart": "الكستناء وخشب الغاياك",
    "base": "الفانيليا والتبغ والمسك"
  },
  {
    "id": "all-over-powderose",
    "title": "معطر للجسم بالكامل بودر روز",
    "title_en": "ALL OVER SPRAY POWDEROSE",
    "cat": "all-over",
    "cat_ar": "معطر للجسم بالكامل",
    "size": "250 مل",
    "concentration": "Body Mist",
    "tag": "نعومة للجسم",
    "bestseller": false,
    "price": 99,
    "old_price": 190,
    "discount": "48%",
    "rating": 5.0,
    "reviews_count": 10,
    "img": "/products/NOTE_Powderose_All_Over_Flat_Lay.webp",
    "img_box": "/products/05_All_Over_Trio_Dark_Typography_Review.webp",
    "notes": "الورد - البودرة - انتعاش يدوم",
    "slogan": "رذاذ منعش برائحة الورد والبودرة يمنح الجسم نعومة وإحساساً فورياً بالنظافة والانتعاش",
    "description": "مثالي بعد الاستحمام لتثبيت الرائحة على كامل الجسم ومنح البشرة ترطيباً خفيفاً وعبقاً فائق الرقة.",
    "top": "الورد والليمون المنعش",
    "heart": "بودرة السوسن والياسمين",
    "base": "المسك الأبيض والفانيليا"
  },
  {
    "id": "all-over-choconilla",
    "title": "معطر للجسم شوكونيلا",
    "title_en": "ALL OVER SPRAY CHOCONILLA",
    "cat": "all-over",
    "cat_ar": "معطر للجسم بالكامل",
    "size": "250 مل",
    "concentration": "Body Mist",
    "tag": "أضيف حديثاً",
    "bestseller": false,
    "price": 99,
    "old_price": 190,
    "discount": "48%",
    "rating": 4.73,
    "reviews_count": 11,
    "img": "/products/NOTE_Choconilla_All_Over_Flat_Lay.webp",
    "img_box": "/products/05_All_Over_Trio_Dark_Typography_Review.webp",
    "notes": "الشوكولاتة السويسرية - الفانيليا - الكراميل",
    "slogan": "عبير شهي يفيض بدفء الشوكولاتة الفاخرة والفانيليا الغنية لإحساس بالدفء والبهجة",
    "description": "توليفة شهية ولذيذة لكامل الجسم تمنحك رائحة لا تُقاوم من الشوكولاتة والكراميل والفانيليا.",
    "top": "الكاكاو وحبوب القهوة",
    "heart": "الشوكولاتة البلجيكية والكراميل",
    "base": "الفانيليا وحبوب التونكا والمسك"
  },
  {
    "id": "all-over-asal",
    "title": "معطر للجسم عسل (Asal)",
    "title_en": "ALL OVER SPRAY ASAL",
    "cat": "all-over",
    "cat_ar": "معطر للجسم بالكامل",
    "size": "250 مل",
    "concentration": "Body Mist",
    "tag": "عسل نقي",
    "bestseller": false,
    "price": 99,
    "old_price": 190,
    "discount": "48%",
    "rating": 4.9,
    "reviews_count": 7,
    "img": "/products/NOTE_Asal_All_Over_Flat_Lay.webp",
    "img_box": "/products/05_All_Over_Trio_Dark_Typography_Review.webp",
    "notes": "العسل الطبيعي - زهر البرتقال - العنبر",
    "slogan": "رذاذ حالم برائحة العسل الدافئ وزهر البرتقال يغمر حواسك بحلاوة استثنائية ونعومة",
    "description": "رذاذ عطري مميز يجمع حلاوة العسل الصافي مع زهور الربيع البيضاء ليضفي إشراقة ساحرة.",
    "top": "البرتقال والعسل الصافي",
    "heart": "زهر البرتقال والغاردينيا",
    "base": "العنبر الدافئ وشمع العسل"
  },
  {
    "id": "all-over-bahr",
    "title": "معطر للجسم بحر (Bahr)",
    "title_en": "ALL OVER SPRAY BAHR",
    "cat": "all-over",
    "cat_ar": "معطر للجسم بالكامل",
    "size": "250 مل",
    "concentration": "Body Mist",
    "tag": "كمية محدودة",
    "bestseller": false,
    "price": 99,
    "old_price": 190,
    "discount": "48%",
    "rating": 4.75,
    "reviews_count": 4,
    "img": "/products/NOTE_Bahr_All_Over_Flat_Lay.webp",
    "img_box": "/products/05_All_Over_Trio_Dark_Typography_Review.webp",
    "notes": "نسيم البحر المنعش - الحمضيات - الأخشاب البيضاء",
    "slogan": "انتعاش صيفي لا حدود له يحاكي أمواج البحر ونسيمه العليل مع رذاذ خفيف للجسم",
    "description": "رذاذ الجسم المنعش برائحة البحر والحمضيات الفاتنة، يمنحك طاقة وحيوية فورية في الأيام الدافئة.",
    "top": "الأمواج البحرية، الليمون، البرغموت",
    "heart": "اللوتس المائي والريحان",
    "base": "الأخشاب البيضاء والمسك البارد"
  },
  {
    "id": "all-over-note-tuffi",
    "title": "معطر للجسم نوت توفي",
    "title_en": "ALL OVER SPRAY NOTE TUFFI",
    "cat": "all-over",
    "cat_ar": "معطر للجسم بالكامل",
    "size": "250 مل",
    "concentration": "Body Mist",
    "tag": "أضيف حديثاً",
    "bestseller": false,
    "price": 99,
    "old_price": 190,
    "discount": "48%",
    "rating": 4.94,
    "reviews_count": 18,
    "img": "/products/NOTE_Note_Tuffi_All_Over_Flat_Lay.webp",
    "img_box": "/products/05_All_Over_Trio_Dark_Typography_Review.webp",
    "notes": "التوفي المكرمل - الفانيليا - المسك السكري",
    "slogan": "حلاوة التوفي الشهي الممزوج بنعومة الفانيليا والمسك في رذاذ يومي لا يُقاوم",
    "description": "عطر يومي للجسم برائحة التوفي الغنية التي تجعل كل لحظة مفعمة بالبهجة والدلال.",
    "top": "حلوى التوفي المكرملة والزبدة الفاخرة",
    "heart": "الفانيليا والكراميل الدافئ",
    "base": "المسك السكري وخشب الأرز"
  },
  {
    "id": "linen-royal-tobacco",
    "title": "معطر مفارش رويال توباكو",
    "title_en": "LINEN SPRAY ROYAL TOBACCO",
    "cat": "linen",
    "cat_ar": "معطرات جو وجسم",
    "size": "500 مل",
    "concentration": "Linen & Room Mist",
    "tag": "ثبات عالي",
    "bestseller": false,
    "price": 99,
    "old_price": 190,
    "discount": "48%",
    "rating": 4.9,
    "reviews_count": 15,
    "img": "/products/NOTE_Royal_Tobacco_Linen_Spray_Flat_Lay.webp",
    "img_box": "/products/06_Linen_Spray_Trio_Dark.webp",
    "notes": "رويال توباكو - ثبات يدوم طويلاً على المفارش",
    "slogan": "امنح منزلك ومفارشك عبق الفخامة والضيافة الملكية بنفحات رويال توباكو الدافئة",
    "description": "تركيبة خاصة لا تترك أي بقع على الأقمشة، تثبت لأيام على المفارش والستائر والمجالس الفاخرة.",
    "top": "زيت القرنفل والبرتقال",
    "heart": "الكستناء وخشب الغاياك",
    "base": "الفانيليا والتبغ والعنبر"
  },
  {
    "id": "linen-oud-rosewood",
    "title": "معطر مفارش عود روز وود",
    "title_en": "LINEN SPRAY OUD ROSEWOOD",
    "cat": "linen",
    "cat_ar": "معطرات جو وجسم",
    "size": "500 مل",
    "concentration": "Linen & Room Mist",
    "tag": "فخامة للمنزل",
    "bestseller": false,
    "price": 99,
    "old_price": 190,
    "discount": "48%",
    "rating": 4.88,
    "reviews_count": 12,
    "img": "/products/NOTE_Oud_Rosewood_Linen_Spray_Flat_Lay.webp",
    "img_box": "/products/06_Linen_Spray_Trio_Dark.webp",
    "notes": "العود - خشب الورد - مناسب للمجالس",
    "slogan": "أجواء شرقية راقية تعبق بالعود وخشب الورد لتعطير غرف النوم والمجالس الفخمة",
    "description": "يعزز جو الضيافة الشرقية بنفحات أصيلة من خشب الورد والعود والباتشولي.",
    "top": "خشب الورد والتوت",
    "heart": "العود والباتشولي",
    "base": "العنبر والمسك"
  },
  {
    "id": "linen-powderose",
    "title": "معطر مفارش بودر روز",
    "title_en": "LINEN SPRAY POWDEROSE",
    "cat": "linen",
    "cat_ar": "معطرات جو وجسم",
    "size": "500 مل",
    "concentration": "Linen & Room Mist",
    "tag": "نظافة وراحة",
    "bestseller": false,
    "price": 99,
    "old_price": 190,
    "discount": "48%",
    "rating": 4.95,
    "reviews_count": 23,
    "img": "/products/NOTE_Powderose_Linen_Spray_Flat_Lay.webp",
    "img_box": "/products/06_Linen_Spray_Trio_Dark.webp",
    "notes": "البودرة - الورد - لنوم هادئ ومنعش",
    "slogan": "نظافة وانتعاش فندقي ساحر لمفارش السرير برائحة البودرة المخملية والورد الدمشقي",
    "description": "المعطر المثالي لغرف النوم ومفارش السرير، يمنحك شعوراً فورياً بالاسترخاء والنظافة.",
    "top": "الورد والليتشي",
    "heart": "بودرة السوسن والياسمين",
    "base": "المسك الأبيض"
  },
  {
    "id": "shower-gel",
    "title": "جل الاستحمام الفاخر نوت",
    "title_en": "NOTE LUXURY SHOWER GEL",
    "cat": "body-care",
    "cat_ar": "منتجات العناية",
    "size": "300 مل",
    "concentration": "Body Wash",
    "tag": "عناية فائقة",
    "bestseller": false,
    "price": 79,
    "old_price": 150,
    "discount": "47%",
    "rating": 4.9,
    "reviews_count": 16,
    "img": "/products/NOTE_Shower_Gel_Flat_Lay.webp",
    "img_box": "/products/07_Body_Care_Duo_Dark.webp",
    "notes": "رغوة غنية - ترطيب البشرة - عطر يدوم",
    "slogan": "تجربة استحمام ملكية تنظف البشرة بلطف وتغذيها بعبير عطور نوت الفاخرة",
    "description": "جل استحمام غني بمضادات الأكسدة والمكونات المرطبة للبشرة، ينظف بعمق دون أن يسبب جفافاً ويترك رائحة آسرة تدوم لساعات.",
    "top": "البرغموت وزهر البرتقال",
    "heart": "الياسمين واللافندر",
    "base": "المسك الأبيض وخشب الصندل"
  },
  {
    "id": "hyaluronic-moisturizer",
    "title": "لوشن مرطب الجسم بالهيالورونيك",
    "title_en": "HYALURONIC BODY LOTION",
    "cat": "body-care",
    "cat_ar": "منتجات العناية",
    "size": "250 مل",
    "concentration": "Moisturizer",
    "tag": "ترطيب عميق",
    "bestseller": false,
    "price": 89,
    "old_price": 170,
    "discount": "48%",
    "rating": 4.95,
    "reviews_count": 19,
    "img": "/products/NOTE_Hyaluronic_Moisturizer_Flat_Lay.webp",
    "img_box": "/products/07_Body_Care_Duo_Dark.webp",
    "notes": "حمض الهيالورونيك - ترطيب مضاعف - ملمس حريري",
    "slogan": "ترطيب عميق يحبس الرطوبة في البشرة بفضل حمض الهيالورونيك المعزز بنفحات عطرية ساحرة",
    "description": "لوشن فاخر سريع الامتصاص، يمنح البشرة ملمساً ناعماً كالحرير ونضارة فورية مع عطر راقٍ يدوم طويلاً.",
    "top": "حمض الهيالورونيك والصبار النقي",
    "heart": "زيت الجوجوبا وزبدة الشيا والورد",
    "base": "المسك الأبيض وفيتامين E"
  },
  {
    "id": "pure-tuffi",
    "title": "تولة بيور توفي",
    "title_en": "PURE TUFFI CONCENTRATED OIL",
    "cat": "tollah",
    "cat_ar": "تولات",
    "size": "ربع تولة (3 مل)",
    "concentration": "Pure Perfume Oil",
    "tag": "زيت عطري نقي",
    "bestseller": false,
    "price": 79,
    "old_price": 150,
    "discount": "47%",
    "rating": 4.95,
    "reviews_count": 24,
    "img": "/products/NOTE_Pure_Tuffi_Flat_Lay.webp",
    "img_box": "/products/04_Oil_Trio_Dark.webp",
    "notes": "توفي مكرمل - فانيليا - ثبات نقاط النبض",
    "slogan": "دهن عطري مركّز بنقاء 100% يوضع على نقاط النبض لثبات يدوم لأيام برائحة التوفي الشهي",
    "description": "زيت عطري خالص خالٍ من الكحول، يوضع على المعصمين والرقبة ليمنحك فوحاناً دافئاً وجذاباً.",
    "top": "الكراميل وحلوى التوفي",
    "heart": "الفانيليا وزهرة العسل",
    "base": "المسك الأبيض والجاوي"
  },
  {
    "id": "amber-musk-oil",
    "title": "تولة عنبر مِسك",
    "title_en": "AMBER MUSK CONCENTRATED OIL",
    "cat": "tollah",
    "cat_ar": "تولات",
    "size": "ربع تولة (3 مل)",
    "concentration": "Pure Perfume Oil",
    "tag": "زيت عطري نقي",
    "bestseller": false,
    "price": 79,
    "old_price": 150,
    "discount": "47%",
    "rating": 4.92,
    "reviews_count": 18,
    "img": "/products/NOTE_Amber_Musk_Flat_Lay.webp",
    "img_box": "/products/04_Oil_Trio_Dark.webp",
    "notes": "العنبر النقي - المسك الأبيض الخالص",
    "slogan": "توليفة تقليدية أصيلة تجمع دفء العنبر الفاخر ونقاء المسك الأبيض على نقاط النبض",
    "description": "زيت عطري فاخر جداً يعبر عن الأصالة والفخامة الشرقية بثبات استثنائي.",
    "top": "العنبر الذهبي والزعفران",
    "heart": "المسك الأبيض والورد",
    "base": "خشب الصندل واللبان"
  },
  {
    "id": "musk-toffee-oil",
    "title": "تولة مِسك توفي",
    "title_en": "MUSK TOFFEE CONCENTRATED OIL",
    "cat": "tollah",
    "cat_ar": "تولات",
    "size": "ربع تولة (3 مل)",
    "concentration": "Pure Perfume Oil",
    "tag": "زيت عطري نقي",
    "bestseller": false,
    "price": 79,
    "old_price": 150,
    "discount": "47%",
    "rating": 4.96,
    "reviews_count": 22,
    "img": "/products/NOTE_Musk_Toffee_Flat_Lay.webp",
    "img_box": "/products/09_Four_Oils_Dark_Name_Review.webp",
    "notes": "المسك الأبيض - التوفي - حلاوة ناعمة",
    "slogan": "أجمل مزيج بين النقاء المطلق وحلاوة التوفي الشهي في دهن عطري ساحر",
    "description": "تركيبة تجمع نعومة المسك المحبوبة ونكهة التوفي اللذيذة لتمنحك رائحة فريدة لا تُقاوم.",
    "top": "المسك البارد وحلوى التوفي",
    "heart": "الفانيليا والبودرة",
    "base": "المسك الأبيض وخشب الأرز"
  },
  {
      "id": "pkg-royal-tobacco",
      "title": "باقة رويال توباكو الفاخرة",
      "title_en": "ROYAL TOBACCO PACKAGE",
      "cat": "packages",
      "cat_ar": "مجموعات وباقات نوت",
      "size": "عطر 100 مل + معطر جسم 250 مل",
      "concentration": "Duo Package",
      "tag": "الأكثر طلباً",
      "bestseller": true,
      "price": 279,
      "old_price": 398,
      "discount": "30%",
      "rating": 4.95,
      "reviews_count": 52,
      "img": "/products/01_Royal_Tobacco_White_Flatlay.webp",
      "img_box": "/products/NOTE_Royal_Tobacco_With_Box_Reference_Matched_v01.webp",
      "notes": "عطر رويال توباكو 100 مل + معطر جسم رويال توباكو",
      "slogan": "ثنائية الفخامة والدفء الشتوي؛ عطر رويال توباكو المركز مع معطر الجسم المتناغم",
      "description": "تتضمن الباقة: عطر رويال توباكو 100 مل المركز بنفحات التبغ والقرنفل والفانيليا، مع معطر الجسم والشعر رويال توباكو لثبات مضاعف يدوم طوال اليوم.",
      "top": "زيت القرنفل النقي، الفلفل الوردي، زهرة البرتقال",
      "heart": "الكستناء المحمصة، خشب الغاياك، العرعر",
      "base": "الفانيليا المدخنة، بلسم بيرو، خشب التبغ والكشمير"
  },
  {
      "id": "pkg-powderose",
      "title": "باقة باودروز المتكاملة",
      "title_en": "POWDEROSE PACKAGE",
      "cat": "packages",
      "cat_ar": "مجموعات وباقات نوت",
      "size": "عطران 100 مل + معطر جسم",
      "concentration": "Trio Package",
      "tag": "ثلاثية الأنوثة",
      "bestseller": true,
      "price": 299,
      "old_price": 647,
      "discount": "54%",
      "rating": 4.98,
      "reviews_count": 48,
      "img": "/products/02_Powderose_White_Flatlay.webp",
      "img_box": "/products/08_Musk_Bundles_No_Overlay_Text_Artwork_Review.webp",
      "notes": "عطر باودروز 100 مل + معطر جسم باودروز + عطر رويال باودر 100 مل",
      "slogan": "توليفة البودرة والورد الساحرة؛ باقة أنثوية ناعمة تأسرك بنقائها المخملي الفائق",
      "description": "تتضمن الباقة: عطر باودروز 100 مل + معطر الجسم والشعر باودروز + عطر رويال باودر 100 مل. ثلاثية استثنائية لعشاق النفحات البودرية والورد الملكي.",
      "top": "الورد الفرنسي، بودرة السوسن، زهر اللوز",
      "heart": "المسك الأبيض، البنفسج الناعم، الماغنوليا",
      "base": "خشب الأرز، حبوب التونكا، خشب الصندل والمسك الصافي"
  },
  {
      "id": "pkg-summer-escape",
      "title": "باقة سمر إسكيب الصيفية",
      "title_en": "SUMMER ESCAPE PACKAGE",
      "cat": "packages",
      "cat_ar": "مجموعات وباقات نوت",
      "size": "عطر 100 مل + 2 معطر جسم",
      "concentration": "Fresh Trio",
      "tag": "انتعاش الصيف",
      "bestseller": true,
      "price": 279,
      "old_price": 547,
      "discount": "49%",
      "rating": 4.92,
      "reviews_count": 36,
      "img": "/products/03_Summer_Escape_White_Flatlay.webp",
      "img_box": "/products/10_Five_Perfumes_Widescreen_Banner.webp",
      "notes": "عطر نوت قولد 100 مل + معطر جسم عسل + معطر جسم بحر",
      "slogan": "انتعاش نسائم البحر وحلاوة العسل مع إشراقة الذهب؛ باقة الصيف الأكثر حيوية ونضارة",
      "description": "تتضمن الباقة: عطر نوت قولد 100 مل مع معطر جسم عسل ومعطر جسم بحر. مزيج متناغم بين الانتعاش البحري البارد ونعومة نفحات العسل الذهبية.",
      "top": "نسيم البحر البارد، الماندرين الإيطالي، نكتار العسل",
      "heart": "الياسمين المائي، زهور اللوتس، العنبر الشفاف",
      "base": "المسك الأبيض، خشب الصندل، أخشاب الشاطئ العطرية"
  },
  {
      "id": "pkg-her-signature",
      "title": "باقة هير سغنتشر النسائية",
      "title_en": "HER SIGNATURE PACKAGE",
      "cat": "packages",
      "cat_ar": "مجموعات وباقات نوت",
      "size": "عطران 100 مل + تولة مسك",
      "concentration": "Women Signature",
      "tag": "توقيع الأنوثة",
      "bestseller": true,
      "price": 299,
      "old_price": 597,
      "discount": "50%",
      "rating": 4.96,
      "reviews_count": 61,
      "img": "/products/04_Her_Signature_White_Flatlay.webp",
      "img_box": "/products/11_For_Her_Packaging_Dark_Print_Review.webp",
      "notes": "تولة ليدي روز + عطر أتراكشن 100 مل + عطر نوت فور هير 100 مل",
      "slogan": "توقيع المرأة الأنيقة؛ باقة تجمع بين جاذبية أتراكشن وأنوثة فور هير ورقة تولة ليدي روز",
      "description": "تتضمن الباقة: تولة دهن ليدي روز النقي + عطر أتراكشن 100 مل + عطر نوت فور هير 100 مل. ثلاثية الأناقة المطلقة والجاذبية التي لا تُنسى.",
      "top": "الفواكه الحمراء، الورد البلغاري، الكشمش الأسود",
      "heart": "الفاوانيا، زهرة الفانيليا، السوسن الأبيض",
      "base": "المسك الأبيض، العنبر الكريمي، خشب الصندل"
  },
  {
      "id": "pkg-mens-signature",
      "title": "باقة مِنز سغنتشر الرجالية الفاخرة",
      "title_en": "MEN'S SIGNATURE PACKAGE",
      "cat": "packages",
      "cat_ar": "مجموعات وباقات نوت",
      "size": "3 عطور 100 مل + تولة شوجر عود",
      "concentration": "Grand Men Quartet",
      "tag": "رباعي الفخامة الرجالية",
      "bestseller": true,
      "price": 349,
      "old_price": 846,
      "discount": "59%",
      "rating": 4.99,
      "reviews_count": 79,
      "img": "/products/05_Mens_Signature_White_Flatlay.webp",
      "img_box": "/products/10_Five_Perfumes_Dark_Refined.webp",
      "notes": "فانتوم 100 مل + رويال توباكو 100 مل + فور هِم 100 مل + تولة شوجر عود",
      "slogan": "الرباعي الرجالي المتكامل؛ أربعة إصدارات أسطورية تمنحك الحضور والمهابة في كل المناسبات",
      "description": "تتضمن الباقة: عطر فانتوم 100 مل + عطر رويال توباكو 100 مل + عطر فور هِم 100 مل + تولة دهن شوجر عود الفاخر. الباقة الأقوى والأوفر للرجل الباحث عن التميز الكامل.",
      "top": "الهيل الغواتيمالي، زيت القرنفل، البرغموت والجلود",
      "heart": "الكستناء، اللافندر الفرنسي، أخشاب التبغ",
      "base": "العود المعتق، العنبر المدخن، الفانيليا وشوجر عود النقي"
  },
  {
      "id": "pkg-night-signature",
      "title": "باقة نايت سغنتشر الليلية",
      "title_en": "NIGHT SIGNATURE PACKAGE",
      "cat": "packages",
      "cat_ar": "مجموعات وباقات نوت",
      "size": "3 عطور نيش 100 مل",
      "concentration": "Extrait de Parfum Trio",
      "tag": "سهرات ملكية",
      "bestseller": true,
      "price": 349,
      "old_price": 747,
      "discount": "53%",
      "rating": 4.97,
      "reviews_count": 55,
      "img": "/products/06_Night_Signature_White_Flatlay.webp",
      "img_box": "/products/02_Large_Perfume_Trio_Dark.webp",
      "notes": "عطر فانتوم 100 مل + عطر مسك بخور 100 مل + عطر عود روز وود 100 مل",
      "slogan": "ثلاثية الليالي الملكية؛ فخامة العود الشرقي وسحر البخور وهيبة فانتوم لأمسيات لا تُنسى",
      "description": "تتضمن الباقة: عطر فانتوم 100 مل + عطر مسك بخور 100 مل + عطر عود روز وود 100 مل. تشكيلة ليلية ثقيلة وفواحة تلائم المناسبات الكبرى والاحتفالات.",
      "top": "البخور الملكي، خشب الورد، التوابل الدافئة",
      "heart": "العود الكمبودي، دهن الورد، الجلود الفاخرة",
      "base": "المسك الأسود، العنبر الجاف، أخشاب الأرز المعتقة"
  },
  {
      "id": "pkg-tolah-collection",
      "title": "مجموعة التولات الخاصة (اختر أي 3 تولات)",
      "title_en": "TOLAH COLLECTION (ANY 3 TOLLAHS)",
      "cat": "packages",
      "cat_ar": "مجموعات وباقات نوت",
      "size": "3 × نصف تولة مركزة",
      "concentration": "Pure Perfume Oil",
      "tag": "توفير استثنائي",
      "bestseller": false,
      "price": 199,
      "old_price": 297,
      "discount": "33%",
      "rating": 4.94,
      "reviews_count": 42,
      "img": "/products/07_Tollah_Collection_White_Flatlay.webp",
      "img_box": "/products/04_Oil_Trio_Dark.webp",
      "notes": "اختر أي 3 تولات من دهن المسك والعود الملكي النقي",
      "slogan": "أصالة المسك والدهن النقي؛ اختر تولاتك المفضلة بثبات خيالي يرافقك لأيام",
      "description": "تتيح لك الباقة اختيار أي 3 تولات من تشكيلة دهن العود والمسك النقي (شوجر عود، ليدي روز، مسك توفي، وغيرها) بنقاء 100% وبسعر توفيري مذهل.",
      "top": "المسك البارد، قطرات الورد الطبيعي، حلوى التوفي",
      "heart": "دهن العود الصافي، السوسن الأبيض، العنبر",
      "base": "المسك الخام، خشب الصندل، الباتشولي الملكي"
  },
  {
      "id": "pkg-all-over-collection",
      "title": "مجموعة معطرات الجسم (اختر أي 3 معطرات)",
      "title_en": "ALL OVER SPRAY COLLECTION (ANY 3 SPRAYS)",
      "cat": "packages",
      "cat_ar": "مجموعات وباقات نوت",
      "size": "3 × 250 مل معطر شامل",
      "concentration": "All-Over Body & Hair Mist",
      "tag": "انتعاش يومي",
      "bestseller": false,
      "price": 249,
      "old_price": 447,
      "discount": "44%",
      "rating": 4.93,
      "reviews_count": 39,
      "img": "/products/08_All_Over_Spray_Collection_White_Flatlay.webp",
      "img_box": "/products/05_All_Over_Trio_Dark_Typography_Review.webp",
      "notes": "اختر أي 3 معطرات جسم وشعر من تشكيلة نوت الفاخرة",
      "slogan": "الانتعاش اليومي الكامل للجسم والشعر؛ ثلاث عبوات بحجم كبير تمنحك إحساس النظافة الدائم",
      "description": "اختر أي 3 معطرات جسم وشعر (رويال توباكو، باودروز، عسل، بحر، شوكونيلا، أو نوت توفي) برذاذ خفيف يدوم طويلاً ولا يترك أي أثر.",
      "top": "رذاذ الانتعاش المائي، البرغموت، زهر البرتقال",
      "heart": "المسك النظيف، رحيق العسل، بتلات الورد",
      "base": "الفانيليا الخفيفة، العنبر الشفاف، خشب الصندل"
  },
  {
      "id": "musk-bundle-gift",
      "title": "باقة مِسك الملكية مع هدية حصرية",
      "title_en": "ROYAL MUSK BUNDLE WITH EXCLUSIVE GIFT",
      "cat": "packages",
      "cat_ar": "مجموعات نوت",
      "size": "طقم فاخر متكامل",
      "concentration": "Gift Set",
      "tag": "عرض خاص",
      "bestseller": true,
      "price": 349,
      "old_price": 680,
      "discount": "49%",
      "rating": 5.0,
      "reviews_count": 64,
      "img": "/products/12_Musk_Bundle_With_Gift_Separate.webp",
      "img_box": "/products/08_Musk_Bundles_No_Overlay_Text_Artwork_Review.webp",
      "notes": "عطر مِسك 100 مل + معطر جسم + تولة مسك + هدية مجانية",
      "slogan": "الباقة الأكثر طلباً لعشاق المسك؛ طقم متكامل يمنحك تجربة المسك الملكي الشاملة مع هدية فاخرة",
      "description": "تتضمن الباقة: عطر مِسك نوت 100 مل، معطر الجسم والشعر، تولة دهن المسك الخالص، بالإضافة إلى هدية مجانية من دار نوت مغلفة بأفخم علب الإهداء.",
      "top": "المسك الأبيض وزهر القطن",
      "heart": "زهور السوسن والنوتات البودرية",
      "base": "المسك الصافي وخشب الصندل"
  },
  {
      "id": "musk-bundle",
      "title": "باقة مِسك الكلاسيكية",
      "title_en": "CLASSIC MUSK BUNDLE",
      "cat": "packages",
      "cat_ar": "مجموعات نوت",
      "size": "طقم 3 منتجات",
      "concentration": "Gift Set",
      "tag": "توفير استثنائي",
      "bestseller": false,
      "price": 299,
      "old_price": 590,
      "discount": "49%",
      "rating": 4.95,
      "reviews_count": 38,
      "img": "/products/13_Musk_Bundle_Without_Gift_Separate.webp",
      "img_box": "/products/08_Musk_Bundles_No_Overlay_Text_Artwork_Review.webp",
      "notes": "عطر مِسك 100 مل + معطر جسم + معطر مفارش",
      "slogan": "ثلاثية المسك الكاملة لتعطير الجسم والشعر والمنزل بعبق المسك النقي",
      "description": "كل ما تحتاجه لتغمر يومك بالنظافة والانتعاش الفاخر في باقة واحدة متكاملة وبسعر لا يتكرر.",
      "top": "المسك وزهر القطن",
      "heart": "السوسن والبودرة",
      "base": "المسك وخشب الصندل"
  }];

  // 5. Cart Manager (Global localStorage Architecture)
  const CartManager = {
    getCart: function() {
      try {
        return JSON.parse(localStorage.getItem('note_cart')) || [];
      } catch(e) {
        return [];
      }
    },
    saveCart: function(cart) {
      localStorage.setItem('note_cart', JSON.stringify(cart));
      this.updateBadge();
      this.renderDrawer();
    },
    addItem: function(productId, quantity = 1) {
      const product = productsData.find(p => p.id === productId) || noteProductsCatalog.find(p => p.id === productId);
      if (!product) return;
      let cart = this.getCart();
      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        const rawPrice = typeof product.price === 'string' ? parseInt(product.price.replace(/[^0-9]/g, '')) : product.price;
        const rawOldPrice = product.old_price ? (typeof product.old_price === 'string' ? parseInt(product.old_price.replace(/[^0-9]/g, '')) : product.old_price) : null;
        const imgUrl = (product.img.startsWith('http') ? '' : ASSET_HOST) + product.img;
        cart.push({
          id: product.id,
          title: product.title,
          title_en: product.title_en || '',
          price: rawPrice || 189,
          old_price: rawOldPrice,
          img: imgUrl,
          size: product.size || '100 مل',
          quantity: quantity
        });
      }
      this.saveCart(cart);
      this.showToast('تمت إضافة ' + product.title + ' إلى سلتك');
      this.openDrawer();
    },
    removeItem: function(productId) {
      let cart = this.getCart().filter(item => item.id !== productId);
      this.saveCart(cart);
    },
    updateQuantity: function(productId, delta) {
      let cart = this.getCart();
      const item = cart.find(i => i.id === productId);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          cart = cart.filter(i => i.id !== productId);
        }
      }
      this.saveCart(cart);
    },
    getTotal: function() {
      return this.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    getCount: function() {
      return this.getCart().reduce((count, item) => count + item.quantity, 0);
    },
    updateBadge: function() {
      const count = this.getCount();
      const badges = document.querySelectorAll('.cart-badge-count, #cart-counter-badge');
      badges.forEach(b => {
        b.textContent = count;
      });
    },
    showToast: function(msg) {
      let toast = document.getElementById('global-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[100] transform -translate-y-24 opacity-0 transition-all duration-300 pointer-events-none px-6 py-3.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-3 bg-black text-white';
        document.body.appendChild(toast);
      }
      toast.innerHTML = '<i class="sicon-check-circle text-emerald-400 text-sm"></i><span>' + msg + '</span>';
      toast.classList.remove('-translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('-translate-y-24', 'opacity-0');
      }, 2800);
    },
    openDrawer: function() {
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-drawer-overlay');
      if (drawer && overlay) {
        drawer.classList.remove('hidden');
        overlay.classList.remove('hidden');
        setTimeout(() => {
          overlay.classList.add('opacity-100');
          drawer.classList.remove('-translate-x-full');
          drawer.classList.add('translate-x-0');
        }, 20);
        document.body.style.overflow = 'hidden';
        this.renderDrawer();
      }
    },
    closeDrawer: function() {
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-drawer-overlay');
      if (drawer && overlay) {
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('-translate-x-full');
        overlay.classList.remove('opacity-100');
        setTimeout(() => {
          overlay.classList.add('hidden');
          drawer.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
      }
    },
    renderDrawer: function() {
      const itemsContainer = document.getElementById('cart-drawer-items');
      const subtotalEl = document.getElementById('cart-drawer-subtotal');
      const totalEl = document.getElementById('cart-drawer-total');
      const shippingProgress = document.getElementById('cart-free-shipping-progress');
      const shippingText = document.getElementById('cart-free-shipping-text');
      const emptyState = document.getElementById('cart-drawer-empty');
      const footerEl = document.getElementById('cart-drawer-footer');
      
      if (!itemsContainer) return;
      
      const cart = this.getCart();
      const total = this.getTotal();
      const freeShippingThreshold = 300;
      
      if (cart.length === 0) {
        itemsContainer.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        if (footerEl) footerEl.classList.add('hidden');
        if (shippingProgress) shippingProgress.style.width = '0%';
        if (shippingText) shippingText.textContent = 'أضف منتجات بقيمة 300 ر.س لتحصل على شحن مجاني';
        return;
      }
      
      if (emptyState) emptyState.classList.add('hidden');
      if (footerEl) footerEl.classList.remove('hidden');
      
      if (shippingProgress && shippingText) {
        const percentage = Math.min(100, Math.round((total / freeShippingThreshold) * 100));
        shippingProgress.style.width = percentage + '%';
        if (total >= freeShippingThreshold) {
          shippingText.innerHTML = '<span class="text-emerald-600 font-bold">🎉 تهانينا! لقد حصلت على شحن مجاني لكافة مدن المملكة</span>';
        } else {
          const remaining = freeShippingThreshold - total;
          shippingText.innerHTML = 'متبقي <strong class="text-black font-extrabold">' + remaining + ' ر.س</strong> للحصول على <span class="font-bold text-emerald-600">شحن مجاني</span>';
        }
      }
      
      if (subtotalEl) subtotalEl.textContent = total + ' ر.س';
      if (totalEl) totalEl.textContent = total + ' ر.س';
      
      itemsContainer.innerHTML = cart.map(item => {
        const zidSlug = zidSlugMap[item.id] || item.id;
        const imgUrl = (item.img.startsWith('http') ? '' : ASSET_HOST) + item.img;
        return `
          <div class="flex items-center gap-3 py-3 border-b border-stone-100 last:border-b-0 text-right">
            <a href="/products/${zidSlug}" class="w-16 h-16 rounded-xl bg-stone-50 p-1 flex-shrink-0 flex items-center justify-center border border-stone-100 block">
              <img src="${imgUrl}" alt="${item.title}" class="w-full h-full object-contain">
            </a>
            <div class="flex-grow">
              <a href="/products/${zidSlug}" class="hover:underline">
                <h4 class="text-xs font-bold text-black line-clamp-1">${item.title}</h4>
              </a>
              <span class="text-[10px] text-stone-400 block">${item.size || '100 مل'}</span>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center border border-stone-200 rounded-full h-7 px-2 gap-2 text-xs font-bold">
                  <button onclick="CartManager.updateQuantity('${item.id}', -1)" class="text-stone-500 hover:text-black w-4 text-center">-</button>
                  <span class="min-w-[14px] text-center">${item.quantity}</span>
                  <button onclick="CartManager.updateQuantity('${item.id}', 1)" class="text-stone-500 hover:text-black w-4 text-center">+</button>
                </div>
                <span class="text-xs font-extrabold text-black">${item.price * item.quantity} ر.س</span>
              </div>
            </div>
            <button onclick="CartManager.removeItem('${item.id}')" class="text-stone-400 hover:text-rose-500 p-1 transition" title="حذف">
              <i class="sicon-trash text-sm"></i>
            </button>
          </div>
        `;
      }).join('');
    }
  };

  // 6. Product Card Rendering
  function renderProductCard(p, index) {
    const zidSlug = zidSlugMap[p.id] || p.id;
    const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
    return `
      <div class="min-w-[175px] sm:min-w-[270px] max-w-[185px] sm:max-w-[280px] shrink-0 p-1 flex flex-col justify-between text-center group cursor-pointer bg-transparent" style="scroll-snap-align: start;" onclick="window.location.href='/products/${zidSlug}'">
        <div>
          <!-- Frameless Image Container with Clean Shadow/Scale -->
          <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 sm:p-4 overflow-hidden">
            ${p.tag ? `<span class="absolute top-2.5 right-2.5 z-10 text-[9px] sm:text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-black text-white whitespace-nowrap shadow-sm"> ${p.tag} </span>` : ''}
            <img src="${imgUrl}" alt="${p.title}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
          </div>

          <!-- Product Typography (Clean Laverne Centered Sans-Serif) -->
          <div class="pt-1 pb-1 text-center space-y-1">
            <h4 class="text-xs sm:text-sm md:text-base font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${p.title}</h4>
            <p class="text-[11px] sm:text-xs text-stone-400 font-normal line-clamp-1">${p.notes}</p>
            
            <!-- Clean Price Row -->
            <div class="flex items-center justify-center gap-2 pt-1">
              <span class="text-rose-600 font-extrabold text-sm sm:text-base">${p.price}</span>
              <span class="text-stone-400 line-through text-[11px] sm:text-xs font-normal">${p.old_price}</span>
            </div>
          </div>
        </div>

        <!-- Minimalist Rounded Pill Button -->
        <button onclick="event.stopPropagation(); CartManager.addItem('${p.id}')" class="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-xs shadow-sm" title="إضافة للسلة">
          <span>إضافة للسلة</span>
          <i class="sicon-shopping-bag text-sm"></i>
        </button>
      </div>
    `;
  }

  // 7. Sliders Initialization
  function initSliders() {
    const bestTrack = document.getElementById('slider-bestsellers');
    if (bestTrack) {
      bestTrack.innerHTML = productsData.slice(0, 6).map((p, i) => renderProductCard(p, i)).join('');
    }

    const nicheTrack = document.getElementById('slider-niche');
    if (nicheTrack) {
      nicheTrack.innerHTML = productsData.slice(6, 10).map((p, i) => renderProductCard(p, i + 6)).join('');
    }

    const newTrack = document.getElementById('slider-new');
    if (newTrack) {
      newTrack.innerHTML = productsData.slice(10, 16).map((p, i) => renderProductCard(p, i + 10)).join('');
    }
  }

  function scrollSlider(id, direction) {
    const slider = document.getElementById(id);
    if (!slider) return;
    const scrollAmount = slider.clientWidth * 0.75;
    if (direction === 'prev') {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  // 8. Header Scroll Glassmorphism
  function handleHeaderScroll() {
    const header = document.getElementById('site-header');
    const storeLogo = document.getElementById('store-logo');
    const hero = document.getElementById('section-hero-video');
    if (!header) return;

    const scrollY = window.scrollY || 0;
    const heroHeight = hero ? hero.offsetHeight : 800;

    if (scrollY > 20) {
      if (scrollY >= (heroHeight - 90)) {
        header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-black shadow-sm border-b border-stone-200/50 backdrop-blur-xl bg-white/70';
        if (storeLogo) storeLogo.src = ASSET_HOST + '/logo_dark_crisp.png';
      } else {
        header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-white shadow-sm border-b border-white/10 backdrop-blur-xl bg-black/25';
        if (storeLogo) storeLogo.src = ASSET_HOST + '/logo_white_crisp.png';
      }
    } else {
      header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 bg-transparent text-white border-b border-white/10';
      if (storeLogo) storeLogo.src = ASSET_HOST + '/logo_white_crisp.png';
    }
  }

  // 9. Quick View Modal
  function openQuickView(idx) {
    const p = productsData[idx];
    if (!p) return;
    const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
    const modalImg = document.getElementById('modal-img');
    if (modalImg) modalImg.src = imgUrl;
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) modalTitle.textContent = p.title;
    const modalCat = document.getElementById('modal-cat');
    if (modalCat) modalCat.textContent = p.cat;
    const modalSlogan = document.getElementById('modal-slogan');
    if (modalSlogan) modalSlogan.textContent = p.slogan || '';
    const modalTop = document.getElementById('modal-top');
    if (modalTop) modalTop.innerHTML = '<strong>القمة:</strong> ' + (p.top || '');
    const modalHeart = document.getElementById('modal-heart');
    if (modalHeart) modalHeart.innerHTML = '<strong>القلب:</strong> ' + (p.heart || '');
    const modalBase = document.getElementById('modal-base');
    if (modalBase) modalBase.innerHTML = '<strong>القاعدة:</strong> ' + (p.base || '');
    const modalPrice = document.getElementById('modal-price');
    if (modalPrice) modalPrice.textContent = p.price;

    const buyBtn = document.getElementById('modal-buy-btn');
    if (buyBtn) {
      buyBtn.onclick = () => {
        CartManager.addItem(p.id);
        closeQuickView();
      };
    }

    const modal = document.getElementById('quickview-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function closeQuickView() {
    const modal = document.getElementById('quickview-modal');
    if (modal) {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }
  }

  // 10. Search & Mobile Drawer
  function openSearchModal() {
    const m = document.getElementById('search-modal');
    if (!m) return;
    m.classList.remove('hidden');
    setTimeout(() => {
      m.classList.remove('opacity-0');
      m.querySelector('div').classList.remove('scale-95');
      document.getElementById('search-input')?.focus();
    }, 10);
  }

  function closeSearchModal() {
    const m = document.getElementById('search-modal');
    if (!m) return;
    m.classList.add('opacity-0');
    m.querySelector('div').classList.add('scale-95');
    setTimeout(() => {
      m.classList.add('hidden');
    }, 300);
  }

  function openMobileMenu() {
    const m = document.getElementById('mobile-menu-drawer');
    if (!m) return;
    m.classList.remove('hidden');
    setTimeout(() => {
      m.classList.remove('opacity-0');
      m.querySelector('div').classList.remove('translate-x-full');
    }, 10);
  }

  function closeMobileMenu() {
    const m = document.getElementById('mobile-menu-drawer');
    if (!m) return;
    m.classList.add('opacity-0');
    m.querySelector('div').classList.add('translate-x-full');
    setTimeout(() => {
      m.classList.add('hidden');
    }, 300);
  }

  // 11. Hero Auto-Rotating Carousel
  let currentHeroIndex = 0;
  let heroTimer = null;
  const HERO_DURATION = 5000;

  function goToHeroSlide(idx) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;
    
    currentHeroIndex = (idx + slides.length) % slides.length;
    
    slides.forEach((slide, i) => {
      if (i === currentHeroIndex) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        slide.classList.add('opacity-100', 'pointer-events-auto', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'pointer-events-auto', 'z-10');
        slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentHeroIndex) {
        dot.className = 'hero-dot w-6 h-1 rounded-full bg-white transition-all duration-300 cursor-pointer';
      } else {
        dot.className = 'hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer';
      }
    });

    restartHeroTimer();
  }

  function nextHeroSlide() { goToHeroSlide(currentHeroIndex + 1); }
  function prevHeroSlide() { goToHeroSlide(currentHeroIndex - 1); }

  function startHeroTimer() {
    if (!heroTimer) {
      heroTimer = setInterval(nextHeroSlide, HERO_DURATION);
    }
  }

  function stopHeroTimer() {
    if (heroTimer) {
      clearInterval(heroTimer);
      heroTimer = null;
    }
  }

  function restartHeroTimer() {
    stopHeroTimer();
    startHeroTimer();
  }

  function initHeroCarousel() {
    const heroSection = document.getElementById('section-hero-video');
    if (!heroSection) return;

    heroSection.addEventListener('mouseenter', stopHeroTimer);
    heroSection.addEventListener('mouseleave', startHeroTimer);

    let startX = 0, startY = 0;
    heroSection.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].clientX;
      startY = e.changedTouches[0].clientY;
      stopHeroTimer();
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) prevHeroSlide();
        else nextHeroSlide();
      }
      startHeroTimer();
    }, { passive: true });

    startHeroTimer();
  }

  // 12. Offers Auto-Rotating Carousel (3s Interval)
  let currentOfferIndex = 0;
  let offerTimer = null;
  const OFFER_DURATION = 3000;

  function goToOfferSlide(index, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const slides = document.querySelectorAll('.offer-slide');
    const dots = document.querySelectorAll('.offer-dot');
    if (!slides.length) return;

    if (index >= slides.length) currentOfferIndex = 0;
    else if (index < 0) currentOfferIndex = slides.length - 1;
    else currentOfferIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentOfferIndex) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        slide.classList.add('opacity-100', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentOfferIndex) {
        dot.className = 'offer-dot w-6 h-1 sm:h-1.5 rounded-full bg-white transition-all duration-300 cursor-pointer shadow-sm';
      } else {
        dot.className = 'offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm';
      }
    });

    restartOfferTimer();
  }

  function nextOfferSlide(event) { goToOfferSlide(currentOfferIndex + 1, event); }
  function prevOfferSlide(event) { goToOfferSlide(currentOfferIndex - 1, event); }

  function startOfferTimer() {
    if (!offerTimer) {
      offerTimer = setInterval(() => nextOfferSlide(), OFFER_DURATION);
    }
  }

  function stopOfferTimer() {
    if (offerTimer) {
      clearInterval(offerTimer);
      offerTimer = null;
    }
  }

  function restartOfferTimer() {
    stopOfferTimer();
    startOfferTimer();
  }

  function initOffersCarousel() {
    const carousel = document.getElementById('offers-carousel');
    if (!carousel) return;

    carousel.addEventListener('mouseenter', stopOfferTimer);
    carousel.addEventListener('mouseleave', startOfferTimer);

    let startX = 0;
    carousel.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].clientX;
      stopOfferTimer();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - startX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) prevOfferSlide();
        else nextOfferSlide();
      }
      startOfferTimer();
    }, { passive: true });

    startOfferTimer();
  }

  // 13. Mount & Initialize Master Storefront
  function mountStorefront() {
    const mainEl = document.querySelector('.tp-home') || 
                   document.querySelector('.main.app-content') || 
                   document.querySelector('.app-content') || 
                   document.querySelector('main') || 
                   document.body;

    if (!mainEl) {
      setTimeout(mountStorefront, 50);
      return;
    }

    if (document.getElementById('note-luxury-storefront')) return;

    // Suppress existing Rozia sections
    const defaultSections = mainEl.querySelectorAll('.s-block, .tp-slider-banners, .tp-product-card, .tp-banners, .tp-brands, .tp-title-section');
    defaultSections.forEach(sec => sec.style.display = 'none');

    // Remove Rozia default footers and headers completely
    document.querySelectorAll('footer:not(#note-store-footer), .tp-footer-area, .tp-bar-header, header.header-nav').forEach(el => {
      el.remove();
    });

    const storefrontContainer = document.createElement('div');
    storefrontContainer.id = 'note-luxury-storefront';
    storefrontContainer.className = 'w-full bg-white text-black antialiased selection:bg-black selection:text-white';
    storefrontContainer.innerHTML = "<!-- ================= 1. HEADER / NAVIGATION (100% LAVERNE ARCHITECTURE) ================= -->\n  <!-- Starts 100% transparent with white text, transforms into frosted blur (backdrop-blur-xl bg-white/70 text-black) on scroll -->\n  <header id=\"site-header\" class=\"fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 bg-transparent text-white border-b border-white/10\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between transition-all duration-300\">\n      \n      <!-- Right: Mobile Menu + Logo -->\n      <div class=\"flex items-center gap-4 shrink-0\">\n        <button id=\"mobile-menu-btn\" onclick=\"openMobileMenu()\" class=\"lg:hidden p-2 text-inherit hover:opacity-75 transition\" aria-label=\"القائمة\">\n          <i class=\"sicon-menu text-xl\"></i>\n        </button>\n        <a href=\"/\" class=\"block group py-1\">\n          <img id=\"store-logo\" src=\"https://youssefrasheed.github.io/note-zid-styles/logo_white_crisp.png\" alt=\"NOTE Perfumes\" class=\"h-8 sm:h-9 lg:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105\">\n        </a>\n      </div>\n\n      <!-- Center: Clean Minimalist Nav Links -->\n      <nav id=\"nav-links\" class=\"hidden lg:flex items-center justify-center gap-6 text-sm font-semibold whitespace-nowrap text-inherit transition-colors\">\n        <a href=\"/\" class=\"hover:opacity-70 transition pb-0.5 border-b-2 border-current\">الرئيسية</a>\n        <a href=\"/categories\" class=\"hover:opacity-70 transition pb-0.5\">جميع المنتجات</a>\n        <a href=\"/categories/1748533/perfumes\" class=\"hover:opacity-70 transition pb-0.5\">العطور</a>\n        <a href=\"/categories/1500261/عطور-النيش\" class=\"hover:opacity-70 transition pb-0.5\">عطور النيش</a>\n        <a href=\"/categories/1697258/الأكثر-مبيعا\" class=\"hover:opacity-70 transition pb-0.5\">الأكثر مبيعاً</a>\n        <a href=\"/categories/1327929/newest-products\" class=\"hover:opacity-70 transition pb-0.5\">أحدث المنتجات</a>\n        <a href=\"/categories/1310036/30ml-perfumes\" class=\"hover:opacity-70 transition pb-0.5\">عطور 30 مل</a>\n        <a href=\"/categories/1688838/all-over-spray\" class=\"hover:opacity-70 transition pb-0.5\">معطر للجسم</a>\n        <a href=\"/categories/1752110/packages\" class=\"hover:opacity-70 transition pb-0.5\">مجموعات نوت</a>\n      </nav>\n\n      <!-- Left: Search, User, Cart, Language -->\n      <div id=\"header-actions\" class=\"flex items-center justify-end gap-3 sm:gap-4 text-inherit transition-colors\">\n        <!-- Search -->\n        <button onclick=\"window.location.href='/category.html?cat=all'\" class=\"w-9 h-9 flex items-center justify-center hover:opacity-75 transition\" title=\"البحث\" aria-label=\"البحث\">\n          <i class=\"sicon-search text-lg\"></i>\n        </button>\n\n        <!-- User Profile -->\n        <a href=\"/faqs.html\" class=\"w-9 h-9 flex items-center justify-center hover:opacity-75 transition\" title=\"الأسئلة الشائعة\">\n          <i class=\"sicon-user text-lg\"></i>\n        </a>\n\n        <!-- Cart with badge -->\n        <button onclick=\"CartManager.openDrawer()\" class=\"relative w-9 h-9 flex items-center justify-center hover:opacity-75 transition\" title=\"سلة المشتريات\" aria-label=\"السلة\">\n          <i class=\"sicon-shopping-bag text-xl\"></i>\n          <span id=\"cart-counter-badge\" class=\"absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md\">0</span>\n        </button>\n\n        <!-- Language Switcher -->\n        <div class=\"hidden sm:flex items-center gap-1 text-xs font-bold border-r border-current/30 pr-3 mr-1\">\n          <span>العربية</span>\n          <i class=\"sicon-keyboard_arrow_down text-[10px] opacity-75\"></i>\n        </div>\n      </div>\n\n    </div>\n  </header>\n\n  <!-- ================= 2. CINEMATIC HERO BANNER (AUTO-ROTATING CAROUSEL) ================= -->\n  <section id=\"section-hero-video\" class=\"relative w-full min-h-[720px] sm:min-h-[760px] md:min-h-[820px] lg:h-[860px] bg-black overflow-hidden flex flex-col justify-end items-center text-center group select-none\">\n    \n    <!-- Slides Container -->\n    <div id=\"hero-slides-wrapper\" class=\"absolute inset-0 w-full h-full\">\n\n      <!-- Slide 1: Musk Centered Minimal (Primary Hero) -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-100 z-10\" data-index=\"0\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Musk_Centered_Minimal_Hero_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Musk_Centered_Minimal_Hero_Desktop.webp\" alt=\"مِسك نوت - أثر يُعرف قبل أن يُرى\" fetchpriority=\"high\" loading=\"eager\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h1 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            مِسك... أثر يُعرف قبل أن يُرى\n          </h1>\n          <h2 class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            الأثر الخالد قبل الحضور\n          </h2>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"#bestsellers\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>اكتشف العطور</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Slide 2: Royal Tobacco & Oud Rosewood -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-0 pointer-events-none z-0\" data-index=\"1\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Royal_Tobacco_Oud_Rosewood_Hero_Option_01_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Royal_Tobacco_Oud_Rosewood_Hero_Option_01_Desktop.webp\" alt=\"رويال توباكو وعود روزوود\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h2 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            رويال توباكو... فخامة تدوم وأثر لا يُمحى\n          </h2>\n          <p class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            توليفة التبغ المعتق والعود والورد النادر\n          </p>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"/categories/1500261/عطور-النيش\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>اكتشف المجموعة</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Slide 3: Aura Musk & Royal Powder -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-0 pointer-events-none z-0\" data-index=\"2\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Hero_Aura_Musk_Royal_Powder_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Hero_Aura_Musk_Royal_Powder_Desktop.webp\" alt=\"أورا مسك ورويال باودر\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h2 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            أورا مسك... نقاء البودر ولمسة النعومة\n          </h2>\n          <p class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            شذى يأسر الحواس قبل الحضور\n          </p>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"/categories/1697258/الأكثر-مبيعا\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>تسوق الآن</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Slide 4: Ivory Stone Luxury -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-0 pointer-events-none z-0\" data-index=\"3\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Hero_02_Ivory_Stone_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Hero_02_Ivory_Stone_Desktop.webp\" alt=\"مجموعة المسك الملكية\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h2 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            مجموعة المسك... عبير يفيض بالأصالة\n          </h2>\n          <p class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            باقات متكاملة لتجربة عطرية استثنائية\n          </p>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"/categories/1752110/packages\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>استكشف الباقات</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Slide 5: Amber Silk -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-0 pointer-events-none z-0\" data-index=\"4\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Hero_01_Amber_Silk_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Hero_01_Amber_Silk_Desktop.webp\" alt=\"حرير العنبر نوت\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h2 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            حرير العنبر... دفء الأناقة المترفة\n          </h2>\n          <p class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            تدرجات ساحرة تلائم حضورك الراقي\n          </p>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"#bestsellers\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>اكتشف العطور</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <!-- Navigation Arrows -->\n    <button onclick=\"nextHeroSlide()\" class=\"absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/70 border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 sm:opacity-75 sm:hover:opacity-100 active:scale-90 cursor-pointer shadow-lg\" aria-label=\"الشريحة التالية\">\n      <i class=\"sicon-keyboard_arrow_left text-sm sm:text-base\"></i>\n    </button>\n    <button onclick=\"prevHeroSlide()\" class=\"absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/70 border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 sm:opacity-75 sm:hover:opacity-100 active:scale-90 cursor-pointer shadow-lg\" aria-label=\"الشريحة السابقة\">\n      <i class=\"sicon-keyboard_arrow_right text-sm sm:text-base\"></i>\n    </button>\n\n    <!-- Indicators / Dots (Positioned cleanly below the button at bottom-4) -->\n    <div id=\"hero-dots\" dir=\"ltr\" class=\"absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2\">\n      <button onclick=\"goToHeroSlide(0)\" class=\"hero-dot w-6 h-1 rounded-full bg-white transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 1\"></button>\n      <button onclick=\"goToHeroSlide(1)\" class=\"hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 2\"></button>\n      <button onclick=\"goToHeroSlide(2)\" class=\"hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 3\"></button>\n      <button onclick=\"goToHeroSlide(3)\" class=\"hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 4\"></button>\n      <button onclick=\"goToHeroSlide(4)\" class=\"hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 5\"></button>\n    </div>\n\n  </section>\n\n  <!-- ================= 3. SECTION: الأكثر مبيعاً (BESTSELLERS SLIDER - DIRECTLY UNDER HERO) ================= -->\n  <section id=\"bestsellers\" class=\"w-full py-16 sm:py-24 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Title & Subtitle (NOTE Authentic Content) -->\n      <div class=\"text-center mb-10 sm:mb-14\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2\">الأكثـر مبيعًـا</h2>\n        <p class=\"text-xs sm:text-sm text-stone-500 font-normal\">عطور نوت الأكثر طلباً وإشادة</p>\n      </div>\n\n      <!-- Slider Container with Floating Navigation Arrows -->\n      <div class=\"relative group px-1 sm:px-2\">\n        <!-- Arrow Right (Next in RTL) -->\n        <button onclick=\"scrollSlider('slider-bestsellers', 'next')\" class=\"absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"التالي\">\n          <i class=\"sicon-keyboard_arrow_right text-sm\"></i>\n        </button>\n\n        <!-- Arrow Left (Prev in RTL) -->\n        <button onclick=\"scrollSlider('slider-bestsellers', 'prev')\" class=\"absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"السابق\">\n          <i class=\"sicon-keyboard_arrow_left text-sm\"></i>\n        </button>\n\n        <!-- Horizontal Scroll Track -->\n        <div id=\"slider-bestsellers\" class=\"flex flex-nowrap overflow-x-auto scroll-smooth gap-4 sm:gap-6 lg:gap-7 pb-6 pt-2 px-1 scrollbar-none\" style=\"scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;\">\n          <!-- Injected via JavaScript from productsData -->\n        </div>\n      </div>\n\n      <!-- Centered \"عرض الكل\" Button -->\n      <div class=\"text-center mt-8 sm:mt-12\">\n        <a href=\"/categories/1697258/الأكثر-مبيعا\" class=\"inline-flex items-center gap-2 px-7 py-2.5 rounded-lg border border-black text-black hover:bg-black hover:text-white transition text-xs sm:text-sm font-bold\">\n          <span>عرض الكل</span>\n          <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n        </a>\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 4. CAMPAIGN BANNER 1 (ROUNDED IMAGE BANNER) ================= -->\n  <section class=\"w-full py-6 sm:py-10 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      <a href=\"/categories/1500261/عطور-النيش\" class=\"block group\">\n        <div class=\"relative overflow-hidden rounded-2xl md:rounded-3xl shadow-sm group-hover:shadow-md transition duration-500\">\n          <picture class=\"w-full block\">\n            <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Hero_05_Warm_Cool_Diptych_Mobile.webp\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Hero_05_Warm_Cool_Diptych_Desktop.webp\" alt=\"مجموعة نوت الملكية | Royal Diptych Collection\" class=\"w-full h-auto object-cover block group-hover:scale-[1.01] transition-transform duration-500\">\n          </picture>\n        </div>\n      </a>\n    </div>\n  </section>\n\n  <!-- ================= 5. SECTION: عطور النيش (NICHE PERFUMES SLIDER) ================= -->\n  <section id=\"niche\" class=\"w-full py-16 sm:py-24 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <div class=\"text-center mb-10 sm:mb-14\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2\">عطور النيش</h2>\n        <p class=\"text-xs sm:text-sm text-stone-500 font-normal\">توليفات حصرية بنقاء فائق وثبات يدوم طويلاً</p>\n      </div>\n\n      <!-- Slider Container -->\n      <div class=\"relative group px-1 sm:px-2\">\n        <button onclick=\"scrollSlider('slider-niche', 'next')\" class=\"absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"التالي\">\n          <i class=\"sicon-keyboard_arrow_right text-sm\"></i>\n        </button>\n        <button onclick=\"scrollSlider('slider-niche', 'prev')\" class=\"absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"السابق\">\n          <i class=\"sicon-keyboard_arrow_left text-sm\"></i>\n        </button>\n\n        <div id=\"slider-niche\" class=\"flex flex-nowrap overflow-x-auto scroll-smooth gap-4 sm:gap-6 lg:gap-7 pb-6 pt-2 px-1 scrollbar-none\" style=\"scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;\">\n          <!-- Injected via JavaScript from productsData -->\n        </div>\n      </div>\n\n      <div class=\"text-center mt-8 sm:mt-12\">\n        <a href=\"/categories/1500261/عطور-النيش\" class=\"inline-flex items-center gap-2 px-7 py-2.5 rounded-lg border border-black text-black hover:bg-black hover:text-white transition text-xs sm:text-sm font-bold\">\n          <span>عرض الكل</span>\n          <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n        </a>\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 6. CAMPAIGN BANNER 2 (PACKAGES & COLLECTIONS PROMOTIONAL CAROUSEL) ================= -->\n  <section class=\"w-full py-10 sm:py-16 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Section Header: باقات مختارة لك -->\n      <div class=\"text-center mb-8 sm:mb-12\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2\">باقات مختارة لك</h2>\n        <p class=\"text-xs sm:text-sm text-stone-500 font-normal\">تشكيلات حصرية متكاملة تجمع أفخم عطور نوت بأسعار استثنائية</p>\n      </div>\n\n      <!-- Carousel Container with 2:1 Aspect Ratio (Auto-alternates every 3 seconds) -->\n      <div id=\"offers-carousel\" class=\"relative w-full aspect-[2/1] overflow-hidden rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition duration-500 bg-stone-100 group select-none\">\n        \n        <!-- Slides -->\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-100 z-10 block\" data-index=\"0\" aria-label=\"باقة رويال توباكو الفاخرة\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/01_Royal_Tobacco.webp\" alt=\"باقة رويال توباكو الفاخرة\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"1\" aria-label=\"باقة باودروز المتكاملة\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/02_Powderose.webp\" alt=\"باقة باودروز المتكاملة\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"2\" aria-label=\"باقة سمر إسكيب الصيفية\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/03_Summer_Escape.webp\" alt=\"باقة سمر إسكيب الصيفية\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"3\" aria-label=\"باقة هير سغنتشر النسائية\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/04_Her_Signature.webp\" alt=\"باقة هير سغنتشر النسائية\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"4\" aria-label=\"باقة مِنز سغنتشر الرجالية\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/05_Mens_Signature.webp\" alt=\"باقة مِنز سغنتشر الرجالية\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"5\" aria-label=\"باقة نايت سغنتشر الليلية\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/06_Night_Signature.webp\" alt=\"باقة نايت سغنتشر الليلية\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"6\" aria-label=\"مجموعة التولات الخاصة\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/07_Tollah_Collection.webp\" alt=\"مجموعة التولات الخاصة\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"7\" aria-label=\"مجموعة معطرات الجسم\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/08_All_Over_Spray_Collection.webp\" alt=\"مجموعة معطرات الجسم\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <!-- Navigation Arrows (Subtle on hover) -->\n        <button onclick=\"nextOfferSlide(event)\" class=\"absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 active:scale-95 cursor-pointer shadow-md\" aria-label=\"الشريحة التالية\">\n          <i class=\"sicon-keyboard_arrow_left text-xs sm:text-sm\"></i>\n        </button>\n        <button onclick=\"prevOfferSlide(event)\" class=\"absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 active:scale-95 cursor-pointer shadow-md\" aria-label=\"الشريحة السابقة\">\n          <i class=\"sicon-keyboard_arrow_right text-xs sm:text-sm\"></i>\n        </button>\n\n        <!-- Navigation Dots -->\n        <div id=\"offer-dots\" dir=\"ltr\" class=\"absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1.5 sm:gap-2\">\n          <button onclick=\"goToOfferSlide(0, event)\" class=\"offer-dot w-6 h-1 sm:h-1.5 rounded-full bg-white transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 1\"></button>\n          <button onclick=\"goToOfferSlide(1, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 2\"></button>\n          <button onclick=\"goToOfferSlide(2, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 3\"></button>\n          <button onclick=\"goToOfferSlide(3, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 4\"></button>\n          <button onclick=\"goToOfferSlide(4, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 5\"></button>\n          <button onclick=\"goToOfferSlide(5, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 6\"></button>\n          <button onclick=\"goToOfferSlide(6, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 7\"></button>\n          <button onclick=\"goToOfferSlide(7, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 8\"></button>\n        </div>\n\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 7. SECTION: أحدث المنتجات (NEWEST PRODUCTS SLIDER) ================= -->\n  <section id=\"new-releases\" class=\"w-full py-16 sm:py-24 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <div class=\"text-center mb-10 sm:mb-14\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2\">أحدث المنتجات</h2>\n        <p class=\"text-xs sm:text-sm text-stone-500 font-normal\">إصدارات دار نوت العطرية الجديدة</p>\n      </div>\n\n      <!-- Slider Container -->\n      <div class=\"relative group px-1 sm:px-2\">\n        <button onclick=\"scrollSlider('slider-new', 'next')\" class=\"absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"التالي\">\n          <i class=\"sicon-keyboard_arrow_right text-sm\"></i>\n        </button>\n        <button onclick=\"scrollSlider('slider-new', 'prev')\" class=\"absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"السابق\">\n          <i class=\"sicon-keyboard_arrow_left text-sm\"></i>\n        </button>\n\n        <div id=\"slider-new\" class=\"flex flex-nowrap overflow-x-auto scroll-smooth gap-4 sm:gap-6 lg:gap-7 pb-6 pt-2 px-1 scrollbar-none\" style=\"scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;\">\n          <!-- Injected via JavaScript from productsData -->\n        </div>\n      </div>\n\n      <div class=\"text-center mt-8 sm:mt-12\">\n        <a href=\"/categories/1327929/newest-products\" class=\"inline-flex items-center gap-2 px-7 py-2.5 rounded-lg border border-black text-black hover:bg-black hover:text-white transition text-xs sm:text-sm font-bold\">\n          <span>عرض الكل</span>\n          <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n        </a>\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 8. SECTION: إختر عالمك (NOTE PERFUMES CATEGORIES GRID - LAVERNE STYLE) ================= -->\n  <section id=\"curated-sets\" class=\"w-full py-16 sm:py-24 bg-white border-t border-stone-100\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Section Header Matching Laverne Style -->\n      <div class=\"text-center mb-10 sm:mb-14\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight\">إختر عالمك</h2>\n        <p class=\"text-sm sm:text-base text-gray-500 font-medium mt-2\">اكتشف فئات وتوليفات دار نوت للعطور</p>\n      </div>\n\n      <!-- 8 NOTE Category Cards Grid Matching Laverne Layout -->\n      <div class=\"grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8\">\n        \n        <!-- Card 1: عطور النيش الفاخرة -->\n        <a href=\"/categories/1500261/عطور-النيش\" class=\"group block text-center\" aria-label=\"عطور النيش الفاخرة\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_niche.webp\" alt=\"عطور النيش الفاخرة\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">عطور النيش الفاخرة</h3>\n        </a>\n\n        <!-- Card 2: العطور (100 مل) -->\n        <a href=\"/categories/1748533/perfumes\" class=\"group block text-center\" aria-label=\"العطور 100 مل\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_perfumes.webp\" alt=\"العطور 100 مل\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">العطور (100 مل)</h3>\n        </a>\n\n        <!-- Card 3: عطور 30 مل -->\n        <a href=\"/categories/1310036/30ml-perfumes\" class=\"group block text-center\" aria-label=\"عطور 30 مل\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_30ml.webp\" alt=\"عطور 30 مل\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">عطور 30 مل</h3>\n        </a>\n\n        <!-- Card 4: مجموعات وباقات نوت -->\n        <a href=\"/categories/1752110/packages\" class=\"group block text-center\" aria-label=\"مجموعات وباقات نوت\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_packages.webp\" alt=\"مجموعات وباقات نوت\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">مجموعات وباقات نوت</h3>\n        </a>\n\n        <!-- Card 5: معطرات الجسم -->\n        <a href=\"/categories/1688838/all-over-spray\" class=\"group block text-center\" aria-label=\"معطرات الجسم\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_allover.webp\" alt=\"معطرات الجسم\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">معطرات الجسم</h3>\n        </a>\n\n        <!-- Card 6: معطرات الجو والمفارش -->\n        <a href=\"/categories/1310037/معطرات-جو-وجسم\" class=\"group block text-center\" aria-label=\"معطرات الجو والمفارش\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_linen.webp\" alt=\"معطرات الجو والمفارش\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">معطرات الجو والمفارش</h3>\n        </a>\n\n        <!-- Card 7: منتجات العناية بالبشرة -->\n        <a href=\"/category.html?cat=body-care\" class=\"group block text-center\" aria-label=\"منتجات العناية بالبشرة\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_bodycare.webp\" alt=\"منتجات العناية بالبشرة\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">منتجات العناية بالبشرة</h3>\n        </a>\n\n        <!-- Card 8: التولات والمسك الخالص -->\n        <a href=\"/categories/1421002/tollah\" class=\"group block text-center\" aria-label=\"التولات والمسك الخالص\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_tollah.webp\" alt=\"التولات والمسك الخالص\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">التولات والمسك الخالص</h3>\n        </a>\n\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 9. SECTION: ركائز الثقة (STORE TRUST FEATURES - DIRECTLY ABOVE FOOTER) ================= -->\n  <section class=\"w-full py-14 sm:py-20 bg-white border-t border-stone-100\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      <div class=\"grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center\">\n        \n        <div class=\"flex flex-col items-center p-3\">\n          <svg class=\"w-8 h-8 text-black mb-3\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75\" />\n          </svg>\n          <h4 class=\"text-sm font-bold text-black mb-1\">شحن فاخر ومؤمّن</h4>\n          <p class=\"text-xs text-stone-500 font-normal\">توصيل سريع وآمن لجميع مناطق المملكة والخليج</p>\n        </div>\n\n        <div class=\"flex flex-col items-center p-3\">\n          <svg class=\"w-8 h-8 text-black mb-3\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z\" />\n          </svg>\n          <h4 class=\"text-sm font-bold text-black mb-1\">الضمان الذهبي الملكي</h4>\n          <p class=\"text-xs text-stone-500 font-normal\">عينة للتجربة مع ضمان استرجاع كامل وسلس</p>\n        </div>\n\n        <div class=\"flex flex-col items-center p-3\">\n          <svg class=\"w-8 h-8 text-black mb-3\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 002.25 19.5z\" />\n          </svg>\n          <h4 class=\"text-sm font-bold text-black mb-1\">دفع إلكتروني وتقسيط مرن</h4>\n          <p class=\"text-xs text-stone-500 font-normal\">قسّم مدفوعاتك عبر تابي وتمارا بدون أي فوائد</p>\n        </div>\n\n        <div class=\"flex flex-col items-center p-3\">\n          <svg class=\"w-8 h-8 text-black mb-3\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z\" />\n          </svg>\n          <h4 class=\"text-sm font-bold text-black mb-1\">عطور نيش أصلية 100%</h4>\n          <p class=\"text-xs text-stone-500 font-normal\">توليفة نيش أصلية بثبات وفوحان فائق</p>\n        </div>\n\n      </div>\n    </div>\n  </section>\n\n  <!-- ================= 10. STORE FOOTER (100% AUTHENTIC NOTE ARCHITECTURE) ================= -->\n  <footer id=\"note-store-footer\" class=\"w-full pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-black text-white text-right\">\n    <div class=\"max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800\">\n      \n      <!-- Brand, Bio & Legal Verification -->\n      <div class=\"space-y-4\">\n        <a href=\"/\" class=\"inline-block\">\n          <img id=\"footer-logo\" src=\"https://youssefrasheed.github.io/note-zid-styles/logo_white_crisp.png\" alt=\"NOTE Perfumes\" class=\"h-9 w-auto object-contain\">\n        </a>\n        <p class=\"text-xs text-stone-400 leading-relaxed font-light\">\n          نوت للعطور (NOTE) | دار عطور سعودية رائدة تُعنى بابتكار توليفات نيش مستوحاة من أندر المكونات الطبيعية بنقاء فائق وثبات يدوم طويلاً، لتقديم بصمة عطرية تليق بأصحاب الذوق الرفيع.\n        </p>\n        \n        <!-- Authentic Legal & Verification Badges -->\n        <div class=\"pt-1 text-xs text-stone-400 space-y-1.5 font-light\">\n          <p>السجل التجاري: <span class=\"font-mono font-bold text-white tracking-wider\">1010713359</span></p>\n          <p>الرقم الضريبي: <span class=\"font-mono font-bold text-white tracking-wider\">310103613800003</span></p>\n        </div>\n\n        <div class=\"pt-2\">\n          <div class=\"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-300\">\n            <svg class=\"w-4 h-4 text-emerald-400 shrink-0\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\n              <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/>\n            </svg>\n            <span>موثّق في المركز السعودي للأعمال (منصة الأعمال)</span>\n          </div>\n        </div>\n      </div>\n\n      <!-- Links 1: السياسات والضمان -->\n      <div>\n        <h4 class=\"text-xs font-bold mb-4 text-white tracking-widest uppercase\">السياسات والضمان</h4>\n        <ul class=\"space-y-2.5 text-xs text-stone-400 font-light\">\n          <li><a href=\"/refund-policy.html\" class=\"hover:text-white transition\">سياسة الاستبدال والاسترجاع</a></li>\n          <li><a href=\"/terms.html\" class=\"hover:text-white transition\">الشروط والأحكام</a></li>\n          <li><a href=\"/privacy.html\" class=\"hover:text-white transition\">سياسة الخصوصية</a></li>\n          <li><a href=\"/refund-policy.html\" class=\"hover:text-white transition\">الضمان الذهبي الملكي للتجربة</a></li>\n          <li><a href=\"/contact.html\" class=\"hover:text-white transition\">الشكاوى والمقترحات</a></li>\n        </ul>\n      </div>\n\n      <!-- Links 2: المساعدة وقنوات التواصل -->\n      <div>\n        <h4 class=\"text-xs font-bold mb-4 text-white tracking-widest uppercase\">روابط المساعدة وتواصل معنا</h4>\n        <ul class=\"space-y-2.5 text-xs text-stone-400 font-light\">\n          <li><a href=\"/faqs.html\" class=\"hover:text-white transition\">الأسئلة الأكثر تكراراً (FAQ)</a></li>\n          <li><a href=\"https://wa.me/966565955420\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"hover:text-white transition flex items-center gap-1.5\"><i class=\"sicon-whatsapp text-emerald-400 text-sm\"></i> تواصل معنا عبر واتساب</a></li>\n          <li><a href=\"tel:+966565955420\" class=\"hover:text-white transition\">الهاتف: <bdi class=\"text-stone-300 font-mono\">+966 56 595 5420</bdi></a></li>\n          <li><a href=\"mailto:marketing.noteperf@gmail.com\" class=\"hover:text-white transition break-all\">البريد: marketing.noteperf@gmail.com</a></li>\n        </ul>\n\n        <!-- Social Media Icons (Instagram & TikTok from old site) -->\n        <div class=\"pt-4\">\n          <p class=\"text-[11px] text-stone-400 mb-2 font-medium\">تابع نوت عبر منصات التواصل:</p>\n          <div class=\"flex items-center gap-2\">\n            <a href=\"https://www.instagram.com/noteperf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-white hover:text-white text-stone-400 flex items-center justify-center transition\" aria-label=\"انستقرام نوت\">\n              <svg class=\"w-4 h-4 fill-current\" viewBox=\"0 0 24 24\"><path d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z\"/></svg>\n            </a>\n            <a href=\"https://www.tiktok.com/@Noteperf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-white hover:text-white text-stone-400 flex items-center justify-center transition\" aria-label=\"تيك توك نوت\">\n              <svg class=\"w-4 h-4 fill-current\" viewBox=\"0 0 24 24\"><path d=\"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.69c0 1.52-.33 3.07-1.17 4.33-.87 1.3-2.18 2.32-3.69 2.81-1.35.44-2.82.47-4.21.13-1.64-.41-3.13-1.42-4.14-2.78-1.21-1.64-1.68-3.79-1.33-5.81.36-2.02 1.63-3.83 3.44-4.82 1.34-.73 2.89-1.03 4.41-.9v4.11c-.72.04-1.45.22-2.07.6-.68.42-1.19 1.11-1.36 1.89-.2.86-.03 1.8.44 2.53.47.74 1.27 1.25 2.15 1.38.86.13 1.77-.07 2.47-.58.71-.51 1.15-1.33 1.18-2.22V.02h-.14z\"/></svg>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Payment & Shipping: وسائل الدفع والشحن المعتمدة -->\n      <div class=\"space-y-5\">\n        <div>\n          <h4 class=\"text-xs font-bold mb-2.5 text-white tracking-widest uppercase\">وسائل الدفع الآمنة</h4>\n          <div class=\"flex flex-wrap items-center gap-2\">\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"مدى Mada\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mada.png\" alt=\"مدى Mada\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"Apple Pay\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/apple_pay.svg\" alt=\"Apple Pay\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"Visa\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/visa.png\" alt=\"Visa\" class=\"h-2.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"Mastercard\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mastercard.png\" alt=\"Mastercard\" class=\"h-4 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2 bg-white rounded flex items-center justify-center shadow-xs\" title=\"تابي Tabby\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tabby.svg\" alt=\"تابي Tabby\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2 bg-white rounded flex items-center justify-center shadow-xs\" title=\"تمارا Tamara\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tamara.svg\" alt=\"تمارا Tamara\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n          </div>\n        </div>\n\n        <div>\n          <h4 class=\"text-xs font-bold mb-2.5 text-white tracking-widest uppercase\">شركاء الشحن والتوصيل</h4>\n          <div class=\"flex flex-wrap items-center gap-2\">\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"أرامكس Aramex\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/shipping/aramex.svg\" alt=\"أرامكس Aramex\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"سمسا SMSA Express\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/shipping/smsa.svg\" alt=\"سمسا SMSA Express\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"سُبل SPL البريد السعودي\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/shipping/spl.svg\" alt=\"سُبل SPL البريد السعودي\" class=\"h-4 w-auto object-contain\">\n            </div>\n          </div>\n        </div>\n\n        <p class=\"text-[11px] text-stone-500 pt-1\">جميع المعاملات المالية مشفرة ومؤمّنة بنسبة 100%</p>\n      </div>\n\n    </div>\n\n    <!-- Bottom Copyright -->\n    <div class=\"max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4\">\n      <p>جميع الحقوق محفوظة لدار نوت للعطور | NOTE Perfumes © 2026</p>\n      <p class=\"font-light\">صالة العرض والمقر الإداري: جدة، المملكة العربية السعودية</p>\n    </div>\n  </footer>\n\n  <!-- ================= 11. QUICK VIEW MODAL (PURE BLACK & WHITE MINIMALISM) ================= -->\n  <div id=\"quickview-modal\" class=\"fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4 transition-all duration-300\">\n    <div class=\"bg-white rounded-2xl max-w-3xl lg:max-w-4xl w-full overflow-hidden shadow-2xl relative text-right flex flex-col md:flex-row border border-stone-100 max-h-[92vh] overflow-y-auto\">\n      <button onclick=\"closeQuickView()\" class=\"absolute top-4 left-4 z-30 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-black flex items-center justify-center text-sm transition\" aria-label=\"إغلاق\">\n        <i class=\"sicon-cancel\"></i>\n      </button>\n\n      <div class=\"w-full md:w-1/2 relative bg-stone-50 overflow-hidden min-h-[340px] md:min-h-[480px] flex items-center justify-center p-6\">\n        <img id=\"modal-img\" src=\"\" alt=\"صورة العطر\" class=\"w-full h-full object-contain\">\n      </div>\n\n      <div class=\"w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-5\">\n        <div class=\"space-y-3\">\n          <span id=\"modal-cat\" class=\"text-[10px] text-stone-400 font-bold uppercase tracking-widest\">EXTRAIT DE PARFUM • 100 ML</span>\n          <h3 id=\"modal-title\" class=\"text-xl sm:text-2xl font-bold text-black\">اسم العطر</h3>\n          <p id=\"modal-slogan\" class=\"text-xs text-stone-600 font-normal leading-relaxed\"></p>\n          \n          <div class=\"bg-stone-50 p-4 rounded-xl text-xs space-y-2 border border-stone-100 mt-2\">\n            <h5 class=\"text-[11px] font-bold text-black border-b border-stone-200 pb-1.5\">الهرم العطري الكامل:</h5>\n            <p id=\"modal-top\" class=\"text-stone-700 text-xs\"></p>\n            <p id=\"modal-heart\" class=\"text-stone-700 text-xs\"></p>\n            <p id=\"modal-base\" class=\"text-stone-700 text-xs\"></p>\n          </div>\n\n          <div class=\"flex items-center gap-2 text-xs text-stone-700 pt-1\">\n            <i class=\"sicon-shield-check text-black\"></i>\n            <span>الضمان الذهبي: اختبر عينة التجربة قبل فتح العبوة الأساسية</span>\n          </div>\n        </div>\n\n        <div class=\"pt-4 border-t border-stone-100 space-y-3\">\n          <div class=\"flex items-center justify-between\">\n            <div>\n              <span id=\"modal-price\" class=\"text-2xl font-extrabold text-black\">229 ر.س</span>\n              <span class=\"block text-[10px] text-stone-400 font-normal mt-0.5\">شامل الضريبة المضافة</span>\n            </div>\n            <button id=\"modal-buy-btn\" class=\"px-8 py-3 rounded-full bg-black hover:bg-stone-800 text-white transition font-bold text-xs flex items-center gap-2 shadow-lg active:scale-95\">\n              <i class=\"sicon-shopping-bag\"></i>\n              <span>إضافة للسلة</span>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Notification Toast -->\n  <div id=\"cart-toast\" class=\"fixed top-6 left-1/2 -translate-x-1/2 z-50 transform -translate-y-24 opacity-0 transition-all duration-300 pointer-events-none px-6 py-3.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-3 bg-black text-white\">\n    <i class=\"sicon-check-circle text-white text-sm\"></i>\n    <span id=\"cart-toast-text\"></span>\n  </div>\n\n  <!-- Search Modal -->\n  <div id=\"search-modal\" class=\"fixed inset-0 z-50 bg-black/70 backdrop-blur-md hidden opacity-0 transition-opacity duration-300 flex items-start justify-center pt-20 sm:pt-28 px-4\">\n    <div class=\"relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300 text-right p-4 sm:p-6\">\n      <div class=\"flex items-center gap-3 border-b border-stone-200 pb-3\">\n        <i class=\"sicon-search text-stone-400 text-lg\"></i>\n        <input id=\"search-input\" type=\"text\" placeholder=\"ابحث عن عطرك المفضل، المكونات، النوتات...\" class=\"w-full bg-transparent text-sm text-black placeholder-stone-400 focus:outline-none font-medium\">\n        <button onclick=\"closeSearchModal()\" class=\"w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm transition\">\n          <i class=\"sicon-cancel\"></i>\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <!-- Mobile Drawer Menu -->\n  <div id=\"mobile-menu-drawer\" class=\"fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300\">\n    <div class=\"fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between transform translate-x-full transition-transform duration-300\">\n      <div>\n        <div class=\"flex items-center justify-between pb-6 border-b border-stone-100\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/logo_dark_crisp.png\" alt=\"NOTE\" class=\"h-8 w-auto\">\n          <button onclick=\"closeMobileMenu()\" class=\"w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-black\">\n            <i class=\"sicon-cancel text-sm\"></i>\n          </button>\n        </div>\n        <nav class=\"py-6 space-y-3.5 text-sm font-bold text-black\">\n          <a href=\"/\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">الرئيسية</a>\n          <a href=\"/categories\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">جميع المنتجات</a>\n          <a href=\"/categories/1748533/perfumes\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">العطور (100 مل)</a>\n          <a href=\"/categories/1500261/عطور-النيش\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">عطور النيش</a>\n          <a href=\"/categories/1697258/الأكثر-مبيعا\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">الأكثر مبيعاً</a>\n          <a href=\"/categories/1327929/newest-products\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">أحدث المنتجات</a>\n          <a href=\"/categories/1310036/30ml-perfumes\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">عطور 30 مل</a>\n          <a href=\"/categories/1688838/all-over-spray\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">معطر للجسم</a>\n          <a href=\"/categories/1752110/packages\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">مجموعات وباقات نوت</a>\n          <a href=\"/categories/1310037/معطرات-جو-وجسم\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">معطرات جو ومفارش</a>\n          <a href=\"/categories/1421002/tollah\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">تولات ودهن عود</a>\n        </nav>\n      </div>\n      <div class=\"text-xs text-stone-400 border-t border-stone-100 pt-4\">\n        <p>نوت للعطور © 2026</p>\n      </div>\n    </div>\n  </div>\n\n  <!-- Floating WhatsApp Luxury Button -->\n  <div id=\"floating-whatsapp-container\" class=\"fixed bottom-6 left-6 z-[90] flex items-center flex-row-reverse group select-none\" style=\"margin-bottom: env(safe-area-inset-bottom, 0px);\">\n    <a id=\"floating-whatsapp\" href=\"https://wa.me/966565955420?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%86%D9%88%D8%AA%20%D9%84%D9%84%D8%B9%D8%B7%D9%88%D8%B1%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300\" aria-label=\"تواصل معنا عبر واتساب\">\n      <span class=\"absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none\"></span>\n      <svg class=\"relative z-10 w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm\" viewBox=\"0 0 24 24\" aria-hidden=\"true\">\n        <path d=\"M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.177 1.564 5.927l-1.656 6.049 6.222-1.632c1.705.932 3.659 1.464 5.738 1.464 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 21.818c-1.895 0-3.652-.522-5.163-1.429l-.37-.22-3.842 1.008 1.025-3.742-.241-.384c-.997-1.589-1.524-3.435-1.524-5.342 0-5.413 4.406-9.818 9.819-9.818 5.414 0 9.818 4.405 9.818 9.818 0 5.414-4.404 9.818-9.818 9.818z\"/>\n      </svg>\n    </a>\n\n    <!-- Interactive Tooltip (Desktop) -->\n    <span class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/90 text-white text-xs font-semibold shadow-xl backdrop-blur mr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap\">\n      <span class=\"w-2 h-2 rounded-full bg-emerald-400 animate-pulse\"></span>\n      تواصل معنا مباشرة عبر واتساب\n    </span>\n  </div>\n<!-- ================= UNIVERSAL SLIDE-OUT CART DRAWER ================= -->\n  <div id=\"cart-drawer-overlay\" class=\"fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden opacity-0 transition-opacity duration-300\" onclick=\"CartManager.closeDrawer()\"></div>\n  <div id=\"cart-drawer\" class=\"fixed top-0 left-0 bottom-0 w-full sm:w-[420px] bg-white z-50 transform -translate-x-full transition-transform duration-300 flex flex-col justify-between shadow-2xl text-right hidden\">\n    <div class=\"p-5 border-b border-stone-100 flex items-center justify-between\">\n      <div class=\"flex items-center gap-2\">\n        <i class=\"sicon-shopping-bag text-lg text-black\"></i>\n        <h3 class=\"text-sm font-bold text-black\">سلة المشتريات</h3>\n        <span class=\"cart-badge-count text-xs font-bold text-stone-400\">(0)</span>\n      </div>\n      <button onclick=\"CartManager.closeDrawer()\" class=\"w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-black flex items-center justify-center transition\">\n        <i class=\"sicon-cancel text-sm\"></i>\n      </button>\n    </div>\n\n    <div class=\"px-5 py-3 bg-stone-50 border-b border-stone-100\">\n      <p id=\"cart-free-shipping-text\" class=\"text-xs text-stone-600 mb-1.5\"></p>\n      <div class=\"w-full bg-stone-200 h-1.5 rounded-full overflow-hidden\">\n        <div id=\"cart-free-shipping-progress\" class=\"bg-black h-full transition-all duration-500\" style=\"width: 0%\"></div>\n      </div>\n    </div>\n\n    <div id=\"cart-drawer-items\" class=\"p-5 flex-grow overflow-y-auto divide-y divide-stone-100\"></div>\n\n    <div id=\"cart-drawer-empty\" class=\"hidden flex flex-col items-center justify-center p-8 text-center my-auto\">\n      <div class=\"w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4\">\n        <i class=\"sicon-shopping-bag text-2xl\"></i>\n      </div>\n      <h4 class=\"text-sm font-bold text-black mb-1\">سلتك فارغة حالياً</h4>\n      <p class=\"text-xs text-stone-400 max-w-xs mb-6\">تصفح تشكيلتنا العطرية الاستثنائية واختر عطرك المفضل الآن</p>\n      <a href=\"/categories\" onclick=\"CartManager.closeDrawer()\" class=\"px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-stone-800 transition\">\n        تصفح العطور\n      </a>\n    </div>\n\n    <div id=\"cart-drawer-footer\" class=\"p-5 border-t border-stone-100 bg-white space-y-3\">\n      <div class=\"flex items-center justify-between text-xs font-bold text-stone-500\">\n        <span>المجموع الفرعي:</span>\n        <span id=\"cart-drawer-subtotal\" class=\"text-black font-extrabold text-sm\">0 ر.س</span>\n      </div>\n      <div class=\"flex items-center justify-between text-xs text-stone-400\">\n        <span>الشحن والضريبة:</span>\n        <span>يتم احتسابها عند الدفع</span>\n      </div>\n      <div class=\"flex items-center justify-between text-sm font-extrabold text-black pt-2 border-t border-stone-100\">\n        <span>الإجمالي التقديري:</span>\n        <span id=\"cart-drawer-total\">0 ر.س</span>\n      </div>\n\n      <div class=\"pt-2 space-y-2\">\n        <a href=\"/cart\" class=\"w-full py-3 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition duration-300 shadow-md\">\n          <span>إتمام الطلب بأمان</span>\n          <i class=\"sicon-keyboard_arrow_left text-sm\"></i>\n        </a>\n        <button onclick=\"CartManager.closeDrawer()\" class=\"w-full py-2.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs transition\">\n          متابعة التسوق\n        </button>\n      </div>\n    </div>\n  </div>";

    mainEl.prepend(storefrontContainer);

    // Initialize all components
    initSliders();
    handleHeaderScroll();
    initHeroCarousel();
    initOffersCarousel();
    CartManager.updateBadge();

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    console.log("NOTE Perfumes Master Storefront Mounted Successfully!");
  }

  // Global Exports for Interactive Event Handlers
  window.productsData = productsData;
  window.noteProductsCatalog = noteProductsCatalog;
  window.CartManager = CartManager;
  window.renderProductCard = renderProductCard;
  window.initSliders = initSliders;
  window.scrollSlider = scrollSlider;
  window.handleHeaderScroll = handleHeaderScroll;
  window.openQuickView = openQuickView;
  window.closeQuickView = closeQuickView;
  window.openSearchModal = openSearchModal;
  window.closeSearchModal = closeSearchModal;
  window.openMobileMenu = openMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.goToHeroSlide = goToHeroSlide;
  window.nextHeroSlide = nextHeroSlide;
  window.prevHeroSlide = prevHeroSlide;
  window.goToOfferSlide = goToOfferSlide;
  window.nextOfferSlide = nextOfferSlide;
  window.prevOfferSlide = prevOfferSlide;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountStorefront);
  } else {
    mountStorefront();
  }
})();
