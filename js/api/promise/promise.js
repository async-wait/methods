const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

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
    let promise2 = null;
    
    if (_this.status === FULFILLED) {
      return promise2 = new MyPromise((resolve, reject) => {
        try {
          let x = onFulfilled(_this.value);
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          }
          resolve(x);
        } catch (error) {
          reject(error);
        }
      });
    }
    if (_this.status === REJECTED) {
      return promise2 = new MyPromise((resolve, reject) => {
        try {
          let x = onRejected(_this.reason);
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
    if (_this.status === PENDING) {
      return promise2 = new MyPromise((resolve, reject) => {
        _this.onFulfilledCbs.push(() => {
          try {
            let x = onFulfilled(_this.value);
            if (x instanceof MyPromise) {
              x.then(resolve, reject);
            }
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
        _this.onRejectedCbs.push(() => {
          try {
            let x = onRejected(_this.reason);
            if (x instanceof MyPromise) {
              x.then(resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      });
    }
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