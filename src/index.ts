/*
 * @Author: Walker zw37520@gmail.com
 * @Date: 2025-03-27 11:10:49
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-27 12:22:11
 * @FilePath: /ts-classes/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:8080';

// 发磅get 和post请求
interface IPerson {
  name: string;
  age: number;
}
let person: IPerson = {
  name: 'Walker',
  age: 20,
};

let requestConfig: AxiosRequestConfig = {
  url: `${baseUrl}/test`,
  method: 'get',
  params: person,
};

// 1. get请求 希望的返回值也是person
// axios<IPerson>(requestConfig).then((res) => {
//   console.log(res.data);
// });
axios(requestConfig)
  .then((res: AxiosResponse<IPerson>) => {
    console.log(res.data);
  })
  .catch((error: any) => {
    console.log(error);
  });
