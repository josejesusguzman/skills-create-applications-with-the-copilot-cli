const { add, subtract, multiply, divide } = require('../calculator');

describe('Calculator basic operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });
});

describe('Edge cases and validation', () => {
  test('division by zero throws', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });

  test('works with floats', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
    expect(divide(7.5, 2.5)).toBeCloseTo(3);
  });

  test('handles negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
    expect(multiply(-4, 3)).toBe(-12);
  });
});
