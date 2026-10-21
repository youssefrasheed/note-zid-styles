/**
 * NOTE Perfumes Official Storefront Engine for Zid
 * Version: 2.1.0 - Full Frameless Laverne Edition
 * Hosted via GitHub Pages CDN
 */
(function() {
  "use strict";
  console.log("NOTE Perfumes Live Engine v2.1.0 Starting...");

  const ASSET_HOST = "https://youssefrasheed.github.io/note-zid-styles";

  // Check homepage route
  const path = window.location.pathname;
  const isHome = path === "/" || path === "/ar-sa" || path === "/ar-sa/" || path === "" || window.location.search.includes("theme=");
  if (!isHome) return;

  // Ensure CSS is loaded
  if (!document.getElementById("note-luxury-css")) {
    const link = document.createElement("link");
    link.id = "note-luxury-css";
    link.rel = "stylesheet";
    link.href = ASSET_HOST + "/note.css?v=" + Date.now();
    document.head.appendChild(link);
  }

  // Official Product Catalog
  const products = [
  {
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
  }
];

  const offers = [
    { img: "01_Royal_Tobacco.webp", title: "مجموعة رويال توباكو الفاخرة", badge: "الأكثر طلباً", link: "/products/roayal-tobacco" },
    { img: "02_Powderose.webp", title: "باكدج بودروز الأيقوني", badge: "الأكثر مبيعاً", link: "/products/powderose" },
    { img: "03_Summer_Escape.webp", title: "مجموعة سمر إسكيب الصيفية", badge: "إصدار صيفي", link: "/products" },
    { img: "04_Her_Signature.webp", title: "مجموعة هير سغنتشر النسائية", badge: "أنثوي راقي", link: "/products/for-her" },
    { img: "05_Mens_Signature.webp", title: "مجموعة رجالية خاصة", badge: "رجالي متميز", link: "/products/note-for-him" },
    { img: "06_Night_Signature.webp", title: "مجموعة نايت سغنتشر المسائية", badge: "للمناسبات", link: "/products" },
    { img: "07_Tollah_Collection.webp", title: "مجموعة التولات الملكية", badge: "تولات فاخرة", link: "/products" },
    { img: "08_All_Over_Spray_Collection.webp", title: "مجموعة معطرات الجسم الشاملة", badge: "عناية كاملة", link: "/products" }
  ];

  const categories = [
    { catKey: "perfumes", img: "01_Perfumes_100ml_Range.webp", title: "العطور (100 مل)", sub: "توليفات كلاسيكية فاخرة" },
    { catKey: "niche", img: "02_Niche_Perfumery_Option.webp", title: "عطور النيش", sub: "إصدارات خاصة وحصرية" },
    { catKey: "travel", img: "03_Travel_30ml.webp", title: "عطور بيبي (30 مل)", sub: "حجم مثالي لحقيبتك وسفرك" },
    { catKey: "oils", img: "04_Perfume_Oils.webp", title: "التولات والمسك", sub: "أدهان ملكية ثباتها أسطوري" },
    { catKey: "mist", img: "05_Body_Mist_Sea.webp", title: "معطرات الجسم", sub: "انتعاش يدوم طوال اليوم" },
    { catKey: "linen", img: "06_Home_Linen_Realistic_Option.webp", title: "معطرات المفارش والجو", sub: "فخامة تملأ منزلك" },
    { catKey: "care", img: "07_Body_Care.webp", title: "منتجات العناية", sub: "ترطيب وملمس حريري مخملي" },
    { catKey: "packages", img: "08_Collections_Packages.webp", title: "العروض والباكدجات", sub: "أفضل قيمة وأفخم تجربة" }
  ];

  function buildProductCard(p) {
    const imgUrl = ASSET_HOST + p.img;
    const prodUrl = "/products/" + p.id;
    return `
      <div class="note-product-card" data-id="${p.id}" data-cat="${p.cat}" style="display: flex; flex-direction: column; justify-content: space-between; background: #FFFFFF; border-radius: 16px; padding: 14px; transition: transform 0.25s ease, box-shadow 0.25s ease; border: 1px solid #F3F4F6;">
        <div>
          <div style="position: relative; width: 100%; aspect-ratio: 1; background: #FAFAFA; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; cursor: pointer;" onclick="window.noteShowDetails('${p.id}')">
            <img src="${imgUrl}" alt="${p.title}" loading="lazy" style="width: 88%; height: 88%; object-fit: contain; transition: transform 0.35s ease;">
            ${p.tag ? `<span style="position: absolute; top: 8px; right: 8px; background: #111827; color: #FFFFFF; font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px; letter-spacing: -0.01em;">${p.tag}</span>` : ""}
            ${p.discount ? `<span style="position: absolute; top: 8px; left: 8px; background: #DC2626; color: #FFFFFF; font-size: 0.72rem; font-weight: 800; padding: 4px 8px; border-radius: 9999px;">${p.discount}</span>` : ""}
          </div>
          <div style="cursor: pointer;" onclick="window.noteShowDetails('${p.id}')">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #111827; margin: 0 0 4px 0; text-align: center;">${p.title}</h4>
            <div style="font-size: 0.78rem; color: #9CA3AF; text-align: center; margin-bottom: 6px; font-weight: 600;">${p.size || "100 مل"} • ${p.concentration || "Extrait de Parfum"}</div>
            ${p.notes ? `<div style="font-size: 0.76rem; color: #6B7280; text-align: center; margin-bottom: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 4px;">${p.notes}</div>` : ""}
          </div>
        </div>
        <div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px;">
            <span style="color: #DC2626; font-weight: 900; font-size: 1.25rem;">${p.price} ر.س</span>
            ${p.old_price ? `<span style="color: #9CA3AF; text-decoration: line-through; font-size: 0.88rem; font-weight: 500;">${p.old_price} ر.س</span>` : ""}
          </div>
          <div style="display: grid; grid-template-columns: 1fr; gap: 6px;">
            <button onclick="window.location.href='${prodUrl}'" style="width: 100%; background: #111827; color: #FFFFFF; border: none; border-radius: 10px; padding: 11px 0; font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: background 0.2s ease;">
              إضافة للسلة
            </button>
            <button onclick="window.noteShowDetails('${p.id}')" style="width: 100%; background: transparent; color: #4B5563; border: 1px solid #E5E7EB; border-radius: 10px; padding: 7px 0; font-weight: 600; font-size: 0.78rem; cursor: pointer;">
              تفاصيل ومكونات العطر
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderStorefront(container) {
    const bestsellers = products.filter(p => p.bestseller || ["roayal-tobacco", "note-for-him", "for-her", "oud-rosewood", "aura-musk", "phantom", "powderose", "sugar-oud"].includes(p.id)).slice(0, 8);

    container.innerHTML = `
      <!-- Hero Banner -->
      <section style="position: relative; width: 100%; min-height: 85vh; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 4rem; overflow: hidden; background: #000000;">
        <picture style="position: absolute; inset: 0; width: 100%; height: 100%;">
          <source media="(max-width: 768px)" srcset="${ASSET_HOST}/images/banners/mobile/NOTE_Musk_Centered_Minimal_Hero_Mobile.webp">
          <img src="${ASSET_HOST}/images/banners/desktop/NOTE_Musk_Centered_Minimal_Hero_Desktop.webp" alt="NOTE Perfumes Hero" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;">
        </picture>
        <div style="position: relative; z-10; text-align: center; padding: 0 16px; max-width: 800px;">
          <h1 style="font-size: clamp(2rem, 4.5vw, 3.8rem); font-weight: 900; color: #FFFFFF; text-shadow: 0 4px 24px rgba(0,0,0,0.85); margin-bottom: 0.6rem; letter-spacing: -0.02em; font-family: 'Laverne', sans-serif;">
            مِسك... أثر يُعرف قبل أن يُرى
          </h1>
          <p style="font-size: clamp(1.05rem, 2vw, 1.45rem); color: #E6D5B8; margin-bottom: 1.8rem; font-weight: 600; text-shadow: 0 2px 12px rgba(0,0,0,0.8);">
            الأثر الخالد قبل الحضور
          </p>
          <a href="#bestsellers" style="display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.18); backdrop-filter: blur(12px); border: 1.5px solid rgba(255,255,255,0.5); color: #FFFFFF; padding: 13px 40px; border-radius: 9999px; font-weight: 800; font-size: 1.05rem; text-decoration: none; transition: all 0.3s ease;">
            اكتشف العطور الأكثر طلباً
          </a>
        </div>
      </section>

      <!-- Trust Features -->
      <section style="background: #FAFAFA; border-bottom: 1px solid #EEEEEE; padding: 28px 16px;">
        <div style="max-width: 1320px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; text-align: center;">
          <div style="padding: 12px;">
            <div style="font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 4px;">الضمان الذهبي</div>
            <div style="font-size: 0.88rem; color: #6B7280; font-weight: 500;">استرجاع فوري ومجاني بدون أي تعقيد</div>
          </div>
          <div style="padding: 12px;">
            <div style="font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 4px;">عطور أصلية 100%</div>
            <div style="font-size: 0.88rem; color: #6B7280; font-weight: 500;">مستخلصة من أجود الزيوت العالمية الفاخرة</div>
          </div>
          <div style="padding: 12px;">
            <div style="font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 4px;">شحن سريع وآمن</div>
            <div style="font-size: 0.88rem; color: #6B7280; font-weight: 500;">توصيل لكافة مدن المملكة ودول الخليج</div>
          </div>
          <div style="padding: 12px;">
            <div style="font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 4px;">قسّطها بدون فوائد</div>
            <div style="font-size: 0.88rem; color: #6B7280; font-weight: 500;">تابي، تمارا، مدى، وآبل باي</div>
          </div>
        </div>
      </section>

      <!-- Bestsellers Section -->
      <section id="bestsellers" style="max-width: 1320px; margin: 0 auto; padding: 70px 16px;">
        <div style="text-align: center; margin-bottom: 44px;">
          <h2 style="font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 900; color: #111827; margin-bottom: 8px;">الأكثر مبيعاً</h2>
          <p style="font-size: 1.05rem; color: #6B7280; font-weight: 500;">التوليفات الأكثر طلباً وشهرة لدى عشاق نوت</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px;">
          ${bestsellers.map(buildProductCard).join("")}
        </div>
      </section>

      <!-- Offers Carousel Section -->
      <section style="background: #F8F8F8; padding: 70px 0; overflow: hidden;">
        <div style="max-width: 1320px; margin: 0 auto; padding: 0 16px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h2 style="font-size: clamp(1.7rem, 2.8vw, 2.3rem); font-weight: 900; color: #111827; margin-bottom: 6px;">عروض وباكدجات نوت الحصرية</h2>
            <p style="font-size: 1rem; color: #6B7280; font-weight: 500;">مجموعات مختارة بعناية توفر لك أفضل قيمة وتجربة عطرية متكاملة</p>
          </div>
        </div>
        <div style="display: flex; gap: 22px; overflow-x: auto; padding: 0 16px 24px 16px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
          ${offers.map(offer => `
            <div style="flex: 0 0 clamp(290px, 32vw, 390px); scroll-snap-align: start; border-radius: 18px; overflow: hidden; background: #FFFFFF; box-shadow: 0 6px 24px rgba(0,0,0,0.06); transition: transform 0.3s ease;">
              <a href="${offer.link}" style="display: block; text-decoration: none;">
                <img src="${ASSET_HOST}/images/offers/${offer.img}" alt="${offer.title}" loading="lazy" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block;">
                <div style="padding: 18px; text-align: center;">
                  <h3 style="font-size: 1.1rem; font-weight: 800; color: #111827; margin-bottom: 10px;">${offer.title}</h3>
                  <span style="display: inline-block; background: #111827; color: #FFFFFF; font-size: 0.82rem; font-weight: 700; padding: 6px 18px; border-radius: 9999px;">${offer.badge}</span>
                </div>
              </a>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Categories Lifestyle Grid -->
      <section style="max-width: 1320px; margin: 0 auto; padding: 80px 16px;">
        <div style="text-align: center; margin-bottom: 44px;">
          <h2 style="font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 900; color: #111827; margin-bottom: 8px;">عوالم نوت العطرية</h2>
          <p style="font-size: 1.05rem; color: #6B7280; font-weight: 500;">تصفح التشكيلات حسب التصنيف</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
          ${categories.map(cat => `
            <div onclick="window.noteFilterCategory('${cat.catKey}')" style="position: relative; border-radius: 18px; overflow: hidden; aspect-ratio: 3/4; background: #111827; cursor: pointer; box-shadow: 0 4px 18px rgba(0,0,0,0.06); transition: transform 0.3s ease;">
              <img src="${ASSET_HOST}/images/categories/${cat.img}" alt="${cat.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease;">
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 22px;">
                <h3 style="font-size: 1.3rem; font-weight: 900; color: #FFFFFF; margin: 0 0 4px 0; text-shadow: 0 2px 8px rgba(0,0,0,0.7);">${cat.title}</h3>
                <span style="font-size: 0.85rem; color: #E5E7EB; font-weight: 500;">${cat.sub}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- All Fragrances Catalog with Category Filter Tabs -->
      <section id="catalog-section" style="max-width: 1320px; margin: 0 auto; padding: 30px 16px 90px 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 900; color: #111827; margin-bottom: 8px;">تشكيلة نوت الكاملة</h2>
          <p style="font-size: 1.05rem; color: #6B7280; font-weight: 500;">استكشف كافة العطور والمنتجات الأصلية</p>
        </div>

        <!-- Filter Tabs -->
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 20px; margin-bottom: 30px; justify-content: flex-start; scrollbar-width: none;">
          <button class="note-filter-btn active" data-cat="all" onclick="window.noteFilterCategory('all')" style="white-space: nowrap; padding: 9px 20px; border-radius: 9999px; border: 1px solid #111827; background: #111827; color: #FFFFFF; font-weight: 700; font-size: 0.88rem; cursor: pointer;">الكل (${products.length})</button>
          <button class="note-filter-btn" data-cat="perfumes" onclick="window.noteFilterCategory('perfumes')" style="white-space: nowrap; padding: 9px 20px; border-radius: 9999px; border: 1px solid #E5E7EB; background: #FFFFFF; color: #4B5563; font-weight: 700; font-size: 0.88rem; cursor: pointer;">العطور</button>
          <button class="note-filter-btn" data-cat="niche" onclick="window.noteFilterCategory('niche')" style="white-space: nowrap; padding: 9px 20px; border-radius: 9999px; border: 1px solid #E5E7EB; background: #FFFFFF; color: #4B5563; font-weight: 700; font-size: 0.88rem; cursor: pointer;">عطور النيش</button>
          <button class="note-filter-btn" data-cat="travel" onclick="window.noteFilterCategory('travel')" style="white-space: nowrap; padding: 9px 20px; border-radius: 9999px; border: 1px solid #E5E7EB; background: #FFFFFF; color: #4B5563; font-weight: 700; font-size: 0.88rem; cursor: pointer;">عطور 30 مل</button>
          <button class="note-filter-btn" data-cat="oils" onclick="window.noteFilterCategory('oils')" style="white-space: nowrap; padding: 9px 20px; border-radius: 9999px; border: 1px solid #E5E7EB; background: #FFFFFF; color: #4B5563; font-weight: 700; font-size: 0.88rem; cursor: pointer;">التولات والمسك</button>
          <button class="note-filter-btn" data-cat="mist" onclick="window.noteFilterCategory('mist')" style="white-space: nowrap; padding: 9px 20px; border-radius: 9999px; border: 1px solid #E5E7EB; background: #FFFFFF; color: #4B5563; font-weight: 700; font-size: 0.88rem; cursor: pointer;">معطرات الجسم</button>
          <button class="note-filter-btn" data-cat="linen" onclick="window.noteFilterCategory('linen')" style="white-space: nowrap; padding: 9px 20px; border-radius: 9999px; border: 1px solid #E5E7EB; background: #FFFFFF; color: #4B5563; font-weight: 700; font-size: 0.88rem; cursor: pointer;">معطرات المفارش</button>
          <button class="note-filter-btn" data-cat="care" onclick="window.noteFilterCategory('care')" style="white-space: nowrap; padding: 9px 20px; border-radius: 9999px; border: 1px solid #E5E7EB; background: #FFFFFF; color: #4B5563; font-weight: 700; font-size: 0.88rem; cursor: pointer;">العناية</button>
        </div>

        <!-- Products Grid -->
        <div id="note-catalog-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px;">
          ${products.map(buildProductCard).join("")}
        </div>
      </section>

      <!-- Details Modal Backdrop -->
      <div id="note-modal-backdrop" onclick="if (event.target === this) window.noteCloseModal()" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 99999; backdrop-filter: blur(6px); align-items: center; justify-content: center; padding: 16px;">
        <div id="note-modal-box" style="background: #FFFFFF; border-radius: 20px; max-width: 650px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 24px; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.3); text-align: right;">
          <button onclick="window.noteCloseModal()" style="position: absolute; top: 16px; left: 16px; background: #F3F4F6; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; font-weight: 700; display: flex; align-items: center; justify-content: center; color: #4B5563;">✕</button>
          <div id="note-modal-content"></div>
        </div>
      </div>
    `;
  }

  // Close modal on Escape
  window.addEventListener("keydown", function(e) {
    if (e.key === "Escape") window.noteCloseModal();
  });


  // Interactive filtering
  window.noteFilterCategory = function(catKey) {
    const grid = document.getElementById("note-catalog-grid");
    const btns = document.querySelectorAll(".note-filter-btn");
    btns.forEach(b => {
      if (b.dataset.cat === catKey) {
        b.style.background = "#111827";
        b.style.color = "#FFFFFF";
        b.style.borderColor = "#111827";
      } else {
        b.style.background = "#FFFFFF";
        b.style.color = "#4B5563";
        b.style.borderColor = "#E5E7EB";
      }
    });

    if (!grid) return;
    const cards = grid.querySelectorAll(".note-product-card");
    cards.forEach(c => {
      if (catKey === "all" || c.dataset.cat === catKey) {
        c.style.display = "flex";
      } else {
        c.style.display = "none";
      }
    });
    
    // Scroll to catalog section if triggered from categories
    const catalogSec = document.getElementById("catalog-section");
    if (catalogSec && window.scrollY > catalogSec.offsetTop + 300) {
      catalogSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Interactive Product Details Modal
  window.noteShowDetails = function(prodId) {
    const p = products.find(item => item.id === prodId);
    if (!p) return;

    const backdrop = document.getElementById("note-modal-backdrop");
    const content = document.getElementById("note-modal-content");
    if (!backdrop || !content) return;

    content.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px; flex-wrap: wrap;">
        <div style="width: 140px; height: 140px; background: #FAFAFA; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <img src="${ASSET_HOST}${p.img}" alt="${p.title}" style="width: 85%; height: 85%; object-fit: contain;">
        </div>
        <div style="flex: 1; min-width: 200px;">
          <span style="display: inline-block; background: #111827; color: #FFFFFF; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-bottom: 6px;">${p.tag || "عطر فاخر"}</span>
          <h2 style="font-size: 1.4rem; font-weight: 900; color: #111827; margin: 0 0 4px 0;">${p.title}</h2>
          <div style="font-size: 0.85rem; color: #6B7280; font-weight: 600; margin-bottom: 8px;">${p.title_en || ""} • ${p.size || "100 مل"}</div>
          <div style="display: flex; align-items: baseline; gap: 10px;">
            <span style="color: #DC2626; font-size: 1.4rem; font-weight: 900;">${p.price} ر.س</span>
            ${p.old_price ? `<span style="color: #9CA3AF; text-decoration: line-through; font-size: 0.95rem;">${p.old_price} ر.س</span>` : ""}
          </div>
        </div>
      </div>

      ${p.slogan ? `<div style="background: #FDF8F0; border-right: 4px solid #D4AF37; padding: 12px 16px; border-radius: 8px; margin-bottom: 18px; font-weight: 600; color: #78350F; font-size: 0.92rem; line-height: 1.6;">${p.slogan}</div>` : ""}

      ${p.description ? `<div style="font-size: 0.92rem; color: #374151; line-height: 1.8; margin-bottom: 22px;">${p.description}</div>` : ""}

      <!-- Fragrance Pyramid -->
      ${(p.top || p.heart || p.base) ? `
        <div style="background: #F9FAFB; border-radius: 14px; padding: 16px; margin-bottom: 22px;">
          <h4 style="font-size: 1rem; font-weight: 800; color: #111827; margin: 0 0 12px 0;">الهرم العطري والمكونات:</h4>
          ${p.top ? `<div style="margin-bottom: 8px; font-size: 0.88rem;"><strong style="color: #111827;">القمة العطرية:</strong> <span style="color: #4B5563;">${p.top}</span></div>` : ""}
          ${p.heart ? `<div style="margin-bottom: 8px; font-size: 0.88rem;"><strong style="color: #111827;">القلب العطري:</strong> <span style="color: #4B5563;">${p.heart}</span></div>` : ""}
          ${p.base ? `<div style="font-size: 0.88rem;"><strong style="color: #111827;">القاعدة العطرية:</strong> <span style="color: #4B5563;">${p.base}</span></div>` : ""}
        </div>
      ` : ""}

      <div style="display: flex; gap: 10px; margin-top: 10px;">
        <button onclick="window.location.href='/products/${p.id}'" style="flex: 2; background: #111827; color: #FFFFFF; border: none; border-radius: 12px; padding: 14px; font-weight: 800; font-size: 1rem; cursor: pointer;">
          إضافة للسلة والطلب
        </button>
        <button onclick="window.open('https://wa.me/966565955420?text=' + encodeURIComponent('مرحباً، أود الاستفسار عن عطر: ' + '${p.title}'), '_blank')" style="flex: 1; background: #25D366; color: #FFFFFF; border: none; border-radius: 12px; padding: 14px; font-weight: 700; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          استفسار واتساب
        </button>
      </div>
    `;

    backdrop.style.display = "flex";
  };

  window.noteCloseModal = function() {
    const backdrop = document.getElementById("note-modal-backdrop");
    if (backdrop) backdrop.style.display = "none";
  };

  function initNoteApp() {
    const mainEl = document.querySelector(".tp-home") || 
                   document.querySelector(".main.app-content") || 
                   document.querySelector(".app-content") || 
                   document.querySelector("main") || 
                   document.querySelector("#main");
    
    if (!mainEl) {
      setTimeout(initNoteApp, 50);
      return;
    }

    if (document.getElementById("note-luxury-storefront")) return;

    // Hide original Rozia homepage sections
    const defaultSections = mainEl.querySelectorAll(".s-block, .tp-slider-banners, .tp-product-card, .tp-banners, .tp-brands");
    defaultSections.forEach(sec => {
      sec.style.display = "none";
    });

    // Create luxury container
    const storeContainer = document.createElement("div");
    storeContainer.id = "note-luxury-storefront";
    storeContainer.style.backgroundColor = "#FFFFFF";
    storeContainer.style.color = "#111827";
    storeContainer.style.fontFamily = "'Laverne', sans-serif";

    mainEl.prepend(storeContainer);
    renderStorefront(storeContainer);
    console.log("NOTE Perfumes Live Engine Rendered Successfully!");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNoteApp);
  } else {
    initNoteApp();
  }
})();
