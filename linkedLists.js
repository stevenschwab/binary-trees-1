// Node class to represent each element in the Linked List
class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.size = 0
    }

    // Add a node to the end of the list
    append(data) {
        const newNode = new Node(data)

        if (!this.head) {
            this.head = newNode
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newNode // insert the new node to the last node's next variable
        }
        this.size++
    }

    // Linear search method to find a value
    linearSearch(target) {
        let current = this.head
        let position = 0

        while (current !== null) {
            if (current.data === target) {
                return {
                    found: true,
                    position: position,
                    value: current.data
                }
            }
            current = current.next
            position++
        }

        return {
            found: false,
            position: -1,
            value: null
        }
    }

    // Helper method to print the list
    print() {

    }
}