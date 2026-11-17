(() => {
  const root = document.querySelector("#demo-9-8");
  const form = root.querySelector("#contact-form");
  const errors = root.querySelector("#form-errors");
  const success = root.querySelector("#form-success");
  const fields = [
    { input: root.querySelector("#contact-name"), label: "Họ và tên" },
    { input: root.querySelector("#contact-email"), label: "Email" }
  ];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errors.replaceChildren();
    success.textContent = "";
    const missing = fields.filter(({ input }) => !input.value.trim());
    if (missing.length) {
      const message = `Vui lòng bổ sung: ${missing.map(({ label }) => label).join(", ")}.`;
      window.alert(message);
      const heading = document.createElement("p");
      heading.textContent = "Bạn cần điền các trường sau:";
      const list = document.createElement("ul");
      missing.forEach(({ input, label }) => {
        const item = document.createElement("li");
        item.textContent = label;
        list.appendChild(item);
        input.setAttribute("aria-invalid", "true");
      });
      errors.append(heading, list);
      missing[0].input.focus();
      return;
    }
    const malformed = fields.filter(({ input }) => input.type === "email" && input.validity.typeMismatch);
    if (malformed.length) {
      const message = "Vui lòng nhập địa chỉ Email đúng định dạng.";
      window.alert(message);
      const heading = document.createElement("p");
      heading.textContent = "Thông tin Email cần được sửa:";
      const list = document.createElement("ul");
      malformed.forEach(({ input, label }) => {
        const item = document.createElement("li");
        item.textContent = `${label} chưa đúng định dạng (ví dụ: ten@example.com).`;
        list.appendChild(item);
        input.setAttribute("aria-invalid", "true");
      });
      errors.append(heading, list);
      malformed[0].input.focus();
      return;
    }
    fields.forEach(({ input }) => input.removeAttribute("aria-invalid"));
    errors.textContent = "";
    success.textContent = "Biểu mẫu hợp lệ. Trong bài học này, dữ liệu chưa được gửi lên máy chủ.";
  });

  fields.forEach(({ input }) => input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    errors.textContent = "";
    success.textContent = "";
  }));
})();
