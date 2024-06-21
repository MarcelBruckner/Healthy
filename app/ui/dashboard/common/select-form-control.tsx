import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { Box, Input, MenuItem, Select, Typography } from '@mui/material';
import { Label } from './form-control-utils';

export default function SelectFormControl({ id, value, values, defaultValue, label, errors, icon }: { id: string, value: any, values: any[], defaultValue?: any, label: string, multiline?: boolean, errors?: string[], icon: any }) {
    const Icon = icon;
    return (
        <>
            <FormControl key={id} placeholder={label} style={{ width: 'full' }} >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', alignContent: 'top', width: 'full' }}>
                    <Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <Label >{label}</Label>
                </Box>
                <Select
                    labelId={id}
                    id={id}
                    label={label}
                    name={id}
                    defaultValue={value ?? defaultValue}
                    sx={{ width: 'full' }}
                    error={!!errors}
                    fullWidth
                    variant='standard'
                    data-cy={id}
                >
                    {values.map((value, index) => <MenuItem key={value} id={value} value={index} data-cy={`${id}-${index}`}>{value}</MenuItem>)}
                </Select>
            </FormControl >

        </>
    );
}