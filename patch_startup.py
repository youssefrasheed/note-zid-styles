from pathlib import Path
import re,json

def fix_startup_css(css):
    css=css.replace('#cart-drawer {','#cart-drawer:not(.hidden):not([hidden]) {').replace('#cart-drawer{','#cart-drawer:not(.hidden):not([hidden]){')
    css=css.replace('animation: noteLoaderPulse 2s ease-in-out infinite !important;','animation: none !important;')
    return css

def fix_startup(app):
    app=app.replace('4.3.0','4.5.7')
    start=app.find("  // Hook and preserve Zid's native loader")
    if start>=0:
        end=app.index('  console.log(',start)
        app=app[:start]+app[end:]
    start=app.index('  // 2. Inject Tailwind CDN')
    end=app.index('  // 4. Inject Suppression',start)
    css=(Path(__file__).parent/'note-utilities.css').read_text()
    bootstrap='''  // Precompiled styles are installed before any storefront DOM is mounted.
  if (document.documentElement.dataset.noteEngineStarted) return;
  document.documentElement.dataset.noteEngineStarted='4.5.7';
  const utilityStyles=document.createElement('style');
  utilityStyles.id='note-utilities-css';
  utilityStyles.textContent=CSS_VALUE;
  document.head.appendChild(utilityStyles);
'''.replace('CSS_VALUE',json.dumps(css))
    app=app[:start]+bootstrap+'\n'+app[end:]
    # One native loader removal; do not overwrite the browser's DOM methods.
    start=app.index('  // 19.5 Native Zid Loader')
    end=app.index('  // 20. Shell Mounter',start)
    app=app[:start]+'''  function dismissZidLoader() {
    document.getElementById('loader-container')?.remove();
  }

'''+app[end:]
    start=app.find('  // Zid Loader Preservation & Seamless Dismissal')
    if start>=0:
        end=app.index('  // Live storefront integration.',start)
        app=app[:start]+app[end:]
    app=app.replace("    requestAnimationFrame(() => {\n      setTimeout(dismissZidLoader, 160);\n    });\n    setTimeout(dismissZidLoader, 2500);", "    dismissZidLoader();")
    a=app.index('    // Route to current page immediately (0ms)')
    b=app.index('\n  // 21. Global Link Interception',a)
    app=app[:a]+"""    NoteRouter.route();
    const revealStorefront=()=>{
      document.body.classList.add('note-ready');
      dismissZidLoader();
    };
    if(liveCatalogReady) revealStorefront();
    ZidSyncManager.fetchLiveCatalog(10000).then(()=>{
      ZidSyncManager.refreshDomPrices();
    }).finally(revealStorefront);
  }
"""+app[b:]
    app=app.replace('  ZidSyncManager.loadCachedData();\n\n  // 6. Templates','  // Live cache is applied by the authoritative integration below.\n\n  // 6. Templates')
    app=app.replace('  if (/^\\/(checkout|auth|account)(\\/|$)/.test(location.pathname) || new URLSearchParams(location.search).get("native")==="1") return;','  if (/^\\/(checkout|auth|account)(\\/|$)/.test(location.pathname) || new URLSearchParams(location.search).get("native")==="1") {\n    const releaseNative=()=>document.body?.classList.add(\'note-ready\');\n    if(document.body) releaseNative(); else document.addEventListener(\'DOMContentLoaded\',releaseNative,{once:true});\n    return;\n  }')
    app=app.replace('      mainEl.appendChild(shell);',"      const initialDrawer=shell.querySelector('#cart-drawer'),initialOverlay=shell.querySelector('#cart-drawer-overlay');\n      if(initialDrawer){initialDrawer.hidden=true;initialDrawer.setAttribute('aria-hidden','true');}\n      if(initialOverlay)initialOverlay.hidden=true;\n      mainEl.appendChild(shell);")
    # Do not write the same badge text, which would retrigger the MutationObserver.
    app=app.replace('b.textContent = count;', "if (b.textContent !== String(count)) b.textContent = String(count);")
    app=fix_startup_css(app)
    return app
