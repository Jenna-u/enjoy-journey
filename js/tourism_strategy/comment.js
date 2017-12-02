var id = window.urlParams.id
$.ajax(`${api}travelsAPI/getTravelsListBytravelsID?travelsId=${id}`)
.then(function(res) {
  if (res.ok !== 1) return;
  var list = res.data.list
  list = list.map(function(i) {
    i.creatime = getFullTime(i.creatime)
    return i
  })

  var source = $("#comment-list").html();
  var template = Handlebars.compile(source);
  var html = template(list);
  $('.comment-container').html(html)
})