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
// const arr = [5, 2, 9, 1, 5, 6];
// console.log(quicksort(arr)); // Output: [1, 2, 5, 5, 6, 9]

// mergesort
function mergeSort(arr) {
    // base case: arrays of length 0 or 1 are sorted
    if (arr.length <= 1) return arr;

    // divide array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // recursively sort both halves
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];
    let i = 0; // Index for left array
    let j = 0; // Index for right array
    
    // Compare and merge elements in sorted order
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Add remaining elements from left, if any
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    // Add remaining elements from right, if any
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}

// Example usage
// const arr = [5, 2, 9, 1, 5, 6];
// console.log(mergeSort(arr)); // Output: [1, 2, 5, 5, 6, 9]

function hybridSort(arr) {
    function insertionSort(arr, low, high) {
        for (let i = low + 1; i <= high; i++) {
            const key = arr[i];
            let j = i - 1;
            while (j >= low && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    function partition(arr, low, high) {
        // Choose rightmost element as pivot
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Place pivot
        return i + 1;
    }

    function quicksortHybrid(arr, low, high) {
        // Use insertion sort for small subarrays (size <= 10)
        if (high - low <= 10) {
            insertionSort(arr, low, high);
        } else {
            // Use quicksort.Concurrent for larger subarrays
            if (low < high) {
                // Find partition index
                const pi = partition(arr, low, high);

                // Recursively sort elements before and after partition
                quicksortHybrid(arr, low, pi - 1);
                quicksortHybrid(arr, pi + 1, high);
            }
        }
    }

    // Call the hybrid quicksort
    quicksortHybrid(arr, 0, arr.length - 1);
    return arr;
}

// Example usage and test
// const testArrays = [
//     [64, 34, 25, 12, 22, 11, 90],
//     [1, 2, 3, 4, 5],
//     [5, 4, 3, 2, 1],
//     [],
//     [1],
//     [3, 3, 3, 3, 3]
// ];

// testArrays.forEach(arr => {
//     const original = [...arr];
//     const sortedArr = hybridSort([...arr]);
//     console.log(`Original: ${original}`);
//     console.log(`Sorted:   ${sortedArr}`);
//     console.log();
// });

function kWayMerge(arrays) {
    // Handle edge cases
    if (!arrays || arrays.length === 0) return [];
    if (arrays.length === 1) return arrays[0];

    // Min-heap implementation
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        insert(item) {
            this.heap.push(item);
            this.bubbleUp(this.heap.length - 1);
        }

        bubbleUp(index) {
            while (index > 0) {
                const parent = Math.floor((index - 1) / 2);
                if (this.heap[parent].value <= this.heap[index].value) break;
                [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
                index = parent;
            }
        }

        extractMin() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();

            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.bubbleDown(0);
            return min;
        }

        bubbleDown(index) {
            const length = this.heap.length;
            while (true) {
                let smallest = index;
                const left = 2 * index + 1;
                const right = 2 * index + 2;

                if (left < length && this.heap[left].value < this.heap[smallest].value) {
                    smallest = left;
                }
                if (right < length && this.heap[right].value < this.heap[smallest].value) {
                    smallest = right;
                }
                if (smallest === index) break;

                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            }
        }

        isEmpty() {
            return this.heap.length === 0;
        }
    }

    const result = [];
    const minHeap = new MinHeap();

    // Initialize the heap with the first element from each array
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length > 0) {
            minHeap.insert({
                value: arrays[i][0],
                arrayIndex: i,
                elementIndex: 0
            });
        }
    }

    // Merge arrays using the min-heap
    while (!minHeap.isEmpty()) {
        const { value, arrayIndex, elementIndex } = minHeap.extractMin();
        result.push(value);

        // If there are more elements in the same array, add the next one to the heap
        if (elementIndex + 1 < arrays[arrayIndex].length) {
            minHeap.insert({
                value: arrays[arrayIndex][elementIndex + 1],
                arrayIndex: arrayIndex,
                elementIndex: elementIndex + 1
            });
        }
    }

    return result;
}

// kWayMerge Test cases
const testCases = [
    [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ],
    [[]], // Empty array
    [[1, 2, 3]], // Single array
    [[], [1, 2], [3, 4]], // Some empty arrays
    [[1, 3, 5], [2, 4, 6], [7, 8, 9], [10, 11, 12]] // Four arrays
];

testCases.forEach((arrays, index) => {
    console.log(`Test case ${index + 1}:`);
    console.log(`Input: ${JSON.stringify(arrays)}`);
    console.log(`Output: ${kWayMerge(arrays)}`);
    console.log();
});