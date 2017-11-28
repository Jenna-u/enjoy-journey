/* 景点列表数据请求 */

$.ajax({
  type: "GET",
  url: window.api + "ticket/attractionsList",
  success: function(res){
    if(res.code == 200) {
      var data = res.data;

      var source = $("#h_scenic_spot").html();
      var template = Handlebars.compile(source);
      var html = template({ data: data, cdn: window.cdn || '' });
      $('#index').html(html);
    }
  }
});