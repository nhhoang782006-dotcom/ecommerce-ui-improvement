$(function () {
  const apiUrl="https://countriesnow.space/api/v0.1/countries/cities/q";
  let activeRequest=null,canRetry=false;
  function isValid(response){
    return response&&response.error===false&&Array.isArray(response.data)&&
      response.data.every(function(name){return typeof name==="string";});
  }
  function showCities(names){
    const $list=$("#request-city-list").empty(),fragment=document.createDocumentFragment();
    names.slice(0,18).forEach(function(name){
      const item=document.createElement("li");item.textContent=name;fragment.appendChild(item);
    });
    $list[0].appendChild(fragment);
  }
  function sendRequest(){
    if(activeRequest)return;
    canRetry=false;$("#request-city-list").empty();
    $("#request-status").text("Đang gửi yêu cầu đến CountriesNow…");
    $("#request-state").text("Đang tải").attr("data-state","loading");
    $("#request-loading").prop("hidden",false);
    $("#request-cities,#retry-cities").prop("disabled",true);$("#retry-cities").prop("hidden",true);
    activeRequest=$.ajax({url:apiUrl,method:"GET",data:{country:"Vietnam"},dataType:"json",timeout:15000})
      .done(function(response){
        if(!isValid(response)){
          canRetry=true;$("#request-state").text("Dữ liệu lỗi").attr("data-state","invalid");
          $("#request-status").text("Phản hồi không đúng định dạng mong đợi (error:false, data:mảng chuỗi).");return;
        }
        showCities(response.data);
        $("#request-state").text(response.data.length === 0 ? "Danh sách rỗng" : "Thành công")
          .attr("data-state","success");
        $("#request-status").text(response.data.length === 0
          ? "API phản hồi thành công nhưng danh sách thành phố đang rỗng."
          : "Đã nhận "+response.data.length+" thành phố; hiển thị 18 mục đầu tiên.");
      })
      .fail(function(xhr,textStatus){
        canRetry=true;
        const message=textStatus==="timeout"?"Yêu cầu quá 15 giây và đã bị hủy. Bạn có thể thử lại.":"Không kết nối được API. Hãy kiểm tra mạng rồi thử lại.";
        $("#request-state").text(textStatus==="timeout"?"Hết thời gian":"Có lỗi").attr("data-state",textStatus==="timeout"?"timeout":"error");
        $("#request-status").text(message);
      })
      .always(function(){
        activeRequest=null;$("#request-loading").prop("hidden",true);
        $("#request-cities,#retry-cities").prop("disabled",false);$("#retry-cities").prop("hidden",!canRetry);
      });
  }
  $("#request-cities,#retry-cities").on("click",sendRequest);
});