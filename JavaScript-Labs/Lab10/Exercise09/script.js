$(function () {
  const apiUrl = "https://countriesnow.space/api/v0.1/countries/cities/q";
  $.ajaxSetup({ timeout: 15000 });
  function valid(response) {
    return response && response.error === false && Array.isArray(response.data) &&
      response.data.every(function(name){return typeof name==="string";});
  }
  $("#load-cities").on("click",function(){
    const $button=$(this),$status=$("#city-status"),$list=$("#city-list");
    $button.prop("disabled",true);$list.empty();$status.text("Đang tải dữ liệu thành phố…");
    $.get(apiUrl,{country:"Vietnam"},null,"json")
      .done(function(response){
        if(!valid(response)){$status.text("API trả về dữ liệu không đúng định dạng mong đợi.");return;}
        const cities=response.data.map(function(name){return {name:name};});
        const fragment=document.createDocumentFragment();
        cities.slice(0,18).forEach(function(city){
          const item=document.createElement("li");item.textContent=city.name;fragment.appendChild(item);
        });
        $list[0].appendChild(fragment);
        $status.text(cities.length === 0
          ? "API trả về danh sách rỗng cho yêu cầu này."
          : "Đã nhận "+cities.length+" thành phố. Đang hiển thị 18 mục đầu tiên.");
      })
      .fail(function(xhr,status){
        $status.text(status==="timeout"?"Yêu cầu đã hết thời gian chờ. Hãy kiểm tra mạng rồi thử lại.":"Không tải được dữ liệu. Kiểm tra kết nối hoặc thử lại sau.");
      })
      .always(function(){$button.prop("disabled",false);});
  });
});
