const { MySQLDB } = require('../services/database');
const db = new MySQLDB();

class Record {
    constructor(patient_id, professional_id, disease_reason, prescriptions, treatment_plans, progress_notes) {
        this.patient_id = patient_id;
        this.professional_id = professional_id;
        this.disease_reason = disease_reason;
        this.prescriptions = prescriptions;
        this.treatment_plans = treatment_plans;
        this.progress_notes = progress_notes;
    }

    static createFromRequest(req) {
        return new Record(req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.nic, req.body.address, req.body.email, req.body.gender, req.body.dob);
    }

    async save() {
        const [rows] = await db.connection.query('INSERT INTO patient_record SET ?', [this]);
        return rows;
    }

    static async findByPatientID(username, password) {
        const [rows] = await db.connection.query('SELECT * FROM patient WHERE username = ? AND password = ?', [username, password]);
        return rows[0];
    }

    static async findByAppointmentID(username) {
        const [rows] = await db.connection.query('SELECT * FROM patient WHERE username = ?', [username]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.connection.query('SELECT * FROM patient WHERE email = ?', [email]);
        return rows[0];
    }

    static async getAllPatients() {
        const [rows] = await db.connection.query('SELECT * FROM patient');
        return rows;
    }
}

module.exports = {
    Patient
}
