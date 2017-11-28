/* 景点详情 */
if(window.urlParams.id) {
  $.ajax({
    type: "GET",
    url: window.api + "ticket/ticketDetail?id=" + window.urlParams.id + '&memberId=' + (window.urlParams.memberId || ''),
    success: function(res){
      if(res.code == 200) {
        var data = res.data;
        data['cdn'] = window.cdn || '';
        var template = Handlebars.compile($('#h_scenic_spot').html());
        var html = template(data);
        $('#index').html(html);
        $(function(){
          $("#a").Spinner({value:868, min:10, len:3, max:1000});
          $("#b").Spinner({value:99});
          $("#c").Spinner({value:66});
          $("#d").Spinner();
        });
      }
    }
  });
}

/* 提交景点订单 */
function submitOrder () {
  var ticketId = window.urlParams.id;
  var num = $('.Amount').val();
  var name = $('#name').val();
  var mobile = $('#mobile').val();
  var readProtocol = $('#xy').prop('checked');
}
