/* to find the shortest paths from a starting node to all other nodes in a weighted graph */

// MinHeap class for a priority queue to always get the node with the smallest distance. Supports inserting nodes and extracting the minimum distance node efficiently
class MinHeap {
    constructor() {
        this.values = [];
    }

    insert({ node, distance }) {
        this.values.push({ node, distance });
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.distance >= parent.distance) break;
            this.values[idx] = parent;
            this.values[parentIdx] = element;
            idx = parentIdx;
        }
    }

    extractMin() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }

    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.distance < element.distance) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.distance < element.distance) ||
                    (swap !== null && rightChild.distance < leftChild.distance)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

// Dijkstra's Algorithm
function dijkstra(graph, start) {
    const distances = {};
    const previous = {};
    const heap = new MinHeap();

    // Initialize distances and previous
    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;

    // Add starting node to heap
    heap.insert({ node: start, distance: 0 });

    while (!heap.isEmpty()) {
        const { node: current, distance: currentDistance } = heap.extractMin();

        // Skip if we've found a longer path
        if (currentDistance > distances[current]) continue;

        // Check all neighbors of the current node
        for (let neighbor in graph[current]) {
            const weight = graph[current][neighbor];
            const distance = distances[current] + weight;

            // If we found a shorter path, update it
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = current;
                heap.insert({ node: neighbor, distance });
            }
        }
    }

    return { distances, previous };
}

// Example usage
const graph = {
    A: { B: 4, C: 2 },
    B: { A: 4, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2 },
    E: { C: 10, D: 2 }
};

const startNode = 'A';
const result = dijkstra(graph, startNode);

console.log('Shortest distances from node', startNode);
console.log(result.distances);
// Output: { A: 0, B: 3, C: 2, D: 8, E: 10 }

console.log('Previous nodes in shortest paths:');
console.log(result.previous);
// Output: { A: null, B: 'C', C: 'A', D: 'B', E: 'D' }