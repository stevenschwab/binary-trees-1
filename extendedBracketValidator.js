// Enhance the bracket validator to handle additional features and provide more detailed feedback.

/*
Requirements:
Return position of first invalid bracket
Handle string escaping (e.g., brackets in quotes)
Support HTML-style angle brackets <>
Provide detailed error messages
*/

class ValidationError {
    constructor(message, position) {
        this.message = message;
        this.position = position;
    }
}

function validateBrackets(str) {
    const stack = [];
    const bracketPairs = {
        '(': ')',
        '{': '}',
        '[': ']',
        '<': '>'
    };
    const openBrackets = new Set(['(', '{', '[', '<']);
    const closeBrackets = new Set([')', '}', ']', '>']);

    let inQuote = false;
    let quoteChar = '';
    let escapeNext = false;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        // Handle escape characters
        if (escapeNext) {
            escapeNext = false;
            continue;
        }
        if (char === '\\') {
            escapeNext = true;
            continue
        }

        // Handle quotes
        if (inQuote) {
            if (char === quoteChar) {
                inQuote = false;
                quoteChar = '';
            }
            continue
        }
        if (char === '"' || char === "'") {
            inQuote = true;
            quoteChar = char;
            continue;
        }

        // Handle brackets
        if (openBrackets.has(char)) {
            stack.push({ char, position: i });
        } else if (closeBrackets.has(char)) {
            if (stack.length === 0) {
                return new ValidationError(`Invalid: Unexpected closing bracket '${char}'`, i);
            }

            const lastOpen = stack.pop();
            if (bracketPairs[lastOpen.char] !== char) {
                return new ValidationError(`Invalid at ${lastOpen.position}: Expected '${bracketPairs[lastOpen.char]}' but found '${char}'`, i);
            }
        }
    }

    // Check for unclosed brackets
    if (stack.length > 0) {
        const lastOpen = stack[stack.length - 1];
        return new ValidationError(`Invalid: Unclosed bracket '${lastOpen.char}' at ${lastOpen.position}`, lastOpen.position);
    }

    // Check for unclosed quotes
    if (inQuote) {
        return new ValidationError(`Invalid: Unclosed quote '${quoteChar}'`, str.lastIndexOf(quoteChar));
    }

    return { message: 'Valid: Brackets properly nested and escaped' };
}

// Test cases
console.log(validateBrackets('{"key": "(value)"}'));
// Valid: Brackets properly nested and escaped

console.log(validateBrackets('{malformed]'));
// Invalid at position 11: Expected '}' but found ']'

console.log(validateBrackets('((()'));
// Invalid: Unclosed bracket '(' at position 0