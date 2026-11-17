const { test, expect } = require("@playwright/test");

const exerciseRoutes = [
  ...Array.from({ length: 11 }, (_, i) => `Lab08/Exercise${String(i + 1).padStart(2, "0")}/`),
  ...Array.from({ length: 8 }, (_, i) => `Lab09/Exercise${String(i + 1).padStart(2, "0")}/`),
  ...Array.from({ length: 10 }, (_, i) => `Lab10/Exercise${String(i + 1).padStart(2, "0")}/`)
];
const pageRoutes = ["", "Lab08/", "Lab09/", "Lab10/", ...exerciseRoutes];

async function inspectAllPages(page, width, height) {
  await page.setViewportSize({ width, height });
  const base = new URL(process.env.E2E_BASE_URL || "http://127.0.0.1:4173/ecommerce-ui-improvement/JavaScript-Labs/");
  const basePath = base.pathname;
  const repositoryPath = `/${base.pathname.split("/")[1]}/`;
  const verifiedLinkTargets = new Set();

  for (const route of pageRoutes) {
    const pageErrors = [];
    const localHttpErrors = [];
    const onPageError = (error) => pageErrors.push(error.message);
    const onResponse = (response) => {
      const url = new URL(response.url());
      if (url.origin !== base.origin || url.pathname === "/favicon.ico") return;
      if (!url.pathname.startsWith(repositoryPath)) {
        localHttpErrors.push(`outside repository: ${url.pathname}`);
      } else if (response.status() >= 400) {
        localHttpErrors.push(`${response.status()} ${url.pathname}`);
      }
    };
    page.on("pageerror", onPageError);
    page.on("response", onResponse);

    const response = await page.goto(route, { waitUntil: "load" });
    expect(response, `${route} should return an HTTP response`).not.toBeNull();
    expect(response.status(), `${route} should load successfully`).toBe(200);
    await expect(page.locator("h1").first(), `${route} should have a page title`).toBeVisible();
    await expect(page.locator('a.skip-link[href="#main-content"]'), `${route} should provide a skip link`).toHaveCount(1);
    await expect(page.locator("main#main-content"), `${route} should expose the skip-link target`).toHaveCount(1);
    await page.locator("img").evaluateAll((images) => Promise.all(
      images.map((image) => image.decode().catch(() => undefined))
    ));

    if (route.includes("Exercise")) {
      await expect(page.locator("main[data-exercise]")).toHaveCount(1);
    }

    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      missingImages: Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
      duplicateIds: Array.from(document.querySelectorAll("[id]"))
        .map((element) => element.id)
        .filter((id, index, ids) => ids.indexOf(id) !== index)
    }));
    expect(dimensions.scrollWidth, `${route} overflows horizontally at ${width}px`).toBeLessThanOrEqual(dimensions.width + 1);
    expect(dimensions.missingImages, `${route} has broken images`).toEqual([]);
    expect(dimensions.duplicateIds, `${route} contains duplicate IDs`).toEqual([]);
    if (width <= 560) {
      const navigationHeights = await page.locator(".lab-nav a, .exercise-nav a, .lab10-exercise-pager a").evaluateAll((links) =>
        links.map((link) => link.getBoundingClientRect().height)
      );
      expect(navigationHeights.every((height) => height >= 44), `${route} has a navigation tap target under 44px`).toBeTruthy();
    }

    const linkAudit = await page.locator("a[href]").evaluateAll((links, { origin, basePath }) => {
      const sameOrigin = links.map((link) => link.href).filter((href) => new URL(href).origin === origin);
      return {
        outsideBase: sameOrigin.filter((href) => !new URL(href).pathname.startsWith(basePath)),
        inBase: sameOrigin.filter((href) => new URL(href).pathname.startsWith(basePath) && !new URL(href).hash)
      };
    }, { origin: base.origin, basePath });
    expect(linkAudit.outsideBase, `${route} links outside the repository's Pages subpath`).toEqual([]);
    for (const href of [...new Set(linkAudit.inBase)]) {
      if (verifiedLinkTargets.has(href)) continue;
      const linkResponse = await page.request.get(href);
      expect(linkResponse.status(), `broken same-origin link: ${href}`).toBe(200);
      verifiedLinkTargets.add(href);
    }

    expect(pageErrors, `${route} raised an unhandled JavaScript error`).toEqual([]);
    expect(localHttpErrors, `${route} requested a missing local asset`).toEqual([]);
    page.off("response", onResponse);
    page.off("pageerror", onPageError);
  }
}

test.describe("direct pages, links, assets, and responsive layout", () => {
  for (const [width, height] of [[1440, 1000], [768, 1000], [390, 844]]) {
    test(`all 33 pages work at ${width}px`, async ({ page }) => {
      await inspectAllPages(page, width, height);
    });
  }
});

test("portfolio shows Hoàng's verified course details", async ({ page }) => {
  await page.goto("", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /Nguyễn Huy Hoàng/ })).toBeVisible();
  await expect(page.getByText("31241026670", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("26C1INF50902702", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Language foundations/ })).toHaveAttribute("href", /Lab08/);
});

test.describe("exercise index search", () => {
  for (const example of [
    { route: "Lab08/", query: "8.7", expected: 1, href: /Exercise07/ },
    { route: "Lab09/", query: "DevTools", expected: 1, href: /Exercise06/ },
    { route: "Lab10/", query: "Ajax", expected: 2, href: /Exercise09/ }
  ]) {
    test(`${example.route} filters by topic and number`, async ({ page }) => {
      await page.goto(example.route);
      const search = page.locator("[data-filter-target]");
      const items = page.locator("[data-filter-item]");
      const visibleItems = page.locator("[data-filter-item]:visible");
      await expect(items).toHaveCount(example.route === "Lab08/" ? 11 : example.route === "Lab09/" ? 8 : 10);
      await search.fill(example.query);
      await expect(visibleItems).toHaveCount(example.expected);
      await expect(visibleItems.first()).toHaveAttribute("href", example.href);
      await search.fill("");
      await expect(visibleItems).toHaveCount(example.route === "Lab08/" ? 11 : example.route === "Lab09/" ? 8 : 10);
    });
  }
});
