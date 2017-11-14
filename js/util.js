// api地址
window.api = 'http://app.lxqcheng.com/';
// cdn路径
window.cdn = 'http://pic.lxqcheng.com/';

function getDateTime (time) {
  var creatime = new Date(time)
  return `${creatime.getFullYear()}-${creatime.getMonth() + 1}-${creatime.getDay()}`
}