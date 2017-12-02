var id = window.urlParams.id
$.ajax(`${api}travelsAPI/travelDetailForMobile?id=${id}`)
.then(function(res) {
  if (res.ok !== 1) return;
  var data = res.data
  data.cover = cdn + data.cover
  data.imagesThum = cdn + data.imagesThum

  var source = $("#xiangq").html();
  var template = Handlebars.compile(source);
  var html = template(data);
  $('#index').html(html)
})