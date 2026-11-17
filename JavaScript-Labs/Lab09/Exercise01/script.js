(() => {
  const root = document.querySelector("#demo-9-1");
  const input = root.querySelector("#note-input");
  const card = root.querySelector("#selector-card");
  const output = root.querySelector("#selector-output");

  root.querySelector("#inspect-selectors").addEventListener("click", () => {
    const byId = document.getElementById("selector-card");
    const byTag = card.getElementsByTagName("p");
    const byClass = card.getElementsByClassName("card-copy");
    const one = card.querySelector(".card-copy");
    const all = card.querySelectorAll(".card-copy");
    output.textContent = [
      `getElementById: ${byId.id}`,
      `getElementsByTagName("p"): ${byTag.length} thẻ`,
      `getElementsByClassName("card-copy"): ${byClass.length} thẻ`,
      `querySelector: “${one.innerText}”`,
      `querySelectorAll: ${all.length} kết quả`
    ].join("\n");
  });

  root.querySelector("#update-content").addEventListener("click", () => {
    const firstCopy = card.querySelector(".card-copy");
    const escapedText = input.value.trim() || "Bạn chưa nhập ghi chú.";
    firstCopy.innerHTML = `<strong>Ghi chú:</strong> ${escapedText.replace(/[&<>"']/g, (char) => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;"}[char]))}`;
    card.setAttribute("title", "Ghi chú vừa được cập nhật");
    card.classList.toggle("is-highlighted");
    card.style.borderColor = card.classList.contains("is-highlighted") ? "#368c78" : "";
    output.innerText = `textarea.value: ${input.value || "(rỗng)"}\nĐã đổi innerHTML, title, classList và style.borderColor.`;
  });
})();
