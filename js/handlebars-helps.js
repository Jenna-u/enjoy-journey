// 一个比较参数是否等于某值的方法
if(Handlebars) {
  Handlebars.registerHelper("compare",function(v1, v2, opts){
    if(v1 == v2)
      return opts.fn(this);
    else
      return opts.inverse(this);
  });
}