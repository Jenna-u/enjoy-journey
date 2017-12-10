// 给回退按钮加链接
fallback();

// 写用户cookie
function setCookie(value) {
	const exp = new Date();
	exp.setTime(exp.getTime() + 24*60*60*1000);
	document.cookie = `lxqc_user=${encodeURIComponent(JSON.stringify(value))};expires=${exp.toGMTString()};path=/`;
}

// 登录接口
function login () {
  var mobile = $('#mobile').val();
  var password = $('#password').val();
  if (!mobile) {
    alert('亲，用户名不能为空！')
    return false
  }
  if (!password) {
    alert('亲，密码不能为空！')
    return false
  }
  var data = {
    username: mobile,
    password: password,
  }
  $.ajax({
    url: window.api + "memberAPI/getMemberLogin",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function (res) {
      if(res.code == 200) {
        setCookie(res.data);
        location.href = decodeURIComponent(window.urlParams.redirect || "index.html");
      } else {
        alert(res.msg)
      }
    }
  });
};