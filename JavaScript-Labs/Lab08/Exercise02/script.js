const embeddedAlertButton = document.querySelector("#embedded-alert");
const inlineAlertButton = document.querySelector("[data-testid='inline-alert']");
const alertStatus = document.querySelector("#alert-status");

embeddedAlertButton.addEventListener("click", function () {
  alert("Hello World!");
  alertStatus.textContent = "Hộp thoại được gọi từ trình xử lý trong script nhúng.";
});

inlineAlertButton.addEventListener("click", function () {
  alertStatus.textContent = "Hộp thoại được gọi từ thuộc tính onclick trong HTML.";
});
