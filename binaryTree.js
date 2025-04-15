class BinaryTreeNode {
    constructor(value) {
        this.value = value;
        this.count = 1; // For handling duplicates, if needed
        this.left = null;
        this.right = null;
    }
}

// Binary Tree Class
class BinaryTree {
    constructor() {
        this.root = null
    }

    // In-order traversal (wrapper)
    inOrder() {
        const result = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }

    _inOrderTraversal(node, result) {
        if (node) {
            this._inOrderTraversal(node.left, result);
            result.push(node.value);
            this._inOrderTraversal(node.right, result);
        }
    }

    // Pre-order traversal (wrapper)
    preOrder() {
        const result = [];
        this._preOrderTraversal(this.root, result);
        return result;
    }
    
    _preOrderTraversal(node, result) {
        if (node) {
            result.push(node.value);
            this._preOrderTraversal(node.left, result);
            this._preOrderTraversal(node.right, result)
        }
    }

    // Post-order traversal (wrapper)
    postOrder() {
        const result = [];
        this._postOrderTraversal(this.root, result);
        return result;
    }
    
    _postOrderTraversal(node, result) {
        if (node) {
            this._postOrderTraversal(node.left, result)
            this._postOrderTraversal(node.right, result)
            result.push(node.value)
        }
    }

    // Insert a value
    insert(value) {
        this.root = this._insert(this.root, value);
    }
    
    _insert(node, value) {
        // If tree is empty, create new node
        if (node === null) {
            return new BinaryTreeNode(value);
        }
    
        // If value matches root value, increment count
        if (value === node.value) {
            node.count++
        } else if (value < node.value) {
            // If value is less than root, go left 
            node.left = this._insert(node.left, value)
        } else {
            root.right = this._insert(node.right, value);
        }
        return node;
    }
    
    // Search for a value
    search(value) {
        return this._search(this.root, value);
    }

    _search(node, value) {
        if (node === null || node.value === value) {
            return node;
        }
        if (value < node.value) {
            return this._search(node.left, value)
        }
        return this._search(node.right, value);
    }

    // Get height of the tree
    getHeight() {
        return this._getHeight(this.root);
    }
    
    _getHeight(node) {
        // Base case: if the node is null, height is -1
        if (node === null) {
            return -1; // Height of empty tree is -1 (single node has height 0)
        }
    
        // Recursively get the height of left and right subtrees
        const leftHeight = this._getHeight(node.left);
        const rightHeight = this._getHeight(node.right);
    
        // Return the maximum height between left and right, plus 1 for the current node
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Validate BST
    isValidBST() {
        return this._checkBST(this.root, -Infinity, Infinity);
    }
    
    _checkBST(root) {
        // Helper function to check validity with min and max bounds
        function checkBST(node, min, max) {
            // An empty tree (null) is a valid BST
            if (node === null) {
                return true;
            }
    
            // Check if current node's value is within the allowed range
            if (node.value <= min || node.value >= max) {
                return false;
            }
    
            // Recursively check left and right subtrees
            // Left subtree: all values must be < node.value, so max becomes node.value
            // Right subtree: all values must be > node.value, so min becomes node.value
            return _checkBST(node.left, min, node.value) && _checkBST(node.right, node.value, max)
        }
    }

    // New method to compute level sums
    levelSums() {
        if (!this.root) {
            return [];
        }

        const result = [];
        const queue = [this.root]; // Initialize queue with root

        while (queue.length > 0) {
            const levelSize = queue.length; // Number of nodes at current level
            let levelSum = 0;

            // Process all nodes at the current level
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift(); // Dequeue the next node
                levelSum += node.value; // Add its value to the level sum

                // Enqueue left child if it exists
                if (node.left) {
                    queue.push(node.left)
                }
                // Enqueue right child if it exists
                if (node.right) {
                    queue.push(node.right)
                }
            }

            // After processing the level, add the sum to result
            result.push(levelSum);
        }

        return result;
    }

    zigZagTraversal() {
        if (!this.root) {
            return [];
        }

        const result = [];
        const queue = [this.root]; // Initialize queue with root
        let leftToRight = true; // Direction flag: true for left-to-right, false for right-to-left

        while (queue.length > 0) {
            const levelSize = queue.length; // Number of nodes at current level
            const currentLevel = []; // Array to store values at current level

            // Process all nodes at the current level
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift(); // Dequeue the next node
                currentLevel.push(node.value); // Add value to current level array

                // Enqueue children for next level
                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
            }

            // Add current level to result, reversing if right-to-left
            if (!leftToRight) {
                currentLevel.reverse();
            }
            result.push(...currentLevel); // Spread to append values individually

            // Toggle direction for next level
            leftToRight = !leftToRight;
        }

        return result;
    }
}

// Create a node and log it to see how it works
// let node = new BinaryTreeNode(5)
// console.log("Node created with value:", node.value)
// console.log("Full node object:", node)

// Build a tree: 2 -> 1, 3
let root = null
root = insert(root, 1)
console.log("full node object", root)
root = insert(root, 2)
console.log("full node object", root)
root = insert(root, 3)
console.log('full node object', root)
root = insert(root, 4)
console.log('full node object', root)
root = insert(root, 5)
console.log('full node object', root)

// Calculate and print the height
console.log('Height of the tree:', getHeight(root))

// Implement a level-order traversal using a queue
inOrderTraversal(root)

// Test Case 1: Valid BST
console.log("Is Valid BST (should be true):", isValidBST(root));