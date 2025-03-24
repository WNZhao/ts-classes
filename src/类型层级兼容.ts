// 类型层级
// 1. 基础类型
// 2. 复合类型
// 3. 函数类型
// 4. 类类型

// 我们知道了 条件运算符 就可以掌握ts中的兼容性 以及类型的层级
// 兼容性： 就是可以将一个值赋予给某个值
// 类型层级： 低的层级可以赋予给高的层级
// 理论，谁是父类型，谁是子类型
type R1 = 'abc' extends string ? true : false;
type R2 = 123 extends number ? true : false;
type R3 = true extends boolean ? true : false;
// 实战 'abc' 是字符串类型， 123 是数字类型， true 是布尔类型
let r1: string = 'abc';
let r2: number = 123;

type R4 = 'a' extends 'a' | 'b' | 'c' ? true : false;
type R5 = 1 extends 1 | 2 | 3 ? true : false;
type R6 = true extends true | false ? true : false;

//
// 字面量类型可以赋值字面量联合类型
let r4: 'a' | 'b' | 'c' = 'a';

// 包装类型可以赋值给基础类型
// let r5: string = new String('abc');

// 包装类型
type R7 = string extends String ? true : false;
type R8 = String extends string ? true : false;
type R9 = number extends Number ? true : false;
type R10 = Number extends number ? true : false;
type R11 = boolean extends Boolean ? true : false;
type R12 = Boolean extends boolean ? true : false;

type R13 = Object extends any ? true : false;
type R14 = Object extends unknown ? true : false;
type R15 = never extends 'abc' ? true : false;

// never 是最小的类型
// 字面量类型可以赋予给字面量闻合类型
// 字面量类型可以赋予给基基础类型
// 基础类型是包装类型的子类型
// any unknown 是最大的类型
// never<字面量类型<字面量联合类型<基础类型<包装类型<Object<any unknown
type R16 = any extends string ? true : false; // true和false的联合类型是boolean
// 针对any类型永远返回的是成功和失败的联合类型;
// 低哦打可以赋予高的类型，
// 从结构上考虑 交叉类型，可以赋予 交叉前类型
// ts默认的 大小object是一样的 Object extends object? true:false  反过来不一样
// 结构上比你多，就可以赋予你
// 级别上 低级别可以赋予高级别
export {};
