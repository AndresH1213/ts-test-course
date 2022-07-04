import { Utils } from '../app/Utils';

// see the methods [describe.skip - describe.only] and others
describe('Utils test suite', () => {
  // jest hooks
  beforeEach(() => {
    console.log('beforeEach');
  });
  beforeAll(() => {
    console.log('before all');
  });

  test('first test', () => {
    const result = Utils.toUpperCase('abc');
    expect(result).toBe('ABC');
  });

  test('parse simple URL', () => {
    const parsedUrl = Utils.parseUrl('http://locahost:8080/login');
    // if we want to test primitives use toBe
    expect(parsedUrl.href).toBe('http://locahost:8080/login');
    expect(parsedUrl.port).toBe('8080');
    expect(parsedUrl.protocol).toBe('http:');
    // if we want to test objects use toEqual
    expect(parsedUrl.query).toEqual({});
  });

  test('parse URL with query', () => {
    const parsedUrl = Utils.parseUrl(
      'http://locahost:8080/login?user=user&password=pass'
    );
    const expectedQuery = {
      user: 'user',
      password: 'pass',
    };
    expect(parsedUrl.query).toEqual(expectedQuery);
    // if we want to test references also can use toBe
    expect(expectedQuery).toBe(expectedQuery);
  });

  test('test invalid URL', () => {
    function expectError() {
      Utils.parseUrl('');
    }

    expect(expectError).toThrowError();
  });

  test.only('test invalid URL with try catch', () => {
    try {
      Utils.parseUrl('');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Empty url');
    }
  });
});
