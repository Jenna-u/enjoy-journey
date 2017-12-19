/* 景点详情 */
if(window.urlParams.id) {
  $.ajax({
    type: "GET",
    url: window.api + "ticket/ticketDetail?id=" + window.urlParams.id + '&memberId=' + (window.urlParams.memberId || ''),
    success: function(res){
      if(res.code == 200) {
        var data = res.data;
        data['cdn'] = window.cdn || '';
        data.date =  getDateTime(new Date())
        var template = Handlebars.compile($('#h_scenic_spot').html());
        var html = template(data);
        $('#index').html(html);
        $(function(){
          $("#d").Spinner({cb: cb});
        });
        function cb() {
          var num = $('.Amount').val() * data.rackRate
          if (num) {
            $('.total-price').html(num)
          }
        }
      }
    }
  });
}



/* 提交景点订单 */
var redirect = encodeURIComponent(location.href);
function submitOrder () {
  if(!window.lxqc_user || !window.lxqc_user.id) {
    location.href = "login.html?redirect=" + redirect;
    return false;
  } 
  var ticketId = window.urlParams.id;
  var memberId = window.lxqc_user.id;
  var num = $('.Amount').val();
  var name = $('#name').val();
  var mobile = $('#mobile').val();
  var date = $('.travel-date').html().replace('-','/').replace('-','/');
  var newdate = new Date(date);
  newdate = Date.parse(newdate);
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
    date: newdate
  };
  $.ajax({
    url: window.api + "ticket/addOrder",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function (res) {
      if(res.code == 200) {
        var WIDout_trade_no = res.data.WIDout_trade_no;
        var WIDsubject = res.data.WIDsubject;
        var WIDtotal_fee = res.data.WIDtotal_fee;
        var redirect_url = encodeURIComponent(window.api + "enjoy-journey/myOrder.html");
        location.href = window.api + "alipay/alipayapi?WIDout_trade_no=" + WIDout_trade_no + "&WIDsubject="+ WIDsubject +"&WIDtotal_fee=" + WIDtotal_fee + "&redirect_url=" + redirect_url;
      } else {
        alert(res.msg)
      }
    }
  });
}
