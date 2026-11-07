import subprocess
import json
import base64
import time

WIN_ID = 288404813
TAB_IDX = 2

def run_chrome_js(js):
    escaped_js = js.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
    cmd = f'''
    tell application "Google Chrome"
        set t to tab {TAB_IDX} of (window id {WIN_ID})
        set res to execute t javascript "{escaped_js}"
        return res
    end tell
    '''
    res = subprocess.run(["osascript", "-e", cmd], capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"AppleScript error: {res.stderr}")
    return res.stdout.strip()

def run_chrome_async(async_body, timeout=20):
    wrapper = f"""
    window.__asyncDone = null;
    (async () => {{
        try {{
            const res = await (async () => {{ {async_body} }})();
            window.__asyncDone = {{ ok: true, val: res || true }};
        }} catch(e) {{
            window.__asyncDone = {{ ok: false, err: e.message }};
        }}
    }})();
    """
    run_chrome_js(wrapper)
    start = time.time()
    while time.time() - start < timeout:
        val = run_chrome_js("JSON.stringify(window.__asyncDone)")
        if val and val != "null":
            parsed = json.loads(val)
            if not parsed.get("ok"):
                raise RuntimeError("Async error: " + parsed.get("err", "unknown"))
            return parsed.get("val")
        time.sleep(0.3)
    raise TimeoutError(f"Async JS timed out after {timeout}s")

