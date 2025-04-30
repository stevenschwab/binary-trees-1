/* Write a function that groups anagrams together from an array of strings. */

function groupAnagrams(arrOfStrs) {
    const map = new Map();

    for (let str of arrOfStrs) {
        // Sort the characters of the string to create a key
        const sortedStr = str.split('').sort().join('');

        // If the sorted string exists in the map, add the original string to its array
        if (!map.has(sortedStr)) {
            map.set(sortedStr, []);
        }
        map.get(sortedStr).push(str);
    }

    // Return the values of the map as an array of arrays
    return Array.from(map.values());
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
/*
[
    ["eat", "tea", "ate"],
    ["tan", "nat"],
    ["bat"]
]
*/