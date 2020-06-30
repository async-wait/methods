function create(constructor, ...args) {
  const instance = new Object();
  instance.__proto__ = constructor.prototype;
  const result = constructor.apply(instance, args);
  return typeof result === 'object' ? result : instance;
}