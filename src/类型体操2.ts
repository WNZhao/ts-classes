/*
 * @Author: Walker zw37520@gmail.com
 * @Date: 2025-03-25 14:29:39
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-26 16:02:18
 * @FilePath: /ts-classes/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 模式匹配类型，抢断函数类型中参数的最后一个参数类型
function sum(a: string, b: string, c: number) {}
type LastParam<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P extends [...any[], infer L]
    ? L
    : never
  : never;
type X = LastParam<typeof sum>;

// 首字母大写
// export type CapitalizeString<T> = T extends string
//   ? `${Capitalize<T & string>}`
//   : T;
// 默认情况，字符串的infer只匹配第一个字符
// 针对字符的infer 默认infer第一个指代的是第一个字符，后面的就是所有的
// 如果有分隔符号，指代的就是分隔符之前的
export type CapitalizeString<T> = T extends `${infer First}${infer Rest}`
  ? `${Capitalize<First>}${Rest}`
  : T;
type a1 = CapitalizeString<'handler'>;
type a2 = CapitalizeString<'parent'>;
type a3 = CapitalizeString<223>;

// 获取字符串的字面量中的第一个字符
type FirstChar<T extends string> = T extends `${infer L}${infer R}` ? L : T;
type A = FirstChar<'BFE'>; // B
type B = FirstChar<'dev'>; // BFE
type C = FirstChar<'234'>; // 234

// lastchar
type LastChar<T, F = never> = T extends `${infer L}${infer R}`
  ? LastChar<R, L>
  : F;
type A1 = LastChar<'BFE'>; // E
type B1 = LastChar<'dev'>; // v
type C1 = LastChar<'234'>; // 4

// string toTuple(元组)
type StringToTuple<T extends string> = T extends `${infer L}${infer R}`
  ? [L, ...StringToTuple<R>]
  : [];
type A2 = StringToTuple<'BFE'>; // ['B', 'F', 'E']
type B2 = StringToTuple<'dev'>; // ['d', 'e', 'v']
type C2 = StringToTuple<'234'>; // ['2', '3', '4']

// 元组转字符串
type TupleToString<T extends string[]> = T extends [infer L, ...infer R]
  ? `${L}${TupleToString<R>}`
  : '';
type A3 = TupleToString<['B', 'F', 'E']>; // 'BFE'
type B3 = TupleToString<['d', 'e', 'v']>; // 'dev'
type C3 = TupleToString<['2', '3', '4']>; // '234'

// repeat string
type RepeatString<
  T extends string,
  C extends number,
  A extends any[],
  F extends string = ''
> = C extends A['length'] ? F : RepeatString<T, C, [...A, any], `${F}${T}`>;
type A4 = RepeatString<'a', 3, [], ''>; // 'aaa'
type B4 = RepeatString<'a', 0, [], ''>; // ''
type C4 = RepeatString<'a', -1, [], ''>; // ''

// split string
type SplitString<
  T extends string,
  S extends string,
  A extends any[]
> = T extends `${infer L}${S}${infer R}`
  ? SplitString<R, S, [L, ...A]>
  : [...A, T];
type A5 = SplitString<'handle-open-flag', '-', []>; // ['handle', 'open', 'flag']
type B5 = SplitString<'open-flag', '-', []>; // ['open', 'flag']
type C5 = SplitString<'BFE.dev.fe.js', '.', []>; // ['BFE', 'dev', 'fe', 'js']
type D5 = SplitString<'BFE.dev.fe.js', '-', []>; // ['BFE.dev.fe.js']

// 计算字符串字面量的长度
type StringLength<
  T extends string,
  A extends any[]
> = T extends `${infer L}${infer R}` ? StringLength<R, [L, ...A]> : A['length'];
type A6 = StringLength<'BFE.dev', []>; // 7
type B6 = StringLength<'dev', []>; // 3
type C6 = StringLength<'', []>; // 0

// 驼峰命名转横杠命名
// 如何匹配大写？ Capitalize<H> extends H
// 把大写变成--> -小写
type RemoveFirstLetter<T extends string> = T extends `-${infer V}` ? V : T;
type KebabCase<
  T extends string,
  F extends string = ''
> = T extends `${infer L}${infer R}`
  ? L extends Capitalize<L>
    ? KebabCase<R, `${F}-${Lowercase<L>}`>
    : KebabCase<R, `${F}${L}`>
  : RemoveFirstLetter<F>;
type aa1 = KebabCase<'HandleOpenFlag'>; // handle-open-flag
type aa2 = KebabCase<'OpenFlag'>; // open-flag

// 横杠命名转驼峰命名
type CamelCase<
  T extends string,
  F extends string = ''
> = T extends `${infer L}-${infer R1}${infer R2}`
  ? CamelCase<R2, `${F}${L}${Capitalize<R1>}`>
  : Capitalize<`${F}${T}`>;

type Bb1 = CamelCase<'handle-open-flag', ''>; // HandleOpenFlag
type Bb2 = CamelCase<'open-flag', ''>; // OpenFlag

export {};
