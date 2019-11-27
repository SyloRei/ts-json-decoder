# Typescript JSON Decoder
The typescript library that helps to decode and check raw json with types.

# Install

```
npm install ts-json-decoder
```

# Example

```
import { decodeObject, decodeBoolean, decodeNumber, decodeString } from 'ts-json-decoder';

const userData = {
    name: 'Joe',
    age: 30,
    hasJob: true
}

interface User {
    name: string;
    age: number;
    hasJob: boolean;
}

const result = decodeObject<User>(userData, (data) => ({
    name: decodeString(data.name),
    age: decodeNumber(data.age),
    hasJob: decodeBoolean(data.hasJob),
}));

result
    .then(console.log)
    .catch(console.log)
```