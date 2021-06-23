/**
 * 快速排序算法
 * 快排采用分治的策略
 * 选取一个基准点pivot，定义两个指针
 * 比pivot大的放在右边，比pivot小的放在左边
 */
function quickSort (nums, l, r) {
  if (l > r) return;
  // 定义双指针
  let i = l;
  let j = r;
  let pivot = nums[l];
  while (i != j) {
    while (i < j && nums[j] >= pivot) {
      j--;
    }
    while (i < j && nums[i] <= pivot) {
      i++;
    }
    if (i < j) { // 交换
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  debugger
  [nums[l], nums[i]] = [nums[i], pivot];
  quickSort(nums, l, i - 1);
  quickSort(nums, i + 1, r);
  return nums;
}