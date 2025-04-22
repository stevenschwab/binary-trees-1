// quicksort: a divide and conquer sorting algorithm
function quicksort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // find pivot position
        const pivotIndex = partition(arr, low, high);
        // recursively sort left and right sub-arrays
        quicksort(arr, low, pivotIndex - 1);
        quicksort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[low]; // choose first element as pivot
    let i = low; // boundary for elements <= pivot
    for (let j = low + 1; j <= high; j++) {
        if (arr[j] <= pivot) {
            i++; // expand <= pivot region
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        }
    }
    [arr[low], arr[i]] = [arr[i], arr[low]]; // place pivot in final position
    return i; // return pivot index
}

// Example usage
const arr = [5, 2, 9, 1, 5, 6];
console.log(quicksort(arr)); // Output: [1, 2, 5, 5, 6, 9]