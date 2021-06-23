/**
 * 实现call函数
 */

Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    return TypeError('error');
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
}
