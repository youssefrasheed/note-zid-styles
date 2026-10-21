# Storefront startup, version 4.4.0

Runtime Tailwind compilation has been replaced by `note-utilities.css`, embedded synchronously in `note-app.js` before mounting. Never restore cdn.tailwindcss.com to the production loader.

The drawer starts with native `hidden` and aria-hidden=true. Open/close timers are cancellable; CSS must never force display:flex on a hidden drawer. Header/native cart triggers open the drawer; the drawer checkout link must navigate to /cart.

Only one loader-removal function exists. Do not replace Element.remove. The entrance backdrop is opaque; animate the spinner, not the full white backdrop. Fresh cache can render immediately, otherwise reveal after the first catalog request finishes. Failure releases the loader and displays the product-loading error.

The live integration removes an old bundle form before rebuilding, preserves selections/quantity and skips unchanged PDP redraws. Native background cart additions are queued before quantity/removal/checkout operations.

Build after template/class changes:

1. `python3 build_engine.py`
2. `npm exec --yes --package=tailwindcss@3.4.17 -- tailwindcss -c tailwind.config.cjs -i utilities-input.css -o note-utilities.css --minify`
3. `python3 build_engine.py`
4. `node test_live.cjs && node test_startup.cjs`

`build_engine.py` calls `patch_startup.py` after `apply_live_fixes.py`. Keep both hooks. Commit generated JS/CSS with the sources. `drawer-state.js` is the isolated state-machine fixture checked against the embedded integration by test_startup.cjs.
