const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = null;
        this.reason = null;

        this.onResolveCallbacks = [];
        this.onRejectCallbacks = [];

        let resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onResolveCallbacks.forEach(cb => cb());
            }
        }
        let reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectCallbacks.forEach(cb => cb());
            }
        }
        try {
            executor(resolve, reject);
        } catch(err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.state === PENDING) {
                this.onResolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
                this.onRejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }
    catch(fn) {
        return this.then(null, fn);
    }
}
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        resolve(value);
    });
}

function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('chaining cycle detected for promise'));
    }
    let called;
    if (x != null && (typeof x === 'object' || typeof x === 'funciton')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else {
                resolve(x);
            }
        } catch(err) {
            if (called) return;
            called = true;
            reject(err);
        }
    } else {
        resolve(x);
    }
}

module.exports = Promise;
