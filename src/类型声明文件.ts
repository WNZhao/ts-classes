/*
 * @Author: Walker zw37520@gmail.com
 * @Date: 2025-03-24 20:55:04
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-24 21:01:40
 * @FilePath: /ts-classes/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 类型声明
// 有些代码使用cdn引入的，或者有些包使用js来写的没有提示，有些模块引入的格式不是js或者ts(图片啥的)，导入后没有类型提示
// 添加声明文件，为了统一管理而且不影响核心代码，我们将声明的内容都放入到.d.ts文件中, ts默认会检测当前目录所有的.d.ts文件
// 比如我把它声明到types.d.ts文件中，那么ts会自动检测到这个文件，然后进行类型推断

console.log(age);

export {};
