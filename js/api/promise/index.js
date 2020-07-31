'use strict';

class MyPromise {
  PENDING = 'pending';
  FULFILLED = 'fulfilled';
  REJECTED = 'rejected';

  constructor(executor) {
    this.status = PENDING
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    const resolve = (val) => {
      if (this.status !== PENDING) return;
      this.status = FULFILLED;

      while (this.onFulfilledCbs.length) {
        const cb = this.onFulfilledCbs.shift();
        cb(val);
      }
    }

    const reject = (val) => {
      if (this.status !== PENDING) return;
      this.status = REJECTED;

      while (this.onRejectedCbs.length) {
        const cb = this.onRejectedCbs.shift();
        cb(val);
      }
    }
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(fulfilledCb, rejectedCb) {

  }
}