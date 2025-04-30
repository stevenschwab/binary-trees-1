/* Create a function that returns a map of character frequencies in descending order. */

function charFrequency(str) {
    // Create frequency map
    const charInfo = new Map();

    // Set the character count
    for (let char of str) {
        charInfo.set(char, (charInfo.get(char) || 0) + 1);
    }

    // Sort the characters and counts in descending order
    return new Map(
        Array.from(charInfo.entries()).sort((a, b) => {
            // Sort by frequency (descending)
            if (b[1] !== a[1]) {
                return b[1] - a[1];
            }
            // If frequencies are equal, sort by character (ascending)
            return a[0].localeCompare(b[0]);
        })
    )
}

console.log(charFrequency("programming"));
/*
{
    "g": 2,
    "r": 2,
    "m": 2,
    "p": 1,
    "o": 1,
    "a": 1,
    "i": 1,
    "n": 1
}
*/