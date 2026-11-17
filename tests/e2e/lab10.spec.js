const { test, expect } = require("@playwright/test");

const apiMatcher = /https:\/\/countriesnow\.space\/api\/v0\.1\/countries\/cities\/q(?:\?|$)/;

test.describe("Lab10 — jQuery, hiệu ứng và AJAX", () => {
  test("10.1 recovers from a blocked CDN with local jQuery 3.7.1", async ({ page }) => {
    await page.route("https://code.jquery.com/**", (route) => route.abort());
    await page.goto("Lab10/Exercise01/");
    await expect(page.getByTestId("10-1-version")).toHaveText("3.7.1");
    await expect(page.getByTestId("10-1-source")).toContainText("cục bộ");
    expect(await page.evaluate(() => window.jQuery?.fn.jquery)).toBe("3.7.1");
  });

  test("10.2 uses the shared local fallback when the CDN is blocked", async ({ page }) => {
    await page.route("https://code.jquery.com/**", (route) => route.abort());
    await page.goto("Lab10/Exercise02/");
    await page.getByTestId("10-2-name").fill("Fallback works");
    await page.getByTestId("10-2-apply").click();
    await expect(page.getByTestId("10-2-output")).toContainText("val(), html(), attr(), css() và addClass()");
    expect(await page.evaluate(() => window.jQuery?.fn.jquery)).toBe("3.7.1");
    expect(await page.evaluate(() => window.jQueryLoadSource)).toBe("bản cục bộ");
  });

  test("10.2 reads val safely and updates HTML, attributes, style, and class", async ({ page }) => {
    await page.goto("Lab10/Exercise02/");
    await page.getByTestId("10-2-name").fill('<img src=x onerror="window.pwned=true">');
    await page.getByTestId("10-2-apply").click();
    await expect(page.locator("#book-title")).toContainText("<img src=x onerror=\"window.pwned=true\">");
    await expect(page.locator("#book-title img")).toHaveCount(0);
    await expect(page.getByTestId("10-2-card")).toHaveClass(/lab10-highlight/);
    await expect(page.locator("#book-link")).toHaveAttribute("title", /Liên kết đến thẻ/);
    await expect(page.getByTestId("10-2-output")).toContainText("val(), html(), attr(), css() và addClass()");
  });

  test("10.3 exercises password, nth-child, and contains selectors", async ({ page }) => {
    await page.goto("Lab10/Exercise03/");
    await page.getByTestId("10-3-password").click();
    await expect(page.locator("#account-secret")).toHaveClass(/lab10-highlight/);
    await page.getByTestId("10-3-nth-child").click();
    await expect(page.getByTestId("10-3-menu").locator("li.is-selected")).toHaveText("Trà sen");
    await page.getByTestId("10-3-contains").click();
    await expect(page.getByTestId("10-3-menu").locator("li.is-selected")).toHaveText("Cà phê sữa đá");
  });

  test("10.4 updates coordinates, removes mousemove, and reports mouseleave", async ({ page }) => {
    await page.goto("Lab10/Exercise04/");
    const stage = page.getByTestId("10-4-mouse-stage");
    const coordinates = page.getByTestId("10-4-coordinates");
    await stage.hover({ position: { x: 100, y: 80 } });
    await expect(coordinates).toContainText("X:");
    const firstReading = await coordinates.textContent();
    await page.getByTestId("10-4-stop").click();
    await expect(page.getByTestId("10-4-state")).toHaveText("Đã dừng");
    await stage.hover({ position: { x: 180, y: 110 } });
    await expect(coordinates).toHaveText(firstReading);
    await expect(page.getByTestId("10-4-goodbye")).toContainText("Hẹn gặp lại");
    await page.getByTestId("10-4-start").click();
    await stage.hover({ position: { x: 155, y: 90 } });
    await expect(coordinates).not.toHaveText(firstReading);
  });

  test("10.5 inserts nodes in the requested locations", async ({ page }) => {
    await page.goto("Lab10/Exercise05/");
    const list = page.getByTestId("10-5-list");
    const expected = {
      after: ["Đón khách tại sảnh", "Bắt đầu hành trình", "Thêm bằng after()", "Kết thúc tại quầy thông tin"],
      before: ["Đón khách tại sảnh", "Thêm bằng before()", "Bắt đầu hành trình", "Kết thúc tại quầy thông tin"],
      append: ["Đón khách tại sảnh", "Bắt đầu hành trình", "Kết thúc tại quầy thông tin", "Thêm bằng append()"],
      prepend: ["Thêm bằng prepend()", "Đón khách tại sảnh", "Bắt đầu hành trình", "Kết thúc tại quầy thông tin"],
      appendTo: ["Đón khách tại sảnh", "Bắt đầu hành trình", "Kết thúc tại quầy thông tin", "Thêm bằng appendTo()"],
      prependTo: ["Thêm bằng prependTo()", "Đón khách tại sảnh", "Bắt đầu hành trình", "Kết thúc tại quầy thông tin"],
      insertBefore: ["Đón khách tại sảnh", "Thêm bằng insertBefore()", "Bắt đầu hành trình", "Kết thúc tại quầy thông tin"]
    };
    for (const [method, texts] of Object.entries(expected)) {
      await page.getByTestId("10-5-reset").click();
      await page.getByTestId(`10-5-${method}`).click();
      await expect(list.locator("li")).toHaveText(texts);
      await expect(page.getByTestId("10-5-output")).toContainText(method);
    }
  });

  test("10.6 completes fade and slide transitions in both directions", async ({ page }) => {
    await page.goto("Lab10/Exercise06/");
    const fade = page.getByTestId("10-6-fade-box");
    const slide = page.getByTestId("10-6-slide-panel");
    await expect(fade).toBeVisible();
    await page.getByTestId("10-6-fade-out").click();
    await expect(fade).toBeHidden();
    await page.getByTestId("10-6-fade-in").click();
    await expect(fade).toBeVisible();
    await page.getByTestId("10-6-fade-toggle").click();
    await expect(fade).toBeHidden();
    await page.getByTestId("10-6-slide-down").click();
    await expect(slide).toBeVisible();
    await page.getByTestId("10-6-slide-up").click();
    await expect(slide).toBeHidden();
    await page.getByTestId("10-6-slide-toggle").click();
    await expect(slide).toBeVisible();
  });

  test("10.7 follows the pointer with a captioned preview and removes it on leave", async ({ page }) => {
    await page.goto("Lab10/Exercise07/");
    const preview = page.getByTestId("10-7-preview");
    const thumb = page.getByTestId("10-7-thumb-1");
    await thumb.hover();
    await expect(preview).toBeVisible();
    await expect(page.getByTestId("10-7-caption")).toContainText("Hồ Gươm");
    await expect(page.locator("#preview-image")).toHaveAttribute("src", /ho-guom\.svg/);
    const firstPosition = await preview.evaluate((element) => ({ left: element.style.left, top: element.style.top }));
    await page.getByTestId("10-7-thumb-2").hover();
    await expect.poll(() => preview.evaluate((element) => ({ left: element.style.left, top: element.style.top }))).not.toEqual(firstPosition);
    await expect(page.getByTestId("10-7-caption")).toContainText("Phố cổ");
    await page.mouse.move(4, 4);
    await expect(preview).toBeHidden();
  });

  test("10.8 completes both chained animate calls with the final CSS values", async ({ page }) => {
    await page.goto("Lab10/Exercise08/");
    await page.getByTestId("10-8-run").click();
    await expect(page.getByTestId("10-8-output")).toContainText("Hoàn tất");
    const box = page.getByTestId("10-8-animated-box");
    await expect(box).toHaveCSS("left", "192px");
    await expect(box).toHaveCSS("top", "80px");
    await expect(box).toHaveCSS("height", "96px");
    await expect(box).toHaveCSS("opacity", "1");
    await page.getByTestId("10-8-reset").click();
    await expect(page.getByTestId("10-8-output")).toContainText("trở về vị trí đầu");
  });

  test("10.9 displays real API response data through $.get", async ({ page }) => {
    await page.goto("Lab10/Exercise09/");
    const responsePromise = page.waitForResponse((response) => apiMatcher.test(response.url()) && response.request().method() === "GET");
    await page.getByTestId("10-9-load").click();
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    const payload = await response.json();
    expect(payload.error).toBe(false);
    expect(Array.isArray(payload.data)).toBeTruthy();
    expect(payload.data.length).toBeGreaterThan(0);
    await expect(page.getByTestId("10-9-city-status")).toContainText(`Đã nhận ${payload.data.length} thành phố`);
    await expect(page.getByTestId("10-9-city-list").locator("li")).toHaveCount(Math.min(payload.data.length, 18));
    await expect(page.getByTestId("10-9-city-list").locator("li").first()).toHaveText(payload.data[0]);
  });

  test("10.9 ends a stalled $.get after 15 seconds and reenables the control", async ({ page }) => {
    await page.route("https://code.jquery.com/**", (route) => route.abort());
    await page.route(apiMatcher, () => new Promise(() => {}));
    await page.goto("Lab10/Exercise09/");
    const button = page.getByTestId("10-9-load");
    await button.click();
    await expect(button).toBeDisabled();
    await expect(page.getByTestId("10-9-city-status")).toContainText("hết thời gian chờ", { timeout: 20_000 });
    await expect(button).toBeEnabled();
  });

  test("10.10 shows loading, completes done/always, and prevents a concurrent request", async ({ page }) => {
    let requestCount = 0;
    let releaseRequest;
    let notifyRequestStarted;
    const requestStarted = new Promise((resolve) => { notifyRequestStarted = resolve; });
    const requestGate = new Promise((resolve) => { releaseRequest = resolve; });
    await page.route(apiMatcher, async (route) => {
      requestCount += 1;
      notifyRequestStarted();
      await requestGate;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ error: false, data: ["Hà Nội", "Đà Nẵng"] }) });
    });
    await page.goto("Lab10/Exercise10/");
    const requestPromise = page.waitForResponse((response) => apiMatcher.test(response.url()));
    await page.getByTestId("10-10-request").click();
    await expect(page.getByTestId("10-10-loading")).toBeVisible();
    await requestStarted;
    await expect(page.getByTestId("10-10-request")).toBeDisabled();
    await page.getByTestId("10-10-request").evaluate((button) => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(requestCount).toBe(1);
    releaseRequest();
    await requestPromise;
    await expect(page.getByTestId("10-10-state")).toHaveText("Thành công");
    await expect(page.getByTestId("10-10-loading")).toBeHidden();
    await expect(page.getByTestId("10-10-city-list").locator("li")).toHaveText(["Hà Nội", "Đà Nẵng"]);
  });

  test("10.10 fail and always leave an actionable retry, then recover", async ({ page }) => {
    let requestCount = 0;
    await page.route(apiMatcher, async (route) => {
      requestCount += 1;
      if (requestCount === 1) return route.abort();
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ error: false, data: ["Huế"] }) });
    });
    await page.goto("Lab10/Exercise10/");
    await page.getByTestId("10-10-request").click();
    await expect(page.getByTestId("10-10-request-status")).toContainText("Không kết nối được API");
    await expect(page.getByTestId("10-10-loading")).toBeHidden();
    await expect(page.getByTestId("10-10-retry")).toBeVisible();
    await page.getByTestId("10-10-retry").click();
    await expect(page.getByTestId("10-10-state")).toHaveText("Thành công");
    await expect(page.getByTestId("10-10-city-list").locator("li")).toHaveText("Huế");
    expect(requestCount).toBe(2);
  });

  test("10.10 timeout ends after 15 seconds and always clears the spinner", async ({ page }) => {
    await page.clock.install();
    await page.route(apiMatcher, () => new Promise(() => {}));
    await page.goto("Lab10/Exercise10/");
    await page.clock.runFor(1);
    await page.getByTestId("10-10-request").click();
    await expect(page.getByTestId("10-10-loading")).toBeVisible();
    await page.clock.fastForward(15_000);
    await expect(page.getByTestId("10-10-request-status")).toContainText("Yêu cầu quá 15 giây");
    await expect(page.getByTestId("10-10-loading")).toBeHidden();
    await expect(page.getByTestId("10-10-state")).toHaveText("Hết thời gian");
    await expect(page.getByTestId("10-10-retry")).toBeVisible();
  });
});
