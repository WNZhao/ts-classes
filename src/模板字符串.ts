// 模板字符串类型 类似于js中的es6的模板字符串

// 可以将多个字符串类型进行组装
type name = 'jiangwen';
type age = 30;
type sayName = `handsome ${name} ${age}`; // 就是es6的模板字符，但它产生的是一个类型

// 模板字符串也是具备分发能力的
type Direction = 'top' | 'bottom' | 'right' | 'left';
type AllMargin = `margin-${Direction}`;
type AllPadding = `padding-${Direction}`;

// 也可以使用多对多
// 购物 sku 1.0 2.0 3.0 20.0
type Sku = '1.0' | '2.0' | '3.0';
type Sku2 = 20 | 30 | 40;

type IRL = `${Sku}-${Sku2}`;

// 放到字符串内的东西，需要结束，必须得能转化成字符串
type sayHello<T extends string | boolean | null | undefined | number | bigint> =
  `hello, ${T}`;

type R1 = sayHello<'jiang'>;
type R2 = sayHello<1>;
type R3 = sayHello<number>;

let val: R3 = 'hello 333';
type IFlog = R2 extends R3 ? true : false; // 所有的基础类型的模板字符串都是字面量类型的父类型（类型相同）

// 交对象的属性进行重新命名 {name,age,address} -> {r_name,r_age,r_address}
type Person = {
  name: string;
  age: number;
  address: string;
};

type Rename<T> = {
  [K in keyof T as `r_${string & K}`]: T[K];
};

type R11 = Rename<Person>;
let person: Person = {
  name: 'jiangwen',
  age: 30,
  address: 'beijing',
};
// 字符串可以支持工具类型 UpperCase 大写 LowerCase 小写 Capitalize 首字母大写 Uncapitalize 首字母小写
type WithGetter<T> = {
  [K in keyof T as `get${string & Capitalize<K>}`]: () => T[K];
};
let personGetter: WithGetter<Person> = {
  getName: () => {
    return person.name;
  },
  getAge: () => {
    return person.age;
  },
  getAddress: () => {
    return person.address;
  },
};

type PersonGetter = typeof personGetter;

// 根据模式匹配符来取类型 jinag wen
// infer 可以进行位置推断
type GetNameFirstChar<T> = T extends `${infer First}${infer Rest}`
  ? First
  : never;

type R12 = GetNameFirstChar<'jiangwen'>;

//

export {};
