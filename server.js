/*
 * @Author: Walker zw37520@gmail.com
 * @Date: 2025-03-27 11:14:44
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-27 11:44:17
 * @FilePath: /ts-classes/server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import express from "express";
import bodyParser from "body-parser";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,name",
  });
  next();
});

// 测试路由
app.get("/test", (req, res) => {
  res.json(req.query);
});

// 启动服务器
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

export {}; 