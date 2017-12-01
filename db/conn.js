var _mysql = require('mysql');

//创建连接
var connection = _mysql.createConnection({
  //主机
  host: '192.168.5.76',
  //用户
  user: 'root',
  //密码
  password: 'kotei$88',
  //端口
  port: 3306,
  //数据库名
  database: 'leaktl'
});

//创建一个数据库连接
connection.connect(function (err) {
  if (err) {
    console.log('connect-' + err);
  }
  console.log('connect succeed...');
});

module.exports = connection;

