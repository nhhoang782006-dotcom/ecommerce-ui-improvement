# Local E2E Report

**Result:** PASS — 40 passed, 0 failed
**Command:** `npm run test:e2e`
**Run window:** 17 Nov 2026, 18:36:28–18:38:55 (Asia/Ho_Chi_Minh)
**Duration:** 2.5 minutes
**Environment:** Windows, Node.js 24.18.0, Playwright 1.65.1, headless Microsoft Edge 157.0.0.0
**Base URL:** `http://127.0.0.1:4173/ecommerce-ui-improvement/JavaScript-Labs/`

## Coverage

- All 33 direct routes (portfolio, three lab indexes, and 29 exercises) returned HTTP 200 and passed responsive layout, asset, image, link, ID, and page-error checks at 1440px, 768px, and 390px.
- All 11 Lab08 requirements passed, including parsing-time `document.write`, isolated alerts, arrays, objects, and country selection.
- All 8 Lab09 requirements passed, including DOM node traversal, add/remove interactions, event handling, the deliberate error demonstration, and form validation with malformed email rejection.
- All 13 Lab10 cases passed, including CDN-blocked local jQuery fallback, selectors, event cleanup, effects, chained animation, a successful `$.get()` against the configured HTTPS API, and jqXHR loading, failure, retry, concurrency, and timeout behavior.
- The three lab indexes passed filtering by exercise number and topic. The student identity, course code, and mobile touch-target checks also passed.

## Test Harness Finding

An earlier final-suite attempt exposed intermittent `ERR_CONNECTION_REFUSED` responses for exercise JavaScript files when two workers loaded pages at once. The trace showed the HTML and stylesheet loading while the script request did not reach the server handler. The local test server was changed to `ThreadingHTTPServer` with a 64-connection request queue. Lab09.3 then passed 12 consecutive repetitions, followed by the complete 40-test run recorded above.

## Evidence Gate

No final Word-report screenshots were captured during this local run. Capture remains pending the live GitHub Pages E2E run.
