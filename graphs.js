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

    removeVertex(vertex) {
        while(this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
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

// Create a new graph
const graph = new Graph();
console.log('Full graph object without vertices', graph)

// Add vertices
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
console.log('Full graph object with vertices', graph)

// Add edges
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");
console.log('Full graph object with edges', graph)

// Perform DFS starting from vertex "A"
console.log(graph.depthFirstTraversal("A")); 
// Output: ["A", "B", "D", "C"]