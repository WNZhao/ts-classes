/*
 * @Author: Walker zw37520@gmail.com
 * @Date: 2025-03-26 14:40:46
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-26 18:19:16
 * @FilePath: /ts-classes/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type ObjectAccessPaths<
  T,
  F extends string = '',
  K = keyof T
> = K extends keyof T
  ? T[K] extends object
    ? // 如果当前的值是对象继续递归拼接，并且将当前解析的key 拼接到结果集中
      ObjectAccessPaths<T[K], `${F}${K & string}.`>
    : `${F}${K & string}` // 这里会丢失不是对象的最后一个key,
  : never;

function createI18n<Schema>(
  schema: Schema
): (path: ObjectAccessPaths<Schema>) => void {
  return (key: string) => {};
}

const i18n = createI18n({
  home: {
    topBar: {
      title: '首页',
      welcome: '欢迎来到首页',
    },
    bottomBar: {
      notes: '笔记',
    },
  },
  login: {
    title: '登录',
    username: '用户名',
    password: '密码',
    login: '登录',
  },
});
i18n('home.topBar.title');
// i18n('home.topBar.title');
i18n('home.bottomBar.notes');
i18n('login.title');
i18n('login.username');
i18n('login.password');
i18n('login.login');
// i18n('login.password.login'); // 报错

// 判断传入的字符串字面量类型中是否含有某个字符串
type Includes<
  T extends string,
  S extends string
> = T extends `${infer L}${S}${infer R}` ? true : false;
type a1 = Includes<'hello', 'h'>; // true
type a2 = Includes<'hello', 'e'>; // true
type a3 = Includes<'hello', 'a'>; // false
type a4 = Includes<'', ''>; //true T extends "" && S extends ""

// trim
type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;
type TrimRight<T extends string> = T extends `${infer R} ` ? TrimRight<R> : T;
type Trim<T extends string> = TrimRight<TrimLeft<T>>;
type a5 = Trim<'  .hello  '>; // '.hello'

// 构建一个查找规则，找到后将左边和右边留起来${infer L}${S}${infer R}

type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${Replace<R, From, To>}`
  : S;

type aa1 = Replace<'hello world', 'world', 'walker'>; // 'hello walker'
type bb1 = Replace<'jwjw', 'jw', 'jiangwen'>; // 'jiangwenjiangwen'
type bb2 = Replace<'ha ha ha', 'ha', 'he'>; // 'he he he'
type aa2 = Replace<'jw', 'jw', 'jiangwen'>; // 'jiangwen'
type aa3 = Replace<'a', '', 'jiangwen'>; // 'jiangwenjiangwen'

type Replace1<T extends string,C extends string,RC extends string,F extends string = "">=
C extends ""? T extends ""?RC: `${RC}${T}`:T extends `${infer L}${C}${infer R}`? Replace1<R,C,RC,`${F}${L}${RC}`>:`${F}${T}`
type t1 = Replace1<"ha ha ha","ha","he">
type t2 = Replace1<"jw","jw","jiangwen">
type t3 = Replace1<"a","","jiangwen">
type t4 = Replace1<"","","jiangwen">
// 定义组件的监听事件类型
type EventType = {
  'handle-open': (flage: boolean) => true;
  'preview-item': (data: { item: any; index: number }) => true;
  'close-item': (data: { item: any; index: number }) => true;
};
// 实现type2
type ComponentEmitsType<T> = {
  [K in keyof T as `on${Capitalize<K>}`]: T[K] extends (...args: infer P) => any?(...args:P)=>void;
};
type EventType2 = ComponentEmitsType<EventType>;
// 转化为类型
/*
{
 onHandleOpen: (flage: boolean) => true;
 onPreviewItem: (data: { item: any; index: number }) => true;
 onCloseItem: (data: { item: any; index: number }) => true;
}
*/

export {};
