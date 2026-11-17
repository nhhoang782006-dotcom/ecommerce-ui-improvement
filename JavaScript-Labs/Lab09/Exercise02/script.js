(() => {
  const root = document.querySelector("#demo-9-2");
  const list = root.querySelector("#node-list");
  const output = root.querySelector("#node-readout");
  const nodeNames = { 1: "ELEMENT_NODE", 3: "TEXT_NODE", 8: "COMMENT_NODE" };

  root.querySelector("#walk-nodes").addEventListener("click", () => {
    output.replaceChildren();
    const first = list.firstChild;
    const next = first.nextSibling;
    const summary = document.createElement("p");
    summary.textContent = `firstChild: ${nodeNames[first.nodeType]} · firstChild.nextSibling: ${nodeNames[next.nodeType]} · parentNode là #node-list: ${next.parentNode === list}`;
    output.appendChild(summary);
    Array.from(list.childNodes).forEach((node, index) => {
      if (node.nodeType === Node.ELEMENT_NODE) node.classList.add("is-non-text");
      const row = document.createElement("p");
      row.className = "node-row";
      const kind = document.createElement("strong");
      kind.textContent = `nodeType ${node.nodeType} · ${nodeNames[node.nodeType] || node.nodeName}`;
      if (node.nodeType !== Node.TEXT_NODE) kind.classList.add("non-text-label");
      const value = document.createElement("span");
      value.textContent = node.textContent.trim() || "(khoảng trắng / xuống dòng)";
      row.append(`${index + 1}. `, kind, " — ", value);
      output.appendChild(row);
    });
  });
})();
