/* A node class is a blueprint for creating objects 
that represent individual elements (nodes) in a data 
structure, such as a binary tree, linked list, or graph. 
In the context of the provided code, the Node class is specifically designed for a binary tree.
*/
// Binary Tree Node
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/* When the statement Node(4) is run, 
it creates a new instance of the Node class, 
representing a node in a binary tree

Specifically the node has a value of 4, 
its left and right child pointers are initialized to null, 
indicating that this node has no children (its a leaf node at its creation)
*/
let single = new Node(4);
console.log(single);

/* Binary search tree implementation */
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Search for a value in BST
    search(value) {
        return this._searchNode(this.root, value);
    }

    _searchNode(node, value) {
        // Base cases: empty tree or found the value
        if (node === null) return null;
        if (node.value === value) return node;

        // Recursive cases
        if (value < node.value) {
            return this._searchNode(node.left, value);
        } else {
            return this._searchNode(node.right, value);
        }
    }

    // Insert a value into BST
    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return this;
        }

        this._insertNode(this.root, newNode);
        return this;
    }

    _insertNode(node, newNode) {
        // If value is less than node's value, go left
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        }
        // If value is greater than node's value, go right
        else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }
}

let bst = new BinarySearchTree();
console.log(bst);
console.log(bst.search(4));