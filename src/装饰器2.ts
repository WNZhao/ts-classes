import 'reflect-metadata';

class Person {
  @Required()
  name: string = 'person';
  age!: number;
  address: string = 'beijing';
}
// 1. 要求数据必填
//  a. 装饰器requried
//  b. validate来校验
const requiredMetadataKey = Symbol('required');
function Required() {
  return function (target: any, propertyKey: string) {
    // console.log(target, propertyKey);
    // 先记录那些属性，校验的时候来找phxf属性是否有值
    // 在记录的时候不要给属性添加，后续校验如果没有这个属性，那就找到这个记录
    const requiredKeys = Reflect.getMetadata(requiredMetadataKey, target) || [];
    Reflect.defineMetadata(
      requiredMetadataKey,
      [...requiredKeys, propertyKey],
      target
    );
  };
}

function validate(instance: object) {
  let existKeys = Object.keys(instance);
  let requiredKeys = Reflect.getMetadata(requiredMetadataKey, instance) || [];
  requiredKeys.forEach((key: string) => {
    if (!existKeys.includes(key)) {
      throw new Error(`${key} is required`);
    }
  });
}
const p = new Person();
p.name = 'walker';
validate(p);

// @ts-ignore 不管有没有错误，我都不管，丧失校验
// @!ts-expect-error 我确定一下行是报错的
// @ts-nocheck 丧失对此文件的校验
// @ts-check 开启校验 jsdoc使用
// 装饰器 + 反射无数据 = 可以做一些校验

export {};
