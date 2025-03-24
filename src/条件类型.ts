/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-19 16:38:25
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-19 19:38:44
 * @FilePath: /ts-classes/src/条件类型.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 条件类型
// 条件类型是TS中的一种类型运算符，它根据条件表达式的结果来选择不同的类型

type ResStatusMessage<T extends number> = T extends 200 | 204 | 206
  ? 'success'
  : 'error';

// type R1 = ResStatusMessage<'abc'>; // 状态码肯定是数字，这样传也不会报错
type R2 = ResStatusMessage<200>; // 状态码肯定是数字，这样传也不会报错

type Condition<T, U> = T extends U ? 'success' : 'fail';
type R3 = Condition<'abc', string>; // 类型推断为'success'
type R4 = Condition<'abc', number>; // 类型推断为'fail'

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

type ConditionType<T> = T extends Bird ? Sky : Water;

type R5 = ConditionType<Bird>; // 类型推断为Sky
type R6 = ConditionType<Fish>; // 类型推断为Water

type FromatReturnType<T extends string | number> = T extends number
  ? number
  : T extends string
  ? string
  : never;
// 泛型一般代表输入是不是确定（无限的）约束， 函数重载（有限的）
function sum<T extends number | string>(a: T, b: T): FromatReturnType<T> {
  // function sum<T extends number | string>(a: T, b: T):T {
  // 如果返回值是number类型，则返回number类型，如果返回值是string类型，则返回string类型 ，但这里不能写返回值T
  return a + (b as any); // T+T 不能确定 ,两个泛型不能做数据运算
}

let r1 = sum(1, 2);
let r2 = sum('1', '2');

// 我们知道条件运算符，就可以掌握ts中的兼容性，以及类型的层级

// 类型层级
// 1. 基础类型
// 2. 复合类型
// 3. 函数类型
// 4. 类类型

//兼容性：可以将一个值赋予给某个值
// 类型层级 低的层级可以赋予给高的层级
