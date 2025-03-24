let abc: string = 'Hello World';
console.log(abc);

let name = 'John Doe'; // 当前模块中，作用域隔离
let age = 20;
let handsome: boolean = true;
// 原始类似标识都是小写的，而类名都是大写的它描述的实例（都是对象）
// 类型注解：告诉TS变量的类型
// 类型推断：TS会自动尝试分析变量的类型
// 类型注解优先级高于类型推断
// 类型注解：变量名: 类型 = 值
// 类型推断：变量名 = 值
let s1: string = 'Hello World';
let s2: String = new String('Hello World');
let s3: String = 'Hello World'; // 会自动转换为对象
// 数组声明
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
// 元组：固定长度的数组
let tuple: [string, number] = ['Hello', 123];
// 元组的越界问题
// tuple[2] = 'World'; // 会报错
let tuple2: readonly [string, number, boolean] = ['Hello', 123, true];
// tuple2[0] = 'World'; // 会报错

// 枚举 自带类型的对象，自动增长
enum USER_ROLE {
  USER,
  ADMIN = 6,
  MANAGER,
  OTHER = 'other', // 异构枚举
}
/*
  USER = 0,
  ADMIN = 6,
  MANAGER = 7,
*/
console.log(USER_ROLE.USER); // 0
// 如果不需要对象可以直接采用常量枚举
const enum USER_ROLE2 {
  USER,
  ADMIN,
  MANAGER,
}
console.log(USER_ROLE2.USER); // 0

// 严格模式下，不允许使用 any 类型
// nul 和 undefined 是任何类型的子类型
let x: number | null | undefined = 1;
// let y: number = undefined; // 会报错
// let z: number = null; // 会报错
// strict:false 可以使用 any 类型

// never 类型 它是任何类型的子类型，也可以赋值给任何类型
// never 类型的变量只能被赋值为 never 类型
function fn1(): never {
  throw new Error('报错了');
}
// 类型保护，保障程序的不缺失
// never 是永远到达不了的终点
function fn2(): never {
  while (true) {}
}
function validate(x: never) {
  console.log(x);
}
// 针对不同的类型做不同的处理
function fn3(x: number | string | boolean) {
  // 类似有收敛的作用
  if (typeof x === 'number') {
    console.log(x.toFixed(2));
    return;
  }
  if (typeof x === 'string') {
    console.log(x.trim());
    return;
  }
  if (typeof x === 'boolean') {
    console.log(x.valueOf());
    return;
  }
  //守卫语句
  validate(x); // 如果类型不匹配，会报错 这个逻辑应该是永远不会执行的所以上在还是有没覆盖到的逻辑（要添加boolean类型的判断）
}
// object 类型 object {} Object
let obj: object = { name: 'John Doe' };
// obj.name = 'Jane Doe'; // 会报错
// 小写的 object 是对象类型，大写的 Object 是对象的构造函数
// type中定义了是类型是不是js中的对象
type women =
  | {
      wealthy: true;
      waste: string;
    }
  | {
      wealthy: false;
      norality: string;
    };
// 是富人一定不是节俭的人，是节俭的人一定不是富人
// 断言 把某个类型断言为为已经存在的一种类型
// let ele = document.getElementById('app');
// ele!.innerHTML = 'Hello World'; // 绕过TS的类型检查 ele?.innerHTML = 'Hello World'; // 可选链 操作符（取值）
// false || true = true
// false && true = false
// null ?? 'Hello World' = 'Hello World' // 空值合并操作符
// as 类型断言 可以强制把某个类型断言为另外一个类型 as 类型
// 双重断言，我们可以把一个值断言成为 any 类型，然后再断言成为另外一个类型
// 类型断言不是类型转换，只是告诉TS编译器，这个值是什么类型
// 类型断言只在编译阶段起作用，不会影响真实的值

// 函数类型

// 函数声明 function定义 函数表达式
function sum(a: number, b: number): number {
  return a + b;
}
let sum2 = function (a: number, b: number): number {
  return a + b;
};
let sum3: (a: number, b: number) => number = function (a, b) {
  return a + b;
};
// 类型比较长可以写成下面
type Sum = (a: number, b: number) => number;
let sum4: Sum = function (a, b) {
  return a + b;
};
// 会根据上下文推导赋予值的类型
let sum5: Sum = (a, b) => a + b;

