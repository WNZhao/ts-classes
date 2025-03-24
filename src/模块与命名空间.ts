// 模块和命名空间

// 模块叫外部模块 命名空间叫内部模块
//  目前我们主要采用es6的模块来创建作用域（按照文件来创建作用域） 当我们使用import 和 export 来导入和导出模块时，ts会自动帮我们进行类型推断 将其变成一个模块

// 模块的导出和导入
// 1. 导出
// 2. 导入
// 3. 导出和导入
// 4. 导出和导入
// 打包后会有一些常见的模块规范 esm(es6 module) commonjs 和 umd(universal module definition) amd(asynchronous module definition)
// commonjs 是nodejs的模块规范 它使用require来导入模块 使用module.exports来导出模块
// esm 是es6的模块规范 它使用import来导入模块 使用export来导出模块
// umd 是通用模块定义 它可以在多种环境下使用 包括浏览器和nodejs
// amd 是异步模块定义 它使用define来定义模块 使用require来导入模块
// commonjs 不能转换为 esm 需要使用babel来转换
// commonjs 不能转换为amd 需要使用babel来转换
// 模块不会混用，es6下引用commonjs的模块引用
//在ts语法中有一种模块化方式 (export = | import xx = )
export {};
