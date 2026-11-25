const sources = document.querySelector(".sources");

sources.addEventListener("toggle", () => {
  if (!sources.open || sources.dataset.loading === "true" || sources.dataset.loaded === "true") {
    return;
  }

  const codeBlocks = Array.from(sources.querySelectorAll("code[data-source]"));
  const pendingBlocks = codeBlocks.filter((code) => code.dataset.sourceLoaded !== "true");
  if (pendingBlocks.length === 0) {
    sources.dataset.loaded = "true";
    return;
  }

  sources.dataset.loading = "true";
  Promise.all(pendingBlocks.map(async (code) => {
    const response = await fetch(code.dataset.source);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const sourceText = await response.text();
    if (!sourceText.trim()) {
      throw new Error("Source file is empty");
    }
    code.textContent = sourceText;
    code.dataset.sourceLoaded = "true";
  })).then(() => {
    delete sources.dataset.loading;
    sources.dataset.loaded = "true";
  }).catch(() => {
    for (const code of pendingBlocks) {
      if (code.dataset.sourceLoaded !== "true") {
        code.textContent = "Không tải được bản xem trước. Mở tệp qua liên kết phía trên.";
      }
    }
    delete sources.dataset.loading;
    delete sources.dataset.loaded;
  });
});
