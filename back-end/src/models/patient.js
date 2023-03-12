const { MySQLDB } = require('../services/database');
const db = new MySQLDB();

class Patient {
    constructor(username, password, first_name, last_name, nic, address, email, gender, dob) {
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.nic = nic;
        this.address = address;
        this.email = email;
        this.gender = gender;
        this.dob = dob;

    }

    static createFromRequest(req) {
        return new Patient(req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.nic, req.body.address, req.body.email, req.body.gender, req.body.dob);
    }

    async save() {
        const [rows] = await db.connection.query('INSERT INTO patient SET ?', [this]);
        return rows;
    }

    static async findByUsernameAndPassword(username, password) {
        const [rows] = await db.connection.query('SELECT * FROM patient WHERE username = ? AND password = ?', [username, password]);
        return rows[0];
    }

    static async findByUsername(username) {
        const [rows] = await db.connection.query('SELECT * FROM patient WHERE username = ?', [username]);
        return rows[0];
    }

    static async findByPatientID(patient_ID) {
        const [rows] = await db.connection.query('SELECT * FROM patient WHERE patient_ID = ?', [patient_ID]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.connection.query('SELECT * FROM patient WHERE email = ?', [email]);
        return rows[0];
    }

    static async getAllPatients() {
        const [rows] = await db.connection.query('SELECT * FROM patient');
        return Object.values(JSON.parse(JSON.stringify(rows)));
    }
}

module.exports = {
    Patient
}
