const { MySQLDB } = require('../services/database');
const db = new MySQLDB();

class Appointment {
    constructor(appointment_date, appointment_time, patient_id, professional_id, status) {
        this.appointment_date = appointment_date;
        this.appointment_time = appointment_time;
        this.patient_id = patient_id;
        this.professional_id = professional_id;
        this.status = status;
    }

    static createFromRequest(req) {
        return new Appointment(req.body.appointment_date, req.body.appointment_time, req.body.patient_id, req.body.professional_id, req.body.status);
    }

    async save() {
        const [rows] = await db.connection.query('INSERT INTO appointment SET ?', [this]);
        return rows;
    }

    static async findByAppointmentID(appointment_id) {
        const [rows] = await db.connection.query('SELECT * FROM appointment WHERE appointment_id = ?', [appointment_id]);
        return rows[0];
    }

    static async findByPatientID(patient_id) {
        const [rows] = await db.connection.query('SELECT * FROM appointment WHERE patient_id = ?', [patient_id]);
        return rows[0];
    }

    static async findByProfessional_ID(patient_id) {
        const [rows] = await db.connection.query('SELECT * FROM appointment WHERE professional_id = ?', [professional_id]);
        return rows[0];
    }
    
    static async findByStatus(status) {
        const [rows] = await db.connection.query('SELECT * FROM appointment WHERE status = ?', [status]);
        return rows[0];
    }

}

module.exports = {
    Appointment
}
