var count = 1;
var output = "Tệp js/script.js đã được nạp.";
var temperature = 14;

const inspectOutput = document.querySelector("#inspect-result");
const errorOutput = document.querySelector("#error-result");

function inspectValues() {
  inspectOutput.textContent = "count = " + count + " · output = “" + output + "” · temperature = " + temperature + "°C";
}

inspectValues();

document.querySelector("#show-log").addEventListener("click", function () {
  console.log("count:", count, "output:", output, "temperature:", temperature);
  console.warn("Đây là cảnh báo minh họa; không có lỗi nào xảy ra.");
  errorOutput.textContent = "Đã ghi console.log() và console.warn(). Mở DevTools → Console để xem.";
});

document.querySelector("#show-error").addEventListener("click", function () {
  try {
    errorOutput.textContent = "Nhiệt độ: " + temprature;
  } catch (error) {
    console.error("Lỗi đánh máy được bắt an toàn:", error);
    errorOutput.textContent = "Đã bắt " + error.name + " do dùng nhầm “temprature”. Trang vẫn hoạt động; xem chi tiết trong Console.";
  }
});

document.querySelector("#show-fixed").addEventListener("click", function () {
  errorOutput.textContent = "Đã sửa tên biến: temperature = " + temperature + "°C.";
  console.log("Đã sửa lỗi tên biến; temperature:", temperature);
});
