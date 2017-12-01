var _mysql = require('mysql');
var $q = require('q'); 

var db={};

// //创建连接
// var connection = _mysql.createConnection({
//   //主机
//   host: '192.168.5.76',
//   //用户
//   user: 'root',
//   //密码
//   password: 'kotei$88',
//   //端口
//   port: 3306,
//   //数据库名
//   database: 'leak'
// });

var pool  = _mysql.createPool({
  connectionLimit : 0,//无限制
  host            : '192.168.5.76',
  user            : 'root',
  password        : 'kotei$88',
  database        : 'leak'
});

// connection.connect(function (err) {
//   if (err) {
//     console.log('connect-' + err);
//   }
//   console.log('connect succeed...');
// });

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

//封装mysql query
db.query =function(sql,fn){
  var defer=$q.defer();
  if(!sql){
    defer.reject('脚本不能为空');
  }
  pool.getConnection(function(err, connection) {
    pool.query(sql,function (err, rows,fileds) {
      connection.release();
      if (err) {
        defer.reject("query-" + err);
      }
      // connection.end(function(errc){
      //   if(errc){
      //     console.log('关闭数据库链接失败')
      //   }
      // });
      defer.resolve(rows);
    });
  });

  return defer.promise;
}



module.exports = db;

