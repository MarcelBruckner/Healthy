'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FoodDB } from '@/app/lib/definitions';
import { SCHARF_SCALA, formatDatetime } from '@/app/lib/utils';
import { deleteFood } from '@/app/lib/actions';
import { EditButton, CopyButton, DeleteButton } from '../common/buttons';

export default function DataTable({ rows }: { rows: FoodDB[] }) {
    const columns: GridColDef[] = [
        { field: 'datetime', headerName: 'Datum', width: 130, valueGetter: (value) => formatDatetime(value) },
        { field: 'ort', headerName: 'Ort', minWidth: 130 },
        { field: 'motivation', headerName: 'Motivation', minWidth: 130 },
        { field: 'speisen', headerName: 'Speisen', minWidth: 200 },
        { field: 'scharf', headerName: 'Scharf', minWidth: 100, valueGetter: value => SCHARF_SCALA[value] },
        { field: 'getraenke', headerName: 'Getränke', minWidth: 200 },
        { field: 'beschwerden', headerName: 'Beschwerden', minWidth: 130 },
        { field: 'anmerkungen', headerName: 'Anmerkungen', minWidth: 130 },
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
