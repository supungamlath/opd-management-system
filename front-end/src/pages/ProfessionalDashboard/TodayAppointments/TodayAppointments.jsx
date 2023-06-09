import "./todayAppointments.scss"
import React from 'react'
import useApi from '../../../hooks/useApi';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import Button from '@mui/material/Button';

function TodayAppointments() {

  // const { res } = useApi("/api/appointment/get_appointments", "GET")
  // console.log(res)
  // get columns and rows from data
  // const columns = data ? data.columns : []
  // const rows = res ? res.data.rows : []

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'patientName',
      headerName: 'Patient Name',
      width: 150,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      editable: false,
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 110,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'text',
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
    { id: 1, patientName: 'Kamal', date: '11/12/2023', time: "10:30 AM", status: "Pending" },
    { id: 2, patientName: 'Amal', date: '11/12/2023', time: "11:30 AM", status: "Pending" },
    { id: 3, patientName: 'Sunimal', date: '11/12/2023', time: "12:30 AM", status: "Pending" },
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
          () => apiCrud(`/api/manager/approveLoan`, 'POST', 'Loan approved', {
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
        <h2>Appointments for Today</h2>
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

export default TodayAppointments;