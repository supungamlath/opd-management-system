const { MySQLDB } = require('../services/database');
const db = new MySQLDB();

class System_Admin {
    constructor(username, password, first_name, last_name, email, phone_number) {
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone_number = phone_number;
    }

    static async findByUsernameAndPassword(username, password) {
        const [rows] = await db.connection.query('SELECT * FROM system_admin WHERE username = ? AND password = ?', [username, password]);
        return rows[0];
    }

}

module.exports = {
    System_Admin
}
