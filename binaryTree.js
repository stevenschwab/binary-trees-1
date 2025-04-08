class BinaryTreeNode {
    constructor(value) {
        this.value = value;
        this.count = 1; // track occurrences of this value
        this.left = null;
        this.right = null;
    }
}

function inOrderTraversal(node) {
    if (node) {
        inOrderTraversal(node.left)
        console.log(node.value)
        inOrderTraversal(node.right)
    }
}

function preOrderTraversal(node) {
    if (node) {
        console.log(node.value)
        preOrderTraversal(node.left)
        preOrderTraversal(node.right)
    }
}

function postOrderTraversal(node) {
    if (node) {
        postOrderTraversal(node.left)
        postOrderTraversal(node.right)
        console.log(node.value)
    }
}

function insert(root, value) {
    // If tree is empty, create new node
    if (root === null) {
        return new BinaryTreeNode(value);
    }

    // If value matches root value, increment count
    if (value === root.value) {
        root.count++
    }

    // If value is less than root, go left
    if (value < root.value) {
        root.left = insert(root.left, value)
    } else { // If value is greater than root, go right
        root.right = insert(root.right, value)
    }
    return root
}

function search(root, value) {
    if (root === null || root.value === value) {
        return root
    }
    if (value < root.value) {
        return search(root.left, value)
    }
    return search(root.right, value)
}

function getHeight(root) {
    // Base case: if the node is null, height is -1
    if (root === null) {
        return 0
    }

    // Recursively get the height of left and right subtrees
    const leftHeight = getHeight(root.left)
    const rightHeight = getHeight(root.right)

    // Return the maximum height between left and right, plus 1 for the current node
    return Math.max(leftHeight, rightHeight) + 1
}

function isValidBST(root) {
    // Helper function to check validity with min and max bounds
    function checkBST(node, min, max) {
        // An empty tree (null) is a valid BST
        if (node === null) {
            return true
        }

        // Check if current node's value is within the allowed range
        if (node.value <= min || node.value >= max) {
            return false
        }

        // Recursively check left and right subtrees
        // Left subtree: all values must be < node.value, so max becomes node.value
        // Right subtree: all values must be > node.value, so min becomes node.value
        return checkBST(node.left, min, node.value) && checkBST(node.right, node.value, max)
    }

    // Start with full range: -Infinity to Infinity
    return checkBST(root, -Infinity, Infinity)
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