const typeOutput = document.querySelector("#type-output");
const mathOutput = document.querySelector("#math-output");
const randomOutput = document.querySelector("#random-result");

function renderTypes() {
  const primitive = "JavaScript";
  const objectString = new String("JavaScript");
  typeOutput.innerHTML = "<ul>" +
    "<li><code>typeof primitive</code> → <strong>" + typeof primitive + "</strong></li>" +
    "<li><code>typeof new String(...)</code> → <strong>" + typeof objectString + "</strong></li>" +
    "<li><code>primitive == objectString</code> → <strong>" + (primitive == objectString) + "</strong></li>" +
    "<li><code>primitive === objectString</code> → <strong>" + (primitive === objectString) + "</strong></li>" +
    "</ul>";
}

function renderDate() {
  const now = new Date();
  mathOutput.innerHTML = "<ul>" +
    "<li><code>new Date()</code> → <time datetime=\"" + now.toISOString() + "\">" + now.toLocaleString("vi-VN") + "</time></li>" +
    "<li><code>Math.PI</code> → " + Math.PI + "</li>" +
    "<li><code>Math.sqrt(81)</code> → " + Math.sqrt(81) + "</li>" +
    "</ul>";
}

renderTypes();
renderDate();

document.querySelector("#random-button").addEventListener("click", function () {
  randomOutput.textContent = "Math.random() → " + Math.random().toFixed(6) + " (0 trở lên và nhỏ hơn 1).";
});

document.querySelector("#date-button").addEventListener("click", renderDate);
