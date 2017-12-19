/* 获取首页数据 */
// 获取轮播图和资讯列表
$.ajax({
  type: "GET",
  url: window.api + "pub/getIndex",
  success: function(res){
    if(res.code == 200) {
      var adList = res.data.list.adList;
      var newsList = res.data.list.newsList;
    
      var hSliderTemplate = Handlebars.compile($('#h_slider').html());
      var hNewsTemplate = Handlebars.compile($('#h_news').html());
      $('#index_slider').html(hSliderTemplate({ adList: adList, cdn: window.cdn || '' }));
      $('#index_news').html(hNewsTemplate({ newsList: newsList }));
      $(function () {
        $('.am-slider').flexslider({
          controlNav: true,               // Boolean: 是否创建控制点
          directionNav: false,             // Boolean: 是否创建上/下一个按钮（previous/next）
          touch: true,                    // Boolean: 允许触摸屏触摸滑动滑块
        });
      });
    }
  }
});

// 获取线路图列表
// type -1全部 2周边旅游 3国内旅游 4境外旅游
function getTours (type, className) {
  if(!$('#h_' + className).html()){
    return false;
  }
  $.ajax({
    type: "GET",
    url:  window.api + "pub/getToursIndex?type=" + type,
    success: function(res){
      if(res.code == 200) {
        var list = res.data.list;
        if($('#h_' + className).html()) {
          var template = Handlebars.compile($('#h_' + className).html());
          for (var i = 0; i < list.length; i++) {
            list[i]['cover'] = list[i]['cover'].split(',')[0];
          }
          $('#' + className).html(template({ list: list, cdn: window.cdn || '' }));
        }
      }
    }
  });
}

getTours('-1', 'tab1');

// 获取用户定位信息，优先级最高是链接上的origin参数
if (window.urlParams.origin && window.urlParams.origin != 'undefined') {
  window.xianluorigin = window.urlParams.origin;
  var map = new BMap.Map("allmap");
  $('#searchCity').html(window.urlParams.origin + '<i></i>');
} else {
  var map = new BMap.Map("allmap");
  var myCity = new BMap.LocalCity();
  myCity.get(function(result) {
      var cityName = result.name;
      cityName = cityName && cityName.substr(0,result.name.Length-1) || '北京';
      window.xianluorigin = cityName;
      $('#searchCity').html(cityName + '<i></i>')
  });
}

var redirect = encodeURIComponent(location.href);
function goXianlu(theme) {
  var destination = $('#destination').val() || '';
  var theme = theme || '';
  location.href = "xianluList.html?origin="+ window.xianluorigin +"&destination=" + destination + "&theme=" + theme + "&redirect=" + redirect;
}
function selectCity() {
  location.href = "searchCity.html?origin=" + window.xianluorigin + "&redirect=" + redirect;
}