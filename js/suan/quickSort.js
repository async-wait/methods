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
//   const mid = Math.floor((right + left) / 2);
//   const pivot = arr[mid];
//   let partitionIndex = left;
//   for (let i = left; i < right; i++) {
//     if (arr[i] > pivot) {
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

function quickSort(arr, i, j) {
  let left = i;
  let right = j;
  const mid = Math.floor((left + right) / 2);
  let pivot = arr[mid];
  if (i < j) {
    while (i < j) {
      while (arr[j] >= pivot && j > mid) {
        j--;
      }
      if (i < j) {
        arr[mid] = arr[j];
        arr[j] = pivot;
        pivot = arr[mid];
      }
      while (arr[i] <= pivot && i < mid) {
        i++;
      }
      if (i < j) {
        arr[mid] = arr[i];
        arr[i] = pivot;
        pivot = arr[mid];
      }
    }
    quickSort(arr, left, mid - 1);
    quickSort(arr, mid + 1, right);
    return arr;
  }
}
