// Binary search implementation (recursive)
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    // Base case: element not found
    if (left > right) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    // Found the target
    if (arr[mid] === target) {
        return mid;
    }

    // Recursive cases
    if (arr[mid] > target) {
        return binarySearchRecursive(arr, target, left, mid - 1);
    } else {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
}