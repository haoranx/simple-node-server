
var db = require('../db/db.js')
var $q = require('q'); 

module.exports = {
  getStaffByAccount: function (params) {
    var _sql = "select t.* from staff t where t.ACCOUNT ='"+params+"'";
    // var defer =$q.defer();
    // connection.query(_sql);
    // connection.query(_sql, function (err, rows,fileds) {
    //   if (err) {
    //     defer.reject("query-" + err);
    //   }
    //   console.log("query succeed..." + rows);
    //   defer.resolve(rows);
    // });
    // return defer.promise;

    return db.query(_sql);
  }
}