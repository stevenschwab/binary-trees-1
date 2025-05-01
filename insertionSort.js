// Insertion Sort Implementation
function insertionSort(arr) {
    const length = arr.length;
    
    for (let i = 1; i < length; i++) {
      // Store the current element
      let current = arr[i];
      let j = i - 1;
      
      // Move elements that are greater than current
      // to one position ahead of their current position
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
      }
      
      // Place current in its correct position
      arr[j + 1] = current;
    }
    
    return arr;
}
  
// Example usage
const unsortedArray = [12, 11, 13, 5, 6];
console.log(insertionSort(unsortedArray)); // [5, 6, 11, 12, 13]