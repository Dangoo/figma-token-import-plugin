import { flattenObjectToArray } from '../flattenObjectToArray';

const isString = (obj): obj is string => typeof obj === 'string';
const isDummyObject = (obj): obj is { value: unknown } => obj.value !== undefined;

describe(flattenObjectToArray.name, () => {
  it('should handle an empty object', () => {
    expect(flattenObjectToArray<string>({}, isString)).toEqual([]);
  });

  it('should handle a simple flat object', () => {
    expect(flattenObjectToArray({ foo: 'foo', bar: 'bar' }, isString)).toEqual(['foo', 'bar']);
  });

  it('should handle a simple nested object', () => {
    expect(flattenObjectToArray({ foo: 'foo', bar: { baz: 'bar/baz' } }, isString)).toEqual([
      'foo',
      'bar/baz',
    ]);
  });

  it('should handle a simple nested object', () => {
    expect(flattenObjectToArray({ foo: 'foo', bar: { baz: 'bar/baz' } }, isString)).toEqual([
      'foo',
      'bar/baz',
    ]);
  });

  it('should not enter target object', () => {
    expect(flattenObjectToArray({ foo: { value: 'foo' } }, isDummyObject)).toEqual([
      { value: 'foo' },
    ]);
  });

  it('should ignore non matching leaves', () => {
    expect(flattenObjectToArray({ foo: 'foo' }, isDummyObject)).toEqual([]);
  });
});
