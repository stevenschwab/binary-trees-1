// simple hash table implementation with chaining
class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        const PRIME = 31;

        // Hash only the first 100 characters for better performance
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key[i];
            const value = char.charCodeAt(0) - 96;
            total = (total * PRIME + value) % this.keyMap.length;
        }

        return total;
    }

    set(key, value) {
        const index = this._hash(key);

        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }

        // Check if key already exists to update
        for (let i = 0; i < this.keyMap[index].length; i++) {
            if (this.keyMap[index][i][0] === key) {
                this.keyMap[index][i][1] = value;
                return;
            }
        }

        // Key doesn't exist, add new key-value pair
        this.keyMap[index].push([key, value]);
    }

    get(key) {
        const index = this._hash(key);

        if (!this.keyMap[index]) return undefined;

        for (let i = 0; i < this.keyMap[index].length; i++) {
            if (this.keyMap[index][i][0] === key) {
                return this.keyMap[index][i][1];
            }
        }

        return undefined;
    }
}

// Create a new HashTable instance
const hashTable = new HashTable(); // Default size = 53
console.log(hashTable);

// Set some key-value pairs
hashTable.set("name", "Alice");
hashTable.set("age", 30);
hashTable.set("city", "New York");
hashTable.set("name", "Bob"); // Update existing key "name"
hashTable.set("country", "USA");

// Retrieve values
console.log(hashTable.get("name"));
console.log(hashTable.get("age"));     // Output: 30
console.log(hashTable.get("city"));    // Output: "New York"
console.log(hashTable.get("country")); // Output: "USA"
console.log(hashTable.get("email"));   // Output: undefined (key doesn't exist)

// Example with potential collisions
hashTable.set("maroon", "#800000");
hashTable.set("yellow", "#FFFF00");
console.log(hashTable.get("maroon"));  // Output: "#800000"
console.log(hashTable.get("yellow"));  // Output: "#FFFF00"

// Inspect the internal structure (for understanding)
console.log(hashTable.keyMap); // Shows the array with chains at various indices