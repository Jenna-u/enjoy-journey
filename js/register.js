// 给回退按钮加链接
fallback();

// 发短信接口
function sendCode () {
  var mobile = $('#mobile').val();
  if (!mobile || !/^0?(1)[0-9]{10}$/.test(mobile)) {
    alert('亲，手机号码格式错误！')
    return false
  }
  var data = {
    mobile: mobile
  }
  $.ajax({
    url: window.api + "codeAPI/mobileCode",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function (res) {
      console.log(res,'res')
    }
  });
};

//倒计时
function countDown(){
  var initStr = $('#sendCode').html();
  $('#sendCode').html('60秒之后重发');
  var time = 60;
  function timeDown() {
    if(time!=0){
      $('#sendCode').html((time--)+'秒之后重发');
      setTimeout(timeDown,1000);
    }else{
      $('#sendCode').html(initStr);
    }
  }
  timeDown();
}

// 注册接口
function register () {
  var mobile = $('#mobile').val();
  var mobileCode = $('#mobileCode').val();
  var password = $('#password').val();
  var confirmPassword = $('#confirmPassword').val();
  var readProtocol = $('#readProtocol').prop('checked');
  console.log(mobile,mobileCode,password,confirmPassword,readProtocol);
  if (!mobile || !/^0?(1)[0-9]{10}$/.test(mobile)) {
    alert('亲，手机号码格式错误！')
    return false
  }
  if (!mobileCode) {
    alert('亲，短信验证码不能为空！')
    return false
  }
  if (!password || !confirmPassword) {
    alert('亲，密码不能为空！')
    return false
  }
  if(password != confirmPassword) {
    alert('亲，确认密码和密码不相同！')
    return false
  }
  if(!readProtocol) {
    alert('亲，请先阅读协议！')
    return false
  }
  var data = {
    username: mobile,
    password: password,
    mobileCode: mobileCode,
    imei: '',
    rcode: '',
  }
  $.ajax({
    url: window.api + "memberAPI/getMemberRegister",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function (res) {
      console.log(res,'res')
    }
  });
};