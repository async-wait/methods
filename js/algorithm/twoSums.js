/**
 * 两数之和
 * 
 */

function toSums (nums, target) {
  const arr = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (arr.has(target - nums[i])) {w
      return [arr.get(target - nums[i]), i];
    }
    arr.set(nums[i], i);
  }
}

const list = [1, 5, 9, 10];
console.log(list, 13);

