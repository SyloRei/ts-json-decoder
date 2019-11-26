import { decodeBoolean, decodeNumber, decodeString } from '../decoder';

test('decode boolean is success', () => {
  return expect(decodeBoolean(true)).resolves.toEqual(true);
});

test('decode boolean is failed', () => {
  return expect(decodeBoolean({})).rejects.toEqual('{} should be boolean');
});

test('decode number is success', () => {
  return expect(decodeNumber(42)).resolves.toEqual(42);
});

test('decode number is failed', () => {
  return expect(decodeNumber({})).rejects.toEqual('{} should be number');
});

test('decode string is success', () => {
  return expect(decodeString('Test')).resolves.toEqual('Test');
});

test('decode string is failed', () => {
  return expect(decodeString({})).rejects.toEqual('{} should be string');
});
