// 计算元组类型的长度
type LengthOfTuple<T extends any[]> = T extends { length: infer L } ? L : never;
type A = LengthOfTuple<[1, 2, 3, 4, 5]>;
type B = LengthOfTuple<[]>;

// 元组第一项
type FirstItem<T extends any[]> = T extends [infer F, ...infer R] ? F : never;
type C = FirstItem<[1, 2, 3, 4, 5]>;
type D = FirstItem<[]>;

// 元组最后一项
type LastItem<T extends any[]> = T extends [...infer R, infer L] ? L : never;
type E = LastItem<[1, 2, 3, 4, 5]>;

// 移除元组第一项
type RemoveFirstItem<T extends any[]> = T extends [infer F, ...infer R]
  ? R
  : never;
type F = RemoveFirstItem<[1, 2, 3, 4, 5]>;
type G = RemoveFirstItem<[]>;

// 移除元组最后一项
type RemoveLastItem<T extends any[]> = T extends [...infer R, infer L]
  ? R
  : never;
type I = RemoveLastItem<[1, 2, 3, 4, 5]>;
type J = RemoveLastItem<[]>;

// push
type Push<T extends any[], V> = [...T, V];
type H = Push<[1, 2, 3, 4, 5], 6>;

// 反转元组 反转链表
type ReverseTuple<T extends any[]> = T extends [infer F, ...infer R]
  ? [...ReverseTuple<R>, F]
  : T;
type K = ReverseTuple<[1, 2, 3, 4, 5]>;
type L = ReverseTuple<[string, number, boolean]>;
type M = ReverseTuple<[]>;

// flatten 扁平化
type Flatten<T extends any[]> = T extends [infer F, ...infer R]
  ? [...(F extends any[] ? Flatten<F> : [F]), ...Flatten<R>]
  : T;
type N = Flatten<[1, [2, [3, [4, [5]]]]]>;
type O = Flatten<[[1, 2], [3, 4], [5, 6]]>;
type P = Flatten<[1]>;
type Q = Flatten<[]>;

// repeat
type Repeat<T, C extends number, F extends any[] = []> = C extends F['length']
  ? F
  : Repeat<T, C, [...F, T]>;
type A1 = Repeat<number, 3>; //[number,number,number]
type A2 = Repeat<string, 2>; //[string,string]
type A3 = Repeat<boolean, 1>; //[boolean]

// 过滤指定类型
type Filter<T extends any[], U, F extends any[] = []> = T extends [
  infer L,
  ...infer R
]
  ? // 如果需要则放到数组里，不需要返回原来
    Filter<R, U, [L] extends [U] ? [...F, L] : F>
  : F;
type A4 = Filter<[1, 'BEF', 2, true, 'dev'], number>; // [1,2]
type A5 = Filter<[1, 'BEF', 2, true, 'dev'], string>; // ["BEF","dev"]
type A6 = Filter<[1, 'BEF', 2, true, 'dev'], boolean>; // [true]
type A7 = Filter<[1, 'BEF', 2, any, 'dev'], string>; // ["BFE",any,'dev']

// FindIndex
type IsEqual<A, B, Success, Faile> = [A] extends [B]
  ? [B] extends [A]
    ? keyof A extends keyof B
      ? keyof B extends keyof A
        ? Success
        : Faile
      : Faile
    : Faile
  : Faile;
type FindIndex<T extends any[], U, F extends any[] = []> = T extends [
  infer L,
  ...infer R
]
  ? IsEqual<L, U, F['length'], FindIndex<R, U, [...F, L]>>
  : never;

type A8 = [any, never, 1, '2', true];
type A9 = FindIndex<A8, 1>; // 2
type A10 = FindIndex<A8, 3>; // never
type A11 = FindIndex<A8, true>; // 4
type A12 = FindIndex<A8, string>; // never

// 元组转成枚举，枚举对象中的值就是元素中某个元素中某个类型的字面量类型
type a1 = TupleToEnum<['MacOS', 'Windows', 'Linux']>;
// {readonly MacOS: "MacOS"; readonly Windows: "Windows"; readonly Linux: "Linux"}
// 如果传递了第二个参数为true,则枚举对象中值的类型是元素在元组中的index索引
type a2 = TupleToEnum<['MacOS', 'Windows', 'Linux'], true>;
// {readonly MacOS: 0; readonly Windows: 1; readonly Linux: 2}

type TupleToEnum<T extends any[], I extends boolean = false> = {
  readonly [K in T[number]]: IsEqual<I, true, FindIndex<T, K>, K>;
};

// slice
// 如果没有达到开头的长度，就要记录找到了多少个元素
type Slice<
  T extends any[],
  S extends number,
  E extends number = T['length'],
  SA extends any[] = [],
  SE extends any[] = [],
  F extends any[] = []
> = T extends [infer L, ...infer R]
  ? SA['length'] extends S
    ? SE['length'] extends E
      ? [...F, L]
      : Slice<R, S, E, SA, [...SE, null], [...F, L]>
    : Slice<R, S, E, [...SA, null], [...SE, null], F>
  : F;

type S1 = Slice<[any, never, 1, '2', true, boolean], 0, 2>; // [any,never,1]
type S2 = Slice<[any, never, 1, '2', true, boolean], 1, 3>; // [never,1,'2']
type S3 = Slice<[any, never, 1, '2', true, boolean], 1, 2>; // [never,1]
type S4 = Slice<[any, never, 1, '2', true, boolean], 2>; // [1,'2',true,boolean]
type S5 = Slice<[any], 2>; // []
type S6 = Slice<[], 0>; // []

// splice 删除并替换元素
type Splice<
  Arr extends any[],
  Start extends number,
  Count extends number = 0,
  Replace extends any[] = [],
  StartCount extends any[] = [],
  CountArr extends any[] = [],
  Result extends any[] = []
> = StartCount['length'] extends Start
  ? CountArr['length'] extends Count
    ? [...Result, ...Replace, ...Arr]
    : Arr extends [infer First, ...infer Rest]
    ? Splice<Rest, Start, Count, Replace, StartCount, [...CountArr, 0], Result>
    : Result
  : Arr extends [infer First, ...infer Rest]
  ? Splice<
      Rest,
      Start,
      Count,
      Replace,
      [...StartCount, 0],
      CountArr,
      [...Result, First]
    >
  : Result;

type SP1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>; // [boolean,null,undefined,never]
type SP2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>; // [string,undefined,never]
type SP3 = Splice<
  [string, number, boolean, null, undefined, never],
  1,
  2,
  [1, 2, 3]
>; // [string,1,2,3,null,undefined,never]

export {};
