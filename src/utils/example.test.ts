import { describe, it, expect } from 'vitest';
import { addNumbers } from './example';

describe('addNumbers', () => {
  it('should correctly add two numbers', () => {
    expect(addNumbers(2, 3)).toBe(5);
  });
});