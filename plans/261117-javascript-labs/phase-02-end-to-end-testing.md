---
phase: 2
title: "End-to-End Testing"
status: complete
effort: "~1 hour"
---

# Phase 2: End-to-End Testing

## Overview

Run reproducible local Playwright tests for all pages and representative assignment behaviors. Complete this phase before capturing any Word evidence.

## Implementation Steps

1. Start a loopback static server at the repository path base and launch Edge/Chromium.
2. Check direct navigation, relative links, assets, console/page errors, and the three responsive widths.
3. Check deterministic Lab08 results, Lab09 DOM/events/forms, Lab10 effects and local jQuery fallback.
4. Verify a real successful API response; exercise network failure, timeout and retry without disguising those as real service results.
5. Fix failures and rerun the full suite; retain a report tied to the tested commit.

## Success Criteria

- [x] Every required E2E case passes locally with no skipped acceptance cases: 40 passed, 0 failed.
- [x] Expected educational errors are allowlisted only for the exact exercise and action; unexpected errors fail.
- [x] Responsive and resource checks pass for all 33 pages at 390/768/1440px.
- [x] No final Word evidence has been captured; capture remains gated on the Pages E2E run.

## Risk Assessment

- External API availability can block true success verification. Retry a bounded number of times; report integration as unverified if the service remains unavailable rather than using fake data.

## Run Record

See [local E2E report](./reports/local-e2e.md) for the final command, environment, coverage, and result. Evidence screenshots for the Word report remain gated on successful Pages E2E.
