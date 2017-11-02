/* 景点数据请求 */

// $.ajax({
//   url: 'http://app.lxqcheng.com/ticket/attractionsList',
//   type: 'GET',
//   success: function (res) {
//     list = res.data
//   }
// })

$.getJSON('http://localhost:8888/js/json/scenic_spot.json', function (res) {
  var context = {
    data: res.data
  }
  var source = $("#scenic_spot_list").html();
  var template = Handlebars.compile(source);
  var html = template(context);

  $('#tab1').append(html)
})