// 类型保护
// 通过判断，去识别类型、核心就是进行类型的收窄
function doubel(val: number | string) {
  if (typeof val === 'number') {
    return val * 2;
  } else {
    return val + val;
  }
}

class Person {}
class Dog {}

function getInstance(clazz: new () => Dog | Person) {
  return new clazz();
}

const instance = getInstance(Person);

if (instance instanceof Person) {
  console.log('instance is a Person');
} else {
  console.log('instance is a Dog');
}

interface Bird {
  kind: 'bird';
  fly: string;
}
interface Fish {
  kind: 'fish';
  swim: string;
}

// 类型谓词 自定义的类型保护
function isBird(animal: Bird | Fish): animal is Bird {
  return animal.kind === 'bird';
}

function getAnimal(animal: Bird | Fish) {
  if (isBird(animal)) {
    return animal.fly;
  } else {
    return animal.swim;
  }
}

function ensureArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

export {};
