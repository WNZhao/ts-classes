/*
 * @Author: Walker zw37520@gmail.com
 * @Date: 2025-03-24 20:59:56
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-25 11:41:45
 * @FilePath: /ts-classes/typings/global.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare let age: number;

//这里只是有类型声明，不应该有具体的实现，只是为了防止编辑器报错而已
declare function getName(): string;

declare class Person {
  name: string;
  age: number;
}

declare enum Season {
  Spring,
  Summer,
  Autumn,
  Winter,
}
