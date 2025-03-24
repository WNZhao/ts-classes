import 'reflect-metadata';

class Animal {
  static type = '动物';
  eat() {
    console.log('吃');
  }
}

Reflect.defineMetadata('animal property', Animal.type, Animal);
Reflect.defineMetadata('animal method', Animal.prototype.eat, Animal);

const animal = new Animal();
console.log(Reflect.getMetadata('animal property', Animal));
console.log(Reflect.getMetadata('animal method', Animal));

// weak map
// 它是支持装饰器的写法
@Reflect.metadata('class', 'person metadata')
class Person {
  @Reflect.metadata('person property', 'person')
  name: string = 'person';
}

const person = new Person();
console.log(Reflect.getMetadata('person property', Person));

export {};
