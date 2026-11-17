function subtotal(price, quantity) {
  return price * quantity;
}
subtotal.description = "Tính thành tiền trước thuế";

function makeInvoice(price, quantity, taxRate) {
  function calculateTax(amount) {
    return amount * taxRate;
  }
  const base = subtotal(price, quantity);
  const tax = calculateTax(base);
  return { base: base, tax: tax, total: base + tax };
}

var taxAsNamedExpression = function calculateTaxByName(amount, rate) {
  return amount * rate;
};
var taxAsAnonymousFunction = function (amount, rate) {
  return amount * rate;
};

function addTaxWithCallback(amount, rate, taxCalculator) {
  return amount + taxCalculator(amount, rate);
}

function renderInvoice() {
  const invoice = makeInvoice(15, 2, 0.05);
  const callbackTotal = addTaxWithCallback(15 * 2, 0.05, taxAsAnonymousFunction);
  document.querySelector("#function-output").innerHTML = "<ul>" +
    "<li><code>typeof subtotal</code> → " + typeof subtotal + "; <code>subtotal.name</code> → “" + subtotal.name + "”; <code>subtotal.length</code> → " + subtotal.length + "</li>" +
    "<li>" + subtotal.description + ": 15 × 2 = <strong>" + invoice.base.toFixed(2) + "</strong></li>" +
    "<li>Hàm lồng nhau tính thuế 5%: <strong>" + invoice.tax.toFixed(2) + "</strong>; tổng: <strong>" + invoice.total.toFixed(2) + "</strong></li>" +
    "<li>Biểu thức hàm có tên: <code>" + taxAsNamedExpression.name + "</code>; biểu thức ẩn danh: <code>" + (taxAsAnonymousFunction.name || "(không có tên khai báo)") + "</code></li>" +
    "<li>Hàm ẩn danh truyền làm callback: 15 × 2 + 5% = <strong>" + callbackTotal.toFixed(2) + "</strong></li>" +
    "</ul>";
}

renderInvoice();
document.querySelector("#calculate-again").addEventListener("click", renderInvoice);
