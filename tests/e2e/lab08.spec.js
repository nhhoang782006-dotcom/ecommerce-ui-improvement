const { test, expect } = require("@playwright/test");

test.describe("Lab08 — nền tảng ngôn ngữ", () => {
  test("8.1 identifies enabled JavaScript", async ({ page }) => {
    await page.goto("Lab08/Exercise01/");
    await expect(page.getByTestId("js-status")).toContainText("JavaScript đang bật");
    await page.getByTestId("check-js").click();
    await expect(page.getByTestId("js-status")).toContainText("Script đã chạy");
  });

  test("8.2 inline and embedded handlers show the requested alert", async ({ page }) => {
    await page.goto("Lab08/Exercise02/");
    for (const control of ["inline-alert", "embedded-alert"]) {
      const dialogPromise = new Promise((resolve) => {
        page.once("dialog", async (dialog) => {
          const message = dialog.message();
          await dialog.accept();
          resolve(message);
        });
      });
      await page.getByTestId(control).click();
      expect(await dialogPromise).toBe("Hello World!");
    }
    await expect(page.getByTestId("alert-status")).toContainText("Hộp thoại");
  });

  test("8.3 parsing-time document.write retains numeric and string addition", async ({ page }) => {
    await page.goto("Lab08/Exercise03/");
    const output = page.getByTestId("document-write-output");
    await expect(output).toContainText("count = 1");
    await expect(output).toContainText("count + 2 = 3");
    await expect(output).toContainText('count + "2" = 12');
  });

  test("8.4 noscript appears only when JavaScript is disabled", async ({ page, browser }, testInfo) => {
    await page.goto("Lab08/Exercise04/");
    await expect(page.getByTestId("script-status")).toContainText("JavaScript đang bật");
    await expect(page.getByTestId("noscript-message")).toHaveCount(0);

    const context = await browser.newContext({ javaScriptEnabled: false });
    const disabledPage = await context.newPage();
    const url = new URL("Lab08/Exercise04/", testInfo.project.use.baseURL).href;
    await disabledPage.goto(url);
    await expect(disabledPage.getByTestId("noscript-message")).toBeVisible();
    await context.close();
  });

  test("8.5 demonstrates the caught typo, the fix, and console levels", async ({ page }) => {
    const errors = [];
    const warnings = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
      if (message.type() === "warning") warnings.push(message.text());
    });
    await page.goto("Lab08/Exercise05/");
    await expect(page.getByTestId("inspect-output")).toContainText("temperature = 14");
    await page.getByTestId("log-warning").click();
    await page.getByTestId("intentional-error").click();
    await expect(page.getByTestId("error-output")).toContainText("ReferenceError");
    await page.getByTestId("fixed-example").click();
    await expect(page.getByTestId("error-output")).toContainText("temperature = 14");
    expect(errors.some((text) => text.includes("temprature"))).toBeTruthy();
    expect(warnings.some((text) => text.includes("cảnh báo"))).toBeTruthy();
  });

  test("8.6 distinguishes string types and returns values in range", async ({ page }) => {
    await page.goto("Lab08/Exercise06/");
    await expect(page.getByTestId("type-output")).toContainText("string");
    await expect(page.getByTestId("type-output")).toContainText("object");
    await expect(page.getByTestId("type-output")).toContainText("true");
    await expect(page.getByTestId("type-output")).toContainText("false");
    await expect(page.getByTestId("math-output")).toContainText("Math.PI");
    await expect(page.getByTestId("math-output")).toContainText("9");
    await page.getByTestId("random-button").click();
    const value = await page.getByTestId("random-output").textContent();
    const random = Number(value.match(/→\s*([\d.]+)/)?.[1]);
    expect(Number.isFinite(random)).toBeTruthy();
    expect(random).toBeGreaterThanOrEqual(0);
    expect(random).toBeLessThan(1);
  });

  test("8.7 builds a Sunday-first 30-day calendar and weekday array", async ({ page }) => {
    await page.goto("Lab08/Exercise07/");
    await expect(page.getByTestId("week-output")).toContainText("Chủ nhật");
    await expect(page.getByTestId("week-output")).toContainText("Thứ Bảy");
    await expect(page.getByTestId("week-output").locator("mark")).toHaveCount(2);
    const table = page.getByTestId("calendar-output").locator("table");
    await expect(table.locator("thead th").first()).toContainText("Chủ nhật");
    const days = (await table.locator("tbody td").allTextContents()).map((text) => text.trim()).filter(Boolean);
    expect(days).toEqual(Array.from({ length: 30 }, (_, i) => String(i + 1)));
    await expect(table.locator("thead th mark")).toHaveCount(2);
  });

  test("8.8 generates five parameterized boxes and catches local-scope access", async ({ page }) => {
    await page.goto("Lab08/Exercise08/");
    const boxOutput = page.getByTestId("output-box");
    await expect(boxOutput.locator("fieldset")).toHaveCount(5);
    await page.getByTestId("run-output").click();
    await expect(boxOutput.locator("fieldset")).toHaveCount(5);
    await expect(page.getByTestId("scope-output")).toContainText("Biến toàn cục");
    await page.getByTestId("scope-error").click();
    await expect(page.getByTestId("scope-error-output")).toContainText("ReferenceError");
  });

  test("8.9 calculates 15 × 2 plus five percent as 31.50", async ({ page }) => {
    await page.goto("Lab08/Exercise09/");
    await expect(page.getByTestId("function-output")).toContainText("31.50");
    await page.getByTestId("calculate-button").click();
    await expect(page.getByTestId("function-output")).toContainText("31.50");
  });

  test("8.10 creates object totals of 30 and 40", async ({ page }) => {
    await page.goto("Lab08/Exercise10/");
    const output = page.getByTestId("object-output");
    await expect(output).toContainText("30");
    await expect(output).toContainText("40");
    await page.getByTestId("rebuild-objects").click();
    await expect(output).toContainText("this.total");
  });

  test("8.11 renders country properties and updates on selection", async ({ page }) => {
    await page.goto("Lab08/Exercise11/");
    const cards = page.getByTestId("country-cards");
    await expect(cards.locator("article")).toHaveCount(4);
    await expect(cards).toContainText("Canberra");
    await expect(cards).toContainText("FR");
    await page.getByTestId("country-select").selectOption("france");
    await expect(page.getByTestId("lookup-output")).toContainText("Paris");
    await expect(page.getByTestId("lookup-output")).toContainText("Pháp · Paris");
  });
});
