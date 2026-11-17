$(function () {
  const version = $.fn.jquery;
  const source = window.jQueryLoadSource || "chưa xác định";
  $("#version-value").text(version);
  $("#source-value").text(source);
  $("#cdn-status").text(version === "3.7.1"
    ? "jQuery đã sẵn sàng. Các ví dụ dùng bản 3.7.1."
    : "Đã tải thư viện nhưng phiên bản không khớp.")
    .attr("data-version", version);
});