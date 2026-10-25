(function () {
  'use strict';
  const config = { enabled: true, code: 'NOTE5', delay: 2500 };
  const key = 'note-welcome-NOTE5-v1';
  function start() {
    if (!config.enabled || location.pathname !== '/' || document.getElementById('note-welcome')) return;
    try { if (sessionStorage.getItem(key)) return; } catch (_) {}
    let attempts = 0;
    setTimeout(function show() {
      if (location.pathname !== '/') return;
      if (!document.getElementById('note-luxury-storefront') || Array.from(document.querySelectorAll('dialog[open], [aria-modal="true"]')).some(el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return el.getAttribute('aria-hidden') !== 'true' && r.width > 0 && r.height > 0 && r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight && s.visibility !== 'hidden' && Number(s.opacity) > 0; })) {
        if (++attempts < 60) setTimeout(show, 1000);
        return;
      }
      const dialog = document.createElement('dialog');
      dialog.id = 'note-welcome';
      dialog.dir = 'rtl';
      dialog.setAttribute('aria-labelledby', 'note-welcome-title');
      dialog.innerHTML = "<style>@font-face{font-family:NoteWelcome;src:url(https://youssefrasheed.github.io/note-zid-styles/fonts/DahabArabicITF-Regular.ttf)}#note-welcome{position:relative;width:min(420px,100%);padding:32px 28px 24px;text-align:center;background:#fffdf8;border:1px solid #fff7e7;border-radius:26px;box-shadow:0 24px 90px #0003;animation:noteWelcomeArrive .5s ease-out}#note-welcome .close{position:absolute;left:14px;top:12px;border:0;background:transparent;color:#8c8579;font-size:25px;width:36px;height:36px;cursor:pointer;outline:none}#note-welcome .close:focus{outline:none}#note-welcome .brand{font-family:Georgia,serif;letter-spacing:7px;font-size:13px;color:#8c7e64;direction:ltr}#note-welcome .gift{margin:20px auto 14px;width:70px;height:70px;border-radius:50%;display:grid;place-items:center;background:#f6eddb;color:#9c7841}#note-welcome .gift svg{width:39px;height:39px}#note-welcome h1{font-size:27px;margin:0 0 12px;font-weight:700}#note-welcome p{font-size:14px;color:#82786b;line-height:1.9;margin:0}#note-welcome .offer{margin:16px 0 4px;font-size:46px;font-family:Georgia,serif;color:#94733e;line-height:1.1}#note-welcome .offer span{font-family:Tahoma,sans-serif;font-size:18px;vertical-align:middle;margin-left:8px;color:#4b4134}#note-welcome .coupon{display:flex;justify-content:space-between;align-items:center;border:1px dashed #d9c49c;border-radius:13px;padding:13px 17px;margin:21px 0 14px;background:#faf5eb;width:100%;cursor:pointer;color:#7a613e;font-family:inherit}#note-welcome .coupon strong{font:700 23px Arial;letter-spacing:3px;color:#3f3528}#note-welcome .copy{font-size:13px;display:flex;align-items:center;gap:7px}#note-welcome .primary{display:block;width:100%;padding:15px;background:#302d25;border:0;color:white;border-radius:12px;font-family:inherit;font-size:14px;cursor:pointer}#note-welcome .later{border:0;background:none;color:#918879;font-family:inherit;font-size:12px;margin-top:16px;cursor:pointer}#note-welcome .confetti{position:fixed;inset:0;pointer-events:none;overflow:hidden}#note-welcome .piece{position:absolute;left:50%;top:43%;height:9px;width:5px;background:var(--color);border-radius:1px;animation:noteWelcomeCelebrate 2.4s ease-out both;animation-delay:var(--delay)}@keyframes noteWelcomeArrive{from{opacity:0;transform:translateY(15px) scale(.94)}to{opacity:1;transform:none}}@keyframes noteWelcomeCelebrate{0%{transform:translate(0,0) rotate(0);opacity:0}12%{opacity:1}65%{opacity:1}100%{transform:translate(var(--x),var(--y)) rotate(var(--r));opacity:0}}@media(prefers-reduced-motion:reduce){#note-welcome .piece{display:none}#note-welcome{animation:none}}@media(max-height:650px){.stage{overflow:auto}#note-welcome{padding:20px}#note-welcome .gift{margin:10px auto;width:50px;height:50px}#note-welcome .offer{font-size:36px}}\n#note-welcome{position:fixed;inset:0;margin:auto;width:min(420px,calc(100vw - 40px));max-height:calc(100dvh - 32px);overflow:auto;font-family:NoteWelcome,Tahoma,sans-serif;color:#302b25}#note-welcome *{box-sizing:border-box}#note-welcome::backdrop{background:#17171080;backdrop-filter:blur(4px)}#note-welcome .primary{text-decoration:none}#note-welcome .confetti{position:absolute;border-radius:26px}#note-welcome :focus-visible{outline:2px solid #94733e;outline-offset:3px}#note-welcome .offer b{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif!important;direction:ltr;unicode-bidi:isolate;display:inline-block;font-size:46px;line-height:1.1} </style><button class=\"close\" id=\"note-welcome-close\" aria-label=\"إغلاق\">×</button><div class=\"brand\">NOTE</div><div class=\"gift\"><svg viewBox=\"0 0 40 40\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 18h26v17H7zM5 12h30v7H5zM20 12v23\"/><path d=\"M20 12C9 13 9 3 14 4c4 0 6 8 6 8Zm0 0c11 1 11-9 6-8-4 0-6 8-6 8Z\"/><path d=\"M4 4v4M2 6h4M34 2v4M32 4h4\"/></svg></div><h1 id=\"note-welcome-title\">يا هلا، نوّرت نوت!</h1><p>بداية حلوة تستاهل هدية</p><div class=\"offer\"><span>خصم</span> <b dir=\"ltr\">5%</b></div><p>على عطرك المفضّل، منّا لك</p><button class=\"coupon\" id=\"note-welcome-copy\"><strong dir=\"ltr\">NOTE5</strong><span class=\"copy\"><svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"8\" y=\"8\" width=\"12\" height=\"13\" rx=\"2\"/><path d=\"M15 5V3H3v13h2\"/></svg><span id=\"note-welcome-status\" role=\"status\" aria-live=\"polite\">انسخ الكود</span></span></button><a class=\"primary\" id=\"note-welcome-link\" href=\"/categories/1748533/perfumes\">اكتشف عطرك المفضّل</a><button class=\"later\">أتصفّح أولاً</button><div class=\"confetti\" aria-hidden=\"true\"></div>";
      dialog.querySelector('.coupon strong').textContent = config.code;
      document.body.appendChild(dialog);
      const previousFocus = document.activeElement;
      dialog.addEventListener('close', function () { dialog.remove(); if (previousFocus && previousFocus.isConnected) previousFocus.focus(); });
      dialog.querySelector('#note-welcome-close').onclick = () => dialog.close();
      dialog.querySelector('.later').onclick = () => dialog.close();
      dialog.addEventListener('click', function (event) { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
      dialog.querySelector('#note-welcome-link').onclick = () => dialog.close();
      dialog.querySelector('#note-welcome-copy').onclick = async function () {
        const status = dialog.querySelector('#note-welcome-status');
        try { await navigator.clipboard.writeText(config.code); status.textContent = 'تم نسخ الكود ✓'; }
        catch (_) { status.textContent = 'انسخ الكود يدويًا: ' + config.code; const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(dialog.querySelector('.coupon strong')); selection.removeAllRanges(); selection.addRange(range); }
      };
      dialog.showModal();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        for(let i=0;i<48;i++){let el=document.createElement('i');el.className='piece';el.style.cssText=`--x:${Math.sin(i*2.4)*(100+i*5)}px;--y:${-180+(i%9)*65}px;--r:${i*49}deg;--delay:${(i%5)*.045}s;--color:${['#c9a45e','#e7d4ac','#a6af94','#e4b9a0'][i%4]}`;dialog.querySelector('.confetti').append(el)}
      }
      setTimeout(() => dialog.querySelector(".confetti")?.remove(), 2800);
      try { sessionStorage.setItem(key, '1'); } catch (_) {}
    }, config.delay);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true}); else start();
})();