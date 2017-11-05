/*旅游攻略*/

// 推荐

// $.ajax({
//   url: 'http://app.lxqcheng.com/travelsAPI/getMemberTravelsList?recommend=1',
//   type: 'GET',
//   success: function (res) {
//     list = res.data
//   }
// })

// 推荐
$.getJSON('http://localhost:8888/js/json/youji.json', function (res) {
  var context = {
    data: res.data.list
  }

  context.data.forEach(function (t) {
    var creatime = new Date(t.creatime)
    t.creatime = `${creatime.getFullYear()}-${creatime.getMonth() + 1}-${creatime.getDay()}`
  })

  var source = $("#recommend_list").html();
  var template = Handlebars.compile(source);
  var html = template(context);
  $('#tab1').append(html)
})


// 最新
$.getJSON('http://localhost:8888/js/json/youji_newest.json', function (res) {
  var newest_context = {
    list: res.data.list
  }

  newest_context.list.forEach(function (t) {
    var creatime = new Date(t.creatime)
    t.creatime = `${creatime.getFullYear()}-${creatime.getMonth() + 1}-${creatime.getDay()}`
  })

  var source = $("#newest_list").html();
  var template = Handlebars.compile(source);
  var html = template(newest_context);
  $('#tab2').append(html)
})




