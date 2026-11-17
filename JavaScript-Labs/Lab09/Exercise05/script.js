// Tệp này được nạp ở đầu trang để minh họa thứ tự chạy.
(() => {
  const capturedTooSoon = document.getElementById("loaded-target");

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest("#run-early-code");
    const demo = trigger?.closest('[data-exercise="9-5"]');
    if (!trigger || !demo) return;

    try {
      capturedTooSoon.textContent = "Đoạn mã này không thể chạy.";
    } catch (error) {
      const output = demo.querySelector("#load-output");
      output.textContent = `${error.name}: phần tử được tìm trước khi DOM tạo xong nên biến đang là null. Đây là lỗi được tái hiện có chủ ý.`;
    }
  });

  window.addEventListener("load", () => {
    const demo = document.querySelector('[data-exercise="9-5"]');
    const readyTarget = demo?.querySelector("#loaded-target");
    const output = demo?.querySelector("#load-output");
    if (!readyTarget || !output) return;
    readyTarget.textContent = "Đã tìm thấy sau window load";
    output.textContent = "window load đã chạy: truy vấn lại DOM sau khi trang tải xong thành công.";
  });
})();
