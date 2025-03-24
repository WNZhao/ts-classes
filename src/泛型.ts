/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-19 10:42:31
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-19 15:11:32
 * @FilePath: /ts-classes/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 泛型

class Animal {
  constructor(public name: string, public age: number) {}
}

class Person {
  constructor(public name: string, public age1: number) {}
}
// ts中在使用的时候，可以通过
function createInstance<T>(c: { new (...args: any[]): T }, ...args: any[]): T {
  return new c(...args);
}

// const animal = new Animal('dog', 12);
// console.log(animal.name);
// console.log(animal.age);

const animal = createInstance<Animal>(Animal, 'dog', 12);
const person = createInstance(Person, 'Tom', 12);

// 类型不确定，我们可以根据泛型来确定类型
// 一定要注意ts是没有执行呢，只是在编译的时候会进行类型检查
// 根据提供的数据生成对应长度的数组
function createArray<T>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
}

// 交换两个变量的值
type ISwap = <T, U>(tuple: [T, U]) => [U, T];

interface ISwap2 {
  <T, U>(tuple: [T, U]): [U, T]; // 为什么<T, U>要写在这里，而不是在函数后面？ 泛型使用的时候传递类型，可以推导，但是内部调用的时候没有确定类型
}

// 写在定义的前端，就表示使用类型的时候传参，写到函数的前端意味着函数调用的时候传参
// 是在使用类型的时候传递泛型，还是在调用函数的时候传递泛型

const swap: ISwap = (tuple) => {
  return [tuple[1], tuple[0]];
};

const swapArray = swap<number, string>([1, '2']);

// 泛型是有默认值的，使用一些联合类型的时候，会使用泛型
type UnionType<T = boolean> = T | number | string;
let union: UnionType = '123';
// 泛型约束 要求传递的参数必须符合要求 A extends B 表示A是B的子类(或同类型)
interface ILength {
  length: number;
}
// 什么叫子 什么叫父
function getLength<T extends ILength>(value: T) {
  // 只要我的对象里有length属性，就可以
  return value.length;
}
getLength('123');
getLength({ length: 123 });

function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

getValue({ name: '张三', age: 12 }, 'age');

interface ILoginResponse<T> {
  code: number;
  message?: string;
  data: T;
}
interface ILoginData {
  token: string;
  userInfo: {
    name: string;
    age: number;
  };
  roles: string[];
}

function toLogin<T>(response: ILoginResponse<T>) {
  return response.data;
}

const loginResponse = toLogin<ILoginData>({
  code: 200,
  data: {
    token: '123',
    userInfo: {
      name: '张三',
      age: 12,
    },
    roles: ['admin', 'user'],
  },
});

// 类中使用泛型
class Cache<T> {
  private data: T[] = [];
  add(item: T) {
    this.data.push(item);
  }
}

const cache = new Cache<string>();
cache.add('123');
cache.add('456');

export {};
