/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-19 19:45:23
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-20 13:37:01
 * @FilePath: /ts-classes/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 条件类型在函数中的应用
interface Bird {
  fly: () => void;
}
interface Sky {
  name: '天空';
}
interface Fish {
  swim: () => void;
}
interface Water {
  name: '水';
}

type Condition = Fish | Bird extends Fish ? 'success' : 'fail'; // 类型推断为'fail' 没有分发
type Condition2<T> = T extends Fish ? 'success' : 'fail'; // 类型推断为'success' 分发

type C3 = Condition2<Fish>; // success
// 分发就是挨个去比较
// Condition2<Bird> fail
// Condition2<Fish> success
type C4 = Condition2<Bird | Fish>; // success | fail
// 默认情况下有些时候我们需要关闭这种分发能力，会造成判断不准确
// 怎么消除这个分发类型 T & {}
type NoDistribute<T> = T & {};
// 不是裸类型，需要&{} 就丧失分发的能力，还可以加数组
type Condition5<T, U> = [T] extends [U] ? true : false;
type R5 = Condition5<1 | 2, 1>; // false

// T & {} 可以消除分发能力 什么也没发生，只是为了T产生一个新类型
type IsNever<T> = T extends never ? true : false;
type R6 = IsNever<never>; // never 直接返回 never 数组包裹一下就是true了

//  内置类型
// 1. Extract 提取
type Extract<T, U> = T extends U ? T : never;
type R7 = Extract<1 | 2, 1>; // 1 分发 判断
// 2. Exclude 排除
type Exclude<T, U> = T extends U ? never : T;
type R8 = Exclude<1 | 2, 1>; // 2 分发 判断

// 3. NonNullable 非空
type NonNullable<T> = T extends null | undefined ? never : T;
type R9 = NonNullable<string | null>; // string

// 4. ReturnType 返回类型 infer 推断 可以在条件类型中推断出返回类型的某一部分
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type R10 = ReturnType<() => string>; // string

// 5. Parameters 参数类型
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
type R11 = Parameters<(name: string, age: number) => string>; // [string, number]

// 6. ConstructorParameters 构造函数参数类型
type ConstructorParameters<T> = T extends new (...args: infer P) => any
  ? P
  : never;
type R12 = ConstructorParameters<Error>; // [message?: string | undefined]

// 7. Partial 可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type R13 = Partial<{ name: string; age: number }>; // { name?: string; age?: number }

// 条件类型在数组中的应用

// 条件类型在函数中的应用
type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
type R221 = IsEqual<1, 2>; // false
type R3 = IsEqual<1, 1>; // true

type Swap<T> = T extends [infer A, infer B] ? [B, A] : T;
type R1 = Swap<['jw', 30]>; // 30 'jw'
// 头尾交换
type SwapHeadTail<T> = T extends [infer A, ...infer B, infer C]
  ? [C, ...B, A]
  : T;
type R2 = SwapHeadTail<[1, 2, 3, 4, 5]>; // [5, 2, 3, 4, 1]

// 条件类型在字符串中的应用
type IsString<T> = T extends string ? true : false;
type R14 = IsString<'jw'>; // true

// 条件类型在函数重载中的应用
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;
type R15 = IsFunction<() => void>; // true

// promise的递归
type PromiseReturnType<T> = T extends Promise<infer P>
  ? PromiseReturnType<P>
  : T;

function getVal(): Promise<number> {
  return new Promise((resolve) => {
    resolve(100);
  });
}
type R16 = PromiseReturnType<ReturnType<typeof getVal>>; // true
// 通过infer来实现递归推导
// 将元组转化成联合类型[number,boolean,string] => number | boolean | string
type TupleToUnion<T> = T extends [infer A, ...infer B]
  ? A | TupleToUnion<B>
  : T;
type R17 = TupleToUnion<[number, boolean, string]>; // number | boolean | string

// 将联合类型转化成元组类型
type UnionToTuple<T> = T extends infer P ? [P] : never;
type R18 = UnionToTuple<number | boolean | string>; // [number] | [boolean] | [string]

// 重构类型结构 Partial Required Readonly Pick Omit Record

interface Person {
  name: string;
  age: number;
  gender: string;
}
let person: Partial<Person> = {
  name: 'jw',
};

function mixin<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}
let p = mixin({ name: 'jw' }, { age: 100 });
let x = mixin(
  { name: 'jiangwen', age: 30, c: 3 },
  { name: 123, age: 30, b: 2 }
);
// 出现交叉类型了，没有按目标合并，比如保留后面的内容
// 针对这种情况，应用将B有的属性在A中的移除
function mixin2<T, U>(a: T, b: U): Omit<T, keyof U> & U {
  return { ...a, ...b };
}
let y = mixin2(
  { name: 'jiangwen', age: 30, c: 3 },
  { name: 123, age: 30, b: 2 }
);

type nameType = (typeof y)['name'];

// 保想要key-->value 的结构 一些映射类型
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
type R19 = Record<'a' | 'b', string>; // { a: string; b: string }

export {};
