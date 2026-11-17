(() => {
  const root = document.querySelector("#demo-9-7");
  const fields = root.querySelectorAll("input[type='text'], input[type='password']");
  const status = root.querySelector("#focus-status");

  fields.forEach((field) => {
    field.addEventListener("focus", () => {
      field.style.backgroundColor = "#fff2a8";
      status.textContent = `focus: #${field.id} đang được chọn.`;
    });
    field.addEventListener("blur", () => {
      field.style.backgroundColor = "#ffffff";
      status.textContent = `blur: #${field.id} đã mất tiêu điểm.`;
    });
  });
})();
