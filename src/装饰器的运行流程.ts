/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-03-22 13:42:13
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-22 14:22:18
 * @FilePath: /ts-classes/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function Echo(val: string) {
  return function (
    target: any,
    propertyKey?: string | symbol,
    descriptorOrIndex?: PropertyDescriptor | number
  ): any {
    if (typeof descriptorOrIndex === 'number') {
      // 参数装饰器
      console.log('参数装饰器:', val, target, propertyKey, descriptorOrIndex);
    } else if (descriptorOrIndex instanceof Object) {
      // 方法装饰器
      console.log('方法装饰器:', val, target, propertyKey, descriptorOrIndex);
    } else {
      // 类装饰器
      console.log('类装饰器:', val, target);
    }
  };
}

@Echo('类的装饰器4')
@Echo('类的装饰器3')
@Echo('类的装饰器2')
@Echo('类的装饰器1')
class Flow {
  // 装饰器是下往上执行
  constructor(@Echo('构造器参数装饰') val: string) {
    console.log('构造器');
  }
  @Echo('原型方法装饰')
  handle(@Echo('原型方法参数装饰') val: string) {
    console.log('方法');
  }
  @Echo('静态属性装饰器')
  static age: number = 18;
  @Echo('静态方法装饰')
  static handle(@Echo('静态方法参数装饰') val: string) {
    console.log('静态方法');
  }
  @Echo('实例属性装饰器')
  name: string = '张三';
  @Echo('实例原型方法')
  handler(@Echo('实例原型方法参数装饰') val: string) {
    console.log('实例原型方法');
  }
}

// 【实例属性、方法、属性访问，定义在前端的先执行】 【静态属性、方法、属性访问，定义在前面的先执行】 【类装饰器】
// 本质 就是一个函数对内容不停的包裹，洋葱模型
// 装饰器一般会搭配反射来使用
// 什么是元数据（描述数据的数据）
// 装饰器是元数据的一种实现
// 反射 需要第三方库来使用reflect-metadata
export {};
