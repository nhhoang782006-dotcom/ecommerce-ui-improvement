const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("@playwright/test");

const repositoryRoot = path.resolve(__dirname, "..");
const evidenceRoot = process.env.CSS_EVIDENCE_DIR
  ? path.resolve(process.env.CSS_EVIDENCE_DIR)
  : path.resolve(repositoryRoot, "..", "css-nang-cao-evidence");
const baseURL = (process.env.CSS_E2E_BASE_URL || "http://127.0.0.1:4173/ecommerce-ui-improvement/CSS-NangCao/").replace(/\/?$/, "/");
const exercises = Array.from({ length: 19 }, (_, index) => ({
  number: index + 1,
  id: `7.${index + 1}`,
  route: `Lab07/Exercise${String(index + 1).padStart(2, "0")}/`
}));

async function saveElement(locator, filePath) {
  await locator.waitFor({ state: "visible" });
  await locator.screenshot({ path: filePath, animations: "disabled", caret: "hide" });
}

async function main() {
  await fs.mkdir(evidenceRoot, { recursive: true });
  const browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL || "msedge",
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 900, height: 760 }, deviceScaleFactor: 1 });
  const manifest = {
    generatedAt: new Date().toISOString(),
    baseURL,
    commit: process.env.CSS_CAPTURE_COMMIT || "unrecorded",
    student: { name: "Nguyễn Huy Hoàng", id: "31241026670", class: "26C1INF50902702" },
    repositoryURL: "https://github.com/nhhoang782006-dotcom/ecommerce-ui-improvement",
    pagesURL: "https://nhhoang782006-dotcom.github.io/ecommerce-ui-improvement/CSS-NangCao/",
    portfolioScreenshot: "portfolio-hero.png",
    exercises: []
  };

  await page.goto(baseURL, { waitUntil: "networkidle" });
  manifest.reflection = await page.locator("#tu-danh-gia p").first().innerText();
  await page.locator(".hero").screenshot({ path: path.join(evidenceRoot, manifest.portfolioScreenshot), animations: "disabled" });

  for (const exercise of exercises) {
    const number = String(exercise.number).padStart(2, "0");
    const response = await page.goto(new URL(exercise.route, baseURL).toString(), { waitUntil: "networkidle" });
    if (!response || response.status() !== 200) {
      throw new Error(`Exercise ${exercise.id} failed to load (${response ? response.status() : "no response"})`);
    }
    const heading = (await page.locator("h1").innerText()).trim();
    const summary = (await page.locator(".exercise-summary").innerText()).trim();
    const frame = page.locator(".demo-frame");
    await frame.waitFor({ state: "visible" });
    const demoUrl = await frame.getAttribute("src");
    const sourcePanel = page.locator("details.source-details");
    if (!(await sourcePanel.getAttribute("open"))) {
      await sourcePanel.locator("summary").click();
    }
    await page.addStyleTag({ content: ".source-details .code-sample pre { max-height: 12rem !important; }" });
    await page.locator(".source-details code").first().waitFor({ state: "visible" });
    await page.waitForFunction(() => {
      const codeBlocks = Array.from(document.querySelectorAll(".source-details code"));
      return codeBlocks.length > 0 && codeBlocks.every((element) =>
        element.dataset.sourceLoaded === "true" && element.textContent.trim() &&
        !element.textContent.includes("Không tải được bản xem trước")
      );
    });

    const sourceScreenshot = `exercise-${number}-source.png`;
    const resultScreenshot = `exercise-${number}-result.png`;
    await saveElement(sourcePanel, path.join(evidenceRoot, sourceScreenshot));
    await saveElement(frame, path.join(evidenceRoot, resultScreenshot));
    manifest.exercises.push({
      number: exercise.number,
      id: exercise.id,
      route: exercise.route,
      title: heading,
      summary,
      demoURL: new URL(demoUrl, new URL(exercise.route, baseURL)).toString(),
      sourceScreenshot,
      resultScreenshot
    });
    process.stdout.write(`${exercise.id} captured\n`);
  }

  async function captureDirectDemo(route, fileName, width = 900) {
    await page.setViewportSize({ width, height: 700 });
    await page.goto(new URL(route, baseURL).toString(), { waitUntil: "load" });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(evidenceRoot, fileName), fullPage: false, animations: "allow" });
  }

  await captureDirectDemo("Lab07/demos/lab07-exercise12.html", "exercise-12-desktop.png", 1024);
  await captureDirectDemo("Lab07/demos/lab07-exercise12.html", "exercise-12-mobile.png", 390);
  await captureDirectDemo("Lab07/demos/lab07-exercise12.html", "exercise-12-breakpoint-480.png", 480);
  await captureDirectDemo("Lab07/demos/lab07-exercise12.html", "exercise-12-breakpoint-481.png", 481);

  await page.setViewportSize({ width: 900, height: 700 });
  await page.goto(new URL("Lab07/demos/lab07-exercise15.html", baseURL).toString(), { waitUntil: "load" });
  await page.locator("button").first().hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(evidenceRoot, "exercise-15-hover.png"), fullPage: false, animations: "allow" });

  await page.goto(new URL("Lab07/demos/lab07-exercise16.html", baseURL).toString(), { waitUntil: "load" });
  await page.locator("figure").first().hover();
  await page.waitForTimeout(450);
  await page.screenshot({ path: path.join(evidenceRoot, "exercise-16-hover.png"), fullPage: false, animations: "allow" });

  await page.goto(new URL("Lab07/demos/lab07-exercise18.html", baseURL).toString(), { waitUntil: "load" });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: path.join(evidenceRoot, "exercise-18-animation-start.png"), fullPage: false, animations: "allow" });
  await page.waitForTimeout(1650);
  await page.screenshot({ path: path.join(evidenceRoot, "exercise-18-animation-progress.png"), fullPage: false, animations: "allow" });

  async function captureContactSheet(items, fileName) {
    const figures = await Promise.all(items.map(async ({ file, label }) => {
      const image = await fs.readFile(path.join(evidenceRoot, file));
      return `<figure><figcaption>${label}</figcaption><img src="data:image/png;base64,${image.toString("base64")}" alt="${label}"></figure>`;
    }));
    const sheet = await browser.newPage({ viewport: { width: 900, height: 460 }, deviceScaleFactor: 1 });
    await sheet.setContent(`<!doctype html><html lang="vi"><head><meta charset="utf-8"><style>
      *{box-sizing:border-box}body{margin:0;background:#f6f7f1;font:14px/1.4 Arial,sans-serif;color:#152c3d}
      main{display:grid;grid-template-columns:repeat(${items.length},minmax(0,1fr));gap:8px;padding:10px}
      figure{min-width:0;margin:0;padding:6px;border:1px solid #d4ded6;border-radius:4px;background:white}
      figcaption{min-height:2.5em;margin-bottom:5px;color:#075e57;font-weight:bold;text-align:center}
      img{display:block;width:100%;max-height:360px;object-fit:contain;object-position:top center;background:#f6f7f1}
    </style></head><body><main>${figures.join("")}</main></body></html>`, { waitUntil: "load" });
    await sheet.locator("main").screenshot({ path: path.join(evidenceRoot, fileName), animations: "disabled" });
    await sheet.close();
  }

  await captureContactSheet([
    { file: "exercise-12-desktop.png", label: "Desktop · 1024 px" },
    { file: "exercise-12-mobile.png", label: "Điện thoại · 390 px" },
    { file: "exercise-12-breakpoint-480.png", label: "Điểm ngắt · 480 px" },
    { file: "exercise-12-breakpoint-481.png", label: "Điểm ngắt · 481 px" }
  ], "exercise-12-responsive-states.png");
  await captureContactSheet([
    { file: "exercise-18-animation-start.png", label: "Animation · bắt đầu" },
    { file: "exercise-18-animation-progress.png", label: "Animation · giữa chu kỳ" }
  ], "exercise-18-animation-states.png");

  await fs.writeFile(path.join(evidenceRoot, "capture-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await browser.close();
  process.stdout.write(`Evidence saved to ${evidenceRoot}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});
