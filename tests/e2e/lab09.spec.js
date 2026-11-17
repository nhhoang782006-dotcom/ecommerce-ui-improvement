const { test, expect } = require("@playwright/test");

test.describe("Lab09 — DOM và sự kiện", () => {
  test("9.1 selectors, text values, attributes, classes, and safe user input", async ({ page }) => {
    await page.goto("Lab09/Exercise01/");
    const output = page.getByTestId("lab09-ex01-output");
    await page.getByTestId("lab09-ex01-query-button").click();
    await expect(output).toContainText("getElementById: selector-card");
    await expect(output).toContainText("querySelectorAll: 2 kết quả");
    await page.locator("#note-input").fill("<script>window.injected = true</script>");
    await page.getByTestId("lab09-ex01-update-button").click();
    await expect(page.locator("#selector-card")).toHaveAttribute("title", "Ghi chú vừa được cập nhật");
    await expect(page.locator("#selector-card")).toHaveClass(/is-highlighted/);
    await expect(page.locator("#selector-card script")).toHaveCount(0);
    await expect(output).toContainText("textarea.value:");
  });

  test("9.2 walks whitespace text nodes and element nodes", async ({ page }) => {
    await page.goto("Lab09/Exercise02/");
    await page.getByTestId("lab09-ex02-walk-button").click();
    const output = page.getByTestId("lab09-ex02-output");
    await expect(output).toContainText("firstChild: TEXT_NODE");
    await expect(output).toContainText("TEXT_NODE");
    await expect(output).toContainText("ELEMENT_NODE");
    await expect(page.locator("#node-list .is-non-text")).toHaveCount(2);
  });

  test("9.3 creates a text node and removes the final list item", async ({ page }) => {
    await page.goto("Lab09/Exercise03/");
    const list = page.locator("#task-list");
    await expect(list.locator("li")).toHaveCount(2);
    await page.getByTestId("lab09-ex03-add-button").click();
    await expect(list.locator("li")).toHaveCount(3);
    await expect(list).toContainText("Gắn sự kiện cho nút");
    await page.getByTestId("lab09-ex03-remove-button").click();
    await expect(list.locator("li")).toHaveCount(2);
  });

  test("9.4 handles click, grayscale hover, and delayed hide/show", async ({ page }) => {
    await page.goto("Lab09/Exercise04/");
    const image = page.locator("#hover-image");
    await image.hover();
    await expect(image).toHaveCSS("filter", "grayscale(1)");
    await image.evaluate((element) => element.dispatchEvent(new MouseEvent("mouseout", { bubbles: true })));
    await expect(image).toHaveCSS("filter", "grayscale(0)");
    await page.getByTestId("lab09-ex04-click-button").click();
    await expect(page.locator("#click-count")).toHaveText("1");
    const paragraph = page.locator("#transition-copy");
    await page.getByTestId("lab09-ex04-toggle-button").click();
    await expect(paragraph).toBeHidden();
    await page.getByTestId("lab09-ex04-toggle-button").click();
    await expect(paragraph).toBeVisible();
  });

  test("9.5 reproduces early DOM access safely and confirms the load fix", async ({ page }) => {
    await page.goto("Lab09/Exercise05/");
    await expect(page.locator("#loaded-target")).toHaveText("Đã tìm thấy sau window load");
    await expect(page.getByTestId("lab09-ex05-output")).toContainText("window load đã chạy");
    await page.getByTestId("lab09-ex05-error-button").click();
    await expect(page.getByTestId("lab09-ex05-output")).toContainText("TypeError");
    await expect(page.getByTestId("lab09-ex05-output")).toContainText("có chủ ý");
  });

  test("9.6 reports the hovered target and pauses at the debugger statement", async ({ page }) => {
    await page.goto("Lab09/Exercise06/");
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Debugger.enable");
    const pausedPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("debugger statement did not pause within 5 seconds")), 5_000);
      cdp.once("Debugger.paused", (event) => { clearTimeout(timeout); resolve(event); });
    });
    await page.getByTestId("lab09-ex06-debug-toggle").check();
    const hoverPromise = page.locator("#box-coral").hover();
    const paused = await pausedPromise;
    expect(paused.reason).toBe("other");
    const frame = paused.callFrames[0];
    const target = await cdp.send("Debugger.evaluateOnCallFrame", { callFrameId: frame.callFrameId, expression: "event.target.id" });
    expect(target.result.value).toBe("box-coral");
    await cdp.send("Debugger.resume");
    await hoverPromise;
    await expect(page.getByTestId("lab09-ex06-output")).toContainText("e.target.id = box-coral");
    await cdp.detach();
  });

  test("9.7 focus and blur change the field background", async ({ page }) => {
    await page.goto("Lab09/Exercise07/");
    const input = page.getByTestId("lab09-ex07-text-input");
    await input.focus();
    await expect(input).toHaveCSS("background-color", "rgb(255, 242, 168)");
    await input.blur();
    await expect(input).toHaveCSS("background-color", "rgb(255, 255, 255)");
  });

  test("9.8 blocks an empty form, lists missing fields, and accepts completed input", async ({ page }) => {
    await page.goto("Lab09/Exercise08/");
    const dialogPromise = new Promise((resolve) => {
      page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
    await page.getByTestId("lab09-ex08-submit-button").click();
    expect(await dialogPromise).toContain("Họ và tên, Email");
    const errors = page.getByTestId("lab09-ex08-output");
    await expect(errors).toContainText("Họ và tên");
    await expect(errors).toContainText("Email");
    await page.getByTestId("lab09-ex08-name-input").fill("Nguyễn Huy Hoàng");
    await page.getByTestId("lab09-ex08-email-input").fill("not-an-email");
    const invalidEmailDialog = new Promise((resolve) => {
      page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
    await page.getByTestId("lab09-ex08-submit-button").click();
    expect(await invalidEmailDialog).toContain("đúng định dạng");
    await expect(errors).toContainText("ten@example.com");
    await expect(page.getByTestId("lab09-ex08-email-input")).toHaveAttribute("aria-invalid", "true");
    await page.getByTestId("lab09-ex08-email-input").fill("hoang@example.test");
    await page.getByTestId("lab09-ex08-submit-button").click();
    await expect(page.getByRole("status")).toContainText("Biểu mẫu hợp lệ");
  });
});
