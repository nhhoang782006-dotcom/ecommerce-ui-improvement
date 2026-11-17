(() => {
  const root = document.querySelector("#demo-9-3");
  const input = root.querySelector("#task-input");
  const list = root.querySelector("#task-list");
  const status = root.querySelector("#task-status");
  const intro = root.querySelector("#list-intro");

  const updateParagraph = () => {
    const paragraph = document.createElement("p");
    paragraph.className = "list-note";
    paragraph.appendChild(document.createTextNode(`Danh sách có ${list.children.length} mục.`));
    intro.replaceWith(paragraph);
  };

  root.querySelector("#add-task").addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) {
      status.textContent = "Hãy nhập nội dung trước khi thêm.";
      input.focus();
      return;
    }
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(value));
    list.appendChild(item);
    input.value = "";
    input.focus();
    status.textContent = `Đã thêm mục. Danh sách hiện có ${list.children.length} mục.`;
    const note = root.querySelector(".list-note");
    if (note) note.textContent = `Danh sách có ${list.children.length} mục.`;
    else updateParagraph();
  });

  root.querySelector("#remove-task").addEventListener("click", () => {
    if (!list.lastElementChild) {
      status.textContent = "Danh sách đã trống, không còn mục để gỡ.";
      return;
    }
    list.removeChild(list.lastElementChild);
    status.textContent = `Đã gỡ mục cuối. Còn ${list.children.length} mục.`;
    const note = root.querySelector(".list-note");
    if (note) note.textContent = `Danh sách có ${list.children.length} mục.`;
    else updateParagraph();
  });
})();
