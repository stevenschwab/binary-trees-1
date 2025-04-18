class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.adjacencyList = new Map();
    }

    // Add a vertex to the graph
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
        return this;
    }

    // Add an edge between two vertices
    addEdge(source, destination) {
        // Add vertices if they don't exist
        this.addVertex(source)
        this.addVertex(destination)

        // Add edge from source to destination
        this.adjacencyList.get(source).push(destination)

        // For undirected graph, add edge from destination to source
        if (!this.isDirected) {
            this.adjacencyList.get(destination).push(source)
        }
        return this;
    }

    // Find cycle
    findCycle() {
        const visited = new Set()
        const recStack = new Set() // Tracks vertices in current recursion stack
        const parentMap = new Map() // Tracks parent of each vertex in DFS

        // DFS helper function
        const dfs = (vertex, parent = null) => {
            visited.add(vertex)
            recStack.add(vertex)
            parentMap.set(vertex, parent)

            const neighbors = this.adjacencyList.get(vertex)
            for (const neighbor of neighbors) {
                // For undirected graphs, skip the parent to avoid trivial cycles
                if (!this.isDirected && neighbor === parent) {
                    continue
                }

                if (!visited.has(neighbor)) {
                    const cycle = dfs(neighbor, vertex)
                    if (cycle.length > 0) {
                        return cycle
                    }
                } else if (recStack.has(neighbor)) {
                    // Cycle detected, construct the path
                    const cycle = []
                    let current = vertex
                    cycle.push(current)

                    // Trace back until we reach the neighbor
                    while (current !== neighbor) {
                        current = parentMap.get(current)
                        cycle.push(current)
                    }
                    cycle.push(vertex)
                    return cycle
                }
            }

            recStack.delete(vertex)
            return []
        }

        // Check each vertex in case graph is disconnected
        for (const vertex of this.adjacencyList.keys()) {
            if (!visited.has(vertex)) {
                const cycle = dfs(vertex)
                if (cycle.length > 0) {
                    return cycle
                }
            }
        }

        return [] // no cycle found
    }

    // Cycle detection
    hasCycle() {
        const visited = {}
        const recStack = {}

        for (let vertex in this.adjacencyList) {
            if (this.hasCycleUtil(vertex, visited, recStack)) {
                return true
            }
        }
        return false
    }

    // Cycle helper method
    hasCycleUtil(vertex, visited, recStack) {
        if (!visited[vertex]) {
            visited[vertex] = true
            recStack[vertex] = true

            for (let neighbor of this.adjacencyList[vertex]) {
                if (!visited[neighbor] && this.hasCycleUtil(neighbor, visited, recStack)) {
                    return true;
                } else if (recStack[neighbor]) {
                    return true
                }
            }
        }
        recStack[vertex] = false
        return false
    }

    // Find all connected components (for undirected graphs only)
    findConnectedComponents() {
        if (this.isDirected) {
            throw new Error('Connected components are only defined for undirected graphs')
        }

        const visited = new Set();
        const components = []

        // DFS helper function to explore a component
        const dfs = (vertex, currentComponent) => {
            visited.add(vertex)
            currentComponent.push(vertex)

            const neighbors = this.adjacencyList.get(vertex)
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor, currentComponent)
                }
            }
        }

        // Iterate through all vertices
        for (const vertex of this.adjacencyList.keys()) {
            if (!visited.has(vertex)) {
                const currentComponent = []
                dfs(vertex, currentComponent)
                components.push(currentComponent)
            }
        }

        return components
    }

    // Check if path exists between start and end vertices
    hasPath(start, end) {
        // If either vertex doesn't exist, no path possible
        if (!this.adjacencyList.has(start) || !this.adjacencyList.has(end)) {
            return false;
        }

        // If start and end are same, path exists
        if (start === end) {
            return true
        }

        // Set to keep track of visited vertices (handles cycles)
        const visited = new Set()

        // Recursive DFS helper function
        function dfs(current) {
            // Mark current vertex as visited
            visited.add(current)

            // Get neighbors of current vertex
            const neighbors = this.adjacencyList.get(current)

            // Explore each unvisited neighbor
            for (const neighbor of neighbors) {
                if (neighbor === end) {
                    return true // path found
                }
                if (!visited.has(neighbor)) {
                    if (dfs.call(this, neighbor)) {
                        return true // path found in deeper recursion
                    }
                }
            }
            return false // No path found from this vertex
        }

        // Start DFS from the start vertex
        return dfs.call(this, start)
    }

    // Remove an edge between two vertices
    removeEdge(source, destination) {
        if (this.adjacencyList.has(source)) {
            const neighbors = this.adjacencyList.get(source)
            this.adjacencyList.set(source, neighbors.filter(v => v !== destination))
        }

        if (!this.isDirected && this.adjacencyList.has(destination)) {
            const neighbors = this.adjacencyList.get(destination)
            this.adjacencyList.set(destination, neighbors.filter(v => v !== source))
        }
        return this
    }

    // Remove a vertex and all its edges
    removeVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) return this;

        // Remove all edges pointing to this vertex
        for (let [source, neighbors] of this.adjacencyList) {
            this.adjacencyList.set(source, neighbors.filter(v => v !== vertex))
        }

        // Remove the vertex itself
        this.adjacencyList.delete(vertex)
        return this
    }

    // Get neighbors of a vertex
    getNeighbors(vertex) {
        return this.adjacencyList.get(vertex) || []
    }

    // Get all vertices
    getVertices() {
        return Array.from(this.adjacencyList.keys())
    }

    // Get number of vertices
    size() {
        return this.adjacencyList.size
    }

    // Check if edge exists
    hasEdge(source, destination) {
        return this.adjacencyList.has(source) && this.adjacencyList.get(source).includes(destination)
    }
    
    // Print the graph
    toString() {
        let result = ''
        for (let [vertex, neighbors] of this.adjacencyList) {
            result += `${vertex} -> ${neighbors.join(', ')}\n`
        }
        return result
    }

    depthFirstTraversal(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    return dfs(neighbor);
                }
            });
        })(start);

        return result;
    }

    shortestPath(start, end) {
        if (!this.adjacencyList.has(start) || !this.adjacencyList.has(end)) {
            return null;
        }

        const queue = [start];
        const visited = new Set([start]);
        const parent = new Map(); // Track parent of each vertex
        parent.set(start, null); // Start has no parent

        // BFS to find the end vertex
        while (queue.length > 0) {
            const current = queue.shift();

            if (current === end) {
                // Reconstruct path from end to start using parent map
                const path = [];
                let node = end;
                while (node !== null) {
                    path.push(node);
                    node = parent.get(node);
                }
                return path.reverse(); // Reverse to get path from start to end
            }

            // Explore neighbors
            for (const neighbors of this.adjacencyList.get(current)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                    parent.set(neighbor, current); // Record parent of neighbor to be current
                }
            }
        }

        return null; // no path found
    }
}

