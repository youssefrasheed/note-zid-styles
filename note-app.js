
(function() {
  console.log("NOTE Perfumes Live Engine Starting...");

  const ASSET_HOST = "https://youssefrasheed.github.io/note-zid-styles";

  // Check if we are on homepage
  const isHome = window.location.pathname === "/" || window.location.pathname === "/ar-sa" || window.location.pathname === "" || window.location.search.includes("theme=");
  if (!isHome) return;

  function initNoteApp() {
    // Find main container
    const mainEl = document.querySelector("main") || document.querySelector(".main-content") || document.querySelector("#main");
    if (!mainEl) {
      setTimeout(initNoteApp, 100);
      return;
    }

    // Check if already injected
    if (document.getElementById("note-luxury-storefront")) return;

    // Create container
    const storeContainer = document.createElement("div");
    storeContainer.id = "note-luxury-storefront";
    storeContainer.style.backgroundColor = "#FFFFFF";
    storeContainer.style.color = "#111827";
    storeContainer.style.fontFamily = "'Laverne', sans-serif";

    // Build the complete homepage HTML
    storeContainer.innerHTML = `
      <!-- Hero Banner -->
      <section class="relative w-full overflow-hidden bg-black text-white" style="min-height: 85vh; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 4rem;">
        <picture class="absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcset="${ASSET_HOST}/images/banners/mobile/NOTE_Musk_Centered_Minimal_Hero_Mobile.webp">
          <img src="${ASSET_HOST}/images/banners/desktop/NOTE_Musk_Centered_Minimal_Hero_Desktop.webp" alt="NOTE Perfumes Hero" class="w-full h-full object-cover object-center" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;">
        </picture>
        <div class="relative z-10 text-center px-4" style="position: relative; z-index: 10; text-align: center;">
          <h1 style="font-size: clamp(1.8rem, 4vw, 3.5rem); font-weight: 800; color: #FFFFFF; text-shadow: 0 4px 20px rgba(0,0,0,0.8); margin-bottom: 0.5rem; letter-spacing: -0.02em;">
            مِسك... أثر يُعرف قبل أن يُرى
          </h1>
          <p style="font-size: clamp(1rem, 2vw, 1.4rem); color: #E6D5B8; margin-bottom: 1.5rem; font-weight: 500; text-shadow: 0 2px 10px rgba(0,0,0,0.7);">
            الأثر الخالد قبل الحضور
          </p>
          <a href="#bestsellers" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.4); color: #FFFFFF; padding: 12px 36px; border-radius: 9999px; font-weight: 700; text-decoration: none; transition: all 0.3s ease;">
            اكتشف العطور
          </a>
        </div>
      </section>

      <!-- Trust Features -->
      <section style="background: #FAFAFA; border-bottom: 1px solid #EEEEEE; padding: 24px 16px;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; text-align: center;">
          <div style="padding: 12px;">
            <div style="font-size: 1.1rem; font-weight: 700; color: #111827; margin-bottom: 4px;">الضمان الذهبي</div>
            <div style="font-size: 0.85rem; color: #6B7280;">استرجاع مجاني بدون أي تعقيد</div>
          </div>
          <div style="padding: 12px;">
            <div style="font-size: 1.1rem; font-weight: 700; color: #111827; margin-bottom: 4px;">عطور أصلية 100%</div>
            <div style="font-size: 0.85rem; color: #6B7280;">مستخلصة من أجود الزيوت العالمية</div>
          </div>
          <div style="padding: 12px;">
            <div style="font-size: 1.1rem; font-weight: 700; color: #111827; margin-bottom: 4px;">شحن سريع وآمن</div>
            <div style="font-size: 0.85rem; color: #6B7280;">توصيل لكافة مدن المملكة ودول الخليج</div>
          </div>
          <div style="padding: 12px;">
            <div style="font-size: 1.1rem; font-weight: 700; color: #111827; margin-bottom: 4px;">دفع مرن وقسّطها</div>
            <div style="font-size: 0.85rem; color: #6B7280;">تابي، تمارا، ومدى وآبل باي</div>
          </div>
        </div>
      </section>

      <!-- Bestsellers Section -->
      <section id="bestsellers" style="max-width: 1320px; margin: 0 auto; padding: 60px 16px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 800; color: #111827; margin-bottom: 8px;">الأكثر مبيعاً</h2>
          <p style="font-size: 1rem; color: #6B7280;">التوليفات الأكثر طلباً وشهرة لدى عشاق نوت</p>
        </div>
        <div id="note-bestsellers-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px;">
          <!-- Injected dynamically -->
        </div>
      </section>

      <!-- Offers Carousel Section -->
      <section style="background: #F8F8F8; padding: 60px 0; overflow: hidden;">
        <div style="max-width: 1320px; margin: 0 auto; padding: 0 16px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h2 style="font-size: clamp(1.6rem, 2.5vw, 2.2rem); font-weight: 800; color: #111827; margin-bottom: 6px;">عروض وباكدجات نوت الحصرية</h2>
            <p style="font-size: 0.95rem; color: #6B7280;">مجموعات مختارة بعناية توفر لك أفضل قيمة وفخامة متكاملة</p>
          </div>
        </div>
        <div style="display: flex; gap: 20px; overflow-x: auto; padding: 0 16px 20px 16px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
          ${[
            { img: "01_Royal_Tobacco.webp", title: "مجموعة رويال توباكو" },
            { img: "02_Powderose.webp", title: "باكدج بودروز الفاخر" },
            { img: "03_Summer_Escape.webp", title: "مجموعة سمر إسكيب الصيفية" },
            { img: "04_Her_Signature.webp", title: "مجموعة هير سغنتشر النسائية" },
            { img: "05_Mens_Signature.webp", title: "مجموعة رجالية خاصة" },
            { img: "06_Night_Signature.webp", title: "مجموعة نايت سغنتشر المسائية" },
            { img: "07_Tollah_Collection.webp", title: "مجموعة التولات الملكية" },
            { img: "08_All_Over_Spray_Collection.webp", title: "مجموعة معطرات الجسم الشاملة" }
          ].map(offer => `
            <div style="flex: 0 0 clamp(280px, 32vw, 380px); scroll-snap-align: start; border-radius: 16px; overflow: hidden; background: #FFFFFF; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: transform 0.3s ease;">
              <img src="${ASSET_HOST}/images/offers/${offer.img}" alt="${offer.title}" style="width: 100%; height: auto; aspect-ratio: 16/9; object-fit: cover; display: block;">
              <div style="padding: 16px; text-align: center;">
                <h3 style="font-size: 1.05rem; font-weight: 700; color: #111827; margin-bottom: 8px;">${offer.title}</h3>
                <span style="display: inline-block; background: #111827; color: #FFFFFF; font-size: 0.8rem; font-weight: 700; padding: 6px 16px; border-radius: 9999px;">خصم خاص محدود</span>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Categories Lifestyle Grid -->
      <section style="max-width: 1320px; margin: 0 auto; padding: 70px 16px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 800; color: #111827; margin-bottom: 8px;">عوالم نوت العطرية</h2>
          <p style="font-size: 1rem; color: #6B7280;">تصفح التشكيلات حسب التصنيف</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
          ${[
            { img: "01_Perfumes_100ml_Range.webp", title: "العطور (100 مل)" },
            { img: "02_Niche_Perfumery_Option.webp", title: "عطور النيش" },
            { img: "03_Travel_30ml.webp", title: "عطور بيبي (30 مل)" },
            { img: "04_Perfume_Oils.webp", title: "التولات والمسك" },
            { img: "05_Body_Mist_Sea.webp", title: "معطرات الجسم" },
            { img: "06_Home_Linen_Realistic_Option.webp", title: "معطرات الجو والمفارش" },
            { img: "07_Body_Care.webp", title: "منتجات العناية" },
            { img: "08_Collections_Packages.webp", title: "العروض والباكدجات" }
          ].map(cat => `
            <div style="position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 3/4; background: #E5E7EB; group: hover; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <img src="${ASSET_HOST}/images/categories/${cat.img}" alt="${cat.title}" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;">
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 20px;">
                <h3 style="font-size: 1.2rem; font-weight: 800; color: #FFFFFF; text-shadow: 0 2px 8px rgba(0,0,0,0.6);">${cat.title}</h3>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- New Arrivals Grid -->
      <section style="max-width: 1320px; margin: 0 auto; padding: 40px 16px 80px 16px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 800; color: #111827; margin-bottom: 8px;">أحدث المنتجات</h2>
          <p style="font-size: 1rem; color: #6B7280;">إصدارات وتوليفات حصرية وصلت حديثاً إلى دار نوت</p>
        </div>
        <div id="note-new-arrivals-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px;">
          <!-- Injected dynamically -->
        </div>
      </section>
    `;

    // Replace original main content smoothly
    mainEl.innerHTML = "";
    mainEl.appendChild(storeContainer);

    // Populate products
    renderProducts();
  }

  function renderProducts() {
    const bestsellersContainer = document.getElementById("note-bestsellers-grid");
    const newArrivalsContainer = document.getElementById("note-new-arrivals-grid");

    const sampleProducts = [
      { id: "roayal-tobacco", name: "عطر رويال توباكو", price: "229 ر.س", old: "410 ر.س", tag: "الأكثر طلباً", img: "/products/NOTE_Royal_Tobacco_Flat_Lay.webp" },
      { id: "note-for-him", name: "عطر نوت فور هِم", price: "179 ر.س", old: "419 ر.س", tag: "الأكثر طلباً", img: "/products/NOTE_For_Him_Flat_Lay.webp" },
      { id: "oud-rosewood", name: "عطر عود روز وود", price: "189 ر.س", old: "380 ر.س", tag: "الأكثر طلباً", img: "/products/NOTE_Oud_Rosewood_Flat_Lay.webp" },
      { id: "aura-musk", name: "عطر أورا مسك", price: "169 ر.س", old: "350 ر.س", tag: "الأكثر طلباً", img: "/products/NOTE_Aura_Flat_Lay.webp" },
      { id: "phantom", name: "عطر فانتوم", price: "199 ر.س", old: "420 ر.س", tag: "حصري", img: "/products/NOTE_Phantom_Flat_Lay.webp" },
      { id: "powderose", name: "عطر بودروز", price: "179 ر.س", old: "370 ر.س", tag: "الأكثر مبيعاً", img: "/products/NOTE_Powderose_Large_Flat_Lay.webp" },
      { id: "sugar-oud", name: "عطر شوجر عود", price: "189 ر.س", old: "390 ر.س", tag: "جديد", img: "/products/NOTE_Sugar_Oud_Flat_Lay.webp" },
      { id: "lady-rose", name: "عطر ليدي روز", price: "169 ر.س", old: "340 ر.س", tag: "جديد", img: "/products/NOTE_Lady_Rose_Flat_Lay.webp" }
    ];

    function createCard(p) {
      return `
        <div style="background: transparent; text-align: center; padding: 12px; transition: transform 0.25s ease;">
          <div style="position: relative; aspect-ratio: 1; margin-bottom: 12px; background: #FAFAFA; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <img src="${ASSET_HOST}${p.img}" alt="${p.name}" style="width: 85%; height: 85%; object-fit: contain; transition: transform 0.3s ease;">
            <span style="position: absolute; top: 10px; right: 10px; background: #000000; color: #FFFFFF; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">${p.tag}</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 700; color: #111827; margin-bottom: 6px;">${p.name}</h4>
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 14px;">
            <span style="color: #DC2626; font-weight: 800; font-size: 1.15rem;">${p.price}</span>
            <span style="color: #9CA3AF; text-decoration: line-through; font-size: 0.85rem;">${p.old}</span>
          </div>
          <button onclick="window.location.href=/products" style="width: 100%; background: #000000; color: #FFFFFF; border: none; border-radius: 12px; padding: 11px; font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: background 0.2s ease;">
            إضافة للسلة
          </button>
        </div>
      `;
    }

    if (bestsellersContainer) {
      bestsellersContainer.innerHTML = sampleProducts.slice(0, 4).map(createCard).join("");
    }
    if (newArrivalsContainer) {
      newArrivalsContainer.innerHTML = sampleProducts.slice(4, 8).map(createCard).join("");
    }
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNoteApp);
  } else {
    initNoteApp();
  }
})();
