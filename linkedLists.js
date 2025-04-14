// Node class to represent each element in the Linked List
class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

// Linked List Class
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

    // Delete node from beginning
    deleteFromBeginning() {
        if (!this.head) {
            console.log("List is empty");
            return false;
        }

        const deletedData = this.head.data;
        this.head = this.head.next;
        this.size--;
        return {
            success: true,
            deleted: deletedData
        };
    }

    // Delete node from middle (at a specific position)
    deleteFromMiddle(position) {
        if (!this.head) {
            console.log("List is empty");
            return false;
        }

        // Check for null, undefined, or invalid position
        if (position === null || position === undefined || typeof position !== 'number' || position < 0 || position >= this.size) {
            console.log(`Invalid position. Position should be a number between 0 and ${this.size - 1}`);
            return false;
        }

        if (position === 0) {
            return this.deleteFromBeginning();
        }

        let current = this.head;
        let previous = null;
        let currentPosition = 0;

        while (currentPosition < position) {
            previous = current;
            current = current.next;
            currentPosition++;
        }

        previous.next = current.next;
        this.size--;
        return {
            success: true,
            deleted: current.data
        };
    }

    // Delete node by value (first occurence)
    deleteByValue(value) {
        if (!this.head) {
            console.log("List is empty");
            return false
        }

        if (this.head.data === value) {
            return this.deleteFromBeginning();
        }

        let current = this.head;
        let previous = null;

        while (current && current.data !== value) {
            previous = current;
            current = current.next;
        }

        if (!current) {
            console.log(`Value ${value} not found in the list`);
            return false;
        }

        previous.next = current.next;
        current.next = null;
        this.size--;
        return {
            success: true,
            deleted: current.data
        };
    }

    // Insert node at beginning, middle, or end
    insertAtBeginning(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    // Insert at the middle (at a specific position)
    insertAtMiddle(data, position) {
        if (position < 0 || position > this.size) {
            console.log(`Invalid position. Position should be between 0 and ${this.size}`)
            return false
        }

        if (position === 0) {
            this.insertAtBeginning(data)
            return true
        }

        const newNode = new Node(data)
        let current = this.head;
        let previous = null;
        let currentPosition = 0;

        while (currentPosition < position) {
            previous = current
            current = current.next
            currentPosition++
        }

        previous.next = newNode;
        newNode.next = current
        this.size++
        return true
    }

    // Insert at the end
    insertAtEnd(data) {
        const newNode = new Node(data)

        if (!this.head) {
            this.head = newNode
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next
            }
            current.next = newNode
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
        let current = this.head
        const elements = []
        while (current) {
            elements.push(current.data)
            current = current.next
        }
        console.log(elements.join(" -> "))
    }
}

// Test case 1
function demonstrateAppend() {
    const list = new LinkedList()

    // Adding elements
    list.append(5)
    list.append(10)
    list.append(15)
    list.append(20)
    
    // Print the list
    console.log("Linked List:")
    list.print()
    
    // Test linear search
    console.log("\nSearch results:")
    console.log(list.linearSearch(15))  // { found: true, position: 2, value: 15 }
    console.log(list.linearSearch(7));  // { found: false, position: -1, value: null }
}

// demonstrateAppend()

// Test case 2
function demonstrateInsert() {
    // Example usage:
    const list = new LinkedList();

    // Testing insertions
    console.log("Inserting elements:");
    list.insertAtEnd(10);        // 10
    list.insertAtBeginning(5);   // 5 -> 10
    list.insertAtMiddle(7, 1);   // 5 -> 7 -> 10
    list.insertAtEnd(15);        // 5 -> 7 -> 10 -> 15
    list.insertAtMiddle(12, 3);  // 5 -> 7 -> 10 -> 12 -> 15

    // Print the list
    console.log("\nLinked List:");
    list.print(); // Output: 5 -> 7 -> 10 -> 12 -> 15

    // Test linear search
    console.log("\nSearch results:");
    console.log(list.linearSearch(10)); // { found: true, position: 2, value: 10 }
    console.log(list.linearSearch(20)); // { found: false, position: -1, value: null }

    // Test invalid position
    console.log("\nTesting invalid position:");
    list.insertAtMiddle(25, 10); // Output: Invalid position message
}

demonstrateInsert()