import "./appointments.scss"
import React from 'react'
import useApi from '../../../hooks/useApi';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import Button from '@mui/material/Button';

import { useGetPatientAppointments } from "../../../hooks/useGetPatientAppointments";

function Appointments() {

  const { data: appointments } = useGetPatientAppointments();
  // console.log(res)
  // get columns and rows from data
  // const columns = data ? data.columns : []
  const rows = object ? object.rows : []
  console.log(rows)
  console.log(object)

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
      field: 'appointment_time',
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

  // return (
  //   <div className='overview'>

  //     <div className="title">
  //       <h2>Appointments</h2>
  //       <div className="loan-actions">
  //         <Link to={"/patientdashboard/newappointment"}>
  //           <button>
  //             + New Appointment
  //           </button>
  //         </Link>
  //       </div>
  //     </div>
  //     <hr />
  //     <Box sx={{ height: 400, width: '100%' }}>
  //       <DataGrid
  //         rows={rows}
  //         columns={newColumns}
  //         disableSelectionOnClick
  //         sx={{
  //           '& .MuiDataGrid-cell:hover': {
  //             cursor: 'pointer'
  //           },
  //         }}
  //         pageSize={10}
  //         rowsPerPageOptions={[10]}
  //         initialState={{
  //           pagination: {
  //             paginationModel: {
  //               pageSize: 5,
  //             },
  //           },
  //         }}
  //         pageSizeOptions={[5]}
  //       // checkboxSelection
  //       />
  //     </Box>

  //   </div>
  // )

  return (
    <div className="loans">

      <div className="title">
        <h2>Online Loans</h2>
        <div className="loan-actions">
          <Link to={"/userdashboard/onlineloan"}>
            <button>
              + Get Online Loan
            </button>
          </Link>
        </div>
      </div>
      <p>
        Click on online loan to see installment payments
      </p>

      <div style={{ height: 250, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {o_loans &&
              <DataGrid
                autoHeight
                className='table'
                rows={onlineLoansRows(o_loans)}
                columns={onlineLoansColumns}
                onRowClick={params => (
                  navigate(`/userdashboard/loans/${params.row.id}`, {
                    state: {
                      type: "online loan",
                    }
                  })
                )}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                sx={{
                  '& .MuiDataGrid-cell:hover': {
                    cursor: 'pointer'
                  },
                }}
              />
            }
          </div>
        </div>
      </div>

      <div className="title">
        <h2>Loans</h2>
      </div>
      <p>
        Click on loan to see installment payments
      </p>

      <div style={{ height: 300, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {p_loans &&
              <DataGrid
                autoHeight
                className='table'
                rows={loansRows(p_loans)}
                columns={loansColumns}
                onRowClick={params => (
                  navigate(`/userdashboard/loans/${params.row.id}`, {
                    state: {
                      type: "loan",
                    }
                  })
                )}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                sx={{
                  '& .MuiDataGrid-cell:hover': {
                    cursor: 'pointer'
                  },
                }}
              />
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Appointments