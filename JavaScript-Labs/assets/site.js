"use strict";

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("[data-copy-url]").forEach((button) => {
  button.addEventListener("click", async () => {
    const url = button.dataset.copyUrl || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      const original = button.textContent;
      button.textContent = "Đã sao chép liên kết";
      window.setTimeout(() => { button.textContent = original; }, 1600);
    } catch {
      button.textContent = url;
    }
  });
});

document.querySelectorAll("[data-filter-target]").forEach((input) => {
  const list = document.querySelector(input.dataset.filterTarget);
  const status = document.querySelector(input.dataset.filterStatus);
  if (!list || !status) return;

  const items = Array.from(list.querySelectorAll("[data-filter-item]"));
  const updateResults = () => {
    const query = input.value.trim().toLocaleLowerCase("vi");
    let visible = 0;
    items.forEach((item) => {
      const text = `${item.dataset.searchText || ""} ${item.textContent}`.toLocaleLowerCase("vi");
      const matches = !query || text.includes(query);
      item.hidden = !matches;
      if (matches) visible += 1;
    });
    status.textContent = query
      ? `${visible} / ${items.length} bài phù hợp.`
      : `${items.length} bài trong chương này.`;
  };

  input.addEventListener("input", updateResults);
  updateResults();
});
