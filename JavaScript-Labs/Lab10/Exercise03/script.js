$(function () {
  function clearMarks() {
    $("#selector-result").empty();
    $("#menu-list li").removeClass("is-selected");
    $('input[type="password"]').removeClass("lab10-highlight");
  }
  $("#select-password").on("click", function () {
    clearMarks();
    $('input[type="password"]').addClass("lab10-highlight").trigger("focus");
    $("#selector-result").text("Đã chọn trường mật khẩu bằng input[type=\"password\"]. Giá trị được giữ kín.");
  });
  $("#select-second").on("click", function () {
    clearMarks();
    $("#menu-list li:nth-child(2)").addClass("is-selected");
    $("#selector-result").text("Đã chọn mục thứ hai bằng :nth-child(2).");
  });
  $("#select-coffee").on("click", function () {
    clearMarks();
    const $matches = $("#menu-list li:contains('Cà phê')").addClass("is-selected");
    $("#selector-result").text("Tìm thấy " + $matches.length + " mục có chữ “Cà phê”.");
  });
});