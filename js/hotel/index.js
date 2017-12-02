// // 获取位置
// var map = new BMap.Map("l-map"); 
// // 创建地理编码实例     
// var myGeo = new BMap.Geocoder();

// var current_longitude
// var current_latitude
// // 获取当前位置 目前不支持http访问
// navigator.geolocation.getCurrentPosition(function(res){
//   current_longitude = res.coords.longitude
//   current_latitude = res.coords.latitude
//   myGeo.getLocation(new BMap.Point(current_longitude, current_latitude), function(result){
//     if (result) {
//       var city = result.addressComponents.city;
//       $('#my-position').html(city)
//     }
//   })
// })