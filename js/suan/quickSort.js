// function quickSort(arr, left, right) {
//   left = typeof left !== 'number' ? 0 : left;
//   right = typeof right !== 'number' ? arr.length - 1 : right;
//   if (left > right) {
//     return;
//   }
//   const partitionIndex = partition(arr, left, right);
//   quickSort(arr, left, partitionIndex - 1);
//   quickSort(arr, partitionIndex + 1, right);
//   return arr;
// }

// function partition(arr, left, right) {
//   const pivot = arr[right];
//   let partitionIndex = left;
//   debugger
//   for (let i = left; i < right; i++) {
//     if (arr[i] < pivot) {
//       swap(arr, partitionIndex, i);
//       partitionIndex++;
//     }
//   }
//   swap(arr, partitionIndex, right);
//   return partitionIndex;
// }

// function swap(arr, l, r) {
//   const temp = arr[l];
//   arr[l] = arr[r];
//   arr[r] = temp;
// }

function quickSort(nums, i, j) {
  let left = i;
  let right = j;
  let pivot = nums[i];
  if (i > j) {
    return;
  }
  while (i != j) {
    while (nums[j] >= pivot && i < j) {
      j--;
    }
    while (nums[i] <= pivot && i < j) {
      i++
    }
    if (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  [nums[left], nums[i]] = [nums[i], pivot]
  quickSort(nums, left, j - 1);
  quickSort(nums, i + 1, right);
  return nums;
}
