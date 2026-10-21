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
