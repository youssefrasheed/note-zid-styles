const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const baseDir = '/Users/yousefsoom/note-zid-styles';
const appJs = fs.readFileSync(path.join(baseDir, 'note-app.js'), 'utf8');

console.log('=== SUITE 4: COUPON SYSTEM & BEHAVIOR AUDIT ===');

// Verify default coupon button styling in CSS
const noteCss = fs.readFileSync(path.join(baseDir, 'note.css'), 'utf8');
assert(noteCss.includes('#drawer-coupon-btn'), 'note.css must style #drawer-coupon-btn');
assert(noteCss.includes('#coupon-apply-btn'), 'note.css must style #coupon-apply-btn');
assert(noteCss.includes('#111111 !important'), 'Coupon button must be styled with #111111 !important default');
console.log('PASS: Coupon button default black styling verified.');

// Verify coupon handler logic in note-app.js
assert(appJs.includes('function applyCartCoupon'), 'applyCartCoupon must exist');
assert(appJs.includes('function clearCartCoupon'), 'clearCartCoupon must exist');
assert(appJs.includes('function restoreSavedCartCoupon'), 'restoreSavedCartCoupon must exist');

// Test coupon percentage calculator
const fnStart = appJs.indexOf('window.getNoteCouponPercent = function(code) {');
const fnEnd = appJs.indexOf('\n  };', fnStart) + '\n  }'.length;
const getNoteCouponPercent = eval('(' + appJs.slice(fnStart + 'window.getNoteCouponPercent = '.length, fnEnd).trim().replace(/;$/, '') + ')');

assert.strictEqual(getNoteCouponPercent('NOTE10'), 10, 'NOTE10 must give 10%');
assert.strictEqual(getNoteCouponPercent('NOTE15'), 15, 'NOTE15 must give 15%');
assert.strictEqual(getNoteCouponPercent('VIP20'), 20, 'VIP20 must give 20%');
assert.strictEqual(getNoteCouponPercent('SPECIAL5'), 5, 'SPECIAL5 must give 5%');
assert.strictEqual(getNoteCouponPercent('SAVE'), 5, 'Default unknown coupon must give 5%');
assert.strictEqual(getNoteCouponPercent(''), 0, 'Empty coupon must give 0%');

console.log('PASS: Coupon percentage calculation verified for all formats.');

// Verify active gold vs inactive black coupon button behavior
assert(appJs.includes('applyBtn.classList.add(\'note-btn-gold\')'), 'Must add gold class when coupon is active');
assert(appJs.includes('applyBtn.classList.remove(\'note-btn-gold\')'), 'Must remove gold class when coupon is cleared');
assert(appJs.includes('drawerCouponBtn.classList.add(\'note-btn-gold\')'), 'Must add gold class to drawer coupon button when active');

console.log('PASS: Active gold vs inactive black coupon button logic verified.');
