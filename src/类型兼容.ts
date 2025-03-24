// 鸭子类型检测，结构化类型检测
// 子类型可以赋予给父类型，从结构角度出发 ts比较的不是类型的名称，而这个结构上的属性和方法
// 基础类型的兼容性
let obj = {
  toString: () => '123',
};
let str: string = '234';

obj = str; // 从安全的角度，你要的属性我都满足 有其它属性，我就不兼容了
// 2. 接口兼容性
interface Person {
  name: string;
  age: number;
}
interface Animal {
  name: string;
  age: number;
  address: string;
}
let p: Person = { name: 'jw', age: 100 };
let a: Animal = { name: 'jw', age: 100, address: 'beijing' };

p = a; // 从安全的角度，你要的属性我都满足 有其它属性，我就不兼容了
// 3. 函数兼容性
type Func = (a: number, b: number) => void;
let f1: Func = (a, b) => {};
let f2: Func = (a, b) => {}; //参数只能少，不能多 （比如我们使用forEach

f1 = f2; // 从安全的角度，你要的参数我都满足 有其它参数，我就不兼容了

// 4. 类兼容性
class A {
  constructor(public name: string) {}
}
class B {
  constructor(public name: string, public age: number) {}
}
let a1 = new A('jw');
let b1 = new B('jw', 100);

a1 = b1; // 从安全的角度，你要的属性我都满足 有其它属性，我就不兼容了

// 函数的逆变与协变 函数的参数是逆变，返回值是协变
class Parent {
  house() {}
}
class Child extends Parent {
  car() {
    console.log('child car');
  }
}
class GrandSon extends Child {
  money() {
    console.log('grandson money');
  }
}

function fn(callback: (instance: Child) => Child) {
  let child = new Child();
  let ins = callback(child);
  return ins;
}
// 为什么赋予的函数，可以写Parent类型，但不能写GrandSon类型, 内部调用的时候传递的是Child类型,在拿到这个实例时不能访问Child访问不到的属性
fn((instance: Child) => {
  return new Child();
});

// 返回值应该返回值类型的子类型（分别在不同的角度看）
fn((instance: Child) => {
  return new GrandSon();
});
// 对于函数的兼容性而言，参数个数要少，传递可以是父类，返回值可以返回儿子
// 推导公式
type Arg<T> = (arg: T) => void;
type Return<T> = (arg: any) => T;
type ArgType = Arg<Parent> extends Arg<Child> ? true : false; // 逆变
type ReturnType = Return<GrandSon> extends Return<Child> ? true : false; // 协变

// 所以函数的参数是逆变，返回值是协变，

// 枚举是不具备的兼容性的
// ts比较类型结构时，比较的是属性和方法，如果属性和方法都满足，那么就具备兼容性

// 通过交叉类型，实现标称类型
type Normal<T, K extends string> = T & { __type__: K };
type BTC = Normal<number, 'BTC'>;
type ETH = Normal<number, 'ETH'>;
type USDT = Normal<number, 'USDT'>;

let btc: BTC = 100 as BTC;
let eth: ETH = 200 as ETH;
let usdt: USDT = 300 as USDT;

function getVal(val: BTC) {
  return val.valueOf();
}

getVal(btc); //传其它就报错了

export {};
