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
  if(!window.lxqc_user || !window.lxqc_user.id) {
    location.href = "login.html?redirect=" + location.href;
    return false;
  } 
  var ticketId = window.urlParams.id;
  var memberId = window.lxqc_user.id;
  var num = $('.Amount').val();
  var name = $('#name').val();
  var mobile = $('#mobile').val();
  var data = '2017/11/24';
  var readProtocol = $('#xy').prop('checked');
  if (!mobile || !/^0?(1)[0-9]{10}$/.test(mobile)) {
    alert('亲，手机号码格式错误！')
    return false
  }
  var data= {
    ticketId: ticketId,
    memberId: memberId,
    num: num,
    name: name,
    mobile: mobile,
    data: data
  };
  $.ajax({
    url: window.api + "ticket/addOrder",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function (res) {
      console.log(res,'ress')
      if(res.code == 200) {
        
      } else {
        alert(res.msg)
      }
    }
  });
}
