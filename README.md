## 为了学习编译原理而写的一个玩具语言

### 运行

`npm install -g ts-node typescript` 切到文件目录 `ts-node 文件名`即可运行也可安装`Code Runner`插件右键 `Run Code`即可运行

### 调试

在根目录下运行`tsc --watch`生成 sourceMap 在 vscode 里面打上断点按 F5,运行环境选择 Node.js 即可开始调试

### 测试

根目录执行`yarn test` or `npm run test`即可
