/*旅游攻略*/

// 获取位置
var map = new BMap.Map("l-map"); 
// 创建地理编码实例     
var myGeo = new BMap.Geocoder(); 
function getAddress(longitude, latitude) {  
    // 根据坐标得到地址描述    
    myGeo.getLocation(new BMap.Point(longitude, latitude), function(result){      
        if (result){  
        console.log(result)    
        return result.addressComponents.city
        }      
    });
}  

// 推荐
$.ajax({
  url: `${api}travelsAPI/getMemberTravelsList?recommend=1`,
  type: 'GET',
  success: function (res) {
    if (res.ok === 1) {
      const list = res.data.list
      list.forEach(function (t) {
        t.creatime = getDateTime(t.creatime)
        t.cdn = cdn
        t.position = getAddress(t.longitude, t.latitude)
        // t.position = getAddress(116.404, 39.915)
      })

      setTimeout(function() {
        var source = $("#recommend_list").html();
        var template = Handlebars.compile(source);
        console.log(list)
        var html = template(list);
        $('#tab1').html(html)
      }, 200)
    }
  }
})

// 最新

$.ajax({
  url: `${api}travelsAPI/getMemberTravelsList`,
  type: 'GET',
  success: function (res) {
    if (res.ok === 1) {
      var list = res.data.list || []
      list.forEach(function (t) {
        t.creatime = getDateTime(t.creatime)
        t.cdn = cdn
        t.position = getAddress(t.longitude, t.latitude)
      })

      setTimeout(function() {
        var source = $("#newest_list").html();
        var template = Handlebars.compile(source);
        var html = template(list);
        $('#tab2').html(html)
      }, 0)
      
    }
  }
})
