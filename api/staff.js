
var db = require('../db/db.js')
var $q = require('q'); 

module.exports = {
  getStaffByAccount: function (params) {
    var _sql = "select t.* from staff t where t.ACCOUNT ='"+params+"'";
    return db.query(_sql);
  }
}