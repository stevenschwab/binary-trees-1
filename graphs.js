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
}

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

testHasPath()