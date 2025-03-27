// 获取对象类型中的可选属性的联合类型
// @ts-nocheck
type OptionalKeys<T> = keyof {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};

type a1 = OptionalKeys<{
  foo: number | undefined;
  bar?: string;
  flag: boolean;
}>; // bar

type a2 = OptionalKeys<{ foo: number; bar?: string }>; // bar

type a3 = OptionalKeys<{ foo: number; flag: boolean }>; // never

type a4 = OptionalKeys<{ foo?: number; flag?: boolean }>; // foo|flag

type a5 = OptionalKeys<{}>; // never

// 获取对象类型中的必选属性
type PickRequired<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

type p1 = PickRequired<{
  foo: number | undefined;
  bar?: string;
  flag: boolean;
}>; // {foo:number|undefined, flag:boolean}

type p2 = PickRequired<{ foo: number; bar?: string }>; // {foo:number}

type p3 = PickRequired<{ foo: number; flag: boolean }>; // {foo:number,flag:boolean}

type p4 = PickRequired<{ foo?: number; flag?: boolean }>; // {}

type p5 = PickRequired<{}>; // {}

// 判断类型是否是 never
type IsNever<T> = [T] extends [never] ? true : false;

type A = IsNever<never>; // true
type B = IsNever<string>; // false
type C = IsNever<undefined>; // false
type D = IsNever<any>; // false

// 判断是否为没有属性的对象类型 {}
// @ts-nocheck
type x1 = keyof {}; // never

type IsEmptyType<T> = T extends object
  ? keyof T extends never
    ? true
    : false
  : false;

type EA = IsEmptyType<string>; // false
type EB = IsEmptyType<{ a: 3 }>; // false
type EC = IsEmptyType<{}>; // true
type ED = IsEmptyType<any>; // false
type EE = IsEmptyType<object>; // false
type EF = IsEmptyType<Object>; // false
type EG = IsEmptyType<unknown>; // false

// 判断类型是否是 any
// 可以将 unknown 赋予给 any
type IsAny<T> = unknown extends T ? true : false;

type IA = IsAny<string>; // false
type IB = IsAny<any>; // true
type IC = IsAny<unknown>; // false
type ID = IsAny<never>; // false

// @ts-nocheck
interface Action<T> {
  payload?: T;
  type: string;
}

interface Module {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}

// 这个要求的结果
type Result = {
  asyncMethod<T, U>(input: T): Action<U>;
  syncMethod<T, U>(action: T): Action<U>;
};

type Connect<T> = {
  [K in keyof T]: T[K] extends (
    input: Promise<infer A>
  ) => Promise<Action<infer B>>
    ? (input: A) => Action<B>
    : T[K] extends (action: Action<infer A>) => Action<infer B>
    ? (action: A) => Action<B>
    : T[K];
};

type F = Connect<Module>;

// 将联合类型转换为交叉类型
// @ts-nocheck
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => any
  ? I
  : never;

type UA = UnionToIntersection<{ a: string } | { b: string } | { c: string }>; // {a: string} & {b: string} & {c: string}

// 联合类型转换为元组类型
// @ts-nocheck
type UnionToTuple<T> = UnionToIntersection<
  T extends any ? (t: T) => T : never
> extends (_: any) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

type a1 = UnionToTuple<1 | 2 | 3>; // [1,2,3]
type a2 = UnionToTuple<1 | 2 | boolean | string>; // [1,2,boolean,string]

export {};
