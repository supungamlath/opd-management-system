import { date } from '../helpers/formatters'

export const appointmentsColumns = [
  {
    field: 'appointment_ID', headerName: 'Appointment ID', minWidth: 50, flex: 0.5
  },
  {
    field: 'appointment_date', headerName: 'Appointment Date', type: 'date', minWidth: 100, flex: 1
  },
  {
    field: 'appointment_time', headerName: 'Appointment Time', minWidth: 70, flex: 1
  },
  {
    field: 'patient_ID', headerName: 'Patient ID', minWidth: 70, flex: 1
  },
  {
    field: 'professional_ID', headerName: 'Professional ID', minWidth: 70, flex: 1
  },
  {
    field: 'status', headerName: 'Status', minWidth: 70, flex: 1
  },
];

export function appointmentsRows(appointments) {
  const rows = appointments?.map(appointment => (
    {
      id: appointment.appointment_ID,
      appointment_date: date(appointment.appointment_date),
      appointment_time: appointment.appointment_time,
      patient_ID: appointment.patient_ID,
      professional_ID: appointment.professional_ID,
      status: appointment.status
    }
  ))
  return rows
}