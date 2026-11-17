(() => {
  const root = document.querySelector("#demo-9-6");
  const grid = root.querySelector("#inspect-grid");
  const breakpoint = root.querySelector("#enable-breakpoint");
  const output = root.querySelector("#debug-output");

  grid.addEventListener("mouseover", (event) => {
    if (!(event.target instanceof Element)) return;
    const box = event.target.closest("[data-inspect-box]");
    if (!box || !grid.contains(box)) return;
    const targetId = event.target.id;
    output.textContent = `e.target.id = ${targetId || "(phần tử chưa có id)"} · ${box.textContent.trim()}`;
    if (breakpoint.checked) debugger;
  });
})();
