/**
 * 实现apply函数
 */

Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    return TypeError('error');
  }

  context = context || window;
  context.fn = this;
  let result = null;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}
