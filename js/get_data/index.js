/* 获取首页数据 */
// 一个比较参数是否等于某值的方法
Handlebars.registerHelper("compare",function(v1, v2, opts){
  if(v1 == v2)
    return opts.fn(this);
  else
    return opts.inverse(this);
});
// 获取轮播图和资讯列表
$.ajax({
  type: "GET",
  url: "/pub/getIndex",
  success: function(res){
    if(res.code == 200) {
      var adList = res.data.list.adList;
      var newsList = res.data.list.newsList;
    
      var hSliderTemplate = Handlebars.compile($('#h_slider').html());
      var hNewsTemplate = Handlebars.compile($('#h_news').html());
      $('#index_slider').html(hSliderTemplate({ adList: adList }));
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
// $.getJSON('http://localhost:8888/js/json/pub_get_index.json', function (res) {
//   var adList = res.data.list.adList;
//   var newsList = res.data.list.newsList;

//   var hSliderTemplate = Handlebars.compile($('#h_slider').html());
//   var hNewsTemplate = Handlebars.compile($('#h_news').html());
//   $('#index_slider').html(hSliderTemplate({ adList: adList }));
//   $('#index_news').html(hNewsTemplate({ newsList: newsList }));
//   $(function () {
//     $('.am-slider').flexslider({
//       controlNav: true,               // Boolean: 是否创建控制点
//       directionNav: false,             // Boolean: 是否创建上/下一个按钮（previous/next）
//       touch: true,                    // Boolean: 允许触摸屏触摸滑动滑块
//     });
//   });
// })

// 获取线路图列表
// type -1全部 2周边旅游 3国内旅游 4境外旅游
function getTours (type, className) {
  $.ajax({
    type: "GET",
    url: "/pub/getToursIndex",
    success: function(res){
      if(res.code == 200) {
        var list = res.data.list;
        if($('#h_' + className).html()) {
          var template = Handlebars.compile($('#h_' + className).html());
          $('#' + className).html(template({ list: list }));
        }
      }
    }
  });
  // $.getJSON('http://localhost:8888/js/json/pub_get_tours_index.json', function (res) {
  //   var list = res.data.list;
  //   if($('#h_' + className).html()) {
  //     var template = Handlebars.compile($('#h_' + className).html());
  //     $('#' + className).html(template({ list: list }));
  //   }
  // })
}

getTours('-1', 'tab1');