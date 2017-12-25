var id = window.urlParams.id
var memberid = window.lxqc_user && window.lxqc_user.id || '';
$.ajax(`${api}travelsAPI/travelDetailForMobile?id=${id}&memberid=${memberid}`)
.then(function(res) {
  if (res.ok !== 1) return;
  var data = res.data
  data.cover = cdn + data.cover
  data.imagesThum = cdn + data.imagesThum
  data.photo = cdn + data.photo
  data.time = getDateTime(data.starttime)
  data.images = data.images.split(',').map(function(i){
    if (i) {
      return cdn + i
    }
  })
  data['browsingnumber'] = data.browsingnumber || 0;
  var source = $("#xiangq").html();
  var template = Handlebars.compile(source);
  var html = template(data);
  $('#index').html(html)
})