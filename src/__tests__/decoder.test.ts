import { decodeBoolean, decodeNumber, decodeObject, decodeString } from '../decoder';

interface IUser {
  name: string;
  age: number;
  hasJob: boolean;
}

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

test('decode object is success', () => {
    const userData = {
        age: 30,
        hasJob: true,
        name: 'Joe'
    }
    
    const result = decodeObject<IUser>(userData, (data) => ({
        age: decodeNumber(data.age),
        hasJob: decodeBoolean(data.hasJob),
        name: decodeString(data.name)
    }));

    return expect(result).resolves.toEqual(userData);
  });
  
  test('decode object is failed', () => {
    const userData = {
        age: 30,
        hasJob: 2,
        name: 'Joe'
    }
    
    const result = decodeObject<IUser>(userData, (data) => ({
        age: decodeNumber(data.age),
        hasJob: decodeBoolean(data.hasJob),
        name: decodeString(data.name)
    }));

    return expect(result).rejects.toEqual('{\"age\":30,\"hasJob\":2,\"name\":\"Joe\"} is not valid: 2 should be boolean');
  });
