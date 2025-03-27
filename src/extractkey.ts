/*
 * @Author: Walker zw37520@gmail.com
 * @Date: 2025-03-25 11:45:35
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-25 14:00:10
 * @FilePath: /ts-classes/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// PartialPropsOptional

// 1. Partial
// 2. Optional
// 3. Readonly
// 4. Pick
// 5. Omit

// Partial
// 将对象的属性变为可选的

interface Person {
  name: string;
  age: number;
  address: string;
}

type PartialPropsOptional<T extends Object, K extends keyof T> = Partial<
  Pick<T, K>
> &
  Omit<T, K>;

type Computed<T> = {
  [K in keyof T]: T[K];
};

type p1 = Computed<PartialPropsOptional<Person, 'age' | 'address'>>;

// 如何通过值类型拿到key
//将类型相同的进映射{name:"name",age:"never",address:"address"}
// name | never | address --> name | address
// 如何判断两个类型是否相同
type isEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

type PickKeysByValue<T, V> = {
  // [K in keyof T]: T[K] extends V ? K : never;
  [K in keyof T]: isEqual<T[K], V> extends true ? K : never;
}[keyof T];

type OmitKeysByValue<T, V> = {
  [K in keyof T]: isEqual<T[K], V> extends true ? never : K;
}[keyof T];

type p2 = Computed<PickKeysByValue<Person, string>>; // 应该拿到name address
type p3 = Computed<OmitKeysByValue<Person, string>>; // 应该拿到age

// 模板字符串，里面有一个很重要的功能，重映射
type PickKeysByValue2<T, U> = {
  // 直接将对象的属性就给忽略掉了
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type p4 = PickKeysByValue2<Person, string>;

export {};
