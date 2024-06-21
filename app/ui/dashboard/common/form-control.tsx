import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { Box, Input, Typography } from '@mui/material';
import { Label } from './form-control-utils';

export default function BasicFormControl({ id, value, label, multiline, errors, icon }: { id: string, value?: any, label: string, multiline?: boolean, errors?: string[], icon: any }) {
    const Icon = icon;
    return (
        <>
            <FormControl key={id} defaultValue={value} placeholder={label} style={{ width: 'full' }} >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', alignContent: 'top', width: 'full' }}>
                    <Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <Label >{label}</Label>
                </Box>
                <Input id={id}
                    name={id}
                    placeholder={errors ? errors.join('\n') : label}
                    multiline={multiline}
                    sx={{ width: 'full' }}
                    defaultValue={value}
                    error={!!errors}
                    fullWidth
                />
            </FormControl>

        </>
    );
}
