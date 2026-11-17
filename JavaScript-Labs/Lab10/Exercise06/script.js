$(function () {
  const duration = 320;
  $("#fade-in").on("click", function () { $("#fade-box").stop(true,true).fadeIn(duration); $("#effect-result").text("fadeIn(): hiện khối bằng hiệu ứng mờ dần."); });
  $("#fade-out").on("click", function () { $("#fade-box").stop(true,true).fadeOut(duration); $("#effect-result").text("fadeOut(): ẩn khối bằng hiệu ứng mờ dần."); });
  $("#fade-toggle").on("click", function () { $("#fade-box").stop(true,true).fadeToggle(duration); $("#effect-result").text("fadeToggle(): đảo trạng thái hiển thị của khối fade."); });
  $("#slide-down").on("click", function () { $("#slide-panel").stop(true,true).slideDown(duration); $("#effect-result").text("slideDown(): mở nội dung theo chiều dọc."); });
  $("#slide-up").on("click", function () { $("#slide-panel").stop(true,true).slideUp(duration); $("#effect-result").text("slideUp(): thu gọn nội dung theo chiều dọc."); });
  $("#slide-toggle").on("click", function () { $("#slide-panel").stop(true,true).slideToggle(duration); $("#effect-result").text("slideToggle(): đảo trạng thái mở hoặc thu gọn."); });
});