def inject_latest_code():
    print("Step 1: Injecting latest note-app.js into Chrome tab...")
    with open('/Users/yousefsoom/note-zid-styles/note-app.js', 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('ascii')

    chunk_size = 2000
    chunks = [b64[i:i+chunk_size] for i in range(0, len(b64), chunk_size)]

    lines = [
        'tell application "Google Chrome"',
        f'  set t to tab {TAB_IDX} of (window id {WIN_ID})',
        '  execute t javascript "window.__b64Chunks = [];"'
    ]
    for ch in chunks:
        lines.append(f"  execute t javascript \"window.__b64Chunks.push('{ch}');\"")

    lines.append('''  set res to execute t javascript "(() => {
        try {
          const fullB64 = window.__b64Chunks.join('');
          const bin = atob(fullB64);
          const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
          const code = new TextDecoder('utf-8').decode(bytes);
          delete document.documentElement.dataset.noteEngineStarted;
          (0, eval)(code);
          return 'SUCCESS: ' + (typeof window.bindCartCouponInputListener);
        } catch(e) {
          return 'ERROR: ' + e.message;
        }
      })()"''')
    lines.append('  return res')
    lines.append('end tell')

    script = '\n'.join(lines)
    p = subprocess.run(['osascript'], input=script, text=True, capture_output=True)
    print("Inject result:", p.stdout.strip())
    if p.stderr:
        print("Inject stderr:", p.stderr)
    time.sleep(1)

inject_latest_code()

# Helper inspection function
inspect_code = """
(() => {
    const input = document.getElementById('coupon-code-input');
    const btn = document.getElementById('coupon-apply-btn');
    const btnText = document.getElementById('coupon-btn-text');
    const tag = document.getElementById('coupon-applied-tag');
    const clearBtn = document.getElementById('coupon-clear-btn');
    const msg = document.getElementById('coupon-msg');
    return JSON.stringify({
        inputValue: input ? input.value : null,
        btnText: btn ? btn.textContent.trim() : null,
        btnInnerHTML: btn ? btn.innerHTML : null,
        hasGoldClass: btn ? btn.classList.contains('note-btn-gold') : false,
        hasSvg: btn ? !!btn.querySelector('svg') : false,
        tagVisible: tag ? !tag.classList.contains('hidden') : false,
        clearVisible: clearBtn ? !clearBtn.classList.contains('hidden') : false,
        msgText: msg ? msg.textContent.trim() : '',
        msgVisible: msg ? !msg.classList.contains('hidden') : false
    });
})()
"""

# =========================================================================
# TEST 1: Clear coupon state (No coupon active, empty input)
# =========================================================================
print("\n--- TEST 1: No Coupon Active (Initial/Cleared State) ---")
run_chrome_async("""
    if (typeof clearCartCoupon === 'function') await clearCartCoupon();
    else if (window.noteChangeCartCoupon) await window.noteChangeCartCoupon(null);
    localStorage.removeItem('note_applied_coupon');
    if (window.CartManager?._nativeQueue) {
        try { await window.CartManager._nativeQueue; } catch (_) {}
    }
    if (window.renderCartPage) window.renderCartPage(true);
    return true;
""")
time.sleep(1)

state1 = json.loads(run_chrome_js(inspect_code))
print("State 1 inspection:", json.dumps(state1, ensure_ascii=False, indent=2))

assert state1['inputValue'] == '', f"Expected empty input, got {state1['inputValue']}"
assert state1['btnText'] == 'تطبيق', f"Expected button text strictly 'تطبيق', got '{state1['btnText']}'"
assert not state1['hasGoldClass'], "Button should NOT have note-btn-gold class"
assert not state1['hasSvg'], "Button should NOT have SVG checkmark"
assert 'مفعّل' not in state1['btnInnerHTML'], "Button should NOT contain 'مفعّل'"
assert not state1['tagVisible'], "Coupon tag should be hidden"
assert not state1['clearVisible'], "Clear button should be hidden"
print(">>> PASS: Test 1 (No active coupon shows plain 'تطبيق' with NO checkmark and NO 'مفعّل')")

# =========================================================================
# TEST 2: Typing unapplied coupon code
# =========================================================================
print("\n--- TEST 2: Typing in input without applying ---")
run_chrome_js("""
(() => {
    const input = document.getElementById('coupon-code-input');
    input.value = 'SAMPLE';
    input.dispatchEvent(new Event('input', { bubbles: true }));
})()
""")
time.sleep(0.5)

state2 = json.loads(run_chrome_js(inspect_code))
print("State 2 inspection:", json.dumps(state2, ensure_ascii=False, indent=2))

assert state2['inputValue'] == 'SAMPLE', f"Expected input 'SAMPLE', got {state2['inputValue']}"
assert state2['btnText'] == 'تطبيق', f"Button text must still be 'تطبيق', got '{state2['btnText']}'"
assert not state2['hasGoldClass'], "Button must NOT have note-btn-gold class"
assert not state2['hasSvg'], "Button must NOT have SVG checkmark"
assert 'مفعّل' not in state2['btnInnerHTML'], "Button must NOT contain 'مفعّل'"
assert not state2['tagVisible'], "Coupon tag must be hidden"
assert state2['clearVisible'], "Clear button '×' must be visible when input has text"
print(">>> PASS: Test 2 (Typing unapplied code keeps plain 'تطبيق' without checkmark, shows '×')")

# =========================================================================
# TEST 3: Apply valid coupon 'HN'
# =========================================================================
print("\n--- TEST 3: Applying valid coupon 'HN' ---")
run_chrome_async("""
    const input = document.getElementById('coupon-code-input');
    input.value = 'HN';
    if (typeof applyCartCoupon === 'function') await applyCartCoupon();
    if (window.CartManager?._nativeQueue) {
        try { await window.CartManager._nativeQueue; } catch (_) {}
    }
    for (let i = 0; i < 40; i++) {
        if (window._noteVerifiedCart?.couponCode === 'HN') break;
        await new Promise(r => setTimeout(r, 200));
    }
    return true;
""")
time.sleep(1)

state3 = json.loads(run_chrome_js(inspect_code))
print("State 3 inspection:", json.dumps(state3, ensure_ascii=False, indent=2))

assert 'HN' in state3['inputValue'].upper(), f"Expected input 'HN', got {state3['inputValue']}"
assert 'مفعّل' in state3['btnText'], f"Button text should be 'مفعّل', got '{state3['btnText']}'"
assert state3['hasGoldClass'], "Button MUST have note-btn-gold class"
assert state3['hasSvg'], "Button MUST have SVG checkmark"
assert state3['tagVisible'], "Coupon tag should be visible"
assert state3['clearVisible'], "Clear button should be visible"
print(">>> PASS: Test 3 (Valid applied coupon shows gold 'مفعّل' with checkmark)")

# =========================================================================
# TEST 4: Click clear button '×'
# =========================================================================
print("\n--- TEST 4: Clicking clear button '×' ---")
run_chrome_async("""
    const clearBtn = document.getElementById('coupon-clear-btn');
    if (clearBtn) clearBtn.click();
    else if (typeof clearCartCoupon === 'function') await clearCartCoupon();
    if (window.CartManager?._nativeQueue) {
        try { await window.CartManager._nativeQueue; } catch (_) {}
    }
    for (let i = 0; i < 40; i++) {
        if (!window._noteVerifiedCart?.couponCode && !localStorage.getItem('note_applied_coupon')) break;
        await new Promise(r => setTimeout(r, 200));
    }
    return true;
""")
time.sleep(1)

state4 = json.loads(run_chrome_js(inspect_code))
print("State 4 inspection:", json.dumps(state4, ensure_ascii=False, indent=2))

assert state4['inputValue'] == '', f"Expected empty input after clear, got {state4['inputValue']}"
assert state4['btnText'] == 'تطبيق', f"Expected button text strictly 'تطبيق' after clear, got '{state4['btnText']}'"
assert not state4['hasGoldClass'], "Button should NOT have note-btn-gold class"
assert not state4['hasSvg'], "Button should NOT have SVG checkmark"
assert 'مفعّل' not in state4['btnInnerHTML'], "Button should NOT contain 'مفعّل'"
assert not state4['tagVisible'], "Coupon tag should be hidden"
assert not state4['clearVisible'], "Clear button should be hidden"
print(">>> PASS: Test 4 (Clicking clear button immediately resets to plain 'تطبيق' without checkmark)")

# =========================================================================
# TEST 5: Re-apply coupon 'HN', then manually erase code with backspace/input event
# =========================================================================
print("\n--- TEST 5: Re-apply coupon 'HN' then manually erase input ---")
run_chrome_async("""
    const input = document.getElementById('coupon-code-input');
    input.value = 'HN';
    if (typeof applyCartCoupon === 'function') await applyCartCoupon();
    if (window.CartManager?._nativeQueue) {
        try { await window.CartManager._nativeQueue; } catch (_) {}
    }
    for (let i = 0; i < 40; i++) {
        if (window._noteVerifiedCart?.couponCode === 'HN') break;
        await new Promise(r => setTimeout(r, 200));
    }
    return true;
""")
time.sleep(1)

# Verify applied first
mid_state = json.loads(run_chrome_js(inspect_code))
assert mid_state['hasGoldClass'] and 'مفعّل' in mid_state['btnText'], "Must be applied before erase test"

# Now erase the text manually (simulating backspacing/clearing the input):
run_chrome_async("""
    const input = document.getElementById('coupon-code-input');
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    if (window.CartManager?._nativeQueue) {
        try { await window.CartManager._nativeQueue; } catch (_) {}
    }
    for (let i = 0; i < 40; i++) {
        if (!window._noteVerifiedCart?.couponCode && !localStorage.getItem('note_applied_coupon')) break;
        await new Promise(r => setTimeout(r, 200));
    }
    return true;
""")
time.sleep(1)

state5 = json.loads(run_chrome_js(inspect_code))
print("State 5 inspection:", json.dumps(state5, ensure_ascii=False, indent=2))

assert state5['inputValue'] == '', f"Expected empty input, got {state5['inputValue']}"
assert state5['btnText'] == 'تطبيق', f"Expected button text strictly 'تطبيق', got '{state5['btnText']}'"
assert not state5['hasGoldClass'], "Button should NOT have note-btn-gold class"
assert not state5['hasSvg'], "Button should NOT have SVG checkmark"
assert 'مفعّل' not in state5['btnInnerHTML'], "Button should NOT contain 'مفعّل'"
assert not state5['tagVisible'], "Coupon tag should be hidden"
assert not state5['clearVisible'], "Clear button should be hidden"
print(">>> PASS: Test 5 (Manually erasing input instantly reverts button to plain 'تطبيق' without checkmark)")

# =========================================================================
# TEST 6: Page refresh / re-render simulation with empty coupon
# =========================================================================
print("\n--- TEST 6: Re-render cart page with no coupon ---")
run_chrome_js("""
(() => {
    if (window.renderCartPage) window.renderCartPage();
})()
""")
time.sleep(1)

state6 = json.loads(run_chrome_js(inspect_code))
assert state6['btnText'] == 'تطبيق' and not state6['hasSvg'] and not state6['hasGoldClass'], "Must remain plain 'تطبيق'"
print(">>> PASS: Test 6 (Cart page re-render preserves plain 'تطبيق' without checkmark)")

# Capture screenshot of the verified coupon section in Chrome
screenshot_path = "/Users/yousefsoom/.gemini/antigravity/brain/e5f4c36c-ee4d-4993-8764-599913179a1d/coupon_button_verified.png"
subprocess.run(["screencapture", "-x", screenshot_path])
print(f"\nScreenshot saved to {screenshot_path}")
print("\n=======================================================")
print(" ALL 6 COUPON VERIFICATION TESTS PASSED 100% IN CHROME!")
print("=======================================================")
