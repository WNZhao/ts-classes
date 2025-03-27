// 子类型互斥 OrType.ts
interface Man1 {
  fortune: string;
}
interface Man2 {
  funny: string;
}
interface Man3 {
  foreign: string;
}

type ManType = Man1 | Man2 | Man3; // 希望ManType只是其中的一种类型
let man: ManType = {
  fortune: '富有',
  funny: '风趣',
  foreign: '洋派',
}; // 希望ManType只是其中的一种类型
// man1-man2 将man1的属性标记成never +man2
// man2-man1 将man2的属性标记成never +man1
type DiscardType<T, U> = {
  [K in Exclude<keyof T, keyof U>]?: never;
};
type OrType<T, U> = (DiscardType<T, U> & U) | (DiscardType<U, T> & T);
type manType2 = OrType<Man3, OrType<Man1, Man2>>;
let man2: manType2 = {
  fortune: '富有',
};

export {};
