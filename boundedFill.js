/* Implement a version of floodFill that only fills up to a maximum area. */

/* Requirements:
Add maxArea parameter
Track filled area count
Stop when limit reached
Return total area filled */

function boundedFill(grid, row, col, newColor, maxArea, oldColor = grid[row][col]) {
    if (!grid || grid.length === 0) return 0;

    // Initialize a counter for filled area (shared across recursive calls)
    let filledArea = { count: 0 };

    // Helper function to perform flood fill
    function floodFill(grid, row, col, newColor, oldColor, maxArea, filledArea) {
        // Check bounds and color match
        if (row < 0 || row >= grid.length || 
            col < 0 || col >= grid[0].length || 
            grid[row][col] !== oldColor || 
            filledArea.count >= maxArea
        ) {
            return;
        }
    
        // Fill current cell
        grid[row][col] = newColor;
        filledArea.count++;
    
        // Recursively fill neighbors (4-way connectivity)
        floodFill(grid, row + 1, col, newColor, oldColor, maxArea, filledArea);  // Down
        floodFill(grid, row - 1, col, newColor, oldColor, maxArea, filledArea);  // Up
        floodFill(grid, row, col + 1, newColor, oldColor, maxArea, filledArea);  // Right
        floodFill(grid, row, col - 1, newColor, oldColor, maxArea, filledArea);  // Left
    }

    floodFill(grid, row, col, newColor, oldColor, maxArea, filledArea);

    return filledArea.count;
}

const grid = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];

// Helper function to print grid
function printGrid(grid) {
    console.log(grid.map(row => row.join(' ')).join('\n'));
}

// Test grid
console.log("\nOriginal grid:");
printGrid(grid);
console.log(boundedFill(grid, 0, 0, 3, 5));  // Fill starting at position [0,0] with color 3
console.log("\nAfter flood fill (grid):");
printGrid(grid);
// Output will show all connected '1's changed to '3's