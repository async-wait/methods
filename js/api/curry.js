function curry() {
  const args = [...arguments].slice(0);
  var add = function () {
    args.push(...arguments);
    return add;
  }
  add.toString = function () {
    return args.reduce((a, b) => {
      return a + b;
    });
  }
  return add;
}
