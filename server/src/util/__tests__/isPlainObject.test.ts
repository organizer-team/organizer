import isPlainObject from '../isPlainObject';

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ name: 'John', age: 30 })).toBe(true);
  });

  it('should return false for non-plain objects', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject('hello')).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(Object.create(null))).toBe(false);
  });
});
