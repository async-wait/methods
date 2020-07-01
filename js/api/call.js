Function.prototype.myCall = function (context) {
  var context = context || window;
  var args = [...arguments].slice(1);
  console.log(context);
  context.fn = this;
  const result = context.fn(args);
  
  delete context.fn;

  return result;
}
