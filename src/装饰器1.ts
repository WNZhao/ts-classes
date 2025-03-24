// 装饰器
// 只能在类中使用（类本身，类成员使用）
// 装饰器，类的装饰器，属性装饰器，访问装饰器 参数装饰器

// 1. 类型装饰器 给类进行扩展，也可以返回一个子类

// 先要在tsconfig.json中开启experimentalDecorators
const classDecorator1 = <T extends new (...args: any[]) => any>(target: T) => {
  (target as any).prototype.name = 'hello';
  (target as any).prototype.say = function () {
    console.log('hello');
  };
  Object.assign(target.prototype, {
    name: 'hello',
    drink() {},
    eat() {
      console.log('hello');
    },
  });
};
const classDecorator2 = <T extends new (...args: any[]) => any>(target: T) => {
  // 基于父类返回一个子类
  return class extends target {
    name = 'hello';
  };
};

@classDecorator1
class Animal {}

@classDecorator2
class Person {}

// 2. 方法装饰器

function Enum(isEnum: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // descriptor.value = isEnum ? 'enum' : 'not enum';
    descriptor.enumerable = isEnum;
  };
}

export {};
