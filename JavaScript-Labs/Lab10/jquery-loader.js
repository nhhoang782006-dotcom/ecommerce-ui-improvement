"use strict";

const exerciseScript = document.currentScript.dataset.exerciseScript || "script.js";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.append(script);
  });
}

loadScript("https://code.jquery.com/jquery-3.7.1.min.js")
  .then(() => {
    window.jQueryLoadSource = "CDN";
  })
  .catch(() => loadScript("../../assets/vendor/jquery-3.7.1.min.js").then(() => {
    window.jQueryLoadSource = "bản cục bộ";
  }))
  .then(() => loadScript(exerciseScript))
  .catch((error) => {
    const notice = document.createElement("p");
    notice.className = "lab10-output";
    notice.setAttribute("role", "alert");
    notice.textContent = `Không tải được jQuery hoặc mã bài tập: ${error.message}`;
    document.querySelector("main")?.prepend(notice);
  });
