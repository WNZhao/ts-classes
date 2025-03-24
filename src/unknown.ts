// unknown 类型
// unknown 是any的安全类型，泛型没有指定类型时，默认是unknown
let a: unknown;
// 默认情况下 unknown 必须要进行类型检测才能使用（类型检查或断言）

// 类型断言
let b = a as string;

// unknown 不能直接调用方法 需要加断言

function processInput(val: unknown) {
  if (typeof val === 'string') {
    console.log(val.toUpperCase());
  } else if (typeof val === 'number') {
    console.log(val.toFixed(2));
  } else {
    console.log('unknown');
  }
}

let name: unknown = 'String字符串';
// name.toUpperCase(); // name是unknown类型，不能直接调用方法
(name as string).toUpperCase();

// unknown 在联合或交叉类型中的特点
type UnionType = unknown | string; // unknown 类型
type IntersectionType = unknown & string; // string 类型

let union: UnionType = 'String字符串';
let intersection: IntersectionType = 'String字符串';

export {};
