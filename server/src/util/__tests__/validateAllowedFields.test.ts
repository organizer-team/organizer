import validateAllowedFields from '../validateAllowedFields';

describe('validateAllowedFields', () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  it('Throws an error if the first argument is not a plain object', () => {
    expect(() =>
      validateAllowedFields('not an object' as any, ['foo'])
    ).toThrow('object must be a plain object');

    expect(() => validateAllowedFields(null as any, ['foo'])).toThrow(
      'object must be a plain object'
    );
  });

  it('Throws an error if the second argument is not an array', () => {
    expect(() =>
      validateAllowedFields({ foo: 'bar' }, 'not an array' as any)
    ).toThrow('allowedFields must be an array');

    expect(() => validateAllowedFields({ foo: 'bar' }, null as any)).toThrow(
      'allowedFields must be an array'
    );
  });

  it('Returns an error message if there are fields not in the allowed list', () => {
    const result = validateAllowedFields({ foo: 'bar', baz: 'qux' }, ['foo']);
    expect(result).toBe(
      'the following properties are not allowed to be set: baz'
    );
  });

  it('Returns an empty string if all fields are in the allowed list', () => {
    const result = validateAllowedFields({ foo: 'bar' }, ['foo']);
    expect(result).toBe('');
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */
});
