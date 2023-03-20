export const professionalsColumns = [
  {
    field: 'professional_ID', headerName: 'Professional ID', minWidth: 50, flex: 0.5
  },
  {
    field: 'username', headerName: 'Username', minWidth: 100, flex: 1
  },
  {
    field: 'first_name', headerName: 'First Name', minWidth: 70, flex: 1
  },
  {
    field: 'last_name', headerName: 'Last Name', minWidth: 70, flex: 1
  },
  {
    field: 'email', headerName: 'Email', minWidth: 70, flex: 1
  },
  {
    field: 'phone_number', headerName: 'Phone Number', minWidth: 70, flex: 1
  },
  {
    field: 'role', headerName: 'Profession', minWidth: 70, flex: 1
  },
];

export function professionalsRows(professionals) {
  const rows = professionals?.map(appointment => (
    {
      id: appointment.professional_ID,
      username: appointment.username,
      first_name: appointment.first_name,
      last_name: appointment.last_name,
      email: appointment.email,
      phone_number: appointment.phone_number,
      role: appointment.role
    }
  ))
  return rows
}