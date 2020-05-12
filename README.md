# Postman-run

# 使用

nodejs
```bash
node test\test2.js
```

nodejs 入参
```bash
node test/test.js ec827246-0b23-44a0-a5e3-05c8220c312d 5 7 2 2 15959950529 TSN false false
```


mocha
```bash
mocha
```

# 常见问题：
1.执行node命令行，jenkins job console界面只会体现nodejs脚本中console.log 并不会体现出Postman collection json 前置脚本或后置脚本的console.log。
解决办法：
在Postman collection json 后置脚本中使用断言。
```bash
tests[`创建失败，原因：${json.msg}`] = false;
```

