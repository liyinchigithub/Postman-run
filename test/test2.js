const newman = require('newman');
var Sandbox = require('postman-sandbox'), context;
var CreateOrder=require("../environment/CreateOrder");//引入环境变量对象


newman.run({
    // Postman collection 脚本文件路径，也可以是一个url地址
    collection: require('../postmanCollection/OpenAPICreateData.postman_collection.json'), // 作为string，可以提供一个URL，可以在其中找到Collection JSON（例如Postman Cloud API服务）或本地JSON文件的路径。
    // Postman environment 环境变量文件路径，也可以是一个url地址，也可以是一个对象
    // environment:require('../postmanCollection/openApi.postman_environment.json'),
    environment: {
        "id": "2fe5997e-dcda-4b4d-8b77-77256c5e1cd5",
        "name": "OpenApi",
        "values": CreateOrder
    },
    iterationCount: 1,// 指定要在集合上运行的迭代次数。通常会附带提供数据文件引用，例如options.iterationData。类型：number 默认1
    iterationData: "",// （变量参数化）在集合上运行多个迭代时，用作数据源的JSON或CSV文件或URL的路径。类型：string
    folder: "",// 集合中要运行的文件夹/文件夹（ItemGroup）的名称或ID，而不是整个集合。类型：string|array
    workingDir: "",// 用作工作目录的目录路径件。 类型：string，默认值：Current Directory
    insecureFileRead: true,// 允许读取工作目录之外的文件。 类型：boolean，默认值：true
    timeout: 60000,// 指定等待整个集合运行完成执行的时间（毫秒）。类型：number，默认值：Infinity 
    timeoutRequest: 10000,// 指定等待请求返回响应的时间（以毫秒为单位）。类型：number，默认值：Infinity
    timeoutScript: 10000,// 指定等待脚本返回响应的时间（以毫秒为单位）。类型：number，默认值：Infinity
    delayRequest: 0,//	指定后续请求之间要等待的时间（以毫秒为单位）。类型：number，默认值：0
    ignoreRedirects: false,// 这指定了newman是否将自动跟踪服务器的3xx响应。类型：boolean，默认值：false
    insecure: false,// 禁用SSL验证检查，并允许自签名SSL证书。类型：boolean，默认值：false
    bail: false,// 一个开关，用于指定在遇到第一个错误时是否优雅地停止集合运行（在完成当前测试脚本之后）。采用其他修饰符作为参数，以指定是否以无效的名称或路径错误结束运行。 类型：boolean|object，默认值：false
    suppressExitCode: false,// 如果存在，则允许覆盖当前收集运行中的默认退出代码，这对于绕过收集结果失败很有用。不带参数。 类型：boolean，默认值：false
    reporters: ['html',"htmlextra","junit"],//   指定一个报告人名称作为string或提供一个以上报告人名称作为array。类型：string|array 。Available reporters: cli, json, junit, progress and emojitrain.
    reporter: {
        html: {
            export: './report/htmlResults.html',  //单色 html 报告
            template: './teamplate/html/template-default.hbs'
        },
        htmlextra: {
            export: './report/htmlextraResults.html',// 个性化可自定义配置newman html 报告
            showOnlyFails: false, //可选，报告仅显示测试失败的请求。
            darkTheme: false, //可选，使用`Dark Theme`模板 
            title: 'Newman Run Dashboard', //可选，报告将其用作报告中心的主要标题 
            logs: false,  //可选，报告程序在报告中显示控制台日志语句。默认情况下为False。
            skipHeaders: ['Server', 'Authorization', 'X-Powered-By'], //可选，不在报告中输出这些头及其值。默认情况下为false。
            omitHeaders: false,//可选，告诉报告者不要为报告中的每个请求和响应输出标头。默认情况下为false。
            hideResponse: ['Ping the API'],//可选的，不输出报告中的请求的响应主体。
            skipSensitiveData: true,//可选，不要为报告中的每个请求和响应输出标题和正文。默认情况下为false。
            template: './teamplate/htmlextra/dark-theme-dashboard.hbs', //可选，如果未指定模板，将使用默认模板 
        },
        junit: { export: './report/xmlResults.xml' },//junit xml 报告
    },
    color: "on", // 启用或禁用彩色CLI输出。类型：string，默认值：auto。可用选项：on，off和auto
    sslClientCert: "",// 公用客户端证书文件的路径。类型：string
    sslClientKey: "",// 私有客户端密钥文件的路径。类型：string
    sslClientPassphrase: "",// 秘密客户端密钥密码短语。类型：string
    sslClientCertList: "",// 客户端证书配置列表文件的路径。此选项优先sslClientCert，sslClientKey和sslClientPassphrase。如果此配置列表中没有匹配项，sslClientCert则用作后备。类型：string|array
    sslExtraCaCerts: "", // 文件的路径，其中包含一个或多个PEM格式的受信任CA证书。
    newmanVersion: "", // 用于集合运行的Newman版本。这将由newman设置


}, function (err) {
    if (err) { throw err; }
    console.log(' Code run Postman collection run complete!');
}).on('start', function (err, args) { // on start of run, log to console
    console.log('running a collection...');
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('Newman run event collection run completed!');
        console.log('创建订单失败，原因：',summary.run.failures);
    }
});