function quickSort(arr, left, right) {
  left = typeof left !== 'number' ? 0 : left;
  right = typeof right !== 'number' ? arr.length - 1 : right;
  if (left > right) {
    return;
  }
  const partitionIndex = partition(arr, left, right);
  quickSort(arr, left, partitionIndex - 1);
  quickSort(arr, partitionIndex + 1, right);
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let partitionIndex = left;
  for (let i = left; i < right; i++) {
    if (arr[i] < pivot) {
      swap(arr, partitionIndex, i);
      partitionIndex++;
    }
  }
  swap(arr, partitionIndex, right);
  return partitionIndex;
}

function swap(arr, l, r) {
  const temp = arr[l];
  arr[l] = arr[r];
  arr[r] = temp;
}
