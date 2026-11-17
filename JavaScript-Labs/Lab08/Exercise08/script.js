const outputBoxElement = document.querySelector("#output-box");
const scopeOutput = document.querySelector("#scope-output");
const scopeErrorOutput = document.querySelector("#scope-error-output");
var globalMessage = "Biến toàn cục: có thể đọc ở ngoài và bên trong hàm.";

function outputBox(message) {
  outputBoxElement.innerHTML = "<p>" + message + "</p>";
}

function returnBoxHTML(message) {
  return "<p>" + message + "</p>";
}

function numberedBox(num) {
  return "<fieldset><legend>Hộp số " + num + "</legend><p>Được tạo bằng tham số num trong vòng lặp.</p></fieldset>";
}

function renderOutputBoxes() {
  outputBox("Hàm outputBox đã ghi trực tiếp vào vùng kết quả.");
  outputBoxElement.insertAdjacentHTML("beforeend", returnBoxHTML("Hàm returnBoxHTML trả về một chuỗi HTML."));
  for (let num = 1; num <= 5; num += 1) {
    outputBoxElement.insertAdjacentHTML("beforeend", numberedBox(num));
  }
}

function describeScope() {
  var localMessage = "Biến cục bộ: chỉ dùng được bên trong hàm này.";
  return globalMessage + " " + localMessage;
}

renderOutputBoxes();
scopeOutput.textContent = describeScope();

document.querySelector("#run-output").addEventListener("click", renderOutputBoxes);
document.querySelector("#scope-error").addEventListener("click", function () {
  try {
    scopeErrorOutput.textContent = localMessage;
  } catch (error) {
    console.error("Lỗi phạm vi được bắt an toàn:", error);
    scopeErrorOutput.textContent = error.name + ": biến localMessage không tồn tại ở ngoài hàm describeScope().";
  }
});
