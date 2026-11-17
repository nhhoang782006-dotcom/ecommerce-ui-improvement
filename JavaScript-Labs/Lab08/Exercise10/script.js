function CartItem(name, price, quantity) {
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.total = this.price * this.quantity;
}

function renderObjects() {
  const notebook = new Object();
  notebook.name = "Sổ tay";
  notebook.price = 10;
  notebook.quantity = 3;

  const pen = { name: "Bút mực", price: 10, quantity: 4 };
  const firstOrder = new CartItem(notebook.name, notebook.price, notebook.quantity);
  const secondOrder = new CartItem(pen.name, pen.price, pen.quantity);
  const propertyName = "total";

  document.querySelector("#object-output").innerHTML = "<ul>" +
    "<li><code>new Object()</code> → " + notebook.name + "; <code>notebook.price</code> = " + notebook.price + "; <code>notebook[\"quantity\"]</code> = " + notebook.quantity + "</li>" +
    "<li>Object literal → " + pen.name + "; <code>pen.price</code> = " + pen.price + "; <code>pen.quantity</code> = " + pen.quantity + "</li>" +
    "<li>Hàm khởi tạo <code>CartItem</code> dùng <code>this.total</code>: " + firstOrder.name + " tổng <strong>" + firstOrder.total + "</strong></li>" +
    "<li>Dùng khóa động <code>secondOrder[propertyName]</code>: " + secondOrder.name + " tổng <strong>" + secondOrder[propertyName] + "</strong></li>" +
    "</ul>";
}

renderObjects();
document.querySelector("#rebuild-objects").addEventListener("click", renderObjects);
