(() => {
  const root = document.querySelector("#demo-9-4");
  const count = root.querySelector("#click-count");
  const image = root.querySelector("#hover-image");
  const paragraph = root.querySelector("#transition-copy");
  const toggle = root.querySelector("#toggle-paragraph");
  const status = root.querySelector("#event-status");
  let clicks = 0;
  let visible = true;
  let timer;

  root.querySelector("#click-counter").addEventListener("click", () => {
    clicks += 1;
    count.textContent = clicks;
    status.textContent = `click listener đã chạy ${clicks} lần.`;
  });
  image.addEventListener("mouseover", () => {
    image.style.filter = "grayscale(1)";
    status.textContent = "mouseover: ảnh chuyển sang thang xám.";
  });
  image.addEventListener("mouseout", () => {
    image.style.filter = "grayscale(0)";
    status.textContent = "mouseout: ảnh trở lại màu ban đầu.";
  });

  toggle.addEventListener("click", () => {
    window.clearTimeout(timer);
    if (visible) {
      paragraph.classList.add("is-hiding");
      paragraph.setAttribute("aria-hidden", "true");
      toggle.textContent = "Đang ẩn…";
      timer = window.setTimeout(() => {
        paragraph.hidden = true;
        paragraph.classList.remove("is-hiding");
        toggle.textContent = "Hiện đoạn văn";
        visible = false;
        status.textContent = "Đoạn văn đã được ẩn sau khi chuyển động kết thúc.";
      }, 300);
      return;
    }
    paragraph.hidden = false;
    paragraph.classList.add("is-hiding");
    paragraph.setAttribute("aria-hidden", "true");
    toggle.textContent = "Đang hiện…";
    timer = window.setTimeout(() => {
      paragraph.classList.remove("is-hiding");
      paragraph.setAttribute("aria-hidden", "false");
      toggle.textContent = "Ẩn đoạn văn";
      visible = true;
      status.textContent = "Đoạn văn đã hiện trở lại.";
    }, 20);
  });
})();
