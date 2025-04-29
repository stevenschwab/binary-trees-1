/* Implement a function that counts the number of distinct islands in a grid. */

function countIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;

    // Helper function: Flood fill to mark connected land cells
    function floodFill(row, col) {
        // Check bounds and if cell is land (1) and unvisited
        if (row < 0 || row >= rows || 
            col < 0 || col >= cols || 
            grid[row][col] !== 1) {
                return;
        }

        // Mark as visited by changing to 0 (or another marker)
        grid[row][col] = 0;

        // Recursively fill neighbors (4-way connectivity)
        floodFill(row + 1, col); // Down
        floodFill(row - 1, col); // Up
        floodFill(row, col + 1); // Right
        floodFill(row, col - 1); // Left
    }

    // Iterate through each cell in the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                islandCount++; // Found a new island
                floodFill(i, j); // Mark all connected land cells
            }
        }
    }

    return islandCount;
}

const emptyGrid = []

const grid = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1]
];

console.log(countIslands(emptyGrid)); // Should output: 0
console.log(countIslands(grid));  // Should output: 3