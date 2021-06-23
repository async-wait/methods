/**
 * 实现一个bind函数
 */
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    return TypeError('error');
  }

  const _this = this;
  const args = [...arguments].slice(1);
  return function Fn () {
    if (this instanceof Fn) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  }
}