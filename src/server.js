import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import http from "http";
// import https from "https";

import viewRouter from "./router/viewRouter";

const site = express();

// const privateKey  = fs.readFileSync(path.join(__dirname, '../src/plugin/key/private.key'), 'utf8');
// const certificate = fs.readFileSync(path.join(__dirname, '../src/plugin/key/certificate.crt'), 'utf8');
// const credentials = {key: privateKey, cert: certificate};

// const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(site);

site.use(bodyParser.urlencoded({ extended: true , limit:'50mb'}));
site.use(bodyParser.json());
site.use(express.static(__dirname + "/static/www"));

site.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// app.use((req, res, next) => {
//     if (req.secure) {
//         next();
//     } else {
//         res.redirect('https://' + req.headers.host + req.url);
//     }
// });
  
// app.use("/api" , apiRouter);
site.use("/" , viewRouter);

httpServer.listen(80, () => {
    console.log("服务器启动成功!\n端口:80");
});
// httpsServer.listen(3000, () => {
//     console.log("Server starting! port:3000");
// });
