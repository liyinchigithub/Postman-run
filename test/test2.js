const newman = require('newman');
var Sandbox = require('postman-sandbox'), context;
var CreateOrder = require("../environment/CreateOrder");//引入环境变量对象
var accessToken = process.argv[2];
var departureTimeDelay = process.argv[3];// 往后延几个小时
var serviceId = process.argv[4];// 订单服务类型
var carGroupId = process.argv[5];// 车组ID
var cityId = process.argv[6];// 城市ID
var passengerMobile = process.argv[7];// 乘车人手机号
var airCode = process.argv[8];// 三字码
var isCoupons = process.argv[9];// 是否优惠券
var isEnterpriseAuthentication = process.argv[10];// 鉴权类型

// 接收参数写入环境变量配置文件 environment\CreateOrder.js
for (let index = 0; index < CreateOrder.length; index++) {
    switch (CreateOrder[index].key) {
        case "accessToken":
            CreateOrder[index].value = accessToken;
            break;
        case "departureTimeDelay":
            CreateOrder[index].value = departureTimeDelay;
            break;
        case "carGroupId":
            CreateOrder[index].value = carGroupId;
            break;
        case "serviceId":
            CreateOrder[index].value = serviceId;
            break;
        case "cityId":
            CreateOrder[index].value = cityId;
            break;
        case "passengerMobile":
            CreateOrder[index].value = passengerMobile;
            break;
        case "airCode":
            CreateOrder[index].value = airCode;
            break;
        case "isCoupons":
            CreateOrder[index].value = isCoupons;
            break;
        case "isEnterpriseAuthentication":
            CreateOrder[index].value = isEnterpriseAuthentication;
            break;
        default:
            break;
    }
}



newman.run({
    // Postman collection 脚本文件路径，也可以是一个url地址
    collection: require('../postmanCollection/OpenAPICreateData.postman_collection.json'), 
    // Postman environment 环境变量文件路径，也可以是一个url地址，也可以是一个对象
    // environment:require('../postmanCollection/openApi.postman_environment.json'),
    environment: {
        "id": "2fe5997e-dcda-4b4d-8b77-77256c5e1cd5",
        "name": "OpenApi",
        "values": CreateOrder
    },
    iterationCount: 1,
    iterationData: "",
    folder: "",
    workingDir: "",
    insecureFileRead: true,
    timeout: 60000,
    timeoutRequest: 10000,
    timeoutScript: 10000,
    delayRequest: 0,
    ignoreRedirects: false,
    insecure: false,
    bail: false,
    suppressExitCode: false,
    reporters: ['html', "htmlextra", "junit"],
    reporter: {
        html: {
            export: './report/htmlResults.html',  
            template: './teamplate/html/template-default.hbs'
        },
        htmlextra: {
            export: './report/htmlextraResults.html',
            showOnlyFails: false, 
            darkTheme: false,
            title: 'Newman Run Dashboard',
            logs: false,  
            skipHeaders: ['Server', 'Authorization', 'X-Powered-By'], 
            omitHeaders: false,
            hideResponse: ['Ping the API'],
            skipSensitiveData: true,
            template: './teamplate/htmlextra/dark-theme-dashboard.hbs', 
        },
        junit: { export: './report/xmlResults.xml' },
    },
    color: "on", 
    sslClientCert: "",
    sslClientKey: "",
    sslClientPassphrase: "",
    sslClientCertList: "",
    sslExtraCaCerts: "", 
    newmanVersion: "", 


}, function (err) {
    if (err) {
        console.error('error', err);
    }
}).on('start', function (err, args) {
    console.log('running a collection...');
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
       
    }
    else {
        console.log('Pewman Newman run  collection run completed!');
        // 输出订单创建失败原因
        if (summary.run.failures.length===1) {
            // 调试输出，订单失败原因（后台msg参数值）
            console.log('创建订单失败，原因：', summary.run.failures);
        }else{
            // 调试输出订单信息（订单ID、订单号）
            console.log('创建订单完成：', JSON.stringify(summary.run.executions[6].assertions));
        }
       
    }
});