// 可选参数(?)
let sum6 = (a: string = 'a', b?: string): string => {
  return a + b;
};

// 对象类型
let person = {
  name: 'John Doe',
  age: 20,
};
// ts中的this类型需要手动指定，默认是函数的第一个参数
function getVal(this: typeof person, key: keyof typeof person) {
  return this[key]; // this指向调用者，必须要有类型断言才能使用{
}
let r = getVal.call(person, 'name');
console.log(r);

// 重载 （一般是有限操作）, 它只是一个伪重载，只是一个类型的重载
function toArray(value: number): number[];
function toArray(value: string): string[];
function toArray(value: number | string) {
  if (typeof value === 'string') {
    return value.split('');
  } else {
    return value
      .toString()
      .split('')
      .map((item) => parseInt(item));
  }
}
let ar = toArray(123);
console.log(ar);
let ar1 = toArray('123');
console.log(ar1);

// 类
class Circle {
  // 类的属性 ts中所有的属性都要先声明再使用
  PI = 3.14;
  // 类的构造函数
  constructor(public radius: number) {
    this.radius = radius;
  }
  // 类的方法
  area() {
    return this.PI * this.radius ** 2;
  }
}
// 还有一种写法
class Animals {
  constructor(public name: string) {
    // this.name = name; // 赋值也可以省去
  }
  eat() {
    console.log(this.name + ' is eating');
  }
}
const a1 = new Animals('dog');
a1.eat();
// 访问修饰
// public 公共的 默认的
// private 私有的 只能在类的内部访问
// protected 受保护的 只能在类的内部和子类中访问
// readonly 只读的 初始化之后不能修改
// static 静态的
// abstract 抽象的

// #号开头的属性是私有属性 只能在类的内部访问 不能在类的外部访问(这个是一个js语法)

// 不能new
class Singleton {
  private static instance: Singleton;
  private constructor() {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}
let sg1 = Singleton.getInstance();
// 抽象类不能new
// 不能实例化，只能被继承

abstract class Animal {
  constructor(public name: string) {}
  abstract eat(): void;
}
// 接口
// 接口是对行为的抽象，而抽象类是对类的抽象
// 用接口描述函数
// interface 描述的是形状或结构
// type IFullName = {
//   firstname: string;
//   lastname: string;
// };
interface IFullname {
  firstname: string;
  lastname: string;
}
type IFn = (obj: IFullname) => string;
let fn: IFn = ({ firstname, lastname }: IFullname): string => {
  return firstname + lastname;
};
fn({ firstname: 'John', lastname: 'Doe' });
// 1. 如果只是用来描述结构我们采用interface
// 2. 如果涉及到联合类型，则只能使用type
// 3. type不能扩展，interface可以扩展
// 4. type不能重名，interface可以重名
// 5. type可以使用typeof获取实例的类型，interface不行
// 6. type可以使用keyof获取key的类型，interface不行
// 7. type可以使用infer获取函数返回值的类型，interface不行
// 8. type可以使用extends实现交叉类型，interface不行
// 9. type可以使用条件类型，interface不行
// 10. type可以使用映射类型，interface不行
// 11. type可以使用索引访问操作符，interface不行
// 12. type在后续的学习中可以使用循环和条件,interface不行

// 可以用接口描述混合类型
interface IFn1 {
  (a: number, b: number): number;
  prop1: string;
  prop2: number;
}
// let fn11:IFn1 = (a,b)=>a+b; // 这样就报错了，因为fn11没有prop1和prop2属性且let定义可以重新被赋值
const fn11: IFn1 = (a, b) => a + b;
fn11.prop1 = 'Hello';
fn11.prop2 = 123;

// 一般情况下我们使用interface来描述对象，如果需要使用联合类型，交叉类型，元组，只能使用type
interface IVeg {
  readonly color: string;
  size: number;
  taste?: 'sweet' | 'sour' | 'bitter'; // 可选属性
}
let veg: IVeg = {
  color: 'red',
  size: 20,
};
// veg.color = 'green'; // 会报错
interface ICar {
  color: string;
  a: 1;
  b: 2;
}
type ValueOf = ICar[keyof ICar]; // 1 | 2 | string
export { name };
