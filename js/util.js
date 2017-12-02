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

// 根据1，2，3 转化为相应一二三
var chnNumChar = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
};

// 一个比较参数是否等于某值的方法
if(Handlebars) {
  Handlebars.registerHelper("compare",function(v1, v2, opts){
    if(v1 == v2)
      return opts.fn(this);
    else
      return opts.inverse(this);
  });
}
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
