const statusOutput = document.querySelector("#js-status");
const checkAgainButton = document.querySelector("#check-again");

function showJavaScriptStatus() {
  statusOutput.textContent = "JavaScript đang bật. Script đã chạy và có thể cập nhật nội dung trang.";
}

showJavaScriptStatus();
checkAgainButton.addEventListener("click", showJavaScriptStatus);
