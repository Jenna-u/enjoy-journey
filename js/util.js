// api地址
window.api = 'http://app.lxqcheng.com/';
// cdn路径
window.cdn = 'http://pic.lxqcheng.com/';

// 拿到当前YY-MM-DD
function getDateTime (time) {
  var creatime = new Date(time)
  return `${creatime.getFullYear()}-${getMonth(creatime)}-${getDate(creatime)}`
}

function getMonth(creatime) {
  var month = creatime.getMonth() + 1
  return month >= 10 ? month : `0${month}`
}

function getDate(creatime) {
  var day = creatime.getDate()
  return day >= 10 ? day : `0${day}`
}

// 拿到新闻需要的时间 MM-DD hh:mm

function getTime(time) {
  var myDate = new Date(time)
  return `${getMonth(myDate)}-${getDate(myDate)} ${myDate.toString().split(" ")[4].split(':').slice(0,2).join(':')}`
}

// 拿到YY-MM-DD hh：mm：ss
function getFullTime(time) {
  var myDate = new Date(time)
  return `${myDate.getFullYear()}-${getMonth(myDate)}-${getDate(myDate)} ${myDate.toString().split(" ")[4]}`
}
// YY-MM-DD
function getFullDay(time) {
  var myDate = new Date(time)
  return `${myDate.getFullYear()}-${getMonth(myDate)}-${getDate(myDate)}`
}


// 根据1，2，3 转化为相应一二三
var chnNumChar = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
};

// 收藏的方法
function  collect(type, itemId, flag) {
  if (window.lxqc_user && window.lxqc_user.id) {
    var data = {
      memberId: window.lxqc_user.id,
      itemType: type,
      itemId: itemId,
      flag: flag == '1' ? '-1' : '1'
    }
    $.ajax({
      url: window.api + "pub/modifyCollect",
      type: "POST",
      dataType: 'json',
      data: data,
      success: function(res){
        if(res.code == 200) {
          location.reload();
        }
      }
    });
  } else {
    alert('请先登录')
  }
}

// 获取用户cookie
function getUserCookie() {
	var reg = new RegExp("(^| )lxqc_user=([^;]*)(;|$)");
	var arr = decodeURIComponent(document.cookie).match(reg);
	if(arr) {
		window.lxqc_user = unescape(arr[2]) ? JSON.parse(unescape(arr[2])) : null;
	} else {
		window.lxqc_user = null;
	}
}
getUserCookie();
console.log(window.lxqc_user,'window.lxqc_user')

// 获取url上的参数
function getParam() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

// 回退事件
$('.backBnt').click(function(){
  history.back()
})

window.urlParams = getParam();
console.log('window.urlParams', window.urlParams)
