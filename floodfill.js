function floodFill(grid, row, col, newColor, oldColor = grid[row][col]) {
    // Check bounds and color match
    if (row < 0 || row >= grid.length || 
        col < 0 || col >= grid[0].length || 
        grid[row][col] !== oldColor) {
        return;
    }

    // Fill current cell
    grid[row][col] = newColor;

    // Recursively fill neighbors (4-way connectivity)
    floodFill(grid, row + 1, col, newColor, oldColor);  // Down
    floodFill(grid, row - 1, col, newColor, oldColor);  // Up
    floodFill(grid, row, col + 1, newColor, oldColor);  // Right
    floodFill(grid, row, col - 1, newColor, oldColor);  // Left
}

const grid = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];

// floodFill(grid, 1, 1, 2);  // Fill starting at position [1,1] with color 2
// console.log(grid);
// Output will show all connected '0's changed to '2's

function floodFillEightWayConnectivity(grid, row, col, newColor, oldColor = grid[row][col]) {
    // Check bounds and color match
    if (row < 0 || row >= grid.length || 
        col < 0 || col >= grid[0].length || 
        grid[row][col] !== oldColor) {
        return;
    }

    // Fill current cell
    grid[row][col] = newColor;

    // Recursively fill neighbors (4-way connectivity)
    floodFill(grid, row + 1, col, newColor, oldColor);  // Down
    floodFill(grid, row - 1, col, newColor, oldColor);  // Up
    floodFill(grid, row, col + 1, newColor, oldColor);  // Right
    floodFill(grid, row, col - 1, newColor, oldColor);  // Left
    floodFill(grid, row - 1, col - 1, newColor, oldColor);  // Up-Left
    floodFill(grid, row - 1, col + 1, newColor, oldColor);  // Up-Right
    floodFill(grid, row + 1, col - 1, newColor, oldColor);  // Down-Left
    floodFill(grid, row + 1, col + 1, newColor, oldColor);  // Down-Right
}

const grid2 = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];

const grid3 = [
    [0, 0, 0, 1, 1],
    [0, 1, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1]
];

// Helper function to print grid
function printGrid(grid) {
    console.log(grid.map(row => row.join(' ')).join('\n'));
}

// Test grid2
console.log("\nOriginal grid3:");
printGrid(grid3);
floodFill(grid3, 0, 0, 3);  // Fill starting at position [0,0] with color 3
console.log("\nAfter flood fill (grid3):");
printGrid(grid3);
// Output will show all connected '0's changed to '3's