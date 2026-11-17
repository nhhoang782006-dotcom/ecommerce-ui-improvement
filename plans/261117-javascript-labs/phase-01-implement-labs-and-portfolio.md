---
phase: 1
title: "Implement Labs and Portfolio"
status: complete
effort: "~2 hours"
---

# Phase 1: Implement Labs and Portfolio

## Overview

Create the shared navy/teal portfolio shell and complete the 11 Lab08, 8 Lab09, and 10 Lab10 exercise pages as static HTML/CSS/JavaScript. Use the approved live HTTPS API on Pages and disclose the source adaptation.

## Requirements

- Preserve the current root site and unrelated dirty files.
- Every exercise is a direct-loadable page with a working scoped demo, explanations, breadcrumbs, and accessible controls.
- `document.write` runs during parsing only; deliberate errors are explicit and isolated.
- Load full jQuery 3.7.1 from a CDN with local fallback.
- All website links and asset paths work under `/ecommerce-ui-improvement/JavaScript-Labs/`.

## Implementation Steps

1. Build the shared portfolio, three lab indexes, typography, responsive styles, and footer/navigation.
2. Implement the 29 requirements in the lab-owned exercise directories.
3. Add the README, source tree, API source notes, and reproducible test scripts.
4. Review the diff to ensure existing coursework and pre-existing edits are untouched.

## Success Criteria

- [x] Portfolio and all 29 exercise pages exist.
- [x] Each lab index links all its exercises; exercises navigate back and between neighboring lessons.
- [x] Demo selectors stay within the exercise root and responsive layouts work at 390/768/1440px.
- [x] Keep the report's personal self-evaluation area blank for the student to fill, as requested.

## Risks

- Separate lab implementations may drift from shared markup: keep a common class/link contract and run a full URL smoke test.
- The static Pages base path differs from repository root: exercise relative paths are verified after deployment.
