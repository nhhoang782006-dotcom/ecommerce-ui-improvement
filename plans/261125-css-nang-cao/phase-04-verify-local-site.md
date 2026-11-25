---
phase: 4
title: Verify Local Site
status: completed
effort: ~2 hours
---

# Phase 4: Verify Local Site

## Overview

Verify the notebook and source demos with a CSS-only Playwright configuration that reuses the existing static server and does not alter the JavaScript suite.

## Implementation Steps

1. Use `playwright.css-advanced.config.js` and `CSS_E2E_BASE_URL` for local or deployed CSS-site tests.
2. Verify all notebook routes, source/demo links, local assets, stylesheets and browser console/network errors.
3. Check notebook responsive layout at 1440, 768 and 390 pixels; check raw Exercise 12 directly at 390, 480 and 481 pixels.
4. Check computed outcomes for positioning, float/clear, hover transitions, filters, finite animation and Bootstrap 3.3.7.
5. Run both CSS and existing JavaScript Playwright suites, and create genuine source and browser captures only after the relevant gates pass.

## Success Criteria

- [x] All 19 wrappers and 18 packaged demos load; Exercise 13 shares Exercise 12's source.
- [x] Every wrapper's HTML/CSS source links fetch the exact source file; a failed preview can retry.
- [x] CSS checks pass at all specified widths and behavior checks, without false failures for textbook overflow inside demos.
- [x] The CSS pages and demos load without browser console errors or failed local resources.
- [x] Existing JavaScript Playwright tests pass without modifying their configuration or cases.
