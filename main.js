var PORT = 3000;

var http = require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');
var staffService=require('./api/staff.js');

//创建连接
// var mysql = _mysql.createConnection({
//     //主机
//     host: '192.168.5.76',
//     //用户
//     user: 'root',
//     //密码
//     password: 'kotei$88',
//     //端口
//     port: 3306,
//     //数据库名
//     database: 'leaktl'
// });

// //创建一个数据库连接
// mysql.connect(function (err) {
//     if (err) {
//         console.log('connect-' + err);
//     }
//     console.log('connect succeed...');
// });

// mysql.query(_sql, function (err, rows) {
//     if (err) {
//         console.log("query-" + err);
//     }
//     console.log("query succeed..." + rows);
// });

// mysql.end(function (err) {
//     if (err) {
//         return;
//     }
//     console.log("close succeed...");
// });

var server = http.createServer(function (request, response) {
    var staff = staffService.getStaffByAccount('chaoguan').then(function(res){
        debugger
    });
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("assets", pathname);
    //console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType =  "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");