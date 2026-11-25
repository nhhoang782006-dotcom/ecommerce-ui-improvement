const { defineConfig } = require("@playwright/test");

const localUrl = "http://127.0.0.1:4173/ecommerce-ui-improvement/CSS-NangCao/";
const baseURL = process.env.CSS_E2E_BASE_URL || localUrl;
const runLocalServer = new URL(baseURL).hostname === "127.0.0.1";

module.exports = defineConfig({
  testDir: "./tests/css-advanced",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 2,
  timeout: 120_000,
  expect: { timeout: 5_000 },
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report/css-advanced" }]],
  use: {
    baseURL,
    browserName: "chromium",
    channel: process.env.PLAYWRIGHT_CHANNEL || "msedge",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    ignoreHTTPSErrors: false
  },
  ...(runLocalServer ? {
    webServer: {
      command: "python tests/e2e/serve-static.py",
      url: "http://127.0.0.1:4173",
      cwd: __dirname,
      reuseExistingServer: false,
      timeout: 10_000,
      stdout: "ignore",
      stderr: "pipe"
    }
  } : {})
});
