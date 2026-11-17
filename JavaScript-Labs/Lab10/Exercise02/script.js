$(function () {
  $("#apply-book").on("click", function () {
    const name = $("#book-name").val().trim() || "Chưa đặt tên";
    const safeName = $("<span>").text(name).html();
    $("#book-title").html(safeName);
    $("#book-copy").html("<strong>" + safeName + "</strong> đã được cập nhật từ ô nhập.");
    $("#book-link").attr("title", "Liên kết đến thẻ: " + name);
    $("#book-card").css("border-color", "#60a99a").addClass("lab10-highlight");
    $("#book-result").text("Đã dùng val(), html(), attr(), css() và addClass() trên thẻ xem trước.");
  });
});