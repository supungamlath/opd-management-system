const { MySQLDB } = require('../services/database');
const db = new MySQLDB();

class Appointment {
    constructor(appointment_date, appointment_time, patient_ID, professional_ID, status) {
        this.appointment_date = appointment_date;
        this.appointment_time = appointment_time;
        this.patient_ID = patient_ID;
        this.professional_ID = professional_ID;
        this.status = status;
    }

    static createFromRequest(req) {
        return new Appointment(req.body.appointment_date, req.body.appointment_time, req.body.patient_ID, req.body.professional_ID, req.body.status);
    }

    async save() {
        const [rows] = await db.connection.query('INSERT INTO appointment SET ?', [this]);
        return rows;
    }

    static async findByAppointmentID(appointment_id) {
        const [rows] = await db.connection.query('SELECT * FROM appointment WHERE appointment_id = ?', [appointment_id]);
        return rows[0];
    }

    static async findAllByPatientID(patient_ID) {
        const [rows] = await db.connection.query('SELECT * FROM appointment WHERE patient_ID = ?', [patient_ID]);
        return Object.values(rows);
    }

    static async findAllByProfessional_ID(professional_ID) {
        const [rows] = await db.connection.query('SELECT * FROM appointment WHERE professional_ID = ?', [professional_ID]);
        return Object.values(rows);
    }

    static async findAllByStatus(status) {
        const [rows] = await db.connection.query('SELECT * FROM appointment WHERE status = ?', [status]);
        return Object.values(rows);
    }

    static async findByDateTime(date, time) {
        const [rows] = await db.connection.query('SELECT * FROM appointment WHERE appointment_date = ? and appointment_time', [date, time]);
        return rows[0];
    }

}

module.exports = {
    Appointment
}
