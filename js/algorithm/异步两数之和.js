/**
 * 异步两数之和
 */
function asyncAdd (a, b, cb) {
  setTimeout(() => {
    cb(null, a + b);
  }, 1000);
}

// 先实现两数之和
function sumT (a, b) {
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, res) => {
      if (!err) {
        resolve(res);
      }
      reject(err);
    });
  });
}

async function sum (...args) {
  if (args.length <= 0) return args[0];
  const result = [];

  // 数组两两相加
  for (let i = 0; i < args.length - 1; i += 2) {
    result.push(args[i], args[i + 1]);
  }

  // 判断数组长度是奇数还是偶数
  if (args.length % 2) result.push(args[args.length - 1]);
  // 递归
  return sum(...await Promise.all(result));
}
