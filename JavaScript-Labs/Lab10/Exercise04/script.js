$(function () {
  const $stage = $("#mouse-stage");
  function updateCoordinates(event) {
    const rect = $stage[0].getBoundingClientRect();
    $("#mouse-coordinates").text("X: " + Math.round(event.clientX - rect.left) +
      " px · Y: " + Math.round(event.clientY - rect.top) + " px");
  }
  function showGoodbye() {
    $("#goodbye-message").text("Hẹn gặp lại! Bạn có thể bắt đầu theo dõi lại bất cứ lúc nào.");
  }
  $stage.on("mousemove", updateCoordinates).on("mouseleave", showGoodbye);
  $("#stop-tracking").on("click", function () {
    $stage.off("mousemove", updateCoordinates);
    $("#tracking-state").text("Đã dừng").attr("data-active", "false");
  });
  $("#start-tracking").on("click", function () {
    $stage.off("mousemove", updateCoordinates).on("mousemove", updateCoordinates);
    $("#tracking-state").text("Đang theo dõi").attr("data-active", "true");
    $("#goodbye-message").empty();
  });
});