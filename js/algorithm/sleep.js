/**
 * 实现一个sleep函数，比如sleep(1000), 意味着等待1000毫秒，
 * 可从Promise、generator、async/await等方面实现
 */

function sleep (delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
