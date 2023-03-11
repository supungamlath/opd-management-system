const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

class MySQLDB {
  constructor(config = { db_user: null, db_password: null }) {
    this.connect(config).then(() => this.initDatabase());
  }

  async connect(config) {
    this.connection = await mysql.createConnection({
      user: config.db_user || process.env.MYSQLDB_USER,
      password: config.db_password || process.env.MYSQLDB_ROOT_PASSWORD,
      host: process.env.MYSQLDB_HOST,
      port: process.env.DB_PORT,
      multipleStatements: true,
    });
  }

  async initDatabase() {
    const initScript = fs.readFileSync('./src/models/ddl.sql', 'utf8');
    // console.log(initScript);
    try {
      await this.connection.query(initScript);
    }
    catch (err) {
      const { code, sqlMessage } = err;
      console.log({ code, sqlMessage });
    }
  }
}

module.exports = {
  MySQLDB
}