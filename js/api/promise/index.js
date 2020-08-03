const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    return reject(new TypeError('chaining cycle detected for promise #<Promise>'));
  }
  let called;
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        reject(r);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      if (this.status !== PENDING) return;
      this.status = FULFILLED;
      this.value = value;

      while (this.onFulfilledCbs.length) {
        const cb = this.onFulfilledCbs.shift();
        cb(value);
      }
    }

    const reject = (value) => {
      if (this.status !== PENDING) return;
      this.status = REJECTED;
      this.reason = value;
      while (this.onRejectedCbs.length) {
        const cb = this.onRejectedCbs.shift();
        cb(value);
      }
    }
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    const _this = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};

    let myPromise = new MyPromise((resolve, reject) => {      
      if (_this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(_this.value);
            resolvePromise(myPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (_this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(_this.reason);
            resolvePromise(myPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (_this.status === PENDING) {
        _this.onFulfilledCbs.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(_this.value);
              resolvePromise(myPromise, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0);
        });
        _this.onRejectedCbs.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(_this.reason);
              resolvePromise(myPromise, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0);
        });
      }
    });
    return myPromise;
  }
  catch(onRejected) {
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
  static resolve(value) {

  }
  static reject(value) {

  }
  static all(cbs) {

  }
  static race(cbs) {

  }
}