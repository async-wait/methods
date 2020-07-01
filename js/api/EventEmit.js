class Event {
  constructor() {
    this.events = {};
  }
  on(name, fn) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(fn);
    return this;
  }
  emit(name, ...args) {
    if (!this.events[name]) {
      return this;
    }
    const fns = this.events[name];
    fns.forEach((fn) => fn.call(this, ...args));
    return this;
  }
  off(name, fn) {
    if (!this.events[name]) {
      return this;
    }
    if (!fn) {
      this.events[name] = null;
      return this;
    }
    const index = this.events[name].indexOf(name);
    this.events[name].splice(index, 1);
    return this;
  }
  once(name, fn) {
    if (!this.events[name]) {
      return;
    }
    const only = () => {
      fn.apply(this, arguments);
      this.off(name, fn);
    }
    this.on(name, only);
    return this;
  }
}
