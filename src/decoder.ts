type Promisify<T> = Required<
  {
    readonly [P in keyof T]: Promise<T[P]>;
  }
>;

export function decodeObject<T>(rawObject: unknown, transform: (rawObject: any) => Promisify<T>): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    if (Array.isArray(rawObject)) {
      return reject(`${JSON.stringify(rawObject)} should not be array`);
    }

    try {
      const transformObject = transform(rawObject);
      const result = {} as T;
      for (const key in transformObject) {
        if (transformObject.hasOwnProperty(key)) {
          result[key] = await transformObject[key];
        }
      }

      resolve(result);
    } catch (err) {
      reject(`${JSON.stringify(rawObject)} is not valid: ${err}`);
    }
  });
}

export function decodeBoolean(rawPrimitive: unknown): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    if (typeof rawPrimitive !== 'boolean') {
      reject(`${JSON.stringify(rawPrimitive)} should be boolean`);
    }

    resolve(rawPrimitive as boolean);
  });
}

export function decodeNumber(rawPrimitive: unknown): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    if (typeof rawPrimitive !== 'number') {
      reject(`${JSON.stringify(rawPrimitive)} should be number`);
    }

    resolve(rawPrimitive as number);
  });
}

export function decodeString(rawPrimitive: unknown): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (typeof rawPrimitive !== 'string') {
      reject(`${JSON.stringify(rawPrimitive)} should be string`);
    }

    resolve(rawPrimitive as string);
  });
}

export function decodeOptionalPrimitive<T>(raw: unknown, transform: (raw: unknown) => Promise<T>): Promise<T> {
  return new Promise<T>(async resolve => {
    if (raw === undefined) {
      return resolve(raw);
    }

    transform(raw);
  });
}

export function decodeOptionalObject<T>(
  raw: unknown,
  transform: (rawObject: unknown, transform: (rawObject: any) => Promisify<T>) => Promise<T>,
): Promise<T> {
  return new Promise<T>(async resolve => {
    if (raw === undefined) {
      return resolve(raw);
    }

    transform(raw);
  });
}
