import "./appointments.scss"
import React from 'react'
import useApi from '../../../hooks/useApi';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import Button from '@mui/material/Button';

import { appointmentsColumns, appointmentsRows } from "../../../schemas/patient/appointments";

import useGetPatientAppointments from "../../../hooks/queries/patient/useGetPatientAppointments";

function Appointments() {

  const { data: appointments } = useGetPatientAppointments();

  return (
    <div className="loans">

      <div className="title">
        <h2>Appointments</h2>
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
                rows={appointmentsRows(appointments)}
                columns={appointmentsColumns}
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
    </div>
  )
}

export default Appointments