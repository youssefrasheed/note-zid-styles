(function () {
  'use strict';
  const config = { enabled: true, code: 'NOTE5', title: 'أهلاً بك', message: 'هدية ترحيبية بانتظارك — خصم 5% باستخدام الكود', delay: 2500 };
  const key = 'note-welcome-NOTE5-v1';
  function start() {
    if (!config.enabled || location.pathname !== '/' || document.getElementById('note-welcome')) return;
    try { if (sessionStorage.getItem(key)) return; } catch (_) {}
    setTimeout(function () {
      if (location.pathname !== '/' || !document.getElementById('note-luxury-storefront')) return;
      if (document.querySelector('dialog[open], [aria-modal="true"]')) return;
      const dialog = document.createElement('dialog');
      dialog.id = 'note-welcome';
      dialog.dir = 'rtl';
      dialog.setAttribute('aria-labelledby', 'note-welcome-title');
      dialog.innerHTML = '<style>#note-welcome{border:1px solid #ded8cc;border-radius:4px;padding:40px 24px;width:min(420px,calc(100vw - 32px));max-height:calc(100dvh - 32px);overflow:auto;text-align:center;background:#faf8f3;color:#24211d;font-family:inherit;box-sizing:border-box}#note-welcome::backdrop{background:rgba(0,0,0,.5)}#note-welcome h2{font-size:28px;margin:16px 0}#note-welcome p{line-height:1.9;margin:0 0 24px}#note-welcome button,#note-welcome a{font:inherit;cursor:pointer}#note-welcome-close{position:absolute;top:8px;left:8px;background:none;border:0;font-size:26px!important;width:44px;height:44px}#note-welcome-copy{display:block;width:100%;padding:14px;border:1px dashed #807355;background:#fff;color:#24211d}#note-welcome-link{display:block;margin-top:16px;padding:14px;background:#24211d;color:white;text-decoration:none}#note-welcome-status{display:block;min-height:24px;margin-top:8px;font-size:14px}#note-welcome :focus-visible{outline:2px solid #977d48;outline-offset:3px}</style><button id="note-welcome-close" aria-label="إغلاق" autofocus>×</button><div aria-hidden="true" style="letter-spacing:6px;font-size:13px">NOTE</div><h2 id="note-welcome-title"></h2><p id="note-welcome-message"></p><button id="note-welcome-copy"><b dir="ltr"></b> — نسخ الكود</button><span id="note-welcome-status" role="status" aria-live="polite"></span><a id="note-welcome-link" href="/categories/1748533/perfumes">اكتشف عطورنا</a>';
      dialog.querySelector('h2').textContent = config.title;
      dialog.querySelector('p').textContent = config.message;
      dialog.querySelector('b').textContent = config.code;
      document.body.appendChild(dialog);
      const previousFocus = document.activeElement;
      dialog.addEventListener('close', function () { dialog.remove(); if (previousFocus && previousFocus.isConnected) previousFocus.focus(); });
      dialog.querySelector('#note-welcome-close').onclick = () => dialog.close();
      dialog.addEventListener('click', function (event) { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
      dialog.querySelector('#note-welcome-link').onclick = () => dialog.close();
      dialog.querySelector('#note-welcome-copy').onclick = async function () {
        const status = dialog.querySelector('#note-welcome-status');
        try { await navigator.clipboard.writeText(config.code); status.textContent = 'تم نسخ الكود ✓'; }
        catch (_) { status.textContent = 'انسخ الكود يدويًا: ' + config.code; const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(dialog.querySelector('b')); selection.removeAllRanges(); selection.addRange(range); }
      };
      dialog.showModal();
      try { sessionStorage.setItem(key, '1'); } catch (_) {}
    }, config.delay);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true}); else start();
})();