// Given a 2D grid of 1s (land) and 0s (water), count the number of islands
function countIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;

    // Helper function to perform DFS and mark connected land cells
    function dfs(row, col) {
        // Check boundaries and if cell is water or visited
        if (row < 0 || 
            row >= rows || 
            col < 0 || 
            col >= cols || 
            grid[row][col] === 0
        ) {
            return;
        }

        // Mark the current cell as visited by setting it to 0
        grid[row][col] = 0;

        // Recursively explore all 4 directions (up, down, left, right)
        dfs(row - 1, col); // up
        dfs(row + 1, col); // down
        dfs(row, col - 1); // left
        dfs(row, col + 1); // right
    }

    // Iterate through each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 1) {
                // Found a new island, increment count and explore it
                islandCount++;
                dfs(row, col); // Mark all connected land cells
            }
        }
    }

    return islandCount;
}

// Example usage:
const grid = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1]
];

console.log(countIslands(grid)); // Output: 3

// Example usage:
function demonstrateGraph() {
    // Directed graph
    const directedGraph = new Graph(true);
    directedGraph
        .addEdge('A', 'B')
        .addEdge('B', 'C')
        .addEdge('A', 'C');
    console.log('Directed Graph:');
    console.log(directedGraph.toString());

    // Undirected graph
    const undirectedGraph = new Graph(false);
    undirectedGraph
        .addEdge(1, 2)
        .addEdge(2, 3)
        .addEdge(1, 3);
    console.log('Undirected Graph:');
    console.log(undirectedGraph.toString());

    // Test other operations
    console.log('Neighbors of 2:', undirectedGraph.getNeighbors(2));
    console.log('Has edge 1->2:', undirectedGraph.hasEdge(1, 2));
    console.log('Graph size:', undirectedGraph.size());
    
    undirectedGraph.removeEdge(1, 2);
    console.log('After removing edge 1-2:');
    console.log(undirectedGraph.toString());
    
    undirectedGraph.removeVertex(3);
    console.log('After removing vertex 3:');
    console.log(undirectedGraph.toString());
}

