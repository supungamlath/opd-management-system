import "./appointments.scss"
import React from 'react'
import useApi from '../../../hooks/useApi';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import Button from '@mui/material/Button';

function Appointments() {

  // const { res } = useApi("/api/appointment/get-appointments", "GET")
  // console.log(res)
  // get columns and rows from data
  // const columns = data ? data.columns : []
  // const rows = res ? res.data.rows : []

  const columns = [
    {
      field: 'appointment_ID',
      headerName: 'ID',
      width: 90,
      editable: false,
    },
    {
      field: 'professional_ID',
      headerName: 'Doctor ID',
      width: 150,
      editable: false,
    },
    {
      field: 'appointment_date',
      headerName: 'Date',
      width: 150,
      editable: false,
    },
    {
      field: 'appointment_Time',
      headerName: 'Time',
      width: 110,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      editable: false,
    },

  ];

  const newColumns = [...columns,
  {
    field: 'actions',
    headerName: 'Actions',
    minWidth: 110,
    flex: 1,
    align: 'center',
    renderCell: (params) => usersActions(params)
  },]

  const rows = [
    { id: 1, appointment_ID: 1, professional_ID: 1, appointment_date: '11/12/2023', appointment_Time: '10:30 AM', status: "Pending" },
    { id: 2, appointment_ID: 2, professional_ID: 1, appointment_date: '11/12/2023', appointment_Time: '11:30 AM', status: "Pending" },
    { id: 3, appointment_ID: 3, professional_ID: 1, appointment_date: '11/12/2023', appointment_Time: '12:30 AM', status: "Pending" },

  ];

  const usersActions = (params) => (
    <div className='actions'>
      <Button variant="contained" className="activate"
        onClick={() => popAction(
          'Are you sure?',
          "You won't be able to revert this!",
          'Edit appointment',
          () => apiCrud(`/api/manager/approveLoan`, 'POST', 'Loan approved', {
            loanID: params.row.id,
          })()
        )}>
        Edit
      </Button>
      <Button variant="contained" className="activate"
        onClick={() => popAction(
          'Are you sure?',
          "This appointment will be cancelled",
          'Cancel appointment',
          'go back',
          () => apiCrud(`/api`, 'POST', 'Loan approved', {
            loanID: params.row.id,
          })()
        )}>
        Cancel
      </Button>
    </div>
  )

  return (
    <div className='overview'>

      <div className="title">
        <h2>Appointments</h2>
        <div className="loan-actions">
          <Link to={"/patientdashboard/newappointment"}>
            <button>
              + New Appointment
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={newColumns}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell:hover': {
              cursor: 'pointer'
            },
          }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        // checkboxSelection

        />
      </Box>

    </div>
  )
}

export default Appointments