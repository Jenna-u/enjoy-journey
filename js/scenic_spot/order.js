/* 景点详情 */
if(window.urlParams.id) {
  $.ajax({
    type: "GET",
    url: window.api + "/ticket/ticketDetail?id=" + window.urlParams.id + '&memberId=' + (window.urlParams.memberId || ''),
    success: function(res){
      if(res.code == 200) {
        var data = res.data;
        var imgList = res.data.img.split(',');
        var template = Handlebars.compile($('#h_sceic_details_wrap').html());
        var templateBanner = Handlebars.compile($('#h_jd_banner').html());
        var html = template(data);
        var htmlBanner = templateBanner({ imgList: imgList, cdn: window.cdn || '' })
        $('#sceic_details_wrap').html(html);
        $('#jd_banner').html(htmlBanner);

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