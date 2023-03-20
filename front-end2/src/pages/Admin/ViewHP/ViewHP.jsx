import './viewHP.scss'
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { professionalsColumns, professionalsRows } from '../../../schemas/professionals';
import useGetAllProfessionals from '../../../hooks/queries/admin/useGetAllProfessionals';

function ViewHP() {

    const { data: professionals } = useGetAllProfessionals();
    return (
        <div className="accounts">

            <div className="title">
                <h2>All Professionals</h2>
            </div>

            <div style={{ height: 700, width: '90%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div className="table-container">
                        {professionals &&
                            <DataGrid
                                autoHeight
                                className='table'
                                rows={professionalsRows(professionals)}
                                columns={professionalsColumns}
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