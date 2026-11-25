const { test, expect } = require("@playwright/test");

const exerciseRoutes = Array.from({ length: 19 }, (_, index) =>
  `Lab07/Exercise${String(index + 1).padStart(2, "0")}/`
);
const demoRoutes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19]
  .map((number) => `Lab07/demos/lab07-exercise${String(number).padStart(2, "0")}.html`);

test("portfolio and lab index contain verified student details and all nineteen exercises", async ({ page }) => {
  const response = await page.goto("", { waitUntil: "load" });
  expect(response.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Nguyễn Huy Hoàng").first()).toBeVisible();
  await expect(page.getByText("31241026670").first()).toBeVisible();
  await expect(page.getByText("26C1INF50902702").first()).toBeVisible();
  await expect(page.locator('a[href="Lab07/"]').first()).toBeVisible();

  const layout = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width + 1);

  await page.goto("Lab07/", { waitUntil: "load" });
  for (const route of exerciseRoutes) {
    const indexHref = route.replace(/^Lab07\//, "");
    await expect(page.locator(`a[href="${indexHref}"]`), `${route} is linked from the lab index`).toHaveCount(1);
  }
});

test("all nineteen notebook routes load and embed a runnable demonstration", async ({ page, request, baseURL }) => {
  let exercise12SourcePaths;
  for (let index = 0; index < exerciseRoutes.length; index += 1) {
    const route = exerciseRoutes[index];
    const response = await page.goto(route, { waitUntil: "load" });
    expect(response.status(), `${route} should load`).toBe(200);
    await expect(page.getByRole("heading", { level: 1 }), `${route} should have a title`).toBeVisible();
    const demo = page.locator("iframe[title]");
    await expect(demo, `${route} should embed its isolated demonstration`).toHaveCount(1);
    await expect(page.getByRole("link", { name: /mở demo/i }), `${route} should offer a separate demo link`).toHaveCount(1);

    const demoUrl = await demo.getAttribute("src");
    expect(demoUrl).toBeTruthy();
    const wrapperURL = new URL(route, baseURL);
    const expectedDemoURL = new URL(demoUrl, wrapperURL).toString();
    const separateDemoHref = await page.getByRole("link", { name: /mở demo/i }).getAttribute("href");
    expect(new URL(separateDemoHref, wrapperURL).toString(), `${route} separate demo link target`).toBe(expectedDemoURL);
    const demoResponse = await request.get(expectedDemoURL);
    expect(demoResponse.status(), `${route} demo should resolve`).toBe(200);

    const sourceLinks = await page.locator(".source-links a").evaluateAll((links) =>
      links.map((link) => link.getAttribute("href"))
    );
    const sourceTargets = await page.locator(".source-details code[data-source]").evaluateAll((blocks) =>
      blocks.map((block) => block.getAttribute("data-source"))
    );
    const linkedSourceURLs = sourceLinks.map((href) => new URL(href, wrapperURL).toString());
    for (const sourcePath of sourceTargets) {
      expect(linkedSourceURLs, `${route} source link for ${sourcePath}`).toContain(new URL(sourcePath, wrapperURL).toString());
    }
    for (const href of sourceLinks) {
      const sourceURL = new URL(href, wrapperURL).toString();
      const linkedSourceResponse = await request.get(sourceURL);
      expect(linkedSourceResponse.status(), `${route} source link ${href} should resolve`).toBe(200);
    }

    const resolvedSourcePaths = sourceTargets.map((sourcePath) => new URL(sourcePath, wrapperURL).pathname);
    if (index === 11) {
      exercise12SourcePaths = resolvedSourcePaths;
    }

    const sourcePanel = page.locator("details.source-details");
    await sourcePanel.locator("summary").click();
    const sourceBlocks = page.locator(".source-details code[data-source]");
    await expect.poll(() => sourceBlocks.evaluateAll((blocks) =>
      blocks.length > 0 && blocks.every((block) => block.dataset.sourceLoaded === "true")
    ), `${route} source files should load successfully`).toBe(true);

    for (let sourceIndex = 0; sourceIndex < await sourceBlocks.count(); sourceIndex += 1) {
      const code = sourceBlocks.nth(sourceIndex);
      const sourcePath = await code.getAttribute("data-source");
      const sourceResponse = await request.get(new URL(sourcePath, new URL(route, baseURL)).toString());
      expect(sourceResponse.status(), `${route} source ${sourcePath} should resolve`).toBe(200);
      expect(await code.evaluate((element) => element.textContent)).toBe(await sourceResponse.text());
    }

    if (index === 12) {
      expect(expectedDemoURL).toContain("lab07-exercise12.html");
      expect(resolvedSourcePaths).toEqual(exercise12SourcePaths);
    }
  }
});

test("all notebook routes fit desktop, tablet and phone widths", async ({ page }) => {
  const notebookRoutes = ["", "Lab07/", ...exerciseRoutes];
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of notebookRoutes) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response.status(), `${route || "portfolio"} should load at ${width}px`).toBe(200);
      const layout = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth
      }));
      expect(layout.scrollWidth, `${route || "portfolio"} horizontal overflow at ${width}px`)
        .toBeLessThanOrEqual(layout.width + 1);
    }
  }
});

