/* Master the Breadth-First Search algorithm 
for finding shortest paths in unweighted graphs. 
Learn how to systematically explore graph levels 
and track paths efficiently. */

// Exercise 1: Multi-Source BFS
// Implement a modified BFS that can start from multiple source nodes simultaneously.
/*
Requirements:
Accept array of starting nodes
Track distance from nearest source
Handle disconnected components
Return distances map
*/

function multiSourceBFS(graph, sources) {
    // Initialize distances map with infinity for all nodes
    const distances = new Map();
    for (const node in graph) {
        distances.set(parseInt(node), Infinity);
    }

    // Initialize queue for BFS
    const queue = [];

    // Set up sources
    for (const source of sources) {
        if (source in graph) {
            distances.set(source, 0);
            queue.push(source);
        }
    }

    // BFS
    while (queue.length > 0) {
        const current = queue.shift();

        // Process all the neighbors
        const neighbors = graph[current] || [];
        for (const neighbor of neighbors) {
            // If we found a shorter path to neighbor
            if (distances.get(neighbor) === Infinity) {
                distances.set(neighbor, distances.get(current) + 1);
                queue.push(neighbor);
            }
        }
    }

    // Remove unreachable nodes (still infinity)
    const result = new Map();
    for (const [node, dist] of distances) {
        if (dist !== Infinity) {
            result.set(node, dist);
        }
    }
    
    return result;
}

// Example usage:
function main() {
    // Example graph (undirected)
    const graph = {
        0: [1, 2],
        1: [0, 3],
        2: [0, 3],
        3: [1, 2, 4],
        4: [3],
        5: [6], // Disconnected component
        6: [5]
    };
    
    const sources = [0, 4];
    const result = multiSourceBFS(graph, sources);
    
    console.log("Distances from nearest source:");
    // Sort by node for consistent output
    const sortedNodes = Array.from(result.keys()).sort((a, b) => a - b);
    for (const node of sortedNodes) {
        console.log(`Node ${node}: ${result.get(node)}`);
    }
}

// Run example
main();