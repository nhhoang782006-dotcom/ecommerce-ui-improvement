"use strict";

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
  .then(() => loadScript("script.js"))
  .catch((error) => {
    document.querySelector("[data-testid='10-1-version']").textContent = "Không tải được jQuery.";
    document.querySelector("[data-testid='10-1-source']").textContent = "Kiểm tra kết nối hoặc tệp cục bộ.";
    document.querySelector("[data-testid='10-1-cdn-status']").textContent = error.message;
  });
