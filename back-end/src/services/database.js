const mysql = require('mysql2/promise');


 class MySQLDBMySQLDB {
  constructor(config) {
     this.init(config)
  }

  async init(config){
    this.connection = await mysql.createConnection(config);
  }
}

module.exports={
    MySQLDBMySQLDB
}