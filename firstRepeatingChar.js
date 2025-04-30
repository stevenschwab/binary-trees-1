/* Implement a function that finds the first character that repeats in a string. */
function firstRepeatingChar(str) {
    const charInfo = new Map();

    // Track both count and previous position
    for (let i = 0; i < str.length; i++) {
        const char = str[i]
        if (!charInfo.has(char)) {
            charInfo.set(char, { count: 1, firstIndex: i, lastIndex: i });
        } else {
            const info = charInfo.get(char);
            if (info.lastIndex === i - 1) {
                info.count++;
                lastIndex = i;
            }
        }
    }

    // Find character with count greater than 2 and minimum index
    let result = null;
    let minIndex = str.length;

    for (const [char, info] of charInfo) {
        if (info.count > 1 && info.firstIndex < minIndex) {
            result = char;
            minIndex = info.firstIndex;
        }
    }

    return result;
}

console.log(firstRepeatingChar("abcdeef")) // → "e"
console.log(firstRepeatingChar("abcde")) // → null
console.log(firstRepeatingChar("abba")) // → "b"