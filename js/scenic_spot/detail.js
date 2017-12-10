/* 景点详情 */
if(window.urlParams.id) {
  $.ajax({
    type: "GET",
    url: window.api + "ticket/attractionsDetail?id=" + window.urlParams.id + '&memberId=' + (window.urlParams.memberId || ''),
    success: function(res){
      if(res.code == 200) {
        var data = res.data;
        $.ajax({
          type: "GET",
          url: window.api + "ticket/ticketList?attractionsId=" + window.urlParams.id,
          success: function(res){
            if(res.code == 200) {
              var ticketData = res.data;
              data['ticketData'] = ticketData;
              var imgList = data.img.split(',');
              data['img'] = imgList;
              data['cdn'] = window.cdn || '';
              data['redirect'] = decodeURIComponent(window.urlParams.redirect || "jingdianmpList.html");
              var template = Handlebars.compile($('#h_sceic_details_wrap').html());
              var html = template(data);
              $('#index').html(html);
      
              $(function () {
                $('.am-slider').flexslider({
                  controlNav: true, // Boolean: 是否创建控制点
                  directionNav: false, // Boolean: 是否创建上/下一个按钮（previous/next）
                  touch: true, // Boolean: 允许触摸屏触摸滑动滑块
                });
              });
            }
          }
        });
      }
    }
  });
}