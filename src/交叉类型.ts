/*
 * @Author: Walker zw37520@gmail.com
 * @Date: 2025-03-19 15:37:04
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-22 15:12:06
 * @FilePath: /ts-classes/src/交叉类型.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// & 交叉类型 | 联合类型
// 将多个类型合并成一个类型

interface Person1 {
  handsome: string;
}

interface Person2 {
  high: string;
}

// 又高又帅的人 （交叉类型）
type Person = Person1 & Person2;

const person: Person = {
  handsome: '帅',
  high: '高',
};
// 交叉类型可以赋给任意的父类型

export {};
