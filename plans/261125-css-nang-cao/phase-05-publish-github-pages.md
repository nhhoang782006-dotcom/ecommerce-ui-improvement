---
phase: 5
title: "Publish GitHub Pages"
status: pending
effort: "~1 hour"
---

# Phase 5: Publish GitHub Pages

## Overview

Commit only the completed CSS coursework slice on the existing public repository, then verify its GitHub Pages deployment and routes. The student confirmed existing redistribution permission for the textbook HTML, CSS, and demo assets on 2026-11-25. The bundled Bootstrap MIT license applies only to Bootstrap.

## Implementation Steps

1. Review `git diff` and explicitly stage the new CSS area, its dedicated test/config, focused package script and plan files.
2. Confirm unrelated tracked and untracked work is not staged; run the scoped test suites before the commit.
3. Record the student's confirmation that redistribution permission already exists (2026-11-25).
4. Commit with descriptive conventional messages on the existing `main` branch and push only after the release gate is cleared.
5. Wait for the GitHub Pages workflow and test the CSS landing, grouped lab index, representative exercises, source files and Bootstrap/image/font assets over HTTPS.
6. Run the CSS suite against the published base URL and record the deployed commit and verified URL.

## Success Criteria

- [ ] The commit contains only planned CSS coursework assets, tests, config, package script and plan documentation.
- [ ] Redistribution permission is confirmed for textbook material, or copied material is replaced with publishable original work.
- [ ] The live URL returns 200 and the CSS Playwright suite passes on GitHub Pages.
- [ ] No pre-existing unrelated file appears in the commit.
