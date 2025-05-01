// Bubble Sort Implementation
function bubbleSort(arr) {
    const length = arr.length;
    let swapped;
    
    do {
      swapped = false;
      for (let i = 0; i < length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          // Swap elements
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
    } while (swapped);
    
    return arr;
}
  
  // Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(unsortedArray)); // [11, 12, 22, 25, 34, 64, 90]