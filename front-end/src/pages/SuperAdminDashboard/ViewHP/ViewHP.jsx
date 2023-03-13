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
        <div>
            <h1 className="heading">All Professionals</h1>
            <hr />
            <Box sx={{ height: 400, width: '100%', padding: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
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

export default ViewHP