/**
 * NOTE Perfumes Official Storefront Engine for Zid
 * Version: 4.5.6 - Full Multi-Page SPA Client Master Edition
 * Authentic NOTE Perfumes Storefront Engine
 * Hosted via GitHub Pages CDN: https://youssefrasheed.github.io/note-zid-styles/
 */
(function() {
  "use strict";
  if (/^\/(checkout|auth|account)(\/|$)/.test(location.pathname) || new URLSearchParams(location.search).get("native")==="1") {
    const releaseNative=()=>document.body?.classList.add('note-ready');
    if(document.body) releaseNative(); else document.addEventListener('DOMContentLoaded',releaseNative,{once:true});
    return;
  }
  console.log("NOTE Perfumes Master Engine v4.5.6 Starting...");

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
    'royal-powder': 'رويال-باودر',
    'pkg-linen-collection': 'مجموعة-معطرات-الجو-و-المفارش',
    'مجموعة-معطرات-الجو-و-المفارش': 'مجموعة-معطرات-الجو-و-المفارش'
  };

  const catUrlMap = {
    'all': '/categories',
    'perfumes': '/categories/1748533/perfumes',
    'niche': '/categories/1500261/عطور-النيش',
    'bestsellers': '/categories/1697258/الأكثر-مبيعا',
    'new': '/categories/1327929/newest-products',
    'travel': '/categories/1310036/30ml-perfumes',
    'all-over': '/categories/1688838/all-over-spray',
    'packages': '/categories/1752110/packages',
    'linen': '/categories/1310037/معطرات-جو-وجسم',
    'tollah': '/categories/1421002/tollah',
    'body-care': '/categories/1750048/body-care-products'
  };

  // 1. Inject Salla Icons CSS if not loaded
  if (!document.getElementById("salla-icons-css")) {
    const sallaLink = document.createElement("link");
    sallaLink.id = "salla-icons-css";
    sallaLink.rel = "stylesheet";
    sallaLink.href = "https://assets.salla.cloud/fonts/sallaicons.css";
    document.head.appendChild(sallaLink);
  }

  // Precompiled styles are installed before any storefront DOM is mounted.
  if (document.documentElement.dataset.noteEngineStarted) return;
  document.documentElement.dataset.noteEngineStarted='4.5.6';
  const utilityStyles=document.createElement('style');
  utilityStyles.id='note-utilities-css';
  utilityStyles.textContent="*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:\"\"}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Laverne,system-ui,sans-serif;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.\\!container{width:100%!important}.container{width:100%}@media (min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media (min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media (min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media (min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media (min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.inset-0{inset:0}.-left-3{left:-.75rem}.-right-1{right:-.25rem}.-right-3{right:-.75rem}.-top-1{top:-.25rem}.bottom-0{bottom:0}.bottom-2\\.5{bottom:.625rem}.bottom-3{bottom:.75rem}.bottom-4{bottom:1rem}.bottom-\\[90px\\]{bottom:90px}.left-0{left:0}.left-1\\/2{left:50%}.left-2{left:.5rem}.left-3{left:.75rem}.left-4{left:1rem}.right-0{right:0}.right-2{right:.5rem}.right-2\\.5{right:.625rem}.right-3{right:.75rem}.right-3\\.5{right:.875rem}.right-4{right:1rem}.top-0{top:0}.top-1\\/2{top:50%}.top-1\\/3{top:33.333333%}.top-2{top:.5rem}.top-2\\.5{top:.625rem}.top-20{top:5rem}.top-4{top:1rem}.top-6{top:1.5rem}.z-0{z-index:0}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-50{z-index:50}.z-\\[100\\]{z-index:100}.z-\\[90\\]{z-index:90}.mx-auto{margin-left:auto;margin-right:auto}.my-auto{margin-top:auto;margin-bottom:auto}.mb-1{margin-bottom:.25rem}.mb-1\\.5{margin-bottom:.375rem}.mb-10{margin-bottom:2.5rem}.mb-12{margin-bottom:3rem}.mb-2{margin-bottom:.5rem}.mb-2\\.5{margin-bottom:.625rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-1{margin-left:.25rem}.mr-1{margin-right:.25rem}.mr-3{margin-right:.75rem}.mr-auto{margin-right:auto}.mt-0{margin-top:0}.mt-0\\.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-1\\.5{margin-top:.375rem}.mt-10{margin-top:2.5rem}.mt-12{margin-top:3rem}.mt-16{margin-top:4rem}.mt-2{margin-top:.5rem}.mt-2\\.5{margin-top:.625rem}.mt-20{margin-top:5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.mt-8{margin-top:2rem}.line-clamp-1{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.\\!grid{display:grid!important}.grid{display:grid}.hidden{display:none}.aspect-\\[2\\/1\\]{aspect-ratio:2/1}.aspect-\\[3\\/4\\]{aspect-ratio:3/4}.aspect-square{aspect-ratio:1/1}.h-1{height:.25rem}.h-1\\.5{height:.375rem}.h-10{height:2.5rem}.h-11{height:2.75rem}.h-12{height:3rem}.h-14{height:3.5rem}.h-16{height:4rem}.h-2{height:.5rem}.h-2\\.5{height:.625rem}.h-20{height:5rem}.h-3{height:.75rem}.h-3\\.5{height:.875rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-9{height:2.25rem}.h-\\[18px\\]{height:18px}.h-auto{height:auto}.h-full{height:100%}.max-h-\\[50vh\\]{max-height:50vh}.max-h-\\[85vh\\]{max-height:85vh}.max-h-\\[92vh\\]{max-height:92vh}.min-h-\\[340px\\]{min-height:340px}.min-h-\\[720px\\]{min-height:720px}.min-h-screen{min-height:100vh}.w-10{width:2.5rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-14{width:3.5rem}.w-16{width:4rem}.w-2{width:.5rem}.w-20{width:5rem}.w-4{width:1rem}.w-4\\/5{width:80%}.w-5{width:1.25rem}.w-6{width:1.5rem}.w-7{width:1.75rem}.w-8{width:2rem}.w-9{width:2.25rem}.w-auto{width:auto}.w-full{width:100%}.min-w-0{min-width:0}.min-w-\\[16px\\]{min-width:16px}.min-w-\\[175px\\]{min-width:175px}.min-w-\\[18px\\]{min-width:18px}.min-w-\\[20px\\]{min-width:20px}.min-w-\\[80px\\]{min-width:80px}.max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-7xl{max-width:80rem}.max-w-\\[185px\\]{max-width:185px}.max-w-\\[200px\\]{max-width:200px}.max-w-md{max-width:28rem}.max-w-sm{max-width:24rem}.max-w-xs{max-width:20rem}.flex-shrink{flex-shrink:1}.flex-shrink-0,.shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.-translate-x-1\\/2{--tw-translate-x:-50%}.-translate-x-1\\/2,.-translate-x-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-x-full{--tw-translate-x:-100%}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.-translate-y-24{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-24{--tw-translate-y:-6rem}.translate-x-0{--tw-translate-x:0px}.translate-x-0,.translate-x-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-full{--tw-translate-x:100%}.translate-y-0{--tw-translate-y:0px}.scale-125,.translate-y-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-125{--tw-scale-x:1.25;--tw-scale-y:1.25}.scale-95{--tw-scale-x:.95;--tw-scale-y:.95}.scale-95,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes ping{75%,to{transform:scale(2);opacity:0}}.animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.resize-none{resize:none}.list-inside{list-style-position:inside}.list-decimal{list-style-type:decimal}.list-disc{list-style-type:disc}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.flex-row-reverse{flex-direction:row-reverse}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.flex-nowrap{flex-wrap:nowrap}.items-start{align-items:flex-start}.items-center{align-items:center}.items-baseline{align-items:baseline}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-10{gap:2.5rem}.gap-2{gap:.5rem}.gap-2\\.5{gap:.625rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-6{gap:1.5rem}.gap-7{gap:1.75rem}.gap-8{gap:2rem}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.25rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem*var(--tw-space-y-reverse))}.space-y-1\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.375rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem*var(--tw-space-y-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.5rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem*var(--tw-space-y-reverse))}.space-y-2\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.625rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.625rem*var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.75rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem*var(--tw-space-y-reverse))}.space-y-3\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.875rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.875rem*var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem*var(--tw-space-y-reverse))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1.25rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem*var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1.5rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem*var(--tw-space-y-reverse))}.space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2rem*var(--tw-space-y-reverse))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse:0;border-top-width:calc(1px*(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px*var(--tw-divide-y-reverse))}.divide-stone-100>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(245 245 244/var(--tw-divide-opacity,1))}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.scroll-smooth{scroll-behavior:smooth}.truncate{overflow:hidden;text-overflow:ellipsis}.truncate,.whitespace-nowrap{white-space:nowrap}.break-all{word-break:break-all}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-r{border-right-width:1px}.border-t{border-top-width:1px}.border-amber-100{--tw-border-opacity:1;border-color:rgb(254 243 199/var(--tw-border-opacity,1))}.border-amber-200\\/60{border-color:hsla(48,97%,77%,.6)}.border-amber-200\\/70{border-color:hsla(48,97%,77%,.7)}.border-black{--tw-border-opacity:1;border-color:rgb(0 0 0/var(--tw-border-opacity,1))}.border-current{border-color:currentColor}.border-emerald-200{--tw-border-opacity:1;border-color:rgb(167 243 208/var(--tw-border-opacity,1))}.border-rose-200{--tw-border-opacity:1;border-color:rgb(254 205 211/var(--tw-border-opacity,1))}.border-stone-100{--tw-border-opacity:1;border-color:rgb(245 245 244/var(--tw-border-opacity,1))}.border-stone-200{--tw-border-opacity:1;border-color:rgb(231 229 228/var(--tw-border-opacity,1))}.border-stone-200\\/50{border-color:hsla(20,6%,90%,.5)}.border-stone-200\\/60{border-color:hsla(20,6%,90%,.6)}.border-stone-200\\/70{border-color:hsla(20,6%,90%,.7)}.border-stone-200\\/80{border-color:hsla(20,6%,90%,.8)}.border-stone-200\\/90{border-color:hsla(20,6%,90%,.9)}.border-stone-300{--tw-border-opacity:1;border-color:rgb(214 211 209/var(--tw-border-opacity,1))}.border-stone-800{--tw-border-opacity:1;border-color:rgb(41 37 36/var(--tw-border-opacity,1))}.border-white\\/10{border-color:hsla(0,0%,100%,.1)}.border-white\\/20{border-color:hsla(0,0%,100%,.2)}.bg-\\[\\#25D366\\]{--tw-bg-opacity:1;background-color:rgb(37 211 102/var(--tw-bg-opacity,1))}.bg-\\[\\#3EEDBF\\]{--tw-bg-opacity:1;background-color:rgb(62 237 191/var(--tw-bg-opacity,1))}.bg-\\[\\#FAF9F7\\]{--tw-bg-opacity:1;background-color:rgb(250 249 247/var(--tw-bg-opacity,1))}.bg-amber-100\\/90{background-color:hsla(48,96%,89%,.9)}.bg-amber-50\\/60{background-color:rgba(255,251,235,.6)}.bg-amber-50\\/70{background-color:rgba(255,251,235,.7)}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1))}.bg-black\\/25{background-color:rgba(0,0,0,.25)}.bg-black\\/30{background-color:rgba(0,0,0,.3)}.bg-black\\/40{background-color:rgba(0,0,0,.4)}.bg-black\\/60{background-color:rgba(0,0,0,.6)}.bg-black\\/70{background-color:rgba(0,0,0,.7)}.bg-black\\/75{background-color:rgba(0,0,0,.75)}.bg-black\\/80{background-color:rgba(0,0,0,.8)}.bg-black\\/90{background-color:rgba(0,0,0,.9)}.bg-emerald-100{--tw-bg-opacity:1;background-color:rgb(209 250 229/var(--tw-bg-opacity,1))}.bg-emerald-400{--tw-bg-opacity:1;background-color:rgb(52 211 153/var(--tw-bg-opacity,1))}.bg-emerald-50{--tw-bg-opacity:1;background-color:rgb(236 253 245/var(--tw-bg-opacity,1))}.bg-emerald-600{--tw-bg-opacity:1;background-color:rgb(5 150 105/var(--tw-bg-opacity,1))}.bg-rose-100{--tw-bg-opacity:1;background-color:rgb(255 228 230/var(--tw-bg-opacity,1))}.bg-rose-50{--tw-bg-opacity:1;background-color:rgb(255 241 242/var(--tw-bg-opacity,1))}.bg-stone-100{--tw-bg-opacity:1;background-color:rgb(245 245 244/var(--tw-bg-opacity,1))}.bg-stone-200{--tw-bg-opacity:1;background-color:rgb(231 229 228/var(--tw-bg-opacity,1))}.bg-stone-50{--tw-bg-opacity:1;background-color:rgb(250 250 249/var(--tw-bg-opacity,1))}.bg-stone-50\\/50{background-color:hsla(60,9%,98%,.5)}.bg-stone-50\\/60{background-color:hsla(60,9%,98%,.6)}.bg-stone-50\\/70{background-color:hsla(60,9%,98%,.7)}.bg-stone-50\\/80{background-color:hsla(60,9%,98%,.8)}.bg-stone-900{--tw-bg-opacity:1;background-color:rgb(28 25 23/var(--tw-bg-opacity,1))}.bg-stone-900\\/95{background-color:rgba(28,25,23,.95)}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.bg-white\\/20{background-color:hsla(0,0%,100%,.2)}.bg-white\\/40{background-color:hsla(0,0%,100%,.4)}.bg-white\\/70{background-color:hsla(0,0%,100%,.7)}.bg-white\\/85{background-color:hsla(0,0%,100%,.85)}.bg-white\\/95{background-color:hsla(0,0%,100%,.95)}.bg-gradient-to-t{background-image:linear-gradient(to top,var(--tw-gradient-stops))}.from-black\\/95{--tw-gradient-from:rgba(0,0,0,.95) var(--tw-gradient-from-position);--tw-gradient-to:transparent var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.via-black\\/40{--tw-gradient-to:transparent var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),rgba(0,0,0,.4) var(--tw-gradient-via-position),var(--tw-gradient-to)}.via-35\\%{--tw-gradient-via-position:35%}.to-transparent{--tw-gradient-to:transparent var(--tw-gradient-to-position)}.fill-current{fill:currentColor}.object-contain{-o-object-fit:contain;object-fit:contain}.object-cover{-o-object-fit:cover;object-fit:cover}.object-center{-o-object-position:center;object-position:center}.p-0{padding:0}.p-0\\.5{padding:.125rem}.p-1{padding:.25rem}.p-1\\.5{padding:.375rem}.p-2{padding:.5rem}.p-2\\.5{padding:.625rem}.p-3{padding:.75rem}.p-3\\.5{padding:.875rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.p-8{padding:2rem}.px-1{padding-left:.25rem;padding-right:.25rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-3\\.5{padding-left:.875rem;padding-right:.875rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.px-7{padding-left:1.75rem;padding-right:1.75rem}.px-8{padding-left:2rem;padding-right:2rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-10{padding-top:2.5rem;padding-bottom:2.5rem}.py-14{padding-top:3.5rem;padding-bottom:3.5rem}.py-16{padding-top:4rem;padding-bottom:4rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.py-20{padding-top:5rem;padding-bottom:5rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-3\\.5{padding-top:.875rem;padding-bottom:.875rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.pb-0{padding-bottom:0}.pb-0\\.5{padding-bottom:.125rem}.pb-1{padding-bottom:.25rem}.pb-1\\.5{padding-bottom:.375rem}.pb-10{padding-bottom:2.5rem}.pb-12{padding-bottom:3rem}.pb-2{padding-bottom:.5rem}.pb-20{padding-bottom:5rem}.pb-24{padding-bottom:6rem}.pb-3{padding-bottom:.75rem}.pb-3\\.5{padding-bottom:.875rem}.pb-5{padding-bottom:1.25rem}.pb-6{padding-bottom:1.5rem}.pl-8{padding-left:2rem}.pr-1{padding-right:.25rem}.pr-10{padding-right:2.5rem}.pr-2{padding-right:.5rem}.pr-3{padding-right:.75rem}.pt-1{padding-top:.25rem}.pt-10{padding-top:2.5rem}.pt-14{padding-top:3.5rem}.pt-16{padding-top:4rem}.pt-2{padding-top:.5rem}.pt-28{padding-top:7rem}.pt-3{padding-top:.75rem}.pt-3\\.5{padding-top:.875rem}.pt-32{padding-top:8rem}.pt-4{padding-top:1rem}.pt-6{padding-top:1.5rem}.pt-8{padding-top:2rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.font-sans{font-family:Laverne,system-ui,sans-serif}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-\\[9px\\]{font-size:9px}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-black{font-weight:900}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-light{font-weight:300}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.leading-relaxed{line-height:1.625}.leading-snug{line-height:1.375}.leading-tight{line-height:1.25}.tracking-tight{letter-spacing:-.025em}.tracking-wider{letter-spacing:.05em}.tracking-widest{letter-spacing:.1em}.text-amber-500{--tw-text-opacity:1;color:rgb(245 158 11/var(--tw-text-opacity,1))}.text-amber-800{--tw-text-opacity:1;color:rgb(146 64 14/var(--tw-text-opacity,1))}.text-amber-900{--tw-text-opacity:1;color:rgb(120 53 15/var(--tw-text-opacity,1))}.text-black{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity,1))}.text-emerald-400{--tw-text-opacity:1;color:rgb(52 211 153/var(--tw-text-opacity,1))}.text-emerald-600{--tw-text-opacity:1;color:rgb(5 150 105/var(--tw-text-opacity,1))}.text-emerald-800{--tw-text-opacity:1;color:rgb(6 95 70/var(--tw-text-opacity,1))}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity,1))}.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39/var(--tw-text-opacity,1))}.text-inherit{color:inherit}.text-rose-600{--tw-text-opacity:1;color:rgb(225 29 72/var(--tw-text-opacity,1))}.text-rose-700{--tw-text-opacity:1;color:rgb(190 18 60/var(--tw-text-opacity,1))}.text-stone-200{--tw-text-opacity:1;color:rgb(231 229 228/var(--tw-text-opacity,1))}.text-stone-300{--tw-text-opacity:1;color:rgb(214 211 209/var(--tw-text-opacity,1))}.text-stone-400{--tw-text-opacity:1;color:rgb(168 162 158/var(--tw-text-opacity,1))}.text-stone-500{--tw-text-opacity:1;color:rgb(120 113 108/var(--tw-text-opacity,1))}.text-stone-600{--tw-text-opacity:1;color:rgb(87 83 78/var(--tw-text-opacity,1))}.text-stone-700{--tw-text-opacity:1;color:rgb(68 64 60/var(--tw-text-opacity,1))}.text-stone-800{--tw-text-opacity:1;color:rgb(41 37 36/var(--tw-text-opacity,1))}.text-stone-900{--tw-text-opacity:1;color:rgb(28 25 23/var(--tw-text-opacity,1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.underline{text-decoration-line:underline}.line-through{text-decoration-line:line-through}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.placeholder-stone-400::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(168 162 158/var(--tw-placeholder-opacity,1))}.placeholder-stone-400::placeholder{--tw-placeholder-opacity:1;color:rgb(168 162 158/var(--tw-placeholder-opacity,1))}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-30{opacity:.3}.opacity-40{opacity:.4}.opacity-60{opacity:.6}.opacity-75{opacity:.75}.opacity-80{opacity:.8}.shadow-2xl{--tw-shadow:0 25px 50px -12px rgba(0,0,0,.25);--tw-shadow-colored:0 25px 50px -12px var(--tw-shadow-color)}.shadow-2xl,.shadow-\\[0_4px_20px_-10px_rgba\\(0\\2c 0\\2c 0\\2c 0\\.06\\)\\]{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-\\[0_4px_20px_-10px_rgba\\(0\\2c 0\\2c 0\\2c 0\\.06\\)\\]{--tw-shadow:0 4px 20px -10px rgba(0,0,0,.06);--tw-shadow-colored:0 4px 20px -10px var(--tw-shadow-color)}.shadow-\\[0_6px_25px_rgba\\(37\\2c 211\\2c 102\\2c 0\\.45\\)\\]{--tw-shadow:0 6px 25px rgba(37,211,102,.45);--tw-shadow-colored:0 6px 25px var(--tw-shadow-color)}.shadow-\\[0_6px_25px_rgba\\(37\\2c 211\\2c 102\\2c 0\\.45\\)\\],.shadow-lg{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-md,.shadow-none{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-none{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000}.shadow-sm{--tw-shadow:0 1px 2px 0 rgba(0,0,0,.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color)}.shadow-sm,.shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color)}.blur{--tw-blur:blur(8px)}.blur,.drop-shadow-lg{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow-lg{--tw-drop-shadow:drop-shadow(0 10px 8px rgba(0,0,0,.04)) drop-shadow(0 4px 3px rgba(0,0,0,.1))}.drop-shadow-md{--tw-drop-shadow:drop-shadow(0 4px 3px rgba(0,0,0,.07)) drop-shadow(0 2px 2px rgba(0,0,0,.06))}.drop-shadow-md,.drop-shadow-sm{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow-sm{--tw-drop-shadow:drop-shadow(0 1px 1px rgba(0,0,0,.05))}.grayscale{--tw-grayscale:grayscale(100%)}.filter,.grayscale{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur{--tw-backdrop-blur:blur(8px)}.backdrop-blur,.backdrop-blur-md{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-md{--tw-backdrop-blur:blur(12px)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px)}.backdrop-blur-sm,.backdrop-blur-xl{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-xl{--tw-backdrop-blur:blur(24px)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-1000{transition-duration:1s}.duration-300{transition-duration:.3s}.duration-500{transition-duration:.5s}.duration-700{transition-duration:.7s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}#note-luxury-storefront #cart-drawer-overlay.hidden,#note-luxury-storefront #cart-drawer.hidden,#note-luxury-storefront #mobile-menu-drawer.hidden,#note-luxury-storefront #quickview-modal.hidden,#note-luxury-storefront #search-modal.hidden,#note-luxury-storefront [hidden]{display:none!important}.selection\\:bg-black ::-moz-selection{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1))}.selection\\:bg-black ::selection{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1))}.selection\\:text-white ::-moz-selection{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.selection\\:text-white ::selection{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.selection\\:bg-black::-moz-selection{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1))}.selection\\:bg-black::selection{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1))}.selection\\:text-white::-moz-selection{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.selection\\:text-white::selection{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.hover\\:scale-105:hover{--tw-scale-x:1.05;--tw-scale-y:1.05;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:border-black:hover{--tw-border-opacity:1;border-color:rgb(0 0 0/var(--tw-border-opacity,1))}.hover\\:border-black\\/20:hover{border-color:rgba(0,0,0,.2)}.hover\\:border-white:hover{--tw-border-opacity:1;border-color:rgb(255 255 255/var(--tw-border-opacity,1))}.hover\\:bg-\\[\\#20ba5a\\]:hover{--tw-bg-opacity:1;background-color:rgb(32 186 90/var(--tw-bg-opacity,1))}.hover\\:bg-black:hover{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1))}.hover\\:bg-black\\/70:hover{background-color:rgba(0,0,0,.7)}.hover\\:bg-black\\/80:hover{background-color:rgba(0,0,0,.8)}.hover\\:bg-emerald-700:hover{--tw-bg-opacity:1;background-color:rgb(4 120 87/var(--tw-bg-opacity,1))}.hover\\:bg-rose-50:hover{--tw-bg-opacity:1;background-color:rgb(255 241 242/var(--tw-bg-opacity,1))}.hover\\:bg-stone-100:hover{--tw-bg-opacity:1;background-color:rgb(245 245 244/var(--tw-bg-opacity,1))}.hover\\:bg-stone-200:hover{--tw-bg-opacity:1;background-color:rgb(231 229 228/var(--tw-bg-opacity,1))}.hover\\:bg-stone-50:hover{--tw-bg-opacity:1;background-color:rgb(250 250 249/var(--tw-bg-opacity,1))}.hover\\:bg-stone-800:hover{--tw-bg-opacity:1;background-color:rgb(41 37 36/var(--tw-bg-opacity,1))}.hover\\:bg-white:hover{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.hover\\:bg-white\\/30:hover{background-color:hsla(0,0%,100%,.3)}.hover\\:bg-white\\/70:hover{background-color:hsla(0,0%,100%,.7)}.hover\\:bg-white\\/80:hover{background-color:hsla(0,0%,100%,.8)}.hover\\:text-black:hover{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity,1))}.hover\\:text-rose-600:hover{--tw-text-opacity:1;color:rgb(225 29 72/var(--tw-text-opacity,1))}.hover\\:text-stone-500:hover{--tw-text-opacity:1;color:rgb(120 113 108/var(--tw-text-opacity,1))}.hover\\:text-stone-700:hover{--tw-text-opacity:1;color:rgb(68 64 60/var(--tw-text-opacity,1))}.hover\\:text-white:hover{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-100:hover{opacity:1}.hover\\:opacity-70:hover{opacity:.7}.hover\\:opacity-75:hover{opacity:.75}.hover\\:shadow-\\[0_8px_30px_rgba\\(37\\2c 211\\2c 102\\2c 0\\.65\\)\\]:hover{--tw-shadow:0 8px 30px rgba(37,211,102,.65);--tw-shadow-colored:0 8px 30px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.hover\\:shadow-lg:hover,.hover\\:shadow-md:hover{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.focus\\:border-black:focus{--tw-border-opacity:1;border-color:rgb(0 0 0/var(--tw-border-opacity,1))}.focus\\:bg-white:focus{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-90:active{--tw-scale-x:.9;--tw-scale-y:.9}.active\\:scale-90:active,.active\\:scale-95:active{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95}.group[open] .group-open\\:rotate-180{--tw-rotate:180deg}.group:hover .group-hover\\:scale-105,.group[open] .group-open\\:rotate-180{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:scale-105{--tw-scale-x:1.05;--tw-scale-y:1.05}.group:hover .group-hover\\:scale-\\[1\\.01\\]{--tw-scale-x:1.01;--tw-scale-y:1.01;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:text-emerald-600{--tw-text-opacity:1;color:rgb(5 150 105/var(--tw-text-opacity,1))}.group:hover .group-hover\\:text-stone-600{--tw-text-opacity:1;color:rgb(87 83 78/var(--tw-text-opacity,1))}.group:hover .group-hover\\:opacity-100{opacity:1}.group:hover .group-hover\\:shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}@media (min-width:640px){.sm\\:-left-5{left:-1.25rem}.sm\\:-right-5{right:-1.25rem}.sm\\:bottom-4{bottom:1rem}.sm\\:bottom-6{bottom:1.5rem}.sm\\:left-4{left:1rem}.sm\\:left-6{left:1.5rem}.sm\\:right-4{right:1rem}.sm\\:right-6{right:1.5rem}.sm\\:top-24{top:6rem}.sm\\:mb-12{margin-bottom:3rem}.sm\\:mb-14{margin-bottom:3.5rem}.sm\\:mb-3{margin-bottom:.75rem}.sm\\:mb-4{margin-bottom:1rem}.sm\\:mt-12{margin-top:3rem}.sm\\:mt-2\\.5{margin-top:.625rem}.sm\\:mt-28{margin-top:7rem}.sm\\:mt-5{margin-top:1.25rem}.sm\\:block{display:block}.sm\\:inline-block{display:inline-block}.sm\\:inline{display:inline}.sm\\:flex{display:flex}.sm\\:inline-flex{display:inline-flex}.sm\\:hidden{display:none}.sm\\:h-1\\.5{height:.375rem}.sm\\:h-10{height:2.5rem}.sm\\:h-12{height:3rem}.sm\\:h-16{height:4rem}.sm\\:h-20{height:5rem}.sm\\:h-24{height:6rem}.sm\\:h-8{height:2rem}.sm\\:h-9{height:2.25rem}.sm\\:min-h-\\[760px\\]{min-height:760px}.sm\\:w-10{width:2.5rem}.sm\\:w-12{width:3rem}.sm\\:w-16{width:4rem}.sm\\:w-20{width:5rem}.sm\\:w-8{width:2rem}.sm\\:w-80{width:20rem}.sm\\:w-\\[420px\\]{width:420px}.sm\\:min-w-\\[270px\\]{min-width:270px}.sm\\:max-w-\\[280px\\]{max-width:280px}.sm\\:max-w-none{max-width:none}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}.sm\\:flex-wrap{flex-wrap:wrap}.sm\\:justify-center{justify-content:center}.sm\\:gap-2{gap:.5rem}.sm\\:gap-3{gap:.75rem}.sm\\:gap-4{gap:1rem}.sm\\:gap-6{gap:1.5rem}.sm\\:gap-8{gap:2rem}.sm\\:overflow-visible{overflow:visible}.sm\\:p-3{padding:.75rem}.sm\\:p-4{padding:1rem}.sm\\:p-5{padding:1.25rem}.sm\\:p-6{padding:1.5rem}.sm\\:p-8{padding:2rem}.sm\\:px-2{padding-left:.5rem;padding-right:.5rem}.sm\\:px-3{padding-left:.75rem;padding-right:.75rem}.sm\\:px-4{padding-left:1rem;padding-right:1rem}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:py-10{padding-top:2.5rem;padding-bottom:2.5rem}.sm\\:py-16{padding-top:4rem;padding-bottom:4rem}.sm\\:py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.sm\\:py-20{padding-top:5rem;padding-bottom:5rem}.sm\\:py-24{padding-top:6rem;padding-bottom:6rem}.sm\\:py-3\\.5{padding-top:.875rem;padding-bottom:.875rem}.sm\\:py-6{padding-top:1.5rem;padding-bottom:1.5rem}.sm\\:pb-14{padding-bottom:3.5rem}.sm\\:pt-24{padding-top:6rem}.sm\\:pt-32{padding-top:8rem}.sm\\:pt-36{padding-top:9rem}.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}.sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}.sm\\:text-\\[10px\\]{font-size:10px}.sm\\:text-\\[11px\\]{font-size:11px}.sm\\:text-base{font-size:1rem;line-height:1.5rem}.sm\\:text-lg{font-size:1.125rem;line-height:1.75rem}.sm\\:text-sm{font-size:.875rem;line-height:1.25rem}.sm\\:text-xs{font-size:.75rem;line-height:1rem}.sm\\:opacity-75{opacity:.75}.sm\\:hover\\:opacity-100:hover{opacity:1}}@media (min-width:768px){.md\\:inline{display:inline}.md\\:min-h-\\[480px\\]{min-height:480px}.md\\:min-h-\\[820px\\]{min-height:820px}.md\\:w-1\\/2{width:50%}.md\\:w-96{width:24rem}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:rounded-3xl{border-radius:1.5rem}.md\\:text-2xl{font-size:1.5rem;line-height:2rem}.md\\:text-4xl{font-size:2.25rem;line-height:2.5rem}.md\\:text-5xl{font-size:3rem;line-height:1}.md\\:text-base{font-size:1rem;line-height:1.5rem}}@media (min-width:1024px){.lg\\:col-span-4{grid-column:span 4/span 4}.lg\\:col-span-5{grid-column:span 5/span 5}.lg\\:col-span-6{grid-column:span 6/span 6}.lg\\:col-span-7{grid-column:span 7/span 7}.lg\\:col-span-8{grid-column:span 8/span 8}.lg\\:flex{display:flex}.lg\\:hidden{display:none}.lg\\:h-10{height:2.5rem}.lg\\:h-\\[860px\\]{height:860px}.lg\\:max-w-4xl{max-width:56rem}.lg\\:grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr))}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\\:gap-12{gap:3rem}.lg\\:gap-14{gap:3.5rem}.lg\\:gap-7{gap:1.75rem}.lg\\:gap-8{gap:2rem}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:pb-16{padding-bottom:4rem}.lg\\:text-4xl{font-size:2.25rem;line-height:2.5rem}.lg\\:text-6xl{font-size:3.75rem;line-height:1}}";
  document.head.appendChild(utilityStyles);

  // 4. Inject Suppression & 16px Font Calibration Styles
  if (!document.getElementById("note-master-inline-css")) {
    const s = document.createElement("style");
    s.id = "note-master-inline-css";
    s.textContent = `
/* ==========================================================================
   NOTE PERFUMES - 100% LAVERNE MASTER EDITION FOR ZID
   Host: https://youssefrasheed.github.io/note-zid-styles
   ========================================================================== */

/* Enforce EXACT 16px Root Calibration (Matches Preview Link 100%) */
html, :root {
  font-size: 16px !important;
  background-color: #000000 !important;
  -webkit-text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
}

body {
  margin: 0 !important;
  padding: 0 !important;
  background: #000000 !important;
  font-family: 'Laverne', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-size: 16px !important;
  overflow-x: hidden !important;
}

* {
  font-family: 'Laverne', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}

/* Eradicate Rozia Native Headers, Footers, and Blocks */
section[section-id],
footer[section-id],
header[section-id],
header:not(#site-header),
footer:not(#note-store-footer),
header.header-nav, 
header.bg-header-transparent,
.tp-bar-header,
.tp-footer-area,
.tp-footer-top,
.tp-footer-bottom,
.tp-brands,
.tp-slider-banners,
.tp-product-card,
.tp-banners,
.tp-title-section,
.whatsapp-icon,
.footer {
  display: none !important;
}

/* Eradicate Rozia's 50% olive background pseudo-element on footer */
footer::after,
footer::before,
#note-store-footer::after,
#note-store-footer::before {
  display: none !important;
  content: none !important;
  height: 0 !important;
  width: 0 !important;
  background: transparent !important;
  opacity: 0 !important;
}

.main.app-content, .tp-home {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
  overflow: visible !important;
  background: #ffffff !important;
}

#note-luxury-storefront {
  background: #ffffff !important;
  min-height: 100vh !important;
  width: 100% !important;
}

#note-store-footer {
  background: #000000 !important;
}

/* Helper Classes */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cat-pill-active {
  background-color: #000000 !important;
  color: #ffffff !important;
  border-color: #000000 !important;
}

.thumb-active {
  border-color: #000000 !important;
  opacity: 1 !important;
}

/* Category Filter Pills Container - Sticky Responsive Smooth Scroll */
.cat-pills-container,
#category-pills-bar {
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center !important;
  gap: 8px !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  -webkit-overflow-scrolling: touch !important;
  white-space: nowrap !important;
  scroll-behavior: smooth !important;
}

.cat-pills-break {
  display: none !important;
}

@media (min-width: 768px) {
  .cat-pills-container,
  #category-pills-bar {
    flex-wrap: wrap !important;
    justify-content: center !important;
    overflow: visible !important;
    white-space: normal !important;
  }
  .cat-pills-break {
    display: block !important;
    flex-basis: 100% !important;
    width: 100% !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}

.cat-pill {
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

/* Active Nav Links Underline (100% Reference Parity) */
#nav-links a.border-b-2,
header nav a.border-b-2,
#nav-links a.active-link,
header nav a.active-link {
  border-bottom: 2px solid currentColor !important;
  padding-bottom: 2px !important;
  opacity: 1 !important;
}

#nav-links a:not(.active-link),
header nav a:not(.active-link) {
  border-bottom: 2px solid transparent !important;
  padding-bottom: 2px !important;
}

/* Bottom Navigation Bar Cart Badge Perfect Centering */
.cart-badge,
.header-sm .cart-badge,
.cart-sm .cart-badge,
.cart-btn .cart-badge {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  line-height: 1 !important;
  direction: ltr !important;
  min-width: 18px !important;
  height: 18px !important;
  padding: 0 2px !important;
  margin: 0 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  font-feature-settings: "tnum" !important;
  font-variant-numeric: tabular-nums !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  border-radius: 9999px !important;
  box-sizing: border-box !important;
  position: absolute !important;
  top: -5px !important;
  left: -2px !important;
  background-color: #f44336 !important;
  color: #ffffff !important;
}

/* Out of Stock ("غير متاح") Luxury Sticker & State */
.note-out-of-stock-sticker,
.out-of-stock,
.tp-product-image .out-of-stock {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) rotate(-18deg) !important;
  z-index: 25 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: max-content !important;
  height: max-content !important;
  background: #e11d48 !important;
  color: #ffffff !important;
  font-family: inherit !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  padding: 4px 14px !important;
  border-radius: 9999px !important;
  border: 1.5px solid #ffffff !important;
  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.35) !important;
  pointer-events: none !important;
  white-space: nowrap !important;
}

@media (min-width: 640px) {
  .note-out-of-stock-sticker,
  .out-of-stock,
  .tp-product-image .out-of-stock {
    font-size: 12px !important;
    padding: 5px 16px !important;
  }
}

.note-out-of-stock-sticker.pdp-sticker {
  font-size: 14px !important;
  padding: 6px 22px !important;
  border-width: 2px !important;
  box-shadow: 0 6px 20px rgba(225, 29, 72, 0.4) !important;
}

@media (min-width: 640px) {
  .note-out-of-stock-sticker.pdp-sticker {
    font-size: 16px !important;
    padding: 8px 26px !important;
  }
}

.is-out-of-stock img,
.product-item-out-of-stock img,
#pdp-main-image-container.is-out-of-stock #pdp-main-image {
  filter: grayscale(0.55) opacity(0.85) !important;
  transition: filter 0.3s ease !important;
}

/* Recommended Products Modern Desktop & Mobile Scroll */
.note-compact-recs {
  display: flex !important;
  gap: 8px !important;
  overflow-x: auto !important;
  scrollbar-width: thin !important;
  scrollbar-color: #d6d3d1 transparent !important;
  scroll-snap-type: none !important;
  padding: 4px 2px 6px !important;
  width: 100% !important;
  max-width: 100% !important;
  overscroll-behavior-x: contain !important;
  -webkit-overflow-scrolling: touch !important;
  cursor: grab !important;
  user-select: none !important;
}
.note-compact-recs:active {
  cursor: grabbing !important;
}
.note-compact-recs::-webkit-scrollbar {
  display: block !important;
  height: 4px !important;
}
.note-compact-recs::-webkit-scrollbar-track {
  background: #f5f5f4 !important;
  border-radius: 9999px !important;
}
.note-compact-recs::-webkit-scrollbar-thumb {
  background: #d6d3d1 !important;
  border-radius: 9999px !important;
}
.note-compact-recs::-webkit-scrollbar-thumb:hover {
  background: #78716c !important;
}

.note-recs-nav {
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
}
.note-recs-btn {
  width: 22px !important;
  height: 22px !important;
  border-radius: 9999px !important;
  border: 1px solid #e7e5e4 !important;
  background: #ffffff !important;
  color: #1c1917 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.15s ease !important;
  padding: 0 !important;
  flex-shrink: 0 !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
}
.note-recs-btn:hover {
  background: #000000 !important;
  color: #ffffff !important;
  border-color: #000000 !important;
}
.note-recs-btn:active {
  transform: scale(0.92) !important;
}

/* Floating WhatsApp Button - Elevated above Mobile Bottom Navigation */
#floating-whatsapp-container {
  bottom: calc(90px + env(safe-area-inset-bottom, 0px)) !important;
  left: 16px !important;
  margin-bottom: 0 !important;
}

@media (min-width: 640px) {
  #floating-whatsapp-container {
    bottom: 24px !important;
    left: 24px !important;
    margin-bottom: 0 !important;
  }
}

/* Continuous Luxury Brand Loader - Active from frame 0 until .note-ready is added */
body:not(.note-ready)::before {
  content: "" !important;
  position: fixed !important;
  inset: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  height: 100dvh !important;
  background-color: #ffffff !important;
  background-image: url('https://youssefrasheed.github.io/note-zid-styles/logo_dark_crisp.png') !important;
  background-repeat: no-repeat !important;
  background-position: center calc(50% - 25px) !important;
  background-size: 130px auto !important;
  z-index: 99999999 !important;
  pointer-events: all !important;
  opacity: 1 !important;
  visibility: visible !important;
  animation: none !important;
  transition: opacity 0.4s ease-out, visibility 0.4s ease-out !important;
}

body:not(.note-ready)::after {
  content: "" !important;
  position: fixed !important;
  top: calc(50% + 40px) !important;
  left: 50% !important;
  margin-left: -13px !important;
  width: 26px !important;
  height: 26px !important;
  border: 2.5px solid #eceae5 !important;
  border-top-color: #121212 !important;
  border-radius: 50% !important;
  z-index: 999999999 !important;
  animation: noteSpinRing 0.75s linear infinite !important;
  pointer-events: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  transition: opacity 0.4s ease-out, visibility 0.4s ease-out !important;
}

body.note-ready::before,
body.note-ready::after {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

@keyframes noteLoaderPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.96);
    opacity: 0.75;
  }
}

@keyframes noteSpinRing {
  to { transform: rotate(360deg); }
}

body[class*="checkout"]::before,
body[class*="checkout"]::after,
body[class*="auth"]::before,
body[class*="auth"]::after,
body[class*="account"]::before,
body[class*="account"]::after {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}

#loader-container {
  display: none !important;
}

body:not(.note-ready) section[section-id],
body:not(.note-ready) .tp-home,
body:not(.note-ready) .tp-bar-header,
body:not(.note-ready) header.header-nav,
body:not(.note-ready) footer:not(#note-store-footer) {
  display: none !important;
  visibility: hidden !important;
}

/* Slide-out Cart Drawer Architecture */
#cart-drawer:not(.hidden):not([hidden]) {
  display: flex !important;
  flex-direction: column !important;
  height: 100vh !important;
  height: 100dvh !important;
  max-height: 100dvh !important;
  overflow: hidden !important;
}
#cart-drawer-items {
  flex: 1 1 auto !important;
  overflow-y: auto !important;
  min-height: 160px !important;
  max-height: calc(100dvh - 280px) !important;
  padding: 12px 16px !important;
  overscroll-behavior: contain !important;
  -webkit-overflow-scrolling: touch !important;
}
.note-cart-item {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 10px 12px !important;
  margin-bottom: 8px !important;
  background: #ffffff !important;
  border: 1px solid #f0eee9 !important;
  border-radius: 14px !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03) !important;
  text-align: right !important;
}
#cart-drawer-recommendations {
  padding: 6px 14px !important;
  margin: 0 !important;
  background: #fafaf9 !important;
  border-top: 1px solid #f0eee9 !important;
  border-bottom: 1px solid #f0eee9 !important;
  flex-shrink: 0 !important;
}
#cart-drawer-footer {
  padding: 12px 16px 14px !important;
  border-top: 1px solid #f0eee9 !important;
  background: #ffffff !important;
  flex-shrink: 0 !important;
}
`;
    document.head.appendChild(s);
  }

  // Enforce root 16px immediately
  try {
    document.documentElement.style.setProperty('font-size', '16px', 'important');
    if (document.body) document.body.style.setProperty('font-size', '16px', 'important');
  } catch(e) {}

  // 5. Products Data
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
    "img_box": "/products/NOTE_For_Her_Large_v01.webp",
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
    "img_box": null,
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
    "img_box": null,
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
    "img_box": null,
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
    "img_box": "/products/NOTE_For_Him_30ml_v02.webp",
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
    "img_box": "/products/NOTE_For_Her_30ml_v02.webp",
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
    "img_box": null,
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
    "img_box": "/products/NOTE_Powderose_30ml_v01.webp",
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
    "img_box": "/products/NOTE_Royal_Tobacco_All_Over_v01.webp",
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
    "img_box": null,
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
    "img_box": "/products/NOTE_Choconilla_All_Over_v01.webp",
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
    "img_box": null,
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
    "img_box": null,
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
    "img_box": null,
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
    "img_box": "/products/NOTE_Royal_Tobacco_Linen_Spray_v01.webp",
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
    "img_box": "/products/NOTE_Oud_Rosewood_Linen_Spray_v01.webp",
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
    "img_box": "/products/NOTE_Powderose_Linen_Spray_v01.webp",
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
    "img_box": "/products/NOTE_Shower_Gel_v01.webp",
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
    "img_box": "/products/NOTE_Hyaluronic_Moisturizer_v01.webp",
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
    "img_box": null,
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
    "img_box": null,
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
    "img_box": "/products/NOTE_Musk_Toffee_v01.webp",
    "notes": "المسك الأبيض - التوفي - حلاوة ناعمة",
    "slogan": "أجمل مزيج بين النقاء المطلق وحلاوة التوفي الشهي في دهن عطري ساحر",
    "description": "تركيبة تجمع نعومة المسك المحبوبة ونكهة التوفي اللذيذة لتمنحك رائحة فريدة لا تُقاوم.",
    "top": "المسك البارد وحلوى التوفي",
    "heart": "الفانيليا والبودرة",
    "base": "المسك الأبيض وخشب الأرز"
  },
  {
    "id": "pkg-royal-tobacco",
    "title": "رويال توباكو",
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
    "title": "باودروز",
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
    "img_box": "/products/NOTE_Powderose_Large_v01.webp",
    "notes": "عطر باودروز 100 مل + معطر جسم باودروز + عطر رويال باودر 100 مل",
    "slogan": "توليفة البودرة والورد الساحرة؛ باقة أنثوية ناعمة تأسرك بنقائها المخملي الفائق",
    "description": "تتضمن الباقة: عطر باودروز 100 مل + معطر الجسم والشعر باودروز + عطر رويال باودر 100 مل. ثلاثية استثنائية لعشاق النفحات البودرية والورد الملكي.",
    "top": "الورد الفرنسي، بودرة السوسن، زهر اللوز",
    "heart": "المسك الأبيض، البنفسج الناعم، الماغنوليا",
    "base": "خشب الأرز، حبوب التونكا، خشب الصندل والمسك الصافي"
  },
  {
    "id": "pkg-summer-escape",
    "title": "سمر إسكيب",
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
    "img_box": "/products/10_Five_Perfumes_Square.webp",
    "notes": "عطر نوت قولد 100 مل + معطر جسم عسل + معطر جسم بحر",
    "slogan": "انتعاش نسائم البحر وحلاوة العسل مع إشراقة الذهب؛ باقة الصيف الأكثر حيوية ونضارة",
    "description": "تتضمن الباقة: عطر نوت قولد 100 مل مع معطر جسم عسل ومعطر جسم بحر. مزيج متناغم بين الانتعاش البحري البارد ونعومة نفحات العسل الذهبية.",
    "top": "نسيم البحر البارد، الماندرين الإيطالي، نكتار العسل",
    "heart": "الياسمين المائي، زهور اللوتس، العنبر الشفاف",
    "base": "المسك الأبيض، خشب الصندل، أخشاب الشاطئ العطرية"
  },
  {
    "id": "pkg-her-signature",
    "title": "هير سفنتشر",
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
    "title": "مِنز سفنتشر",
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
    "title": "نايت سفنتشر",
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
    "title": "مجموعة التولات الخاصة",
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
    "title": "مجموعة معطرات الجسم",
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
    "id": "pkg-linen-collection",
    "title": "مجموعة معطرات الجو والمفارش",
    "title_en": "LINEN SPRAY COLLECTION (3 BOTTLES)",
    "cat": "linen",
    "cat_ar": "معطرات الجو والمفارش",
    "size": "3 × 250 مل معطر مفارش",
    "concentration": "Linen & Room Spray",
    "tag": "توفير استثنائي",
    "bestseller": false,
    "price": 196,
    "old_price": 237,
    "discount": "17%",
    "rating": 4.95,
    "reviews_count": 28,
    "img": "/products/06_Linen_Spray_Trio_Dark.webp",
    "img_box": "/products/06_Linen_Spray_Trio_Dark.webp",
    "notes": "رويال توباكو + باودر روز + عود روز وود",
    "slogan": "ثلاثية الفخامة للمنزل والمفارش؛ انتعاش يدوم ونقاء يملأ الأرجاء بأرقى نفحات نوت",
    "description": "تتضمن المجموعة الثلاثية الفاخرة لمعطرات الجو والمفارش: معطر مفارش رويال توباكو، معطر مفارش باودر روز، ومعطر مفارش عود روز وود. عبوات بحجم كبير تمنح منزلك ومفارشك عبقاً وثباتاً ساحراً.",
    "top": "التوابل الدافئة، زهر البرتقال، الورد المنعش",
    "heart": "الكستناء، السوسن، خشب الورد الفاخر",
    "base": "خشب الصندل، التبغ الدافئ، العود الملكي المعتق"
  },
  {
    "id": "musk-bundle-gift",
    "title": "مِسك الملكية",
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
    "img_box": "/products/08_Musk_Bundles_Gift_Square.webp",
    "notes": "عطر مِسك 100 مل + معطر جسم + تولة مسك + هدية مجانية",
    "slogan": "الباقة الأكثر طلباً لعشاق المسك؛ طقم متكامل يمنحك تجربة المسك الملكي الشاملة مع هدية فاخرة",
    "description": "تتضمن الباقة: عطر مِسك نوت 100 مل، معطر الجسم والشعر، تولة دهن المسك الخالص، بالإضافة إلى هدية مجانية من دار نوت مغلفة بأفخم علب الإهداء.",
    "top": "المسك الأبيض وزهر القطن",
    "heart": "زهور السوسن والنوتات البودرية",
    "base": "المسك الصافي وخشب الصندل"
  },
  {
    "id": "musk-bundle",
    "title": "مِسك الكلاسيكية",
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
    "img_box": "/products/08_Musk_Bundles_Square.webp",
    "notes": "عطر مِسك 100 مل + معطر جسم + معطر مفارش",
    "slogan": "ثلاثية المسك الكاملة لتعطير الجسم والشعر والمنزل بعبق المسك النقي",
    "description": "كل ما تحتاجه لتغمر يومك بالنظافة والانتعاش الفاخر في باقة واحدة متكاملة وبسعر لا يتكرر.",
    "top": "المسك وزهر القطن",
    "heart": "السوسن والبودرة",
    "base": "المسك وخشب الصندل"
  }];

  // Official Zid Product UUID Mapping (All 39 Storefront Items)
  const ZID_PRODUCT_MAP = {
    'roayal-tobacco': '764d587d-7cba-46b3-8d34-265ee4bc4b6a',
    'royal-tobacco': '764d587d-7cba-46b3-8d34-265ee4bc4b6a',
    'oud-rosewood': '7a28376c-3973-4822-b6b2-b3a6a4e7013e',
    'musk': '9ba63129-20bc-4a0f-b49f-17d06e130ad9',
    'note-musk': '9ba63129-20bc-4a0f-b49f-17d06e130ad9',
    'مسك': '9ba63129-20bc-4a0f-b49f-17d06e130ad9',
    'aura': '54805f9b-53c4-4e4c-a75a-5173eda716c8',
    'bn': '9be5ff2f-3d33-4402-b511-e099805c681d',
    'powderose': 'b99d66f3-c201-4de6-af2d-4e991f483a6b',
    'note-gold': '5d98daa5-1b6b-4196-a0d8-f51631cb1f51',
    'نوت-قولد-الطلب-المسبق': '5d98daa5-1b6b-4196-a0d8-f51631cb1f51',
    'musk-bukhor': '4251cc74-23ba-45b0-9268-03b740df88bd',
    'مسك-بخور': '4251cc74-23ba-45b0-9268-03b740df88bd',
    'note-phantom': '08874f48-8caf-441f-876b-de578508105a',
    'note-for-him': 'cc5e1bb2-bebc-4ef7-9e1b-af52362bc852',
    'note-for-her': '21b12ed7-3415-44d5-b135-4782b295d4b7',
    'for-her': '21b12ed7-3415-44d5-b135-4782b295d4b7',
    'royal-powder': '1c6e8d65-9c1e-42d8-a9c3-265e7daa1a81',
    'رويال-باودر': '1c6e8d65-9c1e-42d8-a9c3-265e7daa1a81',
    'attraction': 'fe61d38b-6088-46d8-a88c-f44e64e5991a',
    'niche-oud': '809c89af-6e6f-44fa-99a2-ac1f13418e0a',
    'niche-royal-leather': '620ef67b-39ba-41f0-a4f2-f9ce56cf3b1c',
    'niche-blue': 'c6380d1f-f89b-4914-a194-3d82f56af915',
    'niche-amber': '8c331e9f-18cf-46d8-81e1-94a80ed45224',
    'choconilla': '7a9286bf-4d38-447a-9b9f-fcd006e35e9b',
    'all-over-choconilla': '7a9286bf-4d38-447a-9b9f-fcd006e35e9b',
    'bahr': '7de839f3-86a9-4fac-ba15-fad102696e73',
    'بحر': '7de839f3-86a9-4fac-ba15-fad102696e73',
    'all-over-bahr': '7de839f3-86a9-4fac-ba15-fad102696e73',
    'asal': 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
    'عسل': 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
    'بحر-1': 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
    'all-over-asal': 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
    'powderose-all-over-soray': '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'all-over-powderose': '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'powderose-spray': '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'all-over-spray-tuffi': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'all-over-note-tuffi': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'عطر-نوت-توفي': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'tuffi-spray': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'all-over-spray-royal-tobacco': '5d373011-9e95-472c-bec6-51fd8ed457dc',
    'all-over-royal-tobacco': '5d373011-9e95-472c-bec6-51fd8ed457dc',
    'royal-tobacco-spray': '5d373011-9e95-472c-bec6-51fd8ed457dc',
    'baby-for-him': 'b842b800-4943-437a-914c-5150b2b7e119',
    'for-him-30ml': 'b842b800-4943-437a-914c-5150b2b7e119',
    'baby-for-her': 'b6a05619-9007-4453-9c5b-f53b56f37613',
    'for-her-30ml': 'b6a05619-9007-4453-9c5b-f53b56f37613',
    'baby-powderose': 'a8b86b67-4c55-447a-8645-83bdd50ded3b',
    'powderose-30ml': 'a8b86b67-4c55-447a-8645-83bdd50ded3b',
    'baby-royal-tobacco': '8f727798-26e3-44ac-af64-473b55971ad3',
    'royal-tobacco-30ml': '8f727798-26e3-44ac-af64-473b55971ad3',
    'baby-oud-rosewood': 'ad7d2b47-8ca2-447a-8d9e-ab32bf379425',
    'oud-rosewood-30ml': 'ad7d2b47-8ca2-447a-8d9e-ab32bf379425',
    'tollah-musk-tuffi': '95f09483-d32f-44f5-a91d-16fb85567e65',
    'note-toffe': '95f09483-d32f-44f5-a91d-16fb85567e65',
    'musk-toffee-oil': '95f09483-d32f-44f5-a91d-16fb85567e65',
    'tollah-sugar-oud': 'dcea75e0-ac06-424d-a0ac-0bd94848b9c6',
    'sugar-oud': 'dcea75e0-ac06-424d-a0ac-0bd94848b9c6',
    'tollah-lady-rose': '0dda8a6b-c912-4d29-8f97-cf4cfe072409',
    'lady-rose': '0dda8a6b-c912-4d29-8f97-cf4cfe072409',
    'tollah-amber-musk': 'f0206dc9-332b-44e1-b05e-827ffa61ba40',
    'amber-musk-oil': 'f0206dc9-332b-44e1-b05e-827ffa61ba40',
    'tollah-pure-tuffi': '1f091171-fc32-4414-b1fc-35694f8008f3',
    'pure-tuffi': '1f091171-fc32-4414-b1fc-35694f8008f3',
    'معطر-الجو-و-المفارش-رويال-توباكو': 'd9779e9f-411a-43c7-8142-09e882baacee',
    'linen-royal-tobacco': 'd9779e9f-411a-43c7-8142-09e882baacee',
    'معطر-الجو-و-المفارش-باودر-روز': '3bc8e5e4-a805-40f7-9bb1-fb0038fb3c37',
    'linen-powderose': '3bc8e5e4-a805-40f7-9bb1-fb0038fb3c37',
    'معطر-الجو-و-المفارش-عود-روز-وود': '8a62dee7-ea33-4c54-a39a-ca25096701b9',
    'linen-oud-rosewood': '8a62dee7-ea33-4c54-a39a-ca25096701b9',
    'مجموعة-معطرات-الجو-و-المفارش': '83561f07-7f51-43a4-a632-2030d6b71bc1',
    'pkg-linen-collection': '83561f07-7f51-43a4-a632-2030d6b71bc1',
    'linen-collection': '83561f07-7f51-43a4-a632-2030d6b71bc1',
    'مرطب-و-شور-جل': '0fc4a4f6-5c93-41a4-b727-d950bfcb6e30',
    'shower-gel': '0fc4a4f6-5c93-41a4-b727-d950bfcb6e30',
    'hyaluronic-moisturizer': '0fc4a4f6-5c93-41a4-b727-d950bfcb6e30',
    '3-معطر-للجسم-بالكامل': '4e22b431-43a0-4cd8-9e45-f6a671f2620c',
    'pkg-all-over-collection': '4e22b431-43a0-4cd8-9e45-f6a671f2620c'
  };

  // 5.1 Zid Live Sync Manager (Fail-Safe Stale-While-Revalidate Engine)
  const ZidSyncManager = {
    CACHE_KEY: 'note_zid_catalog_v5',
    CACHE_TIME_KEY: 'note_zid_catalog_time_v5',
    TTL_MS: 5 * 60 * 1000,

    loadCachedData: function() {
      try {
        const cached = localStorage.getItem(this.CACHE_KEY);
        if (cached) {
          const items = JSON.parse(cached);
          if (Array.isArray(items) && items.length > 0) {
            this.applyToCatalog(items);
            return true;
          }
        }
      } catch (e) {}
      return false;
    },

    fetchLiveCatalog: async function(timeoutMs = 750) {
      try {
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        let timer = null;
        if (controller) {
          timer = setTimeout(() => controller.abort(), timeoutMs);
        }

        const res = await fetch('/api/v1/products?page_size=100', {
          signal: controller ? controller.signal : undefined,
          headers: { 'Accept': 'application/json' }
        });
        if (timer) clearTimeout(timer);

        if (!res.ok) return null;
        const data = await res.json();
        const results = data.results || [];
        if (results.length > 0) {
          try {
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(results));
            localStorage.setItem(this.CACHE_TIME_KEY, Date.now().toString());
          } catch(e) {}
          this.applyToCatalog(results);
          return results;
        }
      } catch (err) {
        // Fail-safe silent catch
      }
      return null;
    },

    applyToCatalog: function(zidResults) {
      if (!Array.isArray(zidResults)) return;

      zidResults.forEach(zp => {
        const zId = zp.id;
        const zSlug = (zp.slug || '').toLowerCase();
        const zName = (zp.name || '').trim();
        const zPrice = zp.sale_price || zp.price;
        const zOldPrice = zp.sale_price ? zp.price : null;
        const inStock = zp.in_stock !== false && (zp.is_infinite || zp.quantity > 0);

        let matched = null;

        // 1. Match by ZID_PRODUCT_MAP
        for (const localKey in ZID_PRODUCT_MAP) {
          if (ZID_PRODUCT_MAP[localKey] === zId) {
            matched = noteProductsCatalog.find(p => p.id.toLowerCase() === localKey.toLowerCase());
            if (matched) break;
          }
        }

        // 2. Match by zidSlugMap
        if (!matched && typeof zidSlugMap !== 'undefined') {
          for (const localKey in zidSlugMap) {
            if (zidSlugMap[localKey].toLowerCase() === zSlug) {
              matched = noteProductsCatalog.find(p => p.id.toLowerCase() === localKey.toLowerCase());
              if (matched) break;
            }
          }
        }

        // 3. Match by direct slug or ID
        if (!matched) {
          matched = noteProductsCatalog.find(p => {
            const pid = p.id.toLowerCase();
            return pid === zSlug || zSlug.includes(pid) || pid.includes(zSlug);
          });
        }

        // 4. Match by title
        if (!matched) {
          const cleanZName = zName.replace('عطر ', '').trim().toLowerCase();
          matched = noteProductsCatalog.find(p => {
            const cleanTitle = (p.title || '').replace('عطر ', '').trim().toLowerCase();
            return cleanTitle === cleanZName || (p.title_en && p.title_en.toLowerCase() === zName.toLowerCase());
          });
        }

        if (matched) {
          if (zPrice && !isNaN(zPrice)) {
            matched.price = Math.round(Number(zPrice));
          }
          if (zOldPrice && !isNaN(zOldPrice)) {
            matched.old_price = Math.round(Number(zOldPrice));
            const disc = Math.round(((zOldPrice - zPrice) / zOldPrice) * 100);
            matched.discount = disc + '%';
          } else if (!zp.sale_price) {
            matched.old_price = null;
            matched.discount = null;
          }
          matched.in_stock = inStock;

          // If the title changed in Zid Dashboard, keep title updated
          if (zName && !zName.includes('BABY') && !zName.includes('All OVER') && !zName.includes('Tollah')) {
            matched.zid_title = zName;
          }
        } else if (zPrice && !isNaN(zPrice)) {
          // Dynamically register newly added products from Zid Dashboard
          const firstImg = (zp.images && zp.images[0] && zp.images[0].image && (zp.images[0].image.large || zp.images[0].image.full_size)) || '';
          const secondImg = (zp.images && zp.images[1] && zp.images[1].image && (zp.images[1].image.large || zp.images[1].image.full_size)) || '';

          let catSlug = 'perfumes';
          let catAr = 'العطور';
          if (zp.categories && zp.categories[0]) {
            catSlug = zp.categories[0].slug || 'perfumes';
            catAr = zp.categories[0].name || 'العطور';
          }

          const newProductEntry = {
            id: zSlug || zId,
            zid_id: zId,
            title: zName,
            title_en: zp.name_en || zName,
            cat: catSlug,
            cat_ar: catAr,
            size: '100 مل',
            concentration: 'Eau de Parfum',
            tag: 'جديد',
            bestseller: false,
            price: Math.round(Number(zPrice)),
            old_price: zOldPrice ? Math.round(Number(zOldPrice)) : null,
            discount: zOldPrice ? Math.round(((zOldPrice - zPrice) / zOldPrice) * 100) + '%' : null,
            rating: 4.9,
            reviews_count: 12,
            in_stock: inStock,
            img: firstImg || '/products/NOTE_Royal_Tobacco_Flat_Lay.webp',
            img_box: secondImg || firstImg || null,
            notes: '',
            slogan: zName,
            description: (zp.description || zName).replace(/<[^>]*>/g, '').trim(),
            top: '',
            heart: '',
            base: ''
          };
          noteProductsCatalog.push(newProductEntry);
        }
      });

      // Synchronize bestsellers list (productsData)
      if (typeof productsData !== 'undefined' && Array.isArray(productsData)) {
        productsData.forEach(bp => {
          const full = noteProductsCatalog.find(p => p.id === bp.id);
          if (full) {
            bp.price = full.price;
            bp.old_price = full.old_price;
            bp.discount = full.discount;
            bp.in_stock = full.in_stock;
          }
        });
      }
    },

    refreshDomPrices: function() {
      try {
        // Update PDP if currently active
        if (typeof currentProduct !== 'undefined' && currentProduct) {
          const live = noteProductsCatalog.find(p => p.id === currentProduct.id);
          if (live) {
            currentProduct.price = live.price;
            currentProduct.old_price = live.old_price;
            currentProduct.discount = live.discount;
            currentProduct.in_stock = live.in_stock;

            const pEl = document.getElementById('pdp-price');
            if (pEl && live.price) pEl.textContent = `${live.price} ر.س`;

            const opEl = document.getElementById('pdp-old-price');
            if (opEl) {
              if (live.old_price) {
                opEl.textContent = `${live.old_price} ر.س`;
                opEl.classList.remove('hidden');
              } else {
                opEl.classList.add('hidden');
              }
            }
          }
        }

        // Update Cart Drawer if open
        if (typeof CartManager !== 'undefined' && CartManager.renderDrawer) {
          CartManager.renderDrawer();
        }

        // Update Catalog Grid if on catalog / category page
        if (typeof renderCatalog === 'function' && document.getElementById('catalog-products-grid')) {
          renderCatalog();
    updateActiveNav({ route: 'category', cat: activeCategory });
        }
      } catch(e) {}
    }
  };

  // Load existing cached prices immediately (0ms)
  // Live cache is applied by the authoritative integration below.

  // 6. Templates
  const T = {
    header: "<!-- ================= 1. HEADER / NAVIGATION (100% LAVERNE ARCHITECTURE) ================= -->\n  <!-- Starts 100% transparent with white text, transforms into frosted blur (backdrop-blur-xl bg-white/70 text-black) on scroll -->\n  <header id=\"site-header\" class=\"fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 bg-transparent text-white border-b border-white/10\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between transition-all duration-300\">\n      \n      <!-- Right: Mobile Menu + Logo -->\n      <div class=\"flex items-center gap-4 shrink-0\">\n        <button id=\"mobile-menu-btn\" onclick=\"openMobileMenu()\" class=\"lg:hidden p-2 text-inherit hover:opacity-75 transition\" aria-label=\"القائمة\">\n          <i class=\"sicon-menu text-xl\"></i>\n        </button>\n        <a href=\"/\" class=\"block group py-1\">\n          <img id=\"store-logo\" src=\"https://youssefrasheed.github.io/note-zid-styles/logo_white_crisp.png\" alt=\"NOTE Perfumes\" class=\"h-8 sm:h-9 lg:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105\">\n        </a>\n      </div>\n\n      <!-- Center: Clean Minimalist Nav Links -->\n      <nav id=\"nav-links\" class=\"hidden lg:flex items-center justify-center gap-7 text-sm font-semibold whitespace-nowrap text-inherit transition-colors\">\n\n        <a href=\"/\" class=\"hover:opacity-70 transition pb-0.5 border-b-2 border-current\">الرئيسية</a>\n        <a href=\"/categories\" class=\"hover:opacity-70 transition pb-0.5\">جميع المنتجات</a>\n        <a href=\"/categories/1748533/perfumes\" class=\"hover:opacity-70 transition pb-0.5\">العطور</a>\n        <a href=\"/categories/1697258/الأكثر-مبيعا\" class=\"hover:opacity-70 transition pb-0.5\">الأكثر مبيعاً</a>\n        <a href=\"/categories/1327929/newest-products\" class=\"hover:opacity-70 transition pb-0.5\">أحدث المنتجات</a>\n      \n      </nav>\n\n      <!-- Left: Search, User, Cart, Language -->\n      <div id=\"header-actions\" class=\"flex items-center justify-end gap-3 sm:gap-4 text-inherit transition-colors\">\n        <!-- Search -->\n        <button onclick=\"openSearchModal()\" class=\"w-9 h-9 flex items-center justify-center hover:opacity-75 transition\" title=\"البحث\" aria-label=\"البحث\">\n          <i class=\"sicon-search text-lg\"></i>\n        </button>\n\n        <!-- User Profile -->\n        <a href=\"/faqs.html\" class=\"w-9 h-9 flex items-center justify-center hover:opacity-75 transition\" title=\"الأسئلة الشائعة\">\n          <i class=\"sicon-user text-lg\"></i>\n        </a>\n\n        <!-- Cart with badge -->\n        <button onclick=\"CartManager.openDrawer()\" class=\"relative w-9 h-9 flex items-center justify-center hover:opacity-75 transition\" title=\"سلة المشتريات\" aria-label=\"السلة\">\n          <i class=\"sicon-shopping-bag text-xl\"></i>\n          <span id=\"cart-counter-badge\" class=\"absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md\">0</span>\n        </button>\n\n        <!-- Language Switcher -->\n        <div class=\"hidden sm:flex items-center gap-1 text-xs font-bold border-r border-current/30 pr-3 mr-1\">\n          <span>العربية</span>\n          <i class=\"sicon-keyboard_arrow_down text-[10px] opacity-75\"></i>\n        </div>\n      </div>\n\n    </div>\n  </header>",
    home: "<!-- ================= 2. CINEMATIC HERO BANNER (AUTO-ROTATING CAROUSEL) ================= -->\n  <section id=\"section-hero-video\" class=\"relative w-full min-h-[720px] sm:min-h-[760px] md:min-h-[820px] lg:h-[860px] bg-black overflow-hidden flex flex-col justify-end items-center text-center group select-none\">\n    \n    <!-- Slides Container -->\n    <div id=\"hero-slides-wrapper\" class=\"absolute inset-0 w-full h-full\">\n\n      <!-- Slide 1: Musk Centered Minimal (Primary Hero) -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-100 z-10\" data-index=\"0\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Musk_Centered_Minimal_Hero_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Musk_Centered_Minimal_Hero_Desktop.webp\" alt=\"مِسك نوت - أثر يُعرف قبل أن يُرى\" fetchpriority=\"high\" loading=\"eager\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h1 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            مِسك... أثر يُعرف قبل أن يُرى\n          </h1>\n          <h2 class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            الأثر الخالد قبل الحضور\n          </h2>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"#bestsellers\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>اكتشف العطور</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Slide 2: Royal Tobacco & Oud Rosewood -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-0 pointer-events-none z-0\" data-index=\"1\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Royal_Tobacco_Oud_Rosewood_Hero_Option_01_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Royal_Tobacco_Oud_Rosewood_Hero_Option_01_Desktop.webp\" alt=\"رويال توباكو وعود روزوود\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h2 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            رويال توباكو... فخامة تدوم وأثر لا يُمحى\n          </h2>\n          <p class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            توليفة التبغ المعتق والعود والورد النادر\n          </p>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"/categories/1500261/عطور-النيش\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>اكتشف المجموعة</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Slide 3: Aura Musk & Royal Powder -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-0 pointer-events-none z-0\" data-index=\"2\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Hero_Aura_Musk_Royal_Powder_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Hero_Aura_Musk_Royal_Powder_Desktop.webp\" alt=\"أورا مسك ورويال باودر\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h2 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            أورا مسك... نقاء البودر ولمسة النعومة\n          </h2>\n          <p class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            شذى يأسر الحواس قبل الحضور\n          </p>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"/categories/1697258/الأكثر-مبيعا\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>تسوق الآن</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Slide 4: Ivory Stone Luxury -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-0 pointer-events-none z-0\" data-index=\"3\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Hero_02_Ivory_Stone_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Hero_02_Ivory_Stone_Desktop.webp\" alt=\"مجموعة المسك الملكية\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h2 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            مجموعة المسك... عبير يفيض بالأصالة\n          </h2>\n          <p class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            باقات متكاملة لتجربة عطرية استثنائية\n          </p>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"/categories/1752110/packages\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>استكشف الباقات</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Slide 5: Amber Silk -->\n      <div class=\"hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-0 pointer-events-none z-0\" data-index=\"4\">\n        <picture class=\"w-full h-full block\">\n          <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Hero_01_Amber_Silk_Mobile.webp\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Hero_01_Amber_Silk_Desktop.webp\" alt=\"حرير العنبر نوت\" class=\"w-full h-full object-cover object-center\">\n        </picture>\n        <div class=\"absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent\"></div>\n        <div class=\"absolute inset-0 flex flex-col justify-end items-center pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto\">\n          <h2 class=\"text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg whitespace-nowrap\">\n            حرير العنبر... دفء الأناقة المترفة\n          </h2>\n          <p class=\"text-sm sm:text-lg md:text-2xl font-light text-stone-200 mt-1.5 sm:mt-2.5 drop-shadow-md\">\n            تدرجات ساحرة تلائم حضورك الراقي\n          </p>\n          <div class=\"mt-4 sm:mt-5 mb-2 sm:mb-3\">\n            <a href=\"#bestsellers\" class=\"inline-flex items-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95\">\n              <span>اكتشف العطور</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <!-- Navigation Arrows -->\n    <button onclick=\"nextHeroSlide()\" class=\"absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/70 border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 sm:opacity-75 sm:hover:opacity-100 active:scale-90 cursor-pointer shadow-lg\" aria-label=\"الشريحة التالية\">\n      <i class=\"sicon-keyboard_arrow_left text-sm sm:text-base\"></i>\n    </button>\n    <button onclick=\"prevHeroSlide()\" class=\"absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/70 border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 sm:opacity-75 sm:hover:opacity-100 active:scale-90 cursor-pointer shadow-lg\" aria-label=\"الشريحة السابقة\">\n      <i class=\"sicon-keyboard_arrow_right text-sm sm:text-base\"></i>\n    </button>\n\n    <!-- Indicators / Dots (Positioned cleanly below the button at bottom-4) -->\n    <div id=\"hero-dots\" dir=\"ltr\" class=\"absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2\">\n      <button onclick=\"goToHeroSlide(0)\" class=\"hero-dot w-6 h-1 rounded-full bg-white transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 1\"></button>\n      <button onclick=\"goToHeroSlide(1)\" class=\"hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 2\"></button>\n      <button onclick=\"goToHeroSlide(2)\" class=\"hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 3\"></button>\n      <button onclick=\"goToHeroSlide(3)\" class=\"hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 4\"></button>\n      <button onclick=\"goToHeroSlide(4)\" class=\"hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer\" aria-label=\"شريحة 5\"></button>\n    </div>\n\n  </section>\n\n  <!-- ================= 3. SECTION: الأكثر مبيعاً (BESTSELLERS SLIDER - DIRECTLY UNDER HERO) ================= -->\n  <section id=\"bestsellers\" class=\"w-full py-16 sm:py-24 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Title & Subtitle (NOTE Authentic Content) -->\n      <div class=\"text-center mb-10 sm:mb-14\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2\">الأكثـر مبيعًـا</h2>\n        <p class=\"text-xs sm:text-sm text-stone-500 font-normal\">عطور نوت الأكثر طلباً وإشادة</p>\n      </div>\n\n      <!-- Slider Container with Floating Navigation Arrows -->\n      <div class=\"relative group px-1 sm:px-2\">\n        <!-- Arrow Right (Scrolls Right) -->\n        <button onclick=\"scrollSlider('slider-bestsellers', 'right')\" class=\"absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"السابق\">\n          <i class=\"sicon-keyboard_arrow_right text-sm\"></i>\n        </button>\n\n        <!-- Arrow Left (Scrolls Left into more products) -->\n        <button onclick=\"scrollSlider('slider-bestsellers', 'left')\" class=\"absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"التالي\">\n          <i class=\"sicon-keyboard_arrow_left text-sm\"></i>\n        </button>\n\n        <!-- Horizontal Scroll Track -->\n        <div id=\"slider-bestsellers\" class=\"flex flex-nowrap overflow-x-auto scroll-smooth gap-4 sm:gap-6 lg:gap-7 pb-6 pt-2 px-1 scrollbar-none\" style=\"scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;\">\n          <!-- Injected via JavaScript from productsData -->\n        </div>\n      </div>\n\n      <!-- Centered \"عرض الكل\" Button -->\n      <div class=\"text-center mt-8 sm:mt-12\">\n        <a href=\"/categories/1697258/الأكثر-مبيعا\" class=\"inline-flex items-center gap-2 px-7 py-2.5 rounded-lg border border-black text-black hover:bg-black hover:text-white transition text-xs sm:text-sm font-bold\">\n          <span>عرض الكل</span>\n          <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n        </a>\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 4. CAMPAIGN BANNER 1 (ROUNDED IMAGE BANNER) ================= -->\n  <section class=\"w-full py-6 sm:py-10 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      <a href=\"/categories/1500261/عطور-النيش\" class=\"block group\">\n        <div class=\"relative overflow-hidden rounded-2xl md:rounded-3xl shadow-sm group-hover:shadow-md transition duration-500\">\n          <picture class=\"w-full block\">\n            <source media=\"(max-width: 768px)\" srcset=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Mobile/NOTE_Hero_05_Warm_Cool_Diptych_Mobile.webp\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/Desktop/NOTE_Hero_05_Warm_Cool_Diptych_Desktop.webp\" alt=\"مجموعة نوت الملكية | Royal Diptych Collection\" class=\"w-full h-auto object-cover block group-hover:scale-[1.01] transition-transform duration-500\">\n          </picture>\n        </div>\n      </a>\n    </div>\n  </section>\n\n  <!-- ================= 5. SECTION: عطور النيش (NICHE PERFUMES SLIDER) ================= -->\n  <section id=\"niche\" class=\"w-full py-16 sm:py-24 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <div class=\"text-center mb-10 sm:mb-14\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2\">عطور النيش</h2>\n        <p class=\"text-xs sm:text-sm text-stone-500 font-normal\">توليفات حصرية بنقاء فائق وثبات يدوم طويلاً</p>\n      </div>\n\n      <!-- Slider Container -->\n      <div class=\"relative group px-1 sm:px-2\">\n        <button onclick=\"scrollSlider('slider-niche', 'right')\" class=\"absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"السابق\">\n          <i class=\"sicon-keyboard_arrow_right text-sm\"></i>\n        </button>\n        <button onclick=\"scrollSlider('slider-niche', 'left')\" class=\"absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"التالي\">\n          <i class=\"sicon-keyboard_arrow_left text-sm\"></i>\n        </button>\n\n        <div id=\"slider-niche\" class=\"flex flex-nowrap overflow-x-auto scroll-smooth gap-4 sm:gap-6 lg:gap-7 pb-6 pt-2 px-1 scrollbar-none\" style=\"scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;\">\n          <!-- Injected via JavaScript from productsData -->\n        </div>\n      </div>\n\n      <div class=\"text-center mt-8 sm:mt-12\">\n        <a href=\"/categories/1500261/عطور-النيش\" class=\"inline-flex items-center gap-2 px-7 py-2.5 rounded-lg border border-black text-black hover:bg-black hover:text-white transition text-xs sm:text-sm font-bold\">\n          <span>عرض الكل</span>\n          <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n        </a>\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 6. CAMPAIGN BANNER 2 (PACKAGES & COLLECTIONS PROMOTIONAL CAROUSEL) ================= -->\n  <section class=\"w-full py-10 sm:py-16 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Section Header: باقات مختارة لك -->\n      <div class=\"text-center mb-8 sm:mb-12\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2\">باقات مختارة لك</h2>\n        <p class=\"text-xs sm:text-sm text-stone-500 font-normal\">تشكيلات حصرية متكاملة تجمع أفخم عطور نوت بأسعار استثنائية</p>\n      </div>\n\n      <!-- Carousel Container with 2:1 Aspect Ratio (Auto-alternates every 3 seconds) -->\n      <div id=\"offers-carousel\" class=\"relative w-full aspect-[2/1] overflow-hidden rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition duration-500 bg-stone-100 group select-none\">\n        \n        <!-- Slides -->\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-100 z-10 block\" data-index=\"0\" aria-label=\"رويال توباكو\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/01_Royal_Tobacco.webp\" alt=\"رويال توباكو\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"1\" aria-label=\"باودروز\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/02_Powderose.webp\" alt=\"باودروز\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"2\" aria-label=\"سمر إسكيب\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/03_Summer_Escape.webp\" alt=\"سمر إسكيب\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"3\" aria-label=\"هير سفنتشر\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/04_Her_Signature.webp\" alt=\"هير سفنتشر\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"4\" aria-label=\"مِنز سفنتشر\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/05_Mens_Signature.webp\" alt=\"مِنز سفنتشر\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"5\" aria-label=\"نايت سفنتشر\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/06_Night_Signature.webp\" alt=\"نايت سفنتشر\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"6\" aria-label=\"مجموعة التولات الخاصة\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/07_Tollah_Collection.webp\" alt=\"مجموعة التولات الخاصة\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <a href=\"/categories/1752110/packages\" class=\"offer-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none z-0 block\" data-index=\"7\" aria-label=\"مجموعة معطرات الجسم\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/banners/offers/08_All_Over_Spray_Collection.webp\" alt=\"مجموعة معطرات الجسم\" class=\"w-full h-full object-cover\" loading=\"lazy\" decoding=\"async\">\n        </a>\n\n        <!-- Navigation Arrows (Subtle on hover) -->\n        <button onclick=\"nextOfferSlide(event)\" class=\"absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 active:scale-95 cursor-pointer shadow-md\" aria-label=\"الشريحة التالية\">\n          <i class=\"sicon-keyboard_arrow_left text-xs sm:text-sm\"></i>\n        </button>\n        <button onclick=\"prevOfferSlide(event)\" class=\"absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 active:scale-95 cursor-pointer shadow-md\" aria-label=\"الشريحة السابقة\">\n          <i class=\"sicon-keyboard_arrow_right text-xs sm:text-sm\"></i>\n        </button>\n\n        <!-- Navigation Dots -->\n        <div id=\"offer-dots\" dir=\"ltr\" class=\"absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1.5 sm:gap-2\">\n          <button onclick=\"goToOfferSlide(0, event)\" class=\"offer-dot w-6 h-1 sm:h-1.5 rounded-full bg-white transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 1\"></button>\n          <button onclick=\"goToOfferSlide(1, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 2\"></button>\n          <button onclick=\"goToOfferSlide(2, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 3\"></button>\n          <button onclick=\"goToOfferSlide(3, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 4\"></button>\n          <button onclick=\"goToOfferSlide(4, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 5\"></button>\n          <button onclick=\"goToOfferSlide(5, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 6\"></button>\n          <button onclick=\"goToOfferSlide(6, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 7\"></button>\n          <button onclick=\"goToOfferSlide(7, event)\" class=\"offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm\" aria-label=\"عرض 8\"></button>\n        </div>\n\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 7. SECTION: أحدث المنتجات (NEWEST PRODUCTS SLIDER) ================= -->\n  <section id=\"new-releases\" class=\"w-full py-16 sm:py-24 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <div class=\"text-center mb-10 sm:mb-14\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2\">أحدث المنتجات</h2>\n        <p class=\"text-xs sm:text-sm text-stone-500 font-normal\">إصدارات دار نوت العطرية الجديدة</p>\n      </div>\n\n      <!-- Slider Container -->\n      <div class=\"relative group px-1 sm:px-2\">\n        <button onclick=\"scrollSlider('slider-new', 'right')\" class=\"absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"السابق\">\n          <i class=\"sicon-keyboard_arrow_right text-sm\"></i>\n        </button>\n        <button onclick=\"scrollSlider('slider-new', 'left')\" class=\"absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-stone-800 hover:text-black hover:scale-105 active:scale-95 transition\" aria-label=\"التالي\">\n          <i class=\"sicon-keyboard_arrow_left text-sm\"></i>\n        </button>\n\n        <div id=\"slider-new\" class=\"flex flex-nowrap overflow-x-auto scroll-smooth gap-4 sm:gap-6 lg:gap-7 pb-6 pt-2 px-1 scrollbar-none\" style=\"scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;\">\n          <!-- Injected via JavaScript from productsData -->\n        </div>\n      </div>\n\n      <div class=\"text-center mt-8 sm:mt-12\">\n        <a href=\"/categories/1327929/newest-products\" class=\"inline-flex items-center gap-2 px-7 py-2.5 rounded-lg border border-black text-black hover:bg-black hover:text-white transition text-xs sm:text-sm font-bold\">\n          <span>عرض الكل</span>\n          <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n        </a>\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 8. SECTION: إختر عالمك (NOTE PERFUMES CATEGORIES GRID - LAVERNE STYLE) ================= -->\n  <section id=\"curated-sets\" class=\"w-full py-16 sm:py-24 bg-white border-t border-stone-100\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Section Header Matching Laverne Style -->\n      <div class=\"text-center mb-10 sm:mb-14\">\n        <h2 class=\"text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight\">إختر عالمك</h2>\n        <p class=\"text-sm sm:text-base text-gray-500 font-medium mt-2\">اكتشف فئات وتوليفات دار نوت للعطور</p>\n      </div>\n\n      <!-- 8 NOTE Category Cards Grid Matching Laverne Layout -->\n      <div class=\"grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8\">\n        \n        <!-- Card 1: عطور النيش الفاخرة -->\n        <a href=\"/categories/1500261/عطور-النيش\" class=\"group block text-center\" aria-label=\"عطور النيش الفاخرة\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_niche.webp\" alt=\"عطور النيش الفاخرة\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">عطور النيش الفاخرة</h3>\n        </a>\n\n        <!-- Card 2: العطور (100 مل) -->\n        <a href=\"/categories/1748533/perfumes\" class=\"group block text-center\" aria-label=\"العطور 100 مل\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_perfumes.webp\" alt=\"العطور 100 مل\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">العطور (100 مل)</h3>\n        </a>\n\n        <!-- Card 3: عطور 30 مل -->\n        <a href=\"/categories/1310036/30ml-perfumes\" class=\"group block text-center\" aria-label=\"عطور 30 مل\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_30ml.webp\" alt=\"عطور 30 مل\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">عطور 30 مل</h3>\n        </a>\n\n        <!-- Card 4: مجموعات وباقات نوت -->\n        <a href=\"/categories/1752110/packages\" class=\"group block text-center\" aria-label=\"مجموعات وباقات نوت\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_packages.webp\" alt=\"مجموعات وباقات نوت\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">مجموعات وباقات نوت</h3>\n        </a>\n\n        <!-- Card 5: معطرات الجسم -->\n        <a href=\"/categories/1688838/all-over-spray\" class=\"group block text-center\" aria-label=\"معطرات الجسم\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_allover.webp\" alt=\"معطرات الجسم\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">معطرات الجسم</h3>\n        </a>\n\n        <!-- Card 6: معطرات الجو والمفارش -->\n        <a href=\"/categories/1310037/معطرات-جو-وجسم\" class=\"group block text-center\" aria-label=\"معطرات الجو والمفارش\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_linen.webp\" alt=\"معطرات الجو والمفارش\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">معطرات الجو والمفارش</h3>\n        </a>\n\n        <!-- Card 7: منتجات العناية بالبشرة -->\n        <a href=\"/categories/1750048/body-care-products\" class=\"group block text-center\" aria-label=\"منتجات العناية بالبشرة\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_bodycare.webp\" alt=\"منتجات العناية بالبشرة\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">منتجات العناية بالبشرة</h3>\n        </a>\n\n        <!-- Card 8: التولات والمسك الخالص -->\n        <a href=\"/categories/1421002/tollah\" class=\"group block text-center\" aria-label=\"التولات والمسك الخالص\">\n          <div class=\"overflow-hidden rounded-2xl md:rounded-3xl bg-stone-50 mb-3 sm:mb-4 aspect-[3/4] shadow-sm group-hover:shadow-md transition duration-500\">\n            <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/categories/note_cat_tollah.webp\" alt=\"التولات والمسك الخالص\" loading=\"lazy\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\">\n          </div>\n          <h3 class=\"text-base sm:text-lg font-bold text-gray-900 group-hover:text-stone-600 transition\">التولات والمسك الخالص</h3>\n        </a>\n\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ================= 9. SECTION: ركائز الثقة (STORE TRUST FEATURES - DIRECTLY ABOVE FOOTER) ================= -->\n  <section class=\"w-full py-14 sm:py-20 bg-white border-t border-stone-100\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      <div class=\"grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center\">\n        \n        <div class=\"flex flex-col items-center p-3\">\n          <svg class=\"w-8 h-8 text-black mb-3\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75\" />\n          </svg>\n          <h4 class=\"text-sm font-bold text-black mb-1\">شحن فاخر ومؤمّن</h4>\n          <p class=\"text-xs text-stone-500 font-normal\">توصيل سريع وآمن لجميع مناطق المملكة والخليج</p>\n        </div>\n\n        <div class=\"flex flex-col items-center p-3\">\n          <svg class=\"w-8 h-8 text-black mb-3\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z\" />\n          </svg>\n          <h4 class=\"text-sm font-bold text-black mb-1\">الضمان الذهبي الملكي</h4>\n          <p class=\"text-xs text-stone-500 font-normal\">عينة للتجربة مع ضمان استرجاع كامل وسلس</p>\n        </div>\n\n        <div class=\"flex flex-col items-center p-3\">\n          <svg class=\"w-8 h-8 text-black mb-3\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 002.25 19.5z\" />\n          </svg>\n          <h4 class=\"text-sm font-bold text-black mb-1\">دفع إلكتروني وتقسيط مرن</h4>\n          <p class=\"text-xs text-stone-500 font-normal\">قسّم مدفوعاتك عبر تابي وتمارا بدون أي فوائد</p>\n        </div>\n\n        <div class=\"flex flex-col items-center p-3\">\n          <svg class=\"w-8 h-8 text-black mb-3\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z\" />\n          </svg>\n          <h4 class=\"text-sm font-bold text-black mb-1\">عطور نيش أصلية 100%</h4>\n          <p class=\"text-xs text-stone-500 font-normal\">توليفة نيش أصلية بثبات وفوحان فائق</p>\n        </div>\n\n      </div>\n    </div>\n  </section>",
    footer: "<!-- ================= 10. STORE FOOTER (100% AUTHENTIC NOTE ARCHITECTURE) ================= -->\n  <footer id=\"note-store-footer\" class=\"w-full pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-black text-white text-right\">\n    <div class=\"max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800\">\n      \n      <!-- Brand, Bio & Legal Verification -->\n      <div class=\"space-y-4\">\n        <a href=\"/\" class=\"inline-block\">\n          <img id=\"footer-logo\" src=\"https://youssefrasheed.github.io/note-zid-styles/logo_white_crisp.png\" alt=\"NOTE Perfumes\" class=\"h-9 w-auto object-contain\">\n        </a>\n        <p class=\"text-xs text-stone-400 leading-relaxed font-light\">\n          نوت للعطور (NOTE) | دار عطور سعودية رائدة تُعنى بابتكار توليفات نيش مستوحاة من أندر المكونات الطبيعية بنقاء فائق وثبات يدوم طويلاً، لتقديم بصمة عطرية تليق بأصحاب الذوق الرفيع.\n        </p>\n        \n        <!-- Authentic Legal & Verification Badges -->\n        <div class=\"pt-1 text-xs text-stone-400 space-y-1.5 font-light\">\n          <p>السجل التجاري: <span class=\"font-mono font-bold text-white tracking-wider\">1010713359</span></p>\n          <p>الرقم الضريبي: <span class=\"font-mono font-bold text-white tracking-wider\">310103613800003</span></p>\n        </div>\n\n        <div class=\"pt-2\">\n          <div class=\"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-300\">\n            <svg class=\"w-4 h-4 text-emerald-400 shrink-0\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\n              <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/>\n            </svg>\n            <span>موثّق في المركز السعودي للأعمال (منصة الأعمال)</span>\n          </div>\n        </div>\n      </div>\n\n      <!-- Links 1: السياسات والضمان -->\n      <div>\n        <h4 class=\"text-xs font-bold mb-4 text-white tracking-widest uppercase\">السياسات والضمان</h4>\n        <ul class=\"space-y-2.5 text-xs text-stone-400 font-light\">\n          <li><a href=\"/refund-policy.html\" class=\"hover:text-white transition\">سياسة الاستبدال والاسترجاع</a></li>\n          <li><a href=\"/terms.html\" class=\"hover:text-white transition\">الشروط والأحكام</a></li>\n          <li><a href=\"/privacy.html\" class=\"hover:text-white transition\">سياسة الخصوصية</a></li>\n          <li><a href=\"/refund-policy.html\" class=\"hover:text-white transition\">الضمان الذهبي الملكي للتجربة</a></li>\n          <li><a href=\"/contact.html\" class=\"hover:text-white transition\">الشكاوى والمقترحات</a></li>\n        </ul>\n      </div>\n\n      <!-- Links 2: المساعدة وقنوات التواصل -->\n      <div>\n        <h4 class=\"text-xs font-bold mb-4 text-white tracking-widest uppercase\">روابط المساعدة وتواصل معنا</h4>\n        <ul class=\"space-y-2.5 text-xs text-stone-400 font-light\">\n          <li><a href=\"/faqs.html\" class=\"hover:text-white transition\">الأسئلة الأكثر تكراراً (FAQ)</a></li>\n          <li><a href=\"https://wa.me/966565955420\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"hover:text-white transition flex items-center gap-1.5\"><i class=\"sicon-whatsapp text-emerald-400 text-sm\"></i> تواصل معنا عبر واتساب</a></li>\n          <li><a href=\"tel:+966565955420\" class=\"hover:text-white transition\">الهاتف: <bdi class=\"text-stone-300 font-mono\">+966 56 595 5420</bdi></a></li>\n          <li><a href=\"mailto:marketing.noteperf@gmail.com\" class=\"hover:text-white transition break-all\">البريد: marketing.noteperf@gmail.com</a></li>\n        </ul>\n\n        <!-- Social Media Icons (Instagram & TikTok from old site) -->\n        <div class=\"pt-4\">\n          <p class=\"text-[11px] text-stone-400 mb-2 font-medium\">تابع نوت عبر منصات التواصل:</p>\n          <div class=\"flex items-center gap-2\">\n            <a href=\"https://www.instagram.com/noteperf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-white hover:text-white text-stone-400 flex items-center justify-center transition\" aria-label=\"انستقرام نوت\">\n              <svg class=\"w-4 h-4 fill-current\" viewBox=\"0 0 24 24\"><path d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z\"/></svg>\n            </a>\n            <a href=\"https://www.tiktok.com/@Noteperf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-white hover:text-white text-stone-400 flex items-center justify-center transition\" aria-label=\"تيك توك نوت\">\n              <svg class=\"w-4 h-4 fill-current\" viewBox=\"0 0 24 24\"><path d=\"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.69c0 1.52-.33 3.07-1.17 4.33-.87 1.3-2.18 2.32-3.69 2.81-1.35.44-2.82.47-4.21.13-1.64-.41-3.13-1.42-4.14-2.78-1.21-1.64-1.68-3.79-1.33-5.81.36-2.02 1.63-3.83 3.44-4.82 1.34-.73 2.89-1.03 4.41-.9v4.11c-.72.04-1.45.22-2.07.6-.68.42-1.19 1.11-1.36 1.89-.2.86-.03 1.8.44 2.53.47.74 1.27 1.25 2.15 1.38.86.13 1.77-.07 2.47-.58.71-.51 1.15-1.33 1.18-2.22V.02h-.14z\"/></svg>\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <!-- Payment & Shipping: وسائل الدفع والشحن المعتمدة -->\n      <div class=\"space-y-5\">\n        <div>\n          <h4 class=\"text-xs font-bold mb-2.5 text-white tracking-widest uppercase\">وسائل الدفع الآمنة</h4>\n          <div class=\"flex flex-wrap items-center gap-2\">\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"مدى Mada\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mada.png\" alt=\"مدى Mada\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"Apple Pay\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/apple_pay.svg\" alt=\"Apple Pay\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"Visa\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/visa.png\" alt=\"Visa\" class=\"h-2.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"Mastercard\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mastercard.png\" alt=\"Mastercard\" class=\"h-4 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2 bg-white rounded flex items-center justify-center shadow-xs\" title=\"تابي Tabby\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tabby.svg\" alt=\"تابي Tabby\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2 bg-white rounded flex items-center justify-center shadow-xs\" title=\"تمارا Tamara\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tamara.svg\" alt=\"تمارا Tamara\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n          </div>\n        </div>\n\n        <div>\n          <h4 class=\"text-xs font-bold mb-2.5 text-white tracking-widest uppercase\">شركاء الشحن والتوصيل</h4>\n          <div class=\"flex flex-wrap items-center gap-2\">\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"أرامكس Aramex\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/shipping/aramex.svg\" alt=\"أرامكس Aramex\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"سمسا SMSA Express\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/shipping/smsa.svg\" alt=\"سمسا SMSA Express\" class=\"h-3.5 w-auto object-contain\">\n            </div>\n            <div class=\"h-7 px-2.5 bg-white rounded flex items-center justify-center shadow-xs\" title=\"سُبل SPL البريد السعودي\">\n              <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/shipping/spl.svg\" alt=\"سُبل SPL البريد السعودي\" class=\"h-4 w-auto object-contain\">\n            </div>\n          </div>\n        </div>\n\n        <p class=\"text-[11px] text-stone-500 pt-1\">جميع المعاملات المالية مشفرة ومؤمّنة بنسبة 100%</p>\n      </div>\n\n    </div>\n\n    <!-- Bottom Copyright -->\n    <div class=\"max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4\">\n      <p>جميع الحقوق محفوظة لدار نوت للعطور | NOTE Perfumes © 2026</p>\n      <p class=\"font-light\">صالة العرض والمقر الإداري: جدة، المملكة العربية السعودية</p>\n    </div>\n  </footer>",
    modals: "<!-- ================= 11. QUICK VIEW MODAL (PURE BLACK & WHITE MINIMALISM) ================= -->\n  <div id=\"quickview-modal\" class=\"fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4 transition-all duration-300\">\n    <div class=\"bg-white rounded-2xl max-w-3xl lg:max-w-4xl w-full overflow-hidden shadow-2xl relative text-right flex flex-col md:flex-row border border-stone-100 max-h-[92vh] overflow-y-auto\">\n      <button onclick=\"closeQuickView()\" class=\"absolute top-4 left-4 z-30 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-black flex items-center justify-center text-sm transition\" aria-label=\"إغلاق\">\n        <i class=\"sicon-cancel\"></i>\n      </button>\n\n      <div class=\"w-full md:w-1/2 relative bg-stone-50 overflow-hidden min-h-[340px] md:min-h-[480px] flex items-center justify-center p-6\">\n        <img id=\"modal-img\" src=\"\" alt=\"صورة العطر\" class=\"w-full h-full object-contain\">\n      </div>\n\n      <div class=\"w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-5\">\n        <div class=\"space-y-3\">\n          <span id=\"modal-cat\" class=\"text-[10px] text-stone-400 font-bold uppercase tracking-widest\">EXTRAIT DE PARFUM • 100 ML</span>\n          <h3 id=\"modal-title\" class=\"text-xl sm:text-2xl font-bold text-black\">اسم العطر</h3>\n          <p id=\"modal-slogan\" class=\"text-xs text-stone-600 font-normal leading-relaxed\"></p>\n          \n          <div class=\"bg-stone-50 p-4 rounded-xl text-xs space-y-2 border border-stone-100 mt-2\">\n            <h5 class=\"text-[11px] font-bold text-black border-b border-stone-200 pb-1.5\">الهرم العطري الكامل:</h5>\n            <p id=\"modal-top\" class=\"text-stone-700 text-xs\"></p>\n            <p id=\"modal-heart\" class=\"text-stone-700 text-xs\"></p>\n            <p id=\"modal-base\" class=\"text-stone-700 text-xs\"></p>\n          </div>\n\n          <div class=\"flex items-center gap-2 text-xs text-stone-700 pt-1\">\n            <i class=\"sicon-shield-check text-black\"></i>\n            <span>الضمان الذهبي: اختبر عينة التجربة قبل فتح العبوة الأساسية</span>\n          </div>\n        </div>\n\n        <div class=\"pt-4 border-t border-stone-100 space-y-3\">\n          <div class=\"flex items-center justify-between\">\n            <div>\n              <span id=\"modal-price\" class=\"text-2xl font-extrabold text-black\">229 ر.س</span>\n              <span class=\"block text-[10px] text-stone-400 font-normal mt-0.5\">شامل الضريبة المضافة</span>\n            </div>\n            <button id=\"modal-buy-btn\" class=\"px-8 py-3 rounded-full bg-black hover:bg-stone-800 text-white transition font-bold text-xs flex items-center gap-2 shadow-lg active:scale-95\">\n              <i class=\"sicon-shopping-bag\"></i>\n              <span>إضافة للسلة</span>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Notification Toast -->\n  <div id=\"cart-toast\" class=\"fixed top-6 left-1/2 -translate-x-1/2 z-50 transform -translate-y-24 opacity-0 transition-all duration-300 pointer-events-none px-6 py-3.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-3 bg-black text-white\">\n    <i class=\"sicon-check-circle text-white text-sm\"></i>\n    <span id=\"cart-toast-text\"></span>\n  </div>\n\n  <!-- Search Modal (Luxury Instant Autocomplete & Results) -->\n  <div id=\"search-modal\" class=\"fixed inset-0 z-50 bg-black/75 backdrop-blur-md hidden opacity-0 transition-opacity duration-300 flex items-start justify-center pt-16 sm:pt-24 px-4\" onclick=\"if(event.target === this) closeSearchModal()\">\n    <div class=\"relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300 text-right p-5 sm:p-6 flex flex-col max-h-[85vh]\">\n      \n      <!-- Input Row -->\n      <div class=\"flex items-center gap-3 border-b border-stone-200 pb-3.5 shrink-0\">\n        <i class=\"sicon-search text-stone-400 text-xl\"></i>\n        <input id=\"search-input\" oninput=\"handleLiveSearch(this.value)\" type=\"text\" placeholder=\"ابحث عن عطرك المفضل، المكونات، النوتات (مثال: مسك، توباكو، عود)...\" class=\"w-full bg-transparent text-sm sm:text-base text-black placeholder-stone-400 focus:outline-none font-medium\">\n        <button onclick=\"closeSearchModal()\" class=\"w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm transition shrink-0\" title=\"إغلاق\">\n          <i class=\"sicon-cancel\"></i>\n        </button>\n      </div>\n\n      <!-- Quick Popular Tags -->\n      <div id=\"search-quick-tags\" class=\"pt-4 pb-1 shrink-0\">\n        <span class=\"text-[11px] text-stone-400 font-bold block mb-2\">الأكثر بحثاً في الدار:</span>\n        <div class=\"flex flex-wrap items-center gap-2\">\n          <button onclick=\"fillAndSearch('رويال توباكو')\" class=\"px-3 py-1 rounded-full bg-stone-100 hover:bg-black hover:text-white text-stone-700 text-xs font-medium transition\">رويال توباكو</button>\n          <button onclick=\"fillAndSearch('مسك')\" class=\"px-3 py-1 rounded-full bg-stone-100 hover:bg-black hover:text-white text-stone-700 text-xs font-medium transition\">مِسك</button>\n          <button onclick=\"fillAndSearch('عود')\" class=\"px-3 py-1 rounded-full bg-stone-100 hover:bg-black hover:text-white text-stone-700 text-xs font-medium transition\">عود روزوود</button>\n          <button onclick=\"fillAndSearch('اورا')\" class=\"px-3 py-1 rounded-full bg-stone-100 hover:bg-black hover:text-white text-stone-700 text-xs font-medium transition\">أورا (Aura)</button>\n          <button onclick=\"fillAndSearch('باودر')\" class=\"px-3 py-1 rounded-full bg-stone-100 hover:bg-black hover:text-white text-stone-700 text-xs font-medium transition\">رويال باودر</button>\n          <button onclick=\"fillAndSearch('نيش')\" class=\"px-3 py-1 rounded-full bg-stone-100 hover:bg-black hover:text-white text-stone-700 text-xs font-medium transition\">عطور النيش</button>\n        </div>\n      </div>\n\n      <!-- Live Search Results Container -->\n      <div id=\"search-results\" class=\"mt-3 overflow-y-auto divide-y divide-stone-100 max-h-[50vh] pr-1\"></div>\n\n      <!-- Footer / View All Link -->\n      <div id=\"search-modal-footer\" class=\"pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 hidden shrink-0\">\n        <span id=\"search-results-count\" class=\"font-bold text-black\"></span>\n        <a id=\"search-view-all-link\" href=\"/categories\" onclick=\"closeSearchModal()\" class=\"text-black font-extrabold hover:underline flex items-center gap-1\">\n          <span>عرض كافة النتائج في صفحة العطور</span>\n          <i class=\"sicon-keyboard_arrow_left text-sm\"></i>\n        </a>\n      </div>\n\n    </div>\n  </div>\n\n  <!-- Mobile Drawer Menu -->\n  <div id=\"mobile-menu-drawer\" class=\"fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300\">\n    <div class=\"fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between transform translate-x-full transition-transform duration-300\">\n      <div>\n        <div class=\"flex items-center justify-between pb-6 border-b border-stone-100\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/logo_dark_crisp.png\" alt=\"NOTE\" class=\"h-8 w-auto\">\n          <button onclick=\"closeMobileMenu()\" class=\"w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-black\">\n            <i class=\"sicon-cancel text-sm\"></i>\n          </button>\n        </div>\n        <nav class=\"py-6 space-y-3.5 text-sm font-bold text-black\">\n          <a href=\"/\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">الرئيسية</a>\n          <a href=\"/categories\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">جميع المنتجات</a>\n          <a href=\"/categories/1748533/perfumes\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">العطور (100 مل)</a>\n          <a href=\"/categories/1697258/الأكثر-مبيعا\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">الأكثر مبيعاً</a>\n          <a href=\"/categories/1327929/newest-products\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">أحدث المنتجات</a>\n          <a href=\"/categories/1310036/30ml-perfumes\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">عطور 30 مل</a>\n          <a href=\"/categories/1688838/all-over-spray\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">معطر للجسم</a>\n          <a href=\"/categories/1752110/packages\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">مجموعات وباقات نوت</a>\n          <a href=\"/categories/1310037/معطرات-جو-وجسم\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">معطرات جو ومفارش</a>\n          <a href=\"/categories/1421002/tollah\" onclick=\"closeMobileMenu()\" class=\"block py-1 hover:text-stone-500\">تولات ودهن عود</a>\n        </nav>\n      </div>\n      <div class=\"text-xs text-stone-400 border-t border-stone-100 pt-4\">\n        <p>نوت للعطور © 2026</p>\n      </div>\n    </div>\n  </div>\n\n  <!-- Floating WhatsApp Luxury Button -->\n  <div id=\"floating-whatsapp-container\" class=\"fixed bottom-[90px] sm:bottom-6 left-4 sm:left-6 z-[90] flex items-center flex-row-reverse group select-none\" style=\"margin-bottom: env(safe-area-inset-bottom, 0px);\">\n    <a id=\"floating-whatsapp\" href=\"https://wa.me/966565955420?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%86%D9%88%D8%AA%20%D9%84%D9%84%D8%B9%D8%B7%D9%88%D8%B1%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300\" aria-label=\"تواصل معنا عبر واتساب\">\n      <span class=\"absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none\"></span>\n      <svg class=\"relative z-10 w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm\" viewBox=\"0 0 24 24\" aria-hidden=\"true\">\n        <path d=\"M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.177 1.564 5.927l-1.656 6.049 6.222-1.632c1.705.932 3.659 1.464 5.738 1.464 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 21.818c-1.895 0-3.652-.522-5.163-1.429l-.37-.22-3.842 1.008 1.025-3.742-.241-.384c-.997-1.589-1.524-3.435-1.524-5.342 0-5.413 4.406-9.818 9.819-9.818 5.414 0 9.818 4.405 9.818 9.818 0 5.414-4.404 9.818-9.818 9.818z\"/>\n      </svg>\n    </a>\n\n    <!-- Interactive Tooltip (Desktop) -->\n    <span class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/90 text-white text-xs font-semibold shadow-xl backdrop-blur mr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap\">\n      <span class=\"w-2 h-2 rounded-full bg-emerald-400 animate-pulse\"></span>\n      تواصل معنا مباشرة عبر واتساب\n    </span>\n  </div>",
    drawer: "<!-- ================= UNIVERSAL SLIDE-OUT CART DRAWER ================= -->\n  <div id=\"cart-drawer-overlay\" class=\"fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden opacity-0 transition-opacity duration-300\" onclick=\"CartManager.closeDrawer()\"></div>\n  <div id=\"cart-drawer\" class=\"fixed top-0 left-0 bottom-0 w-full sm:w-[420px] bg-white z-50 transform -translate-x-full transition-transform duration-300 flex flex-col justify-between shadow-2xl text-right hidden\">\n    <div class=\"p-5 border-b border-stone-100 flex items-center justify-between\">\n      <div class=\"flex items-center gap-2\">\n        <i class=\"sicon-shopping-bag text-lg text-black\"></i>\n        <h3 class=\"text-sm font-bold text-black\">سلة المشتريات</h3>\n        <span class=\"cart-badge-count text-xs font-bold text-stone-400\">(0)</span>\n      </div>\n      <button onclick=\"CartManager.closeDrawer()\" class=\"w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-black flex items-center justify-center transition\">\n        <i class=\"sicon-cancel text-sm\"></i>\n      </button>\n    </div>\n\n    <div hidden class=\"px-5 py-3 bg-stone-50 border-b border-stone-100\">\n      <p id=\"cart-free-shipping-text\" class=\"text-xs text-stone-600 mb-1.5\"></p>\n      <div class=\"w-full bg-stone-200 h-1.5 rounded-full overflow-hidden\">\n        <div hidden  id=\"cart-free-shipping-progress\" class=\"bg-black h-full transition-all duration-500\" style=\"width: 0%\"></div>\n      </div>\n    </div>\n\n    <div id=\"cart-drawer-items\" class=\"p-5 flex-grow overflow-y-auto divide-y divide-stone-100\"></div>\n\n    <!-- Recommendations Section inside Drawer (Compact) -->\n    <div id=\"cart-drawer-recommendations\" class=\"p-2.5 px-4 bg-stone-50/80 border-t border-stone-100 hidden\">\n      <div class=\"flex items-center justify-between mb-1.5\">\n        <span class=\"text-[11px] font-bold text-black flex items-center gap-1\">\n          <i class=\"sicon-sparkles text-amber-500 text-xs\"></i>\n          <span>ترشيح نوت لك</span>\n        </span>\n        <span class=\"text-[9px] text-stone-400\">إضافة سريعة بنقرة واحدة</span>\n      </div>\n      <div id=\"cart-drawer-recs-list\" class=\"space-y-1.5\"></div>\n    </div>\n\n    <div id=\"cart-drawer-empty\" class=\"hidden flex flex-col items-center justify-center p-8 text-center my-auto\">\n      <div class=\"w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4\">\n        <i class=\"sicon-shopping-bag text-2xl\"></i>\n      </div>\n      <h4 class=\"text-sm font-bold text-black mb-1\">سلتك فارغة حالياً</h4>\n      <p class=\"text-xs text-stone-400 max-w-xs mb-6\">تصفح تشكيلتنا العطرية الاستثنائية واختر عطرك المفضل الآن</p>\n      <a href=\"/categories\" onclick=\"CartManager.closeDrawer()\" class=\"px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-stone-800 transition\">\n        تصفح العطور\n      </a>\n    </div>\n\n    <div id=\"cart-drawer-footer\" class=\"p-5 border-t border-stone-100 bg-white space-y-3\">\n      <div class=\"flex items-center justify-between text-xs font-bold text-stone-500\">\n        <span>المجموع الفرعي:</span>\n        <span id=\"cart-drawer-subtotal\" class=\"text-black font-extrabold text-sm\">0 ر.س</span>\n      </div>\n      <div class=\"flex items-center justify-between text-xs text-stone-400\">\n        <span>الشحن والضريبة:</span>\n        <span>يتم احتسابها عند الدفع</span>\n      </div>\n      <div class=\"flex items-center justify-between text-sm font-extrabold text-black pt-2 border-t border-stone-100\">\n        <span>الإجمالي التقديري:</span>\n        <span id=\"cart-drawer-total\">0 ر.س</span>\n      </div>\n\n      <div class=\"pt-2 space-y-2\">\n        <a href=\"/cart\" class=\"w-full py-3 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition duration-300 shadow-md\">\n          <span>إتمام الطلب بأمان</span>\n          <i class=\"sicon-keyboard_arrow_left text-sm\"></i>\n        </a>\n        <button onclick=\"CartManager.closeDrawer()\" class=\"w-full py-2.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs transition\">\n          متابعة التسوق\n        </button>\n      </div>\n\n      <div class=\"pt-2 border-t border-stone-100 flex items-center justify-center gap-1.5\">\n        <div class=\"h-5 px-1.5 bg-stone-50 border border-stone-200 rounded flex items-center justify-center\" title=\"مدى\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mada.png\" alt=\"Mada\" class=\"h-2.5 w-auto object-contain\">\n        </div>\n        <div class=\"h-5 px-1.5 bg-stone-50 border border-stone-200 rounded flex items-center justify-center\" title=\"Apple Pay\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/apple_pay.svg\" alt=\"Apple Pay\" class=\"h-2.5 w-auto object-contain\">\n        </div>\n        <div class=\"h-5 px-1.5 bg-stone-50 border border-stone-200 rounded flex items-center justify-center\" title=\"Visa\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/visa.png\" alt=\"Visa\" class=\"h-2 w-auto object-contain\">\n        </div>\n        <div class=\"h-5 px-1.5 bg-stone-50 border border-stone-200 rounded flex items-center justify-center\" title=\"Mastercard\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mastercard.png\" alt=\"Mastercard\" class=\"h-3 w-auto object-contain\">\n        </div>\n        <div class=\"h-5 px-1.5 bg-stone-50 border border-stone-200 rounded flex items-center justify-center\" title=\"Tabby\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tabby.svg\" alt=\"Tabby\" class=\"h-2 w-auto object-contain\">\n        </div>\n        <div class=\"h-5 px-1.5 bg-stone-50 border border-stone-200 rounded flex items-center justify-center\" title=\"Tamara\">\n          <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tamara.svg\" alt=\"Tamara\" class=\"h-2 w-auto object-contain\">\n        </div>\n      </div>\n    </div>\n  </div>",
    product: "<main id=\"page-main-wrapper\"  class=\"pt-28 sm:pt-32 pb-20 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Breadcrumb -->\n      <nav class=\"flex items-center gap-2 text-xs text-stone-400 mb-6 font-medium overflow-x-auto whitespace-nowrap\">\n        <a href=\"/\" class=\"hover:text-black transition\">الرئيسية</a>\n        <span>/</span>\n        <a id=\"pdp-breadcrumb-cat\" href=\"/category.html\" class=\"hover:text-black transition\">العطور</a>\n        <span>/</span>\n        <span id=\"pdp-breadcrumb-title\" class=\"text-black font-bold\">عطر رويال توباكو</span>\n      </nav>\n\n      <!-- ================= PRODUCT MAIN GRID ================= -->\n      <div class=\"grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start\">\n        \n        <!-- RIGHT: Product Image Gallery (Frameless Pure White) -->\n        <div class=\"lg:col-span-6 flex flex-col gap-4\">\n          <!-- Main Large Frameless Bottle -->\n          <div id=\"pdp-main-image-container\" class=\"relative w-full aspect-square bg-[#FAF9F7] rounded-2xl border border-stone-200/60 overflow-hidden flex items-center justify-center group shadow-sm\">\n            <span id=\"pdp-tag-badge\" class=\"absolute top-4 right-4 z-10 text-[10px] font-bold px-3 py-1 rounded-full bg-black text-white shadow-sm\">الأكثر طلباً</span>\n            <span class=\"absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-stone-800 border border-stone-200/80 shadow-sm flex items-center gap-1.5\">\n              <i class=\"sicon-shield-check text-black\"></i>\n              <span>الضمان الذهبي للتجربة</span>\n            </span>\n            \n            <img id=\"pdp-main-image\" src=\"https://youssefrasheed.github.io/note-zid-styles/products/NOTE_Royal_Tobacco_Flat_Lay.webp\" alt=\"عطر رويال توباكو\" class=\"w-full h-full object-contain p-4 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-105\">\n          </div>\n\n          <!-- Thumbnails Row -->\n          <div id=\"pdp-thumbnails\" class=\"flex items-center justify-center gap-3 pt-2\">\n            <!-- Dynamic thumbnails inserted via JS -->\n          </div>\n\n          <!-- Free Sample Guarantee Banner Under Image -->\n          <div class=\"p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-center gap-3 text-xs text-stone-700 mt-2\">\n            <div class=\"w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0\">\n              <i class=\"sicon-drop text-base\"></i>\n            </div>\n            <div>\n              <h5 class=\"font-bold text-black text-xs\">عينة تجربة مجانية مرفقة مع كل عطر</h5>\n              <p class=\"text-[11px] text-stone-500 font-normal mt-0.5\">جرب العينة أولاً؛ في حال لم يناسبك العطر، يمكنك استرجاعه خلال 3 أيام شرط عدم فتح السلوفان الأصلي للعبوة.</p>\n            </div>\n          </div>\n        </div>\n\n        <!-- LEFT: Product Purchase & Details Column -->\n        <div class=\"lg:col-span-6 flex flex-col space-y-6 text-right\">\n          \n          <!-- Category & Title -->\n          <div class=\"space-y-2\">\n            <div class=\"flex items-center justify-between\">\n              <span id=\"pdp-category-name\" class=\"text-xs text-stone-400 font-bold uppercase tracking-wider\">العطور الفاخرة • EXTRAIT DE PARFUM</span>\n              <div class=\"flex items-center gap-1 text-amber-500 text-xs font-bold\">\n                <span>★</span>\n                <span id=\"pdp-rating-num\" class=\"text-black\">4.91</span>\n                <span id=\"pdp-rating-count\" class=\"text-stone-400 font-normal\">(410 تقييم موثق)</span>\n              </div>\n            </div>\n\n            <h1 id=\"pdp-title\" class=\"text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black tracking-tight\">عطر رويال توباكو</h1>\n            <h2 id=\"pdp-title-en\" class=\"text-sm sm:text-base font-bold text-stone-400 tracking-widest font-mono uppercase\">ROAYAL TOBACCO</h2>\n          </div>\n\n          <!-- Price Row -->\n          <div class=\"flex items-baseline gap-3 pt-1 border-b border-stone-100 pb-5\">\n            <span id=\"pdp-price\" class=\"text-3xl font-extrabold text-black\">229 ر.س</span>\n            <span id=\"pdp-old-price\" class=\"text-base text-stone-400 line-through font-normal\">410 ر.س</span>\n            <span id=\"pdp-discount-badge\" class=\"px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200\">وفر 45%</span>\n            <span class=\"text-xs text-stone-400 font-light mr-auto\">شامل الضريبة المضافة</span>\n          </div>\n\n          <!-- Installment Options: Tabby & Tamara Minimalist Widgets -->\n          <div class=\"space-y-2.5\">\n            <!-- Tabby -->\n            <div class=\"p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/50 flex items-center justify-between text-xs\">\n              <div class=\"flex items-center gap-2.5\">\n                <div class=\"h-6 px-2 rounded bg-[#3EEDBF] flex items-center justify-center\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tabby.svg\" alt=\"Tabby\" class=\"h-3 w-auto object-contain\">\n                </div>\n                <span class=\"text-stone-800\">أو قسّمها على 4 دفعات بقيمة <strong id=\"pdp-tabby-price\" class=\"font-extrabold text-black\">57.25 ر.س</strong> بدون فوائد</span>\n              </div>\n              <span class=\"text-[10px] text-stone-400 font-bold hover:underline cursor-pointer\">معرفة المزيد</span>\n            </div>\n            \n            <!-- Tamara -->\n            <div class=\"p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/50 flex items-center justify-between text-xs\">\n              <div class=\"flex items-center gap-2.5\">\n                <div class=\"h-6 px-2 rounded bg-white border border-stone-200 flex items-center justify-center\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tamara.svg\" alt=\"Tamara\" class=\"h-3.5 w-auto object-contain\">\n                </div>\n                <span class=\"text-stone-800\">أو قسّمها على 4 دفعات بدون أي رسوم تأخير</span>\n              </div>\n              <span class=\"text-[10px] text-stone-400 font-bold hover:underline cursor-pointer\">معرفة المزيد</span>\n            </div>\n          </div>\n\n          <!-- Slogan & Notes Summary -->\n          <div class=\"space-y-1.5 pt-1\">\n            <p id=\"pdp-slogan\" class=\"text-xs sm:text-sm text-stone-600 leading-relaxed font-normal\"></p>\n            <div class=\"flex items-center gap-2 text-xs text-stone-500 pt-1\">\n              <span class=\"font-bold text-black\">النوتات الأساسية:</span>\n              <span id=\"pdp-notes-summary\" class=\"font-medium text-stone-700\"></span>\n            </div>\n          </div>\n\n          <!-- Size / Volume Selector -->\n          <div class=\"space-y-2 pt-2\">\n            <label class=\"text-xs font-bold text-black block\">الحجم / السعة:</label>\n            <div class=\"flex flex-wrap gap-2.5\">\n              <button class=\"px-5 py-2.5 rounded-full border-2 border-black text-black text-xs font-bold bg-white transition shadow-sm\">\n                100 مل (الحجم الأساسي)\n              </button>\n              <a id=\"pdp-30ml-link\" href=\"#\" class=\"px-5 py-2.5 rounded-full border border-stone-200 text-stone-600 hover:border-black hover:text-black text-xs font-bold transition\">\n                30 مل (حجم السفر)\n              </a>\n              <a href=\"/categories/1752110/packages\" class=\"px-5 py-2.5 rounded-full border border-stone-200 text-stone-600 hover:border-black hover:text-black text-xs font-bold transition\">\n                الباقات الحصرية\n              </a>\n            </div>\n          </div>\n\n          <!-- Quantity & Purchase Buttons -->\n          <div class=\"space-y-3 pt-3\">\n            <div class=\"flex items-center gap-3\">\n              <!-- Quantity Stepper -->\n              <div class=\"flex items-center border border-stone-200 rounded-full h-12 px-3 gap-3 text-sm font-bold bg-stone-50\">\n                <button onclick=\"changePDPQuantity(-1)\" class=\"text-stone-500 hover:text-black w-6 text-center text-lg\">-</button>\n                <span id=\"pdp-qty-val\" class=\"min-w-[20px] text-center text-black font-extrabold\">1</span>\n                <button onclick=\"changePDPQuantity(1)\" class=\"text-stone-500 hover:text-black w-6 text-center text-lg\">+</button>\n              </div>\n\n              <!-- Primary Add to Cart Button -->\n              <button id=\"pdp-add-cart-btn\" onclick=\"addToCartCurrentProduct()\" class=\"flex-grow h-12 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 shadow-md active:scale-98\">\n                <i class=\"sicon-shopping-bag text-base\"></i>\n                <span>إضافة إلى السلة</span>\n              </button>\n            </div>\n\n            <!-- Instant Checkout CTA -->\n            <button onclick=\"buyNowCurrentProduct()\" class=\"w-full h-12 rounded-full border border-black hover:bg-stone-50 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 active:scale-98\">\n              <i class=\"sicon-apple-pay text-xl\"></i>\n              <span>شراء فوري عبر Apple Pay / مدى</span>\n            </button>\n\n            <!-- Certified Payment Badges Row -->\n            <div class=\"flex items-center justify-center gap-2 pt-1 pb-1\">\n              <span class=\"text-[10px] text-stone-400 font-bold ml-1\">الدفع المعتمد:</span>\n              <div class=\"flex items-center gap-1.5\">\n                <div class=\"h-6 px-2 bg-stone-50 border border-stone-200/80 rounded flex items-center justify-center\" title=\"مدى Mada\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mada.png\" alt=\"Mada\" class=\"h-3 w-auto object-contain\">\n                </div>\n                <div class=\"h-6 px-2 bg-stone-50 border border-stone-200/80 rounded flex items-center justify-center\" title=\"Apple Pay\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/apple_pay.svg\" alt=\"Apple Pay\" class=\"h-3 w-auto object-contain\">\n                </div>\n                <div class=\"h-6 px-2 bg-stone-50 border border-stone-200/80 rounded flex items-center justify-center\" title=\"Visa\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/visa.png\" alt=\"Visa\" class=\"h-2 w-auto object-contain\">\n                </div>\n                <div class=\"h-6 px-2 bg-stone-50 border border-stone-200/80 rounded flex items-center justify-center\" title=\"Mastercard\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mastercard.png\" alt=\"Mastercard\" class=\"h-3.5 w-auto object-contain\">\n                </div>\n                <div class=\"h-6 px-1.5 bg-stone-50 border border-stone-200/80 rounded flex items-center justify-center\" title=\"Tabby\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tabby.svg\" alt=\"Tabby\" class=\"h-2.5 w-auto object-contain\">\n                </div>\n                <div class=\"h-6 px-1.5 bg-stone-50 border border-stone-200/80 rounded flex items-center justify-center\" title=\"Tamara\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tamara.svg\" alt=\"Tamara\" class=\"h-2.5 w-auto object-contain\">\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <!-- Trust Badges Row -->\n          <div class=\"grid grid-cols-3 gap-2 pt-4 border-t border-stone-100 text-center\">\n            <div class=\"p-3 rounded-xl bg-stone-50 text-center\">\n              <i class=\"sicon-shield-check text-black text-lg block mb-1\"></i>\n              <span class=\"text-[11px] font-bold text-black block\">ضمان ذهبي</span>\n              <span class=\"text-[9px] text-stone-400 block mt-0.5\">عينة مجانية للتجربة</span>\n            </div>\n            <div class=\"p-3 rounded-xl bg-stone-50 text-center\">\n              <i class=\"sicon-shipping-fast text-black text-lg block mb-1\"></i>\n              <span class=\"text-[11px] font-bold text-black block\">شحن سريع</span>\n              <span class=\"text-[9px] text-stone-400 block mt-0.5\">2 - 4 أيام عمل</span>\n            </div>\n            <div class=\"p-3 rounded-xl bg-stone-50 text-center\">\n              <i class=\"sicon-award-ribbon text-black text-lg block mb-1\"></i>\n              <span class=\"text-[11px] font-bold text-black block\">أصلي 100%</span>\n              <span class=\"text-[9px] text-stone-400 block mt-0.5\">ثبات يفوق 24 ساعة</span>\n            </div>\n          </div>\n\n        </div>\n      </div>\n\n      <!-- ================= 3. OLFACTORY PYRAMID (الهرم العطري الملكي) ================= -->\n      <section class=\"mt-20 sm:mt-28 pt-14 border-t border-stone-100\">\n        <div class=\"text-center max-w-2xl mx-auto mb-12\">\n          <span class=\"text-[10px] text-stone-400 font-bold tracking-widest uppercase block mb-1\">ARCHITECTURE & NOTES</span>\n          <h3 class=\"text-2xl sm:text-3xl font-extrabold text-black\">الهرم العطري والتوليفة</h3>\n          <p class=\"text-xs text-stone-500 mt-2 font-normal\">تمت صياغة هذا العطر بمزيج متناغم من أندر الزيوت الطبيعية النقية</p>\n        </div>\n\n        <div class=\"grid grid-cols-1 md:grid-cols-3 gap-6\">\n          <!-- Top Notes -->\n          <div class=\"p-6 rounded-2xl bg-stone-50/70 border border-stone-100 text-center space-y-3 hover:shadow-md transition\">\n            <div class=\"w-12 h-12 rounded-full bg-white shadow-sm mx-auto flex items-center justify-center text-black\">\n              <svg class=\"w-5 h-5 text-black\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                <path d=\"M12 2l2.4 7.2L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z\"/>\n              </svg>\n            </div>\n            <h4 class=\"text-sm font-bold text-black\">قمة العطر (الإفتتاحية)</h4>\n            <p class=\"text-[11px] text-stone-400 font-normal\">أول انطباع يأسرك خلال اللحظات الأولى من الرش</p>\n            <p id=\"pdp-pyramid-top\" class=\"text-xs font-bold text-stone-800 leading-relaxed pt-2 border-t border-stone-200/60\"></p>\n          </div>\n\n          <!-- Heart Notes -->\n          <div class=\"p-6 rounded-2xl bg-stone-50/70 border border-stone-100 text-center space-y-3 hover:shadow-md transition\">\n            <div class=\"w-12 h-12 rounded-full bg-white shadow-sm mx-auto flex items-center justify-center text-black\">\n              <svg class=\"w-5 h-5 text-black\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                <path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/>\n              </svg>\n            </div>\n            <h4 class=\"text-sm font-bold text-black\">قلب العطر (الجوهر)</h4>\n            <p class=\"text-[11px] text-stone-400 font-normal\">روح العطر وفوحانه المتألق الذي يدوم لساعات</p>\n            <p id=\"pdp-pyramid-heart\" class=\"text-xs font-bold text-stone-800 leading-relaxed pt-2 border-t border-stone-200/60\"></p>\n          </div>\n\n          <!-- Base Notes -->\n          <div class=\"p-6 rounded-2xl bg-stone-50/70 border border-stone-100 text-center space-y-3 hover:shadow-md transition\">\n            <div class=\"w-12 h-12 rounded-full bg-white shadow-sm mx-auto flex items-center justify-center text-black\">\n              <svg class=\"w-5 h-5 text-black\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                <path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/>\n                <path d=\"m9 12 2 2 4-4\"/>\n              </svg>\n            </div>\n            <h4 class=\"text-sm font-bold text-black\">قاعدة العطر (الثبات)</h4>\n            <p class=\"text-[11px] text-stone-400 font-normal\">العمق الخالد الذي يستقر على بشرتك وملابسك لأيام</p>\n            <p id=\"pdp-pyramid-base\" class=\"text-xs font-bold text-stone-800 leading-relaxed pt-2 border-t border-stone-200/60\"></p>\n          </div>\n        </div>\n      </section>\n\n      <!-- ================= 4. ACCORDION / DETAILS TABS ================= -->\n      <section class=\"mt-16 max-w-4xl mx-auto border-t border-stone-100 pt-10\">\n        <div class=\"space-y-4\">\n          <!-- Accordion 1: Description -->\n          <details class=\"group bg-stone-50/60 rounded-xl p-4 sm:p-5 border border-stone-100\" open>\n            <summary class=\"flex items-center justify-between font-bold text-sm text-black cursor-pointer select-none\">\n              <span class=\"flex items-center gap-2\">\n                <i class=\"sicon-feather\"></i>\n                <span>عن العطر وقصته</span>\n              </span>\n              <i class=\"sicon-keyboard_arrow_down text-sm transition-transform duration-300 group-open:rotate-180\"></i>\n            </summary>\n            <div class=\"pt-4 text-xs text-stone-600 leading-relaxed font-normal\" id=\"pdp-full-description\"></div>\n          </details>\n\n          <!-- Accordion 2: How to Use -->\n          <details class=\"group bg-stone-50/60 rounded-xl p-4 sm:p-5 border border-stone-100\">\n            <summary class=\"flex items-center justify-between font-bold text-sm text-black cursor-pointer select-none\">\n              <span class=\"flex items-center gap-2\">\n                <i class=\"sicon-magic-wand\"></i>\n                <span>طريقة الاستخدام ومناطق الفوحان</span>\n              </span>\n              <i class=\"sicon-keyboard_arrow_down text-sm transition-transform duration-300 group-open:rotate-180\"></i>\n            </summary>\n            <div class=\"pt-4 text-xs text-stone-600 leading-relaxed space-y-2 font-normal\">\n              <p>للحصول على أفضل أداء وفوحان يدوم لأكثر من 24 ساعة، ينصح برش العطر على نقاط النبض في الجسم:</p>\n              <ul class=\"list-disc list-inside space-y-1 pr-2 text-stone-500\">\n                <li>جانبي الرقبة وخلف الأذنين.</li>\n                <li>معصم اليدين وتجويف المرفقين.</li>\n                <li>رش رذاذ خفيف على الملابس النظيفة والقطنية من مسافة 15 إلى 20 سم.</li>\n              </ul>\n            </div>\n          </details>\n\n          <!-- Accordion 3: Golden Guarantee & Return Policy -->\n          <details class=\"group bg-stone-50/60 rounded-xl p-4 sm:p-5 border border-stone-100\">\n            <summary class=\"flex items-center justify-between font-bold text-sm text-black cursor-pointer select-none\">\n              <span class=\"flex items-center gap-2\">\n                <i class=\"sicon-shield-check\"></i>\n                <span>الضمان الذهبي الملكي وسياسة الاسترجاع</span>\n              </span>\n              <i class=\"sicon-keyboard_arrow_down text-sm transition-transform duration-300 group-open:rotate-180\"></i>\n            </summary>\n            <div class=\"pt-4 text-xs text-stone-600 leading-relaxed space-y-2 font-normal\">\n              <p>من أجل رضا عملائنا الكرام في NOTE perfumes، فإننا نقدم الضمان الذهبي لجميع منتجاتنا:</p>\n              <p>جميع عطورنا قابلة للاسترجاع خلال 3 أيام من تاريخ التسليم. يرجى تجربة العينة المجانية المرفقة أولاً دون فتح تغليف العطر الأساسي. في حال عدم ملائمة الرائحة لذوقكم، يمكنكم طلب الاسترجاع فوراً عبر خدمة العملاء أو الواتساب.</p>\n              <p class=\"text-[11px] text-stone-400\">للاطلاع على الشروط الكاملة يرجى زيارة <a href=\"/refund-policy.html\" class=\"text-black font-bold underline\">صفحة سياسة الاستبدال والاسترجاع</a>.</p>\n            </div>\n          </details>\n        </div>\n      </section>\n\n      <!-- ================= 5. RELATED PRODUCTS (\"قد يعجبك أيضاً\") ================= -->\n      <section class=\"mt-20 sm:mt-28 pt-14 border-t border-stone-100\">\n        <div class=\"text-center mb-10\">\n          <span class=\"text-[10px] text-stone-400 font-bold tracking-widest uppercase block mb-1\">YOU MAY ALSO LIKE</span>\n          <h3 class=\"text-2xl sm:text-3xl font-extrabold text-black\">عطور قد تعجبك أيضاً</h3>\n          <p class=\"text-xs text-stone-500 mt-2 font-normal\">توليفات ملكية متناغمة من نفس العائلة العطرية</p>\n        </div>\n\n        <div id=\"pdp-related-grid\" class=\"grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6\">\n          <!-- Injected via JavaScript -->\n        </div>\n      </section>\n\n    </div>\n  </main>",
    category: "<main id=\"page-main-wrapper\"  class=\"pt-28 sm:pt-36 pb-24 bg-white\">\n    <!-- Category Header Banner (contained in max-w-7xl) -->\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      <div class=\"text-center max-w-3xl mx-auto mb-10 sm:mb-14\">\n        <span id=\"cat-badge-text\" class=\"text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-2\">NOTE PERFUMES COLLECTION</span>\n        <h1 id=\"cat-title\" class=\"text-2xl sm:text-4xl font-extrabold text-black tracking-tight mb-3\">جميع المنتجات</h1>\n        <p id=\"cat-desc\" class=\"text-xs sm:text-sm text-stone-500 leading-relaxed font-normal\">\n          تصفح المجموعة الكاملة من أروع إبداعات دار نوت للعطور، توليفات نيش استثنائية وباقات حصرية صُممت لتناسب ذوقك الرفيع.\n        </p>\n      </div>\n    </div>\n\n    <!-- ================= STICKY CONTROLS & CATEGORY PILLS BAR (FULL-WIDTH EDGE-TO-EDGE) ================= -->\n    <div id=\"sticky-catalog-controls\" class=\"sticky top-20 sm:top-24 z-30 w-full bg-white/95 backdrop-blur-md pt-3.5 pb-3.5 border-b border-stone-200/80 mb-8 transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.06)]\">\n      <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n        \n        <!-- Controls Row: Search Input + Sorting Dropdown + Product Count (Centered Axis) -->\n        <div class=\"flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-2.5 sm:mb-3 max-w-3xl mx-auto\">\n          \n          <!-- Live Search Field -->\n          <div class=\"relative w-full sm:w-80 md:w-96 max-w-md\">\n            <i class=\"sicon-search absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm\"></i>\n            <input id=\"cat-search-input\" oninput=\"handleSearch(this.value)\" type=\"text\" placeholder=\"ابحث بالاسم، المكونات، الرائحة...\" class=\"w-full pr-10 pl-8 py-2 rounded-full border border-stone-200/90 text-xs focus:outline-none focus:border-black transition bg-stone-50/70 hover:bg-white focus:bg-white shadow-xs\">\n            <button id=\"cat-search-clear\" onclick=\"clearCatSearch()\" class=\"hidden absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-black text-xs transition\" title=\"مسح\">\n              <i class=\"sicon-cancel\"></i>\n            </button>\n          </div>\n\n          <!-- Right Side: Count and Sort Dropdown -->\n          <div class=\"flex items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-stone-600 shrink-0\">\n            <span id=\"cat-products-count\" class=\"text-stone-500 whitespace-nowrap hidden sm:inline-block\">عرض 0 منتج</span>\n\n            <div class=\"flex items-center gap-1.5\">\n              <span class=\"text-stone-400 font-normal hidden md:inline\">الترتيب:</span>\n              <select id=\"cat-sort-select\" onchange=\"handleSort(this.value)\" class=\"bg-stone-50 hover:bg-stone-100 border border-stone-200/90 rounded-full px-3 sm:px-4 py-1.5 text-xs font-bold text-black focus:outline-none focus:border-black cursor-pointer shadow-xs\">\n                <option value=\"popular\">الأكثر شعبية</option>\n                <option value=\"price-asc\">السعر: من الأقل للأعلى</option>\n                <option value=\"price-desc\">السعر: من الأعلى للأقل</option>\n                <option value=\"rating\">الأعلى تقييماً</option>\n                <option value=\"newest\">أحدث المنتجات</option>\n              </select>\n            </div>\n          </div>\n\n        </div>\n\n        <!-- Category Filter Pills Bar (Centered Horizontal Axis, Wrapped on desktop, scrollable on mobile) -->\n        <div id=\"category-pills-bar\" class=\"cat-pills-container flex items-center justify-start sm:justify-center flex-nowrap sm:flex-wrap gap-2 overflow-x-auto sm:overflow-visible scrollbar-none py-1 text-xs font-bold\">\n          <button onclick=\"selectCategory('all')\" id=\"pill-all\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition cat-pill-active\">\n            الكل (جميع المنتجات)\n          </button>\n          <button onclick=\"selectCategory('perfumes')\" id=\"pill-perfumes\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            العطور (100 مل)\n          </button>\n          <button onclick=\"selectCategory('niche')\" id=\"pill-niche\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            عطور النيش\n          </button>\n          <button onclick=\"selectCategory('bestsellers')\" id=\"pill-bestsellers\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            الأكثر مبيعاً\n          </button>\n          <button onclick=\"selectCategory('new')\" id=\"pill-new\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            أحدث المنتجات\n          </button>\n          <button onclick=\"selectCategory('travel')\" id=\"pill-travel\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            عطور بيبي (30 مل)\n          </button>\n          <!-- Line break for web/desktop to create two perfectly balanced rows (6 pills + 5 pills) -->\n          <div class=\"cat-pills-break\"></div>\n          <button onclick=\"selectCategory('all-over')\" id=\"pill-all-over\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            معطر للجسم بالكامل\n          </button>\n          <button onclick=\"selectCategory('linen')\" id=\"pill-linen\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            معطرات جو ومفارش\n          </button>\n          <button onclick=\"selectCategory('body-care')\" id=\"pill-body-care\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            منتجات العناية\n          </button>\n          <button onclick=\"selectCategory('tollah')\" id=\"pill-tollah\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            تولات ودهن عود\n          </button>\n          <button onclick=\"selectCategory('packages')\" id=\"pill-packages\" class=\"cat-pill shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-black transition\">\n            مجموعات نوت\n          </button>\n        </div>\n\n      </div>\n    </div>\n\n    <!-- Product Grid Container (contained in max-w-7xl) -->\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      <!-- ================= PRODUCT GRID (FRAMELESS PURE WHITE) ================= -->\n      <div id=\"catalog-products-grid\" class=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8\">\n        <!-- Injected via JavaScript from noteProductsCatalog -->\n      </div>\n\n      <!-- No Products Found State -->\n      <div id=\"cat-no-products\" class=\"hidden text-center py-20\">\n        <div class=\"w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400 mb-4\">\n          <i class=\"sicon-search text-2xl\"></i>\n        </div>\n        <h3 class=\"text-base font-bold text-black mb-1\">لم نجد أي منتجات تطابق بحثك</h3>\n        <p class=\"text-xs text-stone-400 max-w-sm mx-auto mb-6\">جرب البحث بكلمات أخرى أو تصفح باقي تصنيفات الدار</p>\n        <button onclick=\"resetFilters()\" class=\"px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-stone-800 transition\">\n          إعادة تعيين التصفيات\n        </button>\n      </div>\n\n    </div>\n  </main>",
    cart: "<main id=\"page-main-wrapper\"  class=\"pt-28 sm:pt-36 pb-20 flex-grow\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <div class=\"mb-8 text-right\">\n        <h1 class=\"text-2xl sm:text-3xl font-extrabold text-black tracking-tight\">سلة المشتريات</h1>\n        <p class=\"text-xs text-stone-500 mt-1\">راجع المنتجات والكميات قبل استكمال عملية الدفع</p>\n      </div>\n\n      <div class=\"grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start\">\n        \n        <!-- RIGHT: Items Table / List (8 cols) -->\n        <div class=\"lg:col-span-8\">\n          <div id=\"cart-page-items\" class=\"divide-y divide-stone-100 border-t border-b border-stone-100\">\n            <!-- Items rendered via JS -->\n          </div>\n\n          <!-- Empty State -->\n          <div id=\"cart-page-empty\" class=\"hidden text-center py-20\">\n            <div class=\"w-20 h-20 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400 mb-4\">\n              <i class=\"sicon-shopping-bag text-3xl\"></i>\n            </div>\n            <h3 class=\"text-lg font-bold text-black mb-2\">سلة المشتريات فارغة حالياً</h3>\n            <p class=\"text-xs text-stone-400 max-w-sm mx-auto mb-6\">لم تقم بإضافة أي عطور إلى سلتك بعد. استكشف مجموعاتنا العطرية الفاخرة.</p>\n            <a href=\"/categories\" class=\"inline-flex items-center gap-2 px-8 py-3 rounded-full bg-black text-white text-xs font-bold hover:bg-stone-800 transition\">\n              <span>تصفح العطور الآن</span>\n              <i class=\"sicon-keyboard_arrow_left text-xs\"></i>\n            </a>\n          </div>\n\n          <!-- Back to Shopping Link -->\n          <div class=\"mt-6 flex items-center justify-between\">\n            <a href=\"/categories\" class=\"text-xs font-bold text-stone-600 hover:text-black flex items-center gap-1.5 transition\">\n              <i class=\"sicon-keyboard_arrow_right\"></i>\n              <span>متابعة التسوق وإضافة عطور أخرى</span>\n            </a>\n          </div>\n\n          <!-- Recommendations Section in Cart Page (Compact) -->\n          <div id=\"cart-page-recommendations-section\" class=\"mt-8 pt-6 border-t border-stone-200 text-right\">\n            <div class=\"flex items-center justify-between mb-3\">\n              <div>\n                <span class=\"text-[9px] text-stone-400 font-bold uppercase tracking-wider block\">RECOMMENDED FOR YOU</span>\n                <h3 class=\"text-xs sm:text-sm font-extrabold text-black\">ترشيحات تكمل مجموعتك العطرية</h3>\n              </div>\n              <span class=\"text-[10px] text-stone-400 hidden sm:block\">إضافة سريعة بنقرة واحدة</span>\n            </div>\n            <div id=\"cart-page-recs-grid\" class=\"grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3\">\n              <!-- Rendered dynamically via JS -->\n            </div>\n          </div>\n        </div>\n\n        <!-- LEFT: Summary Card (4 cols) -->\n        <div id=\"cart-page-summary-wrapper\" class=\"lg:col-span-4\">\n          <div class=\"p-6 rounded-2xl bg-stone-50 border border-stone-200/80 text-right space-y-4\">\n            <h3 class=\"text-sm font-extrabold text-black pb-3 border-b border-stone-200/80\">ملخص الطلب</h3>\n\n            <p class=\"text-xs text-stone-600\">يمكنك إدخال كوبون الخصم في صفحة الدفع الآمنة. يتم التحقق منه واحتساب الخصم بواسطة زد.</p><!-- Price Breakdown -->\n            <div class=\"space-y-2.5 text-xs text-stone-600 pt-2 border-t border-stone-200/80\">\n              <div class=\"flex items-center justify-between\">\n                <span>المجموع الفرعي:</span>\n                <span id=\"page-subtotal\" class=\"font-bold text-black\">0 ر.س</span>\n              </div>\n              <div id=\"discount-row\" class=\"hidden flex items-center justify-between text-emerald-600 font-bold\">\n                <span>خصم الكوبون:</span>\n                <span id=\"page-discount\">- 0 ر.س</span>\n              </div>\n              <div class=\"flex items-center justify-between\">\n                <span>الشحن والتوصيل:</span>\n                <span id=\"page-shipping\" class=\"font-bold text-black\">مجاني</span>\n              </div>\n              <div class=\"flex items-center justify-between text-stone-400 text-[11px]\">\n                <span>ضريبة القيمة المضافة (15%):</span>\n                <span>مشمولة في الأسعار</span>\n              </div>\n            </div>\n\n            <!-- Total -->\n            <div class=\"pt-3 border-t border-stone-200/80 flex items-center justify-between\">\n              <div>\n                <span class=\"text-xs text-stone-500 font-medium block\">إجمالي المنتجات قبل الشحن والخصومات:</span>\n                <span id=\"page-grand-total\" class=\"text-2xl font-extrabold text-black\">0 ر.س</span>\n              </div>\n            </div>\n\n            <!-- Exclusive Checkout Order Upsell (Compact Slim Bar) -->\n            <div id=\"checkout-upsell-card\" class=\"p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-right\">\n              <div class=\"flex items-center justify-between gap-2\">\n                <div class=\"flex items-center gap-2 min-w-0\">\n                  <div class=\"w-9 h-9 rounded-lg bg-white p-0.5 border border-amber-100 shrink-0 flex items-center justify-center\">\n                    <img id=\"upsell-img\" src=\"https://youssefrasheed.github.io/note-zid-styles/products/NOTE_For_Her_30ml_v02.webp\" alt=\"NOTE 30ml\" class=\"w-full h-full object-contain\">\n                  </div>\n                  <div class=\"min-w-0\">\n                    <div class=\"flex items-center gap-1.5\">\n                      <span class=\"text-[9px] font-extrabold text-amber-800 bg-amber-100/90 px-1.5 py-0.2 rounded\">عرض خاص</span>\n                      <h5 id=\"upsell-title\" class=\"text-[11px] font-bold text-black truncate\">عطر نوت فور هير (30 مل)</h5>\n                    </div>\n                    <div class=\"flex items-center gap-1.5 mt-0.5\">\n                      <span id=\"upsell-price\" class=\"text-[11px] font-extrabold text-rose-600\">89 ر.س</span>\n                      <span id=\"upsell-old-price\" class=\"text-[9px] text-stone-400 line-through\">199 ر.س</span>\n                      <span class=\"text-[9px] text-emerald-600 font-bold hidden sm:inline\">(وفر 55%)</span>\n                    </div>\n                  </div>\n                </div>\n                <button id=\"upsell-add-btn\" class=\"px-2.5 py-1 rounded-lg bg-black hover:bg-stone-800 text-white text-[10px] font-bold transition shrink-0 shadow-xs active:scale-95 flex items-center gap-1\">\n                  <i class=\"sicon-plus text-[9px]\"></i>\n                  <span>أضف للطلب</span>\n                </button>\n              </div>\n            </div>\n\n            <!-- Checkout CTA -->\n            <button onclick=\"proceedToCheckout()\" class=\"w-full py-3.5 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 shadow-lg active:scale-98\">\n              <span>إتمام الدفع الآمن</span>\n              <i class=\"sicon-lock text-sm\"></i>\n            </button>\n\n            <!-- Golden Guarantee Box -->\n            <div class=\"p-3 rounded-xl bg-white border border-stone-200/60 text-[11px] text-stone-600 flex items-center gap-2.5\">\n              <i class=\"sicon-shield-check text-black text-lg shrink-0\"></i>\n              <span>مشمول بـ <strong>الضمان الذهبي</strong>: عينة تجربة مجانية مرفقة مع كل عطر وحق الاسترجاع خلال 3 أيام.</span>\n            </div>\n\n            <!-- Payment Methods Icons -->\n            <div class=\"pt-3 border-t border-stone-200/60 mt-3 text-center\">\n              <span class=\"text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-2.5\">وسائل الدفع الآمنة المعتمدة</span>\n              <div class=\"flex flex-wrap items-center justify-center gap-2\">\n                <div class=\"h-7 px-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-center shadow-xs\" title=\"مدى Mada\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mada.png\" alt=\"مدى Mada\" class=\"h-3.5 w-auto object-contain\">\n                </div>\n                <div class=\"h-7 px-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-center shadow-xs\" title=\"Apple Pay\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/apple_pay.svg\" alt=\"Apple Pay\" class=\"h-3.5 w-auto object-contain\">\n                </div>\n                <div class=\"h-7 px-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-center shadow-xs\" title=\"Visa\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/visa.png\" alt=\"Visa\" class=\"h-2.5 w-auto object-contain\">\n                </div>\n                <div class=\"h-7 px-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-center shadow-xs\" title=\"Mastercard\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/mastercard.png\" alt=\"Mastercard\" class=\"h-4 w-auto object-contain\">\n                </div>\n                <div class=\"h-7 px-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-center shadow-xs\" title=\"تابي Tabby\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tabby.svg\" alt=\"تابي Tabby\" class=\"h-3.5 w-auto object-contain\">\n                </div>\n                <div class=\"h-7 px-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-center shadow-xs\" title=\"تمارا Tamara\">\n                  <img src=\"https://youssefrasheed.github.io/note-zid-styles/assets/icons/payment/tamara.svg\" alt=\"تمارا Tamara\" class=\"h-3.5 w-auto object-contain\">\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n  </main>\n<!-- Checkout Success Modal -->\n  <div id=\"checkout-modal\" class=\"fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden items-center justify-center p-4\">\n    <div class=\"bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl\">\n      <div class=\"w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center\">\n        <i class=\"sicon-check-circle text-3xl\"></i>\n      </div>\n      <h3 class=\"text-xl font-bold text-black\">شكراً لاختيارك دار نوت للعطور!</h3>\n      <p class=\"text-xs text-stone-600 leading-relaxed\">\n        تم استلام طلبك بنجاح وسيتواصل معك فريق الشحن والتوصيل خلال ساعات. تم إرسال تفاصيل الفاتورة ورقم التتبع إلى بريدك الإلكتروني وهاتفك.\n      </p>\n      <div class=\"p-3 bg-stone-50 rounded-xl text-xs font-mono font-bold text-black\">\n        رقم الطلب: #NOTE-2026-9814\n      </div>\n\n      <!-- VIP Gift for Next Order -->\n      <div class=\"p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 text-right space-y-2\">\n        <div class=\"flex items-center justify-between\">\n          <span class=\"text-xs font-bold text-black flex items-center gap-1.5\">\n            <i class=\"sicon-gift text-emerald-600\"></i>\n            <span>هدية نوت لطلبك القادم (خصم 10%)</span>\n          </span>\n          <button onclick=\"navigator.clipboard.writeText('NOTE-VIP10'); alert('تم نسخ كود الخصم NOTE-VIP10 بنجاح!');\" class=\"text-[10px] font-bold text-stone-600 hover:text-black underline cursor-pointer\">\n            نسخ الكود\n          </button>\n        </div>\n        <div class=\"p-2 bg-white rounded-lg border border-stone-200 flex items-center justify-between font-mono text-xs font-bold text-black\">\n          <span>NOTE-VIP10</span>\n          <span class=\"text-[10px] font-sans text-emerald-600\">فعّال لطلبك القادم</span>\n        </div>\n      </div>",
    faqs: "<main id=\"page-main-wrapper\"  class=\"pt-28 sm:pt-36 pb-20 flex-grow text-right\">\n    <div class=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Breadcrumb -->\n      <nav class=\"flex items-center gap-2 text-xs text-stone-400 mb-8 font-medium\">\n        <a href=\"/\" class=\"hover:text-black\">الرئيسية</a>\n        <span>/</span>\n        <span class=\"text-black font-bold\">الأسئلة الشائعة</span>\n      </nav>\n\n      <!-- Page Title -->\n      <div class=\"text-center max-w-2xl mx-auto mb-12\">\n        <span class=\"text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-2\">HELP CENTER & FAQS</span>\n        <h1 class=\"text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black tracking-tight\">الأسئلة الأكثر تكراراً</h1>\n        <p class=\"text-xs sm:text-sm text-stone-500 mt-2\">إجابات شاملة ومفصلة عن استفساراتكم حول منتجات وعطور دار نوت، الشحن، والضمان الذهبي</p>\n      </div>\n\n      <!-- FAQ Accordions -->\n      <div class=\"space-y-4\">\n        \n        <!-- FAQ 1 -->\n        <details class=\"group bg-stone-50/70 rounded-2xl p-5 sm:p-6 border border-stone-200/80 transition\" open>\n          <summary class=\"flex items-center justify-between font-bold text-sm sm:text-base text-black cursor-pointer select-none\">\n            <span class=\"flex items-center gap-3\">\n              <i class=\"sicon-shield-check text-black text-lg\"></i>\n              <span>هل جميع عطور NOTE أصلية ومطابقة للمواصفات السعودية؟</span>\n            </span>\n            <i class=\"sicon-keyboard_arrow_down text-sm transition-transform duration-300 group-open:rotate-180\"></i>\n          </summary>\n          <div class=\"pt-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal\">\n            نعم، 100%. دار نوت هي علامة تجارية سعودية رسمية مسجلة بسجل تجاري رقم (1010713359) ورقم ضريبي (310103613800003). جميع عطورنا ومستحضراتنا مصنعة وفق أعلى معايير الجودة العالمية، ومرخصة ومطابقة لاشتراطات الهيئة العامة للغذاء والدواء بالمملكة العربية السعودية، ونستخدم أندر الزيوت العطرية النقية والمستخلصة طبيعياً.\n          </div>\n        </details>\n\n        <!-- FAQ 2 -->\n        <details class=\"group bg-stone-50/70 rounded-2xl p-5 sm:p-6 border border-stone-200/80 transition\">\n          <summary class=\"flex items-center justify-between font-bold text-sm sm:text-base text-black cursor-pointer select-none\">\n            <span class=\"flex items-center gap-3\">\n              <i class=\"sicon-award-ribbon text-black text-lg\"></i>\n              <span>ما هو الضمان الذهبي وكيف أستخدم عينة التجربة المجانية؟</span>\n            </span>\n            <i class=\"sicon-keyboard_arrow_down text-sm transition-transform duration-300 group-open:rotate-180\"></i>\n          </summary>\n          <div class=\"pt-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal\">\n            الضمان الذهبي هو وعد نوت لعملائها بالرضا التام. مع كل زجاجة عطر تطلبها، نرفق عينة تجربة مجانية بحجم صغير. يمكنك فك العينة وتجربتها على بشرتك وملابسك دون فتح كرتون أو سلوفان العطر الأساسي. إذا لم تعجبك الرائحة أو الثبات، يحق لك طلب استرجاع المبلغ خلال 3 أيام من تاريخ استلام الشحنة بكل سهولة.\n          </div>\n        </details>\n\n        <!-- FAQ 3 -->\n        <details class=\"group bg-stone-50/70 rounded-2xl p-5 sm:p-6 border border-stone-200/80 transition\">\n          <summary class=\"flex items-center justify-between font-bold text-sm sm:text-base text-black cursor-pointer select-none\">\n            <span class=\"flex items-center gap-3\">\n              <i class=\"sicon-shipping-fast text-black text-lg\"></i>\n              <span>كم يستغرق الشحن والتوصيل؟ وما هي تكلفته؟</span>\n            </span>\n            <i class=\"sicon-keyboard_arrow_down text-sm transition-transform duration-300 group-open:rotate-180\"></i>\n          </summary>\n          <div class=\"pt-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal\">\n            يتم تجهيز الطلبات وشحنها فورياً عبر شريكنا اللوجستي المعتمد أرامكس (Aramex). يستغرق التوصيل داخل مدينة الرياض وجدة ومدن المملكة الرئيسية من 2 إلى 4 أيام عمل. الشحن <strong>مجاني بالكامل</strong> لكافة الطلبات التي تزيد قيمتها عن 300 ر.س، وتبلغ رسوم الشحن 25 ر.س للطلبات الأقل من ذلك.\n          </div>\n        </details>\n\n        <!-- FAQ 4 -->\n        <details class=\"group bg-stone-50/70 rounded-2xl p-5 sm:p-6 border border-stone-200/80 transition\">\n          <summary class=\"flex items-center justify-between font-bold text-sm sm:text-base text-black cursor-pointer select-none\">\n            <span class=\"flex items-center gap-3\">\n              <i class=\"sicon-card text-black text-lg\"></i>\n              <span>هل يتوفر تقسيط المشتريات عبر تابي (Tabby) وتمارا (Tamara)؟</span>\n            </span>\n            <i class=\"sicon-keyboard_arrow_down text-sm transition-transform duration-300 group-open:rotate-180\"></i>\n          </summary>\n          <div class=\"pt-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal\">\n            نعم، نوفر خدمة التقسيط على 4 دفعات ميسرة بدون أي فوائد أو رسوم إضافية عبر تابي وتمارا. يمكنك اختيار وسيلة التقسيط المفضلة عند الوصول لصفحة الدفع وسداد القسط الأول فقط مع شحن طلبك فوراً.\n          </div>\n        </details>\n\n        <!-- FAQ 5 -->\n        <details class=\"group bg-stone-50/70 rounded-2xl p-5 sm:p-6 border border-stone-200/80 transition\">\n          <summary class=\"flex items-center justify-between font-bold text-sm sm:text-base text-black cursor-pointer select-none\">\n            <span class=\"flex items-center gap-3\">\n              <i class=\"sicon-drop text-black text-lg\"></i>\n              <span>ما هو تركيز عطور دار نوت وكم تدوم فترة الثبات؟</span>\n            </span>\n            <i class=\"sicon-keyboard_arrow_down text-sm transition-transform duration-300 group-open:rotate-180\"></i>\n          </summary>\n          <div class=\"pt-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal\">\n            تعتمد دار نوت أعلى درجات التركيز العطري في صناعة العطور العالمية وهو <strong>Extrait de Parfum</strong> بتركيز زيوت عطرية نقية تتراوح بين 30% إلى 40%، مما يمنح العطر ثباتاً يتجاوز 24 ساعة على الجلد وعدة أيام على الأقمشة والملابس مع فوحان متوازن وراقٍ.\n          </div>\n        </details>\n\n        <!-- FAQ 6 -->\n        <details class=\"group bg-stone-50/70 rounded-2xl p-5 sm:p-6 border border-stone-200/80 transition\">\n          <summary class=\"flex items-center justify-between font-bold text-sm sm:text-base text-black cursor-pointer select-none\">\n            <span class=\"flex items-center gap-3\">\n              <i class=\"sicon-chat-conversation-alt text-black text-lg\"></i>\n              <span>كيف أتواصل مع خدمة العملاء؟</span>\n            </span>\n            <i class=\"sicon-keyboard_arrow_down text-sm transition-transform duration-300 group-open:rotate-180\"></i>\n          </summary>\n          <div class=\"pt-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal\">\n            فريق خدمة عملاء NOTE يسعد بخدمتكم عبر واتساب على الرقم: <strong><a href=\"https://wa.me/966565955420\" target=\"_blank\" class=\"text-black font-bold underline\">+966 56 595 5420</a></strong> أو عبر البريد الإلكتروني المعتمد: <strong>marketing.noteperf@gmail.com</strong>.\n          </div>\n        </details>\n\n      </div>\n\n      <!-- Still Have Questions Box -->\n      <div class=\"p-8 rounded-2xl bg-stone-50 border border-stone-200 mt-12 text-center space-y-3\">\n        <h3 class=\"text-base font-bold text-black\">هل لديك سؤال آخر لم تجد إجابته هنا؟</h3>\n        <p class=\"text-xs text-stone-500\">فريقنا متواجد ومستعد لمساعدتك في أي استفسار حول روائح العطور أو طلبك الحالي</p>\n        <div class=\"flex flex-wrap items-center justify-center gap-3 pt-2\">\n          <a href=\"https://wa.me/966565955420\" target=\"_blank\" class=\"px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-stone-800 transition flex items-center gap-2\">\n            <i class=\"sicon-whatsapp\"></i>\n            <span>محادثة واتساب مباشرة</span>\n          </a>\n          <a href=\"/contact.html\" class=\"px-6 py-2.5 rounded-full border border-stone-200 text-black text-xs font-bold hover:border-black transition\">\n            صفحة الشكاوى والمقترحات\n          </a>\n        </div>\n      </div>\n\n    </div>\n  </main>",
    contact: "<main id=\"page-main-wrapper\"  class=\"pt-28 sm:pt-36 pb-20 flex-grow text-right\">\n    <div class=\"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Breadcrumb -->\n      <nav class=\"flex items-center gap-2 text-xs text-stone-400 mb-8 font-medium\">\n        <a href=\"/\" class=\"hover:text-black\">الرئيسية</a>\n        <span>/</span>\n        <span class=\"text-black font-bold\">تواصل معنا</span>\n      </nav>\n\n      <!-- Page Header -->\n      <div class=\"text-center max-w-2xl mx-auto mb-12\">\n        <span class=\"text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-2\">GET IN TOUCH</span>\n        <h1 class=\"text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black tracking-tight\">خدمة العملاء والشكاوى والمقترحات</h1>\n        <p class=\"text-xs sm:text-sm text-stone-500 mt-2\">يسعدنا دائماً الاستماع إليكم وتلقي آرائكم واستفساراتكم لتقديم أرقى تجربة تسوق تليق بكم</p>\n      </div>\n\n      <div class=\"grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start\">\n        \n        <!-- RIGHT: Contact Info Cards (5 cols) -->\n        <div class=\"lg:col-span-5 space-y-4\">\n          \n          <!-- WhatsApp Card -->\n          <a href=\"https://wa.me/966565955420\" target=\"_blank\" class=\"block p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-black transition group\">\n            <div class=\"flex items-center gap-3 mb-2\">\n              <div class=\"w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg shrink-0\">\n                <i class=\"sicon-whatsapp\"></i>\n              </div>\n              <div>\n                <h3 class=\"text-sm font-bold text-black group-hover:text-emerald-600 transition\">واتساب خدمة العملاء</h3>\n                <span class=\"text-[10px] text-stone-400\">رد فوري ومباشر</span>\n              </div>\n            </div>\n            <p class=\"text-xs font-mono font-bold text-stone-800\" dir=\"ltr\">+966 56 595 5420</p>\n          </a>\n\n          <!-- Email Card -->\n          <div class=\"p-5 rounded-2xl bg-stone-50 border border-stone-200/80\">\n            <div class=\"flex items-center gap-3 mb-2\">\n              <div class=\"w-10 h-10 rounded-full bg-stone-100 text-black flex items-center justify-center text-lg shrink-0\">\n                <i class=\"sicon-mail\"></i>\n              </div>\n              <div>\n                <h3 class=\"text-sm font-bold text-black\">البريد الإلكتروني</h3>\n                <span class=\"text-[10px] text-stone-400\">للاستفسارات والطلبات الخاصة</span>\n              </div>\n            </div>\n            <p class=\"text-xs font-mono font-bold text-stone-800\">marketing.noteperf@gmail.com</p>\n          </div>\n\n          <!-- Official Commercial Data Card -->\n          <div class=\"p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs text-stone-600\">\n            <h4 class=\"font-bold text-black text-xs border-b border-stone-200 pb-2\">بيانات المؤسسة والترخيص:</h4>\n            <div class=\"flex justify-between\">\n              <span>السجل التجاري:</span>\n              <span class=\"font-mono font-bold text-black\">1010713359</span>\n            </div>\n            <div class=\"flex justify-between\">\n              <span>الرقم الضريبي:</span>\n              <span class=\"font-mono font-bold text-black\">310103613800003</span>\n            </div>\n            <div class=\"flex justify-between\">\n              <span>المقر والإدارة:</span>\n              <span class=\"font-bold text-black\">الرياض / جدة، المملكة العربية السعودية</span>\n            </div>\n            <div class=\"flex justify-between\">\n              <span>ساعات العمل:</span>\n              <span class=\"font-bold text-black\">يومياً: 9:00 ص - 11:00 م</span>\n            </div>\n          </div>\n\n        </div>\n\n        <!-- LEFT: Message & Complaints Form (7 cols) -->\n        <div class=\"lg:col-span-7\">\n          <div class=\"p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200/80\">\n            <h3 class=\"text-base font-bold text-black mb-1\">أرسل لنا رسالة أو شكوى</h3>\n            <p class=\"text-xs text-stone-400 mb-6\">سيتم الرد عليك في غضون 24 ساعة كحد أقصى</p>\n\n            <form onsubmit=\"handleContactSubmit(event)\" class=\"space-y-4 text-xs font-bold text-stone-700\">\n              <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4\">\n                <div>\n                  <label class=\"block mb-1.5\">الاسم الكريم *</label>\n                  <input type=\"text\" required placeholder=\"محمد عبدالله\" class=\"w-full px-4 py-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-black font-normal bg-white\">\n                </div>\n                <div>\n                  <label class=\"block mb-1.5\">رقم الجوال *</label>\n                  <input type=\"tel\" required placeholder=\"05XXXXXXXX\" class=\"w-full px-4 py-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-black font-normal bg-white\" dir=\"ltr\">\n                </div>\n              </div>\n\n              <div>\n                <label class=\"block mb-1.5\">البريد الإلكتروني *</label>\n                <input type=\"email\" required placeholder=\"name@example.com\" class=\"w-full px-4 py-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-black font-normal bg-white\" dir=\"ltr\">\n              </div>\n\n              <div>\n                <label class=\"block mb-1.5\">نوع الرسالة *</label>\n                <select class=\"w-full px-4 py-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-black bg-white cursor-pointer font-normal\">\n                  <option>استفسار عن عطر أو توليفة</option>\n                  <option>استفسار عن حالة شحنة وطلب</option>\n                  <option>طلب استرجاع تحت الضمان الذهبي</option>\n                  <option>شكوى واعتراض</option>\n                  <option>اقتراح لتطوير الخدمات</option>\n                  <option>طلب شراكة وتوزيع</option>\n                </select>\n              </div>\n\n              <div>\n                <label class=\"block mb-1.5\">نص الرسالة أو الشكوى بالتفصيل *</label>\n                <textarea required rows=\"4\" placeholder=\"اكتب استفسارك أو ملاحظاتك هنا...\" class=\"w-full px-4 py-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-black font-normal bg-white resize-none\"></textarea>\n              </div>\n\n              <button type=\"submit\" class=\"w-full py-3.5 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-xs transition duration-300 shadow-md active:scale-98\">\n                إرسال الرسالة الآن\n              </button>\n            </form>\n\n            <div id=\"contact-success-msg\" class=\"hidden mt-4 p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs text-center font-bold\">\n              ✓ تم استلام رسالتك بنجاح! سيقوم فريق خدمة عملاء NOTE بالتواصل معك قريباً.\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n  </main>",
    privacy: "<main id=\"page-main-wrapper\"  class=\"pt-28 sm:pt-36 pb-20 flex-grow text-right\">\n    <div class=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Breadcrumb -->\n      <nav class=\"flex items-center gap-2 text-xs text-stone-400 mb-8 font-medium\">\n        <a href=\"/\" class=\"hover:text-black\">الرئيسية</a>\n        <span>/</span>\n        <span class=\"text-black font-bold\">سياسة الخصوصية</span>\n      </nav>\n\n      <!-- Page Title -->\n      <div class=\"mb-10 pb-6 border-b border-stone-100\">\n        <h1 class=\"text-2xl sm:text-3xl font-extrabold text-black\">سياسة الخصوصية وأمان المعلومات</h1>\n        <p class=\"text-xs text-stone-500 mt-1\">نلتزم بحماية بياناتك الشخصية وسريتها وفق نظام حماية البيانات الشخصية السعودي</p>\n      </div>\n\n      <!-- Articles -->\n      <div class=\"space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-normal\">\n        \n        <section class=\"space-y-2\">\n          <h2 class=\"text-base font-bold text-black\">1. ما هي البيانات التي نجمعها؟</h2>\n          <p>\n            نقوم بجمع المعلومات الضرورية لإتمام عمليات الشراء والتوصيل وخدمة ما بعد البيع، وتشمل: الاسم، رقم الجوال، عنوان التوصيل الدقيق، والبريد الإلكتروني. لا يقوم متجرنا بتخزين أي أرقام بطاقات ائتمانية على خوادمه إطلاقاً، بل تتم معالجتها وتشفيرها عبر بوابات الدفع الرسمية المعتمدة من البنك المركزي السعودي (ساما).\n          </p>\n        </section>\n\n        <section class=\"space-y-2 pt-4 border-t border-stone-100\">\n          <h2 class=\"text-base font-bold text-black\">2. كيف نستخدم بياناتك الشخصية؟</h2>\n          <ul class=\"list-disc list-inside space-y-1.5 pr-2 text-stone-600\">\n            <li>معالجة طلبات الشراء وشحنها إلى عنوانك بدقة.</li>\n            <li>إرسال رسائل التتبع وتحديثات حالة الطلب عبر الرسائل النصية القصيرة أو الواتساب.</li>\n            <li>الرد على استفساراتك وشكاواك وتقديم الدعم الفني.</li>\n            <li>تحسين تجربة تصفحك وتخصيص العروض الترويجية في حال موافقتك على ذلك.</li>\n          </ul>\n        </section>\n\n        <section class=\"space-y-2 pt-4 border-t border-stone-100\">\n          <h2 class=\"text-base font-bold text-black\">3. مشاركة البيانات مع أطراف ثالثة</h2>\n          <p>\n            لا نقوم ببيع أو تأجير أو مشاركة بياناتك الشخصية مع أي طرف ثالث لأغراض تسويقية. لا تتم مشاركة معلوماتك إلا بالقدر اللازم مع شركاء الشحن المعتمدين (مثل أرامكس) لتوصيل طلبك، وبوابات الدفع المعتمدة لإتمام المعاملة المالية.\n          </p>\n        </section>\n\n        <section class=\"space-y-2 pt-4 border-t border-stone-100\">\n          <h2 class=\"text-base font-bold text-black\">4. أمان البيانات والتشفير</h2>\n          <p>\n            نطبق أعلى معايير الأمان التقنية والتنظيمية باستخدام بروتوكولات التشفير العالمية SSL لحماية البيانات أثناء نقلها ومنع أي وصول غير مصرح به.\n          </p>\n        </section>\n\n      </div>\n\n    </div>\n  </main>",
    terms: "<main id=\"page-main-wrapper\"  class=\"pt-28 sm:pt-36 pb-20 flex-grow text-right\">\n    <div class=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Breadcrumb -->\n      <nav class=\"flex items-center gap-2 text-xs text-stone-400 mb-8 font-medium\">\n        <a href=\"/\" class=\"hover:text-black\">الرئيسية</a>\n        <span>/</span>\n        <span class=\"text-black font-bold\">الشروط والأحكام</span>\n      </nav>\n\n      <!-- Page Title -->\n      <div class=\"mb-10 pb-6 border-b border-stone-100\">\n        <h1 class=\"text-2xl sm:text-3xl font-extrabold text-black\">الشروط والأحكام الرسمية</h1>\n        <p class=\"text-xs text-stone-500 mt-1\">دار نوت للعطور (NOTE Perfumes) | السجل التجاري: 1010713359 | الرقم الضريبي: 310103613800003</p>\n      </div>\n\n      <!-- Articles -->\n      <div class=\"space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-normal\">\n        \n        <section class=\"space-y-2\">\n          <h2 class=\"text-base font-bold text-black\">1. مقدمة وأحكام عامة</h2>\n          <p>\n            تحدد هذه الشروط والأحكام القواعد واللوائح التنظيمية لاستخدام متجر دار نوت للعطور الإلكتروني. بمجرد استخدامك للموقع أو إتمام أي عملية شراء، فإنك تقر بموافقتك الكاملة وغير المشروطة على الالتزام بجميع البنود المنصوص عليها هنا.\n          </p>\n        </section>\n\n        <section class=\"space-y-2 pt-4 border-t border-stone-100\">\n          <h2 class=\"text-base font-bold text-black\">2. الحساب والتسجيل</h2>\n          <p>\n            يلتزم العميل بتزويد المتجر بمعلومات صحيحة ودقيقة وكاملة أثناء إنشاء الحساب أو إتمام الطلب، ويتحمل مسؤولية المحافظة على سرية بيانات حسابه وكلمة المرور الخاصة به.\n          </p>\n        </section>\n\n        <section class=\"space-y-2 pt-4 border-t border-stone-100\">\n          <h2 class=\"text-base font-bold text-black\">3. الأسعار والضريبة وطرق الدفع</h2>\n          <p>\n            جميع الأسعار المعروضة على المتجر بالريال السعودي (SAR) وتشمل ضريبة القيمة المضافة (15%) المقررة نظاماً. يحتفظ المتجر بحقه في تعديل الأسعار والعروض الترويجية في أي وقت دون إشعار مسبق. تتوفر وسائل الدفع الإلكتروني المعتمدة: مدى، فيزا، ماستركارد، Apple Pay، والتقسيط عبر تابي وتمارا.\n          </p>\n        </section>\n\n        <section class=\"space-y-2 pt-4 border-t border-stone-100\">\n          <h2 class=\"text-base font-bold text-black\">4. الشحن والتوصيل</h2>\n          <p>\n            يتم التوصيل إلى جميع مدن ومحافظات المملكة العربية السعودية ودول مجلس التعاون الخليجي عبر شركات الشحن المعتمدة (أرامكس). تلتزم الدار بتسليم الشحنة في المواعيد المحددة (2 إلى 4 أيام عمل)، ولا تتحمل المسؤولية عن أي تأخير خارج عن إرادتها ناتج عن ظروف قاهرة أو تعذر التواصل مع العميل.\n          </p>\n        </section>\n\n        <section class=\"space-y-2 pt-4 border-t border-stone-100\">\n          <h2 class=\"text-base font-bold text-black\">5. الملكية الفكرية</h2>\n          <p>\n            العلامة التجارية NOTE Perfumes والشعار والتصاميم والصور الفوتوغرافية والنصوص العطرية هي ملكية فكرية حصرية لدار نوت للعطور، ويحظر نسخها أو استخدامها لأي غرض تجاري دون إذن خطي مسبق.\n          </p>\n        </section>\n\n        <section class=\"space-y-2 pt-4 border-t border-stone-100\">\n          <h2 class=\"text-base font-bold text-black\">6. القانون الواجب التطبيق</h2>\n          <p>\n            تخضع هذه الشروط والأحكام وتفسر وفقاً للأنظمة والقوانين المعمول بها في المملكة العربية السعودية، وتختص المحاكم السعودية بالنظر في أي نزاع قد ينشأ عنها.\n          </p>\n        </section>\n\n      </div>\n\n    </div>\n  </main>",
    refund: "<main id=\"page-main-wrapper\"  class=\"pt-28 sm:pt-36 pb-20 flex-grow text-right\">\n    <div class=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8\">\n      \n      <!-- Breadcrumb -->\n      <nav class=\"flex items-center gap-2 text-xs text-stone-400 mb-8 font-medium\">\n        <a href=\"/\" class=\"hover:text-black\">الرئيسية</a>\n        <span>/</span>\n        <span class=\"text-black font-bold\">السياسات والضمان</span>\n      </nav>\n\n      <!-- Page Title -->\n      <div class=\"mb-10 pb-6 border-b border-stone-100\">\n        <div class=\"flex items-center gap-3 mb-2\">\n          <span class=\"p-2 rounded-xl bg-stone-100 text-black\">\n            <i class=\"sicon-shield-check text-xl\"></i>\n          </span>\n          <h1 class=\"text-2xl sm:text-3xl font-extrabold text-black\">سياسات الاستبدال والاسترجاع والضمان الذهبي</h1>\n        </div>\n        <p class=\"text-xs text-stone-500\">آخر تحديث: 2026 | وثيقة معتمدة ومطابقة لوزارة التجارة بالمملكة العربية السعودية</p>\n      </div>\n\n      <!-- Golden Guarantee Highlight Box -->\n      <div class=\"p-6 rounded-2xl bg-stone-50 border border-stone-200 mb-10 space-y-3\">\n        <div class=\"flex items-center gap-2 text-black font-bold text-sm\">\n          <i class=\"sicon-award-ribbon text-lg\"></i>\n          <h3>الضمان الذهبي الملكي لدار نوت (NOTE Perfumes)</h3>\n        </div>\n        <p class=\"text-xs text-stone-700 leading-relaxed font-normal\">\n          من أجل ضمان أعلى مستويات الرضا لعملائنا الكرام في NOTE perfumes، فإننا نرفق <strong>عينة تجربة مجانية</strong> مع كل زجاجة عطر. يرجى تجربة العينة المرفقة أولاً قبل فك التغليف السلوفاني الأساسي. يحق لك الاسترجاع خلال <strong>3 أيام</strong> من تاريخ استلام الشحنة بكل سهولة ويسر.\n        </p>\n      </div>\n\n      <!-- Content Sections -->\n      <div class=\"space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed\">\n        \n        <!-- Section 1 -->\n        <section class=\"space-y-3\">\n          <h2 class=\"text-base sm:text-lg font-bold text-black flex items-center gap-2\">\n            <span>1. شروط وقواعد الاسترجاع</span>\n          </h2>\n          <p>جميع منتجاتنا قابلة للاسترجاع خلال 3 أيام من تاريخ التسليم، وفق الشروط الرسمية الآتية:</p>\n          <ul class=\"list-disc list-inside space-y-2 pr-2 text-stone-600\">\n            <li>يجب أن تكون حالة المنتج والغلاف الخارجي (البكج) بحالتها الأصلية كما هي عليه عند الاستلام دون أي فتح للتغليف الحراري السلوفاني للعطر.</li>\n            <li>يجب إعادة جميع ملحقات المنتج كاملة: الكيس + البكج الخارجي + كرتون العطر + الهدايا الترويجية المرفقة إن وجدت.</li>\n            <li>يتم شحن واسترجاع المنتجات حصراً عبر شريك الشحن المعتمد (شركة أرامكس Aramex). يعتذر المتجر عن استلام أي شحنة مرسلة عبر شركات ناقلة أخرى.</li>\n            <li>يجب أن يكون الحساب البنكي المسترد إليه هو نفس الحساب الذي تم الشراء منه وقت تنفيذ الطلب.</li>\n            <li>تستغرق عملية إيداع واسترداد المبلغ من 14 يوماً إلى 30 يوم عمل كحد أقصى.</li>\n          </ul>\n        </section>\n\n        <!-- Section 2 -->\n        <section class=\"space-y-3 pt-6 border-t border-stone-100\">\n          <h2 class=\"text-base sm:text-lg font-bold text-black flex items-center gap-2\">\n            <span>2. خطوات وإجراءات تنفيذ طلب الاسترجاع</span>\n          </h2>\n          <ol class=\"list-decimal list-inside space-y-2 pr-2 text-stone-600\">\n            <li>إرفاق رقم الطلبية وتاريخ الشراء عبر التواصل مع خدمة العملاء.</li>\n            <li>تصوير فيديو واضح لا يقل عن 10 ثوانٍ يوضح سلامة المنتج وغلافه السلوفاني وكافة ملحقاته.</li>\n            <li>بعد تدقيق الفيديو والموافقة، سيتم إصدار بوليصة شحن أرامكس إلكترونية وإرسالها لكم لطباعتها.</li>\n            <li>التوجه إلى أقرب فرع لشركة أرامكس وتسليم الطلب مع البوليصة المطبوعة والتأكد من تغليفها بشكل محكم.</li>\n          </ol>\n        </section>\n\n        <!-- Section 3 -->\n        <section class=\"space-y-3 pt-6 border-t border-stone-100\">\n          <h2 class=\"text-base sm:text-lg font-bold text-black flex items-center gap-2\">\n            <span>3. فحص الشحنة واسترداد المبالغ</span>\n          </h2>\n          <p>\n            بعد استلام المنتج المرتجع في مستودعاتنا، يستغرق فحصه والتحقق من سلامته ومطابقته لشروط الاسترجاع مدة تصل إلى 20 يوم عمل. وبعد الموافقة النهائية على الاسترجاع، يتم رفع طلب استرداد المبلغ المالي وفق وسيلة الدفع الأصلية.\n          </p>\n          <div class=\"p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 space-y-1\">\n            <p class=\"font-bold\">ملاحظات هامة حول الرسوم:</p>\n            <p>يتحمل العميل كامل تكاليف الشحن المتعلقة بعملية استرجاع المنتج، كما يتم خصم 5% من قيمة المنتج المسترجع، وذلك مقابل تكاليف الفحص المخبري وإعادة التغليف والتجهيز وإعادة الطرح للبيع، على أن يكون المنتج بحالته الأصلية تماماً.</p>\n            <p>في حال كان الطلب مدفوعاً عن طريق تابي (Tabby) أو تمارا (Tamara)، يتم إرجاع المبالغ تلقائياً عبر مزود خدمة الدفع وفقاً لإجراءاتهم المعتمدة بعد قبول الاسترجاع.</p>\n          </div>\n        </section>\n\n        <!-- Section 4 -->\n        <section class=\"space-y-3 pt-6 border-t border-stone-100\">\n          <h2 class=\"text-base sm:text-lg font-bold text-black flex items-center gap-2\">\n            <span>4. سياسة الاستبدال</span>\n          </h2>\n          <p class=\"text-stone-600\">\n            يعتذر متجر دار نوت للعطور (NOTE perfumes) عن استقبال طلبات الاستبدال المباشر لأي منتج من منتجاته، نظراً لاندراج كافة المنتجات تحت تصنيف مستحضرات التجميل والعطور الحساسة وفق اشتراطات الهيئة العامة للغذاء والدواء. وفي حال رغبتكم في عطر بديل، يمكنكم استرجاع الطلب وفق الشروط أعلاه وطلب العطر المرغوب في طلب جديد.\n          </p>\n        </section>\n\n        <!-- Contact CTA -->\n        <div class=\"p-6 rounded-2xl bg-stone-50 border border-stone-200 mt-10 text-center space-y-3\">\n          <h3 class=\"font-bold text-black text-sm\">هل تحتاج لمساعدة في استرجاع طلبك؟</h3>\n          <p class=\"text-xs text-stone-500\">فريق خدمة عملاء NOTE جاهز لخدمتكم يومياً من الساعة 9 صباحاً حتى 11 مساءً</p>\n          <a href=\"https://wa.me/966565955420\" target=\"_blank\" class=\"inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm\">\n            <i class=\"sicon-whatsapp text-sm\"></i>\n            <span>تواصل معنا عبر واتساب: 0565955420</span>\n          </a>\n        </div>\n\n      </div>\n\n    </div>\n  </main>"
  };

  // 7. Cart Manager (Global localStorage Architecture)
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
      if (typeof window.renderCartPage === 'function' && document.getElementById('cart-page-items')) {
        window.renderCartPage();
      }
    },
    addItem: function(productId, quantity = 1) {
      const product = productsData.find(p => p.id === productId) || noteProductsCatalog.find(p => p.id === productId);
      if (!product) return;
      if (product.in_stock === false || product.stock === 0) {
        this.showToast('عذراً، هذا المنتج غير متاح حالياً');
        return;
      }
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
      if (typeof this.updateBadge === 'function') this.updateBadge();
      const badge = document.getElementById('cart-counter-badge');
      if (badge) {
        badge.classList.remove('scale-125');
        void badge.offsetWidth;
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 250);
      }
      this.showToast('تمت إضافة ' + product.title + ' إلى سلتك');
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
      const badges = document.querySelectorAll('.cart-badge, .cart-badge-count, #cart-counter-badge, [class*="cart-badge"], .cart-sm .cart-badge');
      badges.forEach(b => {
        if (b.textContent !== String(count)) b.textContent = String(count);
      });
    },
    showToast: function(msg) {
      let toast = document.getElementById('global-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[100] transform -translate-y-24 opacity-0 transition-all duration-300 pointer-events-auto px-5 py-3 rounded-full shadow-2xl text-xs font-bold flex items-center gap-3 bg-stone-900/95 backdrop-blur-md text-white border border-white/10';
        if (document.body) document.body.appendChild(toast);
      }
      toast.innerHTML = '<i class="sicon-check-circle text-emerald-400 text-sm"></i><span class="truncate max-w-[200px] sm:max-w-none">' + msg + '</span><button type="button" onclick="CartManager.openDrawer()" class="mr-1 px-3 py-1 bg-white/20 hover:bg-white/30 active:scale-95 rounded-full text-[11px] font-semibold text-white transition whitespace-nowrap">عرض السلة</button>';
      if (toast.classList) {
        toast.classList.remove('-translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {
          toast.classList.remove('translate-y-0', 'opacity-100');
          toast.classList.add('-translate-y-24', 'opacity-0');
        }, 3200);
      }
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
        const recsContainer = document.getElementById('cart-drawer-recommendations');
        if (recsContainer) recsContainer.classList.add('hidden');
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
          shippingText.innerHTML = `متبقي <strong class="text-black font-extrabold">${remaining} ر.س</strong> للحصول على <span class="font-bold text-emerald-600">شحن مجاني</span>`;
        }
      }
      
      if (subtotalEl) subtotalEl.textContent = total + ' ر.س';
      if (totalEl) totalEl.textContent = total + ' ر.س';
      
      itemsContainer.innerHTML = cart.map(item => {
        const zidSlug = zidSlugMap[item.product_id || item.id] || item.product_id || item.id;
        const imgUrl = (item.img.startsWith('http') ? '' : ASSET_HOST) + item.img;
        return `
          <div class="note-cart-item group relative flex items-center gap-3 p-3 mb-2.5 rounded-2xl bg-stone-50/70 hover:bg-stone-50 border border-stone-200/80 transition-all text-right">
            <a href="/products/${zidSlug}" onclick="NoteRouter.navigate('/products/${zidSlug}'); CartManager.closeDrawer();" class="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white p-1.5 flex-shrink-0 flex items-center justify-center border border-stone-200/80 shadow-2xs block overflow-hidden">
              <img src="${imgUrl}" alt="${escapeHTML(item.title)}" class="w-full h-full object-contain transition-transform group-hover:scale-105">
            </a>
            <div class="flex-grow min-w-0 pr-1">
              <a href="/products/${zidSlug}" onclick="NoteRouter.navigate('/products/${zidSlug}'); CartManager.closeDrawer();" class="block hover:text-stone-700 transition">
                <h4 class="text-xs sm:text-sm font-extrabold text-stone-900 line-clamp-1 leading-snug">${escapeHTML(item.title)}</h4>
              </a>
              <span class="text-[11px] text-stone-500 font-medium block mt-0.5">${item.size || '100 مل'}</span>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center bg-white border border-stone-300 rounded-full h-7 px-1.5 gap-2 text-xs font-bold shadow-2xs">
                  <button onclick="CartManager.updateQuantity('${item.id}', -1)" class="w-5 h-5 rounded-full flex items-center justify-center text-stone-600 hover:text-black hover:bg-stone-100 transition" aria-label="تقليل الكمية">-</button>
                  <span class="min-w-[16px] text-center font-extrabold text-stone-900">${item.quantity}</span>
                  <button onclick="CartManager.updateQuantity('${item.id}', 1)" class="w-5 h-5 rounded-full flex items-center justify-center text-stone-600 hover:text-black hover:bg-stone-100 transition" aria-label="زيادة الكمية">+</button>
                </div>
                <span class="text-xs sm:text-sm font-black text-stone-900">${item.price * item.quantity} ر.س</span>
              </div>
            </div>
            <button onclick="CartManager.removeItem('${item.id}')" class="text-stone-400 hover:text-rose-600 p-2 transition flex items-center justify-center rounded-lg hover:bg-rose-50" aria-label="حذف المنتج من السلة" aria-label="حذف المنتج من السلة" title="حذف" style="display:inline-flex;align-items:center;gap:4px;min-width:44px;min-height:44px;font-size:11px">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/></svg><span>حذف</span>
            </button>
          </div>
        `;
      }).join('');

      // Render Drawer Recommendations
      const recsContainer = document.getElementById('cart-drawer-recommendations');
      const recsList = document.getElementById('cart-drawer-recs-list');
      if (recsContainer && recsList) {
        const inCartIds = new Set(cart.map(i => i.id));
        const pool = [
          'for-him-30ml',
          'for-her-30ml',
          'powderose-30ml',
          'musk-toffee-oil',
          'all-over-royal-tobacco',
          'all-over-choconilla',
          'linen-royal-tobacco',
          'linen-oud-rosewood',
          'roayal-tobacco',
          'note-for-him',
          'oud-rosewood',
          'musk'
        ];
        const recs = pool
          .filter(id => !inCartIds.has(id))
          .map(id => noteProductsCatalog.find(p => p.id === id))
          .filter(p => p && p.in_stock !== false && p.stock !== 0)
          .slice(0, 1);

        if (recs.length > 0) {
          recsContainer.classList.remove('hidden');
          recsList.innerHTML = recs.map(p => {
            const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
            return `
              <div class="flex items-center justify-between gap-2.5 p-2 bg-white rounded-xl border border-stone-200/70 shadow-xs">
                <div class="flex items-center gap-2 min-w-0">
                  <div class="w-9 h-9 rounded-lg bg-stone-50 p-0.5 border border-stone-100 shrink-0 flex items-center justify-center">
                    <img src="${imgUrl}" alt="${escapeHTML(p.title)}" class="w-full h-full object-contain">
                  </div>
                  <div class="min-w-0">
                    <h5 class="text-[11px] font-bold text-black truncate">${escapeHTML(p.title)}</h5>
                    <div class="flex items-center gap-1.5 mt-0.5">
                      <span class="text-[11px] font-extrabold text-black">${p.price} ر.س</span>
                      ${p.old_price ? `<span class="text-[9px] text-stone-400 line-through">${p.old_price ?? ""} ر.س</span>` : ''}
                    </div>
                  </div>
                </div>
                <button onclick="CartManager.addItem('${p.id}', 1)" class="px-2.5 py-1 rounded-lg bg-black hover:bg-stone-800 text-white text-[10px] font-bold shrink-0 transition flex items-center gap-1 active:scale-95 shadow-xs" title="إضافة سريعة">
                  <i class="sicon-plus text-[9px]"></i>
                  <span>أضف</span>
                </button>
              </div>
            `;
          }).join('');
        } else {
          recsContainer.classList.add('hidden');
        }
      }
    }
  };

  // 8. Product Card Rendering
  function renderProductCard(p, index) {
    const zidSlug = zidSlugMap[p.id] || p.id;
    const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
    const isOutOfStock = p.in_stock === false || p.stock === 0;
    return `
      <div class="min-w-[175px] sm:min-w-[270px] max-w-[185px] sm:max-w-[280px] shrink-0 p-1 flex flex-col justify-between text-center group cursor-pointer bg-transparent ${isOutOfStock ? 'is-out-of-stock product-item-out-of-stock' : ''}" style="scroll-snap-align: start;" onclick="NoteRouter.navigate('/products/${zidSlug}')">
        <div>
          <!-- Frameless Image Container with Clean Shadow/Scale -->
          <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 sm:p-4 overflow-hidden">
            ${isOutOfStock ? `<span class="note-product-badge note-out-of-stock-sticker out-of-stock">غير متاح</span>${p.discount ? `<span class="absolute top-2 right-2 z-10 text-[10px] px-2 py-1 rounded-full bg-black text-white"><span>خصم</span><bdi dir="ltr">${p.discount}</bdi></span>` : ''}` : (p.tag ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 text-[9px] sm:text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-black text-white whitespace-nowrap shadow-sm"> ${p.discount ? `<span>خصم</span><bdi dir="ltr">${p.discount}</bdi>` : escapeHTML(p.tag)} </span>` : '')}
            <img src="${imgUrl}" alt="${escapeHTML(p.title)}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
          </div>

          <!-- Product Typography (Clean Laverne Centered Sans-Serif) -->
          <div class="pt-1 pb-1 text-center space-y-1">
            <h4 class="text-xs sm:text-sm md:text-base font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${escapeHTML(p.title)}</h4>
            <p class="text-[11px] sm:text-xs text-stone-400 font-normal line-clamp-1">${p.notes}</p>
            
            <!-- Clean Price Row -->
            <div class="flex items-center justify-center gap-2 pt-1">
              <span class="text-rose-600 font-extrabold text-sm sm:text-base">${p.price}</span>
              <span class="text-stone-400 line-through text-[11px] sm:text-xs font-normal">${p.old_price ?? ""}</span>
            </div>
          </div>
        </div>

        <!-- Minimalist Rounded Pill Button -->
        ${isOutOfStock ? `
        <button disabled class="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed flex items-center justify-center gap-2 font-bold text-xs shadow-none" title="غير متاح">
          <span>غير متاح</span>
        </button>
        ` : `
        <button onclick="event.stopPropagation(); CartManager.addItem('${p.id}')" class="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-xs shadow-sm" title="إضافة للسلة">
          <span>إضافة للسلة</span>
          <i class="sicon-shopping-bag text-sm"></i>
        </button>
        `}
      </div>
    `;
  }

  // 9. Sliders Initialization
  function initSliders() {
    const bestTrack = document.getElementById('slider-bestsellers');
    if (bestTrack) {
      bestTrack.innerHTML = productsData.slice(0, 6).map((p, i) => renderProductCard(p, i)).join('');
      enableSliderDragAndWheel(bestTrack);
    }

    const nicheTrack = document.getElementById('slider-niche');
    if (nicheTrack) {
      nicheTrack.innerHTML = productsData.slice(6, 10).map((p, i) => renderProductCard(p, i + 6)).join('');
      enableSliderDragAndWheel(nicheTrack);
    }

    const newTrack = document.getElementById('slider-new');
    if (newTrack) {
      newTrack.innerHTML = productsData.slice(10, 16).map((p, i) => renderProductCard(p, i + 10)).join('');
      enableSliderDragAndWheel(newTrack);
    }
  }

  function scrollSlider(id, direction) {
    const slider = document.getElementById(id);
    if (!slider) return;
    const card = slider.firstElementChild;
    const cardWidth = card ? (card.offsetWidth + 20) : 260;
    const scrollAmount = Math.max(slider.clientWidth * 0.75, cardWidth);
    
    // In RTL, moving left into next items requires a negative scrollLeft delta
    let delta = 0;
    if (direction === 'left' || direction === 'next') {
      delta = -scrollAmount;
    } else {
      delta = scrollAmount;
    }
    slider.scrollBy({ left: delta, behavior: 'smooth' });
  }

  function enableSliderDragAndWheel(slider) {
    if (!slider || slider._wheelDragAttached || typeof slider.addEventListener !== 'function') return;
    slider._wheelDragAttached = true;
    
    // Mouse Wheel -> Smooth horizontal card scroll on desktop
    let wheelTimer = null;
    let wheelDelta = 0;
    slider.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        if (slider.scrollWidth > slider.clientWidth) {
          e.preventDefault();
          wheelDelta += e.deltaY;
          clearTimeout(wheelTimer);
          wheelTimer = setTimeout(() => {
            const dir = wheelDelta > 0 ? 'left' : 'right';
            scrollSlider(slider.id, dir);
            wheelDelta = 0;
          }, 30);
        }
      }
    }, { passive: false });

    // Mouse Drag-to-Scroll (Desktop Grab & Drag)
    let isDown = false, startX = 0, scrollStart = 0, hasMoved = false;
    slider.style.cursor = 'grab';

    slider.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDown = true;
      hasMoved = false;
      startX = e.pageX;
      scrollStart = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
      slider.style.scrollBehavior = 'auto';
      slider.style.scrollSnapType = 'none';
    });

    const stopDrag = () => {
      if (!isDown) return;
      isDown = false;
      slider.style.cursor = 'grab';
      slider.style.scrollBehavior = '';
      slider.style.scrollSnapType = '';
      setTimeout(() => { hasMoved = false; }, 60);
    };

    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('mouseup', stopDrag);
    }
    slider.addEventListener('mouseleave', stopDrag);

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const diff = e.pageX - startX;
      if (Math.abs(diff) > 4) {
        hasMoved = true;
        e.preventDefault();
        slider.scrollLeft = scrollStart - diff;
      }
    });

    slider.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  // 10. Header Scroll Glassmorphism
  function handleHeaderScroll() {
    const header = document.getElementById('site-header');
    const storeLogo = document.getElementById('store-logo');
    const hero = document.getElementById('section-hero-video');
    if (!header) return;

    const scrollY = window.scrollY || 0;
    
    // If not on homepage (no hero), keep solid frosted white
    if (!hero) {
      header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-black shadow-sm border-b border-stone-200/50 backdrop-blur-xl bg-white/85';
      if (storeLogo) storeLogo.src = ASSET_HOST + '/logo_dark_crisp.png';
      return;
    }

    const heroHeight = hero.offsetHeight || 800;

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

  // 11. Quick View Modal
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

    const isOutOfStock = p.in_stock === false || p.stock === 0;
    const buyBtn = document.getElementById('modal-buy-btn');
    if (buyBtn) {
      if (isOutOfStock) {
        buyBtn.disabled = true;
        buyBtn.className = 'w-full py-3.5 px-6 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed font-bold text-sm shadow-none flex items-center justify-center gap-2';
        buyBtn.innerHTML = '<span>غير متاح</span>';
        buyBtn.onclick = null;
      } else {
        buyBtn.disabled = false;
        buyBtn.className = 'w-full py-3.5 px-6 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-sm shadow-sm transition active:scale-98 flex items-center justify-center gap-2';
        buyBtn.innerHTML = '<span>إضافة للسلة</span><i class="sicon-shopping-bag"></i>';
        buyBtn.onclick = () => {
          CartManager.addItem(p.id);
          closeQuickView();
        };
      }
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

  // Arabic Text Normalization (Removes Tashkeel, Normalizes Alef/Yeh/Teh)
  function normalizeArabic(text) {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .replace(/[ً-ٰٟ]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .trim();
  }

  // 12. Search & Mobile Drawer
  function openSearchModal() {
    const m = document.getElementById('search-modal');
    if (!m) return;
    m.classList.remove('hidden');
    setTimeout(() => {
      m.classList.remove('opacity-0');
      const inner = m.querySelector('div');
      if (inner) inner.classList.remove('scale-95');
      const input = document.getElementById('search-input');
      if (input) {
        input.focus();
        if (input.value) handleLiveSearch(input.value);
      }
    }, 10);
  }

  function closeSearchModal() {
    const m = document.getElementById('search-modal');
    if (!m) return;
    m.classList.add('opacity-0');
    const inner = m.querySelector('div');
    if (inner) inner.classList.add('scale-95');
    setTimeout(() => {
      m.classList.add('hidden');
    }, 300);
  }

  function handleLiveSearch(query) {
    const rawTrimmed = (query || '').trim();
    const normalized = normalizeArabic(rawTrimmed);
    const resultsContainer = document.getElementById('search-results');
    const quickTags = document.getElementById('search-quick-tags');
    const footer = document.getElementById('search-modal-footer');
    const countEl = document.getElementById('search-results-count');
    const viewAllLink = document.getElementById('search-view-all-link');

    if (!resultsContainer) return;

    if (!rawTrimmed) {
      resultsContainer.innerHTML = '';
      if (quickTags) quickTags.classList.remove('hidden');
      if (footer) footer.classList.add('hidden');
      return;
    }

    if (quickTags) quickTags.classList.add('hidden');

    const matches = noteProductsCatalog.filter(p => {
      const title = normalizeArabic(p.title);
      const titleEn = (p.title_en || '').toLowerCase();
      const notes = normalizeArabic(p.notes);
      const desc = normalizeArabic(p.description);
      const cat = normalizeArabic(p.cat_ar);
      return title.includes(normalized) || 
             titleEn.includes(rawTrimmed.toLowerCase()) || 
             notes.includes(normalized) || 
             desc.includes(normalized) || 
             cat.includes(normalized);
    });

    if (footer) footer.classList.remove('hidden');
    if (countEl) countEl.textContent = `تم العثور على ${matches.length} عطر`;
    if (viewAllLink) viewAllLink.href = `/categories?cat=all&search=${encodeURIComponent(rawTrimmed)}`;

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="py-10 text-center text-stone-400">
          <i class="sicon-search text-3xl mb-2 block opacity-40"></i>
          <p class="text-sm font-bold text-black mb-1">لم نجد أي نتائج تطابق "${rawTrimmed}"</p>
          <p class="text-xs text-stone-400">جرب البحث بكلمات أخرى مثل: مسك، توباكو، عود، عنبر، باودر</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.slice(0, 8).map(p => {
      const zidSlug = zidSlugMap[p.id] || p.id;
      const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
      const isOutOfStock = p.in_stock === false || p.stock === 0;
      return `
        <div class="py-3 flex items-center justify-between gap-4 hover:bg-stone-50 px-2.5 rounded-xl transition cursor-pointer ${isOutOfStock ? 'opacity-80' : ''}" onclick="closeSearchModal(); NoteRouter.navigate('/products/${zidSlug}')">
          <div class="flex items-center gap-3 min-w-0">
            <div class="relative w-14 h-14 rounded-xl bg-stone-50 p-1 shrink-0 flex items-center justify-center border border-stone-100 overflow-hidden">
              <img src="${imgUrl}" alt="${escapeHTML(p.title)}" class="w-full h-full object-contain ${isOutOfStock ? 'grayscale opacity-80' : ''}">
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h4 class="text-xs sm:text-sm font-bold text-black truncate">${escapeHTML(p.title)}</h4>
                ${isOutOfStock ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 shrink-0">غير متاح</span>' : ''}
              </div>
              <p class="text-[10px] sm:text-[11px] text-stone-400 font-normal truncate">${p.notes || p.cat_ar || ''}</p>
              <span class="text-xs font-extrabold text-black block mt-0.5">${p.price} ر.س</span>
            </div>
          </div>
          ${isOutOfStock ? `
          <button disabled class="shrink-0 px-3.5 py-1.5 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed text-[11px] font-bold shadow-none flex items-center gap-1.5">
            <span>غير متاح</span>
          </button>
          ` : `
          <button onclick="event.stopPropagation(); CartManager.addItem('${p.id}'); closeSearchModal();" class="shrink-0 px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-stone-800 text-[11px] font-bold shadow-sm transition active:scale-95 flex items-center gap-1.5">
            <span>أضف للسلة</span>
            <i class="sicon-shopping-bag text-xs"></i>
          </button>
          `}
        </div>
      `;
    }).join('');
  }

  function fillAndSearch(keyword) {
    const inp = document.getElementById('search-input');
    if (inp) {
      inp.value = keyword;
      inp.focus();
      handleLiveSearch(keyword);
    }
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

  // 13. Hero Auto-Rotating Carousel
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

  // 14. Offers Auto-Rotating Carousel (3s Interval)
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

  // 15. PDP (Product Detail Page) Controller
  let currentProduct = null;
  let pdpQuantity = 1;

  function initPDP(prodId) {
    pdpQuantity = 1;
    currentProduct = noteProductsCatalog.find(p => p.id === prodId) || 
                     noteProductsCatalog.find(p => zidSlugMap[p.id] === prodId) || 
                     noteProductsCatalog.find(p => p.id === zidSlugMap[prodId]) || 
                     noteProductsCatalog[0];

    document.title = `${escapeHTML(currentProduct.title)} | دار نوت للعطور NOTE Perfumes`;

    const breadCat = document.getElementById('pdp-breadcrumb-cat');
    if (breadCat) {
      const catUrl = catUrlMap[currentProduct.cat] || `/categories`;
      breadCat.textContent = currentProduct.cat_ar || 'العطور';
      breadCat.setAttribute('href', catUrl);
      breadCat.onclick = (e) => {
        e.preventDefault();
        NoteRouter.navigate(catUrl);
      };
    }
    const breadTitle = document.getElementById('pdp-breadcrumb-title');
    if (breadTitle) breadTitle.textContent = currentProduct.title;

    const catName = document.getElementById('pdp-category-name');
    if (catName) catName.textContent = `${currentProduct.cat_ar || 'العطور الفاخرة'} • ${currentProduct.concentration ? currentProduct.concentration.toUpperCase() : 'EXTRAIT DE PARFUM'}`;

    const titleEl = document.getElementById('pdp-title');
    if (titleEl) titleEl.textContent = currentProduct.title;

    const titleEn = document.getElementById('pdp-title-en');
    if (titleEn) titleEn.textContent = currentProduct.title_en || '';

    const ratingNum = document.getElementById('pdp-rating-num');
    if (ratingNum) ratingNum.textContent = currentProduct.rating || '4.91';

    const ratingCount = document.getElementById('pdp-rating-count');
    if (ratingCount) ratingCount.textContent = `(${currentProduct.reviews_count || 170} تقييم موثق)`;

    const tagBadge = document.getElementById('pdp-tag-badge');
    if (tagBadge) {
      if (currentProduct.tag) {
        tagBadge.textContent = currentProduct.tag;
        tagBadge.classList.remove('hidden');
      } else {
        tagBadge.classList.add('hidden');
      }
    }

    const priceEl = document.getElementById('pdp-price');
    if (priceEl) priceEl.textContent = `${currentProduct.price} ر.س`;

    const oldPriceEl = document.getElementById('pdp-old-price');
    if (oldPriceEl) oldPriceEl.textContent = `${currentProduct.old_price} ر.س`;

    const discountBadge = document.getElementById('pdp-discount-badge');
    if (discountBadge) discountBadge.textContent = `وفر ${currentProduct.discount || '45%'}`;

    const tabbyPrice = (currentProduct.price / 4).toFixed(2);
    const tabbyEl = document.getElementById('pdp-tabby-price');
    if (tabbyEl) tabbyEl.textContent = `${tabbyPrice} ر.س`;

    const mainImg = document.getElementById('pdp-main-image');
    const mainImgUrl = (currentProduct.img.startsWith('http') ? '' : ASSET_HOST) + currentProduct.img;
    if (mainImg) {
      mainImg.src = mainImgUrl;
      mainImg.alt = currentProduct.title;
      mainImg.className = 'w-full h-full object-contain p-4 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-105';
    }

    // Thumbnails
    const thumbsContainer = document.getElementById('pdp-thumbnails');
    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      const images = [currentProduct.img];
      if (currentProduct.img_box && currentProduct.img_box !== currentProduct.img) {
        images.push(currentProduct.img_box);
      }
      thumbsContainer.style.display = images.length > 1 ? 'flex' : 'none';

      images.forEach((img, idx) => {
        const fullUrl = (img.startsWith('http') ? '' : ASSET_HOST) + img;
        const btn = document.createElement('button');
        btn.className = `w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 p-1 bg-stone-50 transition-all flex items-center justify-center overflow-hidden ${idx === 0 ? 'thumb-active border-black' : 'border-stone-200 opacity-60 hover:opacity-100'}`;
        btn.onclick = () => {
          if (mainImg) {
            mainImg.src = fullUrl;
            if (idx === 0) {
              mainImg.className = 'w-full h-full object-contain p-4 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-105';
            } else {
              mainImg.className = 'w-full h-full object-cover p-0 transition-transform duration-700 ease-out group-hover:scale-105';
            }
          }
          document.querySelectorAll('#pdp-thumbnails button').forEach(b => {
            b.classList.remove('thumb-active', 'border-black');
            b.classList.add('border-stone-200', 'opacity-60');
          });
          btn.classList.add('thumb-active', 'border-black');
          btn.classList.remove('border-stone-200', 'opacity-60');
        };
        btn.innerHTML = `<img src="${fullUrl}" alt="${escapeHTML(currentProduct.title)}" class="w-full h-full ${idx === 0 ? 'object-contain' : 'object-cover'} rounded-lg">`;
        thumbsContainer.appendChild(btn);
      });
    }

    const sloganEl = document.getElementById('pdp-slogan');
    if (sloganEl) sloganEl.textContent = currentProduct.slogan || '';

    const notesSummary = document.getElementById('pdp-notes-summary');
    if (notesSummary) notesSummary.textContent = currentProduct.notes || '';

    const link30 = document.getElementById('pdp-30ml-link');
    if (link30) {
      const travelVersion = noteProductsCatalog.find(p => p.id === `${currentProduct.id}-30ml` || (p.title.includes(currentProduct.title.replace('عطر ', '')) && p.cat === 'travel'));
      if (travelVersion) {
        const travelSlug = zidSlugMap[travelVersion.id] || travelVersion.id;
        link30.setAttribute('href', `/products/${travelSlug}`);
        link30.onclick = (e) => {
          e.preventDefault();
          NoteRouter.navigate(`/products/${travelSlug}`);
        };
        link30.classList.remove('hidden');
      } else {
        link30.classList.add('hidden');
      }
    }

    const pyrTop = document.getElementById('pdp-pyramid-top');
    if (pyrTop) pyrTop.textContent = currentProduct.top || currentProduct.notes || '';

    const pyrHeart = document.getElementById('pdp-pyramid-heart');
    if (pyrHeart) pyrHeart.textContent = currentProduct.heart || currentProduct.slogan || '';

    const pyrBase = document.getElementById('pdp-pyramid-base');
    if (pyrBase) pyrBase.textContent = currentProduct.base || 'المسك الأبيض وخشب الصندل والعنبر';

    const fullDesc = document.getElementById('pdp-full-description');
    if (fullDesc) fullDesc.innerHTML = `<p>${currentProduct.description || ''}</p>`;

    const isOutOfStock = currentProduct.in_stock === false || currentProduct.stock === 0;
    const imgContainer = document.getElementById('pdp-main-image-container');
    let stickerEl = document.getElementById('pdp-out-of-stock-sticker');
    if (isOutOfStock) {
      if (imgContainer) {
        imgContainer.classList.add('is-out-of-stock');
        if (!stickerEl) {
          stickerEl = document.createElement('span');
          stickerEl.id = 'pdp-out-of-stock-sticker';
          stickerEl.className = 'note-out-of-stock-sticker pdp-sticker out-of-stock';
          stickerEl.textContent = 'غير متاح';
          imgContainer.appendChild(stickerEl);
        }
      }
      document.querySelectorAll('button[onclick*="addToCartCurrentProduct"],button[onclick*="buyNowCurrentProduct"]').forEach(b => {
        b.disabled = true;
        b.classList.add('bg-stone-200', 'text-stone-500', 'cursor-not-allowed', 'border-stone-200');
        b.classList.remove('bg-black', 'text-white', 'hover:bg-stone-800', 'hover:bg-stone-50', 'text-black', 'border-black');
        b.innerHTML = '<span>غير متاح</span>';
      });
    } else {
      if (imgContainer) {
        imgContainer.classList.remove('is-out-of-stock');
        if (stickerEl) stickerEl.remove();
      }
      const addBtn = document.getElementById('pdp-add-cart-btn') || document.querySelector('button[onclick*="addToCartCurrentProduct"]');
      if (addBtn) {
        addBtn.disabled = false;
        addBtn.className = 'flex-grow h-12 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 shadow-md active:scale-98';
        addBtn.innerHTML = '<i class="sicon-shopping-bag text-base"></i><span>إضافة إلى السلة</span>';
      }
      const buyBtn = document.querySelector('button[onclick*="buyNowCurrentProduct"]');
      if (buyBtn) {
        buyBtn.disabled = false;
        buyBtn.className = 'w-full h-12 rounded-full border border-black hover:bg-stone-50 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 active:scale-98';
        buyBtn.innerHTML = '<i class="sicon-apple-pay text-xl"></i><span>شراء فوري عبر Apple Pay / مدى</span>';
      }
    }

    renderRelatedProducts();
  }

  function changePDPQuantity(delta) {
    pdpQuantity += delta;
    if (pdpQuantity < 1) pdpQuantity = 1;
    const qtyVal = document.getElementById('pdp-qty-val');
    if (qtyVal) qtyVal.textContent = pdpQuantity;
  }

  function addToCartCurrentProduct() {
    if (!currentProduct || currentProduct.in_stock === false || currentProduct.stock === 0) return;
    CartManager.addItem(currentProduct.id, pdpQuantity);
  }

  function buyNowCurrentProduct() {
    if (!currentProduct || currentProduct.in_stock === false || currentProduct.stock === 0) return;
    CartManager.addItem(currentProduct.id, pdpQuantity);
    NoteRouter.navigate('/cart');
  }

  function renderRelatedProducts() {
    const container = document.getElementById('pdp-related-grid');
    if (!container || !currentProduct) return;

    let related = noteProductsCatalog.filter(p => p.id !== currentProduct.id && (p.cat === currentProduct.cat || p.bestseller)).slice(0, 4);
    if (related.length < 4) {
      related = noteProductsCatalog.filter(p => p.id !== currentProduct.id).slice(0, 4);
    }

    container.innerHTML = related.map(p => {
      const zidSlug = zidSlugMap[p.id] || p.id;
      const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
      const isOutOfStock = p.in_stock === false || p.stock === 0;
      return `
        <div class="p-2 sm:p-3 flex flex-col justify-between text-center group cursor-pointer bg-transparent border border-stone-100 rounded-2xl hover:border-black/20 hover:shadow-lg transition duration-300 ${isOutOfStock ? 'is-out-of-stock product-item-out-of-stock' : ''}" onclick="NoteRouter.navigate('/products/${zidSlug}')">
          <div>
            <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 overflow-hidden">
              ${isOutOfStock ? `<span class="note-product-badge note-out-of-stock-sticker out-of-stock">غير متاح</span>${p.discount ? `<span class="absolute top-2 right-2 z-10 text-[10px] px-2 py-1 rounded-full bg-black text-white"><span>خصم</span><bdi dir="ltr">${p.discount}</bdi></span>` : ''}` : (p.tag ? `<span class="note-product-badge absolute top-2 right-2 z-10 text-[9px] font-medium px-2 py-0.5 rounded-full bg-black text-white whitespace-nowrap shadow-sm">${p.discount ? `<span>خصم</span><bdi dir="ltr">${p.discount}</bdi>` : escapeHTML(p.tag)}</span>` : '')}
              <img src="${imgUrl}" alt="${escapeHTML(p.title)}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
            </div>

            <div class="pt-1 pb-1 text-center space-y-1">
              <h4 class="text-xs sm:text-sm font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${escapeHTML(p.title)}</h4>
              <p class="text-[10px] sm:text-[11px] text-stone-400 font-normal line-clamp-1">${p.notes}</p>
              
              <div class="flex items-center justify-center gap-2 pt-1">
                <span class="text-black font-extrabold text-xs sm:text-sm">${p.price} ر.س</span>
                <span class="text-stone-400 line-through text-[10px] sm:text-xs font-normal">${p.old_price ?? ""} ر.س</span>
              </div>
            </div>
          </div>

          ${isOutOfStock ? `
          <button disabled class="w-full mt-2.5 py-2 px-3 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed flex items-center justify-center gap-2 font-bold text-[11px] shadow-none">
            <span>غير متاح</span>
          </button>
          ` : `
          <button onclick="event.stopPropagation(); CartManager.addItem('${p.id}')" class="w-full mt-2.5 py-2 px-3 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-[11px] shadow-sm">
            <span>إضافة للسلة</span>
            <i class="sicon-shopping-bag text-xs"></i>
          </button>
          `}
        </div>
      `;
    }).join('');
  }

  // 16. Category Controller
  let activeCategory = 'all';
  let categorySearchQuery = '';
  let categorySort = 'popular';

  const categoryMeta = {
    'all': {
      title: 'جميع المنتجات',
      desc: 'تصفح المجموعة الكاملة من أروع إبداعات دار نوت للعطور، توليفات نيش استثنائية وباقات حصرية صُممت لتناسب ذوقك الرفيع.'
    },
    'perfumes': {
      title: 'العطور الفاخرة (100 مل)',
      desc: 'مجموعة العطور الأساسية بتركيز Extrait de Parfum وثبات يتجاوز 24 ساعة بمكونات نادرة مستخلصة بعناية.'
    },
    'niche': {
      title: 'عطور النيش الملكية',
      desc: 'أفخم ما أبدعته دار نوت العطرية، توليفات خاصة جداً تحاكي الترف والندرة بثبات وفوحان لا يُضاهى.'
    },
    'bestsellers': {
      title: 'الأكثر مبيعاً',
      desc: 'العطور الأكثر طلباً وشهرة لدى عملاء NOTE في المملكة والخليج، اختيارات مجربة ومحبوبة بإجماع الذواقة.'
    },
    'new': {
      title: 'أحدث المنتجات والإصدارات',
      desc: 'أحدث ابتكارات دار نوت للموسم الحالي، روائح عصرية مبتكرة تمنحك إطلالة فريدة ومتميزة.'
    },
    'travel': {
      title: 'عطور بيبي (30 مل)',
      desc: 'نفس تركيز العطور الأصلية الفاخرة بحجم مدمج 30 مل مثالي للحقيبة، السفر، السيارة والهدية الراقية.'
    },
    'all-over': {
      title: 'معطر للجسم بالكامل (All-Over Spray)',
      desc: 'رذاذ فاخر شامل للجسم والشعر يغمرك بانتعاش فوري خفيف وعبق آسر يدوم طوال اليوم.'
    },
    'linen': {
      title: 'معطرات الجو والمفارش',
      desc: 'تركيبات حصرية تملأ أرجاء منزلك ومفارشك بنفحات ملكية تدوم طويلاً وتضفي لمسة من البهجة والفخامة.'
    },
    'body-care': {
      title: 'منتجات العناية بالبشرة والجسم',
      desc: 'لوشنات وزيوت ترطيب فاخرة غنية بخلاصات العطور النقية لترطيب عميق ورائحة آسرة.'
    },
    'tollah': {
      title: 'تولات مِسك ودهن عود نقي',
      desc: 'أدهان نقية فاخرة ومسك مخلط بتركيز صافٍ لمحبي التميز والأصالة الشرقية الأصيلة.'
    },
    'packages': {
      title: 'مجموعات نوت والباقات الفاخرة',
      desc: 'باقات متكاملة ومجموعات هدايا راقية تجمع بين أجمل عطور الدار بأسعار استثنائية وتغليف ملوكي.'
    }
  };

  function selectCategory(cat, updateURL = true) {
    activeCategory = cat || 'all';
    if (updateURL) {
      const newUrl = catUrlMap[activeCategory] || `/categories`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }

    // Update Pills
    document.querySelectorAll('.cat-pill').forEach(btn => {
      btn.classList.remove('cat-pill-active', 'bg-black', 'text-white', 'border-black');
      btn.classList.add('border-stone-200', 'text-stone-700');
    });
    const activeBtn = document.getElementById(`pill-${activeCategory}`);
    if (activeBtn) {
      activeBtn.classList.add('cat-pill-active', 'bg-black', 'text-white', 'border-black');
      activeBtn.classList.remove('border-stone-200', 'text-stone-700');
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    // Update Header Text
    const meta = categoryMeta[activeCategory] || categoryMeta['all'];
    const catTitle = document.getElementById('cat-title');
    if (catTitle) catTitle.textContent = meta.title;
    const catDesc = document.getElementById('cat-desc');
    if (catDesc) catDesc.textContent = meta.desc;
    document.title = `${meta.title} | دار نوت للعطور NOTE Perfumes`;

    renderCatalog();
    updateActiveNav({ route: 'category', cat: activeCategory });

    // Scroll smoothly to top of catalog if user scrolled down
    if (updateURL) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 120) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  function handleCategorySearch(val) {
    categorySearchQuery = (val || '').trim().toLowerCase();
    const clearBtn = document.getElementById('cat-search-clear');
    if (clearBtn) {
      if (categorySearchQuery.length > 0) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }
    renderCatalog();
    updateActiveNav({ route: 'category', cat: activeCategory });
  }

  function clearCatSearch() {
    const inp = document.getElementById('cat-search-input');
    if (inp) {
      inp.value = '';
      handleCategorySearch('');
      inp.focus();
    }
    const clearBtn = document.getElementById('cat-search-clear');
    if (clearBtn) clearBtn.classList.add('hidden');
  }

  function handleCategorySort(val) {
    categorySort = val;
    renderCatalog();
    updateActiveNav({ route: 'category', cat: activeCategory });
  }

  function resetCategoryFilters() {
    categorySearchQuery = '';
    const searchInp = document.getElementById('cat-search-input');
    if (searchInp) searchInp.value = '';
    categorySort = 'popular';
    const sortSelect = document.getElementById('cat-sort-select');
    if (sortSelect) sortSelect.value = 'popular';
    selectCategory('all');
  }

  function renderCatalog() {
    const container = document.getElementById('catalog-products-grid');
    const noProducts = document.getElementById('cat-no-products');
    const countEl = document.getElementById('cat-products-count');
    if (!container) return;

    refreshCategoryUI();
    let filtered = categoryProducts(activeCategory);
    const categoryTotal=filtered.length;

    // Filter by search (searches whole catalog with Arabic normalization)
    if (categorySearchQuery) {
      const normQuery = normalizeArabic(categorySearchQuery);
      filtered = filtered.filter(p => {
        const title = normalizeArabic(p.title);
        const titleEn = (p.title_en || '').toLowerCase();
        const notes = normalizeArabic(p.notes);
        const desc = normalizeArabic(p.description);
        const cat = normalizeArabic(p.cat_ar);
        return title.includes(normQuery) || 
               titleEn.includes(categorySearchQuery.toLowerCase()) || 
               notes.includes(normQuery) || 
               desc.includes(normQuery) || 
               cat.includes(normQuery);
      });
    }

    // Sort
    if (categorySort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (categorySort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (categorySort === 'rating') {
      filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    } else if (categorySort === 'newest') {
      filtered.sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at)));
    }

    if (countEl) {
      countEl.textContent = `عرض ${filtered.length} من ${categoryTotal} منتج`;
    }

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (noProducts) noProducts.classList.remove('hidden');
      return;
    }

    if (noProducts) noProducts.classList.add('hidden');

    container.innerHTML = filtered.map(p => {
      const zidSlug = zidSlugMap[p.id] || p.id;
      const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
      const isOutOfStock = p.in_stock === false || p.stock === 0;
      return `
        <div class="p-2 sm:p-3 flex flex-col justify-between text-center group cursor-pointer bg-transparent border border-stone-100 rounded-2xl hover:border-black/20 hover:shadow-lg transition duration-300 ${isOutOfStock ? 'is-out-of-stock product-item-out-of-stock' : ''}" onclick="NoteRouter.navigate('/products/${zidSlug}')">
          <div>
            <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 sm:p-4 overflow-hidden">
              ${isOutOfStock ? `<span class="note-product-badge note-out-of-stock-sticker out-of-stock">غير متاح</span>${p.discount ? `<span class="absolute top-2 right-2 z-10 text-[10px] px-2 py-1 rounded-full bg-black text-white"><span>خصم</span><bdi dir="ltr">${p.discount}</bdi></span>` : ''}` : (p.tag ? `<span class="note-product-badge absolute top-2 right-2 z-10 text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full bg-black text-white whitespace-nowrap shadow-sm">${p.discount ? `<span>خصم</span><bdi dir="ltr">${p.discount}</bdi>` : escapeHTML(p.tag)}</span>` : '')}
              <img src="${imgUrl}" alt="${escapeHTML(p.title)}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
            </div>

            <div class="pt-1 pb-1 text-center space-y-1">
              <h4 class="text-xs sm:text-sm font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${escapeHTML(p.title)}</h4>
              <p class="text-[10px] sm:text-[11px] text-stone-400 font-normal line-clamp-1">${p.notes}</p>
              
              <div class="flex items-center justify-center gap-2 pt-1">
                <span class="text-black font-extrabold text-xs sm:text-sm">${p.price} ر.س</span>
                <span class="text-stone-400 line-through text-[10px] sm:text-xs font-normal">${p.old_price ?? ""} ر.س</span>
              </div>
            </div>
          </div>

          ${isOutOfStock ? `
          <button disabled class="w-full mt-2.5 py-2 px-3 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed flex items-center justify-center gap-2 font-bold text-[11px] sm:text-xs shadow-none">
            <span>غير متاح</span>
          </button>
          ` : `
          <button onclick="event.stopPropagation(); CartManager.addItem('${p.id}')" class="w-full mt-2.5 py-2 px-3 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-[11px] sm:text-xs shadow-sm">
            <span>إضافة للسلة</span>
            <i class="sicon-shopping-bag text-xs"></i>
          </button>
          `}
        </div>
      `;
    }).join('');
  }

  // 17. Cart Page Controller
  let cartDiscountRate = 0;

  function renderCartPage() {
    document.title = 'سلة المشتريات | دار نوت للعطور NOTE Perfumes';
    const itemsContainer = document.getElementById('cart-page-items');
    const emptyState = document.getElementById('cart-page-empty');
    const summaryWrapper = document.getElementById('cart-page-summary-wrapper');
    const freeShippingText = document.getElementById('page-free-shipping-text');
    const freeShippingBar = document.getElementById('page-free-shipping-bar');

    if (!itemsContainer) return;

    const cart = CartManager.getCart();
    const total = CartManager.getTotal();
    const freeShippingThreshold = 300;

    if (cart.length === 0) {
      itemsContainer.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (summaryWrapper) summaryWrapper.classList.add('hidden');
      if (freeShippingBar) freeShippingBar.style.width = '0%';
      if (freeShippingText) freeShippingText.textContent = 'أضف منتجات بقيمة 300 ر.س لتحصل على شحن مجاني';
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (summaryWrapper) summaryWrapper.classList.remove('hidden');

    if (freeShippingBar && freeShippingText) {
      const percentage = Math.min(100, Math.round((total / freeShippingThreshold) * 100));
      freeShippingBar.style.width = percentage + '%';
      if (total >= freeShippingThreshold) {
        freeShippingText.innerHTML = '<span class="text-emerald-600 font-bold">🎉 تهانينا! لقد حصلت على شحن مجاني لكافة مدن المملكة</span>';
      } else {
        const remaining = freeShippingThreshold - total;
        freeShippingText.innerHTML = `متبقي <strong class="text-black font-extrabold">${remaining} ر.س</strong> للحصول على <span class="font-bold text-emerald-600">شحن مجاني</span>`;
      }
    }

    itemsContainer.innerHTML = cart.map(item => {
      const zidSlug = zidSlugMap[item.product_id || item.id] || item.product_id || item.id;
      const imgUrl = (item.img.startsWith('http') ? '' : ASSET_HOST) + item.img;
      return `
        <div class="note-cart-page-item py-4 sm:py-6 flex items-center justify-between gap-4 text-right">
          <div class="flex items-center gap-3 sm:gap-4 flex-grow">
            <a href="/products/${zidSlug}" onclick="NoteRouter.navigate('/products/${zidSlug}')" class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-stone-50 p-2 flex-shrink-0 flex items-center justify-center border border-stone-200/80 block">
              <img src="${imgUrl}" alt="${escapeHTML(item.title)}" class="w-full h-full object-contain">
            </a>
            <div class="space-y-1">
              <a href="/products/${zidSlug}" onclick="NoteRouter.navigate('/products/${zidSlug}')" class="hover:underline">
                <h4 class="text-xs sm:text-sm font-bold text-black">${escapeHTML(item.title)}</h4>
              </a>
              <span class="text-[11px] text-stone-400 block">${item.size || '100 مل'}</span>
              <span class="text-xs font-bold text-black sm:hidden block">${item.price} ر.س</span>
            </div>
          </div>

          <!-- Quantity Stepper -->
          <div class="flex items-center border border-stone-200 rounded-full h-8 px-2 sm:px-3 gap-2 sm:gap-3 text-xs font-bold bg-white">
            <button onclick="CartManager.updateQuantity('${item.id}', -1); renderCartPage();" class="text-stone-500 hover:text-black w-4 text-center">-</button>
            <span class="min-w-[16px] text-center">${item.quantity}</span>
            <button onclick="CartManager.updateQuantity('${item.id}', 1); renderCartPage();" class="text-stone-500 hover:text-black w-4 text-center">+</button>
          </div>

          <!-- Total for line -->
          <div class="hidden sm:block text-left min-w-[80px]">
            <span class="text-sm font-extrabold text-black">${item.price * item.quantity} ر.س</span>
          </div>

          <!-- Delete -->
          <button onclick="CartManager.removeItem('${item.id}'); renderCartPage();" class="text-stone-400 hover:text-rose-600 transition p-1" aria-label="حذف المنتج من السلة" title="حذف" style="display:inline-flex;align-items:center;gap:4px;min-width:44px;min-height:44px;font-size:11px">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/></svg><span>حذف</span>
          </button>
        </div>
      `;
    }).join('');

    updateCartFinancials(total);
    updateCheckoutUpsell(cart);
    renderCartPageRecommendations(cart);
  }

  function updateCheckoutUpsell(cart) {
    const upsellCard = document.getElementById('checkout-upsell-card');
    if (!upsellCard) return;

    const inCartIds = new Set(cart.map(i => i.id));
    const upsellPool = [
      { id: 'for-her-30ml', title: 'عطر نوت فور هير (30 مل)', price: 89, old_price: 199, img: '/products/NOTE_For_Her_30ml_v02.webp' },
      { id: 'for-him-30ml', title: 'عطر نوت فور هِم (30 مل)', price: 89, old_price: 199, img: '/products/NOTE_For_Him_30ml_v02.webp' },
      { id: 'powderose-30ml', title: 'عطر باودر روز (30 مل)', price: 89, old_price: 199, img: '/products/NOTE_Powderose_30ml_v01.webp' },
      { id: 'musk-toffee-oil', title: 'تولة مسك توفي نقي', price: 69, old_price: 140, img: '/products/NOTE_Musk_Toffee_v01.webp' },
      { id: 'all-over-royal-tobacco', title: 'معطر الجسم رويال توباكو', price: 99, old_price: 180, img: '/products/NOTE_Royal_Tobacco_All_Over_v01.webp' }
    ];

    const item = upsellPool.find(u => !inCartIds.has(u.id));
    if (!item || cart.length === 0) {
      upsellCard.classList.add('hidden');
      return;
    }

    upsellCard.classList.remove('hidden');
    const imgUrl = (item.img.startsWith('http') ? '' : ASSET_HOST) + item.img;
    const imgEl = document.getElementById('upsell-img');
    if (imgEl) imgEl.src = imgUrl;
    const titleEl = document.getElementById('upsell-title');
    if (titleEl) titleEl.textContent = item.title;
    const priceEl = document.getElementById('upsell-price');
    if (priceEl) priceEl.textContent = `${item.price} ر.س`;
    const oldPriceEl = document.getElementById('upsell-old-price');
    if (oldPriceEl) oldPriceEl.textContent = `${item.old_price} ر.س`;
    
    const btn = document.getElementById('upsell-add-btn');
    if (btn) {
      btn.onclick = function() {
        CartManager.addItem(item.id, 1);
        renderCartPage();
        CartManager.showToast('تمت إضافة ' + item.title + ' لطلبك بنجاح');
      };
    }
  }

  function renderCartPageRecommendations(cart) {
    const recsGrid = document.getElementById('cart-page-recs-grid');
    const recsSec = document.getElementById('cart-page-recommendations-section');
    if (!recsGrid || !recsSec) return;

    if (cart.length === 0) {
      recsSec.classList.add('hidden');
      return;
    }
    recsSec.classList.remove('hidden');

    const inCartIds = new Set(cart.map(i => i.id));
    const pool = [
      'for-him-30ml',
      'for-her-30ml',
      'powderose-30ml',
      'musk-toffee-oil',
      'all-over-royal-tobacco',
      'all-over-choconilla',
      'linen-royal-tobacco',
      'linen-oud-rosewood',
      'roayal-tobacco',
      'note-for-him',
      'oud-rosewood',
      'musk',
      'aura'
    ];

    const recs = pool
      .filter(id => !inCartIds.has(id))
      .map(id => noteProductsCatalog.find(p => p.id === id))
      .filter(p => p && p.in_stock !== false && p.stock !== 0)
      .slice(0, 4);

    recsGrid.innerHTML = recs.map(p => {
      const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
      const zidSlug = zidSlugMap[p.id] || p.id;
      return `
        <div class="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex flex-col justify-between text-center group hover:border-black transition">
          <div>
            <div class="relative aspect-square mb-2 p-2 flex items-center justify-center bg-white rounded-xl border border-stone-100 overflow-hidden cursor-pointer" onclick="NoteRouter.navigate('/products/${zidSlug}')">
              <img src="${imgUrl}" alt="${escapeHTML(p.title)}" class="w-full h-full object-contain group-hover:scale-105 transition duration-300">
            </div>
            <h5 class="text-xs font-bold text-black line-clamp-1 mb-1 cursor-pointer hover:underline" onclick="NoteRouter.navigate('/products/${zidSlug}')">${escapeHTML(p.title)}</h5>
            <p class="text-[10px] text-stone-400 line-clamp-1 mb-2">${p.size || '100 مل'}</p>
          </div>
          <div>
            <div class="flex items-center justify-center gap-1.5 mb-2">
              <span class="text-xs font-extrabold text-black">${p.price} ر.س</span>
              ${p.old_price ? `<span class="text-[10px] text-stone-400 line-through">${p.old_price ?? ""} ر.س</span>` : ''}
            </div>
            <button onclick="CartManager.addItem('${p.id}', 1); renderCartPage();" class="w-full py-2 rounded-full bg-black hover:bg-stone-800 text-white text-[11px] font-bold transition flex items-center justify-center gap-1 active:scale-95 shadow-xs">
              <i class="sicon-plus text-[10px]"></i>
              <span>أضف للسلة</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function applyCartCoupon() {
    const msg=document.getElementById('coupon-msg');
    if(msg) {msg.textContent='يمكنك إدخال كوبون الخصم والتحقق منه في صفحة الدفع الآمنة.';msg.classList.remove('hidden');}
  }

  function updateCartFinancials(subtotal) {
    const amount=Number.isFinite(Number(subtotal)) ? Number(subtotal) : 0;
    for(const id of ['page-subtotal','page-grand-total']) {
      const el=document.getElementById(id);
      if(el) el.textContent=amount.toLocaleString('en-US',{maximumFractionDigits:2})+' ر.س';
    }
    document.getElementById('discount-row')?.classList.add('hidden');
    const shipping=document.getElementById('page-shipping');
    if(shipping) shipping.textContent='يُحسب عند الدفع';
  }

  async function proceedToCheckout() {
    const cart = CartManager.getCart();
    if (!cart || cart.length === 0) {
      alert('السلة فارغة حالياً!');
      return;
    }

    const btns = document.querySelectorAll('button[onclick*="proceedToCheckout"], a[onclick*="proceedToCheckout"], #cart-checkout-btn');
    btns.forEach(b => {
      b.innerHTML = '<span class="inline-flex items-center gap-2"><svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> <span>جاري الانتقال للدفع الآمن...</span></span>';
      b.style.pointerEvents = 'none';
      b.style.opacity = '0.85';
    });

    try {
      if (window.zid && window.zid.cart && typeof window.zid.cart.addProduct === 'function') {
        for (const item of cart) {
          const zidUuid = ZID_PRODUCT_MAP[item.id] || item.id;
          try {
            await window.zid.cart.addProduct({
              product_id: zidUuid,
              quantity: item.quantity || 1
            });
          } catch (e) {
            console.warn('Sync notice:', item.id, e);
          }
        }
        window.location.href = '/checkout';
        return;
      }
    } catch (err) {
      console.error('Zid sync error:', err);
    }

    window.location.href = 'https://note-sa.com/checkout';
  }

  // 18. Contact Form Handler
  function handleContactSubmit(e) {
    e.preventDefault();
    const successEl = document.getElementById('contact-success-msg');
    if (successEl) successEl.classList.remove('hidden');
    e.target.reset();
    setTimeout(() => {
      if (successEl) successEl.classList.add('hidden');
    }, 5000);
  }

  // 19. Router Engine
  const NoteRouter = {
    resolveProductId: function(path, params) {
      if (params.get('id')) return params.get('id');
      const decoded = decodeURIComponent(path).toLowerCase();
      for (const p of noteProductsCatalog) {
        if (decoded.includes(p.id)) return p.id;
      }
      for (const k in zidSlugMap) {
        if (decoded.includes(zidSlugMap[k])) return k;
      }
      for (const p of noteProductsCatalog) {
        const cleanTitle = p.title.replace('عطر ', '').trim().toLowerCase();
        if (decoded.includes(cleanTitle)) return p.id;
      }
      return 'roayal-tobacco';
    },

    resolveCategory: function(path, params) {
      if (params.get('cat')) return params.get('cat');
      const decoded = decodeURIComponent(path).toLowerCase();
      if (decoded.includes('perfumes')) return 'perfumes';
      if (decoded.includes('نيش') || decoded.includes('niche')) return 'niche';
      if (decoded.includes('مبيعا') || decoded.includes('bestseller')) return 'bestsellers';
      if (decoded.includes('new')) return 'new';
      if (decoded.includes('30ml') || decoded.includes('travel')) return 'travel';
      if (decoded.includes('all-over') || decoded.includes('جسم')) return 'all-over';
      if (decoded.includes('package') || decoded.includes('مجموعات')) return 'packages';
      if (decoded.includes('linen') || decoded.includes('معطرات')) return 'linen';
      if (decoded.includes('tollah') || decoded.includes('تول')) return 'tollah';
      if (decoded.includes('body') || decoded.includes('عناية')) return 'body-care';
      return 'all';
    },

    detectRoute: function() {
      const path = decodeURIComponent(window.location.pathname).toLowerCase();
      const params = new URLSearchParams(window.location.search);

      if (/\/products?\//.test(path) || params.has('id')) {
        return { route: 'product', id: this.resolveProductId(path, params) };
      }
      if (path === '/products' || path.includes('/categor') || params.has('cat')) {
        return { route: 'category', cat: this.resolveCategory(path, params) };
      }
      if (path.includes('/cart')) {
        return { route: 'cart' };
      }
      if (path.includes('/faq')) {
        return { route: 'faqs' };
      }
      if (path.includes('/contact')) {
        return { route: 'contact' };
      }
      if (path.includes('/privacy')) {
        return { route: 'privacy' };
      }
      if (path.includes('/terms')) {
        return { route: 'terms' };
      }
      if (path.includes('/refund')) {
        return { route: 'refund' };
      }
      return { route: 'home' };
    },

    navigate: function(url) {
      if (!url) return;
      if (url.startsWith('http') && !url.includes(window.location.hostname)) {
        window.location.href = url;
        return;
      }
      window.history.pushState({ path: url }, '', url);
      this.route();
      window.scrollTo({ top: 0, behavior: 'instant' });
    },

    route: function() {
      const target = this.detectRoute();
      console.log("NOTE Router Target:", target);

      const contentEl = document.getElementById('page-content');
      if (!contentEl) {
        console.warn("page-content container missing, re-mounting shell...");
        mountShell();
        return;
      }

      // Reset scroll listeners
      window.removeEventListener('scroll', handleHeaderScroll);

      if (target.route === 'home') {
        document.title = "NOTE Perfumes | دار نوت للعطور الفاخرة";
        contentEl.innerHTML = T.home;
        initSliders();
        initHeroCarousel();
        initOffersCarousel();
        handleHeaderScroll();
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
      } else if (target.route === 'product') {
        contentEl.innerHTML = T.product;
        initPDP(target.id);
        handleHeaderScroll();
      } else if (target.route === 'category') {
        contentEl.innerHTML = T.category;
        selectCategory(target.cat, false);
        const searchParam = new URLSearchParams(window.location.search).get('search');
        if (searchParam) {
          setTimeout(() => {
            const inp = document.getElementById('cat-search-input');
            if (inp) inp.value = searchParam;
            handleCategorySearch(searchParam);
          }, 30);
        }
        handleHeaderScroll();
      } else if (target.route === 'cart') {
        contentEl.innerHTML = T.cart;
        renderCartPage();
        handleHeaderScroll();
      } else if (target.route === 'faqs') {
        document.title = "الأسئلة الشائعة ومركز المساعدة | NOTE Perfumes";
        contentEl.innerHTML = T.faqs;
        handleHeaderScroll();
      } else if (target.route === 'contact') {
        document.title = "تواصل معنا | دار نوت للعطور NOTE Perfumes";
        contentEl.innerHTML = T.contact;
        handleHeaderScroll();
      } else if (target.route === 'privacy') {
        document.title = "سياسة الخصوصية | دار نوت للعطور NOTE Perfumes";
        contentEl.innerHTML = T.privacy;
        handleHeaderScroll();
      } else if (target.route === 'terms') {
        document.title = "الشروط والأحكام | دار نوت للعطور NOTE Perfumes";
        contentEl.innerHTML = T.terms;
        handleHeaderScroll();
      } else if (target.route === 'refund') {
        document.title = "سياسة الاستبدال والاسترجاع والضمان الذهبي | NOTE Perfumes";
        contentEl.innerHTML = T.refund;
        handleHeaderScroll();
      }

      CartManager.updateBadge();
      updateActiveNav(target);
    }
  };

  function getLinkCategory(link) {
    if (!link) return null;
    if (link.dataset && link.dataset.cat) return link.dataset.cat;
    const text = (link.textContent || '').trim();
    const href = link.getAttribute('href') || '';
    
    if (text === 'الرئيسية' || href === '/' || href === '') return 'home';
    if (text.includes('جميع المنتجات') || href === '/categories' || href === '/products' || href.includes('cat=all')) return 'all';
    if (text.includes('النيش') || href.includes('1500261') || href.includes('1759040') || href.includes('niche')) return 'niche';
    if (text.includes('الأكثر مبيع') || text.includes('الأكثر مبيعا') || href.includes('1697258') || href.includes('bestseller')) return 'bestsellers';
    if (text.includes('أحدث المنتجات') || text.includes('جديد') || href.includes('1327929') || href.includes('1759041') || href.includes('new')) return 'new';
    if (text.includes('العطور') || href.includes('1748533') || href.includes('perfumes')) return 'perfumes';
    if (text.includes('30') || href.includes('1310036') || href.includes('1759043') || href.includes('travel')) return 'travel';
    if (text.includes('جسم') || href.includes('1688838') || href.includes('1759042') || href.includes('all-over')) return 'all-over';
    if (text.includes('باقات') || text.includes('مجموعات') || href.includes('1752110') || href.includes('1759047') || href.includes('packages')) return 'packages';
    if (text.includes('مفارش') || href.includes('1310037') || href.includes('1759044') || href.includes('linen')) return 'linen';
    if (text.includes('تول') || href.includes('1421002') || href.includes('tollah')) return 'tollah';
    if (text.includes('عناية') || href.includes('1750048') || href.includes('1759046') || href.includes('body')) return 'body-care';
    return null;
  }

  function updateActiveNav(target) {
    const navLinks = document.querySelectorAll('#nav-links a, header nav a');
    if (!navLinks || navLinks.length === 0) return;
    
    let activeKey = 'home';
    if (target) {
      if (target.route === 'home') activeKey = 'home';
      else if (target.route === 'category') activeKey = target.cat || 'all';
      else activeKey = null;
    } else if (typeof NoteRouter !== 'undefined' && NoteRouter.detectRoute) {
      const detected = NoteRouter.detectRoute();
      if (detected.route === 'home') activeKey = 'home';
      else if (detected.route === 'category') activeKey = detected.cat || 'all';
      else activeKey = null;
    }
    
    const navAliases = {'zid-1748533':'perfumes','zid-1759040':'niche','zid-1697258':'bestsellers','zid-1327929':'new'};
    activeKey = navAliases[activeKey] || activeKey;
    navLinks.forEach(link => {
      const linkCat = getLinkCategory(link);
      const isMatch = activeKey && (linkCat === activeKey);
      
      if (isMatch) {
        link.classList.add('border-b-2', 'border-current', 'active-link');
        link.style.borderBottom = '2px solid currentColor';
      } else {
        link.classList.remove('border-b-2', 'border-current', 'active-link');
        link.style.borderBottom = '2px solid transparent';
      }
    });
  }

  function dismissZidLoader() {
    document.getElementById('loader-container')?.remove();
  }

  // 20. Shell Mounter (Instant Zero-Delay Synchronous Execution)
  function mountShell() {
    const mainEl = document.querySelector('.tp-home') || 
                   document.querySelector('.main.app-content') || 
                   document.querySelector('.app-content') || 
                   document.querySelector('main') || 
                   document.body;

    if (!mainEl) {
      setTimeout(mountShell, 50);
      return;
    }

    // Remove Rozia footers, headers and native sections
    document.querySelectorAll('[section-id], footer:not(#note-store-footer), .tp-footer-area, .tp-bar-header, header.header-nav, .whatsapp-icon, .footer').forEach(el => {
      el.remove();
    });

    // Check if storefront shell already mounted
    let shell = document.getElementById('note-luxury-storefront');
    if (!shell) {
      mainEl.innerHTML = '';
      shell = document.createElement('div');
      shell.id = 'note-luxury-storefront';
      shell.className = 'w-full bg-white text-black antialiased selection:bg-black selection:text-white min-h-screen flex flex-col justify-between';
      
      shell.innerHTML = `
        ${T.header}
        <div id="page-content" class="w-full flex-grow"></div>
        ${T.footer}
        ${T.modals}
        ${T.drawer}
      `;

      const initialDrawer=shell.querySelector('#cart-drawer'),initialOverlay=shell.querySelector('#cart-drawer-overlay');
      if(initialDrawer){initialDrawer.hidden=true;initialDrawer.setAttribute('aria-hidden','true');}
      if(initialOverlay)initialOverlay.hidden=true;
      mainEl.appendChild(shell);

      // Clean up duplicate native Rozia injections
      const cleanupInterval = setInterval(() => {
        document.querySelectorAll('[section-id], footer:not(#note-store-footer), .tp-footer-area, .tp-bar-header, header.header-nav, .whatsapp-icon, .footer').forEach(el => el.remove());
        Array.from(mainEl.children).forEach(child => {
          if (child !== shell && child.id !== 'note-luxury-storefront') {
            child.remove();
          }
        });
      }, 300);
      setTimeout(() => clearInterval(cleanupInterval), 3000);
    }

    NoteRouter.route();
    const revealStorefront=()=>{
      document.body.classList.add('note-ready');
      dismissZidLoader();
    };
    if(liveCatalogReady) revealStorefront();
    ZidSyncManager.fetchLiveCatalog(10000).then(()=>{
      ZidSyncManager.refreshDomPrices();
    }).finally(revealStorefront);
  }

  // 21. Global Link Interception for Instant SPA Navigation
  document.addEventListener('click', function(e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (/^\/(checkout|auth|account)(\/|\?|$)/.test(href) || href.includes('native=1')) return;

    if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:') || href.includes('wa.me')) {
      return;
    }
    if (a.getAttribute('target') === '_blank') {
      return;
    }

    if (href.startsWith('/') || href.startsWith('./') || href.includes(window.location.hostname)) {
      e.preventDefault();
      closeMobileMenu();
      closeSearchModal();
      CartManager.closeDrawer();
      NoteRouter.navigate(href);
    }
  });

  // Handle browser back/forward
  window.addEventListener('popstate', function() {
    NoteRouter.route();
  });

  // Global Escape key listener to close modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSearchModal();
      closeMobileMenu();
      CartManager.closeDrawer();
      closeQuickView();
    }
  });

  const navHoverStyle=document.createElement('style');navHoverStyle.textContent='#nav-links a:hover,#nav-links a:focus-visible{border-bottom:2px solid currentColor!important;}';document.head.append(navHoverStyle);
  const badgeStyle=document.createElement('style');badgeStyle.textContent=`
.note-product-badge,#pdp-discount-badge {font-family:Arial,Tahoma,sans-serif!important;font-size:14px!important;font-weight:700!important;line-height:1.4!important;padding:7px 12px!important;min-height:34px;display:inline-flex!important;align-items:center;justify-content:center;gap:5px;direction:rtl;white-space:nowrap!important;box-sizing:border-box;}
.note-product-badge bdi {font-family:Arial,sans-serif!important;direction:ltr;unicode-bidi:isolate;}
@media(max-width:639px){.note-product-badge,#pdp-discount-badge{font-size:13px!important;padding:6px 10px!important;min-height:31px;}}
`;document.head.append(badgeStyle);
  const integrationStyles=document.createElement("style");integrationStyles.id="note-live-styles";integrationStyles.textContent="/* NOTE 4.3: High-Visibility Cart Items, Micro-Compact Recommendations & Seamless Zid Loader */\n#cart-drawer:not(.hidden):not([hidden]) {\n  display: flex !important;\n  flex-direction: column !important;\n  height: 100vh !important;\n  height: 100dvh !important;\n  max-height: 100dvh !important;\n  overflow: hidden !important;\n}\n\n#cart-drawer-items {\n  flex: 1 1 auto !important;\n  overflow-y: auto !important;\n  min-height: 160px !important;\n  max-height: calc(100dvh - 280px) !important;\n  padding: 12px 16px !important;\n  overscroll-behavior: contain !important;\n  -webkit-overflow-scrolling: touch !important;\n}\n\n.note-cart-item {\n  display: flex !important;\n  align-items: center !important;\n  gap: 12px !important;\n  padding: 10px 12px !important;\n  margin-bottom: 8px !important;\n  background: #ffffff !important;\n  border: 1px solid #f0eee9 !important;\n  border-radius: 14px !important;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.03) !important;\n  text-align: right !important;\n}\n\n#cart-drawer-recommendations {\n  padding: 4px 14px 6px !important;\n  padding: 6px 14px !important;\n  margin: 0 !important;\n  background: #fafaf9 !important;\n  border-top: 1px solid #f0eee9 !important;\n  border-bottom: 1px solid #f0eee9 !important;\n  flex-shrink: 0 !important;\n}\n\n#cart-drawer-recommendations h3,\n#cart-drawer-recommendations h2,\n#cart-drawer-recommendations .note-recs-title {\n  font-size: 10px !important;\n  font-weight: 700 !important;\n  color: #57534e !important;\n  margin-bottom: 4px !important;\n}\n\n.note-compact-recs {\n  display: flex !important;\n  gap: 8px !important;\n  overflow-x: auto !important;\n  scrollbar-width: none !important;\n  scroll-snap-type: none !important;\n  padding: 2px 0 4px !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  overscroll-behavior-x: contain !important;\n  -webkit-overflow-scrolling: touch !important;\n}\n.note-compact-recs::-webkit-scrollbar {\n  display: none !important;\n}\n\n.note-mini-card {\n  flex: 0 0 auto !important;\n  width: auto !important;\n  max-width: 175px !important;\n  min-width: 135px !important;\n  height: 38px !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: space-between !important;\n  gap: 6px !important;\n  padding: 3px 6px 3px 4px !important;\n  background: #ffffff !important;\n  border: 1px solid #e7e5e4 !important;\n  border-radius: 9999px !important;\n  box-sizing: border-box !important;\n  box-shadow: 0 1px 2px rgba(0,0,0,0.02) !important;\n  color: #111 !important;\n  text-align: right !important;\n}\n\n.note-mini-card a {\n  display: inline-flex !important;\n  align-items: center !important;\n  gap: 6px !important;\n  text-decoration: none !important;\n  color: inherit !important;\n  min-width: 0 !important;\n  flex: 1 1 auto !important;\n}\n\n.note-mini-card img {\n  width: 28px !important;\n  height: 28px !important;\n  object-fit: contain !important;\n  border-radius: 9999px !important;\n  background: #fafaf9 !important;\n  flex-shrink: 0 !important;\n}\n\n.note-mini-card .note-mini-info {\n  display: flex !important;\n  flex-direction: column !important;\n  min-width: 0 !important;\n  line-height: 1.15 !important;\n}\n\n.note-mini-card .note-mini-title {\n  font-size: 9.5px !important;\n  font-weight: 700 !important;\n  color: #111 !important;\n  white-space: nowrap !important;\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  max-width: 65px !important;\n  display: block !important;\n}\n\n.note-mini-card .note-mini-price {\n  font-size: 9.5px !important;\n  font-weight: 800 !important;\n  color: #a58b52 !important;\n  white-space: nowrap !important;\n  display: block !important;\n}\n\n.note-mini-card button {\n  flex-shrink: 0 !important;\n  width: auto !important;\n  min-width: 32px !important;\n  height: 24px !important;\n  padding: 0 7px !important;\n  font-size: 9.5px !important;\n  font-weight: 700 !important;\n  border-radius: 9999px !important;\n  background: #111111 !important;\n  color: #ffffff !important;\n  margin: 0 !important;\n  border: none !important;\n  cursor: pointer !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  transition: background 0.15s, transform 0.15s !important;\n}\n\n.note-mini-card button:hover {\n  background: #333333 !important;\n}\n\n.note-mini-card button:active {\n  transform: scale(0.92) !important;\n}\n\n#cart-drawer-footer {\n  padding: 12px 16px 14px !important;\n  border-top: 1px solid #f0eee9 !important;\n  background: #ffffff !important;\n  flex-shrink: 0 !important;\n}\n\n#cart-page-recommendations-section {\n  margin-top: 20px !important;\n  padding: 14px !important;\n  border-radius: 16px !important;\n}\n#cart-page-recommendations-section h3,\n#cart-page-recommendations-section h2 {\n  font-size: 13px !important;\n  margin-bottom: 8px !important;\n}\n\n.note-bundle-options {\n  margin: 18px 0;\n  padding: 16px;\n  border: 1px solid #d6d3d1;\n  border-radius: 14px;\n  clear: both;\n  width: 100%;\n  font-size: 13px;\n}\n.note-bundle-options h3 {\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.note-bundle-options fieldset {\n  margin: 12px 0;\n  border: 0;\n  padding: 0;\n}\n.note-bundle-options legend {\n  font-weight: 700;\n  margin-bottom: 6px;\n}\n.note-bundle-options label {\n  display: block;\n  font-size: 12px;\n  margin: 6px 0;\n}\n.note-bundle-options select {\n  display: block;\n  width: 100%;\n  min-height: 44px;\n  background: white;\n  color: #111;\n  border: 1px solid #a8a29e;\n  border-radius: 8px;\n  padding: 9px;\n  margin-top: 4px;\n}\n.note-bundle-options select:focus-visible,\n.note-mini-card button:focus-visible {\n  outline: 2px solid #a58b52;\n  outline-offset: 3px;\n}\n\n.note-empty-products {\n  padding: 16px;\n  font-size: 13px;\n  color: #78716c;\n}\n\nbutton:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n\n@media(prefers-reduced-motion:reduce){\n  .note-compact-recs{scroll-behavior:auto!important}\n}\n\nbutton[aria-label=\"\u062d\u0630\u0641 \u0627\u0644\u0645\u0646\u062a\u062c \u0645\u0646 \u0627\u0644\u0633\u0644\u0629\"] {\n  color: #78716c !important;\n  transition: color 0.15s ease !important;\n}\nbutton[aria-label=\"\u062d\u0630\u0641 \u0627\u0644\u0645\u0646\u062a\u062c \u0645\u0646 \u0627\u0644\u0633\u0644\u0629\"]:hover {\n  color: #be123c !important;\n}\n\n/* Continuous Luxury Brand Loader - Active from frame 0 until .note-ready is added */\nbody:not(.note-ready)::before {\n  content: \"\" !important;\n  position: fixed !important;\n  inset: 0 !important;\n  width: 100vw !important;\n  height: 100vh !important;\n  height: 100dvh !important;\n  background-color: #ffffff !important;\n  background-image: url('https://youssefrasheed.github.io/note-zid-styles/logo_dark_crisp.png') !important;\n  background-repeat: no-repeat !important;\n  background-position: center calc(50% - 25px) !important;\n  background-size: 130px auto !important;\n  z-index: 99999999 !important;\n  pointer-events: all !important;\n  opacity: 1 !important;\n  visibility: visible !important;\n  animation: none !important;\n  transition: opacity 0.4s ease-out, visibility 0.4s ease-out !important;\n}\n\nbody:not(.note-ready)::after {\n  content: \"\" !important;\n  position: fixed !important;\n  top: calc(50% + 40px) !important;\n  left: 50% !important;\n  margin-left: -13px !important;\n  width: 26px !important;\n  height: 26px !important;\n  border: 2.5px solid #eceae5 !important;\n  border-top-color: #121212 !important;\n  border-radius: 50% !important;\n  z-index: 999999999 !important;\n  animation: noteSpinRing 0.75s linear infinite !important;\n  pointer-events: none !important;\n  opacity: 1 !important;\n  visibility: visible !important;\n  transition: opacity 0.4s ease-out, visibility 0.4s ease-out !important;\n}\n\nbody.note-ready::before,\nbody.note-ready::after {\n  opacity: 0 !important;\n  visibility: hidden !important;\n  pointer-events: none !important;\n}\n\n@keyframes noteLoaderPulse {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(0.96);\n    opacity: 0.75;\n  }\n}\n\n@keyframes noteSpinRing {\n  to { transform: rotate(360deg); }\n}\n\nbody[class*=\"checkout\"]::before,\nbody[class*=\"checkout\"]::after,\nbody[class*=\"auth\"]::before,\nbody[class*=\"auth\"]::after,\nbody[class*=\"account\"]::before,\nbody[class*=\"account\"]::after {\n  display: none !important;\n  opacity: 0 !important;\n  visibility: hidden !important;\n}\n\n#loader-container {\n  display: none !important;\n}\n\nbody:not(.note-ready) section[section-id],\nbody:not(.note-ready) .tp-home,\nbody:not(.note-ready) .tp-bar-header,\nbody:not(.note-ready) header.header-nav,\nbody:not(.note-ready) footer:not(#note-store-footer) {\n  display: none !important;\n  visibility: hidden !important;\n}\n\n#cart-drawer-recommendations .flex > span:last-child {\n  display: none !important;\n}\n\n/* Active Nav Links Underline (100% Reference Parity) */\n#nav-links a.border-b-2,\nheader nav a.border-b-2,\n#nav-links a.active-link,\nheader nav a.active-link {\n  border-bottom: 2px solid currentColor !important;\n  padding-bottom: 2px !important;\n  opacity: 1 !important;\n}\n\n#nav-links a:not(.active-link),\nheader nav a:not(.active-link) {\n  border-bottom: 2px solid transparent !important;\n  padding-bottom: 2px !important;\n}\n\n/* Bottom Navigation Bar Cart Badge Perfect Centering */\n.cart-badge,\n.header-sm .cart-badge,\n.cart-sm .cart-badge,\n.cart-btn .cart-badge {\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  text-align: center !important;\n  line-height: 1 !important;\n  direction: ltr !important;\n  min-width: 18px !important;\n  height: 18px !important;\n  padding: 0 2px !important;\n  margin: 0 !important;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif !important;\n  font-feature-settings: \"tnum\" !important;\n  font-variant-numeric: tabular-nums !important;\n  font-size: 11px !important;\n  font-weight: 800 !important;\n  border-radius: 9999px !important;\n  box-sizing: border-box !important;\n  position: absolute !important;\n  top: -5px !important;\n  left: -2px !important;\n  background-color: #f44336 !important;\n  color: #ffffff !important;\n}\n\n/* Out of Stock (\"\u063a\u064a\u0631 \u0645\u062a\u0627\u062d\") Luxury Sticker & State */\n.note-out-of-stock-sticker,\n.out-of-stock,\n.tp-product-image .out-of-stock {\n  position: absolute !important;\n  top: 50% !important;\n  left: 50% !important;\n  transform: translate(-50%, -50%) rotate(-18deg) !important;\n  z-index: 25 !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  width: max-content !important;\n  height: max-content !important;\n  background: #e11d48 !important;\n  color: #ffffff !important;\n  font-family: inherit !important;\n  font-size: 11px !important;\n  font-weight: 800 !important;\n  letter-spacing: 0.5px !important;\n  padding: 4px 14px !important;\n  border-radius: 9999px !important;\n  border: 1.5px solid #ffffff !important;\n  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.35) !important;\n  pointer-events: none !important;\n  white-space: nowrap !important;\n}\n\n@media (min-width: 640px) {\n  .note-out-of-stock-sticker,\n  .out-of-stock,\n  .tp-product-image .out-of-stock {\n    font-size: 12px !important;\n    padding: 5px 16px !important;\n  }\n}\n\n.note-out-of-stock-sticker.pdp-sticker {\n  font-size: 14px !important;\n  padding: 6px 22px !important;\n  border-width: 2px !important;\n  box-shadow: 0 6px 20px rgba(225, 29, 72, 0.4) !important;\n}\n\n@media (min-width: 640px) {\n  .note-out-of-stock-sticker.pdp-sticker {\n    font-size: 16px !important;\n    padding: 8px 26px !important;\n  }\n}\n\n.is-out-of-stock img,\n.product-item-out-of-stock img,\n#pdp-main-image-container.is-out-of-stock #pdp-main-image {\n  filter: grayscale(0.55) opacity(0.85) !important;\n  transition: filter 0.3s ease !important;\n}\n\n/* Recommended Products Modern Desktop & Mobile Scroll */\n.note-compact-recs {\n  display: flex !important;\n  gap: 8px !important;\n  overflow-x: auto !important;\n  scrollbar-width: thin !important;\n  scrollbar-color: #d6d3d1 transparent !important;\n  scroll-snap-type: none !important;\n  padding: 4px 2px 6px !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  overscroll-behavior-x: contain !important;\n  -webkit-overflow-scrolling: touch !important;\n  cursor: grab !important;\n  user-select: none !important;\n}\n.note-compact-recs:active {\n  cursor: grabbing !important;\n}\n.note-compact-recs::-webkit-scrollbar {\n  display: block !important;\n  height: 4px !important;\n}\n.note-compact-recs::-webkit-scrollbar-track {\n  background: #f5f5f4 !important;\n  border-radius: 9999px !important;\n}\n.note-compact-recs::-webkit-scrollbar-thumb {\n  background: #d6d3d1 !important;\n  border-radius: 9999px !important;\n}\n.note-compact-recs::-webkit-scrollbar-thumb:hover {\n  background: #78716c !important;\n}\n\n.note-recs-nav {\n  display: inline-flex !important;\n  align-items: center !important;\n  gap: 4px !important;\n}\n.note-recs-btn {\n  width: 22px !important;\n  height: 22px !important;\n  border-radius: 9999px !important;\n  border: 1px solid #e7e5e4 !important;\n  background: #ffffff !important;\n  color: #1c1917 !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  cursor: pointer !important;\n  transition: all 0.15s ease !important;\n  padding: 0 !important;\n  flex-shrink: 0 !important;\n  box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;\n}\n.note-recs-btn:hover {\n  background: #000000 !important;\n  color: #ffffff !important;\n  border-color: #000000 !important;\n}\n.note-recs-btn:active {\n  transform: scale(0.92) !important;\n}\n\n/* More legible cart products and recommendations, including narrow screens. */\n.note-mini-card {min-width:210px!important;max-width:240px!important;height:60px!important;padding:6px 8px!important;gap:8px!important;}\n.note-mini-card img {width:42px!important;height:42px!important;}\n.note-mini-card .note-mini-title {font-size:12px!important;max-width:118px!important;white-space:normal!important;display:-webkit-box!important;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.35!important;}\n.note-mini-card .note-mini-price {font-size:12px!important;}\n.note-mini-card button {font-size:11px!important;min-width:38px!important;height:34px!important;}\n#cart-drawer-recommendations h3,#cart-drawer-recommendations h2 {font-size:12px!important;}\n.note-cart-item > a {width:76px!important;height:76px!important;}\n.note-cart-item h4 {font-size:14px!important;line-height:1.45!important;-webkit-line-clamp:2!important;}\n.note-cart-item .text-\\[11px\\] {font-size:12px!important;}\n.note-cart-page-item h4 {font-size:14px!important;line-height:1.45!important;}\n.note-cart-page-item > div:first-child {min-width:0;}\n.note-cart-page-item > div:first-child > a {width:80px!important;height:80px!important;}\n.note-cart-page-item > div:first-child > div {min-width:0;}\n.note-cart-page-item .text-\\[11px\\] {font-size:12px!important;}\n.note-cart-page-item .font-bold.text-black {font-size:14px!important;}\n@media(max-width:639px) {\n .note-cart-page-item {display:grid!important;grid-template-columns:minmax(0,1fr) auto;gap:10px!important;}\n .note-cart-page-item > div:first-child {grid-column:1 / -1;}\n .note-cart-page-item > div:nth-child(2) {justify-self:start;min-height:38px;}\n .note-cart-page-item > div:nth-child(2) button {min-width:28px;min-height:34px;}\n .note-cart-page-item > button {justify-self:end;}\n}\n";document.head.append(integrationStyles);

  // Live storefront integration. Kept separately so rebuilding templates preserves fixes.
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const KNOWN_PRODUCT_FALLBACKS = {
    '83561f07-7f51-43a4-a632-2030d6b71bc1': '/products/06_Linen_Spray_Trio_Dark.webp',
    'مجموعة-معطرات-الجو-و-المفارش': '/products/06_Linen_Spray_Trio_Dark.webp',
    'pkg-linen-collection': '/products/06_Linen_Spray_Trio_Dark.webp'
  };
  const liveImage = (image, key) => {
    const raw = image?.image?.large || image?.image?.full_size || image?.image?.thumbnail || '';
    if (typeof raw === 'string' && raw.trim() && !raw.trim().endsWith('.') && /\.(webp|png|jpe?g|gif|svg)(\?.*)?$/i.test(raw.trim())) {
      return raw.trim();
    }
    if (key && KNOWN_PRODUCT_FALLBACKS[key]) {
      return KNOWN_PRODUCT_FALLBACKS[key];
    }
    return '';
  };
  const liveMoney = value => value === null || value === undefined || value === '' ? null : (Number.isFinite(Number(value)) ? Number(value) : null);
  let liveCatalogReady = false;
  const originalCatalog = noteProductsCatalog.slice();
  noteProductsCatalog.splice(0);
  productsData.splice(0);
  ZidSyncManager.CACHE_KEY = 'note_zid_catalog_v9';
  ZidSyncManager.CACHE_TIME_KEY = 'note_zid_catalog_time_v9';
  ZidSyncManager.loadCachedData = function() {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached && Date.now()-Number(localStorage.getItem(this.CACHE_TIME_KEY) || 0)<60000) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length) {
          this.applyToCatalog(parsed);
          return true;
        }
      }
    } catch(e) {}
    return false;
  };
  ZidSyncManager.applyToCatalog = function(results) {
    if (!Array.isArray(results)) throw new Error('Invalid product catalog');
    const next = results.filter(z => z.id && !z.is_draft && liveMoney(z.price) !== null).map(z => {
      const slug = z.slug || z.id;
      // A stable Zid UUID is the only product identity. Slugs are route aliases only.
      const prior = originalCatalog.find(p => p.id === z.id || (zidSlugMap[p.id] || p.id) === slug || (zidSlugMap[p.id] || p.id) === z.id) || {};
      const categories = z.categories || [];
      const category = categories.some(c=>/نيش/.test(c.name)) ? 'niche' : categories.some(c=>/30/.test(c.name)) ? 'travel' : categories.some(c=>/تول/.test(c.name)) ? 'tollah' : categories.some(c=>/عناية/.test(c.name)) ? 'body-care' : categories.some(c=>/باقات|مجموعات/.test(c.name)) || z.product_class==='dynamic_bundle' || z.product_class==='grouped_product' ? 'packages' : categories.some(c=>/جو|مفارش/.test(c.name)) ? 'linen' : categories.some(c=>/جسم/.test(c.name)) ? 'all-over' : 'perfumes';
      const sale = liveMoney(z.sale_price), price = liveMoney(z.price);
      const old = sale !== null && sale < price ? price : null;
      const sold = Number(z.sold_products_count) || 0;
      const fallbackImg = KNOWN_PRODUCT_FALLBACKS[z.id] || KNOWN_PRODUCT_FALLBACKS[slug] || prior.img || '';
      const fallbackImgBox = KNOWN_PRODUCT_FALLBACKS[z.id] || KNOWN_PRODUCT_FALLBACKS[slug] || prior.img_box || fallbackImg || null;
      const img = liveImage(z.images?.[0], z.id) || fallbackImg || '';
      const img_box = liveImage(z.images?.[1], z.id) || fallbackImgBox || null;
      const entry = {...prior, id:z.id, zid_id:z.id, slug, title:z.name || '', title_en:z.name_en || '', price: sale ?? price, old_price:old,
        discount:old ? Number(((old-sale)/old*100).toFixed(1))+'%' : null,
        img: img, img_box: img_box,
        cat:category, cat_ar:categories.find(c => String(c.id) === catUrlMap[category]?.split('/')[2])?.name || categories[0]?.name || prior.cat_ar || '',
        category_ids:categories.map(c => String(c.id)),
        bestseller:sold > 0, sold_count:sold, tag:old ? 'خصم '+Number(((old-sale)/old*100).toFixed(1))+'%' : '',
        rating:Number(z.rating?.average) || 0, reviews_count:Number(z.rating?.total_count) || 0,
        in_stock:z.in_stock !== false && (z.is_infinite === true || Number(z.quantity) > 0), stock:z.is_infinite ? Infinity : Number(z.quantity),
        product_class:z.product_class, has_options:z.has_options, has_fields:z.has_fields,
        description:String(z.description || z.short_description || '').replace(/<[^>]*>/g,'') || prior.description || '', size:prior.size || '100 مل', concentration:prior.concentration || '', notes:prior.notes || '', slogan:'',
        created_at:z.created_at || '', updated_at:z.updated_at || ''};
      zidSlugMap[entry.id] = slug;
      return entry;
    });
    noteProductsCatalog.splice(0, noteProductsCatalog.length, ...next);
    productsData.splice(0, productsData.length, ...next);
    const merged=new Map(zidCategories.map(c=>[c.id,c]));
    for(const z of results)for(const c of z.categories||[])if(!categoryListAuthoritative&&!hiddenCategoryIds.has(String(c.id))&&!merged.has(String(c.id)))merged.set(String(c.id),c);
    registerCategories([...merged.values()]);
    liveCatalogReady = true;
    try { localStorage.setItem(this.CACHE_KEY, JSON.stringify(results)); localStorage.setItem(this.CACHE_TIME_KEY, String(Date.now())); } catch(e) {}
  };
  // Category membership is always Zid's ID, never a guess from product names.
  let zidCategories=[], categoryListAuthoritative=false;
  const hiddenCategoryIds=new Set();
  const categoryKeys={perfumes:'1748533',niche:'1759040',travel:'1759043','all-over':'1759042',linen:'1759044','body-care':'1759046',tollah:'1421002',packages:'1752110'};
  function categoryKey(id) {return String(id)==='1697258'?'bestsellers':String(id)==='1327929'?'new':'zid-'+id;}
  function registerCategories(input) {
    const flattened=[];
    function walk(items,parent) {for(const c of items||[]) {if(!c?.id || c.is_published===false)continue;flattened.push({...c,id:String(c.id),parent_id:c.parent_id||parent});walk(c.sub_categories,c.id);}}
    for(const c of input||[])if(c?.is_published===false)hiddenCategoryIds.add(String(c.id));else if(c?.id)hiddenCategoryIds.delete(String(c.id));
    walk(input);
    zidCategories=[...new Map(flattened.map(c=>[c.id,c])).values()];
    for(const c of zidCategories) {const key=categoryKey(c.id);catUrlMap[key]='/categories/'+c.id+'/'+encodeURIComponent(c.slug||c.name);if(!['new','bestsellers'].includes(key))categoryMeta[key]={title:c.name,desc:c.description||''};}
    for(const [key,id] of Object.entries(categoryKeys)) {const c=zidCategories.find(c=>c.id===id);if(c)catUrlMap[key]=catUrlMap[categoryKey(id)];}
  }
  function categoryProducts(key,products=noteProductsCatalog) {
    if(key==='all')return products.slice();
    if(key==='new'&&(hiddenCategoryIds.has('1327929')||(categoryListAuthoritative&&!zidCategories.some(c=>c.id==='1327929'))))return [];

    const id=key==='new'?'1327929':key==='bestsellers'?'1697258':key.startsWith('zid-')?key.slice(4):categoryKeys[key];
    if(!id || hiddenCategoryIds.has(String(id)) || (categoryListAuthoritative&&!zidCategories.some(c=>c.id===String(id))))return [];
    const ids=new Set([String(id)]);
    for(let n=0;n<zidCategories.length;n++)for(const c of zidCategories)if(ids.has(String(c.parent_id)))ids.add(c.id);
    return products.filter(p=>(p.category_ids||[]).some(cid=>ids.has(String(cid))));
  }
  function syncHomeCategoryOrder() {
    const grid=document.querySelector?.('#curated-sets .grid');
    if(!grid || !zidCategories.length)return;
    const aliases={'1500261':'1759040','1310036':'1759043','1688838':'1759042','1750048':'1759046','1310037':'1759044'};
    const ranks=new Map(zidCategories.map((c,index)=>[c.id,index]));
    const cards=Array.from(grid.children);
    const rank=card=>{const id=card.getAttribute('href')?.match(/\/categories\/(\d+)\//)?.[1];return ranks.get(aliases[id]||id)??Number.MAX_SAFE_INTEGER;};
    const sorted=cards.slice().sort((a,b)=>rank(a)-rank(b));
    if(sorted.some((card,index)=>card!==cards[index]))sorted.forEach(card=>grid.appendChild(card));
  }
  function refreshCategoryUI() {
    syncHomeCategoryOrder();
    const bar=document.getElementById('category-pills-bar');
    if(bar) {
      const entries=[{key:'all',name:'جميع المنتجات'},...zidCategories.filter(c=>c.id!=='1759471').map(c=>({key:categoryKey(c.id),name:c.name}))];
      const html=entries.filter(e=>{const id=e.key==='bestsellers'?'1697258':e.key==='new'?'1327929':e.key.replace('zid-','');return e.key==='all'||(!hiddenCategoryIds.has(id)&&(!categoryListAuthoritative||zidCategories.some(c=>c.id===id)));}).map(({key,name})=>'<button id="pill-'+key+'" data-note-category="'+key+'" onclick="selectCategory(\''+key+'\')" class="cat-pill px-4 py-2 rounded-full border whitespace-nowrap '+(key===activeCategory?'cat-pill-active bg-black text-white border-black':'border-stone-200 text-stone-700')+'">'+escapeHTML(name)+' ('+categoryProducts(key).length+')</button>').join('');
      if(bar.innerHTML!==html)bar.innerHTML=html;
    }
    const meta=categoryMeta[activeCategory]||categoryMeta.all;
    const title=document.getElementById('cat-title'),desc=document.getElementById('cat-desc');
    if(title){title.textContent=meta.title;document.title=meta.title+' | نوت للعطور';}if(desc)desc.textContent=meta.desc;
    const count=document.getElementById('cat-products-count');if(count){count.classList.remove('hidden','sm:inline-block');count.style.display='inline-block';}
    // Curated navigation points to actual populated dashboard categories. Exact category URLs remain distinct.
    for(const a of document.querySelectorAll('#note-luxury-storefront a[href*="/categories/"]')) {
      const match=a.getAttribute('href')?.match(/\/categories\/(\d+)\//);if(!match)continue;
      const replacements={'1500261':'niche','1310036':'travel','1688838':'all-over','1750048':'body-care','1310037':'linen'};
      const alias=replacements[match[1]];if(alias&&catUrlMap[alias])a.setAttribute('href',catUrlMap[alias]);
      const target=a.getAttribute('href')?.match(/\/categories\/(\d+)\//)?.[1];
      a.hidden=target==='1759471'||hiddenCategoryIds.has(target)||(categoryListAuthoritative&&!zidCategories.some(c=>c.id===target));
    }
  }

  ZidSyncManager.loadCachedData();
  // Category visibility/order have a lightweight refresh independent of product cache.
  ZidSyncManager.fetchLiveCategories=function() {
    if(this.categoryPending)return this.categoryPending;
    this.categoryPending=(async()=>{
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),7000);
      try {
        const response=await fetch('/api/v1/categories?_note_refresh='+Date.now(),{cache:'no-store',signal:controller.signal,headers:{Accept:'application/json'}});
        if(!response.ok)throw Error('Category list unavailable');
        const data=await response.json(),list=Array.isArray(data)?data:data.results;
        if(!Array.isArray(list))throw Error('Invalid categories');
        const snapshot=JSON.stringify(list);this.categoryLastSuccess=Date.now();
        if(categoryListAuthoritative&&snapshot===this.categorySnapshot)return true;
        this.categorySnapshot=snapshot;registerCategories(list);categoryListAuthoritative=true;
        refreshCategoryUI();initSliders();
        if(document.getElementById('catalog-products-grid'))renderCatalog();
        if(document.getElementById('cart-page-items'))renderCartPage();
        CartManager.renderDrawer();
        return true;
      } catch(error){console.warn('NOTE: category refresh unavailable',error.message);return false;}
      finally{clearTimeout(timer);this.categoryPending=null;}
    })();return this.categoryPending;
  };
  setInterval(()=>{if(!document.hidden)ZidSyncManager.fetchLiveCategories();},10000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)ZidSyncManager.fetchLiveCategories();});
  ZidSyncManager.fetchLiveCatalog = async function(timeoutMs=15000) {
    if (this.pending) return this.pending;
    this.pending = (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const categoriesRequest=this.fetchLiveCategories();
        const all = [], seen = new Set();
        let page = 1;
        while (true) {
          const response = await fetch('/api/v1/products?page_size=100&page='+page, {cache:'no-store',signal:controller.signal,headers:{Accept:'application/json'}});
          if (!response.ok) throw new Error('Catalog unavailable');
          const data = await response.json();
          if (!Array.isArray(data.results)) throw new Error('Invalid catalog response');
          data.results.forEach(p => {if (!seen.has(p.id)) {seen.add(p.id); all.push(p);}});
          if (!data.next && !(data.pages_count > page)) break;
          if (++page > 100) throw new Error('Catalog pagination limit');
        }
        await categoriesRequest;
        this.applyToCatalog(all);
        this.lastSuccess = Date.now();
        return all;
      } catch (error) {
        console.warn('NOTE: تعذر تحديث المنتجات من زد', error.message);
        if (!liveCatalogReady && !noteProductsCatalog.length) {
          document.querySelectorAll('#catalog-products-grid,#slider-bestsellers').forEach(el => {el.textContent='تعذر تحميل المنتجات. أعد المحاولة بعد قليل.';});
        }
        return null;
      } finally {clearTimeout(timer); this.pending=null;}
    })();
    return this.pending;
  };
  ZidSyncManager.refreshDomPrices = function() {
    if (!liveCatalogReady) return;
    if (NoteRouter.detectRoute().route==='product') {
      const id = NoteRouter.resolveProductId(location.pathname,new URLSearchParams(location.search));
      if (id && !document.getElementById('pdp-title')) document.getElementById('page-content').innerHTML=T.product;
      if (id) {
        const next=noteProductsCatalog.find(p=>p.id===id);
        const fields=['id','title','price','old_price','discount','img','img_box','in_stock','stock','description','rating','reviews_count','updated_at'];
        const changed=!currentProduct || fields.some(key=>currentProduct[key]!==next[key]);
        if(changed) {
          const quantity=pdpQuantity;
          initPDP(id);
          pdpQuantity=quantity;
          const value=document.getElementById('pdp-qty-val');if(value)value.textContent=quantity;
        }
      }
    }
    initSliders();
    refreshCategoryUI();
    if (document.getElementById('catalog-products-grid')) renderCatalog();
    CartManager.renderDrawer();
    if (document.getElementById('cart-page-items')) renderCartPage();
  };
  initSliders = function() {
    refreshCategoryUI();
    const groups = {
      'slider-bestsellers':categoryProducts('bestsellers'),
      'slider-niche':categoryProducts('niche'),
      'slider-new':noteProductsCatalog.slice().sort((a,b) => String(b.created_at).localeCompare(String(a.created_at)))
    };
    Object.entries(groups).forEach(([id,products]) => {
      const track=document.getElementById(id);
      if (track) {
        const idForSlider={'slider-bestsellers':'1697258','slider-new':'1327929','slider-niche':categoryKeys.niche}[id];
        const section=track.closest?.('section');if(section)section.hidden=hiddenCategoryIds.has(idForSlider)||(categoryListAuthoritative&&!zidCategories.some(c=>c.id===idForSlider));
        track.innerHTML=products.length ? products.slice(0,12).map(renderProductCard).join('') : '<p class="note-empty-products">'+(liveCatalogReady ? (id==='slider-bestsellers' ? 'لا تتوفر بيانات مبيعات لترتيب المنتجات حاليًا.' : 'لا توجد منتجات متاحة حاليًا.') : 'جاري تحميل المنتجات…')+'</p>';
        if (typeof enableSliderDragAndWheel === 'function') enableSliderDragAndWheel(track);
      }
    });
  };
  NoteRouter.resolveProductId = function(path, params) {
    const key=params.get('id') || decodeURIComponent(path).split('/').filter(Boolean).pop();
    const product=noteProductsCatalog.find(p => p.id===key || p.id.replace(/-/g,'')===key || p.slug===key);
    return product?.id || null;
  };
  NoteRouter.resolveCategory=function(path,params) {
    const categoryId=decodeURIComponent(path).match(/\/categor(?:y|ies)\/(\d+)/)?.[1];
    if(categoryId)return categoryKey(categoryId);
    return params.get('cat') || 'all';
  };
  const originalNavigate=NoteRouter.navigate;
  NoteRouter.navigate = function(url) {
    if (/^\/(checkout|auth|account)(\/|\?|$)/.test(url)) {location.href=url; return;}
    if(Date.now()-(ZidSyncManager.categoryLastSuccess||0)>3000)ZidSyncManager.fetchLiveCategories();
    return originalNavigate.call(this,url);
  };
  const originalPDP=initPDP;
  let bundleRequest=0, activeBundleGroups=[], activeBundleSelections=[];
  initPDP = function(id) {
    const savedChoices=currentProduct?.id===id ? [...document.querySelectorAll("#note-bundle-options select")].map(select=>({group:select.dataset.group,value:select.value})) : [];
    const product=noteProductsCatalog.find(p => p.id===id);
    if (!product) {
      const content=document.getElementById('page-content');
      if (content) content.innerHTML='<main class="pt-32 p-8 text-center"><p>'+ (liveCatalogReady ? 'المنتج غير متاح حاليًا.' : 'جاري تحميل المنتج…')+'</p></main>';
      return;
    }
    document.querySelectorAll('#note-bundle-options').forEach(box=>box.remove());
    originalPDP(id);
    activeBundleGroups=[]; activeBundleSelections=[];
    const token=++bundleRequest;
    const tag=document.getElementById('pdp-tag-badge');if(tag) tag.hidden=!product.tag;
    const old=document.getElementById('pdp-old-price'); if (old) old.hidden=!product.old_price;
    const discount=document.getElementById('pdp-discount-badge'); if (discount) discount.hidden=!product.discount;
    const rating=document.getElementById('pdp-rating-num'); if (rating) rating.textContent=product.reviews_count ? product.rating : 'لا توجد تقييمات';
    const count=document.getElementById('pdp-rating-count'); if (count) count.textContent='('+product.reviews_count+' تقييم)';
    const description=document.getElementById('pdp-full-description'); if(description) description.textContent=product.description;
    const isOutOfStock = product.in_stock === false || product.stock === 0;
    const imgContainer = document.getElementById('pdp-main-image-container');
    let stickerEl = document.getElementById('pdp-out-of-stock-sticker');
    if (isOutOfStock) {
      if (imgContainer) {
        imgContainer.classList.add('is-out-of-stock');
        if (!stickerEl) {
          stickerEl = document.createElement('span');
          stickerEl.id = 'pdp-out-of-stock-sticker';
          stickerEl.className = 'note-out-of-stock-sticker pdp-sticker out-of-stock';
          stickerEl.textContent = 'غير متاح';
          imgContainer.appendChild(stickerEl);
        }
      }
      document.querySelectorAll('button[onclick*="addToCartCurrentProduct"],button[onclick*="buyNowCurrentProduct"]').forEach(b => {
        b.disabled = true;
        b.classList.add('bg-stone-200', 'text-stone-500', 'cursor-not-allowed', 'border-stone-200');
        b.classList.remove('bg-black', 'text-white', 'hover:bg-stone-800', 'hover:bg-stone-50', 'text-black', 'border-black');
        b.innerHTML = '<span>غير متاح</span>';
      });
    } else {
      if (imgContainer) {
        imgContainer.classList.remove('is-out-of-stock');
        if (stickerEl) stickerEl.remove();
      }
      const addBtn = document.getElementById('pdp-add-cart-btn') || document.querySelector('button[onclick*="addToCartCurrentProduct"]');
      if (addBtn) {
        addBtn.disabled = false;
        addBtn.className = 'flex-grow h-12 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 shadow-md active:scale-98';
        addBtn.innerHTML = '<i class="sicon-shopping-bag text-base"></i><span>إضافة إلى السلة</span>';
      }
      const buyBtn = document.querySelector('button[onclick*="buyNowCurrentProduct"]');
      if (buyBtn) {
        buyBtn.disabled = false;
        buyBtn.className = 'w-full h-12 rounded-full border border-black hover:bg-stone-50 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 active:scale-98';
        buyBtn.innerHTML = '<i class="sicon-apple-pay text-xl"></i><span>شراء فوري عبر Apple Pay / مدى</span>';
      }
    }
    if (product.product_class==='dynamic_bundle') {
      const box=document.createElement('section'); box.id='note-bundle-options'; box.className='note-bundle-options'; box.textContent='جاري تحميل اختيارات الباقة…';
      document.getElementById('pdp-price')?.parentElement?.after(box);
      fetch('/api/v1/products/'+product.zid_id+'/selection-groups',{cache:'no-store',headers:{Accept:'application/json'}}).then(r => {if(!r.ok) throw Error();return r.json();}).then(groups => {
        if(token!==bundleRequest || currentProduct?.id!==id || !box.isConnected) return;
        if(!Array.isArray(groups) || !groups.length) throw Error();
        activeBundleGroups=groups;
        box.innerHTML='<h3>اختار مكونات الباقة</h3>';
        groups.forEach(group => {
          const fieldset=document.createElement('fieldset'),legend=document.createElement('legend');
          legend.textContent=group.name+' — اختر '+group.required_selection_count; fieldset.append(legend);
          const selects=[];
          for(let slot=0;slot<group.required_selection_count;slot++) {
            const label=document.createElement('label'),select=document.createElement('select');
            label.textContent=group.required_selection_count>1 ? 'الاختيار '+(slot+1) : group.name;
            select.required=true; select.dataset.group=group.selection_group_id; select.setAttribute('aria-label',label.textContent);
            select.add(new Option('اختر المنتج',''));
            group.items.forEach(item => {
              if(item.variants?.length || item.options?.length) return;
              const option=new Option(item.name,item.item_id);
              option.disabled=!(item.is_infinite || item.quantity>0);
              if(option.disabled) option.textContent+=' — غير متاح';
              select.add(option);
            });
            if(group.items.length===1 && Number(group.required_selection_count)===1 && !select.options[1]?.disabled) select.value=group.items[0].item_id;
            const priorChoice=savedChoices.filter(c=>c.group===group.selection_group_id)[slot]?.value;
            if(priorChoice && [...select.options].some(o=>o.value===priorChoice && !o.disabled)) select.value=priorChoice;
            selects.push(select);
            fieldset.append(label,select);
          }
          if(!group.allow_duplicate_items && selects.length>1) {
            const syncOptions=()=>{
              const chosen=new Set(selects.map(s=>s.value).filter(Boolean));
              selects.forEach(s=>{
                [...s.options].forEach(o=>{
                  if(!o.value) return;
                  const item=group.items.find(i=>i.item_id===o.value);
                  const outOfStock=!(item?.is_infinite || item?.quantity>0);
                  o.disabled=outOfStock || (chosen.has(o.value) && s.value!==o.value);
                  o.textContent=item?.name ? item.name + (outOfStock ? ' — غير متاح' : chosen.has(o.value) && s.value!==o.value ? ' — تم اختياره' : '') : o.textContent;
                });
              });
            };
            selects.forEach(s=>s.addEventListener('change',syncOptions));
            syncOptions();
          }
          box.append(fieldset);
        });
      }).catch(()=>{if(box.isConnected) box.textContent='تعذر تحميل اختيارات الباقة. أعد المحاولة بعد قليل.';});
    }
  };
  function collectBundleSelections(product) {
    if(product.product_class!=='dynamic_bundle') return [];
    if(!activeBundleGroups.length) throw Error('انتظر تحميل اختيارات الباقة');
    const selections=[];
    activeBundleGroups.forEach(group => {
      const fields=[...document.querySelectorAll('#note-bundle-options select')].filter(s => s.dataset.group===group.selection_group_id);
      const values=fields.map(s=>s.value);
      if(values.length!==Number(group.required_selection_count) || values.some(v=>!v)) throw Error('اختار كل مكونات الباقة أولًا');
      if(!group.allow_duplicate_items && new Set(values).size!==values.length) throw Error('اختر منتجات مختلفة لهذه المجموعة');
      values.forEach(value => {
        const item=group.items.find(i=>i.item_id===value);
        if(!item || !(item.is_infinite || item.quantity>0)) throw Error('أحد الاختيارات غير متاح');
        const existing=selections.find(s=>s.id===value && s.selection_group_id===group.selection_group_id);
        if(existing) existing.quantity++;
        else selections.push({id:value,quantity:1,selection_group_id:group.selection_group_id,name:item.name});
      });
    });
    return selections;
  }
  const rawGetCart=CartManager.getCart;
  CartManager.getCart=function() {
    return rawGetCart.call(this).map(item => {
      const p=noteProductsCatalog.find(p=>p.id===(item.product_id || item.id) || p.slug===item.id || ZID_PRODUCT_MAP[item.id]===p.id);
      return p ? {...item,product_id:p.id,title:p.title,price:p.price,old_price:p.old_price,img:p.img,size:(item.sub_items?.map(s=>(s.quantity>1 ? s.quantity+' × ' : '')+s.name).join('، ')) || p.size,available:p.in_stock} : {...item,available:false};
    });
  };
  CartManager.updateBadge=function() {
    const count=String(this.getCount ? this.getCount() : (this.getCart().reduce((sum, item) => sum + (item.quantity || 1), 0)));
    const badges=document.querySelectorAll('.cart-badge, .cart-badge-count, #cart-counter-badge, [class*="cart-badge"], .cart-sm .cart-badge, .cart-btn .cart-badge');
    badges.forEach(b => {
      if (b.textContent !== count) {
        if (b.textContent !== String(count)) b.textContent = String(count);
      }
      if (count !== '0') {
        b.style.display = 'inline-flex';
      }
    });
  };
  CartManager.addItem=function(id,quantity=1,selections) {
    const p=noteProductsCatalog.find(p=>p.id===id);
    if(!p || !liveCatalogReady) {this.showToast('انتظر تحميل المنتجات من زد');return false;}
    if(!p.in_stock) {this.showToast('هذا المنتج غير متاح حاليًا');return false;}
    if(p.has_options || p.has_fields) {this.showToast('يرجى اختيار تفاصيل المنتج من صفحته الأصلية');location.href='/products/'+encodeURIComponent(p.slug)+'?native=1';return false;}
    if(p.product_class==='dynamic_bundle' && !selections) {NoteRouter.navigate('/products/'+p.slug);return false;}
    const sub=selections || [], sorted=sub.slice().sort((a,b)=>(a.selection_group_id+a.id).localeCompare(b.selection_group_id+b.id));
    const key=p.id+(sorted.length ? '-'+encodeURIComponent(JSON.stringify(sorted.map(({id,quantity,selection_group_id})=>({id,quantity,selection_group_id})))) : '');
    const cart=this.getCart(),existing=cart.find(i=>i.id===key);
    let targetItem;
    if(existing) {
      existing.quantity+=quantity;
      targetItem=existing;
    } else {
      targetItem={id:key,product_id:p.id,title:p.title,price:p.price,old_price:p.old_price,img:p.img,size:sub.map(s=>(s.quantity>1 ? s.quantity+' × ' : '')+s.name).join('، ') || p.size,quantity,sub_items:sub};
      cart.push(targetItem);
    }
    this.saveCart(cart);
    this.updateBadge();
    const badge=document.getElementById('cart-counter-badge');
    if(badge) {
      badge.classList.remove('scale-125');
      void badge.offsetWidth;
      badge.classList.add('scale-125');
      setTimeout(()=>badge.classList.remove('scale-125'), 250);
    }
    this.showToast('تمت إضافة '+escapeHTML(p.title)+' إلى سلتك');

    // Background live sync with Zid's native cart API
    if (typeof window !== 'undefined' && window.zid?.cart?.addProduct) {
      this._nativeQueue=(this._nativeQueue || Promise.resolve()).then(async () => {
        try {
          const payload = {
            product_id: p.id,
            quantity: quantity,
            ...(sub.length ? { sub_items: sub.map(({id, quantity, selection_group_id}) => ({id, quantity, selection_group_id})) } : {})
          };
          const res = assertCartResponse(await window.zid.cart.addProduct(payload));
          const lineId = res?.data?.item?.id || res?.item?.id;
          if (lineId) {
            const currentCart = CartManager.getCart();
            const it = currentCart.find(i => i.id === key);
            if (it) {
              it.native_line_id = lineId;
              CartManager.saveCart(currentCart);
            }
          }
        } catch(e) {
          console.warn('NOTE: background Zid cart sync note:', e?.message || e);
        }
      });
    }
    return true;
  };
  const originalShowToast = CartManager.showToast;
  CartManager.showToast = function(msg) {
    if (typeof originalShowToast === 'function') {
      try { originalShowToast.call(this, msg); } catch(e) {}
    }
    const toast = document.getElementById('global-toast') || document.getElementById('cart-toast');
    if (toast && toast.classList) {
      toast.classList.remove('-translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }
  };
  addToCartCurrentProduct=function() {try {return currentProduct && CartManager.addItem(currentProduct.id,pdpQuantity,collectBundleSelections(currentProduct));} catch(e) {CartManager.showToast(e.message);return false;}};
  buyNowCurrentProduct=function() {if(addToCartCurrentProduct()) {CartManager.closeDrawer();NoteRouter.navigate('/cart');}};
  let recAnimation;
  function recommendationProducts(cart) {const excluded=new Set(cart.map(i=>i.product_id||i.id));return categoryProducts('zid-1759471').filter(p=>p.in_stock&&!excluded.has(p.id));}
  function compactRecommendations(cart,target,section) {
    const grid=document.getElementById(target),box=document.getElementById(section); if(!grid || !box) return;
    const recs=recommendationProducts(cart);
    box.classList.toggle('hidden',!cart.length || !recs.length);
    grid.className='note-compact-recs';
    grid.dir='ltr';
    grid.innerHTML=recs.map(p=>`
      <article dir="rtl" class="note-mini-card">
        <a href="/products/${encodeURIComponent(p.slug)}" onclick="NoteRouter.navigate('/products/${encodeURIComponent(p.slug)}'); CartManager.closeDrawer();">
          <img src="${escapeHTML(p.img)}" alt="${escapeHTML(p.title)}" loading="lazy">
          <div class="note-mini-info">
            <span class="note-mini-title">${escapeHTML(p.title)}</span>
            <strong class="note-mini-price">${p.price} ر.س</strong>
          </div>
        </a>
        <button type="button" data-product="${p.id}" aria-label="أضف ${escapeHTML(p.title)} للسلة">${p.product_class==='dynamic_bundle' ? 'اختار' : 'أضف'}</button>
      </article>
    `).join('');
    grid.querySelectorAll('button').forEach(b=>b.onclick=(e)=>{
      e.stopPropagation();
      CartManager.addItem(b.dataset.product);
    });

    // Sleek Prev / Next Navigation Controls
    let navControls = typeof box.querySelector === 'function' ? box.querySelector('.note-recs-nav') : null;
    if (!navControls && typeof document.createElement === 'function') {
      navControls = document.createElement('div');
      navControls.className = 'note-recs-nav';
      navControls.innerHTML = '<button type="button" class="note-recs-btn note-recs-prev" aria-label="السابق" title="السابق"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button><button type="button" class="note-recs-btn note-recs-next" aria-label="التالي" title="التالي"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>';
      const titleWrapper = typeof box.querySelector === 'function' ? (box.querySelector('.flex') || box.firstElementChild) : null;
      if (titleWrapper && typeof titleWrapper.appendChild === 'function') {
        titleWrapper.style.display = 'flex';
        titleWrapper.style.alignItems = 'center';
        titleWrapper.style.justifyContent = 'space-between';
        titleWrapper.appendChild(navControls);
      }
    }
    const prevBtn = typeof navControls?.querySelector === 'function' ? navControls.querySelector('.note-recs-prev') : null;
    const nextBtn = typeof navControls?.querySelector === 'function' ? navControls.querySelector('.note-recs-next') : null;
    if (prevBtn) prevBtn.onclick = (e) => { e.preventDefault(); if (typeof grid.scrollBy === 'function') grid.scrollBy({ left: -220, behavior: 'smooth' }); };
    if (nextBtn) nextBtn.onclick = (e) => { e.preventDefault(); if (typeof grid.scrollBy === 'function') grid.scrollBy({ left: 220, behavior: 'smooth' }); };

    // Universal Mouse Drag and Wheel Scroll
    if (!grid._scrollEnhanced && typeof grid.addEventListener === 'function') {
      grid._scrollEnhanced = true;
      grid.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
          e.preventDefault();
          grid.scrollLeft += e.deltaY * 1.3;
        }
      }, { passive: false });

      let isDown = false, startX = 0, scrollStart = 0, hasDragged = false;
      grid.style.cursor = 'grab';
      grid.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDown = true;
        hasDragged = false;
        startX = e.pageX;
        scrollStart = grid.scrollLeft;
        grid.style.cursor = 'grabbing';
      });
      const onStopDrag = () => {
        if (!isDown) return;
        isDown = false;
        grid.style.cursor = 'grab';
        setTimeout(() => { hasDragged = false; }, 60);
      };
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('mouseup', onStopDrag);
      }
      grid.addEventListener('mouseleave', onStopDrag);
      grid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const diff = (e.pageX - startX) * 1.4;
        if (Math.abs(diff) > 4) {
          hasDragged = true;
          e.preventDefault();
          grid.scrollLeft = scrollStart - diff;
        }
      });
      grid.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    }

    grid.dataset.pause='';let direction=1;
    grid.onmouseenter=()=>grid.dataset.pause='1';grid.onmouseleave=()=>grid.dataset.pause='';grid.onfocusin=()=>grid.dataset.pause='1';grid.onfocusout=()=>grid.dataset.pause='';grid.onpointerdown=()=>grid.dataset.pause='1';grid.onpointerup=()=>grid.dataset.pause='';
    if(target==='cart-page-recs-grid') {
      clearInterval(recAnimation);
      recAnimation=setInterval(()=>{if(!grid.isConnected){clearInterval(recAnimation);return;}if(grid.dataset.pause || document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const max=grid.scrollWidth-grid.clientWidth;if(max<=0)return;
        if(grid.scrollLeft>=max-1)direction=-1;if(grid.scrollLeft<=0)direction=1;grid.scrollLeft+=direction;
      },35);
    }
  }
  renderCartPageRecommendations=cart=>compactRecommendations(cart,'cart-page-recs-grid','cart-page-recommendations-section');
  updateCheckoutUpsell=function() {document.getElementById('checkout-upsell-card')?.classList.add('hidden');};
  // Explicit, cancellable drawer state; an old close timeout cannot hide a reopened cart.
  CartManager.openDrawer=function() {
    const drawer=document.getElementById('cart-drawer'),overlay=document.getElementById('cart-drawer-overlay');
    if(!drawer || !overlay) return;
    clearTimeout(this._drawerCloseTimer);
    this._drawerOpen=true;
    drawer.hidden=false;overlay.hidden=false;
    drawer.setAttribute('aria-hidden','false');
    drawer.classList.remove('hidden');overlay.classList.remove('hidden');
    document.body.style.overflow='hidden';
    this.renderDrawer();
    requestAnimationFrame(()=>{if(!this._drawerOpen)return;overlay.classList.add('opacity-100');drawer.classList.remove('-translate-x-full');drawer.classList.add('translate-x-0');});
  };
  CartManager.closeDrawer=function() {
    const drawer=document.getElementById('cart-drawer'),overlay=document.getElementById('cart-drawer-overlay');
    if(!drawer || !overlay)return;
    this._drawerOpen=false;
    clearTimeout(this._drawerCloseTimer);
    drawer.setAttribute('aria-hidden','true');
    drawer.classList.remove('translate-x-0');drawer.classList.add('-translate-x-full');overlay.classList.remove('opacity-100');
    document.body.style.overflow='';
    this._drawerCloseTimer=setTimeout(()=>{if(this._drawerOpen)return;drawer.hidden=true;overlay.hidden=true;drawer.classList.add('hidden');overlay.classList.add('hidden');},250);
  };

  const originalDrawer=CartManager.renderDrawer;
  CartManager.renderDrawer=function() {originalDrawer.call(this);compactRecommendations(this.getCart(),'cart-drawer-recs-list','cart-drawer-recommendations');};
  // Refresh on return to the tab and every minute, including name/image changes.
  document.addEventListener('visibilitychange',()=>{if(!document.hidden && Date.now()-(ZidSyncManager.lastSuccess || 0)>30000) ZidSyncManager.fetchLiveCatalog().then(()=>ZidSyncManager.refreshDomPrices());});
  setInterval(()=>{if(!document.hidden) ZidSyncManager.fetchLiveCatalog().then(()=>ZidSyncManager.refreshDomPrices());},60000);
  function assertCartResponse(response) {
    if(response?.status==='error' || response?.status==='failed' || response?.success===false || response?.data?.status==='error') throw Error(response?.message || response?.data?.message || 'تعذر تحديث السلة في زد');
    return response;
  }
  function nativeCartItems(response) {
    assertCartResponse(response);
    const data=response?.data || response;
    const items=data?.cart?.products || data?.cart?.items || data?.products || data?.items;
    if(!Array.isArray(items)) throw Error('تعذر قراءة السلة من زد. أعد المحاولة.');
    return items;
  }
  let checkoutBusy=false;
  proceedToCheckout=async function() {
    if(checkoutBusy) return;
    checkoutBusy=true;
    try {
      const refreshed=await ZidSyncManager.fetchLiveCatalog();
      if(!refreshed) throw Error('تعذر التحقق من الأسعار الحالية. حاول مرة أخرى.');
      await CartManager._nativeQueue;
      const cart=CartManager.getCart();
      if(!cart.length) throw Error('السلة فارغة');
      const api=window.zid?.cart;
      if(!api?.addProduct || !api?.get || !api?.updateProduct) throw Error('خدمة سلة زد غير جاهزة. حدّث الصفحة وحاول مجددًا.');
      let native=nativeCartItems(await api.get());
      for(const item of cart) {
        const p=noteProductsCatalog.find(p=>p.id===item.product_id);
        if(!p || !p.in_stock || item.quantity>p.stock) throw Error('راجع توفر وكمية '+item.title);
        if(p.product_class==='dynamic_bundle' && !item.sub_items?.length) throw Error('اختار مكونات '+p.title+' من صفحة المنتج');
        let line=item.native_line_id && native.find(n=>String(n.id)===String(item.native_line_id));
        if(!line && !item.sub_items?.length) line=native.find(n=>(n.product_id || n.product?.id)===p.id && !n.sub_items?.length);
        if(line) assertCartResponse(await api.updateProduct({product_id:line.id,quantity:item.quantity}));
        else {
          const before=new Set(native.map(n=>String(n.id)));
          const response=assertCartResponse(await api.addProduct({product_id:p.id,quantity:item.quantity,...(item.sub_items?.length ? {sub_items:item.sub_items.map(({id,quantity,selection_group_id})=>({id,quantity,selection_group_id}))} : {})}));
          native=nativeCartItems(await api.get());
          line=native.find(n=>!before.has(String(n.id)) && (n.product_id || n.product?.id)===p.id) || native.find(n=>String(n.id)===String(response?.data?.item?.id || response?.item?.id));
          if(!line) throw Error('تم تحديث زد؛ تعذر تأكيد سطر المنتج. راجع السلة قبل إعادة المحاولة.');
        }
        item.native_line_id=line.id;
        CartManager.saveCart(cart);
      }
      location.href='/checkout';
    } catch(error) {CartManager.showToast(escapeHTML(error.message));}
    finally {checkoutBusy=false;}
  };
  const originalRemove=CartManager.removeItem, originalUpdateQuantity=CartManager.updateQuantity;
  CartManager.removeItem=async function(key) {
    await this._nativeQueue;
    const item=this.getCart().find(i=>i.id===key);
    try {
      if(item?.native_line_id) assertCartResponse(await window.zid.cart.removeProduct({product_id:item.native_line_id}));
      originalRemove.call(this,key);
    } catch(e) {this.showToast('تعذر حذف المنتج من زد. حاول مجددًا.');}
  };
  CartManager.updateQuantity=async function(key,delta) {
    await this._nativeQueue;
    const item=this.getCart().find(i=>i.id===key);if(!item)return;
    if(item.quantity+delta<=0) return this.removeItem(key);
    const p=noteProductsCatalog.find(p=>p.id===item.product_id);
    if(delta>0 && (!p?.in_stock || item.quantity+delta>p.stock)) {this.showToast('الكمية المطلوبة غير متاحة');return;}
    try {
      if(item.native_line_id) assertCartResponse(await window.zid.cart.updateProduct({product_id:item.native_line_id,quantity:item.quantity+delta}));
      originalUpdateQuantity.call(this,key,delta);
    } catch(e) {this.showToast('تعذر تعديل الكمية في زد. حاول مجددًا.');}
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('click', function(e) {
      const btn = e.target?.closest?.('.cart-sm a, .cart-btn a, a[href*="/cart/view"], [data-action="open-cart"]');
      if (btn && !btn.getAttribute?.('href')?.includes('/checkout')) {
        e.preventDefault?.();
        e.stopPropagation?.();
        CartManager.openDrawer();
      }
    }, true);

    CartManager.updateBadge();
    if (typeof MutationObserver !== 'undefined' && document.body) {
      let badgeFrame=0;
      const badgeObserver = new MutationObserver(() => {
        if (badgeFrame) return;
        badgeFrame=requestAnimationFrame(()=>{badgeFrame=0;CartManager.updateBadge();});
      });
      badgeObserver.observe(document.body, { childList: true, subtree: true });
    }
    if (typeof setInterval !== 'undefined') {
      setInterval(() => {
        CartManager.updateBadge();
      }, 1200);
    }

    const getNavCategory = function(link) {
      if (!link) return null;
      if (link.dataset && link.dataset.cat) return link.dataset.cat;
      const text = (link.textContent || '').trim();
      const href = link.getAttribute('href') || '';
      if (text === 'الرئيسية' || href === '/' || href === '') return 'home';
      if (text.includes('جميع المنتجات') || href === '/categories' || href === '/products' || href.includes('cat=all')) return 'all';
      if (text.includes('النيش') || href.includes('1500261') || href.includes('1759040') || href.includes('niche')) return 'niche';
      if (text.includes('الأكثر مبيع') || text.includes('الأكثر مبيعا') || href.includes('1697258') || href.includes('bestseller')) return 'bestsellers';
      if (text.includes('أحدث المنتجات') || text.includes('جديد') || href.includes('1327929') || href.includes('1759041') || href.includes('new')) return 'new';
      if (text.includes('العطور') || href.includes('1748533') || href.includes('perfumes')) return 'perfumes';
      if (text.includes('30') || href.includes('1310036') || href.includes('1759043') || href.includes('travel')) return 'travel';
      if (text.includes('جسم') || href.includes('1688838') || href.includes('1759042') || href.includes('all-over')) return 'all-over';
      if (text.includes('باقات') || text.includes('مجموعات') || href.includes('1752110') || href.includes('1759047') || href.includes('packages')) return 'packages';
      if (text.includes('مفارش') || href.includes('1310037') || href.includes('1759044') || href.includes('linen')) return 'linen';
      if (text.includes('تول') || href.includes('1421002') || href.includes('tollah')) return 'tollah';
      if (text.includes('عناية') || href.includes('1750048') || href.includes('1759046') || href.includes('body')) return 'body-care';
      return null;
    };

    const syncActiveNavLine = function(targetKey) {
      let key = targetKey;
      if (!key && typeof NoteRouter !== 'undefined' && NoteRouter.detectRoute) {
        const d = NoteRouter.detectRoute();
        key = d.route === 'home' ? 'home' : (d.route === 'category' ? (d.cat || 'all') : null);
      }
      const navLinks = document.querySelectorAll('#nav-links a, header nav a');
      navLinks.forEach(link => {
        const lCat = getNavCategory(link);
        const isMatch = key && (lCat === key);
        if (isMatch) {
          link.classList.add('border-b-2', 'border-current', 'active-link');
          link.style.borderBottom = '2px solid currentColor';
        } else {
          link.classList.remove('border-b-2', 'border-current', 'active-link');
          link.style.borderBottom = '2px solid transparent';
        }
      });
    };

    document.addEventListener('click', function(e) {
      const link = e.target?.closest?.('#nav-links a, header nav a');
      if (link) {
        const cat = getNavCategory(link);
        if (cat) {
          syncActiveNavLine(cat);
        }
      }
    }, true);

    if (typeof selectCategory === 'function') {
      const originalSelectCat = selectCategory;
      selectCategory = function(cat, updateURL) {
        originalSelectCat(cat, updateURL);
        syncActiveNavLine(cat || 'all');
      };
    }
  }

  // Global recovery for corrupted/blank images (e.g. trailing dot CDN URLs)
  document.addEventListener('error', function(e) {
    if (e.target && e.target.tagName === 'IMG') {
      const src = e.target.getAttribute('src') || '';
      if (src.includes('a26e413c') || src.endsWith('.') || src.includes('47dc7967') || src.includes('83561f07')) {
        e.target.src = 'https://youssefrasheed.github.io/note-zid-styles/products/06_Linen_Spray_Trio_Dark.webp';
      }
    }
  }, true);

  // Global Exports for Inlined HTML Handlers
  window.productsData = productsData;
  window.noteProductsCatalog = noteProductsCatalog;
  window.CartManager = CartManager;
  window.NoteRouter = NoteRouter;
  window.renderProductCard = renderProductCard;
  window.initSliders = initSliders;
  window.scrollSlider = scrollSlider;
  window.handleHeaderScroll = handleHeaderScroll;
  window.openQuickView = openQuickView;
  window.closeQuickView = closeQuickView;
  window.openSearchModal = openSearchModal;
  window.closeSearchModal = closeSearchModal;
  window.handleLiveSearch = handleLiveSearch;
  window.fillAndSearch = fillAndSearch;
  window.normalizeArabic = normalizeArabic;
  window.openMobileMenu = openMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.goToHeroSlide = goToHeroSlide;
  window.nextHeroSlide = nextHeroSlide;
  window.prevHeroSlide = prevHeroSlide;
  window.goToOfferSlide = goToOfferSlide;
  window.nextOfferSlide = nextOfferSlide;
  window.prevOfferSlide = prevOfferSlide;

  // PDP Handlers
  window.changePDPQuantity = changePDPQuantity;
  window.addToCartCurrentProduct = addToCartCurrentProduct;
  window.buyNowCurrentProduct = buyNowCurrentProduct;

  // Category Handlers & Aliases
  window.selectCategory = selectCategory;
  window.handleCategorySearch = handleCategorySearch;
  window.handleCategorySort = handleCategorySort;
  window.resetCategoryFilters = resetCategoryFilters;
  window.handleSearch = handleCategorySearch;
  window.handleSort = handleCategorySort;
  window.resetFilters = resetCategoryFilters;
  window.clearCatSearch = clearCatSearch;
  window.focusSearchInput = function() {
    const el = document.getElementById('cat-search-input');
    if (el) el.focus();
  };

  // Cart Page Handlers & Aliases
  window.renderCartPage = renderCartPage;
  window.applyCartCoupon = applyCartCoupon;
  window.applyCoupon = applyCartCoupon;
  window.updateCartItemQty = function(id, delta) {
    CartManager.updateQuantity(id, delta);
    renderCartPage();
  };
  window.removeCartItem = function(id) {
    CartManager.removeItem(id);
    renderCartPage();
  };
  window.clearAndGoHome = function() {
    localStorage.removeItem('note_cart');
    NoteRouter.navigate('/');
  };
  window.proceedToCheckout = proceedToCheckout;
  window.handleContactSubmit = handleContactSubmit;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountShell);
  } else {
    mountShell();
  }
})();
