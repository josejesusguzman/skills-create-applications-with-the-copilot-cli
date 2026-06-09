#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - addition (add or +)
//  - subtraction (subtract or -)
//  - multiplication (multiply or * or x)
//  - division (divide or /)

// Core operations exported for use as a library and for unit testing
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) {
  if (y === 0) {
    throw new Error('Division by zero');
  }
  return x / y;
}

module.exports = { add, subtract, multiply, divide };

// CLI entrypoint runs only when this file is executed directly
if (require.main === module) {
  const [,, op, aRaw, bRaw] = process.argv;

  function usage() {
    console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
    console.log('Operations: add (+), subtract (-), multiply (* or x), divide (/)');
    console.log('Examples:');
    console.log('  node src/calculator.js add 2 3      # 5');
    console.log('  node src/calculator.js / 10 2       # 5');
  }

  if (!op || !aRaw || !bRaw) {
    usage();
    process.exitCode = 1;
    process.exit(1);
  }

  const a = Number(aRaw);
  const b = Number(bRaw);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: Both operands must be valid numbers.');
    process.exitCode = 2;
    process.exit(2);
  }

  let result;
  try {
    switch (op.toLowerCase()) {
      case 'add':
      case '+':
        result = add(a, b);
        break;
      case 'subtract':
      case '-':
        result = subtract(a, b);
        break;
      case 'multiply':
      case '*':
      case 'x':
      case '×':
        result = multiply(a, b);
        break;
      case 'divide':
      case '/':
      case '÷':
        result = divide(a, b);
        break;
      case 'help':
      case '--help':
      case '-h':
        usage();
        process.exit(0);
      default:
        console.error(`Unknown operation: ${op}`);
        usage();
        process.exitCode = 3;
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 4;
  }

  if (result !== undefined) {
    // Print result without extra formatting so it can be used in scripts
    console.log(result);
  }
}