// demonstrateGraph();

function testHasPath() {
    // Test 1: Simple directed graph
    const g1 = new Graph(true)
    g1.addEdge('A', 'B')
        .addEdge('B', 'C')
        .addEdge('C', 'D')
    console.log('Test 1 - Directed Graph:')
    console.log(g1.toString())
    console.log('Path A to D:', g1.hasPath('A', 'D')) // true
    console.log('Path D to A:', g1.hasPath('D', 'A')) // false

    // Test 2: Undirected graph with cycle
    const g2 = new Graph(false)
    g2.addEdge(1, 2)
        .addEdge(2, 3)
        .addEdge(3, 1)
        .addEdge(3, 4);
    console.log('\nTest 2 - Undirected Graph with cycle:');
    console.log(g2.toString());
    console.log('Path 1 to 4:', g2.hasPath(1, 4)); // true
    console.log('Path 4 to 2:', g2.hasPath(4, 2)); // true
    console.log('Path 1 to 5:', g2.hasPath(1, 5)); // false

    // Test 3: Disconnected graph
    const g3 = new Graph(true)
    g3.addEdge('X', 'Y')
        .addEdge('Z', 'W');
    console.log('\nTest 3 - Disconnected Graph:');
    console.log(g3.toString())
    console.log('Path X to Y:', g3.hasPath('X', 'Y')) // true
    console.log('Path X to W:', g3.hasPath('X', 'W')) // false
}

// testHasPath()

function testConnectedComponents() {
    // Test 1: Graph with two components
    const g1 = new Graph(false);
    g1.addEdge(1, 2)
      .addEdge(2, 3)
      .addEdge(4, 5);
    console.log('Test 1 - Two components:');
    console.log(g1.toString());
    console.log('Components:', g1.findConnectedComponents());

    // Test 2: Single component with cycle
    const g2 = new Graph(false);
    g2.addEdge('A', 'B')
      .addEdge('B', 'C')
      .addEdge('C', 'A')
      .addEdge('C', 'D');
    console.log('\nTest 2 - Single component with cycle:');
    console.log(g2.toString());
    console.log('Components:', g2.findConnectedComponents());

    // Test 3: Empty graph and single vertex
    const g3 = new Graph(false);
    console.log('\nTest 3 - Empty graph:');
    console.log('Components:', g3.findConnectedComponents());
    
    g3.addVertex('X');
    console.log('With single vertex:');
    console.log(g3.toString());
    console.log('Components:', g3.findConnectedComponents());

    // Test 4: Fully disconnected graph
    const g4 = new Graph(false);
    g4.addVertex(1).addVertex(2).addVertex(3);
    console.log('\nTest 4 - Fully disconnected:');
    console.log(g4.toString());
    console.log('Components:', g4.findConnectedComponents());
}

// Run tests
// testConnectedComponents();

function testCycleDetection() {
    // Test 1: Directed graph with cycle
    const g1 = new Graph(true);
    g1.addEdge("A", "B")
      .addEdge("B", "C")
      .addEdge("C", "A");
    console.log("Test 1 - Directed with cycle:");
    console.log(g1.toString());
    console.log("Cycle:", g1.findCycle());

    // Test 2: Undirected graph with cycle
    const g2 = new Graph(false);
    g2.addEdge(1, 2)
      .addEdge(2, 3)
      .addEdge(3, 1);
    console.log("\nTest 2 - Undirected with cycle:");
    console.log(g2.toString());
    console.log("Cycle:", g2.findCycle());

    // Test 3: Graph with no cycle
    const g3 = new Graph(true);
    g3.addEdge("X", "Y")
      .addEdge("Y", "Z");
    console.log("\nTest 3 - No cycle:");
    console.log(g3.toString());
    console.log("Cycle:", g3.findCycle());

    // Test 4: Disconnected graph with cycle
    const g4 = new Graph(false);
    g4.addEdge("A", "B")
      .addEdge("B", "C")
      .addEdge("C", "A")
      .addVertex("D");
    console.log("\nTest 4 - Disconnected with cycle:");
    console.log(g4.toString());
    console.log("Cycle:", g4.findCycle());
}

// testCycleDetection();