const { MySQLDB } = require('../services/database');
const db = new MySQLDB();

class Professional {
    constructor(username, password, first_name, last_name, email, phone_number, role) {
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone_number = phone_number;
        this.role = role;
       }

    static createFromRequest(req) {
        return new Professional(req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.phone_number, req.body.role);
    }

    async save() {
        const [rows] = await db.connection.query('INSERT INTO healthcare_professional SET ?', [this]);
        return rows;
    }

    static async findByUsernameAndPassword(username, password) {
        const [rows] = await db.connection.query('SELECT * FROM healthcare_professional WHERE username = ? AND password = ?', [username, password]);
        return rows[0];
    }

    static async findByUsername(username) {
        const [rows] = await db.connection.query('SELECT * FROM healthcare_professional WHERE username = ?', [username]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.connection.query('SELECT * FROM healthcare_professional WHERE email = ?', [email]);
        return rows[0];
    }

    static async findByType(role) {
        const [rows] = await db.connection.query('SELECT * FROM healthcare_professional WHERE role = ?', [role]);
        return rows[0];
    }

    static async getAllHP() {
        const [rows] = await db.connection.query('SELECT * FROM healthcare_professional');
        return rows;
    }
}

module.exports = {
    Professional
}