test("source demos and their local assets load directly", async ({ request, baseURL }) => {
  for (const route of demoRoutes) {
    const response = await request.get(new URL(route, baseURL).toString());
    expect(response.status(), `${route} should load directly`).toBe(200);
    const html = await response.text();
    expect(html, `${route} has a document title`).toMatch(/<title[^>]*>.+<\/title>/i);
  }
  for (const route of [
    "Lab07/demos/bootstrap/css/bootstrap.min.css",
    "Lab07/demos/bootstrap/js/bootstrap.min.js",
    "Lab07/demos/bootstrap/fonts/glyphicons-halflings-regular.woff2",
    "Lab07/demos/images/828.jpg",
    "Lab07/demos/images/700.jpg"
  ]) {
    const response = await request.get(new URL(route, baseURL).toString());
    expect(response.status(), `${route} should load`).toBe(200);
  }
});

test("all notebook and demo pages load without console or local resource errors", async ({ page }) => {
  const browserErrors = [];
  const isFavicon = (url) => new URL(url).pathname.endsWith("/favicon.ico");
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("favicon.ico")) {
      browserErrors.push(`console: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => browserErrors.push(`page: ${error.message}`));
  page.on("requestfailed", (request) => {
    if (!isFavicon(request.url())) {
      browserErrors.push(`request: ${request.url()} (${request.failure()?.errorText || "failed"})`);
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && !isFavicon(response.url())) {
      browserErrors.push(`HTTP ${response.status()}: ${response.url()}`);
    }
  });

  const routes = ["", "Lab07/", ...exerciseRoutes, ...demoRoutes];
  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "load" });
    expect(response.status(), `${route || "portfolio"} should load`).toBe(200);
  }
  expect(browserErrors).toEqual([]);
});

test("source previews can retry after a temporary fetch failure", async ({ page }) => {
  let stylesheetRequests = 0;
  await page.route("**/lab07-exercise01.css", async (route) => {
    if (route.request().resourceType() !== "fetch") {
      await route.continue();
      return;
    }
    stylesheetRequests += 1;
    if (stylesheetRequests === 1) {
      await route.abort("failed");
      return;
    }
    await route.continue();
  });

  await page.goto("Lab07/Exercise01/", { waitUntil: "load" });
  const sourcePanel = page.locator("details.source-details");
  const summary = sourcePanel.locator("summary");
  const cssSource = page.locator('code[data-source*="lab07-exercise01.css"]');
  await summary.click();
  await expect(cssSource).toContainText("Không tải được bản xem trước");
  await expect(sourcePanel).not.toHaveAttribute("data-loaded", "true");

  await summary.click();
  await summary.click();
  await expect(cssSource).toHaveAttribute("data-source-loaded", "true");
  await expect(sourcePanel).toHaveAttribute("data-loaded", "true");
  expect(stylesheetRequests).toBe(2);
});

test("positioning, stacking, floats and clearing use the expected computed styles", async ({ page }) => {
  const checks = [
    { route: "Lab07/demos/lab07-exercise02.html", selector: "figure", property: "position", expected: "relative" },
    { route: "Lab07/demos/lab07-exercise03.html", selector: "figure", property: "position", expected: "absolute" },
    { route: "Lab07/demos/lab07-exercise04.html", selector: "figure", property: "zIndex", expected: "-1" },
    { route: "Lab07/demos/lab07-exercise04.html", selector: "figcaption", property: "zIndex", expected: "1" },
    { route: "Lab07/demos/lab07-exercise05.html", selector: "figure", property: "float", expected: "right" },
    { route: "Lab07/demos/lab07-exercise06.html", selector: "figure", property: "float", expected: "left" },
    { route: "Lab07/demos/lab07-exercise07.html", selector: "figure", property: "float", expected: "left" },
    { route: "Lab07/demos/lab07-exercise08.html", selector: "figure", property: "float", expected: "left" },
    { route: "Lab07/demos/lab07-exercise08.html", selector: "figure.first", property: "clear", expected: "left" },
    { route: "Lab07/demos/lab07-exercise09.html", selector: "figure", property: "position", expected: "relative" },
    { route: "Lab07/demos/lab07-exercise09.html", selector: ".overlayed", property: "position", expected: "absolute" }
  ];

  for (const check of checks) {
    await page.goto(check.route, { waitUntil: "load" });
    const actual = await page.locator(check.selector).first().evaluate((element, property) =>
      getComputedStyle(element)[property], check.property
    );
    expect(actual, `${check.route} ${check.selector} ${check.property}`).toBe(check.expected);
  }
});

test("responsive demo switches between navigation list and select at 480px", async ({ page }) => {
  const path = "Lab07/demos/lab07-exercise12.html";
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path, { waitUntil: "load" });
  const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
  expect(viewport).toContain("width=device-width");
  const mobile = await page.evaluate(() => ({
    list: getComputedStyle(document.querySelector("nav ul")).display,
    select: getComputedStyle(document.querySelector("nav select")).display,
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  expect(mobile.list).toBe("none");
  expect(mobile.select).not.toBe("none");
  expect(mobile.scrollWidth).toBeLessThanOrEqual(mobile.width + 1);

  for (const width of [480, 481]) {
    await page.setViewportSize({ width, height: 844 });
    await page.reload({ waitUntil: "load" });
    const navigation = await page.evaluate(() => ({
      list: getComputedStyle(document.querySelector("nav ul")).display,
      select: getComputedStyle(document.querySelector("nav select")).display
    }));
    if (width === 480) {
      expect(navigation.list).toBe("none");
      expect(navigation.select).not.toBe("none");
    } else {
      expect(navigation.list).not.toBe("none");
      expect(navigation.select).toBe("none");
    }
  }
});

test("transitions, filters, animation and Bootstrap behavior are active", async ({ page }) => {
  await page.goto("Lab07/demos/lab07-exercise15.html", { waitUntil: "load" });
  const button = page.locator("button").first();
  const buttonBefore = await button.evaluate((element) => getComputedStyle(element).backgroundColor);
  await button.hover();
  await expect.poll(() => button.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(buttonBefore);

  await page.goto("Lab07/demos/lab07-exercise16.html", { waitUntil: "load" });
  const figure = page.locator("figure").first();
  await figure.hover();
  await expect.poll(() => figure.evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");

  await page.goto("Lab07/demos/lab07-exercise17.html", { waitUntil: "load" });
  const filteredImage = page.locator("img.saturate");
  await expect.poll(() => filteredImage.evaluate((element) => getComputedStyle(element).filter)).not.toBe("none");

  await page.goto("Lab07/demos/lab07-exercise18.html", { waitUntil: "load" });
  const animation = await page.locator(".box").evaluate((element) => {
    const style = getComputedStyle(element);
    return { name: style.animationName, duration: style.animationDuration, count: style.animationIterationCount };
  });
  expect(animation.name).toBe("animTwo");
  expect(animation.duration).toBe("5s");
  expect(animation.count).toBe("3");

  await page.goto("Lab07/demos/lab07-exercise19.html", { waitUntil: "load" });
  await expect(page.locator(".navbar")).toBeVisible();
  await expect(page.locator(".panel")).toBeVisible();
  await expect(page.locator(".jumbotron")).toBeVisible();
  await expect(page.locator(".row .row")).toHaveCount(1);
});
