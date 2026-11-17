$(function () {
  const $list = $("#visit-list");
  function newStep(method) { return $("<li>").text("Thêm bằng " + method + "()"); }
  $("[data-method]").on("click", function () {
    const method = $(this).data("method"), $item = newStep(method), $anchor = $("#anchor-step");
    if (method === "after") $anchor.after($item);
    if (method === "before") $anchor.before($item);
    if (method === "append") $list.append($item);
    if (method === "prepend") $list.prepend($item);
    if (method === "appendTo") $item.appendTo($list);
    if (method === "prependTo") $item.prependTo($list);
    if (method === "insertBefore") $item.insertBefore($anchor);
    $("#dom-result").text("Đã chèn một mục bằng " + method + "().");
  });
  $("#reset-list").on("click", function () {
    $list.html("<li>Đón khách tại sảnh</li><li id=\"anchor-step\">Bắt đầu hành trình</li><li>Kết thúc tại quầy thông tin</li>");
    $("#dom-result").empty();
  });
});