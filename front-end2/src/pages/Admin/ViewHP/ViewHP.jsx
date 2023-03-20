import './viewHP.scss'
import React from 'react'
import useApi from '../../../hooks/useApi';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import Button from '@mui/material/Button';
import { padding } from '@mui/system';

function ViewHP() {

    const { data: p_loans } = useGetUserLoans();

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'Name',
            headerName: 'Name',
            width: 150,
            editable: false,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            editable: false,
        },
        // {
        //     field: 'time',
        //     headerName: 'Time',
        //     width: 110,
        //     editable: false,
        // },
        // {
        //     field: 'status',
        //     headerName: 'Status',
        //     type: 'text',
        //     width: 110,
        //     editable: false,
        // },

    ];


    const rows = [
        { id: 1, Name: 'Kamal', role: 'Doctor' },
        { id: 2, Name: 'Nimal', role: 'Nurse' },
        { id: 3, Name: 'Sunil', role: 'Doctor' },
    ];

    return (
        <div className="accounts">

            <div className="title">
                <h2>All Professionals</h2>
            </div>

            <div style={{ height: 700, width: '90%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div className="table-container">
                        {fixed_deposits &&
                            <DataGrid
                                autoHeight
                                className='table'
                                rows={fixedDepositsRows(fixed_deposits)}
                                columns={fixedDepositsColumns}
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

export default ViewHP