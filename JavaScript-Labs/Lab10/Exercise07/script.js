$(function () {
  const $gallery = $("#photo-gallery"), $preview = $("#photo-preview");
  function showPreview(event) {
    const $thumb = $(event.target).closest(".lab10-thumb");
    if (!$thumb.length) return;
    $(".lab10-thumb").removeClass("is-active");
    $thumb.addClass("is-active");
    $("#preview-image").attr("src", $thumb.attr("data-image")).attr("alt", $thumb.attr("data-caption"));
    $("#preview-caption").text($thumb.attr("data-caption"));
    $("#preview-status").text("Đang xem: " + $thumb.attr("data-caption"));
    $preview.stop(true,true).fadeIn(120);
    if (event.clientX) movePreview(event);
    else {
      const rect = $gallery[0].getBoundingClientRect();
      $preview.css({left:Math.max(8,rect.width-$preview.outerWidth()-12),top:12});
    }
  }
  function movePreview(event) {
    if (!$preview.is(":visible")) return;
    const rect = $gallery[0].getBoundingClientRect();
    const left = Math.max(8,Math.min(event.clientX-rect.left+16,rect.width-$preview.outerWidth()-8));
    const top = Math.max(8,Math.min(event.clientY-rect.top+16,rect.height-$preview.outerHeight()-8));
    $preview.css({left:left,top:top});
  }
  function hidePreview() { $preview.stop(true,true).fadeOut(100); $(".lab10-thumb").removeClass("is-active"); }
  $gallery.on("mouseenter focusin click",".lab10-thumb",showPreview);
  $gallery.on("mousemove",movePreview).on("mouseleave",hidePreview);
  $gallery.on("focusout",function(event){if(!$.contains(this,event.relatedTarget))hidePreview();});
});