
var PORT = 3000;

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var _log =require('./logger');
var staffService = require('./api/staff.js');

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname =pathname.replace(/\//ig,'');
    staffService.getStaffByAccount(pathname).then(function (res) {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        if(res[0].SIGNATURE){
            try{
                fs.writeFileSync('SIGNATURE.png',res[0].SIGNATURE);
            }catch(e){

            }
        }
        response.write(JSON.stringify(res));
        response.end();
        _log.info('数据请求成功！')
    }, function (error) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('cannot get data!');
        response.end();
    });
    // var pathname = url.parse(request.url).pathname;
    // var realPath = path.join("assets", pathname);
    // //console.log(realPath);
    // var ext = path.extname(realPath);
    // ext = ext ? ext.slice(1) : 'unknown';
    // fs.exists(realPath, function (exists) {
    //     if (!exists) {
    //         response.writeHead(404, {
    //             'Content-Type': 'text/html'
    //         });
    //         fs.readFile('assets/page/404.html',function(err,file){
    //             response.write(file);
    //             response.end();
    //         });
    //     } else {
    //         fs.readFile(realPath, "binary", function (err, file) {
    //             if (err) {
    //                 response.writeHead(500, {
    //                     'Content-Type': 'text/plain'
    //                 });
    //                 response.end(err);
    //             } else {
    //                 var contentType =  "text/plain";
    //                 response.writeHead(200, {
    //                     'Content-Type': contentType
    //                 });
    //                 response.write(file, "binary");
    //                 response.end();
    //             }
    //         });
    //     }
    // });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");