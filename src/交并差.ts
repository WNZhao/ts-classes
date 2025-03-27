// 对象的 交差并补
type A = {
  name: string;
  age: number;
  address: string;
};

type B = {
  name: string;
  male: boolean;
  address: number;
};

// 交集
type ObjIntersect<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U>
>;
type p1 = ObjIntersect<A, B>;

// 差集
type ObjectDiff<T extends object, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;
type R2 = ObjectDiff<A, B>;

// 补集 就是差集，要求是有父子关系
type ObjectCom<T extends U, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;
// type R3 = ObjectCom<B,A>

// 重写 以后面的类型为准 再加上以前比现在多的类型
type Overwrite<T extends object, U extends object> = ObjIntersect<U, T> &
  ObjectDiff<T, U>;
type Computed<T> = {
  [K in keyof T]: T[K];
} & {};
type R4 = Computed<Overwrite<A, B>>;
export {};
