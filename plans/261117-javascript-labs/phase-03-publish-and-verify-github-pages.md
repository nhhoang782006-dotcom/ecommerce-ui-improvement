---
phase: 3
title: "Publish and Verify GitHub Pages"
status: pending
effort: "~30 minutes"
---

# Phase 3: Publish and Verify GitHub Pages

## Overview

Publish the tested project to its existing public repository and confirm Pages serves the exact JavaScript Labs base path and assets.

## Implementation Steps

1. Confirm staged files are limited to this assignment; preserve pre-existing unrelated changes.
2. Commit the JavaScript Labs work and push to the existing main branch.
3. Wait for Pages to update and verify the portfolio, every lab index, and direct exercise URLs return successfully.
4. Run the same required E2E suite against the live Pages URL before enabling evidence capture.

## Success Criteria

- [ ] Public repository and Pages serve the new site under the repository subpath.
- [ ] No asset, script, stylesheet, index, or exercise URL returns 404.
- [ ] Live E2E passes before final screenshots are captured.

## Risk Assessment

- Pages propagation may take time. Keep the local passing build available and do not capture deployment evidence until the live build matches the commit.
