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
        return new Record(req.body.patient_id, req.body.professional_id, req.body.disease_reason, req.body.prescriptions, req.body.treatment_plans, req.body.progress_notes);
    }

    async save() {
        const [rows] = await db.connection.query('INSERT INTO patient_record SET ?', [this]);
        return rows;
    }

    static async findByRecordID(record_id) {
        const [rows] = await db.connection.query('SELECT * FROM patient_record WHERE ', [record_id]);
        return rows[0];
    }

    static async findByPatientID(patient_id) {
        const [rows] = await db.connection.query('SELECT * FROM patient_record WHERE ', [patient_id]);
        return rows[0];
    }

    static async findAllByProfessional_ID(professional_id) {
        const [rows] = await db.connection.query('SELECT * FROM patient_record WHERE professional_id = ?', [professional_id]);
        return Object.values(rows);
    }
}

module.exports = {
    Record
}
