// Linear search with sentinel
function sentinelLinearSearch(arr, target) {
    const n = arr.length;
    
    // Save the last element
    const last = arr[n - 1];
    
    // Place the target as sentinel at the end
    arr[n - 1] = target;
    
    let i = 0;
    // The loop will always terminate because target is in the array
    while (arr[i] !== target) {
      i++;
    }
    
    // Restore the original last element
    arr[n - 1] = last;
    
    // Check if we found the target or just the sentinel
    if (i < n - 1 || last === target) {
      return i;
    }
    return -1;
}

// Test cases
const numbers = [10, 24, 56, 7, 89, 42, 13];
console.log(sentinelLinearSearch(numbers, 89)); // 4
console.log(sentinelLinearSearch(numbers, 100)); // -1