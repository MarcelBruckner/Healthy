'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatDatetime } from '@/app/lib/utils';
import { deleteFood } from '@/app/lib/actions';
import { EditButton, CopyButton, DeleteButton } from '../common/buttons';
import { ToiletDB } from '@/app/lib/definitions';

export default function DataTable({ rows }: { rows: ToiletDB[] }) {
    const columns: GridColDef[] = [
        { field: 'datetime', headerName: 'Datum', width: 130, valueGetter: (value) => formatDatetime(value) },
        { field: 'urinmenge', headerName: 'Urinmenge', minWidth: 110 },
        { field: 'urindruck', headerName: 'Urindruck', minWidth: 110 },
        { field: 'stuhltyp', headerName: 'Stuhltyp', minWidth: 110 },
        { field: 'stuhlfarbe', headerName: 'Stuhlfarbe', minWidth: 110 },
        { field: 'stuhlmenge', headerName: 'Stuhlmenge', minWidth: 110 },
        { field: 'stuhldruck', headerName: 'Stuhldruck', minWidth: 110 },
        { field: 'therapie', headerName: 'Therapie', minWidth: 110 },
        { field: 'anmerkungen', headerName: 'Anmerkungen', minWidth: 110 },
        {
            field: 'id', headerName: '', width: 150, renderCell: (params) => {
                const id = params.formattedValue as string;

                return <>
                    <EditButton type="food" id={id} />
                    <CopyButton type="food" id={id} />
                    <DeleteButton type="food" id={id} deleteFunc={deleteFood} />
                </>
            }
        },
    ];

    return (
        <div style={{ height: "auto", minHeight: 400, width: '100%', paddingTop: 8 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                disableRowSelectionOnClick
            />
        </div>
    );
}
