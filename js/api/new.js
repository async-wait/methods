/**
 * 实现new
 */

function myNew (Fn) {
  const newObj = Object.create(Fn.prototype);
  const params = [...arguments].slice(1);
  const result = Fn.apply(newObj, params);
  if (result && typeof result === 'object' || typeof result === 'function') {
    return result;
  }
  return newObj;
}
