// Linear search implementation
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        return i; // Return the index where target is found
      }
    }
    return -1; // Return -1 if target is not found
  }
  
// Example usage
const numbers = [10, 24, 56, 7, 89, 42, 13];
console.log(linearSearch(numbers, 89)); // 4
console.log(linearSearch(numbers, 100)); // -1