  if (typeof window !== 'undefined' && !window.zidStoreRegion) window.zidStoreRegion = { location_selection: false };
  try {
    if (typeof document !== 'undefined') {
      document.documentElement?.setAttribute?.('translate', 'no');
      document.documentElement?.classList?.add?.('notranslate');
      document.body?.setAttribute?.('translate', 'no');
      document.body?.classList?.add?.('notranslate');
      if (typeof document.querySelector === 'function' && !document.querySelector('meta[name="google"][content*="notranslate"]')) {
        const metaGoogle = document.createElement('meta');
        metaGoogle.name = 'google';
        metaGoogle.content = 'notranslate';
        if (document.head?.appendChild) document.head.appendChild(metaGoogle);
      }
      if (typeof document.querySelector === 'function' && !document.querySelector('meta[name="googlebot"][content*="notranslate"]')) {
        const metaBot = document.createElement('meta');
        metaBot.name = 'googlebot';
        metaBot.content = 'notranslate';
        if (document.head?.appendChild) document.head.appendChild(metaBot);
      }
    }
  } catch (e) {}
  const navHoverStyle=document.createElement('style');navHoverStyle.textContent='#nav-links a:hover,#nav-links a:focus-visible{border-bottom:2px solid currentColor!important;}';document.head.append(navHoverStyle);
  const badgeStyle=document.createElement('style');badgeStyle.textContent=`
.note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock),
#pdp-tag-badge {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Tajawal", Arial, sans-serif !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  padding: 3px 8.5px !important;
  min-height: 22px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 4px !important;
  direction: rtl !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  background: rgba(255, 255, 255, 0.78) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  border: 1px solid rgba(0, 0, 0, 0.18) !important;
  border-radius: 9999px !important;
  color: #111111 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
}
.note-discount-badge,
.note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock):has(bdi),
#pdp-discount-badge {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Tajawal", Arial, sans-serif !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  line-height: 1.2 !important;
  padding: 3.5px 9px !important;
  min-height: 22px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 4px !important;
  direction: rtl !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  background: linear-gradient(135deg, #f5e9c9 0%, #dfc485 100%) !important;
  border: 1px solid rgba(195, 160, 85, 0.45) !important;
  border-radius: 9999px !important;
  color: #111111 !important;
  box-shadow: 0 2px 6px rgba(180, 145, 75, 0.2) !important;
}
.note-discount-badge bdi,
.note-discount-badge span,
.note-product-badge:has(bdi) bdi,
.note-product-badge:has(bdi) span,
#pdp-discount-badge bdi,
#pdp-discount-badge span {
  color: #111111 !important;
  font-weight: 800 !important;
}
.note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock) bdi,
#pdp-tag-badge bdi,
#pdp-discount-badge bdi,
.note-vat-rate,
.note-percent-val,
#cart-page-summary-wrapper bdi,
#cart-drawer-footer bdi {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Tajawal", Arial, sans-serif !important;
  font-weight: 700 !important;
  direction: ltr !important;
  unicode-bidi: isolate !important;
  display: inline-block !important;
}
@media(max-width:639px){
  .note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock),
  #pdp-tag-badge {
    font-size: 10px !important;
    padding: 2.5px 7px !important;
    min-height: 20px !important;
  }
  .note-discount-badge,
  .note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock):has(bdi),
  #pdp-discount-badge {
    font-size: 10px !important;
    padding: 2.5px 7.5px !important;
    min-height: 20px !important;
  }
}

/* Coupon "تطبيق" (Apply Coupon) Button - Default Premium Black */
#drawer-coupon-btn,
#coupon-apply-btn {
  background: #111111 !important;
  color: #ffffff !important;
  border: 1px solid #111111 !important;
  font-weight: 800 !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  cursor: pointer !important;
}
#drawer-coupon-btn:hover,
#coupon-apply-btn:hover {
  background: #262626 !important;
  border-color: #262626 !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
  transform: translateY(-1px);
}
#drawer-coupon-btn:active,
#coupon-apply-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
}
#drawer-coupon-btn:disabled,
#coupon-apply-btn:disabled {
  opacity: 0.65 !important;
  cursor: not-allowed !important;
  transform: none !important;
}
#drawer-coupon-btn span,
#coupon-apply-btn span,
#drawer-coupon-btn bdi,
#coupon-apply-btn bdi {
  color: #ffffff !important;
  font-weight: 800 !important;
}

/* Luxury Soft Champagne Gold ONLY when coupon discount is applied */
#drawer-coupon-btn.note-btn-gold,
#coupon-apply-btn.note-btn-gold {
  background: linear-gradient(135deg, #f5e9c9 0%, #dfc485 100%) !important;
  color: #111111 !important;
  border: 1px solid rgba(195, 160, 85, 0.5) !important;
  box-shadow: 0 2px 8px rgba(223, 196, 133, 0.35) !important;
}
#drawer-coupon-btn.note-btn-gold:hover,
#coupon-apply-btn.note-btn-gold:hover {
  background: linear-gradient(135deg, #faefd4 0%, #e6cd90 100%) !important;
  box-shadow: 0 4px 14px rgba(223, 196, 133, 0.45) !important;
  transform: translateY(-1px);
}
#drawer-coupon-btn.note-btn-gold span,
#coupon-apply-btn.note-btn-gold span,
#drawer-coupon-btn.note-btn-gold bdi,
#coupon-apply-btn.note-btn-gold bdi {
  color: #111111 !important;
  font-weight: 800 !important;
}

/* Celebratory Coupon Keyframes */
@keyframes noteCouponAppliedPulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  35% { transform: scale(1.025); border-color: #10b981 !important; box-shadow: 0 0 0 10px rgba(16, 185, 129, 0.18), 0 6px 20px rgba(16, 185, 129, 0.15); }
  70% { transform: scale(0.995); border-color: #10b981 !important; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.08); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}
.note-coupon-applied-anim { animation: noteCouponAppliedPulse 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) both !important; }
@keyframes noteCouponTagPop {
  0% { transform: scale(0) rotate(-15deg); opacity: 0; }
  60% { transform: scale(1.22) rotate(4deg); opacity: 1; }
  80% { transform: scale(0.95) rotate(-2deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
.note-coupon-tag-anim { animation: noteCouponTagPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both !important; }
@keyframes noteConfettiBurst {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
  75% { opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0.4) rotate(var(--rot)); opacity: 0; }
}
.note-confetti-piece { position: absolute; pointer-events: none; z-index: 50; animation: noteConfettiBurst 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
@keyframes notePriceDrop {
  0% { transform: scale(1); color: #10b981 !important; }
  45% { transform: scale(1.18); color: #059669 !important; text-shadow: 0 0 12px rgba(16, 185, 129, 0.4); }
  100% { transform: scale(1); }
}
.note-price-drop-anim { display: inline-block !important; animation: notePriceDrop 0.8s ease-out both !important; }
@keyframes noteMsgSlideDown {
  0% { opacity: 0; transform: translateY(-8px); }
  100% { opacity: 1; transform: translateY(0); }
}
.note-msg-anim { animation: noteMsgSlideDown 0.35s ease-out both !important; }
`;document.head.append(badgeStyle);
  const integrationStyles=document.createElement("style");integrationStyles.id="note-live-styles";integrationStyles.textContent="/* NOTE 4.4: Laverne-Parity Cart Drawer, 2-Tier Item Cards, Scrollable Coupon & Recommendations */\n#cart-drawer-overlay {\n  z-index: 9998 !important;\n}\n\n#cart-drawer:not(.hidden):not([hidden]) {\n  display: flex !important;\n  flex-direction: column !important;\n  height: 100vh !important;\n  height: 100dvh !important;\n  max-height: 100dvh !important;\n  overflow: hidden !important;\n  z-index: 9999 !important;\n}\n\n#cart-drawer-scroll-area {\n  flex: 1 1 auto !important;\n  overflow-y: auto !important;\n  overscroll-behavior: contain !important;\n  -webkit-overflow-scrolling: touch !important;\n  min-height: 0 !important;\n}\n\n#cart-drawer-items {\n  min-height: 0 !important;\n  max-height: none !important;\n  overflow: visible !important;\n  padding: 0 !important;\n}\n\n/* Laverne-Parity Cart Item Card (Drawer & Page) */\n.note-cart-item {\n  display: block !important;\n  background: #ffffff !important;\n  border: 1px solid #e7e5e4 !important;\n  border-radius: 18px !important;\n  padding: 14px 16px !important;\n  margin-bottom: 12px !important;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02) !important;\n  text-align: right !important;\n  direction: rtl !important;\n  box-sizing: border-box !important;\n  position: relative !important;\n}\n@media (min-width: 640px) {\n  .note-cart-item {\n    padding: 18px 20px !important;\n    margin-bottom: 14px !important;\n    border-radius: 20px !important;\n  }\n}\n\n.note-cart-item-top {\n  display: flex !important;\n  flex-direction: row !important;\n  align-items: flex-start !important;\n  justify-content: space-between !important;\n  gap: 12px !important;\n  width: 100% !important;\n  box-sizing: border-box !important;\n}\n\n.note-cart-item-start {\n  display: flex !important;\n  flex-direction: row !important;\n  align-items: center !important;\n  gap: 12px !important;\n  min-width: 0 !important;\n  flex: 1 1 auto !important;\n}\n\n.note-cart-item .cart-drawer-thumb,\n.note-cart-item-thumb {\n  width: 82px !important;\n  height: 82px !important;\n  min-width: 82px !important;\n  min-height: 82px !important;\n  max-width: 82px !important;\n  max-height: 82px !important;\n  border-radius: 14px !important;\n  background: #ffffff !important;\n  border: 1px solid #f0eee9 !important;\n  padding: 4px !important;\n  flex-shrink: 0 !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  overflow: hidden !important;\n  box-sizing: border-box !important;\n}\n@media (min-width: 640px) {\n  .note-cart-item .cart-drawer-thumb,\n  .note-cart-item-thumb {\n    width: 96px !important;\n    height: 96px !important;\n    min-width: 96px !important;\n    min-height: 96px !important;\n    max-width: 96px !important;\n    max-height: 96px !important;\n    border-radius: 16px !important;\n  }\n}\n\n.note-cart-item-thumb img,\n.note-cart-item .cart-drawer-thumb img {\n  width: 100% !important;\n  height: 100% !important;\n  max-width: 100% !important;\n  max-height: 100% !important;\n  object-fit: contain !important;\n}\n\n.note-cart-item-info {\n  display: flex !important;\n  flex-direction: column !important;\n  justify-content: center !important;\n  gap: 4px !important;\n  min-width: 0 !important;\n  flex: 1 1 auto !important;\n  text-align: right !important;\n}\n\n.note-cart-item-title-link {\n  text-decoration: none !important;\n  color: inherit !important;\n  display: block !important;\n}\n\n.note-cart-item h4,\n.note-cart-item-title {\n  font-size: 15px !important;\n  font-weight: 700 !important;\n  color: #1c1917 !important;\n  line-height: 1.35 !important;\n  margin: 0 !important;\n  text-decoration: none !important;\n  display: -webkit-box !important;\n  -webkit-line-clamp: 2 !important;\n  -webkit-box-orient: vertical !important;\n  overflow: hidden !important;\n}\n@media (min-width: 640px) {\n  .note-cart-item h4,\n  .note-cart-item-title {\n    font-size: 17px !important;\n  }\n}\n\n.note-cart-item-prices {\n  display: flex !important;\n  flex-direction: row !important;\n  align-items: baseline !important;\n  gap: 8px !important;\n  margin-top: 2px !important;\n}\n\n.note-cart-item-old-price {\n  font-size: 13px !important;\n  font-weight: 500 !important;\n  color: #a8a29e !important;\n  text-decoration: line-through !important;\n}\n\n.note-cart-item-sale-price {\n  font-size: 15px !important;\n  font-weight: 800 !important;\n  color: #ef4444 !important;\n}\n@media (min-width: 640px) {\n  .note-cart-item-old-price { font-size: 14px !important; }\n  .note-cart-item-sale-price { font-size: 17px !important; }\n}\n\n.note-cart-item-del-btn,\nbutton.note-cart-item-del-btn,\nbutton.note-cart-item-del-btn {\n  width: 28px !important;\n  height: 28px !important;\n  min-width: 28px !important;\n  min-height: 28px !important;\n  max-width: 28px !important;\n  max-height: 28px !important;\n  border-radius: 9999px !important;\n  background-color: #f87171 !important;\n  background: #f87171 !important;\n  border: none !important;\n  outline: none !important;\n  color: #ffffff !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  padding: 0 !important;\n  cursor: pointer !important;\n  flex-shrink: 0 !important;\n  box-shadow: 0 1px 3px rgba(248, 113, 113, 0.35) !important;\n  transition: background-color 0.15s ease, transform 0.15s ease !important;\n  appearance: none !important;\n  -webkit-appearance: none !important;\n}\n.note-cart-item-del-btn:hover,\nbutton.note-cart-item-del-btn:hover,\nbutton.note-cart-item-del-btn:hover {\n  background-color: #ef4444 !important;\n  background: #ef4444 !important;\n  color: #ffffff !important;\n}\n.note-cart-item-del-btn:active,\nbutton.note-cart-item-del-btn:active {\n  transform: scale(0.92) !important;\n}\n.note-cart-item-del-btn svg {\n  width: 11px !important;\n  height: 11px !important;\n  stroke: #ffffff !important;\n  stroke-width: 2.5 !important;\n  display: block !important;\n  margin: auto !important;\n}\n\n.note-cart-item-divider {\n  width: 100% !important;\n  height: 1px !important;\n  min-height: 1px !important;\n  max-height: 1px !important;\n  background-color: #f0eee9 !important;\n  border: none !important;\n  margin: 12px 0 !important;\n  padding: 0 !important;\n  display: block !important;\n}\n\n.note-cart-item-bottom {\n  display: flex !important;\n  flex-direction: row !important;\n  align-items: center !important;\n  justify-content: space-between !important;\n  width: 100% !important;\n  box-sizing: border-box !important;\n}\n\n.note-cart-item-stepper {\n  display: inline-flex !important;\n  flex-direction: row !important;\n  align-items: center !important;\n  height: 38px !important;\n  width: 126px !important;\n  min-width: 126px !important;\n  border: 1px solid #e7e5e4 !important;\n  border-radius: 11px !important;\n  background: #ffffff !important;\n  overflow: hidden !important;\n  box-sizing: border-box !important;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02) !important;\n}\n@media (min-width: 640px) {\n  .note-cart-item-stepper {\n    height: 40px !important;\n    width: 136px !important;\n  }\n}\n\n.note-cart-item-stepper-btn {\n  width: 38px !important;\n  height: 100% !important;\n  min-width: 38px !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  background: transparent !important;\n  border: none !important;\n  color: #57534e !important;\n  font-size: 17px !important;\n  font-weight: 700 !important;\n  cursor: pointer !important;\n  padding: 0 !important;\n  transition: background-color 0.15s ease, color 0.15s ease !important;\n  appearance: none !important;\n  -webkit-appearance: none !important;\n}\n@media (min-width: 640px) {\n  .note-cart-item-stepper-btn {\n    width: 42px !important;\n    min-width: 42px !important;\n    font-size: 18px !important;\n  }\n}\n.note-cart-item-stepper-btn:hover {\n  background: #f5f5f4 !important;\n  color: #000000 !important;\n}\n.note-cart-item-stepper-btn:active {\n  background: #e7e5e4 !important;\n}\n\n.note-cart-item-stepper-val {\n  flex: 1 1 auto !important;\n  height: 100% !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  border-left: 1px solid #e7e5e4 !important;\n  border-right: 1px solid #e7e5e4 !important;\n  background: #fafaf9 !important;\n  font-size: 14px !important;\n  font-weight: 700 !important;\n  color: #1c1917 !important;\n  user-select: none !important;\n  box-sizing: border-box !important;\n}\n@media (min-width: 640px) {\n  .note-cart-item-stepper-val {\n    font-size: 15px !important;\n  }\n}\n\n.note-cart-item-total {\n  display: flex !important;\n  flex-direction: row !important;\n  align-items: baseline !important;\n  gap: 5px !important;\n  text-align: left !important;\n}\n\n.note-cart-item-total-label {\n  font-size: 13px !important;\n  font-weight: 500 !important;\n  color: #78716c !important;\n}\n@media (min-width: 640px) {\n  .note-cart-item-total-label {\n    font-size: 14px !important;\n  }\n}\n\n.note-cart-item-total-val {\n  font-size: 16px !important;\n  font-weight: 800 !important;\n  color: #1c1917 !important;\n}\n@media (min-width: 640px) {\n  .note-cart-item-total-val {\n    font-size: 18px !important;\n  }\n}\n\n#cart-drawer-coupon-box {\n  flex-shrink: 0 !important;\n  margin-top: 4px !important;\n  margin-bottom: 4px !important;\n}\n\n#cart-drawer-recommendations {\n  padding: 8px 0 !important;\n  margin: 0 !important;\n  background: transparent !important;\n  border: none !important;\n  flex-shrink: 0 !important;\n}\n\nbody.cart-drawer-open #whatsapp-floating-btn,\nbody.cart-drawer-open .whatsapp-btn,\nbody.cart-drawer-open [class*=whatsapp],\nbody.cart-drawer-open [id*=whatsapp],\nbody:has(#cart-drawer:not(.hidden)) #whatsapp-floating-btn,\nbody:has(#cart-drawer:not(.hidden)) .whatsapp-btn,\nbody:has(#cart-drawer:not(.hidden)) [class*=whatsapp],\n#cart-drawer:not(.hidden) ~ #whatsapp-floating-btn,\n#cart-drawer:not(.hidden) ~ [class*=whatsapp] {\n  display: none !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n  visibility: hidden !important;\n}\n\n#cart-drawer-recommendations h3,\n#cart-drawer-recommendations h2,\n#cart-drawer-recommendations .note-recs-title {\n  font-size: 10px !important;\n  font-weight: 700 !important;\n  color: #57534e !important;\n  margin-bottom: 4px !important;\n}\n\n.note-compact-recs {\n  display: flex !important;\n  gap: 8px !important;\n  overflow-x: auto !important;\n  scrollbar-width: none !important;\n  scroll-snap-type: none !important;\n  padding: 2px 0 4px !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  overscroll-behavior-x: contain !important;\n  -webkit-overflow-scrolling: touch !important;\n}\n.note-compact-recs::-webkit-scrollbar {\n  display: none !important;\n}\n\n.note-mini-card {\n  flex: 0 0 auto !important;\n  width: auto !important;\n  max-width: 175px !important;\n  min-width: 135px !important;\n  height: 38px !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: space-between !important;\n  gap: 6px !important;\n  padding: 3px 6px 3px 4px !important;\n  background: #ffffff !important;\n  border: 1px solid #e7e5e4 !important;\n  border-radius: 9999px !important;\n  box-sizing: border-box !important;\n  box-shadow: 0 1px 2px rgba(0,0,0,0.02) !important;\n  color: #111 !important;\n  text-align: right !important;\n}\n\n.note-mini-card a {\n  display: inline-flex !important;\n  align-items: center !important;\n  gap: 6px !important;\n  text-decoration: none !important;\n  color: inherit !important;\n  min-width: 0 !important;\n  flex: 1 1 auto !important;\n}\n\n.note-mini-card img {\n  width: 28px !important;\n  height: 28px !important;\n  object-fit: contain !important;\n  border-radius: 9999px !important;\n  background: #fafaf9 !important;\n  flex-shrink: 0 !important;\n}\n\n.note-mini-card .note-mini-info {\n  display: flex !important;\n  flex-direction: column !important;\n  min-width: 0 !important;\n  line-height: 1.15 !important;\n}\n\n.note-mini-card .note-mini-title {\n  font-size: 9.5px !important;\n  font-weight: 700 !important;\n  color: #111 !important;\n  white-space: nowrap !important;\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  max-width: 65px !important;\n  display: block !important;\n}\n\n.note-mini-card .note-mini-price {\n  font-size: 9.5px !important;\n  font-weight: 800 !important;\n  color: #a58b52 !important;\n  white-space: nowrap !important;\n  display: block !important;\n}\n\n.note-mini-card button {\n  flex-shrink: 0 !important;\n  width: auto !important;\n  min-width: 32px !important;\n  height: 24px !important;\n  padding: 0 7px !important;\n  font-size: 9.5px !important;\n  font-weight: 700 !important;\n  border-radius: 9999px !important;\n  background: #111111 !important;\n  color: #ffffff !important;\n  margin: 0 !important;\n  border: none !important;\n  cursor: pointer !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  transition: background 0.15s, transform 0.15s !important;\n}\n\n.note-mini-card button:hover {\n  background: #333333 !important;\n}\n\n.note-mini-card button:active {\n  transform: scale(0.92) !important;\n}\n\n#cart-drawer-footer {\n  padding: 12px 16px 14px !important;\n  border-top: 1px solid #f0eee9 !important;\n  background: #ffffff !important;\n  flex-shrink: 0 !important;\n}\n\n#cart-page-recommendations-section {\n  margin-top: 20px !important;\n  padding: 14px !important;\n  border-radius: 16px !important;\n}\n#cart-page-recommendations-section h3,\n#cart-page-recommendations-section h2 {\n  font-size: 13px !important;\n  margin-bottom: 8px !important;\n}\n\n.note-bundle-options {\n  margin: 18px 0;\n  padding: 16px;\n  border: 1px solid #d6d3d1;\n  border-radius: 14px;\n  clear: both;\n  width: 100%;\n  font-size: 13px;\n}\n.note-bundle-options h3 {\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.note-bundle-options fieldset {\n  margin: 12px 0;\n  border: 0;\n  padding: 0;\n}\n.note-bundle-options legend {\n  font-weight: 700;\n  margin-bottom: 6px;\n}\n.note-bundle-options label {\n  display: block;\n  font-size: 12px;\n  margin: 6px 0;\n}\n.note-bundle-options select {\n  display: block;\n  width: 100%;\n  min-height: 44px;\n  background: white;\n  color: #111;\n  border: 1px solid #a8a29e;\n  border-radius: 8px;\n  padding: 9px;\n  margin-top: 4px;\n}\n.note-bundle-options select:focus-visible,\n.note-mini-card button:focus-visible {\n  outline: 2px solid #a58b52;\n  outline-offset: 3px;\n}\n\n.note-empty-products {\n  padding: 16px;\n  font-size: 13px;\n  color: #78716c;\n}\n\nbutton:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n\n@media(prefers-reduced-motion:reduce){\n  .note-compact-recs{scroll-behavior:auto!important}\n}\n\nbutton[aria-label=\"\u062d\u0630\u0641 \u0627\u0644\u0645\u0646\u062a\u062c \u0645\u0646 \u0627\u0644\u0633\u0644\u0629\"] {\n  color: #78716c !important;\n  transition: color 0.15s ease !important;\n}\nbutton[aria-label=\"\u062d\u0630\u0641 \u0627\u0644\u0645\u0646\u062a\u062c \u0645\u0646 \u0627\u0644\u0633\u0644\u0629\"]:hover {\n  color: #be123c !important;\n}\n\n/* Continuous Luxury Brand Loader - Active from frame 0 until .note-ready is added */\nbody:not(.note-ready)::before {\n  content: \"\" !important;\n  position: fixed !important;\n  inset: 0 !important;\n  width: 100vw !important;\n  height: 100vh !important;\n  height: 100dvh !important;\n  background-color: #ffffff !important;\n  background-image: url('https://youssefrasheed.github.io/note-zid-styles/logo_dark_crisp.png') !important;\n  background-repeat: no-repeat !important;\n  background-position: center calc(50% - 25px) !important;\n  background-size: 130px auto !important;\n  z-index: 99999999 !important;\n  pointer-events: all !important;\n  opacity: 1 !important;\n  visibility: visible !important;\n  animation: none !important;\n  transition: opacity 0.4s ease-out, visibility 0.4s ease-out !important;\n}\n\nbody:not(.note-ready)::after {\n  content: \"\" !important;\n  position: fixed !important;\n  top: calc(50% + 40px) !important;\n  left: 50% !important;\n  margin-left: -13px !important;\n  width: 26px !important;\n  height: 26px !important;\n  border: 2.5px solid #eceae5 !important;\n  border-top-color: #121212 !important;\n  border-radius: 50% !important;\n  z-index: 999999999 !important;\n  animation: noteSpinRing 0.75s linear infinite !important;\n  pointer-events: none !important;\n  opacity: 1 !important;\n  visibility: visible !important;\n  transition: opacity 0.4s ease-out, visibility 0.4s ease-out !important;\n}\n\nbody.note-ready::before,\nbody.note-ready::after {\n  opacity: 0 !important;\n  visibility: hidden !important;\n  pointer-events: none !important;\n}\n\n@keyframes noteLoaderPulse {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(0.96);\n    opacity: 0.75;\n  }\n}\n\n@keyframes noteSpinRing {\n  to { transform: rotate(360deg); }\n}\n\nbody[class*=\"checkout\"]::before,\nbody[class*=\"checkout\"]::after,\nbody[class*=\"auth\"]::before,\nbody[class*=\"auth\"]::after,\nbody[class*=\"account\"]::before,\nbody[class*=\"account\"]::after {\n  display: none !important;\n  opacity: 0 !important;\n  visibility: hidden !important;\n}\n\n#loader-container {\n  display: none !important;\n}\n\nbody:not(.note-ready) section[section-id],\nbody:not(.note-ready) .tp-home,\nbody:not(.note-ready) .tp-bar-header,\nbody:not(.note-ready) header.header-nav,\nbody:not(.note-ready) footer:not(#note-store-footer) {\n  display: none !important;\n  visibility: hidden !important;\n}\n\n#cart-drawer-recommendations .flex > span:first-child,\n#cart-drawer-recommendations .note-recs-title,\n#cart-drawer-recommendations h3,\n#cart-drawer-recommendations h2 {\n  font-size: 14px !important;\n  font-weight: 800 !important;\n  color: #111111 !important;\n  display: flex !important;\n  align-items: center !important;\n  gap: 6px !important;\n}\n#cart-drawer-recommendations .flex > span:first-child span {\n  display: inline !important;\n}\n\n#cart-drawer-recommendations .note-recs-subtitle, #cart-drawer-recommendations .text-stone-400, #cart-drawer-recommendations span[class*='text-stone-400'] {\n  display: none !important;\n}\n\n/* Active Nav Links Underline (100% Reference Parity) */\n#nav-links a.border-b-2,\nheader nav a.border-b-2,\n#nav-links a.active-link,\nheader nav a.active-link {\n  border-bottom: 2px solid currentColor !important;\n  padding-bottom: 2px !important;\n  opacity: 1 !important;\n}\n\n#nav-links a:not(.active-link),\nheader nav a:not(.active-link) {\n  border-bottom: 2px solid transparent !important;\n  padding-bottom: 2px !important;\n}\n\n/* Bottom Navigation Bar Cart Badge Perfect Centering */\n.cart-badge,\n.header-sm .cart-badge,\n.cart-sm .cart-badge,\n.cart-btn .cart-badge {\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  text-align: center !important;\n  line-height: 1 !important;\n  direction: ltr !important;\n  min-width: 18px !important;\n  height: 18px !important;\n  padding: 0 2px !important;\n  margin: 0 !important;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif !important;\n  font-feature-settings: \"tnum\" !important;\n  font-variant-numeric: tabular-nums !important;\n  font-size: 11px !important;\n  font-weight: 800 !important;\n  border-radius: 9999px !important;\n  box-sizing: border-box !important;\n  position: absolute !important;\n  top: -5px !important;\n  left: -2px !important;\n  background-color: #f44336 !important;\n  color: #ffffff !important;\n}\n\n/* Out of Stock (\"\u063a\u064a\u0631 \u0645\u062a\u0627\u062d\") Luxury Sticker & State */\n.note-out-of-stock-sticker,\n.out-of-stock,\n.tp-product-image .out-of-stock {\n  position: absolute !important;\n  top: 50% !important;\n  left: 50% !important;\n  transform: translate(-50%, -50%) rotate(-18deg) !important;\n  z-index: 25 !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  width: max-content !important;\n  height: max-content !important;\n  background: rgba(225, 29, 72, 0.82) !important;\n  backdrop-filter: blur(4px) !important;\n  -webkit-backdrop-filter: blur(4px) !important;\n  color: #ffffff !important;\n  font-family: inherit !important;\n  font-size: 11px !important;\n  font-weight: 800 !important;\n  letter-spacing: 0.5px !important;\n  padding: 4px 14px !important;\n  border-radius: 9999px !important;\n  border: 1.5px solid rgba(255, 255, 255, 0.85) !important;\n  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.25) !important;\n  pointer-events: none !important;\n  white-space: nowrap !important;\n}\n\n@media (min-width: 640px) {\n  .note-out-of-stock-sticker,\n  .out-of-stock,\n  .tp-product-image .out-of-stock {\n    font-size: 12px !important;\n    padding: 5px 16px !important;\n  }\n}\n\n.note-out-of-stock-sticker.pdp-sticker {\n  font-size: 14px !important;\n  padding: 6px 22px !important;\n  border-width: 2px !important;\n  box-shadow: 0 6px 20px rgba(225, 29, 72, 0.4) !important;\n}\n\n@media (min-width: 640px) {\n  .note-out-of-stock-sticker.pdp-sticker {\n    font-size: 16px !important;\n    padding: 8px 26px !important;\n  }\n}\n\n#pdp-main-image-container {\n  background-color: #ffffff !important;\n  background: #ffffff !important;\n  border: none !important;\n  box-shadow: none !important;\n}\n\n.is-out-of-stock img,\n.product-item-out-of-stock img,\n#pdp-main-image-container.is-out-of-stock #pdp-main-image {\n  filter: grayscale(0.55) opacity(0.85) !important;\n  transition: filter 0.3s ease !important;\n}\n\n/* Recommended Products Modern Desktop & Mobile Scroll */\n.note-compact-recs {\n  display: flex !important;\n  gap: 8px !important;\n  overflow-x: auto !important;\n  scrollbar-width: thin !important;\n  scrollbar-color: #d6d3d1 transparent !important;\n  scroll-snap-type: none !important;\n  padding: 4px 2px 6px !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  overscroll-behavior-x: contain !important;\n  -webkit-overflow-scrolling: touch !important;\n  cursor: grab !important;\n  user-select: none !important;\n}\n.note-compact-recs:active {\n  cursor: grabbing !important;\n}\n.note-compact-recs::-webkit-scrollbar {\n  display: block !important;\n  height: 4px !important;\n}\n.note-compact-recs::-webkit-scrollbar-track {\n  background: #f5f5f4 !important;\n  border-radius: 9999px !important;\n}\n.note-compact-recs::-webkit-scrollbar-thumb {\n  background: #d6d3d1 !important;\n  border-radius: 9999px !important;\n}\n.note-compact-recs::-webkit-scrollbar-thumb:hover {\n  background: #78716c !important;\n}\n\n.note-recs-nav {\n  display: inline-flex !important;\n  align-items: center !important;\n  gap: 4px !important;\n}\n.note-recs-btn {\n  width: 22px !important;\n  height: 22px !important;\n  border-radius: 9999px !important;\n  border: 1px solid #e7e5e4 !important;\n  background: #ffffff !important;\n  color: #1c1917 !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  cursor: pointer !important;\n  transition: all 0.15s ease !important;\n  padding: 0 !important;\n  flex-shrink: 0 !important;\n  box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;\n}\n.note-recs-btn:hover {\n  background: #000000 !important;\n  color: #ffffff !important;\n  border-color: #000000 !important;\n}\n.note-recs-btn:active {\n  transform: scale(0.92) !important;\n}\n\n/* More legible and enlarged cart recommendations */\n#cart-drawer-recommendations {padding: 10px 0 6px !important;}\n.note-compact-recs {gap: 10px !important; padding: 4px 2px 8px !important;}\n.note-mini-card {min-width: 260px !important; max-width: 290px !important; height: 78px !important; padding: 8px 12px !important; gap: 10px !important; border-radius: 16px !important; background: #ffffff !important; border: 1px solid #e7e5e4 !important; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03) !important;}\n.note-mini-card a {gap: 10px !important;}\n.note-mini-card img {width: 58px !important; height: 58px !important; min-width: 58px !important; min-height: 58px !important; border-radius: 12px !important; background: #fafaf9 !important; border: 1px solid #f0eee9 !important; padding: 4px !important;}\n.note-mini-card .note-mini-info {gap: 3px !important; line-height: 1.35 !important;}\n.note-mini-card .note-mini-title {font-size: 13.5px !important; font-weight: 700 !important; color: #1c1917 !important; max-width: 130px !important; white-space: normal !important; display: -webkit-box !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical !important; line-height: 1.35 !important;}\n.note-mini-card .note-mini-price {font-size: 13.5px !important; font-weight: 800 !important; color: #111111 !important;}\n.note-mini-card button {min-width: 52px !important; height: 38px !important; font-size: 12.5px !important; font-weight: 700 !important; padding: 0 12px !important; border-radius: 9999px !important; background: #111111 !important; color: #ffffff !important;}\n.note-recs-btn {width: 26px !important; height: 26px !important;}\n#cart-drawer-recommendations h3, #cart-drawer-recommendations h2 {font-size: 14px !important;}\n.note-cart-item .cart-drawer-thumb {width:96px!important;height:96px!important;}\n.note-cart-item h4 {font-size:16px!important;line-height:1.4!important;-webkit-line-clamp:2!important;font-weight:700!important;}\n.note-cart-item .text-\\[11px\\] {font-size:12px!important;}\n.note-cart-page-item h4 {font-size:14px!important;line-height:1.45!important;}\n.note-cart-page-item > div:first-child {min-width:0;}\n.note-cart-page-item > div:first-child > a {width:80px!important;height:80px!important;}\n.note-cart-page-item > div:first-child > div {min-width:0;}\n.note-cart-page-item .text-\\[11px\\] {font-size:12px!important;}\n.note-cart-page-item .font-bold.text-black {font-size:14px!important;}\n.note-cart-page-item {display:block!important;background:#ffffff!important;border:1px solid #e7e5e4!important;border-radius:16px!important;padding:14px 16px!important;margin-bottom:12px!important;text-align:right!important;box-shadow:0 1px 3px rgba(0,0,0,0.02)!important;}\n@media(min-width:640px) {\n .note-cart-page-item {padding:18px 22px!important;}\n}\n.note-cart-page-item .cart-thumb-box {width:76px!important;height:76px!important;border-radius:12px!important;background:#fafaf9!important;border:1px solid #e7e5e4!important;padding:4px!important;flex-shrink:0!important;display:flex!important;align-items:center!important;justify-content:center!important;}\n@media(min-width:640px) {\n .note-cart-page-item .cart-thumb-box {width:84px!important;height:84px!important;}\n}\n/* NOTE Luxury Add-To-Cart Button Micro-Interaction & Keyframes */\n@keyframes noteBtnPop {\n  0% { transform: scale(1); }\n  25% { transform: scale(0.92); }\n  60% { transform: scale(1.05); }\n  100% { transform: scale(1); }\n}\n@keyframes noteCheckPop {\n  0% { transform: scale(0) rotate(-30deg); opacity: 0; }\n  60% { transform: scale(1.25) rotate(6deg); opacity: 1; }\n  100% { transform: scale(1) rotate(0deg); opacity: 1; }\n}\n@keyframes notePulseGlow {\n  0% {\n    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7), 0 2px 10px rgba(0, 0, 0, 0.2);\n  }\n  60% {\n    box-shadow: 0 0 0 12px rgba(16, 185, 129, 0), 0 4px 16px rgba(16, 185, 129, 0.25);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0), 0 2px 6px rgba(0, 0, 0, 0.1);\n  }\n}\n@keyframes noteHeaderCartShake {\n  0% { transform: scale(1) rotate(0deg); }\n  20% { transform: scale(1.2) rotate(-10deg); }\n  40% { transform: scale(1.2) rotate(10deg); }\n  60% { transform: scale(1.1) rotate(-5deg); }\n  80% { transform: scale(1.05) rotate(5deg); }\n  100% { transform: scale(1) rotate(0deg); }\n}\n.note-cart-shake {\n  animation: noteHeaderCartShake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both !important;\n}\n.note-btn-added {\n  animation: noteBtnPop 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), notePulseGlow 0.8s ease-out !important;\n  background-color: #000000 !important;\n  color: #ffffff !important;\n  border-color: #10b981 !important;\n  pointer-events: none !important;\n  transform-origin: center center !important;\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n.note-btn-added .note-check-icon {\n  display: inline-flex !important;\n  vertical-align: middle !important;\n  animation: noteCheckPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;\n}\n";document.head.append(integrationStyles);

  // Live storefront integration. Kept separately so rebuilding templates preserves fixes.
  var formatPrice = typeof formatPrice !== 'undefined' ? formatPrice : (typeof window.formatPrice === 'function' ? window.formatPrice : function(val) {
    if (val === null || val === undefined || val === '' || val === 'null' || val === 'undefined') return '';
    const clean = String(val).replace(/ر\.س/g, '').replace(/SAR/gi, '').trim();
    return clean ? `${clean} ر.س` : '';
  });
  if (!window.formatPrice) window.formatPrice = formatPrice;

  var escapeHTML = typeof escapeHTML !== 'undefined' ? escapeHTML : (typeof window.escapeHTML === 'function' ? window.escapeHTML : function(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  });
  if (!window.escapeHTML) window.escapeHTML = escapeHTML;
  const cleanSpelling = str => String(str ?? '')
    .replace(/الباكدجات/g, 'الباكجات')
    .replace(/باكدجات/g, 'باكجات')
    .replace(/الباكدج/g, 'الباكج')
    .replace(/باكدج/g, 'باكج')
    .replace(/العروض\s*و\s*البكجات/g, 'العروض والباكجات')
    .replace(/العروض\s*و\s*الباكجات/g, 'العروض والباكجات')
    .replace(/البكجات/g, 'الباكجات')
    .replace(/بكجات/g, 'باكجات');
  const KNOWN_PRODUCT_FALLBACKS = {
    '83561f07-7f51-43a4-a632-2030d6b71bc1': '/products/09_Linen_Room_Spray_Brand_Box.webp',
    'مجموعة-معطرات-الجو-و-المفارش': '/products/09_Linen_Room_Spray_Brand_Box.webp',
    'pkg-linen-collection': '/products/09_Linen_Room_Spray_Brand_Box.webp'
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
      const cachedCats = localStorage.getItem('note_zid_categories_v1');
      if (cachedCats) {
        const parsedCats = JSON.parse(cachedCats);
        if (Array.isArray(parsedCats) && parsedCats.length) {
          registerCategories(parsedCats, false);
          refreshCategoryUI();
        }
      }
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
      const fallbackImgBox = null;
      const img = liveImage(z.images?.[0], z.id) || fallbackImg || '';
      const img_box = null;
      const rawName = String(z.name || '').trim();
      const entry = {...prior, id:z.id, zid_id:z.id, slug, name:rawName, raw_name:rawName, zid_name:rawName, title:cleanSpelling(z.name || ''), title_en:z.name_en || '', price: sale ?? price, old_price:old,
        discount:old ? Number(((old-sale)/old*100).toFixed(1))+'%' : null,
        img: img, img_box: img_box,
        cat:category, cat_ar:cleanSpelling(categories.find(c => String(c.id) === catUrlMap[category]?.split('/')[2])?.name || categories[0]?.name || prior.cat_ar || ''),
        category_ids:categories.map(c => String(c.id)),
        display_order: (z.display_order !== null && z.display_order !== undefined && Number.isFinite(Number(z.display_order))) ? Number(z.display_order) : 999999,
        category_orders: Object.fromEntries(categories.map(c => [String(c.id), (c.display_order !== null && c.display_order !== undefined && Number.isFinite(Number(c.display_order))) ? Number(c.display_order) : null])),
        bestseller:sold > 0, sold_count:sold, tag:old ? 'خصم '+Number(((old-sale)/old*100).toFixed(1))+'%' : '',
        rating:Number(z.rating?.average) || 0, reviews_count:Number(z.rating?.total_count) || 0,
        in_stock:z.in_stock !== false && (z.is_infinite === true || Number(z.quantity) > 0), stock:z.is_infinite ? Infinity : Number(z.quantity),
        product_class:z.product_class, has_options:z.has_options, has_fields:z.has_fields,
        description:cleanSpelling(String(z.description || z.short_description || '').replace(/<[^>]*>/g,'')) || prior.description || '', size:prior.size || '100 مل', concentration:prior.concentration || '', notes:prior.notes || '', slogan:'',
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
  function resolveCurrentCategoryId(key) {
    if(!key || key==='all') return null;
    if(key==='new') return '1327929';
    if(key==='bestsellers') return '1697258';
    if(key.startsWith('zid-')) return key.slice(4);
    return categoryKeys[key] || null;
  }
  function getProductCategoryRank(p, targetCategoryId) {
    if (targetCategoryId) {
      const catOrder = p.category_orders?.[String(targetCategoryId)];
      if (catOrder !== null && catOrder !== undefined && Number.isFinite(Number(catOrder))) {
        return Number(catOrder);
      }
      // Unranked members follow explicitly ordered members in source order.
      return Number.MAX_SAFE_INTEGER;
    }
    if (p.display_order !== null && p.display_order !== undefined && Number.isFinite(Number(p.display_order))) {
      return Number(p.display_order);
    }
    return 999999;
  }
  function registerCategories(input, saveCache=true) {
    const flattened=[];
    function walk(items,parent) {for(const c of items||[]) {if(!c?.id || c.is_published===false)continue;flattened.push({...c,id:String(c.id),parent_id:c.parent_id||parent});walk(c.sub_categories,c.id);}}
    for(const c of input||[])if(c?.is_published===false)hiddenCategoryIds.add(String(c.id));else if(c?.id)hiddenCategoryIds.delete(String(c.id));
    walk(input);
    zidCategories=[...new Map(flattened.map(c=>[c.id, {...c, name: cleanSpelling(c.name).trim(), description: cleanSpelling(c.description || '')}])).values()];
    if(saveCache && typeof localStorage !== 'undefined') { try { localStorage.setItem('note_zid_categories_v1', JSON.stringify(input)); } catch(e) {} }
    const allCat = zidCategories.find(c => /جميع المنتجات|كل المنتجات/i.test(c.name));
    if (allCat) {
      catUrlMap.all = '/categories/' + allCat.id + '/' + encodeURIComponent(allCat.slug || allCat.name);
      categoryMeta.all = { title: allCat.name, desc: allCat.description || (categoryMeta.all && categoryMeta.all.desc) || '' };
    }
    for(const c of zidCategories) {
      if (allCat && c.id === allCat.id) continue;
      const key=categoryKey(c.id);
      catUrlMap[key]='/categories/'+c.id+'/'+encodeURIComponent(c.slug||c.name);
      if(!['new','bestsellers'].includes(key))categoryMeta[key]={title:c.name,desc:c.description||''};
    }
    for(const [key,id] of Object.entries(categoryKeys)) {const c=zidCategories.find(c=>c.id===id);if(c)catUrlMap[key]=catUrlMap[categoryKey(id)];}
  }
  function categoryProducts(key,products=noteProductsCatalog) {
    let list = [];
    let targetCatId = null;
    if (key === 'all') {
      const allCat = zidCategories.find(c => /جميع المنتجات|كل المنتجات/i.test(c.name));
      if (allCat) {
        targetCatId = String(allCat.id);
        const assigned = products.filter(p => (p.category_ids || []).includes(String(allCat.id)));
        list = assigned.length ? assigned : products.slice();
      } else {
        list = products.slice();
      }
    } else if (key === 'new' && (hiddenCategoryIds.has('1327929') || (categoryListAuthoritative && !zidCategories.some(c=>c.id==='1327929')))) {
      return [];
    } else {
      const id = key === 'new' ? '1327929' : key === 'bestsellers' ? '1697258' : key.startsWith('zid-') ? key.slice(4) : categoryKeys[key];
      if (!id || hiddenCategoryIds.has(String(id)) || (categoryListAuthoritative && !zidCategories.some(c=>c.id===String(id)))) return [];
      targetCatId = String(id);
      const ids = new Set([targetCatId]);
      for (let n=0; n<zidCategories.length; n++) {
        for (const c of zidCategories) {
          if (ids.has(String(c.parent_id))) ids.add(String(c.id));
        }
      }
      list = products.filter(p => (p.category_ids || []).some(cid => ids.has(String(cid))));
    }

    return list.slice().sort((a, b) => {
      const rankA = getProductCategoryRank(a, targetCatId);
      const rankB = getProductCategoryRank(b, targetCatId);
      if (rankA !== rankB) return rankA - rankB;
      return 0; // Stable source order for equal or unset ranks.
    });
  }
  function syncHomeCategoryOrder() {
    const grid=document.querySelector?.('#curated-sets .grid');
    if(!grid || !zidCategories.length)return;
    const aliases={'1500261':'1759040','1310036':'1759043','1688838':'1759042','1750048':'1759046','1759046':'1759046','1310037':'1759044'};
    const ranks=new Map(zidCategories.map((c,index)=>[c.id,index]));
    const cards=Array.from(grid.children);
    const rank=card=>{const id=card.getAttribute('href')?.match(/\/categories\/(\d+)\//)?.[1];return ranks.get(aliases[id]||id)??Number.MAX_SAFE_INTEGER;};
    const sorted=cards.slice().sort((a,b)=>rank(a)-rank(b));
    if(sorted.some((card,index)=>card!==cards[index]))sorted.forEach(card=>grid.appendChild(card));
  }
  function syncMobileMenu() {
    if (typeof document === 'undefined') return;
    const navs = typeof document.querySelectorAll === 'function' ? Array.from(document.querySelectorAll('#mobile-menu-drawer nav, #mobile-menu-drawer .flex.flex-col.gap-4')) : [];
    if (!navs.length && typeof document.querySelector === 'function') {
      const single = document.querySelector('#mobile-menu-drawer nav, #mobile-menu-drawer .flex.flex-col.gap-4');
      if (single) navs.push(single);
    }
    if (!navs.length || !zidCategories.length) return;
    const allCat = zidCategories.find(c => /جميع المنتجات|كل المنتجات/i.test(c.name));
    const categoriesToShow = zidCategories.filter(c => c.id !== '1759471' && !hiddenCategoryIds.has(String(c.id)) && (!allCat || c.id !== allCat.id));
    
    let html = '<a href="/" onclick="closeMobileMenu()" class="block py-1 hover:text-stone-500 transition">الرئيسية</a>\n';
    if (allCat) {
      const allUrl = catUrlMap.all || ('/categories/' + allCat.id + '/' + encodeURIComponent(allCat.slug || allCat.name));
      html += '<a href="' + allUrl + '" onclick="closeMobileMenu()" class="block py-1 hover:text-stone-500 transition">' + escapeHTML(cleanSpelling(allCat.name)) + '</a>\n';
    } else {
      html += '<a href="/category.html?cat=all" onclick="closeMobileMenu()" class="block py-1 hover:text-stone-500 transition">جميع المنتجات</a>\n';
    }
    
    for (const c of categoriesToShow) {
      const key = categoryKey(c.id);
      const url = catUrlMap[key] || ('/categories/' + c.id + '/' + encodeURIComponent(c.slug || c.name));
      html += '<a href="' + url + '" onclick="closeMobileMenu()" class="block py-1 hover:text-stone-500 transition">' + escapeHTML(cleanSpelling(c.name)) + '</a>\n';
    }
    
    navs.forEach(nav => {
      if (nav.innerHTML !== html) nav.innerHTML = html;
    });
  }
  function refreshCategoryUI() {
    syncHomeCategoryOrder();
    syncMobileMenu();
    const bar=document.getElementById('category-pills-bar');
    if(bar) {
      const allCat = zidCategories.find(c => /جميع المنتجات|كل المنتجات/i.test(c.name));
      const filteredZid = zidCategories.filter(c => c.id !== '1759471' && (!allCat || c.id !== allCat.id));
      const allName = allCat ? allCat.name : 'جميع المنتجات';
      const entries = [{ key: 'all', name: allName }, ...filteredZid.map(c => ({ key: categoryKey(c.id), name: c.name }))];
      const html=entries.filter(e=>{const id=e.key==='bestsellers'?'1697258':e.key==='new'?'1327929':e.key.replace('zid-','');return e.key==='all'||(!hiddenCategoryIds.has(id)&&(!categoryListAuthoritative||zidCategories.some(c=>c.id===id)));}).map(({key,name})=>'<button id="pill-'+key+'" data-note-category="'+key+'" onclick="selectCategory(\''+key+'\')" class="cat-pill px-4 py-2 rounded-full border whitespace-nowrap '+(key===activeCategory?'cat-pill-active bg-black text-white border-black':'border-stone-200 text-stone-700')+'">'+escapeHTML(name)+' ('+categoryProducts(key).length+')</button>').join('');
      if(bar.innerHTML!==html)bar.innerHTML=html;
    }
    const meta=categoryMeta[activeCategory]||categoryMeta.all;
    const title=document.getElementById('cat-title'),desc=document.getElementById('cat-desc');
    if(title){title.textContent=meta.title;document.title=meta.title+' | نوت للعطور';}if(desc)desc.textContent=meta.desc;
    const count=document.getElementById('cat-products-count');if(count){count.classList.remove('hidden','sm:inline-block');count.style.display='inline-block';}
    // Curated navigation points to actual populated dashboard categories. Exact category URLs remain distinct.
    for(const a of document.querySelectorAll('#curated-sets a[href*="/categories/"]')) {
      const match=a.getAttribute('href')?.match(/\/categories\/(\d+)\//);if(!match)continue;
      const replacements={'1500261':'niche','1310036':'travel','1688838':'all-over','1750048':'body-care','1310037':'linen'};
      const alias=replacements[match[1]];if(alias&&catUrlMap[alias])a.setAttribute('href',catUrlMap[alias]);
      const target=a.getAttribute('href')?.match(/\/categories\/(\d+)\//)?.[1];
      const liveCategory=zidCategories.find(c=>c.id===target);
      if(liveCategory) {
        const heading=a.querySelector('h3');if(heading)heading.textContent=cleanSpelling(liveCategory.name);
        a.setAttribute('aria-label',cleanSpelling(liveCategory.name));
      }
      a.hidden=target==='1759471'||hiddenCategoryIds.has(target)||(categoryListAuthoritative&&!zidCategories.some(c=>c.id===target));
    }
  }

  const _origOpenMobile = window.openMobileMenu;
  window.openMobileMenu = function() {
    syncMobileMenu();
    if (typeof _origOpenMobile === 'function') return _origOpenMobile.apply(this, arguments);
    const m = document.getElementById('mobile-menu-drawer');
    if (!m) return;
    m.classList.remove('hidden');
    setTimeout(() => {
      m.classList.remove('opacity-0');
      const drawerContent = m.querySelector('div');
      if (drawerContent) drawerContent.classList.remove('translate-x-full');
    }, 10);
  };

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
        console.warn('NOTE: تعذر تحديث المنتجات', error.message);
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
    formatVatPercent();
  };
  function formatVatPercent() {
    const summary = document.getElementById('cart-page-summary-wrapper') || document.body;
    if (!summary) return;
    const spans = summary.querySelectorAll('span');
    for (let i = 0; i < spans.length; i++) {
      const el = spans[i];
      if (el.children.length === 0 && el.textContent.includes('ضريبة القيمة المضافة') && !el.querySelector?.('.note-vat-rate')) {
        el.innerHTML = el.textContent.replace(/ضريبة القيمة المضافة(\s*\([^)]*\))?/g, 'ضريبة القيمة المضافة (<bdi class="note-vat-rate" dir="ltr">15%</bdi>):');
      }
    }
  }
  initSliders = function() {
    refreshCategoryUI();
    const groups = {
      'slider-bestsellers':categoryProducts('bestsellers'),
      'slider-niche':categoryProducts('niche'),
      'slider-new':categoryProducts('new')
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
    const discount=document.getElementById('pdp-discount-badge');
    if (discount) {
      discount.hidden=!product.discount;
      if (product.discount) discount.innerHTML = `<span>وفر</span> <bdi dir="ltr">${product.discount}</bdi>`;
    }
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
        const allBundleSelects=[];
        const enforceCrossGroup=groups.some(g=>!g.allow_duplicate_items);

        groups.forEach(group => {
          const fieldset=document.createElement('fieldset'),legend=document.createElement('legend');
          legend.textContent=group.name+(Number(group.required_selection_count)>1 ? ' — اختر '+group.required_selection_count : ''); fieldset.append(legend);
          for(let slot=0;slot<group.required_selection_count;slot++) {
            const label=document.createElement('label'),select=document.createElement('select');
            label.textContent=Number(group.required_selection_count)>1 ? 'الاختيار '+(slot+1) : group.name;
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
            allBundleSelects.push(select);
            fieldset.append(label,select);
          }
          box.append(fieldset);
        });

        const syncBundleDuplicates=()=>{
          if(!enforceCrossGroup) return;
          const chosen=new Set(allBundleSelects.map(s=>s.value).filter(Boolean));
          allBundleSelects.forEach(s=>{
            [...s.options].forEach(o=>{
              if(!o.value) return;
              let item=null;
              for(const g of groups) { item=g.items?.find(i=>i.item_id===o.value); if(item) break; }
              const outOfStock=!(item?.is_infinite || item?.quantity>0);
              const alreadyChosen=chosen.has(o.value) && s.value!==o.value;
              o.disabled=outOfStock || alreadyChosen;
              const baseName=item?.name || o.value;
              o.textContent=baseName + (outOfStock ? ' — غير متاح' : alreadyChosen ? ' — تم اختياره' : '');
            });
          });
        };
        allBundleSelects.forEach(s=>s.addEventListener('change',syncBundleDuplicates));
        syncBundleDuplicates();
      }).catch(()=>{if(box.isConnected) box.textContent='تعذر تحميل اختيارات الباقة. أعد المحاولة بعد قليل.';});
    }
  };
  function collectBundleSelections(product) {
    if(product.product_class!=='dynamic_bundle') return [];
    if(!activeBundleGroups.length) throw Error('انتظر تحميل اختيارات الباقة');
    const selections=[];
    const allChosenValues=[];
    const enforceCrossGroup=activeBundleGroups.some(g=>!g.allow_duplicate_items);

    activeBundleGroups.forEach(group => {
      const fields=[...document.querySelectorAll('#note-bundle-options select')].filter(s => s.dataset.group===group.selection_group_id);
      const values=fields.map(s=>s.value);
      if(values.length!==Number(group.required_selection_count) || values.some(v=>!v)) throw Error('اختار كل مكونات الباقة أولًا');
      if(!group.allow_duplicate_items && new Set(values).size!==values.length) throw Error('اختر منتجات مختلفة لهذه المجموعة');
      values.forEach(v => allChosenValues.push(v));

      values.forEach(value => {
        const item=group.items.find(i=>i.item_id===value);
        if(!item || !(item.is_infinite || item.quantity>0)) throw Error('أحد الاختيارات غير متاح');
        const existing=selections.find(s=>s.id===value && s.selection_group_id===group.selection_group_id);
        if(existing) existing.quantity++;
        else selections.push({id:value,quantity:1,selection_group_id:group.selection_group_id,name:item.name});
      });
    });

    if(enforceCrossGroup && new Set(allChosenValues).size!==allChosenValues.length) {
      throw Error('يرجى اختيار معطرات مختلفة للباقة دون تكرار');
    }

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
  CartManager.findTriggerButton=function(id,explicitBtn) {
    if(explicitBtn && explicitBtn.nodeType===1)return explicitBtn;
    if(typeof window!=='undefined' && window.event) {
      const target=window.event.target;
      const btn=target?.closest ? target.closest('button, [role="button"]') : null;
      if(btn)return btn;
    }
    if(typeof document!=='undefined') {
      if(document.activeElement && document.activeElement.tagName==='BUTTON') {
        return document.activeElement;
      }
      if(typeof currentProduct!=='undefined' && currentProduct && currentProduct.id===id) {
        const pdpBtn=typeof document.getElementById==='function' ? document.getElementById('pdp-add-cart-btn') : null;
        if(pdpBtn)return pdpBtn;
      }
      const quickViewBtn=typeof document.getElementById==='function' ? document.getElementById('modal-buy-btn') : null;
      if(quickViewBtn && quickViewBtn.offsetParent!==null)return quickViewBtn;
      if(typeof document.querySelector==='function') {
        const recBtn=document.querySelector('.note-mini-card button[data-product="'+id+'"]');
        if(recBtn)return recBtn;
        const cardBtn=document.querySelector('button[onclick*="'+id+'"]');
        if(cardBtn)return cardBtn;
      }
    }
    return null;
  };

  CartManager.animateButton=function(btn) {
    if(!btn || btn.nodeType!==1)return;
    if(btn.classList && typeof btn.classList.contains==='function' && btn.classList.contains('note-btn-added'))return;
    const originalHTML=btn.innerHTML;
    const originalWidth=btn.offsetWidth;
    const isPdp=btn.id==='pdp-add-cart-btn';
    if(originalWidth>0 && btn.style) {
      btn.style.width=originalWidth+'px';
    }
    if(btn.classList && typeof btn.classList.add==='function') {
      btn.classList.add('note-btn-added');
    }
    const checkIcon='<svg class="note-check-icon" width="'+(isPdp?'18':'15')+'" height="'+(isPdp?'18':'15')+'" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-left:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    const labelText=isPdp?'تمت الإضافة للسلة بنجاح':'تمت الإضافة';
    btn.innerHTML=checkIcon+'<span style="display:inline-block;vertical-align:middle;font-weight:700;">'+labelText+'</span>';
    const headerCartIcons=typeof document!=='undefined' && typeof document.querySelectorAll==='function' ? document.querySelectorAll('#site-header .sicon-shopping-bag, .cart-box, #cart-counter-badge, .cart-btn') : [];
    headerCartIcons.forEach(icon=>{
      if(icon.classList) {
        icon.classList.remove('note-cart-shake');
        void icon.offsetWidth;
        icon.classList.add('note-cart-shake');
        setTimeout(()=>icon.classList.remove('note-cart-shake'),650);
      }
    });
    setTimeout(()=>{
      if(btn.classList && typeof btn.classList.remove==='function') {
        btn.classList.remove('note-btn-added');
      }
      btn.innerHTML=originalHTML;
      if(btn.style) btn.style.width='';
    },1100);
  };

  const isUuid = (s) => typeof s === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
  const resolveZidUuid = (item) => {
    if (!item) return null;
    const rawKey = item.id || item.product_id;
    const p = (typeof noteProductsCatalog !== 'undefined') ? noteProductsCatalog.find(cp => cp.id === rawKey || cp.id === item.product_id || cp.slug === rawKey || (typeof ZID_PRODUCT_MAP !== 'undefined' && ZID_PRODUCT_MAP[rawKey] === cp.id)) : null;
    if (p && isUuid(p.zid_id)) return p.zid_id;
    if (typeof ZID_PRODUCT_MAP !== 'undefined') {
      if (ZID_PRODUCT_MAP[rawKey]) return ZID_PRODUCT_MAP[rawKey];
      if (p && ZID_PRODUCT_MAP[p.id]) return ZID_PRODUCT_MAP[p.id];
    }
    if (isUuid(item.product_id)) return item.product_id;
    if (isUuid(item.id)) return item.id;
    if (p && isUuid(p.id)) return p.id;
    return (p && p.zid_id) || item.product_id || item.id;
  };

  if (typeof window !== 'undefined' && (!window.zid || !window.zid.cart)) {
    import('https://static.zid.store/sdk/v3.30.4/theme-service/vitrin-theme-service.es.js')
      .then(mod => { window.zid = mod.default || mod; })
      .catch(() => null);
  }

  function assertCartResponse(response) {
    if(!response) throw Error('استجابة غير صالحة من سلة المشتريات');
    if(response?.status==='error' || response?.status==='failed' || response?.success===false || response?.data?.status==='error') {
      throw Error(response?.message || response?.data?.message || 'تعذر تحديث سلة المشتريات');
    }
    return response;
  }
  function extractCartData(response) {
    assertCartResponse(response);
    return response?.data?.cart || response?.cart || response?.data || response;
  }
  function nativeCartItems(response) {
    const data = extractCartData(response);
    const items = data?.products || data?.items;
    if(!Array.isArray(items)) throw Error('تعذر قراءة منتجات السلة. أعد المحاولة.');
    return items;
  }
  const normalizeCartId = value => String(value || '').replace(/-/g, '').toLowerCase();
  const bodySprayBundleId = '4e22b43143a04cd89e45f6a671f2620c';

  const QUALIFIED_BODY_SPRAYS = new Set([
    '940195dc-fc3b-4180-b062-c1cd85809564', '7de839f3-86a9-4fac-ba15-fad102696e73',
    '7a9286bf-4d38-447a-9b9f-fcd006e35e9b', '5d373011-9e95-472c-bec6-51fd8ed457dc',
    '5ab145fc-2c1c-4a17-9e1e-926c863b0934', '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
    'all-over-royal-tobacco', 'all-over-choconilla', 'all-over-asal', 'all-over-bahr', 'all-over-note-tuffi', 'all-over-powderose',
    'all-over-royal-powder', 'royal-powder-spray', 'asal', 'choconilla', 'bahr', 'note-tuffi', 'tuffi', 'toffee'
  ].map(normalizeCartId));

  function isBodySprayBundleOption(product) {
    if (!product) return false;
    if (typeof CartManager !== 'undefined' && typeof CartManager._isQualifyingBodySpray === 'function') {
      return CartManager._isQualifyingBodySpray(product);
    }
    const id = normalizeCartId(product.zid_id || product.id);
    const cat = String(product.cat || '').toLowerCase();
    const catIds = Array.isArray(product.category_ids) ? product.category_ids.map(String) : [];
    const title = String(product.name || product.title || '').toLowerCase();
    if (catIds.includes('1752110') || cat === 'packages' || id.startsWith('pkg-')) return false;
    if (catIds.includes('1759044') || cat === 'linen' || title.includes('مفارش')) return false;
    if (catIds.includes('1759042') || cat === 'all-over') return true;
    if (QUALIFIED_BODY_SPRAYS.has(id)) return true;
    return (title.includes('معطر') && title.includes('جسم')) || title === 'رويال بودر' || title.includes('عسل');
  }

  const signature = (items, bodySprayNames = null) => {
    const quantities = new Map();
    for (const item of (items || [])) {
      const id = normalizeCartId(item.product_id || item.product?.id || item.id);
      const selections = (item.sub_items || []).map(sub => {
        const productId = normalizeCartId(sub.product_id || sub.product?.id || sub.id);
        if (id === bodySprayBundleId && bodySprayNames) {
          const name = productId ? bodySprayNames.get(productId) : String(sub.product_name || '').trim();
          if (!name || !bodySprayNames.unique.has(name)) return null;
          return JSON.stringify([name, Number(sub.quantity) || 1]);
        }
        return JSON.stringify([productId, Number(sub.quantity) || 1, normalizeCartId(sub.selection_group_id)]);
      }).sort();
      if (selections.includes(null)) return null;
      const key = JSON.stringify([id, selections]);
      quantities.set(key, (quantities.get(key) || 0) + (Number(item.quantity) || 1));
    }
    return JSON.stringify([...quantities].sort(([left], [right]) => left.localeCompare(right)));
  };

  function matchingCartPayloads(payloads, rows) {
    const hasNameOnlyBundle = rows.some(row =>
      normalizeCartId(row.product_id || row.product?.id) === bodySprayBundleId &&
      row.sub_items?.some(sub => !sub.product_id && !sub.product?.id && !sub.id && sub.product_name)
    );
    if (!hasNameOnlyBundle) return signature(payloads) === signature(rows);

    const names = new Map();
    const nameIds = new Map();
    for (const product of noteProductsCatalog) {
      if (!isBodySprayBundleOption(product)) continue;
      const id = normalizeCartId(resolveZidUuid(product));
      const rawName = String(product.name || product.raw_name || product.zid_name || product.title || '').trim();
      if (!id || !rawName) continue;
      names.set(id, rawName);
      if (product.id) names.set(normalizeCartId(product.id), rawName);
      if (product.zid_id) names.set(normalizeCartId(product.zid_id), rawName);
      if (!nameIds.has(rawName)) nameIds.set(rawName, new Set());
      nameIds.get(rawName).add(id);
    }
    names.unique = new Set([...nameIds].filter(([, ids]) => ids.size === 1).map(([name]) => name));
    const expected = signature(payloads, names);
    const actual = signature(rows, names);
    return expected !== null && expected === actual;
  }

  async function syncNativeCartWithPayloads(api) {
    if (typeof window !== 'undefined' && !window.zidStoreRegion) window.zidStoreRegion = { location_selection: false };
    if (!api?.get || !api?.addProduct) return null;
    const cart = CartManager.getCart() || [];
    const cartSnapshot = JSON.stringify(cart);
    const payloads = (typeof CartManager.buildZidPayloads === 'function')
      ? CartManager.buildZidPayloads(cart)
      : cart.map(item => ({
          product_id: resolveZidUuid(item),
          quantity: Number(item.quantity) || 1,
          ...(item.sub_items?.length ? {sub_items:item.sub_items.map(({id,product_id,quantity,selection_group_id})=>({id:id||product_id,product_id:product_id||id,quantity,selection_group_id}))} : {})
        }));

    let res = assertCartResponse(await api.get());
    let nativeCart = extractCartData(res);

    if (!matchingCartPayloads(payloads, nativeCartItems(nativeCart))) {
      if (typeof api.empty === 'function') {
        try {
          assertCartResponse(await api.empty());
        } catch (error) {
          console.warn('NOTE: bulk cart reset notice:', error.message);
        }
        res = assertCartResponse(await api.get());
        nativeCart = extractCartData(res);
      }
      for (let pass = 0; pass < 3 && nativeCartItems(nativeCart).length > 0; pass++) {
        for (const item of nativeCartItems(nativeCart)) {
          if (item?.id) {
            try {
              assertCartResponse(await api.removeProduct({product_id: item.id}));
            } catch (error) {
              console.warn('NOTE: cart row removal notice:', error.message);
            }
          }
        }
        res = assertCartResponse(await api.get());
        nativeCart = extractCartData(res);
      }

      // Refuse re-adding if rows remain after emptying attempts
      if (nativeCartItems(nativeCart).length > 0) {
        throw Error('تعذر تفريغ سلة المشتريات بالكامل قبل المزامنة. يرجى إعادة المحاولة.');
      }

      // Add each payload without swallowing failures
      for (const payload of payloads) {
        const addRes = await api.addProduct(payload);
        assertCartResponse(addRes);
      }

      // Apply coupon without swallowing failures
      const coupon = localStorage.getItem('note_applied_coupon');
      if (coupon && typeof api.applyCoupon === 'function') {
        const coupRes = await api.applyCoupon({coupon_code: coupon});
        assertCartResponse(coupRes);
      }

      res = assertCartResponse(await api.get());
      nativeCart = extractCartData(res);
    }

    // Strict signature verification: do NOT adopt _noteLiveCartState unless matched!
    const finalItems = nativeCartItems(nativeCart);
    if (!matchingCartPayloads(payloads, finalItems)) {
      throw Error('تعذر تأكيد سلة المشتريات بعد المزامنة.');
    }

    if (cartSnapshot !== JSON.stringify(CartManager.getCart() || [])) {
      throw Error('تغيّرت محتويات السلة أثناء التحقق.');
    }
    window._noteLiveCartState = nativeCart;
    window._noteVerifiedCart = { snapshot: cartSnapshot, totals: nativeCart.totals, products: finalItems };
    if (document.getElementById('cart-page-items') && typeof renderCartPage === 'function') {
      renderCartPage(true);
    } else if (typeof updateCartFinancials === 'function') {
      updateCartFinancials(CartManager.getTotal ? CartManager.getTotal() : 0);
    }
    if (typeof CartManager.renderDrawer === 'function') {
      CartManager.renderDrawer();
    }
    return nativeCart;
  }
  window.syncNativeCartWithPayloads = syncNativeCartWithPayloads;
  window.matchingCartPayloads = matchingCartPayloads;
  window.signature = signature;

  let _nativeCartSyncQueue = Promise.resolve();
  CartManager._nativeQueue = _nativeCartSyncQueue;
  function enqueueNativeCartSync() {
    const task = _nativeCartSyncQueue.then(async () => {
      if (!window.zid?.cart) {
        try {
          const mod = await import('https://static.zid.store/sdk/v3.30.4/theme-service/vitrin-theme-service.es.js');
          window.zid = mod.default || mod;
        } catch (_) {}
      }
      const api = window.zid?.cart;
      if (api) {
        return await syncNativeCartWithPayloads(api);
      }
      return null;
    });
    CartManager._nativeQueue = task.catch(err => {
      console.warn('NOTE: cart sync queue notice:', err?.message || err);
    });
    _nativeCartSyncQueue = CartManager._nativeQueue;
    return task;
  }

  window.noteConfirmCartPricing = function() {
    return enqueueNativeCartSync().catch(() => null);
  };

  CartManager.addItem=function(id,quantity=1,selections,triggerBtn) {
    const p=noteProductsCatalog.find(p=>p.id===id);
    if(!p || !liveCatalogReady) {this.showToast('جاري تحديث قائمة المنتجات، أعد المحاولة');return false;}
    if(!p.in_stock) {this.showToast('هذا المنتج غير متاح حاليًا');return false;}
    if(p.has_options || p.has_fields) {this.showToast('يرجى اختيار تفاصيل المنتج من صفحته الأصلية');location.href='/products/'+encodeURIComponent(p.slug)+'?native=1';return false;}
    if(p.product_class==='dynamic_bundle' && !selections) {NoteRouter.navigate('/products/'+p.slug);return false;}
    
    // Animate trigger button with luxury feedback & checkmark
    const targetBtn=this.findTriggerButton ? this.findTriggerButton(id,triggerBtn) : triggerBtn;
    if(targetBtn && this.animateButton) {
      this.animateButton(targetBtn);
    }

    const sub=selections || [], sorted=sub.slice().sort((a,b)=>(a.selection_group_id+a.id).localeCompare(b.selection_group_id+b.id));
    const key=p.id+(sorted.length ? '-'+encodeURIComponent(JSON.stringify(sorted.map(({id,quantity,selection_group_id})=>({id,quantity,selection_group_id})))) : '');
    const cart=this.getCart(),existing=cart.find(i=>i.id===key);
    let targetItem;
    if(existing) {
      existing.quantity+=quantity;
      targetItem=existing;
    } else {
      targetItem={
        id:key,
        product_id:p.id,
        zid_id:p.zid_id,
        title:p.title,
        price:p.price,
        old_price:p.old_price,
        img:p.img,
        cat:p.cat,
        category:p.category,
        category_ids:p.category_ids,
        size:sub.map(s=>(s.quantity>1 ? s.quantity+' × ' : '')+s.name).join('، ') || p.size,
        quantity,
        sub_items:sub
      };
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

    // Background live sync with native cart API via unified queue
    if (typeof window !== 'undefined') {
      this._nativeQueue = (this._nativeQueue || Promise.resolve()).then(() => enqueueNativeCartSync());
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
  addToCartCurrentProduct=function() {try {const btn=document.getElementById('pdp-add-cart-btn'); return currentProduct && CartManager.addItem(currentProduct.id,pdpQuantity,collectBundleSelections(currentProduct),btn);} catch(e) {CartManager.showToast(e.message);return false;}};
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
            <strong class="note-mini-price">${formatPrice(p.price)}</strong>
          </div>
        </a>
        <button type="button" data-product="${p.id}" aria-label="أضف ${escapeHTML(p.title)} للسلة">${p.product_class==='dynamic_bundle' ? 'اختار' : 'أضف'}</button>
      </article>
    `).join('');
    grid.querySelectorAll('button').forEach(b=>b.onclick=(e)=>{
      e.stopPropagation();
      CartManager.addItem(b.dataset.product, 1, null, b);
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
    window.noteConfirmCartPricing();
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
    if(response?.status==='error' || response?.status==='failed' || response?.success===false || response?.data?.status==='error') throw Error(response?.message || response?.data?.message || 'تعذر تحديث سلة المشتريات');
    return response;
  }
  function nativeCartItems(response) {
    assertCartResponse(response);
    const data=response?.data || response;
    const items=data?.cart?.products || data?.cart?.items || data?.products || data?.items;
    if(!Array.isArray(items)) throw Error('تعذر قراءة منتجات السلة. أعد المحاولة.');
    return items;
  }
  let checkoutBusy=false;
  window.proceedToCheckout = proceedToCheckout = async function() {
    if(checkoutBusy) return;
    checkoutBusy=true;
    const checkoutBtns = document.querySelectorAll('button[onclick*="proceedToCheckout"], a[onclick*="proceedToCheckout"], #cart-checkout-btn, .note-checkout-btn');
    const originalBtnTexts = Array.from(checkoutBtns).map(b => b.innerHTML);
    checkoutBtns.forEach(b => {
      b.innerHTML = '<span class="inline-flex items-center justify-center gap-2"><svg class="animate-spin" style="width:16px;height:16px;animation:noteSpinRing 0.75s linear infinite;" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"></circle><path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8v8H4z"></path></svg> <span>جاري الانتقال للدفع...</span></span>';
      b.style.pointerEvents = 'none';
      b.style.opacity = '0.85';
    });
    try {
      if (!window.zidStoreRegion) window.zidStoreRegion = { location_selection: false };
      await CartManager._nativeQueue;
      const cart=CartManager.getCart();
      if(!cart.length) throw Error('السلة فارغة');
      
      if (!window.zid || !window.zid.cart) {
        try {
          const mod = await import('https://static.zid.store/sdk/v3.30.4/theme-service/vitrin-theme-service.es.js');
          window.zid = mod.default || mod;
        } catch (_) {}
      }
      const api=window.zid?.cart;
      if (!api?.get || !api?.addProduct) throw Error('تعذر الاتصال بسلة المشتريات. أعد المحاولة.');

      // Wait for any queued sync to finish first
      await _nativeCartSyncQueue;

      const grandEl = document.getElementById('page-grand-total');
      const shownTotal = grandEl?.getAttribute('data-note-total');

      // Execute verified sync with signature checking
      const nativeCart = await syncNativeCartWithPayloads(api);
      if (!nativeCart) throw Error('تعذر تأكيد سلة المشتريات. أعد المحاولة.');

      // Extract confirmed total from nativeCart
      const serverTotals = nativeCart.totals || nativeCart.cart?.totals || [];
      const totObj = Array.isArray(serverTotals) ? serverTotals.find(t => t.code === 'total') : null;
      const confirmedTotal = totObj?.value != null ? Number(totObj.value) : NaN;
      if (!Number.isFinite(confirmedTotal)) throw Error('تعذّر تأكيد إجمالي الطلب.');

      // Always refresh DOM with confirmed financials
      if (typeof updateCartFinancials === 'function') {
        updateCartFinancials(CartManager.getTotal ? CartManager.getTotal() : 0);
      }

      if (grandEl && shownTotal !== confirmedTotal.toFixed(2)) {
        CartManager.showToast('اتحدّث إجمالي سلتك. راجعه واضغط إتمام الدفع مرة أخرى.');
        return;
      }

      const checkoutUrl = nativeCart.basket_url || nativeCart.checkout_url || '/checkout';
      location.href = checkoutUrl;
    } catch(error) {
      console.warn('NOTE checkout verification:', error);
      CartManager.showToast('تعذّر تأكيد سلتك. جرّب مرة أخرى.');
      checkoutBtns.forEach((b, idx) => {
        b.innerHTML = originalBtnTexts[idx] || 'إتمام الطلب';
        b.style.pointerEvents = '';
        b.style.opacity = '';
      });
    }
    finally {
      checkoutBusy = false;
      checkoutBtns.forEach((button, index) => {
        button.innerHTML = originalBtnTexts[index] || 'إتمام الطلب';
        button.style.pointerEvents = '';
        button.style.opacity = '';
      });
    }
  };
  const originalRemove=CartManager.removeItem, originalUpdateQuantity=CartManager.updateQuantity;
  CartManager.removeItem=async function(key) {
    try {
      await this._nativeQueue;
      const item=this.getCart().find(i=>i.id===key);
      if(item?.native_line_id && window.zid?.cart?.removeProduct) {
        try {
          const res = await window.zid.cart.removeProduct({product_id:item.native_line_id});
          if (res?.data?.cart || res?.cart) window._noteLiveCartState = res.data?.cart || res.cart;
        } catch(_) {}
      }
    } catch(_) {}
    originalRemove.call(this,key);
    enqueueNativeCartSync();
  };
  CartManager.updateQuantity=async function(key,delta) {
    const item=this.getCart().find(i=>i.id===key);if(!item)return;
    if(item.quantity+delta<=0) return this.removeItem(key);
    const p=noteProductsCatalog.find(cp=>cp.id===(item.product_id||item.id) || cp.slug===item.id || (typeof ZID_PRODUCT_MAP !== 'undefined' && ZID_PRODUCT_MAP[item.id]===cp.id));
    if(delta>0 && p && (!p.in_stock || (p.stock && item.quantity+delta>p.stock))) {this.showToast('الكمية المطلوبة غير متاحة');return;}
    try {
      await this._nativeQueue;
      if(item.native_line_id && window.zid?.cart?.updateProduct) {
        try {
          const res = await window.zid.cart.updateProduct({product_id:item.native_line_id,quantity:item.quantity+delta});
          if (res?.data?.cart || res?.cart) window._noteLiveCartState = res.data?.cart || res.cart;
        } catch(_) {}
      }
    } catch(_) {}
    originalUpdateQuantity.call(this,key,delta);
    enqueueNativeCartSync();
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
      if (text.includes('باقات') || text.includes('مجموعات') || text.includes('باكجات') || text.includes('باكدجات') || href.includes('1752110') || href.includes('1759047') || href.includes('packages')) return 'packages';
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
        e.target.src = 'https://youssefrasheed.github.io/note-zid-styles/products/09_Linen_Room_Spray_Brand_Box.webp';
      }
    }
  }, true);
