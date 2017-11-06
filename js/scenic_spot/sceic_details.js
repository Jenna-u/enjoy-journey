// 景点详情

// $.ajax({
//   url: `http://app.lxqcheng.com/ticket/attractionsDetail?id=${id}`,
//   type: 'GET',
//   success: function (res) {
//     list = res.data
//   }
// })

$.getJSON('http://localhost:8888/js/json/scenic_details.json', function (res) {
  var context = res.data

  var source = $("#sceic_details").html();
  var template = Handlebars.compile(source);
  var html = template(context);
  $('#sceic_details_wrap').append(html)
})