# Local E2E verification

Date: 2026-11-25

## CSS Advanced suite

Command: `npm run test:css-advanced -- --reporter=line`

Result: **9 passed (2.0m)** on the local static server.

Coverage includes the 19 notebook routes and 18 demo documents, live source previews and retry behavior, route and asset links, responsive layout, browser console/resource errors, positioning, float/clear, transitions, filters, animation and Bootstrap 3.3.7.

## Existing JavaScript suite

Result: **40 passed (1.8m)**. JavaScript test configuration and cases were left unchanged.

## Diff check

`git diff --cached --check` passed before the CSS implementation commit.
