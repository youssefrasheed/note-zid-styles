const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const app = fs.readFileSync(path.join(__dirname, 'note-app.js'), 'utf8');
const method = app.match(/hasConflictingBundleUsage: (function[\s\S]*?\n    \}),/)[1];
const guard = new Function('return ' + method)();
const three = 'الثالث بريال 239';
const two = 'تولة مسك توفي بريال';
let cases = 0;
for (let perfumes = 0; perfumes <= 18; perfumes++) {
  for (let tolas = 0; tolas <= 6; tolas++) {
    for (let triples = 0; triples <= 11; triples++) {
      for (let pairs = 0; pairs <= 6; pairs++) {
        const cart = [
          {kind: 'perfume', quantity: perfumes},
          {kind: 'tola', quantity: tolas},
          {kind: 'spray', quantity: 3}
        ];
        const manager = {
          getCart: () => cart,
          _isQualifying100mlPerfume: item => item.kind === 'perfume',
          _isQualifyingTola: item => item.kind === 'tola'
        };
        const state = {bundle_offers: [
          {name: three, usage_count: triples}, {name: two, usage_count: pairs}
        ]};
        assert.equal(guard.call(manager, state), 3 * triples + pairs > perfumes || pairs > tolas);
        cases++;
      }
    }
  }
}
console.log('PASS: ' + cases + ' quantity cases, including the repeated and overlapping offers');
