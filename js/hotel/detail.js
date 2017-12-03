var urlParams = getParam();
$.ajax(`${api}hotelAPI/getHotelByhotelID?hotelID=${urlParams.id}&startTime=${urlParams.startTime || ''}&endTime=${urlParams.endTime || ''}`)
.done(function(res) {
  if (res.ok !== 1) return;
  var data = res.data.list
  var items = data.hotelImg.split(',')
  var items = items.map(function(item) {
    return {
      src: cdn + item,
      w: 800,
      h: 1142
    }
  })
  data.imgLength = items.length;
  data.beStart = chnNumChar[data.beStart] + '星级酒店'
  data.cover = cdn + data.cover
  data.iconList = data.iconList.split(',').map(function(i) {
    return cdn + i
  })
  data.isHave.forEach(function(h) {
    h.houseTypeCover = cdn + h.houseTypeCover 
    h.link = `jiudianyd.html?hotelId=${data.hotelID}&name=${data.hotelName}&startTime=${urlParams.startTime}&endTime=${urlParams.endTime}&night=${urlParams.night}&net=${h.houseTypeNetWork}&food=${h.houseTypeFood}&bed=${h.houseTypeBed}&price=${h.houseTypeVipPrice}&id=${h.houseTypeID}`
  })
  data.isNot.forEach(function(n) {
    n.houseTypeCover = cdn + n.houseTypeCover 
    data.link = `jiudianyd.html?hotelId=${data.hotelID}&name=${data.hotelName}&startTime=${urlParams.startTime}&endTime=${urlParams.endTime}&night=${urlParams.night}&net=${n.houseTypeNetWork}&food=${n.houseTypeFood}&bed=${n.houseTypeBed}&price=${h.houseTypeVipPrice}&id=${h.houseTypeID}`    
  })

  var source = $("#hotel-detail").html();
  var template = Handlebars.compile(source);
  var html = template(data);

  $('#index').html(html)

  // 获取酒店地理位置
  var map = new BMap.Map("allmap");
  map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
  map.enableScrollWheelZoom(true);

  $('.get-pointer').click(function() {
    $('.hotel-name').html(data.hotelName)
    map.clearOverlays(); 
    var new_point = new BMap.Point(data.longitude, data.latitude);
    var marker = new BMap.Marker(new_point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    map.panTo(new_point);    
    $('.mask').addClass('show')
  })

  $('.map-goback').click(function() {
    $('.mask').removeClass('show')
  })

  // 酒店图片展示
  document.getElementById('photos').onclick = openPhotoSwipe(items);

  // 下拉选择框
  var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	};

  Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this);
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		}
  };

  var accordion = new Accordion($('#accordion'), false);
	$('.submenu li').click(function () {
		$(this).addClass('current').siblings('li').removeClass('current');
	});
 
})

// 酒店图片展示
function openPhotoSwipe(items) {
  return function () {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var options = {
      history: false,
      focus: false,
      showAnimationDuration: 0,
      hideAnimationDuration: 0
    };
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }
}