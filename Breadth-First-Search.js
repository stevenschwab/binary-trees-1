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
// main();

// Exercise 2: Path with Conditions
// Find shortest path that satisfies certain conditions (e.g., must pass through specific nodes).

function findPathThroughNode(graph, start, end, mustPass) {
    // Helper function to perform BFS and return parent map and distances
    function bfs(start, target) {
        const queue = [start];
        const distances = new Map([[start, 0]]);
        const parents = new Map([[start, null]]);

        while (queue.length > 0) {
            const current = queue.shift();
            const neighbors = graph[current] || [];

            for (const neighbor of neighbors) {
                if (!distances.has(neighbor)) {
                    distances.set(neighbor, distances.get(current) + 1);
                    parents.set(neighbor, current);
                    queue.push(neighbor);
                }
            }
            if (target && current === target) break;
        }

        return { parents, distances };
    }

    // Step 1: Find shortest path from start to mustPass
    const { parents: parentsToMustPass, distances: distToMustPass } = bfs(start, mustPass);
    
    // If mustPass or end is unreachable, return null
    if (!distToMustPass.has(mustPass)) return null;
    
    // Step 2: Find shortest path from mustPass to end
    const { parents: parentsToEnd, distances: distToEnd } = bfs(mustPass, end);
    
    if (!distToEnd.has(end)) return null;
    
    // Step 3: Reconstruct path from start to mustPass
    let path = [];
    let current = mustPass;
    while (current !== null) {
        path.unshift(current);
        current = parentsToMustPass.get(current);
    }
    
    // Step 4: Reconstruct path from mustPass to end (excluding mustPass)
    current = parentsToEnd.get(end);
    while (current !== mustPass) {
        path.push(current);
        current = parentsToEnd.get(current);
    }
    path.push(end);
    
    return path;
}

// Example usage:
function main() {
    const graph = {
        'A': ['B', 'C'],
        'B': ['A', 'D', 'E'],
        'C': ['A', 'F'],
        'D': ['B'],
        'E': ['B', 'F'],
        'F': ['C', 'E']
    };
    
    const result = findPathThroughNode(graph, 'A', 'F', 'E');
    console.log(result); // Output: ['A', 'B', 'E', 'F']
}

// Run example
// main();

function groupByLevels(graph, start) {
    // Initialize result object to store nodes by level
    const levels = {};
    
    // Initialize queue for BFS
    const queue = [start];
    
    // Initialize distances map and visited set
    const distances = new Map([[start, 0]]);
    const visited = new Set([start]);
    
    // BFS
    while (queue.length > 0) {
        const current = queue.shift();
        const currentLevel = distances.get(current);
        
        // Add current node to its level group
        if (!levels[currentLevel]) {
            levels[currentLevel] = [];
        }
        levels[currentLevel].push(current);
        
        // Process neighbors
        const neighbors = graph[current] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                distances.set(neighbor, currentLevel + 1);
                queue.push(neighbor);
            }
        }
    }
    
    return levels;
}

// Example usage:
function main() {
    const graph = {
        'A': ['B', 'C', 'D'],
        'B': ['A', 'E'],
        'C': ['A', 'F'],
        'D': ['A', 'G'],
        'E': ['B'],
        'F': ['C'],
        'G': ['D']
    };
    
    const levels = groupByLevels(graph, 'A');
    console.log(levels);
    // Output: { 0: ['A'], 1: ['B', 'C', 'D'], 2: ['E', 'F', 'G'] }
}

// Run example
main();