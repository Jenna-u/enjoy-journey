// api地址
window.api = 'http://app.lxqcheng.com/';
// cdn路径
window.cdn = 'http://pic.lxqcheng.com/';

// 拿到当前YY-MM-DD
function getDateTime (time) {
  var creatime = new Date(time)
  return `${creatime.getFullYear()}-${creatime.getMonth() + 1}-${creatime.getDay()}`
}

// 拿到新闻需要的时间 MM-DD hh:mm

function getTime(time) {
  var myDate = new Date(time)
  return `${myDate.getMonth() + 1}-${myDate.getDay()} ${myDate.getHours()}:${myDate.getMinutes()}`
}

// 拿到YY-MM-DD hh：mm：ss
function getFullTime(time) {
  var myDate = new Date(time)
  return `${creatime.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDay()} ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
}


// 根据1，2，3 转化为相应一二三
var chnNumChar = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
};

// 给回退按钮加链接
function fallback () {
  $('#fallback').attr('href', window.urlParams.redirect || 'index.html');
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
