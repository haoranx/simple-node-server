
var connection = require('../db/conn.js')
var $q = require('q'); 

module.exports = {
  getStaffByAccount: function (params) {
    var _sql = "select * from staff t where t.ACCOUNT ='chaoguan'";
    var defer =$q.defer();
    connection.query(_sql);
    connection.query(_sql, function (err, rows,fileds) {
      if (err) {
        defer.reject("query-" + err);
      }
      console.log("query succeed..." + rows);
      defer.resolve(rows);
    });
    return defer.promise;
  }
}