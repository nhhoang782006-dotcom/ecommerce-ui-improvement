$(function () {
  const $box = $("#motion-box");
  function reset() { $box.stop(true,true).css({left:"1.2rem",top:"1.5rem",opacity:1,height:"6rem"}); }
  $("#run-animation").on("click",function(){
    reset();
    $("#animation-result").text("Đang chạy hai hoạt ảnh nối tiếp…");
    $box.animate({left:"192px",opacity:.55,height:"4rem"},700)
      .animate({top:"5rem",opacity:1,height:"6rem"},700,function(){
        $("#animation-result").text("Hoàn tất: nhịp hai bắt đầu sau khi nhịp một kết thúc.");
      });
  });
  $("#reset-animation").on("click",function(){reset();$("#animation-result").text("Khối đã trở về vị trí đầu.");});
});
